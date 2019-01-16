package it.seashepherd.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventDAO;

public abstract class EventConnectionServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public final void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	@Override
	public final void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		EventConnection eventConnection = getEventConnection(request, response);
		
		execute(eventConnection, request, response);
		
		try {
			eventConnection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	protected abstract void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response);
	
	private EventConnection getEventConnection(HttpServletRequest request, HttpServletResponse response) throws IOException {
				
//		System.out.println(request.getSession().getId());
		
		EventConnection connection = (EventConnection) request.getSession().getAttribute("ssi_connection");
		if(connection == null) {
			String ssi_user = getServletContext().getInitParameter("ssi_user");
			String ssi_password = getServletContext().getInitParameter("ssi_password");

			EventDAO.MODE mode = EventDAO.MODE.HTTP;
			try {
				connection = EventConnection.connect(mode, ssi_user, ssi_password);
//				request.getSession().setAttribute("ssi_connection", connection);
			} catch (Exception e) {
				response.getWriter().print(e.getMessage());
				response.flushBuffer();
			}			
		}		
		return connection;
	}
}