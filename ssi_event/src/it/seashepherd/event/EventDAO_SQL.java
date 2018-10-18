package it.seashepherd.event;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class EventDAO_SQL {

	public static int getAreaIdByName(EventConnection connection, String name) throws SQLException {
		int areaId = -1;

		String areaName = name.trim().toUpperCase();
		Statement statement = connection.getSQLConnection().createStatement();
		ResultSet rs = statement
				.executeQuery("SELECT ID_SSI_AREA FROM ssi_area where UCASE(AN_SSI_AREA_V) = '" + areaName + "';");
		if (rs.next())
			areaId = rs.getInt(1);
		else
			areaId = -1;
		rs.close();
		statement.close();

		return areaId;
	}

	public static String getAreaTextById(EventConnection connection, int areaId) throws SQLException {

		if (areaId <= 0)
			return null;

		String areaText = null;

		PreparedStatement prepared = connection.getSQLConnection()
				.prepareStatement("SELECT AN_SSI_AREA_V FROM ssi_area where ID_SSI_AREA = ?");
		prepared.setInt(1, areaId);
		ResultSet rs = prepared.executeQuery();
		if (rs.next()) {
			areaText = rs.getString(1).trim();
		}

		rs.close();
		prepared.close();

		return areaText;
	}

	public static int getVolunteerIdByName(EventConnection connection, String volunteerName) throws Exception {

		int volunteerId = -1;

		PreparedStatement prepared = connection.getSQLConnection().prepareStatement(
				"SELECT ID_VOL FROM ssi_anagrafica where CONCAT(UCASE(REPLACE(AN_NAME, ' ', '')), UCASE(REPLACE(AN_SURNAME, ' ', ''))) = ? or CONCAT(UCASE(REPLACE(AN_SURNAME, ' ', '')), UCASE(REPLACE(AN_NAME, ' ', ''))) = ?");
		prepared.setString(1, volunteerName);
		prepared.setString(2, volunteerName);
		ResultSet rs = prepared.executeQuery();
		if (rs.next())
			volunteerId = rs.getInt(1);
		else
			volunteerId = -1;
		rs.close();
		prepared.close();

		return volunteerId;
	}

	public static String getVolunteerTextById(EventConnection connection, int volunteerId) throws SQLException {

		String volunteerText = null;

		PreparedStatement prepared = connection.getSQLConnection().prepareStatement(
				"SELECT CONCAT(TRIM(AN_SURNAME), ' ', TRIM(AN_NAME)) as VOL_TEXT FROM ssi_anagrafica where ID_VOL = ?");
		prepared.setInt(1, volunteerId);
		ResultSet rs = prepared.executeQuery();
		if (rs.next()) {
			volunteerText = rs.getString(1);
		}

		rs.close();
		prepared.close();

		return volunteerText;
	}

	public static String getVolunteerSurnameById(EventConnection connection, int volunteerId) throws SQLException {

		String volunteerText = null;

		PreparedStatement prepared = connection.getSQLConnection()
				.prepareStatement("SELECT AN_SURNAME FROM ssi_anagrafica where ID_VOL = ?");
		prepared.setInt(1, volunteerId);
		ResultSet rs = prepared.executeQuery();
		if (rs.next()) {
			volunteerText = rs.getString(1).trim();
		}

		rs.close();
		prepared.close();

		return volunteerText;
	}

	public static void saveEvent(EventConnection connection, EventEntity eventEntity) throws SQLException {

		boolean autoCommit = connection.getSQLConnection().getAutoCommit();
		try {
			connection.getSQLConnection().setAutoCommit(false);
			// event
			PreparedStatement preparedStatement = connection.getSQLConnection().prepareStatement(
					"insert into ssi_event (ssi_event_type, ssi_event_id, ssi_event_status, ssi_event_text, "
							+ "ssi_area_id, ssi_event_dive, ssi_event_date_from, ssi_event_date_to, "
							+ "ssi_event_place_country, ssi_event_place_province, ssi_event_place, "
							+ "ssi_event_account_id, ssi_event_argument, "
							+ "ssi_event_people_qty, ssi_event_receipts_qty, ssi_event_receipts_tot, ssi_event_note, "
							+ "ssi_disposal_material_kg, ssi_disposal_contact, "
							+ "ssi_institute_type, ssi_institute_name, ssi_institute_speaker, ssi_institute_contact, "
							+ "ssi_ship_name, ssi_ship_company, ssi_ship_document, ssi_ship_supplying, ssi_ship_material_name, ssi_ship_material_value"
							+ ") "
							+ "values (?, ?, '00', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

			preparedStatement.setString(1, eventEntity.getEventType().name());
			preparedStatement.setInt(2, eventEntity.getEventId());
			preparedStatement.setString(3, eventEntity.getEventText());
			preparedStatement.setInt(4, eventEntity.getAreaId());
			preparedStatement.setString(5, eventEntity.getEventDive());
			if (eventEntity.getEventDateFrom() != null)
				preparedStatement.setDate(6, new java.sql.Date(eventEntity.getEventDateFrom().getTime()));
			else
				preparedStatement.setDate(6, null);
			if (eventEntity.getEventDateTo() != null)
				preparedStatement.setDate(7, new java.sql.Date(eventEntity.getEventDateTo().getTime()));
			else
				preparedStatement.setDate(7, null);
			preparedStatement.setString(8, eventEntity.getEventPlaceCountry());
			preparedStatement.setString(9, eventEntity.getEventPlaceProvince());
			preparedStatement.setString(10, eventEntity.getEventPlace());
			preparedStatement.setInt(11, eventEntity.getEventAccountId());
			preparedStatement.setString(12, eventEntity.getEventArgument());
			preparedStatement.setInt(13, eventEntity.getEventPeopleQty());
			preparedStatement.setInt(14, eventEntity.getEventReceiptsQty());
			preparedStatement.setDouble(15, eventEntity.getEventReceiptsTot());
			preparedStatement.setString(16, eventEntity.getEventNote());
			preparedStatement.setInt(17, eventEntity.getDisposalMaterialKG());
			preparedStatement.setString(18, eventEntity.getDisposalContact());
			preparedStatement.setString(19, eventEntity.getInstituteType());
			preparedStatement.setString(20, eventEntity.getInstituteName());
			preparedStatement.setString(21, eventEntity.getInstituteSpeaker());
			preparedStatement.setString(22, eventEntity.getInstituteContact());
			preparedStatement.setString(23, eventEntity.getShipName());
			preparedStatement.setString(24, eventEntity.getShipCompany());
			preparedStatement.setString(25, eventEntity.getShipDocument());
			preparedStatement.setString(26, eventEntity.getShipSupplying());
			preparedStatement.setString(27, eventEntity.getShipMaterialName());
			preparedStatement.setDouble(28, eventEntity.getShipMaterialValue());
			preparedStatement.executeUpdate();

			// volunteers
			preparedStatement = connection.getSQLConnection().prepareStatement(
					"insert into ssi_event_volunteer (ssi_event_type, ssi_event_id, ssi_volunteer_id, ssi_event_hours) values (?, ?, ?, ?)");
			for (EventVolunteerEntity eventVolunteer : eventEntity.getVolunteers()) {
				preparedStatement.setString(1, eventEntity.getEventType().name());
				preparedStatement.setInt(2, eventEntity.getEventId());
				preparedStatement.setInt(3, eventVolunteer.getVolunteerId());
				preparedStatement.setDouble(4, eventVolunteer.getEventHours());
				preparedStatement.executeUpdate();
			}

			connection.getSQLConnection().commit();
		} finally {
			connection.getSQLConnection().setAutoCommit(autoCommit);
		}
	}

	public static String getJSONEvents(EventConnection connection, EventType eventType) {
		return null;
	}
}
