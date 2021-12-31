import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';

var MiddlewareManager = /*#__PURE__*/function () {
  function MiddlewareManager() {
    _classCallCheck(this, MiddlewareManager);

    this.middlewares = [];
  }

  _createClass(MiddlewareManager, [{
    key: "use",
    value: function use(middleWare) {
      this.middlewares.unshift(middleWare);
      return this;
    }
  }, {
    key: "remove",
    value: function remove(middleware) {
      var _context, _context2;

      var index = _indexOfInstanceProperty(_context = this.middlewares).call(_context, middleware);

      _spliceInstanceProperty(_context2 = this.middlewares).call(_context2, index, 1);

      return this;
    }
  }, {
    key: "run",
    value: function run(config) {
      var length = this.middlewares.length;

      function innerRun(config, index) {
        var middleware = this.middlewares(index);

        if (index === length - 1) {
          return middleware(config);
        } else {
          return middleware(config, function (config) {
            return innerRun(config, index++);
          });
        }
      }

      innerRun(config, 0);
    }
  }]);

  return MiddlewareManager;
}();

export { MiddlewareManager as default };
