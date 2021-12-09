function animacion_loading2() {
    var screen2 = $('#loading-screen2');
    configureLoadingScreen2(screen2);

    $('.do-request').on('click', function(){
         $.get('http://jsonplaceholder.typicode.com/posts')
             .done(function(result){
                 $('#results').text(JSON.stringify(result, null, 2));
             })
             .fail(function(error){
                 console.error(error);
             })
    })
}
function configureLoadingScreen2(screen2){
    $(document)
        .ajaxStart(function () {
            screen2.fadeIn();
        })
        .ajaxStop(function () {
            screen2.fadeOut();
        });
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


