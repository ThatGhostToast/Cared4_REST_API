"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sicknesses = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

//                    ______
//                 .-"      "-.
//                /            \
//   _           |              |          _
//   ( \         |,  .-.  .-.  ,|         / )
//   > "=._      | )(__/  \__)( |     _.=" <
//   (_/"=._"=._ |/     /\     \| _.="_.="\_)
//          "=._ (_     ^^     _)"_.="
//              "=\__|IIIIII|__/="
//             _.="| \IIIIII/ |"=._
//   _     _.="_.="\          /"=._"=._     _
//  ( \_.="_.="     `--------`     "=._"=._/ )
//  > _.="                            "=._ <
//  (_/                                    \_)

/**
 * Model of the different sicknesses
 * @export
 * @class Sicknesses
 */
var Sicknesses = /*#__PURE__*/function () {
  /**
   * Id of the sickness
   * @private
   * @type {number}
   * @memberof Sicknesses
   */

  /**
   * Scientific name of the sickness
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * Common name of the sickness
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * Symptoms of the sickness
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * Rarity of the sickness
   * @private
   * @type {number}
   * @memberof Sicknesses
   */

  /**
   * How severe the sickness is
   * @private
   * @type {number}
   * @memberof Sicknesses
   */

  /**
   * The cure for the sickness
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * How to treat the sickness if there is no cure
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * Natural treatments for the sickness
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * What pre existing conditions the sickness is strong against
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * Sickness Constructor
   * @constructor
   * @param id Id of the sickness
   * @param name Scientific name of the sickness
   * @param commonName Common name of the sickness
   * @param symptoms Symptoms of the sickness
   * @param rarity Rarity of the sickness
   * @param severity How severe the sickness is
   * @param cure The cure for the sickness
   * @param treatment How to treat the sickness if there is no cure
   * @param naturalTreatment Natural treatments for the sickness
   * @param strongAgainst What pre existing conditions the sickness is strong against
   */
  function Sicknesses(id, name, commonName, symptoms, rarity, severity, cure, treatment, naturalTreatment, strongAgainst) {
    (0, _classCallCheck2.default)(this, Sicknesses);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "commonName", "");
    (0, _defineProperty2.default)(this, "symptoms", "");
    (0, _defineProperty2.default)(this, "rarity", -1);
    (0, _defineProperty2.default)(this, "severity", -1);
    (0, _defineProperty2.default)(this, "cure", "");
    (0, _defineProperty2.default)(this, "treatment", "");
    (0, _defineProperty2.default)(this, "naturalTreatment", "");
    (0, _defineProperty2.default)(this, "strongAgainst", "");
    this.id = id;
    this.name = name;
    this.commonName = commonName;
    this.symptoms = symptoms;
    this.rarity = rarity;
    this.severity = severity;
    this.cure = cure;
    this.treatment = treatment;
    this.naturalTreatment = naturalTreatment;
    this.strongAgainst = strongAgainst;
  } //=-=-=-=-=-=-=-=-=-=-=
  //Getters and Setters
  //=-=-=-=-=-=-=-=-=-=-=

  /**
   * Method to get the ID of a sickness
   *
   * @type {number}
   * @memberof Sicknesses
   */


  (0, _createClass2.default)(Sicknesses, [{
    key: "Id",
    get: function get() {
      return this.id;
    }
    /**
     * Method to set the ID of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(id) {
      this.id = id;
    }
    /**
     * Method to get the name of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Name",
    get: function get() {
      return this.name;
    }
    /**
     * Method to set the name of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(name) {
      this.name = name;
    }
    /**
     * Method to get the common name of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "CommonName",
    get: function get() {
      return this.commonName;
    }
    /**
     * Method to set the common name of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(commonName) {
      this.commonName = commonName;
    }
    /**
     * Method to get the symptoms of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Symptoms",
    get: function get() {
      return this.symptoms;
    }
    /**
     * Method to set the symptoms of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(symptoms) {
      this.symptoms = symptoms;
    }
    /**
     * Method to get the rarity of a sickness
     *
     * @type {number}
     * @memberof Sicknesses
     */

  }, {
    key: "Rarity",
    get: function get() {
      return this.rarity;
    }
    /**
     * Method to set the rarity of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(rarity) {
      this.rarity = rarity;
    }
    /**
     * Method to get the severity of a sickness
     *
     * @type {number}
     * @memberof Sicknesses
     */

  }, {
    key: "Severity",
    get: function get() {
      return this.severity;
    }
    /**
     * Method to set the severity of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(severity) {
      this.severity = severity;
    }
    /**
     * Method to get the cure of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Cure",
    get: function get() {
      return this.cure;
    }
    /**
     * Method to set the cure of a sickness
     *
     * @memberof Sicknesses
     */

  }, {
    key: "Curt",
    set: function set(cure) {
      this.cure = cure;
    }
    /**
     * Method to get the treatment for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Treatment",
    get: function get() {
      return this.treatment;
    }
    /**
     * Method to set the treatment for a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(treatment) {
      this.treatment = treatment;
    }
    /**
     * Method to get the natural treatment for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "NaturalTreatment",
    get: function get() {
      return this.naturalTreatment;
    }
    /**
     * Method to set the natural treatment for a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(naturalTreatment) {
      this.naturalTreatment = naturalTreatment;
    }
    /**
     * Method to get the strong against for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "StrongAgainst",
    get: function get() {
      return this.strongAgainst;
    }
    /**
     * Method to set the strong against for a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(strongAgainst) {
      this.strongAgainst = strongAgainst;
    }
  }]);
  return Sicknesses;
}();

exports.Sicknesses = Sicknesses;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvU2lja25lc3Nlcy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc2VzIiwiaWQiLCJuYW1lIiwiY29tbW9uTmFtZSIsInN5bXB0b21zIiwicmFyaXR5Iiwic2V2ZXJpdHkiLCJjdXJlIiwidHJlYXRtZW50IiwibmF0dXJhbFRyZWF0bWVudCIsInN0cm9uZ0FnYWluc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxVO0FBRVQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxzQkFBWUMsRUFBWixFQUF1QkMsSUFBdkIsRUFBb0NDLFVBQXBDLEVBQXVEQyxRQUF2RCxFQUF3RUMsTUFBeEUsRUFBdUZDLFFBQXZGLEVBQXdHQyxJQUF4RyxFQUFxSEMsU0FBckgsRUFBdUlDLGdCQUF2SSxFQUFnS0MsYUFBaEssRUFDQTtBQUFBO0FBQUEsOENBaEZxQixDQUFDLENBZ0Z0QjtBQUFBLGdEQXpFdUIsRUF5RXZCO0FBQUEs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QUFMLEdBQXdCQSxnQkFBeEI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQ0E7QUFDSSxhQUFPLEtBQUtDLGFBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ksYUFBa0JBLGFBQWxCLEVBQ0E7QUFDSSxXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gICAgICAgICAgICAgICAgICAgIF9fX19fX1xuLy8gICAgICAgICAgICAgICAgIC4tXCIgICAgICBcIi0uXG4vLyAgICAgICAgICAgICAgICAvICAgICAgICAgICAgXFxcbi8vICAgXyAgICAgICAgICAgfCAgICAgICAgICAgICAgfCAgICAgICAgICBfXG4vLyAgICggXFwgICAgICAgICB8LCAgLi0uICAuLS4gICx8ICAgICAgICAgLyApXG4vLyAgID4gXCI9Ll8gICAgICB8ICkoX18vICBcXF9fKSggfCAgICAgXy49XCIgPFxuLy8gICAoXy9cIj0uX1wiPS5fIHwvICAgICAvXFwgICAgIFxcfCBfLj1cIl8uPVwiXFxfKVxuLy8gICAgICAgICAgXCI9Ll8gKF8gICAgIF5eICAgICBfKVwiXy49XCJcbi8vICAgICAgICAgICAgICBcIj1cXF9ffElJSUlJSXxfXy89XCJcbi8vICAgICAgICAgICAgIF8uPVwifCBcXElJSUlJSS8gfFwiPS5fXG4vLyAgIF8gICAgIF8uPVwiXy49XCJcXCAgICAgICAgICAvXCI9Ll9cIj0uXyAgICAgX1xuLy8gICggXFxfLj1cIl8uPVwiICAgICBgLS0tLS0tLS1gICAgICBcIj0uX1wiPS5fLyApXG4vLyAgPiBfLj1cIiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj0uXyA8XG4vLyAgKF8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxfKVxuXG4vKipcbiAqIE1vZGVsIG9mIHRoZSBkaWZmZXJlbnQgc2lja25lc3Nlc1xuICogQGV4cG9ydFxuICogQGNsYXNzIFNpY2tuZXNzZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFNpY2tuZXNzZXMgXG57XG4gICAgLyoqXG4gICAgICogSWQgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBpZDogbnVtYmVyID0gLTE7XG4gICAgLyoqXG4gICAgICogU2NpZW50aWZpYyBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBDb21tb24gbmFtZSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbW1vbk5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgLyoqXG4gICAgICogU3ltcHRvbXMgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzeW1wdG9tczogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBSYXJpdHkgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSByYXJpdHk6IG51bWJlciA9IC0xO1xuICAgIC8qKlxuICAgICAqIEhvdyBzZXZlcmUgdGhlIHNpY2tuZXNzIGlzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXZlcml0eTogbnVtYmVyID0gLTE7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cmUgZm9yIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgY3VyZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIb3cgdG8gdHJlYXQgdGhlIHNpY2tuZXNzIGlmIHRoZXJlIGlzIG5vIGN1cmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyZWF0bWVudDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBOYXR1cmFsIHRyZWF0bWVudHMgZm9yIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgbmF0dXJhbFRyZWF0bWVudDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBXaGF0IHByZSBleGlzdGluZyBjb25kaXRpb25zIHRoZSBzaWNrbmVzcyBpcyBzdHJvbmcgYWdhaW5zdFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3Ryb25nQWdhaW5zdDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIFNpY2tuZXNzIENvbnN0cnVjdG9yXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBuYW1lIFNjaWVudGlmaWMgbmFtZSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gY29tbW9uTmFtZSBDb21tb24gbmFtZSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gc3ltcHRvbXMgU3ltcHRvbXMgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIHJhcml0eSBSYXJpdHkgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIHNldmVyaXR5IEhvdyBzZXZlcmUgdGhlIHNpY2tuZXNzIGlzXG4gICAgICogQHBhcmFtIGN1cmUgVGhlIGN1cmUgZm9yIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSB0cmVhdG1lbnQgSG93IHRvIHRyZWF0IHRoZSBzaWNrbmVzcyBpZiB0aGVyZSBpcyBubyBjdXJlXG4gICAgICogQHBhcmFtIG5hdHVyYWxUcmVhdG1lbnQgTmF0dXJhbCB0cmVhdG1lbnRzIGZvciB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gc3Ryb25nQWdhaW5zdCBXaGF0IHByZSBleGlzdGluZyBjb25kaXRpb25zIHRoZSBzaWNrbmVzcyBpcyBzdHJvbmcgYWdhaW5zdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcsIGNvbW1vbk5hbWU6c3RyaW5nLCBzeW1wdG9tczpzdHJpbmcsIHJhcml0eTpudW1iZXIsIHNldmVyaXR5Om51bWJlciwgY3VyZTpzdHJpbmcsIHRyZWF0bWVudDpzdHJpbmcsIG5hdHVyYWxUcmVhdG1lbnQ6c3RyaW5nLCBzdHJvbmdBZ2FpbnN0OnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb21tb25OYW1lID0gY29tbW9uTmFtZTtcbiAgICAgICAgdGhpcy5zeW1wdG9tcyA9IHN5bXB0b21zO1xuICAgICAgICB0aGlzLnJhcml0eSA9IHJhcml0eTtcbiAgICAgICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICAgICAgICB0aGlzLmN1cmUgPSBjdXJlO1xuICAgICAgICB0aGlzLnRyZWF0bWVudCA9IHRyZWF0bWVudDtcbiAgICAgICAgdGhpcy5uYXR1cmFsVHJlYXRtZW50ID0gbmF0dXJhbFRyZWF0bWVudDtcbiAgICAgICAgdGhpcy5zdHJvbmdBZ2FpbnN0ID0gc3Ryb25nQWdhaW5zdDtcbiAgICB9XG5cbiAgICAvLz0tPS09LT0tPS09LT0tPS09LT0tPVxuICAgIC8vR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgIC8vPS09LT0tPS09LT0tPS09LT0tPS09XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgSUQgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBJZCgpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIElEIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IElkKGlkOm51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBOYW1lKG5hbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBjb21tb24gbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IENvbW1vbk5hbWUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbk5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGNvbW1vbiBuYW1lIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IENvbW1vbk5hbWUoY29tbW9uTmFtZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmNvbW1vbk5hbWUgPSBjb21tb25OYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHN5bXB0b21zIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgU3ltcHRvbXMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bXB0b21zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzeW1wdG9tcyBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBTeW1wdG9tcyhzeW1wdG9tczpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnN5bXB0b21zID0gc3ltcHRvbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgcmFyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgUmFyaXR5KCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXJpdHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHJhcml0eSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBSYXJpdHkocmFyaXR5Om51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMucmFyaXR5ID0gcmFyaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHNldmVyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgU2V2ZXJpdHkoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldmVyaXR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzZXZlcml0eSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBTZXZlcml0eShzZXZlcml0eTpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgY3VyZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IEN1cmUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGN1cmUgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgQ3VydChjdXJlOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuY3VyZSA9IGN1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgdHJlYXRtZW50IGZvciBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IFRyZWF0bWVudCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlYXRtZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB0cmVhdG1lbnQgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IFRyZWF0bWVudCh0cmVhdG1lbnQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy50cmVhdG1lbnQgPSB0cmVhdG1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgbmF0dXJhbCB0cmVhdG1lbnQgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgTmF0dXJhbFRyZWF0bWVudCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbFRyZWF0bWVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgbmF0dXJhbCB0cmVhdG1lbnQgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IE5hdHVyYWxUcmVhdG1lbnQobmF0dXJhbFRyZWF0bWVudDpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLm5hdHVyYWxUcmVhdG1lbnQgPSBuYXR1cmFsVHJlYXRtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHN0cm9uZyBhZ2FpbnN0IGZvciBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IFN0cm9uZ0FnYWluc3QoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9uZ0FnYWluc3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHN0cm9uZyBhZ2FpbnN0IGZvciBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBTdHJvbmdBZ2FpbnN0KHN0cm9uZ0FnYWluc3Q6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuc3Ryb25nQWdhaW5zdCA9IHN0cm9uZ0FnYWluc3Q7XG4gICAgfVxufSJdfQ==