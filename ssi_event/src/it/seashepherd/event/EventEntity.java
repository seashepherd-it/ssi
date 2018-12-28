package it.seashepherd.event;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EventEntity {

	private EventType eventType = null;
	private int eventId = 0;
	private String eventStatus = null;
	private String eventText = null;
	private int areaId;	
	private String eventDive = null;
	private Date eventDateFrom = null;
	private Date eventDateTo = null;
	private String eventPlace = null;
	private String eventPlaceCountry = "Italy";
	private String eventPlaceProvince = null;	
	private int eventAccountId = 0;
	private String eventArgument = null;
	private int eventPeopleQty = 0;
	private int eventReceiptsQty = 0;
	private double eventReceiptsTot = 0;
	private String eventNote = null;
	private String eventLink = null;
	private int disposalMaterialKG = 0;
	private String disposalContact;
	private String instituteTypeId = null;
	private String instituteName = null;
	private String instituteSpeaker = null;
	private String instituteContact = null;
	private String shipName = null;
	private String shipCompany = null;
	private String shipDocument = null;
	private String shipSupplying = null;
	private String shipMaterialName = null;
	private double shipMaterialValue = 0;
	
	private List<EventVolunteerEntity> volunteers = null;
	
	public EventEntity(EventType eventType, int eventId, String eventText) {
		this.eventType = eventType;
		this.eventId = eventId;
		this.eventText = eventText;
		volunteers = new ArrayList<>();
	}
	
	public EventType getEventType() {
		return eventType;
	}
	
	public String getEventTypeName() {
		return getEventType().name();
	}

	public int getEventId() {
		return eventId;
	}

	public String getEventText() {
		return eventText;
	}

	public void setEventText(String text) {
		this.eventText = text;
	}

	public String getEventStatus() {
		return eventStatus;
	}

	public void setEventStatus(String eventStatus) {
		this.eventStatus = eventStatus;
	}
	
	public List<EventVolunteerEntity> getVolunteers() {
		return volunteers;
	}

	public int getAreaId() {
		return areaId;
	}

	public void setAreaId(int areaId) {
		this.areaId = areaId;
	}

	public String getEventDive() {
		return eventDive;
	}

	public void setEventDive(String eventDive) {
		this.eventDive = eventDive;
	}

	public String getEventPlace() {
		return eventPlace;
	}

	public void setEventPlace(String eventPlace) {
		this.eventPlace = eventPlace;
	}

	public Date getEventDateFrom() {
		return eventDateFrom;
	}

	public long getEventTimeFrom() {
		if(getEventDateFrom() != null)
			return getEventDateFrom().getTime();
		else
			return 0;
	}
	
	public void setEventDateFrom(Date eventDate) {
		this.eventDateFrom = eventDate;
	}

	public int getEventAccountId() {
		return eventAccountId;
	}

	public void setEventAccountId(int eventAccountId) {
		this.eventAccountId = eventAccountId;
	}

	public int getDisposalMaterialKG() {
		return disposalMaterialKG;
	}

	public void setDisposalMaterialKG(int eventMaterialKG) {
		this.disposalMaterialKG = eventMaterialKG;
	}

	public String getDisposalContact() {
		return disposalContact;
	}

	public void setDisposalContact(String contactDisposal) {
		this.disposalContact = contactDisposal;
	}

	public int getEventPeopleQty() {
		return eventPeopleQty;
	}

	public void setEventPeopleQty(int eventPeopleQty) {
		this.eventPeopleQty = eventPeopleQty;
	}

	public int getEventReceiptsQty() {
		return eventReceiptsQty;
	}

	public void setEventReceiptsQty(int eventReceiptsQty) {
		this.eventReceiptsQty = eventReceiptsQty;
	}

	public double getEventReceiptsTot() {
		return eventReceiptsTot;
	}

	public void setEventReceiptsTot(double eventReceiptsTot) {
		this.eventReceiptsTot = eventReceiptsTot;
	}

	public String getEventArgument() {
		return eventArgument;
	}

	public void setEventArgument(String eventArgument) {
		this.eventArgument = eventArgument;
	}

	public String getEventNote() {
		return eventNote;
	}

	public void setEventNote(String eventNote) {
		this.eventNote = eventNote;
	}

	public String getEventLink() {
		return eventLink;
	}

	public void setEventLink(String eventLink) {
		this.eventLink = eventLink;
	}

	public String getInstituteTypeId() {
		return instituteTypeId;
	}

	public void setInstituteTypeId(String instituteType) {
		this.instituteTypeId = instituteType;
	}

	public String getInstituteName() {
		return instituteName;
	}

	public void setInstituteName(String instituteName) {
		this.instituteName = instituteName;
	}

	public String getInstituteContact() {
		return instituteContact;
	}

	public void setInstituteContact(String instituteContact) {
		this.instituteContact = instituteContact;
	}

	public String getInstituteSpeaker() {
		return instituteSpeaker;
	}

	public void setInstituteSpeaker(String instituteSpeaker) {
		this.instituteSpeaker = instituteSpeaker;
	}

	public String getShipName() {
		return shipName;
	}

	public void setShipName(String shipName) {
		this.shipName = shipName;
	}

	public String getShipCompany() {
		return shipCompany;
	}

	public void setShipCompany(String shipCompany) {
		this.shipCompany = shipCompany;
	}

	public String getShipDocument() {
		return shipDocument;
	}

	public void setShipDocument(String shipDocument) {
		this.shipDocument = shipDocument;
	}

	public String getShipSupplying() {
		return shipSupplying;
	}

	public void setShipSupplying(String shipSupplying) {
		this.shipSupplying = shipSupplying;
	}

	public String getShipMaterialName() {
		return shipMaterialName;
	}

	public void setShipMaterialName(String shipMaterialName) {
		this.shipMaterialName = shipMaterialName;
	}

	public double getShipMaterialValue() {
		return shipMaterialValue;
	}

	public void setShipMaterialValue(double shipMaterialValue) {
		this.shipMaterialValue = shipMaterialValue;
	}

	public Date getEventDateTo() {
		return eventDateTo;
	}

	public long getEventTimeTo() {
		if(getEventDateTo() != null)
			return getEventDateTo().getTime();
		else
			return 0;
	}

	public void setEventDateTo(Date eventDateTo) {
		this.eventDateTo = eventDateTo;
	}

	public String getEventPlaceProvince() {
		return eventPlaceProvince;
	}

	public void setEventPlaceProvince(String eventPlaceProvince) {
		this.eventPlaceProvince = eventPlaceProvince;
	}

	public String getEventPlaceCountry() {
		return eventPlaceCountry;
	}

	public void setEventPlaceCountry(String eventPlaceCountry) {
		this.eventPlaceCountry = eventPlaceCountry;
	}
}
