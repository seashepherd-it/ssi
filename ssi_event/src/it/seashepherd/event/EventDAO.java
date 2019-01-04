package it.seashepherd.event;

public class EventDAO {

	private MODE mode = null;

	public enum MODE {
		SQL, HTTP;
	}

	public EventDAO(MODE mode) {
		this.mode = mode;
	}
	
	public MODE getMode() {
		return mode;
	}
	
	public int getAreaIdByName(EventConnection connection, String name) throws Exception {
		if (name == null)
			return -1;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getAreaIdByName(connection, name);
		case SQL:
			return EventDAO_SQL.getAreaIdByName(connection, name);
		}

		return -1;
	}

	public String getAreaTextById(EventConnection connection, int areaId) throws Exception {
		if (areaId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getAreaTextById(connection, areaId);
		case SQL:
			return EventDAO_SQL.getAreaTextById(connection, areaId);
		}

		return null;
	}

	public int getVolunteerIdByName(EventConnection connection, String name) throws Exception {
		if (name.trim().isEmpty())
			return -1;

		String volunteerName = "";
		String[] volunteerTokens = name.split(" ");
		for (int i = 0; i < volunteerTokens.length; i++) {
			volunteerName += volunteerTokens[i].trim().toUpperCase();
		}

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerIdByName(connection, volunteerName);
		case SQL:
			return EventDAO_SQL.getVolunteerIdByName(connection, volunteerName);
		}

		return -1;
	}

	public String getVolunteerTextById(EventConnection connection, int volunteerId) throws Exception {
		if (volunteerId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerTextById(connection, volunteerId);
		case SQL:
			return EventDAO_SQL.getVolunteerTextById(connection, volunteerId);
		}

		return null;
	}

	public String getVolunteerSurnameById(EventConnection connection, int volunteerId) throws Exception {
		if (volunteerId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerSurnameById(connection, volunteerId);
		case SQL:
			return EventDAO_SQL.getVolunteerSurnameById(connection, volunteerId);
		}

		return null;
	}

	public void saveEvent(EventConnection connection, EventEntity event) throws Exception {

		switch (mode) {
		case HTTP:
			EventDAO_HTTP.saveEvent(connection, event);
			break;
		case SQL:
			EventDAO_SQL.saveEvent(connection, event);
			break;
		}
	}

	public String getJSONEvents(EventConnection connection, EventType eventType) throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONEvents(connection, eventType);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONEvents(connection, eventType);
			break;
		}
		
		return json;
	}


	public String getJSONVolunteers(EventConnection connection) throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONVolunteers(connection);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONVolunteers(connection);
			break;
		}
		
		return json;
	}
	
	public String deleteEvent(EventConnection connection, EventType eventType, String eventId) throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.deleteEvent(connection, eventType, eventId);
			break;
		case SQL:
			json = EventDAO_SQL.deleteEvent(connection, eventType, eventId);
			break;
		}
		
		return json;
	}
}
