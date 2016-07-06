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

tape("test to see if more complicated logic can be carried out", t => {
  const fakeClient = fakeredis.createClient();
  fakeClient.lpush("mylist", ["A",1,"B",2,"C",3]);
  fakeClient.lrange("mylist",0,-1, function(err, reply) {
    console.log(listToHash(reply));
    // fakeClient.sadd("myset", listToHash(reply));
    // fakeClient.get("myset", function(err, reply) {
    //   if(err) console.log(err);
    //   t.deepEqual(reply,{"A":1,"B":2,"C":3}, "myset should be created from mylist");
    //   t.end();
    //  });
  })
})

function listToHash(list){
  let hash = {};
  list.forEach(function(element, index){
    if (index % 2 === 0) hash[element] = list[index+1];
  });
  return hash;
}
