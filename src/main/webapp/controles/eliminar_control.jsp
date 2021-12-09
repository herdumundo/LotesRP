<%-- 
    Document   : Delete
    Created on : 02/02/2018, 03:34:00 PM
    Author     : Joel
--%>

<%@page import="javax.swing.JOptionPane"%>
<%@page import="java.sql.*"%>
<%@include  file="../chequearsesion.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
 
        <%
    String usuario                     = (String) sesionOk.getAttribute("usuario");
    Connection cn = conexion.crearConexion();
    fuente.setConexion(cn);   
    String id= request.getParameter("id") ;
    try {
           PreparedStatement pss = cn.prepareStatement("update lotes set estado='E',usuario_upd='"+usuario+"' ,fecha_modificacion=getdate() "
            + "where cod_interno='"+id+"'");
        pss.executeUpdate(); 
                        
        } catch (Exception e) {
            String es=e.toString();
        }
  
      
       %>
          
     