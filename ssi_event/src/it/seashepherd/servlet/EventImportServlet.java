package it.seashepherd.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventDAO;
import it.seashepherd.event.EventUtils;

@MultipartConfig
public class EventImportServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {
		// Do required initialization
		"".toCharArray();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");

		PrintWriter out = response.getWriter();
		out.println("<h1>Hello Crew!!</h1>");
	}

	public void destroy() {
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		
		String ssi_user = getServletConfig().getInitParameter("ssi_user");
		String ssi_password = getServletConfig().getInitParameter("ssi_password");
		
		EventConnection connection = null;
		try {
			EventDAO.MODE mode = EventDAO.MODE.HTTP;		
			connection = EventConnection.connect(mode, ssi_user, ssi_password, response.getWriter());

			for (Part filePart : request.getParts()) {
				if(!filePart.getName().equals("file"))
					continue;
				String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();								
				EventUtils.importFile(connection, fileName, filePart.getInputStream());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if(connection != null)
				try {
					connection.disconnect();
				} catch (Exception e) {
					e.printStackTrace();
				}
		}
	}
}
