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
import it.seashepherd.event.EventImporterMessage;
import it.seashepherd.event.EventImporterResult;
import it.seashepherd.event.EventUtils;

@MultipartConfig
public class EventImportServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {
		// Do required initialization
		"".toCharArray();
	}

	@Override
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

		response.setContentType("text/json");

		String ssi_user = getServletConfig().getInitParameter("ssi_user");
		String ssi_password = getServletConfig().getInitParameter("ssi_password");

		EventConnection connection = null;
		try {
			EventDAO.MODE mode = EventDAO.MODE.HTTP;
			connection = EventConnection.connect(mode, ssi_user, ssi_password);

			for (Part filePart : request.getParts()) {

				if (!filePart.getName().equals("upload"))
					continue;

				String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
				EventImporterResult result = EventUtils.importFile(connection, fileName, filePart.getInputStream());

				StringBuffer info = new StringBuffer();
				for (EventImporterMessage message : result.getMessages()) {
					if(message.isInfo())
						info.append(message.getMessage().replaceAll("\"", "\'") + "<br/>");
				}
				StringBuffer warning = new StringBuffer();
				for (EventImporterMessage message : result.getMessages()) {
					if(message.isWarning())
						warning.append(message.getMessage().replaceAll("\"", "\'") + "<br/>");
				}
				StringBuffer error = new StringBuffer();
				for (EventImporterMessage message : result.getMessages()) {
					if(message.isError())
						error.append(message.getMessage().replaceAll("\"", "\'") + "<br/>");
				}
				if (result.onError()) {
					response.getWriter().print("{ \"status\": \"error\", \"info\":\"" + info.toString() + "\", \"warning\":\"" + warning.toString() + "\", \"error\":\"" + error.toString() + "\" }");
				} else {
					response.getWriter().print("{ \"status\": \"server\", \"info\":\"" + info.toString() + "\", \"warning\":\"" + warning.toString() + "\" }");
				}

				response.getWriter().flush();
			}
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
