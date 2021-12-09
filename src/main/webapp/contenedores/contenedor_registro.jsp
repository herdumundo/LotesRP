  <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<%@include  file="../chequearsesion.jsp" %>
      <%
        String area_registro = (String) sesionOk.getAttribute("clasificadora"); 
        String area_format=    (String) sesionOk.getAttribute("area_fallas");
    
              
          Connection cn = conexion.crearConexion();
	 
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs = fuente.obtenerDato("SELECT  convert(varchar,getdate(),111) as fecha,REPLACE(CONVERT(VARCHAR(10),  convert(varchar,getdate(),103), 5),'/','') ");
       while(rs.next()){          
 %>    
     
 <form method="post"   id="formulario">
     
            <div class="input-append">  
            <span class="input-group-addon">Fecha de clasificación</span>
            <input id="calendario_registro" name="calendario_registro" data-format="yyyy/mm/dd"  width="276"  value="<%=rs.getString(1)%>"   />
           
            <input id="id_date" name="id_date" style="display: none" type="text"  width="276"  value="<%=rs.getString(2)%>"   />
            <input id="id_clasificadora" name="id_clasificadora" style="display: none"  type="text"  width="276"  value="<%=area_registro%>"   />
            
              
            </div> 
            <br>
            <div class="form-group">
                <div class="input-group">
                    <select class="form-control" name="tipo_huevo" id="tipo_huevo"   onchange="limpiar_campos();cargar_unidad_medida();visualizar_zona_liberado()">
                        <OPTION selected disabled>SELECCIONAR TIPO</OPTION>
                        <OPTION VALUE="8">SUBPRODUCTO</OPTION>
                        <OPTION VALUE="9">R</OPTION>
                        <OPTION VALUE="RP">RP</OPTION>
                    </select>  
                    <span class="input-group-addon">-</span>
                    <div class="input-append">  
                    <input id="fecha_puesta" name="fecha_puesta" data-format="yyyy/mm/dd"  width="276" value="<%=rs.getString(1)%>" placeholder="Fecha puesta"  />
                    <%} %> 
                    </div> 
                </div>
            </div>
    
            <div class="form-group">
            <div class="input-group">
           
           <input name="cod_carrito" id="cod_carrito" type="number"  autocomplete="off"  class="form-control" placeholder="Codigo carrito,Mesa,Pallet" onkeyup="contar()"  >
            
                 
            <span class="input-group-addon">-</span>
            <div class="input-append">  
                <select class="form-control" name="unidad_medida" id="unidad_medida"  onchange="limpiar_cantidad()" > </select>
            </div>
          
            <span class="input-group-addon">-</span>
       
            </div>
            </div>
                <br>
            
             
    
        
        <br>
         <div class="form-group">
       Cantidad
       <input name="txt_cantidad" id="txt_cantidad" style="display: none"  type="text"   class="form-control"   >
        
        
          <div class="input-group" style="display: none" id="div_kgramos">
          <input name="txt_kg" id="txt_kg"  type="number" class="form-control"  placeholder="KILOGRAMOS"  >
           <span class="input-group-addon">-</span>
          
             <input name="txt_gramos" id="txt_gramos"   type="number" class="form-control"  placeholder="GRAMOS"  >
  
            </div>
        
        <div class="input-group" id="div_cant_plancha">
           <input name="txt_plancha" id="txt_plancha"  type="number" class="form-control"  placeholder="PLANCHAS" onkeyup="calculo()">
          -<input name="txt_unidad" id="txt_unidad"  type="number" class="form-control"  placeholder="UNIDADES" onkeyup="calculo()">
          <span class="input-group-addon">-</span>
          
            
            </div> </div>
     
            <div class="form-group">
            Hora de Clasificación
            <div class="input-group">
             
           <select class="form-control"  name="hora_desde" id="hora_desde" >
            <OPTION selected disabled>Hora inicio</OPTION>
              <OPTION VALUE="01">1</OPTION>
            <OPTION VALUE="02">2</OPTION>
            <OPTION VALUE="03">3</OPTION>
            <OPTION VALUE="04">4</OPTION>
            <OPTION VALUE="05">5</OPTION>
            <OPTION VALUE="06">6</OPTION>
            <OPTION VALUE="07">7</OPTION> 
            <OPTION VALUE="08">8</OPTION>
            <OPTION VALUE="09">9</OPTION>
            <OPTION VALUE="10">10</OPTION> 
            <OPTION VALUE="11">11</OPTION>
            <OPTION VALUE="12">12</OPTION>
            <OPTION VALUE="13">13</OPTION> 
            <OPTION VALUE="14">14</OPTION>
            <OPTION VALUE="15">15</OPTION>
            <OPTION VALUE="16">16</OPTION> 
            <OPTION VALUE="17">17</OPTION>
            <OPTION VALUE="18">18</OPTION>
            <OPTION VALUE="19">19</OPTION> 
            <OPTION VALUE="20">20</OPTION>
            <OPTION VALUE="21">21</OPTION>
            <OPTION VALUE="22">22</OPTION>
            <OPTION VALUE="23">23</OPTION>
            <OPTION VALUE="00">00</OPTION>
            </select>   
            
            
            <span class="input-group-addon">-</span>
          
            <select class="form-control"   name="hora_hasta" id="hora_hasta" >
            <OPTION selected disabled>Hora fin</OPTION>
            <OPTION VALUE="01">1</OPTION>
            <OPTION VALUE="02">2</OPTION>
            <OPTION VALUE="03">3</OPTION>
            <OPTION VALUE="04">4</OPTION>
            <OPTION VALUE="05">5</OPTION>
            <OPTION VALUE="06">6</OPTION>
            <OPTION VALUE="07">7</OPTION> 
            <OPTION VALUE="08">8</OPTION>
            <OPTION VALUE="09">9</OPTION>
            <OPTION VALUE="10">10</OPTION> 
            <OPTION VALUE="11">11</OPTION>
            <OPTION VALUE="12">12</OPTION>
            <OPTION VALUE="13">13</OPTION> 
            <OPTION VALUE="14">14</OPTION>
            <OPTION VALUE="15">15</OPTION>
            <OPTION VALUE="16">16</OPTION> 
            <OPTION VALUE="17">17</OPTION>
            <OPTION VALUE="18">18</OPTION>
            <OPTION VALUE="19">19</OPTION> 
            <OPTION VALUE="20">20</OPTION>
            <OPTION VALUE="21">21</OPTION>
            <OPTION VALUE="22">22</OPTION>
            <OPTION VALUE="23">23</OPTION>
            <OPTION VALUE="00">00</OPTION>
            </select>   </div> </div>
  
        
        <div class="form-group" id="div_grupo_aviario_almacenamiento">
            <div class="input-group">
            <select class="form-control"   name="tipo_aviario" id="tipo_aviario">
                <OPTION selected disabled>SELECCIONAR AVIARIO</OPTION>
            <OPTION VALUE="M">M</OPTION>
            <OPTION VALUE="T">T</OPTION>
             
            </select>   
                
        <span class="input-group-addon">-</span>
        
        
           </div> </div>    
       
        <div id="div_reproceso_liberado" style="display:none">
            
            
            <select class="form-control" name="cbox_reproceso" id="cbox_reproceso">
                <OPTION value="-" selected >Tipo de reproceso</OPTION>
               
                 <%  
	                                                                                                                                                                                                                                                                                                                                                                                                           //CAMBIAR BASE DE DATOS       
        ResultSet rs1 = fuente.obtenerDato("select * from fallas with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('rep') and estado='A'");
       while(rs1.next()){
           
                
 %>
            
            <OPTION VALUE="<%=rs1.getString("codigo")%>"><%=rs1.getString("desfallazona")%></OPTION>
             
            <% }%>
                
            </select>   
            
            
            
        </div>
              <div id="div_sub_liberado" style="display:none">
            
            
            <select class="form-control" name="cbox_sub" id="cbox_sub">
                <OPTION value="-" selected>Tipo de subproducto</OPTION>
               
                 <%  
	                                                                                                                                                                                                                                                                                                                                                                                                           //CAMBIAR BASE DE DATOS       
        ResultSet rs3 = fuente.obtenerDato("select * from fallas  with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('sub') and estado='A'");
       while(rs3.next()){
           
                
 %>
            
            <OPTION VALUE="<%=rs3.getString("codigo")%>"><%=rs3.getString("desfallazona")%></OPTION>
             
            <% }%>
                
            </select>   
            
            
            
        </div>
        
        <div id="div_zona_liberado" style="display:none">
            
            
            <select class="form-control" name="cbox_zona_liberado" id="cbox_zona_liberado">
            <OPTION value="-" selected >Zona</OPTION>
               <%  
	                                                                                                                                                                                                                                                                                                                                                                                                               //CAMBIAR BASE DE DATOS       
        ResultSet rs2 = fuente.obtenerDato("select * from fallas with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('rot', 'ROS') and estado='A'");
       while(rs2.next()){
           
                
 %>
            
            <OPTION VALUE="<%=rs2.getString("codigo")%>"><%=rs2.getString("desfallazona")%></OPTION>
             
            <% }%>
             
            </select>   
            
            
            
        </div>
        <br>
        <div class="form-group" id="div_responsable_liberado">
            <div class="input-group">
            <input name="txt_responsable" style="text-transform: uppercase;" autocomplete="off" id="txt_responsable" type="text" class="form-control" placeholder="Responsable">
               </div>  </div>   
        
            <input name="txt_obs" style="text-transform: uppercase;" id="txt_obs" type="text" autocomplete="off"    class="form-control" placeholder="Comentario">
            <br><br>
            <input name="text_resultado" style="display: none"  id="text_resultado" type="text"   lass="form-control">
            <input type="button" value="Registrar" id="btn_registrar" name="btn_registrar" class="form-control btn btn-primary  " style="  height:70px" onclick="procesar();"   />
            <br><br> 

</form>
      
            
           
  
</div>

   
      
    
     
        
        
        
 