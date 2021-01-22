
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>

<%@page import="net.sf.jasperreports.engine.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer"%>

<%@page import="javax.servlet.ServletResponse"%>
<%@include file="Conexion.jsp" %>
<%@include file="contenedor_reporte_rotos.jsp" %>
<%@include  file="../chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("usuario");
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
        String user_name = (String) sesionOk.getAttribute("nombre_usuario");

%>
 <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     </head>
    <body>
      <%
        File reportfile = new File (application.getRealPath("reportes/reporte_rotos.jasper"));
        
        Map<String,Object> parameter = new HashMap<String,Object>();
      String calendario = request.getParameter("calendario_reporte_rotos");
        
       parameter.put("fecha",new String(calendario));
       parameter.put("clasificadora",new String(clasificadora));
         
           
         byte [] bytes = JasperRunManager.runReportToPdf(reportfile.getPath(), parameter, con);
         
        response.setContentType("application/pdf");
        response.setContentLength(bytes.length);
        ServletOutputStream outputstream = response.getOutputStream();
        outputstream.write(bytes,0,bytes.length);
        
        outputstream.flush();
        outputstream.close();
        %>
        
    </body>
</html>
