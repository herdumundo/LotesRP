<%@page import="clases.lotes_transferencias_sp"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.microsoft.sqlserver.jdbc.SQLServerDataTable"%>
<%@page import="java.sql.CallableStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.io.IOException"%>
<%@page import="com.google.gson.JsonArray"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%@include  file="../chequearsesion.jsp" %>
<%@page contentType="application/json; charset=utf-8" %>
<%   
    String grilla         = request.getParameter("valor");
    String usuario        = (String) sesionOk.getAttribute("usuario");
    String arr_chofer     = request.getParameter("chofer");
    String arr_camion     = request.getParameter("camion");
    String destino        = request.getParameter("destino");
    String clasificadora  = (String) sesionOk.getAttribute("clasificadora");
    String [] choferes    =arr_chofer.split("_");
    String [] camiones    =arr_camion.split("_");
    String id_chofer      =choferes[0];
    String chofer         =choferes[1];
    String id_camion      =camiones[0];
    String camion         =camiones[1];
    clases.controles.connectarBD();  
    Connection cn = clases.controles.connect;
    int tipo_respuesta=0;
    String mensaje="";
    JSONObject ob = new JSONObject();
    ob=new JSONObject();
    
   

    try 
    {
    ObjectMapper mapper = new ObjectMapper();    
    lotes_transferencias_sp[] pp1 = mapper.readValue(grilla, lotes_transferencias_sp[].class);
    SQLServerDataTable DataTableGrilla = new SQLServerDataTable();
    DataTableGrilla.addColumnMetadata("cod_carrito" ,   java.sql.Types.VARCHAR);
    DataTableGrilla.addColumnMetadata("cantidad" ,      java.sql.Types.INTEGER);
    DataTableGrilla.addColumnMetadata("cod_interno" ,   java.sql.Types.INTEGER);
    DataTableGrilla.addColumnMetadata("cod_lote" ,      java.sql.Types.VARCHAR);
    DataTableGrilla.addColumnMetadata("estado_costeo" ,   java.sql.Types.VARCHAR);
 
    for (lotes_transferencias_sp lotes : pp1) 
    {
        DataTableGrilla.addRow(lotes.cod_carrito,lotes.cantidad, lotes.cod_interno , lotes.cod_lote , lotes.estado_costeo );
    }
        cn.setAutoCommit(false);
        CallableStatement  callableStatement=null;   
        callableStatement = cn.prepareCall("{call mae_ptc_transferencias_subproductos(?,?,?,?,?,?,?,?,?,?,? )}");
        callableStatement .setString(1,  destino );
        callableStatement .setString(2,  clasificadora );
        callableStatement .setString(3,  usuario );
        callableStatement .setInt(4, Integer.parseInt(id_chofer) );
        callableStatement .setString(5, chofer);
        callableStatement .setInt(6, Integer.parseInt(id_camion));
        callableStatement .setString(7, camion);
        callableStatement .setString(8, "SP");
        callableStatement .setObject(9, DataTableGrilla );
        callableStatement .setInt(10, 0 );
        callableStatement .setString(11,  "" );

        callableStatement.registerOutParameter("estado_registro", java.sql.Types.INTEGER);
        callableStatement.registerOutParameter("mensaje", java.sql.Types.VARCHAR);
        callableStatement.execute();
        tipo_respuesta = callableStatement.getInt("estado_registro");
        mensaje= callableStatement.getString("mensaje");
         
        ob.put("mensaje", mensaje);
        ob.put("tipo_respuesta", tipo_respuesta);
        if (tipo_respuesta==0)
        {
            cn.rollback(); 
        }   
        else  
        {
          //  cn.rollback(); 
              cn.commit();
        }
    } catch (Exception e) 
    {
        ob.put("mensaje", "error");
        ob.put("tipo_respuesta", "0");
        cn.rollback(); 
    }
    out.print(ob);
 %>