package it.seashepherd.event;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import it.seashepherd.http.HttpUtils;

public class EventDAO_HTTP {

	private static final String ERROR = "ERROR";

	public static int getAreaIdByName(EventConnection connection, String name) throws Exception {

		int areaId = -1;

		String url = "https://www.weit.it/mos/services/getAreaIdByName.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("areaName", name);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		JSONArray array = new JSONArray(result);
		if(array.length() < 1)
			return areaId;

		areaId = array.getJSONObject(0).getInt("ID_SSI_AREA");

		return areaId;
	}

	public static String getAreaTextById(EventConnection connection, int areaId) throws Exception {

		String areaText = null;

		String url = "https://www.weit.it/mos/services/getAreaTextById.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("areaId", Integer.toString(areaId));
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		JSONArray array = new JSONArray(result);
		if(array.length() < 1)
			return areaText;

		areaText = array.getJSONObject(0).getString("AN_SSI_AREA_V");
		
		return areaText;
	}

	public static int getVolunteerIdByName(EventConnection connection, String volunteerName) throws Exception {

		int volunteerId = -1;

		String url = "https://www.weit.it/mos/services/getVolunteerIdByName.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("volunteerName", volunteerName);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		JSONArray array = new JSONArray(result);
		if(array.length() < 1)
			return volunteerId;

		volunteerId = array.getJSONObject(0).getInt("ID_VOL");

		return volunteerId;
	}
	
	public static String getVolunteerTextById(EventConnection connection, int volunteerId) throws Exception {

		String volunteerText = null;

		String url = "https://www.weit.it/mos/services/getVolunteerTextById.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("volunteerId", Integer.toString(volunteerId));
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));
		
		JSONArray array = new JSONArray(result);
		if(array.length() < 1)
			return volunteerText;

		volunteerText = array.getJSONObject(0).getString("VOL_TEXT");
		
		return volunteerText;
	}
	
	public static String getVolunteerSurnameById(EventConnection connection, int volunteerId) throws Exception {

		String volunteerText = null;

		String url = "https://www.weit.it/mos/services/getVolunteerSurnameById.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("volunteerId", Integer.toString(volunteerId));
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		JSONArray array = new JSONArray(result);
		if(array.length() < 1)
			return volunteerText;

		volunteerText = array.getJSONObject(0).getString("AN_SURNAME");
		
		return volunteerText;
	}

	public static void saveEvent(EventConnection connection, EventEntity event) throws Exception {
		
		String url = "https://www.weit.it/mos/services/saveEvent.php";
		Map<String, String> params = new HashMap<String, String>();
		
		String json = new JSONObject(event).toString();
		params.put("event", json);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params)).trim();
		
		if(result.startsWith(ERROR))
			throw new Exception(result.substring(6));
	}

	public static String saveEvent(EventConnection connection, String jsonEvent) throws Exception {
		String url = "https://www.weit.it/mos/services/saveEvent.php";
		Map<String, String> params = new HashMap<String, String>();		
		params.put("event", jsonEvent);
		params.put("replace", "true");
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params)).trim();

		return result;
	}

	public static String getJSONEvents(EventConnection connection, EventType eventType) throws Exception {

		String url = "https://www.weit.it/mos/services/getEventsByType.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("eventType", eventType.name());
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}

	public static String getJSONEvent(EventConnection connection, EventType eventType, String eventId) throws Exception {
		String url = "https://www.weit.it/mos/services/getEventByTypeId.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("eventType", eventType.name());
		params.put("eventId", eventId);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}

	public static String getJSONEventVolunteers(EventConnection connection, EventType eventType, String eventId) throws Exception {

		String url = "https://www.weit.it/mos/services/getEventVolunteersByTypeId.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("eventType", eventType.name());		
		params.put("eventId", eventId);		
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}
	
	public static String deleteEvent(EventConnection connection, EventType eventType, String eventId) throws Exception {

		String url = "https://www.weit.it/mos/services/deleteEvent.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("eventType", eventType.name());
		params.put("eventId", eventId);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}

	public static String getJSONVolunteers(EventConnection connection) throws Exception {

		String url = "https://www.weit.it/mos/services/getVolunteers.php";
		Map<String, String> params = new HashMap<String, String>();
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}

	public static String getJSONVolunteer(EventConnection connection, String volunteerId) throws Exception {

		String url = "https://www.weit.it/mos/services/getVolunteerById.php";
		Map<String, String> params = new HashMap<String, String>();
		if(volunteerId != null)
			params.put("volunteerId", volunteerId);
		String result = connection.getHttpConnection().postHttpPage(url, HttpUtils.getParamsString(params));

		return result;
	}
}
