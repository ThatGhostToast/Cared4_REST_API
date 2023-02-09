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
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Sickness
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context.next = 6;
                  return connection.query('INSERT INTO SICKNESSES (NAME, COMMONNAME, SYMPTOMS, RARITY, SEVERITY, CURE, TREATMENT, NATURALTREATMENT, STRONGAGAINST) VALUES(?,?,?,?,?,?,?,?,?)', [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);

                case 6:
                  result1 = _context.sent;
                  // If there are no rows affected then return -1 to signal something went wrong
                  if (result1.affectedRows != 1) callback(-1); //getting the id of the newly created sickness

                  sicknessId = result1.insertId; // Do a callback to return the results

                  callback(sicknessId);

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
    * CRUD method to return all Sicknesses.
    * 
    * @param callback Callback function with an Array of type Sicknesses.
    */

  }, {
    key: "findSickness",
    value: function findSickness(callback) {
      // List of sicknesses to return
      var sickness = []; // Get a pooled connection to the database, run the query to get all the Sicknesses, and return the List of Sicknesses

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
                  // Use Promisfy Util to make an async function and run query to get all Sicknesses
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context2.next = 6;
                  return connection.query('SELECT * FROM `SICKNESSES`');

                case 6:
                  result1 = _context2.sent;

                  // Looping over the results and pushing each sickness that has been retrieved from the database to the list
                  for (x = 0; x < result1.length; ++x) {
                    // Add sickness and its data to the list
                    sickness.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST));
                  } // Do a callback to return the results


                  callback(sickness);

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
     * Method to find a sickness in the database by it's ID
     * 
     * @param id ID of the sickness being retrieved
     * @param callback Callback function with a list of the sicknesses retrieved
     */

  }, {
    key: "findSicknessById",
    value: function findSicknessById(id, callback) {
      // Sickness that's going to be returned
      var sickness; // Get pooled database connection and run queries   

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
                  // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context3.next = 6;
                  return connection.query("SELECT * FROM `SICKNESSES` WHERE ID = ?", id);

                case 6:
                  result1 = _context3.sent;

                  // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                  for (x = 0; x < result1.length; ++x) {
                    // Get sickness information
                    sickness = new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST);
                  } // Do a callback to return the results


                  callback(sickness);

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
     * Method to find a sickness in the database by it's symptoms
     * 
     * @param symptoms symptoms of the sickness being retrieved
     * @param callback Callback function with a list of the sicknesses retrieved
     */

  }, {
    key: "findSicknessBySymptoms",
    value: function findSicknessBySymptoms(symptoms, callback) {
      // Sickness that's going to be returned
      var sicknesses = []; // Get pooled database connection and run queries   

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
                  // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context4.next = 6;
                  return connection.query("SELECT * FROM `SICKNESSES` WHERE SYMPTOMS LIKE '%" + symptoms + "%'");

                case 6:
                  result1 = _context4.sent;

                  // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                  for (x = 0; x < result1.length; ++x) {
                    // Get sickness information
                    sicknesses.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST));
                  } // Do a callback to return the results


                  callback(sicknesses);

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
    * Method to find a sickness in the database by it's symptoms
    * 
    * @param symptoms symptoms of the sickness being retrieved
    * @param callback Callback function with a list of the sicknesses retrieved
    */

  }, {
    key: "findSicknessByName",
    value: function findSicknessByName(name, callback) {
      // Sickness that's going to be returned
      var sicknesses = []; // Get pooled database connection and run queries   

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
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Sicknesses for search
                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context5.next = 6;
                  return connection.query("SELECT * FROM `SICKNESSES` WHERE NAME LIKE '%" + name + "%'");

                case 6:
                  result1 = _context5.sent;

                  // Looping over the results and pushing each sickness that has been retrieved from the database to the list (should only be one)
                  for (x = 0; x < result1.length; ++x) {
                    // Get sickness information
                    sicknesses.push(new _Sicknesses.Sicknesses(result1[x].ID, result1[x].NAME, result1[x].COMMONNAME, result1[x].SYMPTOMS, result1[x].RARITY, result1[x].SEVERITY, result1[x].CURE, result1[x].TREATMENT, result1[x].NATURALTREATMENT, result1[x].STRONGAGAINST));
                  } // Do a callback to return the results


                  callback(sicknesses);

                case 9:
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
    * CRUD method to update a Sickness.
    * 
    * @param sickness Sickness to update.
    * @param callback Callback function with number of rows updated.  
    */

  }, {
    key: "update",
    value: function update(sickness, callback) {
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
                  // Use Promisfy Util to make an async function and update Sickness
                  changes = 0; // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context6.next = 7;
                  return connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, RARITY=?, SEVERITY=?, CURE=?, TREATMENT=?, NATURALTREATMENT=?, STRONGAGAINST=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst, sickness.Id]);

                case 7:
                  result1 = _context6.sent;
                  // If the result indicates that a row was updated, then the number of changes increases
                  if (result1.changedRows != 0) ++changes; //Log the changes

                  console.log(changes); // Do a callback to return the results

                  callback(changes);

                case 11:
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
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context7.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete Sickness
                  changes = 0; // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context7.next = 7;
                  return connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);

                case 7:
                  result1 = _context7.sent;
                  // Changes made to the database being saved to a variable
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TaWNrbmVzc0RBTy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwic2lja25lc3MiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIk5hbWUiLCJDb21tb25OYW1lIiwiU3ltcHRvbXMiLCJSYXJpdHkiLCJTZXZlcml0eSIsIkN1cmUiLCJUcmVhdG1lbnQiLCJOYXR1cmFsVHJlYXRtZW50IiwiU3Ryb25nQWdhaW5zdCIsInJlc3VsdDEiLCJhZmZlY3RlZFJvd3MiLCJzaWNrbmVzc0lkIiwiaW5zZXJ0SWQiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlNpY2tuZXNzZXMiLCJJRCIsIk5BTUUiLCJDT01NT05OQU1FIiwiU1lNUFRPTVMiLCJSQVJJVFkiLCJTRVZFUklUWSIsIkNVUkUiLCJUUkVBVE1FTlQiLCJOQVRVUkFMVFJFQVRNRU5UIiwiU1RST05HQUdBSU5TVCIsImlkIiwic3ltcHRvbXMiLCJzaWNrbmVzc2VzIiwibmFtZSIsImNoYW5nZXMiLCJJZCIsImNoYW5nZWRSb3dzIiwiY29uc29sZSIsImxvZyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsInVzZXIiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBRWFBLFc7QUFTVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHVCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsUUFBdEMsRUFBdURDLFFBQXZELEVBQ0E7QUFBQTtBQUFBLGdEQWZzQixFQWV0QjtBQUFBLGdEQWRz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LEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQixDQVhvQixDQVlwQjs7QUFab0I7QUFBQSx5QkFhQUYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLHFDQUFqQixFQUF3RCxDQUFDYyxVQUFELENBQXhELENBYkE7O0FBQUE7QUFhaEJGLGtCQUFBQSxPQWJnQjtBQWNwQjtBQUNBc0Isa0JBQUFBLE9BQU8sR0FBR0EsT0FBTyxHQUFHdEIsT0FBTyxDQUFDQyxZQUE1QixDQWZvQixDQWlCcEI7O0FBQ0FsQixrQkFBQUEsUUFBUSxDQUFDdUMsT0FBRCxDQUFSOztBQWxCb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUNJLDRCQUNBO0FBQ0k7QUFDQSxhQUFPSyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFBQ3BELFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFaO0FBQWtCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBN0I7QUFBbUNvRCxRQUFBQSxJQUFJLEVBQUUsS0FBS25ELFFBQTlDO0FBQXdEQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBdkU7QUFBaUZtRCxRQUFBQSxRQUFRLEVBQUUsS0FBS0MsTUFBaEc7QUFBd0dDLFFBQUFBLGVBQWUsRUFBRTtBQUF6SCxPQUFqQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWNrbmVzc2VzIH0gZnJvbSBcIi4uL21vZGVscy9TaWNrbmVzc2VzXCI7XG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcblxuLypcbkRBTyBmaWxlIHVzZWQgZm9yIGNvbm5lY3RpbmcgdGhlIEFQSSB0byB0aGUgZGF0YWJhc2VcblRoaXMgREFPIGhhbmRsZXMgdGhlIHNpY2tuZXNzIHRhYmxlIGluIG91ciBkYXRhYmFzZVxuKi9cblxuZXhwb3J0IGNsYXNzIFNpY2tuZXNzREFPXG57XG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwb3J0Om51bWJlciA9IDMzMDY7XG4gICAgcHJpdmF0ZSB1c2VybmFtZTpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcGFzc3dvcmQ6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHNjaGVtYTpzdHJpbmcgPSBcIkNhcmVkNFwiO1xuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBob3N0IERhdGFiYXNlIEhvc3RuYW1lXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIERhdGFiYXNlIFBhc3N3b3JkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIFNldCBhbGwgY2xhc3MgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5wb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBzaWNrbmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2lja25lc3MgU2lja25lc3MgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIC0xIGlmIGFuIGVycm9yIGVsc2UgU2lja25lc3MgSUQgY3JlYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUoc2lja25lc3M6U2lja25lc3NlcywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGluc2VydCBTaWNrbmVzc1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gU0lDS05FU1NFUyAoTkFNRSwgQ09NTU9OTkFNRSwgU1lNUFRPTVMsIFJBUklUWSwgU0VWRVJJVFksIENVUkUsIFRSRUFUTUVOVCwgTkFUVVJBTFRSRUFUTUVOVCwgU1RST05HQUdBSU5TVCkgVkFMVUVTKD8sPyw/LD8sPyw/LD8sPyw/KScsIFtzaWNrbmVzcy5OYW1lLCBzaWNrbmVzcy5Db21tb25OYW1lLCBzaWNrbmVzcy5TeW1wdG9tcywgc2lja25lc3MuUmFyaXR5LCBzaWNrbmVzcy5TZXZlcml0eSwgc2lja25lc3MuQ3VyZSwgc2lja25lc3MuVHJlYXRtZW50LCBzaWNrbmVzcy5OYXR1cmFsVHJlYXRtZW50LCBzaWNrbmVzcy5TdHJvbmdBZ2FpbnN0XSk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gcm93cyBhZmZlY3RlZCB0aGVuIHJldHVybiAtMSB0byBzaWduYWwgc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXG4gICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG5cbiAgICAgICAgICAgIC8vZ2V0dGluZyB0aGUgaWQgb2YgdGhlIG5ld2x5IGNyZWF0ZWQgc2lja25lc3NcbiAgICAgICAgICAgIGxldCBzaWNrbmVzc0lkID0gcmVzdWx0MS5pbnNlcnRJZDtcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gcmV0dXJuIGFsbCBTaWNrbmVzc2VzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgU2lja25lc3Nlcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzKGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBMaXN0IG9mIHNpY2tuZXNzZXMgdG8gcmV0dXJuXG4gICAgICAgIGxldCBzaWNrbmVzczpTaWNrbmVzc2VzW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZSwgcnVuIHRoZSBxdWVyeSB0byBnZXQgYWxsIHRoZSBTaWNrbmVzc2VzLCBhbmQgcmV0dXJuIHRoZSBMaXN0IG9mIFNpY2tuZXNzZXNcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXNcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgJyk7XG4gICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgc2lja25lc3MgYW5kIGl0cyBkYXRhIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgc2lja25lc3MucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uQ1VSRSwgcmVzdWx0MVt4XS5UUkVBVE1FTlQsIHJlc3VsdDFbeF0uTkFUVVJBTFRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNUKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgc2lja25lc3MgaW4gdGhlIGRhdGFiYXNlIGJ5IGl0J3MgSURcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgSUQgb2YgdGhlIHNpY2tuZXNzIGJlaW5nIHJldHJpZXZlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiB0aGUgc2lja25lc3NlcyByZXRyaWV2ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZFNpY2tuZXNzQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgbGV0IHNpY2tuZXNzOlNpY2tuZXNzZXM7XG5cbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3NlcyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgSUQgPSA/XCIsIGlkKTtcbiAgICAgICAgICAgIC8vIExvb3Bpbmcgb3ZlciB0aGUgcmVzdWx0cyBhbmQgcHVzaGluZyBlYWNoIHNpY2tuZXNzIHRoYXQgaGFzIGJlZW4gcmV0cmlldmVkIGZyb20gdGhlIGRhdGFiYXNlIHRvIHRoZSBsaXN0IChzaG91bGQgb25seSBiZSBvbmUpXG4gICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEdldCBzaWNrbmVzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHNpY2tuZXNzID0gbmV3IFNpY2tuZXNzZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLkNPTU1PTk5BTUUsIHJlc3VsdDFbeF0uU1lNUFRPTVMsIHJlc3VsdDFbeF0uUkFSSVRZLCByZXN1bHQxW3hdLlNFVkVSSVRZLCByZXN1bHQxW3hdLkNVUkUsIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLk5BVFVSQUxUUkVBVE1FTlQsIHJlc3VsdDFbeF0uU1RST05HQUdBSU5TVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIHN5bXB0b21zXG4gICAgICogXG4gICAgICogQHBhcmFtIHN5bXB0b21zIHN5bXB0b21zIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5U3ltcHRvbXMoc3ltcHRvbXM6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gU2lja25lc3MgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCBzaWNrbmVzc2VzOlNpY2tuZXNzZXNbXSA9IFtdO1xuXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIFNZTVBUT01TIExJS0UgJyVcIisgc3ltcHRvbXMgKyBcIiUnXCIpO1xuICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3QgKHNob3VsZCBvbmx5IGJlIG9uZSlcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHNpY2tuZXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgc2lja25lc3Nlcy5wdXNoKG5ldyBTaWNrbmVzc2VzKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5DT01NT05OQU1FLCByZXN1bHQxW3hdLlNZTVBUT01TLCByZXN1bHQxW3hdLlJBUklUWSwgcmVzdWx0MVt4XS5TRVZFUklUWSwgcmVzdWx0MVt4XS5DVVJFLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5OQVRVUkFMVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBmaW5kIGEgc2lja25lc3MgaW4gdGhlIGRhdGFiYXNlIGJ5IGl0J3Mgc3ltcHRvbXNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc3ltcHRvbXMgc3ltcHRvbXMgb2YgdGhlIHNpY2tuZXNzIGJlaW5nIHJldHJpZXZlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiB0aGUgc2lja25lc3NlcyByZXRyaWV2ZWRcbiAgICAgKi9cbiAgICAgICAgcHVibGljIGZpbmRTaWNrbmVzc0J5TmFtZShuYW1lOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gU2lja25lc3MgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgICAgICBsZXQgc2lja25lc3NlczpTaWNrbmVzc2VzW10gPSBbXTtcbiAgICBcbiAgICAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIE5BTUUgTElLRSAnJVwiKyBuYW1lICsgXCIlJ1wiKTtcbiAgICAgICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdCAoc2hvdWxkIG9ubHkgYmUgb25lKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgc2lja25lc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgc2lja25lc3Nlcy5wdXNoKG5ldyBTaWNrbmVzc2VzKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5DT01NT05OQU1FLCByZXN1bHQxW3hdLlNZTVBUT01TLCByZXN1bHQxW3hdLlJBUklUWSwgcmVzdWx0MVt4XS5TRVZFUklUWSwgcmVzdWx0MVt4XS5DVVJFLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5OQVRVUkFMVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gdXBkYXRlIGEgU2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzIFNpY2tuZXNzIHRvIHVwZGF0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyB1cGRhdGVkLiAgXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZShzaWNrbmVzczpTaWNrbmVzc2VzLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiBcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFNpY2tuZXNzXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzIGZvciBzZWFyY2hcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJVUERBVEUgYFNJQ0tORVNTRVNgIFNFVCBOQU1FPT8sIENPTU1PTk5BTUU9PywgU1lNUFRPTVM9PywgUkFSSVRZPT8sIFNFVkVSSVRZPT8sIENVUkU9PywgVFJFQVRNRU5UPT8sIE5BVFVSQUxUUkVBVE1FTlQ9PywgU1RST05HQUdBSU5TVD0/IFdIRVJFIElEPT9cIiwgW3NpY2tuZXNzLk5hbWUsIHNpY2tuZXNzLkNvbW1vbk5hbWUsIHNpY2tuZXNzLlN5bXB0b21zLCBzaWNrbmVzcy5SYXJpdHksIHNpY2tuZXNzLlNldmVyaXR5LCBzaWNrbmVzcy5DdXJlLCBzaWNrbmVzcy5UcmVhdG1lbnQsIHNpY2tuZXNzLk5hdHVyYWxUcmVhdG1lbnQsIHNpY2tuZXNzLlN0cm9uZ0FnYWluc3QsIHNpY2tuZXNzLklkXSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVzdWx0IGluZGljYXRlcyB0aGF0IGEgcm93IHdhcyB1cGRhdGVkLCB0aGVuIHRoZSBudW1iZXIgb2YgY2hhbmdlcyBpbmNyZWFzZXNcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcbiAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICAvL0xvZyB0aGUgY2hhbmdlc1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBkZWxldGUgYSBTaWNrbmVzcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2lja25lc3NJZCBTaWNrbmVzcyBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgcHVibGljIGRlbGV0ZShzaWNrbmVzc0lkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSBTaWNrbmVzc1xuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3NlcyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgSUQ9PycsIFtzaWNrbmVzc0lkXSk7XG4gICAgICAgICAgICAvLyBDaGFuZ2VzIG1hZGUgdG8gdGhlIGRhdGFiYXNlIGJlaW5nIHNhdmVkIHRvIGEgdmFyaWFibGVcbiAgICAgICAgICAgIGNoYW5nZXMgPSBjaGFuZ2VzICsgcmVzdWx0MS5hZmZlY3RlZFJvd3M7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8qICoqKioqKioqKioqKioqKiogUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAqKioqKioqKioqKioqKioqICovXG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGhlbHBlciBtZXRob2QgdG8gaW5pdGlhbGllIGEgRGF0YWJhc2UgQ29ubmVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxuICAgIHtcbiAgICAgICAgLy9SZXR1cm4gYSBkYXRhYmFzZSBjb25uZWN0aW9uXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xuICAgIH1cbn1cbiJdfQ==