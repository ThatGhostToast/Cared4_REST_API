"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/*
Model for our users in the database
*/
var User = /*#__PURE__*/function () {
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
   * Getter $id
   * @return {number }
   */


  (0, _createClass2.default)(User, [{
    key: "Id",
    get: function get() {
      return this.id;
    }
    /**
     * Setter $id
     * @param {number } value
     */
    ,
    set: function set(value) {
      this.id = value;
    }
    /**
     * Getter $firstName
     * @return {string }
     */

  }, {
    key: "FirstName",
    get: function get() {
      return this.firstName;
    }
    /**
     * Setter $firstName
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.firstName = value;
    }
    /**
     * Getter $lastName
     * @return {string }
     */

  }, {
    key: "LastName",
    get: function get() {
      return this.lastName;
    }
    /**
     * Setter $lastName
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.lastName = value;
    }
    /**
     * Getter $email
     * @return {string }
     */

  }, {
    key: "Email",
    get: function get() {
      return this.email;
    }
    /**
     * Setter $email
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.email = value;
    }
    /**
     * Getter $password
     * @return {string }
     */

  }, {
    key: "Password",
    get: function get() {
      return this.password;
    }
    /**
     * Setter $password
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.password = value;
    }
    /**
     * Getter $birthday
     * @return {string }
     */

  }, {
    key: "Birthday",
    get: function get() {
      return this.birthday;
    }
    /**
     * Setter $birthday
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.birthday = value;
    }
    /**
     * Getter $sex
     * @return {string }
     */

  }, {
    key: "Sex",
    get: function get() {
      return this.sex;
    }
    /**
     * Setter $sex
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.sex = value;
    }
    /**
     * Getter $conditions
     * @return {string }
     */

  }, {
    key: "Conditions",
    get: function get() {
      return this.conditions;
    }
    /**
     * Setter $conditions
     * @param {string } value
     */
    ,
    set: function set(value) {
      this.conditions = value;
    }
    /**
     * Getter $image
     * @return {number }
     */

  }, {
    key: "Image",
    get: function get() {
      return this.image;
    }
    /**
     * Setter $image
     * @param {number } value
     */
    ,
    set: function set(value) {
      this.image = value;
    }
  }]);
  return User;
}();

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiVXNlciIsImlkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYmlydGhkYXkiLCJzZXgiLCJjb25kaXRpb25zIiwiaW1hZ2UiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0lBRWFBLEk7QUFXWCxnQkFBWUMsRUFBWixFQUF1QkMsU0FBdkIsRUFBeUNDLFFBQXpDLEVBQTBEQyxLQUExRCxFQUF3RUMsUUFBeEUsRUFBeUZDLFFBQXpGLEVBQTBHQyxHQUExRyxFQUFzSEMsVUFBdEgsRUFBeUlDLEtBQXpJLEVBQXdKO0FBQUE7QUFBQSw4Q0FWbkksQ0FBQyxDQVVrSTtBQUFBLHFEQVQ1SCxFQVM0SDtBQUFBLG9EQVI3SCxFQVE2SDtBQUFBLGlEQVBoSSxFQU9nSTtBQUFBLG9EQU43SCxFQU02SDtBQUFBLG9EQUw3SCxFQUs2SDtBQUFBLCtDQUpsSSxFQUlrSTtBQUFBLHNEQUgzSCxFQUcySDtBQUFBLGlEQUZoSSxDQUVnSTtBQUN0SixTQUFLUixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7QUFHQztBQUNKO0FBQ0E7QUFDQTs7Ozs7U0FDQyxlQUF5QjtBQUN4QixhQUFPLEtBQUtSLEVBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQWNTLEtBQWQsRUFBOEI7QUFDN0IsV0FBS1QsRUFBTCxHQUFVUyxLQUFWO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQWdDO0FBQy9CLGFBQU8sS0FBS1IsU0FBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBcUJRLEtBQXJCLEVBQXFDO0FBQ3BDLFdBQUtSLFNBQUwsR0FBaUJRLEtBQWpCO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQStCO0FBQzlCLGFBQU8sS0FBS1AsUUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBb0JPLEtBQXBCLEVBQW9DO0FBQ25DLFdBQUtQLFFBQUwsR0FBZ0JPLEtBQWhCO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQTRCO0FBQzNCLGFBQU8sS0FBS04sS0FBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBaUJNLEtBQWpCLEVBQWlDO0FBQ2hDLFdBQUtOLEtBQUwsR0FBYU0sS0FBYjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0FDQyxlQUErQjtBQUM5QixhQUFPLEtBQUtMLFFBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQW9CSyxLQUFwQixFQUFvQztBQUNuQyxXQUFLTCxRQUFMLEdBQWdCSyxLQUFoQjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0FDQyxlQUErQjtBQUM5QixhQUFPLEtBQUtKLFFBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQW9CSSxLQUFwQixFQUFvQztBQUNuQyxXQUFLSixRQUFMLEdBQWdCSSxLQUFoQjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0FDQyxlQUEwQjtBQUN6QixhQUFPLEtBQUtILEdBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQWVHLEtBQWYsRUFBK0I7QUFDOUIsV0FBS0gsR0FBTCxHQUFXRyxLQUFYO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQWlDO0FBQ2hDLGFBQU8sS0FBS0YsVUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBc0JFLEtBQXRCLEVBQXNDO0FBQ3JDLFdBQUtGLFVBQUwsR0FBa0JFLEtBQWxCO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQTRCO0FBQzNCLGFBQU8sS0FBS0QsS0FBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBaUJDLEtBQWpCLEVBQWlDO0FBQ2hDLFdBQUtELEtBQUwsR0FBYUMsS0FBYjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk1vZGVsIGZvciBvdXIgdXNlcnMgaW4gdGhlIGRhdGFiYXNlXG4qL1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIGZpcnN0TmFtZTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBsYXN0TmFtZTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBiaXJ0aGRheTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBzZXg6IHN0cmluZyA9IFwiXCI7XG4gIHByaXZhdGUgY29uZGl0aW9uczogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBpbWFnZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLGZpcnN0TmFtZTogc3RyaW5nLGxhc3ROYW1lOiBzdHJpbmcsZW1haWw6IHN0cmluZyxwYXNzd29yZDogc3RyaW5nLGJpcnRoZGF5OiBzdHJpbmcsc2V4OiBzdHJpbmcsY29uZGl0aW9uczogc3RyaW5nLGltYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgdGhpcy5iaXJ0aGRheSA9IGJpcnRoZGF5O1xuICAgIHRoaXMuc2V4ID0gc2V4O1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkaWRcbiAgICAgKiBAcmV0dXJuIHtudW1iZXIgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0IElkKCk6IG51bWJlciAge1xuXHRcdHJldHVybiB0aGlzLmlkO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTZXR0ZXIgJGlkXG4gICAgICogQHBhcmFtIHtudW1iZXIgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0IElkKHZhbHVlOiBudW1iZXIgKSB7XG5cdFx0dGhpcy5pZCA9IHZhbHVlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgJGZpcnN0TmFtZVxuICAgICAqIEByZXR1cm4ge3N0cmluZyB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgRmlyc3ROYW1lKCk6IHN0cmluZyAge1xuXHRcdHJldHVybiB0aGlzLmZpcnN0TmFtZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRmaXJzdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgRmlyc3ROYW1lKHZhbHVlOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5maXJzdE5hbWUgPSB2YWx1ZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyICRsYXN0TmFtZVxuICAgICAqIEByZXR1cm4ge3N0cmluZyB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgTGFzdE5hbWUoKTogc3RyaW5nICB7XG5cdFx0cmV0dXJuIHRoaXMubGFzdE5hbWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFNldHRlciAkbGFzdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgTGFzdE5hbWUodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmxhc3ROYW1lID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkZW1haWxcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0IEVtYWlsKCk6IHN0cmluZyAge1xuXHRcdHJldHVybiB0aGlzLmVtYWlsO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTZXR0ZXIgJGVtYWlsXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0IEVtYWlsKHZhbHVlOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5lbWFpbCA9IHZhbHVlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgJHBhc3N3b3JkXG4gICAgICogQHJldHVybiB7c3RyaW5nIH1cbiAgICAgKi9cblx0cHVibGljIGdldCBQYXNzd29yZCgpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5wYXNzd29yZDtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRwYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCBQYXNzd29yZCh2YWx1ZTogc3RyaW5nICkge1xuXHRcdHRoaXMucGFzc3dvcmQgPSB2YWx1ZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyICRiaXJ0aGRheVxuICAgICAqIEByZXR1cm4ge3N0cmluZyB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgQmlydGhkYXkoKTogc3RyaW5nICB7XG5cdFx0cmV0dXJuIHRoaXMuYmlydGhkYXk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFNldHRlciAkYmlydGhkYXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgQmlydGhkYXkodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmJpcnRoZGF5ID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkc2V4XG4gICAgICogQHJldHVybiB7c3RyaW5nIH1cbiAgICAgKi9cblx0cHVibGljIGdldCBTZXgoKTogc3RyaW5nICB7XG5cdFx0cmV0dXJuIHRoaXMuc2V4O1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBTZXR0ZXIgJHNleFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCBTZXgodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLnNleCA9IHZhbHVlO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgJGNvbmRpdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0IENvbmRpdGlvbnMoKTogc3RyaW5nICB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZGl0aW9ucztcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRjb25kaXRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0IENvbmRpdGlvbnModmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmNvbmRpdGlvbnMgPSB2YWx1ZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyICRpbWFnZVxuICAgICAqIEByZXR1cm4ge251bWJlciB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgSW1hZ2UoKTogbnVtYmVyICB7XG5cdFx0cmV0dXJuIHRoaXMuaW1hZ2U7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFNldHRlciAkaW1hZ2VcbiAgICAgKiBAcGFyYW0ge251bWJlciB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgSW1hZ2UodmFsdWU6IG51bWJlciApIHtcblx0XHR0aGlzLmltYWdlID0gdmFsdWU7XG5cdH1cblxufVxuIl19