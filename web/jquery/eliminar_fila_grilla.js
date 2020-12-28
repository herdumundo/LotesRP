   function elminar_fila() {
       
       
        $(document).on('click', '.borrar', function (event) {
            event.preventDefault();
            $(this).closest('tr').remove();
        });
    
        }
        
    
               function Eliminar_fila_carro_mesa(){
                   var codi;
                 codi=$('#codigo_carro').val();  
                  $('#'+codi+'').remove();
                  
                 $('#boton_reg').attr("data-dismiss","modal");
                  enviar_datos_carromesa();
                 $('#codigo_mesa').val('');
                
                 
                }
                
                
        