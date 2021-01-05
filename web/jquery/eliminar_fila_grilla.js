   function elminar_fila() {
       
       
        $(document).on('click', '.borrar', function (event) {
            event.preventDefault();
            $(this).closest('tr').remove();
        });
    
        }
        
     
                
        