package it.seashepherd.event;

public class EventVolunteerEntity {

	private int volunteerId = 0;
	private double eventHours = 0;
	
	public EventVolunteerEntity(EventEntity event, int volunteerId, double eventHours) {
		this.volunteerId = volunteerId;
		this.eventHours = eventHours;
	}

	public int getVolunteerId() {
		return volunteerId;
	}

	public double getEventHours() {
		return eventHours;
	}
}