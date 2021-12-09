  <%@page import="java.util.ArrayList"%>
<%@page import="org.json.JSONObject"%>
<%@page import="javax.swing.JOptionPane"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="conexion_maehara" class="clases.bdconexion2" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<jsp:useBean id="fuente_maehara" class="clases.fuentedato2" scope="page"/>
 

<%@include  file="../chequearsesion.jsp" %>
 <%    
     
     
  /*  JSONObject ob = new JSONObject();
  
    
    
ArrayList p = new ArrayList ();
 
   
 
String json = (String)pageContext.getAttribute("dataJson");
*/
 //pageContext.setAttribute("parsedJSON", org.apache.commons.json.JSON.parse(json));
%>