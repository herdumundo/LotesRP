package clases;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionSqlServerSesion {
    public static Connection ConnectionSQLSERVERSesion(){
    String user = "cch";
    String passwd = "Paraguay2017";
   // String db = "zz_prueba_GrupoMaehara";
    String db = "GrupoMaehara";
    Connection connection=null;
 
        try 
        {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection("jdbc:sqlserver://172.16.1.202;databasename=" + db, user, passwd);
        }
        catch (SQLException se) {

            switch (se.getErrorCode()){
                case 1017:
                    System.out.println("USUARIO O CONTRASEÑA INCORRECTA, FAVOR VERIFIQUE.");
                    break;
                case  17002  :
                case  20:
                      System.out.println("ERROR DE CONEXION, VERIFIQUE LA RED.");


                    break;

                case  17452:
                       System.out.println("USUARIO O CONTRASEÑA INCORRECTA, FAVOR VERIFIQUE.");
                    break;
                default :
                       System.out.println(se.getErrorCode());
             }
        }
        catch (ClassNotFoundException e)
        {
            
        }
        return connection;
 }

 }

 