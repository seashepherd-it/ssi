package it.seashepherd.servlet;

import java.nio.file.Paths;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import it.seashepherd.event.EventConnection;
import it.seashepherd.event.EventImporterMessage;
import it.seashepherd.event.EventImporterResult;
import it.seashepherd.event.EventUtils;

@MultipartConfig
public class EventImportServlet extends EventConnectionServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void execute(EventConnection eventConnection, HttpServletRequest request, HttpServletResponse response) {

		response.setContentType("text/json");

		try {
			for (Part filePart : request.getParts()) {

				if (!filePart.getName().equals("upload"))
					continue;

				String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
				EventImporterResult result = EventUtils.importFile(eventConnection, fileName, filePart.getInputStream());

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
		}
	}
}
