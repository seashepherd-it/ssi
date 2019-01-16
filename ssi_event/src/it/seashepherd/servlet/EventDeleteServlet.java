package it.seashepherd.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventType;

public class EventDeleteServlet extends EventConnectionServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response) {
		
		response.setContentType("text/json");

		String eventType = request.getParameter("eventType");
		String eventId =  request.getParameter("eventId");
		
		try {			
			String result = eventConnection.getDAO().deleteEvent(EventType.valueOf(eventType), eventId);
			response.getWriter().print(result.trim());
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
