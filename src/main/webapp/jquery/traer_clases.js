  var ruta_contenedores="./contenedores/";
  var ruta_controles="./controles/";
  var ruta_grillas="./grillas/";
  var ruta_consultas="./consultas/";
    $(document).ready(function(){
     no_volver_atras();
     traer_menu($('#perfil').val());
 });
    function no_volver_atras(){

   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button" //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";}
 
}
    function traer_menu(perfil){
        $.get(ruta_contenedores+'contenedor_menu.jsp',function(res){
        $("#contenido").html(res);
        $("#contenido").show();
        $("#contenido_registros").html('');
        if(perfil=="U")
        {
            $('#div_panel').remove();  
             if($('#area_login').val()=="S")
            {
               $('#div_principal').remove(); 
                }
            
             else if($('#area_login').val()=="O")
            {
                $('#modulo_subp').remove(); 
                $('#modulo_subp_pass').remove(); 
                $('#modulo_rep_subp').remove(); 
                      
            }
            
              else if($('#area_login').val()=="A"||$('#area_login').val()=="B"||$('#area_login').val()=="H")
            {
                $('#modulo_subp').remove(); 
                $('#modulo_subp_pass').remove(); 
                $('#modulo_rp_tradi').remove(); 
                $('#modulo_rep_subp').remove(); 
                $('#modulo_rep_repro').remove(); 
            }
        }
        else if(perfil=="A") 
        {
            $('#div_panel').show();  
     
        /*    if($('#area_login').val()!="O")
            {
                $('#modulo_rp_tradi').remove(); 
                $('#modulo_rep_repro').remove(); 
                $('#modulo_subp').remove(); 
                $('#modulo_subp_pass').remove(); 
            }
            */
            if($('#area_login').val()=="S")
            {
               $('#div_principal').remove(); 
                }
            
             else if($('#area_login').val()=="O")
            {
                $('#modulo_subp').remove(); 
                $('#modulo_subp_pass').remove(); 
                $('#modulo_rep_subp').remove(); 
                      
            }
            
              else if($('#area_login').val()=="A"||$('#area_login').val()=="B"||$('#area_login').val()=="H")
            {
                $('#modulo_subp').remove(); 
                $('#modulo_subp_pass').remove(); 
                $('#modulo_rp_tradi').remove(); 
                $('#modulo_rep_subp').remove(); 
                $('#modulo_rep_repro').remove(); 
            }
        }
   });
    }
    
    function traer_eliminar()
    {
        $.get(ruta_contenedores+'contenedor_eliminar.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_eliminar').datepicker();
         elminar_fila();

                          });
    }
                                    
    function ir_panel()
    {
           
            $.get(ruta_contenedores+'contenedor_menu_panel.jsp',function(data){
            $("#contenido").html('');
            $('#contenido').show();
            $("#contenido").html(data);
           
                                     }); 
    }     
    
    function ir_registro_tipo_reproceso(){
        $.get(ruta_contenedores+'contenedor_registro_tipo_reproceso.jsp',function(data){
        $("#contenido_registros").html('');
        $('#contenido_registros').show();
        $("#contenido_registros").html(data);
        $('#contenido').hide();
        llenar_grilla_tipo_reproceso(); 
    
        
        }); } 

    function traer_grilla_carromesa(fecha_carromesa){
        $.get(ruta_grillas+'grilla_carros_mesas.jsp',{fecha_carromesa:fecha_carromesa},function(res){
        $("#div_grilla_carromesa").html(res);
        $('#tabla_carromesa').DataTable();
                }); }

         function traer_detalle_eliminar(fecha){
               $.get(ruta_grillas+'grilla_eliminar.jsp',{fecha:fecha},function(res){
                   
                    $("#div_eliminar").html('');
                    $("#div_eliminar").html(res);
                    $("#grilla_eliminar").DataTable();
                    
                    
    });  } 
    function traer_registro(){
        $("#contenido_2").html(""); 
        $.get(ruta_contenedores+'contenedor_registro.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_registro').datepicker() ;
        $('#fecha_puesta').datepicker();
        inicializar_unidad_medida();
        animacion_loading(); }); }


function ir_registro_reproceso_tradicional(){
        $("#contenido_2").html(""); 
        $.get(ruta_contenedores+'contenedor_registro_tradicional.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_registro').datepicker() ;
        $('#fecha_puesta').datepicker();
        inicializar_unidad_medida();
        animacion_loading(); }); }


function ir_registro_sp_tradicional(){
        $("#contenido_2").html(""); 
        $.get(ruta_contenedores+'contenedor_registro_tradicional_supro.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_registro').datepicker() ;
        $('#fecha_puesta').datepicker();
        inicializar_unidad_medida();
        animacion_loading(); }); }


    function traer_informe(){
        $.get(ruta_contenedores+'contenedor_informe.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_informe').datepicker({  uiLibrary: 'bootstrap4' }); }); }

    function traer_contendor_cambiar_pass_jsp(){
        $.get(ruta_contenedores+'contenedor_password.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide(); }); }
       
    function traer_contendor_pdf_jsp(){
        $.get(ruta_contenedores+'contenedor_pdf.jsp',function(res){
        $("#contenido_2").html(res);
        $('#contenido').hide(); }); }
    
    function traer_reporte_lotes(){
           
          $.get(ruta_contenedores+'contenedor_reporte_carros.jsp',function(res){
           $("#contenido_2").html('');
              $("#contenido_2").html(res);
              $("#contenido_2").show();
           
          $('#contenido').html('');
         
         $("#calendario_reporte_carros").datepicker();
                                                  });
         
                                     }                    
 
    function ir_carro_a_mesa(){
        $.get(ruta_contenedores+'contenedor_carro_mesa.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $('#contenido').hide();
        $("#calendario_mesa").datepicker(); }); }    
    
    function ir_reporte_rotos()
    {
        $.get(ruta_contenedores+'contenedor_reporte_rotos.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_reporte_rotos').datepicker();
                                                    });

    }  
    
  
      function ir_transferencias_reprocesos()
    {
        $.get(ruta_contenedores+'contenedor_registro_transferencias_reprocesos.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
                                                     });

    }  
  
    function traer_contendor_pdf_reproceso(pagina)
    {
        $.get(ruta_contenedores+pagina+'.jsp',function(res){
        $("#contenido_registros").html('');
        $("#contenido_registros").html(res);
        $("#contenido").hide();
        $('#calendario_reporte_reproceso').datepicker(); });  
        
    }  
    
   
 
    function cuadro_registro(id_carrito,nro_carro) {
       Swal.fire
        (
            {
                title: 'AGREGAR NRO MESA A CARRO NRO. '+ nro_carro,
                type: 'warning',
                html:  '<form id="form_carros_mesa"> \n\
                        <input type="text" class=" form-control" placeholder="Codigo de mesa" id="txt_mesa" name="txt_mesa" required>\n\
                        <br><br><br><input type="submit" class="form-control bg-success" value="REGISTRAR" id="btn_reg">  \n\
                        </form>',
                showCancelButton: false,
                showConfirmButton: false
            }
    );
    $('#form_carros_mesa').on('submit', function(e){ e.preventDefault(); enviar_datos_carromesa(id_carrito,$('#txt_mesa').val()); });   
   }

    function visible(){
        var estado= $("#estado_requerido").val();
        if (estado==="R"){
            $("#combo_retenido").show();
            $("#liberado_por").hide();
            }
        if (estado==="L"){
            $("#liberado_por").show();
            $("#combo_retenido").hide();
        } }

    function llenar_grilla_tipo_reproceso(){
           
            $.get(ruta_grillas+'grilla_registro_tipo_reproceso.jsp',function(data){
            $("#div_grilla_registro").html('');
            $("#div_grilla_registro").html(data);
            $('#tabla_reproceso').DataTable();
 
      
                                     }); }                             
 
    function principal(){
    
      $.get(ruta_grillas+'grilla_normal.jsp',({calendario_informe:$('#calendario_informe').val()}),function(data){
            $("#div_grilla_registro").html('');
                $('#div_grilla').html(data);
                $("#grilla_registros").DataTable();  });
        }
   
    function editar_reproceso (id,clasificadora,descripcion,tipo_reproceso){
        Swal.fire({
           title: 'MODIFICACION DE TIPO DE REPROCESO',
        text: 'DESEA EDITAR EL TIPO SELECCIONADO?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, EDITAR!',
        cancelButtonText: 'NO, CANCELAR!'
            }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000)
                } 
            });  
           
              
               $.ajax({                        
           type: "POST",                 
           url: ruta_controles+'control_editar_tipo_reproceso.jsp',                    
           data: ({clasificadora:clasificadora,descripcion:descripcion,id:id,tipo_reproceso:tipo_reproceso}),
           success: function(data)            
           {
            
                    aviso_editado_tipo_reproceso(data.mensaje_impresion,data.mensaje,data.tipo_mensaje,clasificadora,descripcion,id,tipo_reproceso);
            
           }
         });
          }
        });   
     
 }
 
    function aviso_editado_tipo_reproceso(mensaje_impresion,mensaje,tipo_mensaje,clasificadora,descripcion,id,tipo_reproceso){
       swal.fire({
                 type:  mensaje_impresion,
                 title:  mensaje,
                    confirmButtonText: "CERRAR"
                    });    
                  
        if (tipo_mensaje=="1"){
                      var area_res;
                      var tipo;
                      if(clasificadora=='OVO'){
                          area_res="LAVADOS";
                      }
                     else  if(clasificadora=='CCH'){
                          area_res="CLASIFICADORAS";
                      }
                      else if(clasificadora=='CCHO'){
                          area_res="CLASIFICADORAS Y LAVADOS";
                      }
                      
                      if (tipo_reproceso=="SUB"){
                        tipo="SUBPRODUCTO";  
                      }
                      else {
                     tipo="REPROCESO";  

                      }
                        $("#"+id+'_1').html(descripcion);
                        $("#"+id+'_2').html(area_res);
                        $("#"+id+'_3').html(tipo);

                   $('.modal').click();   
                               llenar_grilla_tipo_reproceso();

                } }  
 
    function aviso_eliminar_reproceso(id,descripcion){
    
      Swal.fire({
           title: '¿Seguro que deseas ELIMINAR el registro?',
        text: 'Eliminar el tipo de reproceso,'+ descripcion,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
           confirmButtonText: 'SI, ELIMINAR!',
           cancelButtonText: 'NO, CANCELAR!'
            }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000)
                } 
            });  
            
            
            control_eliminar_reproceso(id);
           
         
        }
        });   
}

    function  control_eliminar_reproceso(id){
                    
                    $.get(ruta_controles+'control_eliminar_tipo_reproceso.jsp',
                    
                    {id:id},function(res){
                        
                   aviso_eliminar_tipo_reproceso(res.mensaje_impresion,res.mensaje,id,res.tipo_mensaje);
                         
                                          });
                                        }  
                                        
    function aviso_eliminar_tipo_reproceso(mensaje_impresion,mensaje,id,tipo_mensaje){
       swal.fire({
                 type:  mensaje_impresion,
                 title:  mensaje,
                    confirmButtonText: "CERRAR"
                    }); 
                if (tipo_mensaje=="1"){
                     $('#'+id+'').remove();
                }  
    
 }                                       
                                 
    function habilitar_boton_registrar() {
	$('#tipo_almacenamiento').change(function(){
        $('#btn_registrar').removeAttr('disabled');
        });}
 
 
 
      function enviar_datos_lotes_tradicionales(total){
        Swal.fire({
           title: 'CONFIRMACION',
           text: "DESEA REGISTRAR LOS DATOS?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
           confirmButtonText: 'SI, REGISTRAR!',
           cancelButtonText: 'NO, CANCELAR!'
        }).then((result) => {
        if (result.value) 
        {
            Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000)
                } 
            });  
             $.ajax(
                     {                        
                        type: "POST",                 
                        url: ruta_controles+"control_registro_tradicional.jsp",                    
                        data: ({ txt_cantidad:total,fecha_puesta:$('#fecha_puesta').val(),cod_carrito:$('#cod_carrito').val(),
                        tipo_huevo:$('#tipo_huevo').val(),unidad_medida:$('#unidad_medida').val(),
                        hora_desde:$('#hora_desde').val(),hora_hasta:$('#hora_hasta').val(),
                        calendario_registro:$('#calendario_registro').val(),tipo_aviario:$('#tipo_aviario').val(),
                        txt_responsable:$('#txt_responsable').val(),txt_liberado:$('#txt_liberado').val(),
                        txt_obs:$('#txt_obs').val(),cbox_reproceso:$('#cbox_reproceso').val(),
                        cbox_sub:$('#cbox_sub').val(),cbox_zona_liberado:$('#cbox_zona_liberado').val()  }),
                        success: function(data)            
                        {    
                            if(data.tipo_respuesta=="1")
                            {
                                Swal.fire(data.mensaje, '', 'success');
                             
                                traer_menu("U")
                            }
                            else 
                            {
                                Swal.fire(data.mensaje, '', 'error');
                            }
                        }
                    });       
        }
        });                          
  }   
 
 
    function enviar_datos_lotes(total){
        Swal.fire({
           title: 'CONFIRMACION',
           text: "DESEA REGISTRAR LOS DATOS?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
           confirmButtonText: 'SI, REGISTRAR!',
           cancelButtonText: 'NO, CANCELAR!'
        }).then((result) => {
        if (result.value) {
        Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000)
                } 
            });  
             $.ajax({                        
           type: "POST",                 
           url: ruta_controles+"control_registro.jsp",                    
           data: ({ txt_cantidad:total,fecha_puesta:$('#fecha_puesta').val(),cod_carrito:$('#cod_carrito').val(),
                    tipo_huevo:$('#tipo_huevo').val(),unidad_medida:$('#unidad_medida').val(),
                    hora_desde:$('#hora_desde').val(),hora_hasta:$('#hora_hasta').val(),
                    calendario_registro:$('#calendario_registro').val(),tipo_aviario:$('#tipo_aviario').val(),
                     txt_responsable:$('#txt_responsable').val(),txt_liberado:$('#txt_liberado').val(),
                      txt_obs:$('#txt_obs').val(),cbox_reproceso:$('#cbox_reproceso').val(),
                       cbox_sub:$('#cbox_sub').val(),cbox_zona_liberado:$('#cbox_zona_liberado').val()  }),
           success: function(data)            
           {    if(data.tipo_respuesta=="1"){
                 Swal.fire(data.mensaje, '', 'success');
                            traer_registro();
           }
           else {
                Swal.fire(data.mensaje, '', 'error');
           }
                        }
         });       
         
        }
        });                          
  }

    function traer_insert(){
           
          $.get(ruta_controles+'lotes_control.jsp',function(res){
                    $("#contenido_2").html(res);
          });
            $('#contenido').hide();
            $('#contenido_2').show();
          
      }
      
    function traer_grilla_retenido(){
           
          $.get(ruta_contenedores+'contenedor_grilla_reproceso.jsp',function(res){
           $("#contenido_2").html('');
              $("#contenido_2").html(res);
              $("#contenido_2").show();
          
          $('#contenido').html('');
          
         
                                                  });
         
                                     }                                    
    
    function traer_control_eliminar(id){
                    
            $.get(ruta_controles+'eliminar_control.jsp',{id:id},function(res){
             
           
                
              swal.fire({
            type: 'error',
            title: "REGISTRO ELIMINADO ",
            confirmButtonText: "CERRAR"
            });   
              
traer_detalle_eliminar($('#calendario_eliminar').val())            
            });  
                } 
                                       
    function traer_grilla_reproceso(){
           
          $.get(ruta_grillas+'grilla_reproceso.jsp',function(res){
           $("#contenedor_grilla_reproceso").html(res); });
         
                                     }                                     
    
    function validacion_eliminacion(cod_interno,cod_carrito){
        
          Swal.fire({
            title: '¿Seguro que deseas ELIMINAR el registro?',
            text: 'Eliminar carro Nº '+cod_carrito ,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, ELIMINAR!',
            cancelButtonText: 'NO, CANCELAR!'
            }).then((result) => {
            if (result.value) {
            Swal.fire({
            title: 'PROCESANDO!',
           showConfirmlButton:false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => { Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft();}, 1000);
                } 
            });  
           traer_control_eliminar(cod_interno);
         }
        });
    }

    function inicializar_unidad_medida(){
       medida=$("#unidad_medida");     
       tipo_huevo=$("#tipo_huevo");
       tipo_huevo.change(cargar_unidad_medida);
    }

    function unidad_medida_registrar_retenido(){
       medida=$("#unidad_medida");     
       tipo_huevo=$("#tipo_huevo");
       tipo_huevo.change(cargar_unidad_medida);
    }
   
    function cargar_unidad_medida() { 

       medida.children().remove();  

    if (tipo_huevo.val()==="2"||tipo_huevo.val()==="3"||tipo_huevo.val()==="4"||tipo_huevo.val()==="5"
       ||tipo_huevo.val()==="6"||tipo_huevo.val()==="SC"||tipo_huevo.val()==="7") { 
         var nombre_option = new Array();
         var cantidad = new Array();
         nombre_option[0] = "CAJON"; 
         cantidad[0] = "360"; 
         nombre_option[1] = "CARRITO NORMAL";
         cantidad[1] = "4320"; 

         for(var i=0; i< nombre_option.length; i++) {
               medida.append('<option value="' + cantidad[i] + '">' +   nombre_option[i] + '</option>');
         }
    }

     else if (tipo_huevo.val()==="1") {
         var nombre_option = new Array(); 
         var valores = new Array();
         nombre_option[0] = "CAJON GIGANTE"; 
         valores[0] = "180";

          for(var i=0; i< nombre_option.length; i++) {
              medida.append('<option value="' + valores[i] + '">' +   nombre_option[i] + '</option>');
         }

    }

   else if (tipo_huevo.val()==="9" ||tipo_huevo.val()==="8"||tipo_huevo.val()==="RP") {
         var nombre_option = new Array(); 
         var valores = new Array();
         var id_fecha= $('#id_date').val();
         nombre_option[0] = "GRANEL"; 
         valores[0] = "1";

          for(var i=0; i< nombre_option.length; i++) {
              medida.append('<option value="' + valores[i] + '">' +   nombre_option[i] + '</option>');
         }

         $('#cod_carrito').val(id_fecha);

    }

   }  

    function limpiar_campos(){
       var gramos,kg,unidad,plancha;
       unidad=$('#txt_unidad').val('');
       plancha=$('#txt_plancha').val('');
       gramos=$('#txt_gramos').val('');
         kg=$('#txt_kg').val('');
   }
   
    function detalle_reproceso(calendario,combo_disposicion){
        $.get(ruta_grillas+'grilla_reproceso.jsp',{calendario:calendario,combo_disposicion:combo_disposicion},function(res){
        $("#contenedor_grilla_reproceso").html(res);
        $("#box_reproceso").on('click',function(){
        chequear_reproceso(); });
            }); }
        
    function chequear_reproceso(){
            var checked = $("#box_reproceso").prop('checked');
            $('#contenedor_grilla_reproceso').find('input:checkbox').prop('checked', checked);
                                            }
    
    function aviso(){
                swal({   
		title: "ERROR, COMPLETE TODOS LOS DATOS",   
		text: "",   
		timer: 2000,   
                showConfirmButton: false
                    }
                        ); 
                $.preloader.stop();
            }
            
    function aviso2(){
                swal({   
		title: "CORRECTO",   
		text: "",   
		timer: 2000,   
                showConfirmButton: false
            }
                        );  }
  
    function elminar_fila() {
       
       
        $(document).on('click', '.borrar', function (event) {
            event.preventDefault();
            $(this).closest('tr').remove();
        });
    
        }
  
    function enviar_datos_carromesa(id_carrito,codigo_mesa) {

        $.ajax({
          type: "POST",
          url: ruta_controles+"control_carro_mesa.jsp",
          data: ({id_carrito:id_carrito,codigo_mesa:codigo_mesa}),
          
          
          
            beforeSend: function () {
            Swal.fire({
                title: 'PROCESANDO!',
                html: '<strong>ESPERE</strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000); }
                        });  },
        success: function (data) {
            $('#'+id_carrito+'').remove();
                  
                swal.fire({
              type: 'success',
              title: "REGISTRADO CON EXITO.",
              confirmButtonText: "CERRAR" });     
            } 
            
          });

       };  
     
      
  function  registrar_tipo_reproceso(area,desc,tipo_rep){
      
       Swal.fire({
            title: ' ',
            text: 'CREAR EL TIPO DE REPROCESO O SUBPRODUCTO?' ,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO, CANCELAR!'
            }).then((result) => {
            if (result.value) {
           
        $.ajax({
          type: "POST",
          url: ruta_controles+"control_registro_tipo_reproceso.jsp",
          data: ({desc:desc,area:area,tipo_rep:tipo_rep}),
          
          
          
            beforeSend: function () {
            Swal.fire({
                title: 'PROCESANDO!',
                html: '<strong>ESPERE</strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 1000); }
                        });  },
        success: function (data) {
                   
                swal.fire({
              type: 'success',
              title: data.mensaje,
              confirmButtonText: "CERRAR" }); 
                $('#modal_agregar').attr("style","display:none");
                $('.modal-backdrop').hide();
               ir_registro_tipo_reproceso();                
                } 
            
          });
         }
        });
  }
    
    $("#txt_plancha").click(function () {
        $(this).select();
        });
        $("#txt_unidad").click(function () {
   $(this).select();
        });
        
    $("#txt_gramos").click(function () {
        $(this).select();
        });
        $("#txt_kg").click(function () {
     $(this).select();
        });
       
