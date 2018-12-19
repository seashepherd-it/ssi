package it.seashepherd.event;

import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class EventImporterDP extends EventImporter {

	private ParsingStatus parsingStatus = null;

	public enum ParsingStatus {
		NONE, HEADER, VOLUNTEERS;
	};

	public EventImporterDP(EventConnection connection, EventEntity event, Workbook workbook) {
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
					parsingStatus = ParsingStatus.VOLUNTEERS;
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
			case VOLUNTEERS:
				if (nextRow.getCell(1) == null || nextRow.getCell(1).getStringCellValue().trim().isEmpty())
					continue;

				buildVolunteer(nextRow);
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

		getEvent().setEventDive(row.getCell(1).getStringCellValue());
		getEvent().setEventDateFrom(row.getCell(2).getDateCellValue());
		getEvent().setEventDateTo(row.getCell(3).getDateCellValue());

		EventUtils.setProvincePlace(getEvent(), row.getCell(5).getStringCellValue(),
				row.getCell(4).getStringCellValue());

		// decode account
		String account = row.getCell(6).getStringCellValue();
		int accountId = getConnection().getDAO().getVolunteerIdByName(getConnection(), account);
		if (accountId < 0)
			addError("Account not found: " + account);
		getEvent().setEventAccountId(accountId);

		int material_qty = 0;
		try {
			material_qty = (int) row.getCell(7).getNumericCellValue();
		} catch (Exception e1) {
			material_qty = EventUtils.normalizeMaterialQty(row.getCell(7).getStringCellValue());
			if (material_qty < 0)
				addWarning("Invalid material: " + row.getCell(7).getStringCellValue());
		}
		getEvent().setDisposalMaterialKG(material_qty);
		getEvent().setDisposalContact(row.getCell(8).getStringCellValue());
		getEvent().setEventPeopleQty((int) row.getCell(9).getNumericCellValue());
		try {
			getEvent().setEventReceiptsQty((int) row.getCell(11).getNumericCellValue());
		} catch (Exception e) {
		}
		try {
			getEvent().setEventReceiptsTot((double) row.getCell(16).getNumericCellValue());
		} catch (Exception e) {
		}
		if (row.getCell(24) != null)
			getEvent().setEventNote(row.getCell(24).getStringCellValue());
		if (row.getCell(25) != null)
			getEvent().setEventLink(row.getCell(25).getStringCellValue());
		else
			getEvent().setEventLink("");
	}

	private void buildVolunteer(Row row) throws Exception {

		// volunteer
		String volunteer = row.getCell(1).getStringCellValue().trim();
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
}