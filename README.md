# redis-testing-tutorial

## Testing your connection

How to test your real server connection with an instance of a redis client.

```javascript

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

## Mocking

Remember we're testing the logic of your code, so the tests should check to see that actions carried out on the database have the expected effects. For this we only need a mock database which will behave like our real one. For more information on this see the readme on fakeredis. Link to other README.

## Test fixtures

(SHow example code of how to require the right modules and set up tests)

(remember to put up take down .flushdb())

TEST YOUR LOGIC
