<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.CallableStatement"%>
<%@page import="java.sql.PreparedStatement"%>
 <%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.swing.JOptionPane"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@ page contentType="application/json; charset=utf-8" %>

 <%
     Connection cn = conexion.crearConexion();
     // Asignar conexion al objeto manejador de datos
     fuente.setConexion(cn);   
     String    id=request.getParameter("id");
         int tipo_mensaje=0;
        String mensaje="";
        String mensaje_impresion="";
        
          try {
            CallableStatement  callableStatement=null;   

            String call_detalle = "{call  pa_eliminar_tipo_reproceso ( ?, ?   )}";
            callableStatement = cn.prepareCall(call_detalle);
            callableStatement .setInt(1,Integer.parseInt(id));
               
            callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
            
            callableStatement.execute();
            tipo_mensaje = callableStatement.getInt("mensaje");
            
            
             mensaje="REGISTRO ELIMINADO"; 
             mensaje_impresion="error";

              } 
          catch (Exception e) {
                    tipo_mensaje=1;
                    mensaje=e.toString();
                    mensaje_impresion="error";
              }
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        ob.put("mensaje", mensaje);
        ob.put("tipo_mensaje",tipo_mensaje);
        ob.put("mensaje_impresion",mensaje_impresion);
        out.print(ob); 
%>     