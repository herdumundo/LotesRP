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
           url: "control_registro.jsp",                    
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
     
      function enviar_datos_retenidos2() {

        $.ajax({
        type: "POST",
        url: "control_insert_retenidos.jsp",
        data: $("#formulario_retenido").serialize(),
        success: function(data) {
         $('#contenido_retenido').html(data);
                                }
                });
 
                                              };
     
     function enviar_datos_carromesa() {

        $.ajax({
          type: "POST",
          url: "control_carro_mesa.jsp",
          data: $("#formulario_carro_mesa").serialize(),
          success: function(data) {
         //   $('#contenido_reporte').html(data);
                                    }
        });

       };  
     
      
      
      function enviar_datos_reproceso() {

        $.ajax({
          type: "POST",
          url: "control_reproceso.jsp",
          data: $("#formulario_reproceso").serialize(),
          success: function(data) {
          $('#contenedor_grilla_reproceso').html(data);
                                    }
        });

       }; 
