package it.seashepherd.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;

public class EventSaveServlet extends EventConnectionServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response) {
		
		response.setContentType("text/json");

		String event = request.getParameter("event");
		try {			
			String message = eventConnection.getDAO().saveEvent(event);
			response.getWriter().write(message);
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
