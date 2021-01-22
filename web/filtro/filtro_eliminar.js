 function filtro_eliminar(){
                    $("#buscar_eliminar").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                     $("#grilla_eliminar tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
                      };
                      
     
         function visible_div_eliminar(){
             var elemento = document.getElementById("div_eliminar");
             elemento.style.display = 'block';
    
}

        
        