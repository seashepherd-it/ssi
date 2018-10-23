package it.seashepherd.event;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class EventUtils {
	
	public static int normalizeMaterialQty(String material_qty_str) {

		int material_qty = -1;

		try {
			material_qty_str = material_qty_str.replaceAll("kg", "").trim();
			material_qty_str = material_qty_str.replaceAll("Kg", "").trim();
			material_qty_str = material_qty_str.replaceAll("KG", "").trim();
			material_qty = Integer.parseInt(material_qty_str);
		} catch (Exception e2) {
			e2.printStackTrace();
		}

		return material_qty;
	}

	public static void setProvincePlace(EventEntity event, String province, String place) {

		int i1 = place.indexOf("(");
		if (i1 > 0) {
			int i2 = place.indexOf(")");
			if (i2 > 0)
				if (province == null || province.isEmpty())
					province = place.substring(i1 + 1, i2);
			place = place.substring(0, i1 - 1);
		}
		event.setEventPlace(place);
		if(province != null)
			event.setEventPlaceProvince("IT-" + province.toUpperCase());
	}
	
	public static EventImporterResult importFile(EventConnection connection, File excelFilePath) throws IOException {
		FileInputStream inputStream = new FileInputStream(excelFilePath);
		return importFile(connection, excelFilePath.getName(), inputStream);
	}
	
	public static EventImporterResult importFile(EventConnection connection, String fileName, InputStream inputStream) throws IOException {

		String[] nameTokens = fileName.split(" ");
		String eventFileName = nameTokens[0];

		EventType eventType = EventType.valueOf(eventFileName.substring(0, 2));
		int eventId = Integer.parseInt(eventFileName.substring(2));
		String eventText = "";
		for (int i = 3; i < nameTokens.length; i++) {
			eventText += " " + nameTokens[i];
		}
		eventText = eventText.trim().replaceAll(".xlsx", "");

		EventEntity event = new EventEntity(eventType, eventId, eventText);
		EventImporter eventImporter = null;
		
		Workbook workbook = new XSSFWorkbook(inputStream);
		try {
			eventImporter = EventImporter.create(connection, event, workbook);
			eventImporter.addInfo(fileName);
			eventImporter.importEvent();

		} catch (Exception e) {
			eventImporter.addError(e.getMessage());
		} finally {
			workbook.close();
		}
		
		return eventImporter.getResult();
	}
	
	public static void importDirectory(EventConnection connection, File file) throws IOException {
		
		File[] files = file.listFiles();
		Arrays.sort(files);

		for (File excelFilePath : files) {

			if (excelFilePath.isDirectory())
				continue;

			if (excelFilePath.getName().contains("~lock"))
				continue;

			if (excelFilePath.getName().startsWith("."))
				continue;

			importFile(connection, excelFilePath);
		}		
	}
}
