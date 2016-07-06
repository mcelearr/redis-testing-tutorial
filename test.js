const tape = require("tape");
const redis = require("redis");
const fakeredis = require('fakeredis');

tape("test to see if connection is made to server", t => {
  const realClient = redis.createClient();
  let connected = false;
  realClient.on("connect", function(){
    connected = true;
    t.equal(connected, true, "client must make connection to server");
    realClient.quit();
    t.end();
  });
})

tape("test to see if connection is made to server", t => {
  const fakeClient = fakeredis.createClient();
  fakeClient.set("jakub","czech",fakeredis.print);
  fakeClient.get("jakub", function(err, reply) {
    if(err) console.log(err);
    t.equal(reply,"czech", "client should set and get data");
    t.end();
  });
})
