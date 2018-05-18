package it.seashepherd.event;

public class EventVolunteerEntity {

	private String eventType = null;
	private int eventId = 0;
	private int volunteerId = 0;
	private double eventHours = 0;
	
	public EventVolunteerEntity(EventEntity event, int volunteerId, double eventHours) {
		this.eventType = event.getEventType().name();
		this.eventId = event.getEventId();
		this.volunteerId = volunteerId;
		this.eventHours = eventHours;
	}

	public String getEventType() {
		return eventType;
	}

	public int getEventId() {
		return eventId;
	}

	public int getVolunteerId() {
		return volunteerId;
	}

	public double getEventHours() {
		return eventHours;
	}
}