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
//Model of the different sicknesses
var Sicknesses = /*#__PURE__*/function () {
  //Id of the sickness
  //Scientific name of the sickness
  //Common name of the sickness
  //Symptoms of the sickness
  //Rarity of the sickness
  //How severe the sickness is
  //The cure for the sickness
  //How to treat the sickness if there is no cure
  //Natural treatments for the sickness
  //What pre existing conditions the sickness is strong against
  //Constructor
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


  (0, _createClass2.default)(Sicknesses, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }, {
    key: "CommonName",
    get: function get() {
      return this.commonName;
    },
    set: function set(commonName) {
      this.commonName = commonName;
    }
  }, {
    key: "Symptoms",
    get: function get() {
      return this.symptoms;
    },
    set: function set(symptoms) {
      this.symptoms = symptoms;
    }
  }, {
    key: "Rarity",
    get: function get() {
      return this.rarity;
    },
    set: function set(rarity) {
      this.rarity = rarity;
    }
  }, {
    key: "Severity",
    get: function get() {
      return this.severity;
    },
    set: function set(severity) {
      this.severity = severity;
    }
  }, {
    key: "Cure",
    get: function get() {
      return this.cure;
    }
  }, {
    key: "Curt",
    set: function set(cure) {
      this.cure = cure;
    }
  }, {
    key: "Treatment",
    get: function get() {
      return this.treatment;
    },
    set: function set(treatment) {
      this.treatment = treatment;
    }
  }, {
    key: "NaturalTreatment",
    get: function get() {
      return this.naturalTreatment;
    },
    set: function set(naturalTreatment) {
      this.naturalTreatment = naturalTreatment;
    }
  }, {
    key: "StrongAgainst",
    get: function get() {
      return this.strongAgainst;
    },
    set: function set(strongAgainst) {
      this.strongAgainst = strongAgainst;
    }
  }]);
  return Sicknesses;
}();

exports.Sicknesses = Sicknesses;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvU2lja25lc3Nlcy50cyJdLCJuYW1lcyI6WyJTaWNrbmVzc2VzIiwiaWQiLCJuYW1lIiwiY29tbW9uTmFtZSIsInN5bXB0b21zIiwicmFyaXR5Iiwic2V2ZXJpdHkiLCJjdXJlIiwidHJlYXRtZW50IiwibmF0dXJhbFRyZWF0bWVudCIsInN0cm9uZ0FnYWluc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtJQUNhQSxVO0FBRVQ7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFHQTtBQUNBLHNCQUFZQyxFQUFaLEVBQXVCQyxJQUF2QixFQUFvQ0MsVUFBcEMsRUFBdURDLFFBQXZELEVBQXdFQyxNQUF4RSxFQUF1RkMsUUFBdkYsRUFBd0dDLElBQXhHLEVBQXFIQyxTQUFySCxFQUF1SUMsZ0JBQXZJLEVBQWdLQyxhQUFoSyxFQUNBO0FBQUE7QUFBQSw4Q0F0QnFCLENBQUMsQ0FzQnRCO0FBQUEsZ0RBcEJ1QixFQW9CdkI7QUFBQSxzREFsQjZCLEVBa0I3QjtBQUFBLG9EQWhCMkIsRUFnQjNCO0FBQUEsa0RBZHlCLENBQUMsQ0FjMUI7QUFBQSxvREFaMkIsQ0FBQyxDQVk1QjtBQUFBLGdEQVZ1QixFQVV2QjtBQUFBLHFEQVI0QixFQVE1QjtBQUFBLDREQU5tQyxFQU1uQztBQUFBLHlEQUpnQyxFQUloQztBQUNJLFNBQUtULEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0gsRyxDQUVEO0FBQ0E7QUFDQTs7Ozs7U0FDQSxlQUNBO0FBQ0ksYUFBTyxLQUFLVCxFQUFaO0FBQ0gsSztTQUNELGFBQU9BLEVBQVAsRUFDQTtBQUNJLFdBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxJQUFaO0FBQ0gsSztTQUNELGFBQVNBLElBQVQsRUFDQTtBQUNJLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFDQTtBQUNJLFdBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLFFBQVo7QUFDSCxLO1NBQ0QsYUFBYUEsUUFBYixFQUNBO0FBQ0ksV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsTUFBWjtBQUNILEs7U0FDRCxhQUFXQSxNQUFYLEVBQ0E7QUFDSSxXQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsUUFBWjtBQUNILEs7U0FDRCxhQUFhQSxRQUFiLEVBQ0E7QUFDSSxXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxJQUFaO0FBQ0g7OztTQUNELGFBQVNBLElBQVQsRUFDQTtBQUNJLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxTQUFaO0FBQ0gsSztTQUNELGFBQWNBLFNBQWQsRUFDQTtBQUNJLFdBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLGdCQUFaO0FBQ0gsSztTQUNELGFBQXFCQSxnQkFBckIsRUFDQTtBQUNJLFdBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDSDs7O1NBRUQsZUFDQTtBQUNJLGFBQU8sS0FBS0MsYUFBWjtBQUNILEs7U0FDRCxhQUFrQkEsYUFBbEIsRUFDQTtBQUNJLFdBQUtBLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgICAgICAgICAgICAgICAgX19fX19fXG4vLyAgICAgICAgICAgICAgICAgLi1cIiAgICAgIFwiLS5cbi8vICAgICAgICAgICAgICAgIC8gICAgICAgICAgICBcXFxuLy8gICBfICAgICAgICAgICB8ICAgICAgICAgICAgICB8ICAgICAgICAgIF9cbi8vICAgKCBcXCAgICAgICAgIHwsICAuLS4gIC4tLiAgLHwgICAgICAgICAvIClcbi8vICAgPiBcIj0uXyAgICAgIHwgKShfXy8gIFxcX18pKCB8ICAgICBfLj1cIiA8XG4vLyAgIChfL1wiPS5fXCI9Ll8gfC8gICAgIC9cXCAgICAgXFx8IF8uPVwiXy49XCJcXF8pXG4vLyAgICAgICAgICBcIj0uXyAoXyAgICAgXl4gICAgIF8pXCJfLj1cIlxuLy8gICAgICAgICAgICAgIFwiPVxcX198SUlJSUlJfF9fLz1cIlxuLy8gICAgICAgICAgICAgXy49XCJ8IFxcSUlJSUlJLyB8XCI9Ll9cbi8vICAgXyAgICAgXy49XCJfLj1cIlxcICAgICAgICAgIC9cIj0uX1wiPS5fICAgICBfXG4vLyAgKCBcXF8uPVwiXy49XCIgICAgIGAtLS0tLS0tLWAgICAgIFwiPS5fXCI9Ll8vIClcbi8vICA+IF8uPVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPS5fIDxcbi8vICAoXy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXF8pXG5cbi8vTW9kZWwgb2YgdGhlIGRpZmZlcmVudCBzaWNrbmVzc2VzXG5leHBvcnQgY2xhc3MgU2lja25lc3NlcyBcbntcbiAgICAvL0lkIG9mIHRoZSBzaWNrbmVzc1xuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICAgIC8vU2NpZW50aWZpYyBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvL0NvbW1vbiBuYW1lIG9mIHRoZSBzaWNrbmVzc1xuICAgIHByaXZhdGUgY29tbW9uTmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvL1N5bXB0b21zIG9mIHRoZSBzaWNrbmVzc1xuICAgIHByaXZhdGUgc3ltcHRvbXM6IHN0cmluZyA9IFwiXCI7XG4gICAgLy9SYXJpdHkgb2YgdGhlIHNpY2tuZXNzXG4gICAgcHJpdmF0ZSByYXJpdHk6IG51bWJlciA9IC0xO1xuICAgIC8vSG93IHNldmVyZSB0aGUgc2lja25lc3MgaXNcbiAgICBwcml2YXRlIHNldmVyaXR5OiBudW1iZXIgPSAtMTtcbiAgICAvL1RoZSBjdXJlIGZvciB0aGUgc2lja25lc3NcbiAgICBwcml2YXRlIGN1cmU6IHN0cmluZyA9IFwiXCI7XG4gICAgLy9Ib3cgdG8gdHJlYXQgdGhlIHNpY2tuZXNzIGlmIHRoZXJlIGlzIG5vIGN1cmVcbiAgICBwcml2YXRlIHRyZWF0bWVudDogc3RyaW5nID0gXCJcIjtcbiAgICAvL05hdHVyYWwgdHJlYXRtZW50cyBmb3IgdGhlIHNpY2tuZXNzXG4gICAgcHJpdmF0ZSBuYXR1cmFsVHJlYXRtZW50OiBzdHJpbmcgPSBcIlwiO1xuICAgIC8vV2hhdCBwcmUgZXhpc3RpbmcgY29uZGl0aW9ucyB0aGUgc2lja25lc3MgaXMgc3Ryb25nIGFnYWluc3RcbiAgICBwcml2YXRlIHN0cm9uZ0FnYWluc3Q6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL0NvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgY29tbW9uTmFtZTpzdHJpbmcsIHN5bXB0b21zOnN0cmluZywgcmFyaXR5Om51bWJlciwgc2V2ZXJpdHk6bnVtYmVyLCBjdXJlOnN0cmluZywgdHJlYXRtZW50OnN0cmluZywgbmF0dXJhbFRyZWF0bWVudDpzdHJpbmcsIHN0cm9uZ0FnYWluc3Q6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbW1vbk5hbWUgPSBjb21tb25OYW1lO1xuICAgICAgICB0aGlzLnN5bXB0b21zID0gc3ltcHRvbXM7XG4gICAgICAgIHRoaXMucmFyaXR5ID0gcmFyaXR5O1xuICAgICAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XG4gICAgICAgIHRoaXMuY3VyZSA9IGN1cmU7XG4gICAgICAgIHRoaXMudHJlYXRtZW50ID0gdHJlYXRtZW50O1xuICAgICAgICB0aGlzLm5hdHVyYWxUcmVhdG1lbnQgPSBuYXR1cmFsVHJlYXRtZW50O1xuICAgICAgICB0aGlzLnN0cm9uZ0FnYWluc3QgPSBzdHJvbmdBZ2FpbnN0O1xuICAgIH1cblxuICAgIC8vPS09LT0tPS09LT0tPS09LT0tPS09XG4gICAgLy9HZXR0ZXJzIGFuZCBTZXR0ZXJzXG4gICAgLy89LT0tPS09LT0tPS09LT0tPS09LT1cbiAgICBnZXQgSWQoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbiAgICBzZXQgSWQoaWQ6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIGdldCBOYW1lKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cbiAgICBzZXQgTmFtZShuYW1lOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IENvbW1vbk5hbWUoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbk5hbWU7XG4gICAgfVxuICAgIHNldCBDb21tb25OYW1lKGNvbW1vbk5hbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5jb21tb25OYW1lID0gY29tbW9uTmFtZTtcbiAgICB9XG5cbiAgICBnZXQgU3ltcHRvbXMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bXB0b21zO1xuICAgIH1cbiAgICBzZXQgU3ltcHRvbXMoc3ltcHRvbXM6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5zeW1wdG9tcyA9IHN5bXB0b21zO1xuICAgIH1cblxuICAgIGdldCBSYXJpdHkoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhcml0eTtcbiAgICB9XG4gICAgc2V0IFJhcml0eShyYXJpdHk6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5yYXJpdHkgPSByYXJpdHk7XG4gICAgfVxuXG4gICAgZ2V0IFNldmVyaXR5KCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXZlcml0eTtcbiAgICB9XG4gICAgc2V0IFNldmVyaXR5KHNldmVyaXR5Om51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eTtcbiAgICB9XG5cbiAgICBnZXQgQ3VyZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyZTtcbiAgICB9XG4gICAgc2V0IEN1cnQoY3VyZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmN1cmUgPSBjdXJlO1xuICAgIH1cblxuICAgIGdldCBUcmVhdG1lbnQoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWF0bWVudDtcbiAgICB9XG4gICAgc2V0IFRyZWF0bWVudCh0cmVhdG1lbnQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy50cmVhdG1lbnQgPSB0cmVhdG1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IE5hdHVyYWxUcmVhdG1lbnQoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWxUcmVhdG1lbnQ7XG4gICAgfVxuICAgIHNldCBOYXR1cmFsVHJlYXRtZW50KG5hdHVyYWxUcmVhdG1lbnQ6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5uYXR1cmFsVHJlYXRtZW50ID0gbmF0dXJhbFRyZWF0bWVudDtcbiAgICB9XG5cbiAgICBnZXQgU3Ryb25nQWdhaW5zdCgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb25nQWdhaW5zdDtcbiAgICB9XG4gICAgc2V0IFN0cm9uZ0FnYWluc3Qoc3Ryb25nQWdhaW5zdDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5zdHJvbmdBZ2FpbnN0ID0gc3Ryb25nQWdhaW5zdDtcbiAgICB9XG59Il19