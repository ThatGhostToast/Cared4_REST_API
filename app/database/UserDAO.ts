import { User } from "../models/Users";
import * as mysql from "mysql";
import * as util from "util";
var loggly = require('loggly');
var logger = loggly.createClient({ token:"c699c451-68e8-4a6d-a403-b19343297144", subdomain:"Cared4", sendConsoleErrors: false, tag:"Cared4-API-UserDAO" });

/*
DAO file used for connecting the API to the database
This DAO handles the users table in our database
*/
export class UserDAO
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
     * @constructor
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
     * CRUD method to create a new user.
     * 
     * @param user User to insert.
     * @param callback Callback function with -1 if an error else User ID created.  
     */
    public create(user:User, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: create() Inside UserDAO.ts");
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) {
                //Sending a log to the logging handler
                logger.log("ERROR: " + err);
                throw err;
            };
            //Trying to create a new user
            try
            {
                //Sending a log to the logging handler
                logger.log("Creating and executing an INSERT query");
                // Use Promisfy Util to make an async function and insert User
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('INSERT INTO `USERS` (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, BIRTHDAY, SEX, CONDITIONS, IMAGE) VALUES(?,?,?,?,?,?,?,?)', [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image]);
                //Sending a log to the logging handler
                logger.log("Query executed. Affected rows = " + result1.affectedRows);
                // If no rows were affected then return -1 to indicate an error
                if(result1.affectedRows != 1)
                {
                    //Sending a log to the logging handler
                    logger.log("EXITING: create() Inside UserDAO.ts");
                    callback(-1);
                };
                //getting the id of the newly created User
                let userId = result1.insertId;
    
                //Sending a log to the logging handler
                logger.log("EXITING: create() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(userId);
            } catch (error)
            {
                //Sending a log to the logging handler
                logger.log("ERROR: Something went wrong creating a new user: " + error);
                logger.log("EXITING: create() Inside UserDAO.ts");
                callback(-1);
            }
        });
    }

     /**
     * CRUD method to return all Users.
     * 
     * @param callback Callback function with an Array of type Users.
     */
    public findUsers(callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findUsers() Inside UserDAO.ts");
        // List of Users to return
        let users:User[] = [];
        
        //Trying to get all users
        try
        {
            // Get a pooled connection to the database, run the query to get all the users, and return the List of Users
            this.pool.getConnection(async function(err:any, connection:any)
            {
                // Release connection in the pool
                connection.release();
    
                // Throw error if an error
                if (err) {
                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;
                };
    
                //Sending a log to the logging handler
                logger.log("Creating and executing a SELECT query");
                // Use Promisfy Util to make an async function and run query to get all users
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('SELECT * FROM `USERS`');
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. ");
                // Looping over the results and adding each user to the list
                for(let x=0;x < result1.length;++x)
                {
                    // Add user and its data to the list
                    users.push(new User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE));
                }
    
                //Sending a log to the logging handler
                logger.log("EXITING: findUsers() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(users);
             });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding all users: " + error);
            logger.log("EXITING: findUsers() Inside UserDAO.ts");
            callback(users);
        }
     }

    /**
     * Method to find a user by their ID
     * 
     * @param id Id of the user being searched
     * @param callback Callback function with an Array of type Users.
     */
    public findUserById(id:number, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findUserById() Inside UserDAO.ts");
        // User that's going to be returned
        let user:User;

        //Trying to get a user by ID
        try
        {
            // Get pooled database connection and run queries   
            this.pool.getConnection(async function(err:any, connection:any)
            {
                // Release connection in the pool
                connection.release();
    
                // Throw error if an error
                if (err) {
                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;
                };
    
                //Sending a log to the logging handler
                logger.log("Creating and executing a SELECT query");
                // Use Promisfy Util to make an async function and run query to get all Users for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("SELECT * FROM `USERS` WHERE ID = ?", id);
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Users returned = " + result1.length);
                // Assigning the result to the user model using a loop
                for(let x=0;x < result1.length;++x)
                {
                    // Get user from the database to return
                    user = new User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                }
                //Sending a log to the logging handler
                logger.log("EXITING: findUserById() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(user);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a user by ID: " + error);
            logger.log("EXITING: findUserById() Inside UserDAO.ts");
            callback(null);
        }
    }

    /**
     * Method to find a user by their Email
     * 
     * @param email email of the user being searched
     * @param callback Callback function with an Array of type Users.
     */
    public findUserByEmail(email:string, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findUserByEmail() Inside UserDAO.ts");
        // User that's going to be returned
        let user:User;

        //Trying to get a user by email
        try
        {
            // Get pooled database connection and run queries   
            this.pool.getConnection(async function(err:any, connection:any)
            {
                // Release connection in the pool
                connection.release();
    
                // Throw error if an error
                if (err) {
                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;
                };
    
                //Sending a log to the logging handler
                logger.log("Creating and executing a SELECT query");
                // Use Promisfy Util to make an async function and run query to get all Users for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("SELECT * FROM `USERS` WHERE EMAIL = ?", email);
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Users returned = " + result1.length);
                // Adding the result to the user model 
                for(let x=0;x < result1.length;++x)
                {
                    // Get user from the database to return
                    user = new User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                }
                //Sending a log to the logging handler
                logger.log("EXITING: findUserByEmail() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(user);
            });

        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a user by email: " + error);
            logger.log("EXITING: findUserByEmail() Inside UserDAO.ts");
            callback(null);
        }
    }
    
     /**
     * CRUD method to update a User.
     * 
     * @param user User to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(user:User, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: update() Inside UserDAO.ts");

        //Trying to update a user
        try
        {
            // Get pooled database connection and run queries   
            this.pool.getConnection(async function(err:any, connection:any)
            {
                // Release connection in the pool
                connection.release();
     
                // Throw error if an error
                if (err) {
                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;
                };
     
                // Use Promisfy Util to make an async function and update User
                let changes = 0;
                //Sending a log to the logging handler
                logger.log("Creating and executing an UPDATE query");
                // Use Promisfy Util to make an async function and insert User
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("UPDATE `USERS` SET FIRSTNAME=?, LASTNAME=?, EMAIL=?, PASSWORD=?, BIRTHDAY=?, SEX=?, CONDITIONS=?, IMAGE=? WHERE ID=?", [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image, user.Id]);
                // If any row was affected in the database, update the changes variable to reflect that
                if(result1.changedRows != 0)
                    ++changes;
                //Sending a log to the logging handler
                logger.log("UPDATE Query executed. Rows affected = " + changes);
                // Log Changes
                console.log(changes);
                //Sending a log to the logging handler
                logger.log("EXITING: update() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(changes);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong updating user: " + error);
            logger.log("EXITING: update() Inside UserDAO.ts");
            callback(0);
        }
     }

     /**
     * CRUD method to delete a User.
     * 
     * @param userId User ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(userId:number, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: delete() Inside UserDAO.ts");

        //Trying to delete a user
        try
        {
            // Get pooled database connection and run queries   
            this.pool.getConnection(async function(err:any, connection:any)
            {
                // Release connection in the pool
                connection.release();
    
                // Throw error if an error
                if (err) {
                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;
                };
    
                // Use Promisfy Util to make an async function and run query to delete User
                let changes = 0;
                //Sending a log to the logging handler
                logger.log("Creating and executing a DELETE query");
                // Use Promisfy Util to make an async function and insert User
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('DELETE FROM `USERS` WHERE ID=?', [userId]);
                // Set the affected rows to the changes variable
                changes = changes + result1.affectedRows;
                //Sending a log to the logging handler
                logger.log("DELETE Query executed. Rows affected = " + changes);
                //Sending a log to the logging handler
                logger.log("EXITING: delete() Inside UserDAO.ts");
                // Do a callback to return the results
                callback(changes);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong deleting user: " + error);
            logger.log("EXITING: delete() Inside UserDAO.ts");
            callback(0);
        }
    }

    //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */
    private initDbConnection():any
    {
        //Return a database connection
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
}
