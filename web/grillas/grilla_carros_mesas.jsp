<%@page import="javax.swing.JOptionPane"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="../chequearsesion.jsp" %>

<%
    Connection cn = conexion.crearConexion();
    String calendario  = request.getParameter("fecha_carromesa");
    String area_registro = (String) sesionOk.getAttribute("clasificadora"); 
    fuente.setConexion(cn);
        ResultSet rs = fuente.obtenerDato("  select "
            + "cod_interno,cod_carrito,  "
            + "zona_falla as 'tipo de reproc o subto.',"
            + "cantidad,clasificadora,"
            + "cod_clasificacion,"
            + "tipo_huevo,  "
            + "convert(varchar,fecha_puesta,103) as fecha_pueta "
            + "from "
            + "lotes "
            + "where convert(varchar,fecha,103)='"+calendario+"'  "
            + "and tipo_huevo in ('RP','SC','PI') and cod_cambio is null "
            + "and left(cod_carrito,1)<>7 and  clasificadora='"+area_registro+"' and estado not in ('E')" );
  %>
    <table    id="tabla_carromesa" class="table" data-row-style="rowStyle" data-toggle="table" data-click-to-select="true">

        <thead>
            <tr>
            <th>
            Carro
            </th>
            <th>
            Tipo repro. o subpto.
            </th>
            <th  >
            Cantidad
            </th>
            </tr>
        </thead>
        <tbody >
                  <%
        while(rs.next()){ %>
        <tr>  
            <td ><%=rs.getString(2)%></td> 
            <td><%=rs.getString(3)%></td>
            <td><%=rs.getString(4)%></td> 
            <td><input  type='button' class="form-control   "   value="Agregar"   onclick=" cuadro_registro('<%=rs.getString("cod_interno")%>','<%=rs.getString("cod_carrito")%>'); "/></td>
        </tr> <%}%>  
        </tbody>  
  </table>
  
