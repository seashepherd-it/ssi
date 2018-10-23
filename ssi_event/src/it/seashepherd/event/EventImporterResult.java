package it.seashepherd.event;

import java.util.ArrayList;
import java.util.List;

import it.seashepherd.event.EventImporterMessage.MessageType;

public class EventImporterResult {

	private List<EventImporterMessage> messages = null;

	public EventImporterResult() {
		this.messages = new ArrayList<EventImporterMessage>();
	}

	public boolean onError() {
		for(EventImporterMessage message: messages) {
			if(message.isError())
				return true;
		}
		return false;
	}

	public List<EventImporterMessage> getMessages() {
		return this.messages;
	} 
	
	public void addInfo(String message) {
		this.messages.add(new EventImporterMessage(MessageType.INFO, message));		
	}
	public void addWarning(String message) {
		this.messages.add(new EventImporterMessage(MessageType.WARNING, message));		
	}

	public void addError(String message) {
		this.messages.add(new EventImporterMessage(MessageType.ERROR, message));
	}
}
