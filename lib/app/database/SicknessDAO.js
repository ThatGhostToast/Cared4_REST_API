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
This DAO handles the sickness table in our database

*/
var SicknessDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
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
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('INSERT INTO SICKNESSES (NAME, COMMONNAME, SYMPTOMS, RARITY, SEVERITY, CURE, TREATMENT, NATURALTREATMENT, STRONGAGAINST) VALUES(?,?,?,?,?,?,?,?)', [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);

                case 6:
                  result1 = _context.sent;
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
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query('SELECT * FROM `SICKNESSES`');

                case 6:
                  result1 = _context2.sent;

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
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query("SELECT * FROM `SICKNESSES` WHERE ID = ?", id);

                case 6:
                  result1 = _context3.sent;

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
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context4.next = 7;
                  return connection.query("UPDATE `SICKNESSES` SET NAME=?, COMMONNAME=?, SYMPTOMS=?, RARITY=?, SEVERITY=?, CURE=?, TREATMENT=?, NATURALTREATMENT=?, STRONGAGAINST=? WHERE ID=?", [sickness.Name, sickness.CommonName, sickness.Symptoms, sickness.Rarity, sickness.Severity, sickness.Cure, sickness.Treatment, sickness.NaturalTreatment, sickness.StrongAgainst]);

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
  return SicknessDAO;
}();

exports.SicknessDAO = SicknessDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9TaWNrbmVzc0RBTy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc0RBTyIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwic2lja25lc3MiLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIk5hbWUiLCJDb21tb25OYW1lIiwiU3ltcHRvbXMiLCJSYXJpdHkiLCJTZXZlcml0eSIsIkN1cmUiLCJUcmVhdG1lbnQiLCJOYXR1cmFsVHJlYXRtZW50IiwiU3Ryb25nQWdhaW5zdCIsInJlc3VsdDEiLCJhZmZlY3RlZFJvd3MiLCJzaWNrbmVzc0lkIiwiaW5zZXJ0SWQiLCJ4IiwibGVuZ3RoIiwicHVzaCIsIlNpY2tuZXNzZXMiLCJJRCIsIk5BTUUiLCJDT01NT05OQU1FIiwiU1lNUFRPTVMiLCJSQVJJVFkiLCJTRVZFUklUWSIsIkNVUkUiLCJUUkVBVE1FTlQiLCJOQVRVUkFMVFJFQVRNRU5UIiwiU1RST05HQUdBSU5TVCIsImlkIiwiY2hhbmdlcyIsImNoYW5nZWRSb3dzIiwiY29uc29sZSIsImxvZyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsInVzZXIiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBRWFBLFc7QUFTVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHVCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsUUFBdEMsRUFBdURDLFFBQXZE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QUFBQTtBQUFBO0FBQUE7QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWpCRixHQU5pQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTkEsR0FOTTs7QUFBQTtBQVFwQjtBQUNJa0Msa0JBQUFBLE9BVGdCLEdBU04sQ0FUTTtBQVVwQmpDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CO0FBVm9CO0FBQUEseUJBV0FGLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQixxQ0FBakIsRUFBd0QsQ0FBQ2MsVUFBRCxDQUF4RCxDQVhBOztBQUFBO0FBV2hCRixrQkFBQUEsT0FYZ0I7QUFZcEJtQixrQkFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUduQixPQUFPLENBQUNDLFlBQTVCLENBWm9CLENBY3BCOztBQUNBbEIsa0JBQUFBLFFBQVEsQ0FBQ29DLE9BQUQsQ0FBUjs7QUFmb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUNJLDRCQUNBO0FBQ0ksYUFBT0ksS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQUNoRCxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBWjtBQUFrQkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQTdCO0FBQW1DZ0QsUUFBQUEsSUFBSSxFQUFFLEtBQUsvQyxRQUE5QztBQUF3REMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQXZFO0FBQWlGK0MsUUFBQUEsUUFBUSxFQUFFLEtBQUtDLE1BQWhHO0FBQXdHQyxRQUFBQSxlQUFlLEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lja25lc3NlcyB9IGZyb20gXCIuLi9tb2RlbHMvU2lja25lc3Nlc1wiO1xuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5cbi8qXG5cbiAgIF9fX19fX19fX19fX19fXyAgICAgICAgICAgICAgICAgICAgICAgIHwqXFxfLyp8X19fX19fX19cbiAgfCAgX19fX19fX19fX18gIHwgICAgIC4tLiAgICAgLi0uICAgICAgfHxfLy1cXF98X19fX19fICB8XG4gIHwgfCAgICAgICAgICAgfCB8ICAgIC4qKioqLiAuKioqKi4gICAgIHwgfCAgICAgICAgICAgfCB8XG4gIHwgfCAgIDAgICAwICAgfCB8ICAgIC4qKioqKi4qKioqKi4gICAgIHwgfCAgIDAgICAwICAgfCB8XG4gIHwgfCAgICAgLSAgICAgfCB8ICAgICAuKioqKioqKioqLiAgICAgIHwgfCAgICAgLSAgICAgfCB8XG4gIHwgfCAgIFxcX19fLyAgIHwgfCAgICAgIC4qKioqKioqLiAgICAgICB8IHwgICBcXF9fXy8gICB8IHxcbiAgfCB8X19fICAgICBfX198IHwgICAgICAgLioqKioqLiAgICAgICAgfCB8X19fX19fX19fX198IHxcbiAgfF9fX19ffFxcXy98X19fX198ICAgICAgICAuKioqLiAgICAgICAgIHxfX19fX19fX19fX19fX198XG4gICAgX3xfX3wvIFxcfF98Xy4uLi4uLi4uLi4uLi4qLi4uLi4uLi4uLi4uLi5ffF9fX19fX19ffF9cbiAgIC8gKioqKioqKioqKiBcXCAgICAgICAgICAgICAgICAgICAgICAgICAgLyAqKioqKioqKioqIFxcXG4gLyAgKioqKioqKioqKioqICBcXCAgICAgICAgICAgICAgICAgICAgICAvICAqKioqKioqKioqKiogIFxcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuREFPIGZpbGUgdXNlZCBmb3IgY29ubmVjdGluZyB0aGUgQVBJIHRvIHRoZSBkYXRhYmFzZVxuVGhpcyBEQU8gaGFuZGxlcyB0aGUgc2lja25lc3MgdGFibGUgaW4gb3VyIGRhdGFiYXNlXG5cbiovXG5cbmV4cG9ydCBjbGFzcyBTaWNrbmVzc0RBT1xue1xuICAgIHByaXZhdGUgaG9zdDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xuICAgIHByaXZhdGUgdXNlcm5hbWU6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJDYXJlZDRcIjtcbiAgICBwcml2YXRlIHBvb2wgPSB0aGlzLmluaXREYkNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBOb24tZGVmYXVsdCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaG9zdCBEYXRhYmFzZSBIb3N0bmFtZVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBEYXRhYmFzZSBVc2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBEYXRhYmFzZSBQYXNzd29yZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6c3RyaW5nLCBwb3J0Om51bWJlciwgdXNlcm5hbWU6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBTZXQgYWxsIGNsYXNzIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgc2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzIFNpY2tuZXNzIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCAtMSBpZiBhbiBlcnJvciBlbHNlIFNpY2tuZXNzIElEIGNyZWF0ZWQuICBcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHNpY2tuZXNzOlNpY2tuZXNzZXMsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgU2lja25lc3NcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gU0lDS05FU1NFUyAoTkFNRSwgQ09NTU9OTkFNRSwgU1lNUFRPTVMsIFJBUklUWSwgU0VWRVJJVFksIENVUkUsIFRSRUFUTUVOVCwgTkFUVVJBTFRSRUFUTUVOVCwgU1RST05HQUdBSU5TVCkgVkFMVUVTKD8sPyw/LD8sPyw/LD8sPyknLCBbc2lja25lc3MuTmFtZSwgc2lja25lc3MuQ29tbW9uTmFtZSwgc2lja25lc3MuU3ltcHRvbXMsIHNpY2tuZXNzLlJhcml0eSwgc2lja25lc3MuU2V2ZXJpdHksIHNpY2tuZXNzLkN1cmUsIHNpY2tuZXNzLlRyZWF0bWVudCwgc2lja25lc3MuTmF0dXJhbFRyZWF0bWVudCwgc2lja25lc3MuU3Ryb25nQWdhaW5zdF0pO1xuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSlcbiAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcblxuICAgICAgICAgICAgLy9nZXR0aW5nIHRoZSBpZCBvZiB0aGUgbmV3bHkgY3JlYXRlZCBzaWNrbmVzc1xuICAgICAgICAgICAgbGV0IHNpY2tuZXNzSWQgPSByZXN1bHQxLmluc2VydElkO1xuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soc2lja25lc3NJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byByZXR1cm4gYWxsIFNpY2tuZXNzZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBTaWNrbmVzc2VzLlxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kU2lja25lc3MoY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIExpc3Qgb2Ygc2lja25lc3NlcyB0byByZXR1cm5cbiAgICAgICAgbGV0IHNpY2tuZXNzOlNpY2tuZXNzZXNbXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLCBydW4gdGhlIHF1ZXJ5IHRvIGdldCBhbGwgdGhlIFNpY2tuZXNzZXMsIGFuZCByZXR1cm4gdGhlIExpc3Qgb2YgU2lja25lc3Nlc1xuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgU2lja25lc3Nlc1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGBTSUNLTkVTU0VTYCcpO1xuICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJlc3VsdDEubGVuZ3RoOysreClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgc2lja25lc3MgYW5kIGl0cyBkYXRhIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgc2lja25lc3MucHVzaChuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uQ1VSRSwgcmVzdWx0MVt4XS5UUkVBVE1FTlQsIHJlc3VsdDFbeF0uTkFUVVJBTFRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNUKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzcyk7XG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIHB1YmxpYyBmaW5kU2lja25lc3NCeUlkKGlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBTaWNrbmVzcyB0aGF0J3MgZ29pbmcgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgIGxldCBzaWNrbmVzczpTaWNrbmVzc2VzO1xuXG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFNpY2tuZXNzZXMgZm9yIHNlYXJjaFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBgU0lDS05FU1NFU2AgV0hFUkUgSUQgPSA/XCIsIGlkKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHNpY2tuZXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgc2lja25lc3MgPSBuZXcgU2lja25lc3NlcyhyZXN1bHQxW3hdLklELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uQ09NTU9OTkFNRSwgcmVzdWx0MVt4XS5TWU1QVE9NUywgcmVzdWx0MVt4XS5SQVJJVFksIHJlc3VsdDFbeF0uU0VWRVJJVFksIHJlc3VsdDFbeF0uQ1VSRSwgcmVzdWx0MVt4XS5UUkVBVE1FTlQsIHJlc3VsdDFbeF0uTkFUVVJBTFRSRUFUTUVOVCwgcmVzdWx0MVt4XS5TVFJPTkdBR0FJTlNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhzaWNrbmVzcyk7XG4gICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gdXBkYXRlIGEgU2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzIFNpY2tuZXNzIHRvIHVwZGF0ZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBudW1iZXIgb2Ygcm93cyB1cGRhdGVkLiAgXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZShzaWNrbmVzczpTaWNrbmVzc2VzLCBjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuIFxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgdXBkYXRlIFNpY2tuZXNzXG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXCJVUERBVEUgYFNJQ0tORVNTRVNgIFNFVCBOQU1FPT8sIENPTU1PTk5BTUU9PywgU1lNUFRPTVM9PywgUkFSSVRZPT8sIFNFVkVSSVRZPT8sIENVUkU9PywgVFJFQVRNRU5UPT8sIE5BVFVSQUxUUkVBVE1FTlQ9PywgU1RST05HQUdBSU5TVD0/IFdIRVJFIElEPT9cIiwgW3NpY2tuZXNzLk5hbWUsIHNpY2tuZXNzLkNvbW1vbk5hbWUsIHNpY2tuZXNzLlN5bXB0b21zLCBzaWNrbmVzcy5SYXJpdHksIHNpY2tuZXNzLlNldmVyaXR5LCBzaWNrbmVzcy5DdXJlLCBzaWNrbmVzcy5UcmVhdG1lbnQsIHNpY2tuZXNzLk5hdHVyYWxUcmVhdG1lbnQsIHNpY2tuZXNzLlN0cm9uZ0FnYWluc3RdKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcbiAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGEgU2lja25lc3MuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNpY2tuZXNzSWQgU2lja25lc3MgSUQgdG8gZGVsZXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIGRlbGV0ZWQuICBcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBkZWxldGUoc2lja25lc3NJZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBkZWxldGUgU2lja25lc3NcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYFNJQ0tORVNTRVNgIFdIRVJFIElEPT8nLCBbc2lja25lc3NJZF0pO1xuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcblxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG59XG4iXX0=