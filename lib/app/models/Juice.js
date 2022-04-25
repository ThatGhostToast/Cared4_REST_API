"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Juice = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Juice = /*#__PURE__*/function () {
  function Juice(id, name, ingredients, benefits, htm, imagename) {
    (0, _classCallCheck2.default)(this, Juice);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "ingredients", "");
    (0, _defineProperty2.default)(this, "benefits", "");
    (0, _defineProperty2.default)(this, "htm", "");
    (0, _defineProperty2.default)(this, "imageName", "");
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.benefits = benefits;
    this.htm = htm;
    this.imageName = imagename;
  }

  (0, _createClass2.default)(Juice, [{
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
    key: "Ingredients",
    get: function get() {
      return this.ingredients;
    },
    set: function set(ingredients) {
      this.ingredients = ingredients;
    }
  }, {
    key: "Benefits",
    get: function get() {
      return this.benefits;
    },
    set: function set(benefits) {
      this.benefits = benefits;
    }
  }, {
    key: "Htm",
    get: function get() {
      return this.htm;
    },
    set: function set(htm) {
      this.htm = htm;
    }
  }, {
    key: "ImageName",
    get: function get() {
      return this.imageName;
    },
    set: function set(imagename) {
      this.imageName = imagename;
    }
  }]);
  return Juice;
}();

exports.Juice = Juice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvSnVpY2UudHMiXSwibmFtZXMiOlsiSnVpY2UiLCJpZCIsIm5hbWUiLCJpbmdyZWRpZW50cyIsImJlbmVmaXRzIiwiaHRtIiwiaW1hZ2VuYW1lIiwiaW1hZ2VOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSztBQVNULGlCQUFZQyxFQUFaLEVBQXVCQyxJQUF2QixFQUFvQ0MsV0FBcEMsRUFBd0RDLFFBQXhELEVBQXlFQyxHQUF6RSxFQUFxRkMsU0FBckYsRUFDQTtBQUFBO0FBQUEsOENBUnFCLENBQUMsQ0FRdEI7QUFBQSxnREFQdUIsRUFPdkI7QUFBQSx1REFOOEIsRUFNOUI7QUFBQSxvREFMMkIsRUFLM0I7QUFBQSwrQ0FKc0IsRUFJdEI7QUFBQSxxREFINEIsRUFHNUI7QUFDSSxTQUFLTCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQkQsU0FBakI7QUFDSDs7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtMLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLElBQVo7QUFDSCxLO1NBQ0QsYUFBU0EsSUFBVCxFQUNBO0FBQ0ksV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLFdBQVo7QUFDSCxLO1NBQ0QsYUFBZ0JBLFdBQWhCLEVBQ0E7QUFDSSxXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxRQUFaO0FBQ0gsSztTQUNELGFBQWFBLFFBQWIsRUFDQTtBQUNJLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLEdBQVo7QUFDSCxLO1NBRUQsYUFBZUEsR0FBZixFQUNBO0FBQ0ksV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtFLFNBQVo7QUFDSCxLO1NBRUQsYUFBcUJELFNBQXJCLEVBQ0E7QUFDSSxXQUFLQyxTQUFMLEdBQWlCRCxTQUFqQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEp1aWNlIFxue1xuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGluZ3JlZGllbnRzOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYmVuZWZpdHM6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBodG06IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbWFnZU5hbWU6IHN0cmluZyA9IFwiXCI7XG4gXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgaW5ncmVkaWVudHM6c3RyaW5nLCBiZW5lZml0czpzdHJpbmcsIGh0bTpzdHJpbmcsIGltYWdlbmFtZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5ncmVkaWVudHMgPSBpbmdyZWRpZW50cztcbiAgICAgICAgdGhpcy5iZW5lZml0cyA9IGJlbmVmaXRzO1xuICAgICAgICB0aGlzLmh0bSA9IGh0bTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWUgPSBpbWFnZW5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IElkKCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG4gICAgc2V0IElkKGlkOm51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gICAgc2V0IE5hbWUobmFtZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGdldCBJbmdyZWRpZW50cygpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5ncmVkaWVudHM7XG4gICAgfVxuICAgIHNldCBJbmdyZWRpZW50cyhpbmdyZWRpZW50czpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmluZ3JlZGllbnRzID0gaW5ncmVkaWVudHM7XG4gICAgfVxuXG4gICAgZ2V0IEJlbmVmaXRzKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5iZW5lZml0cztcbiAgICB9XG4gICAgc2V0IEJlbmVmaXRzKGJlbmVmaXRzOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuYmVuZWZpdHMgPSBiZW5lZml0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IEh0bSgpOiBzdHJpbmcgXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5odG07XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBIdG0oaHRtOiBzdHJpbmcpIFxuICAgIHtcbiAgICAgICAgdGhpcy5odG0gPSBodG07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBJbWFnZU5hbWUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZU5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBJbWFnZU5hbWUoaW1hZ2VuYW1lOnN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VuYW1lO1xuICAgIH1cbn0iXX0=