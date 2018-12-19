package it.seashepherd.event;

import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class EventImporterEP extends EventImporter {

	private ParsingStatus parsingStatus = null;

	public enum ParsingStatus {
		NONE, HEADER, VOLUNTEERS_1, VOLUNTEERS_2;
	};

	public EventImporterEP(EventConnection connection, EventEntity event, Workbook workbook) {
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
				if (parsingStatus == null && cell.getStringCellValue().equalsIgnoreCase("Coordinamento")) {
					parsingStatus = ParsingStatus.HEADER;
					nextRow = rows.next();
				}

				if (parsingStatus.equals(ParsingStatus.NONE)
						&& cell.getStringCellValue().equalsIgnoreCase("Cognome Nome")) {
					parsingStatus = ParsingStatus.VOLUNTEERS_1;
					nextRow = rows.next();
				}

				if (parsingStatus.equals(ParsingStatus.NONE) && cell.getStringCellValue().equalsIgnoreCase("Cognome")) {
					parsingStatus = ParsingStatus.VOLUNTEERS_2;
					nextRow = rows.next();
				}
			}

			switch (parsingStatus) {
			case HEADER:
				if (nextRow.getCell(0) == null || nextRow.getCell(0).getStringCellValue().trim().isEmpty())
					continue;

				buildHeader(nextRow);
				parsingStatus = ParsingStatus.NONE;
				break;
			case NONE:
				break;
			case VOLUNTEERS_1:
				buildVolunteer_1(nextRow);
				break;
			case VOLUNTEERS_2:
				buildVolunteer_2(nextRow);
				break;
			}
		}

		if(!getResult().onError())
			saveEvent();
	}

	private void buildHeader(Row row) throws Exception {

		// decode area
		String area = row.getCell(0).getStringCellValue().trim().toUpperCase();
		int areaId = getConnection().getDAO().getAreaIdByName(getConnection(), area);
		if (areaId < 0)
			addError("Area not found: " + area);
		getEvent().setAreaId(areaId);
		getEvent().setEventDateFrom(row.getCell(1).getDateCellValue());
		getEvent().setEventDateTo(row.getCell(2).getDateCellValue());

		EventUtils.setProvincePlace(getEvent(), row.getCell(4).getStringCellValue(),
				row.getCell(3).getStringCellValue());

		// decode account
		String account = row.getCell(5).getStringCellValue();
		int accountId = getConnection().getDAO().getVolunteerIdByName(getConnection(), account);
		if (accountId < 0)
			addError("Account not found: " + account);
		getEvent().setEventAccountId(accountId);

		int material_qty = 0;
		try {
			material_qty = (int) row.getCell(6).getNumericCellValue();
		} catch (Exception e1) {
			material_qty = EventUtils.normalizeMaterialQty(row.getCell(6).getStringCellValue());
			if (material_qty < 0)
				addWarning("Invalid material: " + EventUtils.normalizeMaterialQty(row.getCell(6).getStringCellValue()));
		}
		getEvent().setDisposalMaterialKG(material_qty);
		getEvent().setDisposalContact(row.getCell(7).getStringCellValue());
		getEvent().setEventPeopleQty((int) row.getCell(8).getNumericCellValue());

		// note
		if (row.getCell(10) != null)
			getEvent().setEventNote(row.getCell(10).getStringCellValue());

	}

	private void buildVolunteer_1(Row row) throws Exception {

		if (row.getCell(1) == null || row.getCell(1).getStringCellValue().trim().isEmpty())
			return;

		// volunteer
		String volunteer = row.getCell(1).getStringCellValue();
		int volunteerId = getConnection().getDAO().getVolunteerIdByName(getConnection(), volunteer);
		if (volunteerId < 0) {
			volunteerId = (int) row.getCell(0).getNumericCellValue();
			if (volunteerId > 0) {
				String volunteerSurname = getConnection().getDAO().getVolunteerSurnameById(getConnection(),
						volunteerId);
				if (volunteerSurname == null || !volunteer.toUpperCase().contains(volunteerSurname.toUpperCase())) {
					String volunteerText = getConnection().getDAO().getVolunteerTextById(getConnection(), volunteerId);
					addWarning("Volunteer " + volunteer + "(" + volunteerId + ")" + " not found, please use instead "
							+ volunteerText);
				}
			} else
				addError("Volunteer not found: " + volunteer);
		}

		if (volunteerId != row.getCell(0).getNumericCellValue())
			addWarning("Volunteer " + volunteer + "(" + (int) row.getCell(0).getNumericCellValue() + ")"
					+ " is internal code, please use instead " + volunteerId);

		double eventHours = row.getCell(2).getNumericCellValue();
		EventVolunteerEntity eventVolunteer = new EventVolunteerEntity(getEvent(), volunteerId, eventHours);
		getEvent().getVolunteers().add(eventVolunteer);
	}

	private void buildVolunteer_2(Row row) throws Exception {

		if (row.getCell(1) == null || row.getCell(1).getStringCellValue().trim().isEmpty())
			return;

		// volunteer
		String volunteer = row.getCell(1).getStringCellValue() + " " + row.getCell(2).getStringCellValue();
		int volunteerId = getConnection().getDAO().getVolunteerIdByName(getConnection(), volunteer);
		if (volunteerId < 0) {
			volunteerId = (int) row.getCell(0).getNumericCellValue();
			if (volunteerId > 0) {
				String volunteerSurname = getConnection().getDAO().getVolunteerSurnameById(getConnection(),
						volunteerId);
				if (volunteerSurname == null || !volunteer.toUpperCase().contains(volunteerSurname.toUpperCase())) {
					String volunteerText = getConnection().getDAO().getVolunteerTextById(getConnection(), volunteerId);
					addWarning("Volunteer " + volunteer + "(" + volunteerId + ")" + " not found, please use instead "
							+ volunteerText);
				}
			} else
				addError("Volunteer not found: " + volunteer);
		}

		if (volunteerId != row.getCell(0).getNumericCellValue())
			addWarning("Volunteer " + volunteer + "(" + (int) row.getCell(0).getNumericCellValue() + ")"
					+ " is internal code, please use instead " + volunteerId);

		double eventHours = row.getCell(3).getNumericCellValue();
		EventVolunteerEntity eventVolunteer = new EventVolunteerEntity(getEvent(), volunteerId, eventHours);
		getEvent().getVolunteers().add(eventVolunteer);
	}

}
