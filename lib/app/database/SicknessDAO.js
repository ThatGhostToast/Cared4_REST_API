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
    value: function findSicknessBySymptoms(symptoms, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findSicknessBySymptoms() Inside SicknessDAO.ts"); // Sickness that's going to be returned

      var sicknesses = []; //Trying to find a sickness by symptoms

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
            var result1, x;
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
                    return connection.query("SELECT * FROM `SICKNESSES` WHERE SYMPTOMS LIKE '%" + symptoms + "%'");

                  case 9:
                    result1 = _context4.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Sicknesses returned = " + result1.length); // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)

                    for (x = 0; x < result1.length; ++x) {
                      // Get sickness information
                      sicknesses.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].DESCRIPTION, result1[x].RARITY, result1[x].SEVERITY, result1[x].TREATMENT, result1[x].STRONGAGAINST, result1[x].REQUIREMENTS, result1[x].COMMONTARGETS, result1[x].IMG));
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findSicknessBySymptoms() Inside SicknessDAO.ts"); // Do a callback to return the results

                    callback(sicknesses);

                  case 14:
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
                    return connection.query("SELECT * FROM `SICKNESSES` WHERE NAME LIKE '%" + name + "%'");

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

exports.SicknessDAO = SicknessDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TaWNrbmVzc0RBTy50cyJdLCJuYW1lcyI6WyJsb2dnbHkiLCJyZXF1aXJlIiwibG9nZ2VyIiwiY3JlYXRlQ2xpZW50IiwidG9rZW4iLCJzdWJkb21haW4iLCJzZW5kQ29uc29sZUVycm9ycyIsInRhZyIsIlNpY2tuZXNzREFPIiwiaG9zdCIsInBvcnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5pdERiQ29ubmVjdGlvbiIsInBvb2wiLCJzaWNrbmVzcyIsImNhbGxiYWNrIiwibG9nIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJyZWxlYXNlIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiTmFtZSIsIkNvbW1vbk5hbWUiLCJTeW1wdG9tcyIsIkRlc2NyaXB0aW9uIiwiUmFyaXR5IiwiU2V2ZXJpdHkiLCJUcmVhdG1lbnQiLCJTdHJvbmdBZ2FpbnN0IiwiUmVxdWlyZW1lbnRzIiwiQ29tbW9uVGFyZ2V0cyIsInJlc3VsdDEiLCJhZmZlY3RlZFJvd3MiLCJzaWNrbmVzc0lkIiwiaW5zZXJ0SWQiLCJlcnJvciIsIngiLCJsZW5ndGgiLCJwdXNoIiwiU2lja25lc3NlcyIsIklEIiwiTkFNRSIsIkNPTU1PTk5BTUUiLCJTWU1QVE9NUyIsIkRFU0NSSVBUSU9OIiwiUkFSSVRZIiwiU0VWRVJJVFkiLCJUUkVBVE1FTlQiLCJTVFJPTkdBR0FJTlNUIiwiUkVRVUlSRU1FTlRTIiwiQ09NTU9OVEFSR0VUUyIsIklNRyIsImlkIiwic3ltcHRvbXMiLCJzaWNrbmVzc2VzIiwibmFtZSIsImNoYW5nZXMiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFDQSxJQUFJQSxNQUFNLEdBQUdD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QUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUN1RCxRQUFBQSxJQUFJLEVBQUUsS0FBS3RELFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZzRCxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWNrbmVzc2VzIH0gZnJvbSBcIi4uL21vZGVscy9TaWNrbmVzc2VzXCI7XG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbnZhciBsb2dnbHkgPSByZXF1aXJlKCdsb2dnbHknKTtcbnZhciBsb2dnZXIgPSBsb2dnbHkuY3JlYXRlQ2xpZW50KHsgdG9rZW46XCJjNjk5YzQ1MS02OGU4LTRhNmQtYTQwMy1iMTkzNDMyOTcxNDRcIiwgc3ViZG9tYWluOlwiQ2FyZWQ0XCIsIHNlbmRDb25zb2xlRXJyb3JzOiBmYWxzZSwgdGFnOlwiQ2FyZWQ0LUFQSS1TaWNrbmVzc0RBT1wiIH0pO1xuXG4vKlxuREFPIGZpbGUgdXNlZCBmb3IgY29ubmVjdGluZyB0aGUgQVBJIHRvIHRoZSBkYXRhYmFzZVxuVGhpcyBEQU8gaGFuZGxlcyB0aGUgc2lja25lc3MgdGFibGUgaW4gb3VyIGRhdGFiYXNlXG4qL1xuXG5leHBvcnQgY2xhc3MgU2lja25lc3NEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiQ2FyZWQ0XCI7XG4gICAgcHJpdmF0ZSBwb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgLyoqXG4gICAgICogTm9uLWRlZmF1bHQgY29uc3RydWN0b3IuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGhvc3QgRGF0YWJhc2UgSG9zdG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgRGF0YWJhc2UgVXNlcm5hbWVcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IGFsbCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHNpY2tuZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzaWNrbmVzcyBTaWNrbmVzcyB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBTaWNrbmVzcyBJRCBjcmVhdGVkLiAgXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZShzaWNrbmVzczpTaWNrbmVzc2VzLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBjcmVhdGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgIC8vVHJ5aW5nIHRvIGNyZWF0ZSBhIHVzZXJcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgYW5kIGV4ZWN1dGluZyBhbiBJTlNFUlQgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFNpY2tuZXNzXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBTSUNLTkVTU0VTIChOQU1FLCBDT01NT05OQU1FLCBTWU1QVE9NUywgREVTQ1JJUFRJT04sIFJBUklUWSwgU0VWRVJJVFksIFRSRUFUTUVOVCwgU1RST05HQUdBSU5TVCwgUkVRVUlSRU1FTlRTLCBDT01NT05UQVJHRVRTKSBWQUxVRVMoPyw/LD8sPyw/LD8sPyw/LD8sPyknLCBbc2lja25lc3MuTmFtZSwgc2lja25lc3MuQ29tbW9uTmFtZSwgc2lja25lc3MuU3ltcHRvbXMsIHNpY2tuZXNzLkRlc2NyaXB0aW9uLCBzaWNrbmVzcy5SYXJpdHksIHNpY2tuZXNzLlNldmVyaXR5LCBzaWNrbmVzcy5UcmVhdG1lbnQsIHNpY2tuZXNzLlN0cm9uZ0FnYWluc3QsIHNpY2tuZXNzLlJlcXVpcmVtZW50cywgc2lja25lc3MuQ29tbW9uVGFyZ2V0c10pO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyByb3dzIGFmZmVjdGVkIHRoZW4gcmV0dXJuIC0xIHRvIHNpZ25hbCBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogY3JlYXRlKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIC8vZ2V0dGluZyB0aGUgaWQgb2YgdGhlIG5ld2x5IGNyZWF0ZWQgc2lja25lc3NcbiAgICAgICAgICAgICAgICBsZXQgc2lja25lc3NJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiSU5TRVJUIFF1ZXJ5IGV4ZWN1dGVkLiBOZXcgU2lja25lc3MgSUQgPSBcIiArIHNpY2tuZXNzSWQpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGNyZWF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGNyZWF0aW5nIHNpY2tuZXNzOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBjcmVhdGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjaygtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBTaWNrbmVzc2VzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgU2lja25lc3Nlcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzKGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IGZpbmRTaWNrbmVzcygpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgLy8gTGlzdCBvZiBzaWNrbmVzc2VzIHRvIHJldHVyblxuICAgICAgICBsZXQgc2lja25lc3M6U2lja25lc3Nlc1tdID0gW107XG4gICAgICAgIC8vVHJ5aW5nIHRvIGZpbmQgYWxsIHNpY2tuZXNzZXNcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZSwgcnVuIHRoZSBxdWVyeSB0byBnZXQgYWxsIHRoZSBTaWNrbmVzc2VzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIFNpY2tuZXNzZXNcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgYW5kIGV4ZWN1dGluZyBhIFNFTEVDVCBxdWVyeVwiKTtcbiAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCcpO1xuICAgICAgICAgICAgICAgIC8vIExvb3Bpbmcgb3ZlciB0aGUgcmVzdWx0cyBhbmQgcHVzaGluZyBlYWNoIHNpY2tuZXNzIHRoYXQgaGFzIGJlZW4gcmV0cmlldmVkIGZyb20gdGhlIGRhdGFiYXNlIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBzaWNrbmVzcyBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgc2lja25lc3MucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QsIHJlc3VsdDFbeF0uUkVRVUlSRU1FTlRTLCByZXN1bHQxW3hdLkNPTU1PTlRBUkdFVFMsIHJlc3VsdDFbeF0uSU1HKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlNFTEVDVCBRdWVyeSBleGVjdXRlZC4gU2lja25lc3NlcyBSZXR1cm5lZC5cIik7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZmluZFNpY2tuZXNzKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBTb21ldGhpbmcgd2VudCB3cm9uZyBmaW5kaW5nIGFsbCBzaWNrbmVzc2VzOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3MoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIElEXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIElEIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5SWQoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBmaW5kU2lja25lc3NCeUlkKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHNpY2tuZXNzOlNpY2tuZXNzZXM7XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZmluZCBhIHNpY2tuZXNzIGJ5IGlkXG4gICAgICAgIHRyeVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3NlcyBmb3Igc2VhcmNoXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgSUQgPSA/XCIsIGlkKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTRUxFQ1QgUXVlcnkgZXhlY3V0ZWQuIFNpY2tuZXNzZXMgcmV0dXJuZWQgPSBcIiArIHJlc3VsdDEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdCAoc2hvdWxkIG9ubHkgYmUgb25lKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgc2lja25lc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgc2lja25lc3MgPSBuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QsIHJlc3VsdDFbeF0uUkVRVUlSRU1FTlRTLCByZXN1bHQxW3hdLkNPTU1PTlRBUkdFVFMsIHJlc3VsdDFbeF0uSU1HKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZmluZFNpY2tuZXNzQnlJZCgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZmluZGluZyBhIHNpY2tuZXNzIGJ5IElEOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeUlkKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIHN5bXB0b21zXG4gICAgICogXG4gICAgICogQHBhcmFtIHN5bXB0b21zIHN5bXB0b21zIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5U3ltcHRvbXMoc3ltcHRvbXM6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBmaW5kU2lja25lc3NCeVN5bXB0b21zKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHNpY2tuZXNzZXM6U2lja25lc3Nlc1tdID0gW107XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZmluZCBhIHNpY2tuZXNzIGJ5IHN5bXB0b21zXG4gICAgICAgIHRyeVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3NlcyBmb3Igc2VhcmNoXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgU1lNUFRPTVMgTElLRSAnJVwiKyBzeW1wdG9tcyArIFwiJSdcIik7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiU0VMRUNUIFF1ZXJ5IGV4ZWN1dGVkLiBTaWNrbmVzc2VzIHJldHVybmVkID0gXCIgKyByZXN1bHQxLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3QgKHNob3VsZCBvbmx5IGJlIG9uZSlcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHNpY2tuZXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHNpY2tuZXNzZXMucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QsIHJlc3VsdDFbeF0uUkVRVUlSRU1FTlRTLCByZXN1bHQxW3hdLkNPTU1PTlRBUkdFVFMsIHJlc3VsdDFbeF0uSU1HKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5U3ltcHRvbXMoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZmluZGluZyBhIHNpY2tuZXNzIGJ5IHN5bXB0b21zOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeVN5bXB0b21zKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3Nlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIG5hbWVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5TmFtZShuYW1lOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFNpY2tuZXNzQnlOYW1lKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHNpY2tuZXNzZXM6U2lja25lc3Nlc1tdID0gW107XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZmluZCBhIHNpY2tuZXNzIGJ5IG5hbWVcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgYW5kIGV4ZWN1dGluZyBhIFNFTEVDVCBxdWVyeVwiKTtcbiAgICAgICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzIGZvciBzZWFyY2hcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCBXSEVSRSBOQU1FIExJS0UgJyVcIisgbmFtZSArIFwiJSdcIik7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiU0VMRUNUIFF1ZXJ5IGV4ZWN1dGVkLiBTaWNrbmVzc2VzIHJldHVybmVkID0gXCIgKyByZXN1bHQxLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3QgKHNob3VsZCBvbmx5IGJlIG9uZSlcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHNpY2tuZXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHNpY2tuZXNzZXMucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5ERVNDUklQVElPTiwgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QsIHJlc3VsdDFbeF0uUkVRVUlSRU1FTlRTLCByZXN1bHQxW3hdLkNPTU1PTlRBUkdFVFMsIHJlc3VsdDFbeF0uSU1HKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5TmFtZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1jYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYSBzaWNrbmVzcyBieSBuYW1lOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeU5hbWUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIHJldHVybiAzIHJhbmRvbSBpbGxuZXNzZXMgZm9yIHRoZSBob21lIHBhZ2Ugb2YgQ2FyZWQ0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgU2lja25lc3Nlcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzQnlSYW5kb20oY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFNpY2tuZXNzQnlSYW5kb20oKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgIC8vIExpc3Qgb2Ygc2lja25lc3NlcyB0byByZXR1cm5cbiAgICAgICAgbGV0IHNpY2tuZXNzOlNpY2tuZXNzZXNbXSA9IFtdO1xuICAgICAgICAgICAgIFxuICAgICAgICAvL1RyeWluZyB0byBmaW5kIHJhbmRvbSBzaWNrbmVzc2VzXG4gICAgICAgIHRyeSBcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIFNpY2tuZXNzZXMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgU2lja25lc3Nlc1xuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3Nlc1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgT1JERVIgQlkgUkFORCgpIExJTUlUIDMnKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTRUxFQ1QgUXVlcnkgZXhlY3V0ZWQuIFNpY2tuZXNzZXMgcmV0dXJuZWQgPSBcIiArIHJlc3VsdDEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgc2lja25lc3MgYW5kIGl0cyBkYXRhIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgIHNpY2tuZXNzLnB1c2gobmV3IFNpY2tuZXNzZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLkNPTU1PTk5BTUUsIHJlc3VsdDFbeF0uU1lNUFRPTVMsIHJlc3VsdDFbeF0uREVTQ1JJUFRJT04sIHJlc3VsdDFbeF0uUkFSSVRZLCByZXN1bHQxW3hdLlNFVkVSSVRZLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNULCByZXN1bHQxW3hdLlJFUVVJUkVNRU5UUywgcmVzdWx0MVt4XS5DT01NT05UQVJHRVRTLCByZXN1bHQxW3hdLklNRykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRTaWNrbmVzc0J5UmFuZG9tKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBTb21ldGhpbmcgd2VudCB3cm9uZyBmaW5kaW5nIGEgcmFuZG9tIHNpY2tuZXNzOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kU2lja25lc3NCeVJhbmRvbSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBTaWNrbmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2lja25lc3MgU2lja25lc3MgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHNpY2tuZXNzOlNpY2tuZXNzZXMsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcblxuICAgICAgICAvL1RyeWluZyB0byB1cGRhdGUgYSBzaWNrbmVzc1xuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFNpY2tuZXNzXG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYW4gVVBEQVRFIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlVQREFURSBgU0lDS05FU1NFU2AgU0VUIE5BTUU9PywgQ09NTU9OTkFNRT0/LCBTWU1QVE9NUz0/LCBERVNDUklQVElPTj0/LCBSQVJJVFk9PywgU0VWRVJJVFk9PywgVFJFQVRNRU5UPT8sIFNUUk9OR0FHQUlOU1Q9PywgUkVRVUlSRU1FTlRTPT8sIENPTU1PTlRBUkdFVFM9PyBXSEVSRSBJRD0/XCIsIFtzaWNrbmVzcy5OYW1lLCBzaWNrbmVzcy5Db21tb25OYW1lLCBzaWNrbmVzcy5TeW1wdG9tcywgc2lja25lc3MuRGVzY3JpcHRpb24sIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdCwgc2lja25lc3MuUmVxdWlyZW1lbnRzLCBzaWNrbmVzcy5Db21tb25UYXJnZXRzXSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpbmRpY2F0ZXMgdGhhdCBhIHJvdyB3YXMgdXBkYXRlZCwgdGhlbiB0aGUgbnVtYmVyIG9mIGNoYW5nZXMgaW5jcmVhc2VzXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiVVBEQVRFIFF1ZXJ5IGV4ZWN1dGVkLiBSb3dzIGFmZmVjdGVkID0gXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAvL0xvZyB0aGUgY2hhbmdlc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1jYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIGEgc2lja25lc3M6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBTaWNrbmVzc0RBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGRlbGV0ZSBhIFNpY2tuZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzaWNrbmVzc0lkIFNpY2tuZXNzIElEIHRvIGRlbGV0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGVsZXRlKHNpY2tuZXNzSWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBkZWxldGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZGVsZXRlIGEgc2lja25lc3NcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSBTaWNrbmVzc1xuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGEgREVMRVRFIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIElEPT8nLCBbc2lja25lc3NJZF0pO1xuICAgICAgICAgICAgICAgIC8vIENoYW5nZXMgbWFkZSB0byB0aGUgZGF0YWJhc2UgYmVpbmcgc2F2ZWQgdG8gYSB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiREVMRVRFIFF1ZXJ5IGV4ZWN1dGVkLiBSb3dzIGFmZmVjdGVkID0gXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBkZWxldGUoKSBJbnNpZGUgU2lja25lc3NEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZGVsZXRpbmcgYSBzaWNrbmVzczogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZGVsZXRlKCkgSW5zaWRlIFNpY2tuZXNzREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICAvL1JldHVybiBhIGRhdGFiYXNlIGNvbm5lY3Rpb25cbiAgICAgICAgcmV0dXJuIG15c3FsLmNyZWF0ZVBvb2woe2hvc3Q6IHRoaXMuaG9zdCwgcG9ydDogdGhpcy5wb3J0LCB1c2VyOiB0aGlzLnVzZXJuYW1lLCBwYXNzd29yZDogdGhpcy5wYXNzd29yZCwgZGF0YWJhc2U6IHRoaXMuc2NoZW1hLCBjb25uZWN0aW9uTGltaXQ6IDEwfSk7XG4gICAgfVxufVxuIl19