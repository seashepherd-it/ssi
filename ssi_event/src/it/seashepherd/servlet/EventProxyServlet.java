package it.seashepherd.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventType;

public class EventProxyServlet extends EventConnectionServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response) {

		response.setContentType("text/json");

		String eventType = request.getParameter("eventType");
		String eventId = request.getParameter("eventId");
		String event = request.getParameter("event");
		
		switch (request.getPathInfo()) {
		case "/getEventsByType.php":	
			try {
				String result = eventConnection.getDAO().getJSONEvents(EventType.valueOf(eventType));
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case "/getEventByTypeId.php":			
			try {			
				String result = eventConnection.getDAO().getJSONEvent(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case "/getEventVolunteersByTypeId.php":
			try {			
				String result = eventConnection.getDAO().getJSONEventVolunteers(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case "/deleteEvent.php":		
			try {			
				String result = eventConnection.getDAO().deleteEvent(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}			
			break;
		case "/saveEvent.php":
			try {			
				String message = eventConnection.getDAO().saveEvent(event);
				response.getWriter().write(message);
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case "/getVolunteers.php":			
			try {			
				String result = eventConnection.getDAO().getJSONVolunteers();
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case "/getUserInfo.php":
			try {
				String result = eventConnection.getDAO().getJSONUserInfo();
				response.getWriter().print(result.trim());
				response.flushBuffer();
			} catch (Exception e) {
				e.printStackTrace();
			} 
			break;
		default:
			break;
		}
	}
}
