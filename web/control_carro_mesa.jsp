 <%@page import="java.sql.PreparedStatement"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@page import="java.sql.Connection"%>
<%     
    Connection cn = conexion.crearConexion();
     // Asignar conexion al objeto manejador de datos
     fuente.setConexion(cn);   
      String  codigo_mesa  = request.getParameter("codigo_mesa");
      String id_lote=request.getParameter("id_carrito");
        PreparedStatement pss = cn.prepareStatement("update lotes set cod_cambio ='"+codigo_mesa+"' where cod_interno='"+id_lote+"' ");
        pss.executeUpdate();
%>  