package it.seashepherd.event;

import java.io.File;

public class EventImportLauncher {

	public static void main(String[] args) throws Exception {

		EventDAO.MODE mode = EventDAO.MODE.valueOf(args[0]);		
		EventConnection connection = null;
		
		try {
			connection = EventConnection.connect(mode, args[1], args[2]);

			String excelFileDir = args[3];
			
			File file = new File(excelFileDir);
			if(file.isDirectory())
				EventUtils.importDirectory(connection, file);
			else
				EventUtils.importFile(connection, file);

		} finally {
			if(connection != null)
				connection.disconnect();
		}
	}
}
