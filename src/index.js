export default class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }

  use(middleWare) {
    this.middlewares.unshift(middleWare);
    return this;
  }

  remove(middleware) {
    const index = this.middlewares.indexOf(middleware);
    this.middlewares.splice(index, 1);
    return this;
  }

  run(config) {
    const { length } = this.middlewares;
    function innerRun(config, index) {
      const middleware = this.middlewares(index);
      if (index === length - 1) {
        return middleware(config);
      } else {
        return middleware(config, (config) => innerRun(config, index++));
      }
    }
    innerRun(config, 0);
  }
}