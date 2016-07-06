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
