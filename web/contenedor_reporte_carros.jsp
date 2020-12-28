 
     
<form id="formulario_reporte_reproceso" name="formulario_reporte_reproceso" action="" >
    
     <script>
         function verificar(){
             
       
 var seleccionado;
 var combo =$("#cbox_estado").val();
 
 
 if (combo==="L"){
     
    // seleccionado="control_reporte_carros.jsp";
     $('#formulario_reporte_reproceso').attr('action', 'control_reporte_carros.jsp');
     
                            }
          if (combo==="R") {
                                
         $('#formulario_reporte_reproceso').attr('action', 'control_reporte_carros_retenidos.jsp');
                                
                            }
    
      }
    
</script>
    <div class="input-append">  
        <input id="calendario_reporte_carros" name="calendario_reporte_carros" data-format="dd/mm/yyyy"  width="276" required="true"  />
    
    
    </div> 
    
    
     
          
      <br> 
      <select class="form-control" name="cbox_estado" id="cbox_estado" required="true"> 
            <OPTION selected disabled>SELECCIONAR ESTADO DE LIBERACION</OPTION>
            <OPTION   VALUE="L">LIBERADO</OPTION>
            <OPTION   VALUE="R">RETENIDO</OPTION>
             </select>   
         <br> 
      
             <br> 
             <input style="width:260px; height:80px" class="btn btn-success" type="submit" onclick="verificar()" value="Generar reporte"> 
        
          
      </form> 
   
