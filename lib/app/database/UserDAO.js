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
      // Get pooled database connection and run queries   
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
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert User
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context.next = 6;
                  return connection.query('INSERT INTO `USERS` (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, BIRTHDAY, SEX, CONDITIONS, IMAGE) VALUES(?,?,?,?,?,?,?,?)', [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image]);

                case 6:
                  result1 = _context.sent;
                  // If no rows were affected then return -1 to indicate an error
                  if (result1.affectedRows != 1) callback(-1); //getting the id of the newly created User

                  userId = result1.insertId; // Do a callback to return the results

                  callback(userId);

                case 10:
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
    }
    /**
    * CRUD method to return all Users.
    * 
    * @param callback Callback function with an Array of type Users.
    */

  }, {
    key: "findUsers",
    value: function findUsers(callback) {
      // List of Users to return
      var users = []; // Get a pooled connection to the database, run the query to get all the users, and return the List of Users

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
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all users
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context2.next = 6;
                  return connection.query('SELECT * FROM `USERS`');

                case 6:
                  result1 = _context2.sent;

                  // Looping over the results and adding each user to the list
                  for (x = 0; x < result1.length; ++x) {
                    // Add user and its data to the list
                    users.push(new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE));
                  } // Do a callback to return the results


                  callback(users);

                case 9:
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
      // User that's going to be returned
      var user; // Get pooled database connection and run queries   

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
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context3.next = 6;
                  return connection.query("SELECT * FROM `USERS` WHERE ID = ?", id);

                case 6:
                  result1 = _context3.sent;

                  // Assigning the result to the user model using a loop
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                  } // Do a callback to return the results


                  callback(user);

                case 9:
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
    }
    /**
     * Method to find a user by their Email
     * 
     * @param id Id of the user being searched
     * @param callback Callback function with an Array of type Users.
     */

  }, {
    key: "findUserByEmail",
    value: function findUserByEmail(email, callback) {
      // User that's going to be returned
      var user; // Get pooled database connection and run queries   

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
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Users for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context4.next = 6;
                  return connection.query("SELECT * FROM `USERS` WHERE EMAIL = ?", email);

                case 6:
                  result1 = _context4.sent;

                  // Adding the result to the user model 
                  for (x = 0; x < result1.length; ++x) {
                    // Get user from the database to return
                    user = new _Users.User(result1[x].ID, result1[x].FIRSTNAME, result1[x].LASTNAME, result1[x].EMAIL, result1[x].PASSWORD, result1[x].BIRTHDAY, result1[x].SEX, result1[x].CONDITIONS, result1[x].IMAGE);
                  } // Do a callback to return the results


                  callback(user);

                case 9:
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
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context5.next = 7;
                  return connection.query("UPDATE `USERS` SET FIRSTNAME=?, LASTNAME=?, EMAIL=?, PASSWORD=?, BIRTHDAY=?, SEX=?, CONDITIONS=?, IMAGE=? WHERE ID=?", [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image, user.Id]);

                case 7:
                  result1 = _context5.sent;
                  // If any row was affected in the database, update the changes variable to reflect that
                  if (result1.changedRows != 0) ++changes; // Log Changes

                  console.log(changes); // Do a callback to return the results

                  callback(changes);

                case 11:
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
                    _context6.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete User
                  changes = 0; // Use Promisfy Util to make an async function and insert User

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context6.next = 7;
                  return connection.query('DELETE FROM `USERS` WHERE ID=?', [userId]);

                case 7:
                  result1 = _context6.sent;
                  // Set the affected rows to the changes variable
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwicG9ydCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbml0RGJDb25uZWN0aW9uIiwicG9vbCIsInVzZXIiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIkZpcnN0TmFtZSIsIkxhc3ROYW1lIiwiRW1haWwiLCJQYXNzd29yZCIsIkJpcnRoZGF5IiwiU2V4IiwiQ29uZGl0aW9ucyIsIkltYWdlIiwicmVzdWx0MSIsImFmZmVjdGVkUm93cyIsInVzZXJJZCIsImluc2VydElkIiwidXNlcnMiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlVzZXIiLCJJRCIsIkZJUlNUTkFNRSIsIkxBU1ROQU1FIiwiRU1BSUwiLCJQQVNTV09SRCIsIkJJUlRIREFZIiwiU0VYIiwiQ09ORElUSU9OUyIsIklNQUdFIiwiaWQiLCJlbWFpbCIsImNoYW5nZXMiLCJJZCIsImNoYW5nZWRSb3dzIiwiY29uc29sZSIsImxvZyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFFYUEsTztBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFBWUMsSUFBWixFQUF5QkMsSUFBekIsRUFBc0NDLFFBQXRDLEVBQXVEQyxRQUF2RCxFQUNBO0FBQUE7QUFBQSxnREFoQnNCLEVBZ0J0QjtBQUFBLGdEQWZzQixJQWV0QjtBQUFBLG9EQWQwQixFQWMxQjtBQUFBLG9EQWIwQixFQWExQjtBQUFBLGtEQVp3QixRQVl4QjtBQUFBLGdEQVhlLEtBQUtDLGdCQUFMLEVBV2Y7QUFDSTtBQUNBLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLRSxJQUFMLEdBQVksS0FBS0QsZ0JBQUwsRUFBWjtBQUNIO0FBRUE7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNJLGdCQUFjRSxJQUFkLEVBQXlCQyxRQUF6QixFQUNBO0FBQ0k7QUFDQSxXQUFLRixJQUFMLENBQVVHLGFBQVY7QUFBQSwyRkFBd0IsaUJBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVwQjtBQUNBQSxrQkFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNaEJGLEdBTmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1MQSxHQU5LOztBQUFBO0FBUXBCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CLENBVG9CLENBVXBCOztBQVZvQjtBQUFBLHlCQVdBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsc0hBQWpCLEVBQXlJLENBQUNOLElBQUksQ0FBQ1MsU0FBTixFQUFpQlQsSUFBSSxDQUFDVSxRQUF0QixFQUFnQ1YsSUFBSSxDQUFDVyxLQUFyQyxFQUE0Q1gsSUFBSSxDQUFDWSxRQUFqRCxFQUEyRFosSUFBSSxDQUFDYSxRQUFoRSxFQUEwRWIsSUFBSSxDQUFDYyxHQUEvRSxFQUFvRmQsSUFBSSxDQUFDZSxVQUF6RixFQUFxR2YsSUFBSSxDQUFDZ0IsS0FBMUcsQ0FBekksQ0FYQTs7QUFBQTtBQVdoQkMsa0JBQUFBLE9BWGdCO0FBWXBCO0FBQ0Esc0JBQUdBLE9BQU8sQ0FBQ0MsWUFBUixJQUF3QixDQUEzQixFQUNHakIsUUFBUSxDQUFDLENBQUMsQ0FBRixDQUFSLENBZGlCLENBZ0JwQjs7QUFDSWtCLGtCQUFBQSxNQWpCZ0IsR0FpQlBGLE9BQU8sQ0FBQ0csUUFqQkQsRUFtQnBCOztBQUNBbkIsa0JBQUFBLFFBQVEsQ0FBQ2tCLE1BQUQsQ0FBUjs7QUFwQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JIO0FBRUE7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLG1CQUFpQmxCLFFBQWpCLEVBQ0E7QUFDSTtBQUNBLFVBQUlvQixLQUFZLEdBQUcsRUFBbkIsQ0FGSixDQUlJOztBQUNBLFdBQUt0QixJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVwQjtBQUNBQSxrQkFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNaEJGLEdBTmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1MQSxHQU5LOztBQUFBO0FBUXBCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CLENBVG9CLENBVXBCOztBQVZvQjtBQUFBLHlCQVdBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsdUJBQWpCLENBWEE7O0FBQUE7QUFXaEJXLGtCQUFBQSxPQVhnQjs7QUFZcEI7QUFDQSx1QkFBUUssQ0FBUixHQUFVLENBQVYsRUFBWUEsQ0FBQyxHQUFHTCxPQUFPLENBQUNNLE1BQXhCLEVBQStCLEVBQUVELENBQWpDLEVBQ0E7QUFDSTtBQUNBRCxvQkFBQUEsS0FBSyxDQUFDRyxJQUFOLENBQVcsSUFBSUMsV0FBSixDQUFTUixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXSSxFQUFwQixFQUF3QlQsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV0ssU0FBbkMsRUFBOENWLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdNLFFBQXpELEVBQW1FWCxPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXTyxLQUE5RSxFQUFxRlosT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV1EsUUFBaEcsRUFBMEdiLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdTLFFBQXJILEVBQStIZCxPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXVSxHQUExSSxFQUErSWYsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV1csVUFBMUosRUFBc0toQixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXWSxLQUFqTCxDQUFYO0FBQ0gsbUJBakJtQixDQW1CcEI7OztBQUNBakMsa0JBQUFBLFFBQVEsQ0FBQ29CLEtBQUQsQ0FBUjs7QUFwQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JGO0FBRUY7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0ksc0JBQW9CYyxFQUFwQixFQUErQmxDLFFBQS9CLEVBQ0E7QUFDSTtBQUNBLFVBQUlELElBQUosQ0FGSixDQUlJOztBQUNBLFdBQUtELElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBCO0FBQ0FBLGtCQUFBQSxVQUFVLENBQUNDLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1oQkYsR0FOZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTUxBLEdBTks7O0FBQUE7QUFRcEI7QUFDQUMsa0JBQUFBLFVBQVUsQ0FBQ0UsS0FBWCxHQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFVBQVUsQ0FBQ0UsS0FBMUIsQ0FBbkIsQ0FUb0IsQ0FVcEI7O0FBVm9CO0FBQUEseUJBV0FGLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQixvQ0FBakIsRUFBdUQ2QixFQUF2RCxDQVhBOztBQUFBO0FBV2hCbEIsa0JBQUFBLE9BWGdCOztBQVlwQjtBQUNBLHVCQUFRSyxDQUFSLEdBQVUsQ0FBVixFQUFZQSxDQUFDLEdBQUdMLE9BQU8sQ0FBQ00sTUFBeEIsRUFBK0IsRUFBRUQsQ0FBakMsRUFDQTtBQUNJO0FBQ0F0QixvQkFBQUEsSUFBSSxHQUFHLElBQUl5QixXQUFKLENBQVNSLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdJLEVBQXBCLEVBQXdCVCxPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXSyxTQUFuQyxFQUE4Q1YsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV00sUUFBekQsRUFBbUVYLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdPLEtBQTlFLEVBQXFGWixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXUSxRQUFoRyxFQUEwR2IsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV1MsUUFBckgsRUFBK0hkLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdVLEdBQTFJLEVBQStJZixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXVyxVQUExSixFQUFzS2hCLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdZLEtBQWpMLENBQVA7QUFDSCxtQkFqQm1CLENBa0JwQjs7O0FBQ0FqQyxrQkFBQUEsUUFBUSxDQUFDRCxJQUFELENBQVI7O0FBbkJvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFCSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLHlCQUF1Qm9DLEtBQXZCLEVBQXFDbkMsUUFBckMsRUFDQTtBQUNJO0FBQ0EsVUFBSUQsSUFBSixDQUZKLENBSUk7O0FBQ0EsV0FBS0QsSUFBTCxDQUFVRyxhQUFWO0FBQUEsNEZBQXdCLGtCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWhCRixHQU5nQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTEEsR0FOSzs7QUFBQTtBQVFwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQixDQVRvQixDQVVwQjs7QUFWb0I7QUFBQSx5QkFXQUYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLHVDQUFqQixFQUEwRDhCLEtBQTFELENBWEE7O0FBQUE7QUFXaEJuQixrQkFBQUEsT0FYZ0I7O0FBWXBCO0FBQ0EsdUJBQVFLLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR0wsT0FBTyxDQUFDTSxNQUF4QixFQUErQixFQUFFRCxDQUFqQyxFQUNBO0FBQ0k7QUFDQXRCLG9CQUFBQSxJQUFJLEdBQUcsSUFBSXlCLFdBQUosQ0FBU1IsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV0ksRUFBcEIsRUFBd0JULE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdLLFNBQW5DLEVBQThDVixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXTSxRQUF6RCxFQUFtRVgsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV08sS0FBOUUsRUFBcUZaLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdRLFFBQWhHLEVBQTBHYixPQUFPLENBQUNLLENBQUQsQ0FBUCxDQUFXUyxRQUFySCxFQUErSGQsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV1UsR0FBMUksRUFBK0lmLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFQLENBQVdXLFVBQTFKLEVBQXNLaEIsT0FBTyxDQUFDSyxDQUFELENBQVAsQ0FBV1ksS0FBakwsQ0FBUDtBQUNILG1CQWpCbUIsQ0FrQnBCOzs7QUFDQWpDLGtCQUFBQSxRQUFRLENBQUNELElBQUQsQ0FBUjs7QUFuQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcUJIO0FBRUE7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0ksZ0JBQWNBLElBQWQsRUFBeUJDLFFBQXpCLEVBQ0E7QUFDSztBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBCO0FBQ0FBLGtCQUFBQSxVQUFVLENBQUNDLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1qQkYsR0FOaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTU5BLEdBTk07O0FBQUE7QUFRcEI7QUFDR2tDLGtCQUFBQSxPQVRpQixHQVNQLENBVE8sRUFVckI7O0FBQ0FqQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQixDQVhxQixDQVlyQjs7QUFacUI7QUFBQSx5QkFhREYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLHNIQUFqQixFQUF5SSxDQUFDTixJQUFJLENBQUNTLFNBQU4sRUFBaUJULElBQUksQ0FBQ1UsUUFBdEIsRUFBZ0NWLElBQUksQ0FBQ1csS0FBckMsRUFBNENYLElBQUksQ0FBQ1ksUUFBakQsRUFBMkRaLElBQUksQ0FBQ2EsUUFBaEUsRUFBMEViLElBQUksQ0FBQ2MsR0FBL0UsRUFBb0ZkLElBQUksQ0FBQ2UsVUFBekYsRUFBcUdmLElBQUksQ0FBQ2dCLEtBQTFHLEVBQWlIaEIsSUFBSSxDQUFDc0MsRUFBdEgsQ0FBekksQ0FiQzs7QUFBQTtBQWFqQnJCLGtCQUFBQSxPQWJpQjtBQWNyQjtBQUNBLHNCQUFHQSxPQUFPLENBQUNzQixXQUFSLElBQXVCLENBQTFCLEVBQ0ksRUFBRUYsT0FBRixDQWhCaUIsQ0FpQnJCOztBQUNBRyxrQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlKLE9BQVosRUFsQnFCLENBbUJyQjs7QUFDQXBDLGtCQUFBQSxRQUFRLENBQUNvQyxPQUFELENBQVI7O0FBcEJxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNCSDtBQUVEO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLGlCQUFjbEIsTUFBZCxFQUE2QmxCLFFBQTdCLEVBQ0E7QUFDSTtBQUNBLFdBQUtGLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBCO0FBQ0FBLGtCQUFBQSxVQUFVLENBQUNDLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1qQkYsR0FOaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTU5BLEdBTk07O0FBQUE7QUFRcEI7QUFDSWtDLGtCQUFBQSxPQVRnQixHQVNOLENBVE0sRUFVcEI7O0FBQ0FqQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQixDQVhvQixDQVlwQjs7QUFab0I7QUFBQSx5QkFhQUYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLGdDQUFqQixFQUFtRCxDQUFDYSxNQUFELENBQW5ELENBYkE7O0FBQUE7QUFhaEJGLGtCQUFBQSxPQWJnQjtBQWNwQjtBQUNBb0Isa0JBQUFBLE9BQU8sR0FBR0EsT0FBTyxHQUFHcEIsT0FBTyxDQUFDQyxZQUE1QixDQWZvQixDQWlCcEI7O0FBQ0FqQixrQkFBQUEsUUFBUSxDQUFDb0MsT0FBRCxDQUFSOztBQWxCb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUNJLDRCQUNBO0FBQ0k7QUFDQSxhQUFPSyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFBQ2pELFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUNLLFFBQUFBLElBQUksRUFBRSxLQUFLSixRQUE5QztBQUF3REMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQXZFO0FBQWlGK0MsUUFBQUEsUUFBUSxFQUFFLEtBQUtDLE1BQWhHO0FBQXdHQyxRQUFBQSxlQUFlLEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuXG4vKlxuREFPIGZpbGUgdXNlZCBmb3IgY29ubmVjdGluZyB0aGUgQVBJIHRvIHRoZSBkYXRhYmFzZVxuVGhpcyBEQU8gaGFuZGxlcyB0aGUgdXNlcnMgdGFibGUgaW4gb3VyIGRhdGFiYXNlXG4qL1xuXG5leHBvcnQgY2xhc3MgVXNlckRBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJDYXJlZDRcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgdXNlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdXNlciBVc2VyIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIFVzZXIgSUQgY3JlYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUodXNlcjpVc2VyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgaW5zZXJ0IFVzZXJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIGBVU0VSU2AgKEZJUlNUTkFNRSwgTEFTVE5BTUUsIEVNQUlMLCBQQVNTV09SRCwgQklSVEhEQVksIFNFWCwgQ09ORElUSU9OUywgSU1BR0UpIFZBTFVFUyg/LD8sPyw/LD8sPyw/LD8pJywgW3VzZXIuRmlyc3ROYW1lLCB1c2VyLkxhc3ROYW1lLCB1c2VyLkVtYWlsLCB1c2VyLlBhc3N3b3JkLCB1c2VyLkJpcnRoZGF5LCB1c2VyLlNleCwgdXNlci5Db25kaXRpb25zLCB1c2VyLkltYWdlXSk7XG4gICAgICAgICAgICAvLyBJZiBubyByb3dzIHdlcmUgYWZmZWN0ZWQgdGhlbiByZXR1cm4gLTEgdG8gaW5kaWNhdGUgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXG4gICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG5cbiAgICAgICAgICAgIC8vZ2V0dGluZyB0aGUgaWQgb2YgdGhlIG5ld2x5IGNyZWF0ZWQgVXNlclxuICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VySWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBVc2Vycy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFVzZXJzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kVXNlcnMoY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIExpc3Qgb2YgVXNlcnMgdG8gcmV0dXJuXG4gICAgICAgIGxldCB1c2VyczpVc2VyW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZSwgcnVuIHRoZSBxdWVyeSB0byBnZXQgYWxsIHRoZSB1c2VycywgYW5kIHJldHVybiB0aGUgTGlzdCBvZiBVc2Vyc1xuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgdXNlcnNcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFVTRVJTYCcpO1xuICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBhZGRpbmcgZWFjaCB1c2VyIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFkZCB1c2VyIGFuZCBpdHMgZGF0YSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIHVzZXJzLnB1c2gobmV3IFVzZXIocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5GSVJTVE5BTUUsIHJlc3VsdDFbeF0uTEFTVE5BTUUsIHJlc3VsdDFbeF0uRU1BSUwsIHJlc3VsdDFbeF0uUEFTU1dPUkQsIHJlc3VsdDFbeF0uQklSVEhEQVksIHJlc3VsdDFbeF0uU0VYLCByZXN1bHQxW3hdLkNPTkRJVElPTlMsIHJlc3VsdDFbeF0uSU1BR0UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHVzZXIgYnkgdGhlaXIgSURcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgSWQgb2YgdGhlIHVzZXIgYmVpbmcgc2VhcmNoZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFVzZXJzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kVXNlckJ5SWQoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gVXNlciB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHVzZXI6VXNlcjtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBVc2VycyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgVVNFUlNgIFdIRVJFIElEID0gP1wiLCBpZCk7XG4gICAgICAgICAgICAvLyBBc3NpZ25pbmcgdGhlIHJlc3VsdCB0byB0aGUgdXNlciBtb2RlbCB1c2luZyBhIGxvb3BcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgZnJvbSB0aGUgZGF0YWJhc2UgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgdXNlciA9IG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRklSU1ROQU1FLCByZXN1bHQxW3hdLkxBU1ROQU1FLCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLkJJUlRIREFZLCByZXN1bHQxW3hdLlNFWCwgcmVzdWx0MVt4XS5DT05ESVRJT05TLCByZXN1bHQxW3hdLklNQUdFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGZpbmQgYSB1c2VyIGJ5IHRoZWlyIEVtYWlsXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSB1c2VyIGJlaW5nIHNlYXJjaGVkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJCeUVtYWlsKGVtYWlsOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIFVzZXIgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCB1c2VyOlVzZXI7XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgVXNlcnMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFVTRVJTYCBXSEVSRSBFTUFJTCA9ID9cIiwgZW1haWwpO1xuICAgICAgICAgICAgLy8gQWRkaW5nIHRoZSByZXN1bHQgdG8gdGhlIHVzZXIgbW9kZWwgXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEdldCB1c2VyIGZyb20gdGhlIGRhdGFiYXNlIHRvIHJldHVyblxuICAgICAgICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkZJUlNUTkFNRSwgcmVzdWx0MVt4XS5MQVNUTkFNRSwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5CSVJUSERBWSwgcmVzdWx0MVt4XS5TRVgsIHJlc3VsdDFbeF0uQ09ORElUSU9OUywgcmVzdWx0MVt4XS5JTUFHRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VyIFVzZXIgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiBcbiAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuIFxuICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHVwZGF0ZSBVc2VyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgVXNlclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlVQREFURSBgVVNFUlNgIFNFVCBGSVJTVE5BTUU9PywgTEFTVE5BTUU9PywgRU1BSUw9PywgUEFTU1dPUkQ9PywgQklSVEhEQVk9PywgU0VYPT8sIENPTkRJVElPTlM9PywgSU1BR0U9PyBXSEVSRSBJRD0/XCIsIFt1c2VyLkZpcnN0TmFtZSwgdXNlci5MYXN0TmFtZSwgdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgdXNlci5CaXJ0aGRheSwgdXNlci5TZXgsIHVzZXIuQ29uZGl0aW9ucywgdXNlci5JbWFnZSwgdXNlci5JZF0pO1xuICAgICAgICAgICAgLy8gSWYgYW55IHJvdyB3YXMgYWZmZWN0ZWQgaW4gdGhlIGRhdGFiYXNlLCB1cGRhdGUgdGhlIGNoYW5nZXMgdmFyaWFibGUgdG8gcmVmbGVjdCB0aGF0XG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApXG4gICAgICAgICAgICAgICAgKytjaGFuZ2VzO1xuICAgICAgICAgICAgLy8gTG9nIENoYW5nZXNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VySWQgVXNlciBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgcHVibGljIGRlbGV0ZSh1c2VySWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZGVsZXRlIFVzZXJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBgVVNFUlNgIFdIRVJFIElEPT8nLCBbdXNlcklkXSk7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGFmZmVjdGVkIHJvd3MgdG8gdGhlIGNoYW5nZXMgdmFyaWFibGVcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8qICoqKioqKioqKioqKioqKiogUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAqKioqKioqKioqKioqKioqICovXG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2QgdG8gaW5pdGlhbGllIGEgRGF0YWJhc2UgQ29ubmVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxuICAgIHtcbiAgICAgICAgLy9SZXR1cm4gYSBkYXRhYmFzZSBjb25uZWN0aW9uXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xuICAgIH1cbn1cbiJdfQ==