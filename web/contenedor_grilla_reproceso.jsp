<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<!--<link href="estilos/css/styles_loading.css" rel="stylesheet">-->
      <% Connection cn = conexion.crearConexion();
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);  %>
   
            
  
        
   
        <form id="formulario_reproceso" method="post" >
          
                  <div class="form-group">
         <a >Fecha de clasificacion</a>   
                  <div class="input-group">
        
                     <input id="calendario_reproceso" name="calendario_reproceso"data-format="dd/mm/yyyy"  width="276"   />
    <script>
        $('#calendario_reproceso').datepicker({
            uiLibrary: 'bootstrap4'
        });
    </script>
        <span class="input-group-addon">-</span>
       
        <style></style>
            <select class="form-control" required="true" name="disposicion" id="disposicion"  onchange="ver_div();detalle_reproceso($('#calendario_reproceso').val(),$('#disposicion').val());a();">
            <OPTION selected disabled>Disposición</OPTION>
              <%  
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs3 = fuente.obtenerDato("select * from motivo_retencion where tipo='disposicion'");
        while(rs3.next())   {          
                %>    
        <OPTION VALUE="<%=rs3.getString("id")%>"><%=rs3.getString("descripcion")%></OPTION> 
             
          <%                }  %>  
            </select> 
                  </div> 
        </div>
             <script>
    //Esta es la función que una vez se cargue el documento será gatillada.
    function a (){
        $("#disposicion_insert").val($("#disposicion").val());
    }  
</script>
            
            
             
              
            <br>
            
          
    <br>
     
      


        <div id="contenido_grilla" style="display: none;">
            
            
            <select class="form-control" required="true" name="disposicion_insert" id="disposicion_insert">
            <OPTION selected disabled>Disposición</OPTION>
              <%  
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs4 = fuente.obtenerDato("select * from motivo_retencion where tipo='disposicion'");
        while(rs4.next())   {          
                %>    
        <OPTION VALUE="<%=rs4.getString("id")%>"><%=rs4.getString("descripcion")%></OPTION> 
             
          <%                }  %>  
            </select> 
            <br>
            
        Fecha de alimentacion
        <input id="calendario_alimentacion" name="calendario_alimentacion"data-format="dd/mm/yyyy"  width="276"/>
        <script>
        $('#calendario_alimentacion').datepicker({
            uiLibrary: 'bootstrap4'
        });
        </script> <br>
        <input type="text"  id="txt_nro_mesa" name="txt_nro_mesa" placeholder="OBSERVACION" class="form-control">
                    <br>
       
                    <input type="text" name="caja_check" style="display: none" id="caja_check"  >
            <br>
           
            </div>


    <div id="div_registro" style="display: none">
        <input type="button" class="form-control bg-primary" value="REGISTRAR" onclick=" validar();">
           </div>
    <div id="contenedor_grilla_reproceso" >

    </div>

  </form>