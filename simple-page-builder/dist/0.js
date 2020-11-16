(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/components/ButtonComponent.js":
/*!******************************************!*\
  !*** ./js/components/ButtonComponent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ \"./node_modules/core-js/modules/es.object.get-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.reflect.construct */ \"./node_modules/core-js/modules/es.reflect.construct.js\");\n/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var modules_redux_actions_getReducerAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! modules/redux/actions/getReducerAction */ \"./modules/redux/actions/getReducerAction.js\");\n/* harmony import */ var modules_redux_actions_updateReducerAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! modules/redux/actions/updateReducerAction */ \"./modules/redux/actions/updateReducerAction.js\");\n/* harmony import */ var libraries_libUtils_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libraries/libUtils.js */ \"./js/libraries/libUtils.js\");\n/* harmony import */ var utils_componentUtils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! utils/componentUtils */ \"./js/utils/componentUtils.js\");\n/* harmony import */ var handleEvents_CImageEvents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! handleEvents/CImageEvents */ \"./js/handleEvents/CImageEvents.js\");\n\n\n\n\n\n\n\n\n\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n\n\nvar getImageSrcErrorMessage = function getImageSrcErrorMessage(src) {\n  return Object(handleEvents_CImageEvents__WEBPACK_IMPORTED_MODULE_17__[\"handleValidationUrl\"])(src) ? '' : 'URL ảnh không hợp lệ, mời nhập một url khác.';\n};\n\nvar ImageComponent = /*#__PURE__*/function (_Component) {\n  _inherits(ImageComponent, _Component);\n\n  var _super = _createSuper(ImageComponent);\n\n  function ImageComponent(props) {\n    var _this;\n\n    _classCallCheck(this, ImageComponent);\n\n    _this = _super.call(this, props);\n    var settings = {\n      image_src: '',\n      imageSrcError: '',\n      image_description: '',\n      width: 0,\n      height: 0,\n      previewContent: '',\n      componentName: 'Button'\n    };\n    _this.state = {\n      settings: libraries_libUtils_js__WEBPACK_IMPORTED_MODULE_15__[\"getCopiedJsonObject\"](settings),\n      _settings: libraries_libUtils_js__WEBPACK_IMPORTED_MODULE_15__[\"getCopiedJsonObject\"](settings),\n      instName: props.instName\n    };\n    return _this;\n  }\n\n  _createClass(ImageComponent, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      Object(utils_componentUtils__WEBPACK_IMPORTED_MODULE_16__[\"addComponentInst\"])({\n        name: this.state.instName,\n        instance: this\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var previewContent = this.state.settings.previewContent;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(\"div\", {\n        className: \"settingsPanel\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(\"div\", {\n        className: \"inputBlock imageBlock\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_11__[\"TextField\"], {\n        label: \"\",\n        value: image_src,\n        onChange: function onChange(e, newValue) {\n          return handleEvents_CImageEvents__WEBPACK_IMPORTED_MODULE_17__[\"handleInputControlChanged\"].call(_this2, e, newValue, 'image_src');\n        },\n        onGetErrorMessage: getImageSrcErrorMessage\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(\"div\", {\n        className: \"previewPanel\",\n        dangerouslySetInnerHTML: {\n          __html: previewContent\n        }\n      }));\n    }\n  }]);\n\n  return ImageComponent;\n}(react__WEBPACK_IMPORTED_MODULE_10__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_12__[\"connect\"])(modules_redux_actions_getReducerAction__WEBPACK_IMPORTED_MODULE_13__[\"mapStateToProps\"], modules_redux_actions_updateReducerAction__WEBPACK_IMPORTED_MODULE_14__[\"mapDispatchToProps\"])(ImageComponent));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jb21wb25lbnRzL0J1dHRvbkNvbXBvbmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvQnV0dG9uQ29tcG9uZW50LmpzPzU1NGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICdvZmZpY2UtdWktZmFicmljLXJlYWN0JztcclxuXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBtYXBTdGF0ZVRvUHJvcHMgfSBmcm9tIFwibW9kdWxlcy9yZWR1eC9hY3Rpb25zL2dldFJlZHVjZXJBY3Rpb25cIjtcclxuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSBcIm1vZHVsZXMvcmVkdXgvYWN0aW9ucy91cGRhdGVSZWR1Y2VyQWN0aW9uXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xpYnJhcmllcy9saWJVdGlscy5qcyc7XHJcblxyXG5pbXBvcnQgeyBhZGRDb21wb25lbnRJbnN0IH0gZnJvbSAndXRpbHMvY29tcG9uZW50VXRpbHMnO1xyXG5pbXBvcnQgeyBoYW5kbGVJbnB1dENvbnRyb2xDaGFuZ2VkLCBoYW5kbGVWYWxpZGF0aW9uVXJsIH0gZnJvbSAnaGFuZGxlRXZlbnRzL0NJbWFnZUV2ZW50cyc7XHJcblxyXG5jb25zdCBnZXRJbWFnZVNyY0Vycm9yTWVzc2FnZSA9IChzcmMpID0+IHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGhhbmRsZVZhbGlkYXRpb25Vcmwoc3JjKSA/ICcnIDogJ1VSTCDhuqNuaCBraMO0bmcgaOG7o3AgbOG7hywgbeG7nWkgbmjhuq1wIG3hu5l0IHVybCBraMOhYy4nO1xyXG5cclxufTtcclxuXHJcbmNsYXNzIEltYWdlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG5cclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG5cclxuICAgICAgICAgICAgaW1hZ2Vfc3JjOiAnJyxcclxuICAgICAgICAgICAgaW1hZ2VTcmNFcnJvciA6ICcnLFxyXG4gICAgICAgICAgICBpbWFnZV9kZXNjcmlwdGlvbiA6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBwcmV2aWV3Q29udGVudDogJycsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudE5hbWUgOiAnQnV0dG9uJ1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IF8uZ2V0Q29waWVkSnNvbk9iamVjdChzZXR0aW5ncyksXHJcbiAgICAgICAgICAgIF9zZXR0aW5nczogXy5nZXRDb3BpZWRKc29uT2JqZWN0KHNldHRpbmdzKSxcclxuICAgICAgICAgICAgaW5zdE5hbWU6IHByb3BzLmluc3ROYW1lXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuICAgICAgICBhZGRDb21wb25lbnRJbnN0KHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5zdGF0ZS5pbnN0TmFtZSxcclxuICAgICAgICAgICAgaW5zdGFuY2U6IHRoaXNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBjb25zdCB7ICBwcmV2aWV3Q29udGVudCB9ID0gdGhpcy5zdGF0ZS5zZXR0aW5ncztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuXHJcbiAgICAgICAgICAgIDxGcmFnbWVudD5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNldHRpbmdzUGFuZWxcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dEJsb2NrIGltYWdlQmxvY2tcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgbGFiZWw9XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlX3NyY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSwgbmV3VmFsdWUpID0+IGhhbmRsZUlucHV0Q29udHJvbENoYW5nZWQuY2FsbCh0aGlzLCBlLCBuZXdWYWx1ZSwgJ2ltYWdlX3NyYycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25HZXRFcnJvck1lc3NhZ2U9e2dldEltYWdlU3JjRXJyb3JNZXNzYWdlfSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlld1BhbmVsXCJcclxuICAgICAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHByZXZpZXdDb250ZW50IH19PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9GcmFnbWVudD5cclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoSW1hZ2VDb21wb25lbnQpOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFZQTtBQUVBO0FBQ0E7QUFDQTtBQUpBO0FBaEJBO0FBd0JBO0FBQ0E7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFLQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUlBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBSEE7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBUUE7Ozs7QUFuRUE7QUFDQTtBQXFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/components/ButtonComponent.js\n");

/***/ })

}]);