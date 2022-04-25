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
                                         ,---------,__
                                     ,--'             ',
            ,_--------,____,        /                   \
          ,/                '.     /            ,' \     \
         /                    \   /   ,______,'    \,     ',
       ,/     ,_____.-----,    \  |  /~~-_     _~~~-|      |
     _/      /             \    ',|  ).-,   -. (     |
    (       / ,---_     _---\     \  |     ;          |    ;
    /      ;,  ~-   ,~(      | |    ;_,         |   ;
    )      /|         :     |      \ |  '__.___`     ;    |
   /       \_        ._;    :      |\ \  `.___.'     /    |
  /          |    ,___.__` ,'      ; \ \.        ,'|    /
 /            \,   `.__.' /        )  \,|`------'  |__,/
(           _ / `-._____.;       /   ,- |   ___,---'   \.
 )        ,' |           /       ) ,/ ,( | / )       __.'|\.
(      _.'   |          /|\     / ,|/' \\| | |   __.'    |  \.
(    :'       \         ;\ \   /,' ;    | \) |_.'        |    \.
\     )`--__,  \        /_; |,'/ \  |   '/' /         __/ \.    \
 `-,__'      \. \.     /'  \/~`;  \  |  |  /  _______'      `-.__\
 /     \,      \. \.  /    {~{*}~} \ |  | /_-'              /   `,_
|        |       \, \/      `~;~'   \|  | |                |        `,

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
    key: "$id",
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
    key: "$firstName",
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
    key: "$lastName",
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
    key: "$email",
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
    key: "$password",
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
    key: "$birthday",
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
    key: "$sex",
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
    key: "$conditions",
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
    key: "$image",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiVXNlciIsImlkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYmlydGhkYXkiLCJzZXgiLCJjb25kaXRpb25zIiwiaW1hZ2UiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFFYUEsSTtBQVdYLGdCQUFZQyxFQUFaLEVBQXVCQyxTQUF2QixFQUF5Q0MsUUFBekMsRUFBMERDLEtBQTFELEVBQXdFQyxRQUF4RSxFQUF5RkMsUUFBekYsRUFBMEdDLEdBQTFHLEVBQXNIQyxVQUF0SCxFQUF5SUMsS0FBekksRUFBd0o7QUFBQTtBQUFBLDhDQVZuSSxDQUFDLENBVWtJO0FBQUEscURBVDVILEVBUzRIO0FBQUEsb0RBUjdILEVBUTZIO0FBQUEsaURBUGhJLEVBT2dJO0FBQUEsb0RBTjdILEVBTTZIO0FBQUEsb0RBTDdILEVBSzZIO0FBQUEsK0NBSmxJLEVBSWtJO0FBQUEsc0RBSDNILEVBRzJIO0FBQUEsaURBRmhJLENBRWdJO0FBQ3RKLFNBQUtSLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDRDtBQUdDO0FBQ0o7QUFDQTtBQUNBOzs7OztTQUNDLGVBQTBCO0FBQ3pCLGFBQU8sS0FBS1IsRUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBZVMsS0FBZixFQUErQjtBQUM5QixXQUFLVCxFQUFMLEdBQVVTLEtBQVY7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7O1NBQ0MsZUFBaUM7QUFDaEMsYUFBTyxLQUFLUixTQUFaO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7U0FDQyxhQUFzQlEsS0FBdEIsRUFBc0M7QUFDckMsV0FBS1IsU0FBTCxHQUFpQlEsS0FBakI7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7O1NBQ0MsZUFBZ0M7QUFDL0IsYUFBTyxLQUFLUCxRQUFaO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7U0FDQyxhQUFxQk8sS0FBckIsRUFBcUM7QUFDcEMsV0FBS1AsUUFBTCxHQUFnQk8sS0FBaEI7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOzs7O1NBQ0MsZUFBNkI7QUFDNUIsYUFBTyxLQUFLTixLQUFaO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7U0FDQyxhQUFrQk0sS0FBbEIsRUFBa0M7QUFDakMsV0FBS04sS0FBTCxHQUFhTSxLQUFiO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQWdDO0FBQy9CLGFBQU8sS0FBS0wsUUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBcUJLLEtBQXJCLEVBQXFDO0FBQ3BDLFdBQUtMLFFBQUwsR0FBZ0JLLEtBQWhCO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQWdDO0FBQy9CLGFBQU8sS0FBS0osUUFBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBcUJJLEtBQXJCLEVBQXFDO0FBQ3BDLFdBQUtKLFFBQUwsR0FBZ0JJLEtBQWhCO0FBQ0E7QUFFRTtBQUNKO0FBQ0E7QUFDQTs7OztTQUNDLGVBQTJCO0FBQzFCLGFBQU8sS0FBS0gsR0FBWjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7O1NBQ0MsYUFBZ0JHLEtBQWhCLEVBQWdDO0FBQy9CLFdBQUtILEdBQUwsR0FBV0csS0FBWDtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0FDQyxlQUFrQztBQUNqQyxhQUFPLEtBQUtGLFVBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQXVCRSxLQUF2QixFQUF1QztBQUN0QyxXQUFLRixVQUFMLEdBQWtCRSxLQUFsQjtBQUNBO0FBRUU7QUFDSjtBQUNBO0FBQ0E7Ozs7U0FDQyxlQUE2QjtBQUM1QixhQUFPLEtBQUtELEtBQVo7QUFDQTtBQUVFO0FBQ0o7QUFDQTtBQUNBOztTQUNDLGFBQWtCQyxLQUFsQixFQUFrQztBQUNqQyxXQUFLRCxLQUFMLEdBQWFDLEtBQWI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwtLS0tLS0tLS0sX19cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsLS0nICAgICAgICAgICAgICcsXG4gICAgICAgICAgICAsXy0tLS0tLS0tLF9fX18sICAgICAgICAvICAgICAgICAgICAgICAgICAgIFxcXG4gICAgICAgICAgLC8gICAgICAgICAgICAgICAgJy4gICAgIC8gICAgICAgICAgICAsJyBcXCAgICAgXFxcbiAgICAgICAgIC8gICAgICAgICAgICAgICAgICAgIFxcICAgLyAgICxfX19fX18sJyAgICBcXCwgICAgICcsXG4gICAgICAgLC8gICAgICxfX19fXy4tLS0tLSwgICAgXFwgIHwgIC9+fi1fICAgICBffn5+LXwgICAgICB8XG4gICAgIF8vICAgICAgLyAgICAgICAgICAgICBcXCAgICAnLHwgICkuLSwgICAtLiAoICAgICB8XG4gICAgKCAgICAgICAvICwtLS1fICAgICBfLS0tXFwgICAgIFxcICB8ICAgICA7ICAgICAgICAgIHwgICAgO1xuICAgIC8gICAgICA7LCAgfi0gICAsfiggICAgICB8IHwgICAgO18sICAgICAgICAgfCAgIDtcbiAgICApICAgICAgL3wgICAgICAgICA6ICAgICB8ICAgICAgXFwgfCAgJ19fLl9fX2AgICAgIDsgICAgfFxuICAgLyAgICAgICBcXF8gICAgICAgIC5fOyAgICA6ICAgICAgfFxcIFxcICBgLl9fXy4nICAgICAvICAgIHxcbiAgLyAgICAgICAgICB8ICAgICxfX18uX19gICwnICAgICAgOyBcXCBcXC4gICAgICAgICwnfCAgICAvXG4gLyAgICAgICAgICAgIFxcLCAgIGAuX18uJyAvICAgICAgICApICBcXCx8YC0tLS0tLScgIHxfXywvXG4oICAgICAgICAgICBfIC8gYC0uX19fX18uOyAgICAgICAvICAgLC0gfCAgIF9fXywtLS0nICAgXFwuXG4gKSAgICAgICAgLCcgfCAgICAgICAgICAgLyAgICAgICApICwvICwoIHwgLyApICAgICAgIF9fLid8XFwuXG4oICAgICAgXy4nICAgfCAgICAgICAgICAvfFxcICAgICAvICx8LycgXFxcXHwgfCB8ICAgX18uJyAgICB8ICBcXC5cbiggICAgOicgICAgICAgXFwgICAgICAgICA7XFwgXFwgICAvLCcgOyAgICB8IFxcKSB8Xy4nICAgICAgICB8ICAgIFxcLlxuXFwgICAgIClgLS1fXywgIFxcICAgICAgICAvXzsgfCwnLyBcXCAgfCAgICcvJyAvICAgICAgICAgX18vIFxcLiAgICBcXFxuIGAtLF9fJyAgICAgIFxcLiBcXC4gICAgIC8nICBcXC9+YDsgIFxcICB8ICB8ICAvICBfX19fX19fJyAgICAgIGAtLl9fXFxcbiAvICAgICBcXCwgICAgICBcXC4gXFwuICAvICAgIHt+eyp9fn0gXFwgfCAgfCAvXy0nICAgICAgICAgICAgICAvICAgYCxfXG58ICAgICAgICB8ICAgICAgIFxcLCBcXC8gICAgICBgfjt+JyAgIFxcfCAgfCB8ICAgICAgICAgICAgICAgIHwgICAgICAgIGAsXG5cbk1vZGVsIGZvciBvdXIgdXNlcnMgaW4gdGhlIGRhdGFiYXNlXG4qL1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIGZpcnN0TmFtZTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBsYXN0TmFtZTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBiaXJ0aGRheTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBzZXg6IHN0cmluZyA9IFwiXCI7XG4gIHByaXZhdGUgY29uZGl0aW9uczogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSBpbWFnZTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLGZpcnN0TmFtZTogc3RyaW5nLGxhc3ROYW1lOiBzdHJpbmcsZW1haWw6IHN0cmluZyxwYXNzd29yZDogc3RyaW5nLGJpcnRoZGF5OiBzdHJpbmcsc2V4OiBzdHJpbmcsY29uZGl0aW9uczogc3RyaW5nLGltYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgdGhpcy5iaXJ0aGRheSA9IGJpcnRoZGF5O1xuICAgIHRoaXMuc2V4ID0gc2V4O1xuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnM7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkaWRcbiAgICAgKiBAcmV0dXJuIHtudW1iZXIgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRpZCgpOiBudW1iZXIgIHtcblx0XHRyZXR1cm4gdGhpcy5pZDtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRpZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkaWQodmFsdWU6IG51bWJlciApIHtcblx0XHR0aGlzLmlkID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkZmlyc3ROYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nIH1cbiAgICAgKi9cblx0cHVibGljIGdldCAkZmlyc3ROYW1lKCk6IHN0cmluZyAge1xuXHRcdHJldHVybiB0aGlzLmZpcnN0TmFtZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRmaXJzdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgJGZpcnN0TmFtZSh2YWx1ZTogc3RyaW5nICkge1xuXHRcdHRoaXMuZmlyc3ROYW1lID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkbGFzdE5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRsYXN0TmFtZSgpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5sYXN0TmFtZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRsYXN0TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkbGFzdE5hbWUodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmxhc3ROYW1lID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkZW1haWxcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRlbWFpbCgpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5lbWFpbDtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRlbWFpbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkZW1haWwodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmVtYWlsID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRwYXNzd29yZCgpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5wYXNzd29yZDtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRwYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkcGFzc3dvcmQodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLnBhc3N3b3JkID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkYmlydGhkYXlcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRiaXJ0aGRheSgpOiBzdHJpbmcgIHtcblx0XHRyZXR1cm4gdGhpcy5iaXJ0aGRheTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRiaXJ0aGRheVxuICAgICAqIEBwYXJhbSB7c3RyaW5nIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkYmlydGhkYXkodmFsdWU6IHN0cmluZyApIHtcblx0XHR0aGlzLmJpcnRoZGF5ID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkc2V4XG4gICAgICogQHJldHVybiB7c3RyaW5nIH1cbiAgICAgKi9cblx0cHVibGljIGdldCAkc2V4KCk6IHN0cmluZyAge1xuXHRcdHJldHVybiB0aGlzLnNleDtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRzZXhcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHZhbHVlXG4gICAgICovXG5cdHB1YmxpYyBzZXQgJHNleCh2YWx1ZTogc3RyaW5nICkge1xuXHRcdHRoaXMuc2V4ID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkY29uZGl0aW9uc1xuICAgICAqIEByZXR1cm4ge3N0cmluZyB9XG4gICAgICovXG5cdHB1YmxpYyBnZXQgJGNvbmRpdGlvbnMoKTogc3RyaW5nICB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZGl0aW9ucztcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRjb25kaXRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfSB2YWx1ZVxuICAgICAqL1xuXHRwdWJsaWMgc2V0ICRjb25kaXRpb25zKHZhbHVlOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5jb25kaXRpb25zID0gdmFsdWU7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEdldHRlciAkaW1hZ2VcbiAgICAgKiBAcmV0dXJuIHtudW1iZXIgfVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0ICRpbWFnZSgpOiBudW1iZXIgIHtcblx0XHRyZXR1cm4gdGhpcy5pbWFnZTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogU2V0dGVyICRpbWFnZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyIH0gdmFsdWVcbiAgICAgKi9cblx0cHVibGljIHNldCAkaW1hZ2UodmFsdWU6IG51bWJlciApIHtcblx0XHR0aGlzLmltYWdlID0gdmFsdWU7XG5cdH1cblxufVxuIl19