 <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<!--<link href="estilos/css/styles_loading.css" rel="stylesheet">-->
      <% Connection cn = conexion.crearConexion();
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs = fuente.obtenerDato("select convert(varchar,getdate(),111) as fecha");
       while(rs.next()){          
 %>    
 <form method="post" id="formulario" action="control_retenidos.jsp"  >
    
 <div class="input-append">  
            <span class="input-group-addon">Fecha de clasificación</span>
            <input id="calendario_registro" name="calendario_registro" data-format="yyyy/mm/dd"  width="276"  value="<%=rs.getString(1)%>" required="" />
            <script>
               
              </script>
            </div>
            
            
            <br>
            
            <div class="form-group">
            <div class="input-group">
           
          
            <select class="form-control" name="tipo_huevo" id="tipo_huevo" required="true" onclick="cargar_unidad_medida()">
            <OPTION selected disabled>Seleccione tipo de huevo</OPTION>
            <OPTION VALUE="1">G</OPTION>
            <OPTION VALUE="2">J</OPTION>
            <OPTION VALUE="3">S</OPTION>
            <OPTION VALUE="4">A</OPTION>
            <OPTION VALUE="5">B</OPTION>
            <OPTION VALUE="6">C</OPTION>
            <OPTION VALUE="7">4TA</OPTION>
            
            </select>   
            <span class="input-group-addon">-</span>
            <div class="input-append">  
                
                
            
             <input id="fecha_puesta" name="fecha_puesta" data-format="yyyy/mm/dd"  width="276" value="<%=rs.getString(1)%>" placeholder="Fecha puesta" required="" />
    
            <%}
            %> 
            </div>
          
            <span class="input-group-addon">-</span>
       
            </div>
            </div>
            <br>
            <div class="form-group">
            <div class="input-group">
                <input name="cod_carrito" id="cod_carrito" type="number" autocomplete="off" required class="form-control" placeholder="Codigo carrito,Mesa,Pallet" onkeyup="contar()" onKeyPress="return soloNumeros(event)" >
          
            <span class="input-group-addon">-</span>
            <div class="input-append">  
                
           <select class="form-control" name="unidad_medida" id="unidad_medida" required="true" onchange="limpiar_cantidad()" > </select>

           
           </div> 
            </div>
            </div>
   
            <div> 
                SELECCIONE NRO DE EMPACADORA
                <div id="combo" class="form-group">                 
                    <select  name="nro_empacadora" required="true"   id="nro_empacadora" class="form-control"  multiple="multiple" >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    </select>
                </div>
            </div>
        
            <br>     
  
          <div> 
                SELECCIONE ESTADO DE RETENCION
                <div id="combo" class="form-group">                 
                    <select  name="estado_retenido" required="true"   id="estado_retenido" class="form-control">
                    <option value="R">RETENIDO</option>
                    <option value="Z">RETENIDO CON REPORTE</option>
                    
                    </select>
                </div>
            </div>
            
   <br>
  
         <div class="form-group">
       Cantidad
        <div class="input-group">
            <input name="txt_cantidad" id="txt_cantidad"  type="number" required="true" class="form-control"  placeholder="Cantidad" onkeyup="calculo()">
          <span class="input-group-addon">-</span>
          
          <select class="form-control" name="categoria" id="categoria">
            <OPTION selected disabled>Seleccione categoria</OPTION>
            <OPTION VALUE="FCO">FRESCOS</OPTION>
             
            <OPTION VALUE="LDO">LAVADOS</OPTION>
            </select>   
            </div> </div>
        <style>
              .cambio {
    color: #000;
    }
  </style>
     
        
 
             <div class="form-group">
            Hora de Clasificación
            <div class="input-group">
             
           <select class="form-control" required="true" name="hora_desde" id="hora_desde" >
            <OPTION selected disabled>Hora inicio</OPTION>
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
            </select>   
            
            
            <span class="input-group-addon">-</span>
          
            <select class="form-control" required="true" name="hora_hasta" id="hora_hasta" >
            <OPTION selected disabled>Hora fin</OPTION>
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
            </select>   </div> </div>
  
        
            <div class="form-group">
            <div class="input-group">
            <select class="form-control" required="true" name="tipo_aviario" id="tipo_aviario">
            <OPTION selected disabled>Tipo aviario</OPTION>
            <OPTION VALUE="M">M</OPTION> 
            <OPTION VALUE="T">T</OPTION>
            </select>   
                
        <span class="input-group-addon">-</span>
        
        
        <select class="form-control" name="tipo_almacenamiento" id="tipo_almacenamiento" required="true"  >
            <OPTION selected disabled>Tipo almacenamiento</OPTION>
            <OPTION VALUE="C">C</OPTION> 
            <OPTION VALUE="P">P</OPTION>
            <OPTION VALUE="M">M</OPTION>
            </select>  </div> </div>    
       
        
         <div class="form-group">
            <div class="input-group">
            <select class="form-control" required="true" name="estado_liberacion" id="estado_liberacion">
            <OPTION selected disabled>Estado de liberación</OPTION>
            <OPTION VALUE="NC">NO CONFORME</OPTION> 
            <OPTION VALUE="PNC">POTENCIALMENTE NO CONFORME</OPTION>
            </select>   
                
        <span class="input-group-addon">- </span>
        
        Motivo de retencion
        <select class="form-control" name="motivo_retencion"  multiple="multiple"  id="motivo_retencion" required="true" >
           
            
            
            
            <%  
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs2 = fuente.obtenerDato("select * from motivo_retencion where tipo='motivo'");
       while(rs2.next()){          
 %>    
 <OPTION VALUE="<%=rs2.getString("descripcion")%>"><%=rs2.getString("descripcion")%></OPTION> 
             
          <% }  %>  
            </select>  </div> </div>   
        
        
        
 <div  class="input-append">  
            
            
            
            <select class="form-control" required="true" name="disposicion" id="disposicion"  onchange="ver_div()" >
            <OPTION selected disabled>Disposición</OPTION>
              <%  
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs3 = fuente.obtenerDato(" select * from motivo_retencion where tipo='disposicion'");
        while(rs3.next())   {          
                %>    
        <OPTION VALUE="<%=rs3.getString("id")%>"><%=rs3.getString("descripcion")%></OPTION> 
             
          <%                }  %>  
            </select>   </div> 
        
         
            <br>
        
      
            <div class="form-group">
            <div class="input-group">
            <input name="txt_responsable" style="text-transform: uppercase;" autocomplete="off" autocomplete="off" id="txt_responsable" type="text" required="true" class="form-control" placeholder="Responsable">
            
             </div>  </div>   
        
            <input name="txt_obs" style="text-transform: uppercase;" id="txt_obs" type="text"  required="true"  class="form-control" placeholder="Comentario">
            <br><br>
            <input type="button" value="Registrar" id="btn_registrar" name="btn_registrar" class="form-control btn btn-primary " style="  height:70px"   onclick="cargar_loader();procesar('control_retenidos');" />
            <br> 

</form>
            <input onClick="traer_menu()" type="button" value="Cancelar" name="btnCancelar" style="  height:70px"  class="form-control btn btn-success" />
     
            
            <script>  
                
    function cargar_loader() {
                     
                    $.preloader.start({
                    modal: true,
                    src : 'sprites2.png'
                });
  }</script>
            
            
            <div id="loading-screen" style="display:none"  >
   <img src="img/spinning-circles.svg">
</div>

   