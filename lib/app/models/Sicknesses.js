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
   * Description of the illness
   *
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
   * How to treat the sickness if there is no cure
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
   * The requirements of the illness such as gender or previous conditions
   *
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * The common targets such as age
   *
   * @private
   * @type {string}
   * @memberof Sicknesses
   */

  /**
   * The image associated with the illness
   *
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
   * @param description Description of the sickness
   * @param rarity Rarity of the sickness
   * @param severity How severe the sickness is
   * @param treatment How to treat the sickness if there is no cure
   * @param strongAgainst What pre existing conditions the sickness is strong against
   * @param requirements The things required for a user to have the sickness
   * @param commonTargets The people the sickness commonly affects
   */
  function Sicknesses(id, name, commonName, symptoms, description, rarity, severity, treatment, strongAgainst, requirements, commonTargets, image) {
    (0, _classCallCheck2.default)(this, Sicknesses);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "commonName", "");
    (0, _defineProperty2.default)(this, "symptoms", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "rarity", -1);
    (0, _defineProperty2.default)(this, "severity", -1);
    (0, _defineProperty2.default)(this, "treatment", "");
    (0, _defineProperty2.default)(this, "strongAgainst", "");
    (0, _defineProperty2.default)(this, "requirements", "");
    (0, _defineProperty2.default)(this, "commonTargets", "");
    (0, _defineProperty2.default)(this, "image", "");
    this.id = id;
    this.name = name;
    this.commonName = commonName;
    this.symptoms = symptoms;
    this.description = description;
    this.rarity = rarity;
    this.severity = severity;
    this.treatment = treatment;
    this.strongAgainst = strongAgainst;
    this.requirements = requirements;
    this.commonTargets = commonTargets;
    this.image = image;
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
     * Method to get the description of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Description",
    get: function get() {
      return this.description;
    }
    /**
     * Method to set the description of a sickness
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(description) {
      this.description = description;
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
    /**
     * Method to get the sickness requirements
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Requirements",
    get: function get() {
      return this.requirements;
    }
    /**
     * Method to set the sickness requirements
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(requirements) {
      this.requirements = requirements;
    }
    /**
     * Method to get the sickness common targets
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "CommonTargets",
    get: function get() {
      return this.commonTargets;
    }
    /**
     * Method to set the sickness common targets
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(commonTargets) {
      this.commonTargets = commonTargets;
    }
    /**
     * Method to get the illness image
     *
     * @type {string}
     * @memberof Sicknesses
     */

  }, {
    key: "Image",
    get: function get() {
      return this.image;
    }
    /**
     * Method to set the illness image
     *
     * @memberof Sicknesses
     */
    ,
    set: function set(image) {
      this.image = image;
    }
  }]);
  return Sicknesses;
}();

exports.Sicknesses = Sicknesses;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvU2lja25lc3Nlcy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc2VzIiwiaWQiLCJuYW1lIiwiY29tbW9uTmFtZSIsInN5bXB0b21zIiwiZGVzY3JpcHRpb24iLCJyYXJpdHkiLCJzZXZlcml0eSIsInRyZWF0bWVudCIsInN0cm9uZ0FnYWluc3QiLCJyZXF1aXJlbWVudHMiLCJjb21tb25UYXJnZXRzIiwiaW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxVO0FBRVQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxzQkFBWUMsRUFBWixFQUF1QkMsSUFBdkIsRUFBb0NDLFVBQXBDLEVBQXVEQyxRQUF2RCxFQUF3RUMsV0FBeEUsRUFBNEZDLE1BQTVG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SSxhQUFPLEtBQUtDLFNBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ksYUFBY0EsU0FBZCxFQUNBO0FBQ0ksV0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQ0E7QUFDSSxhQUFPLEtBQUtDLGFBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ksYUFBa0JBLGFBQWxCLEVBQ0E7QUFDSSxXQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFDQTtBQUNJLGFBQU8sS0FBS0MsWUFBWjtBQUNIO0FBQ0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7U0FDSSxhQUFpQkEsWUFBakIsRUFDQTtBQUNJLFdBQUtBLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxhQUFaO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOztTQUNJLGFBQWtCQSxhQUFsQixFQUNBO0FBQ0ksV0FBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEtBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ksYUFBVUEsS0FBVixFQUNBO0FBQ0ksV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgICAgICAgICAgICAgICAgX19fX19fXG4vLyAgICAgICAgICAgICAgICAgLi1cIiAgICAgIFwiLS5cbi8vICAgICAgICAgICAgICAgIC8gICAgICAgICAgICBcXFxuLy8gICBfICAgICAgICAgICB8ICAgICAgICAgICAgICB8ICAgICAgICAgIF9cbi8vICAgKCBcXCAgICAgICAgIHwsICAuLS4gIC4tLiAgLHwgICAgICAgICAvIClcbi8vICAgPiBcIj0uXyAgICAgIHwgKShfXy8gIFxcX18pKCB8ICAgICBfLj1cIiA8XG4vLyAgIChfL1wiPS5fXCI9Ll8gfC8gICAgIC9cXCAgICAgXFx8IF8uPVwiXy49XCJcXF8pXG4vLyAgICAgICAgICBcIj0uXyAoXyAgICAgXl4gICAgIF8pXCJfLj1cIlxuLy8gICAgICAgICAgICAgIFwiPVxcX198SUlJSUlJfF9fLz1cIlxuLy8gICAgICAgICAgICAgXy49XCJ8IFxcSUlJSUlJLyB8XCI9Ll9cbi8vICAgXyAgICAgXy49XCJfLj1cIlxcICAgICAgICAgIC9cIj0uX1wiPS5fICAgICBfXG4vLyAgKCBcXF8uPVwiXy49XCIgICAgIGAtLS0tLS0tLWAgICAgIFwiPS5fXCI9Ll8vIClcbi8vICA+IF8uPVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPS5fIDxcbi8vICAoXy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXF8pXG5cbi8qKlxuICogTW9kZWwgb2YgdGhlIGRpZmZlcmVudCBzaWNrbmVzc2VzXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU2lja25lc3Nlc1xuICovXG5leHBvcnQgY2xhc3MgU2lja25lc3NlcyBcbntcbiAgICAvKipcbiAgICAgKiBJZCBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcbiAgICAvKipcbiAgICAgKiBTY2llbnRpZmljIG5hbWUgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIENvbW1vbiBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgY29tbW9uTmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBTeW1wdG9tcyBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN5bXB0b21zOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uIG9mIHRoZSBpbGxuZXNzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFJhcml0eSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhcml0eTogbnVtYmVyID0gLTE7XG4gICAgLyoqXG4gICAgICogSG93IHNldmVyZSB0aGUgc2lja25lc3MgaXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldmVyaXR5OiBudW1iZXIgPSAtMTtcbiAgICAvKipcbiAgICAgKiBIb3cgdG8gdHJlYXQgdGhlIHNpY2tuZXNzIGlmIHRoZXJlIGlzIG5vIGN1cmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyZWF0bWVudDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBXaGF0IHByZSBleGlzdGluZyBjb25kaXRpb25zIHRoZSBzaWNrbmVzcyBpcyBzdHJvbmcgYWdhaW5zdFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3Ryb25nQWdhaW5zdDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBpbGxuZXNzIHN1Y2ggYXMgZ2VuZGVyIG9yIHByZXZpb3VzIGNvbmRpdGlvbnNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVxdWlyZW1lbnRzOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBjb21tb24gdGFyZ2V0cyBzdWNoIGFzIGFnZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21tb25UYXJnZXRzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGltYWdlIGFzc29jaWF0ZWQgd2l0aCB0aGUgaWxsbmVzc1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbWFnZTogc3RyaW5nID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIFNpY2tuZXNzIENvbnN0cnVjdG9yXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGlkIElkIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBuYW1lIFNjaWVudGlmaWMgbmFtZSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gY29tbW9uTmFtZSBDb21tb24gbmFtZSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gc3ltcHRvbXMgU3ltcHRvbXMgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIERlc2NyaXB0aW9uIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSByYXJpdHkgUmFyaXR5IG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBzZXZlcml0eSBIb3cgc2V2ZXJlIHRoZSBzaWNrbmVzcyBpc1xuICAgICAqIEBwYXJhbSB0cmVhdG1lbnQgSG93IHRvIHRyZWF0IHRoZSBzaWNrbmVzcyBpZiB0aGVyZSBpcyBubyBjdXJlXG4gICAgICogQHBhcmFtIHN0cm9uZ0FnYWluc3QgV2hhdCBwcmUgZXhpc3RpbmcgY29uZGl0aW9ucyB0aGUgc2lja25lc3MgaXMgc3Ryb25nIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gcmVxdWlyZW1lbnRzIFRoZSB0aGluZ3MgcmVxdWlyZWQgZm9yIGEgdXNlciB0byBoYXZlIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBjb21tb25UYXJnZXRzIFRoZSBwZW9wbGUgdGhlIHNpY2tuZXNzIGNvbW1vbmx5IGFmZmVjdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nLCBjb21tb25OYW1lOnN0cmluZywgc3ltcHRvbXM6c3RyaW5nLCBkZXNjcmlwdGlvbjpzdHJpbmcsIHJhcml0eTpudW1iZXIsIHNldmVyaXR5Om51bWJlciwgdHJlYXRtZW50OnN0cmluZywgc3Ryb25nQWdhaW5zdDpzdHJpbmcsIHJlcXVpcmVtZW50czpzdHJpbmcsIGNvbW1vblRhcmdldHM6c3RyaW5nLCBpbWFnZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29tbW9uTmFtZSA9IGNvbW1vbk5hbWU7XG4gICAgICAgIHRoaXMuc3ltcHRvbXMgPSBzeW1wdG9tcztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnJhcml0eSA9IHJhcml0eTtcbiAgICAgICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICAgICAgICB0aGlzLnRyZWF0bWVudCA9IHRyZWF0bWVudDtcbiAgICAgICAgdGhpcy5zdHJvbmdBZ2FpbnN0ID0gc3Ryb25nQWdhaW5zdDtcbiAgICAgICAgdGhpcy5yZXF1aXJlbWVudHMgPSByZXF1aXJlbWVudHM7XG4gICAgICAgIHRoaXMuY29tbW9uVGFyZ2V0cyA9IGNvbW1vblRhcmdldHM7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICB9XG5cbiAgICAvLz0tPS09LT0tPS09LT0tPS09LT0tPVxuICAgIC8vR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgIC8vPS09LT0tPS09LT0tPS09LT0tPS09XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgSUQgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBJZCgpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIElEIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IElkKGlkOm51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBOYW1lKG5hbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBjb21tb24gbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IENvbW1vbk5hbWUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbk5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGNvbW1vbiBuYW1lIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IENvbW1vbk5hbWUoY29tbW9uTmFtZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmNvbW1vbk5hbWUgPSBjb21tb25OYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHN5bXB0b21zIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgU3ltcHRvbXMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bXB0b21zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzeW1wdG9tcyBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBTeW1wdG9tcyhzeW1wdG9tczpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnN5bXB0b21zID0gc3ltcHRvbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgZGVzY3JpcHRpb24gb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBEZXNjcmlwdGlvbigpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIGRlc2NyaXB0aW9uIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSByYXJpdHkgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBSYXJpdHkoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhcml0eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgcmFyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IFJhcml0eShyYXJpdHk6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5yYXJpdHkgPSByYXJpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgc2V2ZXJpdHkgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBTZXZlcml0eSgpOm51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V2ZXJpdHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHNldmVyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IFNldmVyaXR5KHNldmVyaXR5Om51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB0cmVhdG1lbnQgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgVHJlYXRtZW50KCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVhdG1lbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHRyZWF0bWVudCBmb3IgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgVHJlYXRtZW50KHRyZWF0bWVudDpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnRyZWF0bWVudCA9IHRyZWF0bWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBzdHJvbmcgYWdhaW5zdCBmb3IgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBTdHJvbmdBZ2FpbnN0KCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJvbmdBZ2FpbnN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzdHJvbmcgYWdhaW5zdCBmb3IgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgU3Ryb25nQWdhaW5zdChzdHJvbmdBZ2FpbnN0OiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnN0cm9uZ0FnYWluc3QgPSBzdHJvbmdBZ2FpbnN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHNpY2tuZXNzIHJlcXVpcmVtZW50c1xuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBSZXF1aXJlbWVudHMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVtZW50cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgc2lja25lc3MgcmVxdWlyZW1lbnRzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBSZXF1aXJlbWVudHMocmVxdWlyZW1lbnRzOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMucmVxdWlyZW1lbnRzID0gcmVxdWlyZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHNpY2tuZXNzIGNvbW1vbiB0YXJnZXRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IENvbW1vblRhcmdldHMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vblRhcmdldHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHNpY2tuZXNzIGNvbW1vbiB0YXJnZXRzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBDb21tb25UYXJnZXRzKGNvbW1vblRhcmdldHM6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5jb21tb25UYXJnZXRzID0gY29tbW9uVGFyZ2V0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBpbGxuZXNzIGltYWdlXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IEltYWdlKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgaWxsbmVzcyBpbWFnZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgSW1hZ2UoaW1hZ2U6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIH1cbn0iXX0=