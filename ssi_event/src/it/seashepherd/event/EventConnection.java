package it.seashepherd.event;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import it.seashepherd.event.EventDAO.MODE;

public class EventConnection implements AutoCloseable {

	private Object connection;
	private EventDAO dao = null;

	private EventConnection() {
	}

	private EventConnection(MODE mode, Object connection) {
		this.dao = new EventDAO(mode, this);
		this.connection = connection;
	}

	public EventDAO getDAO() {
		return dao;
	}

	public static EventConnection connect(MODE mode, String user, String password) throws Exception {

		switch (mode) {
		case HTTP:
			return new EventConnection(mode, new HttpConnection(user, password));

		case SQL:
			Class.forName("org.mariadb.jdbc.Driver");
			return new EventConnection(mode, DriverManager
					.getConnection("jdbc:mysql://localhost/ssi?" + "user=" + user + "&password=" + password));
		}

		return null;
	}

	public Connection getSQLConnection() {
		if (connection instanceof Connection)
			return (Connection) connection;
		return null;
	}

	public HttpConnection getHttpConnection() {
		if (connection instanceof HttpConnection)
			return (HttpConnection) connection;
		else
			return null;
	}

	@Override
	public void close() throws IOException {
		disconnect();
	}

	protected void disconnect() throws IOException {

		"".toString();

		try {
			if (getSQLConnection() != null)
				getSQLConnection().close();
		} catch (SQLException e) {
			throw new IOException(e);
		}

		try {
			if (getHttpConnection() != null)
				getHttpConnection().logout();
		} catch (Exception e) {
			throw new IOException(e);
		}
	}
}
