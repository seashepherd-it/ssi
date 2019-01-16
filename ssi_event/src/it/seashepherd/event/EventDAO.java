package it.seashepherd.event;

public class EventDAO {

	private MODE mode = null;
	private EventConnection eventConnection = null;
	
	public enum MODE {
		SQL, HTTP;
	}

	public EventDAO(MODE mode, EventConnection eventConnection) {
		this.mode = mode;
		this.eventConnection = eventConnection;
	}
	
	public MODE getMode() {
		return mode;
	}
	
	public int getAreaIdByName(String name) throws Exception {
		if (name == null)
			return -1;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getAreaIdByName(eventConnection, name);
		case SQL:
			return EventDAO_SQL.getAreaIdByName(eventConnection, name);
		}

		return -1;
	}

	public String getAreaTextById(int areaId) throws Exception {
		if (areaId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getAreaTextById(eventConnection, areaId);
		case SQL:
			return EventDAO_SQL.getAreaTextById(eventConnection, areaId);
		}

		return null;
	}

	public int getVolunteerIdByName(String name) throws Exception {
		if (name.trim().isEmpty())
			return -1;

		String volunteerName = "";
		String[] volunteerTokens = name.split(" ");
		for (int i = 0; i < volunteerTokens.length; i++) {
			volunteerName += volunteerTokens[i].trim().toUpperCase();
		}

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerIdByName(eventConnection, volunteerName);
		case SQL:
			return EventDAO_SQL.getVolunteerIdByName(eventConnection, volunteerName);
		}

		return -1;
	}

	public String getVolunteerTextById(int volunteerId) throws Exception {
		if (volunteerId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerTextById(eventConnection, volunteerId);
		case SQL:
			return EventDAO_SQL.getVolunteerTextById(eventConnection, volunteerId);
		}

		return null;
	}

	public String getVolunteerSurnameById(int volunteerId) throws Exception {
		if (volunteerId <= 0)
			return null;

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.getVolunteerSurnameById(eventConnection, volunteerId);
		case SQL:
			return EventDAO_SQL.getVolunteerSurnameById(eventConnection, volunteerId);
		}

		return null;
	}

	public void saveEvent(EventEntity event) throws Exception {

		switch (mode) {
		case HTTP:
			EventDAO_HTTP.saveEvent(eventConnection, event);
			break;
		case SQL:
			EventDAO_SQL.saveEvent(eventConnection, event);
			break;
		}
	}
	
	public String saveEvent(String jsonEvent) throws Exception {

		switch (mode) {
		case HTTP:
			return EventDAO_HTTP.saveEvent(eventConnection, jsonEvent);
		case SQL:
			return EventDAO_SQL.saveEvent(eventConnection, jsonEvent);
		}
		return null;
	}

	public String getJSONEvents(EventType eventType) throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONEvents(eventConnection, eventType);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONEvents(eventConnection, eventType);
			break;
		}
		
		return json;
	}

	public String getJSONEvent(EventType eventType, String eventId) throws Exception {
		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONEvent(eventConnection, eventType, eventId);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONEvent(eventConnection, eventType, eventId);
			break;
		}
		
		return json;
	}

	public String getJSONEventVolunteers(EventType eventType, String eventId) throws Exception {
		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONEventVolunteers(eventConnection, eventType, eventId);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONEventVolunteers(eventConnection, eventType, eventId);
			break;
		}
		
		return json;
	}
	
	public String getJSONVolunteers() throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONVolunteers(eventConnection);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONVolunteers(eventConnection);
			break;
		}
		
		return json;
	}
	
	public String deleteEvent(EventType eventType, String eventId) throws Exception {

		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.deleteEvent(eventConnection, eventType, eventId);
			break;
		case SQL:
			json = EventDAO_SQL.deleteEvent(eventConnection, eventType, eventId);
			break;
		}
		
		return json;
	}

	public String getJSONVolunteer(String volunteerId) throws Exception {
		
		String json = null;
		switch (mode) {
		case HTTP:
			json = EventDAO_HTTP.getJSONVolunteer(eventConnection, volunteerId);
			break;
		case SQL:
			json = EventDAO_SQL.getJSONVolunteer(eventConnection, volunteerId);
			break;
		}
		
		return json;
	}
}
