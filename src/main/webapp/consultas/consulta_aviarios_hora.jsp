<%-- 
    Document   : consulta_aviarios_hora
    Created on : 08/03/2021, 03:16:05 PM
    Author     : hvelazquez
--%>
<%@page import="clases.controles"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<%@include  file="../chequearsesion.jsp" %>
<%@page contentType="application/json; charset=utf-8" %>
<%
    String clasificadora = (String) sesionOk.getAttribute("clasificadora");
    String fecha_inicio = request.getParameter("fecha_inicio");
    String fecha_final = request.getParameter("fecha_final");
  
    JSONObject ob = new JSONObject();
    ob=new JSONObject();
    String contenedor=""; 
    
        clases.controles.connectarBD();   
        Statement stmt = clases.controles.connect.createStatement();
        ResultSet rs = stmt.executeQuery("exec grupomaehara.dbo.[mae_ptc_select_aviariosInvolucrados] @area='"+clasificadora+"',"
        + "@inicio='"+fecha_inicio+"',@final='"+fecha_final+"' ");
        while(rs.next())
        {
            contenedor=contenedor+"<OPTION  VALUE='"+ rs.getString("aviario")+"'>"+ rs.getString("aviario")+"</OPTION>";
        }
        ob.put("aviarios",contenedor);
        controles .DesconnectarBD();
        out.print(ob);
       %> 