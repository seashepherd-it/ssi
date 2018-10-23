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
		case GC:
			eventImporter = new EventImporterGC(connection, event, workbook);
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
}