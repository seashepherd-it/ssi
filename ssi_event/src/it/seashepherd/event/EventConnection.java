package it.seashepherd.event;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;

import it.seashepherd.event.EventDAO.MODE;

public class EventConnection {

	private Object connection;
	private EventDAO dao = null;
	private PrintWriter writer;
	
	private EventConnection() {
	}

	private EventConnection(MODE mode, Object connection, PrintWriter writer) {
		this.dao = new EventDAO(mode);
		this.connection = connection;
		this.writer = writer;
	}

	public EventDAO getDAO() {
		return dao;
	}

	protected PrintWriter getWriter() {
		return writer;
	}
	
	public static EventConnection connect(MODE mode, String user, String password, PrintWriter writer) throws Exception {

		switch (mode) {
		case HTTP:
			return new EventConnection(mode, new HttpConnection("Mattia.R", "sea6321"), writer);

		case SQL:
			Class.forName("org.mariadb.jdbc.Driver");
			return new EventConnection(mode, DriverManager
					.getConnection("jdbc:mysql://localhost/ssi?" + "user=" + user + "&password=" + password), writer);
		}
		return null;
	}

	public Connection getSQLConnection() {
		if(connection instanceof Connection)
			return (Connection)connection;
		return null;
	}

	public HttpConnection getHttpConnection() {
		if(connection instanceof HttpConnection)
			return (HttpConnection)connection;
		else
			return null;
	}

	public void disconnect() throws Exception {

		Exception e = null;
		try {
			if (getSQLConnection() != null)
				getSQLConnection().close();
		} catch (Exception e1) {
			e = e1;
		}

		try {
			if (getHttpConnection() != null)
				getHttpConnection().logout();
		} catch (Exception e2) {
			if (e == null)
				e = e2;
		}

		if (e != null)
			throw e;
	}
}
