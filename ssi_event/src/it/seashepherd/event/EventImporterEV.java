package it.seashepherd.event;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class EventImporterEV extends EventImporter {

	private ParsingStatus parsingStatus = null;

	public enum ParsingStatus {
		NONE, HEADER, VOLUNTEERS;
	};

	public EventImporterEV(EventConnection connection, EventEntity event, Workbook workbook) {
		super(connection, event, workbook);
	}

	public void importEvent() throws Exception {

		Sheet firstSheet = getWorkbook().getSheetAt(0);
		getEvent().setEventLink("");
		Iterator<Row> rows = firstSheet.iterator();
		while (rows.hasNext()) {
			Row nextRow = rows.next();
			Iterator<Cell> cellIterator = nextRow.cellIterator();
			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();				
				if (parsingStatus == null && cell.getStringCellValue().equalsIgnoreCase("Descrizione Evento")) {
					parsingStatus = ParsingStatus.HEADER;
					nextRow = rows.next();
					break;
				}
				
				try {
					if (parsingStatus.equals(ParsingStatus.NONE)
							&& (cell.getStringCellValue().equalsIgnoreCase("Cognome Nome")
									|| cell.getStringCellValue().equalsIgnoreCase("VOLONTARI"))) {
						parsingStatus = ParsingStatus.VOLUNTEERS;
						nextRow = rows.next();
					}
				} catch (Exception e) {
				}
			}

			if (parsingStatus == null) {
				// decode account
				if (nextRow.getCell(0) != null && nextRow.getCell(0).getStringCellValue().equalsIgnoreCase("Resp.")) {
					String account = nextRow.getCell(1).getStringCellValue();
					int accountId = getConnection().getDAO().getVolunteerIdByName(account);
					if (accountId < 0)
						addError("Account not found: " + account);
					getEvent().setEventAccountId(accountId);
				}
				// decode area
				if (nextRow.getCell(2) != null
						&& nextRow.getCell(2).getStringCellValue().equalsIgnoreCase("Coordinamento")) {
					String area = nextRow.getCell(4).getStringCellValue().trim().toUpperCase();
					normalizeText(area);
					
					int areaId = getConnection().getDAO().getAreaIdByName(area);
					if (areaId < 0)
						addError("Area not found: " + area);
					getEvent().setAreaId(areaId);
				}
				// event argument
				if (nextRow.getCell(0) != null
						&& nextRow.getCell(0).getStringCellValue().equalsIgnoreCase("Tipo Evento")) {
					getEvent().setEventArgument(nextRow.getCell(1).getStringCellValue());
				}
				// note
				if (nextRow.getCell(3) != null
						&& nextRow.getCell(3).getStringCellValue().equalsIgnoreCase("Note")) {
					if(nextRow.getCell(4) != null)
						getEvent().setEventNote(nextRow.getCell(4).getStringCellValue());
				}
				// link
				if (nextRow.getCell(5) != null
						&& nextRow.getCell(5).getStringCellValue().equalsIgnoreCase("Link")) {
					if(nextRow.getCell(6) != null)
						getEvent().setEventLink(nextRow.getCell(6).getStringCellValue());
				}
				// imbarcazione
				if (nextRow.getCell(0) != null
						&& nextRow.getCell(0).getStringCellValue().equalsIgnoreCase("Imbarcazione")
						&& nextRow.getCell(1) != null) {
					getEvent().setShipName(nextRow.getCell(1).getStringCellValue());
				}
				// event note
				if (nextRow.getCell(3) != null && nextRow.getCell(3).getStringCellValue().isEmpty()) {
					getEvent().setEventNote(nextRow.getCell(3).getStringCellValue());
				}

				continue;
			}

			switch (parsingStatus) {
			case HEADER:
				if (nextRow.getCell(1) == null || nextRow.getCell(1).getStringCellValue().trim().isEmpty())
					continue;

				buildHeader(nextRow);
				parsingStatus = ParsingStatus.NONE;
				break;
			case NONE:
				break;
			case VOLUNTEERS:
				if (nextRow.getCell(1) == null || nextRow.getCell(1).getStringCellValue().trim().isEmpty())
					continue;

				if (nextRow.getCell(1).getStringCellValue().equalsIgnoreCase("Cognome Nome")
						&& nextRow.getCell(0).getStringCellValue().equalsIgnoreCase("ID")) {
					continue;
				}
				buildVolunteer(nextRow);
				break;
			}
		}

		if(!getResult().onError())
			saveEvent();
	}

	private void buildHeader(Row row) throws SQLException, ParseException {

		if (row.getCell(1) == null || row.getCell(1).getStringCellValue().trim().isEmpty())
			return;

		if (row.getCell(4) == null)
			return;

		try {
			getEvent().setEventDateFrom(row.getCell(2).getDateCellValue());
		} catch (Exception e) {
			addWarning("Invalid date: " + row.getCell(2));
		}
		try {
			getEvent().setEventDateTo(row.getCell(3).getDateCellValue());
		} catch (Exception e) {
			addWarning("Invalid date: " + row.getCell(3));
		}

		EventUtils.setProvincePlace(getEvent(), row.getCell(5).getStringCellValue(),
				row.getCell(4).getStringCellValue());
		try {
			getEvent().setEventPeopleQty((int) row.getCell(6).getNumericCellValue());
		} catch (Exception e) {
		}
		try {
			getEvent().setEventReceiptsQty((int) row.getCell(7).getNumericCellValue());
		} catch (Exception e) {
		}
/*		try {
			getEvent().setEventReceiptsTot((double) row.getCell(14).getNumericCellValue());
		} catch (Exception e) {
		}*/
				
	}

	private void buildVolunteer(Row nextRow) throws Exception {

		// volunteer
		String volunteer = nextRow.getCell(1).getStringCellValue();
		int volunteerId = getConnection().getDAO().getVolunteerIdByName(volunteer);
		if (volunteerId < 0) {
			volunteerId = (int) nextRow.getCell(0).getNumericCellValue();
			if (volunteerId > 0) {
				String volunteerSurname = getConnection().getDAO().getVolunteerSurnameById(volunteerId);
				if (volunteerSurname == null || !volunteer.toUpperCase().contains(volunteerSurname.toUpperCase())) {
					String volunteerText = getConnection().getDAO().getVolunteerTextById(volunteerId);
					addWarning("Volunteer " + volunteer + "(" + volunteerId + ")" + " not found, please use instead "
							+ volunteerText);
				}
			} else
				addError("Volunteer not found: " + volunteer);
		}

		if (volunteerId != nextRow.getCell(0).getNumericCellValue())
			addWarning("Volunteer " + volunteer + "(" + (int) nextRow.getCell(0).getNumericCellValue() + ")"
					+ " is internal code, please use instead " + volunteerId);

		double eventHours = 0;
		if (nextRow.getCell(2) != null)
			eventHours = nextRow.getCell(2).getNumericCellValue();
		else
			eventHours = nextRow.getCell(3).getNumericCellValue();
		EventVolunteerEntity eventVolunteer = new EventVolunteerEntity(getEvent(), volunteerId, eventHours);
		getEvent().getVolunteers().add(eventVolunteer);
	}
}
