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

		try {
			String result = null;
			switch (request.getPathInfo()) {
			case "/getEventsByType.php":
				result = eventConnection.getDAO().getJSONEvents(EventType.valueOf(eventType));
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			case "/getEventByTypeId.php":
				result = eventConnection.getDAO().getJSONEvent(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			case "/getEventVolunteersByTypeId.php":
				result = eventConnection.getDAO().getJSONEventVolunteers(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			case "/deleteEvent.php":
				result = eventConnection.getDAO().deleteEvent(EventType.valueOf(eventType), eventId);
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			case "/saveEvent.php":
				String message = eventConnection.getDAO().saveEvent(event);
				response.getWriter().write(message);
				response.flushBuffer();
				break;
			case "/getVolunteers.php":
				result = eventConnection.getDAO().getJSONVolunteers();
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			case "/getUserInfo.php":
				result = eventConnection.getDAO().getJSONUserInfo();
				response.getWriter().print(result.trim());
				response.flushBuffer();
				break;
			default:
				break;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
