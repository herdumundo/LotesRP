      <input type="hidden" id="tipo" name="tipo" value="RP">
     <div class="form-control bg-info" style="font-weight: bold;color:black;"><center> GENERACION DE REPORTES DE TRANSFERENCIAS.</center></div>  
     <br>
    
     
     <div class="input-append">  
        <a>FECHA DE REGISTRO</a>
        <input id="calendario_informe" name="calendario_informe" class="datepicker"  width="276" required="true"  />
     </div> 
    
    <br> 
        
    
   <a>SELECCIONAR TIPO DE REPORTE</a>
    <select class="form-control" name="tipo_reporte" id="tipo_reporte"  >
            <OPTION VALUE="1">REALIZADAS</OPTION> 
            <OPTION VALUE="2">RECIBIDAS</OPTION> 
    </select>             
          
    <a>SELECCIONAR TIPO DE TRANSFERENCIA</a>
    <select class="form-control" name="estado" id="estado"  >
            <OPTION VALUE="RP">REPROCESO</OPTION> 
            <OPTION VALUE="SP">SUBPRODUCTOS</OPTION> 
    </select>             
       <br>
       <input type="button" value="BUSCAR" onclick="ir_grilla_transferencia_reporte($('#calendario_informe').val(),$('#estado').val())" class="form-control btn-primary">
    
      
        
    <div id="div_grilla_tipo_transferencia"> </div>
           
