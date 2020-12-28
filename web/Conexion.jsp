<%-- 
    Document   : index
    Created on : 23/01/2016, 03:23:38 PM
    Author     : Ingeniero
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        
        <%
        Connection con = null;
        try{
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        con = (Connection)DriverManager.getConnection("jdbc:sqlserver://172.16.1.202;databasename=GrupoMaehara","sa","Paraguay2017");
        out.print("Conexion en Linea");
        }catch(Exception ex){
        out.print("Error: "+ex.getMessage());
        }
        %>
        
    </body>
</html>
