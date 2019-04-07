# r4p

# Redis for Promise

Extend the [redis](https://www.npmjs.com/package/redis) package  
扩展 redis 包

Change the callback mode to promise mode, support async/await mode call, if you want to try the redis package native method at the same time, add the method name to "\_s".  
将回调方式改为 promise 方式，支持 async/await 方式调用，如果同时想试用 redis 包原生的方法，将方法名加“\_s”即可。

比如：

```Javascript
const config = require("./config.json");
const redis = require("r4p").createClient(config.redis);

const getCache = async key => {
  let data;
  try {
    data = await redis.get(key);
  } catch (error) {
    console.error('cache error:', key);
  }
  return data;
}
```

```Javascript
const config = require("./config.json");
const redis = require("r4p").createClient(config.redis);

const getCache = key => {
  return redis.get(key).then(data => {
    return data;
  }).catch(error => {
    console.error('cache error:', key);
    return false;
  });
}
```
