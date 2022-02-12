const express = require('express');
const router = express.Router();

router.get("/", async function (req, res) {
  res.json('This is the json response for the api');
});


module.exports = router