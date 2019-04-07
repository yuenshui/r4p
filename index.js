"use strict";
const redis = require("redis");
const nbindMethods = (
  "get,del,hgetall,hkeys,hvals,llen,lpop,rpop,decr,incr,set,hget,hdel,hexists" +
  ",hsetnx,hstrlen,lindex,linsert,lpush,rpoplpush,rpush,append,decrby,getset," +
  "incrby,incrbyfloat,hset,hincrby,hincrbyfloat,lrange,lrem,lset,ltrim," +
  "getrange,mget,mset,sismember,sadd,expire,srem"
).split(",");

/**
 * 创建Redis客户端对象
 */
module.exports.createClient = options => {
  let redisClient = redis.createClient(options);
  nbindMethods.map(method => {
    if (typeof redisClient[method] == "function") {
      redisClient[method + "_s"] = redisClient[method];
      redisClient[method] = function(...arg) {
        return new Promise((resolve, reject) => {
          arg.push((error, rs) => {
            if (error) {
              reject(error);
            } else {
              resolve(rs);
            }
          });
          redisClient[method + "_s"](...arg);
        });
      };
    }
  });
  return redisClient;
};
