 <!DOCTYPE html>
 <%@ page session="true" %>
<%@include  file="../chequearsesion.jsp" %>
<%    
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
      sesionOk.setAttribute("area",clasificadora);
 %>
    <div class="input-append">  
        <input id="calendario_informe" data-format="yyyy-mm-dd"  width="276"  onchange="principal();" />
    </div> 
   <br>   
 <div  id="div_grilla"  >
         </div>  
      
       

     