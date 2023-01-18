// Application Dependencies
const { SicknessDAO } = require('./lib/app/database/SicknessDAO.js')
const { UserDAO } = require('./lib/app/database/UserDAO.js')
const cors = require("cors");

const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 3000
const express = require('express');
const { Sicknesses } = require('./lib/app/models/Sicknesses.js');
const { User } = require('./lib/app/models/Users.js');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

// Database configuration
const dbHost = "localhost"
const dbPort = 8889;
const dbUsername = "root"
const dbPassword = "root"

// Set location of static resources and use the JSON body parser
app.use(express.static('app/images'))

// =-=-=-= Route code begins =-=-=-=
/**
 * Get route at Root '/' that returns a Test Text message
 * @param _req User request
 * @param res Function response
 */
app.get('/', function (_req, res)
{
    // Log the location
    console.log('In GET / Route');
    // Return Test Text
    res.send('This is the default root Route.');
})

/** 
 * GET Route at '/sickness' that returns all sicknesses from the database
 * @param _req User request
 * @param res Function response
 */
app.get('/sicknesses', function (_req, res)
{
    // Return sickness List as JSON, call SicknassDAO.findSickness(), and return JSON array of Sickness (a string)
    // Log the location
    console.log('In GET /sickness Route');
    // Create a new instance of the DAO
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findSickness function return a JSON of all sicknesses
    dao.findSickness(function(sickness)
    {
        res.json(sickness);
    });
})

/** 
 * GET Route that does a wildcard search for all sicknesses searching by id from the database
 * @param req User request
 * @param res Function response
 */
app.get('/sicknesses/search/sickness/:id', function (req, res)
{
    // Return sicknesses List as JSON, call SicknessDAO.findSicknessById(), and return JSON array of sicknesses
    // Log the location and the request parameters
    console.log('In GET /sicknesses/search/sickness/id Route for ' + req.params.id);
    // Create a new instance of the DAO
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findSicknessById function and the Id in the parameters to find a sickness
    dao.findSicknessById(req.params.id, function(sickness)
    {
        if (sickness == null)
        {
            res.status(200).json({error: "INVALID SICKNESS ID"}); // If the DAO does not return a sickness then the ID is invalid
        } else {
            res.status(200).json(sickness); // If the DAO returns a sickness then add it to the response
        }
    });
})

/** 
 * GET Route that does a wildcard search for all sicknesses searching by symptoms from the database
 */
app.get('/sicknesses/search/symptoms/:symptoms', function (req, res)
{
    // Return sicknesses List as JSON, call SicknessDAO.findSicknessBySymptoms(), and return JSON array of sicknesses
    // Log the location and the request parameters
    console.log('In GET /sicknesses/search/sickness/symptoms Route for ' + req.params.symptoms);
    // Create a new instance of the DAO
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findSicknessBySymptoms function and the Id in the parameters to find a sickness
    dao.findSicknessBySymptoms(req.params.symptoms, function(sickness)
    {
        if (sickness == null)
        {
            res.status(200).json({error: "NO ILLNESS FOUND"}); // If the DAO does not return a sickness then it was not found in the database
        } else {
            res.status(200).json(sickness); // If the DAO returns a sickness then add it to the response
        }
    });
})

/** 
 * POST Route at '/sickness' that adds a sickness to the database
 * @param req User request
 * @param res Function response
 */
app.post('/sickness', function (req, res)
{
    //Logging the request body
    console.log(req.body);
    
    // If invalid POST Body then return 400 response else add Sickness to the database
    // Log the location and the data being inserted into the database
    console.log('In POST /sickness Route with Post of ' + JSON.stringify(req.body));
    // Check for valid POST Body, note this should validate EVERY field of the POST
    if(!req.body)
    {
        // Return the error in the response
        res.status(400).json({error: "Invalid Sickness Posted"});
    }
    else
    {
        // New Sickness model
        let sickness = new Sicknesses(req.body.id, req.body.name, req.body.commonName, req.body.symptoms, req.body.rarity, req.body.severity, req.body.cure, req.body.treatment, req.body.naturalTreatment, req.body.strongAgainst);

        // Call sicknessDAO.create() to create a sickness from Posted Data and return an OK response     
        let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
        // Using the create function in the DAO with the sickness model to add a new sickness into the database
        dao.create(sickness, function(sicknessId)
        {
            if(sicknessId == -1)
                res.status(200).json({"error" : "Creating Sickness failed"}) // If the sickness ID is set to -1 then no sickness was created
            else
                res.status(200).json({"success" : "Creating Sickness passed with an ID of " + sicknessId}); // If a sickness ID is returned then the sickness was created
        });     
      }
})

/** 
 * DELETE Route at '/sickness/:id' that deletes sicknesses at a given sickness ID from the database
 * @param req User request
 * @param res Function response
 */
app.delete('/sickness/:id', function (req, res)
{
    // Log the location and the request parameters
    console.log('In DELETE /sickness Route with ID of ' + req.params.id);
    // Create a new variable to hold the sickness ID passed in as a parameter 
    let sicknessId = Number(req.params.id);
 
    // Call SicknessDAO.delete() to delete a sickness from the database and return if passed
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the delete function and the sicknessId to delete a sickness from the database
    dao.delete(sicknessId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Sickness failed"}) // If no changes have been made, this error will be logged
        else
            res.status(200).json({"success" : "Delete Sickness passed"}) // If changes were made then the delete was a success
    });
 })

/** 
 * PUT Route at '/sickness' that updates a sickness in the database
 * @param req User request
 * @param res Function response
 */
app.put('/sickness', function (req, res)
{
    //Logging the request body
    console.log(req.body);
    // Logging the location and the request body
    console.log('In PUT /sickness Route with Post of ' + JSON.stringify(req.body));
    // Check for valid PUT Body, note this should validate EVERY field of the POST
    if(!req.body)
    {
        // If invalid PUT Body then return 400 response else update sickness in the database
        res.status(400).json({error: "Invalid sickness Posted"});
    }
    else
    {
        // New sickness model from Posted Data
        let sickness = new Sicknesses(req.body.id, req.body.name, req.body.commonName, req.body.symptoms, req.body.rarity, req.body.severity, req.body.cure, req.body.treatment, req.body.naturalTreatment, req.body.strongAgainst);

        // Call SicknessDAO.update() to update a sickness from Posted Data and return an OK response     
        let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
        // Using the update function and the sickness model to update a sickness currently in the database
        dao.update(sickness, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating Sickness passed but nothing was changed"}) // If no changes were made then return this error
            else
                res.status(200).json({success : "Updating Sickness passed and data was changed"}); // If changes were made then return this message
        });     
      }
})

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// USER REQUESTS
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/** 
 * GET Route at '/users' that returns all users from the database
 * @param _req User request
 * @param res Function response
 */
app.get('/users', function (_req, res)
{
    // Return User List as JSON, call SicknassDAO.findUsers(), and return JSON array of Users (a string)
    // Log the location
    console.log('In GET /users Route');
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUsers function, return all of the users
    dao.findUsers(function(user)
    {
        res.json(user); // Responding with a JSON of all users
    });
})

/** 
 * GET Route that does a wildcard search for all users searching by id from the database
 * @param req User request
 * @param res Function response
 */
app.get('/users/search/user/:id', function (req, res)
{
    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters
    console.log('In GET /users/searach/user Route for ' + req.params.id);
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserById function and using the ID sent in as a parameter to find a user in the database
    dao.findUserById(req.params.id, function(user)
    {
        if (user == null)
        {
            res.status(200).json({error: "INVALID USER ID"}); // If no user was returned by the DAO then the ID was invalid
        } else {
            res.status(200).json(user); // If a user was returned by the DAO, put the user in the response
        }
    });
})

/** 
 * GET Route that does a wildcard search for all users searching by email from the database
 * @param req User request
 * @param res Function response
 */
app.get('/users/login/:email/:password', function (req, res)
{
    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters 
    console.log('In GET /users/login Route for ' + req.params.email);
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserByEmail function and using the Email sent in as a parameter to find a user in the database
    dao.findUserByEmail(req.params.email, function(user){
        if (user == null)
        {
            res.status(200).json({error: "USER NOT FOUND"}); //If the user was not returned by the DAO, then the user was not found
        } else {
            if (user.password == req.params.password) //Testing if the password matches the password of the user found in the database
            {
                res.status(200).json(user); //If the user was returned by the DAO and the password was correct, put the user into the response
            } else {
                res.status(200).json({error: "INCORRECT PASSWORD"}); // If this error is thrown then the user was found but the password was incorrect
            }
        }
    });
})

/** 
 * GET Route that does a wildcard search for all users searching by email from the database
 * @param req User request
 * @param res Function response
 */
app.get('/users/search/user/email/:email', function (req, res)
{
    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters 
    console.log('In GET /users/searach/user/email Route for ' + req.params.email);
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserByEmail function and using the email sent in as a parameter to find a user in the database
    dao.findUserByEmail(req.params.email, function(user)
    {
        if (user == null)
        {
            res.status(200).json({error: "USER NOT FOUND"}); //If the user was not returned by the DAO, then the user was not found
        } else {
            res.status(200).json(user); //If the user was returned by the DAO, put the user into the response
        }
    });
})

/** 
 * POST Route at '/user' that adds a user to the database
 * @param req User request
 * @param res Function response
 */
app.post('/users', function (req, res)
{
    //Logging the request body
    console.log(req.body);
    
    // If invalid POST Body then return 400 response else add User to the database
    console.log('In POST /users Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid User Posted"});
    }
    else
    {
        // New User model
        let user = new User(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.birthday, req.body.sex, req.body.conditions, req.body.image);

        // Call userDAO.create() to create a User from Posted Data and return an OK response     
        let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(user, function(userId)
        {
            if(userId == -1)
                res.status(200).json({"error" : "Creating User failed"}) //If the response is -1 then something went wrong and the user was not created
            else
                res.status(200).json({"success" : "Creating User passed with an ID of " + userId}); //If the response was anything other than -1 the user was created
        });     
      }
})

/** 
 * DELETE Route at '/user/:id' that deletes users at a given user ID from the database
 * @param req User request
 * @param res Function response
 */
app.delete('/users/:id', function (req, res)
{
    // Get the user
    console.log('In DELETE /users Route with ID of ' + req.params.id);
    let userId = Number(req.params.id);
 
    // Call UserDAO.delete() to delete a user from the database and return if passed
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(userId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete User failed"}) //If zero changes were made to the database then the user was not deleted
        else
            res.status(200).json({"success" : "Delete User passed"}) //If changes were made to the database then the user was deleted
    });
 })

/** 
 * PUT Route at '/user' that updates a user in the database
 * @param req User request
 * @param res Function response
 */
app.put('/users', function (req, res)
{
    //Logging the request body
    console.log(req.body);
    // If invalid PUT Body then return 400 response else update user in the database
    console.log('In PUT /users Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid user Posted"});
    }
    else
    {
        // New User model from Posted Data
        let user = new User(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.birthday, req.body.sex, req.body.conditions, req.body.image);

        // Call UserDAO.update() to update a user from Posted Data and return an OK response     
        let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(user, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating User passed but nothing was changed"}) //If there are no changes made to the database, then it will return this status
            else
                res.status(200).json({success : "Updating User passed and data was changed"}); //If there are changes made to the database, then it will return this status
        });     
      }
})

// =-=-=-= Route code ends =-=-=-=
/**
 * Start the Server
 * @param port The port where the API will sit and listen for a request
 */
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
