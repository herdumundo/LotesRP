        function detalle_reproceso(calendario,combo_disposicion){
        $.get('grilla_reproceso.jsp',{calendario:calendario,combo_disposicion:combo_disposicion},function(res){
        $("#contenedor_grilla_reproceso").html(res);
        $("#box_reproceso").on('click',function(){
        chequear_reproceso();
                                                    });
                                                                            });
                                                }
             function chequear_reproceso(){
            var checked = $("#box_reproceso").prop('checked');
            $('#contenedor_grilla_reproceso').find('input:checkbox').prop('checked', checked);
                                            }
            function setear_check()    {     
            var arr = $('[name="checks[]"]:checked').map(function(){
            return this.value;
            }).get();
            var resultado_seleccionado = arr.join(',');
            $('#caja_check').val(resultado_seleccionado);
                                        }    
                    
        
        
        function validar (){
            
          setear_check();
                var fecha_alimentacion= $("#calendario_alimentacion").val();
                var fecha_clasificacion= $("#calendario_reproceso").val();
                var combo_disposicion=$("#disposicion").val();
                var resultado=$("#caja_check").val();  
                
                
                  if(combo_disposicion===""){
                       
                       
                        aviso();
                       
                       
                       
                   }  
                
                if(combo_disposicion==="6"||combo_disposicion==="7"){
             if(resultado===""||fecha_alimentacion===""||fecha_clasificacion==="")   {
                
                aviso();
                
                                                                                     }
                else {
               enviar_datos_reproceso();
               // aviso2();
                         }
                              }
                            
                   if(combo_disposicion==="8"||combo_disposicion==="9"){
                       
                       
                      if(resultado===""||fecha_clasificacion==="")   {
                
                aviso();
                
                                                                                     }
                else {
              enviar_datos_reproceso(); 
              // aviso2();
                         }
                       
                       
                       
                   }          
                            
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
                        ); 
            
            
            }
            
            
            function ver_div(){
                var disposicion=$("#disposicion").val();
                
                if (disposicion==="6"||disposicion==="7"||disposicion==="9"){
                $("#contenido_grilla").show();
                $("#div_registro").show();}
            
         if (disposicion==="8"){
                $("#contenido_grilla").hide();
                $("#div_registro").show();
            
                }
                                }
            
            