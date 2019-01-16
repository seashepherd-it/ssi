package it.seashepherd.event;

import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class EventImporterPV extends EventImporter {

	private ParsingStatus parsingStatus = null;

	public enum ParsingStatus {
		NONE, HEADER, VOLUNTEERS;
	};

	public EventImporterPV(EventConnection connection, EventEntity event, Workbook workbook) {
		super(connection, event, workbook);
	}

	public void importEvent() throws Exception {

		Sheet firstSheet = getWorkbook().getSheetAt(0);

		Iterator<Row> rows = firstSheet.iterator();
		while (rows.hasNext()) {
			Row nextRow = rows.next();
			Iterator<Cell> cellIterator = nextRow.cellIterator();
			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				try {
					if (parsingStatus == null && cell.getStringCellValue().equalsIgnoreCase("Coordinamento")) {
						parsingStatus = ParsingStatus.HEADER;
						nextRow = rows.next();
					}
	
					if (parsingStatus.equals(ParsingStatus.NONE)
							&& cell.getStringCellValue().equalsIgnoreCase("Cognome Nome")) {
						parsingStatus = ParsingStatus.VOLUNTEERS;
						nextRow = rows.next();
					}
				}
				catch(Exception e) {
					
				}
			}

			switch (parsingStatus) {
			case HEADER:
				if (nextRow.getCell(0) == null || nextRow.getCell(0).getStringCellValue().trim().isEmpty())
					continue;

				try {
					buildHeader(nextRow);
					parsingStatus = ParsingStatus.NONE;
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			case NONE:
				break;
			case VOLUNTEERS:
				if (nextRow.getCell(1) == null || nextRow.getCell(1).getStringCellValue().trim().isEmpty())
					continue;

				try {
					buildVolunteer(nextRow);
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			}
		}

		if(!getResult().onError())
			saveEvent();
	}

	private void buildHeader(Row row) throws Exception {

		// decode area
		String area = row.getCell(0).getStringCellValue().trim().toUpperCase();
		normalizeText(area);
		
		int areaId = getConnection().getDAO().getAreaIdByName(area);
		if (areaId < 0)
			addError("Area not found: " + area);
		getEvent().setAreaId(areaId);
		getEvent().setShipName(row.getCell(1).getStringCellValue());
		getEvent().setInstituteTypeId(getInstituteTypeIdByText(row.getCell(2).getStringCellValue()));
		getEvent().setInstituteName(row.getCell(3).getStringCellValue());

		EventUtils.setProvincePlace(getEvent(), row.getCell(5).getStringCellValue(), row.getCell(4).getStringCellValue());

		try {
			getEvent().setEventDateFrom(row.getCell(6).getDateCellValue());
		} catch (Exception e) {
			addWarning("Invalid date: " + row.getCell(6));
		}
		try {
			getEvent().setEventDateTo(row.getCell(7).getDateCellValue());
		} catch (Exception e) {
			addWarning("Invalid date: " + row.getCell(7));
		}
		getEvent().setInstituteSpeaker(row.getCell(8).getStringCellValue());
		try {
			getEvent().setInstituteContact(row.getCell(9).getStringCellValue());
		} catch (Exception e) {
		}

		getEvent().setEventArgument(row.getCell(10).getStringCellValue());

		// decode account
		String account = row.getCell(11).getStringCellValue();
		int accountId = getConnection().getDAO().getVolunteerIdByName(account);
		if (accountId < 0)
			addError("Account not found: " + account);
		getEvent().setEventAccountId(accountId);

		getEvent().setEventPeopleQty((int) row.getCell(12).getNumericCellValue());

		if (row.getCell(13) != null)
			getEvent().setEventNote(row.getCell(13).getStringCellValue());
		
		getEvent().setEventLink("");
	}

	private void buildVolunteer(Row nextRow) throws Exception {

		// volunteer
		Cell cell = nextRow.getCell(1);
		if (cell == null)
			return;

		String volunteer = cell.getStringCellValue();
		int volunteerId = getConnection().getDAO().getVolunteerIdByName(volunteer);
		if (volunteerId < 0) {
			volunteerId = (int) nextRow.getCell(0).getNumericCellValue();
			if (volunteerId > 0) {
				String volunteerSurname = getConnection().getDAO().getVolunteerSurnameById(volunteerId);
				if (volunteerSurname == null || !volunteer.toUpperCase().contains(volunteerSurname.toUpperCase())) {
					String volunteerText = getConnection().getDAO().getVolunteerTextById(volunteerId);
					addWarning("Volunteer " + volunteer + "(" + volunteerId + ")"
							+ " not found, please use instead " + volunteerText);
				}
			} else
				addError("Volunteer not found: " + volunteer);
		}

		if (volunteerId != nextRow.getCell(0).getNumericCellValue())
			addWarning("Volunteer " + volunteer + "(" + (int) nextRow.getCell(0).getNumericCellValue() + ")"
					+ " is internal code, please use instead " + volunteerId);

		double eventHours = nextRow.getCell(2).getNumericCellValue();
		EventVolunteerEntity eventVolunteer = new EventVolunteerEntity(getEvent(), volunteerId, eventHours);
		getEvent().getVolunteers().add(eventVolunteer);
	}
}
