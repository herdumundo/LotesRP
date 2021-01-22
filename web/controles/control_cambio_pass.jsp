   <%@page import="java.sql.PreparedStatement"%>
<%@page import="javax.swing.JOptionPane"%>
<%@page import="java.sql.Connection"%>
<%@include  file="../chequearsesion.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%
                     Connection cn = conexion.crearConexion();
     // Asignar conexion al objeto manejador de datos
     fuente.setConexion(cn);   
     String cod_usuario = (String) sesionOk.getAttribute("cod_usuario");
     String pass= request.getParameter("txt_pass");
     String sql_update;
     
      
 sql_update= "update usuarios set password='"+pass+"' where cod_usuario='"+cod_usuario+"' ";
 
                          PreparedStatement pss = cn.prepareStatement(sql_update);
                     int resultados = pss.executeUpdate();       
      
      
       

%> 
CAMBIOS REALIZADOS.
<br><br><br> <h1><a href="menu.jsp">VOLVER AL MENU PRINCIPAL</a></h1>  
