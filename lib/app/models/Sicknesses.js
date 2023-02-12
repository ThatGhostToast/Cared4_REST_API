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
  function Sicknesses(id, name, commonName, symptoms, description, rarity, severity, treatment, strongAgainst, requirements, commonTargets) {
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
  }]);
  return Sicknesses;
}();

exports.Sicknesses = Sicknesses;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvU2lja25lc3Nlcy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc2VzIiwiaWQiLCJuYW1lIiwiY29tbW9uTmFtZSIsInN5bXB0b21zIiwiZGVzY3JpcHRpb24iLCJyYXJpdHkiLCJzZXZlcml0eSIsInRyZWF0bWVudCIsInN0cm9uZ0FnYWluc3QiLCJyZXF1aXJlbWVudHMiLCJjb21tb25UYXJnZXRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDYUEsVTtBQUVUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksc0JBQVlDLEVBQVosRUFBdUJDLElBQXZCLEVBQW9DQyxVQUFwQyxFQUF1REMsUUFBdkQsRUFBd0VDLFdBQXhFLEVBQTRGQyxNQUE1RixFQUEyR0MsUUFBM0csRUFBNEhDLFNBQTVILEVBQThJQyxhQUE5SSxFQUFv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QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxhQUFaO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOztTQUNJLGFBQWtCQSxhQUFsQixFQUNBO0FBQ0ksV0FBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQ0E7QUFDSSxhQUFPLEtBQUtDLFlBQVo7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O1NBQ0ksYUFBaUJBLFlBQWpCLEVBQ0E7QUFDSSxXQUFLQSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFDQTtBQUNJLGFBQU8sS0FBS0MsYUFBWjtBQUNIO0FBQ0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7U0FDSSxhQUFrQkEsYUFBbEIsRUFDQTtBQUNJLFdBQUtBLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgICAgICAgICAgICAgICAgX19fX19fXG4vLyAgICAgICAgICAgICAgICAgLi1cIiAgICAgIFwiLS5cbi8vICAgICAgICAgICAgICAgIC8gICAgICAgICAgICBcXFxuLy8gICBfICAgICAgICAgICB8ICAgICAgICAgICAgICB8ICAgICAgICAgIF9cbi8vICAgKCBcXCAgICAgICAgIHwsICAuLS4gIC4tLiAgLHwgICAgICAgICAvIClcbi8vICAgPiBcIj0uXyAgICAgIHwgKShfXy8gIFxcX18pKCB8ICAgICBfLj1cIiA8XG4vLyAgIChfL1wiPS5fXCI9Ll8gfC8gICAgIC9cXCAgICAgXFx8IF8uPVwiXy49XCJcXF8pXG4vLyAgICAgICAgICBcIj0uXyAoXyAgICAgXl4gICAgIF8pXCJfLj1cIlxuLy8gICAgICAgICAgICAgIFwiPVxcX198SUlJSUlJfF9fLz1cIlxuLy8gICAgICAgICAgICAgXy49XCJ8IFxcSUlJSUlJLyB8XCI9Ll9cbi8vICAgXyAgICAgXy49XCJfLj1cIlxcICAgICAgICAgIC9cIj0uX1wiPS5fICAgICBfXG4vLyAgKCBcXF8uPVwiXy49XCIgICAgIGAtLS0tLS0tLWAgICAgIFwiPS5fXCI9Ll8vIClcbi8vICA+IF8uPVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPS5fIDxcbi8vICAoXy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXF8pXG5cbi8qKlxuICogTW9kZWwgb2YgdGhlIGRpZmZlcmVudCBzaWNrbmVzc2VzXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU2lja25lc3Nlc1xuICovXG5leHBvcnQgY2xhc3MgU2lja25lc3NlcyBcbntcbiAgICAvKipcbiAgICAgKiBJZCBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcbiAgICAvKipcbiAgICAgKiBTY2llbnRpZmljIG5hbWUgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIENvbW1vbiBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgY29tbW9uTmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBTeW1wdG9tcyBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN5bXB0b21zOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uIG9mIHRoZSBpbGxuZXNzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFJhcml0eSBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhcml0eTogbnVtYmVyID0gLTE7XG4gICAgLyoqXG4gICAgICogSG93IHNldmVyZSB0aGUgc2lja25lc3MgaXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldmVyaXR5OiBudW1iZXIgPSAtMTtcbiAgICAvKipcbiAgICAgKiBIb3cgdG8gdHJlYXQgdGhlIHNpY2tuZXNzIGlmIHRoZXJlIGlzIG5vIGN1cmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyZWF0bWVudDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBXaGF0IHByZSBleGlzdGluZyBjb25kaXRpb25zIHRoZSBzaWNrbmVzcyBpcyBzdHJvbmcgYWdhaW5zdFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3Ryb25nQWdhaW5zdDogc3RyaW5nID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBpbGxuZXNzIHN1Y2ggYXMgZ2VuZGVyIG9yIHByZXZpb3VzIGNvbmRpdGlvbnNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVxdWlyZW1lbnRzOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBjb21tb24gdGFyZ2V0cyBzdWNoIGFzIGFnZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21tb25UYXJnZXRzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogU2lja25lc3MgQ29uc3RydWN0b3JcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gaWQgSWQgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIG5hbWUgU2NpZW50aWZpYyBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBjb21tb25OYW1lIENvbW1vbiBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgICAqIEBwYXJhbSBzeW1wdG9tcyBTeW1wdG9tcyBvZiB0aGUgc2lja25lc3NcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gRGVzY3JpcHRpb24gb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIHJhcml0eSBSYXJpdHkgb2YgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIHNldmVyaXR5IEhvdyBzZXZlcmUgdGhlIHNpY2tuZXNzIGlzXG4gICAgICogQHBhcmFtIHRyZWF0bWVudCBIb3cgdG8gdHJlYXQgdGhlIHNpY2tuZXNzIGlmIHRoZXJlIGlzIG5vIGN1cmVcbiAgICAgKiBAcGFyYW0gc3Ryb25nQWdhaW5zdCBXaGF0IHByZSBleGlzdGluZyBjb25kaXRpb25zIHRoZSBzaWNrbmVzcyBpcyBzdHJvbmcgYWdhaW5zdFxuICAgICAqIEBwYXJhbSByZXF1aXJlbWVudHMgVGhlIHRoaW5ncyByZXF1aXJlZCBmb3IgYSB1c2VyIHRvIGhhdmUgdGhlIHNpY2tuZXNzXG4gICAgICogQHBhcmFtIGNvbW1vblRhcmdldHMgVGhlIHBlb3BsZSB0aGUgc2lja25lc3MgY29tbW9ubHkgYWZmZWN0c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcsIGNvbW1vbk5hbWU6c3RyaW5nLCBzeW1wdG9tczpzdHJpbmcsIGRlc2NyaXB0aW9uOnN0cmluZywgcmFyaXR5Om51bWJlciwgc2V2ZXJpdHk6bnVtYmVyLCB0cmVhdG1lbnQ6c3RyaW5nLCBzdHJvbmdBZ2FpbnN0OnN0cmluZywgcmVxdWlyZW1lbnRzOnN0cmluZywgY29tbW9uVGFyZ2V0czpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29tbW9uTmFtZSA9IGNvbW1vbk5hbWU7XG4gICAgICAgIHRoaXMuc3ltcHRvbXMgPSBzeW1wdG9tcztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnJhcml0eSA9IHJhcml0eTtcbiAgICAgICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICAgICAgICB0aGlzLnRyZWF0bWVudCA9IHRyZWF0bWVudDtcbiAgICAgICAgdGhpcy5zdHJvbmdBZ2FpbnN0ID0gc3Ryb25nQWdhaW5zdDtcbiAgICAgICAgdGhpcy5yZXF1aXJlbWVudHMgPSByZXF1aXJlbWVudHM7XG4gICAgICAgIHRoaXMuY29tbW9uVGFyZ2V0cyA9IGNvbW1vblRhcmdldHM7XG4gICAgfVxuXG4gICAgLy89LT0tPS09LT0tPS09LT0tPS09LT1cbiAgICAvL0dldHRlcnMgYW5kIFNldHRlcnNcbiAgICAvLz0tPS09LT0tPS09LT0tPS09LT0tPVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIElEIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgSWQoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBJRCBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBJZChpZDpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IE5hbWUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIG5hbWUgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgTmFtZShuYW1lOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgY29tbW9uIG5hbWUgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBDb21tb25OYW1lKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25OYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBjb21tb24gbmFtZSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBDb21tb25OYW1lKGNvbW1vbk5hbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5jb21tb25OYW1lID0gY29tbW9uTmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBzeW1wdG9tcyBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IFN5bXB0b21zKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zeW1wdG9tcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgc3ltcHRvbXMgb2YgYSBzaWNrbmVzc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgU3ltcHRvbXMoc3ltcHRvbXM6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5zeW1wdG9tcyA9IHN5bXB0b21zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIGRlc2NyaXB0aW9uIG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgRGVzY3JpcHRpb24oKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBEZXNjcmlwdGlvbihkZXNjcmlwdGlvbjpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgcmFyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgUmFyaXR5KCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXJpdHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHJhcml0eSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBSYXJpdHkocmFyaXR5Om51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMucmFyaXR5ID0gcmFyaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBnZXQgdGhlIHNldmVyaXR5IG9mIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgU2V2ZXJpdHkoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldmVyaXR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzZXZlcml0eSBvZiBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIHNldCBTZXZlcml0eShzZXZlcml0eTpudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgdHJlYXRtZW50IGZvciBhIHNpY2tuZXNzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgZ2V0IFRyZWF0bWVudCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlYXRtZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSB0cmVhdG1lbnQgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IFRyZWF0bWVudCh0cmVhdG1lbnQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy50cmVhdG1lbnQgPSB0cmVhdG1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGdldCB0aGUgc3Ryb25nIGFnYWluc3QgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgU3Ryb25nQWdhaW5zdCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb25nQWdhaW5zdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgc3Ryb25nIGFnYWluc3QgZm9yIGEgc2lja25lc3NcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBTaWNrbmVzc2VzXG4gICAgICovXG4gICAgc2V0IFN0cm9uZ0FnYWluc3Qoc3Ryb25nQWdhaW5zdDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5zdHJvbmdBZ2FpbnN0ID0gc3Ryb25nQWdhaW5zdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBzaWNrbmVzcyByZXF1aXJlbWVudHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBnZXQgUmVxdWlyZW1lbnRzKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlbWVudHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIHNpY2tuZXNzIHJlcXVpcmVtZW50c1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgUmVxdWlyZW1lbnRzKHJlcXVpcmVtZW50czpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLnJlcXVpcmVtZW50cyA9IHJlcXVpcmVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBzaWNrbmVzcyBjb21tb24gdGFyZ2V0c1xuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgU2lja25lc3Nlc1xuICAgICAqL1xuICAgIGdldCBDb21tb25UYXJnZXRzKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25UYXJnZXRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gc2V0IHRoZSBzaWNrbmVzcyBjb21tb24gdGFyZ2V0c1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFNpY2tuZXNzZXNcbiAgICAgKi9cbiAgICBzZXQgQ29tbW9uVGFyZ2V0cyhjb21tb25UYXJnZXRzOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuY29tbW9uVGFyZ2V0cyA9IGNvbW1vblRhcmdldHM7XG4gICAgfVxufSJdfQ==