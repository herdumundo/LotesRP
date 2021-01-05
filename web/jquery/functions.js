 
 
function boton_animacion_validacion_carromesa() {
	swal({   
		title: "Error, debe cargar el numero de mesa.",   
		text: "",   
		timer: 1500,   
               
		showConfirmButton: false 
          
	}
                );
             

} 







function mensaje_error() {
	swal({   
		title: "ERROR",   
		text: "CARGAR DATOS",   
		timer: 1500,   
               
		showConfirmButton: false 
          
	}
                );
             
 } 

 

function eliminar_carros_animacion() {
	swal({   
		title: "¿Seguro que deseas continuar?",   
		text: "Eliminar carro",   
		type: "warning",   
		showCancelButton: true,
		cancelButtonText: "NO",   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "¡ACEPTAR!",   
		closeOnConfirm: false }, 

		function(){   
			swal("¡Hecho!", 
				"Acabas de vender tu alma al diablo.", 
				"error"); 
	});

}
 
