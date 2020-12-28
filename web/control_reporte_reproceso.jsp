
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>

<%@page import="net.sf.jasperreports.engine.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer"%>

<%@page import="javax.servlet.ServletResponse"%>
<%@include file="Conexion.jsp" %>
<%@include file="contenedor_pdf_reproceso.jsp" %>
<%@include  file="chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("usuario");
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
        String user_name = (String) sesionOk.getAttribute("nombre_usuario");

%>
 <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
      <%
        File reportfile = new File (application.getRealPath("reportes/registro_reproceso.jasper"));
        
        Map<String,Object> parameter = new HashMap<String,Object>();
     String calendario = request.getParameter("calendario_reporte_reproceso");
     String tipo_reproceso = request.getParameter("cbox_reproceso_pdf");
     String tipo_categoria = request.getParameter("cbox_categoria_reproceso_pdf");
     
       parameter.put("fecha",new String(calendario));
       parameter.put("clasificadora",new String(clasificadora));
        parameter.put("tipo_reproceso",new String(tipo_reproceso));
         parameter.put("categoria",new String(tipo_categoria));
       
           
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
