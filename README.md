# middleware-manager
a middleware manager of implements onion liked

## api introduction
class MiddlewareManager has three api as follows:
    <br/>// add a middleware to the middleware manager
    <br/>//the returned is the middleware manager instance
    <br/>use(middleware): MiddlewareManager
    <br/>// remove the middleware from the middleware manager
    <br/>//the returned is the middleware manager instance
    <br/>remove(middleware): MiddlewareManager
    <br/>>/ // run all middlewares of the middleware manager
    <br/>// return the finally result
    <br/>run(): Promise
middleware is a function that accept two params: config, and next function, config will transferred between middleware function hand by hand. next is a function in order to call next middleware function.

## how to use
```javascript

import MiddlewareManager from 'middleware-manager'

function middleware1(config, next) {
  console.log('middleware1 start')
  const result = await next(config)
  console.log('middleware1 end')
  return result
}

function middleware2(config, next) {
  console.log('middleware2 start')
  const result = await next(config)
  console.log('middleware2 end')
  return result
}

const middlewareManager = MiddlewareManager().use(middleware1).use(middleware2)
// run all middlewares
middlewareManager.run({key: 'value1'})

// run all middlewares again
middlewareManager.run({key: 'value2'})

```

## take axios for example and use acorn liked middleware instead of interceptor
```javascript
import MiddlewareManager from 'middleware-manager'
import axios from 'axios'

function middleware1(config, next) {
  // send axios request
  const result = axios(config)
  return next(result)
}

function middleware2(config, next) {
  // add token to config before request 
  config.token = 'xxxx'
  return next(config)
}

function middleware3(config, next) {
  // if showLoading in config equals false, we do not show loading, otherwise show loading
  const { showLoading, ...rest } = config;
  if (showLoading !== false) {
    // 显示loading动画
  }
  const response = await next(rest);
  if (showLoading !== false) {
    // 关闭动画
  }
  return response;

// axios is function for request
const middlewareManager = new MiddlewareManager()
  .use(middleware1)
  .use(middleware2)
  .use(middleware3)

function request(config) {
  return middlewareManager.run(config)
}

// then you can use request function to send request
request({
  url: 'xxx',
  method: 'get'
}) 

request({
  url: 'xxx',
  method: 'get',
  showLoading: false
}) 

```
