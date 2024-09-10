"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var port = 3000;
app.use(_express["default"]["static"]("frontend/public"));
app.get("*", function (req, res) {
  res.sendFile(_path["default"].resolve("frontend/public", "index.html"));
});
app.listen(port, function () {
  console.log("Listening on http://localhost:".concat(port));
});