"use strict";

module.exports = function(router) {
  router.get("/get", async function(req, res) {
    throw new Error("bad get");
  });
  router.put("/put", async function(req, res) {
    throw new Error("bad put");
  });
  router.post("/post", async function(req, res) {
    throw new Error("bad post");
  });
  router.delete("/delete", async function(req, res) {
    throw new Error("bad delete");
  });
  router.use(function(err, req, res, next) {
    res.send(err.message);
  });
};
