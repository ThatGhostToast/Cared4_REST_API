"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Model for our users in the database
 * @export
 * @class User
 */
var User = /*#__PURE__*/function () {
  /**
   * Id of the user
   * @private
   * @type {number}
   * @memberof User
   */

  /**
   * The user's first name
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's last name
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's email
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's password
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's birthday
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's sex
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's conditions
   * @private
   * @type {string}
   * @memberof User
   */

  /**
   * The user's profile picture
   * @private
   * @type {number}
   * @memberof User
   */

  /**
   * User Constructor
   * @constructor
   * @param id Id of the user
   * @param firstName The user's first name
   * @param lastName The user's last name
   * @param email The user's email
   * @param password The user's password
   * @param birthday The user's birthday
   * @param sex The user's sex
   * @param conditions The user's pre existing conditions
   * @param image The user's profile picture
   */
  function User(id, firstName, lastName, email, password, birthday, sex, conditions, image) {
    (0, _classCallCheck2.default)(this, User);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "firstName", "");
    (0, _defineProperty2.default)(this, "lastName", "");
    (0, _defineProperty2.default)(this, "email", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "birthday", "");
    (0, _defineProperty2.default)(this, "sex", "");
    (0, _defineProperty2.default)(this, "conditions", "");
    (0, _defineProperty2.default)(this, "image", 0);
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.sex = sex;
    this.conditions = conditions;
    this.image = image;
  }
  /**
   * Method to get the Id of the user
   *
   * @type {number}
   * @memberof User
   */


  (0, _createClass2.default)(User, [{
    key: "Id",
    get: function get() {
      return this.id;
    }
    /**
     * Method to set the Id of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.id = value;
    }
    /**
     * Method to get the first name of the user
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "FirstName",
    get: function get() {
      return this.firstName;
    }
    /**
     * Method to set the first name of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.firstName = value;
    }
    /**
     * Method to get the last name of the user
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "LastName",
    get: function get() {
      return this.lastName;
    }
    /**
     * Method to set the last name of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.lastName = value;
    }
    /**
     * Method to get the email of the user
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Email",
    get: function get() {
      return this.email;
    }
    /**
     * Method to set the email of the user
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.email = value;
    }
    /**
     * Method to get the user's password
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Password",
    get: function get() {
      return this.password;
    }
    /**
     * Method to set the user's password
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.password = value;
    }
    /**
     * Method to get the user's birthday
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Birthday",
    get: function get() {
      return this.birthday;
    }
    /**
     * Method to set the user's birthday
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.birthday = value;
    }
    /**
     * Method to get the user's sex
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Sex",
    get: function get() {
      return this.sex;
    }
    /**
     * Method to set the user's sex
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.sex = value;
    }
    /**
     * Method to get the user's pre existing conditions
     *
     * @type {string}
     * @memberof User
     */

  }, {
    key: "Conditions",
    get: function get() {
      return this.conditions;
    }
    /**
     * Method to set the user's pre existing conditions
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.conditions = value;
    }
    /**
     * Method to get the user's profile picture
     *
     * @type {number}
     * @memberof User
     */

  }, {
    key: "Image",
    get: function get() {
      return this.image;
    }
    /**
     * Method to set the user's profile picture
     *
     * @memberof User
     */
    ,
    set: function set(value) {
      this.image = value;
    }
  }]);
  return User;
}();

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiVXNlciIsImlkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYmlydGhkYXkiLCJzZXgiLCJjb25kaXRpb25zIiwiaW1hZ2UiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxJO0FBQ1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxnQkFBWUMsRUFBWixFQUF1QkMsU0FBdkIsRUFBeUNDLFFBQXpDLEVBQTBEQyxLQUExRCxFQUF3RUMsUUFBeEUsRUFBeUZDLFFBQXpGLEVBQTBHQyxHQUExRyxFQUFzSEMsVUFBdEgsRUFBeUlDLEtBQXpJLEVBQ0E7QUFBQTtBQUFBLDhDQXhFcUIsQ0FBQyxDQXdFdEI7QUFBQSxxREFqRTRCLEVBaUU1QjtBQUFBLG9EQTFEMkIsRUEwRDNCO0FBQUEsaURBbkR3QixFQW1EeEI7QUFBQSxvREE1QzJCLEVBNEMzQjtBQUFBLG9EQXJDMkIsRUFxQzNCO0FBQUEsK0NBOUJzQixFQThCdEI7QUFBQSxzREF2QjZCLEVBdUI3QjtBQUFBLGlEQWhCd0IsQ0FnQnhCO0FBQ0ksU0FBS1IsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNIO0FBR0E7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtSLEVBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBY1MsS0FBZCxFQUNBO0FBQ0gsV0FBS1QsRUFBTCxHQUFVUyxLQUFWO0FBQ0E7QUFFRztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSyxlQUNBO0FBQ0gsYUFBTyxLQUFLUixTQUFaO0FBQ0E7QUFDRztBQUNMO0FBQ0E7QUFDQTtBQUNBOztTQUNLLGFBQXFCUSxLQUFyQixFQUNBO0FBQ0gsV0FBS1IsU0FBTCxHQUFpQlEsS0FBakI7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtQLFFBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBb0JPLEtBQXBCLEVBQ0E7QUFDSCxXQUFLUCxRQUFMLEdBQWdCTyxLQUFoQjtBQUNBO0FBRUc7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS04sS0FBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFpQk0sS0FBakIsRUFDQTtBQUNILFdBQUtOLEtBQUwsR0FBYU0sS0FBYjtBQUNBO0FBRUc7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ssZUFDQTtBQUNILGFBQU8sS0FBS0wsUUFBWjtBQUNBO0FBQ0c7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7U0FDSyxhQUFvQkssS0FBcEIsRUFDQTtBQUNILFdBQUtMLFFBQUwsR0FBZ0JLLEtBQWhCO0FBQ0E7QUFFRztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSyxlQUNBO0FBQ0gsYUFBTyxLQUFLSixRQUFaO0FBQ0E7QUFDRztBQUNMO0FBQ0E7QUFDQTtBQUNBOztTQUNLLGFBQW9CSSxLQUFwQixFQUNBO0FBQ0gsV0FBS0osUUFBTCxHQUFnQkksS0FBaEI7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtILEdBQVo7QUFDQTtBQUNHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBZUcsS0FBZixFQUNBO0FBQ0gsV0FBS0gsR0FBTCxHQUFXRyxLQUFYO0FBQ0E7QUFFRztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSyxlQUNBO0FBQ0gsYUFBTyxLQUFLRixVQUFaO0FBQ0E7QUFDRztBQUNMO0FBQ0E7QUFDQTtBQUNBOztTQUNLLGFBQXNCRSxLQUF0QixFQUNBO0FBQ0gsV0FBS0YsVUFBTCxHQUFrQkUsS0FBbEI7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNLLGVBQ0E7QUFDSCxhQUFPLEtBQUtELEtBQVo7QUFDQTtBQUVHO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ssYUFBaUJDLEtBQWpCLEVBQ0E7QUFDSCxXQUFLRCxLQUFMLEdBQWFDLEtBQWI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kZWwgZm9yIG91ciB1c2VycyBpbiB0aGUgZGF0YWJhc2VcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBVc2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgICAvKipcbiAgICAgKiBJZCBvZiB0aGUgdXNlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyJ3MgZmlyc3QgbmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgZmlyc3ROYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyJ3MgbGFzdCBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBsYXN0TmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIGVtYWlsXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIGJpcnRoZGF5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBiaXJ0aGRheTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIHNleFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgc2V4OiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyJ3MgY29uZGl0aW9uc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgY29uZGl0aW9uczogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcidzIHByb2ZpbGUgcGljdHVyZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAqL1xuICAgIHByaXZhdGUgaW1hZ2U6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBVc2VyIENvbnN0cnVjdG9yXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSB1c2VyXG4gICAgICogQHBhcmFtIGZpcnN0TmFtZSBUaGUgdXNlcidzIGZpcnN0IG5hbWVcbiAgICAgKiBAcGFyYW0gbGFzdE5hbWUgVGhlIHVzZXIncyBsYXN0IG5hbWVcbiAgICAgKiBAcGFyYW0gZW1haWwgVGhlIHVzZXIncyBlbWFpbFxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICogQHBhcmFtIGJpcnRoZGF5IFRoZSB1c2VyJ3MgYmlydGhkYXlcbiAgICAgKiBAcGFyYW0gc2V4IFRoZSB1c2VyJ3Mgc2V4XG4gICAgICogQHBhcmFtIGNvbmRpdGlvbnMgVGhlIHVzZXIncyBwcmUgZXhpc3RpbmcgY29uZGl0aW9uc1xuICAgICAqIEBwYXJhbSBpbWFnZSBUaGUgdXNlcidzIHByb2ZpbGUgcGljdHVyZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZmlyc3ROYW1lOiBzdHJpbmcsbGFzdE5hbWU6IHN0cmluZyxlbWFpbDogc3RyaW5nLHBhc3N3b3JkOiBzdHJpbmcsYmlydGhkYXk6IHN0cmluZyxzZXg6IHN0cmluZyxjb25kaXRpb25zOiBzdHJpbmcsaW1hZ2U6IG51bWJlcikgXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLmJpcnRoZGF5ID0gYmlydGhkYXk7XG4gICAgICAgIHRoaXMuc2V4ID0gc2V4O1xuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zO1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgfVxuXG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIElkIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5pZDtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgSWQgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgSWQodmFsdWU6IG51bWJlciApIFxuICAgICB7XG5cdFx0dGhpcy5pZCA9IHZhbHVlO1xuXHR9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIGZpcnN0IG5hbWUgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBnZXQgRmlyc3ROYW1lKCk6IHN0cmluZyAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5maXJzdE5hbWU7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGZpcnN0IG5hbWUgb2YgdGhlIHVzZXJcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgRmlyc3ROYW1lKHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMuZmlyc3ROYW1lID0gdmFsdWU7XG5cdH1cblxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIGdldCB0aGUgbGFzdCBuYW1lIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IExhc3ROYW1lKCk6IHN0cmluZyAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5sYXN0TmFtZTtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgbGFzdCBuYW1lIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IExhc3ROYW1lKHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMubGFzdE5hbWUgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBlbWFpbCBvZiB0aGUgdXNlclxuICAgICAgKlxuICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIGdldCBFbWFpbCgpOiBzdHJpbmcgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMuZW1haWw7XG5cdH1cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGVtYWlsIG9mIHRoZSB1c2VyXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IEVtYWlsKHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMuZW1haWwgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICpcbiAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBnZXQgUGFzc3dvcmQoKTogc3RyaW5nICBcbiAgICAge1xuXHRcdHJldHVybiB0aGlzLnBhc3N3b3JkO1xuXHR9XG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgUGFzc3dvcmQodmFsdWU6IHN0cmluZykgXG4gICAgIHtcblx0XHR0aGlzLnBhc3N3b3JkID0gdmFsdWU7XG5cdH1cblxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIGdldCB0aGUgdXNlcidzIGJpcnRoZGF5XG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IEJpcnRoZGF5KCk6IHN0cmluZyAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5iaXJ0aGRheTtcblx0fVxuICAgICAvKipcbiAgICAgICogTWV0aG9kIHRvIHNldCB0aGUgdXNlcidzIGJpcnRoZGF5XG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IEJpcnRoZGF5KHZhbHVlOiBzdHJpbmcgKSBcbiAgICAge1xuXHRcdHRoaXMuYmlydGhkYXkgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB1c2VyJ3Mgc2V4XG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IFNleCgpOiBzdHJpbmcgIFxuICAgICB7XG5cdFx0cmV0dXJuIHRoaXMuc2V4O1xuXHR9XG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB1c2VyJ3Mgc2V4XG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IFNleCh2YWx1ZTogc3RyaW5nICkgXG4gICAgIHtcblx0XHR0aGlzLnNleCA9IHZhbHVlO1xuXHR9XG5cbiAgICAgLyoqXG4gICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHVzZXIncyBwcmUgZXhpc3RpbmcgY29uZGl0aW9uc1xuICAgICAgKlxuICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgKiBAbWVtYmVyb2YgVXNlclxuICAgICAgKi9cbiAgICAgcHVibGljIGdldCBDb25kaXRpb25zKCk6IHN0cmluZyAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5jb25kaXRpb25zO1xuXHR9XG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB1c2VyJ3MgcHJlIGV4aXN0aW5nIGNvbmRpdGlvbnNcbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIFVzZXJcbiAgICAgICovXG4gICAgIHB1YmxpYyBzZXQgQ29uZGl0aW9ucyh2YWx1ZTogc3RyaW5nICkgXG4gICAgIHtcblx0XHR0aGlzLmNvbmRpdGlvbnMgPSB2YWx1ZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB1c2VyJ3MgcHJvZmlsZSBwaWN0dXJlXG4gICAgICAqXG4gICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgZ2V0IEltYWdlKCk6IG51bWJlciAgXG4gICAgIHtcblx0XHRyZXR1cm4gdGhpcy5pbWFnZTtcblx0fVxuXG4gICAgIC8qKlxuICAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB1c2VyJ3MgcHJvZmlsZSBwaWN0dXJlXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBVc2VyXG4gICAgICAqL1xuICAgICBwdWJsaWMgc2V0IEltYWdlKHZhbHVlOiBudW1iZXIgKSBcbiAgICAge1xuXHRcdHRoaXMuaW1hZ2UgPSB2YWx1ZTtcblx0fVxuXG59XG4iXX0=