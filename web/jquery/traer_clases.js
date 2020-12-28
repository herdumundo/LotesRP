  $(document).ready(function(){
     no_volver_atras();
     traer_menu();
 });
 function no_volver_atras(){

   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button" //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";}
 
}
   function ir_registro_tipo_reproceso(){
           
            $.get('contenedor_registro_tipo_reproceso.jsp',function(data){
            $("#contenido_2").html('');
            $('#contenido_2').show();
            $("#contenido_2").html(data);
         
          $('#contenido').hide();
           $('#contenido_eliminar').hide();
          $('#contenido_password').hide();
          $('#contenido_visualizar').hide();
            llenar_grilla_tipo_reproceso();
      
                                     }); } 
      function llenar_grilla_tipo_reproceso(){
           
            $.get('grilla_registro_tipo_reproceso.jsp',function(data){
            $("#div_grilla_registro").html('');
            $("#div_grilla_registro").html(data);
            $('#tabla_reproceso').bootstrapTable();
 
      
                                     }); }                             
 

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
           url: 'control_editar_tipo_reproceso.jsp',                    
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
                    
                    $.get('control_eliminar_tipo_reproceso.jsp',
                    
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
                                 
                                               
function habilitar_boton_registrar()
	{
	$('#tipo_almacenamiento').change(function(){
        $('#btn_registrar').removeAttr('disabled');
        });}
 function traer_menu(){
           
  $.get('contenedor_menu.jsp',function(res){
     $("#contenido").html(res);
     $('#contenido').show();
     $('#contenido_reporte').hide();
     $('#contenido_2').hide();
     $('#contenido_eliminar').hide();
     $('#contenido_password').hide();
     $('#contenido_visualizar').hide();  
     $('#contenido_retenido').hide(); 
  });
  
 }
 
 
 
 function traer_menu(perfil){
           
  $.get('contenedor_menu.jsp',function(res){
     $("#contenido").html(res);
     $('#contenido').show();
     $('#contenido_reporte').hide();
     $('#contenido_2').hide();
     $('#contenido_eliminar').hide();
     $('#contenido_password').hide();
     $('#contenido_visualizar').hide();  
     $('#contenido_retenido').hide(); 
    
      if(perfil=="U"){
         $('#div_panel').hide();  
    }
    else if(perfil=="A") {
        
         $('#div_panel').show();  
    }
   });
 //  
   
 }
 
 
 
 
 
 
          function ir_panel(){
           
            $.get('contenedor_menu_panel.jsp',function(data){
            $("#contenido").html('');
            $('#contenido').show();
            $("#contenido").html(data);
           
                                     }); }     
function traer_registro(){
  $("#contenido_2").html(""); 
  $.get('contenedor_registro.jsp',function(res){
    $("#contenido_2").html(res);
    $('#contenido').hide();
    $('#contenido_eliminar').hide();
    $('#contenido_password').hide();
    $('#contenido_reporte').hide();
    $('#contenido_visualizar').hide();
    $('#contenido_retenido').hide();
    $('#contenido_2').show();
    //$("#nro_empacadora").bsMultiSelect();
    $('#calendario_registro').datepicker() ;
    $('#fecha_puesta').datepicker();
     inicializar_unidad_medida();
        animacion_loading();
        //$("#nro_empacadora").bsMultiSelect();
  
  });
                            }
 

      
      
        function traer_registro_retenido(){
           
             $.get('contenedor_registro_retenido.jsp',function(res){
             $("#contenido_retenido").html('');
             $("#contenido_retenido").html(res);
             $('#contenido_retenido').show();
             $('#contenido').hide();
             $('#contenido_2').html('');
             $('#contenido_eliminar').hide();
             $('#contenido_password').hide();
             $('#contenido_reporte').hide();
             $('#contenido_visualizar').hide();
             $('#calendario_registro').datepicker();
             $('#fecha_puesta').datepicker();
              // $("#nro_empacadora_registro_retenido").bsMultiSelect();
            
                  unidad_medida_registrar_retenido();
                     
              });
                                             }
      
      
      
            function traer_retenido(){
           
             $.get('contenedor_retenidos.jsp',function(res){
                   $("#contenido_retenido").html('');
             $("#contenido_retenido").html(res);
             $('#contenido_retenido').show();
             $('#contenido').hide();
             $('#contenido_2').hide();
             $('#contenido_eliminar').hide();
             $('#contenido_password').hide();
             $('#contenido_reporte').hide();
             $('#contenido_visualizar').hide();
              $('#calendario_retenido').datepicker();
           //  filtrar_retenido();
             filtrar_grilla_retenido();
              
             
             
             });
             
           
      }
           function traer_retenido_fecha_puesta(){
           
             $.get('contenedor_retenidos_puesta.jsp',function(res){
                   $("#contenido_retenido").html('');
             $("#contenido_retenido").html(res);
             $('#contenido_retenido').show();
             $('#contenido').hide();
             $('#contenido_2').hide();
             $('#contenido_eliminar').hide();
             $('#contenido_password').hide();
             $('#contenido_reporte').hide();
             $('#contenido_visualizar').hide();
              $('#calendario_retenido').datepicker();
           //  filtrar_retenido();
             filtrar_grilla_retenido();
              
             
             
             });
             
           
      }
      
      
      
         function traer_eliminar(){
           
             $.get('contenedor_eliminar.jsp',function(res){
             $("#contenido_eliminar").html(res);
             $('#contenido_eliminar').show();
             $('#contenido').hide();
             $('#contenido_2').hide();
             $('#contenido_password').hide();
             $('#contenido_reporte').hide();
             $('#contenido_visualizar').hide();
             $('#contenido_retenido').hide(); 
             $('#calendario_eliminar').datepicker();
             
                     elminar_fila();

                             tabla_render();                               });
                                    }
      
      
      function traer_informe(){
           
                 $.get('contenedor_informe.jsp',function(res){
                 $("#contenido_visualizar").html(res);
                 $('#contenido').hide();
                 $('#contenido_2').hide();
                 $('#contenido_eliminar').hide();
                 $('#contenido_password').hide();
                 $('#contenido_reporte').hide();
                 $('#contenido_visualizar').show();
                 $('#contenido_retenido').hide();  
                 tabla_render();
                                                               });
                               }
      
       function traer_insert(){
           
          $.get('lotes_control.jsp',function(res){
                    $("#contenido_2").html(res);
          });
           $('#contenido').hide();
   $('#contenido_2').show();
          
      }
      
      
         function traer_control(){
          
                    
          $.get('control_registro.jsp',function(res){
                    $("#contenido_2").html(res);
          });
           
   $('#contenido_2').show();
         $('#contenido').hide();  
      }
      
        function traer_contendor_cambiar_pass_jsp(){
           
                    $.get('contenedor_password.jsp',function(res){
                    $("#contenido_password").html(res);
                    $('#contenido_password').show();
                    $('#contenido').hide();
                    $('#contenido_2').hide();
                    $('#contenido_reporte').hide();
                    $('#contenido_eliminar').hide();
                    $('#contenido_visualizar').hide();
                                                                  });
                                                    }
       

  function traer_contendor_pdf_jsp(){
           
          $.get('contenedor_pdf.jsp',function(res){
          $("#contenido_reporte").html(res);
          $('#contenido_reporte').show();
          $('#contenido').hide();
          $('#contenido_2').hide();
          $('#contenido_eliminar').hide();
          $('#contenido_password').hide();
          $('#contenido_visualizar').hide();
          $('#calendario').datepicker();
                                                  });
         
                                     }
                                     
                                     
                                     
                 function traer_carro_mesa(){
                     
                     
                    $.get('contenedor_carro_mesa.jsp',function(res){
                        $("#contenido_reporte").html('');
              $("#contenido_reporte").html(res);
          $('#contenido_reporte').show();
                           $('#contenido').hide();
          $('#contenido_2').hide();
                       $("#calendario_mesa").datepicker();
                        filtrar_grilla_carromesa();     
                elminar_fila();
                    });
                     
                  }                 
                 
                 
                 
         function traer_contendor_pdf_reproceso(){
           
          $.get('contenedor_pdf_reproceso.jsp',function(res){
           $("#contenido_reporte").html('');
              $("#contenido_reporte").html(res);
          $('#contenido_reporte').show();
          $('#contenido').hide();
          $('#contenido_2').hide();
          $('#contenido_eliminar').hide();
          $('#contenido_password').hide();
          $('#contenido_visualizar').hide();
          $('#calendario_reporte_reproceso').datepicker();
                                                  });
         
                                     }  
                    function ir_reporte_rotos(){
           
          $.get('contenedor_reporte_rotos.jsp',function(res){
           $("#contenido_reporte").html('');
              $("#contenido_reporte").html(res);
          $('#contenido_reporte').show();
          $('#contenido').hide();
          $('#contenido_2').hide();
          $('#contenido_eliminar').hide();
          $('#contenido_password').hide();
          $('#contenido_visualizar').hide();
          $('#calendario_reporte_rotos').datepicker();
                                                  });
         
                                     }                     
                                     
         function traer_grilla_retenido(){
           
          $.get('contenedor_grilla_reproceso.jsp',function(res){
           $("#contenido_2").html('');
              $("#contenido_2").html(res);
              $("#contenido_2").show();
          $('#contenido_reporte').html('');
          $('#contenido').html('');
          $('#contenido_eliminar').html('');
          $('#contenido_password').html('');
          $('#contenido_visualizar').html('');
         
                                                  });
         
                                     }                                    
                                     
                                     
                                     
                      function traer_reporte_lotes(){
           
          $.get('contenedor_reporte_carros.jsp',function(res){
           $("#contenido_2").html('');
              $("#contenido_2").html(res);
              $("#contenido_2").show();
          $('#contenido_reporte').html('');
          $('#contenido').html('');
          $('#contenido_eliminar').html('');
          $('#contenido_password').html('');
          $('#contenido_visualizar').html('');
         $("#calendario_reporte_carros").datepicker();
                                                  });
         
                                     }                    
                                     


  function traer_control_eliminar(id){
                    
            $.get('eliminar_control.jsp',{id:id},function(res){
             
                $('#'+id+'').remove();
                
              swal.fire({
            type: 'error',
            title: "REGISTRO ELIMINADO ",
            confirmButtonText: "CERRAR"
            });   
               
            
            });  
                } 
                                       
                                        
                                        
                                        
    function traer_grilla_reproceso(){
           
          $.get('grilla_reproceso.jsp',function(res){
           $("#contenedor_grilla_reproceso").html(res);
           
         
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