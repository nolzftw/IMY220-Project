"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Nolan Kuhn u214337883
var express = require('express');
var session = require('express-session');
var path = require('path');
var _require = require('mongodb'),
  MongoClient = _require.MongoClient;

// MongoDB connection URL
var url = "mongodb+srv://u21437883:Junetkuhn!1324@imy220.gpxcf.mongodb.net/?retryWrites=true&w=majority&tls=true";
var client = new MongoClient(url);
var app = express();
var port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Set up sessions
app.use(session({
  secret: 'IMY220ProjectFinal',
  // Change this to a strong secret in production
  resave: false,
  // Don't save session if unmodified
  saveUninitialized: true,
  // Save uninitialized sessions
  cookie: {
    secure: false
  } // Set to true if you're using HTTPS
}));

// Function to establish the MongoDB connection
function main() {
  return _main.apply(this, arguments);
} // Call the main MongoDB function to establish the connection
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    var db, usersCollection, playlistsCollection, songsCollection;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return client.connect();
        case 3:
          console.info("Connected to MongoDB");
          db = client.db("Apogee");
          usersCollection = db.collection("users");
          playlistsCollection = db.collection("playlists");
          songsCollection = db.collection("songs"); // ========== Authentication API Request (Login, Signup, Logout) ==========
          // User Signup
          app.post('/api/signup', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
              var _req$body, name, email, password, existingUser, newUser;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                    _context.prev = 1;
                    _context.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    existingUser = _context.sent;
                    if (!existingUser) {
                      _context.next = 7;
                      break;
                    }
                    return _context.abrupt("return", res.status(400).json({
                      message: 'Email is already taken'
                    }));
                  case 7:
                    // If user doesn't exist, create a new user with email as _id
                    newUser = {
                      _id: email,
                      name: name,
                      gender: 'None',
                      bio: 'No bio available',
                      email: email,
                      password: password,
                      friends: [],
                      link: 'https://via.placeholder.com/100'
                    }; // Insert the new user into the users collection
                    _context.next = 10;
                    return usersCollection.insertOne(newUser);
                  case 10:
                    // Respond with success
                    res.status(201).json({
                      message: 'User created successfully',
                      user: newUser
                    });
                    _context.next = 17;
                    break;
                  case 13:
                    _context.prev = 13;
                    _context.t0 = _context["catch"](1);
                    // Handle any errors
                    console.error('Error during signup:', _context.t0);
                    res.status(500).json({
                      message: 'Server error, please try again later'
                    });
                  case 17:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 13]]);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());

          // User Login
          app.post('/api/login', /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
              var _req$body2, email, password, user;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                    _context2.prev = 1;
                    _context2.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    user = _context2.sent;
                    if (user) {
                      _context2.next = 7;
                      break;
                    }
                    return _context2.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 7:
                    if (!(user.password !== password)) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("return", res.status(401).json({
                      message: 'Invalid email or password'
                    }));
                  case 9:
                    // Store user information in the session
                    req.session.user = {
                      _id: user._id,
                      name: user.name
                    };
                    res.status(200).json({
                      message: 'Login successful',
                      user: req.session.user
                    });
                    _context2.next = 16;
                    break;
                  case 13:
                    _context2.prev = 13;
                    _context2.t0 = _context2["catch"](1);
                    res.status(500).json({
                      message: 'Server error, please try again later'
                    });
                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[1, 13]]);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }());

          // User Logout
          app.post('/api/logout', function (req, res) {
            req.session.destroy(function (err) {
              if (err) {
                return res.status(500).json({
                  message: 'Logout failed'
                });
              }
              res.status(200).json({
                message: 'Logout successful'
              });
            });
          });

          // ========== Profile API Request (View, Edit, View someone elses, Delete your profile) ==========

          // Get User Profile (view your own profile or someone else's)
          app.get('/api/users/:email', /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
              var email, user, userProfile, publicProfile;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    email = req.params.email;
                    _context3.prev = 1;
                    _context3.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    user = _context3.sent;
                    if (user) {
                      _context3.next = 7;
                      break;
                    }
                    return _context3.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 7:
                    if (!(req.session.user && req.session.user._id === email)) {
                      _context3.next = 12;
                      break;
                    }
                    // Return the user's profile, but mask the password
                    userProfile = {
                      _id: user._id,
                      name: user.name,
                      gender: user.gender,
                      bio: user.bio,
                      email: user.email,
                      password: user.password,
                      link: user.link
                    };
                    return _context3.abrupt("return", res.status(200).json(userProfile));
                  case 12:
                    // If the session user is viewing someone else's profile, hide email and password
                    publicProfile = {
                      _id: user._id,
                      name: user.name,
                      gender: user.gender,
                      bio: user.bio,
                      link: user.link
                      // Do not include email and password in the response
                    };
                    return _context3.abrupt("return", res.status(200).json(publicProfile));
                  case 14:
                    _context3.next = 19;
                    break;
                  case 16:
                    _context3.prev = 16;
                    _context3.t0 = _context3["catch"](1);
                    res.status(500).json({
                      message: 'Error fetching user'
                    });
                  case 19:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[1, 16]]);
            }));
            return function (_x5, _x6) {
              return _ref3.apply(this, arguments);
            };
          }());

          // Get Actual Password for session owner
          app.get('/api/users/:email/password', /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
              var email, user;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    email = req.params.email; // Only allow the session user to access their own password
                    if (!(!req.session.user || req.session.user._id !== email)) {
                      _context4.next = 3;
                      break;
                    }
                    return _context4.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action'
                    }));
                  case 3:
                    _context4.prev = 3;
                    _context4.next = 6;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 6:
                    user = _context4.sent;
                    if (user) {
                      _context4.next = 9;
                      break;
                    }
                    return _context4.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 9:
                    // Return the actual password to the session owner
                    res.status(200).json({
                      password: user.password
                    });
                    _context4.next = 15;
                    break;
                  case 12:
                    _context4.prev = 12;
                    _context4.t0 = _context4["catch"](3);
                    res.status(500).json({
                      message: 'Error fetching password'
                    });
                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[3, 12]]);
            }));
            return function (_x7, _x8) {
              return _ref4.apply(this, arguments);
            };
          }());

          // Update User Profile(edit)
          app.patch('/api/users/:email', /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
              var email, _req$body3, name, gender, bio, password, link, updateFields, result;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    email = req.params.email;
                    _req$body3 = req.body, name = _req$body3.name, gender = _req$body3.gender, bio = _req$body3.bio, password = _req$body3.password, link = _req$body3.link;
                    _context5.prev = 2;
                    updateFields = {};
                    if (name) updateFields.name = name;
                    if (gender) updateFields.gender = gender;
                    if (bio) updateFields.bio = bio;
                    if (password) updateFields.password = password;
                    if (link) updateFields.link = link;
                    _context5.next = 11;
                    return usersCollection.updateOne({
                      _id: email
                    }, {
                      $set: updateFields
                    });
                  case 11:
                    result = _context5.sent;
                    if (!(result.matchedCount === 0)) {
                      _context5.next = 14;
                      break;
                    }
                    return _context5.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 14:
                    res.status(200).json({
                      message: 'Profile updated successfully'
                    });
                    _context5.next = 20;
                    break;
                  case 17:
                    _context5.prev = 17;
                    _context5.t0 = _context5["catch"](2);
                    res.status(500).json({
                      message: 'Error updating profile'
                    });
                  case 20:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[2, 17]]);
            }));
            return function (_x9, _x10) {
              return _ref5.apply(this, arguments);
            };
          }());

          // Delete User Profile
          app["delete"]('/api/users/:email', /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
              var email, result;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    email = req.params.email; // Check if the session user is trying to delete their own profile
                    if (!(!req.session.user || req.session.user._id !== email)) {
                      _context6.next = 3;
                      break;
                    }
                    return _context6.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action'
                    }));
                  case 3:
                    _context6.prev = 3;
                    _context6.next = 6;
                    return usersCollection.deleteOne({
                      _id: email
                    });
                  case 6:
                    result = _context6.sent;
                    if (!(result.deletedCount === 0)) {
                      _context6.next = 9;
                      break;
                    }
                    return _context6.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 9:
                    _context6.next = 11;
                    return playlistsCollection.deleteMany({
                      ownerId: email
                    });
                  case 11:
                    // Delete all playlists owned by this user

                    // Destroy the session after deletion
                    req.session.destroy(function (err) {
                      if (err) {
                        return res.status(500).json({
                          message: 'Error logging out after deletion'
                        });
                      }

                      // Send a response to inform the client that the user should be redirected to the splash page
                      res.status(200).json({
                        message: 'User profile deleted successfully. Redirecting to splash page.'
                      });
                    });
                    _context6.next = 18;
                    break;
                  case 14:
                    _context6.prev = 14;
                    _context6.t0 = _context6["catch"](3);
                    console.error('Error deleting profile:', _context6.t0);
                    res.status(500).json({
                      message: 'Server error, please try again later'
                    });
                  case 18:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[3, 14]]);
            }));
            return function (_x11, _x12) {
              return _ref6.apply(this, arguments);
            };
          }());

          // ========== Friend / Unfriend API Request ==========
          // Add Friend
          app.patch('/api/users/:email/addFriend', /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
              var email, friendEmail, friend, result;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    email = req.params.email; // Email of the user who wants to add a friend
                    friendEmail = req.body.friends[0]; // The friend to be added
                    // Ensure the current session user is the one making the request
                    if (!(!req.session.user || req.session.user._id !== email)) {
                      _context7.next = 4;
                      break;
                    }
                    return _context7.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action'
                    }));
                  case 4:
                    _context7.prev = 4;
                    _context7.next = 7;
                    return usersCollection.findOne({
                      _id: friendEmail
                    });
                  case 7:
                    friend = _context7.sent;
                    if (friend) {
                      _context7.next = 10;
                      break;
                    }
                    return _context7.abrupt("return", res.status(404).json({
                      message: 'Friend not found'
                    }));
                  case 10:
                    _context7.next = 12;
                    return usersCollection.updateOne({
                      _id: email
                    }, {
                      $addToSet: {
                        friends: friendEmail
                      }
                    } // $addToSet ensures no duplicates
                    );
                  case 12:
                    result = _context7.sent;
                    if (!(result.matchedCount === 0)) {
                      _context7.next = 15;
                      break;
                    }
                    return _context7.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 15:
                    res.status(200).json({
                      message: "".concat(friendEmail, " added to friends list")
                    });
                    _context7.next = 21;
                    break;
                  case 18:
                    _context7.prev = 18;
                    _context7.t0 = _context7["catch"](4);
                    res.status(500).json({
                      message: 'Error adding friend'
                    });
                  case 21:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[4, 18]]);
            }));
            return function (_x13, _x14) {
              return _ref7.apply(this, arguments);
            };
          }());

          // Remove Friend
          app.patch('/api/users/:email/removeFriend', /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
              var email, friendEmail, friend, result;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    email = req.params.email; // Email of the user who wants to remove a friend
                    friendEmail = req.body.friends; // The friend to be removed is in "friends" field
                    // Ensure the current session user is the one making the request
                    if (!(!req.session.user || req.session.user._id !== email)) {
                      _context8.next = 4;
                      break;
                    }
                    return _context8.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action'
                    }));
                  case 4:
                    _context8.prev = 4;
                    _context8.next = 7;
                    return usersCollection.findOne({
                      _id: friendEmail
                    });
                  case 7:
                    friend = _context8.sent;
                    if (friend) {
                      _context8.next = 10;
                      break;
                    }
                    return _context8.abrupt("return", res.status(404).json({
                      message: 'Friend not found'
                    }));
                  case 10:
                    _context8.next = 12;
                    return usersCollection.updateOne({
                      _id: email
                    }, {
                      $pull: {
                        friends: friendEmail
                      }
                    } // $pull removes the friend from the array
                    );
                  case 12:
                    result = _context8.sent;
                    if (!(result.matchedCount === 0)) {
                      _context8.next = 15;
                      break;
                    }
                    return _context8.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 15:
                    res.status(200).json({
                      message: "".concat(friendEmail, " removed from friends list")
                    });
                    _context8.next = 21;
                    break;
                  case 18:
                    _context8.prev = 18;
                    _context8.t0 = _context8["catch"](4);
                    res.status(500).json({
                      message: 'Error removing friend'
                    });
                  case 21:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, null, [[4, 18]]);
            }));
            return function (_x15, _x16) {
              return _ref8.apply(this, arguments);
            };
          }());

          // Get User Friends
          app.get('/api/users/:email/friends', /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
              var email, user, friends;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    email = req.params.email;
                    _context9.prev = 1;
                    _context9.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    user = _context9.sent;
                    if (!(!user || !user.friends || user.friends.length === 0)) {
                      _context9.next = 7;
                      break;
                    }
                    return _context9.abrupt("return", res.status(404).json({
                      message: 'No friends found'
                    }));
                  case 7:
                    _context9.next = 9;
                    return usersCollection.find({
                      _id: {
                        $in: user.friends
                      }
                    }).toArray();
                  case 9:
                    friends = _context9.sent;
                    res.status(200).json(friends.map(function (friend) {
                      return friend._id;
                    })); // Return the emails
                    _context9.next = 16;
                    break;
                  case 13:
                    _context9.prev = 13;
                    _context9.t0 = _context9["catch"](1);
                    res.status(500).json({
                      message: 'Error fetching friends'
                    });
                  case 16:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[1, 13]]);
            }));
            return function (_x17, _x18) {
              return _ref9.apply(this, arguments);
            };
          }());

          // ========== Your Playlist API Requests (Create playlist, Add songs to playlist, View Playlist, Edit Playlist Details, Delete Playlist) ==========
          // Create Playlist
          app.post('/api/playlists/create', /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
              var _req$body4, title, category, description, songs, imgSrc, hashtags, playlistId, newPlaylist, result;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _req$body4 = req.body, title = _req$body4.title, category = _req$body4.category, description = _req$body4.description, songs = _req$body4.songs, imgSrc = _req$body4.imgSrc, hashtags = _req$body4.hashtags; // Generate playlist ID based on the title (lowercase and no spaces)
                    playlistId = title.toLowerCase().replace(/\s+/g, ''); // // Format the songs array to contain objects with title, artist, and isDeleted fields
                    // const formattedSongs = songs.map(song => {
                    //   const [songTitle, artist] = song.split('-').map(part => part.trim());
                    //   return {
                    //     title: songTitle,
                    //     artist: artist,
                    //     isDeleted: false  // Default to not deleted
                    //   };
                    // });
                    // Create new playlist object
                    newPlaylist = {
                      _id: playlistId,
                      title: title,
                      category: category || "",
                      description: description || "",
                      hashtags: hashtags || [],
                      imgSrc: imgSrc || "https://via.placeholder.com/100",
                      ownerId: req.session.user._id,
                      // Use the logged-in user's ID from session
                      songs: []
                    };
                    _context10.prev = 3;
                    _context10.next = 6;
                    return playlistsCollection.insertOne(newPlaylist);
                  case 6:
                    result = _context10.sent;
                    res.status(201).json({
                      message: 'Playlist created',
                      playlistId: result.insertedId
                    });
                    _context10.next = 14;
                    break;
                  case 10:
                    _context10.prev = 10;
                    _context10.t0 = _context10["catch"](3);
                    console.error('Error creating playlist:', _context10.t0);
                    res.status(500).json({
                      message: 'Error creating playlist'
                    });
                  case 14:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, null, [[3, 10]]);
            }));
            return function (_x19, _x20) {
              return _ref10.apply(this, arguments);
            };
          }());

          // Add Song to Playlist (with unique song handling)
          app.post('/api/playlists/:id/addSong', /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
              var playlistId, _req$body5, title, artist, songId, song, newSong, playlist;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    playlistId = req.params.id;
                    _req$body5 = req.body, title = _req$body5.title, artist = _req$body5.artist; // Generate the song ID
                    songId = "".concat(title.toLowerCase().replace(/\s+/g, ''), "-").concat(artist.toLowerCase().replace(/\s+/g, ''));
                    _context11.prev = 3;
                    _context11.next = 6;
                    return songsCollection.findOne({
                      _id: songId
                    });
                  case 6:
                    song = _context11.sent;
                    if (song) {
                      _context11.next = 12;
                      break;
                    }
                    newSong = {
                      _id: songId,
                      title: title,
                      artist: artist,
                      album: "",
                      // You can enhance this part later by allowing album input
                      duration: "00:00",
                      // Default duration
                      link: "",
                      // Add song link if available
                      isDeleted: false,
                      ownerIds: [req.session.user._id] // Add the song owner
                    };
                    _context11.next = 11;
                    return songsCollection.insertOne(newSong);
                  case 11:
                    song = newSong;
                  case 12:
                    if (!song.isDeleted) {
                      _context11.next = 14;
                      break;
                    }
                    return _context11.abrupt("return", res.status(403).json({
                      message: 'Cannot add a deleted song to the playlist'
                    }));
                  case 14:
                    _context11.next = 16;
                    return playlistsCollection.findOne({
                      _id: playlistId
                    });
                  case 16:
                    playlist = _context11.sent;
                    if (playlist) {
                      _context11.next = 19;
                      break;
                    }
                    return _context11.abrupt("return", res.status(404).json({
                      message: 'Playlist not found'
                    }));
                  case 19:
                    if (playlist.songs.includes(songId)) {
                      _context11.next = 25;
                      break;
                    }
                    _context11.next = 22;
                    return playlistsCollection.updateOne({
                      _id: playlistId
                    }, {
                      $push: {
                        songs: songId
                      }
                    });
                  case 22:
                    res.status(200).json({
                      message: 'Song added to playlist'
                    });
                    _context11.next = 26;
                    break;
                  case 25:
                    res.status(200).json({
                      message: 'Song is already in the playlist'
                    });
                  case 26:
                    _context11.next = 32;
                    break;
                  case 28:
                    _context11.prev = 28;
                    _context11.t0 = _context11["catch"](3);
                    console.error('Error adding song to playlist:', _context11.t0);
                    res.status(500).json({
                      message: 'Error adding song to playlist'
                    });
                  case 32:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, null, [[3, 28]]);
            }));
            return function (_x21, _x22) {
              return _ref11.apply(this, arguments);
            };
          }());

          // View Playlist with full song details
          app.get('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
              var playlistId, playlist, songsDetails, validSongs;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    playlistId = req.params.id;
                    _context13.prev = 1;
                    _context13.next = 4;
                    return playlistsCollection.findOne({
                      _id: playlistId
                    });
                  case 4:
                    playlist = _context13.sent;
                    if (playlist) {
                      _context13.next = 7;
                      break;
                    }
                    return _context13.abrupt("return", res.status(404).json({
                      message: 'Playlist not found'
                    }));
                  case 7:
                    _context13.next = 9;
                    return Promise.all(playlist.songs.map(/*#__PURE__*/function () {
                      var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(songId) {
                        var song;
                        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                          while (1) switch (_context12.prev = _context12.next) {
                            case 0:
                              _context12.next = 2;
                              return songsCollection.findOne({
                                _id: songId
                              });
                            case 2:
                              song = _context12.sent;
                              if (!song) {
                                _context12.next = 5;
                                break;
                              }
                              return _context12.abrupt("return", {
                                title: song.title,
                                artist: song.artist,
                                album: song.album,
                                link: song.link,
                                imgSrc: song.imgSrc,
                                duration: song.duration
                              });
                            case 5:
                              return _context12.abrupt("return", null);
                            case 6:
                            case "end":
                              return _context12.stop();
                          }
                        }, _callee12);
                      }));
                      return function (_x25) {
                        return _ref13.apply(this, arguments);
                      };
                    }()));
                  case 9:
                    songsDetails = _context13.sent;
                    // Filter out any null values in case some songs are missing
                    validSongs = songsDetails.filter(function (song) {
                      return song !== null;
                    });
                    res.status(200).json(_objectSpread(_objectSpread({}, playlist), {}, {
                      songs: validSongs // Replace song IDs with full song details
                    }));
                    _context13.next = 18;
                    break;
                  case 14:
                    _context13.prev = 14;
                    _context13.t0 = _context13["catch"](1);
                    console.error('Error fetching playlist:', _context13.t0);
                    res.status(500).json({
                      message: 'Error fetching playlist'
                    });
                  case 18:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13, null, [[1, 14]]);
            }));
            return function (_x23, _x24) {
              return _ref12.apply(this, arguments);
            };
          }());

          // Edit Playlist
          app.patch('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
              var playlistId, _req$body6, title, category, description, songs, hashtags, imgSrc, playlist, updateFields, result;
              return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    playlistId = req.params.id; // The current playlist ID
                    _req$body6 = req.body, title = _req$body6.title, category = _req$body6.category, description = _req$body6.description, songs = _req$body6.songs, hashtags = _req$body6.hashtags, imgSrc = _req$body6.imgSrc;
                    _context14.prev = 2;
                    _context14.next = 5;
                    return playlistsCollection.findOne({
                      _id: playlistId
                    });
                  case 5:
                    playlist = _context14.sent;
                    if (playlist) {
                      _context14.next = 8;
                      break;
                    }
                    return _context14.abrupt("return", res.status(404).json({
                      message: 'Playlist not found'
                    }));
                  case 8:
                    if (!(playlist.ownerId !== req.session.user._id)) {
                      _context14.next = 10;
                      break;
                    }
                    return _context14.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action. You are not the owner of this playlist.'
                    }));
                  case 10:
                    // Prepare the update object
                    updateFields = {}; // Update other fields if provided
                    if (category !== undefined) updateFields.category = category;
                    if (description !== undefined) updateFields.description = description;
                    if (hashtags !== undefined) updateFields.hashtags = hashtags;
                    if (imgSrc !== undefined) updateFields.imgSrc = imgSrc;

                    // Reformat and update songs if provided (parsing based on the song-artist format)
                    if (songs) {
                      updateFields.songs = songs.map(function (song) {
                        // Split the song string at the hyphen to separate title and artist
                        var _song$split$map = song.split('-').map(function (part) {
                            return part.trim().toLowerCase().replace(/\s+/g, '');
                          }),
                          _song$split$map2 = _slicedToArray(_song$split$map, 2),
                          songName = _song$split$map2[0],
                          artist = _song$split$map2[1];
                        return "".concat(songName, "-").concat(artist); // Rebuild the song in the required format
                      });
                    }

                    // Perform the update operation
                    _context14.next = 18;
                    return playlistsCollection.updateOne({
                      _id: playlistId
                    }, {
                      $set: updateFields
                    });
                  case 18:
                    result = _context14.sent;
                    if (!(result.matchedCount === 0)) {
                      _context14.next = 21;
                      break;
                    }
                    return _context14.abrupt("return", res.status(404).json({
                      message: 'Playlist not found or no changes made.'
                    }));
                  case 21:
                    res.status(200).json({
                      message: 'Playlist updated successfully'
                    });
                    _context14.next = 28;
                    break;
                  case 24:
                    _context14.prev = 24;
                    _context14.t0 = _context14["catch"](2);
                    console.error('Error updating playlist:', _context14.t0);
                    res.status(500).json({
                      message: 'Error updating playlist'
                    });
                  case 28:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14, null, [[2, 24]]);
            }));
            return function (_x26, _x27) {
              return _ref14.apply(this, arguments);
            };
          }());

          // Delete Playlist
          app["delete"]('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
              var playlistId, playlist, result;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    playlistId = req.params.id;
                    _context15.prev = 1;
                    _context15.next = 4;
                    return playlistsCollection.findOne({
                      _id: playlistId
                    });
                  case 4:
                    playlist = _context15.sent;
                    if (playlist) {
                      _context15.next = 7;
                      break;
                    }
                    return _context15.abrupt("return", res.status(404).json({
                      message: 'Playlist not found'
                    }));
                  case 7:
                    if (!(playlist.ownerId !== req.session.user._id)) {
                      _context15.next = 9;
                      break;
                    }
                    return _context15.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action. You are not the owner of this playlist.'
                    }));
                  case 9:
                    _context15.next = 11;
                    return playlistsCollection.deleteOne({
                      _id: playlistId
                    });
                  case 11:
                    result = _context15.sent;
                    if (!(result.deletedCount === 0)) {
                      _context15.next = 14;
                      break;
                    }
                    return _context15.abrupt("return", res.status(404).json({
                      message: 'Playlist not found'
                    }));
                  case 14:
                    res.status(200).json({
                      message: 'Playlist deleted successfully'
                    });
                    _context15.next = 21;
                    break;
                  case 17:
                    _context15.prev = 17;
                    _context15.t0 = _context15["catch"](1);
                    console.error('Error deleting playlist:', _context15.t0);
                    res.status(500).json({
                      message: 'Error deleting playlist'
                    });
                  case 21:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15, null, [[1, 17]]);
            }));
            return function (_x28, _x29) {
              return _ref15.apply(this, arguments);
            };
          }());

          // ========== Songs API Requests (Create song, Delete song) ==========
          // Create or update a song (with multiple owners support)
          app.post('/api/song/create', /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
              var _req$body7, title, artist, album, duration, link, imgSrc, songId, song, newSong, result;
              return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    _req$body7 = req.body, title = _req$body7.title, artist = _req$body7.artist, album = _req$body7.album, duration = _req$body7.duration, link = _req$body7.link, imgSrc = _req$body7.imgSrc;
                    if (req.session.user) {
                      _context16.next = 3;
                      break;
                    }
                    return _context16.abrupt("return", res.status(401).json({
                      message: 'Unauthorized. Please log in first.'
                    }));
                  case 3:
                    // Generate song ID based on the song title and artist (lowercase, no spaces)
                    songId = "".concat(title.toLowerCase().replace(/\s+/g, ''), "-").concat(artist.toLowerCase().replace(/\s+/g, ''));
                    _context16.prev = 4;
                    _context16.next = 7;
                    return songsCollection.findOne({
                      _id: songId
                    });
                  case 7:
                    song = _context16.sent;
                    if (!song) {
                      _context16.next = 16;
                      break;
                    }
                    if (song.ownerId.includes(req.session.user._id)) {
                      _context16.next = 15;
                      break;
                    }
                    _context16.next = 12;
                    return songsCollection.updateOne({
                      _id: songId
                    }, {
                      $addToSet: {
                        ownerId: req.session.user._id
                      }
                    } // Add user ID to `ownerId` without duplicates
                    );
                  case 12:
                    return _context16.abrupt("return", res.status(200).json({
                      message: 'Song ownership updated.'
                    }));
                  case 15:
                    return _context16.abrupt("return", res.status(200).json({
                      message: 'You are already an owner of this song.'
                    }));
                  case 16:
                    // If the song does not exist, create a new one with the current user as the owner
                    newSong = {
                      _id: songId,
                      // Unique ID based on song title and artist
                      title: title,
                      artist: artist,
                      album: album || "",
                      duration: duration || "00:00",
                      link: link || "",
                      imgSrc: imgSrc || "https://via.placeholder.com/100",
                      isDeleted: false,
                      ownerId: [req.session.user._id] // Store the ID of the user who added the song
                    }; // Insert the new song into the songs collection
                    _context16.next = 19;
                    return songsCollection.insertOne(newSong);
                  case 19:
                    result = _context16.sent;
                    res.status(201).json({
                      message: 'Song created successfully',
                      songId: result.insertedId
                    });
                    _context16.next = 27;
                    break;
                  case 23:
                    _context16.prev = 23;
                    _context16.t0 = _context16["catch"](4);
                    console.error('Error creating or updating song:', _context16.t0);
                    res.status(500).json({
                      message: 'Error creating or updating song'
                    });
                  case 27:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16, null, [[4, 23]]);
            }));
            return function (_x30, _x31) {
              return _ref16.apply(this, arguments);
            };
          }());

          // Delete a song
          app.patch('/api/songs/:id/delete', /*#__PURE__*/function () {
            var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
              var songId, song, result;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    songId = req.params.id;
                    if (req.session.user) {
                      _context17.next = 3;
                      break;
                    }
                    return _context17.abrupt("return", res.status(401).json({
                      message: 'Unauthorized. Please log in first.'
                    }));
                  case 3:
                    _context17.prev = 3;
                    _context17.next = 6;
                    return songsCollection.findOne({
                      _id: songId
                    });
                  case 6:
                    song = _context17.sent;
                    if (song) {
                      _context17.next = 9;
                      break;
                    }
                    return _context17.abrupt("return", res.status(404).json({
                      message: 'Song not found'
                    }));
                  case 9:
                    if (!(song.ownerId !== req.session.user._id)) {
                      _context17.next = 11;
                      break;
                    }
                    return _context17.abrupt("return", res.status(403).json({
                      message: 'Unauthorized action. You can only delete songs you created.'
                    }));
                  case 11:
                    _context17.next = 13;
                    return songsCollection.updateOne({
                      _id: songId
                    }, {
                      $set: {
                        isDeleted: true
                      }
                    } // Set isDeleted to true
                    );
                  case 13:
                    result = _context17.sent;
                    if (!(result.matchedCount === 0)) {
                      _context17.next = 16;
                      break;
                    }
                    return _context17.abrupt("return", res.status(404).json({
                      message: 'Song not found'
                    }));
                  case 16:
                    res.status(200).json({
                      message: 'Song marked as deleted'
                    });
                    _context17.next = 23;
                    break;
                  case 19:
                    _context17.prev = 19;
                    _context17.t0 = _context17["catch"](3);
                    console.error('Error marking song as deleted:', _context17.t0);
                    res.status(500).json({
                      message: 'Error marking song as deleted'
                    });
                  case 23:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17, null, [[3, 19]]);
            }));
            return function (_x32, _x33) {
              return _ref17.apply(this, arguments);
            };
          }());

          // ========== Searching API Requests (Playlist, Songs, Users) ==========
          // Search for Playlists belonging to the logged-in user
          app.post('/api/playlists/search', /*#__PURE__*/function () {
            var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
              var _req$body8, query, userId, regex, playlists;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    _req$body8 = req.body, query = _req$body8.query, userId = _req$body8.userId; // `query` is the search term, `userId` is the session user's ID
                    _context18.prev = 1;
                    regex = new RegExp(query, 'i'); // Create a case-insensitive regex based on the query
                    // Only search playlists that belong to the current logged-in user
                    _context18.next = 5;
                    return playlistsCollection.find({
                      $and: [{
                        ownerId: userId
                      },
                      // Filter by the session user's ID
                      {
                        $or: [{
                          title: regex
                        }, {
                          category: regex
                        }, {
                          hashtags: {
                            $in: [regex]
                          }
                        }]
                      }]
                    }).toArray();
                  case 5:
                    playlists = _context18.sent;
                    if (!(playlists.length === 0)) {
                      _context18.next = 8;
                      break;
                    }
                    return _context18.abrupt("return", res.status(404).json({
                      message: 'No playlists found'
                    }));
                  case 8:
                    res.status(200).json(playlists);
                    _context18.next = 15;
                    break;
                  case 11:
                    _context18.prev = 11;
                    _context18.t0 = _context18["catch"](1);
                    console.error('Error searching for playlists:', _context18.t0);
                    res.status(500).json({
                      message: 'Error searching for playlists'
                    });
                  case 15:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18, null, [[1, 11]]);
            }));
            return function (_x34, _x35) {
              return _ref18.apply(this, arguments);
            };
          }());

          // Search for Songs belonging to the logged-in user
          app.post('/api/songs/search', /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
              var _req$body9, query, userId, regex, songs;
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    _req$body9 = req.body, query = _req$body9.query, userId = _req$body9.userId; // `query` is the search term, `userId` is the session user's ID
                    _context19.prev = 1;
                    regex = new RegExp(query, 'i'); // Create a case-insensitive regex for matching
                    // Only search songs that belong to the current logged-in user
                    _context19.next = 5;
                    return songsCollection.find({
                      $and: [{
                        ownerId: userId
                      },
                      // Filter by the session user's ID
                      {
                        $or: [{
                          title: regex
                        }, {
                          artist: regex
                        }, {
                          album: regex
                        }]
                      }, {
                        isDeleted: false
                      } // Only return songs that are not marked as deleted
                      ]
                    }).toArray();
                  case 5:
                    songs = _context19.sent;
                    if (!(songs.length === 0)) {
                      _context19.next = 8;
                      break;
                    }
                    return _context19.abrupt("return", res.status(404).json({
                      message: 'No songs found'
                    }));
                  case 8:
                    res.status(200).json(songs);
                    _context19.next = 15;
                    break;
                  case 11:
                    _context19.prev = 11;
                    _context19.t0 = _context19["catch"](1);
                    console.error('Error searching for songs:', _context19.t0);
                    res.status(500).json({
                      message: 'Error searching for songs'
                    });
                  case 15:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19, null, [[1, 11]]);
            }));
            return function (_x36, _x37) {
              return _ref19.apply(this, arguments);
            };
          }());

          // Get User Profile (view your own profile or someone else's)
          app.post('/api/users/profile/:email', /*#__PURE__*/function () {
            var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
              var email, user, userProfile, publicProfile;
              return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                while (1) switch (_context20.prev = _context20.next) {
                  case 0:
                    email = req.params.email;
                    _context20.prev = 1;
                    _context20.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    user = _context20.sent;
                    if (user) {
                      _context20.next = 7;
                      break;
                    }
                    return _context20.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 7:
                    if (!(req.session.user && req.session.user._id === email)) {
                      _context20.next = 12;
                      break;
                    }
                    // Return the user's profile, but mask the password
                    userProfile = {
                      _id: user._id,
                      name: user.name,
                      gender: user.gender,
                      bio: user.bio,
                      email: user.email,
                      password: user.password
                    };
                    return _context20.abrupt("return", res.status(200).json(userProfile));
                  case 12:
                    // If the session user is viewing someone else's profile, hide email and password
                    publicProfile = {
                      _id: user._id,
                      name: user.name,
                      gender: user.gender,
                      bio: user.bio
                    };
                    return _context20.abrupt("return", res.status(200).json(publicProfile));
                  case 14:
                    _context20.next = 19;
                    break;
                  case 16:
                    _context20.prev = 16;
                    _context20.t0 = _context20["catch"](1);
                    res.status(500).json({
                      message: 'Error fetching user'
                    });
                  case 19:
                  case "end":
                    return _context20.stop();
                }
              }, _callee20, null, [[1, 16]]);
            }));
            return function (_x38, _x39) {
              return _ref20.apply(this, arguments);
            };
          }());

          // Check mutual friendship
          app.get('/api/users/:email1/mutual/:email2', /*#__PURE__*/function () {
            var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
              var email1, email2, user1, user2, isMutualFriend;
              return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                while (1) switch (_context21.prev = _context21.next) {
                  case 0:
                    email1 = req.params.email1;
                    email2 = req.params.email2;
                    _context21.prev = 2;
                    _context21.next = 5;
                    return usersCollection.findOne({
                      _id: email1
                    });
                  case 5:
                    user1 = _context21.sent;
                    _context21.next = 8;
                    return usersCollection.findOne({
                      _id: email2
                    });
                  case 8:
                    user2 = _context21.sent;
                    if (!(!user1 || !user2)) {
                      _context21.next = 11;
                      break;
                    }
                    return _context21.abrupt("return", res.status(404).json({
                      message: 'One or both users not found'
                    }));
                  case 11:
                    isMutualFriend = user1.friends.includes(email2) && user2.friends.includes(email1);
                    res.status(200).json({
                      mutualFriends: isMutualFriend
                    });
                    _context21.next = 18;
                    break;
                  case 15:
                    _context21.prev = 15;
                    _context21.t0 = _context21["catch"](2);
                    res.status(500).json({
                      message: 'Server error, please try again later'
                    });
                  case 18:
                  case "end":
                    return _context21.stop();
                }
              }, _callee21, null, [[2, 15]]);
            }));
            return function (_x40, _x41) {
              return _ref21.apply(this, arguments);
            };
          }());

          // Get User Friends
          app.post('/api/users/friends', /*#__PURE__*/function () {
            var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
              var email, user, friends;
              return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                while (1) switch (_context22.prev = _context22.next) {
                  case 0:
                    email = req.body.email;
                    _context22.prev = 1;
                    _context22.next = 4;
                    return usersCollection.findOne({
                      _id: email
                    });
                  case 4:
                    user = _context22.sent;
                    _context22.next = 7;
                    return usersCollection.find({
                      _id: {
                        $in: user.friends
                      }
                    }).project({
                      name: 1
                    }) // Only return the 'name' field
                    .toArray();
                  case 7:
                    friends = _context22.sent;
                    res.status(200).json(friends.map(function (friend) {
                      return friend.name;
                    }));
                    _context22.next = 14;
                    break;
                  case 11:
                    _context22.prev = 11;
                    _context22.t0 = _context22["catch"](1);
                    res.status(500).json({
                      message: 'Error fetching friends'
                    });
                  case 14:
                  case "end":
                    return _context22.stop();
                }
              }, _callee22, null, [[1, 11]]);
            }));
            return function (_x42, _x43) {
              return _ref22.apply(this, arguments);
            };
          }());

          // Search for Users
          app.post('/api/users/search', /*#__PURE__*/function () {
            var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
              var query, regex, users, filteredUsers;
              return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    query = req.body.query; // `query` is the search term passed in the request body
                    _context23.prev = 1;
                    regex = new RegExp(query, 'i'); // Case-insensitive regex
                    _context23.next = 5;
                    return usersCollection.find({
                      $or: [{
                        name: regex
                      }, {
                        email: regex
                      } // Allow searching by email as well
                      ]
                    }).toArray();
                  case 5:
                    users = _context23.sent;
                    if (!(users.length === 0)) {
                      _context23.next = 8;
                      break;
                    }
                    return _context23.abrupt("return", res.status(404).json({
                      message: 'No users found'
                    }));
                  case 8:
                    // Filter out sensitive data (like password)
                    filteredUsers = users.map(function (user) {
                      return {
                        _id: user._id,
                        name: user.name,
                        gender: user.gender,
                        bio: user.bio,
                        email: user.email,
                        link: "/profile/".concat(user._id) // Add a link to the user's profile page
                      };
                    });
                    res.status(200).json(filteredUsers);
                    _context23.next = 16;
                    break;
                  case 12:
                    _context23.prev = 12;
                    _context23.t0 = _context23["catch"](1);
                    console.error('Error searching for users:', _context23.t0);
                    res.status(500).json({
                      message: 'Error searching for users'
                    });
                  case 16:
                  case "end":
                    return _context23.stop();
                }
              }, _callee23, null, [[1, 12]]);
            }));
            return function (_x44, _x45) {
              return _ref23.apply(this, arguments);
            };
          }());

          // Check current session and return logged-in user
          app.get('/api/login/session', function (req, res) {
            if (req.session.user) {
              res.status(200).json(req.session.user);
            } else {
              res.status(401).json({
                message: 'User not logged in'
              });
            }
          });
          _context24.next = 37;
          break;
        case 34:
          _context24.prev = 34;
          _context24.t0 = _context24["catch"](0);
          console.error("Error connecting to MongoDB:", _context24.t0);
        case 37:
          // Serve static files
          app.use(express["static"]('./frontend/public'));

          // Root route to serve the frontend
          app.get("*", function (req, res) {
            res.sendFile(path.resolve("./frontend/public", "index.html"));
          });
          app.listen(port, function () {
            console.log("Listening on http://localhost:".concat(port));
          });
        case 40:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 34]]);
  }));
  return _main.apply(this, arguments);
}
main()["catch"](console.error);