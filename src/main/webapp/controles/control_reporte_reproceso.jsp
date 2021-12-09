<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="net.sf.jasperreports.engine.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer"%>
<%@include file="../contenedores/contenedor_pdf_reproceso.jsp" %>
<%@include  file="../chequearsesion.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />

<%   
    String calendario = request.getParameter("calendario_reporte_reproceso");
    String clasificadora = (String) sesionOk.getAttribute("clasificadora");
    Connection con = conexion.crearConexion();
    
    SimpleDateFormat sdformat = new SimpleDateFormat("dd/MM/yyyy");
    Date fecha_puestav1 = sdformat.parse(calendario);
    Date fechav2 = sdformat.parse("30/10/2021");
    
    if (fecha_puestav1.before(fechav2)) 
    {
        File reportfile = new File (application.getRealPath("reportes/REV01/registro_reproceso.jasper"));
        Map<String,Object> parameter = new HashMap<String,Object>();
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
    }
    else
    {
        File reportfile = new File (application.getRealPath("reportes/registro_reproceso_v2.jasper"));
        Map<String,Object> parameter = new HashMap<String,Object>();
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
    }





%>
   