<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
  <%@include  file="../chequearsesion.jsp" %>
 
<div id="div_grilla_registro">
    
    
</div>
                 
                 
                 
   <div class="modal fade " id="modal_agregar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <form id="form_agregar">
       <div class="modal-dialog" role="document">
      <div class="modal-content">
          <div class="modal-header">
         REGISTRO DE TIPO DE REPROCESOS
      </div>
          <div class="modal-body">
              
              <a>INGRESE TIPO DE REPROCESO</a>
              <input class="form-control" type="text" placeholder="INGRESAR TIPO DE REPROCESO" id="txt_tipo_reproceso_registrar" required="required" name="txt_tipo_reproceso_registrar">
           <br>
               <a>INGRESE AREA CORRESPONDIDA</a>
               <select class="form-control" id="select_registrar">
              
              <option value="CCH">CLASIFICADORAS</option>
              <option value="CCHO">CLASIFICADORAS Y LAVADOS </option>
              <option value="OVO"> LAVADOS </option>
              </select>    
                     <br>
                     
                      <a>TIPO</a>
              <select class="form-control" id="select_tipo_sub_agregar" >
              
              <option value="REP">REPROCESO</option>
              <option value="SUB">SUBPRODUCTO </option>
              <option value="ROT">ROTOS </option>
               
          </select>
                      <br>
                     <input type="submit" class="form-control bg-primary"  value="REGISTRAR" 
                            id="btn_registrar " name="btn_registrar " onclick="$('#form_agregar').on('submit', function (event) {event.preventDefault(); registrar_tipo_reproceso($('#select_registrar').val(),$('#txt_tipo_reproceso_registrar').val(),$('#select_tipo_sub_agregar').val());});">
 
          </div>
        </div>
      </div>
           </form>
  </div>
 
 <div class="modal fade" id="modal_editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <form id="form_editar"> 
     
     <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          
            <a>EDITAR TIPO DE REPROCESOS</a>
           
        </div>
           
          <div class="modal-body">
              <a>AREA</a>
               <select class="form-control" id="select_editar" >
              
              <option value="CCH">CLASIFICADORAS</option>
              <option value="CCHO">CLASIFICADORAS Y LAVADOS </option>
              <option value="OVO"> LAVADOS </option>
              
          </select>
              <br>
              <a>TIPO</a>
              <select class="form-control" id="select_tipo_sub_editar" >
              
              <option value="REP">REPROCESO</option>
              <option value="SUB">SUBPRODUCTO </option>
                                    <option value="ROT">ROTOS </option>

          </select>
              
              <br>
              <input type="text" class="form-control"placeholder="ID" id="txt_id_tipo_reproceso" name="txt_id_tipo_reproceso" style="display: none">
              <input type="text" class="form-control"placeholder="INGRESAR TIPO DE REPROCESO"  required="required" id="txt_tipo_reproceso_editar" name="txt_tipo_reproceso_editar">
            <br>
              
            <input type="submit" class="form-control bg-success"  value="REALIZAR CAMBIO" id="btn_registrar_editar" name="btn_registrar_editar" 
         onclick=" $('#form_editar').on('submit', function (event) {event.preventDefault();editar_reproceso($('#txt_id_tipo_reproceso').val(), $('#select_editar').val(), $('#txt_tipo_reproceso_editar').val(),$('#select_tipo_sub_editar').val());});">
 
          </div>

           
          
          
      </div>
    </div>
         </form>
  </div>
                 
      