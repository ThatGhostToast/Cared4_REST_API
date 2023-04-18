"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Users = require("../models/Users");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var loggly = require('loggly');

var logger = loggly.createClient({
  token: "c699c451-68e8-4a6d-a403-b19343297144",
  subdomain: "Cared4",
  sendConsoleErrors: false,
  tag: "Cared4-API-UserDAO"
});
/*
DAO file used for connecting the API to the database
This DAO handles the users table in our database
*/

var UserDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @constructor
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function UserDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, UserDAO);
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
  * CRUD method to create a new user.
  * 
  * @param user User to insert.
  * @param callback Callback function with -1 if an error else User ID created.  
  */


  (0, _createClass2.default)(UserDAO, [{
    key: "create",
    value: function create(user, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: create() Inside UserDAO.ts"); // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, userId;
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
                  ; //Trying to create a new user

                  _context.prev = 5;
                  //Sending a log to the logging handler
                  logger.log("Creating and executing an INSERT query"); // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context.next = 10;
                  return connection.query('INSERT INTO `USERS` (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, BIRTHDAY, SEX, CONDITIONS, IMAGE) VALUES(?,?,?,?,?,?,?,?)', [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image]);

                case 10:
                  result1 = _context.sent;
                  //Sending a log to the logging handler
                  logger.log("Query executed. Affected rows = " + result1.affectedRows); // If no rows were affected then return -1 to indicate an error

                  if (result1.affectedRows != 1) {
                    //Sending a log to the logging handler
                    logger.log("EXITING: create() Inside UserDAO.ts");
                    callback(-1);
                  }

                  ; //getting the id of the newly created User

                  userId = result1.insertId; //Sending a log to the logging handler

                  logger.log("EXITING: create() Inside UserDAO.ts"); // Do a callback to return the results

                  callback(userId);
                  _context.next = 24;
                  break;

                case 19:
                  _context.prev = 19;
                  _context.t0 = _context["catch"](5);
                  //Sending a log to the logging handler
                  logger.log("ERROR: Something went wrong creating a new user: " + _context.t0);
                  logger.log("EXITING: create() Inside UserDAO.ts");
                  callback(-1);

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[5, 19]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to return all Users.
    * 
    * @param callback Callback function with an Array of type Users.
    */

  }, {
    key: "findUsers",
    value: function findUsers(callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findUsers() Inside UserDAO.ts"); // List of Users to return

      var users = []; //Trying to get all users

      try {
        // Get a pooled connection to the database, run the query to get all the users, and return the List of Users
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

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all users

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context2.next = 9;
                    return connection.query('SELECT * FROM `USERS`');

                  case 9:
                    result1 = _context2.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. "); // Looping over the results and adding each user to the list

                    for (x = 0; x < result1.length; ++x) {
                      // Add user and its data to the list
                      users.push(new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE));
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findUsers() Inside UserDAO.ts"); // Do a callback to return the results

                    callback(users);

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

  }, {
    key: "findUserById",
    value: function findUserById(id, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findUserById() Inside UserDAO.ts"); // User that's going to be returned

      var user; //Trying to get a user by ID

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

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Users for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context3.next = 9;
                    return connection.query("SELECT * FROM `USERS` WHERE ID = ?", id);

                  case 9:
                    result1 = _context3.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Users returned = " + result1.length); // Assigning the result to the user model using a loop

                    for (x = 0; x < result1.length; ++x) {
                      // Get user from the database to return
                      user = new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findUserById() Inside UserDAO.ts"); // Do a callback to return the results

                    callback(user);

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

  }, {
    key: "findUserByEmail",
    value: function findUserByEmail(email, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: findUserByEmail() Inside UserDAO.ts"); // User that's going to be returned

      var user; //Trying to get a user by email

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

                    logger.log("Creating and executing a SELECT query"); // Use Promisfy Util to make an async function and run query to get all Users for search

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context4.next = 9;
                    return connection.query("SELECT * FROM `USERS` WHERE EMAIL = ?", email);

                  case 9:
                    result1 = _context4.sent;
                    //Sending a log to the logging handler
                    logger.log("SELECT Query executed. Users returned = " + result1.length); // Adding the result to the user model 

                    for (x = 0; x < result1.length; ++x) {
                      // Get user from the database to return
                      user = new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                    } //Sending a log to the logging handler


                    logger.log("EXITING: findUserByEmail() Inside UserDAO.ts"); // Do a callback to return the results

                    callback(user);

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

  }, {
    key: "update",
    value: function update(user, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: update() Inside UserDAO.ts"); //Trying to update a user

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
            var changes, result1;
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
                    ; // Use Promisfy Util to make an async function and update User

                    changes = 0; //Sending a log to the logging handler

                    logger.log("Creating and executing an UPDATE query"); // Use Promisfy Util to make an async function and insert User

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context5.next = 10;
                    return connection.query("UPDATE `USERS` SET FIRSTNAME=?, LASTNAME=?, EMAIL=?, PASSWORD=?, BIRTHDAY=?, SEX=?, CONDITIONS=?, IMAGE=? WHERE ID=?", [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image, user.Id]);

                  case 10:
                    result1 = _context5.sent;
                    // If any row was affected in the database, update the changes variable to reflect that
                    if (result1.changedRows != 0) ++changes; //Sending a log to the logging handler

                    logger.log("UPDATE Query executed. Rows affected = " + changes); // Log Changes

                    console.log(changes); //Sending a log to the logging handler

                    logger.log("EXITING: update() Inside UserDAO.ts"); // Do a callback to return the results

                    callback(changes);

                  case 16:
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

  }, {
    key: "delete",
    value: function _delete(userId, callback) {
      //Sending a log to the logging handler
      logger.log("ENTERING: delete() Inside UserDAO.ts"); //Trying to delete a user

      try {
        // Get pooled database connection and run queries   
        this.pool.getConnection( /*#__PURE__*/function () {
          var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
            var changes, result1;
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
                    ; // Use Promisfy Util to make an async function and run query to delete User

                    changes = 0; //Sending a log to the logging handler

                    logger.log("Creating and executing a DELETE query"); // Use Promisfy Util to make an async function and insert User

                    connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                    _context6.next = 10;
                    return connection.query('DELETE FROM `USERS` WHERE ID=?', [userId]);

                  case 10:
                    result1 = _context6.sent;
                    // Set the affected rows to the changes variable
                    changes = changes + result1.affectedRows; //Sending a log to the logging handler

                    logger.log("DELETE Query executed. Rows affected = " + changes); //Sending a log to the logging handler

                    logger.log("EXITING: delete() Inside UserDAO.ts"); // Do a callback to return the results

                    callback(changes);

                  case 15:
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
        logger.log("ERROR: Something went wrong deleting user: " + error);
        logger.log("EXITING: delete() Inside UserDAO.ts");
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
  return UserDAO;
}();

exports.UserDAO = UserDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbImxvZ2dseSIsInJlcXVpcmUiLCJsb2dnZXIiLCJjcmVhdGVDbGllbnQiLCJ0b2tlbiIsInN1YmRvbWFpbiIsInNlbmRDb25zb2xlRXJyb3JzIiwidGFnIiwiVXNlckRBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwidXNlciIsImNhbGxiYWNrIiwibG9nIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJyZWxlYXNlIiwicXVlcnkiLCJ1dGlsIiwicHJvbWlzaWZ5IiwiRmlyc3ROYW1lIiwiTGFzdE5hbWUiLCJFbWFpbCIsIlBhc3N3b3JkIiwiQmlydGhkYXkiLCJTZXgiLCJDb25kaXRpb25zIiwiSW1hZ2UiLCJyZXN1bHQxIiwiYWZmZWN0ZWRSb3dzIiwidXNlcklkIiwiaW5zZXJ0SWQiLCJ1c2VycyIsIngiLCJsZW5ndGgiLCJwdXNoIiwiVXNlciIsIklEIiwiRklSU1ROQU1FIiwiTEFTVE5BTUUiLCJFTUFJTCIsIlBBU1NXT1JEIiwiQklSVEhEQVkiLCJTRVgiLCJDT05ESVRJT05TIiwiSU1BR0UiLCJlcnJvciIsImlkIiwiZW1haWwiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRixNQUFNLENBQUNHLFlBQVAsQ0FBb0I7QUFBRUMsRUFBQUEsS0FBSyxFQUFDLHNDQUFSO0FBQWdEQyxFQUFBQSxTQUFTLEVBQUMsUUFBMUQ7QUFBb0VDLEVB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QUNBcEQsb0JBQUFBLE1BQU0sQ0FBQ2UsR0FBUCxDQUFXLHFDQUFYLEVBekJvQixDQTBCcEI7O0FBQ0FELG9CQUFBQSxRQUFRLENBQUNzQyxPQUFELENBQVI7O0FBM0JvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTZCSCxPQWhDRCxDQWdDRSxPQUFPSCxLQUFQLEVBQ0Y7QUFDSTtBQUNBakQsUUFBQUEsTUFBTSxDQUFDZSxHQUFQLENBQVcsZ0RBQWdEa0MsS0FBM0Q7QUFDQWpELFFBQUFBLE1BQU0sQ0FBQ2UsR0FBUCxDQUFXLHFDQUFYO0FBQ0FELFFBQUFBLFFBQVEsQ0FBQyxDQUFELENBQVI7QUFDSDtBQUNKLEssQ0FFRDs7QUFFQTtBQUNKO0FBQ0E7Ozs7V0FDSSw0QkFDQTtBQUNJO0FBQ0EsYUFBTzBDLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUFDbEQsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQVo7QUFBa0JDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUE3QjtBQUFtQ0ssUUFBQUEsSUFBSSxFQUFFLEtBQUtKLFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZnRCxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9Vc2Vyc1wiO1xuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG52YXIgbG9nZ2x5ID0gcmVxdWlyZSgnbG9nZ2x5Jyk7XG52YXIgbG9nZ2VyID0gbG9nZ2x5LmNyZWF0ZUNsaWVudCh7IHRva2VuOlwiYzY5OWM0NTEtNjhlOC00YTZkLWE0MDMtYjE5MzQzMjk3MTQ0XCIsIHN1YmRvbWFpbjpcIkNhcmVkNFwiLCBzZW5kQ29uc29sZUVycm9yczogZmFsc2UsIHRhZzpcIkNhcmVkNC1BUEktVXNlckRBT1wiIH0pO1xuXG4vKlxuREFPIGZpbGUgdXNlZCBmb3IgY29ubmVjdGluZyB0aGUgQVBJIHRvIHRoZSBkYXRhYmFzZVxuVGhpcyBEQU8gaGFuZGxlcyB0aGUgdXNlcnMgdGFibGUgaW4gb3VyIGRhdGFiYXNlXG4qL1xuZXhwb3J0IGNsYXNzIFVzZXJEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiQ2FyZWQ0XCI7XG4gICAgcHJpdmF0ZSBwb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgLyoqXG4gICAgICogTm9uLWRlZmF1bHQgY29uc3RydWN0b3IuXG4gICAgICogXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGhvc3QgRGF0YWJhc2UgSG9zdG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgRGF0YWJhc2UgVXNlcm5hbWVcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IGFsbCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXIgVXNlciB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBVc2VyIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogY3JlYXRlKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9UcnlpbmcgdG8gY3JlYXRlIGEgbmV3IHVzZXJcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYW4gSU5TRVJUIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBgVVNFUlNgIChGSVJTVE5BTUUsIExBU1ROQU1FLCBFTUFJTCwgUEFTU1dPUkQsIEJJUlRIREFZLCBTRVgsIENPTkRJVElPTlMsIElNQUdFKSBWQUxVRVMoPyw/LD8sPyw/LD8sPyw/KScsIFt1c2VyLkZpcnN0TmFtZSwgdXNlci5MYXN0TmFtZSwgdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgdXNlci5CaXJ0aGRheSwgdXNlci5TZXgsIHVzZXIuQ29uZGl0aW9ucywgdXNlci5JbWFnZV0pO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlF1ZXJ5IGV4ZWN1dGVkLiBBZmZlY3RlZCByb3dzID0gXCIgKyByZXN1bHQxLmFmZmVjdGVkUm93cyk7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm8gcm93cyB3ZXJlIGFmZmVjdGVkIHRoZW4gcmV0dXJuIC0xIHRvIGluZGljYXRlIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBjcmVhdGUoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBpZCBvZiB0aGUgbmV3bHkgY3JlYXRlZCBVc2VyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG4gICAgXG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogY3JlYXRlKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2VySWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGNyZWF0aW5nIGEgbmV3IHVzZXI6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBjcmVhdGUoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYWxsIFVzZXJzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgVXNlcnMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRVc2VycyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBmaW5kVXNlcnMoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cbiAgICAgICAgbGV0IHVzZXJzOlVzZXJbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy9UcnlpbmcgdG8gZ2V0IGFsbCB1c2Vyc1xuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIHVzZXJzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIFVzZXJzXG4gICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgdXNlcnNcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFVTRVJTYCcpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlNFTEVDVCBRdWVyeSBleGVjdXRlZC4gXCIpO1xuICAgICAgICAgICAgICAgIC8vIExvb3Bpbmcgb3ZlciB0aGUgcmVzdWx0cyBhbmQgYWRkaW5nIGVhY2ggdXNlciB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdXNlciBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMucHVzaChuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkZJUlNUTkFNRSwgcmVzdWx0MVt4XS5MQVNUTkFNRSwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5CSVJUSERBWSwgcmVzdWx0MVt4XS5TRVgsIHJlc3VsdDFbeF0uQ09ORElUSU9OUywgcmVzdWx0MVt4XS5JTUFHRSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kVXNlcnMoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJzKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYWxsIHVzZXJzOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kVXNlcnMoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJzKTtcbiAgICAgICAgfVxuICAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHVzZXIgYnkgdGhlaXIgSURcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgSWQgb2YgdGhlIHVzZXIgYmVpbmcgc2VhcmNoZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFVzZXJzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kVXNlckJ5SWQoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkVOVEVSSU5HOiBmaW5kVXNlckJ5SWQoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgLy8gVXNlciB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHVzZXI6VXNlcjtcblxuICAgICAgICAvL1RyeWluZyB0byBnZXQgYSB1c2VyIGJ5IElEXG4gICAgICAgIHRyeVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVSUk9SOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBTRUxFQ1QgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgVXNlcnMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFVTRVJTYCBXSEVSRSBJRCA9ID9cIiwgaWQpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIlNFTEVDVCBRdWVyeSBleGVjdXRlZC4gVXNlcnMgcmV0dXJuZWQgPSBcIiArIHJlc3VsdDEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ25pbmcgdGhlIHJlc3VsdCB0byB0aGUgdXNlciBtb2RlbCB1c2luZyBhIGxvb3BcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgZnJvbSB0aGUgZGF0YWJhc2UgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkZJUlNUTkFNRSwgcmVzdWx0MVt4XS5MQVNUTkFNRSwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5CSVJUSERBWSwgcmVzdWx0MVt4XS5TRVgsIHJlc3VsdDFbeF0uQ09ORElUSU9OUywgcmVzdWx0MVt4XS5JTUFHRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IGZpbmRVc2VyQnlJZCgpIEluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXNlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYSB1c2VyIGJ5IElEOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kVXNlckJ5SWQoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGZpbmQgYSB1c2VyIGJ5IHRoZWlyIEVtYWlsXG4gICAgICogXG4gICAgICogQHBhcmFtIGVtYWlsIGVtYWlsIG9mIHRoZSB1c2VyIGJlaW5nIHNlYXJjaGVkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJCeUVtYWlsKGVtYWlsOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogZmluZFVzZXJCeUVtYWlsKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgIC8vIFVzZXIgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCB1c2VyOlVzZXI7XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gZ2V0IGEgdXNlciBieSBlbWFpbFxuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGluZyBhbmQgZXhlY3V0aW5nIGEgU0VMRUNUIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFVzZXJzIGZvciBzZWFyY2hcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBVU0VSU2AgV0hFUkUgRU1BSUwgPSA/XCIsIGVtYWlsKTtcbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJTRUxFQ1QgUXVlcnkgZXhlY3V0ZWQuIFVzZXJzIHJldHVybmVkID0gXCIgKyByZXN1bHQxLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gQWRkaW5nIHRoZSByZXN1bHQgdG8gdGhlIHVzZXIgbW9kZWwgXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCB1c2VyIGZyb20gdGhlIGRhdGFiYXNlIHRvIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB1c2VyID0gbmV3IFVzZXIocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5GSVJTVE5BTUUsIHJlc3VsdDFbeF0uTEFTVE5BTUUsIHJlc3VsdDFbeF0uRU1BSUwsIHJlc3VsdDFbeF0uUEFTU1dPUkQsIHJlc3VsdDFbeF0uQklSVEhEQVksIHJlc3VsdDFbeF0uU0VYLCByZXN1bHQxW3hdLkNPTkRJVElPTlMsIHJlc3VsdDFbeF0uSU1BR0UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kVXNlckJ5RW1haWwoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVzZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIGZpbmRpbmcgYSB1c2VyIGJ5IGVtYWlsOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFWElUSU5HOiBmaW5kVXNlckJ5RW1haWwoKSBJbnNpZGUgVXNlckRBTy50c1wiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VyIFVzZXIgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgIGxvZ2dlci5sb2coXCJFTlRFUklORzogdXBkYXRlKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG5cbiAgICAgICAgLy9UcnlpbmcgdG8gdXBkYXRlIGEgdXNlclxuICAgICAgICB0cnlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgIFxuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHVwZGF0ZSBVc2VyXG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYW4gVVBEQVRFIHF1ZXJ5XCIpO1xuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiVVBEQVRFIGBVU0VSU2AgU0VUIEZJUlNUTkFNRT0/LCBMQVNUTkFNRT0/LCBFTUFJTD0/LCBQQVNTV09SRD0/LCBCSVJUSERBWT0/LCBTRVg9PywgQ09ORElUSU9OUz0/LCBJTUFHRT0/IFdIRVJFIElEPT9cIiwgW3VzZXIuRmlyc3ROYW1lLCB1c2VyLkxhc3ROYW1lLCB1c2VyLkVtYWlsLCB1c2VyLlBhc3N3b3JkLCB1c2VyLkJpcnRoZGF5LCB1c2VyLlNleCwgdXNlci5Db25kaXRpb25zLCB1c2VyLkltYWdlLCB1c2VyLklkXSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgYW55IHJvdyB3YXMgYWZmZWN0ZWQgaW4gdGhlIGRhdGFiYXNlLCB1cGRhdGUgdGhlIGNoYW5nZXMgdmFyaWFibGUgdG8gcmVmbGVjdCB0aGF0XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiVVBEQVRFIFF1ZXJ5IGV4ZWN1dGVkLiBSb3dzIGFmZmVjdGVkID0gXCIgKyBjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAvLyBMb2cgQ2hhbmdlc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFNvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXI6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkVYSVRJTkc6IHVwZGF0ZSgpIEluc2lkZSBVc2VyREFPLnRzXCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soMCk7XG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGRlbGV0ZSBhIFVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXJJZCBVc2VyIElEIHRvIGRlbGV0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyBkZWxldGVkLiAgXG4gICAgICogKi9cbiAgICBwdWJsaWMgZGVsZXRlKHVzZXJJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICBsb2dnZXIubG9nKFwiRU5URVJJTkc6IGRlbGV0ZSgpIEluc2lkZSBVc2VyREFPLnRzXCIpO1xuXG4gICAgICAgIC8vVHJ5aW5nIHRvIGRlbGV0ZSBhIHVzZXJcbiAgICAgICAgdHJ5XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvL1NlbmRpbmcgYSBsb2cgdG8gdGhlIGxvZ2dpbmcgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVJST1I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSBVc2VyXG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0aW5nIGFuZCBleGVjdXRpbmcgYSBERUxFVEUgcXVlcnlcIik7XG4gICAgICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFVzZXJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIGBVU0VSU2AgV0hFUkUgSUQ9PycsIFt1c2VySWRdKTtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGFmZmVjdGVkIHJvd3MgdG8gdGhlIGNoYW5nZXMgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuICAgICAgICAgICAgICAgIC8vU2VuZGluZyBhIGxvZyB0byB0aGUgbG9nZ2luZyBoYW5kbGVyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhcIkRFTEVURSBRdWVyeSBleGVjdXRlZC4gUm93cyBhZmZlY3RlZCA9IFwiICsgY2hhbmdlcyk7XG4gICAgICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZGVsZXRlKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy9TZW5kaW5nIGEgbG9nIHRvIHRoZSBsb2dnaW5nIGhhbmRsZXJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coXCJFUlJPUjogU29tZXRoaW5nIHdlbnQgd3JvbmcgZGVsZXRpbmcgdXNlcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICBsb2dnZXIubG9nKFwiRVhJVElORzogZGVsZXRlKCkgSW5zaWRlIFVzZXJEQU8udHNcIik7XG4gICAgICAgICAgICBjYWxsYmFjaygwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vKiAqKioqKioqKioqKioqKioqIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgKioqKioqKioqKioqKioqKiAqL1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBoZWxwZXIgbWV0aG9kIHRvIGluaXRpYWxpZSBhIERhdGFiYXNlIENvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXREYkNvbm5lY3Rpb24oKTphbnlcbiAgICB7XG4gICAgICAgIC8vUmV0dXJuIGEgZGF0YWJhc2UgY29ubmVjdGlvblxuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=