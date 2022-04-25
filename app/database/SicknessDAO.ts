import { Sicknesses } from "../models/Sicknesses";
import * as mysql from "mysql";
import * as util from "util";

/*

   _______________                        |*\_/*|________
  |  ___________  |     .-.     .-.      ||_/-\_|______  |
  | |           | |    .****. .****.     | |           | |
  | |   0   0   | |    .*****.*****.     | |   0   0   | |
  | |     -     | |     .*********.      | |     -     | |
  | |   \___/   | |      .*******.       | |   \___/   | |
  | |___     ___| |       .*****.        | |___________| |
  |_____|\_/|_____|        .***.         |_______________|
    _|__|/ \|_|_.............*.............._|________|_
   / ********** \                          / ********** \
 /  ************  \                      /  ************  \
--------------------                    --------------------

DAO file used for connecting the API to the database
This DAO handles the sickness table in our database

*/

export class SicknessDAO
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "Cared4";
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
     * CRUD method to create a new sickness.
     * 
     * @param sickness Sickness to insert.
     * @param callback Callback function with -1 if an error else Sickness ID created.  
     */
    public create(sickness:Sicknesses, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert Sickness
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO SICKNESSES (NAME, COMMONNAME, SYMPTOMS, RARITY, SEVERITY, CURE, TREATMENT, NATURALTREATMENT, STRONGAGAINST) VALUES(?,?,?,?,?,?,?,?)', [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);
            if(result1.affectedRows != 1)
               callback(-1);

            //getting the id of the newly created sickness
            let sicknessId = result1.insertId;

            // Do a callback to return the results
            callback(sicknessId);
        });
    }

     /**
     * CRUD method to return all Sicknesses.
     * 
     * @param callback Callback function with an Array of type Sicknesses.
     */
    public findSickness(callback: any)
    {
        // List of sicknesses to return
        let sickness:Sicknesses[] = [];
        
        // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Sicknesses
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM `SICKNESSES`');
            for(let x=0;x < result1.length;++x)
            {
                // Add sickness and its data to the list
                sickness.push(new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST));
            }

            // Do a callback to return the results
            callback(sickness);
         });
     }

     public findSicknessById(id:number, callback: any)
    {
         // Sickness that's going to be returned
         let sickness:Sicknesses;

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM `SICKNESSES` WHERE ID = ?", id);
            for(let x=0;x < result1.length;++x)
            {
                // Get sickness information
                sickness = new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST);
            }
            // Do a callback to return the results
            callback(sickness);
         });
    }

     /**
     * CRUD method to update a Sickness.
     * 
     * @param sickness Sickness to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(sickness:Sicknesses, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update Sickness
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, RARITY=?, SEVERITY=?, CURE=?, TREATMENT=?, NATURALTREATMENT=?, STRONGAGAINST=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);
            if(result1.changedRows != 0)
                ++changes;
            console.log(changes);
            // Do a callback to return the results
            callback(changes);
         });
     }

     /**
     * CRUD method to delete a Sickness.
     * 
     * @param sicknessId Sickness ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(sicknessId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete Sickness
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);
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