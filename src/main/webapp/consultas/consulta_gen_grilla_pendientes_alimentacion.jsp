<%-- 
    Document   : informe_factura
    Created on : 05/03/2020, 11:04:47 AM
    Author     : hvelazquez
--%>
<%@page import="clases.controles"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.*"%>
<%@include  file="../chequearsesion.jsp" %>
 <%@page contentType="application/json; charset=utf-8" %>
 
		
<%      
    JSONObject ob = new JSONObject();
    String tab_cabecera="<div class='container'> Total: <span id='total'></span><table id='example' class='table' ><thead><td>Fecha puesta</td><td>Codigo</td><td>Cantidad</td><td>Origen</td><td>Tipo huevo</td><td>Motivo</td></thead><tbody>";
    String tab_final="</tbody></table>";
    String tab_filas="";
    try {

            clases.controles.connectarBD();   
            Statement stmt = clases.controles.connect.createStatement();
             ob = new JSONObject();
            ResultSet rs = stmt.executeQuery(" select convert(date,fecha_puesta) as fecha_puesta, cod_carrito,cantidad,origen,tipo_huevo,desFallaZona  "
                    + "from  v_mae_ptc_pendientes_alimentacion  order by  fecha_puesta asc");

            while (rs.next()) 
            {
                tab_filas=tab_filas+"<tr>   <td>"+rs.getString("fecha_puesta") +"</td> <td>"+rs.getString("cod_carrito") +"</td> <td>"+rs.getString("cantidad") +"</td> <td>"+rs.getString("origen") +"</td> "
                        + "<td>"+rs.getString("tipo_huevo") +"</td> <td>"+rs.getString("desFallaZona") +"</td>     </tr>";
            }
            rs.close();
           

        } catch (Exception e) {
            String error=e.getMessage();
        }
        clases.controles.DesconnectarBD();
        ob.put("grilla", tab_cabecera+tab_filas+tab_final+"</div>");
        controles.DesconnectarBD();
        out.print(ob);
%>

