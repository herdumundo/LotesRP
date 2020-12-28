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
   
   function limpiar_campos(){
       var gramos,kg,unidad,plancha;
       unidad=$('#txt_unidad').val('');
       plancha=$('#txt_plancha').val('');
       gramos=$('#txt_gramos').val('');
         kg=$('#txt_kg').val('');
   }