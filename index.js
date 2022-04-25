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

// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res)
{
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})

// GET Route at '/sickness' that returns all sicknesses from the database
app.get('/sicknesses', function (_req, res)
{
    // Return sickness List as JSON, call SicknassDAO.findSickness(), and return JSON array of Sickness (a string)
    console.log('In GET /sickness Route');
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findSickness(function(sickness)
    {
        res.json(sickness);
    });
})

// GET Route that does a wildcard search for all sicknesses searching by id from the database
app.get('/sicknesses/search/sickness/:id', function (req, res)
{
    // Return sicknesses List as JSON, call SicknessDAO.findSicknessById(), and return JSON array of sicknesses
    console.log('In GET /sicknesses/searach/sickness Route for ' + req.params.id);
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findSicknessById(req.params.id, function(sickness)
    {
        if (sickness == null)
        {
            res.status(200).json({error: "INVALID SICKNESS ID"});
        } else {
            res.status(200).json(sickness);
        }
    });
})

// POST Route at '/sickness' that adds a sickness to the database
app.post('/sickness', function (req, res)
{
    console.log(req.body);
    
    // If invalid POST Body then return 400 response else add Sickness to the database
    console.log('In POST /sickness Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Sickness Posted"});
    }
    else
    {
        // New Sickness model
        let sickness = new Sicknesses(req.body.id, req.body.name, req.body.commonName, req.body.symptoms, req.body.rarity, req.body.severity, req.body.cure, req.body.treatment, req.body.naturalTreatment, req.body.strongAgainst);

        // Call sicknessDAO.create() to create a sickness from Posted Data and return an OK response     
        let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(sickness, function(sicknessId)
        {
            if(sicknessId == -1)
                res.status(200).json({"error" : "Creating Sickness failed"})
            else
                res.status(200).json({"success" : "Creating Sickness passed with an ID of " + sicknessId});
        });     
      }
})

// DELETE Route at '/sickness/:id' that deletes sicknesses at a given sickness ID from the database
app.delete('/sickness/:id', function (req, res)
{
    // Get the sickness
    console.log('In DELETE /sickness Route with ID of ' + req.params.id);
    let sicknessId = Number(req.params.id);
 
    // Call SicknessDAO.delete() to delete a sickness from the database and return if passed
    let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(sicknessId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Sickness failed"})
        else
            res.status(200).json({"success" : "Delete Sickness passed"})
    });
 })

// PUT Route at '/sickness' that updates a sickness in the database
app.put('/sickness', function (req, res)
{
    console.log(req.body);
    // If invalid PUT Body then return 400 response else update sickness in the database
    console.log('In PUT /sickness Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid sickness Posted"});
    }
    else
    {
        // New sickness model from Posted Data
        let sickness = new Sicknesses(req.body.id, req.body.name, req.body.commonName, req.body.symptoms, req.body.rarity, req.body.severity, req.body.cure, req.body.treatment, req.body.naturalTreatment, req.body.strongAgainst);

        // Call SicknessDAO.update() to update a sickness from Posted Data and return an OK response     
        let dao = new SicknessDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(sickness, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating Sickness passed but nothing was changed"})
            else
                res.status(200).json({success : "Updating Sickness passed and data was changed"});
        });     
      }
})

// Route code ends
// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
