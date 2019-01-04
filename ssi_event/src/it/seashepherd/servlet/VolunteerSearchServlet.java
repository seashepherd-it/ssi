package it.seashepherd.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventDAO;

@MultipartConfig
public class VolunteerSearchServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {
		// Do required initialization
		"".toCharArray();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setContentType("text/json");
		
		String ssi_user = getServletConfig().getInitParameter("ssi_user");
		String ssi_password = getServletConfig().getInitParameter("ssi_password");
		
		EventConnection connection = null;
		try {
			EventDAO.MODE mode = EventDAO.MODE.HTTP;
			connection = EventConnection.connect(mode, ssi_user, ssi_password);
			
			
			String result = connection.getDAO().getJSONVolunteers(connection);
			response.getWriter().print(result.trim());
			response.flushBuffer();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (connection != null)
				try {
					connection.disconnect();
				} catch (Exception e) {
					e.printStackTrace();
				}
		}
	}
}