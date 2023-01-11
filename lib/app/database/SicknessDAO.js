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
                  // Use Promisfy Util to make an async function and update Sickness
                  changes = 0; // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context4.next = 7;
                  return connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, RARITY=?, SEVERITY=?, CURE=?, TREATMENT=?, NATURALTREATMENT=?, STRONGAGAINST=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst, sickness.Id]);

                case 7:
                  result1 = _context4.sent;
                  // If the result indicates that a row was updated, then the number of changes increases
                  if (result1.changedRows != 0) ++changes; //Log the changes

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
                  changes = 0; // Use Promisfy Util to make an async function and run query to get all Sicknesses for search

                  connection.query = util.promisify(connection.query); // Database query assigned to a result variable

                  _context5.next = 7;
                  return connection.query('DELETE FROM `SICKNESSES` WHERE ID=?', [sicknessId]);

                case 7:
                  result1 = _context5.sent;
                  // Changes made to the database being saved to a variable
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TaWNrbmVzc0RBTy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwic2lja25lc3MiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIk5hbWUiLCJDb21tb25OYW1lIiwiU3ltcHRvbXMiLCJSYXJpdHkiLCJTZXZlcml0eSIsIkN1cmUiLCJUcmVhdG1lbnQiLCJOYXR1cmFsVHJlYXRtZW50IiwiU3Ryb25nQWdhaW5zdCIsInJlc3VsdDEiLCJhZmZlY3RlZFJvd3MiLCJzaWNrbmVzc0lkIiwiaW5zZXJ0SWQiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlNpY2tuZXNzZXMiLCJJRCIsIk5BTUUiLCJDT01NT05OQU1FIiwiU1lNUFRPTVMiLCJSQVJJVFkiLCJTRVZFUklUWSIsIkNVUkUiLCJUUkVBVE1FTlQiLCJOQVRVUkFMVFJFQVRNRU5UIiwiU1RST05HQUdBSU5TVCIsImlkIiwiY2hhbmdlcyIsIklkIiwiY2hhbmdlZFJvd3MiLCJjb25zb2xlIiwibG9nIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFFYUEsVztBQVNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksdUJBQVlDLElBQVosRUFBeUJDLElBQXpCLEVBQXNDQyxRQUF0QyxFQUF1REMsUUFBdkQsRUFDQTtBQUFBO0FBQUEsZ0RBZnNCLEVBZXRCO0FBQUEsZ0RBZHNCLElBY3RCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEs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LEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lja25lc3NlcyB9IGZyb20gXCIuLi9tb2RlbHMvU2lja25lc3Nlc1wiO1xuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5cbi8qXG5EQU8gZmlsZSB1c2VkIGZvciBjb25uZWN0aW5nIHRoZSBBUEkgdG8gdGhlIGRhdGFiYXNlXG5UaGlzIERBTyBoYW5kbGVzIHRoZSBzaWNrbmVzcyB0YWJsZSBpbiBvdXIgZGF0YWJhc2VcbiovXG5cbmV4cG9ydCBjbGFzcyBTaWNrbmVzc0RBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJDYXJlZDRcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgc2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzIFNpY2tuZXNzIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIFNpY2tuZXNzIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHNpY2tuZXNzOlNpY2tuZXNzZXMsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgU2lja25lc3NcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIERhdGFiYXNlIHF1ZXJ5IGFzc2lnbmVkIHRvIGEgcmVzdWx0IHZhcmlhYmxlXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIFNJQ0tORVNTRVMgKE5BTUUsIENPTU1PTk5BTUUsIFNZTVBUT01TLCBSQVJJVFksIFNFVkVSSVRZLCBDVVJFLCBUUkVBVE1FTlQsIE5BVFVSQUxUUkVBVE1FTlQsIFNUUk9OR0FHQUlOU1QpIFZBTFVFUyg/LD8sPyw/LD8sPyw/LD8sPyknLCBbc2lja25lc3MuTmFtZSwgc2lja25lc3MuQ29tbW9uTmFtZSwgc2lja25lc3MuU3ltcHRvbXMsIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLkN1cmUsIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuTmF0dXJhbFRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdF0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIHJvd3MgYWZmZWN0ZWQgdGhlbiByZXR1cm4gLTEgdG8gc2lnbmFsIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKVxuICAgICAgICAgICAgICAgY2FsbGJhY2soLTEpO1xuXG4gICAgICAgICAgICAvL2dldHRpbmcgdGhlIGlkIG9mIHRoZSBuZXdseSBjcmVhdGVkIHNpY2tuZXNzXG4gICAgICAgICAgICBsZXQgc2lja25lc3NJZCA9IHJlc3VsdDEuaW5zZXJ0SWQ7XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzc0lkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgU2lja25lc3Nlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIFNpY2tuZXNzZXMuXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzcyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gTGlzdCBvZiBzaWNrbmVzc2VzIHRvIHJldHVyblxuICAgICAgICBsZXQgc2lja25lc3M6U2lja25lc3Nlc1tdID0gW107XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgU2lja25lc3NlcywgYW5kIHJldHVybiB0aGUgTGlzdCBvZiBTaWNrbmVzc2VzXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBTaWNrbmVzc2VzXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCcpO1xuICAgICAgICAgICAgLy8gTG9vcGluZyBvdmVyIHRoZSByZXN1bHRzIGFuZCBwdXNoaW5nIGVhY2ggc2lja25lc3MgdGhhdCBoYXMgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGUgZGF0YWJhc2UgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHNpY2tuZXNzIGFuZCBpdHMgZGF0YSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIHNpY2tuZXNzLnB1c2gobmV3IFNpY2tuZXNzZXMocmVzdWx0MVt4XS5JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLkNPTU1PTk5BTUUsIHJlc3VsdDFbeF0uU1lNUFRPTVMsIHJlc3VsdDFbeF0uUkFSSVRZLCByZXN1bHQxW3hdLlNFVkVSSVRZLCByZXN1bHQxW3hdLkNVUkUsIHJlc3VsdDFbeF0uVFJFQVRNRU5ULCByZXN1bHQxW3hdLk5BVFVSQUxUUkVBVE1FTlQsIHJlc3VsdDFbeF0uU1RST05HQUdBSU5TVCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZmluZCBhIHNpY2tuZXNzIGluIHRoZSBkYXRhYmFzZSBieSBpdCdzIElEXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIElEIG9mIHRoZSBzaWNrbmVzcyBiZWluZyByZXRyaWV2ZWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgdGhlIHNpY2tuZXNzZXMgcmV0cmlldmVkXG4gICAgICovXG4gICAgcHVibGljIGZpbmRTaWNrbmVzc0J5SWQoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgLy8gU2lja25lc3MgdGhhdCdzIGdvaW5nIHRvIGJlIHJldHVybmVkXG4gICAgICAgIGxldCBzaWNrbmVzczpTaWNrbmVzc2VzO1xuXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIElEID0gP1wiLCBpZCk7XG4gICAgICAgICAgICAvLyBMb29waW5nIG92ZXIgdGhlIHJlc3VsdHMgYW5kIHB1c2hpbmcgZWFjaCBzaWNrbmVzcyB0aGF0IGhhcyBiZWVuIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZSB0byB0aGUgbGlzdCAoc2hvdWxkIG9ubHkgYmUgb25lKVxuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgc2lja25lc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICBzaWNrbmVzcyA9IG5ldyBTaWNrbmVzc2VzKHJlc3VsdDFbeF0uSUQsIHJlc3VsdDFbeF0uTkFNRSwgcmVzdWx0MVt4XS5DT01NT05OQU1FLCByZXN1bHQxW3hdLlNZTVBUT01TLCByZXN1bHQxW3hdLlJBUklUWSwgcmVzdWx0MVt4XS5TRVZFUklUWSwgcmVzdWx0MVt4XS5DVVJFLCByZXN1bHQxW3hdLlRSRUFUTUVOVCwgcmVzdWx0MVt4XS5OQVRVUkFMVFJFQVRNRU5ULCByZXN1bHQxW3hdLlNUUk9OR0FHQUlOU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKHNpY2tuZXNzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhIFNpY2tuZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzaWNrbmVzcyBTaWNrbmVzcyB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgdXBkYXRlZC4gIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUoc2lja25lc3M6U2lja25lc3NlcywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuIFxuICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHVwZGF0ZSBTaWNrbmVzc1xuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3NlcyBmb3Igc2VhcmNoXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAvLyBEYXRhYmFzZSBxdWVyeSBhc3NpZ25lZCB0byBhIHJlc3VsdCB2YXJpYWJsZVxuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiVVBEQVRFIGBTSUNLTkVTU0VTYCBTRVQgTkFNRT0/LCBDT01NT05OQU1FPT8sIFNZTVBUT01TPT8sIFJBUklUWT0/LCBTRVZFUklUWT0/LCBDVVJFPT8sIFRSRUFUTUVOVD0/LCBOQVRVUkFMVFJFQVRNRU5UPT8sIFNUUk9OR0FHQUlOU1Q9PyBXSEVSRSBJRD0/XCIsIFtzaWNrbmVzcy5OYW1lLCBzaWNrbmVzcy5Db21tb25OYW1lLCBzaWNrbmVzcy5TeW1wdG9tcywgc2lja25lc3MuUmFyaXR5LCBzaWNrbmVzcy5TZXZlcml0eSwgc2lja25lc3MuQ3VyZSwgc2lja25lc3MuVHJlYXRtZW50LCBzaWNrbmVzcy5OYXR1cmFsVHJlYXRtZW50LCBzaWNrbmVzcy5TdHJvbmdBZ2FpbnN0LCBzaWNrbmVzcy5JZF0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpbmRpY2F0ZXMgdGhhdCBhIHJvdyB3YXMgdXBkYXRlZCwgdGhlbiB0aGUgbnVtYmVyIG9mIGNoYW5nZXMgaW5jcmVhc2VzXG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApXG4gICAgICAgICAgICAgICAgKytjaGFuZ2VzO1xuICAgICAgICAgICAgLy9Mb2cgdGhlIGNoYW5nZXNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGEgU2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzSWQgU2lja25lc3MgSUQgdG8gZGVsZXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIGRlbGV0ZWQuICBcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkZWxldGUoc2lja25lc3NJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgU2lja25lc3NcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgLy8gRGF0YWJhc2UgcXVlcnkgYXNzaWduZWQgdG8gYSByZXN1bHQgdmFyaWFibGVcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIElEPT8nLCBbc2lja25lc3NJZF0pO1xuICAgICAgICAgICAgLy8gQ2hhbmdlcyBtYWRlIHRvIHRoZSBkYXRhYmFzZSBiZWluZyBzYXZlZCB0byBhIHZhcmlhYmxlXG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vKiAqKioqKioqKioqKioqKioqIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgKioqKioqKioqKioqKioqKiAqL1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBoZWxwZXIgbWV0aG9kIHRvIGluaXRpYWxpZSBhIERhdGFiYXNlIENvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXREYkNvbm5lY3Rpb24oKTphbnlcbiAgICB7XG4gICAgICAgIC8vUmV0dXJuIGEgZGF0YWJhc2UgY29ubmVjdGlvblxuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=