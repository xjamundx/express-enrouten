# express-enrouten-async

This is a fork of https://github.com/krakenjs/express-enrouten that adds support for error handling from async middleware and routes. It works by wrapping all of your routes in a promise and catch any errors that get thrown, passing them to `next(err)`.


### Usage

Put this in your config.json file:

```js
"router": {
  "enabled": true,
  "module": {
    "name": "express-enrouten-async",
    "arguments": [{ "directory": "path:./routes" }]
  }
}
```

Once you've done that you can start using `async` functions in your apps, such as:

```js
async function myRoute(req, res) {
   if (!req.query.id) throw new TypeError("Missing ID")
   let response = await service.request("my-service", req.query.id)
   res.send(response.body)
}

app.get("/home", myRoute)
```

Any errors (thrown or rejected promises) will automatically be passed to your apps error handler (and not cause the app to crash). You can set that error handler following the example here:
https://github.paypal.com/NodeApps-R/sample-app/blob/develop/config/config.json#L168


### API

See: https://github.com/krakenjs/express-enrouten

### FAQ


#### How does it work?

Basically we wrap the `app.use|get|post|put|delete` calls from express in `Promise.resolve` and add `.catch` to them. That way if any of those routes (or middleware in them) were using `async function` and it throws/rejects, the error will be caught. Once caught we pass the error to the `next(err)` handler, which can you configure in your app however you want.

Check out the initial code for the change: https://github.paypal.com/ConsumerWeb-Modules/express-enrouten-async/commit/ebea55532c9415f0b7697cfa54a506f24a6a1d11#diff-bfd23b790da400f4bfbb0e467be85d52

#### Is this buggy?

Yeah, it breaks sometimes. Please file an issue!

#### Can I use Promises as well as async functions?

You can probably also use functions that return promises in the same way.

For example both of these should work in basically the same way:

```js

// promise version
function myRoute(req, res) {
   return service.request("/my-service")
     .then((response) => res.send(response.body))
}

// async version
async function myRoute(req, res) {
   let response = await service.request("my-service")
   res.send(response.body)
}

app.get("/home", myRoute)
```

