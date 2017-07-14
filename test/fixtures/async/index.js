"use strict";

module.exports = function(router) {
  router.get("/get", async function(req, res) {
    res.send("ok");
  });
  router.put("/put", async function(req, res) {
    res.send("ok");
  });
  router.post("/post", async function(req, res) {
    res.send("ok");
  });
  router.delete("/delete", async function(req, res) {
    res.send("ok");
  });
  router.use(async function(req, res, next) {
    res.locals.hitMiddle = true;
    next();
  });
};
