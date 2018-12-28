package it.seashepherd.event;

import org.apache.poi.ss.usermodel.Workbook;

public abstract class EventImporter {

	private EventConnection connection = null;
	private EventImporterResult result;
	private EventEntity event = null;
	private Workbook workbook = null;

	public EventImporter(EventConnection connection, EventEntity event, Workbook workbook) {
		this.connection = connection;
		this.event = event;
		this.result = new EventImporterResult();
		this.workbook = workbook;
	}
	
	protected EventConnection getConnection() {
		return connection;
	}

	protected EventEntity getEvent() {
		return event;
	}

	public EventImporterResult getResult() {
		return this.result;
	}

	protected Workbook getWorkbook() {
		return workbook;
	}

	protected void saveEvent() throws Exception {
		getConnection().getDAO().saveEvent(getConnection(), getEvent());
	}

	public abstract void importEvent() throws Exception;

	public static EventImporter create(EventConnection connection, EventEntity event, Workbook workbook) {

		EventImporter eventImporter = null;

		switch (event.getEventType()) {
		case DP:
			eventImporter = new EventImporterDP(connection, event, workbook);
			break;
		case EP:
			eventImporter = new EventImporterEP(connection, event, workbook);
			break;
		case EV:
			eventImporter = new EventImporterEV(connection, event, workbook);
			break;
		case PS:
			eventImporter = new EventImporterPS(connection, event, workbook);
			break;
		case PV:
			eventImporter = new EventImporterPV(connection, event, workbook);
			break;
		}

		return eventImporter;
	}

	protected void addError(String message) {
		getResult().addError(message);
	}

	protected void addWarning(String message) {
		getResult().addWarning(message);
	}

	protected void addInfo(String message) {
		getResult().addInfo(message);
	}
	
    protected String removeLastChar(String str) {
        return str.substring(0, str.length() - 1);
    }
    
    protected void normalizeText(String area) {

    	String[] areas = area.split(" ");
    	if(areas.length == 2) {
    		area = areas[0].substring(0, 1) + areas[1].substring(0, 1); 
    	}
    	
		String text = getEvent().getEventText();		
		if(text.substring(2, 3).equals(" ") && area.startsWith(text.substring(0, 2).toUpperCase())) {
			text = text.substring(3);
			getEvent().setEventText(text);
		}			
    }
    
    protected String getInstituteTypeIdByText(String text) {
    	
    	String ret = "";
    	
    	text = text.trim();
    	
    	if(text.equalsIgnoreCase("Superiori"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Secondaria"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Secondaria 1 grado"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Superiore 2 grado"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Primaria"))
    		ret = "P1";
    	else if(text.equalsIgnoreCase("Scuola Primaria"))
    		ret = "P1";    	
    	else if(text.equalsIgnoreCase("Superiore"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Secondaria secondo Grado"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Scuola secondaria di primo grado"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Secondaria Primo Grado"))
    		ret = "S1";    	
    	else if(text.equalsIgnoreCase("Primaria/Secondaria ! Grado"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Secondaria I grado"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Secondaria 2 grado"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Secondaria \" grado"))
    		ret = "S2";
    	else if(text.equalsIgnoreCase("Elementari"))
    		ret = "P1";
    	else if(text.equalsIgnoreCase("Elementare"))
    		ret = "P1";    	
    	else if(text.equalsIgnoreCase("Media"))
    		ret = "S1";
    	else if(text.equalsIgnoreCase("Medie"))
    		ret = "S1";
    	else
    		ret = "";
    	
    	return ret;
    }
}