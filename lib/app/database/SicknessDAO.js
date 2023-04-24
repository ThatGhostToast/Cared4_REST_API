"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SicknessDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Sicknesses = require("../models/Sicknesses");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var loggly = require('loggly');

var logger = loggly.createClient({
  token: "c699c451-68e8-4a6d-a403-b19343297144",
  subdomain: "Cared4",
  sendConsoleErrors: false,
  tag: "Cared4-API-SicknessDAO"
});
/*
DAO file used for connecting the API to the database
This DAO handles the sickness table in our database
*/

var SicknessDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * @constructor
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function SicknessDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, SicknessDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "Cared4");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
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


  (0, _createClass2.default)(SicknessDAO, [{
    key: "create",
    value: function create(sickness, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: create() Inside SicknessDAO.ts"); //Trying to create a user

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
            var result1, sicknessId;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing an INSERT query"); // Use Promisfy Util to make an async function and insert Sickness

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context.next = 9;
                    return connection.query('INSERT INTO SICKNESSES (NAME, COMMONNAME, SYMPTOMS, DESCRIPTION, RARITY, SEVERITY, TREATMENT, STRONGAGAINST, REQUIREMENTS, COMMONTARGETS) VALUES(?,?,?,?,?,?,?,?,?,?)', [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Description, sickness.Rarity, sickness.Severity, sickness.Treatment, sickness.StrongAgainst, sickness.Requirements, sickness.CommonTargets]);

                  case 9:
                    result1 = _context.sent;

                    // If there are no rows affected then return -1 to signal something went wrong
                    if (result1.affectedRows != 1) {
                      //Sending a log to the logging handler
                      logger.log("EXITING: create() Inside SicknessDAO.ts");
                      callback(-1);
                    } //getting the id of the newly created sickness


                    sicknessId = result1.insertId; //Sending a log to the logging handler

                    logger.log("INSERT Query executed. New Sickness ID = " + sicknessId); //Sending a log to the logging handler

                    logger.log("EXITING: create() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sicknessId);

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "findSickness",
    value: function findSickness(callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSickness() Inside SicknessDAO.ts"); // List of sicknesses to return

      var sickness = []; //Trying to find all sicknesses

      try {
        // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
            var result1, x;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context2.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context2.next = 9;
                    return connection.query('SELECT * FROM `SICKNESSES`');

                  case 9:
                    result1 = _context2.sent;

                    // Looping over the results and pushing each sickness that has been retrieved from the database to the list
                    for (x = 0; x < result1.length; ++x) {
                      // Add sickness and its data to the list
                      sickness.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                    } //Sending a log to the logging handler


                    logger.log("SELECT Query executed. Sicknesses Returned."); //Sending a log to the logging handler

                    logger.log("EXITING: findSickness() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sickness);

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "findSicknessById",
    value: function findSicknessById(id, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSicknessById() Inside SicknessDAO.ts"); // Sickness that's going to be returned

      var sickness; //Trying to find a sickness by id

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
            var result1, x;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context3.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context3.next = 9;
                    return connection.query("SELECT * FROM `SICKNESSES` WHERE ID = ?", id);

                  case 9:
                    result1 = _context3.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Sicknesses returned = " + result1.length); // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)

                    for (x = 0; x < result1.length; ++x) {
                      // Get sickness information
                      sickness = new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG);
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findSicknessById() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sickness);

                  case 14:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "findSicknessBySymptoms",
    value: function findSicknessBySymptoms(symptoms, conditions, birthday, sex, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSicknessBySymptoms() Inside SicknessDAO.ts"); // Sickness that's going to be returned

      var sicknesses = []; //Getting user's age attributes

      var age;

      if (birthday) {
        var DOB = new Date(birthday);
        age = calculateAge(DOB);
      } //Trying to find a sickness by symptoms


      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
            var result1, x, severityAdd, currentRarity, newRarity;
            return _regenerator.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context4.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context4.next = 9;
                    return connection.query("SELECT * FROM `SICKNESSES` WHERE SYMPTOMS LIKE '%" + symptoms + "%' ORDER BY RARITY");

                  case 9:
                    result1 = _context4.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Sicknesses returned = " + result1.length); // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)

                    for (x = 0; x < result1.length; ++x) {
                      //If a user is signed in, the severity algorithm will throw
                      if (conditions) {
                        //Calculating new severity
                        severityAdd = severityAlgorithm(conditions, age, result1[x].STRONGAGAINST);
                        result1[x].SEVERITY += severityAdd; //Calculating new rarity

                        currentRarity = result1[x].RARITY;
                        newRarity = rarityAlgorithm(conditions, age, currentRarity, sex, result1[x].COMMONTARGETS, result1[x].REQUIREMENTS);
                        result1[x].RARITY = newRarity;
                      } // Get sickness information


                      sicknesses.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                    } //Sorting the sickess by rarity (This is to update the order based on the algorithm adjustments)


                    sicknesses.sort(function (a, b) {
                      return a.Rarity - b.Rarity;
                    }); //Sending a log to the logging handler

                    logger.log("EXITING: findSicknessBySymptoms() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sicknesses);

                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "findSicknessByName",
    value: function findSicknessByName(name, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSicknessByName() Inside SicknessDAO.ts"); // Sickness that's going to be returned

      var sicknesses = []; //Trying to find a sickness by name

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
            var result1, x;
            return _regenerator.default.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context5.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context5.next = 9;
                    return connection.query("SELECT * FROM `SICKNESSES` WHERE COMMONNAME LIKE '%" + name + "%'");

                  case 9:
                    result1 = _context5.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Sicknesses returned = " + result1.length); // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)

                    for (x = 0; x < result1.length; ++x) {
                      // Get sickness information
                      sicknesses.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findSicknessByName() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sicknesses);

                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          return function (_x9, _x10) {
            return _ref5.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "findSicknessByRandom",
    value: function findSicknessByRandom(callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSicknessByRandom() Inside SicknessDAO.ts"); // List of sicknesses to return

      var sickness = []; //Trying to find random sicknesses

      try {
        // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
            var result1, x;
            return _regenerator.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context6.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; //Sending a log to the logging handler

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context6.next = 9;
                    return connection.query('SELECT * FROM `SICKNESSES` ORDER BY RAND() LIMIT 3');

                  case 9:
                    result1 = _context6.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Sicknesses returned = " + result1.length); // Looping over the results and pushing each sickness that has been retrieved from the database to the list

                    for (x = 0; x < result1.length; ++x) {
                      // Add sickness and its data to the list
                      sickness.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findSicknessByRandom() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sickness);

                  case 14:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          return function (_x11, _x12) {
            return _ref6.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "update",
    value: function update(sickness, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: update() Inside SicknessDAO.ts"); //Trying to update a sickness

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
            var changes, result1;
            return _regenerator.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context7.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; // Use Promisfy Util to make an async function and update Sickness

                    changes = 0; //Sending a log to the logging handler

                    logger.log("Creating and executing an UPDATE query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context7.next = 10;
                    return connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, DESCRIPTION=?, RARITY=?, SEVERITY=?, TREATMENT=?, STRONGAGAINST=?, REQUIREMENTS=?, COMMONTARGETS=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Description, sickness.Rarity, sickness.Severity, sickness.Treatment, sickness.StrongAgainst, sickness.Requirements, sickness.CommonTargets]);

                  case 10:
                    result1 = _context7.sent;
                    // If the result indicates that a row was updated, then the number of changes increases
                    if (result1.changedRows != 0) ++changes; //Sending a log to the logging handler

                    logger.log("UPDATE Query executed. Rows affected = " + changes); //Log the changes

                    console.log(changes); //Sending a log to the logging handler

                    logger.log("EXITING: update() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(changes);

                  case 16:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          return function (_x13, _x14) {
            return _ref7.apply(this, arguments);
          };
        }());
      } catch (error) {
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

  }, {
    key: "delete",
    value: function _delete(sicknessId, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: delete() Inside SicknessDAO.ts"); //Trying to delete a sickness

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(err, connection) {
            var changes, result1;
            return _regenerator.default.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    // Release connection in the pool
                    connection.release(); // Throw error if an error

                    if (!err) {
                      _context8.next = 4;
                      break;
                    }

                    //Sending a log to the logging handler
                    logger.log("ERROR: " + err);
                    throw err;

                  case 4:
                    ; // Use Promisfy Util to make an async function and run query to delete Sickness

                    changes = 0; //Sending a log to the logging handler

                    logger.log("Creating and executing a DELETE query"); // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context8.next = 10;
                    return connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);

                  case 10:
                    result1 = _context8.sent;
                    // Changes made to the database being saved to a variable
                    changes = changes + result1.affectedRows; //Sending a log to the logging handler

                    logger.log("DELETE Query executed. Rows affected = " + changes); //Sending a log to the logging handler

                    logger.log("EXITING: delete() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(changes);

                  case 15:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));

          return function (_x15, _x16) {
            return _ref8.apply(this, arguments);
          };
        }());
      } catch (error) {
        //Sending a log to the logging handler
        logger.log("ERROR: Something went wrong deleting a sickness: " + error);
        logger.log("EXITING: delete() Inside SicknessDAO.ts");
        callback(0);
      }
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      //Return a database connection
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return SicknessDAO;
}();
/**
 * Method that calculates the new severity
 * @param conditions The user's pre-existing conditions
 * @param userAge The user's age
 * @param strongAgainst  What conditions the illness is strong against
 * @returns Returns the new severity
 */


exports.SicknessDAO = SicknessDAO;

function severityAlgorithm(conditions, userAge, strongAgainst) {
  logger.log("ENTERING: severityAlgorithm()"); //Value thats going to increase the severity of an illness

  var newSeverity = 0;

  try {
    //Splitting the user's conditions into an array to test against the strong against value
    var splitConditions = conditions.split(","); //Looping over all user conditions and testing them against the strong against value

    for (var x = 0; x < splitConditions.length; x++) {
      //Removing spaces for data validation
      splitConditions[x] = splitConditions[x].replace(/\s/g, ""); //If strong against includes a user condition, then the severity value increases

      if (strongAgainst.includes(splitConditions[x])) {
        newSeverity += 1;
      } //Adding extra value if Chemotherapy is involved


      if (splitConditions[x] === "Chemotherapy" && strongAgainst.includes("Chemotherapy")) {
        newSeverity += 1;
      }
    }

    if (strongAgainst.includes("Elderly")) {
      if (userAge > 64) {
        if (userAge > 84) {
          newSeverity += 1;
        }

        newSeverity += 1;
      }
    }
  } catch (err) {
    logger.log("SOMETHING WENT WRONG IN THE SEVERITY ALGORITHM: " + err);
  }

  logger.log("EXITING: severityAlgorithm()");
  return newSeverity;
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


function rarityAlgorithm(conditions, userAge, currentRarity, sex, commonlyAffects, requirements) {
  logger.log("ENTERING: rarityAlgorithm()");
  var newRarity = currentRarity; //Trying to get the age range from inside the commonlyAffects attribute

  try {
    //Parsing commonly affects age out of the string
    var ageCheckSplit = commonlyAffects.split("-");
    var num1string = ageCheckSplit[0].replace(/\D/g, '');
    var num2string = ageCheckSplit[1].replace(/\D/g, '');
    var num1 = +num1string;
    var num2 = +num2string; // If the user is inside the commonly affects age range then rarity is lowered

    if (userAge > num1 && userAge < num2) {
      newRarity--;
    }
  } catch (err) {
    console.log("No age range inside the commonlyAffects attribute");
  } //Trying to reduce the rarity of an illness


  try {
    //If a requirement is sex specific, then the rarity will increase by a significant ammount if the sex does not align
    if (requirements.includes("Male") && sex === "Female" || requirements.includes("Female") && sex === "Male") {
      newRarity += 1000;
    } //Splitting the user's conditions into an array to test against the requirements value


    var splitConditions = conditions.split(","); //Looping over all user conditions and testing them against the requirements value

    for (var x = 0; x < splitConditions.length; x++) {
      //Removing spaces for data validation
      splitConditions[x] = splitConditions[x].replace(/\s/g, ""); //Checking different possibilities to reduce rarity

      if (requirements.includes(splitConditions[x])) {
        newRarity = newRarity - 10;
      }

      if (commonlyAffects.includes(sex)) {
        newRarity--;
      }

      if (commonlyAffects.includes(splitConditions[x])) {
        newRarity--;
      }
    }
  } catch (err) {
    logger.log("SOMETHING WENT WRONG IN THE RARITY ALGORITHM: ") + err;
  } //If the rarity drops below 1, this if statement pushes it back up to 1


  if (newRarity < 1) {
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


function calculateAge(dateOfBirth) {
  //Getting todays date
  var today = new Date(); //Getting the user's birthday

  var birthDate = new Date(dateOfBirth); //Getting the overall age

  var age = today.getFullYear() - birthDate.getFullYear(); //Adjusting the age based on what month it is

  var monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }

  return age;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TaWNrbmVzc0RBTy50cyJdLCJuYW1lcyI6WyJsb2dnbHkiLCJyZXF1aXJlIiwibG9nZ2VyIiwiY3JlYXRlQ2xpZW50IiwidG9rZW4iLCJzdWJkb21haW4iLCJzZW5kQ29uc29sZUVycm9ycyIsInRhZyIsIlNpY2tuZXNzREFPIiwiaG9zdCIsInBvcnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5pdERiQ29ubmVjdGlvbiIsInBvb2wiLCJzaWNrbmVzcyIsImNhbGxiYWNrIiwibG9nIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJyZWxlYXNlIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiTmFtZSIsIkNvbW1vbk5hbWUiLCJTeW1wdG9tcyIsIkRlc2NyaXB0aW9uIiwiUmFyaXR5IiwiU2V2ZXJpdHkiLCJUcmVhdG1lbnQiLCJTdHJvbmdBZ2FpbnN0IiwiUmVxdWlyZW1lbnRzIiwiQ29tbW9uVGFyZ2V0cyIsInJlc3VsdDEiLCJhZmZlY3RlZFJvd3MiLCJzaWNrbmVzc0lkIiwiaW5zZXJ0SWQiLCJlcnJvciIsIngiLCJsZW5ndGgiLCJwdXNoIiwiU2lja25lc3NlcyIsIklEIiwiTkFNRSIsIkNPTU1PTk5BTUUiLCJTWU1QVE9NUyIsIkRFU0NSSVBUSU9OIiwiUkFSSVRZIiwiU0VWRVJJVFkiLCJUUkVBVE1FTlQiLCJTVFJPTkdBR0FJTlNUIiwiUkVRVUlSRU1FTlRTIiwiQ09NTU9OVEFSR0VUUyIsIklNRyIsImlkIiwic3ltcHRvbXMiLCJjb25kaXRpb25zIiwiYmlydGhkYXkiLCJzZXgiLCJzaWNrbmVzc2VzIiwiYWdlIiwiRE9CIiwiRGF0ZSIsImNhbGN1bGF0ZUFnZSIsInNldmVyaXR5QWRkIiwic2V2ZXJpdHlBbGdvcml0aG0iLCJjdXJyZW50UmFyaXR5IiwibmV3UmFyaXR5IiwicmFyaXR5QWxnb3JpdGhtIiwic29ydCIsImEiLCJiIiwibmFtZSIsImNoYW5nZXMiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiLCJ1c2VyQWdlIiwic3Ryb25nQWdhaW5zdCIsIm5ld1NldmVyaXR5Iiwic3BsaXRDb25kaXRpb25zIiwic3BsaXQiLCJyZXBsYWNlIiwiaW5jbHVkZXMiLCJjb21tb25seUFmZmVjdHMiLCJyZXF1aXJlbWVudHMiLCJhZ2VDaGVja1NwbGl0IiwibnVtMXN0cmluZyIsIm51bTJzdHJpbmciLCJudW0xIiwibnVtMiIsImRhdGVPZkJpcnRoIiwidG9kYXkiLCJiaXJ0aERhdGUiLCJnZXRGdWxsWWVhciIsIm1vbnRoRGlmZiIsImdldE1vbnRoIiwiZ2V0RGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRixNQUFNLENBQUNHLFlBQVAsQ0FBb0I7QUFBRUMsRUFBQUEsS0FBSyxFQUFDLHNDQUFSO0FBQWdEQyxFQUFBQSxTQUFTLEVBQUMsUUFBMUQ7QUFBb0VDLEVBQUFBLGlCQUFpQixFQUFFLEtBQXZGO0FBQThGQyxFQUFBQSxHQUFHLEVBQUM7QUFBbEcsQ0FBcEIsQ0FBYjtBQUVBO0FBQ0E7QUFDQTtBQUNBOztJQUVhQyxXO0FBU1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSx1QkFBWUMsSUFBWixFQUF5QkMsSUFBekIsRUFBc0NDLFFBQXRDLEVBQXVEQyxRQUF2RCxFQUNBO0FBQUE7QUFBQSxnREFmc0IsRUFldEI7QUFBQSxnREFkc0IsSUFjdEI7QUFBQSxvREFiMEIsRUFhMUI7QUFBQSxvREFaMEIsRUFZMUI7QUFBQSxrREFYd0IsUUFXeEI7QUFBQSxnREFWZSxLQUFLQyxnQkFBTCxFQVVmO0FBQ0k7QUFDQSxTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFL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aEMsQ0FONkMsQ0FPN0M7O0FBQ0EsTUFBTUMsU0FBUyxHQUFHSCxLQUFLLENBQUNJLFFBQU4sS0FBbUJILFNBQVMsQ0FBQ0csUUFBVixFQUFyQzs7QUFDQSxNQUFJRCxTQUFTLEdBQUcsQ0FBWixJQUFrQkEsU0FBUyxLQUFLLENBQWQsSUFBbUJILEtBQUssQ0FBQ0ssT0FBTixLQUFrQkosU0FBUyxDQUFDSSxPQUFWLEVBQTNELEVBQWlGO0FBQy9FMUMsSUFBQUEsR0FBRztBQUNKOztBQUNELFNBQU9BLEdBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpY2tuZXNzZXMgfSBmcm9tIFwiLi4vbW9kZWxzL1NpY2tuZXNzZXNcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xudmFyIGxvZ2dseSA9IHJlcXVpcmUoJ2xvZ2dseScpO1xudmFyIGxvZ2dlciA9IGxvZ2dseS5jcmVhdGVDbGllbnQoeyB0b2tlbjpcImM2OTljNDUxLTY4ZTgtNGE2ZC1hNDAzLWIxOTM0MzI5NzE0NFwiLCBzdWJkb21haW46XCJDYXJlZDRcIiwgc2VuZENvbnNvbGVFcnJvcnM6IGZhbHNlLCB0YWc6XCJDYXJlZDQtQVBJLVNpY2tuZXNzREFPXCIgfSk7XG5cbi8qXG5EQU8gZmlsZSB1c2VkIGZvciBjb25uZWN0aW5nIHRoZSBBUEkgdG8gdGhlIGRhdGFiYXNlXG5UaGlzIERBTyBoYW5kbGVzIHRoZSBzaWNrbmVzcyB0YWJsZSBpbiBvdXIgZGF0YWJhc2VcbiovXG5cbmV4cG9ydCBjbGFzcyBTaWNrbmVzc0RBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJDYXJlZDRcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgc2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzIFNpY2tuZXNzIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIFNpY2tuZXNzIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHNpY2tuZXNzOlNpY2tuZXNzZXMsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IGNyZWF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgLy9UcnlpbmcgdG8gY3JlYXRlIGEgdXNlclxuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGFuIElOU0VSVCBxdWVyeVwiKTtcbiAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgU2lja25lc3NcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIFNJQ0tORVNTRVMgKE5BTUUsIENPTU1PTk5BTUUsIFNZTVBUT01TLCBERVNDUklQVElPTiwgUkFSSVRZLCBTRVZFUklUWSwgVFJFQVRNRU5ULCBTVFJPTkdBR0FJTlNULCBSRVFVSVJFTUVOVFMsIENPTU1PTlRBUkdFVFMpIFZBTFVFUyg/LD8sPyw/LD8sPyw/LD8sPyw/KScsIFtzaWNrbmVzcy5OYW1lLCBzaWNrbmVzcy5Db21tb25OYW1lLCBzaWNrbmVzcy5TeW1wdG9tcywgc2lja25lc3MuRGVzY3JpcHRpb24sIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdCwgc2lja25lc3MuUmVxdWlyZW1lbnRzLCBzaWNrbmVzcy5Db21tb25UYXJnZXRzXSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIHJvd3MgYWZmZWN0ZWQgdGhlbiByZXR1cm4gLTEgdG8gc2lnbmFsIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBjcmVhdGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBpZCBvZiB0aGUgbmV3bHkgY3JlYXRlZCBzaWNrbmVzc1xuICAgICAgICAgICAgICAgIGxldCBzaWNrbmVzc0lkID0gcmVzdWx0MS5pbnNlcnRJZDtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJJTlNFUlQgUXVlcnkgZXhlY3V0ZWQuIE5ldyBTaWNrbmVzcyBJRCA9IFwiICsgc2lja25lc3NJZCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogY3JlYXRlKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3NJZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgY3JlYXRpbmcgc2lja25lc3M6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGNyZWF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYWxsIFNpY2tuZXNzZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBTaWNrbmVzc2VzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kU2lja25lc3MoY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFNpY2tuZXNzKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAvLyBMaXN0IG9mIHNpY2tuZXNzZXMgdG8gcmV0dXJuXG4gICAgICAgIGxldCBzaWNrbmVzczpTaWNrbmVzc2VzW10gPSBbXTtcbiAgICAgICAgLy9UcnlpbmcgdG8gZmluZCBhbGwgc2lja25lc3Nlc1xuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIFNpY2tuZXNzZXMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgU2lja25lc3Nlc1xuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGEgU0VMRUNUIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXNcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgJyk7XG4gICAgICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHNpY2tuZXNzIGFuZCBpdHMgZGF0YSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICBzaWNrbmVzcy5wdXNoKG5ldyBTaWNrbmVzc2VzKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5DT01NT05OQU1FLCByZXN1bHQxW3hdLlNZTVBUT01TLCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLlJBUklUWSwgcmVzdWx0MVt4XS5TRVZFUklUWSwgcmVzdWx0MVt4XS5UUkVBVE1FTlQsIHJlc3VsdDFbeF0uU1RST05HQUdBSU5TVCwgcmVzdWx0MVt4XS5SRVFVSVJFTUVOVFMsIHJlc3VsdDFbeF0uQ09NTU9OVEFSR0VUUywgcmVzdWx0MVt4XS5JTUcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiU0VMRUNUIFF1ZXJ5IGV4ZWN1dGVkLiBTaWNrbmVzc2VzIFJldHVybmVkLlwiKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3MoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYWxsIHNpY2tuZXNzZXM6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzcygpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgc2lja25lc3MgaW4gdGhlIGRhdGFiYXNlIGJ5IGl0J3MgSURcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgSUQgb2YgdGhlIHNpY2tuZXNzIGJlaW5nIHJldHJpZXZlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiB0aGUgc2lja25lc3NlcyByZXRyaWV2ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IGZpbmRTaWNrbmVzc0J5SWQoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgIC8vIFNpY2tuZXNzIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICBsZXQgc2lja25lc3M6U2lja25lc3NlcztcblxuICAgICAgICAvL1RyeWluZyB0byBmaW5kIGEgc2lja25lc3MgYnkgaWRcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgYW5kIGV4ZWN1dGluZyBhIFNFTEVDVCBxdWVyeVwiKTtcbiAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzIGZvciBzZWFyY2hcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCBXSEVSRSBJRCA9ID9cIiwgaWQpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlNFTEVDVCBRdWVyeSBleGVjdXRlZC4gU2lja25lc3NlcyByZXR1cm5lZCA9IFwiICsgcmVzdWx0MS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIExvb3Bpbmcgb3ZlciB0aGUgcmVzdWx0cyBhbmQgcHVzaGluZyBlYWNoIHNpY2tuZXNzIHRoYXQgaGFzIGJlZW4gcmV0cmlldmVkIGZyb20gdGhlIGRhdGFiYXNlIHRvIHRoZSBsaXN0IChzaG91bGQgb25seSBiZSBvbmUpXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBzaWNrbmVzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICBzaWNrbmVzcyA9IG5ldyBTaWNrbmVzc2VzKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5DT01NT05OQU1FLCByZXN1bHQxW3hdLlNZTVBUT01TLCByZXN1bHQxW3hdLkRFU0NSSVBUSU9OLCByZXN1bHQxW3hdLlJBUklUWSwgcmVzdWx0MVt4XS5TRVZFUklUWSwgcmVzdWx0MVt4XS5UUkVBVE1FTlQsIHJlc3VsdDFbeF0uU1RST05HQUdBSU5TVCwgcmVzdWx0MVt4XS5SRVFVSVJFTUVOVFMsIHJlc3VsdDFbeF0uQ09NTU9OVEFSR0VUUywgcmVzdWx0MVt4XS5JTUcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeUlkKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBTb21ldGhpbmcgd2VudCB3cm9uZyBmaW5kaW5nIGEgc2lja25lc3MgYnkgSUQ6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5SWQoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgc2lja25lc3MgaW4gdGhlIGRhdGFiYXNlIGJ5IGl0J3Mgc3ltcHRvbXNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc3ltcHRvbXMgc3ltcHRvbXMgb2YgdGhlIHNpY2tuZXNzIGJlaW5nIHJldHJpZXZlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiB0aGUgc2lja25lc3NlcyByZXRyaWV2ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzQnlTeW1wdG9tcyhzeW1wdG9tczpzdHJpbmcsIGNvbmRpdGlvbnM6c3RyaW5nLCBiaXJ0aGRheTpzdHJpbmcsIHNleDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IGZpbmRTaWNrbmVzc0J5U3ltcHRvbXMoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgIC8vIFNpY2tuZXNzIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICBsZXQgc2lja25lc3NlczpTaWNrbmVzc2VzW10gPSBbXTtcbiAgICAgICAgLy9HZXR0aW5nIHVzZXIncyBhZ2UgYXR0cmlidXRlc1xuICAgICAgICBsZXQgYWdlOm51bWJlcjtcbiAgICAgICAgaWYgKGJpcnRoZGF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBET0IgPSBuZXcgRGF0ZShiaXJ0aGRheSk7XG4gICAgICAgICAgICBhZ2UgPSBjYWxjdWxhdGVBZ2UoRE9CKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVHJ5aW5nIHRvIGZpbmQgYSBzaWNrbmVzcyBieSBzeW1wdG9tc1xuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGEgU0VMRUNUIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIFNZTVBUT01TIExJS0UgJyVcIisgc3ltcHRvbXMgKyBcIiUnIE9SREVSIEJZIFJBUklUWVwiKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTRUxFQ1QgUXVlcnkgZXhlY3V0ZWQuIFNpY2tuZXNzZXMgcmV0dXJuZWQgPSBcIiArIHJlc3VsdDEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdCAoc2hvdWxkIG9ubHkgYmUgb25lKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIGEgdXNlciBpcyBzaWduZWQgaW4sIHRoZSBzZXZlcml0eSBhbGdvcml0aG0gd2lsbCB0aHJvd1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9ucylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxjdWxhdGluZyBuZXcgc2V2ZXJpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXZlcml0eUFkZCA9IHNldmVyaXR5QWxnb3JpdGhtKGNvbmRpdGlvbnMsIGFnZSwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNUKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0MVt4XS5TRVZFUklUWSArPSBzZXZlcml0eUFkZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsY3VsYXRpbmcgbmV3IHJhcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFJhcml0eSA9IHJlc3VsdDFbeF0uUkFSSVRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Jhcml0eSA9IHJhcml0eUFsZ29yaXRobShjb25kaXRpb25zLCBhZ2UsIGN1cnJlbnRSYXJpdHksIHNleCwgcmVzdWx0MVt4XS5DT01NT05UQVJHRVRTLCByZXN1bHQxW3hdLlJFUVVJUkVNRU5UUylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDFbeF0uUkFSSVRZID0gbmV3UmFyaXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBzaWNrbmVzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICBzaWNrbmVzc2VzLnB1c2gobmV3IFNpY2tuZXNzZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLkNPTU1PTk5BTUUsIHJlc3VsdDFbeF0uU1lNUFRPTVMsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uUkFSSVRZLCByZXN1bHQxW3hdLlNFVkVSSVRZLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNULCByZXN1bHQxW3hdLlJFUVVJUkVNRU5UUywgcmVzdWx0MVt4XS5DT01NT05UQVJHRVRTLCByZXN1bHQxW3hdLklNRykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NvcnRpbmcgdGhlIHNpY2tlc3MgYnkgcmFyaXR5IChUaGlzIGlzIHRvIHVwZGF0ZSB0aGUgb3JkZXIgYmFzZWQgb24gdGhlIGFsZ29yaXRobSBhZGp1c3RtZW50cylcbiAgICAgICAgICAgICAgICBzaWNrbmVzc2VzLnNvcnQoKGEsIGIpID0+IGEuUmFyaXR5IC0gYi5SYXJpdHkpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5U3ltcHRvbXMoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZmluZGluZyBhIHNpY2tuZXNzIGJ5IHN5bXB0b21zOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeVN5bXB0b21zKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3Nlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIG5hbWVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5TmFtZShuYW1lOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFNpY2tuZXNzQnlOYW1lKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHNpY2tuZXNzZXM6U2lja25lc3Nlc1tdID0gW107XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZmluZCBhIHNpY2tuZXNzIGJ5IG5hbWVcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgYW5kIGV4ZWN1dGluZyBhIFNFTEVDVCBxdWVyeVwiKTtcbiAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzIGZvciBzZWFyY2hcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCBXSEVSRSBDT01NT05OQU1FIExJS0UgJyVcIisgbmFtZSArIFwiJSdcIik7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiU0VMRUNUIFF1ZXJ5IGV4ZWN1dGVkLiBTaWNrbmVzc2VzIHJldHVybmVkID0gXCIgKyByZXN1bHQxLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3QgKHNob3VsZCBvbmx5IGJlIG9uZSlcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHNpY2tuZXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHNpY2tuZXNzZXMucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QsIHJlc3VsdDFbeF0uUkVRVUlSRU1FTlRTLCByZXN1bHQxW3hdLkNPTU1PTlRBUkdFVFMsIHJlc3VsdDFbeF0uSU1HKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5TmFtZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1jYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYSBzaWNrbmVzcyBieSBuYW1lOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeU5hbWUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIHJldHVybiAzIHJhbmRvbSBpbGxuZXNzZXMgZm9yIHRoZSBob21lIHBhZ2Ugb2YgQ2FyZWQ0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgU2lja25lc3Nlcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzQnlSYW5kb20oY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFNpY2tuZXNzQnlSYW5kb20oKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgIC8vIExpc3Qgb2Ygc2lja25lc3NlcyB0byByZXR1cm5cbiAgICAgICAgbGV0IHNpY2tuZXNzOlNpY2tuZXNzZXNbXSA9IFtdO1xuICAgICAgICAgICAgIFxuICAgICAgICAvL1RyeWluZyB0byBmaW5kIHJhbmRvbSBzaWNrbmVzc2VzXG4gICAgICAgIHRyeSBcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIFNpY2tuZXNzZXMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgU2lja25lc3Nlc1xuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3Nlc1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgT1JERVIgQlkgUkFORCgpIExJTUlUIDMnKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTRUxFQ1QgUXVlcnkgZXhlY3V0ZWQuIFNpY2tuZXNzZXMgcmV0dXJuZWQgPSBcIiArIHJlc3VsdDEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgc2lja25lc3MgYW5kIGl0cyBkYXRhIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgIHNpY2tuZXNzLnB1c2gobmV3IFNpY2tuZXNzZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLkNPTU1PTk5BTUUsIHJlc3VsdDFbeF0uU1lNUFRPTVMsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uUkFSSVRZLCByZXN1bHQxW3hdLlNFVkVSSVRZLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNULCByZXN1bHQxW3hdLlJFUVVJUkVNRU5UUywgcmVzdWx0MVt4XS5DT01NT05UQVJHRVRTLCByZXN1bHQxW3hdLklNRykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5UmFuZG9tKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBTb21ldGhpbmcgd2VudCB3cm9uZyBmaW5kaW5nIGEgcmFuZG9tIHNpY2tuZXNzOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeVJhbmRvbSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBTaWNrbmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2lja25lc3MgU2lja25lc3MgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHNpY2tuZXNzOlNpY2tuZXNzZXMsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcblxuICAgICAgICAvL1RyeWluZyB0byB1cGRhdGUgYSBzaWNrbmVzc1xuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFNpY2tuZXNzXG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYW4gVVBEQVRFIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlVQREFURSBgU0lDS05FU1NFU2AgU0VUIE5BTUU9PywgQ09NTU9OTkFNRT0/LCBTWU1QVE9NUz0/LCBERVNDUklQVElPTj0/LCBSQVJJVFk9PywgU0VWRVJJVFk9PywgVFJFQVRNRU5UPT8sIFNUUk9OR0FHQUlOU1Q9PywgUkVRVUlSRU1FTlRTPT8sIENPTU1PTlRBUkdFVFM9PyBXSEVSRSBJRD0/XCIsIFtzaWNrbmVzcy5OYW1lLCBzaWNrbmVzcy5Db21tb25OYW1lLCBzaWNrbmVzcy5TeW1wdG9tcywgc2lja25lc3MuRGVzY3JpcHRpb24sIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdCwgc2lja25lc3MuUmVxdWlyZW1lbnRzLCBzaWNrbmVzcy5Db21tb25UYXJnZXRzXSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpbmRpY2F0ZXMgdGhhdCBhIHJvdyB3YXMgdXBkYXRlZCwgdGhlbiB0aGUgbnVtYmVyIG9mIGNoYW5nZXMgaW5jcmVhc2VzXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiVVBEQVRFIFF1ZXJ5IGV4ZWN1dGVkLiBSb3dzIGFmZmVjdGVkID0gXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAvL0xvZyB0aGUgY2hhbmdlc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1jYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIGEgc2lja25lc3M6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGRlbGV0ZSBhIFNpY2tuZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzaWNrbmVzc0lkIFNpY2tuZXNzIElEIHRvIGRlbGV0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGVsZXRlKHNpY2tuZXNzSWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBkZWxldGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZGVsZXRlIGEgc2lja25lc3NcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSBTaWNrbmVzc1xuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGEgREVMRVRFIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIElEPT8nLCBbc2lja25lc3NJZF0pO1xuICAgICAgICAgICAgICAgIC8vIENoYW5nZXMgbWFkZSB0byB0aGUgZGF0YWJhc2UgYmVpbmcgc2F2ZWQgdG8gYSB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiREVMRVRFIFF1ZXJ5IGV4ZWN1dGVkLiBSb3dzIGFmZmVjdGVkID0gXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBkZWxldGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZGVsZXRpbmcgYSBzaWNrbmVzczogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZGVsZXRlKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICAvL1JldHVybiBhIGRhdGFiYXNlIGNvbm5lY3Rpb25cbiAgICAgICAgcmV0dXJuIG15c3FsLmNyZWF0ZVBvb2woe2hvc3Q6IHRoaXMuaG9zdCwgcG9ydDogdGhpcy5wb3J0LCB1c2VyOiB0aGlzLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgZGF0YWJhc2U6IHRoaXMuc2NoZW1hLCBjb25uZWN0aW9uTGltaXQ6IDEwfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIE1ldGhvZCB0aGF0IGNhbGN1bGF0ZXMgdGhlIG5ldyBzZXZlcml0eVxuICogQHBhcmFtIGNvbmRpdGlvbnMgVGhlIHVzZXIncyBwcmUtZXhpc3RpbmcgY29uZGl0aW9uc1xuICogQHBhcmFtIHVzZXJBZ2UgVGhlIHVzZXIncyBhZ2VcbiAqIEBwYXJhbSBzdHJvbmdBZ2FpbnN0ICBXaGF0IGNvbmRpdGlvbnMgdGhlIGlsbG5lc3MgaXMgc3Ryb25nIGFnYWluc3RcbiAqIEByZXR1cm5zIFJldHVybnMgdGhlIG5ldyBzZXZlcml0eVxuICovXG5mdW5jdGlvbiBzZXZlcml0eUFsZ29yaXRobShjb25kaXRpb25zOnN0cmluZywgdXNlckFnZTpudW1iZXIsIHN0cm9uZ0FnYWluc3Q6c3RyaW5nKTpudW1iZXIge1xuICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogc2V2ZXJpdHlBbGdvcml0aG0oKVwiKTtcbiAgICAvL1ZhbHVlIHRoYXRzIGdvaW5nIHRvIGluY3JlYXNlIHRoZSBzZXZlcml0eSBvZiBhbiBpbGxuZXNzXG4gICAgbGV0IG5ld1NldmVyaXR5ID0gMDtcblxuICAgIHRyeVxuICAgIHtcbiAgICAgICAgLy9TcGxpdHRpbmcgdGhlIHVzZXIncyBjb25kaXRpb25zIGludG8gYW4gYXJyYXkgdG8gdGVzdCBhZ2FpbnN0IHRoZSBzdHJvbmcgYWdhaW5zdCB2YWx1ZVxuICAgICAgICBjb25zdCBzcGxpdENvbmRpdGlvbnM6IHN0cmluZ1tdID0gY29uZGl0aW9ucy5zcGxpdChcIixcIik7XG4gICAgXG4gICAgICAgIC8vTG9vcGluZyBvdmVyIGFsbCB1c2VyIGNvbmRpdGlvbnMgYW5kIHRlc3RpbmcgdGhlbSBhZ2FpbnN0IHRoZSBzdHJvbmcgYWdhaW5zdCB2YWx1ZVxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNwbGl0Q29uZGl0aW9ucy5sZW5ndGg7IHgrKylcbiAgICAgICAge1xuICAgICAgICAgICAgLy9SZW1vdmluZyBzcGFjZXMgZm9yIGRhdGEgdmFsaWRhdGlvblxuICAgICAgICAgICAgc3BsaXRDb25kaXRpb25zW3hdID0gc3BsaXRDb25kaXRpb25zW3hdLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAgIC8vSWYgc3Ryb25nIGFnYWluc3QgaW5jbHVkZXMgYSB1c2VyIGNvbmRpdGlvbiwgdGhlbiB0aGUgc2V2ZXJpdHkgdmFsdWUgaW5jcmVhc2VzXG4gICAgICAgICAgICBpZiAoc3Ryb25nQWdhaW5zdC5pbmNsdWRlcyhzcGxpdENvbmRpdGlvbnNbeF0pKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5ld1NldmVyaXR5Kz0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9BZGRpbmcgZXh0cmEgdmFsdWUgaWYgQ2hlbW90aGVyYXB5IGlzIGludm9sdmVkXG4gICAgICAgICAgICBpZiAoc3BsaXRDb25kaXRpb25zW3hdID09PSBcIkNoZW1vdGhlcmFweVwiICYmIHN0cm9uZ0FnYWluc3QuaW5jbHVkZXMoXCJDaGVtb3RoZXJhcHlcIikpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3U2V2ZXJpdHkrPTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cm9uZ0FnYWluc3QuaW5jbHVkZXMoXCJFbGRlcmx5XCIpKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodXNlckFnZSA+IDY0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyQWdlID4gODQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXZlcml0eSs9MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2V2ZXJpdHkrPTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpXG4gICAge1xuICAgICAgICBsb2dnZXIubG9nKFwiU09NRVRISU5HIFdFTlQgV1JPTkcgSU4gVEhFIFNFVkVSSVRZIEFMR09SSVRITTogXCIgKyBlcnIpO1xuICAgIH1cblxuICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBzZXZlcml0eUFsZ29yaXRobSgpXCIpO1xuICAgIHJldHVybihuZXdTZXZlcml0eSk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdXNlZCB0byB1cGRhdGUgdGhlIHJhcml0eSBvZiBhbiBpbGxuZXNzXG4gKiBAcGFyYW0gY29uZGl0aW9ucyBVc2VyJ3MgcHJlLWV4aXN0aW5nIGNvbmRpdGlvbnNcbiAqIEBwYXJhbSB1c2VyQWdlIFVzZXIncyBhZ2VcbiAqIEBwYXJhbSBjdXJyZW50UmFyaXR5IFRoZSBjdXJyZW50IHJhcml0eSBvZiB0aGUgaWxsbmVzc1xuICogQHBhcmFtIHNleCBVc2VyJ3Mgc2V4XG4gKiBAcGFyYW0gY29tbW9ubHlBZmZlY3RzIFdoYXQgdGhlIGlsbG5lc3MgY29tbW9ubHkgYWZmZWN0c1xuICogQHBhcmFtIHJlcXVpcmVtZW50cyBUaGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBpbGxuZXNzXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBhZGp1c3RlZCByYXJpdHlcbiAqL1xuZnVuY3Rpb24gcmFyaXR5QWxnb3JpdGhtKGNvbmRpdGlvbnM6c3RyaW5nLCB1c2VyQWdlOm51bWJlciwgY3VycmVudFJhcml0eTpudW1iZXIsIHNleDpzdHJpbmcsIGNvbW1vbmx5QWZmZWN0czpzdHJpbmcsIHJlcXVpcmVtZW50czpzdHJpbmcpOiBudW1iZXJcbntcbiAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IHJhcml0eUFsZ29yaXRobSgpXCIpO1xuICAgIGxldCBuZXdSYXJpdHkgPSBjdXJyZW50UmFyaXR5O1xuXG4gICAgLy9UcnlpbmcgdG8gZ2V0IHRoZSBhZ2UgcmFuZ2UgZnJvbSBpbnNpZGUgdGhlIGNvbW1vbmx5QWZmZWN0cyBhdHRyaWJ1dGVcbiAgICB0cnlcbiAgICB7XG4gICAgICAgIC8vUGFyc2luZyBjb21tb25seSBhZmZlY3RzIGFnZSBvdXQgb2YgdGhlIHN0cmluZ1xuICAgICAgICBjb25zdCBhZ2VDaGVja1NwbGl0OiBzdHJpbmdbXSA9IGNvbW1vbmx5QWZmZWN0cy5zcGxpdChcIi1cIik7XG4gICAgICAgIHZhciBudW0xc3RyaW5nID0gYWdlQ2hlY2tTcGxpdFswXS5yZXBsYWNlKC9cXEQvZywnJyk7XG4gICAgICAgIHZhciBudW0yc3RyaW5nID0gYWdlQ2hlY2tTcGxpdFsxXS5yZXBsYWNlKC9cXEQvZywnJyk7XG4gICAgICAgIHZhciBudW0xOm51bWJlciA9ICtudW0xc3RyaW5nO1xuICAgICAgICB2YXIgbnVtMjpudW1iZXIgPSArbnVtMnN0cmluZztcblxuICAgICAgICAvLyBJZiB0aGUgdXNlciBpcyBpbnNpZGUgdGhlIGNvbW1vbmx5IGFmZmVjdHMgYWdlIHJhbmdlIHRoZW4gcmFyaXR5IGlzIGxvd2VyZWRcbiAgICAgICAgaWYgKHVzZXJBZ2UgPiBudW0xICYmIHVzZXJBZ2UgPCBudW0yKVxuICAgICAgICB7XG4gICAgICAgICAgICBuZXdSYXJpdHktLTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycilcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gYWdlIHJhbmdlIGluc2lkZSB0aGUgY29tbW9ubHlBZmZlY3RzIGF0dHJpYnV0ZVwiKTtcbiAgICB9XG4gICAgXG4gICAgLy9UcnlpbmcgdG8gcmVkdWNlIHRoZSByYXJpdHkgb2YgYW4gaWxsbmVzc1xuICAgIHRyeVxuICAgIHtcbiAgICAgICAgLy9JZiBhIHJlcXVpcmVtZW50IGlzIHNleCBzcGVjaWZpYywgdGhlbiB0aGUgcmFyaXR5IHdpbGwgaW5jcmVhc2UgYnkgYSBzaWduaWZpY2FudCBhbW1vdW50IGlmIHRoZSBzZXggZG9lcyBub3QgYWxpZ25cbiAgICAgICAgaWYgKChyZXF1aXJlbWVudHMuaW5jbHVkZXMoXCJNYWxlXCIpICYmIHNleCA9PT0gXCJGZW1hbGVcIikgfHwgKHJlcXVpcmVtZW50cy5pbmNsdWRlcyhcIkZlbWFsZVwiKSAmJiBzZXggPT09IFwiTWFsZVwiKSlcbiAgICAgICAge1xuICAgICAgICAgICAgbmV3UmFyaXR5Kz0xMDAwO1xuICAgICAgICB9IFxuICAgICAgICAvL1NwbGl0dGluZyB0aGUgdXNlcidzIGNvbmRpdGlvbnMgaW50byBhbiBhcnJheSB0byB0ZXN0IGFnYWluc3QgdGhlIHJlcXVpcmVtZW50cyB2YWx1ZVxuICAgICAgICBjb25zdCBzcGxpdENvbmRpdGlvbnM6IHN0cmluZ1tdID0gY29uZGl0aW9ucy5zcGxpdChcIixcIik7XG4gICAgICAgIC8vTG9vcGluZyBvdmVyIGFsbCB1c2VyIGNvbmRpdGlvbnMgYW5kIHRlc3RpbmcgdGhlbSBhZ2FpbnN0IHRoZSByZXF1aXJlbWVudHMgdmFsdWVcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBzcGxpdENvbmRpdGlvbnMubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgLy9SZW1vdmluZyBzcGFjZXMgZm9yIGRhdGEgdmFsaWRhdGlvblxuICAgICAgICAgICAgc3BsaXRDb25kaXRpb25zW3hdID0gc3BsaXRDb25kaXRpb25zW3hdLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcblxuICAgICAgICAgICAgLy9DaGVja2luZyBkaWZmZXJlbnQgcG9zc2liaWxpdGllcyB0byByZWR1Y2UgcmFyaXR5XG4gICAgICAgICAgICBpZiAocmVxdWlyZW1lbnRzLmluY2x1ZGVzKHNwbGl0Q29uZGl0aW9uc1t4XSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3UmFyaXR5ID0gbmV3UmFyaXR5IC0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbW9ubHlBZmZlY3RzLmluY2x1ZGVzKHNleCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3UmFyaXR5LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbW9ubHlBZmZlY3RzLmluY2x1ZGVzKHNwbGl0Q29uZGl0aW9uc1t4XSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3UmFyaXR5LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSBjYXRjaChlcnIpXG4gICAge1xuICAgICAgICBsb2dnZXIubG9nKFwiU09NRVRISU5HIFdFTlQgV1JPTkcgSU4gVEhFIFJBUklUWSBBTEdPUklUSE06IFwiKSArIGVycjtcbiAgICB9XG5cbiAgICAvL0lmIHRoZSByYXJpdHkgZHJvcHMgYmVsb3cgMSwgdGhpcyBpZiBzdGF0ZW1lbnQgcHVzaGVzIGl0IGJhY2sgdXAgdG8gMVxuICAgIGlmIChuZXdSYXJpdHkgPCAxKVxuICAgIHtcbiAgICAgICAgbmV3UmFyaXR5ID0gMTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nKFwiRVhJVElORzogcmFyaXR5QWxnb3JpdGhtKClcIik7XG4gICAgcmV0dXJuIG5ld1Jhcml0eTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgYWdlIG9mIHRoZSB1c2VyIGJhc2VkIG9uIHRoZSBiaXJ0aGRheVxuICogQHBhcmFtIGRhdGVPZkJpcnRoIEJpcnRoZGF5IG9mIHRoZSB1c2VyXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSB1c2VycyBhZ2VcbiAqL1xuZnVuY3Rpb24gY2FsY3VsYXRlQWdlKGRhdGVPZkJpcnRoOiBEYXRlKTogbnVtYmVyIHtcbiAgICAvL0dldHRpbmcgdG9kYXlzIGRhdGVcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgLy9HZXR0aW5nIHRoZSB1c2VyJ3MgYmlydGhkYXlcbiAgICBjb25zdCBiaXJ0aERhdGUgPSBuZXcgRGF0ZShkYXRlT2ZCaXJ0aCk7XG4gICAgLy9HZXR0aW5nIHRoZSBvdmVyYWxsIGFnZVxuICAgIGxldCBhZ2UgPSB0b2RheS5nZXRGdWxsWWVhcigpIC0gYmlydGhEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgLy9BZGp1c3RpbmcgdGhlIGFnZSBiYXNlZCBvbiB3aGF0IG1vbnRoIGl0IGlzXG4gICAgY29uc3QgbW9udGhEaWZmID0gdG9kYXkuZ2V0TW9udGgoKSAtIGJpcnRoRGF0ZS5nZXRNb250aCgpO1xuICAgIGlmIChtb250aERpZmYgPCAwIHx8IChtb250aERpZmYgPT09IDAgJiYgdG9kYXkuZ2V0RGF0ZSgpIDwgYmlydGhEYXRlLmdldERhdGUoKSkpIHtcbiAgICAgIGFnZS0tO1xuICAgIH1cbiAgICByZXR1cm4gYWdlO1xufSJdfQ==