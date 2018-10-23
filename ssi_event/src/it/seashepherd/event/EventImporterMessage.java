package it.seashepherd.event;

public class EventImporterMessage {

	public static enum MessageType {
		INFO, WARNING, ERROR;
	}  

	private MessageType type = null;
	private String message = null;
	
	public EventImporterMessage(MessageType type, String message) {
		this.type = type;
		this.message = message;
	}
	
	public boolean isInfo() {
		return MessageType.INFO.equals(type);
	}
	
	public boolean isWarning() {
		return MessageType.WARNING.equals(type);		
	}
	
	public boolean isError() {
		return MessageType.ERROR.equals(type);
	}
	
	public String getMessage() {
		return this.message;
	}
}
