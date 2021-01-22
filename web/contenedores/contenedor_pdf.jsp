 
<%@include  file="../chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("usuario");
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
        String user_name = (String) sesionOk.getAttribute("nombre_usuario");

%>
 
     
      <form name="form1" action="reporte_control_b.jsp" target="_black">
    
    <input type="text" class="" name="clasificadora" style="display:none"value="<%=clasificadora%> " readonly="readonly" required="true">
 
    <div class="input-append">  
        <input id="calendario" name="calendario" data-format="yyyy-mm-dd"  width="276" required="true"  />
    <script>
     
    </script></div> 
     <script type="text/javascript"   src="fallas.js"></script>
        <link rel="stylesheet"  type="text/css" href="grilla.css">
        <script type="text/javascript"   src="grilla_2.js"></script>
          
      <br>   
         <input style="width:260px; height:80px" class="btn btn-success" type="submit" value="Generar reporte"> 
        
          
      </form> 
   