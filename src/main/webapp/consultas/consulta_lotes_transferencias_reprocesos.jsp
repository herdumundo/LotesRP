 <%@page import="clases.controles"%>
<%@page import="clases.variables"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page contentType="application/json; charset=utf-8" %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="fuente_GM" class="clases.fuentedato" scope="page"/>   
 <%@include  file="../chequearsesion.jsp" %>
<%          
        JSONObject ob = new JSONObject();
        JSONArray jarray = new JSONArray();         
    try {
           
            String area =(String) sesionOk.getAttribute("clasificadora");
            String carro =  request.getParameter("carro");
            ResultSet rs_GM ;
            String area_cch =(String) sesionOk.getAttribute("area_cch");
            clases.controles.connectarBD();
            Connection cn_GM = clases.controles.connect;
            fuente_GM.setConexion(cn_GM);  
               
                    
            int verificador_SAP=0;
             rs_GM = fuente_GM.obtenerDato(" exec [mae_ptc_select_lotes_disponiblesTransferencias]  @area='"+area+"',@area_cch='"+area_cch+"',@cod_carrito='"+carro+"',@tipo_transferencia='REP'") ;
        while(rs_GM.next())
        {      
            ob=new JSONObject();
            ob.put("tipo_huevo", rs_GM.getString("tipo_huevo"));
            ob.put("cod_interno", rs_GM.getString("cod_interno"));
            ob.put("cod_carrito", rs_GM.getString("cod_carrito"));
            ob.put("cantidad", rs_GM.getString("cantidad"));
            ob.put("fecha_puesta", rs_GM.getString("fecha_puesta"));
            verificador_SAP++;
            jarray.put(ob);  
        }
        if(verificador_SAP==0)
        { 
            ob=new JSONObject();
            ob.put("id", "0");
            ob.put("item_codigo",  "0");
            ob.put("nro_carrito", "0");
            ob.put("cod_lote",  "0");
            ob.put("cantidad", "0");
            ob.put("fecha_puesta", "0");
            ob.put("estado", "0");
            ob.put("motivo", "0");
            ob.put("estado_costeo", "0");
            jarray.put(ob);  
        }
        rs_GM.close();
        cn_GM.close();
        controles.DesconnectarBD();
        } catch (Exception e) 
               
        {
            String a=e.toString();
        } 
        out.print(jarray); 
        
        
    %>


