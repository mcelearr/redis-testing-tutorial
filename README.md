# redis-testing-tutorial

## Testing your connection

It is possible to test your code's connection to your redis database by creating a client and testing to see if it is connecting.

```javascript
const tape = require("tape");
const redis = require("redis");

tape("test to see if connection is made to server", t => {
  const testClient = redis.createClient();
  let connected = false;
  testClient.on("connect", function(){
    connected = true;
    testClient.quit();
    t.equal(connected, true, "client must make connection to server");
    t.end();
  });
})

```

However, if you want to start testing logic, you don't necessarily want to start adding and removing things from your real database. For this reason, when testing it is very common to set up a mock database which can mimmick your real server. A common npm module for this is fakeredis and it is discussed in THIS readme.

## Testing your fake database

Start by requiring fakeredis and creating an instance of the fake client. This has almost all of the same methods as a normal redis client so you can use the same syntax to interact with it.

```javascript
const fakeredis = require('fakeredis');

tape("test to see if connection is made to server", t => {
  const fakeClient = fakeredis.createClient();
  fakeClient.set("jakub","czech",fakeredis.print);
  fakeClient.get("jakub", function(err, reply) {
    if(err) console.log(err);
    t.equal(reply,"czech", "client should set and get data");
    t.end();
  });
})

```

Remember that some of your methods for interacting with the database are asynchronous so you will have to nest your assertions within the callback function and use the reply parameter to interact with its response. For example, when testing whether or not we have successfully carried out set and get methods with the pair "jakub":"czech" (your logic will of course be a lot more complicated than this!) the check to see if it has been set correctly has to be carried out within the callback for the get method.

(remember to put up take down .flushdb())
