<%-- 
    Document   : transferencia_lotes
    Created on : 26/05/2020, 07:55:33 AM
    Author     : hvelazquez
--%>
<%@page import="clases.fuentedato"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<jsp:useBean id="fuente2" class="clases.fuentedato2" scope="page"/>   
<jsp:useBean id="conexion2" class="clases.bdconexion2" scope="page" />
<%@include  file="../chequearsesion.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% 
     String area =(String) sesionOk.getAttribute("clasificadora");
  %>
           
<div class="form-group">
    <script>
        $('#<%=area%>').hide();
    </script>
    
    <a> <b>FECHA DE TRANSFERENCIA</b></a> 
            
      <input style="font-weight: bold;" id="fecha" name="fecha"  class="datepicker"    value=""   />
      <br><br>
         <div class="input-group">
             <select class="form-control" name="cbox_destino" id="cbox_destino">
                 <option    value=""       disabled="disabled"    selected="selected">DESTINO </option>
                 <option    id="A" value="A"  >CCHA </option>
                 <option    id="B" value="B"  >CCHB </option>
                 <option    id="H" value="H"  >CCHH </option>
                 <option    id="O" value="O"  >LAVADO </option>
                 <option    id="C" value="C"  >CYO </option>
                 
             </select>
      
             </div> </div>
                <select style=" font-weight: bold" class="form-control" name="cbox_chofer" id="cbox_chofer">
                <option style=" font-weight: bold" value="-" selected="selected" >  CHOFER </option>
                <% 
                    Connection cn2 = conexion2.crearConexion();
                    fuente2.setConexion(cn2);  
                    ResultSet rs_chofer,rs_camion;
                    
                     rs_chofer = fuente2.obtenerDato(" select code,name from [@CHOFERES] with(nolock) order by 2 ");
       while(rs_chofer.next()){ 
                
                %>
                <OPTION VALUE="<%=rs_chofer.getString("code")%>-<%=rs_chofer.getString("name")%>"> <%=rs_chofer.getString("name")%> </OPTION><%
                 }
                rs_chofer.close();%>
                </select>  
                <span class="input-group-addon">-</span>
                <select class="form-control" name="cbox_camion" id="cbox_camion">
                <option style=" font-weight: bold" selected="selected"  value="-" >  CAMION </option>
                <%
                    
            rs_camion = fuente2.obtenerDato("select code,name from [@CAMIONES] ");
       while(rs_camion.next()){ 
      
            String camion_1=rs_camion.getString("code");
            String camion_2=rs_camion.getString("name");
            %><OPTION VALUE="<%=camion_1%>-<%=camion_2%>"><%=camion_1%>- <%=camion_2%> </OPTION><%
            }
              
           %>

        </select>
           <br>
           <br>
           <div class="form-group">
            <div class="input-group">
                <input type="number" placeholder="LOTE" name="txt_lote" id="txt_lote" class="form-control" onkeypress="cargar_datos_key_trans();"/>
                 
            <span class="input-group-addon">-</span>
            <input type="button" value="INGRESAR" name="btn_ingresar" id="btn_ingresar" onclick="consulta_lotes_transferencias_reprocesos($('#txt_lote').val());" class="form-control btn btn-primary"/>

 
                
               
          </div>
          </div>
            <div id="div_cargar" class="text-center" style="display: none">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
           <input  type="button" value="REGISTRAR" id="btn_registrar" name="btn_registrar" onclick="enviar_datos_transferencia();" class="form-control btn btn-danger example2" />
                
 
         
    <div id="carros_div">

    <a style=" font-weight: bold" > EN MESAS</a>
    <table  id="tabla_carros"   data-row-style="rowStyle"   data-toggle="table" data-click-to-select="true">
        <thead>
            <tr>
                <th style=" font-weight: bold">TIPO REPROCESO</th>
            </tr>

        </thead>
    <tbody>
    <tr>
        <td> <input type="text" style=" font-weight: bold"  name="tipo_rep" id="tipo_ca" value="0"   class="form-control" readonly /></td>
    </tr>

    </tbody>
  </table>
 </div>        <br>
              
      
<div   class="row" id="divid"  >
        <div class="col-md-12">
            <div class="panel panel-primary">
            <div class="panel-heading" > </div>
                <table id="grilla_transfer" data-row-style="rowStyle" data-toggle="table"  class=" table table-responsive" data-click-to-select="true">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NRO.</th>
                            <th>CANTIDAD</th>
                            <th>FECHA PUESTA</th>
                            <th>TIPO</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>                      
            </div> 
        </div> 
</div> 
    

       
<% cn2.close();  %>

