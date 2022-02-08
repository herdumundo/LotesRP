
    
    
    
    
    <div class="row" id="div_principal">
        <div class="col-xl-3 col-sm-6 mb-3 "   onclick="traer_registro()" >
              <div class="card text-white bg-primary o-hidden h-100">
                <div class="card-body">
                  <div class="card-body-icon">
                    <i class="fa fa-fw fa-registered"></i>
                  </div>
                  <div class="mr-5">Registro</div>
                </div>
                  <a id="boton_registrar" class="card-footer text-white clearfix small z-1"  ">
                  <span class="float-left">IR</span>
                  <span class="float-right">
                    <i class="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
        </div>
          
         

    <div class="col-xl-3 col-sm-6 mb-3" onclick="ir_carro_a_mesa()">
          <div class="card text-white bg-dark o-hidden h-100" >
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-cart-plus"></i>
              </div>
              <div class="mr-5">Carros a mesas</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1"  >
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
          
          

    <div class="col-xl-3 col-sm-6 mb-3 "  id="modulo_rp_tradi" onclick="ir_registro_reproceso_tradicional()" >
          <div class="card text-white bg-warning o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-registered"></i>
              </div>
              <div class="mr-5">Registro Reprocesos Aviarios tradicional</div>
            </div>
              <a id="boton_registrar" class="card-footer text-white clearfix small z-1"  ">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
          


    
    
    
    
    
    
    
          
 
          
    <div class="col-xl-3 col-sm-6 mb-3" >
          <div class="card text-white  bg-success o-hidden h-100" onclick="traer_informe()">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calendar-check-o"></i>
              </div>
              <div class="mr-5">Visualizar registros</div>
            </div>
              <a class="card-footer   text-white clearfix small z-1" href="#" onclick="traer_informe()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
          
          
        

         <div class="col-xl-3 col-sm-6 mb-3" >
          <div class="card text-white bg-primary o-hidden h-100" onclick="traer_contendor_pdf_reproceso('contenedor_pdf_reproceso')">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calculator"></i>
              </div>
              <div class="mr-5">Generar reportes de reproceso y subproductos</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_pdf_reproceso()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>

 
    
    <div class="col-xl-3 col-sm-6 mb-3" id="modulo_rep_repro" >
          <div class="card text-white bg-warning o-hidden h-100" onclick="traer_contendor_pdf_reproceso('contenedor_pdf_reproceso_tradicional')">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calculator"></i>
              </div>
              <div class="mr-5">Generar reportes de reproceso aviario tradicionales</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_pdf_reproceso()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>

    
    


    <div class="col-xl-3 col-sm-6 mb-3" >
          <div class="card text-white bg-danger o-hidden h-100" onclick="traer_eliminar()">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-eraser"></i>
              </div>
              <div class="mr-5">Eliminar registros</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="traer_eliminar()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


  <div class="col-xl-3 col-sm-6 mb-3" >
      <div class="card text-white bg-danger o-hidden h-100" onclick="ir_reporte_rotos()">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-eraser"></i>
              </div>
              <div class="mr-5">Reporte de rotos</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="ir_reporte_rotos()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


 <div class="col-xl-3 col-sm-6 mb-3"onclick="ir_transferencias_reprocesos()" >
      <div class="card text-white bg-danger o-hidden h-100" >
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-eraser"></i>
              </div>
              <div class="mr-5">Transferencias de reprocesos</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#"  >
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


 <div class="col-xl-3 col-sm-6 mb-3" href="#" onclick="ir_transferencias_subproductos()" >
      <div class="card text-white bg-warning o-hidden h-100" >
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-eraser"></i>
              </div>
              <div class="mr-5">Transferencias de subproductos</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1"  >
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


<div class="col-xl-3 col-sm-6 mb-3" onclick="ir_panel()" id="div_panel" style="display: none">
      <div class="card text-white bg-warning o-hidden h-100" >
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-eraser"></i>
              </div>
              <div class="mr-5">PANEL DE CONTROL</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1"  >
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>  
   <div class="col-xl-3 col-sm-6 mb-3" >
          <div class="card text-white  bg-success o-hidden h-100" onclick="traer_contendor_cambiar_pass_jsp()">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-user"></i>
              </div>
              <div class="mr-5">CAMBIAR CONTRASEÑA</div>
            </div>
              <a class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_cambiar_pass_jsp()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div> 
    

<div class="col-xl-3 col-sm-6 mb-3" id="modulo_inf_pendientes"  href="#" onclick="ir_informe_pendientes_alimentacion()" >
          <div class="card text-white bg-danger o-hidden h-100" >
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calculator"></i>
              </div>
              <div class="mr-5">Informe lotes pendientes a alimentar.</div>
            </div>
              <a   class="card-footer text-white clearfix small z-1"  >
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
 <div class="col-xl-3 col-sm-6 mb-3"   >
          <div class="card text-white bg-dark o-hidden h-100" onclick="traer_contendor_pdf_reproceso('contenedor_pdf_transferencia_reproceso')">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calculator"></i>
              </div>
              <div class="mr-5">Generar reportes de transferencias</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_pdf_reproceso()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


</div>





  

<div class="col-xl-3 col-sm-6 mb-3 "   onclick="ir_registro_sp_tradicional()" id="modulo_subp">
          <div class="card text-white bg-success o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-registered"></i>
              </div>
              <div class="mr-5">Registro Subproductos Aviarios tradicional</div>
            </div>
              <a id="boton_registrar" class="card-footer text-white clearfix small z-1"  ">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
       <div class="col-xl-3 col-sm-6 mb-3" id="modulo_subp_pass" >
          <div class="card text-white  bg-success o-hidden h-100" onclick="traer_contendor_cambiar_pass_jsp()">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-user"></i>
              </div>
              <div class="mr-5">CAMBIAR CONTRASEÑA</div>
            </div>
              <a class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_cambiar_pass_jsp()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div> 


 <div class="col-xl-3 col-sm-6 mb-3" id="modulo_rep_subp"  >
          <div class="card text-white bg-dark o-hidden h-100" onclick="traer_contendor_pdf_reproceso('contenedor_pdf_subproducto_tradicional')">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-calculator"></i>
              </div>
              <div class="mr-5">Generar reportes de subproductos aviario tradicional</div>
            </div>
              <a id="boton_eliminar" class="card-footer text-white clearfix small z-1" href="#" onclick="traer_contendor_pdf_reproceso()">
              <span class="float-left">IR</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>


 
    