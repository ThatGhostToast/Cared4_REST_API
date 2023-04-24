import { Sicknesses } from "../models/Sicknesses";
import * as mysql from "mysql";
import * as util from "util";
var loggly = require('loggly');
var logger = loggly.createClient({ token:"c699c451-68e8-4a6d-a403-b19343297144", subdomain:"Cared4", sendConsoleErrors: false, tag:"Cared4-API-SicknessDAO" });

/*
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
     * CRUD method to create a new sickness.
     * 
     * @param sickness Sickness to insert.
     * @param callback Callback function with -1 if an error else Sickness ID created.  
     */
    public create(sickness:Sicknesses, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: create() Inside SicknessDAO.ts");
        //Trying to create a user
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
                logger.log("Creating and executing an INSERT query");
                // Use Promisfy Util to make an async function and insert Sickness
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('INSERT INTO SICKNESSES (NAME, COMMONNAME, SYMPTOMS, DESCRIPTION, RARITY, SEVERITY, TREATMENT, STRONGAGAINST, REQUIREMENTS, COMMONTARGETS) VALUES(?,?,?,?,?,?,?,?,?,?)', [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Description, sickness.Rarity, sickness.Severity, sickness.Treatment, sickness.StrongAgainst, sickness.Requirements, sickness.CommonTargets]);
                // If there are no rows affected then return -1 to signal something went wrong
                if(result1.affectedRows != 1)
                {
                    //Sending a log to the logging handler
                    logger.log("EXITING: create() Inside SicknessDAO.ts");
                    callback(-1);
                }
    
                //getting the id of the newly created sickness
                let sicknessId = result1.insertId;
                //Sending a log to the logging handler
                logger.log("INSERT Query executed. New Sickness ID = " + sicknessId);
    
                //Sending a log to the logging handler
                logger.log("EXITING: create() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sicknessId);
            });

        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong creating sickness: " + error);
            logger.log("EXITING: create() Inside SicknessDAO.ts");
            callback(-1);
        }
    }

     /**
     * CRUD method to return all Sicknesses.
     * 
     * @param callback Callback function with an Array of type Sicknesses.
     */
    public findSickness(callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findSickness() Inside SicknessDAO.ts");
        // List of sicknesses to return
        let sickness:Sicknesses[] = [];
        //Trying to find all sicknesses
        try
        {
            // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses
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
                // Use Promisfy Util to make an async function and run query to get all Sicknesses
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('SELECT * FROM `SICKNESSES`');
                // Looping over the results and pushing each sickness that has been retrieved from the database to the list
                for(let x=0;x < result1.length;++x)
                {
                    // Add sickness and its data to the list
                    sickness.push(new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                }
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Sicknesses Returned.");
                //Sending a log to the logging handler
                logger.log("EXITING: findSickness() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sickness);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding all sicknesses: " + error);
            logger.log("EXITING: findSickness() Inside SicknessDAO.ts");
            callback(sickness);
        }
    }

    /**
     * Method to find a sickness in the database by it's ID
     * 
     * @param id ID of the sickness being retrieved
     * @param callback Callback function with a list of the sicknesses retrieved
     */
    public findSicknessById(id:number, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findSicknessById() Inside SicknessDAO.ts");
        // Sickness that's going to be returned
        let sickness:Sicknesses;

        //Trying to find a sickness by id
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
                // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("SELECT * FROM `SICKNESSES` WHERE ID = ?", id);
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Sicknesses returned = " + result1.length);
                // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                for(let x=0;x < result1.length;++x)
                {
                    // Get sickness information
                    sickness = new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG);
                }
                //Sending a log to the logging handler
                logger.log("EXITING: findSicknessById() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sickness);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a sickness by ID: " + error);
            logger.log("EXITING: findSicknessById() Inside SicknessDAO.ts");
            callback(null);
        }
    }

    /**
     * Method to find a sickness in the database by it's symptoms
     * 
     * @param symptoms symptoms of the sickness being retrieved
     * @param callback Callback function with a list of the sicknesses retrieved
     */
    public findSicknessBySymptoms(symptoms:string, conditions:string, birthday:string, sex:string, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findSicknessBySymptoms() Inside SicknessDAO.ts");
        // Sickness that's going to be returned
        let sicknesses:Sicknesses[] = [];
        //Getting user's age attributes
        let age:number;
        if (birthday)
        {
            const DOB = new Date(birthday);
            age = calculateAge(DOB);
        }

        //Trying to find a sickness by symptoms
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
                // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("SELECT * FROM `SICKNESSES` WHERE SYMPTOMS LIKE '%"+ symptoms + "%' ORDER BY RARITY");
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Sicknesses returned = " + result1.length);
                // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                for(let x=0;x < result1.length;++x)
                {
                    //If a user is signed in, the severity algorithm will throw
                    if (conditions)
                    {
                        //Calculating new severity
                        let severityAdd = severityAlgorithm(conditions, age, result1[x].STRONGAGAINST)
                        result1[x].SEVERITY += severityAdd;
                        //Calculating new rarity
                        const currentRarity = result1[x].RARITY;
                        let newRarity = rarityAlgorithm(conditions, age, currentRarity, sex, result1[x].COMMONTARGETS, result1[x].REQUIREMENTS)
                        result1[x].RARITY = newRarity;
                    }
                    // Get sickness information
                    sicknesses.push(new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                }
                //Sorting the sickess by rarity (This is to update the order based on the algorithm adjustments)
                sicknesses.sort((a, b) => a.Rarity - b.Rarity);
                //Sending a log to the logging handler
                logger.log("EXITING: findSicknessBySymptoms() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sicknesses);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a sickness by symptoms: " + error);
            logger.log("EXITING: findSicknessBySymptoms() Inside SicknessDAO.ts");
            callback(sicknesses);
        }
    }

    /**
     * Method to find a sickness in the database by it's name
     * 
     * @param name name of the sickness being retrieved
     * @param callback Callback function with a list of the sicknesses retrieved
     */
    public findSicknessByName(name:string, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findSicknessByName() Inside SicknessDAO.ts");
        // Sickness that's going to be returned
        let sicknesses:Sicknesses[] = [];

        //Trying to find a sickness by name
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
                // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("SELECT * FROM `SICKNESSES` WHERE COMMONNAME LIKE '%"+ name + "%'");
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Sicknesses returned = " + result1.length);
                // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                for(let x=0;x < result1.length;++x)
                {
                    // Get sickness information
                    sicknesses.push(new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                }
                //Sending a log to the logging handler
                logger.log("EXITING: findSicknessByName() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sicknesses);
            });
        }catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a sickness by name: " + error);
            logger.log("EXITING: findSicknessByName() Inside SicknessDAO.ts");
            callback(sicknesses);
        }
    }

    /**
     * Method used to return 3 random illnesses for the home page of Cared4.
     * 
     * @param callback Callback function with an Array of type Sicknesses.
     */
    public findSicknessByRandom(callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: findSicknessByRandom() Inside SicknessDAO.ts");
        // List of sicknesses to return
        let sickness:Sicknesses[] = [];
             
        //Trying to find random sicknesses
        try 
        {
            // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses
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
                // Use Promisfy Util to make an async function and run query to get all Sicknesses
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('SELECT * FROM `SICKNESSES` ORDER BY RAND() LIMIT 3');
                //Sending a log to the logging handler
                logger.log("SELECT Query executed. Sicknesses returned = " + result1.length);
                // Looping over the results and pushing each sickness that has been retrieved from the database to the list
                for(let x=0;x < result1.length;++x)
                {
                    // Add sickness and its data to the list
                    sickness.push(new Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                }
         
                //Sending a log to the logging handler
                logger.log("EXITING: findSicknessByRandom() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(sickness);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong finding a random sickness: " + error);
            logger.log("EXITING: findSicknessByRandom() Inside SicknessDAO.ts");
            callback(sickness);
        }
    }

     /**
     * CRUD method to update a Sickness.
     * 
     * @param sickness Sickness to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(sickness:Sicknesses, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: update() Inside SicknessDAO.ts");

        //Trying to update a sickness
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
                // Use Promisfy Util to make an async function and update Sickness
                let changes = 0;
                //Sending a log to the logging handler
                logger.log("Creating and executing an UPDATE query");
                // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, DESCRIPTION=?, RARITY=?, SEVERITY=?, TREATMENT=?, STRONGAGAINST=?, REQUIREMENTS=?, COMMONTARGETS=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Description, sickness.Rarity, sickness.Severity, sickness.Treatment, sickness.StrongAgainst, sickness.Requirements, sickness.CommonTargets]);
                // If the result indicates that a row was updated, then the number of changes increases
                if(result1.changedRows != 0)
                    ++changes;
                //Sending a log to the logging handler
                logger.log("UPDATE Query executed. Rows affected = " + changes);
                //Log the changes
                console.log(changes);
                //Sending a log to the logging handler
                logger.log("EXITING: update() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(changes);
            });
        }catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong updating a sickness: " + error);
            logger.log("EXITING: update() Inside SicknessDAO.ts");
            callback(0);
        }
    }

     /**
     * CRUD method to delete a Sickness.
     * 
     * @param sicknessId Sickness ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(sicknessId:number, callback: any)
    {
        //Sending a log to the logging handler
        logger.log("ENTERING: delete() Inside SicknessDAO.ts");

        //Trying to delete a sickness
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
                // Use Promisfy Util to make an async function and run query to delete Sickness
                let changes = 0;
                //Sending a log to the logging handler
                logger.log("Creating and executing a DELETE query");
                // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                connection.query = util.promisify(connection.query);
                // Database query assigned to a result variable
                let result1 = await connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);
                // Changes made to the database being saved to a variable
                changes = changes + result1.affectedRows;
                //Sending a log to the logging handler
                logger.log("DELETE Query executed. Rows affected = " + changes);
                //Sending a log to the logging handler
                logger.log("EXITING: delete() Inside SicknessDAO.ts");
                // Do a callback to return the results
                callback(changes);
            });
        } catch (error)
        {
            //Sending a log to the logging handler
            logger.log("ERROR: Something went wrong deleting a sickness: " + error);
            logger.log("EXITING: delete() Inside SicknessDAO.ts");
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

/**
 * Method that calculates the new severity
 * @param conditions The user's pre-existing conditions
 * @param userAge The user's age
 * @param strongAgainst  What conditions the illness is strong against
 * @returns Returns the new severity
 */
function severityAlgorithm(conditions:string, userAge:number, strongAgainst:string):number {
    logger.log("ENTERING: severityAlgorithm()");
    //Value thats going to increase the severity of an illness
    let newSeverity = 0;

    try
    {
        //Splitting the user's conditions into an array to test against the strong against value
        const splitConditions: string[] = conditions.split(",");
    
        //Looping over all user conditions and testing them against the strong against value
        for (let x = 0; x < splitConditions.length; x++)
        {
            //Removing spaces for data validation
            splitConditions[x] = splitConditions[x].replace(/\s/g, "");
            //If strong against includes a user condition, then the severity value increases
            if (strongAgainst.includes(splitConditions[x]))
            {
                newSeverity+=1;
            }
            //Adding extra value if Chemotherapy is involved
            if (splitConditions[x] === "Chemotherapy" && strongAgainst.includes("Chemotherapy"))
            {
                newSeverity+=1;
            }
        }
        if (strongAgainst.includes("Elderly"))
        {
            if (userAge > 64)
            {
                if (userAge > 84)
                {
                    newSeverity+=1;
                }
                newSeverity+=1;
            }
        }
    } catch (err)
    {
        logger.log("SOMETHING WENT WRONG IN THE SEVERITY ALGORITHM: " + err);
    }

    logger.log("EXITING: severityAlgorithm()");
    return(newSeverity);
}

/**
 * Function used to update the rarity of an illness
 * @param conditions User's pre-existing conditions
 * @param userAge User's age
 * @param currentRarity The current rarity of the illness
 * @param sex User's sex
 * @param commonlyAffects What the illness commonly affects
 * @param requirements The requirements of the illness
 * @returns Returns the adjusted rarity
 */
function rarityAlgorithm(conditions:string, userAge:number, currentRarity:number, sex:string, commonlyAffects:string, requirements:string): number
{
    logger.log("ENTERING: rarityAlgorithm()");
    let newRarity = currentRarity;

    //Trying to get the age range from inside the commonlyAffects attribute
    try
    {
        //Parsing commonly affects age out of the string
        const ageCheckSplit: string[] = commonlyAffects.split("-");
        var num1string = ageCheckSplit[0].replace(/\D/g,'');
        var num2string = ageCheckSplit[1].replace(/\D/g,'');
        var num1:number = +num1string;
        var num2:number = +num2string;

        // If the user is inside the commonly affects age range then rarity is lowered
        if (userAge > num1 && userAge < num2)
        {
            newRarity--;
        }
    } catch (err)
    {
        console.log("No age range inside the commonlyAffects attribute");
    }
    
    //Trying to reduce the rarity of an illness
    try
    {
        //If a requirement is sex specific, then the rarity will increase by a significant ammount if the sex does not align
        if ((requirements.includes("Male") && sex === "Female") || (requirements.includes("Female") && sex === "Male"))
        {
            newRarity+=1000;
        } 
        //Splitting the user's conditions into an array to test against the requirements value
        const splitConditions: string[] = conditions.split(",");
        //Looping over all user conditions and testing them against the requirements value
        for (let x = 0; x < splitConditions.length; x++){
            //Removing spaces for data validation
            splitConditions[x] = splitConditions[x].replace(/\s/g, "");

            //Checking different possibilities to reduce rarity
            if (requirements.includes(splitConditions[x]))
            {
                newRarity = newRarity - 10;
            }
            if (commonlyAffects.includes(sex))
            {
                newRarity--;
            }
            if (commonlyAffects.includes(splitConditions[x]))
            {
                newRarity--;
            }
        }
        
    } catch(err)
    {
        logger.log("SOMETHING WENT WRONG IN THE RARITY ALGORITHM: ") + err;
    }

    //If the rarity drops below 1, this if statement pushes it back up to 1
    if (newRarity < 1)
    {
        newRarity = 1;
    }

    logger.log("EXITING: rarityAlgorithm()");
    return newRarity;
}

/**
 * Function used to calculate the age of the user based on the birthday
 * @param dateOfBirth Birthday of the user
 * @returns Returns the users age
 */
function calculateAge(dateOfBirth: Date): number {
    //Getting todays date
    const today = new Date();
    //Getting the user's birthday
    const birthDate = new Date(dateOfBirth);
    //Getting the overall age
    let age = today.getFullYear() - birthDate.getFullYear();
    //Adjusting the age based on what month it is
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
}