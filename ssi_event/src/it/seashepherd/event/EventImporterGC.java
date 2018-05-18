package it.seashepherd.event;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class EventImporterGC extends EventImporter {

	private ParsingStatus parsingStatus = null;
	
	public enum ParsingStatus {
		NONE, HEADER;
	};

	public EventImporterGC(EventConnection connection, EventEntity event, Workbook workbook) {
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
				if (parsingStatus == null
						&& cell.getStringCellValue().equalsIgnoreCase("Imbarcazione")) {
					parsingStatus = ParsingStatus.HEADER;
					nextRow = rows.next();
				}				
			}

			switch (parsingStatus) {
			case HEADER:
				if(nextRow.getCell(1) == null || nextRow.getCell(1).getStringCellValue().trim().isEmpty())
					continue;

				buildHeader(nextRow);
				saveEvent();
				break;
			case NONE:
				break;
			}
		}	
	}

	private void buildHeader(Row row) throws SQLException, ParseException {
		
		getEvent().setEventDateFrom(row.getCell(0).getDateCellValue());
		getEvent().setShipName(row.getCell(1).getStringCellValue());
		getEvent().setShipCompany(row.getCell(2).getStringCellValue());
		getEvent().setShipDocument(row.getCell(3).getStringCellValue());
		getEvent().setShipSupplying(row.getCell(4).getStringCellValue());
		getEvent().setShipMaterialName(row.getCell(5).getStringCellValue());
		getEvent().setShipMaterialValue(row.getCell(6).getNumericCellValue());		
		
		// note
		if(row.getCell(7) != null)
			getEvent().setEventNote(row.getCell(7).getStringCellValue());
		
	}
}
