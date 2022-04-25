// Application Dependencies
const { JuiceDAO } = require('./lib/app/database/JuiceDAO.js')
const cors = require("cors");

const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 3000
const express = require('express');
const { Juice } = require('./lib/app/models/Juice.js');
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

// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res)
{
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})

// GET Route at '/juice' that returns all Juices from the database
app.get('/juice', function (_req, res)
{
    // Return Juice List as JSON, call JuiceDAO.findJuice(), and return JSON array of Juice (a string)
    console.log('In GET /juice Route');
    let dao = new JuiceDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findJuice(function(juice)
    {
        res.json(juice);
    });
})

// GET Route that does a wildcard search for all Juices searching by id from the database
app.get('/juices/search/juice/:id', function (req, res)
{
    // Return Albums List as JSON, call JuiceDAO.findJuiceById(), and return JSON array of Albums
    console.log('In GET /juice/searach/juice Route for ' + req.params.id);
    let dao = new JuiceDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findJuiceById(req.params.id, function(juice)
    {
        if (juice == null)
        {
            res.status(200).json({error: "INVALID JUICE ID"});
        } else {
            res.status(200).json(juice);
        }
    });
})

// POST Route at '/juice' that adds a juice to the database
app.post('/juice', function (req, res)
{
    console.log(req.body);
    
    // If invalid POST Body then return 400 response else add Juice to the database
    console.log('In POST /juice Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Juice Posted"});
    }
    else
    {
        // New juice model
        let juice = new Juice(req.body.id, req.body.name, req.body.ingredients, req.body.benefits, req.body.htm, req.body.imageName);

        // Call juiceDAO.create() to create a juice from Posted Data and return an OK response     
        let dao = new JuiceDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(juice, function(juiceId)
        {
            if(juiceId == -1)
                res.status(200).json({"error" : "Creating Juice failed"})
            else
                res.status(200).json({"success" : "Creating Juice passed with an Album ID of " + juiceId});
        });     
      }
})

// DELETE Route at '/juice/:id' that deletes juice at a given Juice ID from the database
app.delete('/juice/:id', function (req, res)
{
    // Get the juice
    console.log('In DELETE /albums Route with ID of ' + req.params.id);
    let juiceId = Number(req.params.id);
 
    // Call JuiceDAO.delete() to delete an Juice from the database and return if passed
    let dao = new JuiceDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(juiceId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Juice failed"})
        else
            res.status(200).json({"success" : "Delete Juice passed"})
    });
 })

// PUT Route at '/Juice' that updates a juice in the database
app.put('/juice', function (req, res)
{
    console.log(req.body);
    // If invalid PUT Body then return 400 response else update juice in the database
    console.log('In PUT /juice Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Juice Posted"});
    }
    else
    {
        // New juice model from Posted Data
        let juice = new Juice(req.body.id, req.body.name, req.body.ingredients, req.body.benefits, req.body.htm, req.body.imageName);

        // Call MusicDAO.update() to update a juice from Posted Data and return an OK response     
        let dao = new JuiceDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(juice, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating Juice passed but nothing was changed"})
            else
                res.status(200).json({success : "Updating Juice passed and data was changed"});
        });     
      }
})

// Route code ends
// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
