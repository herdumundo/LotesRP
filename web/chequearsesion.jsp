<%-- 
    Document   : CERRARSESION
    Created on : 26/01/2016, 08:08:09 PM
    Author     : HERNAN VELAZQUEZ
--%>


<%@ page session="true" %>
<%
HttpSession sesionOk = request.getSession();
sesionOk.setMaxInactiveInterval(-1);
if (sesionOk.getAttribute("usuario") == null ) {
%>
<jsp:forward page="index.jsp">
<jsp:param name="error" value="Ha caducado el tiempo de espera,favor volver a iniciar sesión."/>
</jsp:forward>
<%
}
%>

