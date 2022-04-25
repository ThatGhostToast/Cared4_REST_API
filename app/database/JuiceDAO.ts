import { Juice } from "../models/Juice";
import * as mysql from "mysql";
import * as util from "util";

export class JuiceDAO
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "Juice-Boost";
    private pool = this.initDbConnection();
    
    /**
     * Non-default constructor.
     * 
     * @param host Database Hostname
     * @param username Database Username
     * @param password Database Password
     */
    constructor(host:string, port:number, username:string, password:string)
    {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }

     /**
     * CRUD method to create a new juice.
     * 
     * @param juice Juice to insert.
     * @param callback Callback function with -1 if an error else Juice ID created.  
     */
    public create(juice:Juice, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert Album
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO Juices (NAME, INGREDIENTS, BENEFITS, HTM, IMAGENAME) VALUES(?,?,?,?,?)', [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm, juice.ImageName]);
            if(result1.affectedRows != 1)
               callback(-1);

            // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album
            let juiceId = result1.insertId;

            // Do a callback to return the results
            callback(juiceId);
        });
    }

     /**
     * CRUD method to return all Juices.
     * 
     * @param callback Callback function with an Array of type Juice.
     */
    public findJuice(callback: any)
    {
        // List of Juices to return
        let juices:Juice[] = [];
        
        // Get a pooled connection to the database, run the query to get all the Juices, and return the List of Juices
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Juices
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM `Juices`');
            for(let x=0;x < result1.length;++x)
            {
                // Add Juice and its data to the list
                juices.push(new Juice(result1[x].ID, result1[x].NAME, result1[x].INGREDIENTS, result1[x].BENEFITS, result1[x].HTM, result1[x].IMAGENAME));
            }

            // Do a callback to return the results
            callback(juices);
         });
     }

     public findJuiceById(id:number, callback: any)
    {
         // List of Juices to return
         let juice:Juice;

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Juices for search
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM `Juices` WHERE ID = ?", id);
            for(let x=0;x < result1.length;++x)
            {
                // Add Album and its Tracks to the list
                juice = new Juice(result1[x].ID, result1[x].NAME, result1[x].INGREDIENTS, result1[x].BENEFITS, result1[x].HTM, result1[x].IMAGENAME); 
            }
            // Do a callback to return the results
            callback(juice);
         });
    }

     /**
     * CRUD method to update a Juice.
     * 
     * @param juice Juice to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(juice:Juice, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update Juice
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("UPDATE Juices SET NAME=?, INGREDIENTS=?, BENEFITS=?, HTM=?, IMAGENAME=? WHERE ID=?", [juice.Name, juice.Ingredients, juice.Benefits, juice.Htm, juice.ImageName, juice.Id]);
            if(result1.changedRows != 0)
                ++changes;
            console.log(changes);
            // Do a callback to return the results
            callback(changes);
         });
     }

     /**
     * CRUD method to delete a Juice.
     * 
     * @param juiceId Juice ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(juiceId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete juice
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM Juices WHERE ID=?', [juiceId]);
            changes = changes + result1.affectedRows;

            // Do a callback to return the results
            callback(changes);
        });
    }

    //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */
    private initDbConnection():any
    {
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
}
