        function filtrar_grilla_retenido (){
                     $("#buscar_retenido").on("keyup", function() {
                     var value = $(this).val().toLowerCase();
                     $("#tabla_retenido tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
                      }
        function setear_grilla(){     
                      var arr = $('[name="checks[]"]:checked').map(function(){
                      return this.value;
                        }).get();
                      var resultado_seleccionado = arr.join(',');
           
                    $('#resultado_seleccionado').val(resultado_seleccionado);
    
      var combo=$('#estado_requerido').val(); 
     var  select=$("#resultado_seleccionado").val();
    var txt_liberado= $('#liberado_por').val();  
    var estado_liberacion= $('#estado_liberacion').val();  
    var motivo_retencion= $('#motivo_retencion').val();  
    var disposicion= $('#disposicion').val();  
  if( select===""){
      
            swal({   
            title: "ERROR, SELECCIONE LOTE!!!",   
            text: "",   
            timer: 2000,   
            showConfirmButton: false
            });
               $.preloader.stop();
                    }
            else{
                if(combo==="L"){
                      if(txt_liberado===""){
              
                swal({   
                            title: "ERROR, COMPLETE TODOS LOS DATOS!!!",   
                            text: "",   
                            timer: 2000,   

                            showConfirmButton: false
                        }
                          ); 
                            
                                }
                                else{
                                    imprimir();
                                enviar_datos_retenidos2();    
                                }
          
      }
      
      
            if(combo==="R"){
                if(estado_liberacion===null||motivo_retencion===null||disposicion===null ){
              
                swal({   
                            title: "ERROR, COMPLETE TODOS LOS DATOS!!!",   
                            text: "",   
                            timer: 2000,   

                            showConfirmButton: false
                        }
                                    ); 
                            $.preloader.stop(); 
              
          }
          else{
              
               imprimir();
                enviar_datos_retenidos2();    
              
          }
          
        
          
          
      }
   }
         
   } 
   // validar_seleccion();
   // 
    

 function validar_seleccion(){
      if($("#resultado_seleccionado").val()=="") {
          alert("DEBE SELECCIONAR AL MENOS UN LOTE"); 
      }
 }
 
 
    
 function validar_retenido(){

           if($("#desde").val()==""||$("#hasta").val() == ""||$("#calendario_retenido").val() == "") {
       
            alert("ERROR COMPLETAR DATOS"); 
            $.preloader.stop();
         }
         
       
           else {
             traer_detalle_retenido(traer_detalle_retenido($("#calendario_retenido").val(),$("#desde").val(),$("#hasta").val(),$("#estado_requerido").val()));
      $('#divid_grilla_retenido').show(); 
       $('#btn_registrar_retenido').show(); 
    
     }  }
     
     
        function traer_detalle_retenido(fecha_retenido,inicio_retenido,fin_retenido,combo_estado_retenido){
             
         
                $.get('grilla_lotes.jsp',{fecha_retenido:fecha_retenido,inicio_retenido:inicio_retenido,fin_retenido:fin_retenido,combo_estado_retenido:combo_estado_retenido},function(res){
                    $("#divid_grilla_retenido").html(res);
                    $("#box_retenidos").on('click',function(){
                        chequear_todos_retenidos2();
                    })
                });
            }
            
            
            function validar_retenido_puesta(){

           if($("#desde").val()==""||$("#hasta").val() == ""||$("#calendario_retenido").val() == "") {
       
            alert("ERROR COMPLETAR DATOS"); 
            $.preloader.stop();
         }
         
       
           else {
             traer_detalle_retenido_puesta(traer_detalle_retenido_puesta($("#calendario_retenido").val(),$("#desde").val(),$("#hasta").val(),$("#estado_requerido").val()));
      $('#divid_grilla_retenido').show(); 
       $('#btn_registrar_retenido').show(); 
    
     }  }
 function traer_detalle_retenido_puesta(fecha_retenido,inicio_retenido,fin_retenido,combo_estado_retenido){
             
         
                $.get('grilla_lotes_puesta.jsp',{fecha_retenido:fecha_retenido,inicio_retenido:inicio_retenido,fin_retenido:fin_retenido,combo_estado_retenido:combo_estado_retenido},function(res){
                    $("#divid_grilla_retenido").html(res);
                    $("#box_retenidos").on('click',function(){
                        chequear_todos_retenidos2();
                    })
                });
            }            
            
            
            
            
            
            
            
            
            
            
            
            
 
/* function chequear_todos_retenidos(){
     $('.settings').prop('checked', true); 
     var  boton1 =$('#check-all');
 }*/
 function chequear_todos_retenidos2(){
    
    var checked = $("#box_retenidos").prop('checked');
    $('#divid_grilla_retenido').find('input:checkbox').prop('checked', checked);
  
 
 }
    
    
    
        function traer_grilla_carromesa(fecha_carromesa){
             
         
                $.get('grillas/grilla_carros_mesas.jsp',{fecha_carromesa:fecha_carromesa},function(res){
                    $("#tabla_carromesa").html(res);
                     
                });
            }
            
            
             function filtrar_grilla_carromesa (){
                     $("#buscar_carromesa").on("keyup", function() {
                     var value = $(this).val().toLowerCase();
                     $("#tabla_carromesa tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
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
    }
}


 
       function imprimir(){
         

                $.preloader.start({
                    modal: true,
                    src : 'sprites2.png'
                });
                      
                   };
 
        