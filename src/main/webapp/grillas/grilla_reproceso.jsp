 <%@include  file="../chequearsesion.jsp" %>
    <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
    <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
    <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
    
<%      String usuario = (String) sesionOk.getAttribute("usuario");
        String clasificadora = (String) sesionOk.getAttribute("clasificadora");
        String user_name = (String) sesionOk.getAttribute("nombre_usuario");
        String calendario= request.getParameter("calendario");
         String disposicion=request.getParameter("combo_disposicion");
        Connection cn = conexion.crearConexion();
             
	fuente.setConexion(cn);
  %>
   
   <script>
          $('.record_table tr').click(function (event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
        }
    });

    $("input[type='checkbox']").change(function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass("highlight_row");
        } else {
            $(this).closest('tr').removeClass("highlight_row");
        }
    });  
   //$('#tabla_rep td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A').css('.record_table tr:hover { background: #eee; }');
    	$('#tabla_rep td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A');
    $('#tabla_rep td:last-child:contains(.)').closest('tr').css('background-color', '#00FFFF');
$("tr").not(':first').hover(
  function () {
    $(this).css("background","yellow");
  }, 
  function () {
    $('#tabla_rep td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A');
    $('#tabla_rep td:last-child:contains(.)').closest('tr').css('background-color', '#00FFFF');
}
);
   //$('#tabla_rep td:last-child:contains(R)').hover("background","yellow");

               
        </script>
  <form method="post" id="formulario" >
            <table  id="tabla_rep" data-row-style="rowStyle" class="table record_table"data-toggle="table" data-click-to-select="true">
                <thead>
                <th >
                Nro carro
                </th>
                <th >
                Tipo Huevo
                </th>
                <th>
                Cantidad
                </th>
                 <th>
                Disposicion
                </th>
                  <th>
                Estado
                </th>
                <th><input type="checkbox" id="box_reproceso"> 
                <label for="box_reproceso">SELECCIONAR</label></th>
                    
                </thead>
                <tbody id="grilla_rep">
                    <%
            ResultSet rs = fuente.obtenerDato("  select  a.cod_lote,a.cod_carrito,a.tipo_huevo,a.cantidad ,b.descripcion "
                    + ",replace(a.estado_liberacion,'Z','R.') as estado  "
                    + "from lotes_retenidos  a,motivo_retencion b  "
                    + "where convert(varchar,a.fecha,103)=convert(varchar,'"+calendario+"',103) "
                            + "and a.clasificadora='"+clasificadora+"' and a.estado_liberacion in ('R','Z') "
                            + "and a.disposicion='"+disposicion+"' and a.estado_registro='a' and a.disposicion=b.id");
        
            while(rs.next()){
                    %>  
            <tr  id="<%=rs.getString(1)%>">  
                <td  id="nro_carro"><%=rs.getString(2)%></td>
                <td id="tipo_huevo"><%=rs.getString(3)%></td>
                <td id="cantidad"><%=rs.getString(4)%></td>
               <td id="disposicion"><%=rs.getString(5)%></td>
               <td  id="estado"><%=rs.getString(6)%></td>
                <td id="check"> <input name="checks[]" class="checkbox" type='checkbox' value="<%=rs.getString(1)%>"/></td>
                <td style="display: none" id="oculto"><%=rs.getString(6)%></td>          
                <%}%>   
            </tr> 
                </tbody>   
                </table>
        </form>

              
              
               
               
     