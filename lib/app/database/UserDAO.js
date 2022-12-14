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
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('INSERT INTO `USERS` (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, BIRTHDAY, SEX, CONDITIONS, IMAGE) VALUES(?,?,?,?,?,?,?,?)', [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image]);

                case 6:
                  result1 = _context.sent;
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
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('SELECT * FROM `USERS`');

                case 6:
                  result1 = _context2.sent;

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
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query("SELECT * FROM `USERS` WHERE ID = ?", id);

                case 6:
                  result1 = _context3.sent;

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
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query("SELECT * FROM `USERS` WHERE EMAIL = ?", email);

                case 6:
                  result1 = _context4.sent;

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
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context5.next = 7;
                  return connection.query("UPDATE `USERS` SET FIRSTNAME=?, LASTNAME=?, EMAIL=?, PASSWORD=?, BIRTHDAY=?, SEX=?, CONDITIONS=?, IMAGE=? WHERE ID=?", [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image, user.Id]);

                case 7:
                  result1 = _context5.sent;
                  if (result1.changedRows != 0) ++changes;
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
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context6.next = 7;
                  return connection.query('DELETE FROM `USERS` WHERE ID=?', [userId]);

                case 7:
                  result1 = _context6.sent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwicG9ydCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbml0RGJDb25uZWN0aW9uIiwicG9vbCIsInVzZXIiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIkZpcnN0TmFtZSIsIkxhc3ROYW1lIiwiRW1haWwiLCJQYXNzd29yZCIsIkJpcnRoZGF5IiwiU2V4IiwiQ29uZGl0aW9ucyIsIkltYWdlIiwicmVzdWx0MSIsImFmZmVjdGVkUm93cyIsInVzZXJJZCIsImluc2VydElkIiwidXNlcnMiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlVzZXIiLCJJRCIsIkZJUlNUTkFNRSIsIkxBU1ROQU1FIiwiRU1BSUwiLCJQQVNTV09SRCIsIkJJUlRIREFZIiwiU0VYIiwiQ09ORElUSU9OUyIsIklNQUdFIiwiaWQiLCJlbWFpbCIsImNoYW5nZXMiLCJJZCIsImNoYW5nZWRSb3dzIiwiY29uc29sZSIsImxvZyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFFYUEsTztBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBZnNCLEVBZXRCO0FBQUEsZ0RBZHNCLElBY3RCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEsb0RBWjBCLEVBWTFCO0FBQUEsa0RBWHdCLFFBV3hCO0FBQUEsZ0RBVmUsS0FBS0MsZ0JBQUwsRUFVZjtBQUNJ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QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWpCRixHQU5pQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTkEsR0FOTTs7QUFBQTtBQVFwQjtBQUNJa0Msa0JBQUFBLE9BVGdCLEdBU04sQ0FUTTtBQVVwQmpDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CO0FBVm9CO0FBQUEseUJBV0FGLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQixnQ0FBakIsRUFBbUQsQ0FBQ2EsTUFBRCxDQUFuRCxDQVhBOztBQUFBO0FBV2hCRixrQkFBQUEsT0FYZ0I7QUFZcEJvQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUdwQixPQUFPLENBQUNDLFlBQTVCLENBWm9CLENBY3BCOztBQUNBakIsa0JBQUFBLFFBQVEsQ0FBQ29DLE9BQUQsQ0FBUjs7QUFmb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUNJLDRCQUNBO0FBQ0ksYUFBT0ssS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQUNqRCxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBWjtBQUFrQkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQTdCO0FBQW1DSyxRQUFBQSxJQUFJLEVBQUUsS0FBS0osUUFBOUM7QUFBd0RDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUF2RTtBQUFpRitDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQyxNQUFoRztBQUF3R0MsUUFBQUEsZUFBZSxFQUFFO0FBQXpILE9BQWpCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcblxuLypcbkRBTyBmaWxlIHVzZWQgZm9yIGNvbm5lY3RpbmcgdGhlIEFQSSB0byB0aGUgZGF0YWJhc2VcblRoaXMgREFPIGhhbmRsZXMgdGhlIHVzZXJzIHRhYmxlIGluIG91ciBkYXRhYmFzZVxuKi9cblxuZXhwb3J0IGNsYXNzIFVzZXJEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiQ2FyZWQ0XCI7XG4gICAgcHJpdmF0ZSBwb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgLyoqXG4gICAgICogTm9uLWRlZmF1bHQgY29uc3RydWN0b3IuXG4gICAgICogXG4gICAgICogQHBhcmFtIGhvc3QgRGF0YWJhc2UgSG9zdG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgRGF0YWJhc2UgVXNlcm5hbWVcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IGFsbCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXIgVXNlciB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBVc2VyIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIGBVU0VSU2AgKEZJUlNUTkFNRSwgTEFTVE5BTUUsIEVNQUlMLCBQQVNTV09SRCwgQklSVEhEQVksIFNFWCwgQ09ORElUSU9OUywgSU1BR0UpIFZBTFVFUyg/LD8sPyw/LD8sPyw/LD8pJywgW3VzZXIuRmlyc3ROYW1lLCB1c2VyLkxhc3ROYW1lLCB1c2VyLkVtYWlsLCB1c2VyLlBhc3N3b3JkLCB1c2VyLkJpcnRoZGF5LCB1c2VyLlNleCwgdXNlci5Db25kaXRpb25zLCB1c2VyLkltYWdlXSk7XG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKVxuICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIGlkIG9mIHRoZSBuZXdseSBjcmVhdGVkIFVzZXJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSByZXN1bHQxLmluc2VydElkO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgVXNlcnMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJzKGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBMaXN0IG9mIFVzZXJzIHRvIHJldHVyblxuICAgICAgICBsZXQgdXNlcnM6VXNlcltdID0gW107XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgdXNlcnMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgVXNlcnNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIHVzZXJzXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFVTRVJTYCcpO1xuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdXNlciBhbmQgaXRzIGRhdGEgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRklSU1ROQU1FLCByZXN1bHQxW3hdLkxBU1ROQU1FLCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLkJJUlRIREFZLCByZXN1bHQxW3hdLlNFWCwgcmVzdWx0MVt4XS5DT05ESVRJT05TLCByZXN1bHQxW3hdLklNQUdFKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2Vycyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGZpbmQgYSB1c2VyIGJ5IHRoZWlyIElEXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSB1c2VyIGJlaW5nIHNlYXJjaGVkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBVc2Vycy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFVzZXJCeUlkKGlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBVc2VyIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICAgbGV0IHVzZXI6VXNlcjtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBVc2VycyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBVU0VSU2AgV0hFUkUgSUQgPSA/XCIsIGlkKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgZnJvbSB0aGUgZGF0YWJhc2UgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgdXNlciA9IG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRklSU1ROQU1FLCByZXN1bHQxW3hdLkxBU1ROQU1FLCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLkJJUlRIREFZLCByZXN1bHQxW3hdLlNFWCwgcmVzdWx0MVt4XS5DT05ESVRJT05TLCByZXN1bHQxW3hdLklNQUdFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgdXNlciBieSB0aGVpciBFbWFpbFxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpZCBJZCBvZiB0aGUgdXNlciBiZWluZyBzZWFyY2hlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgVXNlcnMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRVc2VyQnlFbWFpbChlbWFpbDpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBVc2VyIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICBsZXQgdXNlcjpVc2VyO1xuXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFVzZXJzIGZvciBzZWFyY2hcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFVTRVJTYCBXSEVSRSBFTUFJTCA9ID9cIiwgZW1haWwpO1xuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdXNlciBmcm9tIHRoZSBkYXRhYmFzZSB0byByZXR1cm5cbiAgICAgICAgICAgICAgICB1c2VyID0gbmV3IFVzZXIocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5GSVJTVE5BTUUsIHJlc3VsdDFbeF0uTEFTVE5BTUUsIHJlc3VsdDFbeF0uRU1BSUwsIHJlc3VsdDFbeF0uUEFTU1dPUkQsIHJlc3VsdDFbeF0uQklSVEhEQVksIHJlc3VsdDFbeF0uU0VYLCByZXN1bHQxW3hdLkNPTkRJVElPTlMsIHJlc3VsdDFbeF0uSU1BR0UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXIpO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhIFVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXIgVXNlciB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodXNlcjpVc2VyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuIFxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFVzZXJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlVQREFURSBgVVNFUlNgIFNFVCBGSVJTVE5BTUU9PywgTEFTVE5BTUU9PywgRU1BSUw9PywgUEFTU1dPUkQ9PywgQklSVEhEQVk9PywgU0VYPT8sIENPTkRJVElPTlM9PywgSU1BR0U9PyBXSEVSRSBJRD0/XCIsIFt1c2VyLkZpcnN0TmFtZSwgdXNlci5MYXN0TmFtZSwgdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgdXNlci5CaXJ0aGRheSwgdXNlci5TZXgsIHVzZXIuQ29uZGl0aW9ucywgdXNlci5JbWFnZSwgdXNlci5JZF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VySWQgVXNlciBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgcHVibGljIGRlbGV0ZSh1c2VySWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZGVsZXRlIFVzZXJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFVTRVJTYCBXSEVSRSBJRD0/JywgW3VzZXJJZF0pO1xuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=