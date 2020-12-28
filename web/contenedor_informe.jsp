 <!DOCTYPE html>
 <%@ page session="true" %>
<%@include  file="chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("usuario");
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
      sesionOk.setAttribute("area",clasificadora);
      String user_name = (String) sesionOk.getAttribute("nombre_usuario");
%>
 
 
      <!-- Icon Cards-->
       
   
      
 
     
    
    <div class="input-append">  
        <input id="calendario_informe" data-format="yyyy-mm-dd"  width="276"  onchange="principal();" />
    <script>
        $('#calendario_informe').datepicker({
            uiLibrary: 'bootstrap4'
        });
    </script></div> 
    
      
          
          
          <script>
         function principal(){
	 var id_informe = document.getElementById("calendario_informe").value   
         var actualiza_parte = new XMLHttpRequest();
	    actualiza_parte.onreadystatechange = function(){
	    if(this.readyState === 4 && this.status === 200){
	    var response = this.responseText;
            document.getElementById("mobiles").innerHTML=response;  } };
            actualiza_parte.open("GET", "grilla_normal.jsp?calendario_informe="+id_informe+"", true);
	    actualiza_parte.send();
         
    
    $('#divid').show();
   filtro(); }
         
         
    
           
       
          </script>
        
      
         
      <br>   
              
      <script>
       function filtro(){
                    $("#filtrar").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                     $("#mobiles tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
                      };
          </script>
      
      <div   class="row" id="divid" style="display: none">
        <div class="col-md-12">
        <div class="panel panel-primary">
        <div class="panel-heading" > </div>
        
         <input class="form-control" id="filtrar" type="text" placeholder="Buscar">
 <table    id="mobiles"  data-row-style="rowStyle" data-toggle="table" data-click-to-select="true">
                               
          </table>
        </div> </div> </div>  
      
       

     