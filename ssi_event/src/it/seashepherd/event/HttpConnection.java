package it.seashepherd.event;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import it.seashepherd.http.HttpUtils;

public class HttpConnection {

//	private static final String USER_AGENT = "Mozilla/5.0";

	private String cookies = null; 
	
	public HttpConnection() {
		// cookies
		cookies = retrieveCookies("https://www.weit.it/mos");
//		System.out.print("cookies: " + cookies);
	}
	
	public HttpConnection(String user, String password) {
		this();
		
		login(user, password);
	}
	
	public void login(String user, String password) {
		
		String url = "https://www.weit.it/mos/checklogin.php";
		Map<String, String> params = new HashMap<String, String>();
		params.put("myusername", user);
		params.put("mypassword", password);
		params.put("submit", "LOGIN");
//		params.put("CLI_IP", "94.36.124.31");
		try {
			String page = postHttpPage(url, HttpUtils.getParamsString(params));
			page.toCharArray();
//			System.out.println(page);
		}
		catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	
	public void logout() {

		// logout
		String url = "https://www.weit.it/mos/logout.php";
		try {
			String page = postHttpPage(url, "");
			page.toCharArray();
//			System.out.println(page);
		}
		catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	
	public String postHttpPage(String url, String urlParameters) throws Exception {
//		System.out.println("\nSending 'POST' request to URL : " + url + "?" + urlParameters);

		URL obj = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) obj.openConnection();

		conn.setRequestMethod("POST");
		conn.setReadTimeout(15 * 1000);
		if (cookies != null)
			conn.setRequestProperty("Cookie", cookies);
		conn.setInstanceFollowRedirects(true);
		conn.setDoOutput(true);

		DataOutputStream dos = new DataOutputStream(conn.getOutputStream());
		dos.write(urlParameters.getBytes("UTF-8"));
		dos.flush();
		dos.close();

		StringBuilder response = new StringBuilder();
		int responseCode = conn.getResponseCode();
		
		if(responseCode != 200)
			System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine;
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		return response.toString();
	}
	
	public String retrieveCookies(String url) {
		
		String cookies = null;
		try {
			URL obj = new URL(url);
			HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
			cookies = conn.getHeaderField("Set-Cookie");
			conn.disconnect();			
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return cookies;
	}
}
