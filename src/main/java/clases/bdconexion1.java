package clases;
import java.sql.Connection;
import java.sql.DriverManager;
 
public class bdconexion1
{
     
    
    public bdconexion1() {
    }
    public Connection crearConexion()  throws Exception {

     
 
       
        String clase   = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        String motorBD = "sqlserver";
        
        String usuario = "sa";
        String bd      = " GrupoMaehara";//CAMBIAR BASE DE DATOS
        String servidor= "172.16.1.202";        
        String clave   = "Paraguay2017";
      
        Class.forName(clase);
        String cadenaConexion = "jdbc:"+motorBD+"://"+servidor+";databasename="+bd;
        Connection connection = DriverManager.getConnection(cadenaConexion, usuario, clave);
        return connection;
    }

    public void cerrarConexion(Connection connection)  throws Exception {
        connection.close();
    }

}