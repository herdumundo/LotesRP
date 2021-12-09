<%-- 
    Document   : CERRARSESION
    Created on : 26/01/2016, 08:08:09 PM
    Author     : HERNAN VELAZQUEZ
--%>
<%@page import="javax.swing.JOptionPane"%>
<%@ page session="true" %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
<%
  // Crear objeto de conexion al DB
  Connection cn = conexion.crearConexion();
  // Asignar conexin al objeto manejador de datos
  fuente.setConexion(cn);

String usu = request.getParameter("usuario");
String cla = request.getParameter("pass");
 ResultSet rs = fuente.obtenerDato("select * from usuarios where usuario = '"+usu+"' and password = '"+cla+"' and clasificadora <>'u' AND ROL NOT IN ('I')");
try {
        
 
  if(rs.next()){
              
      HttpSession sesionOk = request.getSession();
     sesionOk.setAttribute("usuario",rs.getString("usuario"));
          sesionOk.setAttribute("id_usuario",rs.getString("password"));
          sesionOk.setAttribute("nombre_usuario",rs.getString("nombre"));
          sesionOk.setAttribute("clasificadora",rs.getString("clasificadora"));
          sesionOk.setAttribute("perfil",rs.getString("rol"));
          sesionOk.setAttribute("cod_usuario",rs.getString("cod_usuario"));
     if(rs.getString("clasificadora").equals("A")){
          sesionOk.setAttribute("area_cch","CCHA");
          sesionOk.setAttribute("area_fallas","CCH"); 
          sesionOk.setAttribute("categoria","FCO"); 
                                      }
      else if(rs.getString("clasificadora").equals("B")){
          sesionOk.setAttribute("area_cch","CCHB"); 
          sesionOk.setAttribute("area_fallas","CCH"); 
          sesionOk.setAttribute("categoria","FCO"); 
                                      }
      else if(rs.getString("clasificadora").equals("H")){
          sesionOk.setAttribute("area_cch","CCHH");
                    sesionOk.setAttribute("area_fallas","CCH"); 

          sesionOk.setAttribute("categoria","FCO"); 
                                      }
      else if(rs.getString("clasificadora").equals("C")){
          sesionOk.setAttribute("area_cch","CYO");
                    sesionOk.setAttribute("area_fallas","CCH"); 

          sesionOk.setAttribute("categoria","FCO"); 
                                      }
      
        else if(rs.getString("clasificadora").equals("S")){
                sesionOk.setAttribute("area_cch","SUBPRODUCTOS");
                sesionOk.setAttribute("area_fallas","CCH"); 
                sesionOk.setAttribute("categoria","FCO"); 
                                            }     
  else    {
          sesionOk.setAttribute("area_cch","OVO");
                    sesionOk.setAttribute("area_fallas","OVO"); 

          sesionOk.setAttribute("categoria","LDO"); 
              }
          
          
          response.sendRedirect("menu.jsp"); 
     }   
  else{
   %>
   <jsp:forward page="index.jsp">
    <jsp:param name="error" value="Usuario y/o clave incorrectos.<br>Vuelve a intentarlo."/>
    </jsp:forward>
<%
} 
   } catch (Exception e) {
        String er=e.toString();
}
%>
