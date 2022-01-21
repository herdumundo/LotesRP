package clases;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.*;
public class bdconexion2
{
    public bdconexion2() {
    }
    public Connection crearConexion()  throws Exception {

 
        String clase   = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        String motorBD = "sqlserver";
    
        String servidor= "172.16.1.202";        
       
        Class.forName(clase);
        String cadenaConexion = "jdbc:"+motorBD+"://"+servidor+";databasename="+variables.BD2;
        Connection connection = DriverManager.getConnection(cadenaConexion, variables.USER, variables.passwd);
        return connection;
    }

    public void cerrarConexion(Connection connection)  throws Exception {
        connection.close();
    }

}