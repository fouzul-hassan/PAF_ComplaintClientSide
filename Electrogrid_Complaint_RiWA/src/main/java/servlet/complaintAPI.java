package servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import recources.Complaint;

/**
 * Servlet implementation class consumptionAPI
 */
@WebServlet("/complaintAPI")
public class complaintAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
    Complaint con = new Complaint();   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public complaintAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

    private static Map getParasMap(HttpServletRequest request)
    {
	    Map<String, String> map = new HashMap<String, String>();
	    try
	    {
		    Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
		    String queryString = scanner.hasNext() ?
		    scanner.useDelimiter("\\A").next() : "";
		    scanner.close();
		    String[] params = queryString.split("&");
		    for (String param : params)
		    {
		    	String[] p = param.split("=");
		    	map.put(p[0], p[1]);
		    }
		}
	    catch (Exception e)
	    {		    
	    	
	    }
		return map;
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String output = con.insertComplaint(
				request.getParameter("compID"),
				request.getParameter("userID"), 
				request.getParameter("des"), 
				request.getParameter("answer"),
				request.getParameter("updatedDate"), 
				request.getParameter("compDate"), 
				request.getParameter("cstatus"));
			
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request);
		String output = con.updateComplaint(paras.get("compID").toString(), 
				paras.get("userID").toString(), 
				paras.get("des").toString(), 
				paras.get("answer").toString(), 
				paras.get("updatedDate").toString(),
				paras.get("compDate").toString(), 
				paras.get("cstatus").toString());
		
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request);
		String output = con.deleteComplaint(paras.get("compID").toString());
		
		response.getWriter().write(output);
	}

}
