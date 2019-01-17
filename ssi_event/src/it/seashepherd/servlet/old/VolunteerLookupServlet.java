package it.seashepherd.servlet.old;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;
import it.seashepherd.servlet.EventConnectionServlet;

public class VolunteerLookupServlet extends EventConnectionServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response) {
		
		response.setContentType("text/json");
		
		String volunteerId = request.getParameter("volunteerId");
		
		try {
			String result = eventConnection.getDAO().getJSONVolunteer(volunteerId);
			response.getWriter().print(result.trim());
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
