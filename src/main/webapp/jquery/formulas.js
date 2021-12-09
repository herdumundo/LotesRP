 
 
 
 function procesar() {
     
 
    
    var planchas,unidades,total_plancha_unidades,total,plancha_form,unidades_form,gramos,gramos_form,kg,kg_form,total_gramos,total_unidad_gramos;
    var cod_carrito,hora_desde,hora_hasta,tipo_huevo;
    cod_carrito=$('#cod_carrito').val();
    hora_desde=$('#hora_desde').val();
    hora_hasta=$('#hora_hasta').val();
  
    tipo_huevo =$('#tipo_huevo').val();
    planchas=$('#txt_plancha').val();
    unidades=$('#txt_unidad').val();
    gramos=$('#txt_gramos').val();
    kg=$('#txt_kg').val();

        if(planchas==""){   plancha_form="0";  } 
        else { plancha_form=planchas;}
        if(unidades==""){ unidades_form="0";   }
        else { unidades_form=unidades; }
        if(gramos==""){  gramos_form="0";  }
        else { gramos_form=gramos;   }
        if(kg==""){  kg_form="0";  }
        else { kg_form=kg*1000;   }
        
        total_gramos=    parseFloat(gramos_form)  + parseFloat(kg_form) ;
        total_unidad_gramos=parseFloat(total_gramos)/60;
        total_plancha_unidades=plancha_form*30;
        total=parseFloat(total_plancha_unidades)  + parseFloat(unidades_form)+parseFloat(total_unidad_gramos);
       
               
        if (tipo_huevo==="8"){
            
         if(total==0||
              tipo_huevo===0||cod_carrito.length===0
              ||hora_desde.length===0||hora_hasta.length===0||$('#cbox_sub').val()=="-"
              ){    
                     
                   mensaje_error();
                   }
              else{
                  
                  
                  
                enviar_datos_lotes(total);
                 }
        }
      
       
       else if (tipo_huevo==="9"){
           
              if(total==0||
              tipo_huevo===0||cod_carrito.length===0
              ||hora_desde.length===0||hora_hasta.length===0||$('#cbox_zona_liberado').val()=="-"
              ){     
                  mensaje_error();
                   }
              else{
                enviar_datos_lotes(total);
                 }
            }
       
         else if (tipo_huevo==="RP"){
           
              if(total==0||
              tipo_huevo===0||cod_carrito.length===0
              ||hora_desde.length===0||hora_hasta.length===0||$('#cbox_reproceso').val()=="-"
              ){   
                
             mensaje_error();
                   }
              else{
                enviar_datos_lotes(total);
               
                                     }
           
       } 
    }  

 
 
 
 function procesar_aviario_tradicionales() {
        var planchas,unidades,total_plancha_unidades,total,plancha_form,unidades_form,gramos,gramos_form,kg,kg_form,total_gramos,total_unidad_gramos;
        var cod_carrito,    tipo_huevo;
    cod_carrito=$('#cod_carrito').val();
    
    tipo_huevo  =   $('#tipo_huevo').val();
    planchas    =   $('#txt_plancha').val();
    unidades    =   $('#txt_unidad').val();
    gramos      =   $('#txt_gramos').val();
    kg=$('#txt_kg').val();

        if(planchas==""){   plancha_form="0";  } 
        else { plancha_form=planchas;}
        if(unidades==""){ unidades_form="0";   }
        else { unidades_form=unidades; }
        if(gramos==""){  gramos_form="0";  }
        else { gramos_form=gramos;   }
        if(kg==""){  kg_form="0";  }
        else { kg_form=kg*1000;   }
        
        total_gramos=    parseFloat(gramos_form)  + parseFloat(kg_form) ;
        total_unidad_gramos=parseFloat(total_gramos)/60;
        total_plancha_unidades=plancha_form*30;
        total=parseFloat(total_plancha_unidades)  + parseFloat(unidades_form)+parseFloat(total_unidad_gramos);
       
               
        if (tipo_huevo==="8")
        {
            if(total==0|| tipo_huevo===0||cod_carrito.length===0  )
            {    
                mensaje_error();
            }
            else
            {
                enviar_datos_lotes_tradicionales(total);
            }
        }
        else if (tipo_huevo==="RP")
        {
            if(total==0||  tipo_huevo===0||cod_carrito.length===0 ||$('#cbox_reproceso').val()=="-"  )
            {   
                mensaje_error();
            }
            else
            {
                enviar_datos_lotes_tradicionales(total);
            }
           
       } 
    }  
 
  function calculo() {
        
        var valor_combo,valor_cantidad,resultado;
        valor_combo=document.getElementById('unidad_medida').value;
        valor_cantidad=document.getElementById('txt_cantidad').value;
        resultado=valor_combo*valor_cantidad;
        document.getElementById('txt_resultado_multiplicacion').value=resultado;
                                    }
                                    
   function calculo_aviario_tradicional() {
        
        var  resultado;
        resultado= $('#unidad_medida').val() *$('#txt_cantidad').val();
        $('#txt_resultado_multiplicacion').val(resultado);
                                    }   
                                    
        function limpiar_cantidad() {
        var cantidad1,cantidad2;
        medida=$("#unidad_medida");    
     
        if  (medida.val()==="180"||medida.val()==="360" ) {
         cantidad2= document.getElementById("txt_cantidad").value="";
                                                        } 
        else  {
        cantidad1= document.getElementById("txt_cantidad").value="1";}
                            }

    function contar()   {
        var input=  document.getElementById('cod_carrito');
        input.addEventListener('input',function(){
        if (this.value.length > 9) 
        this.value = this.value.slice(0,9); 
                                                 }); 
                        }

    function soloNumeros(e)
    {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48 && key <= 57) || (key==8))
    }

 

    function visualizar_codigo_borroso_retenido() {
    
    if (                $("#categoria_registro_recogida").val()==="LDO"){
        
                        $('#div_codigo_borroso_registro_recogida').show();
         
     }
     
     else {
                        $('#div_codigo_borroso_registro_recogida').hide();
           
        } }
    
    function setear_si (){
        var arr =       $('[name="codigo_borroso_registro_retenido"]:checked').map(function(){
                      return this.value;
                        }).get();
                        $('#txt_codigo_borroso_registro_retenido').val(arr);
                    
                    
    if (  $("#categoria_registro_recogida").val()!=="LDO"){
        $("#codigo_borroso_registro_retenido").prop('checked', false);
        $('#txt_codigo_borroso_registro_retenido').val('');  
     }
     
     else {
                
           
        } }
 
 //LIBERADOS
 
    function visualizar_zona_liberado() 
    {
        var tipo_huevo=$("#tipo_huevo");
        if (tipo_huevo.val()==="9")
        {
            $('#div_kgramos').show();
            $('#div_cant_plancha').hide();
            $('#div_zona_liberado').show();
            $('#div_reproceso_liberado').hide();
            $('#div_sub_liberado').hide();
            $('#div_grupo_aviario_almacenamiento').show();
            $('#div_empacadora').hide();
            $('#div_estado_liberado_registro').hide();
            $("#cbox_zona_liberado").prop('required',true);
            $("#cbox_reproceso").prop('required',false);
            $("#cbox_zona_liberado").prop('required',false);
            $("#txt_liberado").prop('required',false);
            $("#tipo_aviario").prop('required',false);
            $("#tipo_almacenamiento").prop('required',false);
            $("#txt_liberado").val('');
            $("#nro_empacadora").prop('required',false);
            setear_codigo_rotos();
           $('#txt_responsable').attr('placeholder', 'IDENTIFICACION');
           $('#txt_responsable').hide();

        }
        else if (tipo_huevo.val()==="RP")
        {
            $('#div_kgramos').hide();
            $('#div_cant_plancha').show();
            $('#div_zona_liberado').hide();
            $('#div_reproceso_liberado').show();
            $('#div_sub_liberado').hide();
            $('#div_empacadora').hide();
            $('#div_estado_liberado_registro').hide();
            $('#txt_liberado').hide();
            $("#cbox_reproceso").prop('required',true);
            $("#nro_empacadora").prop('required',false);
            $("#cbox_sub").prop('required',false);
            $("#cbox_zona_liberado").prop('required',false);
            $("#txt_liberado").prop('required',false);
            $("#txt_liberado").val('');
            limpiar_codigo_rotos();
           $('#txt_responsable').attr('placeholder', 'RESPONSABLE');
           $('#txt_responsable').show();

        }


        else if (tipo_huevo.val()==="8")
        {
            $('#div_kgramos').hide();
            $('#div_cant_plancha').show();
            $('#div_zona_liberado').hide();
            $('#div_reproceso_liberado').hide();
            $('#div_sub_liberado').show();
            $('#div_empacadora').hide();
            $('#div_estado_liberado_registro').hide();
            $('#txt_liberado').hide();
            $('#div_grupo_aviario_almacenamiento').show();
            $("#cbox_zona_liberado").prop('required',false);
            $("#cbox_reproceso").prop('required',false);
            $("#txt_liberado").prop('required',false);
            $("#tipo_aviario").prop('required',false);
            $("#txt_liberado").val('');
            $("#nro_empacadora").prop('required',false); 
            limpiar_codigo_rotos();
            $('#txt_responsable').attr('placeholder', 'RESPONSABLE');
            $('#txt_responsable').show();
        }
       
    }
    
                  
                    function setear_codigo_rotos()
                    {
                    var mesa;
                    mesa= $('#id_date').val()+"_"+$('#id_clasificadora').val();
                    $('#cod_carrito').val(mesa);
                        }
    
                    function limpiar_codigo_rotos(){
        
                    $('#cod_carrito').val('');
        
                                                        }