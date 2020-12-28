 function filtro_eliminar(){
                    $("#buscar_eliminar").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                     $("#grilla_eliminar tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
                      };
                      
     
         function traer_detalle_eliminar(fecha){
               $.get('grilla_eliminar.jsp',{fecha:fecha},function(res){
                    $("#grilla_eliminar").html(res);
    });  } 
         function visible_div_eliminar(){
             var elemento = document.getElementById("div_eliminar");
             elemento.style.display = 'block';
    
}

        
        