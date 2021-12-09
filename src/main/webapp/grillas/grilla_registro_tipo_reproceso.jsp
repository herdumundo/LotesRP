<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/> 
 <%@include  file="../chequearsesion.jsp" %>

       <% Connection cn = conexion.crearConexion();
 	fuente.setConexion(cn); 
 %>
   
        <input type="button" class="form-control bg-primary" value="CREAR TIPO DE REPROCESO" data-toggle="modal" data-target="#modal_agregar" >
        
        <table id="tabla_reproceso" class="table" border="1">
            <thead>
                <tr >
                    <th>ID</th>
                    <th>DESCRIPCION</th>
                    <th>AREA</th>                    
                    <th>TIPO</th>                    
                    <th>ACCION</th>
                    <th>ACCION</th>

                </tr>
            </thead>
            <tbody>
                  <% 
                      String cch= "";
                      String tipo= "";
                 ResultSet rs = fuente.obtenerDato(" select * from fallas where   tipo in ('rep','sub','ROT') and estado='A' ");
                 while (rs.next())
                 {   
                     if(rs.getString("area").toString().equals("CCH")){
                         cch="CLASIFICADORAS";
                     }
                     else if(rs.getString("area").toString().equals("CCHO")){
                         cch="CLASIFICADORAS Y LAVADOS";
                      }
                    else if(rs.getString("area").toString().equals("OVO")){
                         
                        cch="LAVADOS";
                      }
                     

                    if(rs.getString("tipo").toString().equals("SUB")){
                         tipo="SUBPRODUCTO";
                     }
                     else if(rs.getString("tipo").toString().equals("REP")){
                         tipo="REPROCESO";
                      }
                     else if(rs.getString("tipo").toString().equals("ROT")){
                         tipo="ROTOS";
                      }
                     %>
                     <tr id="<%=rs.getString("id")%>">  
                    <td> <%=rs.getString("id")%></td>
                    <td id="<%=rs.getString("id")%>_1"><%=rs.getString("desFallaZona")%></td>
                    <td id="<%=rs.getString("id")%>_2"><%=cch%></td>
                    <td id="<%=rs.getString("id")%>_3"><%=tipo%></td>
                    <td><input type="button" class="form-control bg-success" value="EDITAR" data-toggle="modal" data-target="#modal_editar" onclick=" $('#txt_id_tipo_reproceso').val('<%=rs.getString("id")%>'), $('#select_editar').val('<%=rs.getString("area")%>'), $('#txt_tipo_reproceso_editar').val('<%=rs.getString("desFallaZona")%>'),$('#select_tipo_sub_editar').val('<%=rs.getString("tipo")%>')"></td>
                    <td><input type="button" class="form-control bg-danger" value="ELIMINAR" data-toggle="modal" data-target="#modal_eliminar" onclick="aviso_eliminar_reproceso('<%=rs.getString("id")%>','<%=rs.getString("desFallaZona")%>')"></td>
                    </tr>
                      <%     
                 }
                %>
                 </tbody>
            </table>
                 
                 
        