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

   _______________                        |*\_/*|________
  |  ___________  |     .-.     .-.      ||_/-\_|______  |
  | |           | |    .****. .****.     | |           | |
  | |   0   0   | |    .*****.*****.     | |   0   0   | |
  | |     -     | |     .*********.      | |     -     | |
  | |   \___/   | |      .*******.       | |   \___/   | |
  | |___     ___| |       .*****.        | |___________| |
  |_____|\_/|_____|        .***.         |_______________|
    _|__|/ \|_|_.............*.............._|________|_
   / ********** \                          / ********** \
 /  ************  \                      /  ************  \
--------------------                    --------------------

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
                  return connection.query('INSERT INTO `USERS` (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, BIRTHDAY, SEX, CONDITIONS, IMAGE) VALUES(?,?,?,?,?,?,?)', [user.FirstName, user.LastName, user.Email, user.Password, user.Birthday, user.Sex, user.Conditions, user.Image]);

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
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var changes, result1;
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
                  // Use Promisfy Util to make an async function and update User
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context4.next = 7;
                  return connection.query("UPDATE `USERS` SET NAME=?, INGREDIENTS=?, BENEFITS=?, HTM=?, IMAGENAME=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);

                case 7:
                  result1 = _context4.sent;
                  if (result1.changedRows != 0) ++changes;
                  console.log(changes); // Do a callback to return the results

                  callback(changes);

                case 11:
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
    * CRUD method to delete a Sickness.
    * 
    * @param sicknessId Sickness ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(sicknessId, callback) {
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
                  // Use Promisfy Util to make an async function and run query to delete Sickness
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context5.next = 7;
                  return connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);

                case 7:
                  result1 = _context5.sent;
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwicG9ydCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbml0RGJDb25uZWN0aW9uIiwicG9vbCIsInVzZXIiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIkZpcnN0TmFtZSIsIkxhc3ROYW1lIiwiRW1haWwiLCJQYXNzd29yZCIsIkJpcnRoZGF5IiwiU2V4IiwiQ29uZGl0aW9ucyIsIkltYWdlIiwicmVzdWx0MSIsImFmZmVjdGVkUm93cyIsInVzZXJJZCIsImluc2VydElkIiwidXNlcnMiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlVzZXIiLCJJRCIsIkZJUlNUTkFNRSIsIkxBU1ROQU1FIiwiRU1BSUwiLCJQQVNTV09SRCIsIkJJUlRIREFZIiwiU0VYIiwiQ09ORElUSU9OUyIsIklNQUdFIiwiaWQiLCJjaGFuZ2VzIiwic2lja25lc3MiLCJOYW1lIiwiQ29tbW9uTmFtZSIsIlN5bXB0b21zIiwiUmFyaXR5IiwiU2V2ZXJpdHkiLCJDdXJlIiwiVHJlYXRtZW50IiwiTmF0dXJhbFRyZWF0bWVudCIsIlN0cm9uZ0FnYWluc3QiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJsb2ciLCJzaWNrbmVzc0lkIiwibXlzcWwiLCJjcmVhdGVQb29sIiwiZGF0YWJhc2UiLCJzY2hlbWEiLCJjb25uZWN0aW9uTGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUVhQSxPO0FBU1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FLcEI7O0FBTG9CLHVCQU1qQkYsR0FOaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTU5BLEdBTk07O0FBQUE7QUFRcEI7QUFDSWlDLGtCQUFBQSxPQVRnQixHQVNOLENBVE07QUFVcEJoQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQjtBQVZvQjtBQUFBLHlCQVdBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIscUNBQWpCLEVBQXdELENBQUM0QyxVQUFELENBQXhELENBWEE7O0FBQUE7QUFXaEJqQyxrQkFBQUEsT0FYZ0I7QUFZcEJtQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUduQixPQUFPLENBQUNDLFlBQTVCLENBWm9CLENBY3BCOztBQUNBakIsa0JBQUFBLFFBQVEsQ0FBQ21DLE9BQUQsQ0FBUjs7QUFmb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUNJLDRCQUNBO0FBQ0ksYUFBT2UsS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQUMxRCxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBWjtBQUFrQkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQTdCO0FBQW1DSyxRQUFBQSxJQUFJLEVBQUUsS0FBS0osUUFBOUM7QUFBd0RDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUF2RTtBQUFpRndELFFBQUFBLFFBQVEsRUFBRSxLQUFLQyxNQUFoRztBQUF3R0MsUUFBQUEsZUFBZSxFQUFFO0FBQXpILE9BQWpCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcblxuLypcblxuICAgX19fX19fX19fX19fX19fICAgICAgICAgICAgICAgICAgICAgICAgfCpcXF8vKnxfX19fX19fX1xuICB8ICBfX19fX19fX19fXyAgfCAgICAgLi0uICAgICAuLS4gICAgICB8fF8vLVxcX3xfX19fX18gIHxcbiAgfCB8ICAgICAgICAgICB8IHwgICAgLioqKiouIC4qKioqLiAgICAgfCB8ICAgICAgICAgICB8IHxcbiAgfCB8ICAgMCAgIDAgICB8IHwgICAgLioqKioqLioqKioqLiAgICAgfCB8ICAgMCAgIDAgICB8IHxcbiAgfCB8ICAgICAtICAgICB8IHwgICAgIC4qKioqKioqKiouICAgICAgfCB8ICAgICAtICAgICB8IHxcbiAgfCB8ICAgXFxfX18vICAgfCB8ICAgICAgLioqKioqKiouICAgICAgIHwgfCAgIFxcX19fLyAgIHwgfFxuICB8IHxfX18gICAgIF9fX3wgfCAgICAgICAuKioqKiouICAgICAgICB8IHxfX19fX19fX19fX3wgfFxuICB8X19fX198XFxfL3xfX19fX3wgICAgICAgIC4qKiouICAgICAgICAgfF9fX19fX19fX19fX19fX3xcbiAgICBffF9ffC8gXFx8X3xfLi4uLi4uLi4uLi4uLiouLi4uLi4uLi4uLi4uLl98X19fX19fX198X1xuICAgLyAqKioqKioqKioqIFxcICAgICAgICAgICAgICAgICAgICAgICAgICAvICoqKioqKioqKiogXFxcbiAvICAqKioqKioqKioqKiogIFxcICAgICAgICAgICAgICAgICAgICAgIC8gICoqKioqKioqKioqKiAgXFxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tICAgICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5EQU8gZmlsZSB1c2VkIGZvciBjb25uZWN0aW5nIHRoZSBBUEkgdG8gdGhlIGRhdGFiYXNlXG5UaGlzIERBTyBoYW5kbGVzIHRoZSB1c2VycyB0YWJsZSBpbiBvdXIgZGF0YWJhc2VcblxuKi9cblxuZXhwb3J0IGNsYXNzIFVzZXJEQU9cbntcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBvcnQ6bnVtYmVyID0gMzMwNjtcbiAgICBwcml2YXRlIHVzZXJuYW1lOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2NoZW1hOnN0cmluZyA9IFwiQ2FyZWQ0XCI7XG4gICAgcHJpdmF0ZSBwb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgLyoqXG4gICAgICogTm9uLWRlZmF1bHQgY29uc3RydWN0b3IuXG4gICAgICogXG4gICAgICogQHBhcmFtIGhvc3QgRGF0YWJhc2UgSG9zdG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgRGF0YWJhc2UgVXNlcm5hbWVcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgRGF0YWJhc2UgUGFzc3dvcmRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IGFsbCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLnBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHVzZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHVzZXIgVXNlciB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBVc2VyIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBVc2VyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIGBVU0VSU2AgKEZJUlNUTkFNRSwgTEFTVE5BTUUsIEVNQUlMLCBQQVNTV09SRCwgQklSVEhEQVksIFNFWCwgQ09ORElUSU9OUywgSU1BR0UpIFZBTFVFUyg/LD8sPyw/LD8sPyw/KScsIFt1c2VyLkZpcnN0TmFtZSwgdXNlci5MYXN0TmFtZSwgdXNlci5FbWFpbCwgdXNlci5QYXNzd29yZCwgdXNlci5CaXJ0aGRheSwgdXNlci5TZXgsIHVzZXIuQ29uZGl0aW9ucywgdXNlci5JbWFnZV0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcblxuICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBpZCBvZiB0aGUgbmV3bHkgY3JlYXRlZCBVc2VyXG4gICAgICAgICAgICBsZXQgdXNlcklkID0gcmVzdWx0MS5pbnNlcnRJZDtcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHVzZXJJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYWxsIFVzZXJzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgVXNlcnMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRVc2VycyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cbiAgICAgICAgbGV0IHVzZXJzOlVzZXJbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIHVzZXJzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIFVzZXJzXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCB1c2Vyc1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBVU0VSU2AnKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHVzZXIgYW5kIGl0cyBkYXRhIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgdXNlcnMucHVzaChuZXcgVXNlcihyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLkZJUlNUTkFNRSwgcmVzdWx0MVt4XS5MQVNUTkFNRSwgcmVzdWx0MVt4XS5FTUFJTCwgcmVzdWx0MVt4XS5QQVNTV09SRCwgcmVzdWx0MVt4XS5CSVJUSERBWSwgcmVzdWx0MVt4XS5TRVgsIHJlc3VsdDFbeF0uQ09ORElUSU9OUywgcmVzdWx0MVt4XS5JTUFHRSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBwdWJsaWMgZmluZFVzZXJCeUlkKGlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBVc2VyIHRoYXQncyBnb2luZyB0byBiZSByZXR1cm5lZFxuICAgICAgICAgbGV0IHVzZXI6VXNlcjtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBVc2VycyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGBVU0VSU2AgV0hFUkUgSUQgPSA/XCIsIGlkKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgZnJvbSB0aGUgZGF0YWJhc2UgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgdXNlciA9IG5ldyBVc2VyKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uRklSU1ROQU1FLCByZXN1bHQxW3hdLkxBU1ROQU1FLCByZXN1bHQxW3hdLkVNQUlMLCByZXN1bHQxW3hdLlBBU1NXT1JELCByZXN1bHQxW3hdLkJJUlRIREFZLCByZXN1bHQxW3hdLlNFWCwgcmVzdWx0MVt4XS5DT05ESVRJT05TLCByZXN1bHQxW3hdLklNQUdFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byB1cGRhdGUgYSBVc2VyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1c2VyIFVzZXIgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6VXNlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiBcbiAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuIFxuICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHVwZGF0ZSBVc2VyXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJVUERBVEUgYFVTRVJTYCBTRVQgTkFNRT0/LCBJTkdSRURJRU5UUz0/LCBCRU5FRklUUz0/LCBIVE09PywgSU1BR0VOQU1FPT8gV0hFUkUgSUQ9P1wiLCBbc2lja25lc3MuTmFtZSwgc2lja25lc3MuQ29tbW9uTmFtZSwgc2lja25lc3MuU3ltcHRvbXMsIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLkN1cmUsIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuTmF0dXJhbFRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxuICAgICAgICAgICAgICAgICsrY2hhbmdlcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYSBTaWNrbmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2lja25lc3NJZCBTaWNrbmVzcyBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgcHVibGljIGRlbGV0ZShzaWNrbmVzc0lkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSBTaWNrbmVzc1xuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgSUQ9PycsIFtzaWNrbmVzc0lkXSk7XG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vKiAqKioqKioqKioqKioqKioqIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgKioqKioqKioqKioqKioqKiAqL1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBoZWxwZXIgbWV0aG9kIHRvIGluaXRpYWxpZSBhIERhdGFiYXNlIENvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXREYkNvbm5lY3Rpb24oKTphbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xuICAgIH1cbn1cbiJdfQ==