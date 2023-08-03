var Ne = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xu(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function i() {
      if (this instanceof i) {
        var f = [null];
        f.push.apply(f, arguments);
        var r = Function.bind.apply(t, f);
        return new r();
      }
      return t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var f = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(n, i, f.get ? f : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), n;
}
var lr = {}, Wa = {}, Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
Li.getUniqueId = void 0;
const f1 = 4294967295;
let Vf = Math.floor(Math.random() * f1);
function Ib() {
  return Vf = (Vf + 1) % f1, Vf;
}
Li.getUniqueId = Ib;
Object.defineProperty(Wa, "__esModule", { value: !0 });
Wa.createIdRemapMiddleware = void 0;
const Tb = Li;
function Pb() {
  return (e, t, n, i) => {
    const f = e.id, r = Tb.getUniqueId();
    e.id = r, t.id = r, n((o) => {
      e.id = f, t.id = f, o();
    });
  };
}
Wa.createIdRemapMiddleware = Pb;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
Ja.createAsyncMiddleware = void 0;
function Cb(e) {
  return async (t, n, i, f) => {
    let r;
    const o = new Promise((u) => {
      r = u;
    });
    let s = null, c = !1;
    const l = async () => {
      c = !0, i((u) => {
        s = u, r();
      }), await o;
    };
    try {
      await e(t, n, l), c ? (await o, s(null)) : f(null);
    } catch (u) {
      s ? s(u) : f(u);
    }
  };
}
Ja.createAsyncMiddleware = Cb;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
Xa.createScaffoldMiddleware = void 0;
function Ob(e) {
  return (t, n, i, f) => {
    const r = e[t.method];
    return r === void 0 ? i() : typeof r == "function" ? r(t, n, i, f) : (n.result = r, f());
  };
}
Xa.createScaffoldMiddleware = Ob;
var $i = {}, Za = {}, Zr = {}, Nb = {
  get exports() {
    return Zr;
  },
  set exports(e) {
    Zr = e;
  }
}, qn = typeof Reflect == "object" ? Reflect : null, n0 = qn && typeof qn.apply == "function" ? qn.apply : function(t, n, i) {
  return Function.prototype.apply.call(t, n, i);
}, ha;
qn && typeof qn.ownKeys == "function" ? ha = qn.ownKeys : Object.getOwnPropertySymbols ? ha = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : ha = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Lb(e) {
  console && console.warn && console.warn(e);
}
var o1 = Number.isNaN || function(t) {
  return t !== t;
};
function Nt() {
  Nt.init.call(this);
}
Nb.exports = Nt;
Zr.once = Db;
Nt.EventEmitter = Nt;
Nt.prototype._events = void 0;
Nt.prototype._eventsCount = 0;
Nt.prototype._maxListeners = void 0;
var i0 = 10;
function Ya(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Nt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return i0;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || o1(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    i0 = e;
  }
});
Nt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Nt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || o1(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function s1(e) {
  return e._maxListeners === void 0 ? Nt.defaultMaxListeners : e._maxListeners;
}
Nt.prototype.getMaxListeners = function() {
  return s1(this);
};
Nt.prototype.emit = function(t) {
  for (var n = [], i = 1; i < arguments.length; i++)
    n.push(arguments[i]);
  var f = t === "error", r = this._events;
  if (r !== void 0)
    f = f && r.error === void 0;
  else if (!f)
    return !1;
  if (f) {
    var o;
    if (n.length > 0 && (o = n[0]), o instanceof Error)
      throw o;
    var s = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw s.context = o, s;
  }
  var c = r[t];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    n0(c, this, n);
  else
    for (var l = c.length, u = d1(c, l), i = 0; i < l; ++i)
      n0(u[i], this, n);
  return !0;
};
function u1(e, t, n, i) {
  var f, r, o;
  if (Ya(n), r = e._events, r === void 0 ? (r = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (r.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), r = e._events), o = r[t]), o === void 0)
    o = r[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = r[t] = i ? [n, o] : [o, n] : i ? o.unshift(n) : o.push(n), f = s1(e), f > 0 && o.length > f && !o.warned) {
    o.warned = !0;
    var s = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    s.name = "MaxListenersExceededWarning", s.emitter = e, s.type = t, s.count = o.length, Lb(s);
  }
  return e;
}
Nt.prototype.addListener = function(t, n) {
  return u1(this, t, n, !1);
};
Nt.prototype.on = Nt.prototype.addListener;
Nt.prototype.prependListener = function(t, n) {
  return u1(this, t, n, !0);
};
function $b() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function c1(e, t, n) {
  var i = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, f = $b.bind(i);
  return f.listener = n, i.wrapFn = f, f;
}
Nt.prototype.once = function(t, n) {
  return Ya(n), this.on(t, c1(this, t, n)), this;
};
Nt.prototype.prependOnceListener = function(t, n) {
  return Ya(n), this.prependListener(t, c1(this, t, n)), this;
};
Nt.prototype.removeListener = function(t, n) {
  var i, f, r, o, s;
  if (Ya(n), f = this._events, f === void 0)
    return this;
  if (i = f[t], i === void 0)
    return this;
  if (i === n || i.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete f[t], f.removeListener && this.emit("removeListener", t, i.listener || n));
  else if (typeof i != "function") {
    for (r = -1, o = i.length - 1; o >= 0; o--)
      if (i[o] === n || i[o].listener === n) {
        s = i[o].listener, r = o;
        break;
      }
    if (r < 0)
      return this;
    r === 0 ? i.shift() : kb(i, r), i.length === 1 && (f[t] = i[0]), f.removeListener !== void 0 && this.emit("removeListener", t, s || n);
  }
  return this;
};
Nt.prototype.off = Nt.prototype.removeListener;
Nt.prototype.removeAllListeners = function(t) {
  var n, i, f;
  if (i = this._events, i === void 0)
    return this;
  if (i.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : i[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete i[t]), this;
  if (arguments.length === 0) {
    var r = Object.keys(i), o;
    for (f = 0; f < r.length; ++f)
      o = r[f], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = i[t], typeof n == "function")
    this.removeListener(t, n);
  else if (n !== void 0)
    for (f = n.length - 1; f >= 0; f--)
      this.removeListener(t, n[f]);
  return this;
};
function h1(e, t, n) {
  var i = e._events;
  if (i === void 0)
    return [];
  var f = i[t];
  return f === void 0 ? [] : typeof f == "function" ? n ? [f.listener || f] : [f] : n ? jb(f) : d1(f, f.length);
}
Nt.prototype.listeners = function(t) {
  return h1(this, t, !0);
};
Nt.prototype.rawListeners = function(t) {
  return h1(this, t, !1);
};
Nt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : l1.call(e, t);
};
Nt.prototype.listenerCount = l1;
function l1(e) {
  var t = this._events;
  if (t !== void 0) {
    var n = t[e];
    if (typeof n == "function")
      return 1;
    if (n !== void 0)
      return n.length;
  }
  return 0;
}
Nt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ha(this._events) : [];
};
function d1(e, t) {
  for (var n = new Array(t), i = 0; i < t; ++i)
    n[i] = e[i];
  return n;
}
function kb(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function jb(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function Db(e, t) {
  return new Promise(function(n, i) {
    function f(o) {
      e.removeListener(t, r), i(o);
    }
    function r() {
      typeof e.removeListener == "function" && e.removeListener("error", f), n([].slice.call(arguments));
    }
    p1(e, t, r, { once: !0 }), t !== "error" && qb(e, f, { once: !0 });
  });
}
function qb(e, t, n) {
  typeof e.on == "function" && p1(e, "error", t, n);
}
function p1(e, t, n, i) {
  if (typeof e.on == "function")
    i.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function f(r) {
      i.once && e.removeEventListener(t, f), n(r);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
Object.defineProperty(Za, "__esModule", { value: !0 });
const Ub = Zr;
function a0(e, t, n) {
  try {
    Reflect.apply(e, t, n);
  } catch (i) {
    setTimeout(() => {
      throw i;
    });
  }
}
function Fb(e) {
  const t = e.length, n = new Array(t);
  for (let i = 0; i < t; i += 1)
    n[i] = e[i];
  return n;
}
let Hb = class extends Ub.EventEmitter {
  emit(t, ...n) {
    let i = t === "error";
    const f = this._events;
    if (f !== void 0)
      i = i && f.error === void 0;
    else if (!i)
      return !1;
    if (i) {
      let o;
      if (n.length > 0 && ([o] = n), o instanceof Error)
        throw o;
      const s = new Error(`Unhandled error.${o ? ` (${o.message})` : ""}`);
      throw s.context = o, s;
    }
    const r = f[t];
    if (r === void 0)
      return !1;
    if (typeof r == "function")
      a0(r, this, n);
    else {
      const o = r.length, s = Fb(r);
      for (let c = 0; c < o; c += 1)
        a0(s[c], this, n);
    }
    return !0;
  }
};
Za.default = Hb;
var Gt = {}, un = {}, zb = xi;
xi.default = xi;
xi.stable = y1;
xi.stableStringify = y1;
var va = "[...]", v1 = "[Circular]", Sn = [], wn = [];
function b1() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function xi(e, t, n, i) {
  typeof i > "u" && (i = b1()), $u(e, "", 0, [], void 0, 0, i);
  var f;
  try {
    wn.length === 0 ? f = JSON.stringify(e, t, n) : f = JSON.stringify(e, g1(t), n);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; Sn.length !== 0; ) {
      var r = Sn.pop();
      r.length === 4 ? Object.defineProperty(r[0], r[1], r[3]) : r[0][r[1]] = r[2];
    }
  }
  return f;
}
function Un(e, t, n, i) {
  var f = Object.getOwnPropertyDescriptor(i, n);
  f.get !== void 0 ? f.configurable ? (Object.defineProperty(i, n, { value: e }), Sn.push([i, n, t, f])) : wn.push([t, n, e]) : (i[n] = e, Sn.push([i, n, t]));
}
function $u(e, t, n, i, f, r, o) {
  r += 1;
  var s;
  if (typeof e == "object" && e !== null) {
    for (s = 0; s < i.length; s++)
      if (i[s] === e) {
        Un(v1, e, t, f);
        return;
      }
    if (typeof o.depthLimit < "u" && r > o.depthLimit) {
      Un(va, e, t, f);
      return;
    }
    if (typeof o.edgesLimit < "u" && n + 1 > o.edgesLimit) {
      Un(va, e, t, f);
      return;
    }
    if (i.push(e), Array.isArray(e))
      for (s = 0; s < e.length; s++)
        $u(e[s], s, s, i, e, r, o);
    else {
      var c = Object.keys(e);
      for (s = 0; s < c.length; s++) {
        var l = c[s];
        $u(e[l], l, s, i, e, r, o);
      }
    }
    i.pop();
  }
}
function Vb(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function y1(e, t, n, i) {
  typeof i > "u" && (i = b1());
  var f = ku(e, "", 0, [], void 0, 0, i) || e, r;
  try {
    wn.length === 0 ? r = JSON.stringify(f, t, n) : r = JSON.stringify(f, g1(t), n);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; Sn.length !== 0; ) {
      var o = Sn.pop();
      o.length === 4 ? Object.defineProperty(o[0], o[1], o[3]) : o[0][o[1]] = o[2];
    }
  }
  return r;
}
function ku(e, t, n, i, f, r, o) {
  r += 1;
  var s;
  if (typeof e == "object" && e !== null) {
    for (s = 0; s < i.length; s++)
      if (i[s] === e) {
        Un(v1, e, t, f);
        return;
      }
    try {
      if (typeof e.toJSON == "function")
        return;
    } catch {
      return;
    }
    if (typeof o.depthLimit < "u" && r > o.depthLimit) {
      Un(va, e, t, f);
      return;
    }
    if (typeof o.edgesLimit < "u" && n + 1 > o.edgesLimit) {
      Un(va, e, t, f);
      return;
    }
    if (i.push(e), Array.isArray(e))
      for (s = 0; s < e.length; s++)
        ku(e[s], s, s, i, e, r, o);
    else {
      var c = {}, l = Object.keys(e).sort(Vb);
      for (s = 0; s < l.length; s++) {
        var u = l[s];
        ku(e[u], u, s, i, e, r, o), c[u] = e[u];
      }
      if (typeof f < "u")
        Sn.push([f, t, e]), f[t] = c;
      else
        return c;
    }
    i.pop();
  }
}
function g1(e) {
  return e = typeof e < "u" ? e : function(t, n) {
    return n;
  }, function(t, n) {
    if (wn.length > 0)
      for (var i = 0; i < wn.length; i++) {
        var f = wn[i];
        if (f[1] === t && f[0] === n) {
          n = f[2], wn.splice(i, 1);
          break;
        }
      }
    return e.call(this, t, n);
  };
}
Object.defineProperty(un, "__esModule", { value: !0 });
un.EthereumProviderError = un.EthereumRpcError = void 0;
const Kb = zb;
class m1 extends Error {
  constructor(t, n, i) {
    if (!Number.isInteger(t))
      throw new Error('"code" must be an integer.');
    if (!n || typeof n != "string")
      throw new Error('"message" must be a nonempty string.');
    super(n), this.code = t, i !== void 0 && (this.data = i);
  }
  /**
   * Returns a plain object with all public class properties.
   */
  serialize() {
    const t = {
      code: this.code,
      message: this.message
    };
    return this.data !== void 0 && (t.data = this.data), this.stack && (t.stack = this.stack), t;
  }
  /**
   * Return a string representation of the serialized error, omitting
   * any circular references.
   */
  toString() {
    return Kb.default(this.serialize(), Jb, 2);
  }
}
un.EthereumRpcError = m1;
class Gb extends m1 {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(t, n, i) {
    if (!Wb(t))
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    super(t, n, i);
  }
}
un.EthereumProviderError = Gb;
function Wb(e) {
  return Number.isInteger(e) && e >= 1e3 && e <= 4999;
}
function Jb(e, t) {
  if (t !== "[Circular]")
    return t;
}
var Zu = {}, cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
cn.errorValues = cn.errorCodes = void 0;
cn.errorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901
  }
};
cn.errorValues = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object."
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available."
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s)."
  },
  "-32603": {
    standard: "JSON RPC 2.0",
    message: "Internal JSON-RPC error."
  },
  "-32000": {
    standard: "EIP-1474",
    message: "Invalid input."
  },
  "-32001": {
    standard: "EIP-1474",
    message: "Resource not found."
  },
  "-32002": {
    standard: "EIP-1474",
    message: "Resource unavailable."
  },
  "-32003": {
    standard: "EIP-1474",
    message: "Transaction rejected."
  },
  "-32004": {
    standard: "EIP-1474",
    message: "Method not supported."
  },
  "-32005": {
    standard: "EIP-1474",
    message: "Request limit exceeded."
  },
  4001: {
    standard: "EIP-1193",
    message: "User rejected the request."
  },
  4100: {
    standard: "EIP-1193",
    message: "The requested account and/or method has not been authorized by the user."
  },
  4200: {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider."
  },
  4900: {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains."
  },
  4901: {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain."
  }
};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.serializeError = e.isValidCode = e.getMessageFromCode = e.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
  const t = cn, n = un, i = t.errorCodes.rpc.internal, f = "Unspecified error message. This is a bug, please report it.", r = {
    code: i,
    message: o(i)
  };
  e.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
  function o(p, g = f) {
    if (Number.isInteger(p)) {
      const w = p.toString();
      if (v(t.errorValues, w))
        return t.errorValues[w].message;
      if (l(p))
        return e.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return g;
  }
  e.getMessageFromCode = o;
  function s(p) {
    if (!Number.isInteger(p))
      return !1;
    const g = p.toString();
    return !!(t.errorValues[g] || l(p));
  }
  e.isValidCode = s;
  function c(p, { fallbackError: g = r, shouldIncludeStack: w = !1 } = {}) {
    var S, T;
    if (!g || !Number.isInteger(g.code) || typeof g.message != "string")
      throw new Error("Must provide fallback error with integer number code and string message.");
    if (p instanceof n.EthereumRpcError)
      return p.serialize();
    const I = {};
    if (p && typeof p == "object" && !Array.isArray(p) && v(p, "code") && s(p.code)) {
      const N = p;
      I.code = N.code, N.message && typeof N.message == "string" ? (I.message = N.message, v(N, "data") && (I.data = N.data)) : (I.message = o(I.code), I.data = { originalError: u(p) });
    } else {
      I.code = g.code;
      const N = (S = p) === null || S === void 0 ? void 0 : S.message;
      I.message = N && typeof N == "string" ? N : g.message, I.data = { originalError: u(p) };
    }
    const C = (T = p) === null || T === void 0 ? void 0 : T.stack;
    return w && p && C && typeof C == "string" && (I.stack = C), I;
  }
  e.serializeError = c;
  function l(p) {
    return p >= -32099 && p <= -32e3;
  }
  function u(p) {
    return p && typeof p == "object" && !Array.isArray(p) ? Object.assign({}, p) : p;
  }
  function v(p, g) {
    return Object.prototype.hasOwnProperty.call(p, g);
  }
})(Zu);
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
Qa.ethErrors = void 0;
const Yu = un, w1 = Zu, rr = cn;
Qa.ethErrors = {
  rpc: {
    /**
     * Get a JSON RPC 2.0 Parse (-32700) error.
     */
    parse: (e) => dr(rr.errorCodes.rpc.parse, e),
    /**
     * Get a JSON RPC 2.0 Invalid Request (-32600) error.
     */
    invalidRequest: (e) => dr(rr.errorCodes.rpc.invalidRequest, e),
    /**
     * Get a JSON RPC 2.0 Invalid Params (-32602) error.
     */
    invalidParams: (e) => dr(rr.errorCodes.rpc.invalidParams, e),
    /**
     * Get a JSON RPC 2.0 Method Not Found (-32601) error.
     */
    methodNotFound: (e) => dr(rr.errorCodes.rpc.methodNotFound, e),
    /**
     * Get a JSON RPC 2.0 Internal (-32603) error.
     */
    internal: (e) => dr(rr.errorCodes.rpc.internal, e),
    /**
     * Get a JSON RPC 2.0 Server error.
     * Permits integer error codes in the [ -32099 <= -32005 ] range.
     * Codes -32000 through -32004 are reserved by EIP-1474.
     */
    server: (e) => {
      if (!e || typeof e != "object" || Array.isArray(e))
        throw new Error("Ethereum RPC Server errors must provide single object argument.");
      const { code: t } = e;
      if (!Number.isInteger(t) || t > -32005 || t < -32099)
        throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
      return dr(t, e);
    },
    /**
     * Get an Ethereum JSON RPC Invalid Input (-32000) error.
     */
    invalidInput: (e) => dr(rr.errorCodes.rpc.invalidInput, e),
    /**
     * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
     */
    resourceNotFound: (e) => dr(rr.errorCodes.rpc.resourceNotFound, e),
    /**
     * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
     */
    resourceUnavailable: (e) => dr(rr.errorCodes.rpc.resourceUnavailable, e),
    /**
     * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
     */
    transactionRejected: (e) => dr(rr.errorCodes.rpc.transactionRejected, e),
    /**
     * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
     */
    methodNotSupported: (e) => dr(rr.errorCodes.rpc.methodNotSupported, e),
    /**
     * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
     */
    limitExceeded: (e) => dr(rr.errorCodes.rpc.limitExceeded, e)
  },
  provider: {
    /**
     * Get an Ethereum Provider User Rejected Request (4001) error.
     */
    userRejectedRequest: (e) => ui(rr.errorCodes.provider.userRejectedRequest, e),
    /**
     * Get an Ethereum Provider Unauthorized (4100) error.
     */
    unauthorized: (e) => ui(rr.errorCodes.provider.unauthorized, e),
    /**
     * Get an Ethereum Provider Unsupported Method (4200) error.
     */
    unsupportedMethod: (e) => ui(rr.errorCodes.provider.unsupportedMethod, e),
    /**
     * Get an Ethereum Provider Not Connected (4900) error.
     */
    disconnected: (e) => ui(rr.errorCodes.provider.disconnected, e),
    /**
     * Get an Ethereum Provider Chain Not Connected (4901) error.
     */
    chainDisconnected: (e) => ui(rr.errorCodes.provider.chainDisconnected, e),
    /**
     * Get a custom Ethereum Provider error.
     */
    custom: (e) => {
      if (!e || typeof e != "object" || Array.isArray(e))
        throw new Error("Ethereum Provider custom errors must provide single object argument.");
      const { code: t, message: n, data: i } = e;
      if (!n || typeof n != "string")
        throw new Error('"message" must be a nonempty string');
      return new Yu.EthereumProviderError(t, n, i);
    }
  }
};
function dr(e, t) {
  const [n, i] = _1(t);
  return new Yu.EthereumRpcError(e, n || w1.getMessageFromCode(e), i);
}
function ui(e, t) {
  const [n, i] = _1(t);
  return new Yu.EthereumProviderError(e, n || w1.getMessageFromCode(e), i);
}
function _1(e) {
  if (e) {
    if (typeof e == "string")
      return [e];
    if (typeof e == "object" && !Array.isArray(e)) {
      const { message: t, data: n } = e;
      if (t && typeof t != "string")
        throw new Error("Must specify string message.");
      return [t || void 0, n];
    }
  }
  return [];
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getMessageFromCode = e.serializeError = e.EthereumProviderError = e.EthereumRpcError = e.ethErrors = e.errorCodes = void 0;
  const t = un;
  Object.defineProperty(e, "EthereumRpcError", { enumerable: !0, get: function() {
    return t.EthereumRpcError;
  } }), Object.defineProperty(e, "EthereumProviderError", { enumerable: !0, get: function() {
    return t.EthereumProviderError;
  } });
  const n = Zu;
  Object.defineProperty(e, "serializeError", { enumerable: !0, get: function() {
    return n.serializeError;
  } }), Object.defineProperty(e, "getMessageFromCode", { enumerable: !0, get: function() {
    return n.getMessageFromCode;
  } });
  const i = Qa;
  Object.defineProperty(e, "ethErrors", { enumerable: !0, get: function() {
    return i.ethErrors;
  } });
  const f = cn;
  Object.defineProperty(e, "errorCodes", { enumerable: !0, get: function() {
    return f.errorCodes;
  } });
})(Gt);
var Xb = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty($i, "__esModule", { value: !0 });
$i.JsonRpcEngine = void 0;
const Zb = Xb(Za), pr = Gt;
class Gr extends Zb.default {
  constructor() {
    super(), this._middleware = [];
  }
  /**
   * Add a middleware function to the engine's middleware stack.
   *
   * @param middleware - The middleware function to add.
   */
  push(t) {
    this._middleware.push(t);
  }
  handle(t, n) {
    if (n && typeof n != "function")
      throw new Error('"callback" must be a function if provided.');
    return Array.isArray(t) ? n ? this._handleBatch(t, n) : this._handleBatch(t) : n ? this._handle(t, n) : this._promiseHandle(t);
  }
  /**
   * Returns this engine as a middleware function that can be pushed to other
   * engines.
   *
   * @returns This engine as a middleware function.
   */
  asMiddleware() {
    return async (t, n, i, f) => {
      try {
        const [r, o, s] = await Gr._runAllMiddleware(t, n, this._middleware);
        return o ? (await Gr._runReturnHandlers(s), f(r)) : i(async (c) => {
          try {
            await Gr._runReturnHandlers(s);
          } catch (l) {
            return c(l);
          }
          return c();
        });
      } catch (r) {
        return f(r);
      }
    };
  }
  async _handleBatch(t, n) {
    try {
      const i = await Promise.all(
        // 1. Begin executing each request in the order received
        t.map(this._promiseHandle.bind(this))
      );
      return n ? n(null, i) : i;
    } catch (i) {
      if (n)
        return n(i);
      throw i;
    }
  }
  /**
   * A promise-wrapped _handle.
   */
  _promiseHandle(t) {
    return new Promise((n) => {
      this._handle(t, (i, f) => {
        n(f);
      });
    });
  }
  /**
   * Ensures that the request object is valid, processes it, and passes any
   * error and the response object to the given callback.
   *
   * Does not reject.
   */
  async _handle(t, n) {
    if (!t || Array.isArray(t) || typeof t != "object") {
      const o = new pr.EthereumRpcError(pr.errorCodes.rpc.invalidRequest, `Requests must be plain objects. Received: ${typeof t}`, { request: t });
      return n(o, { id: void 0, jsonrpc: "2.0", error: o });
    }
    if (typeof t.method != "string") {
      const o = new pr.EthereumRpcError(pr.errorCodes.rpc.invalidRequest, `Must specify a string method. Received: ${typeof t.method}`, { request: t });
      return n(o, { id: t.id, jsonrpc: "2.0", error: o });
    }
    const i = Object.assign({}, t), f = {
      id: i.id,
      jsonrpc: i.jsonrpc
    };
    let r = null;
    try {
      await this._processRequest(i, f);
    } catch (o) {
      r = o;
    }
    return r && (delete f.result, f.error || (f.error = pr.serializeError(r))), n(r, f);
  }
  /**
   * For the given request and response, runs all middleware and their return
   * handlers, if any, and ensures that internal request processing semantics
   * are satisfied.
   */
  async _processRequest(t, n) {
    const [i, f, r] = await Gr._runAllMiddleware(t, n, this._middleware);
    if (Gr._checkForCompletion(t, n, f), await Gr._runReturnHandlers(r), i)
      throw i;
  }
  /**
   * Serially executes the given stack of middleware.
   *
   * @returns An array of any error encountered during middleware execution,
   * a boolean indicating whether the request was completed, and an array of
   * middleware-defined return handlers.
   */
  static async _runAllMiddleware(t, n, i) {
    const f = [];
    let r = null, o = !1;
    for (const s of i)
      if ([r, o] = await Gr._runMiddleware(t, n, s, f), o)
        break;
    return [r, o, f.reverse()];
  }
  /**
   * Runs an individual middleware.
   *
   * @returns An array of any error encountered during middleware exection,
   * and a boolean indicating whether the request should end.
   */
  static _runMiddleware(t, n, i, f) {
    return new Promise((r) => {
      const o = (c) => {
        const l = c || n.error;
        l && (n.error = pr.serializeError(l)), r([l, !0]);
      }, s = (c) => {
        n.error ? o(n.error) : (c && (typeof c != "function" && o(new pr.EthereumRpcError(pr.errorCodes.rpc.internal, `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof c}" for request:
${Kf(t)}`, { request: t })), f.push(c)), r([null, !1]));
      };
      try {
        i(t, n, s, o);
      } catch (c) {
        o(c);
      }
    });
  }
  /**
   * Serially executes array of return handlers. The request and response are
   * assumed to be in their scope.
   */
  static async _runReturnHandlers(t) {
    for (const n of t)
      await new Promise((i, f) => {
        n((r) => r ? f(r) : i());
      });
  }
  /**
   * Throws an error if the response has neither a result nor an error, or if
   * the "isComplete" flag is falsy.
   */
  static _checkForCompletion(t, n, i) {
    if (!("result" in n) && !("error" in n))
      throw new pr.EthereumRpcError(pr.errorCodes.rpc.internal, `JsonRpcEngine: Response has no error or result for request:
${Kf(t)}`, { request: t });
    if (!i)
      throw new pr.EthereumRpcError(pr.errorCodes.rpc.internal, `JsonRpcEngine: Nothing ended request:
${Kf(t)}`, { request: t });
  }
}
$i.JsonRpcEngine = Gr;
function Kf(e) {
  return JSON.stringify(e, null, 2);
}
var ef = {};
Object.defineProperty(ef, "__esModule", { value: !0 });
ef.mergeMiddleware = void 0;
const Yb = $i;
function Qb(e) {
  const t = new Yb.JsonRpcEngine();
  return e.forEach((n) => t.push(n)), t.asMiddleware();
}
ef.mergeMiddleware = Qb;
(function(e) {
  var t = Ne && Ne.__createBinding || (Object.create ? function(i, f, r, o) {
    o === void 0 && (o = r), Object.defineProperty(i, o, { enumerable: !0, get: function() {
      return f[r];
    } });
  } : function(i, f, r, o) {
    o === void 0 && (o = r), i[o] = f[r];
  }), n = Ne && Ne.__exportStar || function(i, f) {
    for (var r in i)
      r !== "default" && !Object.prototype.hasOwnProperty.call(f, r) && t(f, i, r);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(Wa, e), n(Ja, e), n(Xa, e), n(Li, e), n($i, e), n(ef, e);
})(lr);
var ey = function e(t, n) {
  if (t === n)
    return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor)
      return !1;
    var i, f, r;
    if (Array.isArray(t)) {
      if (i = t.length, i != n.length)
        return !1;
      for (f = i; f-- !== 0; )
        if (!e(t[f], n[f]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (r = Object.keys(t), i = r.length, i !== Object.keys(n).length)
      return !1;
    for (f = i; f-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, r[f]))
        return !1;
    for (f = i; f-- !== 0; ) {
      var o = r[f];
      if (!e(t[o], n[o]))
        return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const ty = (e, t, n = !0) => (i, f) => {
  i || f.error ? t(i || f.error) : !n || Array.isArray(f) ? e(f) : e(f.result);
}, ry = (e) => Boolean(e) && typeof e == "string" && e.startsWith("0x");
function f0(e, t, n) {
  try {
    Reflect.apply(e, t, n);
  } catch (i) {
    setTimeout(() => {
      throw i;
    });
  }
}
function ny(e) {
  const t = e.length, n = new Array(t);
  for (let i = 0; i < t; i += 1)
    n[i] = e[i];
  return n;
}
class iy extends Zr.EventEmitter {
  emit(t, ...n) {
    let i = t === "error";
    const f = this._events;
    if (f !== void 0)
      i = i && f.error === void 0;
    else if (!i)
      return !1;
    if (i) {
      let o;
      if (n.length > 0 && ([o] = n), o instanceof Error)
        throw o;
      const s = new Error(`Unhandled error.${o ? ` (${o.message})` : ""}`);
      throw s.context = o, s;
    }
    const r = f[t];
    if (r === void 0)
      return !1;
    if (typeof r == "function")
      f0(r, this, n);
    else {
      const o = r.length, s = ny(r);
      for (let c = 0; c < o; c += 1)
        f0(s[c], this, n);
    }
    return !0;
  }
}
const x1 = class extends iy {
  constructor({
    logger: e = console,
    maxEventListeners: t = 100,
    rpcMiddleware: n = []
  } = {}) {
    super(), this.uuid = "wepinprovider", this.name = "Wepin", this._log = e, this.setMaxListeners(t), this._state = {
      ...x1._defaultState
    }, this.selectedAddress = null, this.chainId = null, this._handleAccountsChanged = this._handleAccountsChanged.bind(this), this._handleConnect = this._handleConnect.bind(this), this._handleChainChanged = this._handleChainChanged.bind(this), this._handleDisconnect = this._handleDisconnect.bind(this), this._rpcRequest = this._rpcRequest.bind(this), this.request = this.request.bind(this);
    const i = new lr.JsonRpcEngine();
    n.forEach((f) => i.push(f)), this._rpcEngine = i;
  }
  async request(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw Gt.ethErrors.rpc.invalidRequest({
        message: "Invalid request arguments",
        data: e
      });
    this._log.debug("[RPC Request]: requesting args", e);
    const { method: t, params: n, id: i = new Date().getTime() } = e;
    if (typeof t != "string" || t.length === 0)
      throw Gt.ethErrors.rpc.invalidRequest({
        message: "Invalid request methods",
        data: e
      });
    if (n !== void 0 && !Array.isArray(n) && (typeof n != "object" || n === null))
      throw Gt.ethErrors.rpc.invalidRequest({
        message: "Invalid request params",
        data: e
      });
    return new Promise((f, r) => {
      this._rpcRequest(
        { method: t, params: n, id: i },
        ty(f, r)
      );
    });
  }
  /**
   * Initialize provider
   *
   * @param initialState
   */
  _initializeState(e) {
    if (this._state.initialized === !0)
      throw new Error("Provider already initialized.");
    if (e) {
      const { accounts: t, chainId: n, networkVersion: i } = e;
      this._handleConnect(n), this._handleChainChanged({ chainId: n, networkVersion: i }), this._handleAccountsChanged(t);
    }
    this._state.initialized = !0, this.emit("_initialized");
  }
  _rpcRequest(e, t) {
    let n = t;
    return Array.isArray(e) ? this._rpcEngine.handle(e, n) : (e.jsonrpc || (e.jsonrpc = "2.0"), (e.method === "eth_accounts" || e.method === "klay_accounts" || e.method === "eth_requestAccounts" || e.method === "klay_requestAccounts") && (n = (i, f) => {
      this._log.debug("_rpcRequest to handler account changes", i, f), this._handleAccountsChanged(
        f.result || [],
        e.method === "eth_accounts"
      ), t(i, f);
    }), this._rpcEngine.handle(e, n));
  }
  _handleConnect(e) {
    this._state.isConnected || (this._state.isConnected = !0, this.emit("connect", { chainId: e }));
  }
  _handleDisconnect(e, t) {
    if (this._state.isConnected || !this._state.isPermanentlyDisconnected && !e) {
      this._state.isConnected = !1;
      let n;
      e ? (n = new Gt.EthereumRpcError(
        1013,
        // Try again later
        t || "Provider diconnected"
      ), this._log.debug(n)) : (n = new Gt.EthereumRpcError(
        1011,
        // Internal error
        t || "Provider permenantly disconnected"
      ), this._log.error(n), this.chainId = null, this._state.accounts = null, this.selectedAddress = null, this._state.isPermanentlyDisconnected = !0), this.emit("disconnect", n);
    }
  }
  _handleChainChanged({
    chainId: e
  } = {}) {
    if (!ry(e)) {
      this._log.error("Invalid network params", { chainId: e });
      return;
    }
    this._handleConnect(e), e !== this.chainId && (this.chainId = e, this._state.initialized && this.emit("chainChanged", this.chainId));
  }
  _handleAccountsChanged(e, t = !1) {
    let n = e;
    Array.isArray(e) || (this._log.error(
      "Received invalid accounts parameter. Please report this bug.",
      e
    ), n = []);
    for (const i of e)
      if (typeof i != "string") {
        this._log.error(
          "Received non-string account. Please report this bug.",
          e
        ), n = [];
        break;
      }
    ey(this._state.accounts, n) || (t && this._state.accounts !== null && this._log.error(
      "'eth_accounts' unexpectedly updated accounts. Please report this bug.",
      n
    ), this._state.accounts = n, this.selectedAddress !== n[0] && (this.selectedAddress = n[0] || null), this._state.initialized && this.emit("accountsChanged", n));
  }
};
let Qu = x1;
Qu._defaultState = {
  accounts: null,
  isConnected: !1,
  initialized: !1,
  isPermanentlyDisconnected: !1
};
const ay = () => new Date().getTime(), ki = ({
  wepin: e,
  network: t,
  req: n,
  res: i,
  next: f,
  end: r,
  command: o,
  parameter: s
}) => {
  const c = ay();
  e.once(c.toString(), (u) => {
    if (u.body.data === "User Cancel")
      throw Gt.ethErrors.provider.userRejectedRequest();
    i.result = u.body.data === "User Cancel" ? "" : u.body.data, r();
  });
  const l = {
    header: {
      request_from: "web",
      request_to: "wepin_widget",
      id: c
    },
    body: {
      command: o,
      parameter: s
    }
  };
  e.queue.push(l), e.Widget.isOpen || e.openWidget();
}, ba = ({ wepin: e, network: t }) => (n, i, f, r) => {
  if (!e._isInitialized)
    throw Gt.ethErrors.provider.unauthorized();
  const o = {
    network: t
  }, { ethereum: s } = window;
  s != null && s.selectedAddress ? (i.result = [s.selectedAddress], r()) : ki({
    wepin: e,
    network: t,
    req: n,
    res: i,
    next: f,
    end: r,
    command: "request_enable",
    parameter: o
  });
}, E1 = ({ wepin: e, network: t }) => (n, i, f, r) => {
  if (!e._isInitialized)
    throw Gt.ethErrors.provider.unauthorized();
  const o = Array.isArray(n.params) ? n.params[0] : n.params;
  Object.values(o).forEach((c) => {
    if (c && !c.startsWith("0x"))
      throw console.error(`${c} is not start with '0x'`), Gt.ethErrors.rpc.invalidParams();
  });
  const s = {
    account: {
      address: n.params[0].from,
      network: t
    },
    ...n.params[0]
  };
  ki({
    wepin: e,
    network: t,
    req: n,
    res: i,
    next: f,
    end: r,
    command: "sign_transaction",
    parameter: s
  });
}, S1 = ({ wepin: e, network: t }) => (n, i, f, r) => {
  if (!e._isInitialized)
    throw Gt.ethErrors.provider.unauthorized();
  const o = Array.isArray(n.params) ? n.params[0] : n.params;
  Object.values(o).forEach((s) => {
    if (s && !s.startsWith("0x"))
      throw console.error(`${s} is not start with '0x'`), Gt.ethErrors.rpc.invalidParams();
  }), ki({
    wepin: e,
    network: t,
    req: n,
    res: i,
    next: f,
    end: r,
    command: "send_transaction",
    parameter: {
      account: {
        address: n.params[0].from,
        network: t
      },
      ...n.params[0]
    }
  });
}, Fn = ({
  wepin: e,
  network: t,
  version: n
}) => (i, f, r, o) => {
  if (!e._isInitialized)
    throw Gt.ethErrors.provider.unauthorized();
  if (i.params.length !== 2)
    throw Gt.ethErrors.rpc.invalidParams;
  const s = {
    account: {
      network: t,
      address: i.params[0]
    },
    data: i.params[1],
    version: n
  };
  ki({
    wepin: e,
    network: t,
    req: i,
    res: f,
    next: r,
    end: o,
    command: "sign_typed_data",
    parameter: s
  });
}, ya = ({
  wepin: e,
  network: t,
  isPersonal: n
}) => (i, f, r, o) => {
  if (!e._isInitialized)
    throw Gt.ethErrors.provider.unauthorized();
  if (i.params.length !== 2)
    throw Gt.ethErrors.rpc.invalidParams;
  const s = {
    account: {
      network: t,
      address: n ? i.params[1] : i.params[0]
    },
    data: n ? i.params[0] : i.params[1]
  };
  ki({
    wepin: e,
    network: t,
    req: i,
    res: f,
    next: r,
    end: o,
    command: "sign",
    parameter: s
  });
}, fy = ({
  wepin: e,
  network: t
}) => lr.createScaffoldMiddleware({
  eth_requestAccounts: ba({ wepin: e, network: t }),
  eth_accounts: ba({ wepin: e, network: t }),
  eth_signTransaction: E1({ wepin: e, network: t }),
  eth_sendTransaction: S1({ wepin: e, network: t }),
  eth_signTypedData_v1: Fn({ wepin: e, network: t, version: "V1" }),
  eth_signTypedData_v3: Fn({ wepin: e, network: t, version: "V3" }),
  eth_signTypedData_v4: Fn({ wepin: e, network: t, version: "V4" }),
  eth_sign: ya({ wepin: e, network: t, isPersonal: !1 }),
  personal_sign: ya({ wepin: e, network: t, isPersonal: !0 })
});
var ec = {}, tf = {}, ti = {}, M1 = {}, Yt = {};
class A1 extends TypeError {
  constructor(t, n) {
    let i;
    const { message: f, explanation: r, ...o } = t, { path: s } = t, c = s.length === 0 ? f : `At path: ${s.join(".")} -- ${f}`;
    super(r ?? c), r != null && (this.cause = c), Object.assign(this, o), this.name = this.constructor.name, this.failures = () => i ?? (i = [t, ...n()]);
  }
}
function oy(e) {
  return Sr(e) && typeof e[Symbol.iterator] == "function";
}
function Sr(e) {
  return typeof e == "object" && e != null;
}
function o0(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Wt(e) {
  return typeof e == "symbol" ? e.toString() : typeof e == "string" ? JSON.stringify(e) : `${e}`;
}
function sy(e) {
  const { done: t, value: n } = e.next();
  return t ? void 0 : n;
}
function uy(e, t, n, i) {
  if (e === !0)
    return;
  e === !1 ? e = {} : typeof e == "string" && (e = { message: e });
  const { path: f, branch: r } = t, { type: o } = n, { refinement: s, message: c = `Expected a value of type \`${o}\`${s ? ` with refinement \`${s}\`` : ""}, but received: \`${Wt(i)}\`` } = e;
  return {
    value: i,
    type: o,
    refinement: s,
    key: f[f.length - 1],
    path: f,
    branch: r,
    ...e,
    message: c
  };
}
function* ju(e, t, n, i) {
  oy(e) || (e = [e]);
  for (const f of e) {
    const r = uy(f, t, n, i);
    r && (yield r);
  }
}
function* tc(e, t, n = {}) {
  const { path: i = [], branch: f = [e], coerce: r = !1, mask: o = !1 } = n, s = { path: i, branch: f };
  if (r && (e = t.coercer(e, s), o && t.type !== "type" && Sr(t.schema) && Sr(e) && !Array.isArray(e)))
    for (const l in e)
      t.schema[l] === void 0 && delete e[l];
  let c = "valid";
  for (const l of t.validator(e, s))
    l.explanation = n.message, c = "not_valid", yield [l, void 0];
  for (let [l, u, v] of t.entries(e, s)) {
    const p = tc(u, v, {
      path: l === void 0 ? i : [...i, l],
      branch: l === void 0 ? f : [...f, u],
      coerce: r,
      mask: o,
      message: n.message
    });
    for (const g of p)
      g[0] ? (c = g[0].refinement != null ? "not_refined" : "not_valid", yield [g[0], void 0]) : r && (u = g[1], l === void 0 ? e = u : e instanceof Map ? e.set(l, u) : e instanceof Set ? e.add(u) : Sr(e) && (u !== void 0 || l in e) && (e[l] = u));
  }
  if (c !== "not_valid")
    for (const l of t.refiner(e, s))
      l.explanation = n.message, c = "not_refined", yield [l, void 0];
  c === "valid" && (yield [void 0, e]);
}
class zt {
  constructor(t) {
    const { type: n, schema: i, validator: f, refiner: r, coercer: o = (c) => c, entries: s = function* () {
    } } = t;
    this.type = n, this.schema = i, this.entries = s, this.coercer = o, f ? this.validator = (c, l) => {
      const u = f(c, l);
      return ju(u, l, this, c);
    } : this.validator = () => [], r ? this.refiner = (c, l) => {
      const u = r(c, l);
      return ju(u, l, this, c);
    } : this.refiner = () => [];
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(t, n) {
    return B1(t, this, n);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */
  create(t, n) {
    return R1(t, this, n);
  }
  /**
   * Check if a value passes the struct's validation.
   */
  is(t) {
    return rc(t, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */
  mask(t, n) {
    return I1(t, this, n);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */
  validate(t, n = {}) {
    return ri(t, this, n);
  }
}
function B1(e, t, n) {
  const i = ri(e, t, { message: n });
  if (i[0])
    throw i[0];
}
function R1(e, t, n) {
  const i = ri(e, t, { coerce: !0, message: n });
  if (i[0])
    throw i[0];
  return i[1];
}
function I1(e, t, n) {
  const i = ri(e, t, { coerce: !0, mask: !0, message: n });
  if (i[0])
    throw i[0];
  return i[1];
}
function rc(e, t) {
  return !ri(e, t)[0];
}
function ri(e, t, n = {}) {
  const i = tc(e, t, n), f = sy(i);
  return f[0] ? [new A1(f[0], function* () {
    for (const o of i)
      o[0] && (yield o[0]);
  }), void 0] : [void 0, f[1]];
}
function cy(...e) {
  const t = e[0].type === "type", n = e.map((f) => f.schema), i = Object.assign({}, ...n);
  return t ? ic(i) : ji(i);
}
function or(e, t) {
  return new zt({ type: e, schema: null, validator: t });
}
function hy(e, t) {
  return new zt({
    ...e,
    refiner: (n, i) => n === void 0 || e.refiner(n, i),
    validator(n, i) {
      return n === void 0 ? !0 : (t(n, i), e.validator(n, i));
    }
  });
}
function ly(e) {
  return new zt({
    type: "dynamic",
    schema: null,
    *entries(t, n) {
      yield* e(t, n).entries(t, n);
    },
    validator(t, n) {
      return e(t, n).validator(t, n);
    },
    coercer(t, n) {
      return e(t, n).coercer(t, n);
    },
    refiner(t, n) {
      return e(t, n).refiner(t, n);
    }
  });
}
function dy(e) {
  let t;
  return new zt({
    type: "lazy",
    schema: null,
    *entries(n, i) {
      t ?? (t = e()), yield* t.entries(n, i);
    },
    validator(n, i) {
      return t ?? (t = e()), t.validator(n, i);
    },
    coercer(n, i) {
      return t ?? (t = e()), t.coercer(n, i);
    },
    refiner(n, i) {
      return t ?? (t = e()), t.refiner(n, i);
    }
  });
}
function py(e, t) {
  const { schema: n } = e, i = { ...n };
  for (const f of t)
    delete i[f];
  switch (e.type) {
    case "type":
      return ic(i);
    default:
      return ji(i);
  }
}
function vy(e) {
  const t = e instanceof zt ? { ...e.schema } : { ...e };
  for (const n in t)
    t[n] = T1(t[n]);
  return ji(t);
}
function by(e, t) {
  const { schema: n } = e, i = {};
  for (const f of t)
    i[f] = n[f];
  return ji(i);
}
function yy(e, t) {
  return console.warn("superstruct@0.11 - The `struct` helper has been renamed to `define`."), or(e, t);
}
function gy() {
  return or("any", () => !0);
}
function my(e) {
  return new zt({
    type: "array",
    schema: e,
    *entries(t) {
      if (e && Array.isArray(t))
        for (const [n, i] of t.entries())
          yield [n, i, e];
    },
    coercer(t) {
      return Array.isArray(t) ? t.slice() : t;
    },
    validator(t) {
      return Array.isArray(t) || `Expected an array value, but received: ${Wt(t)}`;
    }
  });
}
function wy() {
  return or("bigint", (e) => typeof e == "bigint");
}
function _y() {
  return or("boolean", (e) => typeof e == "boolean");
}
function xy() {
  return or("date", (e) => e instanceof Date && !isNaN(e.getTime()) || `Expected a valid \`Date\` object, but received: ${Wt(e)}`);
}
function Ey(e) {
  const t = {}, n = e.map((i) => Wt(i)).join();
  for (const i of e)
    t[i] = i;
  return new zt({
    type: "enums",
    schema: t,
    validator(i) {
      return e.includes(i) || `Expected one of \`${n}\`, but received: ${Wt(i)}`;
    }
  });
}
function Sy() {
  return or("func", (e) => typeof e == "function" || `Expected a function, but received: ${Wt(e)}`);
}
function My(e) {
  return or("instance", (t) => t instanceof e || `Expected a \`${e.name}\` instance, but received: ${Wt(t)}`);
}
function Ay() {
  return or("integer", (e) => typeof e == "number" && !isNaN(e) && Number.isInteger(e) || `Expected an integer, but received: ${Wt(e)}`);
}
function By(e) {
  return new zt({
    type: "intersection",
    schema: null,
    *entries(t, n) {
      for (const i of e)
        yield* i.entries(t, n);
    },
    *validator(t, n) {
      for (const i of e)
        yield* i.validator(t, n);
    },
    *refiner(t, n) {
      for (const i of e)
        yield* i.refiner(t, n);
    }
  });
}
function Ry(e) {
  const t = Wt(e), n = typeof e;
  return new zt({
    type: "literal",
    schema: n === "string" || n === "number" || n === "boolean" ? e : null,
    validator(i) {
      return i === e || `Expected the literal \`${t}\`, but received: ${Wt(i)}`;
    }
  });
}
function Iy(e, t) {
  return new zt({
    type: "map",
    schema: null,
    *entries(n) {
      if (e && t && n instanceof Map)
        for (const [i, f] of n.entries())
          yield [i, i, e], yield [i, f, t];
    },
    coercer(n) {
      return n instanceof Map ? new Map(n) : n;
    },
    validator(n) {
      return n instanceof Map || `Expected a \`Map\` object, but received: ${Wt(n)}`;
    }
  });
}
function nc() {
  return or("never", () => !1);
}
function Ty(e) {
  return new zt({
    ...e,
    validator: (t, n) => t === null || e.validator(t, n),
    refiner: (t, n) => t === null || e.refiner(t, n)
  });
}
function Py() {
  return or("number", (e) => typeof e == "number" && !isNaN(e) || `Expected a number, but received: ${Wt(e)}`);
}
function ji(e) {
  const t = e ? Object.keys(e) : [], n = nc();
  return new zt({
    type: "object",
    schema: e || null,
    *entries(i) {
      if (e && Sr(i)) {
        const f = new Set(Object.keys(i));
        for (const r of t)
          f.delete(r), yield [r, i[r], e[r]];
        for (const r of f)
          yield [r, i[r], n];
      }
    },
    validator(i) {
      return Sr(i) || `Expected an object, but received: ${Wt(i)}`;
    },
    coercer(i) {
      return Sr(i) ? { ...i } : i;
    }
  });
}
function T1(e) {
  return new zt({
    ...e,
    validator: (t, n) => t === void 0 || e.validator(t, n),
    refiner: (t, n) => t === void 0 || e.refiner(t, n)
  });
}
function Cy(e, t) {
  return new zt({
    type: "record",
    schema: null,
    *entries(n) {
      if (Sr(n))
        for (const i in n) {
          const f = n[i];
          yield [i, i, e], yield [i, f, t];
        }
    },
    validator(n) {
      return Sr(n) || `Expected an object, but received: ${Wt(n)}`;
    }
  });
}
function Oy() {
  return or("regexp", (e) => e instanceof RegExp);
}
function Ny(e) {
  return new zt({
    type: "set",
    schema: null,
    *entries(t) {
      if (e && t instanceof Set)
        for (const n of t)
          yield [n, n, e];
    },
    coercer(t) {
      return t instanceof Set ? new Set(t) : t;
    },
    validator(t) {
      return t instanceof Set || `Expected a \`Set\` object, but received: ${Wt(t)}`;
    }
  });
}
function P1() {
  return or("string", (e) => typeof e == "string" || `Expected a string, but received: ${Wt(e)}`);
}
function Ly(e) {
  const t = nc();
  return new zt({
    type: "tuple",
    schema: null,
    *entries(n) {
      if (Array.isArray(n)) {
        const i = Math.max(e.length, n.length);
        for (let f = 0; f < i; f++)
          yield [f, n[f], e[f] || t];
      }
    },
    validator(n) {
      return Array.isArray(n) || `Expected an array, but received: ${Wt(n)}`;
    }
  });
}
function ic(e) {
  const t = Object.keys(e);
  return new zt({
    type: "type",
    schema: e,
    *entries(n) {
      if (Sr(n))
        for (const i of t)
          yield [i, n[i], e[i]];
    },
    validator(n) {
      return Sr(n) || `Expected an object, but received: ${Wt(n)}`;
    },
    coercer(n) {
      return Sr(n) ? { ...n } : n;
    }
  });
}
function $y(e) {
  const t = e.map((n) => n.type).join(" | ");
  return new zt({
    type: "union",
    schema: null,
    coercer(n) {
      for (const i of e) {
        const [f, r] = i.validate(n, { coerce: !0 });
        if (!f)
          return r;
      }
      return n;
    },
    validator(n, i) {
      const f = [];
      for (const r of e) {
        const [...o] = tc(n, r, i), [s] = o;
        if (s[0])
          for (const [c] of o)
            c && f.push(c);
        else
          return [];
      }
      return [
        `Expected the value to satisfy a union of \`${t}\`, but received: ${Wt(n)}`,
        ...f
      ];
    }
  });
}
function C1() {
  return or("unknown", () => !0);
}
function ac(e, t, n) {
  return new zt({
    ...e,
    coercer: (i, f) => rc(i, t) ? e.coercer(n(i, f), f) : e.coercer(i, f)
  });
}
function ky(e, t, n = {}) {
  return ac(e, C1(), (i) => {
    const f = typeof t == "function" ? t() : t;
    if (i === void 0)
      return f;
    if (!n.strict && o0(i) && o0(f)) {
      const r = { ...i };
      let o = !1;
      for (const s in f)
        r[s] === void 0 && (r[s] = f[s], o = !0);
      if (o)
        return r;
    }
    return i;
  });
}
function jy(e) {
  return ac(e, P1(), (t) => t.trim());
}
function Dy(e) {
  return Rn(e, "empty", (t) => {
    const n = O1(t);
    return n === 0 || `Expected an empty ${e.type} but received one with a size of \`${n}\``;
  });
}
function O1(e) {
  return e instanceof Map || e instanceof Set ? e.size : e.length;
}
function qy(e, t, n = {}) {
  const { exclusive: i } = n;
  return Rn(e, "max", (f) => i ? f < t : f <= t || `Expected a ${e.type} less than ${i ? "" : "or equal to "}${t} but received \`${f}\``);
}
function Uy(e, t, n = {}) {
  const { exclusive: i } = n;
  return Rn(e, "min", (f) => i ? f > t : f >= t || `Expected a ${e.type} greater than ${i ? "" : "or equal to "}${t} but received \`${f}\``);
}
function Fy(e) {
  return Rn(e, "nonempty", (t) => O1(t) > 0 || `Expected a nonempty ${e.type} but received an empty one`);
}
function Hy(e, t) {
  return Rn(e, "pattern", (n) => t.test(n) || `Expected a ${e.type} matching \`/${t.source}/\` but received "${n}"`);
}
function zy(e, t, n = t) {
  const i = `Expected a ${e.type}`, f = t === n ? `of \`${t}\`` : `between \`${t}\` and \`${n}\``;
  return Rn(e, "size", (r) => {
    if (typeof r == "number" || r instanceof Date)
      return t <= r && r <= n || `${i} ${f} but received \`${r}\``;
    if (r instanceof Map || r instanceof Set) {
      const { size: o } = r;
      return t <= o && o <= n || `${i} with a size ${f} but received one with a size of \`${o}\``;
    } else {
      const { length: o } = r;
      return t <= o && o <= n || `${i} with a length ${f} but received one with a length of \`${o}\``;
    }
  });
}
function Rn(e, t, n) {
  return new zt({
    ...e,
    *refiner(i, f) {
      yield* e.refiner(i, f);
      const r = n(i, f), o = ju(r, f, e, i);
      for (const s of o)
        yield { ...s, refinement: t };
    }
  });
}
const Vy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Struct: zt,
  StructError: A1,
  any: gy,
  array: my,
  assert: B1,
  assign: cy,
  bigint: wy,
  boolean: _y,
  coerce: ac,
  create: R1,
  date: xy,
  defaulted: ky,
  define: or,
  deprecated: hy,
  dynamic: ly,
  empty: Dy,
  enums: Ey,
  func: Sy,
  instance: My,
  integer: Ay,
  intersection: By,
  is: rc,
  lazy: dy,
  literal: Ry,
  map: Iy,
  mask: I1,
  max: qy,
  min: Uy,
  never: nc,
  nonempty: Fy,
  nullable: Ty,
  number: Py,
  object: ji,
  omit: py,
  optional: T1,
  partial: vy,
  pattern: Hy,
  pick: by,
  record: Cy,
  refine: Rn,
  regexp: Oy,
  set: Ny,
  size: zy,
  string: P1,
  struct: yy,
  trimmed: jy,
  tuple: Ly,
  type: ic,
  union: $y,
  unknown: C1,
  validate: ri
}, Symbol.toStringTag, { value: "Module" })), In = /* @__PURE__ */ Xu(Vy);
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.assertExhaustive = Yt.assertStruct = Yt.assert = Yt.AssertionError = void 0;
const Ky = In;
function Gy(e) {
  return typeof e == "object" && e !== null && "message" in e;
}
function Wy(e) {
  var t, n;
  return Boolean(typeof ((n = (t = e == null ? void 0 : e.prototype) === null || t === void 0 ? void 0 : t.constructor) === null || n === void 0 ? void 0 : n.name) == "string");
}
function Jy(e) {
  const t = Gy(e) ? e.message : String(e);
  return t.endsWith(".") ? t.slice(0, -1) : t;
}
function N1(e, t) {
  return Wy(e) ? new e({
    message: t
  }) : e({
    message: t
  });
}
class fc extends Error {
  constructor(t) {
    super(t.message), this.code = "ERR_ASSERTION";
  }
}
Yt.AssertionError = fc;
function Xy(e, t = "Assertion failed.", n = fc) {
  if (!e)
    throw t instanceof Error ? t : N1(n, t);
}
Yt.assert = Xy;
function Zy(e, t, n = "Assertion failed", i = fc) {
  try {
    (0, Ky.assert)(e, t);
  } catch (f) {
    throw N1(i, `${n}: ${Jy(f)}.`);
  }
}
Yt.assertStruct = Zy;
function Yy(e) {
  throw new Error("Invalid branch reached. Should be detected during compilation.");
}
Yt.assertExhaustive = Yy;
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
Di.base64 = void 0;
const Qy = In, e2 = Yt, t2 = (e, t = {}) => {
  var n, i;
  const f = (n = t.paddingRequired) !== null && n !== void 0 ? n : !1, r = (i = t.characterSet) !== null && i !== void 0 ? i : "base64";
  let o;
  r === "base64" ? o = String.raw`[A-Za-z0-9+\/]` : ((0, e2.assert)(r === "base64url"), o = String.raw`[-_A-Za-z0-9]`);
  let s;
  return f ? s = new RegExp(`^(?:${o}{4})*(?:${o}{3}=|${o}{2}==)?$`, "u") : s = new RegExp(`^(?:${o}{4})*(?:${o}{2,3}|${o}{3}=|${o}{2}==)?$`, "u"), (0, Qy.pattern)(e, s);
};
Di.base64 = t2;
var It = {}, qi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.remove0x = e.add0x = e.assertIsStrictHexString = e.assertIsHexString = e.isStrictHexString = e.isHexString = e.StrictHexStruct = e.HexStruct = void 0;
  const t = In, n = Yt;
  e.HexStruct = (0, t.pattern)((0, t.string)(), /^(?:0x)?[0-9a-f]+$/iu), e.StrictHexStruct = (0, t.pattern)((0, t.string)(), /^0x[0-9a-f]+$/iu);
  function i(l) {
    return (0, t.is)(l, e.HexStruct);
  }
  e.isHexString = i;
  function f(l) {
    return (0, t.is)(l, e.StrictHexStruct);
  }
  e.isStrictHexString = f;
  function r(l) {
    (0, n.assert)(i(l), "Value must be a hexadecimal string.");
  }
  e.assertIsHexString = r;
  function o(l) {
    (0, n.assert)(f(l), 'Value must be a hexadecimal string, starting with "0x".');
  }
  e.assertIsStrictHexString = o;
  function s(l) {
    return l.startsWith("0x") ? l : l.startsWith("0X") ? `0x${l.substring(2)}` : `0x${l}`;
  }
  e.add0x = s;
  function c(l) {
    return l.startsWith("0x") || l.startsWith("0X") ? l.substring(2) : l;
  }
  e.remove0x = c;
})(qi);
Object.defineProperty(It, "__esModule", { value: !0 });
It.createDataView = It.concatBytes = It.valueToBytes = It.stringToBytes = It.numberToBytes = It.signedBigIntToBytes = It.bigIntToBytes = It.hexToBytes = It.bytesToString = It.bytesToNumber = It.bytesToSignedBigInt = It.bytesToBigInt = It.bytesToHex = It.assertIsBytes = It.isBytes = void 0;
const cr = Yt, Du = qi, s0 = 48, u0 = 58, c0 = 87;
function r2() {
  const e = [];
  return () => {
    if (e.length === 0)
      for (let t = 0; t < 256; t++)
        e.push(t.toString(16).padStart(2, "0"));
    return e;
  };
}
const n2 = r2();
function oc(e) {
  return e instanceof Uint8Array;
}
It.isBytes = oc;
function ni(e) {
  (0, cr.assert)(oc(e), "Value must be a Uint8Array.");
}
It.assertIsBytes = ni;
function L1(e) {
  if (ni(e), e.length === 0)
    return "0x";
  const t = n2(), n = new Array(e.length);
  for (let i = 0; i < e.length; i++)
    n[i] = t[e[i]];
  return (0, Du.add0x)(n.join(""));
}
It.bytesToHex = L1;
function $1(e) {
  ni(e);
  const t = L1(e);
  return BigInt(t);
}
It.bytesToBigInt = $1;
function i2(e) {
  ni(e);
  let t = BigInt(0);
  for (const n of e)
    t = (t << BigInt(8)) + BigInt(n);
  return BigInt.asIntN(e.length * 8, t);
}
It.bytesToSignedBigInt = i2;
function a2(e) {
  ni(e);
  const t = $1(e);
  return (0, cr.assert)(t <= BigInt(Number.MAX_SAFE_INTEGER), "Number is not a safe integer. Use `bytesToBigInt` instead."), Number(t);
}
It.bytesToNumber = a2;
function f2(e) {
  return ni(e), new TextDecoder().decode(e);
}
It.bytesToString = f2;
function rf(e) {
  var t;
  if (((t = e == null ? void 0 : e.toLowerCase) === null || t === void 0 ? void 0 : t.call(e)) === "0x")
    return new Uint8Array();
  (0, Du.assertIsHexString)(e);
  const n = (0, Du.remove0x)(e).toLowerCase(), i = n.length % 2 === 0 ? n : `0${n}`, f = new Uint8Array(i.length / 2);
  for (let r = 0; r < f.length; r++) {
    const o = i.charCodeAt(r * 2), s = i.charCodeAt(r * 2 + 1), c = o - (o < u0 ? s0 : c0), l = s - (s < u0 ? s0 : c0);
    f[r] = c * 16 + l;
  }
  return f;
}
It.hexToBytes = rf;
function k1(e) {
  (0, cr.assert)(typeof e == "bigint", "Value must be a bigint."), (0, cr.assert)(e >= BigInt(0), "Value must be a non-negative bigint.");
  const t = e.toString(16);
  return rf(t);
}
It.bigIntToBytes = k1;
function o2(e, t) {
  (0, cr.assert)(t > 0);
  const n = e >> BigInt(31);
  return !((~e & n) + (e & ~n) >> BigInt(t * 8 + -1));
}
function s2(e, t) {
  (0, cr.assert)(typeof e == "bigint", "Value must be a bigint."), (0, cr.assert)(typeof t == "number", "Byte length must be a number."), (0, cr.assert)(t > 0, "Byte length must be greater than 0."), (0, cr.assert)(o2(e, t), "Byte length is too small to represent the given value.");
  let n = e;
  const i = new Uint8Array(t);
  for (let f = 0; f < i.length; f++)
    i[f] = Number(BigInt.asUintN(8, n)), n >>= BigInt(8);
  return i.reverse();
}
It.signedBigIntToBytes = s2;
function j1(e) {
  (0, cr.assert)(typeof e == "number", "Value must be a number."), (0, cr.assert)(e >= 0, "Value must be a non-negative number."), (0, cr.assert)(Number.isSafeInteger(e), "Value is not a safe integer. Use `bigIntToBytes` instead.");
  const t = e.toString(16);
  return rf(t);
}
It.numberToBytes = j1;
function D1(e) {
  return (0, cr.assert)(typeof e == "string", "Value must be a string."), new TextEncoder().encode(e);
}
It.stringToBytes = D1;
function q1(e) {
  if (typeof e == "bigint")
    return k1(e);
  if (typeof e == "number")
    return j1(e);
  if (typeof e == "string")
    return e.startsWith("0x") ? rf(e) : D1(e);
  if (oc(e))
    return e;
  throw new TypeError(`Unsupported value type: "${typeof e}".`);
}
It.valueToBytes = q1;
function u2(e) {
  const t = new Array(e.length);
  let n = 0;
  for (let f = 0; f < e.length; f++) {
    const r = q1(e[f]);
    t[f] = r, n += r.length;
  }
  const i = new Uint8Array(n);
  for (let f = 0, r = 0; f < t.length; f++)
    i.set(t[f], r), r += t[f].length;
  return i;
}
It.concatBytes = u2;
function c2(e) {
  if (typeof Buffer < "u" && e instanceof Buffer) {
    const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
    return new DataView(t);
  }
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
It.createDataView = c2;
var nf = {};
Object.defineProperty(nf, "__esModule", { value: !0 });
nf.ChecksumStruct = void 0;
const h0 = In, h2 = Di;
nf.ChecksumStruct = (0, h0.size)((0, h2.base64)((0, h0.string)(), { paddingRequired: !0 }), 44, 44);
var Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.createHex = Ur.createBytes = Ur.createBigInt = Ur.createNumber = void 0;
const kt = In, l2 = Yt, U1 = It, af = qi, F1 = (0, kt.union)([(0, kt.number)(), (0, kt.bigint)(), (0, kt.string)(), af.StrictHexStruct]), d2 = (0, kt.coerce)((0, kt.number)(), F1, Number), p2 = (0, kt.coerce)((0, kt.bigint)(), F1, BigInt);
(0, kt.union)([af.StrictHexStruct, (0, kt.instance)(Uint8Array)]);
const v2 = (0, kt.coerce)((0, kt.instance)(Uint8Array), (0, kt.union)([af.StrictHexStruct]), U1.hexToBytes), b2 = (0, kt.coerce)(af.StrictHexStruct, (0, kt.instance)(Uint8Array), U1.bytesToHex);
function y2(e) {
  try {
    const t = (0, kt.create)(e, d2);
    return (0, l2.assert)(Number.isFinite(t), `Expected a number-like value, got "${e}".`), t;
  } catch (t) {
    throw t instanceof kt.StructError ? new Error(`Expected a number-like value, got "${e}".`) : t;
  }
}
Ur.createNumber = y2;
function g2(e) {
  try {
    return (0, kt.create)(e, p2);
  } catch (t) {
    throw t instanceof kt.StructError ? new Error(`Expected a number-like value, got "${String(t.value)}".`) : t;
  }
}
Ur.createBigInt = g2;
function m2(e) {
  if (typeof e == "string" && e.toLowerCase() === "0x")
    return new Uint8Array();
  try {
    return (0, kt.create)(e, v2);
  } catch (t) {
    throw t instanceof kt.StructError ? new Error(`Expected a bytes-like value, got "${String(t.value)}".`) : t;
  }
}
Ur.createBytes = m2;
function w2(e) {
  if (e instanceof Uint8Array && e.length === 0 || typeof e == "string" && e.toLowerCase() === "0x")
    return "0x";
  try {
    return (0, kt.create)(e, b2);
  } catch (t) {
    throw t instanceof kt.StructError ? new Error(`Expected a bytes-like value, got "${String(t.value)}".`) : t;
  }
}
Ur.createHex = w2;
var Gn = {}, H1 = Ne && Ne.__classPrivateFieldSet || function(e, t, n, i, f) {
  if (i === "m")
    throw new TypeError("Private method is not writable");
  if (i === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !f : !t.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i === "a" ? f.call(e, n) : f ? f.value = n : t.set(e, n), n;
}, ir = Ne && Ne.__classPrivateFieldGet || function(e, t, n, i) {
  if (n === "a" && !i)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? i : n === "a" ? i.call(e) : i ? i.value : t.get(e);
}, Br, $r;
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.FrozenSet = Gn.FrozenMap = void 0;
class sc {
  constructor(t) {
    Br.set(this, void 0), H1(this, Br, new Map(t), "f"), Object.freeze(this);
  }
  get size() {
    return ir(this, Br, "f").size;
  }
  [(Br = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
    return ir(this, Br, "f")[Symbol.iterator]();
  }
  entries() {
    return ir(this, Br, "f").entries();
  }
  forEach(t, n) {
    return ir(this, Br, "f").forEach((i, f, r) => t.call(n, i, f, this));
  }
  get(t) {
    return ir(this, Br, "f").get(t);
  }
  has(t) {
    return ir(this, Br, "f").has(t);
  }
  keys() {
    return ir(this, Br, "f").keys();
  }
  values() {
    return ir(this, Br, "f").values();
  }
  toString() {
    return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([t, n]) => `${String(t)} => ${String(n)}`).join(", ")} ` : ""}}`;
  }
}
Gn.FrozenMap = sc;
class uc {
  constructor(t) {
    $r.set(this, void 0), H1(this, $r, new Set(t), "f"), Object.freeze(this);
  }
  get size() {
    return ir(this, $r, "f").size;
  }
  [($r = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
    return ir(this, $r, "f")[Symbol.iterator]();
  }
  entries() {
    return ir(this, $r, "f").entries();
  }
  forEach(t, n) {
    return ir(this, $r, "f").forEach((i, f, r) => t.call(n, i, f, this));
  }
  has(t) {
    return ir(this, $r, "f").has(t);
  }
  keys() {
    return ir(this, $r, "f").keys();
  }
  values() {
    return ir(this, $r, "f").values();
  }
  toString() {
    return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map((t) => String(t)).join(", ")} ` : ""}}`;
  }
}
Gn.FrozenSet = uc;
Object.freeze(sc);
Object.freeze(sc.prototype);
Object.freeze(uc);
Object.freeze(uc.prototype);
var z1 = {}, cc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.calculateNumberSize = e.calculateStringSize = e.isASCII = e.isPlainObject = e.ESCAPE_CHARACTERS_REGEXP = e.JsonSize = e.hasProperty = e.isObject = e.isNullOrUndefined = e.isNonEmptyArray = void 0;
  function t(l) {
    return Array.isArray(l) && l.length > 0;
  }
  e.isNonEmptyArray = t;
  function n(l) {
    return l == null;
  }
  e.isNullOrUndefined = n;
  function i(l) {
    return Boolean(l) && typeof l == "object" && !Array.isArray(l);
  }
  e.isObject = i;
  const f = (l, u) => Object.hasOwnProperty.call(l, u);
  e.hasProperty = f, function(l) {
    l[l.Null = 4] = "Null", l[l.Comma = 1] = "Comma", l[l.Wrapper = 1] = "Wrapper", l[l.True = 4] = "True", l[l.False = 5] = "False", l[l.Quote = 1] = "Quote", l[l.Colon = 1] = "Colon", l[l.Date = 24] = "Date";
  }(e.JsonSize || (e.JsonSize = {})), e.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
  function r(l) {
    if (typeof l != "object" || l === null)
      return !1;
    try {
      let u = l;
      for (; Object.getPrototypeOf(u) !== null; )
        u = Object.getPrototypeOf(u);
      return Object.getPrototypeOf(l) === u;
    } catch {
      return !1;
    }
  }
  e.isPlainObject = r;
  function o(l) {
    return l.charCodeAt(0) <= 127;
  }
  e.isASCII = o;
  function s(l) {
    var u;
    return l.split("").reduce((p, g) => o(g) ? p + 1 : p + 2, 0) + ((u = l.match(e.ESCAPE_CHARACTERS_REGEXP)) !== null && u !== void 0 ? u : []).length;
  }
  e.calculateStringSize = s;
  function c(l) {
    return l.toString().length;
  }
  e.calculateNumberSize = c;
})(cc);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateJsonAndGetSize = e.getJsonRpcIdValidator = e.assertIsJsonRpcError = e.isJsonRpcError = e.assertIsJsonRpcFailure = e.isJsonRpcFailure = e.assertIsJsonRpcSuccess = e.isJsonRpcSuccess = e.assertIsJsonRpcResponse = e.isJsonRpcResponse = e.assertIsPendingJsonRpcResponse = e.isPendingJsonRpcResponse = e.JsonRpcResponseStruct = e.JsonRpcFailureStruct = e.JsonRpcSuccessStruct = e.PendingJsonRpcResponseStruct = e.assertIsJsonRpcRequest = e.isJsonRpcRequest = e.assertIsJsonRpcNotification = e.isJsonRpcNotification = e.JsonRpcNotificationStruct = e.JsonRpcRequestStruct = e.JsonRpcParamsStruct = e.JsonRpcErrorStruct = e.JsonRpcIdStruct = e.JsonRpcVersionStruct = e.jsonrpc2 = e.isValidJson = e.JsonStruct = void 0;
  const t = In, n = Yt, i = cc;
  e.JsonStruct = (0, t.define)("Json", (D) => {
    const [H] = $(D, !0);
    return H ? !0 : "Expected a valid JSON-serializable value";
  });
  function f(D) {
    return (0, t.is)(D, e.JsonStruct);
  }
  e.isValidJson = f, e.jsonrpc2 = "2.0", e.JsonRpcVersionStruct = (0, t.literal)(e.jsonrpc2), e.JsonRpcIdStruct = (0, t.nullable)((0, t.union)([(0, t.number)(), (0, t.string)()])), e.JsonRpcErrorStruct = (0, t.object)({
    code: (0, t.integer)(),
    message: (0, t.string)(),
    data: (0, t.optional)(e.JsonStruct),
    stack: (0, t.optional)((0, t.string)())
  }), e.JsonRpcParamsStruct = (0, t.optional)((0, t.union)([(0, t.record)((0, t.string)(), e.JsonStruct), (0, t.array)(e.JsonStruct)])), e.JsonRpcRequestStruct = (0, t.object)({
    id: e.JsonRpcIdStruct,
    jsonrpc: e.JsonRpcVersionStruct,
    method: (0, t.string)(),
    params: e.JsonRpcParamsStruct
  }), e.JsonRpcNotificationStruct = (0, t.omit)(e.JsonRpcRequestStruct, ["id"]);
  function r(D) {
    return (0, t.is)(D, e.JsonRpcNotificationStruct);
  }
  e.isJsonRpcNotification = r;
  function o(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcNotificationStruct, "Invalid JSON-RPC notification", H);
  }
  e.assertIsJsonRpcNotification = o;
  function s(D) {
    return (0, t.is)(D, e.JsonRpcRequestStruct);
  }
  e.isJsonRpcRequest = s;
  function c(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcRequestStruct, "Invalid JSON-RPC request", H);
  }
  e.assertIsJsonRpcRequest = c, e.PendingJsonRpcResponseStruct = (0, t.object)({
    id: e.JsonRpcIdStruct,
    jsonrpc: e.JsonRpcVersionStruct,
    result: (0, t.optional)((0, t.unknown)()),
    error: (0, t.optional)(e.JsonRpcErrorStruct)
  }), e.JsonRpcSuccessStruct = (0, t.object)({
    id: e.JsonRpcIdStruct,
    jsonrpc: e.JsonRpcVersionStruct,
    result: e.JsonStruct
  }), e.JsonRpcFailureStruct = (0, t.object)({
    id: e.JsonRpcIdStruct,
    jsonrpc: e.JsonRpcVersionStruct,
    error: e.JsonRpcErrorStruct
  }), e.JsonRpcResponseStruct = (0, t.union)([
    e.JsonRpcSuccessStruct,
    e.JsonRpcFailureStruct
  ]);
  function l(D) {
    return (0, t.is)(D, e.PendingJsonRpcResponseStruct);
  }
  e.isPendingJsonRpcResponse = l;
  function u(D, H) {
    (0, n.assertStruct)(D, e.PendingJsonRpcResponseStruct, "Invalid pending JSON-RPC response", H);
  }
  e.assertIsPendingJsonRpcResponse = u;
  function v(D) {
    return (0, t.is)(D, e.JsonRpcResponseStruct);
  }
  e.isJsonRpcResponse = v;
  function p(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcResponseStruct, "Invalid JSON-RPC response", H);
  }
  e.assertIsJsonRpcResponse = p;
  function g(D) {
    return (0, t.is)(D, e.JsonRpcSuccessStruct);
  }
  e.isJsonRpcSuccess = g;
  function w(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcSuccessStruct, "Invalid JSON-RPC success response", H);
  }
  e.assertIsJsonRpcSuccess = w;
  function S(D) {
    return (0, t.is)(D, e.JsonRpcFailureStruct);
  }
  e.isJsonRpcFailure = S;
  function T(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcFailureStruct, "Invalid JSON-RPC failure response", H);
  }
  e.assertIsJsonRpcFailure = T;
  function I(D) {
    return (0, t.is)(D, e.JsonRpcErrorStruct);
  }
  e.isJsonRpcError = I;
  function C(D, H) {
    (0, n.assertStruct)(D, e.JsonRpcErrorStruct, "Invalid JSON-RPC error", H);
  }
  e.assertIsJsonRpcError = C;
  function N(D) {
    const { permitEmptyString: H, permitFractions: V, permitNull: ne } = Object.assign({ permitEmptyString: !0, permitFractions: !1, permitNull: !0 }, D);
    return (se) => Boolean(typeof se == "number" && (V || Number.isInteger(se)) || typeof se == "string" && (H || se.length > 0) || ne && se === null);
  }
  e.getJsonRpcIdValidator = N;
  function $(D, H = !1) {
    const V = /* @__PURE__ */ new Set();
    function ne(Q, se) {
      if (Q === void 0)
        return [!1, 0];
      if (Q === null)
        return [!0, se ? 0 : i.JsonSize.Null];
      const k = typeof Q;
      try {
        if (k === "function")
          return [!1, 0];
        if (k === "string" || Q instanceof String)
          return [
            !0,
            se ? 0 : (0, i.calculateStringSize)(Q) + i.JsonSize.Quote * 2
          ];
        if (k === "boolean" || Q instanceof Boolean)
          return se ? [!0, 0] : [!0, Q == !0 ? i.JsonSize.True : i.JsonSize.False];
        if (k === "number" || Q instanceof Number)
          return se ? [!0, 0] : [!0, (0, i.calculateNumberSize)(Q)];
        if (Q instanceof Date)
          return se ? [!0, 0] : [
            !0,
            // Note: Invalid dates will serialize to null
            isNaN(Q.getDate()) ? i.JsonSize.Null : i.JsonSize.Date + i.JsonSize.Quote * 2
          ];
      } catch {
        return [!1, 0];
      }
      if (!(0, i.isPlainObject)(Q) && !Array.isArray(Q))
        return [!1, 0];
      if (V.has(Q))
        return [!1, 0];
      V.add(Q);
      try {
        return [
          !0,
          Object.entries(Q).reduce(
            (m, [b, a], h, y) => {
              let [x, A] = ne(a, se);
              if (!x)
                throw new Error("JSON validation did not pass. Validation process stopped.");
              if (V.delete(Q), se)
                return 0;
              const B = Array.isArray(Q) ? 0 : b.length + i.JsonSize.Comma + i.JsonSize.Colon * 2, _ = h < y.length - 1 ? i.JsonSize.Comma : 0;
              return m + B + A + _;
            },
            // Starts at 2 because the serialized JSON string data (plain text)
            // will minimally contain {}/[]
            se ? 0 : i.JsonSize.Wrapper * 2
          )
        ];
      } catch {
        return [!1, 0];
      }
    }
    return ne(D, H);
  }
  e.validateJsonAndGetSize = $;
})(z1);
var Wn = {}, ga = {}, _2 = {
  get exports() {
    return ga;
  },
  set exports(e) {
    ga = e;
  }
}, Gf, l0;
function x2() {
  if (l0)
    return Gf;
  l0 = 1;
  var e = 1e3, t = e * 60, n = t * 60, i = n * 24, f = i * 7, r = i * 365.25;
  Gf = function(u, v) {
    v = v || {};
    var p = typeof u;
    if (p === "string" && u.length > 0)
      return o(u);
    if (p === "number" && isFinite(u))
      return v.long ? c(u) : s(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var v = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (v) {
        var p = parseFloat(v[1]), g = (v[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * r;
          case "weeks":
          case "week":
          case "w":
            return p * f;
          case "days":
          case "day":
          case "d":
            return p * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function s(u) {
    var v = Math.abs(u);
    return v >= i ? Math.round(u / i) + "d" : v >= n ? Math.round(u / n) + "h" : v >= t ? Math.round(u / t) + "m" : v >= e ? Math.round(u / e) + "s" : u + "ms";
  }
  function c(u) {
    var v = Math.abs(u);
    return v >= i ? l(u, v, i, "day") : v >= n ? l(u, v, n, "hour") : v >= t ? l(u, v, t, "minute") : v >= e ? l(u, v, e, "second") : u + " ms";
  }
  function l(u, v, p, g) {
    var w = v >= p * 1.5;
    return Math.round(u / p) + " " + g + (w ? "s" : "");
  }
  return Gf;
}
function E2(e) {
  n.debug = n, n.default = n, n.coerce = c, n.disable = r, n.enable = f, n.enabled = o, n.humanize = x2(), n.destroy = l, Object.keys(e).forEach((u) => {
    n[u] = e[u];
  }), n.names = [], n.skips = [], n.formatters = {};
  function t(u) {
    let v = 0;
    for (let p = 0; p < u.length; p++)
      v = (v << 5) - v + u.charCodeAt(p), v |= 0;
    return n.colors[Math.abs(v) % n.colors.length];
  }
  n.selectColor = t;
  function n(u) {
    let v, p = null, g, w;
    function S(...T) {
      if (!S.enabled)
        return;
      const I = S, C = Number(new Date()), N = C - (v || C);
      I.diff = N, I.prev = v, I.curr = C, v = C, T[0] = n.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
      let $ = 0;
      T[0] = T[0].replace(/%([a-zA-Z%])/g, (H, V) => {
        if (H === "%%")
          return "%";
        $++;
        const ne = n.formatters[V];
        if (typeof ne == "function") {
          const Q = T[$];
          H = ne.call(I, Q), T.splice($, 1), $--;
        }
        return H;
      }), n.formatArgs.call(I, T), (I.log || n.log).apply(I, T);
    }
    return S.namespace = u, S.useColors = n.useColors(), S.color = n.selectColor(u), S.extend = i, S.destroy = n.destroy, Object.defineProperty(S, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (g !== n.namespaces && (g = n.namespaces, w = n.enabled(u)), w),
      set: (T) => {
        p = T;
      }
    }), typeof n.init == "function" && n.init(S), S;
  }
  function i(u, v) {
    const p = n(this.namespace + (typeof v > "u" ? ":" : v) + u);
    return p.log = this.log, p;
  }
  function f(u) {
    n.save(u), n.namespaces = u, n.names = [], n.skips = [];
    let v;
    const p = (typeof u == "string" ? u : "").split(/[\s,]+/), g = p.length;
    for (v = 0; v < g; v++)
      p[v] && (u = p[v].replace(/\*/g, ".*?"), u[0] === "-" ? n.skips.push(new RegExp("^" + u.slice(1) + "$")) : n.names.push(new RegExp("^" + u + "$")));
  }
  function r() {
    const u = [
      ...n.names.map(s),
      ...n.skips.map(s).map((v) => "-" + v)
    ].join(",");
    return n.enable(""), u;
  }
  function o(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let v, p;
    for (v = 0, p = n.skips.length; v < p; v++)
      if (n.skips[v].test(u))
        return !1;
    for (v = 0, p = n.names.length; v < p; v++)
      if (n.names[v].test(u))
        return !0;
    return !1;
  }
  function s(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function c(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function l() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var S2 = E2;
(function(e, t) {
  t.formatArgs = i, t.save = f, t.load = r, t.useColors = n, t.storage = o(), t.destroy = (() => {
    let c = !1;
    return () => {
      c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function n() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function i(c) {
    if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
      return;
    const l = "color: " + this.color;
    c.splice(1, 0, l, "color: inherit");
    let u = 0, v = 0;
    c[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (u++, p === "%c" && (v = u));
    }), c.splice(v, 0, l);
  }
  t.log = console.debug || console.log || (() => {
  });
  function f(c) {
    try {
      c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
    } catch {
    }
  }
  function r() {
    let c;
    try {
      c = t.storage.getItem("debug");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  e.exports = S2(t);
  const { formatters: s } = e.exports;
  s.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (l) {
      return "[UnexpectedJSONParseError]: " + l.message;
    }
  };
})(_2, ga);
var M2 = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.createModuleLogger = Wn.createProjectLogger = void 0;
const A2 = M2(ga), B2 = (0, A2.default)("metamask");
function R2(e) {
  return B2.extend(e);
}
Wn.createProjectLogger = R2;
function I2(e, t) {
  return e.extend(t);
}
Wn.createModuleLogger = I2;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.hexToBigInt = Fr.hexToNumber = Fr.bigIntToHex = Fr.numberToHex = void 0;
const Hn = Yt, Ei = qi, T2 = (e) => ((0, Hn.assert)(typeof e == "number", "Value must be a number."), (0, Hn.assert)(e >= 0, "Value must be a non-negative number."), (0, Hn.assert)(Number.isSafeInteger(e), "Value is not a safe integer. Use `bigIntToHex` instead."), (0, Ei.add0x)(e.toString(16)));
Fr.numberToHex = T2;
const P2 = (e) => ((0, Hn.assert)(typeof e == "bigint", "Value must be a bigint."), (0, Hn.assert)(e >= 0, "Value must be a non-negative bigint."), (0, Ei.add0x)(e.toString(16)));
Fr.bigIntToHex = P2;
const C2 = (e) => {
  (0, Ei.assertIsHexString)(e);
  const t = parseInt(e, 16);
  return (0, Hn.assert)(Number.isSafeInteger(t), "Value is not a safe integer. Use `hexToBigInt` instead."), t;
};
Fr.hexToNumber = C2;
const O2 = (e) => ((0, Ei.assertIsHexString)(e), BigInt((0, Ei.add0x)(e)));
Fr.hexToBigInt = O2;
var V1 = {};
Object.defineProperty(V1, "__esModule", { value: !0 });
var K1 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.timeSince = e.inMilliseconds = e.Duration = void 0, function(r) {
    r[r.Millisecond = 1] = "Millisecond", r[r.Second = 1e3] = "Second", r[r.Minute = 6e4] = "Minute", r[r.Hour = 36e5] = "Hour", r[r.Day = 864e5] = "Day", r[r.Week = 6048e5] = "Week", r[r.Year = 31536e6] = "Year";
  }(e.Duration || (e.Duration = {}));
  const t = (r) => Number.isInteger(r) && r >= 0, n = (r, o) => {
    if (!t(r))
      throw new Error(`"${o}" must be a non-negative integer. Received: "${r}".`);
  };
  function i(r, o) {
    return n(r, "count"), r * o;
  }
  e.inMilliseconds = i;
  function f(r) {
    return n(r, "timestamp"), Date.now() - r;
  }
  e.timeSince = f;
})(K1);
var G1 = {}, Yr = {}, N2 = {
  get exports() {
    return Yr;
  },
  set exports(e) {
    Yr = e;
  }
};
const L2 = "2.0.0", $2 = 256, k2 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, j2 = 16;
var ff = {
  SEMVER_SPEC_VERSION: L2,
  MAX_LENGTH: $2,
  MAX_SAFE_INTEGER: k2,
  MAX_SAFE_COMPONENT_LENGTH: j2
};
const D2 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var of = D2;
(function(e, t) {
  const { MAX_SAFE_COMPONENT_LENGTH: n } = ff, i = of;
  t = e.exports = {};
  const f = t.re = [], r = t.src = [], o = t.t = {};
  let s = 0;
  const c = (l, u, v) => {
    const p = s++;
    i(l, p, u), o[l] = p, r[p] = u, f[p] = new RegExp(u, v ? "g" : void 0);
  };
  c("NUMERICIDENTIFIER", "0|[1-9]\\d*"), c("NUMERICIDENTIFIERLOOSE", "[0-9]+"), c("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), c("MAINVERSION", `(${r[o.NUMERICIDENTIFIER]})\\.(${r[o.NUMERICIDENTIFIER]})\\.(${r[o.NUMERICIDENTIFIER]})`), c("MAINVERSIONLOOSE", `(${r[o.NUMERICIDENTIFIERLOOSE]})\\.(${r[o.NUMERICIDENTIFIERLOOSE]})\\.(${r[o.NUMERICIDENTIFIERLOOSE]})`), c("PRERELEASEIDENTIFIER", `(?:${r[o.NUMERICIDENTIFIER]}|${r[o.NONNUMERICIDENTIFIER]})`), c("PRERELEASEIDENTIFIERLOOSE", `(?:${r[o.NUMERICIDENTIFIERLOOSE]}|${r[o.NONNUMERICIDENTIFIER]})`), c("PRERELEASE", `(?:-(${r[o.PRERELEASEIDENTIFIER]}(?:\\.${r[o.PRERELEASEIDENTIFIER]})*))`), c("PRERELEASELOOSE", `(?:-?(${r[o.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[o.PRERELEASEIDENTIFIERLOOSE]})*))`), c("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), c("BUILD", `(?:\\+(${r[o.BUILDIDENTIFIER]}(?:\\.${r[o.BUILDIDENTIFIER]})*))`), c("FULLPLAIN", `v?${r[o.MAINVERSION]}${r[o.PRERELEASE]}?${r[o.BUILD]}?`), c("FULL", `^${r[o.FULLPLAIN]}$`), c("LOOSEPLAIN", `[v=\\s]*${r[o.MAINVERSIONLOOSE]}${r[o.PRERELEASELOOSE]}?${r[o.BUILD]}?`), c("LOOSE", `^${r[o.LOOSEPLAIN]}$`), c("GTLT", "((?:<|>)?=?)"), c("XRANGEIDENTIFIERLOOSE", `${r[o.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), c("XRANGEIDENTIFIER", `${r[o.NUMERICIDENTIFIER]}|x|X|\\*`), c("XRANGEPLAIN", `[v=\\s]*(${r[o.XRANGEIDENTIFIER]})(?:\\.(${r[o.XRANGEIDENTIFIER]})(?:\\.(${r[o.XRANGEIDENTIFIER]})(?:${r[o.PRERELEASE]})?${r[o.BUILD]}?)?)?`), c("XRANGEPLAINLOOSE", `[v=\\s]*(${r[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[o.XRANGEIDENTIFIERLOOSE]})(?:${r[o.PRERELEASELOOSE]})?${r[o.BUILD]}?)?)?`), c("XRANGE", `^${r[o.GTLT]}\\s*${r[o.XRANGEPLAIN]}$`), c("XRANGELOOSE", `^${r[o.GTLT]}\\s*${r[o.XRANGEPLAINLOOSE]}$`), c("COERCE", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?(?:$|[^\\d])`), c("COERCERTL", r[o.COERCE], !0), c("LONETILDE", "(?:~>?)"), c("TILDETRIM", `(\\s*)${r[o.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", c("TILDE", `^${r[o.LONETILDE]}${r[o.XRANGEPLAIN]}$`), c("TILDELOOSE", `^${r[o.LONETILDE]}${r[o.XRANGEPLAINLOOSE]}$`), c("LONECARET", "(?:\\^)"), c("CARETTRIM", `(\\s*)${r[o.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", c("CARET", `^${r[o.LONECARET]}${r[o.XRANGEPLAIN]}$`), c("CARETLOOSE", `^${r[o.LONECARET]}${r[o.XRANGEPLAINLOOSE]}$`), c("COMPARATORLOOSE", `^${r[o.GTLT]}\\s*(${r[o.LOOSEPLAIN]})$|^$`), c("COMPARATOR", `^${r[o.GTLT]}\\s*(${r[o.FULLPLAIN]})$|^$`), c("COMPARATORTRIM", `(\\s*)${r[o.GTLT]}\\s*(${r[o.LOOSEPLAIN]}|${r[o.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", c("HYPHENRANGE", `^\\s*(${r[o.XRANGEPLAIN]})\\s+-\\s+(${r[o.XRANGEPLAIN]})\\s*$`), c("HYPHENRANGELOOSE", `^\\s*(${r[o.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[o.XRANGEPLAINLOOSE]})\\s*$`), c("STAR", "(<|>)?=?\\s*\\*"), c("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), c("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(N2, Yr);
const q2 = ["includePrerelease", "loose", "rtl"], U2 = (e) => e ? typeof e != "object" ? { loose: !0 } : q2.filter((t) => e[t]).reduce((t, n) => (t[n] = !0, t), {}) : {};
var sf = U2;
const d0 = /^[0-9]+$/, W1 = (e, t) => {
  const n = d0.test(e), i = d0.test(t);
  return n && i && (e = +e, t = +t), e === t ? 0 : n && !i ? -1 : i && !n ? 1 : e < t ? -1 : 1;
}, F2 = (e, t) => W1(t, e);
var J1 = {
  compareIdentifiers: W1,
  rcompareIdentifiers: F2
};
const Zi = of, { MAX_LENGTH: p0, MAX_SAFE_INTEGER: Yi } = ff, { re: v0, t: b0 } = Yr, H2 = sf, { compareIdentifiers: Pn } = J1;
let z2 = class jr {
  constructor(t, n) {
    if (n = H2(n), t instanceof jr) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid Version: ${t}`);
    if (t.length > p0)
      throw new TypeError(
        `version is longer than ${p0} characters`
      );
    Zi("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const i = t.trim().match(n.loose ? v0[b0.LOOSE] : v0[b0.FULL]);
    if (!i)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +i[1], this.minor = +i[2], this.patch = +i[3], this.major > Yi || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Yi || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Yi || this.patch < 0)
      throw new TypeError("Invalid patch version");
    i[4] ? this.prerelease = i[4].split(".").map((f) => {
      if (/^[0-9]+$/.test(f)) {
        const r = +f;
        if (r >= 0 && r < Yi)
          return r;
      }
      return f;
    }) : this.prerelease = [], this.build = i[5] ? i[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Zi("SemVer.compare", this.version, this.options, t), !(t instanceof jr)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new jr(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof jr || (t = new jr(t, this.options)), Pn(this.major, t.major) || Pn(this.minor, t.minor) || Pn(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof jr || (t = new jr(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const i = this.prerelease[n], f = t.prerelease[n];
      if (Zi("prerelease compare", n, i, f), i === void 0 && f === void 0)
        return 0;
      if (f === void 0)
        return 1;
      if (i === void 0)
        return -1;
      if (i === f)
        continue;
      return Pn(i, f);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof jr || (t = new jr(t, this.options));
    let n = 0;
    do {
      const i = this.build[n], f = t.build[n];
      if (Zi("prerelease compare", n, i, f), i === void 0 && f === void 0)
        return 0;
      if (f === void 0)
        return 1;
      if (i === void 0)
        return -1;
      if (i === f)
        continue;
      return Pn(i, f);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n), this.inc("pre", n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n), this.inc("pre", n);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0)
          this.prerelease = [0];
        else {
          let i = this.prerelease.length;
          for (; --i >= 0; )
            typeof this.prerelease[i] == "number" && (this.prerelease[i]++, i = -2);
          i === -1 && this.prerelease.push(0);
        }
        n && (Pn(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = [n, 0]) : this.prerelease = [n, 0]);
        break;
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.format(), this.raw = this.version, this;
  }
};
var ar = z2;
const { MAX_LENGTH: V2 } = ff, { re: y0, t: g0 } = Yr, m0 = ar, K2 = sf, G2 = (e, t) => {
  if (t = K2(t), e instanceof m0)
    return e;
  if (typeof e != "string" || e.length > V2 || !(t.loose ? y0[g0.LOOSE] : y0[g0.FULL]).test(e))
    return null;
  try {
    return new m0(e, t);
  } catch {
    return null;
  }
};
var ii = G2;
const W2 = ii, J2 = (e, t) => {
  const n = W2(e, t);
  return n ? n.version : null;
};
var X2 = J2;
const Z2 = ii, Y2 = (e, t) => {
  const n = Z2(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var Q2 = Y2;
const w0 = ar, eg = (e, t, n, i) => {
  typeof n == "string" && (i = n, n = void 0);
  try {
    return new w0(
      e instanceof w0 ? e.version : e,
      n
    ).inc(t, i).version;
  } catch {
    return null;
  }
};
var tg = eg;
const _0 = ar, rg = (e, t, n) => new _0(e, n).compare(new _0(t, n));
var Cr = rg;
const ng = Cr, ig = (e, t, n) => ng(e, t, n) === 0;
var hc = ig;
const x0 = ii, ag = hc, fg = (e, t) => {
  if (ag(e, t))
    return null;
  {
    const n = x0(e), i = x0(t), f = n.prerelease.length || i.prerelease.length, r = f ? "pre" : "", o = f ? "prerelease" : "";
    for (const s in n)
      if ((s === "major" || s === "minor" || s === "patch") && n[s] !== i[s])
        return r + s;
    return o;
  }
};
var og = fg;
const sg = ar, ug = (e, t) => new sg(e, t).major;
var cg = ug;
const hg = ar, lg = (e, t) => new hg(e, t).minor;
var dg = lg;
const pg = ar, vg = (e, t) => new pg(e, t).patch;
var bg = vg;
const yg = ii, gg = (e, t) => {
  const n = yg(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var mg = gg;
const wg = Cr, _g = (e, t, n) => wg(t, e, n);
var xg = _g;
const Eg = Cr, Sg = (e, t) => Eg(e, t, !0);
var Mg = Sg;
const E0 = ar, Ag = (e, t, n) => {
  const i = new E0(e, n), f = new E0(t, n);
  return i.compare(f) || i.compareBuild(f);
};
var lc = Ag;
const Bg = lc, Rg = (e, t) => e.sort((n, i) => Bg(n, i, t));
var Ig = Rg;
const Tg = lc, Pg = (e, t) => e.sort((n, i) => Tg(i, n, t));
var Cg = Pg;
const Og = Cr, Ng = (e, t, n) => Og(e, t, n) > 0;
var uf = Ng;
const Lg = Cr, $g = (e, t, n) => Lg(e, t, n) < 0;
var dc = $g;
const kg = Cr, jg = (e, t, n) => kg(e, t, n) !== 0;
var X1 = jg;
const Dg = Cr, qg = (e, t, n) => Dg(e, t, n) >= 0;
var pc = qg;
const Ug = Cr, Fg = (e, t, n) => Ug(e, t, n) <= 0;
var vc = Fg;
const Hg = hc, zg = X1, Vg = uf, Kg = pc, Gg = dc, Wg = vc, Jg = (e, t, n, i) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Hg(e, n, i);
    case "!=":
      return zg(e, n, i);
    case ">":
      return Vg(e, n, i);
    case ">=":
      return Kg(e, n, i);
    case "<":
      return Gg(e, n, i);
    case "<=":
      return Wg(e, n, i);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Z1 = Jg;
const Xg = ar, Zg = ii, { re: Qi, t: ea } = Yr, Yg = (e, t) => {
  if (e instanceof Xg)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(Qi[ea.COERCE]);
  else {
    let i;
    for (; (i = Qi[ea.COERCERTL].exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || i.index + i[0].length !== n.index + n[0].length) && (n = i), Qi[ea.COERCERTL].lastIndex = i.index + i[1].length + i[2].length;
    Qi[ea.COERCERTL].lastIndex = -1;
  }
  return n === null ? null : Zg(`${n[2]}.${n[3] || "0"}.${n[4] || "0"}`, t);
};
var Qg = Yg, Wf, S0;
function em() {
  return S0 || (S0 = 1, Wf = function(e) {
    e.prototype[Symbol.iterator] = function* () {
      for (let t = this.head; t; t = t.next)
        yield t.value;
    };
  }), Wf;
}
var tm = Pt;
Pt.Node = Mn;
Pt.create = Pt;
function Pt(e) {
  var t = this;
  if (t instanceof Pt || (t = new Pt()), t.tail = null, t.head = null, t.length = 0, e && typeof e.forEach == "function")
    e.forEach(function(f) {
      t.push(f);
    });
  else if (arguments.length > 0)
    for (var n = 0, i = arguments.length; n < i; n++)
      t.push(arguments[n]);
  return t;
}
Pt.prototype.removeNode = function(e) {
  if (e.list !== this)
    throw new Error("removing node which does not belong to this list");
  var t = e.next, n = e.prev;
  return t && (t.prev = n), n && (n.next = t), e === this.head && (this.head = t), e === this.tail && (this.tail = n), e.list.length--, e.next = null, e.prev = null, e.list = null, t;
};
Pt.prototype.unshiftNode = function(e) {
  if (e !== this.head) {
    e.list && e.list.removeNode(e);
    var t = this.head;
    e.list = this, e.next = t, t && (t.prev = e), this.head = e, this.tail || (this.tail = e), this.length++;
  }
};
Pt.prototype.pushNode = function(e) {
  if (e !== this.tail) {
    e.list && e.list.removeNode(e);
    var t = this.tail;
    e.list = this, e.prev = t, t && (t.next = e), this.tail = e, this.head || (this.head = e), this.length++;
  }
};
Pt.prototype.push = function() {
  for (var e = 0, t = arguments.length; e < t; e++)
    nm(this, arguments[e]);
  return this.length;
};
Pt.prototype.unshift = function() {
  for (var e = 0, t = arguments.length; e < t; e++)
    im(this, arguments[e]);
  return this.length;
};
Pt.prototype.pop = function() {
  if (this.tail) {
    var e = this.tail.value;
    return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, e;
  }
};
Pt.prototype.shift = function() {
  if (this.head) {
    var e = this.head.value;
    return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, e;
  }
};
Pt.prototype.forEach = function(e, t) {
  t = t || this;
  for (var n = this.head, i = 0; n !== null; i++)
    e.call(t, n.value, i, this), n = n.next;
};
Pt.prototype.forEachReverse = function(e, t) {
  t = t || this;
  for (var n = this.tail, i = this.length - 1; n !== null; i--)
    e.call(t, n.value, i, this), n = n.prev;
};
Pt.prototype.get = function(e) {
  for (var t = 0, n = this.head; n !== null && t < e; t++)
    n = n.next;
  if (t === e && n !== null)
    return n.value;
};
Pt.prototype.getReverse = function(e) {
  for (var t = 0, n = this.tail; n !== null && t < e; t++)
    n = n.prev;
  if (t === e && n !== null)
    return n.value;
};
Pt.prototype.map = function(e, t) {
  t = t || this;
  for (var n = new Pt(), i = this.head; i !== null; )
    n.push(e.call(t, i.value, this)), i = i.next;
  return n;
};
Pt.prototype.mapReverse = function(e, t) {
  t = t || this;
  for (var n = new Pt(), i = this.tail; i !== null; )
    n.push(e.call(t, i.value, this)), i = i.prev;
  return n;
};
Pt.prototype.reduce = function(e, t) {
  var n, i = this.head;
  if (arguments.length > 1)
    n = t;
  else if (this.head)
    i = this.head.next, n = this.head.value;
  else
    throw new TypeError("Reduce of empty list with no initial value");
  for (var f = 0; i !== null; f++)
    n = e(n, i.value, f), i = i.next;
  return n;
};
Pt.prototype.reduceReverse = function(e, t) {
  var n, i = this.tail;
  if (arguments.length > 1)
    n = t;
  else if (this.tail)
    i = this.tail.prev, n = this.tail.value;
  else
    throw new TypeError("Reduce of empty list with no initial value");
  for (var f = this.length - 1; i !== null; f--)
    n = e(n, i.value, f), i = i.prev;
  return n;
};
Pt.prototype.toArray = function() {
  for (var e = new Array(this.length), t = 0, n = this.head; n !== null; t++)
    e[t] = n.value, n = n.next;
  return e;
};
Pt.prototype.toArrayReverse = function() {
  for (var e = new Array(this.length), t = 0, n = this.tail; n !== null; t++)
    e[t] = n.value, n = n.prev;
  return e;
};
Pt.prototype.slice = function(e, t) {
  t = t || this.length, t < 0 && (t += this.length), e = e || 0, e < 0 && (e += this.length);
  var n = new Pt();
  if (t < e || t < 0)
    return n;
  e < 0 && (e = 0), t > this.length && (t = this.length);
  for (var i = 0, f = this.head; f !== null && i < e; i++)
    f = f.next;
  for (; f !== null && i < t; i++, f = f.next)
    n.push(f.value);
  return n;
};
Pt.prototype.sliceReverse = function(e, t) {
  t = t || this.length, t < 0 && (t += this.length), e = e || 0, e < 0 && (e += this.length);
  var n = new Pt();
  if (t < e || t < 0)
    return n;
  e < 0 && (e = 0), t > this.length && (t = this.length);
  for (var i = this.length, f = this.tail; f !== null && i > t; i--)
    f = f.prev;
  for (; f !== null && i > e; i--, f = f.prev)
    n.push(f.value);
  return n;
};
Pt.prototype.splice = function(e, t, ...n) {
  e > this.length && (e = this.length - 1), e < 0 && (e = this.length + e);
  for (var i = 0, f = this.head; f !== null && i < e; i++)
    f = f.next;
  for (var r = [], i = 0; f && i < t; i++)
    r.push(f.value), f = this.removeNode(f);
  f === null && (f = this.tail), f !== this.head && f !== this.tail && (f = f.prev);
  for (var i = 0; i < n.length; i++)
    f = rm(this, f, n[i]);
  return r;
};
Pt.prototype.reverse = function() {
  for (var e = this.head, t = this.tail, n = e; n !== null; n = n.prev) {
    var i = n.prev;
    n.prev = n.next, n.next = i;
  }
  return this.head = t, this.tail = e, this;
};
function rm(e, t, n) {
  var i = t === e.head ? new Mn(n, null, t, e) : new Mn(n, t, t.next, e);
  return i.next === null && (e.tail = i), i.prev === null && (e.head = i), e.length++, i;
}
function nm(e, t) {
  e.tail = new Mn(t, e.tail, null, e), e.head || (e.head = e.tail), e.length++;
}
function im(e, t) {
  e.head = new Mn(t, null, e.head, e), e.tail || (e.tail = e.head), e.length++;
}
function Mn(e, t, n, i) {
  if (!(this instanceof Mn))
    return new Mn(e, t, n, i);
  this.list = i, this.value = e, t ? (t.next = this, this.prev = t) : this.prev = null, n ? (n.prev = this, this.next = n) : this.next = null;
}
try {
  em()(Pt);
} catch {
}
const am = tm, gn = Symbol("max"), Xr = Symbol("length"), Cn = Symbol("lengthCalculator"), bi = Symbol("allowStale"), _n = Symbol("maxAge"), Wr = Symbol("dispose"), M0 = Symbol("noDisposeOnSet"), Jt = Symbol("lruList"), Ir = Symbol("cache"), Y1 = Symbol("updateAgeOnGet"), Jf = () => 1;
class fm {
  constructor(t) {
    if (typeof t == "number" && (t = { max: t }), t || (t = {}), t.max && (typeof t.max != "number" || t.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[gn] = t.max || 1 / 0;
    const n = t.length || Jf;
    if (this[Cn] = typeof n != "function" ? Jf : n, this[bi] = t.stale || !1, t.maxAge && typeof t.maxAge != "number")
      throw new TypeError("maxAge must be a number");
    this[_n] = t.maxAge || 0, this[Wr] = t.dispose, this[M0] = t.noDisposeOnSet || !1, this[Y1] = t.updateAgeOnGet || !1, this.reset();
  }
  // resize the cache when the max changes.
  set max(t) {
    if (typeof t != "number" || t < 0)
      throw new TypeError("max must be a non-negative number");
    this[gn] = t || 1 / 0, ci(this);
  }
  get max() {
    return this[gn];
  }
  set allowStale(t) {
    this[bi] = !!t;
  }
  get allowStale() {
    return this[bi];
  }
  set maxAge(t) {
    if (typeof t != "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[_n] = t, ci(this);
  }
  get maxAge() {
    return this[_n];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(t) {
    typeof t != "function" && (t = Jf), t !== this[Cn] && (this[Cn] = t, this[Xr] = 0, this[Jt].forEach((n) => {
      n.length = this[Cn](n.value, n.key), this[Xr] += n.length;
    })), ci(this);
  }
  get lengthCalculator() {
    return this[Cn];
  }
  get length() {
    return this[Xr];
  }
  get itemCount() {
    return this[Jt].length;
  }
  rforEach(t, n) {
    n = n || this;
    for (let i = this[Jt].tail; i !== null; ) {
      const f = i.prev;
      A0(this, t, i, n), i = f;
    }
  }
  forEach(t, n) {
    n = n || this;
    for (let i = this[Jt].head; i !== null; ) {
      const f = i.next;
      A0(this, t, i, n), i = f;
    }
  }
  keys() {
    return this[Jt].toArray().map((t) => t.key);
  }
  values() {
    return this[Jt].toArray().map((t) => t.value);
  }
  reset() {
    this[Wr] && this[Jt] && this[Jt].length && this[Jt].forEach((t) => this[Wr](t.key, t.value)), this[Ir] = /* @__PURE__ */ new Map(), this[Jt] = new am(), this[Xr] = 0;
  }
  dump() {
    return this[Jt].map((t) => ma(this, t) ? !1 : {
      k: t.key,
      v: t.value,
      e: t.now + (t.maxAge || 0)
    }).toArray().filter((t) => t);
  }
  dumpLru() {
    return this[Jt];
  }
  set(t, n, i) {
    if (i = i || this[_n], i && typeof i != "number")
      throw new TypeError("maxAge must be a number");
    const f = i ? Date.now() : 0, r = this[Cn](n, t);
    if (this[Ir].has(t)) {
      if (r > this[gn])
        return zn(this, this[Ir].get(t)), !1;
      const c = this[Ir].get(t).value;
      return this[Wr] && (this[M0] || this[Wr](t, c.value)), c.now = f, c.maxAge = i, c.value = n, this[Xr] += r - c.length, c.length = r, this.get(t), ci(this), !0;
    }
    const o = new om(t, n, r, f, i);
    return o.length > this[gn] ? (this[Wr] && this[Wr](t, n), !1) : (this[Xr] += o.length, this[Jt].unshift(o), this[Ir].set(t, this[Jt].head), ci(this), !0);
  }
  has(t) {
    if (!this[Ir].has(t))
      return !1;
    const n = this[Ir].get(t).value;
    return !ma(this, n);
  }
  get(t) {
    return Xf(this, t, !0);
  }
  peek(t) {
    return Xf(this, t, !1);
  }
  pop() {
    const t = this[Jt].tail;
    return t ? (zn(this, t), t.value) : null;
  }
  del(t) {
    zn(this, this[Ir].get(t));
  }
  load(t) {
    this.reset();
    const n = Date.now();
    for (let i = t.length - 1; i >= 0; i--) {
      const f = t[i], r = f.e || 0;
      if (r === 0)
        this.set(f.k, f.v);
      else {
        const o = r - n;
        o > 0 && this.set(f.k, f.v, o);
      }
    }
  }
  prune() {
    this[Ir].forEach((t, n) => Xf(this, n, !1));
  }
}
const Xf = (e, t, n) => {
  const i = e[Ir].get(t);
  if (i) {
    const f = i.value;
    if (ma(e, f)) {
      if (zn(e, i), !e[bi])
        return;
    } else
      n && (e[Y1] && (i.value.now = Date.now()), e[Jt].unshiftNode(i));
    return f.value;
  }
}, ma = (e, t) => {
  if (!t || !t.maxAge && !e[_n])
    return !1;
  const n = Date.now() - t.now;
  return t.maxAge ? n > t.maxAge : e[_n] && n > e[_n];
}, ci = (e) => {
  if (e[Xr] > e[gn])
    for (let t = e[Jt].tail; e[Xr] > e[gn] && t !== null; ) {
      const n = t.prev;
      zn(e, t), t = n;
    }
}, zn = (e, t) => {
  if (t) {
    const n = t.value;
    e[Wr] && e[Wr](n.key, n.value), e[Xr] -= n.length, e[Ir].delete(n.key), e[Jt].removeNode(t);
  }
};
class om {
  constructor(t, n, i, f, r) {
    this.key = t, this.value = n, this.length = i, this.now = f, this.maxAge = r || 0;
  }
}
const A0 = (e, t, n, i) => {
  let f = n.value;
  ma(e, f) && (zn(e, n), e[bi] || (f = void 0)), f && t.call(i, f.value, f.key, e);
};
var sm = fm, Zf, B0;
function Or() {
  if (B0)
    return Zf;
  B0 = 1;
  class e {
    constructor(m, b) {
      if (b = i(b), m instanceof e)
        return m.loose === !!b.loose && m.includePrerelease === !!b.includePrerelease ? m : new e(m.raw, b);
      if (m instanceof f)
        return this.raw = m.value, this.set = [[m]], this.format(), this;
      if (this.options = b, this.loose = !!b.loose, this.includePrerelease = !!b.includePrerelease, this.raw = m, this.set = m.split("||").map((a) => this.parseRange(a.trim())).filter((a) => a.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${m}`);
      if (this.set.length > 1) {
        const a = this.set[0];
        if (this.set = this.set.filter((h) => !p(h[0])), this.set.length === 0)
          this.set = [a];
        else if (this.set.length > 1) {
          for (const h of this.set)
            if (h.length === 1 && g(h[0])) {
              this.set = [h];
              break;
            }
        }
      }
      this.format();
    }
    format() {
      return this.range = this.set.map((m) => m.join(" ").trim()).join("||").trim(), this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(m) {
      m = m.trim();
      const a = `parseRange:${Object.keys(this.options).join(",")}:${m}`, h = n.get(a);
      if (h)
        return h;
      const y = this.options.loose, x = y ? s[c.HYPHENRANGELOOSE] : s[c.HYPHENRANGE];
      m = m.replace(x, Q(this.options.includePrerelease)), r("hyphen replace", m), m = m.replace(s[c.COMPARATORTRIM], l), r("comparator trim", m), m = m.replace(s[c.TILDETRIM], u), m = m.replace(s[c.CARETTRIM], v), m = m.split(/\s+/).join(" ");
      let A = m.split(" ").map((d) => S(d, this.options)).join(" ").split(/\s+/).map((d) => ne(d, this.options));
      y && (A = A.filter((d) => (r("loose invalid filter", d, this.options), !!d.match(s[c.COMPARATORLOOSE])))), r("range list", A);
      const B = /* @__PURE__ */ new Map(), _ = A.map((d) => new f(d, this.options));
      for (const d of _) {
        if (p(d))
          return [d];
        B.set(d.value, d);
      }
      B.size > 1 && B.has("") && B.delete("");
      const E = [...B.values()];
      return n.set(a, E), E;
    }
    intersects(m, b) {
      if (!(m instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((a) => w(a, b) && m.set.some((h) => w(h, b) && a.every((y) => h.every((x) => y.intersects(x, b)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(m) {
      if (!m)
        return !1;
      if (typeof m == "string")
        try {
          m = new o(m, this.options);
        } catch {
          return !1;
        }
      for (let b = 0; b < this.set.length; b++)
        if (se(this.set[b], m, this.options))
          return !0;
      return !1;
    }
  }
  Zf = e;
  const t = sm, n = new t({ max: 1e3 }), i = sf, f = cf(), r = of, o = ar, {
    re: s,
    t: c,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: v
  } = Yr, p = (k) => k.value === "<0.0.0-0", g = (k) => k.value === "", w = (k, m) => {
    let b = !0;
    const a = k.slice();
    let h = a.pop();
    for (; b && a.length; )
      b = a.every((y) => h.intersects(y, m)), h = a.pop();
    return b;
  }, S = (k, m) => (r("comp", k, m), k = N(k, m), r("caret", k), k = I(k, m), r("tildes", k), k = D(k, m), r("xrange", k), k = V(k, m), r("stars", k), k), T = (k) => !k || k.toLowerCase() === "x" || k === "*", I = (k, m) => k.trim().split(/\s+/).map((b) => C(b, m)).join(" "), C = (k, m) => {
    const b = m.loose ? s[c.TILDELOOSE] : s[c.TILDE];
    return k.replace(b, (a, h, y, x, A) => {
      r("tilde", k, a, h, y, x, A);
      let B;
      return T(h) ? B = "" : T(y) ? B = `>=${h}.0.0 <${+h + 1}.0.0-0` : T(x) ? B = `>=${h}.${y}.0 <${h}.${+y + 1}.0-0` : A ? (r("replaceTilde pr", A), B = `>=${h}.${y}.${x}-${A} <${h}.${+y + 1}.0-0`) : B = `>=${h}.${y}.${x} <${h}.${+y + 1}.0-0`, r("tilde return", B), B;
    });
  }, N = (k, m) => k.trim().split(/\s+/).map((b) => $(b, m)).join(" "), $ = (k, m) => {
    r("caret", k, m);
    const b = m.loose ? s[c.CARETLOOSE] : s[c.CARET], a = m.includePrerelease ? "-0" : "";
    return k.replace(b, (h, y, x, A, B) => {
      r("caret", k, h, y, x, A, B);
      let _;
      return T(y) ? _ = "" : T(x) ? _ = `>=${y}.0.0${a} <${+y + 1}.0.0-0` : T(A) ? y === "0" ? _ = `>=${y}.${x}.0${a} <${y}.${+x + 1}.0-0` : _ = `>=${y}.${x}.0${a} <${+y + 1}.0.0-0` : B ? (r("replaceCaret pr", B), y === "0" ? x === "0" ? _ = `>=${y}.${x}.${A}-${B} <${y}.${x}.${+A + 1}-0` : _ = `>=${y}.${x}.${A}-${B} <${y}.${+x + 1}.0-0` : _ = `>=${y}.${x}.${A}-${B} <${+y + 1}.0.0-0`) : (r("no pr"), y === "0" ? x === "0" ? _ = `>=${y}.${x}.${A}${a} <${y}.${x}.${+A + 1}-0` : _ = `>=${y}.${x}.${A}${a} <${y}.${+x + 1}.0-0` : _ = `>=${y}.${x}.${A} <${+y + 1}.0.0-0`), r("caret return", _), _;
    });
  }, D = (k, m) => (r("replaceXRanges", k, m), k.split(/\s+/).map((b) => H(b, m)).join(" ")), H = (k, m) => {
    k = k.trim();
    const b = m.loose ? s[c.XRANGELOOSE] : s[c.XRANGE];
    return k.replace(b, (a, h, y, x, A, B) => {
      r("xRange", k, a, h, y, x, A, B);
      const _ = T(y), E = _ || T(x), d = E || T(A), M = d;
      return h === "=" && M && (h = ""), B = m.includePrerelease ? "-0" : "", _ ? h === ">" || h === "<" ? a = "<0.0.0-0" : a = "*" : h && M ? (E && (x = 0), A = 0, h === ">" ? (h = ">=", E ? (y = +y + 1, x = 0, A = 0) : (x = +x + 1, A = 0)) : h === "<=" && (h = "<", E ? y = +y + 1 : x = +x + 1), h === "<" && (B = "-0"), a = `${h + y}.${x}.${A}${B}`) : E ? a = `>=${y}.0.0${B} <${+y + 1}.0.0-0` : d && (a = `>=${y}.${x}.0${B} <${y}.${+x + 1}.0-0`), r("xRange return", a), a;
    });
  }, V = (k, m) => (r("replaceStars", k, m), k.trim().replace(s[c.STAR], "")), ne = (k, m) => (r("replaceGTE0", k, m), k.trim().replace(s[m.includePrerelease ? c.GTE0PRE : c.GTE0], "")), Q = (k) => (m, b, a, h, y, x, A, B, _, E, d, M, Z) => (T(a) ? b = "" : T(h) ? b = `>=${a}.0.0${k ? "-0" : ""}` : T(y) ? b = `>=${a}.${h}.0${k ? "-0" : ""}` : x ? b = `>=${b}` : b = `>=${b}${k ? "-0" : ""}`, T(_) ? B = "" : T(E) ? B = `<${+_ + 1}.0.0-0` : T(d) ? B = `<${_}.${+E + 1}.0-0` : M ? B = `<=${_}.${E}.${d}-${M}` : k ? B = `<${_}.${E}.${+d + 1}-0` : B = `<=${B}`, `${b} ${B}`.trim()), se = (k, m, b) => {
    for (let a = 0; a < k.length; a++)
      if (!k[a].test(m))
        return !1;
    if (m.prerelease.length && !b.includePrerelease) {
      for (let a = 0; a < k.length; a++)
        if (r(k[a].semver), k[a].semver !== f.ANY && k[a].semver.prerelease.length > 0) {
          const h = k[a].semver;
          if (h.major === m.major && h.minor === m.minor && h.patch === m.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Zf;
}
var Yf, R0;
function cf() {
  if (R0)
    return Yf;
  R0 = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, v) {
      if (v = n(v), u instanceof t) {
        if (u.loose === !!v.loose)
          return u;
        u = u.value;
      }
      o("comparator", u, v), this.options = v, this.loose = !!v.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(u) {
      const v = this.options.loose ? i[f.COMPARATORLOOSE] : i[f.COMPARATOR], p = u.match(v);
      if (!p)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new s(p[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new s(u, this.options);
        } catch {
          return !1;
        }
      return r(u, this.operator, this.semver, this.options);
    }
    intersects(u, v) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      if ((!v || typeof v != "object") && (v = {
        loose: !!v,
        includePrerelease: !1
      }), this.operator === "")
        return this.value === "" ? !0 : new c(u.value, v).test(this.value);
      if (u.operator === "")
        return u.value === "" ? !0 : new c(this.value, v).test(u.semver);
      const p = (this.operator === ">=" || this.operator === ">") && (u.operator === ">=" || u.operator === ">"), g = (this.operator === "<=" || this.operator === "<") && (u.operator === "<=" || u.operator === "<"), w = this.semver.version === u.semver.version, S = (this.operator === ">=" || this.operator === "<=") && (u.operator === ">=" || u.operator === "<="), T = r(this.semver, "<", u.semver, v) && (this.operator === ">=" || this.operator === ">") && (u.operator === "<=" || u.operator === "<"), I = r(this.semver, ">", u.semver, v) && (this.operator === "<=" || this.operator === "<") && (u.operator === ">=" || u.operator === ">");
      return p || g || w && S || T || I;
    }
  }
  Yf = t;
  const n = sf, { re: i, t: f } = Yr, r = Z1, o = of, s = ar, c = Or();
  return Yf;
}
const um = Or(), cm = (e, t, n) => {
  try {
    t = new um(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var hf = cm;
const hm = Or(), lm = (e, t) => new hm(e, t).set.map((n) => n.map((i) => i.value).join(" ").trim().split(" "));
var dm = lm;
const pm = ar, vm = Or(), bm = (e, t, n) => {
  let i = null, f = null, r = null;
  try {
    r = new vm(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    r.test(o) && (!i || f.compare(o) === -1) && (i = o, f = new pm(i, n));
  }), i;
};
var ym = bm;
const gm = ar, mm = Or(), wm = (e, t, n) => {
  let i = null, f = null, r = null;
  try {
    r = new mm(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    r.test(o) && (!i || f.compare(o) === 1) && (i = o, f = new gm(i, n));
  }), i;
};
var _m = wm;
const Qf = ar, xm = Or(), I0 = uf, Em = (e, t) => {
  e = new xm(e, t);
  let n = new Qf("0.0.0");
  if (e.test(n) || (n = new Qf("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let i = 0; i < e.set.length; ++i) {
    const f = e.set[i];
    let r = null;
    f.forEach((o) => {
      const s = new Qf(o.semver.version);
      switch (o.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!r || I0(s, r)) && (r = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), r && (!n || I0(n, r)) && (n = r);
  }
  return n && e.test(n) ? n : null;
};
var Sm = Em;
const Mm = Or(), Am = (e, t) => {
  try {
    return new Mm(e, t).range || "*";
  } catch {
    return null;
  }
};
var Bm = Am;
const Rm = ar, Q1 = cf(), { ANY: Im } = Q1, Tm = Or(), Pm = hf, T0 = uf, P0 = dc, Cm = vc, Om = pc, Nm = (e, t, n, i) => {
  e = new Rm(e, i), t = new Tm(t, i);
  let f, r, o, s, c;
  switch (n) {
    case ">":
      f = T0, r = Cm, o = P0, s = ">", c = ">=";
      break;
    case "<":
      f = P0, r = Om, o = T0, s = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Pm(e, t, i))
    return !1;
  for (let l = 0; l < t.set.length; ++l) {
    const u = t.set[l];
    let v = null, p = null;
    if (u.forEach((g) => {
      g.semver === Im && (g = new Q1(">=0.0.0")), v = v || g, p = p || g, f(g.semver, v.semver, i) ? v = g : o(g.semver, p.semver, i) && (p = g);
    }), v.operator === s || v.operator === c || (!p.operator || p.operator === s) && r(e, p.semver))
      return !1;
    if (p.operator === c && o(e, p.semver))
      return !1;
  }
  return !0;
};
var bc = Nm;
const Lm = bc, $m = (e, t, n) => Lm(e, t, ">", n);
var km = $m;
const jm = bc, Dm = (e, t, n) => jm(e, t, "<", n);
var qm = Dm;
const C0 = Or(), Um = (e, t, n) => (e = new C0(e, n), t = new C0(t, n), e.intersects(t));
var Fm = Um;
const Hm = hf, zm = Cr;
var Vm = (e, t, n) => {
  const i = [];
  let f = null, r = null;
  const o = e.sort((u, v) => zm(u, v, n));
  for (const u of o)
    Hm(u, t, n) ? (r = u, f || (f = u)) : (r && i.push([f, r]), r = null, f = null);
  f && i.push([f, null]);
  const s = [];
  for (const [u, v] of i)
    u === v ? s.push(u) : !v && u === o[0] ? s.push("*") : v ? u === o[0] ? s.push(`<=${v}`) : s.push(`${u} - ${v}`) : s.push(`>=${u}`);
  const c = s.join(" || "), l = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < l.length ? c : t;
};
const O0 = Or(), la = cf(), { ANY: eo } = la, hi = hf, yc = Cr, Km = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new O0(e, n), t = new O0(t, n);
  let i = !1;
  e:
    for (const f of e.set) {
      for (const r of t.set) {
        const o = Gm(f, r, n);
        if (i = i || o !== null, o)
          continue e;
      }
      if (i)
        return !1;
    }
  return !0;
}, Gm = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === eo) {
    if (t.length === 1 && t[0].semver === eo)
      return !0;
    n.includePrerelease ? e = [new la(">=0.0.0-0")] : e = [new la(">=0.0.0")];
  }
  if (t.length === 1 && t[0].semver === eo) {
    if (n.includePrerelease)
      return !0;
    t = [new la(">=0.0.0")];
  }
  const i = /* @__PURE__ */ new Set();
  let f, r;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? f = N0(f, g, n) : g.operator === "<" || g.operator === "<=" ? r = L0(r, g, n) : i.add(g.semver);
  if (i.size > 1)
    return null;
  let o;
  if (f && r) {
    if (o = yc(f.semver, r.semver, n), o > 0)
      return null;
    if (o === 0 && (f.operator !== ">=" || r.operator !== "<="))
      return null;
  }
  for (const g of i) {
    if (f && !hi(g, String(f), n) || r && !hi(g, String(r), n))
      return null;
    for (const w of t)
      if (!hi(g, String(w), n))
        return !1;
    return !0;
  }
  let s, c, l, u, v = r && !n.includePrerelease && r.semver.prerelease.length ? r.semver : !1, p = f && !n.includePrerelease && f.semver.prerelease.length ? f.semver : !1;
  v && v.prerelease.length === 1 && r.operator === "<" && v.prerelease[0] === 0 && (v = !1);
  for (const g of t) {
    if (u = u || g.operator === ">" || g.operator === ">=", l = l || g.operator === "<" || g.operator === "<=", f) {
      if (p && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === p.major && g.semver.minor === p.minor && g.semver.patch === p.patch && (p = !1), g.operator === ">" || g.operator === ">=") {
        if (s = N0(f, g, n), s === g && s !== f)
          return !1;
      } else if (f.operator === ">=" && !hi(f.semver, String(g), n))
        return !1;
    }
    if (r) {
      if (v && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === v.major && g.semver.minor === v.minor && g.semver.patch === v.patch && (v = !1), g.operator === "<" || g.operator === "<=") {
        if (c = L0(r, g, n), c === g && c !== r)
          return !1;
      } else if (r.operator === "<=" && !hi(r.semver, String(g), n))
        return !1;
    }
    if (!g.operator && (r || f) && o !== 0)
      return !1;
  }
  return !(f && l && !r && o !== 0 || r && u && !f && o !== 0 || p || v);
}, N0 = (e, t, n) => {
  if (!e)
    return t;
  const i = yc(e.semver, t.semver, n);
  return i > 0 ? e : i < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, L0 = (e, t, n) => {
  if (!e)
    return t;
  const i = yc(e.semver, t.semver, n);
  return i < 0 ? e : i > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Wm = Km;
const to = Yr, Jm = ff, Xm = ar, $0 = J1, Zm = ii, Ym = X2, Qm = Q2, e6 = tg, t6 = og, r6 = cg, n6 = dg, i6 = bg, a6 = mg, f6 = Cr, o6 = xg, s6 = Mg, u6 = lc, c6 = Ig, h6 = Cg, l6 = uf, d6 = dc, p6 = hc, v6 = X1, b6 = pc, y6 = vc, g6 = Z1, m6 = Qg, w6 = cf(), _6 = Or(), x6 = hf, E6 = dm, S6 = ym, M6 = _m, A6 = Sm, B6 = Bm, R6 = bc, I6 = km, T6 = qm, P6 = Fm, C6 = Vm, O6 = Wm;
var N6 = {
  parse: Zm,
  valid: Ym,
  clean: Qm,
  inc: e6,
  diff: t6,
  major: r6,
  minor: n6,
  patch: i6,
  prerelease: a6,
  compare: f6,
  rcompare: o6,
  compareLoose: s6,
  compareBuild: u6,
  sort: c6,
  rsort: h6,
  gt: l6,
  lt: d6,
  eq: p6,
  neq: v6,
  gte: b6,
  lte: y6,
  cmp: g6,
  coerce: m6,
  Comparator: w6,
  Range: _6,
  satisfies: x6,
  toComparators: E6,
  maxSatisfying: S6,
  minSatisfying: M6,
  minVersion: A6,
  validRange: B6,
  outside: R6,
  gtr: I6,
  ltr: T6,
  intersects: P6,
  simplifyRange: C6,
  subset: O6,
  SemVer: Xm,
  re: to.re,
  src: to.src,
  tokens: to.t,
  SEMVER_SPEC_VERSION: Jm.SEMVER_SPEC_VERSION,
  compareIdentifiers: $0.compareIdentifiers,
  rcompareIdentifiers: $0.rcompareIdentifiers
};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.satisfiesVersionRange = e.gtRange = e.gtVersion = e.assertIsSemVerRange = e.assertIsSemVerVersion = e.isValidSemVerRange = e.isValidSemVerVersion = e.VersionRangeStruct = e.VersionStruct = void 0;
  const t = N6, n = In, i = Yt;
  e.VersionStruct = (0, n.refine)((0, n.string)(), "Version", (v) => (0, t.valid)(v) === null ? `Expected SemVer version, got "${v}"` : !0), e.VersionRangeStruct = (0, n.refine)((0, n.string)(), "Version range", (v) => (0, t.validRange)(v) === null ? `Expected SemVer range, got "${v}"` : !0);
  function f(v) {
    return (0, n.is)(v, e.VersionStruct);
  }
  e.isValidSemVerVersion = f;
  function r(v) {
    return (0, n.is)(v, e.VersionRangeStruct);
  }
  e.isValidSemVerRange = r;
  function o(v) {
    (0, i.assertStruct)(v, e.VersionStruct);
  }
  e.assertIsSemVerVersion = o;
  function s(v) {
    (0, i.assertStruct)(v, e.VersionRangeStruct);
  }
  e.assertIsSemVerRange = s;
  function c(v, p) {
    return (0, t.gt)(v, p);
  }
  e.gtVersion = c;
  function l(v, p) {
    return (0, t.gtr)(v, p);
  }
  e.gtRange = l;
  function u(v, p) {
    return (0, t.satisfies)(v, p, {
      includePrerelease: !0
    });
  }
  e.satisfiesVersionRange = u;
})(G1);
(function(e) {
  var t = Ne && Ne.__createBinding || (Object.create ? function(i, f, r, o) {
    o === void 0 && (o = r);
    var s = Object.getOwnPropertyDescriptor(f, r);
    (!s || ("get" in s ? !f.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
      return f[r];
    } }), Object.defineProperty(i, o, s);
  } : function(i, f, r, o) {
    o === void 0 && (o = r), i[o] = f[r];
  }), n = Ne && Ne.__exportStar || function(i, f) {
    for (var r in i)
      r !== "default" && !Object.prototype.hasOwnProperty.call(f, r) && t(f, i, r);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(Yt, e), n(Di, e), n(It, e), n(nf, e), n(Ur, e), n(Gn, e), n(qi, e), n(z1, e), n(Wn, e), n(cc, e), n(Fr, e), n(V1, e), n(K1, e), n(G1, e);
})(M1);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createModuleLogger = e.projectLogger = void 0;
  const t = M1;
  Object.defineProperty(e, "createModuleLogger", { enumerable: !0, get: function() {
    return t.createModuleLogger;
  } }), e.projectLogger = t.createProjectLogger("eth-json-rpc-middleware");
})(ti);
var Xt = {}, ta = {}, ro, k0;
function L6() {
  if (k0)
    return ro;
  k0 = 1;
  var e, t, n = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: `
`,
    r: "\r",
    t: "	"
  }, i;
  function f(g) {
    throw {
      name: "SyntaxError",
      message: g,
      at: e,
      text: i
    };
  }
  function r(g) {
    return g && g !== t && f("Expected '" + g + "' instead of '" + t + "'"), t = i.charAt(e), e += 1, t;
  }
  function o() {
    var g, w = "";
    for (t === "-" && (w = "-", r("-")); t >= "0" && t <= "9"; )
      w += t, r();
    if (t === ".")
      for (w += "."; r() && t >= "0" && t <= "9"; )
        w += t;
    if (t === "e" || t === "E")
      for (w += t, r(), (t === "-" || t === "+") && (w += t, r()); t >= "0" && t <= "9"; )
        w += t, r();
    return g = Number(w), isFinite(g) || f("Bad number"), g;
  }
  function s() {
    var g, w, S = "", T;
    if (t === '"')
      for (; r(); ) {
        if (t === '"')
          return r(), S;
        if (t === "\\")
          if (r(), t === "u") {
            for (T = 0, w = 0; w < 4 && (g = parseInt(r(), 16), !!isFinite(g)); w += 1)
              T = T * 16 + g;
            S += String.fromCharCode(T);
          } else if (typeof n[t] == "string")
            S += n[t];
          else
            break;
        else
          S += t;
      }
    f("Bad string");
  }
  function c() {
    for (; t && t <= " "; )
      r();
  }
  function l() {
    switch (t) {
      case "t":
        return r("t"), r("r"), r("u"), r("e"), !0;
      case "f":
        return r("f"), r("a"), r("l"), r("s"), r("e"), !1;
      case "n":
        return r("n"), r("u"), r("l"), r("l"), null;
      default:
        f("Unexpected '" + t + "'");
    }
  }
  function u() {
    var g = [];
    if (t === "[") {
      if (r("["), c(), t === "]")
        return r("]"), g;
      for (; t; ) {
        if (g.push(p()), c(), t === "]")
          return r("]"), g;
        r(","), c();
      }
    }
    f("Bad array");
  }
  function v() {
    var g, w = {};
    if (t === "{") {
      if (r("{"), c(), t === "}")
        return r("}"), w;
      for (; t; ) {
        if (g = s(), c(), r(":"), Object.prototype.hasOwnProperty.call(w, g) && f('Duplicate key "' + g + '"'), w[g] = p(), c(), t === "}")
          return r("}"), w;
        r(","), c();
      }
    }
    f("Bad object");
  }
  function p() {
    switch (c(), t) {
      case "{":
        return v();
      case "[":
        return u();
      case '"':
        return s();
      case "-":
        return o();
      default:
        return t >= "0" && t <= "9" ? o() : l();
    }
  }
  return ro = function(g, w) {
    var S;
    return i = g, e = 0, t = " ", S = p(), c(), t && f("Syntax error"), typeof w == "function" ? function T(I, C) {
      var N, $, D = I[C];
      if (D && typeof D == "object")
        for (N in p)
          Object.prototype.hasOwnProperty.call(D, N) && ($ = T(D, N), typeof $ > "u" ? delete D[N] : D[N] = $);
      return w.call(I, C, D);
    }({ "": S }, "") : S;
  }, ro;
}
var no, j0;
function $6() {
  if (j0)
    return no;
  j0 = 1;
  var e = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, t, n, i = {
    // table of character substitutions
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  }, f;
  function r(s) {
    return e.lastIndex = 0, e.test(s) ? '"' + s.replace(e, function(c) {
      var l = i[c];
      return typeof l == "string" ? l : "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + s + '"';
  }
  function o(s, c) {
    var l, u, v, p, g = t, w, S = c[s];
    switch (S && typeof S == "object" && typeof S.toJSON == "function" && (S = S.toJSON(s)), typeof f == "function" && (S = f.call(c, s, S)), typeof S) {
      case "string":
        return r(S);
      case "number":
        return isFinite(S) ? String(S) : "null";
      case "boolean":
      case "null":
        return String(S);
      case "object":
        if (!S)
          return "null";
        if (t += n, w = [], Object.prototype.toString.apply(S) === "[object Array]") {
          for (p = S.length, l = 0; l < p; l += 1)
            w[l] = o(l, S) || "null";
          return v = w.length === 0 ? "[]" : t ? `[
` + t + w.join(`,
` + t) + `
` + g + "]" : "[" + w.join(",") + "]", t = g, v;
        }
        if (f && typeof f == "object")
          for (p = f.length, l = 0; l < p; l += 1)
            u = f[l], typeof u == "string" && (v = o(u, S), v && w.push(r(u) + (t ? ": " : ":") + v));
        else
          for (u in S)
            Object.prototype.hasOwnProperty.call(S, u) && (v = o(u, S), v && w.push(r(u) + (t ? ": " : ":") + v));
        return v = w.length === 0 ? "{}" : t ? `{
` + t + w.join(`,
` + t) + `
` + g + "}" : "{" + w.join(",") + "}", t = g, v;
    }
  }
  return no = function(s, c, l) {
    var u;
    if (t = "", n = "", typeof l == "number")
      for (u = 0; u < l; u += 1)
        n += " ";
    else
      typeof l == "string" && (n = l);
    if (f = c, c && typeof c != "function" && (typeof c != "object" || typeof c.length != "number"))
      throw new Error("JSON.stringify");
    return o("", { "": s });
  }, no;
}
var D0;
function k6() {
  return D0 || (D0 = 1, ta.parse = L6(), ta.stringify = $6()), ta;
}
var ra = typeof JSON < "u" ? JSON : k6(), j6 = Array.isArray || function(e) {
  return {}.toString.call(e) === "[object Array]";
}, D6 = Object.keys || function(e) {
  var t = Object.prototype.hasOwnProperty || function() {
    return !0;
  }, n = [];
  for (var i in e)
    t.call(e, i) && n.push(i);
  return n;
}, q6 = function(e, t) {
  t || (t = {}), typeof t == "function" && (t = { cmp: t });
  var n = t.space || "";
  typeof n == "number" && (n = Array(n + 1).join(" "));
  var i = typeof t.cycles == "boolean" ? t.cycles : !1, f = t.replacer || function(s, c) {
    return c;
  }, r = t.cmp && function(s) {
    return function(c) {
      return function(l, u) {
        var v = { key: l, value: c[l] }, p = { key: u, value: c[u] };
        return s(v, p);
      };
    };
  }(t.cmp), o = [];
  return function s(c, l, u, v) {
    var p = n ? `
` + new Array(v + 1).join(n) : "", g = n ? ": " : ":";
    if (u && u.toJSON && typeof u.toJSON == "function" && (u = u.toJSON()), u = f.call(c, l, u), u !== void 0) {
      if (typeof u != "object" || u === null)
        return ra.stringify(u);
      if (j6(u)) {
        for (var I = [], w = 0; w < u.length; w++) {
          var S = s(u, w, u[w], v + 1) || ra.stringify(null);
          I.push(p + n + S);
        }
        return "[" + I.join(",") + p + "]";
      }
      if (o.indexOf(u) !== -1) {
        if (i)
          return ra.stringify("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        o.push(u);
      for (var T = D6(u).sort(r && r(u)), I = [], w = 0; w < T.length; w++) {
        var l = T[w], C = s(u, l, u[l], v + 1);
        if (C) {
          var N = ra.stringify(l) + g + C;
          I.push(p + n + N);
        }
      }
      return o.splice(o.indexOf(u), 1), "{" + I.join(",") + p + "}";
    }
  }({ "": e }, "", e, 0);
}, U6 = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.cacheTypeForPayload = Xt.blockTagParamIndex = Xt.paramsWithoutBlockTag = Xt.blockTagForPayload = Xt.canCache = Xt.cacheIdentifierForPayload = void 0;
const F6 = U6(q6);
function H6(e, t) {
  var n;
  const i = t ? tp(e) : (n = e.params) !== null && n !== void 0 ? n : [];
  return ep(e) ? `${e.method}:${F6.default(i)}` : null;
}
Xt.cacheIdentifierForPayload = H6;
function ep(e) {
  return rp(e) !== "never";
}
Xt.canCache = ep;
function z6(e) {
  if (!e.params)
    return;
  const t = gc(e);
  if (!(t === void 0 || t >= e.params.length))
    return e.params[t];
}
Xt.blockTagForPayload = z6;
function tp(e) {
  if (!e.params)
    return [];
  const t = gc(e);
  return t === void 0 || t >= e.params.length ? e.params : e.method === "eth_getBlockByNumber" ? e.params.slice(1) : e.params.slice(0, t);
}
Xt.paramsWithoutBlockTag = tp;
function gc(e) {
  switch (e.method) {
    case "eth_getStorageAt":
      return 2;
    case "eth_getBalance":
    case "eth_getCode":
    case "eth_getTransactionCount":
    case "eth_call":
      return 1;
    case "eth_getBlockByNumber":
      return 0;
    default:
      return;
  }
}
Xt.blockTagParamIndex = gc;
function rp(e) {
  switch (e.method) {
    case "web3_clientVersion":
    case "web3_sha3":
    case "eth_protocolVersion":
    case "eth_getBlockTransactionCountByHash":
    case "eth_getUncleCountByBlockHash":
    case "eth_getCode":
    case "eth_getBlockByHash":
    case "eth_getTransactionByHash":
    case "eth_getTransactionByBlockHashAndIndex":
    case "eth_getTransactionReceipt":
    case "eth_getUncleByBlockHashAndIndex":
    case "eth_getCompilers":
    case "eth_compileLLL":
    case "eth_compileSolidity":
    case "eth_compileSerpent":
    case "shh_version":
    case "test_permaCache":
      return "perma";
    case "eth_getBlockByNumber":
    case "eth_getBlockTransactionCountByNumber":
    case "eth_getUncleCountByBlockNumber":
    case "eth_getTransactionByBlockNumberAndIndex":
    case "eth_getUncleByBlockNumberAndIndex":
    case "test_forkCache":
      return "fork";
    case "eth_gasPrice":
    case "eth_blockNumber":
    case "eth_getBalance":
    case "eth_getStorageAt":
    case "eth_getTransactionCount":
    case "eth_call":
    case "eth_estimateGas":
    case "eth_getFilterLogs":
    case "eth_getLogs":
    case "test_blockCache":
      return "block";
    default:
      return "never";
  }
}
Xt.cacheTypeForPayload = rp;
Object.defineProperty(tf, "__esModule", { value: !0 });
tf.createBlockCacheMiddleware = void 0;
const V6 = lr, q0 = ti, jn = Xt, On = q0.createModuleLogger(q0.projectLogger, "block-cache"), K6 = [void 0, null, "<nil>"];
class G6 {
  constructor() {
    this.cache = {};
  }
  getBlockCacheForPayload(t, n) {
    const i = Number.parseInt(n, 16);
    let f = this.cache[i];
    if (!f) {
      const r = {};
      this.cache[i] = r, f = r;
    }
    return f;
  }
  async get(t, n) {
    const i = this.getBlockCacheForPayload(t, n), f = jn.cacheIdentifierForPayload(t, !0);
    return f ? i[f] : void 0;
  }
  async set(t, n, i) {
    if (!this.canCacheResult(t, i))
      return;
    const r = jn.cacheIdentifierForPayload(t, !0);
    if (!r)
      return;
    const o = this.getBlockCacheForPayload(t, n);
    o[r] = i;
  }
  canCacheRequest(t) {
    return !(!jn.canCache(t) || jn.blockTagForPayload(t) === "pending");
  }
  canCacheResult(t, n) {
    return !(K6.includes(n) || t.method && ["eth_getTransactionByHash", "eth_getTransactionReceipt"].includes(t.method) && (!n || !n.blockHash || n.blockHash === "0x0000000000000000000000000000000000000000000000000000000000000000"));
  }
  // removes all block caches with block number lower than `oldBlockHex`
  clearBefore(t) {
    const n = Number.parseInt(t, 16);
    Object.keys(this.cache).map(Number).filter((i) => i < n).forEach((i) => delete this.cache[i]);
  }
}
function W6({ blockTracker: e } = {}) {
  if (!e)
    throw new Error("createBlockCacheMiddleware - No PollingBlockTracker specified");
  const t = new G6(), n = {
    perma: t,
    block: t,
    fork: t
  };
  return V6.createAsyncMiddleware(async (i, f, r) => {
    if (i.skipCache)
      return r();
    const o = jn.cacheTypeForPayload(i), s = n[o];
    if (!s || !s.canCacheRequest(i))
      return r();
    let c = jn.blockTagForPayload(i);
    c || (c = "latest"), On("blockTag = %o, req = %o", c, i);
    let l;
    if (c === "earliest")
      l = "0x00";
    else if (c === "latest") {
      On("Fetching latest block number to determine cache key");
      const v = await e.getLatestBlock();
      On("Clearing values stored under block numbers before %o", v), t.clearBefore(v), l = v;
    } else
      l = c;
    const u = await s.get(i, l);
    u === void 0 ? (On("No cache stored under block number %o, carrying request forward", l), await r(), On("Populating cache with", f), await s.set(i, l, f.result)) : (On("Cache hit, reusing cache result stored under block number %o", l), f.result = u);
  });
}
tf.createBlockCacheMiddleware = W6;
var lf = {};
Object.defineProperty(lf, "__esModule", { value: !0 });
lf.createBlockRefRewriteMiddleware = void 0;
const J6 = lr, X6 = Xt;
function Z6({ blockTracker: e } = {}) {
  if (!e)
    throw Error('BlockRefRewriteMiddleware - mandatory "blockTracker" option is missing.');
  return J6.createAsyncMiddleware(async (t, n, i) => {
    var f;
    const r = X6.blockTagParamIndex(t);
    if (r === void 0)
      return i();
    let o = (f = t.params) === null || f === void 0 ? void 0 : f[r];
    if (o === void 0 && (o = "latest"), o !== "latest")
      return i();
    const s = await e.getLatestBlock();
    return t.params && (t.params[r] = s), i();
  });
}
lf.createBlockRefRewriteMiddleware = Z6;
var df = {}, Si = {}, Y6 = {
  get exports() {
    return Si;
  },
  set exports(e) {
    Si = e;
  }
};
(function(e) {
  var t = function() {
    function n(p, g) {
      return g != null && p instanceof g;
    }
    var i;
    try {
      i = Map;
    } catch {
      i = function() {
      };
    }
    var f;
    try {
      f = Set;
    } catch {
      f = function() {
      };
    }
    var r;
    try {
      r = Promise;
    } catch {
      r = function() {
      };
    }
    function o(p, g, w, S, T) {
      typeof g == "object" && (w = g.depth, S = g.prototype, T = g.includeNonEnumerable, g = g.circular);
      var I = [], C = [], N = typeof Buffer < "u";
      typeof g > "u" && (g = !0), typeof w > "u" && (w = 1 / 0);
      function $(D, H) {
        if (D === null)
          return null;
        if (H === 0)
          return D;
        var V, ne;
        if (typeof D != "object")
          return D;
        if (n(D, i))
          V = new i();
        else if (n(D, f))
          V = new f();
        else if (n(D, r))
          V = new r(function(x, A) {
            D.then(function(B) {
              x($(B, H - 1));
            }, function(B) {
              A($(B, H - 1));
            });
          });
        else if (o.__isArray(D))
          V = [];
        else if (o.__isRegExp(D))
          V = new RegExp(D.source, v(D)), D.lastIndex && (V.lastIndex = D.lastIndex);
        else if (o.__isDate(D))
          V = new Date(D.getTime());
        else {
          if (N && Buffer.isBuffer(D))
            return Buffer.allocUnsafe ? V = Buffer.allocUnsafe(D.length) : V = new Buffer(D.length), D.copy(V), V;
          n(D, Error) ? V = Object.create(D) : typeof S > "u" ? (ne = Object.getPrototypeOf(D), V = Object.create(ne)) : (V = Object.create(S), ne = S);
        }
        if (g) {
          var Q = I.indexOf(D);
          if (Q != -1)
            return C[Q];
          I.push(D), C.push(V);
        }
        n(D, i) && D.forEach(function(x, A) {
          var B = $(A, H - 1), _ = $(x, H - 1);
          V.set(B, _);
        }), n(D, f) && D.forEach(function(x) {
          var A = $(x, H - 1);
          V.add(A);
        });
        for (var se in D) {
          var k;
          ne && (k = Object.getOwnPropertyDescriptor(ne, se)), !(k && k.set == null) && (V[se] = $(D[se], H - 1));
        }
        if (Object.getOwnPropertySymbols)
          for (var m = Object.getOwnPropertySymbols(D), se = 0; se < m.length; se++) {
            var b = m[se], a = Object.getOwnPropertyDescriptor(D, b);
            a && !a.enumerable && !T || (V[b] = $(D[b], H - 1), a.enumerable || Object.defineProperty(V, b, {
              enumerable: !1
            }));
          }
        if (T)
          for (var h = Object.getOwnPropertyNames(D), se = 0; se < h.length; se++) {
            var y = h[se], a = Object.getOwnPropertyDescriptor(D, y);
            a && a.enumerable || (V[y] = $(D[y], H - 1), Object.defineProperty(V, y, {
              enumerable: !1
            }));
          }
        return V;
      }
      return $(p, w);
    }
    o.clonePrototype = function(g) {
      if (g === null)
        return null;
      var w = function() {
      };
      return w.prototype = g, new w();
    };
    function s(p) {
      return Object.prototype.toString.call(p);
    }
    o.__objToStr = s;
    function c(p) {
      return typeof p == "object" && s(p) === "[object Date]";
    }
    o.__isDate = c;
    function l(p) {
      return typeof p == "object" && s(p) === "[object Array]";
    }
    o.__isArray = l;
    function u(p) {
      return typeof p == "object" && s(p) === "[object RegExp]";
    }
    o.__isRegExp = u;
    function v(p) {
      var g = "";
      return p.global && (g += "g"), p.ignoreCase && (g += "i"), p.multiline && (g += "m"), g;
    }
    return o.__getRegExpFlags = v, o;
  }();
  e.exports && (e.exports = t);
})(Y6);
const U0 = (e, t) => function() {
  const n = t.promiseModule, i = new Array(arguments.length);
  for (let f = 0; f < arguments.length; f++)
    i[f] = arguments[f];
  return new n((f, r) => {
    t.errorFirst ? i.push(function(o, s) {
      if (t.multiArgs) {
        const c = new Array(arguments.length - 1);
        for (let l = 1; l < arguments.length; l++)
          c[l - 1] = arguments[l];
        o ? (c.unshift(o), r(c)) : f(c);
      } else
        o ? r(o) : f(s);
    }) : i.push(function(o) {
      if (t.multiArgs) {
        const s = new Array(arguments.length - 1);
        for (let c = 0; c < arguments.length; c++)
          s[c] = arguments[c];
        f(s);
      } else
        f(o);
    }), e.apply(this, i);
  });
};
var np = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const n = (f) => {
    const r = (o) => typeof o == "string" ? f === o : o.test(f);
    return t.include ? t.include.some(r) : !t.exclude.some(r);
  };
  let i;
  typeof e == "function" ? i = function() {
    return t.excludeMain ? e.apply(this, arguments) : U0(e, t).apply(this, arguments);
  } : i = Object.create(Object.getPrototypeOf(e));
  for (const f in e) {
    const r = e[f];
    i[f] = typeof r == "function" && n(f) ? U0(r, t) : r;
  }
  return i;
}, ip = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(df, "__esModule", { value: !0 });
df.createBlockRefMiddleware = void 0;
const Q6 = lr, e3 = ip(Si), t3 = ip(np), F0 = ti, r3 = Xt, io = F0.createModuleLogger(F0.projectLogger, "block-ref");
function n3({ provider: e, blockTracker: t } = {}) {
  if (!e)
    throw Error('BlockRefMiddleware - mandatory "provider" option is missing.');
  if (!t)
    throw Error('BlockRefMiddleware - mandatory "blockTracker" option is missing.');
  return Q6.createAsyncMiddleware(async (n, i, f) => {
    var r, o;
    const s = r3.blockTagParamIndex(n);
    if (s === void 0)
      return f();
    if (((o = (r = n.params) === null || r === void 0 ? void 0 : r[s]) !== null && o !== void 0 ? o : "latest") !== "latest")
      return io('blockRef is not "latest", carrying request forward'), f();
    const l = await t.getLatestBlock();
    io(`blockRef is "latest", setting param ${s} to latest block ${l}`);
    const u = e3.default(n);
    u.params && (u.params[s] = l), io("Performing another request %o", u);
    const v = await t3.default(e.sendAsync).call(e, u);
    i.result = v.result, i.error = v.error;
  });
}
df.createBlockRefMiddleware = n3;
var pf = {};
Object.defineProperty(pf, "__esModule", { value: !0 });
pf.createBlockTrackerInspectorMiddleware = void 0;
const i3 = lr, H0 = ti, z0 = H0.createModuleLogger(H0.projectLogger, "block-tracker-inspector"), a3 = [
  "eth_getTransactionByHash",
  "eth_getTransactionReceipt"
];
function f3({ blockTracker: e }) {
  return i3.createAsyncMiddleware(async (t, n, i) => {
    var f;
    if (!a3.includes(t.method))
      return i();
    if (await i(), !!(!((f = n.result) === null || f === void 0) && f.blockNumber) && (z0("res.result.blockNumber exists, proceeding. res = %o", n), typeof n.result.blockNumber == "string")) {
      const r = Number.parseInt(n.result.blockNumber, 16), o = Number.parseInt(e.getCurrentBlock(), 16);
      r > o && (z0("blockNumber from response is greater than current block number, refreshing current block number"), await e.checkForLatestBlock());
    }
  });
}
pf.createBlockTrackerInspectorMiddleware = f3;
var Jn = {};
const o3 = {}, s3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: o3
}, Symbol.toStringTag, { value: "Module" })), ap = /* @__PURE__ */ Xu(s3);
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.createFetchConfigFromReq = Jn.createFetchMiddleware = void 0;
const u3 = lr, Mi = Gt, c3 = Ne.fetch || ap, h3 = Ne.btoa || ap, l3 = [
  // ignore server overload errors
  "Gateway timeout",
  "ETIMEDOUT",
  // ignore server sent html error pages
  // or truncated json responses
  "failed to parse response body",
  // ignore errors where http req failed to establish
  "Failed to fetch"
];
function d3({ rpcUrl: e, originHttpHeaderKey: t }) {
  return u3.createAsyncMiddleware(async (n, i, f) => {
    const { fetchUrl: r, fetchParams: o } = fp({
      req: n,
      rpcUrl: e,
      originHttpHeaderKey: t
    }), s = 5, c = 1e3;
    for (let l = 0; l < s; l++) {
      try {
        const u = await c3(r, o);
        p3(u);
        const v = await u.text();
        let p;
        try {
          p = JSON.parse(v);
        } catch {
          throw new Error(`FetchMiddleware - failed to parse response body: "${v}"`);
        }
        const g = v3(u, p);
        i.result = g;
        return;
      } catch (u) {
        const v = u.toString();
        if (!l3.some((g) => v.includes(g)))
          throw u;
      }
      await m3(c);
    }
  });
}
Jn.createFetchMiddleware = d3;
function p3(e) {
  switch (e.status) {
    case 405:
      throw Mi.ethErrors.rpc.methodNotFound();
    case 418:
      throw y3();
    case 503:
    case 504:
      throw g3();
  }
}
function v3(e, t) {
  if (e.status !== 200)
    throw Mi.ethErrors.rpc.internal({
      message: `Non-200 status code: '${e.status}'`,
      data: t
    });
  if (t.error)
    throw Mi.ethErrors.rpc.internal({
      data: t.error
    });
  return t.result;
}
function fp({ req: e, rpcUrl: t, originHttpHeaderKey: n }) {
  const i = new URL(t), f = b3(i), r = {
    id: e.id,
    jsonrpc: e.jsonrpc,
    method: e.method,
    params: e.params
  }, o = e.origin, s = JSON.stringify(r), c = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: s
  };
  if (i.username && i.password) {
    const l = `${i.username}:${i.password}`, u = h3(l);
    c.headers.Authorization = `Basic ${u}`;
  }
  return n && o && (c.headers[n] = o), { fetchUrl: f, fetchParams: c };
}
Jn.createFetchConfigFromReq = fp;
function b3(e) {
  let t = "";
  return t += e.protocol, t += `//${e.hostname}`, e.port && (t += `:${e.port}`), t += `${e.pathname}`, t += `${e.search}`, t;
}
function y3() {
  return Mi.ethErrors.rpc.internal({ message: "Request is being rate limited." });
}
function g3() {
  let e = "Gateway timeout. The request took too long to process. ";
  return e += "This can happen when querying logs over too wide a block range.", Mi.ethErrors.rpc.internal({ message: e });
}
function m3(e) {
  return new Promise((t) => setTimeout(t, e));
}
var vf = {}, w3 = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(vf, "__esModule", { value: !0 });
vf.createInflightCacheMiddleware = void 0;
const V0 = w3(Si), _3 = lr, K0 = ti, x3 = Xt, na = K0.createModuleLogger(K0.projectLogger, "inflight-cache");
function E3() {
  const e = {};
  return _3.createAsyncMiddleware(async (i, f, r) => {
    if (i.skipCache)
      return r();
    const o = x3.cacheIdentifierForPayload(i);
    if (!o)
      return na("Request is not cacheable, proceeding. req = %o", i), r();
    let s = e[o];
    if (s) {
      na("Running %i handler(s) for request %o", s.length, i), await t(f, s);
      return;
    }
    s = [], e[o] = s, na("Carrying original request forward %o", i), await r(), delete e[o], na("Running %i collected handler(s) for request %o", s.length, i), n(f, s);
  });
  function t(i, f) {
    const { resolve: r, promise: o } = S3();
    return f.push((s) => {
      i.result = V0.default(s.result), i.error = V0.default(s.error), r();
    }), o;
  }
  function n(i, f) {
    setTimeout(() => {
      f.forEach((r) => {
        try {
          r(i);
        } catch (o) {
          console.error(o);
        }
      });
    });
  }
}
vf.createInflightCacheMiddleware = E3;
function S3() {
  let e;
  const t = new Promise((n) => {
    e = n;
  });
  return { resolve: e, promise: t };
}
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.ethersProviderAsMiddleware = Xn.providerAsMiddleware = void 0;
function M3(e) {
  return (t, n, i, f) => {
    e.sendAsync(t, (r, o) => r instanceof Error ? f(r) : (Object.assign(n, o), f()));
  };
}
Xn.providerAsMiddleware = M3;
function A3(e) {
  return (t, n, i, f) => {
    e.send(t, (r, o) => r ? f(r) : (Object.assign(n, o), f()));
  };
}
Xn.ethersProviderAsMiddleware = A3;
var Ui = {}, B3 = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ui, "__esModule", { value: !0 });
Ui.providerFromEngine = void 0;
const R3 = B3(Za);
function I3(e) {
  const t = new R3.default();
  return t.sendAsync = (n, i) => {
    e.handle(n, i);
  }, t.send = (n, i) => {
    if (typeof i != "function")
      throw new Error('Must provide callback to "send" method.');
    e.handle(n, i);
  }, e.on && e.on("notification", (n) => {
    t.emit("data", null, n);
  }), t;
}
Ui.providerFromEngine = I3;
var bf = {};
Object.defineProperty(bf, "__esModule", { value: !0 });
bf.providerFromMiddleware = void 0;
const T3 = lr, P3 = Ui;
function C3(e) {
  const t = new T3.JsonRpcEngine();
  return t.push(e), P3.providerFromEngine(t);
}
bf.providerFromMiddleware = C3;
var yf = {}, op = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(yf, "__esModule", { value: !0 });
yf.createRetryOnEmptyMiddleware = void 0;
const O3 = op(Si), N3 = lr, L3 = op(np), G0 = ti, $3 = Xt, mn = G0.createModuleLogger(G0.projectLogger, "retry-on-empty"), k3 = [
  void 0,
  null,
  "<nil>"
];
function j3({ provider: e, blockTracker: t } = {}) {
  if (!e)
    throw Error('RetryOnEmptyMiddleware - mandatory "provider" option is missing.');
  if (!t)
    throw Error('RetryOnEmptyMiddleware - mandatory "blockTracker" option is missing.');
  return N3.createAsyncMiddleware(async (n, i, f) => {
    var r;
    const o = $3.blockTagParamIndex(n);
    if (o === void 0)
      return f();
    let s = (r = n.params) === null || r === void 0 ? void 0 : r[o];
    if (s === void 0 && (s = "latest"), ["latest", "pending"].includes(s))
      return f();
    const c = Number.parseInt(s.slice(2), 16);
    if (Number.isNaN(c))
      return f();
    const l = await t.getLatestBlock(), u = Number.parseInt(l.slice(2), 16);
    if (c > u)
      return mn("Requested block number %o is higher than latest block number %o, falling through to original request", c, u), f();
    mn("Requested block number %o is not higher than latest block number %o, trying request until non-empty response is received", c, u);
    const v = O3.default(n), p = await D3(10, async () => {
      mn("Performing request %o", v);
      const g = await L3.default(e.sendAsync).call(e, v);
      if (mn("Response is %o", g), k3.includes(g.result))
        throw new Error(`RetryOnEmptyMiddleware - empty response "${JSON.stringify(g)}" for request "${JSON.stringify(v)}"`);
      return g;
    });
    mn("Copying result %o and error %o", p.result, p.error), i.result = p.result, i.error = p.error;
  });
}
yf.createRetryOnEmptyMiddleware = j3;
async function D3(e, t) {
  for (let n = 0; n < e; n++)
    try {
      return await t();
    } catch {
      mn("(call %i) Request failed, waiting 1s to retry again...", n + 1), await q3(1e3);
    }
  throw mn("Retries exhausted"), new Error("RetryOnEmptyMiddleware - retries exhausted");
}
function q3(e) {
  return new Promise((t) => setTimeout(t, e));
}
var gf = {}, sp = {}, an = {}, Fi = {}, mf = {}, Nr = {}, wf = {};
wf.byteLength = H3;
wf.toByteArray = V3;
wf.fromByteArray = W3;
var qr = [], mr = [], U3 = typeof Uint8Array < "u" ? Uint8Array : Array, ao = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Nn = 0, F3 = ao.length; Nn < F3; ++Nn)
  qr[Nn] = ao[Nn], mr[ao.charCodeAt(Nn)] = Nn;
mr["-".charCodeAt(0)] = 62;
mr["_".charCodeAt(0)] = 63;
function up(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var i = n === t ? 0 : 4 - n % 4;
  return [n, i];
}
function H3(e) {
  var t = up(e), n = t[0], i = t[1];
  return (n + i) * 3 / 4 - i;
}
function z3(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function V3(e) {
  var t, n = up(e), i = n[0], f = n[1], r = new U3(z3(e, i, f)), o = 0, s = f > 0 ? i - 4 : i, c;
  for (c = 0; c < s; c += 4)
    t = mr[e.charCodeAt(c)] << 18 | mr[e.charCodeAt(c + 1)] << 12 | mr[e.charCodeAt(c + 2)] << 6 | mr[e.charCodeAt(c + 3)], r[o++] = t >> 16 & 255, r[o++] = t >> 8 & 255, r[o++] = t & 255;
  return f === 2 && (t = mr[e.charCodeAt(c)] << 2 | mr[e.charCodeAt(c + 1)] >> 4, r[o++] = t & 255), f === 1 && (t = mr[e.charCodeAt(c)] << 10 | mr[e.charCodeAt(c + 1)] << 4 | mr[e.charCodeAt(c + 2)] >> 2, r[o++] = t >> 8 & 255, r[o++] = t & 255), r;
}
function K3(e) {
  return qr[e >> 18 & 63] + qr[e >> 12 & 63] + qr[e >> 6 & 63] + qr[e & 63];
}
function G3(e, t, n) {
  for (var i, f = [], r = t; r < n; r += 3)
    i = (e[r] << 16 & 16711680) + (e[r + 1] << 8 & 65280) + (e[r + 2] & 255), f.push(K3(i));
  return f.join("");
}
function W3(e) {
  for (var t, n = e.length, i = n % 3, f = [], r = 16383, o = 0, s = n - i; o < s; o += r)
    f.push(G3(e, o, o + r > s ? s : o + r));
  return i === 1 ? (t = e[n - 1], f.push(
    qr[t >> 2] + qr[t << 4 & 63] + "=="
  )) : i === 2 && (t = (e[n - 2] << 8) + e[n - 1], f.push(
    qr[t >> 10] + qr[t >> 4 & 63] + qr[t << 2 & 63] + "="
  )), f.join("");
}
var mc = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
mc.read = function(e, t, n, i, f) {
  var r, o, s = f * 8 - i - 1, c = (1 << s) - 1, l = c >> 1, u = -7, v = n ? f - 1 : 0, p = n ? -1 : 1, g = e[t + v];
  for (v += p, r = g & (1 << -u) - 1, g >>= -u, u += s; u > 0; r = r * 256 + e[t + v], v += p, u -= 8)
    ;
  for (o = r & (1 << -u) - 1, r >>= -u, u += i; u > 0; o = o * 256 + e[t + v], v += p, u -= 8)
    ;
  if (r === 0)
    r = 1 - l;
  else {
    if (r === c)
      return o ? NaN : (g ? -1 : 1) * (1 / 0);
    o = o + Math.pow(2, i), r = r - l;
  }
  return (g ? -1 : 1) * o * Math.pow(2, r - i);
};
mc.write = function(e, t, n, i, f, r) {
  var o, s, c, l = r * 8 - f - 1, u = (1 << l) - 1, v = u >> 1, p = f === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = i ? 0 : r - 1, w = i ? 1 : -1, S = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = u) : (o = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + v >= 1 ? t += p / c : t += p * Math.pow(2, 1 - v), t * c >= 2 && (o++, c /= 2), o + v >= u ? (s = 0, o = u) : o + v >= 1 ? (s = (t * c - 1) * Math.pow(2, f), o = o + v) : (s = t * Math.pow(2, v - 1) * Math.pow(2, f), o = 0)); f >= 8; e[n + g] = s & 255, g += w, s /= 256, f -= 8)
    ;
  for (o = o << f | s, l += f; l > 0; e[n + g] = o & 255, g += w, o /= 256, l -= 8)
    ;
  e[n + g - w] |= S * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  var t = wf, n = mc, i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = C, e.INSPECT_MAX_BYTES = 50;
  var f = 2147483647;
  e.kMaxLength = f, s.TYPED_ARRAY_SUPPORT = r(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function r() {
    try {
      var z = new Uint8Array(1), P = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(P, Uint8Array.prototype), Object.setPrototypeOf(z, P), z.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function o(z) {
    if (z > f)
      throw new RangeError('The value "' + z + '" is invalid for option "size"');
    var P = new Uint8Array(z);
    return Object.setPrototypeOf(P, s.prototype), P;
  }
  function s(z, P, L) {
    if (typeof z == "number") {
      if (typeof P == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return v(z);
    }
    return c(z, P, L);
  }
  s.poolSize = 8192;
  function c(z, P, L) {
    if (typeof z == "string")
      return p(z, P);
    if (ArrayBuffer.isView(z))
      return w(z);
    if (z == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof z
      );
    if (pe(z, ArrayBuffer) || z && pe(z.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (pe(z, SharedArrayBuffer) || z && pe(z.buffer, SharedArrayBuffer)))
      return S(z, P, L);
    if (typeof z == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var F = z.valueOf && z.valueOf();
    if (F != null && F !== z)
      return s.from(F, P, L);
    var fe = T(z);
    if (fe)
      return fe;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof z[Symbol.toPrimitive] == "function")
      return s.from(
        z[Symbol.toPrimitive]("string"),
        P,
        L
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof z
    );
  }
  s.from = function(z, P, L) {
    return c(z, P, L);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function l(z) {
    if (typeof z != "number")
      throw new TypeError('"size" argument must be of type number');
    if (z < 0)
      throw new RangeError('The value "' + z + '" is invalid for option "size"');
  }
  function u(z, P, L) {
    return l(z), z <= 0 ? o(z) : P !== void 0 ? typeof L == "string" ? o(z).fill(P, L) : o(z).fill(P) : o(z);
  }
  s.alloc = function(z, P, L) {
    return u(z, P, L);
  };
  function v(z) {
    return l(z), o(z < 0 ? 0 : I(z) | 0);
  }
  s.allocUnsafe = function(z) {
    return v(z);
  }, s.allocUnsafeSlow = function(z) {
    return v(z);
  };
  function p(z, P) {
    if ((typeof P != "string" || P === "") && (P = "utf8"), !s.isEncoding(P))
      throw new TypeError("Unknown encoding: " + P);
    var L = N(z, P) | 0, F = o(L), fe = F.write(z, P);
    return fe !== L && (F = F.slice(0, fe)), F;
  }
  function g(z) {
    for (var P = z.length < 0 ? 0 : I(z.length) | 0, L = o(P), F = 0; F < P; F += 1)
      L[F] = z[F] & 255;
    return L;
  }
  function w(z) {
    if (pe(z, Uint8Array)) {
      var P = new Uint8Array(z);
      return S(P.buffer, P.byteOffset, P.byteLength);
    }
    return g(z);
  }
  function S(z, P, L) {
    if (P < 0 || z.byteLength < P)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (z.byteLength < P + (L || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var F;
    return P === void 0 && L === void 0 ? F = new Uint8Array(z) : L === void 0 ? F = new Uint8Array(z, P) : F = new Uint8Array(z, P, L), Object.setPrototypeOf(F, s.prototype), F;
  }
  function T(z) {
    if (s.isBuffer(z)) {
      var P = I(z.length) | 0, L = o(P);
      return L.length === 0 || z.copy(L, 0, 0, P), L;
    }
    if (z.length !== void 0)
      return typeof z.length != "number" || me(z.length) ? o(0) : g(z);
    if (z.type === "Buffer" && Array.isArray(z.data))
      return g(z.data);
  }
  function I(z) {
    if (z >= f)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + f.toString(16) + " bytes");
    return z | 0;
  }
  function C(z) {
    return +z != z && (z = 0), s.alloc(+z);
  }
  s.isBuffer = function(P) {
    return P != null && P._isBuffer === !0 && P !== s.prototype;
  }, s.compare = function(P, L) {
    if (pe(P, Uint8Array) && (P = s.from(P, P.offset, P.byteLength)), pe(L, Uint8Array) && (L = s.from(L, L.offset, L.byteLength)), !s.isBuffer(P) || !s.isBuffer(L))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (P === L)
      return 0;
    for (var F = P.length, fe = L.length, ce = 0, we = Math.min(F, fe); ce < we; ++ce)
      if (P[ce] !== L[ce]) {
        F = P[ce], fe = L[ce];
        break;
      }
    return F < fe ? -1 : fe < F ? 1 : 0;
  }, s.isEncoding = function(P) {
    switch (String(P).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, s.concat = function(P, L) {
    if (!Array.isArray(P))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (P.length === 0)
      return s.alloc(0);
    var F;
    if (L === void 0)
      for (L = 0, F = 0; F < P.length; ++F)
        L += P[F].length;
    var fe = s.allocUnsafe(L), ce = 0;
    for (F = 0; F < P.length; ++F) {
      var we = P[F];
      if (pe(we, Uint8Array))
        ce + we.length > fe.length ? s.from(we).copy(fe, ce) : Uint8Array.prototype.set.call(
          fe,
          we,
          ce
        );
      else if (s.isBuffer(we))
        we.copy(fe, ce);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      ce += we.length;
    }
    return fe;
  };
  function N(z, P) {
    if (s.isBuffer(z))
      return z.length;
    if (ArrayBuffer.isView(z) || pe(z, ArrayBuffer))
      return z.byteLength;
    if (typeof z != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof z
      );
    var L = z.length, F = arguments.length > 2 && arguments[2] === !0;
    if (!F && L === 0)
      return 0;
    for (var fe = !1; ; )
      switch (P) {
        case "ascii":
        case "latin1":
        case "binary":
          return L;
        case "utf8":
        case "utf-8":
          return ue(z).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return L * 2;
        case "hex":
          return L >>> 1;
        case "base64":
          return W(z).length;
        default:
          if (fe)
            return F ? -1 : ue(z).length;
          P = ("" + P).toLowerCase(), fe = !0;
      }
  }
  s.byteLength = N;
  function $(z, P, L) {
    var F = !1;
    if ((P === void 0 || P < 0) && (P = 0), P > this.length || ((L === void 0 || L > this.length) && (L = this.length), L <= 0) || (L >>>= 0, P >>>= 0, L <= P))
      return "";
    for (z || (z = "utf8"); ; )
      switch (z) {
        case "hex":
          return B(this, P, L);
        case "utf8":
        case "utf-8":
          return a(this, P, L);
        case "ascii":
          return x(this, P, L);
        case "latin1":
        case "binary":
          return A(this, P, L);
        case "base64":
          return b(this, P, L);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return _(this, P, L);
        default:
          if (F)
            throw new TypeError("Unknown encoding: " + z);
          z = (z + "").toLowerCase(), F = !0;
      }
  }
  s.prototype._isBuffer = !0;
  function D(z, P, L) {
    var F = z[P];
    z[P] = z[L], z[L] = F;
  }
  s.prototype.swap16 = function() {
    var P = this.length;
    if (P % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var L = 0; L < P; L += 2)
      D(this, L, L + 1);
    return this;
  }, s.prototype.swap32 = function() {
    var P = this.length;
    if (P % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var L = 0; L < P; L += 4)
      D(this, L, L + 3), D(this, L + 1, L + 2);
    return this;
  }, s.prototype.swap64 = function() {
    var P = this.length;
    if (P % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var L = 0; L < P; L += 8)
      D(this, L, L + 7), D(this, L + 1, L + 6), D(this, L + 2, L + 5), D(this, L + 3, L + 4);
    return this;
  }, s.prototype.toString = function() {
    var P = this.length;
    return P === 0 ? "" : arguments.length === 0 ? a(this, 0, P) : $.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(P) {
    if (!s.isBuffer(P))
      throw new TypeError("Argument must be a Buffer");
    return this === P ? !0 : s.compare(this, P) === 0;
  }, s.prototype.inspect = function() {
    var P = "", L = e.INSPECT_MAX_BYTES;
    return P = this.toString("hex", 0, L).replace(/(.{2})/g, "$1 ").trim(), this.length > L && (P += " ... "), "<Buffer " + P + ">";
  }, i && (s.prototype[i] = s.prototype.inspect), s.prototype.compare = function(P, L, F, fe, ce) {
    if (pe(P, Uint8Array) && (P = s.from(P, P.offset, P.byteLength)), !s.isBuffer(P))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof P
      );
    if (L === void 0 && (L = 0), F === void 0 && (F = P ? P.length : 0), fe === void 0 && (fe = 0), ce === void 0 && (ce = this.length), L < 0 || F > P.length || fe < 0 || ce > this.length)
      throw new RangeError("out of range index");
    if (fe >= ce && L >= F)
      return 0;
    if (fe >= ce)
      return -1;
    if (L >= F)
      return 1;
    if (L >>>= 0, F >>>= 0, fe >>>= 0, ce >>>= 0, this === P)
      return 0;
    for (var we = ce - fe, Ce = F - L, Re = Math.min(we, Ce), We = this.slice(fe, ce), je = P.slice(L, F), Pe = 0; Pe < Re; ++Pe)
      if (We[Pe] !== je[Pe]) {
        we = We[Pe], Ce = je[Pe];
        break;
      }
    return we < Ce ? -1 : Ce < we ? 1 : 0;
  };
  function H(z, P, L, F, fe) {
    if (z.length === 0)
      return -1;
    if (typeof L == "string" ? (F = L, L = 0) : L > 2147483647 ? L = 2147483647 : L < -2147483648 && (L = -2147483648), L = +L, me(L) && (L = fe ? 0 : z.length - 1), L < 0 && (L = z.length + L), L >= z.length) {
      if (fe)
        return -1;
      L = z.length - 1;
    } else if (L < 0)
      if (fe)
        L = 0;
      else
        return -1;
    if (typeof P == "string" && (P = s.from(P, F)), s.isBuffer(P))
      return P.length === 0 ? -1 : V(z, P, L, F, fe);
    if (typeof P == "number")
      return P = P & 255, typeof Uint8Array.prototype.indexOf == "function" ? fe ? Uint8Array.prototype.indexOf.call(z, P, L) : Uint8Array.prototype.lastIndexOf.call(z, P, L) : V(z, [P], L, F, fe);
    throw new TypeError("val must be string, number or Buffer");
  }
  function V(z, P, L, F, fe) {
    var ce = 1, we = z.length, Ce = P.length;
    if (F !== void 0 && (F = String(F).toLowerCase(), F === "ucs2" || F === "ucs-2" || F === "utf16le" || F === "utf-16le")) {
      if (z.length < 2 || P.length < 2)
        return -1;
      ce = 2, we /= 2, Ce /= 2, L /= 2;
    }
    function Re(ft, Ke) {
      return ce === 1 ? ft[Ke] : ft.readUInt16BE(Ke * ce);
    }
    var We;
    if (fe) {
      var je = -1;
      for (We = L; We < we; We++)
        if (Re(z, We) === Re(P, je === -1 ? 0 : We - je)) {
          if (je === -1 && (je = We), We - je + 1 === Ce)
            return je * ce;
        } else
          je !== -1 && (We -= We - je), je = -1;
    } else
      for (L + Ce > we && (L = we - Ce), We = L; We >= 0; We--) {
        for (var Pe = !0, ct = 0; ct < Ce; ct++)
          if (Re(z, We + ct) !== Re(P, ct)) {
            Pe = !1;
            break;
          }
        if (Pe)
          return We;
      }
    return -1;
  }
  s.prototype.includes = function(P, L, F) {
    return this.indexOf(P, L, F) !== -1;
  }, s.prototype.indexOf = function(P, L, F) {
    return H(this, P, L, F, !0);
  }, s.prototype.lastIndexOf = function(P, L, F) {
    return H(this, P, L, F, !1);
  };
  function ne(z, P, L, F) {
    L = Number(L) || 0;
    var fe = z.length - L;
    F ? (F = Number(F), F > fe && (F = fe)) : F = fe;
    var ce = P.length;
    F > ce / 2 && (F = ce / 2);
    for (var we = 0; we < F; ++we) {
      var Ce = parseInt(P.substr(we * 2, 2), 16);
      if (me(Ce))
        return we;
      z[L + we] = Ce;
    }
    return we;
  }
  function Q(z, P, L, F) {
    return K(ue(P, z.length - L), z, L, F);
  }
  function se(z, P, L, F) {
    return K(le(P), z, L, F);
  }
  function k(z, P, L, F) {
    return K(W(P), z, L, F);
  }
  function m(z, P, L, F) {
    return K(Se(P, z.length - L), z, L, F);
  }
  s.prototype.write = function(P, L, F, fe) {
    if (L === void 0)
      fe = "utf8", F = this.length, L = 0;
    else if (F === void 0 && typeof L == "string")
      fe = L, F = this.length, L = 0;
    else if (isFinite(L))
      L = L >>> 0, isFinite(F) ? (F = F >>> 0, fe === void 0 && (fe = "utf8")) : (fe = F, F = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var ce = this.length - L;
    if ((F === void 0 || F > ce) && (F = ce), P.length > 0 && (F < 0 || L < 0) || L > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    fe || (fe = "utf8");
    for (var we = !1; ; )
      switch (fe) {
        case "hex":
          return ne(this, P, L, F);
        case "utf8":
        case "utf-8":
          return Q(this, P, L, F);
        case "ascii":
        case "latin1":
        case "binary":
          return se(this, P, L, F);
        case "base64":
          return k(this, P, L, F);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return m(this, P, L, F);
        default:
          if (we)
            throw new TypeError("Unknown encoding: " + fe);
          fe = ("" + fe).toLowerCase(), we = !0;
      }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function b(z, P, L) {
    return P === 0 && L === z.length ? t.fromByteArray(z) : t.fromByteArray(z.slice(P, L));
  }
  function a(z, P, L) {
    L = Math.min(z.length, L);
    for (var F = [], fe = P; fe < L; ) {
      var ce = z[fe], we = null, Ce = ce > 239 ? 4 : ce > 223 ? 3 : ce > 191 ? 2 : 1;
      if (fe + Ce <= L) {
        var Re, We, je, Pe;
        switch (Ce) {
          case 1:
            ce < 128 && (we = ce);
            break;
          case 2:
            Re = z[fe + 1], (Re & 192) === 128 && (Pe = (ce & 31) << 6 | Re & 63, Pe > 127 && (we = Pe));
            break;
          case 3:
            Re = z[fe + 1], We = z[fe + 2], (Re & 192) === 128 && (We & 192) === 128 && (Pe = (ce & 15) << 12 | (Re & 63) << 6 | We & 63, Pe > 2047 && (Pe < 55296 || Pe > 57343) && (we = Pe));
            break;
          case 4:
            Re = z[fe + 1], We = z[fe + 2], je = z[fe + 3], (Re & 192) === 128 && (We & 192) === 128 && (je & 192) === 128 && (Pe = (ce & 15) << 18 | (Re & 63) << 12 | (We & 63) << 6 | je & 63, Pe > 65535 && Pe < 1114112 && (we = Pe));
        }
      }
      we === null ? (we = 65533, Ce = 1) : we > 65535 && (we -= 65536, F.push(we >>> 10 & 1023 | 55296), we = 56320 | we & 1023), F.push(we), fe += Ce;
    }
    return y(F);
  }
  var h = 4096;
  function y(z) {
    var P = z.length;
    if (P <= h)
      return String.fromCharCode.apply(String, z);
    for (var L = "", F = 0; F < P; )
      L += String.fromCharCode.apply(
        String,
        z.slice(F, F += h)
      );
    return L;
  }
  function x(z, P, L) {
    var F = "";
    L = Math.min(z.length, L);
    for (var fe = P; fe < L; ++fe)
      F += String.fromCharCode(z[fe] & 127);
    return F;
  }
  function A(z, P, L) {
    var F = "";
    L = Math.min(z.length, L);
    for (var fe = P; fe < L; ++fe)
      F += String.fromCharCode(z[fe]);
    return F;
  }
  function B(z, P, L) {
    var F = z.length;
    (!P || P < 0) && (P = 0), (!L || L < 0 || L > F) && (L = F);
    for (var fe = "", ce = P; ce < L; ++ce)
      fe += Ie[z[ce]];
    return fe;
  }
  function _(z, P, L) {
    for (var F = z.slice(P, L), fe = "", ce = 0; ce < F.length - 1; ce += 2)
      fe += String.fromCharCode(F[ce] + F[ce + 1] * 256);
    return fe;
  }
  s.prototype.slice = function(P, L) {
    var F = this.length;
    P = ~~P, L = L === void 0 ? F : ~~L, P < 0 ? (P += F, P < 0 && (P = 0)) : P > F && (P = F), L < 0 ? (L += F, L < 0 && (L = 0)) : L > F && (L = F), L < P && (L = P);
    var fe = this.subarray(P, L);
    return Object.setPrototypeOf(fe, s.prototype), fe;
  };
  function E(z, P, L) {
    if (z % 1 !== 0 || z < 0)
      throw new RangeError("offset is not uint");
    if (z + P > L)
      throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(P, L, F) {
    P = P >>> 0, L = L >>> 0, F || E(P, L, this.length);
    for (var fe = this[P], ce = 1, we = 0; ++we < L && (ce *= 256); )
      fe += this[P + we] * ce;
    return fe;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(P, L, F) {
    P = P >>> 0, L = L >>> 0, F || E(P, L, this.length);
    for (var fe = this[P + --L], ce = 1; L > 0 && (ce *= 256); )
      fe += this[P + --L] * ce;
    return fe;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(P, L) {
    return P = P >>> 0, L || E(P, 1, this.length), this[P];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(P, L) {
    return P = P >>> 0, L || E(P, 2, this.length), this[P] | this[P + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(P, L) {
    return P = P >>> 0, L || E(P, 2, this.length), this[P] << 8 | this[P + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), (this[P] | this[P + 1] << 8 | this[P + 2] << 16) + this[P + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), this[P] * 16777216 + (this[P + 1] << 16 | this[P + 2] << 8 | this[P + 3]);
  }, s.prototype.readIntLE = function(P, L, F) {
    P = P >>> 0, L = L >>> 0, F || E(P, L, this.length);
    for (var fe = this[P], ce = 1, we = 0; ++we < L && (ce *= 256); )
      fe += this[P + we] * ce;
    return ce *= 128, fe >= ce && (fe -= Math.pow(2, 8 * L)), fe;
  }, s.prototype.readIntBE = function(P, L, F) {
    P = P >>> 0, L = L >>> 0, F || E(P, L, this.length);
    for (var fe = L, ce = 1, we = this[P + --fe]; fe > 0 && (ce *= 256); )
      we += this[P + --fe] * ce;
    return ce *= 128, we >= ce && (we -= Math.pow(2, 8 * L)), we;
  }, s.prototype.readInt8 = function(P, L) {
    return P = P >>> 0, L || E(P, 1, this.length), this[P] & 128 ? (255 - this[P] + 1) * -1 : this[P];
  }, s.prototype.readInt16LE = function(P, L) {
    P = P >>> 0, L || E(P, 2, this.length);
    var F = this[P] | this[P + 1] << 8;
    return F & 32768 ? F | 4294901760 : F;
  }, s.prototype.readInt16BE = function(P, L) {
    P = P >>> 0, L || E(P, 2, this.length);
    var F = this[P + 1] | this[P] << 8;
    return F & 32768 ? F | 4294901760 : F;
  }, s.prototype.readInt32LE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), this[P] | this[P + 1] << 8 | this[P + 2] << 16 | this[P + 3] << 24;
  }, s.prototype.readInt32BE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), this[P] << 24 | this[P + 1] << 16 | this[P + 2] << 8 | this[P + 3];
  }, s.prototype.readFloatLE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), n.read(this, P, !0, 23, 4);
  }, s.prototype.readFloatBE = function(P, L) {
    return P = P >>> 0, L || E(P, 4, this.length), n.read(this, P, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(P, L) {
    return P = P >>> 0, L || E(P, 8, this.length), n.read(this, P, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(P, L) {
    return P = P >>> 0, L || E(P, 8, this.length), n.read(this, P, !1, 52, 8);
  };
  function d(z, P, L, F, fe, ce) {
    if (!s.isBuffer(z))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (P > fe || P < ce)
      throw new RangeError('"value" argument is out of bounds');
    if (L + F > z.length)
      throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(P, L, F, fe) {
    if (P = +P, L = L >>> 0, F = F >>> 0, !fe) {
      var ce = Math.pow(2, 8 * F) - 1;
      d(this, P, L, F, ce, 0);
    }
    var we = 1, Ce = 0;
    for (this[L] = P & 255; ++Ce < F && (we *= 256); )
      this[L + Ce] = P / we & 255;
    return L + F;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(P, L, F, fe) {
    if (P = +P, L = L >>> 0, F = F >>> 0, !fe) {
      var ce = Math.pow(2, 8 * F) - 1;
      d(this, P, L, F, ce, 0);
    }
    var we = F - 1, Ce = 1;
    for (this[L + we] = P & 255; --we >= 0 && (Ce *= 256); )
      this[L + we] = P / Ce & 255;
    return L + F;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 1, 255, 0), this[L] = P & 255, L + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 2, 65535, 0), this[L] = P & 255, this[L + 1] = P >>> 8, L + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 2, 65535, 0), this[L] = P >>> 8, this[L + 1] = P & 255, L + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 4, 4294967295, 0), this[L + 3] = P >>> 24, this[L + 2] = P >>> 16, this[L + 1] = P >>> 8, this[L] = P & 255, L + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 4, 4294967295, 0), this[L] = P >>> 24, this[L + 1] = P >>> 16, this[L + 2] = P >>> 8, this[L + 3] = P & 255, L + 4;
  }, s.prototype.writeIntLE = function(P, L, F, fe) {
    if (P = +P, L = L >>> 0, !fe) {
      var ce = Math.pow(2, 8 * F - 1);
      d(this, P, L, F, ce - 1, -ce);
    }
    var we = 0, Ce = 1, Re = 0;
    for (this[L] = P & 255; ++we < F && (Ce *= 256); )
      P < 0 && Re === 0 && this[L + we - 1] !== 0 && (Re = 1), this[L + we] = (P / Ce >> 0) - Re & 255;
    return L + F;
  }, s.prototype.writeIntBE = function(P, L, F, fe) {
    if (P = +P, L = L >>> 0, !fe) {
      var ce = Math.pow(2, 8 * F - 1);
      d(this, P, L, F, ce - 1, -ce);
    }
    var we = F - 1, Ce = 1, Re = 0;
    for (this[L + we] = P & 255; --we >= 0 && (Ce *= 256); )
      P < 0 && Re === 0 && this[L + we + 1] !== 0 && (Re = 1), this[L + we] = (P / Ce >> 0) - Re & 255;
    return L + F;
  }, s.prototype.writeInt8 = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 1, 127, -128), P < 0 && (P = 255 + P + 1), this[L] = P & 255, L + 1;
  }, s.prototype.writeInt16LE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 2, 32767, -32768), this[L] = P & 255, this[L + 1] = P >>> 8, L + 2;
  }, s.prototype.writeInt16BE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 2, 32767, -32768), this[L] = P >>> 8, this[L + 1] = P & 255, L + 2;
  }, s.prototype.writeInt32LE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 4, 2147483647, -2147483648), this[L] = P & 255, this[L + 1] = P >>> 8, this[L + 2] = P >>> 16, this[L + 3] = P >>> 24, L + 4;
  }, s.prototype.writeInt32BE = function(P, L, F) {
    return P = +P, L = L >>> 0, F || d(this, P, L, 4, 2147483647, -2147483648), P < 0 && (P = 4294967295 + P + 1), this[L] = P >>> 24, this[L + 1] = P >>> 16, this[L + 2] = P >>> 8, this[L + 3] = P & 255, L + 4;
  };
  function M(z, P, L, F, fe, ce) {
    if (L + F > z.length)
      throw new RangeError("Index out of range");
    if (L < 0)
      throw new RangeError("Index out of range");
  }
  function Z(z, P, L, F, fe) {
    return P = +P, L = L >>> 0, fe || M(z, P, L, 4), n.write(z, P, L, F, 23, 4), L + 4;
  }
  s.prototype.writeFloatLE = function(P, L, F) {
    return Z(this, P, L, !0, F);
  }, s.prototype.writeFloatBE = function(P, L, F) {
    return Z(this, P, L, !1, F);
  };
  function re(z, P, L, F, fe) {
    return P = +P, L = L >>> 0, fe || M(z, P, L, 8), n.write(z, P, L, F, 52, 8), L + 8;
  }
  s.prototype.writeDoubleLE = function(P, L, F) {
    return re(this, P, L, !0, F);
  }, s.prototype.writeDoubleBE = function(P, L, F) {
    return re(this, P, L, !1, F);
  }, s.prototype.copy = function(P, L, F, fe) {
    if (!s.isBuffer(P))
      throw new TypeError("argument should be a Buffer");
    if (F || (F = 0), !fe && fe !== 0 && (fe = this.length), L >= P.length && (L = P.length), L || (L = 0), fe > 0 && fe < F && (fe = F), fe === F || P.length === 0 || this.length === 0)
      return 0;
    if (L < 0)
      throw new RangeError("targetStart out of bounds");
    if (F < 0 || F >= this.length)
      throw new RangeError("Index out of range");
    if (fe < 0)
      throw new RangeError("sourceEnd out of bounds");
    fe > this.length && (fe = this.length), P.length - L < fe - F && (fe = P.length - L + F);
    var ce = fe - F;
    return this === P && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(L, F, fe) : Uint8Array.prototype.set.call(
      P,
      this.subarray(F, fe),
      L
    ), ce;
  }, s.prototype.fill = function(P, L, F, fe) {
    if (typeof P == "string") {
      if (typeof L == "string" ? (fe = L, L = 0, F = this.length) : typeof F == "string" && (fe = F, F = this.length), fe !== void 0 && typeof fe != "string")
        throw new TypeError("encoding must be a string");
      if (typeof fe == "string" && !s.isEncoding(fe))
        throw new TypeError("Unknown encoding: " + fe);
      if (P.length === 1) {
        var ce = P.charCodeAt(0);
        (fe === "utf8" && ce < 128 || fe === "latin1") && (P = ce);
      }
    } else
      typeof P == "number" ? P = P & 255 : typeof P == "boolean" && (P = Number(P));
    if (L < 0 || this.length < L || this.length < F)
      throw new RangeError("Out of range index");
    if (F <= L)
      return this;
    L = L >>> 0, F = F === void 0 ? this.length : F >>> 0, P || (P = 0);
    var we;
    if (typeof P == "number")
      for (we = L; we < F; ++we)
        this[we] = P;
    else {
      var Ce = s.isBuffer(P) ? P : s.from(P, fe), Re = Ce.length;
      if (Re === 0)
        throw new TypeError('The value "' + P + '" is invalid for argument "value"');
      for (we = 0; we < F - L; ++we)
        this[we + L] = Ce[we % Re];
    }
    return this;
  };
  var J = /[^+/0-9A-Za-z-_]/g;
  function ee(z) {
    if (z = z.split("=")[0], z = z.trim().replace(J, ""), z.length < 2)
      return "";
    for (; z.length % 4 !== 0; )
      z = z + "=";
    return z;
  }
  function ue(z, P) {
    P = P || 1 / 0;
    for (var L, F = z.length, fe = null, ce = [], we = 0; we < F; ++we) {
      if (L = z.charCodeAt(we), L > 55295 && L < 57344) {
        if (!fe) {
          if (L > 56319) {
            (P -= 3) > -1 && ce.push(239, 191, 189);
            continue;
          } else if (we + 1 === F) {
            (P -= 3) > -1 && ce.push(239, 191, 189);
            continue;
          }
          fe = L;
          continue;
        }
        if (L < 56320) {
          (P -= 3) > -1 && ce.push(239, 191, 189), fe = L;
          continue;
        }
        L = (fe - 55296 << 10 | L - 56320) + 65536;
      } else
        fe && (P -= 3) > -1 && ce.push(239, 191, 189);
      if (fe = null, L < 128) {
        if ((P -= 1) < 0)
          break;
        ce.push(L);
      } else if (L < 2048) {
        if ((P -= 2) < 0)
          break;
        ce.push(
          L >> 6 | 192,
          L & 63 | 128
        );
      } else if (L < 65536) {
        if ((P -= 3) < 0)
          break;
        ce.push(
          L >> 12 | 224,
          L >> 6 & 63 | 128,
          L & 63 | 128
        );
      } else if (L < 1114112) {
        if ((P -= 4) < 0)
          break;
        ce.push(
          L >> 18 | 240,
          L >> 12 & 63 | 128,
          L >> 6 & 63 | 128,
          L & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return ce;
  }
  function le(z) {
    for (var P = [], L = 0; L < z.length; ++L)
      P.push(z.charCodeAt(L) & 255);
    return P;
  }
  function Se(z, P) {
    for (var L, F, fe, ce = [], we = 0; we < z.length && !((P -= 2) < 0); ++we)
      L = z.charCodeAt(we), F = L >> 8, fe = L % 256, ce.push(fe), ce.push(F);
    return ce;
  }
  function W(z) {
    return t.toByteArray(ee(z));
  }
  function K(z, P, L, F) {
    for (var fe = 0; fe < F && !(fe + L >= P.length || fe >= z.length); ++fe)
      P[fe + L] = z[fe];
    return fe;
  }
  function pe(z, P) {
    return z instanceof P || z != null && z.constructor != null && z.constructor.name != null && z.constructor.name === P.name;
  }
  function me(z) {
    return z !== z;
  }
  var Ie = function() {
    for (var z = "0123456789abcdef", P = new Array(256), L = 0; L < 16; ++L)
      for (var F = L * 16, fe = 0; fe < 16; ++fe)
        P[F + fe] = z[L] + z[fe];
    return P;
  }();
})(Nr);
var _f = {}, cp = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.output = Zt.exists = Zt.hash = Zt.bytes = Zt.bool = Zt.number = void 0;
function wa(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
Zt.number = wa;
function hp(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
Zt.bool = hp;
function wc(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
Zt.bytes = wc;
function lp(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  wa(e.outputLen), wa(e.blockLen);
}
Zt.hash = lp;
function dp(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
Zt.exists = dp;
function pp(e, t) {
  wc(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
Zt.output = pp;
const J3 = {
  number: wa,
  bool: hp,
  bytes: wc,
  hash: lp,
  exists: dp,
  output: pp
};
Zt.default = J3;
var An = {}, xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
xf.crypto = void 0;
xf.crypto = {
  node: void 0,
  web: typeof self == "object" && "crypto" in self ? self.crypto : void 0
};
(function(e) {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(e, "__esModule", { value: !0 }), e.randomBytes = e.wrapConstructorWithOpts = e.wrapConstructor = e.checkOpts = e.Hash = e.concatBytes = e.toBytes = e.utf8ToBytes = e.asyncLoop = e.nextTick = e.hexToBytes = e.bytesToHex = e.isLE = e.rotr = e.createView = e.u32 = e.u8 = void 0;
  const t = xf, n = ($) => new Uint8Array($.buffer, $.byteOffset, $.byteLength);
  e.u8 = n;
  const i = ($) => new Uint32Array($.buffer, $.byteOffset, Math.floor($.byteLength / 4));
  e.u32 = i;
  const f = ($) => new DataView($.buffer, $.byteOffset, $.byteLength);
  e.createView = f;
  const r = ($, D) => $ << 32 - D | $ >>> D;
  if (e.rotr = r, e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, !e.isLE)
    throw new Error("Non little-endian hardware is not supported");
  const o = Array.from({ length: 256 }, ($, D) => D.toString(16).padStart(2, "0"));
  function s($) {
    if (!($ instanceof Uint8Array))
      throw new Error("Uint8Array expected");
    let D = "";
    for (let H = 0; H < $.length; H++)
      D += o[$[H]];
    return D;
  }
  e.bytesToHex = s;
  function c($) {
    if (typeof $ != "string")
      throw new TypeError("hexToBytes: expected string, got " + typeof $);
    if ($.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex");
    const D = new Uint8Array($.length / 2);
    for (let H = 0; H < D.length; H++) {
      const V = H * 2, ne = $.slice(V, V + 2), Q = Number.parseInt(ne, 16);
      if (Number.isNaN(Q) || Q < 0)
        throw new Error("Invalid byte sequence");
      D[H] = Q;
    }
    return D;
  }
  e.hexToBytes = c;
  const l = async () => {
  };
  e.nextTick = l;
  async function u($, D, H) {
    let V = Date.now();
    for (let ne = 0; ne < $; ne++) {
      H(ne);
      const Q = Date.now() - V;
      Q >= 0 && Q < D || (await (0, e.nextTick)(), V += Q);
    }
  }
  e.asyncLoop = u;
  function v($) {
    if (typeof $ != "string")
      throw new TypeError(`utf8ToBytes expected string, got ${typeof $}`);
    return new TextEncoder().encode($);
  }
  e.utf8ToBytes = v;
  function p($) {
    if (typeof $ == "string" && ($ = v($)), !($ instanceof Uint8Array))
      throw new TypeError(`Expected input type is Uint8Array (got ${typeof $})`);
    return $;
  }
  e.toBytes = p;
  function g(...$) {
    if (!$.every((V) => V instanceof Uint8Array))
      throw new Error("Uint8Array list expected");
    if ($.length === 1)
      return $[0];
    const D = $.reduce((V, ne) => V + ne.length, 0), H = new Uint8Array(D);
    for (let V = 0, ne = 0; V < $.length; V++) {
      const Q = $[V];
      H.set(Q, ne), ne += Q.length;
    }
    return H;
  }
  e.concatBytes = g;
  class w {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  }
  e.Hash = w;
  const S = ($) => Object.prototype.toString.call($) === "[object Object]" && $.constructor === Object;
  function T($, D) {
    if (D !== void 0 && (typeof D != "object" || !S(D)))
      throw new TypeError("Options should be object or undefined");
    return Object.assign($, D);
  }
  e.checkOpts = T;
  function I($) {
    const D = (V) => $().update(p(V)).digest(), H = $();
    return D.outputLen = H.outputLen, D.blockLen = H.blockLen, D.create = () => $(), D;
  }
  e.wrapConstructor = I;
  function C($) {
    const D = (V, ne) => $(ne).update(p(V)).digest(), H = $({});
    return D.outputLen = H.outputLen, D.blockLen = H.blockLen, D.create = (V) => $(V), D;
  }
  e.wrapConstructorWithOpts = C;
  function N($ = 32) {
    if (t.crypto.web)
      return t.crypto.web.getRandomValues(new Uint8Array($));
    if (t.crypto.node)
      return new Uint8Array(t.crypto.node.randomBytes($).buffer);
    throw new Error("The environment doesn't have randomBytes function");
  }
  e.randomBytes = N;
})(An);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hmac = void 0;
  const t = Zt, n = An;
  class i extends n.Hash {
    constructor(o, s) {
      super(), this.finished = !1, this.destroyed = !1, t.default.hash(o);
      const c = (0, n.toBytes)(s);
      if (this.iHash = o.create(), typeof this.iHash.update != "function")
        throw new TypeError("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
      const l = this.blockLen, u = new Uint8Array(l);
      u.set(c.length > l ? o.create().update(c).digest() : c);
      for (let v = 0; v < u.length; v++)
        u[v] ^= 54;
      this.iHash.update(u), this.oHash = o.create();
      for (let v = 0; v < u.length; v++)
        u[v] ^= 106;
      this.oHash.update(u), u.fill(0);
    }
    update(o) {
      return t.default.exists(this), this.iHash.update(o), this;
    }
    digestInto(o) {
      t.default.exists(this), t.default.bytes(o, this.outputLen), this.finished = !0, this.iHash.digestInto(o), this.oHash.update(o), this.oHash.digestInto(o), this.destroy();
    }
    digest() {
      const o = new Uint8Array(this.oHash.outputLen);
      return this.digestInto(o), o;
    }
    _cloneInto(o) {
      o || (o = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash: s, iHash: c, finished: l, destroyed: u, blockLen: v, outputLen: p } = this;
      return o = o, o.finished = l, o.destroyed = u, o.blockLen = v, o.outputLen = p, o.oHash = s._cloneInto(o.oHash), o.iHash = c._cloneInto(o.iHash), o;
    }
    destroy() {
      this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
    }
  }
  const f = (r, o, s) => new i(r, o).update(s).digest();
  e.hmac = f, e.hmac.create = (r, o) => new i(r, o);
})(cp);
var Zn = {}, Ef = {};
Object.defineProperty(Ef, "__esModule", { value: !0 });
Ef.SHA2 = void 0;
const fo = Zt, li = An;
function X3(e, t, n, i) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, i);
  const f = BigInt(32), r = BigInt(4294967295), o = Number(n >> f & r), s = Number(n & r), c = i ? 4 : 0, l = i ? 0 : 4;
  e.setUint32(t + c, o, i), e.setUint32(t + l, s, i);
}
class Z3 extends li.Hash {
  constructor(t, n, i, f) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = i, this.isLE = f, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = (0, li.createView)(this.buffer);
  }
  update(t) {
    fo.default.exists(this);
    const { view: n, buffer: i, blockLen: f } = this;
    t = (0, li.toBytes)(t);
    const r = t.length;
    for (let o = 0; o < r; ) {
      const s = Math.min(f - this.pos, r - o);
      if (s === f) {
        const c = (0, li.createView)(t);
        for (; f <= r - o; o += f)
          this.process(c, o);
        continue;
      }
      i.set(t.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === f && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    fo.default.exists(this), fo.default.output(t, this), this.finished = !0;
    const { buffer: n, view: i, blockLen: f, isLE: r } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > f - o && (this.process(i, 0), o = 0);
    for (let v = o; v < f; v++)
      n[v] = 0;
    X3(i, f - 8, BigInt(this.length * 8), r), this.process(i, 0);
    const s = (0, li.createView)(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let v = 0; v < l; v++)
      s.setUint32(4 * v, u[v], r);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const i = t.slice(0, n);
    return this.destroy(), i;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: i, length: f, finished: r, destroyed: o, pos: s } = this;
    return t.length = f, t.pos = s, t.finished = r, t.destroyed = o, f % n && t.buffer.set(i), t;
  }
}
Ef.SHA2 = Z3;
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.sha224 = Zn.sha256 = void 0;
const Y3 = Ef, gr = An, Q3 = (e, t, n) => e & t ^ ~e & n, e4 = (e, t, n) => e & t ^ e & n ^ t & n, t4 = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), en = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), tn = new Uint32Array(64);
class vp extends Y3.SHA2 {
  constructor() {
    super(64, 32, 8, !1), this.A = en[0] | 0, this.B = en[1] | 0, this.C = en[2] | 0, this.D = en[3] | 0, this.E = en[4] | 0, this.F = en[5] | 0, this.G = en[6] | 0, this.H = en[7] | 0;
  }
  get() {
    const { A: t, B: n, C: i, D: f, E: r, F: o, G: s, H: c } = this;
    return [t, n, i, f, r, o, s, c];
  }
  // prettier-ignore
  set(t, n, i, f, r, o, s, c) {
    this.A = t | 0, this.B = n | 0, this.C = i | 0, this.D = f | 0, this.E = r | 0, this.F = o | 0, this.G = s | 0, this.H = c | 0;
  }
  process(t, n) {
    for (let v = 0; v < 16; v++, n += 4)
      tn[v] = t.getUint32(n, !1);
    for (let v = 16; v < 64; v++) {
      const p = tn[v - 15], g = tn[v - 2], w = (0, gr.rotr)(p, 7) ^ (0, gr.rotr)(p, 18) ^ p >>> 3, S = (0, gr.rotr)(g, 17) ^ (0, gr.rotr)(g, 19) ^ g >>> 10;
      tn[v] = S + tn[v - 7] + w + tn[v - 16] | 0;
    }
    let { A: i, B: f, C: r, D: o, E: s, F: c, G: l, H: u } = this;
    for (let v = 0; v < 64; v++) {
      const p = (0, gr.rotr)(s, 6) ^ (0, gr.rotr)(s, 11) ^ (0, gr.rotr)(s, 25), g = u + p + Q3(s, c, l) + t4[v] + tn[v] | 0, S = ((0, gr.rotr)(i, 2) ^ (0, gr.rotr)(i, 13) ^ (0, gr.rotr)(i, 22)) + e4(i, f, r) | 0;
      u = l, l = c, c = s, s = o + g | 0, o = r, r = f, f = i, i = g + S | 0;
    }
    i = i + this.A | 0, f = f + this.B | 0, r = r + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(i, f, r, o, s, c, l, u);
  }
  roundClean() {
    tn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class r4 extends vp {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
Zn.sha256 = (0, gr.wrapConstructor)(() => new vp());
Zn.sha224 = (0, gr.wrapConstructor)(() => new r4());
var qu = {}, pt = {}, _a = {}, W0 = {
  get exports() {
    return _a;
  },
  set exports(e) {
    _a = e;
  }
}, yi = {}, n4 = {
  get exports() {
    return yi;
  },
  set exports(e) {
    yi = e;
  }
};
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var J0;
function gt() {
  return J0 || (J0 = 1, function(e, t) {
    var n = Nr, i = n.Buffer;
    function f(o, s) {
      for (var c in o)
        s[c] = o[c];
    }
    i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e.exports = n : (f(n, t), t.Buffer = r);
    function r(o, s, c) {
      return i(o, s, c);
    }
    r.prototype = Object.create(i.prototype), f(i, r), r.from = function(o, s, c) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return i(o, s, c);
    }, r.alloc = function(o, s, c) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var l = i(o);
      return s !== void 0 ? typeof c == "string" ? l.fill(s, c) : l.fill(s) : l.fill(0), l;
    }, r.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return i(o);
    }, r.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n.SlowBuffer(o);
    };
  }(n4, yi)), yi;
}
var X0;
function ai() {
  if (X0)
    return _a;
  X0 = 1;
  var e = 65536, t = 4294967295;
  function n() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var i = gt().Buffer, f = Ne.crypto || Ne.msCrypto;
  f && f.getRandomValues ? W0.exports = r : W0.exports = n;
  function r(o, s) {
    if (o > t)
      throw new RangeError("requested too many random bytes");
    var c = i.allocUnsafe(o);
    if (o > 0)
      if (o > e)
        for (var l = 0; l < o; l += e)
          f.getRandomValues(c.slice(l, l + e));
      else
        f.getRandomValues(c);
    return typeof s == "function" ? process.nextTick(function() {
      s(null, c);
    }) : c;
  }
  return _a;
}
var xa = {}, Z0 = {
  get exports() {
    return xa;
  },
  set exports(e) {
    xa = e;
  }
}, Y0;
function bt() {
  return Y0 || (Y0 = 1, typeof Object.create == "function" ? Z0.exports = function(t, n) {
    n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : Z0.exports = function(t, n) {
    if (n) {
      t.super_ = n;
      var i = function() {
      };
      i.prototype = n.prototype, t.prototype = new i(), t.prototype.constructor = t;
    }
  }), xa;
}
var gi = {}, i4 = {
  get exports() {
    return gi;
  },
  set exports(e) {
    gi = e;
  }
}, oo, Q0;
function bp() {
  return Q0 || (Q0 = 1, oo = Zr.EventEmitter), oo;
}
var so = {}, uo = {}, co, eh;
function yp() {
  return eh || (eh = 1, co = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, n = Symbol("test"), i = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]")
      return !1;
    var f = 42;
    t[n] = f;
    for (n in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var r = Object.getOwnPropertySymbols(t);
    if (r.length !== 1 || r[0] !== n || !Object.prototype.propertyIsEnumerable.call(t, n))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(t, n);
      if (o.value !== f || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), co;
}
var ho, th;
function Sf() {
  if (th)
    return ho;
  th = 1;
  var e = yp();
  return ho = function() {
    return e() && !!Symbol.toStringTag;
  }, ho;
}
var lo, rh;
function a4() {
  if (rh)
    return lo;
  rh = 1;
  var e = typeof Symbol < "u" && Symbol, t = yp();
  return lo = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, lo;
}
var po, nh;
function f4() {
  if (nh)
    return po;
  nh = 1;
  var e = "Function.prototype.bind called on incompatible ", t = Array.prototype.slice, n = Object.prototype.toString, i = "[object Function]";
  return po = function(r) {
    var o = this;
    if (typeof o != "function" || n.call(o) !== i)
      throw new TypeError(e + o);
    for (var s = t.call(arguments, 1), c, l = function() {
      if (this instanceof c) {
        var w = o.apply(
          this,
          s.concat(t.call(arguments))
        );
        return Object(w) === w ? w : this;
      } else
        return o.apply(
          r,
          s.concat(t.call(arguments))
        );
    }, u = Math.max(0, o.length - s.length), v = [], p = 0; p < u; p++)
      v.push("$" + p);
    if (c = Function("binder", "return function (" + v.join(",") + "){ return binder.apply(this,arguments); }")(l), o.prototype) {
      var g = function() {
      };
      g.prototype = o.prototype, c.prototype = new g(), g.prototype = null;
    }
    return c;
  }, po;
}
var vo, ih;
function _c() {
  if (ih)
    return vo;
  ih = 1;
  var e = f4();
  return vo = Function.prototype.bind || e, vo;
}
var bo, ah;
function o4() {
  if (ah)
    return bo;
  ah = 1;
  var e = _c();
  return bo = e.call(Function.call, Object.prototype.hasOwnProperty), bo;
}
var yo, fh;
function xc() {
  if (fh)
    return yo;
  fh = 1;
  var e, t = SyntaxError, n = Function, i = TypeError, f = function(k) {
    try {
      return n('"use strict"; return (' + k + ").constructor;")();
    } catch {
    }
  }, r = Object.getOwnPropertyDescriptor;
  if (r)
    try {
      r({}, "");
    } catch {
      r = null;
    }
  var o = function() {
    throw new i();
  }, s = r ? function() {
    try {
      return arguments.callee, o;
    } catch {
      try {
        return r(arguments, "callee").get;
      } catch {
        return o;
      }
    }
  }() : o, c = a4()(), l = Object.getPrototypeOf || function(k) {
    return k.__proto__;
  }, u = {}, v = typeof Uint8Array > "u" ? e : l(Uint8Array), p = {
    "%AggregateError%": typeof AggregateError > "u" ? e : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e : ArrayBuffer,
    "%ArrayIteratorPrototype%": c ? l([][Symbol.iterator]()) : e,
    "%AsyncFromSyncIteratorPrototype%": e,
    "%AsyncFunction%": u,
    "%AsyncGenerator%": u,
    "%AsyncGeneratorFunction%": u,
    "%AsyncIteratorPrototype%": u,
    "%Atomics%": typeof Atomics > "u" ? e : Atomics,
    "%BigInt%": typeof BigInt > "u" ? e : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? e : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? e : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? e : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array > "u" ? e : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? e : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e : FinalizationRegistry,
    "%Function%": n,
    "%GeneratorFunction%": u,
    "%Int8Array%": typeof Int8Array > "u" ? e : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? e : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? e : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": c ? l(l([][Symbol.iterator]())) : e,
    "%JSON%": typeof JSON == "object" ? JSON : e,
    "%Map%": typeof Map > "u" ? e : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !c ? e : l((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? e : Promise,
    "%Proxy%": typeof Proxy > "u" ? e : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect > "u" ? e : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? e : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !c ? e : l((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": c ? l(""[Symbol.iterator]()) : e,
    "%Symbol%": c ? Symbol : e,
    "%SyntaxError%": t,
    "%ThrowTypeError%": s,
    "%TypedArray%": v,
    "%TypeError%": i,
    "%Uint8Array%": typeof Uint8Array > "u" ? e : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? e : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? e : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap > "u" ? e : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? e : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? e : WeakSet
  };
  try {
    null.error;
  } catch (k) {
    var g = l(l(k));
    p["%Error.prototype%"] = g;
  }
  var w = function k(m) {
    var b;
    if (m === "%AsyncFunction%")
      b = f("async function () {}");
    else if (m === "%GeneratorFunction%")
      b = f("function* () {}");
    else if (m === "%AsyncGeneratorFunction%")
      b = f("async function* () {}");
    else if (m === "%AsyncGenerator%") {
      var a = k("%AsyncGeneratorFunction%");
      a && (b = a.prototype);
    } else if (m === "%AsyncIteratorPrototype%") {
      var h = k("%AsyncGenerator%");
      h && (b = l(h.prototype));
    }
    return p[m] = b, b;
  }, S = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, T = _c(), I = o4(), C = T.call(Function.call, Array.prototype.concat), N = T.call(Function.apply, Array.prototype.splice), $ = T.call(Function.call, String.prototype.replace), D = T.call(Function.call, String.prototype.slice), H = T.call(Function.call, RegExp.prototype.exec), V = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ne = /\\(\\)?/g, Q = function(m) {
    var b = D(m, 0, 1), a = D(m, -1);
    if (b === "%" && a !== "%")
      throw new t("invalid intrinsic syntax, expected closing `%`");
    if (a === "%" && b !== "%")
      throw new t("invalid intrinsic syntax, expected opening `%`");
    var h = [];
    return $(m, V, function(y, x, A, B) {
      h[h.length] = A ? $(B, ne, "$1") : x || y;
    }), h;
  }, se = function(m, b) {
    var a = m, h;
    if (I(S, a) && (h = S[a], a = "%" + h[0] + "%"), I(p, a)) {
      var y = p[a];
      if (y === u && (y = w(a)), typeof y > "u" && !b)
        throw new i("intrinsic " + m + " exists, but is not available. Please file an issue!");
      return {
        alias: h,
        name: a,
        value: y
      };
    }
    throw new t("intrinsic " + m + " does not exist!");
  };
  return yo = function(m, b) {
    if (typeof m != "string" || m.length === 0)
      throw new i("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof b != "boolean")
      throw new i('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, m) === null)
      throw new t("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var a = Q(m), h = a.length > 0 ? a[0] : "", y = se("%" + h + "%", b), x = y.name, A = y.value, B = !1, _ = y.alias;
    _ && (h = _[0], N(a, C([0, 1], _)));
    for (var E = 1, d = !0; E < a.length; E += 1) {
      var M = a[E], Z = D(M, 0, 1), re = D(M, -1);
      if ((Z === '"' || Z === "'" || Z === "`" || re === '"' || re === "'" || re === "`") && Z !== re)
        throw new t("property names with quotes must have matching quotes");
      if ((M === "constructor" || !d) && (B = !0), h += "." + M, x = "%" + h + "%", I(p, x))
        A = p[x];
      else if (A != null) {
        if (!(M in A)) {
          if (!b)
            throw new i("base intrinsic for " + m + " exists, but the property is not available.");
          return;
        }
        if (r && E + 1 >= a.length) {
          var J = r(A, M);
          d = !!J, d && "get" in J && !("originalValue" in J.get) ? A = J.get : A = A[M];
        } else
          d = I(A, M), A = A[M];
        d && !B && (p[x] = A);
      }
    }
    return A;
  }, yo;
}
var Ea = {}, s4 = {
  get exports() {
    return Ea;
  },
  set exports(e) {
    Ea = e;
  }
}, oh;
function u4() {
  return oh || (oh = 1, function(e) {
    var t = _c(), n = xc(), i = n("%Function.prototype.apply%"), f = n("%Function.prototype.call%"), r = n("%Reflect.apply%", !0) || t.call(f, i), o = n("%Object.getOwnPropertyDescriptor%", !0), s = n("%Object.defineProperty%", !0), c = n("%Math.max%");
    if (s)
      try {
        s({}, "a", { value: 1 });
      } catch {
        s = null;
      }
    e.exports = function(v) {
      var p = r(t, f, arguments);
      if (o && s) {
        var g = o(p, "length");
        g.configurable && s(
          p,
          "length",
          { value: 1 + c(0, v.length - (arguments.length - 1)) }
        );
      }
      return p;
    };
    var l = function() {
      return r(t, i, arguments);
    };
    s ? s(e.exports, "apply", { value: l }) : e.exports.apply = l;
  }(s4)), Ea;
}
var go, sh;
function Ec() {
  if (sh)
    return go;
  sh = 1;
  var e = xc(), t = u4(), n = t(e("String.prototype.indexOf"));
  return go = function(f, r) {
    var o = e(f, !!r);
    return typeof o == "function" && n(f, ".prototype.") > -1 ? t(o) : o;
  }, go;
}
var mo, uh;
function c4() {
  if (uh)
    return mo;
  uh = 1;
  var e = Sf()(), t = Ec(), n = t("Object.prototype.toString"), i = function(s) {
    return e && s && typeof s == "object" && Symbol.toStringTag in s ? !1 : n(s) === "[object Arguments]";
  }, f = function(s) {
    return i(s) ? !0 : s !== null && typeof s == "object" && typeof s.length == "number" && s.length >= 0 && n(s) !== "[object Array]" && n(s.callee) === "[object Function]";
  }, r = function() {
    return i(arguments);
  }();
  return i.isLegacyArguments = f, mo = r ? i : f, mo;
}
var wo, ch;
function h4() {
  if (ch)
    return wo;
  ch = 1;
  var e = Object.prototype.toString, t = Function.prototype.toString, n = /^\s*(?:function)?\*/, i = Sf()(), f = Object.getPrototypeOf, r = function() {
    if (!i)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, o;
  return wo = function(c) {
    if (typeof c != "function")
      return !1;
    if (n.test(t.call(c)))
      return !0;
    if (!i) {
      var l = e.call(c);
      return l === "[object GeneratorFunction]";
    }
    if (!f)
      return !1;
    if (typeof o > "u") {
      var u = r();
      o = u ? f(u) : !1;
    }
    return f(c) === o;
  }, wo;
}
var _o, hh;
function l4() {
  if (hh)
    return _o;
  hh = 1;
  var e = Function.prototype.toString, t = typeof Reflect == "object" && Reflect !== null && Reflect.apply, n, i;
  if (typeof t == "function" && typeof Object.defineProperty == "function")
    try {
      n = Object.defineProperty({}, "length", {
        get: function() {
          throw i;
        }
      }), i = {}, t(function() {
        throw 42;
      }, null, n);
    } catch (C) {
      C !== i && (t = null);
    }
  else
    t = null;
  var f = /^\s*class\b/, r = function(N) {
    try {
      var $ = e.call(N);
      return f.test($);
    } catch {
      return !1;
    }
  }, o = function(N) {
    try {
      return r(N) ? !1 : (e.call(N), !0);
    } catch {
      return !1;
    }
  }, s = Object.prototype.toString, c = "[object Object]", l = "[object Function]", u = "[object GeneratorFunction]", v = "[object HTMLAllCollection]", p = "[object HTML document.all class]", g = "[object HTMLCollection]", w = typeof Symbol == "function" && !!Symbol.toStringTag, S = !(0 in [,]), T = function() {
    return !1;
  };
  if (typeof document == "object") {
    var I = document.all;
    s.call(I) === s.call(document.all) && (T = function(N) {
      if ((S || !N) && (typeof N > "u" || typeof N == "object"))
        try {
          var $ = s.call(N);
          return ($ === v || $ === p || $ === g || $ === c) && N("") == null;
        } catch {
        }
      return !1;
    });
  }
  return _o = t ? function(N) {
    if (T(N))
      return !0;
    if (!N || typeof N != "function" && typeof N != "object")
      return !1;
    try {
      t(N, null, n);
    } catch ($) {
      if ($ !== i)
        return !1;
    }
    return !r(N) && o(N);
  } : function(N) {
    if (T(N))
      return !0;
    if (!N || typeof N != "function" && typeof N != "object")
      return !1;
    if (w)
      return o(N);
    if (r(N))
      return !1;
    var $ = s.call(N);
    return $ !== l && $ !== u && !/^\[object HTML/.test($) ? !1 : o(N);
  }, _o;
}
var xo, lh;
function gp() {
  if (lh)
    return xo;
  lh = 1;
  var e = l4(), t = Object.prototype.toString, n = Object.prototype.hasOwnProperty, i = function(c, l, u) {
    for (var v = 0, p = c.length; v < p; v++)
      n.call(c, v) && (u == null ? l(c[v], v, c) : l.call(u, c[v], v, c));
  }, f = function(c, l, u) {
    for (var v = 0, p = c.length; v < p; v++)
      u == null ? l(c.charAt(v), v, c) : l.call(u, c.charAt(v), v, c);
  }, r = function(c, l, u) {
    for (var v in c)
      n.call(c, v) && (u == null ? l(c[v], v, c) : l.call(u, c[v], v, c));
  }, o = function(c, l, u) {
    if (!e(l))
      throw new TypeError("iterator must be a function");
    var v;
    arguments.length >= 3 && (v = u), t.call(c) === "[object Array]" ? i(c, l, v) : typeof c == "string" ? f(c, l, v) : r(c, l, v);
  };
  return xo = o, xo;
}
var Eo, dh;
function mp() {
  if (dh)
    return Eo;
  dh = 1;
  var e = [
    "BigInt64Array",
    "BigUint64Array",
    "Float32Array",
    "Float64Array",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray"
  ], t = typeof globalThis > "u" ? Ne : globalThis;
  return Eo = function() {
    for (var i = [], f = 0; f < e.length; f++)
      typeof t[e[f]] == "function" && (i[i.length] = e[f]);
    return i;
  }, Eo;
}
var So, ph;
function wp() {
  if (ph)
    return So;
  ph = 1;
  var e = xc(), t = e("%Object.getOwnPropertyDescriptor%", !0);
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return So = t, So;
}
var Mo, vh;
function _p() {
  if (vh)
    return Mo;
  vh = 1;
  var e = gp(), t = mp(), n = Ec(), i = n("Object.prototype.toString"), f = Sf()(), r = wp(), o = typeof globalThis > "u" ? Ne : globalThis, s = t(), c = n("Array.prototype.indexOf", !0) || function(w, S) {
    for (var T = 0; T < w.length; T += 1)
      if (w[T] === S)
        return T;
    return -1;
  }, l = n("String.prototype.slice"), u = {}, v = Object.getPrototypeOf;
  f && r && v && e(s, function(g) {
    var w = new o[g]();
    if (Symbol.toStringTag in w) {
      var S = v(w), T = r(S, Symbol.toStringTag);
      if (!T) {
        var I = v(S);
        T = r(I, Symbol.toStringTag);
      }
      u[g] = T.get;
    }
  });
  var p = function(w) {
    var S = !1;
    return e(u, function(T, I) {
      if (!S)
        try {
          S = T.call(w) === I;
        } catch {
        }
    }), S;
  };
  return Mo = function(w) {
    if (!w || typeof w != "object")
      return !1;
    if (!f || !(Symbol.toStringTag in w)) {
      var S = l(i(w), 8, -1);
      return c(s, S) > -1;
    }
    return r ? p(w) : !1;
  }, Mo;
}
var Ao, bh;
function d4() {
  if (bh)
    return Ao;
  bh = 1;
  var e = gp(), t = mp(), n = Ec(), i = wp(), f = n("Object.prototype.toString"), r = Sf()(), o = typeof globalThis > "u" ? Ne : globalThis, s = t(), c = n("String.prototype.slice"), l = {}, u = Object.getPrototypeOf;
  r && i && u && e(s, function(g) {
    if (typeof o[g] == "function") {
      var w = new o[g]();
      if (Symbol.toStringTag in w) {
        var S = u(w), T = i(S, Symbol.toStringTag);
        if (!T) {
          var I = u(S);
          T = i(I, Symbol.toStringTag);
        }
        l[g] = T.get;
      }
    }
  });
  var v = function(w) {
    var S = !1;
    return e(l, function(T, I) {
      if (!S)
        try {
          var C = T.call(w);
          C === I && (S = C);
        } catch {
        }
    }), S;
  }, p = _p();
  return Ao = function(w) {
    return p(w) ? !r || !(Symbol.toStringTag in w) ? c(f(w), 8, -1) : v(w) : !1;
  }, Ao;
}
var yh;
function p4() {
  return yh || (yh = 1, function(e) {
    var t = c4(), n = h4(), i = d4(), f = _p();
    function r(F) {
      return F.call.bind(F);
    }
    var o = typeof BigInt < "u", s = typeof Symbol < "u", c = r(Object.prototype.toString), l = r(Number.prototype.valueOf), u = r(String.prototype.valueOf), v = r(Boolean.prototype.valueOf);
    if (o)
      var p = r(BigInt.prototype.valueOf);
    if (s)
      var g = r(Symbol.prototype.valueOf);
    function w(F, fe) {
      if (typeof F != "object")
        return !1;
      try {
        return fe(F), !0;
      } catch {
        return !1;
      }
    }
    e.isArgumentsObject = t, e.isGeneratorFunction = n, e.isTypedArray = f;
    function S(F) {
      return typeof Promise < "u" && F instanceof Promise || F !== null && typeof F == "object" && typeof F.then == "function" && typeof F.catch == "function";
    }
    e.isPromise = S;
    function T(F) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(F) : f(F) || M(F);
    }
    e.isArrayBufferView = T;
    function I(F) {
      return i(F) === "Uint8Array";
    }
    e.isUint8Array = I;
    function C(F) {
      return i(F) === "Uint8ClampedArray";
    }
    e.isUint8ClampedArray = C;
    function N(F) {
      return i(F) === "Uint16Array";
    }
    e.isUint16Array = N;
    function $(F) {
      return i(F) === "Uint32Array";
    }
    e.isUint32Array = $;
    function D(F) {
      return i(F) === "Int8Array";
    }
    e.isInt8Array = D;
    function H(F) {
      return i(F) === "Int16Array";
    }
    e.isInt16Array = H;
    function V(F) {
      return i(F) === "Int32Array";
    }
    e.isInt32Array = V;
    function ne(F) {
      return i(F) === "Float32Array";
    }
    e.isFloat32Array = ne;
    function Q(F) {
      return i(F) === "Float64Array";
    }
    e.isFloat64Array = Q;
    function se(F) {
      return i(F) === "BigInt64Array";
    }
    e.isBigInt64Array = se;
    function k(F) {
      return i(F) === "BigUint64Array";
    }
    e.isBigUint64Array = k;
    function m(F) {
      return c(F) === "[object Map]";
    }
    m.working = typeof Map < "u" && m(/* @__PURE__ */ new Map());
    function b(F) {
      return typeof Map > "u" ? !1 : m.working ? m(F) : F instanceof Map;
    }
    e.isMap = b;
    function a(F) {
      return c(F) === "[object Set]";
    }
    a.working = typeof Set < "u" && a(/* @__PURE__ */ new Set());
    function h(F) {
      return typeof Set > "u" ? !1 : a.working ? a(F) : F instanceof Set;
    }
    e.isSet = h;
    function y(F) {
      return c(F) === "[object WeakMap]";
    }
    y.working = typeof WeakMap < "u" && y(/* @__PURE__ */ new WeakMap());
    function x(F) {
      return typeof WeakMap > "u" ? !1 : y.working ? y(F) : F instanceof WeakMap;
    }
    e.isWeakMap = x;
    function A(F) {
      return c(F) === "[object WeakSet]";
    }
    A.working = typeof WeakSet < "u" && A(/* @__PURE__ */ new WeakSet());
    function B(F) {
      return A(F);
    }
    e.isWeakSet = B;
    function _(F) {
      return c(F) === "[object ArrayBuffer]";
    }
    _.working = typeof ArrayBuffer < "u" && _(new ArrayBuffer());
    function E(F) {
      return typeof ArrayBuffer > "u" ? !1 : _.working ? _(F) : F instanceof ArrayBuffer;
    }
    e.isArrayBuffer = E;
    function d(F) {
      return c(F) === "[object DataView]";
    }
    d.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && d(new DataView(new ArrayBuffer(1), 0, 1));
    function M(F) {
      return typeof DataView > "u" ? !1 : d.working ? d(F) : F instanceof DataView;
    }
    e.isDataView = M;
    var Z = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function re(F) {
      return c(F) === "[object SharedArrayBuffer]";
    }
    function J(F) {
      return typeof Z > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new Z())), re.working ? re(F) : F instanceof Z);
    }
    e.isSharedArrayBuffer = J;
    function ee(F) {
      return c(F) === "[object AsyncFunction]";
    }
    e.isAsyncFunction = ee;
    function ue(F) {
      return c(F) === "[object Map Iterator]";
    }
    e.isMapIterator = ue;
    function le(F) {
      return c(F) === "[object Set Iterator]";
    }
    e.isSetIterator = le;
    function Se(F) {
      return c(F) === "[object Generator]";
    }
    e.isGeneratorObject = Se;
    function W(F) {
      return c(F) === "[object WebAssembly.Module]";
    }
    e.isWebAssemblyCompiledModule = W;
    function K(F) {
      return w(F, l);
    }
    e.isNumberObject = K;
    function pe(F) {
      return w(F, u);
    }
    e.isStringObject = pe;
    function me(F) {
      return w(F, v);
    }
    e.isBooleanObject = me;
    function Ie(F) {
      return o && w(F, p);
    }
    e.isBigIntObject = Ie;
    function z(F) {
      return s && w(F, g);
    }
    e.isSymbolObject = z;
    function P(F) {
      return K(F) || pe(F) || me(F) || Ie(F) || z(F);
    }
    e.isBoxedPrimitive = P;
    function L(F) {
      return typeof Uint8Array < "u" && (E(F) || J(F));
    }
    e.isAnyArrayBuffer = L, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(F) {
      Object.defineProperty(e, F, {
        enumerable: !1,
        value: function() {
          throw new Error(F + " is not supported in userland");
        }
      });
    });
  }(uo)), uo;
}
var Bo, gh;
function v4() {
  return gh || (gh = 1, Bo = function(t) {
    return t instanceof Buffer;
  }), Bo;
}
var mh;
function xp() {
  return mh || (mh = 1, function(e) {
    var t = Object.getOwnPropertyDescriptors || function(M) {
      for (var Z = Object.keys(M), re = {}, J = 0; J < Z.length; J++)
        re[Z[J]] = Object.getOwnPropertyDescriptor(M, Z[J]);
      return re;
    }, n = /%[sdj%]/g;
    e.format = function(d) {
      if (!D(d)) {
        for (var M = [], Z = 0; Z < arguments.length; Z++)
          M.push(o(arguments[Z]));
        return M.join(" ");
      }
      for (var Z = 1, re = arguments, J = re.length, ee = String(d).replace(n, function(le) {
        if (le === "%%")
          return "%";
        if (Z >= J)
          return le;
        switch (le) {
          case "%s":
            return String(re[Z++]);
          case "%d":
            return Number(re[Z++]);
          case "%j":
            try {
              return JSON.stringify(re[Z++]);
            } catch {
              return "[Circular]";
            }
          default:
            return le;
        }
      }), ue = re[Z]; Z < J; ue = re[++Z])
        C(ue) || !Q(ue) ? ee += " " + ue : ee += " " + o(ue);
      return ee;
    }, e.deprecate = function(d, M) {
      if (typeof process < "u" && process.noDeprecation === !0)
        return d;
      if (typeof process > "u")
        return function() {
          return e.deprecate(d, M).apply(this, arguments);
        };
      var Z = !1;
      function re() {
        if (!Z) {
          if (process.throwDeprecation)
            throw new Error(M);
          process.traceDeprecation ? console.trace(M) : console.error(M), Z = !0;
        }
        return d.apply(this, arguments);
      }
      return re;
    };
    var i = {}, f = /^$/;
    if (process.env.NODE_DEBUG) {
      var r = process.env.NODE_DEBUG;
      r = r.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), f = new RegExp("^" + r + "$", "i");
    }
    e.debuglog = function(d) {
      if (d = d.toUpperCase(), !i[d])
        if (f.test(d)) {
          var M = process.pid;
          i[d] = function() {
            var Z = e.format.apply(e, arguments);
            console.error("%s %d: %s", d, M, Z);
          };
        } else
          i[d] = function() {
          };
      return i[d];
    };
    function o(d, M) {
      var Z = {
        seen: [],
        stylize: c
      };
      return arguments.length >= 3 && (Z.depth = arguments[2]), arguments.length >= 4 && (Z.colors = arguments[3]), I(M) ? Z.showHidden = M : M && e._extend(Z, M), V(Z.showHidden) && (Z.showHidden = !1), V(Z.depth) && (Z.depth = 2), V(Z.colors) && (Z.colors = !1), V(Z.customInspect) && (Z.customInspect = !0), Z.colors && (Z.stylize = s), u(Z, d, Z.depth);
    }
    e.inspect = o, o.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, o.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function s(d, M) {
      var Z = o.styles[M];
      return Z ? "\x1B[" + o.colors[Z][0] + "m" + d + "\x1B[" + o.colors[Z][1] + "m" : d;
    }
    function c(d, M) {
      return d;
    }
    function l(d) {
      var M = {};
      return d.forEach(function(Z, re) {
        M[Z] = !0;
      }), M;
    }
    function u(d, M, Z) {
      if (d.customInspect && M && m(M.inspect) && // Filter out the util module, it's inspect function is special
      M.inspect !== e.inspect && // Also filter out any prototype objects using the circular check.
      !(M.constructor && M.constructor.prototype === M)) {
        var re = M.inspect(Z, d);
        return D(re) || (re = u(d, re, Z)), re;
      }
      var J = v(d, M);
      if (J)
        return J;
      var ee = Object.keys(M), ue = l(ee);
      if (d.showHidden && (ee = Object.getOwnPropertyNames(M)), k(M) && (ee.indexOf("message") >= 0 || ee.indexOf("description") >= 0))
        return p(M);
      if (ee.length === 0) {
        if (m(M)) {
          var le = M.name ? ": " + M.name : "";
          return d.stylize("[Function" + le + "]", "special");
        }
        if (ne(M))
          return d.stylize(RegExp.prototype.toString.call(M), "regexp");
        if (se(M))
          return d.stylize(Date.prototype.toString.call(M), "date");
        if (k(M))
          return p(M);
      }
      var Se = "", W = !1, K = ["{", "}"];
      if (T(M) && (W = !0, K = ["[", "]"]), m(M)) {
        var pe = M.name ? ": " + M.name : "";
        Se = " [Function" + pe + "]";
      }
      if (ne(M) && (Se = " " + RegExp.prototype.toString.call(M)), se(M) && (Se = " " + Date.prototype.toUTCString.call(M)), k(M) && (Se = " " + p(M)), ee.length === 0 && (!W || M.length == 0))
        return K[0] + Se + K[1];
      if (Z < 0)
        return ne(M) ? d.stylize(RegExp.prototype.toString.call(M), "regexp") : d.stylize("[Object]", "special");
      d.seen.push(M);
      var me;
      return W ? me = g(d, M, Z, ue, ee) : me = ee.map(function(Ie) {
        return w(d, M, Z, ue, Ie, W);
      }), d.seen.pop(), S(me, Se, K);
    }
    function v(d, M) {
      if (V(M))
        return d.stylize("undefined", "undefined");
      if (D(M)) {
        var Z = "'" + JSON.stringify(M).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return d.stylize(Z, "string");
      }
      if ($(M))
        return d.stylize("" + M, "number");
      if (I(M))
        return d.stylize("" + M, "boolean");
      if (C(M))
        return d.stylize("null", "null");
    }
    function p(d) {
      return "[" + Error.prototype.toString.call(d) + "]";
    }
    function g(d, M, Z, re, J) {
      for (var ee = [], ue = 0, le = M.length; ue < le; ++ue)
        A(M, String(ue)) ? ee.push(w(
          d,
          M,
          Z,
          re,
          String(ue),
          !0
        )) : ee.push("");
      return J.forEach(function(Se) {
        Se.match(/^\d+$/) || ee.push(w(
          d,
          M,
          Z,
          re,
          Se,
          !0
        ));
      }), ee;
    }
    function w(d, M, Z, re, J, ee) {
      var ue, le, Se;
      if (Se = Object.getOwnPropertyDescriptor(M, J) || { value: M[J] }, Se.get ? Se.set ? le = d.stylize("[Getter/Setter]", "special") : le = d.stylize("[Getter]", "special") : Se.set && (le = d.stylize("[Setter]", "special")), A(re, J) || (ue = "[" + J + "]"), le || (d.seen.indexOf(Se.value) < 0 ? (C(Z) ? le = u(d, Se.value, null) : le = u(d, Se.value, Z - 1), le.indexOf(`
`) > -1 && (ee ? le = le.split(`
`).map(function(W) {
        return "  " + W;
      }).join(`
`).slice(2) : le = `
` + le.split(`
`).map(function(W) {
        return "   " + W;
      }).join(`
`))) : le = d.stylize("[Circular]", "special")), V(ue)) {
        if (ee && J.match(/^\d+$/))
          return le;
        ue = JSON.stringify("" + J), ue.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (ue = ue.slice(1, -1), ue = d.stylize(ue, "name")) : (ue = ue.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), ue = d.stylize(ue, "string"));
      }
      return ue + ": " + le;
    }
    function S(d, M, Z) {
      var re = d.reduce(function(J, ee) {
        return ee.indexOf(`
`) >= 0, J + ee.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return re > 60 ? Z[0] + (M === "" ? "" : M + `
 `) + " " + d.join(`,
  `) + " " + Z[1] : Z[0] + M + " " + d.join(", ") + " " + Z[1];
    }
    e.types = p4();
    function T(d) {
      return Array.isArray(d);
    }
    e.isArray = T;
    function I(d) {
      return typeof d == "boolean";
    }
    e.isBoolean = I;
    function C(d) {
      return d === null;
    }
    e.isNull = C;
    function N(d) {
      return d == null;
    }
    e.isNullOrUndefined = N;
    function $(d) {
      return typeof d == "number";
    }
    e.isNumber = $;
    function D(d) {
      return typeof d == "string";
    }
    e.isString = D;
    function H(d) {
      return typeof d == "symbol";
    }
    e.isSymbol = H;
    function V(d) {
      return d === void 0;
    }
    e.isUndefined = V;
    function ne(d) {
      return Q(d) && a(d) === "[object RegExp]";
    }
    e.isRegExp = ne, e.types.isRegExp = ne;
    function Q(d) {
      return typeof d == "object" && d !== null;
    }
    e.isObject = Q;
    function se(d) {
      return Q(d) && a(d) === "[object Date]";
    }
    e.isDate = se, e.types.isDate = se;
    function k(d) {
      return Q(d) && (a(d) === "[object Error]" || d instanceof Error);
    }
    e.isError = k, e.types.isNativeError = k;
    function m(d) {
      return typeof d == "function";
    }
    e.isFunction = m;
    function b(d) {
      return d === null || typeof d == "boolean" || typeof d == "number" || typeof d == "string" || typeof d == "symbol" || // ES6 symbol
      typeof d > "u";
    }
    e.isPrimitive = b, e.isBuffer = v4();
    function a(d) {
      return Object.prototype.toString.call(d);
    }
    function h(d) {
      return d < 10 ? "0" + d.toString(10) : d.toString(10);
    }
    var y = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function x() {
      var d = new Date(), M = [
        h(d.getHours()),
        h(d.getMinutes()),
        h(d.getSeconds())
      ].join(":");
      return [d.getDate(), y[d.getMonth()], M].join(" ");
    }
    e.log = function() {
      console.log("%s - %s", x(), e.format.apply(e, arguments));
    }, e.inherits = bt(), e._extend = function(d, M) {
      if (!M || !Q(M))
        return d;
      for (var Z = Object.keys(M), re = Z.length; re--; )
        d[Z[re]] = M[Z[re]];
      return d;
    };
    function A(d, M) {
      return Object.prototype.hasOwnProperty.call(d, M);
    }
    var B = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    e.promisify = function(M) {
      if (typeof M != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (B && M[B]) {
        var Z = M[B];
        if (typeof Z != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(Z, B, {
          value: Z,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), Z;
      }
      function Z() {
        for (var re, J, ee = new Promise(function(Se, W) {
          re = Se, J = W;
        }), ue = [], le = 0; le < arguments.length; le++)
          ue.push(arguments[le]);
        ue.push(function(Se, W) {
          Se ? J(Se) : re(W);
        });
        try {
          M.apply(this, ue);
        } catch (Se) {
          J(Se);
        }
        return ee;
      }
      return Object.setPrototypeOf(Z, Object.getPrototypeOf(M)), B && Object.defineProperty(Z, B, {
        value: Z,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        Z,
        t(M)
      );
    }, e.promisify.custom = B;
    function _(d, M) {
      if (!d) {
        var Z = new Error("Promise was rejected with a falsy value");
        Z.reason = d, d = Z;
      }
      return M(d);
    }
    function E(d) {
      if (typeof d != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function M() {
        for (var Z = [], re = 0; re < arguments.length; re++)
          Z.push(arguments[re]);
        var J = Z.pop();
        if (typeof J != "function")
          throw new TypeError("The last argument must be of type Function");
        var ee = this, ue = function() {
          return J.apply(ee, arguments);
        };
        d.apply(this, Z).then(
          function(le) {
            process.nextTick(ue.bind(null, null, le));
          },
          function(le) {
            process.nextTick(_.bind(null, le, ue));
          }
        );
      }
      return Object.setPrototypeOf(M, Object.getPrototypeOf(d)), Object.defineProperties(
        M,
        t(d)
      ), M;
    }
    e.callbackify = E;
  }(so)), so;
}
var Ro, wh;
function b4() {
  if (wh)
    return Ro;
  wh = 1;
  function e(p, g) {
    var w = Object.keys(p);
    if (Object.getOwnPropertySymbols) {
      var S = Object.getOwnPropertySymbols(p);
      g && (S = S.filter(function(T) {
        return Object.getOwnPropertyDescriptor(p, T).enumerable;
      })), w.push.apply(w, S);
    }
    return w;
  }
  function t(p) {
    for (var g = 1; g < arguments.length; g++) {
      var w = arguments[g] != null ? arguments[g] : {};
      g % 2 ? e(Object(w), !0).forEach(function(S) {
        n(p, S, w[S]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(p, Object.getOwnPropertyDescriptors(w)) : e(Object(w)).forEach(function(S) {
        Object.defineProperty(p, S, Object.getOwnPropertyDescriptor(w, S));
      });
    }
    return p;
  }
  function n(p, g, w) {
    return g in p ? Object.defineProperty(p, g, { value: w, enumerable: !0, configurable: !0, writable: !0 }) : p[g] = w, p;
  }
  function i(p, g) {
    if (!(p instanceof g))
      throw new TypeError("Cannot call a class as a function");
  }
  function f(p, g) {
    for (var w = 0; w < g.length; w++) {
      var S = g[w];
      S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(p, S.key, S);
    }
  }
  function r(p, g, w) {
    return g && f(p.prototype, g), w && f(p, w), p;
  }
  var o = Nr, s = o.Buffer, c = xp(), l = c.inspect, u = l && l.custom || "inspect";
  function v(p, g, w) {
    s.prototype.copy.call(p, g, w);
  }
  return Ro = /* @__PURE__ */ function() {
    function p() {
      i(this, p), this.head = null, this.tail = null, this.length = 0;
    }
    return r(p, [{
      key: "push",
      value: function(w) {
        var S = {
          data: w,
          next: null
        };
        this.length > 0 ? this.tail.next = S : this.head = S, this.tail = S, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(w) {
        var S = {
          data: w,
          next: this.head
        };
        this.length === 0 && (this.tail = S), this.head = S, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var w = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, w;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(w) {
        if (this.length === 0)
          return "";
        for (var S = this.head, T = "" + S.data; S = S.next; )
          T += w + S.data;
        return T;
      }
    }, {
      key: "concat",
      value: function(w) {
        if (this.length === 0)
          return s.alloc(0);
        for (var S = s.allocUnsafe(w >>> 0), T = this.head, I = 0; T; )
          v(T.data, S, I), I += T.data.length, T = T.next;
        return S;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(w, S) {
        var T;
        return w < this.head.data.length ? (T = this.head.data.slice(0, w), this.head.data = this.head.data.slice(w)) : w === this.head.data.length ? T = this.shift() : T = S ? this._getString(w) : this._getBuffer(w), T;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(w) {
        var S = this.head, T = 1, I = S.data;
        for (w -= I.length; S = S.next; ) {
          var C = S.data, N = w > C.length ? C.length : w;
          if (N === C.length ? I += C : I += C.slice(0, w), w -= N, w === 0) {
            N === C.length ? (++T, S.next ? this.head = S.next : this.head = this.tail = null) : (this.head = S, S.data = C.slice(N));
            break;
          }
          ++T;
        }
        return this.length -= T, I;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(w) {
        var S = s.allocUnsafe(w), T = this.head, I = 1;
        for (T.data.copy(S), w -= T.data.length; T = T.next; ) {
          var C = T.data, N = w > C.length ? C.length : w;
          if (C.copy(S, S.length - w, 0, N), w -= N, w === 0) {
            N === C.length ? (++I, T.next ? this.head = T.next : this.head = this.tail = null) : (this.head = T, T.data = C.slice(N));
            break;
          }
          ++I;
        }
        return this.length -= I, S;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: u,
      value: function(w, S) {
        return l(this, t({}, S, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), p;
  }(), Ro;
}
var Io, _h;
function Ep() {
  if (_h)
    return Io;
  _h = 1;
  function e(o, s) {
    var c = this, l = this._readableState && this._readableState.destroyed, u = this._writableState && this._writableState.destroyed;
    return l || u ? (s ? s(o) : o && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process.nextTick(f, this, o)) : process.nextTick(f, this, o)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(o || null, function(v) {
      !s && v ? c._writableState ? c._writableState.errorEmitted ? process.nextTick(n, c) : (c._writableState.errorEmitted = !0, process.nextTick(t, c, v)) : process.nextTick(t, c, v) : s ? (process.nextTick(n, c), s(v)) : process.nextTick(n, c);
    }), this);
  }
  function t(o, s) {
    f(o, s), n(o);
  }
  function n(o) {
    o._writableState && !o._writableState.emitClose || o._readableState && !o._readableState.emitClose || o.emit("close");
  }
  function i() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function f(o, s) {
    o.emit("error", s);
  }
  function r(o, s) {
    var c = o._readableState, l = o._writableState;
    c && c.autoDestroy || l && l.autoDestroy ? o.destroy(s) : o.emit("error", s);
  }
  return Io = {
    destroy: e,
    undestroy: i,
    errorOrDestroy: r
  }, Io;
}
var To = {}, xh;
function fi() {
  if (xh)
    return To;
  xh = 1;
  function e(s, c) {
    s.prototype = Object.create(c.prototype), s.prototype.constructor = s, s.__proto__ = c;
  }
  var t = {};
  function n(s, c, l) {
    l || (l = Error);
    function u(p, g, w) {
      return typeof c == "string" ? c : c(p, g, w);
    }
    var v = /* @__PURE__ */ function(p) {
      e(g, p);
      function g(w, S, T) {
        return p.call(this, u(w, S, T)) || this;
      }
      return g;
    }(l);
    v.prototype.name = l.name, v.prototype.code = s, t[s] = v;
  }
  function i(s, c) {
    if (Array.isArray(s)) {
      var l = s.length;
      return s = s.map(function(u) {
        return String(u);
      }), l > 2 ? "one of ".concat(c, " ").concat(s.slice(0, l - 1).join(", "), ", or ") + s[l - 1] : l === 2 ? "one of ".concat(c, " ").concat(s[0], " or ").concat(s[1]) : "of ".concat(c, " ").concat(s[0]);
    } else
      return "of ".concat(c, " ").concat(String(s));
  }
  function f(s, c, l) {
    return s.substr(!l || l < 0 ? 0 : +l, c.length) === c;
  }
  function r(s, c, l) {
    return (l === void 0 || l > s.length) && (l = s.length), s.substring(l - c.length, l) === c;
  }
  function o(s, c, l) {
    return typeof l != "number" && (l = 0), l + c.length > s.length ? !1 : s.indexOf(c, l) !== -1;
  }
  return n("ERR_INVALID_OPT_VALUE", function(s, c) {
    return 'The value "' + c + '" is invalid for option "' + s + '"';
  }, TypeError), n("ERR_INVALID_ARG_TYPE", function(s, c, l) {
    var u;
    typeof c == "string" && f(c, "not ") ? (u = "must not be", c = c.replace(/^not /, "")) : u = "must be";
    var v;
    if (r(s, " argument"))
      v = "The ".concat(s, " ").concat(u, " ").concat(i(c, "type"));
    else {
      var p = o(s, ".") ? "property" : "argument";
      v = 'The "'.concat(s, '" ').concat(p, " ").concat(u, " ").concat(i(c, "type"));
    }
    return v += ". Received type ".concat(typeof l), v;
  }, TypeError), n("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), n("ERR_METHOD_NOT_IMPLEMENTED", function(s) {
    return "The " + s + " method is not implemented";
  }), n("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), n("ERR_STREAM_DESTROYED", function(s) {
    return "Cannot call " + s + " after a stream was destroyed";
  }), n("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), n("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), n("ERR_STREAM_WRITE_AFTER_END", "write after end"), n("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), n("ERR_UNKNOWN_ENCODING", function(s) {
    return "Unknown encoding: " + s;
  }, TypeError), n("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), To.codes = t, To;
}
var Po, Eh;
function Sp() {
  if (Eh)
    return Po;
  Eh = 1;
  var e = fi().codes.ERR_INVALID_OPT_VALUE;
  function t(i, f, r) {
    return i.highWaterMark != null ? i.highWaterMark : f ? i[r] : null;
  }
  function n(i, f, r, o) {
    var s = t(f, o, r);
    if (s != null) {
      if (!(isFinite(s) && Math.floor(s) === s) || s < 0) {
        var c = o ? r : "highWaterMark";
        throw new e(c, s);
      }
      return Math.floor(s);
    }
    return i.objectMode ? 16 : 16 * 1024;
  }
  return Po = {
    getHighWaterMark: n
  }, Po;
}
var Co, Sh;
function y4() {
  if (Sh)
    return Co;
  Sh = 1, Co = e;
  function e(n, i) {
    if (t("noDeprecation"))
      return n;
    var f = !1;
    function r() {
      if (!f) {
        if (t("throwDeprecation"))
          throw new Error(i);
        t("traceDeprecation") ? console.trace(i) : console.warn(i), f = !0;
      }
      return n.apply(this, arguments);
    }
    return r;
  }
  function t(n) {
    try {
      if (!Ne.localStorage)
        return !1;
    } catch {
      return !1;
    }
    var i = Ne.localStorage[n];
    return i == null ? !1 : String(i).toLowerCase() === "true";
  }
  return Co;
}
var Oo, Mh;
function Sc() {
  if (Mh)
    return Oo;
  Mh = 1, Oo = ne;
  function e(J) {
    var ee = this;
    this.next = null, this.entry = null, this.finish = function() {
      re(ee, J);
    };
  }
  var t;
  ne.WritableState = H;
  var n = {
    deprecate: y4()
  }, i = bp(), f = Nr.Buffer, r = Ne.Uint8Array || function() {
  };
  function o(J) {
    return f.from(J);
  }
  function s(J) {
    return f.isBuffer(J) || J instanceof r;
  }
  var c = Ep(), l = Sp(), u = l.getHighWaterMark, v = fi().codes, p = v.ERR_INVALID_ARG_TYPE, g = v.ERR_METHOD_NOT_IMPLEMENTED, w = v.ERR_MULTIPLE_CALLBACK, S = v.ERR_STREAM_CANNOT_PIPE, T = v.ERR_STREAM_DESTROYED, I = v.ERR_STREAM_NULL_VALUES, C = v.ERR_STREAM_WRITE_AFTER_END, N = v.ERR_UNKNOWN_ENCODING, $ = c.errorOrDestroy;
  bt()(ne, i);
  function D() {
  }
  function H(J, ee, ue) {
    t = t || Bn(), J = J || {}, typeof ue != "boolean" && (ue = ee instanceof t), this.objectMode = !!J.objectMode, ue && (this.objectMode = this.objectMode || !!J.writableObjectMode), this.highWaterMark = u(this, J, "writableHighWaterMark", ue), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var le = J.decodeStrings === !1;
    this.decodeStrings = !le, this.defaultEncoding = J.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(Se) {
      y(ee, Se);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = J.emitClose !== !1, this.autoDestroy = !!J.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new e(this);
  }
  H.prototype.getBuffer = function() {
    for (var ee = this.bufferedRequest, ue = []; ee; )
      ue.push(ee), ee = ee.next;
    return ue;
  }, function() {
    try {
      Object.defineProperty(H.prototype, "buffer", {
        get: n.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var V;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (V = Function.prototype[Symbol.hasInstance], Object.defineProperty(ne, Symbol.hasInstance, {
    value: function(ee) {
      return V.call(this, ee) ? !0 : this !== ne ? !1 : ee && ee._writableState instanceof H;
    }
  })) : V = function(ee) {
    return ee instanceof this;
  };
  function ne(J) {
    t = t || Bn();
    var ee = this instanceof t;
    if (!ee && !V.call(ne, this))
      return new ne(J);
    this._writableState = new H(J, this, ee), this.writable = !0, J && (typeof J.write == "function" && (this._write = J.write), typeof J.writev == "function" && (this._writev = J.writev), typeof J.destroy == "function" && (this._destroy = J.destroy), typeof J.final == "function" && (this._final = J.final)), i.call(this);
  }
  ne.prototype.pipe = function() {
    $(this, new S());
  };
  function Q(J, ee) {
    var ue = new C();
    $(J, ue), process.nextTick(ee, ue);
  }
  function se(J, ee, ue, le) {
    var Se;
    return ue === null ? Se = new I() : typeof ue != "string" && !ee.objectMode && (Se = new p("chunk", ["string", "Buffer"], ue)), Se ? ($(J, Se), process.nextTick(le, Se), !1) : !0;
  }
  ne.prototype.write = function(J, ee, ue) {
    var le = this._writableState, Se = !1, W = !le.objectMode && s(J);
    return W && !f.isBuffer(J) && (J = o(J)), typeof ee == "function" && (ue = ee, ee = null), W ? ee = "buffer" : ee || (ee = le.defaultEncoding), typeof ue != "function" && (ue = D), le.ending ? Q(this, ue) : (W || se(this, le, J, ue)) && (le.pendingcb++, Se = m(this, le, W, J, ee, ue)), Se;
  }, ne.prototype.cork = function() {
    this._writableState.corked++;
  }, ne.prototype.uncork = function() {
    var J = this._writableState;
    J.corked && (J.corked--, !J.writing && !J.corked && !J.bufferProcessing && J.bufferedRequest && B(this, J));
  }, ne.prototype.setDefaultEncoding = function(ee) {
    if (typeof ee == "string" && (ee = ee.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((ee + "").toLowerCase()) > -1))
      throw new N(ee);
    return this._writableState.defaultEncoding = ee, this;
  }, Object.defineProperty(ne.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function k(J, ee, ue) {
    return !J.objectMode && J.decodeStrings !== !1 && typeof ee == "string" && (ee = f.from(ee, ue)), ee;
  }
  Object.defineProperty(ne.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function m(J, ee, ue, le, Se, W) {
    if (!ue) {
      var K = k(ee, le, Se);
      le !== K && (ue = !0, Se = "buffer", le = K);
    }
    var pe = ee.objectMode ? 1 : le.length;
    ee.length += pe;
    var me = ee.length < ee.highWaterMark;
    if (me || (ee.needDrain = !0), ee.writing || ee.corked) {
      var Ie = ee.lastBufferedRequest;
      ee.lastBufferedRequest = {
        chunk: le,
        encoding: Se,
        isBuf: ue,
        callback: W,
        next: null
      }, Ie ? Ie.next = ee.lastBufferedRequest : ee.bufferedRequest = ee.lastBufferedRequest, ee.bufferedRequestCount += 1;
    } else
      b(J, ee, !1, pe, le, Se, W);
    return me;
  }
  function b(J, ee, ue, le, Se, W, K) {
    ee.writelen = le, ee.writecb = K, ee.writing = !0, ee.sync = !0, ee.destroyed ? ee.onwrite(new T("write")) : ue ? J._writev(Se, ee.onwrite) : J._write(Se, W, ee.onwrite), ee.sync = !1;
  }
  function a(J, ee, ue, le, Se) {
    --ee.pendingcb, ue ? (process.nextTick(Se, le), process.nextTick(M, J, ee), J._writableState.errorEmitted = !0, $(J, le)) : (Se(le), J._writableState.errorEmitted = !0, $(J, le), M(J, ee));
  }
  function h(J) {
    J.writing = !1, J.writecb = null, J.length -= J.writelen, J.writelen = 0;
  }
  function y(J, ee) {
    var ue = J._writableState, le = ue.sync, Se = ue.writecb;
    if (typeof Se != "function")
      throw new w();
    if (h(ue), ee)
      a(J, ue, le, ee, Se);
    else {
      var W = _(ue) || J.destroyed;
      !W && !ue.corked && !ue.bufferProcessing && ue.bufferedRequest && B(J, ue), le ? process.nextTick(x, J, ue, W, Se) : x(J, ue, W, Se);
    }
  }
  function x(J, ee, ue, le) {
    ue || A(J, ee), ee.pendingcb--, le(), M(J, ee);
  }
  function A(J, ee) {
    ee.length === 0 && ee.needDrain && (ee.needDrain = !1, J.emit("drain"));
  }
  function B(J, ee) {
    ee.bufferProcessing = !0;
    var ue = ee.bufferedRequest;
    if (J._writev && ue && ue.next) {
      var le = ee.bufferedRequestCount, Se = new Array(le), W = ee.corkedRequestsFree;
      W.entry = ue;
      for (var K = 0, pe = !0; ue; )
        Se[K] = ue, ue.isBuf || (pe = !1), ue = ue.next, K += 1;
      Se.allBuffers = pe, b(J, ee, !0, ee.length, Se, "", W.finish), ee.pendingcb++, ee.lastBufferedRequest = null, W.next ? (ee.corkedRequestsFree = W.next, W.next = null) : ee.corkedRequestsFree = new e(ee), ee.bufferedRequestCount = 0;
    } else {
      for (; ue; ) {
        var me = ue.chunk, Ie = ue.encoding, z = ue.callback, P = ee.objectMode ? 1 : me.length;
        if (b(J, ee, !1, P, me, Ie, z), ue = ue.next, ee.bufferedRequestCount--, ee.writing)
          break;
      }
      ue === null && (ee.lastBufferedRequest = null);
    }
    ee.bufferedRequest = ue, ee.bufferProcessing = !1;
  }
  ne.prototype._write = function(J, ee, ue) {
    ue(new g("_write()"));
  }, ne.prototype._writev = null, ne.prototype.end = function(J, ee, ue) {
    var le = this._writableState;
    return typeof J == "function" ? (ue = J, J = null, ee = null) : typeof ee == "function" && (ue = ee, ee = null), J != null && this.write(J, ee), le.corked && (le.corked = 1, this.uncork()), le.ending || Z(this, le, ue), this;
  }, Object.defineProperty(ne.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function _(J) {
    return J.ending && J.length === 0 && J.bufferedRequest === null && !J.finished && !J.writing;
  }
  function E(J, ee) {
    J._final(function(ue) {
      ee.pendingcb--, ue && $(J, ue), ee.prefinished = !0, J.emit("prefinish"), M(J, ee);
    });
  }
  function d(J, ee) {
    !ee.prefinished && !ee.finalCalled && (typeof J._final == "function" && !ee.destroyed ? (ee.pendingcb++, ee.finalCalled = !0, process.nextTick(E, J, ee)) : (ee.prefinished = !0, J.emit("prefinish")));
  }
  function M(J, ee) {
    var ue = _(ee);
    if (ue && (d(J, ee), ee.pendingcb === 0 && (ee.finished = !0, J.emit("finish"), ee.autoDestroy))) {
      var le = J._readableState;
      (!le || le.autoDestroy && le.endEmitted) && J.destroy();
    }
    return ue;
  }
  function Z(J, ee, ue) {
    ee.ending = !0, M(J, ee), ue && (ee.finished ? process.nextTick(ue) : J.once("finish", ue)), ee.ended = !0, J.writable = !1;
  }
  function re(J, ee, ue) {
    var le = J.entry;
    for (J.entry = null; le; ) {
      var Se = le.callback;
      ee.pendingcb--, Se(ue), le = le.next;
    }
    ee.corkedRequestsFree.next = J;
  }
  return Object.defineProperty(ne.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(ee) {
      this._writableState && (this._writableState.destroyed = ee);
    }
  }), ne.prototype.destroy = c.destroy, ne.prototype._undestroy = c.undestroy, ne.prototype._destroy = function(J, ee) {
    ee(J);
  }, Oo;
}
var No, Ah;
function Bn() {
  if (Ah)
    return No;
  Ah = 1;
  var e = Object.keys || function(l) {
    var u = [];
    for (var v in l)
      u.push(v);
    return u;
  };
  No = o;
  var t = Mc(), n = Sc();
  bt()(o, t);
  for (var i = e(n.prototype), f = 0; f < i.length; f++) {
    var r = i[f];
    o.prototype[r] || (o.prototype[r] = n.prototype[r]);
  }
  function o(l) {
    if (!(this instanceof o))
      return new o(l);
    t.call(this, l), n.call(this, l), this.allowHalfOpen = !0, l && (l.readable === !1 && (this.readable = !1), l.writable === !1 && (this.writable = !1), l.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", s)));
  }
  Object.defineProperty(o.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(o.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(o.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function s() {
    this._writableState.ended || process.nextTick(c, this);
  }
  function c(l) {
    l.end();
  }
  return Object.defineProperty(o.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(u) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = u, this._writableState.destroyed = u);
    }
  }), No;
}
var Lo = {}, Bh;
function Uu() {
  if (Bh)
    return Lo;
  Bh = 1;
  var e = gt().Buffer, t = e.isEncoding || function(I) {
    switch (I = "" + I, I && I.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function n(I) {
    if (!I)
      return "utf8";
    for (var C; ; )
      switch (I) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return I;
        default:
          if (C)
            return;
          I = ("" + I).toLowerCase(), C = !0;
      }
  }
  function i(I) {
    var C = n(I);
    if (typeof C != "string" && (e.isEncoding === t || !t(I)))
      throw new Error("Unknown encoding: " + I);
    return C || I;
  }
  Lo.StringDecoder = f;
  function f(I) {
    this.encoding = i(I);
    var C;
    switch (this.encoding) {
      case "utf16le":
        this.text = v, this.end = p, C = 4;
        break;
      case "utf8":
        this.fillLast = c, C = 4;
        break;
      case "base64":
        this.text = g, this.end = w, C = 3;
        break;
      default:
        this.write = S, this.end = T;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(C);
  }
  f.prototype.write = function(I) {
    if (I.length === 0)
      return "";
    var C, N;
    if (this.lastNeed) {
      if (C = this.fillLast(I), C === void 0)
        return "";
      N = this.lastNeed, this.lastNeed = 0;
    } else
      N = 0;
    return N < I.length ? C ? C + this.text(I, N) : this.text(I, N) : C || "";
  }, f.prototype.end = u, f.prototype.text = l, f.prototype.fillLast = function(I) {
    if (this.lastNeed <= I.length)
      return I.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    I.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, I.length), this.lastNeed -= I.length;
  };
  function r(I) {
    return I <= 127 ? 0 : I >> 5 === 6 ? 2 : I >> 4 === 14 ? 3 : I >> 3 === 30 ? 4 : I >> 6 === 2 ? -1 : -2;
  }
  function o(I, C, N) {
    var $ = C.length - 1;
    if ($ < N)
      return 0;
    var D = r(C[$]);
    return D >= 0 ? (D > 0 && (I.lastNeed = D - 1), D) : --$ < N || D === -2 ? 0 : (D = r(C[$]), D >= 0 ? (D > 0 && (I.lastNeed = D - 2), D) : --$ < N || D === -2 ? 0 : (D = r(C[$]), D >= 0 ? (D > 0 && (D === 2 ? D = 0 : I.lastNeed = D - 3), D) : 0));
  }
  function s(I, C, N) {
    if ((C[0] & 192) !== 128)
      return I.lastNeed = 0, "�";
    if (I.lastNeed > 1 && C.length > 1) {
      if ((C[1] & 192) !== 128)
        return I.lastNeed = 1, "�";
      if (I.lastNeed > 2 && C.length > 2 && (C[2] & 192) !== 128)
        return I.lastNeed = 2, "�";
    }
  }
  function c(I) {
    var C = this.lastTotal - this.lastNeed, N = s(this, I);
    if (N !== void 0)
      return N;
    if (this.lastNeed <= I.length)
      return I.copy(this.lastChar, C, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    I.copy(this.lastChar, C, 0, I.length), this.lastNeed -= I.length;
  }
  function l(I, C) {
    var N = o(this, I, C);
    if (!this.lastNeed)
      return I.toString("utf8", C);
    this.lastTotal = N;
    var $ = I.length - (N - this.lastNeed);
    return I.copy(this.lastChar, 0, $), I.toString("utf8", C, $);
  }
  function u(I) {
    var C = I && I.length ? this.write(I) : "";
    return this.lastNeed ? C + "�" : C;
  }
  function v(I, C) {
    if ((I.length - C) % 2 === 0) {
      var N = I.toString("utf16le", C);
      if (N) {
        var $ = N.charCodeAt(N.length - 1);
        if ($ >= 55296 && $ <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = I[I.length - 2], this.lastChar[1] = I[I.length - 1], N.slice(0, -1);
      }
      return N;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = I[I.length - 1], I.toString("utf16le", C, I.length - 1);
  }
  function p(I) {
    var C = I && I.length ? this.write(I) : "";
    if (this.lastNeed) {
      var N = this.lastTotal - this.lastNeed;
      return C + this.lastChar.toString("utf16le", 0, N);
    }
    return C;
  }
  function g(I, C) {
    var N = (I.length - C) % 3;
    return N === 0 ? I.toString("base64", C) : (this.lastNeed = 3 - N, this.lastTotal = 3, N === 1 ? this.lastChar[0] = I[I.length - 1] : (this.lastChar[0] = I[I.length - 2], this.lastChar[1] = I[I.length - 1]), I.toString("base64", C, I.length - N));
  }
  function w(I) {
    var C = I && I.length ? this.write(I) : "";
    return this.lastNeed ? C + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : C;
  }
  function S(I) {
    return I.toString(this.encoding);
  }
  function T(I) {
    return I && I.length ? this.write(I) : "";
  }
  return Lo;
}
var $o, Rh;
function Mf() {
  if (Rh)
    return $o;
  Rh = 1;
  var e = fi().codes.ERR_STREAM_PREMATURE_CLOSE;
  function t(r) {
    var o = !1;
    return function() {
      if (!o) {
        o = !0;
        for (var s = arguments.length, c = new Array(s), l = 0; l < s; l++)
          c[l] = arguments[l];
        r.apply(this, c);
      }
    };
  }
  function n() {
  }
  function i(r) {
    return r.setHeader && typeof r.abort == "function";
  }
  function f(r, o, s) {
    if (typeof o == "function")
      return f(r, null, o);
    o || (o = {}), s = t(s || n);
    var c = o.readable || o.readable !== !1 && r.readable, l = o.writable || o.writable !== !1 && r.writable, u = function() {
      r.writable || p();
    }, v = r._writableState && r._writableState.finished, p = function() {
      l = !1, v = !0, c || s.call(r);
    }, g = r._readableState && r._readableState.endEmitted, w = function() {
      c = !1, g = !0, l || s.call(r);
    }, S = function(N) {
      s.call(r, N);
    }, T = function() {
      var N;
      if (c && !g)
        return (!r._readableState || !r._readableState.ended) && (N = new e()), s.call(r, N);
      if (l && !v)
        return (!r._writableState || !r._writableState.ended) && (N = new e()), s.call(r, N);
    }, I = function() {
      r.req.on("finish", p);
    };
    return i(r) ? (r.on("complete", p), r.on("abort", T), r.req ? I() : r.on("request", I)) : l && !r._writableState && (r.on("end", u), r.on("close", u)), r.on("end", w), r.on("finish", p), o.error !== !1 && r.on("error", S), r.on("close", T), function() {
      r.removeListener("complete", p), r.removeListener("abort", T), r.removeListener("request", I), r.req && r.req.removeListener("finish", p), r.removeListener("end", u), r.removeListener("close", u), r.removeListener("finish", p), r.removeListener("end", w), r.removeListener("error", S), r.removeListener("close", T);
    };
  }
  return $o = f, $o;
}
var ko, Ih;
function g4() {
  if (Ih)
    return ko;
  Ih = 1;
  var e;
  function t(I, C, N) {
    return C in I ? Object.defineProperty(I, C, { value: N, enumerable: !0, configurable: !0, writable: !0 }) : I[C] = N, I;
  }
  var n = Mf(), i = Symbol("lastResolve"), f = Symbol("lastReject"), r = Symbol("error"), o = Symbol("ended"), s = Symbol("lastPromise"), c = Symbol("handlePromise"), l = Symbol("stream");
  function u(I, C) {
    return {
      value: I,
      done: C
    };
  }
  function v(I) {
    var C = I[i];
    if (C !== null) {
      var N = I[l].read();
      N !== null && (I[s] = null, I[i] = null, I[f] = null, C(u(N, !1)));
    }
  }
  function p(I) {
    process.nextTick(v, I);
  }
  function g(I, C) {
    return function(N, $) {
      I.then(function() {
        if (C[o]) {
          N(u(void 0, !0));
          return;
        }
        C[c](N, $);
      }, $);
    };
  }
  var w = Object.getPrototypeOf(function() {
  }), S = Object.setPrototypeOf((e = {
    get stream() {
      return this[l];
    },
    next: function() {
      var C = this, N = this[r];
      if (N !== null)
        return Promise.reject(N);
      if (this[o])
        return Promise.resolve(u(void 0, !0));
      if (this[l].destroyed)
        return new Promise(function(V, ne) {
          process.nextTick(function() {
            C[r] ? ne(C[r]) : V(u(void 0, !0));
          });
        });
      var $ = this[s], D;
      if ($)
        D = new Promise(g($, this));
      else {
        var H = this[l].read();
        if (H !== null)
          return Promise.resolve(u(H, !1));
        D = new Promise(this[c]);
      }
      return this[s] = D, D;
    }
  }, t(e, Symbol.asyncIterator, function() {
    return this;
  }), t(e, "return", function() {
    var C = this;
    return new Promise(function(N, $) {
      C[l].destroy(null, function(D) {
        if (D) {
          $(D);
          return;
        }
        N(u(void 0, !0));
      });
    });
  }), e), w), T = function(C) {
    var N, $ = Object.create(S, (N = {}, t(N, l, {
      value: C,
      writable: !0
    }), t(N, i, {
      value: null,
      writable: !0
    }), t(N, f, {
      value: null,
      writable: !0
    }), t(N, r, {
      value: null,
      writable: !0
    }), t(N, o, {
      value: C._readableState.endEmitted,
      writable: !0
    }), t(N, c, {
      value: function(H, V) {
        var ne = $[l].read();
        ne ? ($[s] = null, $[i] = null, $[f] = null, H(u(ne, !1))) : ($[i] = H, $[f] = V);
      },
      writable: !0
    }), N));
    return $[s] = null, n(C, function(D) {
      if (D && D.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var H = $[f];
        H !== null && ($[s] = null, $[i] = null, $[f] = null, H(D)), $[r] = D;
        return;
      }
      var V = $[i];
      V !== null && ($[s] = null, $[i] = null, $[f] = null, V(u(void 0, !0))), $[o] = !0;
    }), C.on("readable", p.bind(null, $)), $;
  };
  return ko = T, ko;
}
var jo, Th;
function m4() {
  return Th || (Th = 1, jo = function() {
    throw new Error("Readable.from is not available in the browser");
  }), jo;
}
var Do, Ph;
function Mc() {
  if (Ph)
    return Do;
  Ph = 1, Do = Q;
  var e;
  Q.ReadableState = ne, Zr.EventEmitter;
  var t = function(K, pe) {
    return K.listeners(pe).length;
  }, n = bp(), i = Nr.Buffer, f = Ne.Uint8Array || function() {
  };
  function r(W) {
    return i.from(W);
  }
  function o(W) {
    return i.isBuffer(W) || W instanceof f;
  }
  var s = xp(), c;
  s && s.debuglog ? c = s.debuglog("stream") : c = function() {
  };
  var l = b4(), u = Ep(), v = Sp(), p = v.getHighWaterMark, g = fi().codes, w = g.ERR_INVALID_ARG_TYPE, S = g.ERR_STREAM_PUSH_AFTER_EOF, T = g.ERR_METHOD_NOT_IMPLEMENTED, I = g.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, C, N, $;
  bt()(Q, n);
  var D = u.errorOrDestroy, H = ["error", "close", "destroy", "pause", "resume"];
  function V(W, K, pe) {
    if (typeof W.prependListener == "function")
      return W.prependListener(K, pe);
    !W._events || !W._events[K] ? W.on(K, pe) : Array.isArray(W._events[K]) ? W._events[K].unshift(pe) : W._events[K] = [pe, W._events[K]];
  }
  function ne(W, K, pe) {
    e = e || Bn(), W = W || {}, typeof pe != "boolean" && (pe = K instanceof e), this.objectMode = !!W.objectMode, pe && (this.objectMode = this.objectMode || !!W.readableObjectMode), this.highWaterMark = p(this, W, "readableHighWaterMark", pe), this.buffer = new l(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = W.emitClose !== !1, this.autoDestroy = !!W.autoDestroy, this.destroyed = !1, this.defaultEncoding = W.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, W.encoding && (C || (C = Uu().StringDecoder), this.decoder = new C(W.encoding), this.encoding = W.encoding);
  }
  function Q(W) {
    if (e = e || Bn(), !(this instanceof Q))
      return new Q(W);
    var K = this instanceof e;
    this._readableState = new ne(W, this, K), this.readable = !0, W && (typeof W.read == "function" && (this._read = W.read), typeof W.destroy == "function" && (this._destroy = W.destroy)), n.call(this);
  }
  Object.defineProperty(Q.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(K) {
      this._readableState && (this._readableState.destroyed = K);
    }
  }), Q.prototype.destroy = u.destroy, Q.prototype._undestroy = u.undestroy, Q.prototype._destroy = function(W, K) {
    K(W);
  }, Q.prototype.push = function(W, K) {
    var pe = this._readableState, me;
    return pe.objectMode ? me = !0 : typeof W == "string" && (K = K || pe.defaultEncoding, K !== pe.encoding && (W = i.from(W, K), K = ""), me = !0), se(this, W, K, !1, me);
  }, Q.prototype.unshift = function(W) {
    return se(this, W, null, !0, !1);
  };
  function se(W, K, pe, me, Ie) {
    c("readableAddChunk", K);
    var z = W._readableState;
    if (K === null)
      z.reading = !1, y(W, z);
    else {
      var P;
      if (Ie || (P = m(z, K)), P)
        D(W, P);
      else if (z.objectMode || K && K.length > 0)
        if (typeof K != "string" && !z.objectMode && Object.getPrototypeOf(K) !== i.prototype && (K = r(K)), me)
          z.endEmitted ? D(W, new I()) : k(W, z, K, !0);
        else if (z.ended)
          D(W, new S());
        else {
          if (z.destroyed)
            return !1;
          z.reading = !1, z.decoder && !pe ? (K = z.decoder.write(K), z.objectMode || K.length !== 0 ? k(W, z, K, !1) : B(W, z)) : k(W, z, K, !1);
        }
      else
        me || (z.reading = !1, B(W, z));
    }
    return !z.ended && (z.length < z.highWaterMark || z.length === 0);
  }
  function k(W, K, pe, me) {
    K.flowing && K.length === 0 && !K.sync ? (K.awaitDrain = 0, W.emit("data", pe)) : (K.length += K.objectMode ? 1 : pe.length, me ? K.buffer.unshift(pe) : K.buffer.push(pe), K.needReadable && x(W)), B(W, K);
  }
  function m(W, K) {
    var pe;
    return !o(K) && typeof K != "string" && K !== void 0 && !W.objectMode && (pe = new w("chunk", ["string", "Buffer", "Uint8Array"], K)), pe;
  }
  Q.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, Q.prototype.setEncoding = function(W) {
    C || (C = Uu().StringDecoder);
    var K = new C(W);
    this._readableState.decoder = K, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var pe = this._readableState.buffer.head, me = ""; pe !== null; )
      me += K.write(pe.data), pe = pe.next;
    return this._readableState.buffer.clear(), me !== "" && this._readableState.buffer.push(me), this._readableState.length = me.length, this;
  };
  var b = 1073741824;
  function a(W) {
    return W >= b ? W = b : (W--, W |= W >>> 1, W |= W >>> 2, W |= W >>> 4, W |= W >>> 8, W |= W >>> 16, W++), W;
  }
  function h(W, K) {
    return W <= 0 || K.length === 0 && K.ended ? 0 : K.objectMode ? 1 : W !== W ? K.flowing && K.length ? K.buffer.head.data.length : K.length : (W > K.highWaterMark && (K.highWaterMark = a(W)), W <= K.length ? W : K.ended ? K.length : (K.needReadable = !0, 0));
  }
  Q.prototype.read = function(W) {
    c("read", W), W = parseInt(W, 10);
    var K = this._readableState, pe = W;
    if (W !== 0 && (K.emittedReadable = !1), W === 0 && K.needReadable && ((K.highWaterMark !== 0 ? K.length >= K.highWaterMark : K.length > 0) || K.ended))
      return c("read: emitReadable", K.length, K.ended), K.length === 0 && K.ended ? ue(this) : x(this), null;
    if (W = h(W, K), W === 0 && K.ended)
      return K.length === 0 && ue(this), null;
    var me = K.needReadable;
    c("need readable", me), (K.length === 0 || K.length - W < K.highWaterMark) && (me = !0, c("length less than watermark", me)), K.ended || K.reading ? (me = !1, c("reading or ended", me)) : me && (c("do read"), K.reading = !0, K.sync = !0, K.length === 0 && (K.needReadable = !0), this._read(K.highWaterMark), K.sync = !1, K.reading || (W = h(pe, K)));
    var Ie;
    return W > 0 ? Ie = ee(W, K) : Ie = null, Ie === null ? (K.needReadable = K.length <= K.highWaterMark, W = 0) : (K.length -= W, K.awaitDrain = 0), K.length === 0 && (K.ended || (K.needReadable = !0), pe !== W && K.ended && ue(this)), Ie !== null && this.emit("data", Ie), Ie;
  };
  function y(W, K) {
    if (c("onEofChunk"), !K.ended) {
      if (K.decoder) {
        var pe = K.decoder.end();
        pe && pe.length && (K.buffer.push(pe), K.length += K.objectMode ? 1 : pe.length);
      }
      K.ended = !0, K.sync ? x(W) : (K.needReadable = !1, K.emittedReadable || (K.emittedReadable = !0, A(W)));
    }
  }
  function x(W) {
    var K = W._readableState;
    c("emitReadable", K.needReadable, K.emittedReadable), K.needReadable = !1, K.emittedReadable || (c("emitReadable", K.flowing), K.emittedReadable = !0, process.nextTick(A, W));
  }
  function A(W) {
    var K = W._readableState;
    c("emitReadable_", K.destroyed, K.length, K.ended), !K.destroyed && (K.length || K.ended) && (W.emit("readable"), K.emittedReadable = !1), K.needReadable = !K.flowing && !K.ended && K.length <= K.highWaterMark, J(W);
  }
  function B(W, K) {
    K.readingMore || (K.readingMore = !0, process.nextTick(_, W, K));
  }
  function _(W, K) {
    for (; !K.reading && !K.ended && (K.length < K.highWaterMark || K.flowing && K.length === 0); ) {
      var pe = K.length;
      if (c("maybeReadMore read 0"), W.read(0), pe === K.length)
        break;
    }
    K.readingMore = !1;
  }
  Q.prototype._read = function(W) {
    D(this, new T("_read()"));
  }, Q.prototype.pipe = function(W, K) {
    var pe = this, me = this._readableState;
    switch (me.pipesCount) {
      case 0:
        me.pipes = W;
        break;
      case 1:
        me.pipes = [me.pipes, W];
        break;
      default:
        me.pipes.push(W);
        break;
    }
    me.pipesCount += 1, c("pipe count=%d opts=%j", me.pipesCount, K);
    var Ie = (!K || K.end !== !1) && W !== process.stdout && W !== process.stderr, z = Ie ? L : je;
    me.endEmitted ? process.nextTick(z) : pe.once("end", z), W.on("unpipe", P);
    function P(Pe, ct) {
      c("onunpipe"), Pe === pe && ct && ct.hasUnpiped === !1 && (ct.hasUnpiped = !0, ce());
    }
    function L() {
      c("onend"), W.end();
    }
    var F = E(pe);
    W.on("drain", F);
    var fe = !1;
    function ce() {
      c("cleanup"), W.removeListener("close", Re), W.removeListener("finish", We), W.removeListener("drain", F), W.removeListener("error", Ce), W.removeListener("unpipe", P), pe.removeListener("end", L), pe.removeListener("end", je), pe.removeListener("data", we), fe = !0, me.awaitDrain && (!W._writableState || W._writableState.needDrain) && F();
    }
    pe.on("data", we);
    function we(Pe) {
      c("ondata");
      var ct = W.write(Pe);
      c("dest.write", ct), ct === !1 && ((me.pipesCount === 1 && me.pipes === W || me.pipesCount > 1 && Se(me.pipes, W) !== -1) && !fe && (c("false write response, pause", me.awaitDrain), me.awaitDrain++), pe.pause());
    }
    function Ce(Pe) {
      c("onerror", Pe), je(), W.removeListener("error", Ce), t(W, "error") === 0 && D(W, Pe);
    }
    V(W, "error", Ce);
    function Re() {
      W.removeListener("finish", We), je();
    }
    W.once("close", Re);
    function We() {
      c("onfinish"), W.removeListener("close", Re), je();
    }
    W.once("finish", We);
    function je() {
      c("unpipe"), pe.unpipe(W);
    }
    return W.emit("pipe", pe), me.flowing || (c("pipe resume"), pe.resume()), W;
  };
  function E(W) {
    return function() {
      var pe = W._readableState;
      c("pipeOnDrain", pe.awaitDrain), pe.awaitDrain && pe.awaitDrain--, pe.awaitDrain === 0 && t(W, "data") && (pe.flowing = !0, J(W));
    };
  }
  Q.prototype.unpipe = function(W) {
    var K = this._readableState, pe = {
      hasUnpiped: !1
    };
    if (K.pipesCount === 0)
      return this;
    if (K.pipesCount === 1)
      return W && W !== K.pipes ? this : (W || (W = K.pipes), K.pipes = null, K.pipesCount = 0, K.flowing = !1, W && W.emit("unpipe", this, pe), this);
    if (!W) {
      var me = K.pipes, Ie = K.pipesCount;
      K.pipes = null, K.pipesCount = 0, K.flowing = !1;
      for (var z = 0; z < Ie; z++)
        me[z].emit("unpipe", this, {
          hasUnpiped: !1
        });
      return this;
    }
    var P = Se(K.pipes, W);
    return P === -1 ? this : (K.pipes.splice(P, 1), K.pipesCount -= 1, K.pipesCount === 1 && (K.pipes = K.pipes[0]), W.emit("unpipe", this, pe), this);
  }, Q.prototype.on = function(W, K) {
    var pe = n.prototype.on.call(this, W, K), me = this._readableState;
    return W === "data" ? (me.readableListening = this.listenerCount("readable") > 0, me.flowing !== !1 && this.resume()) : W === "readable" && !me.endEmitted && !me.readableListening && (me.readableListening = me.needReadable = !0, me.flowing = !1, me.emittedReadable = !1, c("on readable", me.length, me.reading), me.length ? x(this) : me.reading || process.nextTick(M, this)), pe;
  }, Q.prototype.addListener = Q.prototype.on, Q.prototype.removeListener = function(W, K) {
    var pe = n.prototype.removeListener.call(this, W, K);
    return W === "readable" && process.nextTick(d, this), pe;
  }, Q.prototype.removeAllListeners = function(W) {
    var K = n.prototype.removeAllListeners.apply(this, arguments);
    return (W === "readable" || W === void 0) && process.nextTick(d, this), K;
  };
  function d(W) {
    var K = W._readableState;
    K.readableListening = W.listenerCount("readable") > 0, K.resumeScheduled && !K.paused ? K.flowing = !0 : W.listenerCount("data") > 0 && W.resume();
  }
  function M(W) {
    c("readable nexttick read 0"), W.read(0);
  }
  Q.prototype.resume = function() {
    var W = this._readableState;
    return W.flowing || (c("resume"), W.flowing = !W.readableListening, Z(this, W)), W.paused = !1, this;
  };
  function Z(W, K) {
    K.resumeScheduled || (K.resumeScheduled = !0, process.nextTick(re, W, K));
  }
  function re(W, K) {
    c("resume", K.reading), K.reading || W.read(0), K.resumeScheduled = !1, W.emit("resume"), J(W), K.flowing && !K.reading && W.read(0);
  }
  Q.prototype.pause = function() {
    return c("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (c("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function J(W) {
    var K = W._readableState;
    for (c("flow", K.flowing); K.flowing && W.read() !== null; )
      ;
  }
  Q.prototype.wrap = function(W) {
    var K = this, pe = this._readableState, me = !1;
    W.on("end", function() {
      if (c("wrapped end"), pe.decoder && !pe.ended) {
        var P = pe.decoder.end();
        P && P.length && K.push(P);
      }
      K.push(null);
    }), W.on("data", function(P) {
      if (c("wrapped data"), pe.decoder && (P = pe.decoder.write(P)), !(pe.objectMode && P == null) && !(!pe.objectMode && (!P || !P.length))) {
        var L = K.push(P);
        L || (me = !0, W.pause());
      }
    });
    for (var Ie in W)
      this[Ie] === void 0 && typeof W[Ie] == "function" && (this[Ie] = function(L) {
        return function() {
          return W[L].apply(W, arguments);
        };
      }(Ie));
    for (var z = 0; z < H.length; z++)
      W.on(H[z], this.emit.bind(this, H[z]));
    return this._read = function(P) {
      c("wrapped _read", P), me && (me = !1, W.resume());
    }, this;
  }, typeof Symbol == "function" && (Q.prototype[Symbol.asyncIterator] = function() {
    return N === void 0 && (N = g4()), N(this);
  }), Object.defineProperty(Q.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(Q.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(Q.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(K) {
      this._readableState && (this._readableState.flowing = K);
    }
  }), Q._fromList = ee, Object.defineProperty(Q.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function ee(W, K) {
    if (K.length === 0)
      return null;
    var pe;
    return K.objectMode ? pe = K.buffer.shift() : !W || W >= K.length ? (K.decoder ? pe = K.buffer.join("") : K.buffer.length === 1 ? pe = K.buffer.first() : pe = K.buffer.concat(K.length), K.buffer.clear()) : pe = K.buffer.consume(W, K.decoder), pe;
  }
  function ue(W) {
    var K = W._readableState;
    c("endReadable", K.endEmitted), K.endEmitted || (K.ended = !0, process.nextTick(le, K, W));
  }
  function le(W, K) {
    if (c("endReadableNT", W.endEmitted, W.length), !W.endEmitted && W.length === 0 && (W.endEmitted = !0, K.readable = !1, K.emit("end"), W.autoDestroy)) {
      var pe = K._writableState;
      (!pe || pe.autoDestroy && pe.finished) && K.destroy();
    }
  }
  typeof Symbol == "function" && (Q.from = function(W, K) {
    return $ === void 0 && ($ = m4()), $(Q, W, K);
  });
  function Se(W, K) {
    for (var pe = 0, me = W.length; pe < me; pe++)
      if (W[pe] === K)
        return pe;
    return -1;
  }
  return Do;
}
var qo, Ch;
function Ac() {
  if (Ch)
    return qo;
  Ch = 1, qo = s;
  var e = fi().codes, t = e.ERR_METHOD_NOT_IMPLEMENTED, n = e.ERR_MULTIPLE_CALLBACK, i = e.ERR_TRANSFORM_ALREADY_TRANSFORMING, f = e.ERR_TRANSFORM_WITH_LENGTH_0, r = Bn();
  bt()(s, r);
  function o(u, v) {
    var p = this._transformState;
    p.transforming = !1;
    var g = p.writecb;
    if (g === null)
      return this.emit("error", new n());
    p.writechunk = null, p.writecb = null, v != null && this.push(v), g(u);
    var w = this._readableState;
    w.reading = !1, (w.needReadable || w.length < w.highWaterMark) && this._read(w.highWaterMark);
  }
  function s(u) {
    if (!(this instanceof s))
      return new s(u);
    r.call(this, u), this._transformState = {
      afterTransform: o.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, u && (typeof u.transform == "function" && (this._transform = u.transform), typeof u.flush == "function" && (this._flush = u.flush)), this.on("prefinish", c);
  }
  function c() {
    var u = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(v, p) {
      l(u, v, p);
    }) : l(this, null, null);
  }
  s.prototype.push = function(u, v) {
    return this._transformState.needTransform = !1, r.prototype.push.call(this, u, v);
  }, s.prototype._transform = function(u, v, p) {
    p(new t("_transform()"));
  }, s.prototype._write = function(u, v, p) {
    var g = this._transformState;
    if (g.writecb = p, g.writechunk = u, g.writeencoding = v, !g.transforming) {
      var w = this._readableState;
      (g.needTransform || w.needReadable || w.length < w.highWaterMark) && this._read(w.highWaterMark);
    }
  }, s.prototype._read = function(u) {
    var v = this._transformState;
    v.writechunk !== null && !v.transforming ? (v.transforming = !0, this._transform(v.writechunk, v.writeencoding, v.afterTransform)) : v.needTransform = !0;
  }, s.prototype._destroy = function(u, v) {
    r.prototype._destroy.call(this, u, function(p) {
      v(p);
    });
  };
  function l(u, v, p) {
    if (v)
      return u.emit("error", v);
    if (p != null && u.push(p), u._writableState.length)
      throw new f();
    if (u._transformState.transforming)
      throw new i();
    return u.push(null);
  }
  return qo;
}
var Uo, Oh;
function Mp() {
  if (Oh)
    return Uo;
  Oh = 1, Uo = t;
  var e = Ac();
  bt()(t, e);
  function t(n) {
    if (!(this instanceof t))
      return new t(n);
    e.call(this, n);
  }
  return t.prototype._transform = function(n, i, f) {
    f(null, n);
  }, Uo;
}
var Fo, Nh;
function Ap() {
  if (Nh)
    return Fo;
  Nh = 1;
  var e;
  function t(p) {
    var g = !1;
    return function() {
      g || (g = !0, p.apply(void 0, arguments));
    };
  }
  var n = fi().codes, i = n.ERR_MISSING_ARGS, f = n.ERR_STREAM_DESTROYED;
  function r(p) {
    if (p)
      throw p;
  }
  function o(p) {
    return p.setHeader && typeof p.abort == "function";
  }
  function s(p, g, w, S) {
    S = t(S);
    var T = !1;
    p.on("close", function() {
      T = !0;
    }), e === void 0 && (e = Mf()), e(p, {
      readable: g,
      writable: w
    }, function(C) {
      if (C)
        return S(C);
      T = !0, S();
    });
    var I = !1;
    return function(C) {
      if (!T && !I) {
        if (I = !0, o(p))
          return p.abort();
        if (typeof p.destroy == "function")
          return p.destroy();
        S(C || new f("pipe"));
      }
    };
  }
  function c(p) {
    p();
  }
  function l(p, g) {
    return p.pipe(g);
  }
  function u(p) {
    return !p.length || typeof p[p.length - 1] != "function" ? r : p.pop();
  }
  function v() {
    for (var p = arguments.length, g = new Array(p), w = 0; w < p; w++)
      g[w] = arguments[w];
    var S = u(g);
    if (Array.isArray(g[0]) && (g = g[0]), g.length < 2)
      throw new i("streams");
    var T, I = g.map(function(C, N) {
      var $ = N < g.length - 1, D = N > 0;
      return s(C, $, D, function(H) {
        T || (T = H), H && I.forEach(c), !$ && (I.forEach(c), S(T));
      });
    });
    return g.reduce(l);
  }
  return Fo = v, Fo;
}
var Lh;
function Bp() {
  return Lh || (Lh = 1, function(e, t) {
    t = e.exports = Mc(), t.Stream = t, t.Readable = t, t.Writable = Sc(), t.Duplex = Bn(), t.Transform = Ac(), t.PassThrough = Mp(), t.finished = Mf(), t.pipeline = Ap();
  }(i4, gi)), gi;
}
var Ho, $h;
function Rp() {
  if ($h)
    return Ho;
  $h = 1;
  var e = gt().Buffer, t = Bp().Transform, n = bt();
  function i(r, o) {
    if (!e.isBuffer(r) && typeof r != "string")
      throw new TypeError(o + " must be a string or a buffer");
  }
  function f(r) {
    t.call(this), this._block = e.allocUnsafe(r), this._blockSize = r, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return n(f, t), f.prototype._transform = function(r, o, s) {
    var c = null;
    try {
      this.update(r, o);
    } catch (l) {
      c = l;
    }
    s(c);
  }, f.prototype._flush = function(r) {
    var o = null;
    try {
      this.push(this.digest());
    } catch (s) {
      o = s;
    }
    r(o);
  }, f.prototype.update = function(r, o) {
    if (i(r, "Data"), this._finalized)
      throw new Error("Digest already called");
    e.isBuffer(r) || (r = e.from(r, o));
    for (var s = this._block, c = 0; this._blockOffset + r.length - c >= this._blockSize; ) {
      for (var l = this._blockOffset; l < this._blockSize; )
        s[l++] = r[c++];
      this._update(), this._blockOffset = 0;
    }
    for (; c < r.length; )
      s[this._blockOffset++] = r[c++];
    for (var u = 0, v = r.length * 8; v > 0; ++u)
      this._length[u] += v, v = this._length[u] / 4294967296 | 0, v > 0 && (this._length[u] -= 4294967296 * v);
    return this;
  }, f.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, f.prototype.digest = function(r) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0;
    var o = this._digest();
    r !== void 0 && (o = o.toString(r)), this._block.fill(0), this._blockOffset = 0;
    for (var s = 0; s < 4; ++s)
      this._length[s] = 0;
    return o;
  }, f.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, Ho = f, Ho;
}
var zo, kh;
function Bc() {
  if (kh)
    return zo;
  kh = 1;
  var e = bt(), t = Rp(), n = gt().Buffer, i = new Array(16);
  function f() {
    t.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }
  e(f, t), f.prototype._update = function() {
    for (var u = i, v = 0; v < 16; ++v)
      u[v] = this._block.readInt32LE(v * 4);
    var p = this._a, g = this._b, w = this._c, S = this._d;
    p = o(p, g, w, S, u[0], 3614090360, 7), S = o(S, p, g, w, u[1], 3905402710, 12), w = o(w, S, p, g, u[2], 606105819, 17), g = o(g, w, S, p, u[3], 3250441966, 22), p = o(p, g, w, S, u[4], 4118548399, 7), S = o(S, p, g, w, u[5], 1200080426, 12), w = o(w, S, p, g, u[6], 2821735955, 17), g = o(g, w, S, p, u[7], 4249261313, 22), p = o(p, g, w, S, u[8], 1770035416, 7), S = o(S, p, g, w, u[9], 2336552879, 12), w = o(w, S, p, g, u[10], 4294925233, 17), g = o(g, w, S, p, u[11], 2304563134, 22), p = o(p, g, w, S, u[12], 1804603682, 7), S = o(S, p, g, w, u[13], 4254626195, 12), w = o(w, S, p, g, u[14], 2792965006, 17), g = o(g, w, S, p, u[15], 1236535329, 22), p = s(p, g, w, S, u[1], 4129170786, 5), S = s(S, p, g, w, u[6], 3225465664, 9), w = s(w, S, p, g, u[11], 643717713, 14), g = s(g, w, S, p, u[0], 3921069994, 20), p = s(p, g, w, S, u[5], 3593408605, 5), S = s(S, p, g, w, u[10], 38016083, 9), w = s(w, S, p, g, u[15], 3634488961, 14), g = s(g, w, S, p, u[4], 3889429448, 20), p = s(p, g, w, S, u[9], 568446438, 5), S = s(S, p, g, w, u[14], 3275163606, 9), w = s(w, S, p, g, u[3], 4107603335, 14), g = s(g, w, S, p, u[8], 1163531501, 20), p = s(p, g, w, S, u[13], 2850285829, 5), S = s(S, p, g, w, u[2], 4243563512, 9), w = s(w, S, p, g, u[7], 1735328473, 14), g = s(g, w, S, p, u[12], 2368359562, 20), p = c(p, g, w, S, u[5], 4294588738, 4), S = c(S, p, g, w, u[8], 2272392833, 11), w = c(w, S, p, g, u[11], 1839030562, 16), g = c(g, w, S, p, u[14], 4259657740, 23), p = c(p, g, w, S, u[1], 2763975236, 4), S = c(S, p, g, w, u[4], 1272893353, 11), w = c(w, S, p, g, u[7], 4139469664, 16), g = c(g, w, S, p, u[10], 3200236656, 23), p = c(p, g, w, S, u[13], 681279174, 4), S = c(S, p, g, w, u[0], 3936430074, 11), w = c(w, S, p, g, u[3], 3572445317, 16), g = c(g, w, S, p, u[6], 76029189, 23), p = c(p, g, w, S, u[9], 3654602809, 4), S = c(S, p, g, w, u[12], 3873151461, 11), w = c(w, S, p, g, u[15], 530742520, 16), g = c(g, w, S, p, u[2], 3299628645, 23), p = l(p, g, w, S, u[0], 4096336452, 6), S = l(S, p, g, w, u[7], 1126891415, 10), w = l(w, S, p, g, u[14], 2878612391, 15), g = l(g, w, S, p, u[5], 4237533241, 21), p = l(p, g, w, S, u[12], 1700485571, 6), S = l(S, p, g, w, u[3], 2399980690, 10), w = l(w, S, p, g, u[10], 4293915773, 15), g = l(g, w, S, p, u[1], 2240044497, 21), p = l(p, g, w, S, u[8], 1873313359, 6), S = l(S, p, g, w, u[15], 4264355552, 10), w = l(w, S, p, g, u[6], 2734768916, 15), g = l(g, w, S, p, u[13], 1309151649, 21), p = l(p, g, w, S, u[4], 4149444226, 6), S = l(S, p, g, w, u[11], 3174756917, 10), w = l(w, S, p, g, u[2], 718787259, 15), g = l(g, w, S, p, u[9], 3951481745, 21), this._a = this._a + p | 0, this._b = this._b + g | 0, this._c = this._c + w | 0, this._d = this._d + S | 0;
  }, f.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var u = n.allocUnsafe(16);
    return u.writeInt32LE(this._a, 0), u.writeInt32LE(this._b, 4), u.writeInt32LE(this._c, 8), u.writeInt32LE(this._d, 12), u;
  };
  function r(u, v) {
    return u << v | u >>> 32 - v;
  }
  function o(u, v, p, g, w, S, T) {
    return r(u + (v & p | ~v & g) + w + S | 0, T) + v | 0;
  }
  function s(u, v, p, g, w, S, T) {
    return r(u + (v & g | p & ~g) + w + S | 0, T) + v | 0;
  }
  function c(u, v, p, g, w, S, T) {
    return r(u + (v ^ p ^ g) + w + S | 0, T) + v | 0;
  }
  function l(u, v, p, g, w, S, T) {
    return r(u + (p ^ (v | ~g)) + w + S | 0, T) + v | 0;
  }
  return zo = f, zo;
}
var Vo, jh;
function Rc() {
  if (jh)
    return Vo;
  jh = 1;
  var e = Nr.Buffer, t = bt(), n = Rp(), i = new Array(16), f = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], r = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], o = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], s = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ], c = [0, 1518500249, 1859775393, 2400959708, 2840853838], l = [1352829926, 1548603684, 1836072691, 2053994217, 0];
  function u() {
    n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }
  t(u, n), u.prototype._update = function() {
    for (var I = i, C = 0; C < 16; ++C)
      I[C] = this._block.readInt32LE(C * 4);
    for (var N = this._a | 0, $ = this._b | 0, D = this._c | 0, H = this._d | 0, V = this._e | 0, ne = this._a | 0, Q = this._b | 0, se = this._c | 0, k = this._d | 0, m = this._e | 0, b = 0; b < 80; b += 1) {
      var a, h;
      b < 16 ? (a = p(N, $, D, H, V, I[f[b]], c[0], o[b]), h = T(ne, Q, se, k, m, I[r[b]], l[0], s[b])) : b < 32 ? (a = g(N, $, D, H, V, I[f[b]], c[1], o[b]), h = S(ne, Q, se, k, m, I[r[b]], l[1], s[b])) : b < 48 ? (a = w(N, $, D, H, V, I[f[b]], c[2], o[b]), h = w(ne, Q, se, k, m, I[r[b]], l[2], s[b])) : b < 64 ? (a = S(N, $, D, H, V, I[f[b]], c[3], o[b]), h = g(ne, Q, se, k, m, I[r[b]], l[3], s[b])) : (a = T(N, $, D, H, V, I[f[b]], c[4], o[b]), h = p(ne, Q, se, k, m, I[r[b]], l[4], s[b])), N = V, V = H, H = v(D, 10), D = $, $ = a, ne = m, m = k, k = v(se, 10), se = Q, Q = h;
    }
    var y = this._b + D + k | 0;
    this._b = this._c + H + m | 0, this._c = this._d + V + ne | 0, this._d = this._e + N + Q | 0, this._e = this._a + $ + se | 0, this._a = y;
  }, u.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var I = e.alloc ? e.alloc(20) : new e(20);
    return I.writeInt32LE(this._a, 0), I.writeInt32LE(this._b, 4), I.writeInt32LE(this._c, 8), I.writeInt32LE(this._d, 12), I.writeInt32LE(this._e, 16), I;
  };
  function v(I, C) {
    return I << C | I >>> 32 - C;
  }
  function p(I, C, N, $, D, H, V, ne) {
    return v(I + (C ^ N ^ $) + H + V | 0, ne) + D | 0;
  }
  function g(I, C, N, $, D, H, V, ne) {
    return v(I + (C & N | ~C & $) + H + V | 0, ne) + D | 0;
  }
  function w(I, C, N, $, D, H, V, ne) {
    return v(I + ((C | ~N) ^ $) + H + V | 0, ne) + D | 0;
  }
  function S(I, C, N, $, D, H, V, ne) {
    return v(I + (C & $ | N & ~$) + H + V | 0, ne) + D | 0;
  }
  function T(I, C, N, $, D, H, V, ne) {
    return v(I + (C ^ (N | ~$)) + H + V | 0, ne) + D | 0;
  }
  return Vo = u, Vo;
}
var Sa = {}, w4 = {
  get exports() {
    return Sa;
  },
  set exports(e) {
    Sa = e;
  }
}, Ko, Dh;
function oi() {
  if (Dh)
    return Ko;
  Dh = 1;
  var e = gt().Buffer;
  function t(n, i) {
    this._block = e.alloc(n), this._finalSize = i, this._blockSize = n, this._len = 0;
  }
  return t.prototype.update = function(n, i) {
    typeof n == "string" && (i = i || "utf8", n = e.from(n, i));
    for (var f = this._block, r = this._blockSize, o = n.length, s = this._len, c = 0; c < o; ) {
      for (var l = s % r, u = Math.min(o - c, r - l), v = 0; v < u; v++)
        f[l + v] = n[c + v];
      s += u, c += u, s % r === 0 && this._update(f);
    }
    return this._len += o, this;
  }, t.prototype.digest = function(n) {
    var i = this._len % this._blockSize;
    this._block[i] = 128, this._block.fill(0, i + 1), i >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var f = this._len * 8;
    if (f <= 4294967295)
      this._block.writeUInt32BE(f, this._blockSize - 4);
    else {
      var r = (f & 4294967295) >>> 0, o = (f - r) / 4294967296;
      this._block.writeUInt32BE(o, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4);
    }
    this._update(this._block);
    var s = this._hash();
    return n ? s.toString(n) : s;
  }, t.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, Ko = t, Ko;
}
var Go, qh;
function _4() {
  if (qh)
    return Go;
  qh = 1;
  var e = bt(), t = oi(), n = gt().Buffer, i = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], f = new Array(80);
  function r() {
    this.init(), this._w = f, t.call(this, 64, 56);
  }
  e(r, t), r.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function o(l) {
    return l << 5 | l >>> 27;
  }
  function s(l) {
    return l << 30 | l >>> 2;
  }
  function c(l, u, v, p) {
    return l === 0 ? u & v | ~u & p : l === 2 ? u & v | u & p | v & p : u ^ v ^ p;
  }
  return r.prototype._update = function(l) {
    for (var u = this._w, v = this._a | 0, p = this._b | 0, g = this._c | 0, w = this._d | 0, S = this._e | 0, T = 0; T < 16; ++T)
      u[T] = l.readInt32BE(T * 4);
    for (; T < 80; ++T)
      u[T] = u[T - 3] ^ u[T - 8] ^ u[T - 14] ^ u[T - 16];
    for (var I = 0; I < 80; ++I) {
      var C = ~~(I / 20), N = o(v) + c(C, p, g, w) + S + u[I] + i[C] | 0;
      S = w, w = g, g = s(p), p = v, v = N;
    }
    this._a = v + this._a | 0, this._b = p + this._b | 0, this._c = g + this._c | 0, this._d = w + this._d | 0, this._e = S + this._e | 0;
  }, r.prototype._hash = function() {
    var l = n.allocUnsafe(20);
    return l.writeInt32BE(this._a | 0, 0), l.writeInt32BE(this._b | 0, 4), l.writeInt32BE(this._c | 0, 8), l.writeInt32BE(this._d | 0, 12), l.writeInt32BE(this._e | 0, 16), l;
  }, Go = r, Go;
}
var Wo, Uh;
function x4() {
  if (Uh)
    return Wo;
  Uh = 1;
  var e = bt(), t = oi(), n = gt().Buffer, i = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], f = new Array(80);
  function r() {
    this.init(), this._w = f, t.call(this, 64, 56);
  }
  e(r, t), r.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function o(u) {
    return u << 1 | u >>> 31;
  }
  function s(u) {
    return u << 5 | u >>> 27;
  }
  function c(u) {
    return u << 30 | u >>> 2;
  }
  function l(u, v, p, g) {
    return u === 0 ? v & p | ~v & g : u === 2 ? v & p | v & g | p & g : v ^ p ^ g;
  }
  return r.prototype._update = function(u) {
    for (var v = this._w, p = this._a | 0, g = this._b | 0, w = this._c | 0, S = this._d | 0, T = this._e | 0, I = 0; I < 16; ++I)
      v[I] = u.readInt32BE(I * 4);
    for (; I < 80; ++I)
      v[I] = o(v[I - 3] ^ v[I - 8] ^ v[I - 14] ^ v[I - 16]);
    for (var C = 0; C < 80; ++C) {
      var N = ~~(C / 20), $ = s(p) + l(N, g, w, S) + T + v[C] + i[N] | 0;
      T = S, S = w, w = c(g), g = p, p = $;
    }
    this._a = p + this._a | 0, this._b = g + this._b | 0, this._c = w + this._c | 0, this._d = S + this._d | 0, this._e = T + this._e | 0;
  }, r.prototype._hash = function() {
    var u = n.allocUnsafe(20);
    return u.writeInt32BE(this._a | 0, 0), u.writeInt32BE(this._b | 0, 4), u.writeInt32BE(this._c | 0, 8), u.writeInt32BE(this._d | 0, 12), u.writeInt32BE(this._e | 0, 16), u;
  }, Wo = r, Wo;
}
var Jo, Fh;
function Ip() {
  if (Fh)
    return Jo;
  Fh = 1;
  var e = bt(), t = oi(), n = gt().Buffer, i = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], f = new Array(64);
  function r() {
    this.init(), this._w = f, t.call(this, 64, 56);
  }
  e(r, t), r.prototype.init = function() {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  };
  function o(p, g, w) {
    return w ^ p & (g ^ w);
  }
  function s(p, g, w) {
    return p & g | w & (p | g);
  }
  function c(p) {
    return (p >>> 2 | p << 30) ^ (p >>> 13 | p << 19) ^ (p >>> 22 | p << 10);
  }
  function l(p) {
    return (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7);
  }
  function u(p) {
    return (p >>> 7 | p << 25) ^ (p >>> 18 | p << 14) ^ p >>> 3;
  }
  function v(p) {
    return (p >>> 17 | p << 15) ^ (p >>> 19 | p << 13) ^ p >>> 10;
  }
  return r.prototype._update = function(p) {
    for (var g = this._w, w = this._a | 0, S = this._b | 0, T = this._c | 0, I = this._d | 0, C = this._e | 0, N = this._f | 0, $ = this._g | 0, D = this._h | 0, H = 0; H < 16; ++H)
      g[H] = p.readInt32BE(H * 4);
    for (; H < 64; ++H)
      g[H] = v(g[H - 2]) + g[H - 7] + u(g[H - 15]) + g[H - 16] | 0;
    for (var V = 0; V < 64; ++V) {
      var ne = D + l(C) + o(C, N, $) + i[V] + g[V] | 0, Q = c(w) + s(w, S, T) | 0;
      D = $, $ = N, N = C, C = I + ne | 0, I = T, T = S, S = w, w = ne + Q | 0;
    }
    this._a = w + this._a | 0, this._b = S + this._b | 0, this._c = T + this._c | 0, this._d = I + this._d | 0, this._e = C + this._e | 0, this._f = N + this._f | 0, this._g = $ + this._g | 0, this._h = D + this._h | 0;
  }, r.prototype._hash = function() {
    var p = n.allocUnsafe(32);
    return p.writeInt32BE(this._a, 0), p.writeInt32BE(this._b, 4), p.writeInt32BE(this._c, 8), p.writeInt32BE(this._d, 12), p.writeInt32BE(this._e, 16), p.writeInt32BE(this._f, 20), p.writeInt32BE(this._g, 24), p.writeInt32BE(this._h, 28), p;
  }, Jo = r, Jo;
}
var Xo, Hh;
function E4() {
  if (Hh)
    return Xo;
  Hh = 1;
  var e = bt(), t = Ip(), n = oi(), i = gt().Buffer, f = new Array(64);
  function r() {
    this.init(), this._w = f, n.call(this, 64, 56);
  }
  return e(r, t), r.prototype.init = function() {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, r.prototype._hash = function() {
    var o = i.allocUnsafe(28);
    return o.writeInt32BE(this._a, 0), o.writeInt32BE(this._b, 4), o.writeInt32BE(this._c, 8), o.writeInt32BE(this._d, 12), o.writeInt32BE(this._e, 16), o.writeInt32BE(this._f, 20), o.writeInt32BE(this._g, 24), o;
  }, Xo = r, Xo;
}
var Zo, zh;
function Tp() {
  if (zh)
    return Zo;
  zh = 1;
  var e = bt(), t = oi(), n = gt().Buffer, i = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ], f = new Array(160);
  function r() {
    this.init(), this._w = f, t.call(this, 128, 112);
  }
  e(r, t), r.prototype.init = function() {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  };
  function o(S, T, I) {
    return I ^ S & (T ^ I);
  }
  function s(S, T, I) {
    return S & T | I & (S | T);
  }
  function c(S, T) {
    return (S >>> 28 | T << 4) ^ (T >>> 2 | S << 30) ^ (T >>> 7 | S << 25);
  }
  function l(S, T) {
    return (S >>> 14 | T << 18) ^ (S >>> 18 | T << 14) ^ (T >>> 9 | S << 23);
  }
  function u(S, T) {
    return (S >>> 1 | T << 31) ^ (S >>> 8 | T << 24) ^ S >>> 7;
  }
  function v(S, T) {
    return (S >>> 1 | T << 31) ^ (S >>> 8 | T << 24) ^ (S >>> 7 | T << 25);
  }
  function p(S, T) {
    return (S >>> 19 | T << 13) ^ (T >>> 29 | S << 3) ^ S >>> 6;
  }
  function g(S, T) {
    return (S >>> 19 | T << 13) ^ (T >>> 29 | S << 3) ^ (S >>> 6 | T << 26);
  }
  function w(S, T) {
    return S >>> 0 < T >>> 0 ? 1 : 0;
  }
  return r.prototype._update = function(S) {
    for (var T = this._w, I = this._ah | 0, C = this._bh | 0, N = this._ch | 0, $ = this._dh | 0, D = this._eh | 0, H = this._fh | 0, V = this._gh | 0, ne = this._hh | 0, Q = this._al | 0, se = this._bl | 0, k = this._cl | 0, m = this._dl | 0, b = this._el | 0, a = this._fl | 0, h = this._gl | 0, y = this._hl | 0, x = 0; x < 32; x += 2)
      T[x] = S.readInt32BE(x * 4), T[x + 1] = S.readInt32BE(x * 4 + 4);
    for (; x < 160; x += 2) {
      var A = T[x - 30], B = T[x - 15 * 2 + 1], _ = u(A, B), E = v(B, A);
      A = T[x - 2 * 2], B = T[x - 2 * 2 + 1];
      var d = p(A, B), M = g(B, A), Z = T[x - 7 * 2], re = T[x - 7 * 2 + 1], J = T[x - 16 * 2], ee = T[x - 16 * 2 + 1], ue = E + re | 0, le = _ + Z + w(ue, E) | 0;
      ue = ue + M | 0, le = le + d + w(ue, M) | 0, ue = ue + ee | 0, le = le + J + w(ue, ee) | 0, T[x] = le, T[x + 1] = ue;
    }
    for (var Se = 0; Se < 160; Se += 2) {
      le = T[Se], ue = T[Se + 1];
      var W = s(I, C, N), K = s(Q, se, k), pe = c(I, Q), me = c(Q, I), Ie = l(D, b), z = l(b, D), P = i[Se], L = i[Se + 1], F = o(D, H, V), fe = o(b, a, h), ce = y + z | 0, we = ne + Ie + w(ce, y) | 0;
      ce = ce + fe | 0, we = we + F + w(ce, fe) | 0, ce = ce + L | 0, we = we + P + w(ce, L) | 0, ce = ce + ue | 0, we = we + le + w(ce, ue) | 0;
      var Ce = me + K | 0, Re = pe + W + w(Ce, me) | 0;
      ne = V, y = h, V = H, h = a, H = D, a = b, b = m + ce | 0, D = $ + we + w(b, m) | 0, $ = N, m = k, N = C, k = se, C = I, se = Q, Q = ce + Ce | 0, I = we + Re + w(Q, ce) | 0;
    }
    this._al = this._al + Q | 0, this._bl = this._bl + se | 0, this._cl = this._cl + k | 0, this._dl = this._dl + m | 0, this._el = this._el + b | 0, this._fl = this._fl + a | 0, this._gl = this._gl + h | 0, this._hl = this._hl + y | 0, this._ah = this._ah + I + w(this._al, Q) | 0, this._bh = this._bh + C + w(this._bl, se) | 0, this._ch = this._ch + N + w(this._cl, k) | 0, this._dh = this._dh + $ + w(this._dl, m) | 0, this._eh = this._eh + D + w(this._el, b) | 0, this._fh = this._fh + H + w(this._fl, a) | 0, this._gh = this._gh + V + w(this._gl, h) | 0, this._hh = this._hh + ne + w(this._hl, y) | 0;
  }, r.prototype._hash = function() {
    var S = n.allocUnsafe(64);
    function T(I, C, N) {
      S.writeInt32BE(I, N), S.writeInt32BE(C, N + 4);
    }
    return T(this._ah, this._al, 0), T(this._bh, this._bl, 8), T(this._ch, this._cl, 16), T(this._dh, this._dl, 24), T(this._eh, this._el, 32), T(this._fh, this._fl, 40), T(this._gh, this._gl, 48), T(this._hh, this._hl, 56), S;
  }, Zo = r, Zo;
}
var Yo, Vh;
function S4() {
  if (Vh)
    return Yo;
  Vh = 1;
  var e = bt(), t = Tp(), n = oi(), i = gt().Buffer, f = new Array(160);
  function r() {
    this.init(), this._w = f, n.call(this, 128, 112);
  }
  return e(r, t), r.prototype.init = function() {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, r.prototype._hash = function() {
    var o = i.allocUnsafe(48);
    function s(c, l, u) {
      o.writeInt32BE(c, u), o.writeInt32BE(l, u + 4);
    }
    return s(this._ah, this._al, 0), s(this._bh, this._bl, 8), s(this._ch, this._cl, 16), s(this._dh, this._dl, 24), s(this._eh, this._el, 32), s(this._fh, this._fl, 40), o;
  }, Yo = r, Yo;
}
var Kh;
function Ic() {
  if (Kh)
    return Sa;
  Kh = 1;
  var e = w4.exports = function(n) {
    n = n.toLowerCase();
    var i = e[n];
    if (!i)
      throw new Error(n + " is not supported (we accept pull requests)");
    return new i();
  };
  return e.sha = _4(), e.sha1 = x4(), e.sha224 = E4(), e.sha256 = Ip(), e.sha384 = S4(), e.sha512 = Tp(), Sa;
}
var Qo, Gh;
function M4() {
  if (Gh)
    return Qo;
  Gh = 1, Qo = n;
  var e = Zr.EventEmitter, t = bt();
  t(n, e), n.Readable = Mc(), n.Writable = Sc(), n.Duplex = Bn(), n.Transform = Ac(), n.PassThrough = Mp(), n.finished = Mf(), n.pipeline = Ap(), n.Stream = n;
  function n() {
    e.call(this);
  }
  return n.prototype.pipe = function(i, f) {
    var r = this;
    function o(g) {
      i.writable && i.write(g) === !1 && r.pause && r.pause();
    }
    r.on("data", o);
    function s() {
      r.readable && r.resume && r.resume();
    }
    i.on("drain", s), !i._isStdio && (!f || f.end !== !1) && (r.on("end", l), r.on("close", u));
    var c = !1;
    function l() {
      c || (c = !0, i.end());
    }
    function u() {
      c || (c = !0, typeof i.destroy == "function" && i.destroy());
    }
    function v(g) {
      if (p(), e.listenerCount(this, "error") === 0)
        throw g;
    }
    r.on("error", v), i.on("error", v);
    function p() {
      r.removeListener("data", o), i.removeListener("drain", s), r.removeListener("end", l), r.removeListener("close", u), r.removeListener("error", v), i.removeListener("error", v), r.removeListener("end", p), r.removeListener("close", p), i.removeListener("close", p);
    }
    return r.on("end", p), r.on("close", p), i.on("close", p), i.emit("pipe", r), i;
  }, Qo;
}
var es, Wh;
function hn() {
  if (Wh)
    return es;
  Wh = 1;
  var e = gt().Buffer, t = M4().Transform, n = Uu().StringDecoder, i = bt();
  function f(r) {
    t.call(this), this.hashMode = typeof r == "string", this.hashMode ? this[r] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }
  return i(f, t), f.prototype.update = function(r, o, s) {
    typeof r == "string" && (r = e.from(r, o));
    var c = this._update(r);
    return this.hashMode ? this : (s && (c = this._toString(c, s)), c);
  }, f.prototype.setAutoPadding = function() {
  }, f.prototype.getAuthTag = function() {
    throw new Error("trying to get auth tag in unsupported state");
  }, f.prototype.setAuthTag = function() {
    throw new Error("trying to set auth tag in unsupported state");
  }, f.prototype.setAAD = function() {
    throw new Error("trying to set aad in unsupported state");
  }, f.prototype._transform = function(r, o, s) {
    var c;
    try {
      this.hashMode ? this._update(r) : this.push(this._update(r));
    } catch (l) {
      c = l;
    } finally {
      s(c);
    }
  }, f.prototype._flush = function(r) {
    var o;
    try {
      this.push(this.__final());
    } catch (s) {
      o = s;
    }
    r(o);
  }, f.prototype._finalOrDigest = function(r) {
    var o = this.__final() || e.alloc(0);
    return r && (o = this._toString(o, r, !0)), o;
  }, f.prototype._toString = function(r, o, s) {
    if (this._decoder || (this._decoder = new n(o), this._encoding = o), this._encoding !== o)
      throw new Error("can't switch encodings");
    var c = this._decoder.write(r);
    return s && (c += this._decoder.end()), c;
  }, es = f, es;
}
var ts, Jh;
function Hi() {
  if (Jh)
    return ts;
  Jh = 1;
  var e = bt(), t = Bc(), n = Rc(), i = Ic(), f = hn();
  function r(o) {
    f.call(this, "digest"), this._hash = o;
  }
  return e(r, f), r.prototype._update = function(o) {
    this._hash.update(o);
  }, r.prototype._final = function() {
    return this._hash.digest();
  }, ts = function(s) {
    return s = s.toLowerCase(), s === "md5" ? new t() : s === "rmd160" || s === "ripemd160" ? new n() : new r(i(s));
  }, ts;
}
var rs, Xh;
function A4() {
  if (Xh)
    return rs;
  Xh = 1;
  var e = bt(), t = gt().Buffer, n = hn(), i = t.alloc(128), f = 64;
  function r(o, s) {
    n.call(this, "digest"), typeof s == "string" && (s = t.from(s)), this._alg = o, this._key = s, s.length > f ? s = o(s) : s.length < f && (s = t.concat([s, i], f));
    for (var c = this._ipad = t.allocUnsafe(f), l = this._opad = t.allocUnsafe(f), u = 0; u < f; u++)
      c[u] = s[u] ^ 54, l[u] = s[u] ^ 92;
    this._hash = [c];
  }
  return e(r, n), r.prototype._update = function(o) {
    this._hash.push(o);
  }, r.prototype._final = function() {
    var o = this._alg(t.concat(this._hash));
    return this._alg(t.concat([this._opad, o]));
  }, rs = r, rs;
}
var ns, Zh;
function Pp() {
  if (Zh)
    return ns;
  Zh = 1;
  var e = Bc();
  return ns = function(t) {
    return new e().update(t).digest();
  }, ns;
}
var is, Yh;
function Cp() {
  if (Yh)
    return is;
  Yh = 1;
  var e = bt(), t = A4(), n = hn(), i = gt().Buffer, f = Pp(), r = Rc(), o = Ic(), s = i.alloc(128);
  function c(l, u) {
    n.call(this, "digest"), typeof u == "string" && (u = i.from(u));
    var v = l === "sha512" || l === "sha384" ? 128 : 64;
    if (this._alg = l, this._key = u, u.length > v) {
      var p = l === "rmd160" ? new r() : o(l);
      u = p.update(u).digest();
    } else
      u.length < v && (u = i.concat([u, s], v));
    for (var g = this._ipad = i.allocUnsafe(v), w = this._opad = i.allocUnsafe(v), S = 0; S < v; S++)
      g[S] = u[S] ^ 54, w[S] = u[S] ^ 92;
    this._hash = l === "rmd160" ? new r() : o(l), this._hash.update(g);
  }
  return e(c, n), c.prototype._update = function(l) {
    this._hash.update(l);
  }, c.prototype._final = function() {
    var l = this._hash.digest(), u = this._alg === "rmd160" ? new r() : o(this._alg);
    return u.update(this._opad).update(l).digest();
  }, is = function(u, v) {
    return u = u.toLowerCase(), u === "rmd160" || u === "ripemd160" ? new c("rmd160", v) : u === "md5" ? new t(f, v) : new c(u, v);
  }, is;
}
var Ma = {}, B4 = {
  get exports() {
    return Ma;
  },
  set exports(e) {
    Ma = e;
  }
};
const R4 = {
  sign: "rsa",
  hash: "sha224",
  id: "302d300d06096086480165030402040500041c"
}, I4 = {
  sign: "rsa",
  hash: "sha256",
  id: "3031300d060960864801650304020105000420"
}, T4 = {
  sign: "rsa",
  hash: "sha384",
  id: "3041300d060960864801650304020205000430"
}, P4 = {
  sign: "rsa",
  hash: "sha512",
  id: "3051300d060960864801650304020305000440"
}, C4 = {
  sign: "ecdsa",
  hash: "sha256",
  id: ""
}, O4 = {
  sign: "ecdsa",
  hash: "sha224",
  id: ""
}, N4 = {
  sign: "ecdsa",
  hash: "sha384",
  id: ""
}, L4 = {
  sign: "ecdsa",
  hash: "sha512",
  id: ""
}, $4 = {
  sign: "dsa",
  hash: "sha1",
  id: ""
}, k4 = {
  sign: "rsa",
  hash: "rmd160",
  id: "3021300906052b2403020105000414"
}, j4 = {
  sign: "rsa",
  hash: "md5",
  id: "3020300c06082a864886f70d020505000410"
}, Op = {
  sha224WithRSAEncryption: R4,
  "RSA-SHA224": {
    sign: "ecdsa/rsa",
    hash: "sha224",
    id: "302d300d06096086480165030402040500041c"
  },
  sha256WithRSAEncryption: I4,
  "RSA-SHA256": {
    sign: "ecdsa/rsa",
    hash: "sha256",
    id: "3031300d060960864801650304020105000420"
  },
  sha384WithRSAEncryption: T4,
  "RSA-SHA384": {
    sign: "ecdsa/rsa",
    hash: "sha384",
    id: "3041300d060960864801650304020205000430"
  },
  sha512WithRSAEncryption: P4,
  "RSA-SHA512": {
    sign: "ecdsa/rsa",
    hash: "sha512",
    id: "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    sign: "rsa",
    hash: "sha1",
    id: "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    sign: "ecdsa",
    hash: "sha1",
    id: ""
  },
  sha256: C4,
  sha224: O4,
  sha384: N4,
  sha512: L4,
  "DSA-SHA": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  "DSA-SHA1": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  DSA: $4,
  "DSA-WITH-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-WITH-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-WITH-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-WITH-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-RIPEMD160": {
    sign: "dsa",
    hash: "rmd160",
    id: ""
  },
  ripemd160WithRSA: k4,
  "RSA-RIPEMD160": {
    sign: "rsa",
    hash: "rmd160",
    id: "3021300906052b2403020105000414"
  },
  md5WithRSAEncryption: j4,
  "RSA-MD5": {
    sign: "rsa",
    hash: "md5",
    id: "3020300c06082a864886f70d020505000410"
  }
};
var Qh;
function D4() {
  return Qh || (Qh = 1, function(e) {
    e.exports = Op;
  }(B4)), Ma;
}
var ia = {}, as, el;
function Np() {
  if (el)
    return as;
  el = 1;
  var e = Math.pow(2, 30) - 1;
  return as = function(t, n) {
    if (typeof t != "number")
      throw new TypeError("Iterations not a number");
    if (t < 0)
      throw new TypeError("Bad iterations");
    if (typeof n != "number")
      throw new TypeError("Key length not a number");
    if (n < 0 || n > e || n !== n)
      throw new TypeError("Bad key length");
  }, as;
}
var fs, tl;
function Lp() {
  if (tl)
    return fs;
  tl = 1;
  var e;
  if (Ne.process && Ne.process.browser)
    e = "utf-8";
  else if (Ne.process && Ne.process.version) {
    var t = parseInt(process.version.split(".")[0].slice(1), 10);
    e = t >= 6 ? "utf-8" : "binary";
  } else
    e = "utf-8";
  return fs = e, fs;
}
var os, rl;
function $p() {
  if (rl)
    return os;
  rl = 1;
  var e = gt().Buffer;
  return os = function(t, n, i) {
    if (e.isBuffer(t))
      return t;
    if (typeof t == "string")
      return e.from(t, n);
    if (ArrayBuffer.isView(t))
      return e.from(t.buffer);
    throw new TypeError(i + " must be a string, a Buffer, a typed array or a DataView");
  }, os;
}
var ss, nl;
function kp() {
  if (nl)
    return ss;
  nl = 1;
  var e = Pp(), t = Rc(), n = Ic(), i = gt().Buffer, f = Np(), r = Lp(), o = $p(), s = i.alloc(128), c = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  function l(p, g, w) {
    var S = u(p), T = p === "sha512" || p === "sha384" ? 128 : 64;
    g.length > T ? g = S(g) : g.length < T && (g = i.concat([g, s], T));
    for (var I = i.allocUnsafe(T + c[p]), C = i.allocUnsafe(T + c[p]), N = 0; N < T; N++)
      I[N] = g[N] ^ 54, C[N] = g[N] ^ 92;
    var $ = i.allocUnsafe(T + w + 4);
    I.copy($, 0, 0, T), this.ipad1 = $, this.ipad2 = I, this.opad = C, this.alg = p, this.blocksize = T, this.hash = S, this.size = c[p];
  }
  l.prototype.run = function(p, g) {
    p.copy(g, this.blocksize);
    var w = this.hash(g);
    return w.copy(this.opad, this.blocksize), this.hash(this.opad);
  };
  function u(p) {
    function g(S) {
      return n(p).update(S).digest();
    }
    function w(S) {
      return new t().update(S).digest();
    }
    return p === "rmd160" || p === "ripemd160" ? w : p === "md5" ? e : g;
  }
  function v(p, g, w, S, T) {
    f(w, S), p = o(p, r, "Password"), g = o(g, r, "Salt"), T = T || "sha1";
    var I = new l(T, p, g.length), C = i.allocUnsafe(S), N = i.allocUnsafe(g.length + 4);
    g.copy(N, 0, 0, g.length);
    for (var $ = 0, D = c[T], H = Math.ceil(S / D), V = 1; V <= H; V++) {
      N.writeUInt32BE(V, g.length);
      for (var ne = I.run(N, I.ipad1), Q = ne, se = 1; se < w; se++) {
        Q = I.run(Q, I.ipad2);
        for (var k = 0; k < D; k++)
          ne[k] ^= Q[k];
      }
      ne.copy(C, $), $ += D;
    }
    return C;
  }
  return ss = v, ss;
}
var us, il;
function q4() {
  if (il)
    return us;
  il = 1;
  var e = gt().Buffer, t = Np(), n = Lp(), i = kp(), f = $p(), r, o = Ne.crypto && Ne.crypto.subtle, s = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  }, c = [];
  function l(w) {
    if (Ne.process && !Ne.process.browser || !o || !o.importKey || !o.deriveBits)
      return Promise.resolve(!1);
    if (c[w] !== void 0)
      return c[w];
    r = r || e.alloc(8);
    var S = p(r, r, 10, 128, w).then(function() {
      return !0;
    }).catch(function() {
      return !1;
    });
    return c[w] = S, S;
  }
  var u;
  function v() {
    return u || (Ne.process && Ne.process.nextTick ? u = Ne.process.nextTick : Ne.queueMicrotask ? u = Ne.queueMicrotask : Ne.setImmediate ? u = Ne.setImmediate : u = Ne.setTimeout, u);
  }
  function p(w, S, T, I, C) {
    return o.importKey(
      "raw",
      w,
      { name: "PBKDF2" },
      !1,
      ["deriveBits"]
    ).then(function(N) {
      return o.deriveBits({
        name: "PBKDF2",
        salt: S,
        iterations: T,
        hash: {
          name: C
        }
      }, N, I << 3);
    }).then(function(N) {
      return e.from(N);
    });
  }
  function g(w, S) {
    w.then(function(T) {
      v()(function() {
        S(null, T);
      });
    }, function(T) {
      v()(function() {
        S(T);
      });
    });
  }
  return us = function(w, S, T, I, C, N) {
    typeof C == "function" && (N = C, C = void 0), C = C || "sha1";
    var $ = s[C.toLowerCase()];
    if (!$ || typeof Ne.Promise != "function") {
      v()(function() {
        var D;
        try {
          D = i(w, S, T, I, C);
        } catch (H) {
          return N(H);
        }
        N(null, D);
      });
      return;
    }
    if (t(T, I), w = f(w, n, "Password"), S = f(S, n, "Salt"), typeof N != "function")
      throw new Error("No callback provided to pbkdf2");
    g(l($).then(function(D) {
      return D ? p(w, S, T, I, $) : i(w, S, T, I, C);
    }), N);
  }, us;
}
var al;
function jp() {
  return al || (al = 1, ia.pbkdf2 = q4(), ia.pbkdf2Sync = kp()), ia;
}
var vr = {}, vn = {}, sr = {}, fl;
function Dp() {
  if (fl)
    return sr;
  fl = 1, sr.readUInt32BE = function(f, r) {
    var o = f[0 + r] << 24 | f[1 + r] << 16 | f[2 + r] << 8 | f[3 + r];
    return o >>> 0;
  }, sr.writeUInt32BE = function(f, r, o) {
    f[0 + o] = r >>> 24, f[1 + o] = r >>> 16 & 255, f[2 + o] = r >>> 8 & 255, f[3 + o] = r & 255;
  }, sr.ip = function(f, r, o, s) {
    for (var c = 0, l = 0, u = 6; u >= 0; u -= 2) {
      for (var v = 0; v <= 24; v += 8)
        c <<= 1, c |= r >>> v + u & 1;
      for (var v = 0; v <= 24; v += 8)
        c <<= 1, c |= f >>> v + u & 1;
    }
    for (var u = 6; u >= 0; u -= 2) {
      for (var v = 1; v <= 25; v += 8)
        l <<= 1, l |= r >>> v + u & 1;
      for (var v = 1; v <= 25; v += 8)
        l <<= 1, l |= f >>> v + u & 1;
    }
    o[s + 0] = c >>> 0, o[s + 1] = l >>> 0;
  }, sr.rip = function(f, r, o, s) {
    for (var c = 0, l = 0, u = 0; u < 4; u++)
      for (var v = 24; v >= 0; v -= 8)
        c <<= 1, c |= r >>> v + u & 1, c <<= 1, c |= f >>> v + u & 1;
    for (var u = 4; u < 8; u++)
      for (var v = 24; v >= 0; v -= 8)
        l <<= 1, l |= r >>> v + u & 1, l <<= 1, l |= f >>> v + u & 1;
    o[s + 0] = c >>> 0, o[s + 1] = l >>> 0;
  }, sr.pc1 = function(f, r, o, s) {
    for (var c = 0, l = 0, u = 7; u >= 5; u--) {
      for (var v = 0; v <= 24; v += 8)
        c <<= 1, c |= r >> v + u & 1;
      for (var v = 0; v <= 24; v += 8)
        c <<= 1, c |= f >> v + u & 1;
    }
    for (var v = 0; v <= 24; v += 8)
      c <<= 1, c |= r >> v + u & 1;
    for (var u = 1; u <= 3; u++) {
      for (var v = 0; v <= 24; v += 8)
        l <<= 1, l |= r >> v + u & 1;
      for (var v = 0; v <= 24; v += 8)
        l <<= 1, l |= f >> v + u & 1;
    }
    for (var v = 0; v <= 24; v += 8)
      l <<= 1, l |= f >> v + u & 1;
    o[s + 0] = c >>> 0, o[s + 1] = l >>> 0;
  }, sr.r28shl = function(f, r) {
    return f << r & 268435455 | f >>> 28 - r;
  };
  var e = [
    // inL => outL
    14,
    11,
    17,
    4,
    27,
    23,
    25,
    0,
    13,
    22,
    7,
    18,
    5,
    9,
    16,
    24,
    2,
    20,
    12,
    21,
    1,
    8,
    15,
    26,
    // inR => outR
    15,
    4,
    25,
    19,
    9,
    1,
    26,
    16,
    5,
    11,
    23,
    8,
    12,
    7,
    17,
    0,
    22,
    3,
    10,
    14,
    6,
    20,
    27,
    24
  ];
  sr.pc2 = function(f, r, o, s) {
    for (var c = 0, l = 0, u = e.length >>> 1, v = 0; v < u; v++)
      c <<= 1, c |= f >>> e[v] & 1;
    for (var v = u; v < e.length; v++)
      l <<= 1, l |= r >>> e[v] & 1;
    o[s + 0] = c >>> 0, o[s + 1] = l >>> 0;
  }, sr.expand = function(f, r, o) {
    var s = 0, c = 0;
    s = (f & 1) << 5 | f >>> 27;
    for (var l = 23; l >= 15; l -= 4)
      s <<= 6, s |= f >>> l & 63;
    for (var l = 11; l >= 3; l -= 4)
      c |= f >>> l & 63, c <<= 6;
    c |= (f & 31) << 1 | f >>> 31, r[o + 0] = s >>> 0, r[o + 1] = c >>> 0;
  };
  var t = [
    14,
    0,
    4,
    15,
    13,
    7,
    1,
    4,
    2,
    14,
    15,
    2,
    11,
    13,
    8,
    1,
    3,
    10,
    10,
    6,
    6,
    12,
    12,
    11,
    5,
    9,
    9,
    5,
    0,
    3,
    7,
    8,
    4,
    15,
    1,
    12,
    14,
    8,
    8,
    2,
    13,
    4,
    6,
    9,
    2,
    1,
    11,
    7,
    15,
    5,
    12,
    11,
    9,
    3,
    7,
    14,
    3,
    10,
    10,
    0,
    5,
    6,
    0,
    13,
    15,
    3,
    1,
    13,
    8,
    4,
    14,
    7,
    6,
    15,
    11,
    2,
    3,
    8,
    4,
    14,
    9,
    12,
    7,
    0,
    2,
    1,
    13,
    10,
    12,
    6,
    0,
    9,
    5,
    11,
    10,
    5,
    0,
    13,
    14,
    8,
    7,
    10,
    11,
    1,
    10,
    3,
    4,
    15,
    13,
    4,
    1,
    2,
    5,
    11,
    8,
    6,
    12,
    7,
    6,
    12,
    9,
    0,
    3,
    5,
    2,
    14,
    15,
    9,
    10,
    13,
    0,
    7,
    9,
    0,
    14,
    9,
    6,
    3,
    3,
    4,
    15,
    6,
    5,
    10,
    1,
    2,
    13,
    8,
    12,
    5,
    7,
    14,
    11,
    12,
    4,
    11,
    2,
    15,
    8,
    1,
    13,
    1,
    6,
    10,
    4,
    13,
    9,
    0,
    8,
    6,
    15,
    9,
    3,
    8,
    0,
    7,
    11,
    4,
    1,
    15,
    2,
    14,
    12,
    3,
    5,
    11,
    10,
    5,
    14,
    2,
    7,
    12,
    7,
    13,
    13,
    8,
    14,
    11,
    3,
    5,
    0,
    6,
    6,
    15,
    9,
    0,
    10,
    3,
    1,
    4,
    2,
    7,
    8,
    2,
    5,
    12,
    11,
    1,
    12,
    10,
    4,
    14,
    15,
    9,
    10,
    3,
    6,
    15,
    9,
    0,
    0,
    6,
    12,
    10,
    11,
    1,
    7,
    13,
    13,
    8,
    15,
    9,
    1,
    4,
    3,
    5,
    14,
    11,
    5,
    12,
    2,
    7,
    8,
    2,
    4,
    14,
    2,
    14,
    12,
    11,
    4,
    2,
    1,
    12,
    7,
    4,
    10,
    7,
    11,
    13,
    6,
    1,
    8,
    5,
    5,
    0,
    3,
    15,
    15,
    10,
    13,
    3,
    0,
    9,
    14,
    8,
    9,
    6,
    4,
    11,
    2,
    8,
    1,
    12,
    11,
    7,
    10,
    1,
    13,
    14,
    7,
    2,
    8,
    13,
    15,
    6,
    9,
    15,
    12,
    0,
    5,
    9,
    6,
    10,
    3,
    4,
    0,
    5,
    14,
    3,
    12,
    10,
    1,
    15,
    10,
    4,
    15,
    2,
    9,
    7,
    2,
    12,
    6,
    9,
    8,
    5,
    0,
    6,
    13,
    1,
    3,
    13,
    4,
    14,
    14,
    0,
    7,
    11,
    5,
    3,
    11,
    8,
    9,
    4,
    14,
    3,
    15,
    2,
    5,
    12,
    2,
    9,
    8,
    5,
    12,
    15,
    3,
    10,
    7,
    11,
    0,
    14,
    4,
    1,
    10,
    7,
    1,
    6,
    13,
    0,
    11,
    8,
    6,
    13,
    4,
    13,
    11,
    0,
    2,
    11,
    14,
    7,
    15,
    4,
    0,
    9,
    8,
    1,
    13,
    10,
    3,
    14,
    12,
    3,
    9,
    5,
    7,
    12,
    5,
    2,
    10,
    15,
    6,
    8,
    1,
    6,
    1,
    6,
    4,
    11,
    11,
    13,
    13,
    8,
    12,
    1,
    3,
    4,
    7,
    10,
    14,
    7,
    10,
    9,
    15,
    5,
    6,
    0,
    8,
    15,
    0,
    14,
    5,
    2,
    9,
    3,
    2,
    12,
    13,
    1,
    2,
    15,
    8,
    13,
    4,
    8,
    6,
    10,
    15,
    3,
    11,
    7,
    1,
    4,
    10,
    12,
    9,
    5,
    3,
    6,
    14,
    11,
    5,
    0,
    0,
    14,
    12,
    9,
    7,
    2,
    7,
    2,
    11,
    1,
    4,
    14,
    1,
    7,
    9,
    4,
    12,
    10,
    14,
    8,
    2,
    13,
    0,
    15,
    6,
    12,
    10,
    9,
    13,
    0,
    15,
    3,
    3,
    5,
    5,
    6,
    8,
    11
  ];
  sr.substitute = function(f, r) {
    for (var o = 0, s = 0; s < 4; s++) {
      var c = f >>> 18 - s * 6 & 63, l = t[s * 64 + c];
      o <<= 4, o |= l;
    }
    for (var s = 0; s < 4; s++) {
      var c = r >>> 18 - s * 6 & 63, l = t[4 * 64 + s * 64 + c];
      o <<= 4, o |= l;
    }
    return o >>> 0;
  };
  var n = [
    16,
    25,
    12,
    11,
    3,
    20,
    4,
    15,
    31,
    17,
    9,
    6,
    27,
    14,
    1,
    22,
    30,
    24,
    8,
    18,
    0,
    5,
    29,
    23,
    13,
    19,
    2,
    26,
    10,
    21,
    28,
    7
  ];
  return sr.permute = function(f) {
    for (var r = 0, o = 0; o < n.length; o++)
      r <<= 1, r |= f >>> n[o] & 1;
    return r >>> 0;
  }, sr.padSplit = function(f, r, o) {
    for (var s = f.toString(2); s.length < r; )
      s = "0" + s;
    for (var c = [], l = 0; l < r; l += o)
      c.push(s.slice(l, l + o));
    return c.join(" ");
  }, sr;
}
var cs, ol;
function Mr() {
  if (ol)
    return cs;
  ol = 1, cs = e;
  function e(t, n) {
    if (!t)
      throw new Error(n || "Assertion failed");
  }
  return e.equal = function(n, i, f) {
    if (n != i)
      throw new Error(f || "Assertion failed: " + n + " != " + i);
  }, cs;
}
var hs, sl;
function Tc() {
  if (sl)
    return hs;
  sl = 1;
  var e = Mr();
  function t(n) {
    this.options = n, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0;
  }
  return hs = t, t.prototype._init = function() {
  }, t.prototype.update = function(i) {
    return i.length === 0 ? [] : this.type === "decrypt" ? this._updateDecrypt(i) : this._updateEncrypt(i);
  }, t.prototype._buffer = function(i, f) {
    for (var r = Math.min(this.buffer.length - this.bufferOff, i.length - f), o = 0; o < r; o++)
      this.buffer[this.bufferOff + o] = i[f + o];
    return this.bufferOff += r, r;
  }, t.prototype._flushBuffer = function(i, f) {
    return this._update(this.buffer, 0, i, f), this.bufferOff = 0, this.blockSize;
  }, t.prototype._updateEncrypt = function(i) {
    var f = 0, r = 0, o = (this.bufferOff + i.length) / this.blockSize | 0, s = new Array(o * this.blockSize);
    this.bufferOff !== 0 && (f += this._buffer(i, f), this.bufferOff === this.buffer.length && (r += this._flushBuffer(s, r)));
    for (var c = i.length - (i.length - f) % this.blockSize; f < c; f += this.blockSize)
      this._update(i, f, s, r), r += this.blockSize;
    for (; f < i.length; f++, this.bufferOff++)
      this.buffer[this.bufferOff] = i[f];
    return s;
  }, t.prototype._updateDecrypt = function(i) {
    for (var f = 0, r = 0, o = Math.ceil((this.bufferOff + i.length) / this.blockSize) - 1, s = new Array(o * this.blockSize); o > 0; o--)
      f += this._buffer(i, f), r += this._flushBuffer(s, r);
    return f += this._buffer(i, f), s;
  }, t.prototype.final = function(i) {
    var f;
    i && (f = this.update(i));
    var r;
    return this.type === "encrypt" ? r = this._finalEncrypt() : r = this._finalDecrypt(), f ? f.concat(r) : r;
  }, t.prototype._pad = function(i, f) {
    if (f === 0)
      return !1;
    for (; f < i.length; )
      i[f++] = 0;
    return !0;
  }, t.prototype._finalEncrypt = function() {
    if (!this._pad(this.buffer, this.bufferOff))
      return [];
    var i = new Array(this.blockSize);
    return this._update(this.buffer, 0, i, 0), i;
  }, t.prototype._unpad = function(i) {
    return i;
  }, t.prototype._finalDecrypt = function() {
    e.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var i = new Array(this.blockSize);
    return this._flushBuffer(i, 0), this._unpad(i);
  }, hs;
}
var ls, ul;
function qp() {
  if (ul)
    return ls;
  ul = 1;
  var e = Mr(), t = bt(), n = Dp(), i = Tc();
  function f() {
    this.tmp = new Array(2), this.keys = null;
  }
  function r(s) {
    i.call(this, s);
    var c = new f();
    this._desState = c, this.deriveKeys(c, s.key);
  }
  t(r, i), ls = r, r.create = function(c) {
    return new r(c);
  };
  var o = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1
  ];
  return r.prototype.deriveKeys = function(c, l) {
    c.keys = new Array(16 * 2), e.equal(l.length, this.blockSize, "Invalid key length");
    var u = n.readUInt32BE(l, 0), v = n.readUInt32BE(l, 4);
    n.pc1(u, v, c.tmp, 0), u = c.tmp[0], v = c.tmp[1];
    for (var p = 0; p < c.keys.length; p += 2) {
      var g = o[p >>> 1];
      u = n.r28shl(u, g), v = n.r28shl(v, g), n.pc2(u, v, c.keys, p);
    }
  }, r.prototype._update = function(c, l, u, v) {
    var p = this._desState, g = n.readUInt32BE(c, l), w = n.readUInt32BE(c, l + 4);
    n.ip(g, w, p.tmp, 0), g = p.tmp[0], w = p.tmp[1], this.type === "encrypt" ? this._encrypt(p, g, w, p.tmp, 0) : this._decrypt(p, g, w, p.tmp, 0), g = p.tmp[0], w = p.tmp[1], n.writeUInt32BE(u, g, v), n.writeUInt32BE(u, w, v + 4);
  }, r.prototype._pad = function(c, l) {
    for (var u = c.length - l, v = l; v < c.length; v++)
      c[v] = u;
    return !0;
  }, r.prototype._unpad = function(c) {
    for (var l = c[c.length - 1], u = c.length - l; u < c.length; u++)
      e.equal(c[u], l);
    return c.slice(0, c.length - l);
  }, r.prototype._encrypt = function(c, l, u, v, p) {
    for (var g = l, w = u, S = 0; S < c.keys.length; S += 2) {
      var T = c.keys[S], I = c.keys[S + 1];
      n.expand(w, c.tmp, 0), T ^= c.tmp[0], I ^= c.tmp[1];
      var C = n.substitute(T, I), N = n.permute(C), $ = w;
      w = (g ^ N) >>> 0, g = $;
    }
    n.rip(w, g, v, p);
  }, r.prototype._decrypt = function(c, l, u, v, p) {
    for (var g = u, w = l, S = c.keys.length - 2; S >= 0; S -= 2) {
      var T = c.keys[S], I = c.keys[S + 1];
      n.expand(g, c.tmp, 0), T ^= c.tmp[0], I ^= c.tmp[1];
      var C = n.substitute(T, I), N = n.permute(C), $ = g;
      g = (w ^ N) >>> 0, w = $;
    }
    n.rip(g, w, v, p);
  }, ls;
}
var ds = {}, cl;
function U4() {
  if (cl)
    return ds;
  cl = 1;
  var e = Mr(), t = bt(), n = {};
  function i(r) {
    e.equal(r.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var o = 0; o < this.iv.length; o++)
      this.iv[o] = r[o];
  }
  function f(r) {
    function o(u) {
      r.call(this, u), this._cbcInit();
    }
    t(o, r);
    for (var s = Object.keys(n), c = 0; c < s.length; c++) {
      var l = s[c];
      o.prototype[l] = n[l];
    }
    return o.create = function(v) {
      return new o(v);
    }, o;
  }
  return ds.instantiate = f, n._cbcInit = function() {
    var o = new i(this.options.iv);
    this._cbcState = o;
  }, n._update = function(o, s, c, l) {
    var u = this._cbcState, v = this.constructor.super_.prototype, p = u.iv;
    if (this.type === "encrypt") {
      for (var g = 0; g < this.blockSize; g++)
        p[g] ^= o[s + g];
      v._update.call(this, p, 0, c, l);
      for (var g = 0; g < this.blockSize; g++)
        p[g] = c[l + g];
    } else {
      v._update.call(this, o, s, c, l);
      for (var g = 0; g < this.blockSize; g++)
        c[l + g] ^= p[g];
      for (var g = 0; g < this.blockSize; g++)
        p[g] = o[s + g];
    }
  }, ds;
}
var ps, hl;
function F4() {
  if (hl)
    return ps;
  hl = 1;
  var e = Mr(), t = bt(), n = Tc(), i = qp();
  function f(o, s) {
    e.equal(s.length, 24, "Invalid key length");
    var c = s.slice(0, 8), l = s.slice(8, 16), u = s.slice(16, 24);
    o === "encrypt" ? this.ciphers = [
      i.create({ type: "encrypt", key: c }),
      i.create({ type: "decrypt", key: l }),
      i.create({ type: "encrypt", key: u })
    ] : this.ciphers = [
      i.create({ type: "decrypt", key: u }),
      i.create({ type: "encrypt", key: l }),
      i.create({ type: "decrypt", key: c })
    ];
  }
  function r(o) {
    n.call(this, o);
    var s = new f(this.type, this.options.key);
    this._edeState = s;
  }
  return t(r, n), ps = r, r.create = function(s) {
    return new r(s);
  }, r.prototype._update = function(s, c, l, u) {
    var v = this._edeState;
    v.ciphers[0]._update(s, c, l, u), v.ciphers[1]._update(l, u, l, u), v.ciphers[2]._update(l, u, l, u);
  }, r.prototype._pad = i.prototype._pad, r.prototype._unpad = i.prototype._unpad, ps;
}
var ll;
function H4() {
  return ll || (ll = 1, vn.utils = Dp(), vn.Cipher = Tc(), vn.DES = qp(), vn.CBC = U4(), vn.EDE = F4()), vn;
}
var vs, dl;
function z4() {
  if (dl)
    return vs;
  dl = 1;
  var e = hn(), t = H4(), n = bt(), i = gt().Buffer, f = {
    "des-ede3-cbc": t.CBC.instantiate(t.EDE),
    "des-ede3": t.EDE,
    "des-ede-cbc": t.CBC.instantiate(t.EDE),
    "des-ede": t.EDE,
    "des-cbc": t.CBC.instantiate(t.DES),
    "des-ecb": t.DES
  };
  f.des = f["des-cbc"], f.des3 = f["des-ede3-cbc"], vs = r, n(r, e);
  function r(o) {
    e.call(this);
    var s = o.mode.toLowerCase(), c = f[s], l;
    o.decrypt ? l = "decrypt" : l = "encrypt";
    var u = o.key;
    i.isBuffer(u) || (u = i.from(u)), (s === "des-ede" || s === "des-ede-cbc") && (u = i.concat([u, u.slice(0, 8)]));
    var v = o.iv;
    i.isBuffer(v) || (v = i.from(v)), this._des = c.create({
      key: u,
      iv: v,
      type: l
    });
  }
  return r.prototype._update = function(o) {
    return i.from(this._des.update(o));
  }, r.prototype._final = function() {
    return i.from(this._des.final());
  }, vs;
}
var br = {}, aa = {}, fa = {}, pl;
function V4() {
  return pl || (pl = 1, fa.encrypt = function(e, t) {
    return e._cipher.encryptBlock(t);
  }, fa.decrypt = function(e, t) {
    return e._cipher.decryptBlock(t);
  }), fa;
}
var oa = {}, bs, vl;
function zi() {
  return vl || (vl = 1, bs = function(t, n) {
    for (var i = Math.min(t.length, n.length), f = new Buffer(i), r = 0; r < i; ++r)
      f[r] = t[r] ^ n[r];
    return f;
  }), bs;
}
var bl;
function K4() {
  if (bl)
    return oa;
  bl = 1;
  var e = zi();
  return oa.encrypt = function(t, n) {
    var i = e(n, t._prev);
    return t._prev = t._cipher.encryptBlock(i), t._prev;
  }, oa.decrypt = function(t, n) {
    var i = t._prev;
    t._prev = n;
    var f = t._cipher.decryptBlock(n);
    return e(f, i);
  }, oa;
}
var ys = {}, yl;
function G4() {
  if (yl)
    return ys;
  yl = 1;
  var e = gt().Buffer, t = zi();
  function n(i, f, r) {
    var o = f.length, s = t(f, i._cache);
    return i._cache = i._cache.slice(o), i._prev = e.concat([i._prev, r ? f : s]), s;
  }
  return ys.encrypt = function(i, f, r) {
    for (var o = e.allocUnsafe(0), s; f.length; )
      if (i._cache.length === 0 && (i._cache = i._cipher.encryptBlock(i._prev), i._prev = e.allocUnsafe(0)), i._cache.length <= f.length)
        s = i._cache.length, o = e.concat([o, n(i, f.slice(0, s), r)]), f = f.slice(s);
      else {
        o = e.concat([o, n(i, f, r)]);
        break;
      }
    return o;
  }, ys;
}
var gs = {}, gl;
function W4() {
  if (gl)
    return gs;
  gl = 1;
  var e = gt().Buffer;
  function t(n, i, f) {
    var r = n._cipher.encryptBlock(n._prev), o = r[0] ^ i;
    return n._prev = e.concat([
      n._prev.slice(1),
      e.from([f ? i : o])
    ]), o;
  }
  return gs.encrypt = function(n, i, f) {
    for (var r = i.length, o = e.allocUnsafe(r), s = -1; ++s < r; )
      o[s] = t(n, i[s], f);
    return o;
  }, gs;
}
var ms = {}, ml;
function J4() {
  if (ml)
    return ms;
  ml = 1;
  var e = gt().Buffer;
  function t(i, f, r) {
    for (var o, s = -1, c = 8, l = 0, u, v; ++s < c; )
      o = i._cipher.encryptBlock(i._prev), u = f & 1 << 7 - s ? 128 : 0, v = o[0] ^ u, l += (v & 128) >> s % 8, i._prev = n(i._prev, r ? u : v);
    return l;
  }
  function n(i, f) {
    var r = i.length, o = -1, s = e.allocUnsafe(i.length);
    for (i = e.concat([i, e.from([f])]); ++o < r; )
      s[o] = i[o] << 1 | i[o + 1] >> 7;
    return s;
  }
  return ms.encrypt = function(i, f, r) {
    for (var o = f.length, s = e.allocUnsafe(o), c = -1; ++c < o; )
      s[c] = t(i, f[c], r);
    return s;
  }, ms;
}
var ws = {}, wl;
function X4() {
  if (wl)
    return ws;
  wl = 1;
  var e = zi();
  function t(n) {
    return n._prev = n._cipher.encryptBlock(n._prev), n._prev;
  }
  return ws.encrypt = function(n, i) {
    for (; n._cache.length < i.length; )
      n._cache = Buffer.concat([n._cache, t(n)]);
    var f = n._cache.slice(0, i.length);
    return n._cache = n._cache.slice(i.length), e(i, f);
  }, ws;
}
var _s = {}, xs, _l;
function Up() {
  if (_l)
    return xs;
  _l = 1;
  function e(t) {
    for (var n = t.length, i; n--; )
      if (i = t.readUInt8(n), i === 255)
        t.writeUInt8(0, n);
      else {
        i++, t.writeUInt8(i, n);
        break;
      }
  }
  return xs = e, xs;
}
var xl;
function El() {
  if (xl)
    return _s;
  xl = 1;
  var e = zi(), t = gt().Buffer, n = Up();
  function i(r) {
    var o = r._cipher.encryptBlockRaw(r._prev);
    return n(r._prev), o;
  }
  var f = 16;
  return _s.encrypt = function(r, o) {
    var s = Math.ceil(o.length / f), c = r._cache.length;
    r._cache = t.concat([
      r._cache,
      t.allocUnsafe(s * f)
    ]);
    for (var l = 0; l < s; l++) {
      var u = i(r), v = c + l * f;
      r._cache.writeUInt32BE(u[0], v + 0), r._cache.writeUInt32BE(u[1], v + 4), r._cache.writeUInt32BE(u[2], v + 8), r._cache.writeUInt32BE(u[3], v + 12);
    }
    var p = r._cache.slice(0, o.length);
    return r._cache = r._cache.slice(o.length), e(o, p);
  }, _s;
}
const Z4 = {
  cipher: "AES",
  key: 128,
  iv: 16,
  mode: "CBC",
  type: "block"
}, Y4 = {
  cipher: "AES",
  key: 192,
  iv: 16,
  mode: "CBC",
  type: "block"
}, Q4 = {
  cipher: "AES",
  key: 256,
  iv: 16,
  mode: "CBC",
  type: "block"
}, Fp = {
  "aes-128-ecb": {
    cipher: "AES",
    key: 128,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-192-ecb": {
    cipher: "AES",
    key: 192,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-256-ecb": {
    cipher: "AES",
    key: 256,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-128-cbc": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-192-cbc": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-256-cbc": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  aes128: Z4,
  aes192: Y4,
  aes256: Q4,
  "aes-128-cfb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-192-cfb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-256-cfb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-128-cfb8": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-192-cfb8": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-256-cfb8": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-128-cfb1": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-192-cfb1": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-256-cfb1": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-128-ofb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-192-ofb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-256-ofb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-128-ctr": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-192-ctr": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-256-ctr": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-128-gcm": {
    cipher: "AES",
    key: 128,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-192-gcm": {
    cipher: "AES",
    key: 192,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-256-gcm": {
    cipher: "AES",
    key: 256,
    iv: 12,
    mode: "GCM",
    type: "auth"
  }
};
var Es, Sl;
function Pc() {
  if (Sl)
    return Es;
  Sl = 1;
  var e = {
    ECB: V4(),
    CBC: K4(),
    CFB: G4(),
    CFB8: W4(),
    CFB1: J4(),
    OFB: X4(),
    CTR: El(),
    GCM: El()
  }, t = Fp;
  for (var n in t)
    t[n].module = e[t[n].mode];
  return Es = t, Es;
}
var Ss = {}, Ml;
function Af() {
  if (Ml)
    return Ss;
  Ml = 1;
  var e = gt().Buffer;
  function t(s) {
    e.isBuffer(s) || (s = e.from(s));
    for (var c = s.length / 4 | 0, l = new Array(c), u = 0; u < c; u++)
      l[u] = s.readUInt32BE(u * 4);
    return l;
  }
  function n(s) {
    for (var c = 0; c < s.length; s++)
      s[c] = 0;
  }
  function i(s, c, l, u, v) {
    for (var p = l[0], g = l[1], w = l[2], S = l[3], T = s[0] ^ c[0], I = s[1] ^ c[1], C = s[2] ^ c[2], N = s[3] ^ c[3], $, D, H, V, ne = 4, Q = 1; Q < v; Q++)
      $ = p[T >>> 24] ^ g[I >>> 16 & 255] ^ w[C >>> 8 & 255] ^ S[N & 255] ^ c[ne++], D = p[I >>> 24] ^ g[C >>> 16 & 255] ^ w[N >>> 8 & 255] ^ S[T & 255] ^ c[ne++], H = p[C >>> 24] ^ g[N >>> 16 & 255] ^ w[T >>> 8 & 255] ^ S[I & 255] ^ c[ne++], V = p[N >>> 24] ^ g[T >>> 16 & 255] ^ w[I >>> 8 & 255] ^ S[C & 255] ^ c[ne++], T = $, I = D, C = H, N = V;
    return $ = (u[T >>> 24] << 24 | u[I >>> 16 & 255] << 16 | u[C >>> 8 & 255] << 8 | u[N & 255]) ^ c[ne++], D = (u[I >>> 24] << 24 | u[C >>> 16 & 255] << 16 | u[N >>> 8 & 255] << 8 | u[T & 255]) ^ c[ne++], H = (u[C >>> 24] << 24 | u[N >>> 16 & 255] << 16 | u[T >>> 8 & 255] << 8 | u[I & 255]) ^ c[ne++], V = (u[N >>> 24] << 24 | u[T >>> 16 & 255] << 16 | u[I >>> 8 & 255] << 8 | u[C & 255]) ^ c[ne++], $ = $ >>> 0, D = D >>> 0, H = H >>> 0, V = V >>> 0, [$, D, H, V];
  }
  var f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], r = function() {
    for (var s = new Array(256), c = 0; c < 256; c++)
      c < 128 ? s[c] = c << 1 : s[c] = c << 1 ^ 283;
    for (var l = [], u = [], v = [[], [], [], []], p = [[], [], [], []], g = 0, w = 0, S = 0; S < 256; ++S) {
      var T = w ^ w << 1 ^ w << 2 ^ w << 3 ^ w << 4;
      T = T >>> 8 ^ T & 255 ^ 99, l[g] = T, u[T] = g;
      var I = s[g], C = s[I], N = s[C], $ = s[T] * 257 ^ T * 16843008;
      v[0][g] = $ << 24 | $ >>> 8, v[1][g] = $ << 16 | $ >>> 16, v[2][g] = $ << 8 | $ >>> 24, v[3][g] = $, $ = N * 16843009 ^ C * 65537 ^ I * 257 ^ g * 16843008, p[0][T] = $ << 24 | $ >>> 8, p[1][T] = $ << 16 | $ >>> 16, p[2][T] = $ << 8 | $ >>> 24, p[3][T] = $, g === 0 ? g = w = 1 : (g = I ^ s[s[s[N ^ I]]], w ^= s[s[w]]);
    }
    return {
      SBOX: l,
      INV_SBOX: u,
      SUB_MIX: v,
      INV_SUB_MIX: p
    };
  }();
  function o(s) {
    this._key = t(s), this._reset();
  }
  return o.blockSize = 4 * 4, o.keySize = 256 / 8, o.prototype.blockSize = o.blockSize, o.prototype.keySize = o.keySize, o.prototype._reset = function() {
    for (var s = this._key, c = s.length, l = c + 6, u = (l + 1) * 4, v = [], p = 0; p < c; p++)
      v[p] = s[p];
    for (p = c; p < u; p++) {
      var g = v[p - 1];
      p % c === 0 ? (g = g << 8 | g >>> 24, g = r.SBOX[g >>> 24] << 24 | r.SBOX[g >>> 16 & 255] << 16 | r.SBOX[g >>> 8 & 255] << 8 | r.SBOX[g & 255], g ^= f[p / c | 0] << 24) : c > 6 && p % c === 4 && (g = r.SBOX[g >>> 24] << 24 | r.SBOX[g >>> 16 & 255] << 16 | r.SBOX[g >>> 8 & 255] << 8 | r.SBOX[g & 255]), v[p] = v[p - c] ^ g;
    }
    for (var w = [], S = 0; S < u; S++) {
      var T = u - S, I = v[T - (S % 4 ? 0 : 4)];
      S < 4 || T <= 4 ? w[S] = I : w[S] = r.INV_SUB_MIX[0][r.SBOX[I >>> 24]] ^ r.INV_SUB_MIX[1][r.SBOX[I >>> 16 & 255]] ^ r.INV_SUB_MIX[2][r.SBOX[I >>> 8 & 255]] ^ r.INV_SUB_MIX[3][r.SBOX[I & 255]];
    }
    this._nRounds = l, this._keySchedule = v, this._invKeySchedule = w;
  }, o.prototype.encryptBlockRaw = function(s) {
    return s = t(s), i(s, this._keySchedule, r.SUB_MIX, r.SBOX, this._nRounds);
  }, o.prototype.encryptBlock = function(s) {
    var c = this.encryptBlockRaw(s), l = e.allocUnsafe(16);
    return l.writeUInt32BE(c[0], 0), l.writeUInt32BE(c[1], 4), l.writeUInt32BE(c[2], 8), l.writeUInt32BE(c[3], 12), l;
  }, o.prototype.decryptBlock = function(s) {
    s = t(s);
    var c = s[1];
    s[1] = s[3], s[3] = c;
    var l = i(s, this._invKeySchedule, r.INV_SUB_MIX, r.INV_SBOX, this._nRounds), u = e.allocUnsafe(16);
    return u.writeUInt32BE(l[0], 0), u.writeUInt32BE(l[3], 4), u.writeUInt32BE(l[2], 8), u.writeUInt32BE(l[1], 12), u;
  }, o.prototype.scrub = function() {
    n(this._keySchedule), n(this._invKeySchedule), n(this._key);
  }, Ss.AES = o, Ss;
}
var Ms, Al;
function ew() {
  if (Al)
    return Ms;
  Al = 1;
  var e = gt().Buffer, t = e.alloc(16, 0);
  function n(r) {
    return [
      r.readUInt32BE(0),
      r.readUInt32BE(4),
      r.readUInt32BE(8),
      r.readUInt32BE(12)
    ];
  }
  function i(r) {
    var o = e.allocUnsafe(16);
    return o.writeUInt32BE(r[0] >>> 0, 0), o.writeUInt32BE(r[1] >>> 0, 4), o.writeUInt32BE(r[2] >>> 0, 8), o.writeUInt32BE(r[3] >>> 0, 12), o;
  }
  function f(r) {
    this.h = r, this.state = e.alloc(16, 0), this.cache = e.allocUnsafe(0);
  }
  return f.prototype.ghash = function(r) {
    for (var o = -1; ++o < r.length; )
      this.state[o] ^= r[o];
    this._multiply();
  }, f.prototype._multiply = function() {
    for (var r = n(this.h), o = [0, 0, 0, 0], s, c, l, u = -1; ++u < 128; ) {
      for (c = (this.state[~~(u / 8)] & 1 << 7 - u % 8) !== 0, c && (o[0] ^= r[0], o[1] ^= r[1], o[2] ^= r[2], o[3] ^= r[3]), l = (r[3] & 1) !== 0, s = 3; s > 0; s--)
        r[s] = r[s] >>> 1 | (r[s - 1] & 1) << 31;
      r[0] = r[0] >>> 1, l && (r[0] = r[0] ^ 225 << 24);
    }
    this.state = i(o);
  }, f.prototype.update = function(r) {
    this.cache = e.concat([this.cache, r]);
    for (var o; this.cache.length >= 16; )
      o = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(o);
  }, f.prototype.final = function(r, o) {
    return this.cache.length && this.ghash(e.concat([this.cache, t], 16)), this.ghash(i([0, r, 0, o])), this.state;
  }, Ms = f, Ms;
}
var As, Bl;
function Hp() {
  if (Bl)
    return As;
  Bl = 1;
  var e = Af(), t = gt().Buffer, n = hn(), i = bt(), f = ew(), r = zi(), o = Up();
  function s(u, v) {
    var p = 0;
    u.length !== v.length && p++;
    for (var g = Math.min(u.length, v.length), w = 0; w < g; ++w)
      p += u[w] ^ v[w];
    return p;
  }
  function c(u, v, p) {
    if (v.length === 12)
      return u._finID = t.concat([v, t.from([0, 0, 0, 1])]), t.concat([v, t.from([0, 0, 0, 2])]);
    var g = new f(p), w = v.length, S = w % 16;
    g.update(v), S && (S = 16 - S, g.update(t.alloc(S, 0))), g.update(t.alloc(8, 0));
    var T = w * 8, I = t.alloc(8);
    I.writeUIntBE(T, 0, 8), g.update(I), u._finID = g.state;
    var C = t.from(u._finID);
    return o(C), C;
  }
  function l(u, v, p, g) {
    n.call(this);
    var w = t.alloc(4, 0);
    this._cipher = new e.AES(v);
    var S = this._cipher.encryptBlock(w);
    this._ghash = new f(S), p = c(this, p, S), this._prev = t.from(p), this._cache = t.allocUnsafe(0), this._secCache = t.allocUnsafe(0), this._decrypt = g, this._alen = 0, this._len = 0, this._mode = u, this._authTag = null, this._called = !1;
  }
  return i(l, n), l.prototype._update = function(u) {
    if (!this._called && this._alen) {
      var v = 16 - this._alen % 16;
      v < 16 && (v = t.alloc(v, 0), this._ghash.update(v));
    }
    this._called = !0;
    var p = this._mode.encrypt(this, u);
    return this._decrypt ? this._ghash.update(u) : this._ghash.update(p), this._len += u.length, p;
  }, l.prototype._final = function() {
    if (this._decrypt && !this._authTag)
      throw new Error("Unsupported state or unable to authenticate data");
    var u = r(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && s(u, this._authTag))
      throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = u, this._cipher.scrub();
  }, l.prototype.getAuthTag = function() {
    if (this._decrypt || !t.isBuffer(this._authTag))
      throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag;
  }, l.prototype.setAuthTag = function(v) {
    if (!this._decrypt)
      throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = v;
  }, l.prototype.setAAD = function(v) {
    if (this._called)
      throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(v), this._alen += v.length;
  }, As = l, As;
}
var Bs, Rl;
function zp() {
  if (Rl)
    return Bs;
  Rl = 1;
  var e = Af(), t = gt().Buffer, n = hn(), i = bt();
  function f(r, o, s, c) {
    n.call(this), this._cipher = new e.AES(o), this._prev = t.from(s), this._cache = t.allocUnsafe(0), this._secCache = t.allocUnsafe(0), this._decrypt = c, this._mode = r;
  }
  return i(f, n), f.prototype._update = function(r) {
    return this._mode.encrypt(this, r, this._decrypt);
  }, f.prototype._final = function() {
    this._cipher.scrub();
  }, Bs = f, Bs;
}
var Rs, Il;
function Bf() {
  if (Il)
    return Rs;
  Il = 1;
  var e = gt().Buffer, t = Bc();
  function n(i, f, r, o) {
    if (e.isBuffer(i) || (i = e.from(i, "binary")), f && (e.isBuffer(f) || (f = e.from(f, "binary")), f.length !== 8))
      throw new RangeError("salt should be Buffer with 8 byte length");
    for (var s = r / 8, c = e.alloc(s), l = e.alloc(o || 0), u = e.alloc(0); s > 0 || o > 0; ) {
      var v = new t();
      v.update(u), v.update(i), f && v.update(f), u = v.digest();
      var p = 0;
      if (s > 0) {
        var g = c.length - s;
        p = Math.min(s, u.length), u.copy(c, g, 0, p), s -= p;
      }
      if (p < u.length && o > 0) {
        var w = l.length - o, S = Math.min(o, u.length - p);
        u.copy(l, w, p, p + S), o -= S;
      }
    }
    return u.fill(0), { key: c, iv: l };
  }
  return Rs = n, Rs;
}
var Tl;
function tw() {
  if (Tl)
    return aa;
  Tl = 1;
  var e = Pc(), t = Hp(), n = gt().Buffer, i = zp(), f = hn(), r = Af(), o = Bf(), s = bt();
  function c(g, w, S) {
    f.call(this), this._cache = new u(), this._cipher = new r.AES(w), this._prev = n.from(S), this._mode = g, this._autopadding = !0;
  }
  s(c, f), c.prototype._update = function(g) {
    this._cache.add(g);
    for (var w, S, T = []; w = this._cache.get(); )
      S = this._mode.encrypt(this, w), T.push(S);
    return n.concat(T);
  };
  var l = n.alloc(16, 16);
  c.prototype._final = function() {
    var g = this._cache.flush();
    if (this._autopadding)
      return g = this._mode.encrypt(this, g), this._cipher.scrub(), g;
    if (!g.equals(l))
      throw this._cipher.scrub(), new Error("data not multiple of block length");
  }, c.prototype.setAutoPadding = function(g) {
    return this._autopadding = !!g, this;
  };
  function u() {
    this.cache = n.allocUnsafe(0);
  }
  u.prototype.add = function(g) {
    this.cache = n.concat([this.cache, g]);
  }, u.prototype.get = function() {
    if (this.cache.length > 15) {
      var g = this.cache.slice(0, 16);
      return this.cache = this.cache.slice(16), g;
    }
    return null;
  }, u.prototype.flush = function() {
    for (var g = 16 - this.cache.length, w = n.allocUnsafe(g), S = -1; ++S < g; )
      w.writeUInt8(g, S);
    return n.concat([this.cache, w]);
  };
  function v(g, w, S) {
    var T = e[g.toLowerCase()];
    if (!T)
      throw new TypeError("invalid suite type");
    if (typeof w == "string" && (w = n.from(w)), w.length !== T.key / 8)
      throw new TypeError("invalid key length " + w.length);
    if (typeof S == "string" && (S = n.from(S)), T.mode !== "GCM" && S.length !== T.iv)
      throw new TypeError("invalid iv length " + S.length);
    return T.type === "stream" ? new i(T.module, w, S) : T.type === "auth" ? new t(T.module, w, S) : new c(T.module, w, S);
  }
  function p(g, w) {
    var S = e[g.toLowerCase()];
    if (!S)
      throw new TypeError("invalid suite type");
    var T = o(w, !1, S.key, S.iv);
    return v(g, T.key, T.iv);
  }
  return aa.createCipheriv = v, aa.createCipher = p, aa;
}
var sa = {}, Pl;
function rw() {
  if (Pl)
    return sa;
  Pl = 1;
  var e = Hp(), t = gt().Buffer, n = Pc(), i = zp(), f = hn(), r = Af(), o = Bf(), s = bt();
  function c(g, w, S) {
    f.call(this), this._cache = new l(), this._last = void 0, this._cipher = new r.AES(w), this._prev = t.from(S), this._mode = g, this._autopadding = !0;
  }
  s(c, f), c.prototype._update = function(g) {
    this._cache.add(g);
    for (var w, S, T = []; w = this._cache.get(this._autopadding); )
      S = this._mode.decrypt(this, w), T.push(S);
    return t.concat(T);
  }, c.prototype._final = function() {
    var g = this._cache.flush();
    if (this._autopadding)
      return u(this._mode.decrypt(this, g));
    if (g)
      throw new Error("data not multiple of block length");
  }, c.prototype.setAutoPadding = function(g) {
    return this._autopadding = !!g, this;
  };
  function l() {
    this.cache = t.allocUnsafe(0);
  }
  l.prototype.add = function(g) {
    this.cache = t.concat([this.cache, g]);
  }, l.prototype.get = function(g) {
    var w;
    if (g) {
      if (this.cache.length > 16)
        return w = this.cache.slice(0, 16), this.cache = this.cache.slice(16), w;
    } else if (this.cache.length >= 16)
      return w = this.cache.slice(0, 16), this.cache = this.cache.slice(16), w;
    return null;
  }, l.prototype.flush = function() {
    if (this.cache.length)
      return this.cache;
  };
  function u(g) {
    var w = g[15];
    if (w < 1 || w > 16)
      throw new Error("unable to decrypt data");
    for (var S = -1; ++S < w; )
      if (g[S + (16 - w)] !== w)
        throw new Error("unable to decrypt data");
    if (w !== 16)
      return g.slice(0, 16 - w);
  }
  function v(g, w, S) {
    var T = n[g.toLowerCase()];
    if (!T)
      throw new TypeError("invalid suite type");
    if (typeof S == "string" && (S = t.from(S)), T.mode !== "GCM" && S.length !== T.iv)
      throw new TypeError("invalid iv length " + S.length);
    if (typeof w == "string" && (w = t.from(w)), w.length !== T.key / 8)
      throw new TypeError("invalid key length " + w.length);
    return T.type === "stream" ? new i(T.module, w, S, !0) : T.type === "auth" ? new e(T.module, w, S, !0) : new c(T.module, w, S);
  }
  function p(g, w) {
    var S = n[g.toLowerCase()];
    if (!S)
      throw new TypeError("invalid suite type");
    var T = o(w, !1, S.key, S.iv);
    return v(g, T.key, T.iv);
  }
  return sa.createDecipher = p, sa.createDecipheriv = v, sa;
}
var Cl;
function Cc() {
  if (Cl)
    return br;
  Cl = 1;
  var e = tw(), t = rw(), n = Fp;
  function i() {
    return Object.keys(n);
  }
  return br.createCipher = br.Cipher = e.createCipher, br.createCipheriv = br.Cipheriv = e.createCipheriv, br.createDecipher = br.Decipher = t.createDecipher, br.createDecipheriv = br.Decipheriv = t.createDecipheriv, br.listCiphers = br.getCiphers = i, br;
}
var Is = {}, Ol;
function nw() {
  return Ol || (Ol = 1, function(e) {
    e["des-ecb"] = {
      key: 8,
      iv: 0
    }, e["des-cbc"] = e.des = {
      key: 8,
      iv: 8
    }, e["des-ede3-cbc"] = e.des3 = {
      key: 24,
      iv: 8
    }, e["des-ede3"] = {
      key: 24,
      iv: 0
    }, e["des-ede-cbc"] = {
      key: 16,
      iv: 8
    }, e["des-ede"] = {
      key: 16,
      iv: 0
    };
  }(Is)), Is;
}
var Nl;
function iw() {
  if (Nl)
    return vr;
  Nl = 1;
  var e = z4(), t = Cc(), n = Pc(), i = nw(), f = Bf();
  function r(u, v) {
    u = u.toLowerCase();
    var p, g;
    if (n[u])
      p = n[u].key, g = n[u].iv;
    else if (i[u])
      p = i[u].key * 8, g = i[u].iv;
    else
      throw new TypeError("invalid suite type");
    var w = f(v, !1, p, g);
    return s(u, w.key, w.iv);
  }
  function o(u, v) {
    u = u.toLowerCase();
    var p, g;
    if (n[u])
      p = n[u].key, g = n[u].iv;
    else if (i[u])
      p = i[u].key * 8, g = i[u].iv;
    else
      throw new TypeError("invalid suite type");
    var w = f(v, !1, p, g);
    return c(u, w.key, w.iv);
  }
  function s(u, v, p) {
    if (u = u.toLowerCase(), n[u])
      return t.createCipheriv(u, v, p);
    if (i[u])
      return new e({ key: v, iv: p, mode: u });
    throw new TypeError("invalid suite type");
  }
  function c(u, v, p) {
    if (u = u.toLowerCase(), n[u])
      return t.createDecipheriv(u, v, p);
    if (i[u])
      return new e({ key: v, iv: p, mode: u, decrypt: !0 });
    throw new TypeError("invalid suite type");
  }
  function l() {
    return Object.keys(i).concat(t.getCiphers());
  }
  return vr.createCipher = vr.Cipher = r, vr.createCipheriv = vr.Cipheriv = s, vr.createDecipher = vr.Decipher = o, vr.createDecipheriv = vr.Decipheriv = c, vr.listCiphers = vr.getCiphers = l, vr;
}
var bn = {}, Ht = {}, aw = {
  get exports() {
    return Ht;
  },
  set exports(e) {
    Ht = e;
  }
};
(function(e) {
  (function(t, n) {
    function i(k, m) {
      if (!k)
        throw new Error(m || "Assertion failed");
    }
    function f(k, m) {
      k.super_ = m;
      var b = function() {
      };
      b.prototype = m.prototype, k.prototype = new b(), k.prototype.constructor = k;
    }
    function r(k, m, b) {
      if (r.isBN(k))
        return k;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, k !== null && ((m === "le" || m === "be") && (b = m, m = 10), this._init(k || 0, m || 10, b || "be"));
    }
    typeof t == "object" ? t.exports = r : n.BN = r, r.BN = r, r.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Nr.Buffer;
    } catch {
    }
    r.isBN = function(m) {
      return m instanceof r ? !0 : m !== null && typeof m == "object" && m.constructor.wordSize === r.wordSize && Array.isArray(m.words);
    }, r.max = function(m, b) {
      return m.cmp(b) > 0 ? m : b;
    }, r.min = function(m, b) {
      return m.cmp(b) < 0 ? m : b;
    }, r.prototype._init = function(m, b, a) {
      if (typeof m == "number")
        return this._initNumber(m, b, a);
      if (typeof m == "object")
        return this._initArray(m, b, a);
      b === "hex" && (b = 16), i(b === (b | 0) && b >= 2 && b <= 36), m = m.toString().replace(/\s+/g, "");
      var h = 0;
      m[0] === "-" && (h++, this.negative = 1), h < m.length && (b === 16 ? this._parseHex(m, h, a) : (this._parseBase(m, b, h), a === "le" && this._initArray(this.toArray(), b, a)));
    }, r.prototype._initNumber = function(m, b, a) {
      m < 0 && (this.negative = 1, m = -m), m < 67108864 ? (this.words = [m & 67108863], this.length = 1) : m < 4503599627370496 ? (this.words = [
        m & 67108863,
        m / 67108864 & 67108863
      ], this.length = 2) : (i(m < 9007199254740992), this.words = [
        m & 67108863,
        m / 67108864 & 67108863,
        1
      ], this.length = 3), a === "le" && this._initArray(this.toArray(), b, a);
    }, r.prototype._initArray = function(m, b, a) {
      if (i(typeof m.length == "number"), m.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(m.length / 3), this.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        this.words[h] = 0;
      var y, x, A = 0;
      if (a === "be")
        for (h = m.length - 1, y = 0; h >= 0; h -= 3)
          x = m[h] | m[h - 1] << 8 | m[h - 2] << 16, this.words[y] |= x << A & 67108863, this.words[y + 1] = x >>> 26 - A & 67108863, A += 24, A >= 26 && (A -= 26, y++);
      else if (a === "le")
        for (h = 0, y = 0; h < m.length; h += 3)
          x = m[h] | m[h + 1] << 8 | m[h + 2] << 16, this.words[y] |= x << A & 67108863, this.words[y + 1] = x >>> 26 - A & 67108863, A += 24, A >= 26 && (A -= 26, y++);
      return this.strip();
    };
    function s(k, m) {
      var b = k.charCodeAt(m);
      return b >= 65 && b <= 70 ? b - 55 : b >= 97 && b <= 102 ? b - 87 : b - 48 & 15;
    }
    function c(k, m, b) {
      var a = s(k, b);
      return b - 1 >= m && (a |= s(k, b - 1) << 4), a;
    }
    r.prototype._parseHex = function(m, b, a) {
      this.length = Math.ceil((m.length - b) / 6), this.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        this.words[h] = 0;
      var y = 0, x = 0, A;
      if (a === "be")
        for (h = m.length - 1; h >= b; h -= 2)
          A = c(m, b, h) << y, this.words[x] |= A & 67108863, y >= 18 ? (y -= 18, x += 1, this.words[x] |= A >>> 26) : y += 8;
      else {
        var B = m.length - b;
        for (h = B % 2 === 0 ? b + 1 : b; h < m.length; h += 2)
          A = c(m, b, h) << y, this.words[x] |= A & 67108863, y >= 18 ? (y -= 18, x += 1, this.words[x] |= A >>> 26) : y += 8;
      }
      this.strip();
    };
    function l(k, m, b, a) {
      for (var h = 0, y = Math.min(k.length, b), x = m; x < y; x++) {
        var A = k.charCodeAt(x) - 48;
        h *= a, A >= 49 ? h += A - 49 + 10 : A >= 17 ? h += A - 17 + 10 : h += A;
      }
      return h;
    }
    r.prototype._parseBase = function(m, b, a) {
      this.words = [0], this.length = 1;
      for (var h = 0, y = 1; y <= 67108863; y *= b)
        h++;
      h--, y = y / b | 0;
      for (var x = m.length - a, A = x % h, B = Math.min(x, x - A) + a, _ = 0, E = a; E < B; E += h)
        _ = l(m, E, E + h, b), this.imuln(y), this.words[0] + _ < 67108864 ? this.words[0] += _ : this._iaddn(_);
      if (A !== 0) {
        var d = 1;
        for (_ = l(m, E, m.length, b), E = 0; E < A; E++)
          d *= b;
        this.imuln(d), this.words[0] + _ < 67108864 ? this.words[0] += _ : this._iaddn(_);
      }
      this.strip();
    }, r.prototype.copy = function(m) {
      m.words = new Array(this.length);
      for (var b = 0; b < this.length; b++)
        m.words[b] = this.words[b];
      m.length = this.length, m.negative = this.negative, m.red = this.red;
    }, r.prototype.clone = function() {
      var m = new r(null);
      return this.copy(m), m;
    }, r.prototype._expand = function(m) {
      for (; this.length < m; )
        this.words[this.length++] = 0;
      return this;
    }, r.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, r.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, r.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var u = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], v = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], p = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    r.prototype.toString = function(m, b) {
      m = m || 10, b = b | 0 || 1;
      var a;
      if (m === 16 || m === "hex") {
        a = "";
        for (var h = 0, y = 0, x = 0; x < this.length; x++) {
          var A = this.words[x], B = ((A << h | y) & 16777215).toString(16);
          y = A >>> 24 - h & 16777215, y !== 0 || x !== this.length - 1 ? a = u[6 - B.length] + B + a : a = B + a, h += 2, h >= 26 && (h -= 26, x--);
        }
        for (y !== 0 && (a = y.toString(16) + a); a.length % b !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      if (m === (m | 0) && m >= 2 && m <= 36) {
        var _ = v[m], E = p[m];
        a = "";
        var d = this.clone();
        for (d.negative = 0; !d.isZero(); ) {
          var M = d.modn(E).toString(m);
          d = d.idivn(E), d.isZero() ? a = M + a : a = u[_ - M.length] + M + a;
        }
        for (this.isZero() && (a = "0" + a); a.length % b !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      i(!1, "Base should be between 2 and 36");
    }, r.prototype.toNumber = function() {
      var m = this.words[0];
      return this.length === 2 ? m += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? m += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -m : m;
    }, r.prototype.toJSON = function() {
      return this.toString(16);
    }, r.prototype.toBuffer = function(m, b) {
      return i(typeof o < "u"), this.toArrayLike(o, m, b);
    }, r.prototype.toArray = function(m, b) {
      return this.toArrayLike(Array, m, b);
    }, r.prototype.toArrayLike = function(m, b, a) {
      var h = this.byteLength(), y = a || Math.max(1, h);
      i(h <= y, "byte array longer than desired length"), i(y > 0, "Requested array length <= 0"), this.strip();
      var x = b === "le", A = new m(y), B, _, E = this.clone();
      if (x) {
        for (_ = 0; !E.isZero(); _++)
          B = E.andln(255), E.iushrn(8), A[_] = B;
        for (; _ < y; _++)
          A[_] = 0;
      } else {
        for (_ = 0; _ < y - h; _++)
          A[_] = 0;
        for (_ = 0; !E.isZero(); _++)
          B = E.andln(255), E.iushrn(8), A[y - _ - 1] = B;
      }
      return A;
    }, Math.clz32 ? r.prototype._countBits = function(m) {
      return 32 - Math.clz32(m);
    } : r.prototype._countBits = function(m) {
      var b = m, a = 0;
      return b >= 4096 && (a += 13, b >>>= 13), b >= 64 && (a += 7, b >>>= 7), b >= 8 && (a += 4, b >>>= 4), b >= 2 && (a += 2, b >>>= 2), a + b;
    }, r.prototype._zeroBits = function(m) {
      if (m === 0)
        return 26;
      var b = m, a = 0;
      return b & 8191 || (a += 13, b >>>= 13), b & 127 || (a += 7, b >>>= 7), b & 15 || (a += 4, b >>>= 4), b & 3 || (a += 2, b >>>= 2), b & 1 || a++, a;
    }, r.prototype.bitLength = function() {
      var m = this.words[this.length - 1], b = this._countBits(m);
      return (this.length - 1) * 26 + b;
    };
    function g(k) {
      for (var m = new Array(k.bitLength()), b = 0; b < m.length; b++) {
        var a = b / 26 | 0, h = b % 26;
        m[b] = (k.words[a] & 1 << h) >>> h;
      }
      return m;
    }
    r.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var m = 0, b = 0; b < this.length; b++) {
        var a = this._zeroBits(this.words[b]);
        if (m += a, a !== 26)
          break;
      }
      return m;
    }, r.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, r.prototype.toTwos = function(m) {
      return this.negative !== 0 ? this.abs().inotn(m).iaddn(1) : this.clone();
    }, r.prototype.fromTwos = function(m) {
      return this.testn(m - 1) ? this.notn(m).iaddn(1).ineg() : this.clone();
    }, r.prototype.isNeg = function() {
      return this.negative !== 0;
    }, r.prototype.neg = function() {
      return this.clone().ineg();
    }, r.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, r.prototype.iuor = function(m) {
      for (; this.length < m.length; )
        this.words[this.length++] = 0;
      for (var b = 0; b < m.length; b++)
        this.words[b] = this.words[b] | m.words[b];
      return this.strip();
    }, r.prototype.ior = function(m) {
      return i((this.negative | m.negative) === 0), this.iuor(m);
    }, r.prototype.or = function(m) {
      return this.length > m.length ? this.clone().ior(m) : m.clone().ior(this);
    }, r.prototype.uor = function(m) {
      return this.length > m.length ? this.clone().iuor(m) : m.clone().iuor(this);
    }, r.prototype.iuand = function(m) {
      var b;
      this.length > m.length ? b = m : b = this;
      for (var a = 0; a < b.length; a++)
        this.words[a] = this.words[a] & m.words[a];
      return this.length = b.length, this.strip();
    }, r.prototype.iand = function(m) {
      return i((this.negative | m.negative) === 0), this.iuand(m);
    }, r.prototype.and = function(m) {
      return this.length > m.length ? this.clone().iand(m) : m.clone().iand(this);
    }, r.prototype.uand = function(m) {
      return this.length > m.length ? this.clone().iuand(m) : m.clone().iuand(this);
    }, r.prototype.iuxor = function(m) {
      var b, a;
      this.length > m.length ? (b = this, a = m) : (b = m, a = this);
      for (var h = 0; h < a.length; h++)
        this.words[h] = b.words[h] ^ a.words[h];
      if (this !== b)
        for (; h < b.length; h++)
          this.words[h] = b.words[h];
      return this.length = b.length, this.strip();
    }, r.prototype.ixor = function(m) {
      return i((this.negative | m.negative) === 0), this.iuxor(m);
    }, r.prototype.xor = function(m) {
      return this.length > m.length ? this.clone().ixor(m) : m.clone().ixor(this);
    }, r.prototype.uxor = function(m) {
      return this.length > m.length ? this.clone().iuxor(m) : m.clone().iuxor(this);
    }, r.prototype.inotn = function(m) {
      i(typeof m == "number" && m >= 0);
      var b = Math.ceil(m / 26) | 0, a = m % 26;
      this._expand(b), a > 0 && b--;
      for (var h = 0; h < b; h++)
        this.words[h] = ~this.words[h] & 67108863;
      return a > 0 && (this.words[h] = ~this.words[h] & 67108863 >> 26 - a), this.strip();
    }, r.prototype.notn = function(m) {
      return this.clone().inotn(m);
    }, r.prototype.setn = function(m, b) {
      i(typeof m == "number" && m >= 0);
      var a = m / 26 | 0, h = m % 26;
      return this._expand(a + 1), b ? this.words[a] = this.words[a] | 1 << h : this.words[a] = this.words[a] & ~(1 << h), this.strip();
    }, r.prototype.iadd = function(m) {
      var b;
      if (this.negative !== 0 && m.negative === 0)
        return this.negative = 0, b = this.isub(m), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && m.negative !== 0)
        return m.negative = 0, b = this.isub(m), m.negative = 1, b._normSign();
      var a, h;
      this.length > m.length ? (a = this, h = m) : (a = m, h = this);
      for (var y = 0, x = 0; x < h.length; x++)
        b = (a.words[x] | 0) + (h.words[x] | 0) + y, this.words[x] = b & 67108863, y = b >>> 26;
      for (; y !== 0 && x < a.length; x++)
        b = (a.words[x] | 0) + y, this.words[x] = b & 67108863, y = b >>> 26;
      if (this.length = a.length, y !== 0)
        this.words[this.length] = y, this.length++;
      else if (a !== this)
        for (; x < a.length; x++)
          this.words[x] = a.words[x];
      return this;
    }, r.prototype.add = function(m) {
      var b;
      return m.negative !== 0 && this.negative === 0 ? (m.negative = 0, b = this.sub(m), m.negative ^= 1, b) : m.negative === 0 && this.negative !== 0 ? (this.negative = 0, b = m.sub(this), this.negative = 1, b) : this.length > m.length ? this.clone().iadd(m) : m.clone().iadd(this);
    }, r.prototype.isub = function(m) {
      if (m.negative !== 0) {
        m.negative = 0;
        var b = this.iadd(m);
        return m.negative = 1, b._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(m), this.negative = 1, this._normSign();
      var a = this.cmp(m);
      if (a === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var h, y;
      a > 0 ? (h = this, y = m) : (h = m, y = this);
      for (var x = 0, A = 0; A < y.length; A++)
        b = (h.words[A] | 0) - (y.words[A] | 0) + x, x = b >> 26, this.words[A] = b & 67108863;
      for (; x !== 0 && A < h.length; A++)
        b = (h.words[A] | 0) + x, x = b >> 26, this.words[A] = b & 67108863;
      if (x === 0 && A < h.length && h !== this)
        for (; A < h.length; A++)
          this.words[A] = h.words[A];
      return this.length = Math.max(this.length, A), h !== this && (this.negative = 1), this.strip();
    }, r.prototype.sub = function(m) {
      return this.clone().isub(m);
    };
    function w(k, m, b) {
      b.negative = m.negative ^ k.negative;
      var a = k.length + m.length | 0;
      b.length = a, a = a - 1 | 0;
      var h = k.words[0] | 0, y = m.words[0] | 0, x = h * y, A = x & 67108863, B = x / 67108864 | 0;
      b.words[0] = A;
      for (var _ = 1; _ < a; _++) {
        for (var E = B >>> 26, d = B & 67108863, M = Math.min(_, m.length - 1), Z = Math.max(0, _ - k.length + 1); Z <= M; Z++) {
          var re = _ - Z | 0;
          h = k.words[re] | 0, y = m.words[Z] | 0, x = h * y + d, E += x / 67108864 | 0, d = x & 67108863;
        }
        b.words[_] = d | 0, B = E | 0;
      }
      return B !== 0 ? b.words[_] = B | 0 : b.length--, b.strip();
    }
    var S = function(m, b, a) {
      var h = m.words, y = b.words, x = a.words, A = 0, B, _, E, d = h[0] | 0, M = d & 8191, Z = d >>> 13, re = h[1] | 0, J = re & 8191, ee = re >>> 13, ue = h[2] | 0, le = ue & 8191, Se = ue >>> 13, W = h[3] | 0, K = W & 8191, pe = W >>> 13, me = h[4] | 0, Ie = me & 8191, z = me >>> 13, P = h[5] | 0, L = P & 8191, F = P >>> 13, fe = h[6] | 0, ce = fe & 8191, we = fe >>> 13, Ce = h[7] | 0, Re = Ce & 8191, We = Ce >>> 13, je = h[8] | 0, Pe = je & 8191, ct = je >>> 13, ft = h[9] | 0, Ke = ft & 8191, Tt = ft >>> 13, it = y[0] | 0, Fe = it & 8191, xt = it >>> 13, rt = y[1] | 0, Ve = rt & 8191, Mt = rt >>> 13, at = y[2] | 0, ze = at & 8191, At = at >>> 13, st = y[3] | 0, De = st & 8191, _t = st >>> 13, Xe = y[4] | 0, X = Xe & 8191, G = Xe >>> 13, Y = y[5] | 0, te = Y & 8191, de = Y >>> 13, ge = y[6] | 0, ve = ge & 8191, Te = ge >>> 13, O = y[7] | 0, j = O & 8191, q = O >>> 13, R = y[8] | 0, U = R & 8191, oe = R >>> 13, ae = y[9] | 0, he = ae & 8191, xe = ae >>> 13;
      a.negative = m.negative ^ b.negative, a.length = 19, B = Math.imul(M, Fe), _ = Math.imul(M, xt), _ = _ + Math.imul(Z, Fe) | 0, E = Math.imul(Z, xt);
      var Me = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, B = Math.imul(J, Fe), _ = Math.imul(J, xt), _ = _ + Math.imul(ee, Fe) | 0, E = Math.imul(ee, xt), B = B + Math.imul(M, Ve) | 0, _ = _ + Math.imul(M, Mt) | 0, _ = _ + Math.imul(Z, Ve) | 0, E = E + Math.imul(Z, Mt) | 0;
      var _e = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, B = Math.imul(le, Fe), _ = Math.imul(le, xt), _ = _ + Math.imul(Se, Fe) | 0, E = Math.imul(Se, xt), B = B + Math.imul(J, Ve) | 0, _ = _ + Math.imul(J, Mt) | 0, _ = _ + Math.imul(ee, Ve) | 0, E = E + Math.imul(ee, Mt) | 0, B = B + Math.imul(M, ze) | 0, _ = _ + Math.imul(M, At) | 0, _ = _ + Math.imul(Z, ze) | 0, E = E + Math.imul(Z, At) | 0;
      var ut = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (ut >>> 26) | 0, ut &= 67108863, B = Math.imul(K, Fe), _ = Math.imul(K, xt), _ = _ + Math.imul(pe, Fe) | 0, E = Math.imul(pe, xt), B = B + Math.imul(le, Ve) | 0, _ = _ + Math.imul(le, Mt) | 0, _ = _ + Math.imul(Se, Ve) | 0, E = E + Math.imul(Se, Mt) | 0, B = B + Math.imul(J, ze) | 0, _ = _ + Math.imul(J, At) | 0, _ = _ + Math.imul(ee, ze) | 0, E = E + Math.imul(ee, At) | 0, B = B + Math.imul(M, De) | 0, _ = _ + Math.imul(M, _t) | 0, _ = _ + Math.imul(Z, De) | 0, E = E + Math.imul(Z, _t) | 0;
      var $e = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + ($e >>> 26) | 0, $e &= 67108863, B = Math.imul(Ie, Fe), _ = Math.imul(Ie, xt), _ = _ + Math.imul(z, Fe) | 0, E = Math.imul(z, xt), B = B + Math.imul(K, Ve) | 0, _ = _ + Math.imul(K, Mt) | 0, _ = _ + Math.imul(pe, Ve) | 0, E = E + Math.imul(pe, Mt) | 0, B = B + Math.imul(le, ze) | 0, _ = _ + Math.imul(le, At) | 0, _ = _ + Math.imul(Se, ze) | 0, E = E + Math.imul(Se, At) | 0, B = B + Math.imul(J, De) | 0, _ = _ + Math.imul(J, _t) | 0, _ = _ + Math.imul(ee, De) | 0, E = E + Math.imul(ee, _t) | 0, B = B + Math.imul(M, X) | 0, _ = _ + Math.imul(M, G) | 0, _ = _ + Math.imul(Z, X) | 0, E = E + Math.imul(Z, G) | 0;
      var Je = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, B = Math.imul(L, Fe), _ = Math.imul(L, xt), _ = _ + Math.imul(F, Fe) | 0, E = Math.imul(F, xt), B = B + Math.imul(Ie, Ve) | 0, _ = _ + Math.imul(Ie, Mt) | 0, _ = _ + Math.imul(z, Ve) | 0, E = E + Math.imul(z, Mt) | 0, B = B + Math.imul(K, ze) | 0, _ = _ + Math.imul(K, At) | 0, _ = _ + Math.imul(pe, ze) | 0, E = E + Math.imul(pe, At) | 0, B = B + Math.imul(le, De) | 0, _ = _ + Math.imul(le, _t) | 0, _ = _ + Math.imul(Se, De) | 0, E = E + Math.imul(Se, _t) | 0, B = B + Math.imul(J, X) | 0, _ = _ + Math.imul(J, G) | 0, _ = _ + Math.imul(ee, X) | 0, E = E + Math.imul(ee, G) | 0, B = B + Math.imul(M, te) | 0, _ = _ + Math.imul(M, de) | 0, _ = _ + Math.imul(Z, te) | 0, E = E + Math.imul(Z, de) | 0;
      var Ze = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Ze >>> 26) | 0, Ze &= 67108863, B = Math.imul(ce, Fe), _ = Math.imul(ce, xt), _ = _ + Math.imul(we, Fe) | 0, E = Math.imul(we, xt), B = B + Math.imul(L, Ve) | 0, _ = _ + Math.imul(L, Mt) | 0, _ = _ + Math.imul(F, Ve) | 0, E = E + Math.imul(F, Mt) | 0, B = B + Math.imul(Ie, ze) | 0, _ = _ + Math.imul(Ie, At) | 0, _ = _ + Math.imul(z, ze) | 0, E = E + Math.imul(z, At) | 0, B = B + Math.imul(K, De) | 0, _ = _ + Math.imul(K, _t) | 0, _ = _ + Math.imul(pe, De) | 0, E = E + Math.imul(pe, _t) | 0, B = B + Math.imul(le, X) | 0, _ = _ + Math.imul(le, G) | 0, _ = _ + Math.imul(Se, X) | 0, E = E + Math.imul(Se, G) | 0, B = B + Math.imul(J, te) | 0, _ = _ + Math.imul(J, de) | 0, _ = _ + Math.imul(ee, te) | 0, E = E + Math.imul(ee, de) | 0, B = B + Math.imul(M, ve) | 0, _ = _ + Math.imul(M, Te) | 0, _ = _ + Math.imul(Z, ve) | 0, E = E + Math.imul(Z, Te) | 0;
      var nt = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (nt >>> 26) | 0, nt &= 67108863, B = Math.imul(Re, Fe), _ = Math.imul(Re, xt), _ = _ + Math.imul(We, Fe) | 0, E = Math.imul(We, xt), B = B + Math.imul(ce, Ve) | 0, _ = _ + Math.imul(ce, Mt) | 0, _ = _ + Math.imul(we, Ve) | 0, E = E + Math.imul(we, Mt) | 0, B = B + Math.imul(L, ze) | 0, _ = _ + Math.imul(L, At) | 0, _ = _ + Math.imul(F, ze) | 0, E = E + Math.imul(F, At) | 0, B = B + Math.imul(Ie, De) | 0, _ = _ + Math.imul(Ie, _t) | 0, _ = _ + Math.imul(z, De) | 0, E = E + Math.imul(z, _t) | 0, B = B + Math.imul(K, X) | 0, _ = _ + Math.imul(K, G) | 0, _ = _ + Math.imul(pe, X) | 0, E = E + Math.imul(pe, G) | 0, B = B + Math.imul(le, te) | 0, _ = _ + Math.imul(le, de) | 0, _ = _ + Math.imul(Se, te) | 0, E = E + Math.imul(Se, de) | 0, B = B + Math.imul(J, ve) | 0, _ = _ + Math.imul(J, Te) | 0, _ = _ + Math.imul(ee, ve) | 0, E = E + Math.imul(ee, Te) | 0, B = B + Math.imul(M, j) | 0, _ = _ + Math.imul(M, q) | 0, _ = _ + Math.imul(Z, j) | 0, E = E + Math.imul(Z, q) | 0;
      var tt = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (tt >>> 26) | 0, tt &= 67108863, B = Math.imul(Pe, Fe), _ = Math.imul(Pe, xt), _ = _ + Math.imul(ct, Fe) | 0, E = Math.imul(ct, xt), B = B + Math.imul(Re, Ve) | 0, _ = _ + Math.imul(Re, Mt) | 0, _ = _ + Math.imul(We, Ve) | 0, E = E + Math.imul(We, Mt) | 0, B = B + Math.imul(ce, ze) | 0, _ = _ + Math.imul(ce, At) | 0, _ = _ + Math.imul(we, ze) | 0, E = E + Math.imul(we, At) | 0, B = B + Math.imul(L, De) | 0, _ = _ + Math.imul(L, _t) | 0, _ = _ + Math.imul(F, De) | 0, E = E + Math.imul(F, _t) | 0, B = B + Math.imul(Ie, X) | 0, _ = _ + Math.imul(Ie, G) | 0, _ = _ + Math.imul(z, X) | 0, E = E + Math.imul(z, G) | 0, B = B + Math.imul(K, te) | 0, _ = _ + Math.imul(K, de) | 0, _ = _ + Math.imul(pe, te) | 0, E = E + Math.imul(pe, de) | 0, B = B + Math.imul(le, ve) | 0, _ = _ + Math.imul(le, Te) | 0, _ = _ + Math.imul(Se, ve) | 0, E = E + Math.imul(Se, Te) | 0, B = B + Math.imul(J, j) | 0, _ = _ + Math.imul(J, q) | 0, _ = _ + Math.imul(ee, j) | 0, E = E + Math.imul(ee, q) | 0, B = B + Math.imul(M, U) | 0, _ = _ + Math.imul(M, oe) | 0, _ = _ + Math.imul(Z, U) | 0, E = E + Math.imul(Z, oe) | 0;
      var Ye = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, B = Math.imul(Ke, Fe), _ = Math.imul(Ke, xt), _ = _ + Math.imul(Tt, Fe) | 0, E = Math.imul(Tt, xt), B = B + Math.imul(Pe, Ve) | 0, _ = _ + Math.imul(Pe, Mt) | 0, _ = _ + Math.imul(ct, Ve) | 0, E = E + Math.imul(ct, Mt) | 0, B = B + Math.imul(Re, ze) | 0, _ = _ + Math.imul(Re, At) | 0, _ = _ + Math.imul(We, ze) | 0, E = E + Math.imul(We, At) | 0, B = B + Math.imul(ce, De) | 0, _ = _ + Math.imul(ce, _t) | 0, _ = _ + Math.imul(we, De) | 0, E = E + Math.imul(we, _t) | 0, B = B + Math.imul(L, X) | 0, _ = _ + Math.imul(L, G) | 0, _ = _ + Math.imul(F, X) | 0, E = E + Math.imul(F, G) | 0, B = B + Math.imul(Ie, te) | 0, _ = _ + Math.imul(Ie, de) | 0, _ = _ + Math.imul(z, te) | 0, E = E + Math.imul(z, de) | 0, B = B + Math.imul(K, ve) | 0, _ = _ + Math.imul(K, Te) | 0, _ = _ + Math.imul(pe, ve) | 0, E = E + Math.imul(pe, Te) | 0, B = B + Math.imul(le, j) | 0, _ = _ + Math.imul(le, q) | 0, _ = _ + Math.imul(Se, j) | 0, E = E + Math.imul(Se, q) | 0, B = B + Math.imul(J, U) | 0, _ = _ + Math.imul(J, oe) | 0, _ = _ + Math.imul(ee, U) | 0, E = E + Math.imul(ee, oe) | 0, B = B + Math.imul(M, he) | 0, _ = _ + Math.imul(M, xe) | 0, _ = _ + Math.imul(Z, he) | 0, E = E + Math.imul(Z, xe) | 0;
      var et = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (et >>> 26) | 0, et &= 67108863, B = Math.imul(Ke, Ve), _ = Math.imul(Ke, Mt), _ = _ + Math.imul(Tt, Ve) | 0, E = Math.imul(Tt, Mt), B = B + Math.imul(Pe, ze) | 0, _ = _ + Math.imul(Pe, At) | 0, _ = _ + Math.imul(ct, ze) | 0, E = E + Math.imul(ct, At) | 0, B = B + Math.imul(Re, De) | 0, _ = _ + Math.imul(Re, _t) | 0, _ = _ + Math.imul(We, De) | 0, E = E + Math.imul(We, _t) | 0, B = B + Math.imul(ce, X) | 0, _ = _ + Math.imul(ce, G) | 0, _ = _ + Math.imul(we, X) | 0, E = E + Math.imul(we, G) | 0, B = B + Math.imul(L, te) | 0, _ = _ + Math.imul(L, de) | 0, _ = _ + Math.imul(F, te) | 0, E = E + Math.imul(F, de) | 0, B = B + Math.imul(Ie, ve) | 0, _ = _ + Math.imul(Ie, Te) | 0, _ = _ + Math.imul(z, ve) | 0, E = E + Math.imul(z, Te) | 0, B = B + Math.imul(K, j) | 0, _ = _ + Math.imul(K, q) | 0, _ = _ + Math.imul(pe, j) | 0, E = E + Math.imul(pe, q) | 0, B = B + Math.imul(le, U) | 0, _ = _ + Math.imul(le, oe) | 0, _ = _ + Math.imul(Se, U) | 0, E = E + Math.imul(Se, oe) | 0, B = B + Math.imul(J, he) | 0, _ = _ + Math.imul(J, xe) | 0, _ = _ + Math.imul(ee, he) | 0, E = E + Math.imul(ee, xe) | 0;
      var Qe = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, B = Math.imul(Ke, ze), _ = Math.imul(Ke, At), _ = _ + Math.imul(Tt, ze) | 0, E = Math.imul(Tt, At), B = B + Math.imul(Pe, De) | 0, _ = _ + Math.imul(Pe, _t) | 0, _ = _ + Math.imul(ct, De) | 0, E = E + Math.imul(ct, _t) | 0, B = B + Math.imul(Re, X) | 0, _ = _ + Math.imul(Re, G) | 0, _ = _ + Math.imul(We, X) | 0, E = E + Math.imul(We, G) | 0, B = B + Math.imul(ce, te) | 0, _ = _ + Math.imul(ce, de) | 0, _ = _ + Math.imul(we, te) | 0, E = E + Math.imul(we, de) | 0, B = B + Math.imul(L, ve) | 0, _ = _ + Math.imul(L, Te) | 0, _ = _ + Math.imul(F, ve) | 0, E = E + Math.imul(F, Te) | 0, B = B + Math.imul(Ie, j) | 0, _ = _ + Math.imul(Ie, q) | 0, _ = _ + Math.imul(z, j) | 0, E = E + Math.imul(z, q) | 0, B = B + Math.imul(K, U) | 0, _ = _ + Math.imul(K, oe) | 0, _ = _ + Math.imul(pe, U) | 0, E = E + Math.imul(pe, oe) | 0, B = B + Math.imul(le, he) | 0, _ = _ + Math.imul(le, xe) | 0, _ = _ + Math.imul(Se, he) | 0, E = E + Math.imul(Se, xe) | 0;
      var qe = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (qe >>> 26) | 0, qe &= 67108863, B = Math.imul(Ke, De), _ = Math.imul(Ke, _t), _ = _ + Math.imul(Tt, De) | 0, E = Math.imul(Tt, _t), B = B + Math.imul(Pe, X) | 0, _ = _ + Math.imul(Pe, G) | 0, _ = _ + Math.imul(ct, X) | 0, E = E + Math.imul(ct, G) | 0, B = B + Math.imul(Re, te) | 0, _ = _ + Math.imul(Re, de) | 0, _ = _ + Math.imul(We, te) | 0, E = E + Math.imul(We, de) | 0, B = B + Math.imul(ce, ve) | 0, _ = _ + Math.imul(ce, Te) | 0, _ = _ + Math.imul(we, ve) | 0, E = E + Math.imul(we, Te) | 0, B = B + Math.imul(L, j) | 0, _ = _ + Math.imul(L, q) | 0, _ = _ + Math.imul(F, j) | 0, E = E + Math.imul(F, q) | 0, B = B + Math.imul(Ie, U) | 0, _ = _ + Math.imul(Ie, oe) | 0, _ = _ + Math.imul(z, U) | 0, E = E + Math.imul(z, oe) | 0, B = B + Math.imul(K, he) | 0, _ = _ + Math.imul(K, xe) | 0, _ = _ + Math.imul(pe, he) | 0, E = E + Math.imul(pe, xe) | 0;
      var Ge = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Ge >>> 26) | 0, Ge &= 67108863, B = Math.imul(Ke, X), _ = Math.imul(Ke, G), _ = _ + Math.imul(Tt, X) | 0, E = Math.imul(Tt, G), B = B + Math.imul(Pe, te) | 0, _ = _ + Math.imul(Pe, de) | 0, _ = _ + Math.imul(ct, te) | 0, E = E + Math.imul(ct, de) | 0, B = B + Math.imul(Re, ve) | 0, _ = _ + Math.imul(Re, Te) | 0, _ = _ + Math.imul(We, ve) | 0, E = E + Math.imul(We, Te) | 0, B = B + Math.imul(ce, j) | 0, _ = _ + Math.imul(ce, q) | 0, _ = _ + Math.imul(we, j) | 0, E = E + Math.imul(we, q) | 0, B = B + Math.imul(L, U) | 0, _ = _ + Math.imul(L, oe) | 0, _ = _ + Math.imul(F, U) | 0, E = E + Math.imul(F, oe) | 0, B = B + Math.imul(Ie, he) | 0, _ = _ + Math.imul(Ie, xe) | 0, _ = _ + Math.imul(z, he) | 0, E = E + Math.imul(z, xe) | 0;
      var ke = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, B = Math.imul(Ke, te), _ = Math.imul(Ke, de), _ = _ + Math.imul(Tt, te) | 0, E = Math.imul(Tt, de), B = B + Math.imul(Pe, ve) | 0, _ = _ + Math.imul(Pe, Te) | 0, _ = _ + Math.imul(ct, ve) | 0, E = E + Math.imul(ct, Te) | 0, B = B + Math.imul(Re, j) | 0, _ = _ + Math.imul(Re, q) | 0, _ = _ + Math.imul(We, j) | 0, E = E + Math.imul(We, q) | 0, B = B + Math.imul(ce, U) | 0, _ = _ + Math.imul(ce, oe) | 0, _ = _ + Math.imul(we, U) | 0, E = E + Math.imul(we, oe) | 0, B = B + Math.imul(L, he) | 0, _ = _ + Math.imul(L, xe) | 0, _ = _ + Math.imul(F, he) | 0, E = E + Math.imul(F, xe) | 0;
      var Ue = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Ue >>> 26) | 0, Ue &= 67108863, B = Math.imul(Ke, ve), _ = Math.imul(Ke, Te), _ = _ + Math.imul(Tt, ve) | 0, E = Math.imul(Tt, Te), B = B + Math.imul(Pe, j) | 0, _ = _ + Math.imul(Pe, q) | 0, _ = _ + Math.imul(ct, j) | 0, E = E + Math.imul(ct, q) | 0, B = B + Math.imul(Re, U) | 0, _ = _ + Math.imul(Re, oe) | 0, _ = _ + Math.imul(We, U) | 0, E = E + Math.imul(We, oe) | 0, B = B + Math.imul(ce, he) | 0, _ = _ + Math.imul(ce, xe) | 0, _ = _ + Math.imul(we, he) | 0, E = E + Math.imul(we, xe) | 0;
      var He = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (He >>> 26) | 0, He &= 67108863, B = Math.imul(Ke, j), _ = Math.imul(Ke, q), _ = _ + Math.imul(Tt, j) | 0, E = Math.imul(Tt, q), B = B + Math.imul(Pe, U) | 0, _ = _ + Math.imul(Pe, oe) | 0, _ = _ + Math.imul(ct, U) | 0, E = E + Math.imul(ct, oe) | 0, B = B + Math.imul(Re, he) | 0, _ = _ + Math.imul(Re, xe) | 0, _ = _ + Math.imul(We, he) | 0, E = E + Math.imul(We, xe) | 0;
      var Le = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, B = Math.imul(Ke, U), _ = Math.imul(Ke, oe), _ = _ + Math.imul(Tt, U) | 0, E = Math.imul(Tt, oe), B = B + Math.imul(Pe, he) | 0, _ = _ + Math.imul(Pe, xe) | 0, _ = _ + Math.imul(ct, he) | 0, E = E + Math.imul(ct, xe) | 0;
      var be = (A + B | 0) + ((_ & 8191) << 13) | 0;
      A = (E + (_ >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, B = Math.imul(Ke, he), _ = Math.imul(Ke, xe), _ = _ + Math.imul(Tt, he) | 0, E = Math.imul(Tt, xe);
      var ye = (A + B | 0) + ((_ & 8191) << 13) | 0;
      return A = (E + (_ >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, x[0] = Me, x[1] = _e, x[2] = ut, x[3] = $e, x[4] = Je, x[5] = Ze, x[6] = nt, x[7] = tt, x[8] = Ye, x[9] = et, x[10] = Qe, x[11] = qe, x[12] = Ge, x[13] = ke, x[14] = Ue, x[15] = He, x[16] = Le, x[17] = be, x[18] = ye, A !== 0 && (x[19] = A, a.length++), a;
    };
    Math.imul || (S = w);
    function T(k, m, b) {
      b.negative = m.negative ^ k.negative, b.length = k.length + m.length;
      for (var a = 0, h = 0, y = 0; y < b.length - 1; y++) {
        var x = h;
        h = 0;
        for (var A = a & 67108863, B = Math.min(y, m.length - 1), _ = Math.max(0, y - k.length + 1); _ <= B; _++) {
          var E = y - _, d = k.words[E] | 0, M = m.words[_] | 0, Z = d * M, re = Z & 67108863;
          x = x + (Z / 67108864 | 0) | 0, re = re + A | 0, A = re & 67108863, x = x + (re >>> 26) | 0, h += x >>> 26, x &= 67108863;
        }
        b.words[y] = A, a = x, x = h;
      }
      return a !== 0 ? b.words[y] = a : b.length--, b.strip();
    }
    function I(k, m, b) {
      var a = new C();
      return a.mulp(k, m, b);
    }
    r.prototype.mulTo = function(m, b) {
      var a, h = this.length + m.length;
      return this.length === 10 && m.length === 10 ? a = S(this, m, b) : h < 63 ? a = w(this, m, b) : h < 1024 ? a = T(this, m, b) : a = I(this, m, b), a;
    };
    function C(k, m) {
      this.x = k, this.y = m;
    }
    C.prototype.makeRBT = function(m) {
      for (var b = new Array(m), a = r.prototype._countBits(m) - 1, h = 0; h < m; h++)
        b[h] = this.revBin(h, a, m);
      return b;
    }, C.prototype.revBin = function(m, b, a) {
      if (m === 0 || m === a - 1)
        return m;
      for (var h = 0, y = 0; y < b; y++)
        h |= (m & 1) << b - y - 1, m >>= 1;
      return h;
    }, C.prototype.permute = function(m, b, a, h, y, x) {
      for (var A = 0; A < x; A++)
        h[A] = b[m[A]], y[A] = a[m[A]];
    }, C.prototype.transform = function(m, b, a, h, y, x) {
      this.permute(x, m, b, a, h, y);
      for (var A = 1; A < y; A <<= 1)
        for (var B = A << 1, _ = Math.cos(2 * Math.PI / B), E = Math.sin(2 * Math.PI / B), d = 0; d < y; d += B)
          for (var M = _, Z = E, re = 0; re < A; re++) {
            var J = a[d + re], ee = h[d + re], ue = a[d + re + A], le = h[d + re + A], Se = M * ue - Z * le;
            le = M * le + Z * ue, ue = Se, a[d + re] = J + ue, h[d + re] = ee + le, a[d + re + A] = J - ue, h[d + re + A] = ee - le, re !== B && (Se = _ * M - E * Z, Z = _ * Z + E * M, M = Se);
          }
    }, C.prototype.guessLen13b = function(m, b) {
      var a = Math.max(b, m) | 1, h = a & 1, y = 0;
      for (a = a / 2 | 0; a; a = a >>> 1)
        y++;
      return 1 << y + 1 + h;
    }, C.prototype.conjugate = function(m, b, a) {
      if (!(a <= 1))
        for (var h = 0; h < a / 2; h++) {
          var y = m[h];
          m[h] = m[a - h - 1], m[a - h - 1] = y, y = b[h], b[h] = -b[a - h - 1], b[a - h - 1] = -y;
        }
    }, C.prototype.normalize13b = function(m, b) {
      for (var a = 0, h = 0; h < b / 2; h++) {
        var y = Math.round(m[2 * h + 1] / b) * 8192 + Math.round(m[2 * h] / b) + a;
        m[h] = y & 67108863, y < 67108864 ? a = 0 : a = y / 67108864 | 0;
      }
      return m;
    }, C.prototype.convert13b = function(m, b, a, h) {
      for (var y = 0, x = 0; x < b; x++)
        y = y + (m[x] | 0), a[2 * x] = y & 8191, y = y >>> 13, a[2 * x + 1] = y & 8191, y = y >>> 13;
      for (x = 2 * b; x < h; ++x)
        a[x] = 0;
      i(y === 0), i((y & -8192) === 0);
    }, C.prototype.stub = function(m) {
      for (var b = new Array(m), a = 0; a < m; a++)
        b[a] = 0;
      return b;
    }, C.prototype.mulp = function(m, b, a) {
      var h = 2 * this.guessLen13b(m.length, b.length), y = this.makeRBT(h), x = this.stub(h), A = new Array(h), B = new Array(h), _ = new Array(h), E = new Array(h), d = new Array(h), M = new Array(h), Z = a.words;
      Z.length = h, this.convert13b(m.words, m.length, A, h), this.convert13b(b.words, b.length, E, h), this.transform(A, x, B, _, h, y), this.transform(E, x, d, M, h, y);
      for (var re = 0; re < h; re++) {
        var J = B[re] * d[re] - _[re] * M[re];
        _[re] = B[re] * M[re] + _[re] * d[re], B[re] = J;
      }
      return this.conjugate(B, _, h), this.transform(B, _, Z, x, h, y), this.conjugate(Z, x, h), this.normalize13b(Z, h), a.negative = m.negative ^ b.negative, a.length = m.length + b.length, a.strip();
    }, r.prototype.mul = function(m) {
      var b = new r(null);
      return b.words = new Array(this.length + m.length), this.mulTo(m, b);
    }, r.prototype.mulf = function(m) {
      var b = new r(null);
      return b.words = new Array(this.length + m.length), I(this, m, b);
    }, r.prototype.imul = function(m) {
      return this.clone().mulTo(m, this);
    }, r.prototype.imuln = function(m) {
      i(typeof m == "number"), i(m < 67108864);
      for (var b = 0, a = 0; a < this.length; a++) {
        var h = (this.words[a] | 0) * m, y = (h & 67108863) + (b & 67108863);
        b >>= 26, b += h / 67108864 | 0, b += y >>> 26, this.words[a] = y & 67108863;
      }
      return b !== 0 && (this.words[a] = b, this.length++), this;
    }, r.prototype.muln = function(m) {
      return this.clone().imuln(m);
    }, r.prototype.sqr = function() {
      return this.mul(this);
    }, r.prototype.isqr = function() {
      return this.imul(this.clone());
    }, r.prototype.pow = function(m) {
      var b = g(m);
      if (b.length === 0)
        return new r(1);
      for (var a = this, h = 0; h < b.length && b[h] === 0; h++, a = a.sqr())
        ;
      if (++h < b.length)
        for (var y = a.sqr(); h < b.length; h++, y = y.sqr())
          b[h] !== 0 && (a = a.mul(y));
      return a;
    }, r.prototype.iushln = function(m) {
      i(typeof m == "number" && m >= 0);
      var b = m % 26, a = (m - b) / 26, h = 67108863 >>> 26 - b << 26 - b, y;
      if (b !== 0) {
        var x = 0;
        for (y = 0; y < this.length; y++) {
          var A = this.words[y] & h, B = (this.words[y] | 0) - A << b;
          this.words[y] = B | x, x = A >>> 26 - b;
        }
        x && (this.words[y] = x, this.length++);
      }
      if (a !== 0) {
        for (y = this.length - 1; y >= 0; y--)
          this.words[y + a] = this.words[y];
        for (y = 0; y < a; y++)
          this.words[y] = 0;
        this.length += a;
      }
      return this.strip();
    }, r.prototype.ishln = function(m) {
      return i(this.negative === 0), this.iushln(m);
    }, r.prototype.iushrn = function(m, b, a) {
      i(typeof m == "number" && m >= 0);
      var h;
      b ? h = (b - b % 26) / 26 : h = 0;
      var y = m % 26, x = Math.min((m - y) / 26, this.length), A = 67108863 ^ 67108863 >>> y << y, B = a;
      if (h -= x, h = Math.max(0, h), B) {
        for (var _ = 0; _ < x; _++)
          B.words[_] = this.words[_];
        B.length = x;
      }
      if (x !== 0)
        if (this.length > x)
          for (this.length -= x, _ = 0; _ < this.length; _++)
            this.words[_] = this.words[_ + x];
        else
          this.words[0] = 0, this.length = 1;
      var E = 0;
      for (_ = this.length - 1; _ >= 0 && (E !== 0 || _ >= h); _--) {
        var d = this.words[_] | 0;
        this.words[_] = E << 26 - y | d >>> y, E = d & A;
      }
      return B && E !== 0 && (B.words[B.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, r.prototype.ishrn = function(m, b, a) {
      return i(this.negative === 0), this.iushrn(m, b, a);
    }, r.prototype.shln = function(m) {
      return this.clone().ishln(m);
    }, r.prototype.ushln = function(m) {
      return this.clone().iushln(m);
    }, r.prototype.shrn = function(m) {
      return this.clone().ishrn(m);
    }, r.prototype.ushrn = function(m) {
      return this.clone().iushrn(m);
    }, r.prototype.testn = function(m) {
      i(typeof m == "number" && m >= 0);
      var b = m % 26, a = (m - b) / 26, h = 1 << b;
      if (this.length <= a)
        return !1;
      var y = this.words[a];
      return !!(y & h);
    }, r.prototype.imaskn = function(m) {
      i(typeof m == "number" && m >= 0);
      var b = m % 26, a = (m - b) / 26;
      if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= a)
        return this;
      if (b !== 0 && a++, this.length = Math.min(a, this.length), b !== 0) {
        var h = 67108863 ^ 67108863 >>> b << b;
        this.words[this.length - 1] &= h;
      }
      return this.strip();
    }, r.prototype.maskn = function(m) {
      return this.clone().imaskn(m);
    }, r.prototype.iaddn = function(m) {
      return i(typeof m == "number"), i(m < 67108864), m < 0 ? this.isubn(-m) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < m ? (this.words[0] = m - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(m), this.negative = 1, this) : this._iaddn(m);
    }, r.prototype._iaddn = function(m) {
      this.words[0] += m;
      for (var b = 0; b < this.length && this.words[b] >= 67108864; b++)
        this.words[b] -= 67108864, b === this.length - 1 ? this.words[b + 1] = 1 : this.words[b + 1]++;
      return this.length = Math.max(this.length, b + 1), this;
    }, r.prototype.isubn = function(m) {
      if (i(typeof m == "number"), i(m < 67108864), m < 0)
        return this.iaddn(-m);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(m), this.negative = 1, this;
      if (this.words[0] -= m, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var b = 0; b < this.length && this.words[b] < 0; b++)
          this.words[b] += 67108864, this.words[b + 1] -= 1;
      return this.strip();
    }, r.prototype.addn = function(m) {
      return this.clone().iaddn(m);
    }, r.prototype.subn = function(m) {
      return this.clone().isubn(m);
    }, r.prototype.iabs = function() {
      return this.negative = 0, this;
    }, r.prototype.abs = function() {
      return this.clone().iabs();
    }, r.prototype._ishlnsubmul = function(m, b, a) {
      var h = m.length + a, y;
      this._expand(h);
      var x, A = 0;
      for (y = 0; y < m.length; y++) {
        x = (this.words[y + a] | 0) + A;
        var B = (m.words[y] | 0) * b;
        x -= B & 67108863, A = (x >> 26) - (B / 67108864 | 0), this.words[y + a] = x & 67108863;
      }
      for (; y < this.length - a; y++)
        x = (this.words[y + a] | 0) + A, A = x >> 26, this.words[y + a] = x & 67108863;
      if (A === 0)
        return this.strip();
      for (i(A === -1), A = 0, y = 0; y < this.length; y++)
        x = -(this.words[y] | 0) + A, A = x >> 26, this.words[y] = x & 67108863;
      return this.negative = 1, this.strip();
    }, r.prototype._wordDiv = function(m, b) {
      var a = this.length - m.length, h = this.clone(), y = m, x = y.words[y.length - 1] | 0, A = this._countBits(x);
      a = 26 - A, a !== 0 && (y = y.ushln(a), h.iushln(a), x = y.words[y.length - 1] | 0);
      var B = h.length - y.length, _;
      if (b !== "mod") {
        _ = new r(null), _.length = B + 1, _.words = new Array(_.length);
        for (var E = 0; E < _.length; E++)
          _.words[E] = 0;
      }
      var d = h.clone()._ishlnsubmul(y, 1, B);
      d.negative === 0 && (h = d, _ && (_.words[B] = 1));
      for (var M = B - 1; M >= 0; M--) {
        var Z = (h.words[y.length + M] | 0) * 67108864 + (h.words[y.length + M - 1] | 0);
        for (Z = Math.min(Z / x | 0, 67108863), h._ishlnsubmul(y, Z, M); h.negative !== 0; )
          Z--, h.negative = 0, h._ishlnsubmul(y, 1, M), h.isZero() || (h.negative ^= 1);
        _ && (_.words[M] = Z);
      }
      return _ && _.strip(), h.strip(), b !== "div" && a !== 0 && h.iushrn(a), {
        div: _ || null,
        mod: h
      };
    }, r.prototype.divmod = function(m, b, a) {
      if (i(!m.isZero()), this.isZero())
        return {
          div: new r(0),
          mod: new r(0)
        };
      var h, y, x;
      return this.negative !== 0 && m.negative === 0 ? (x = this.neg().divmod(m, b), b !== "mod" && (h = x.div.neg()), b !== "div" && (y = x.mod.neg(), a && y.negative !== 0 && y.iadd(m)), {
        div: h,
        mod: y
      }) : this.negative === 0 && m.negative !== 0 ? (x = this.divmod(m.neg(), b), b !== "mod" && (h = x.div.neg()), {
        div: h,
        mod: x.mod
      }) : this.negative & m.negative ? (x = this.neg().divmod(m.neg(), b), b !== "div" && (y = x.mod.neg(), a && y.negative !== 0 && y.isub(m)), {
        div: x.div,
        mod: y
      }) : m.length > this.length || this.cmp(m) < 0 ? {
        div: new r(0),
        mod: this
      } : m.length === 1 ? b === "div" ? {
        div: this.divn(m.words[0]),
        mod: null
      } : b === "mod" ? {
        div: null,
        mod: new r(this.modn(m.words[0]))
      } : {
        div: this.divn(m.words[0]),
        mod: new r(this.modn(m.words[0]))
      } : this._wordDiv(m, b);
    }, r.prototype.div = function(m) {
      return this.divmod(m, "div", !1).div;
    }, r.prototype.mod = function(m) {
      return this.divmod(m, "mod", !1).mod;
    }, r.prototype.umod = function(m) {
      return this.divmod(m, "mod", !0).mod;
    }, r.prototype.divRound = function(m) {
      var b = this.divmod(m);
      if (b.mod.isZero())
        return b.div;
      var a = b.div.negative !== 0 ? b.mod.isub(m) : b.mod, h = m.ushrn(1), y = m.andln(1), x = a.cmp(h);
      return x < 0 || y === 1 && x === 0 ? b.div : b.div.negative !== 0 ? b.div.isubn(1) : b.div.iaddn(1);
    }, r.prototype.modn = function(m) {
      i(m <= 67108863);
      for (var b = (1 << 26) % m, a = 0, h = this.length - 1; h >= 0; h--)
        a = (b * a + (this.words[h] | 0)) % m;
      return a;
    }, r.prototype.idivn = function(m) {
      i(m <= 67108863);
      for (var b = 0, a = this.length - 1; a >= 0; a--) {
        var h = (this.words[a] | 0) + b * 67108864;
        this.words[a] = h / m | 0, b = h % m;
      }
      return this.strip();
    }, r.prototype.divn = function(m) {
      return this.clone().idivn(m);
    }, r.prototype.egcd = function(m) {
      i(m.negative === 0), i(!m.isZero());
      var b = this, a = m.clone();
      b.negative !== 0 ? b = b.umod(m) : b = b.clone();
      for (var h = new r(1), y = new r(0), x = new r(0), A = new r(1), B = 0; b.isEven() && a.isEven(); )
        b.iushrn(1), a.iushrn(1), ++B;
      for (var _ = a.clone(), E = b.clone(); !b.isZero(); ) {
        for (var d = 0, M = 1; !(b.words[0] & M) && d < 26; ++d, M <<= 1)
          ;
        if (d > 0)
          for (b.iushrn(d); d-- > 0; )
            (h.isOdd() || y.isOdd()) && (h.iadd(_), y.isub(E)), h.iushrn(1), y.iushrn(1);
        for (var Z = 0, re = 1; !(a.words[0] & re) && Z < 26; ++Z, re <<= 1)
          ;
        if (Z > 0)
          for (a.iushrn(Z); Z-- > 0; )
            (x.isOdd() || A.isOdd()) && (x.iadd(_), A.isub(E)), x.iushrn(1), A.iushrn(1);
        b.cmp(a) >= 0 ? (b.isub(a), h.isub(x), y.isub(A)) : (a.isub(b), x.isub(h), A.isub(y));
      }
      return {
        a: x,
        b: A,
        gcd: a.iushln(B)
      };
    }, r.prototype._invmp = function(m) {
      i(m.negative === 0), i(!m.isZero());
      var b = this, a = m.clone();
      b.negative !== 0 ? b = b.umod(m) : b = b.clone();
      for (var h = new r(1), y = new r(0), x = a.clone(); b.cmpn(1) > 0 && a.cmpn(1) > 0; ) {
        for (var A = 0, B = 1; !(b.words[0] & B) && A < 26; ++A, B <<= 1)
          ;
        if (A > 0)
          for (b.iushrn(A); A-- > 0; )
            h.isOdd() && h.iadd(x), h.iushrn(1);
        for (var _ = 0, E = 1; !(a.words[0] & E) && _ < 26; ++_, E <<= 1)
          ;
        if (_ > 0)
          for (a.iushrn(_); _-- > 0; )
            y.isOdd() && y.iadd(x), y.iushrn(1);
        b.cmp(a) >= 0 ? (b.isub(a), h.isub(y)) : (a.isub(b), y.isub(h));
      }
      var d;
      return b.cmpn(1) === 0 ? d = h : d = y, d.cmpn(0) < 0 && d.iadd(m), d;
    }, r.prototype.gcd = function(m) {
      if (this.isZero())
        return m.abs();
      if (m.isZero())
        return this.abs();
      var b = this.clone(), a = m.clone();
      b.negative = 0, a.negative = 0;
      for (var h = 0; b.isEven() && a.isEven(); h++)
        b.iushrn(1), a.iushrn(1);
      do {
        for (; b.isEven(); )
          b.iushrn(1);
        for (; a.isEven(); )
          a.iushrn(1);
        var y = b.cmp(a);
        if (y < 0) {
          var x = b;
          b = a, a = x;
        } else if (y === 0 || a.cmpn(1) === 0)
          break;
        b.isub(a);
      } while (!0);
      return a.iushln(h);
    }, r.prototype.invm = function(m) {
      return this.egcd(m).a.umod(m);
    }, r.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, r.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, r.prototype.andln = function(m) {
      return this.words[0] & m;
    }, r.prototype.bincn = function(m) {
      i(typeof m == "number");
      var b = m % 26, a = (m - b) / 26, h = 1 << b;
      if (this.length <= a)
        return this._expand(a + 1), this.words[a] |= h, this;
      for (var y = h, x = a; y !== 0 && x < this.length; x++) {
        var A = this.words[x] | 0;
        A += y, y = A >>> 26, A &= 67108863, this.words[x] = A;
      }
      return y !== 0 && (this.words[x] = y, this.length++), this;
    }, r.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, r.prototype.cmpn = function(m) {
      var b = m < 0;
      if (this.negative !== 0 && !b)
        return -1;
      if (this.negative === 0 && b)
        return 1;
      this.strip();
      var a;
      if (this.length > 1)
        a = 1;
      else {
        b && (m = -m), i(m <= 67108863, "Number is too big");
        var h = this.words[0] | 0;
        a = h === m ? 0 : h < m ? -1 : 1;
      }
      return this.negative !== 0 ? -a | 0 : a;
    }, r.prototype.cmp = function(m) {
      if (this.negative !== 0 && m.negative === 0)
        return -1;
      if (this.negative === 0 && m.negative !== 0)
        return 1;
      var b = this.ucmp(m);
      return this.negative !== 0 ? -b | 0 : b;
    }, r.prototype.ucmp = function(m) {
      if (this.length > m.length)
        return 1;
      if (this.length < m.length)
        return -1;
      for (var b = 0, a = this.length - 1; a >= 0; a--) {
        var h = this.words[a] | 0, y = m.words[a] | 0;
        if (h !== y) {
          h < y ? b = -1 : h > y && (b = 1);
          break;
        }
      }
      return b;
    }, r.prototype.gtn = function(m) {
      return this.cmpn(m) === 1;
    }, r.prototype.gt = function(m) {
      return this.cmp(m) === 1;
    }, r.prototype.gten = function(m) {
      return this.cmpn(m) >= 0;
    }, r.prototype.gte = function(m) {
      return this.cmp(m) >= 0;
    }, r.prototype.ltn = function(m) {
      return this.cmpn(m) === -1;
    }, r.prototype.lt = function(m) {
      return this.cmp(m) === -1;
    }, r.prototype.lten = function(m) {
      return this.cmpn(m) <= 0;
    }, r.prototype.lte = function(m) {
      return this.cmp(m) <= 0;
    }, r.prototype.eqn = function(m) {
      return this.cmpn(m) === 0;
    }, r.prototype.eq = function(m) {
      return this.cmp(m) === 0;
    }, r.red = function(m) {
      return new Q(m);
    }, r.prototype.toRed = function(m) {
      return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), m.convertTo(this)._forceRed(m);
    }, r.prototype.fromRed = function() {
      return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, r.prototype._forceRed = function(m) {
      return this.red = m, this;
    }, r.prototype.forceRed = function(m) {
      return i(!this.red, "Already a number in reduction context"), this._forceRed(m);
    }, r.prototype.redAdd = function(m) {
      return i(this.red, "redAdd works only with red numbers"), this.red.add(this, m);
    }, r.prototype.redIAdd = function(m) {
      return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, m);
    }, r.prototype.redSub = function(m) {
      return i(this.red, "redSub works only with red numbers"), this.red.sub(this, m);
    }, r.prototype.redISub = function(m) {
      return i(this.red, "redISub works only with red numbers"), this.red.isub(this, m);
    }, r.prototype.redShl = function(m) {
      return i(this.red, "redShl works only with red numbers"), this.red.shl(this, m);
    }, r.prototype.redMul = function(m) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, m), this.red.mul(this, m);
    }, r.prototype.redIMul = function(m) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, m), this.red.imul(this, m);
    }, r.prototype.redSqr = function() {
      return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, r.prototype.redISqr = function() {
      return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, r.prototype.redSqrt = function() {
      return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, r.prototype.redInvm = function() {
      return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, r.prototype.redNeg = function() {
      return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, r.prototype.redPow = function(m) {
      return i(this.red && !m.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, m);
    };
    var N = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function $(k, m) {
      this.name = k, this.p = new r(m, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    $.prototype._tmp = function() {
      var m = new r(null);
      return m.words = new Array(Math.ceil(this.n / 13)), m;
    }, $.prototype.ireduce = function(m) {
      var b = m, a;
      do
        this.split(b, this.tmp), b = this.imulK(b), b = b.iadd(this.tmp), a = b.bitLength();
      while (a > this.n);
      var h = a < this.n ? -1 : b.ucmp(this.p);
      return h === 0 ? (b.words[0] = 0, b.length = 1) : h > 0 ? b.isub(this.p) : b.strip !== void 0 ? b.strip() : b._strip(), b;
    }, $.prototype.split = function(m, b) {
      m.iushrn(this.n, 0, b);
    }, $.prototype.imulK = function(m) {
      return m.imul(this.k);
    };
    function D() {
      $.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    f(D, $), D.prototype.split = function(m, b) {
      for (var a = 4194303, h = Math.min(m.length, 9), y = 0; y < h; y++)
        b.words[y] = m.words[y];
      if (b.length = h, m.length <= 9) {
        m.words[0] = 0, m.length = 1;
        return;
      }
      var x = m.words[9];
      for (b.words[b.length++] = x & a, y = 10; y < m.length; y++) {
        var A = m.words[y] | 0;
        m.words[y - 10] = (A & a) << 4 | x >>> 22, x = A;
      }
      x >>>= 22, m.words[y - 10] = x, x === 0 && m.length > 10 ? m.length -= 10 : m.length -= 9;
    }, D.prototype.imulK = function(m) {
      m.words[m.length] = 0, m.words[m.length + 1] = 0, m.length += 2;
      for (var b = 0, a = 0; a < m.length; a++) {
        var h = m.words[a] | 0;
        b += h * 977, m.words[a] = b & 67108863, b = h * 64 + (b / 67108864 | 0);
      }
      return m.words[m.length - 1] === 0 && (m.length--, m.words[m.length - 1] === 0 && m.length--), m;
    };
    function H() {
      $.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    f(H, $);
    function V() {
      $.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    f(V, $);
    function ne() {
      $.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    f(ne, $), ne.prototype.imulK = function(m) {
      for (var b = 0, a = 0; a < m.length; a++) {
        var h = (m.words[a] | 0) * 19 + b, y = h & 67108863;
        h >>>= 26, m.words[a] = y, b = h;
      }
      return b !== 0 && (m.words[m.length++] = b), m;
    }, r._prime = function(m) {
      if (N[m])
        return N[m];
      var b;
      if (m === "k256")
        b = new D();
      else if (m === "p224")
        b = new H();
      else if (m === "p192")
        b = new V();
      else if (m === "p25519")
        b = new ne();
      else
        throw new Error("Unknown prime " + m);
      return N[m] = b, b;
    };
    function Q(k) {
      if (typeof k == "string") {
        var m = r._prime(k);
        this.m = m.p, this.prime = m;
      } else
        i(k.gtn(1), "modulus must be greater than 1"), this.m = k, this.prime = null;
    }
    Q.prototype._verify1 = function(m) {
      i(m.negative === 0, "red works only with positives"), i(m.red, "red works only with red numbers");
    }, Q.prototype._verify2 = function(m, b) {
      i((m.negative | b.negative) === 0, "red works only with positives"), i(
        m.red && m.red === b.red,
        "red works only with red numbers"
      );
    }, Q.prototype.imod = function(m) {
      return this.prime ? this.prime.ireduce(m)._forceRed(this) : m.umod(this.m)._forceRed(this);
    }, Q.prototype.neg = function(m) {
      return m.isZero() ? m.clone() : this.m.sub(m)._forceRed(this);
    }, Q.prototype.add = function(m, b) {
      this._verify2(m, b);
      var a = m.add(b);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a._forceRed(this);
    }, Q.prototype.iadd = function(m, b) {
      this._verify2(m, b);
      var a = m.iadd(b);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a;
    }, Q.prototype.sub = function(m, b) {
      this._verify2(m, b);
      var a = m.sub(b);
      return a.cmpn(0) < 0 && a.iadd(this.m), a._forceRed(this);
    }, Q.prototype.isub = function(m, b) {
      this._verify2(m, b);
      var a = m.isub(b);
      return a.cmpn(0) < 0 && a.iadd(this.m), a;
    }, Q.prototype.shl = function(m, b) {
      return this._verify1(m), this.imod(m.ushln(b));
    }, Q.prototype.imul = function(m, b) {
      return this._verify2(m, b), this.imod(m.imul(b));
    }, Q.prototype.mul = function(m, b) {
      return this._verify2(m, b), this.imod(m.mul(b));
    }, Q.prototype.isqr = function(m) {
      return this.imul(m, m.clone());
    }, Q.prototype.sqr = function(m) {
      return this.mul(m, m);
    }, Q.prototype.sqrt = function(m) {
      if (m.isZero())
        return m.clone();
      var b = this.m.andln(3);
      if (i(b % 2 === 1), b === 3) {
        var a = this.m.add(new r(1)).iushrn(2);
        return this.pow(m, a);
      }
      for (var h = this.m.subn(1), y = 0; !h.isZero() && h.andln(1) === 0; )
        y++, h.iushrn(1);
      i(!h.isZero());
      var x = new r(1).toRed(this), A = x.redNeg(), B = this.m.subn(1).iushrn(1), _ = this.m.bitLength();
      for (_ = new r(2 * _ * _).toRed(this); this.pow(_, B).cmp(A) !== 0; )
        _.redIAdd(A);
      for (var E = this.pow(_, h), d = this.pow(m, h.addn(1).iushrn(1)), M = this.pow(m, h), Z = y; M.cmp(x) !== 0; ) {
        for (var re = M, J = 0; re.cmp(x) !== 0; J++)
          re = re.redSqr();
        i(J < Z);
        var ee = this.pow(E, new r(1).iushln(Z - J - 1));
        d = d.redMul(ee), E = ee.redSqr(), M = M.redMul(E), Z = J;
      }
      return d;
    }, Q.prototype.invm = function(m) {
      var b = m._invmp(this.m);
      return b.negative !== 0 ? (b.negative = 0, this.imod(b).redNeg()) : this.imod(b);
    }, Q.prototype.pow = function(m, b) {
      if (b.isZero())
        return new r(1).toRed(this);
      if (b.cmpn(1) === 0)
        return m.clone();
      var a = 4, h = new Array(1 << a);
      h[0] = new r(1).toRed(this), h[1] = m;
      for (var y = 2; y < h.length; y++)
        h[y] = this.mul(h[y - 1], m);
      var x = h[0], A = 0, B = 0, _ = b.bitLength() % 26;
      for (_ === 0 && (_ = 26), y = b.length - 1; y >= 0; y--) {
        for (var E = b.words[y], d = _ - 1; d >= 0; d--) {
          var M = E >> d & 1;
          if (x !== h[0] && (x = this.sqr(x)), M === 0 && A === 0) {
            B = 0;
            continue;
          }
          A <<= 1, A |= M, B++, !(B !== a && (y !== 0 || d !== 0)) && (x = this.mul(x, h[A]), B = 0, A = 0);
        }
        _ = 26;
      }
      return x;
    }, Q.prototype.convertTo = function(m) {
      var b = m.umod(this.m);
      return b === m ? b.clone() : b;
    }, Q.prototype.convertFrom = function(m) {
      var b = m.clone();
      return b.red = null, b;
    }, r.mont = function(m) {
      return new se(m);
    };
    function se(k) {
      Q.call(this, k), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(se, Q), se.prototype.convertTo = function(m) {
      return this.imod(m.ushln(this.shift));
    }, se.prototype.convertFrom = function(m) {
      var b = this.imod(m.mul(this.rinv));
      return b.red = null, b;
    }, se.prototype.imul = function(m, b) {
      if (m.isZero() || b.isZero())
        return m.words[0] = 0, m.length = 1, m;
      var a = m.imul(b), h = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = a.isub(h).iushrn(this.shift), x = y;
      return y.cmp(this.m) >= 0 ? x = y.isub(this.m) : y.cmpn(0) < 0 && (x = y.iadd(this.m)), x._forceRed(this);
    }, se.prototype.mul = function(m, b) {
      if (m.isZero() || b.isZero())
        return new r(0)._forceRed(this);
      var a = m.mul(b), h = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = a.isub(h).iushrn(this.shift), x = y;
      return y.cmp(this.m) >= 0 ? x = y.isub(this.m) : y.cmpn(0) < 0 && (x = y.iadd(this.m)), x._forceRed(this);
    }, se.prototype.invm = function(m) {
      var b = this.imod(m._invmp(this.m).mul(this.r2));
      return b._forceRed(this);
    };
  })(e, Ne);
})(aw);
var mi = {}, fw = {
  get exports() {
    return mi;
  },
  set exports(e) {
    mi = e;
  }
}, Ll;
function Oc() {
  if (Ll)
    return mi;
  Ll = 1;
  var e;
  fw.exports = function(f) {
    return e || (e = new t(null)), e.generate(f);
  };
  function t(i) {
    this.rand = i;
  }
  if (mi.Rand = t, t.prototype.generate = function(f) {
    return this._rand(f);
  }, t.prototype._rand = function(f) {
    if (this.rand.getBytes)
      return this.rand.getBytes(f);
    for (var r = new Uint8Array(f), o = 0; o < r.length; o++)
      r[o] = this.rand.getByte();
    return r;
  }, typeof self == "object")
    self.crypto && self.crypto.getRandomValues ? t.prototype._rand = function(f) {
      var r = new Uint8Array(f);
      return self.crypto.getRandomValues(r), r;
    } : self.msCrypto && self.msCrypto.getRandomValues ? t.prototype._rand = function(f) {
      var r = new Uint8Array(f);
      return self.msCrypto.getRandomValues(r), r;
    } : typeof window == "object" && (t.prototype._rand = function() {
      throw new Error("Not implemented yet");
    });
  else
    try {
      var n = Fc();
      if (typeof n.randomBytes != "function")
        throw new Error("Not supported");
      t.prototype._rand = function(f) {
        return n.randomBytes(f);
      };
    } catch {
    }
  return mi;
}
var Ts, $l;
function Vp() {
  if ($l)
    return Ts;
  $l = 1;
  var e = Ht, t = Oc();
  function n(i) {
    this.rand = i || new t.Rand();
  }
  return Ts = n, n.create = function(f) {
    return new n(f);
  }, n.prototype._randbelow = function(f) {
    var r = f.bitLength(), o = Math.ceil(r / 8);
    do
      var s = new e(this.rand.generate(o));
    while (s.cmp(f) >= 0);
    return s;
  }, n.prototype._randrange = function(f, r) {
    var o = r.sub(f);
    return f.add(this._randbelow(o));
  }, n.prototype.test = function(f, r, o) {
    var s = f.bitLength(), c = e.mont(f), l = new e(1).toRed(c);
    r || (r = Math.max(1, s / 48 | 0));
    for (var u = f.subn(1), v = 0; !u.testn(v); v++)
      ;
    for (var p = f.shrn(v), g = u.toRed(c), w = !0; r > 0; r--) {
      var S = this._randrange(new e(2), u);
      o && o(S);
      var T = S.toRed(c).redPow(p);
      if (!(T.cmp(l) === 0 || T.cmp(g) === 0)) {
        for (var I = 1; I < v; I++) {
          if (T = T.redSqr(), T.cmp(l) === 0)
            return !1;
          if (T.cmp(g) === 0)
            break;
        }
        if (I === v)
          return !1;
      }
    }
    return w;
  }, n.prototype.getDivisor = function(f, r) {
    var o = f.bitLength(), s = e.mont(f), c = new e(1).toRed(s);
    r || (r = Math.max(1, o / 48 | 0));
    for (var l = f.subn(1), u = 0; !l.testn(u); u++)
      ;
    for (var v = f.shrn(u), p = l.toRed(s); r > 0; r--) {
      var g = this._randrange(new e(2), l), w = f.gcd(g);
      if (w.cmpn(1) !== 0)
        return w;
      var S = g.toRed(s).redPow(v);
      if (!(S.cmp(c) === 0 || S.cmp(p) === 0)) {
        for (var T = 1; T < u; T++) {
          if (S = S.redSqr(), S.cmp(c) === 0)
            return S.fromRed().subn(1).gcd(f);
          if (S.cmp(p) === 0)
            break;
        }
        if (T === u)
          return S = S.redSqr(), S.fromRed().subn(1).gcd(f);
      }
    }
    return !1;
  }, Ts;
}
var Ps, kl;
function Kp() {
  if (kl)
    return Ps;
  kl = 1;
  var e = ai();
  Ps = T, T.simpleSieve = w, T.fermatTest = S;
  var t = Ht, n = new t(24), i = Vp(), f = new i(), r = new t(1), o = new t(2), s = new t(5);
  new t(16), new t(8);
  var c = new t(10), l = new t(3);
  new t(7);
  var u = new t(11), v = new t(4);
  new t(12);
  var p = null;
  function g() {
    if (p !== null)
      return p;
    var I = 1048576, C = [];
    C[0] = 2;
    for (var N = 1, $ = 3; $ < I; $ += 2) {
      for (var D = Math.ceil(Math.sqrt($)), H = 0; H < N && C[H] <= D && $ % C[H] !== 0; H++)
        ;
      N !== H && C[H] <= D || (C[N++] = $);
    }
    return p = C, C;
  }
  function w(I) {
    for (var C = g(), N = 0; N < C.length; N++)
      if (I.modn(C[N]) === 0)
        return I.cmpn(C[N]) === 0;
    return !0;
  }
  function S(I) {
    var C = t.mont(I);
    return o.toRed(C).redPow(I.subn(1)).fromRed().cmpn(1) === 0;
  }
  function T(I, C) {
    if (I < 16)
      return C === 2 || C === 5 ? new t([140, 123]) : new t([140, 39]);
    C = new t(C);
    for (var N, $; ; ) {
      for (N = new t(e(Math.ceil(I / 8))); N.bitLength() > I; )
        N.ishrn(1);
      if (N.isEven() && N.iadd(r), N.testn(1) || N.iadd(o), C.cmp(o)) {
        if (!C.cmp(s))
          for (; N.mod(c).cmp(l); )
            N.iadd(v);
      } else
        for (; N.mod(n).cmp(u); )
          N.iadd(v);
      if ($ = N.shrn(1), w($) && w(N) && S($) && S(N) && f.test($) && f.test(N))
        return N;
    }
  }
  return Ps;
}
const ow = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
}, sw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
}, uw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
}, cw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
}, hw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
}, lw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
}, dw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
}, pw = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}, vw = {
  modp1: ow,
  modp2: sw,
  modp5: uw,
  modp14: cw,
  modp15: hw,
  modp16: lw,
  modp17: dw,
  modp18: pw
};
var Cs, jl;
function bw() {
  if (jl)
    return Cs;
  jl = 1;
  var e = Ht, t = Vp(), n = new t(), i = new e(24), f = new e(11), r = new e(10), o = new e(3), s = new e(7), c = Kp(), l = ai();
  Cs = w;
  function u(T, I) {
    return I = I || "utf8", Buffer.isBuffer(T) || (T = new Buffer(T, I)), this._pub = new e(T), this;
  }
  function v(T, I) {
    return I = I || "utf8", Buffer.isBuffer(T) || (T = new Buffer(T, I)), this._priv = new e(T), this;
  }
  var p = {};
  function g(T, I) {
    var C = I.toString("hex"), N = [C, T.toString(16)].join("_");
    if (N in p)
      return p[N];
    var $ = 0;
    if (T.isEven() || !c.simpleSieve || !c.fermatTest(T) || !n.test(T))
      return $ += 1, C === "02" || C === "05" ? $ += 8 : $ += 4, p[N] = $, $;
    n.test(T.shrn(1)) || ($ += 2);
    var D;
    switch (C) {
      case "02":
        T.mod(i).cmp(f) && ($ += 8);
        break;
      case "05":
        D = T.mod(r), D.cmp(o) && D.cmp(s) && ($ += 8);
        break;
      default:
        $ += 4;
    }
    return p[N] = $, $;
  }
  function w(T, I, C) {
    this.setGenerator(I), this.__prime = new e(T), this._prime = e.mont(this.__prime), this._primeLen = T.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, C ? (this.setPublicKey = u, this.setPrivateKey = v) : this._primeCode = 8;
  }
  Object.defineProperty(w.prototype, "verifyError", {
    enumerable: !0,
    get: function() {
      return typeof this._primeCode != "number" && (this._primeCode = g(this.__prime, this.__gen)), this._primeCode;
    }
  }), w.prototype.generateKeys = function() {
    return this._priv || (this._priv = new e(l(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey();
  }, w.prototype.computeSecret = function(T) {
    T = new e(T), T = T.toRed(this._prime);
    var I = T.redPow(this._priv).fromRed(), C = new Buffer(I.toArray()), N = this.getPrime();
    if (C.length < N.length) {
      var $ = new Buffer(N.length - C.length);
      $.fill(0), C = Buffer.concat([$, C]);
    }
    return C;
  }, w.prototype.getPublicKey = function(I) {
    return S(this._pub, I);
  }, w.prototype.getPrivateKey = function(I) {
    return S(this._priv, I);
  }, w.prototype.getPrime = function(T) {
    return S(this.__prime, T);
  }, w.prototype.getGenerator = function(T) {
    return S(this._gen, T);
  }, w.prototype.setGenerator = function(T, I) {
    return I = I || "utf8", Buffer.isBuffer(T) || (T = new Buffer(T, I)), this.__gen = T, this._gen = new e(T), this;
  };
  function S(T, I) {
    var C = new Buffer(T.toArray());
    return I ? C.toString(I) : C;
  }
  return Cs;
}
var Dl;
function yw() {
  if (Dl)
    return bn;
  Dl = 1;
  var e = Kp(), t = vw, n = bw();
  function i(o) {
    var s = new Buffer(t[o].prime, "hex"), c = new Buffer(t[o].gen, "hex");
    return new n(s, c);
  }
  var f = {
    binary: !0,
    hex: !0,
    base64: !0
  };
  function r(o, s, c, l) {
    return Buffer.isBuffer(s) || f[s] === void 0 ? r(o, "binary", s, c) : (s = s || "binary", l = l || "binary", c = c || new Buffer([2]), Buffer.isBuffer(c) || (c = new Buffer(c, l)), typeof o == "number" ? new n(e(o, c), c, !0) : (Buffer.isBuffer(o) || (o = new Buffer(o, s)), new n(o, c, !0)));
  }
  return bn.DiffieHellmanGroup = bn.createDiffieHellmanGroup = bn.getDiffieHellman = i, bn.createDiffieHellman = bn.DiffieHellman = r, bn;
}
var Dn = {}, gw = {
  get exports() {
    return Dn;
  },
  set exports(e) {
    Dn = e;
  }
}, Aa = {}, mw = {
  get exports() {
    return Aa;
  },
  set exports(e) {
    Aa = e;
  }
}, ql;
function ww() {
  return ql || (ql = 1, function(e) {
    (function(t, n) {
      function i(b, a) {
        if (!b)
          throw new Error(a || "Assertion failed");
      }
      function f(b, a) {
        b.super_ = a;
        var h = function() {
        };
        h.prototype = a.prototype, b.prototype = new h(), b.prototype.constructor = b;
      }
      function r(b, a, h) {
        if (r.isBN(b))
          return b;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((a === "le" || a === "be") && (h = a, a = 10), this._init(b || 0, a || 10, h || "be"));
      }
      typeof t == "object" ? t.exports = r : n.BN = r, r.BN = r, r.wordSize = 26;
      var o;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Nr.Buffer;
      } catch {
      }
      r.isBN = function(a) {
        return a instanceof r ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === r.wordSize && Array.isArray(a.words);
      }, r.max = function(a, h) {
        return a.cmp(h) > 0 ? a : h;
      }, r.min = function(a, h) {
        return a.cmp(h) < 0 ? a : h;
      }, r.prototype._init = function(a, h, y) {
        if (typeof a == "number")
          return this._initNumber(a, h, y);
        if (typeof a == "object")
          return this._initArray(a, h, y);
        h === "hex" && (h = 16), i(h === (h | 0) && h >= 2 && h <= 36), a = a.toString().replace(/\s+/g, "");
        var x = 0;
        a[0] === "-" && (x++, this.negative = 1), x < a.length && (h === 16 ? this._parseHex(a, x, y) : (this._parseBase(a, h, x), y === "le" && this._initArray(this.toArray(), h, y)));
      }, r.prototype._initNumber = function(a, h, y) {
        a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
          a & 67108863,
          a / 67108864 & 67108863
        ], this.length = 2) : (i(a < 9007199254740992), this.words = [
          a & 67108863,
          a / 67108864 & 67108863,
          1
        ], this.length = 3), y === "le" && this._initArray(this.toArray(), h, y);
      }, r.prototype._initArray = function(a, h, y) {
        if (i(typeof a.length == "number"), a.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var A, B, _ = 0;
        if (y === "be")
          for (x = a.length - 1, A = 0; x >= 0; x -= 3)
            B = a[x] | a[x - 1] << 8 | a[x - 2] << 16, this.words[A] |= B << _ & 67108863, this.words[A + 1] = B >>> 26 - _ & 67108863, _ += 24, _ >= 26 && (_ -= 26, A++);
        else if (y === "le")
          for (x = 0, A = 0; x < a.length; x += 3)
            B = a[x] | a[x + 1] << 8 | a[x + 2] << 16, this.words[A] |= B << _ & 67108863, this.words[A + 1] = B >>> 26 - _ & 67108863, _ += 24, _ >= 26 && (_ -= 26, A++);
        return this._strip();
      };
      function s(b, a) {
        var h = b.charCodeAt(a);
        if (h >= 48 && h <= 57)
          return h - 48;
        if (h >= 65 && h <= 70)
          return h - 55;
        if (h >= 97 && h <= 102)
          return h - 87;
        i(!1, "Invalid character in " + b);
      }
      function c(b, a, h) {
        var y = s(b, h);
        return h - 1 >= a && (y |= s(b, h - 1) << 4), y;
      }
      r.prototype._parseHex = function(a, h, y) {
        this.length = Math.ceil((a.length - h) / 6), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var A = 0, B = 0, _;
        if (y === "be")
          for (x = a.length - 1; x >= h; x -= 2)
            _ = c(a, h, x) << A, this.words[B] |= _ & 67108863, A >= 18 ? (A -= 18, B += 1, this.words[B] |= _ >>> 26) : A += 8;
        else {
          var E = a.length - h;
          for (x = E % 2 === 0 ? h + 1 : h; x < a.length; x += 2)
            _ = c(a, h, x) << A, this.words[B] |= _ & 67108863, A >= 18 ? (A -= 18, B += 1, this.words[B] |= _ >>> 26) : A += 8;
        }
        this._strip();
      };
      function l(b, a, h, y) {
        for (var x = 0, A = 0, B = Math.min(b.length, h), _ = a; _ < B; _++) {
          var E = b.charCodeAt(_) - 48;
          x *= y, E >= 49 ? A = E - 49 + 10 : E >= 17 ? A = E - 17 + 10 : A = E, i(E >= 0 && A < y, "Invalid character"), x += A;
        }
        return x;
      }
      r.prototype._parseBase = function(a, h, y) {
        this.words = [0], this.length = 1;
        for (var x = 0, A = 1; A <= 67108863; A *= h)
          x++;
        x--, A = A / h | 0;
        for (var B = a.length - y, _ = B % x, E = Math.min(B, B - _) + y, d = 0, M = y; M < E; M += x)
          d = l(a, M, M + x, h), this.imuln(A), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
        if (_ !== 0) {
          var Z = 1;
          for (d = l(a, M, a.length, h), M = 0; M < _; M++)
            Z *= h;
          this.imuln(Z), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
        }
        this._strip();
      }, r.prototype.copy = function(a) {
        a.words = new Array(this.length);
        for (var h = 0; h < this.length; h++)
          a.words[h] = this.words[h];
        a.length = this.length, a.negative = this.negative, a.red = this.red;
      };
      function u(b, a) {
        b.words = a.words, b.length = a.length, b.negative = a.negative, b.red = a.red;
      }
      if (r.prototype._move = function(a) {
        u(a, this);
      }, r.prototype.clone = function() {
        var a = new r(null);
        return this.copy(a), a;
      }, r.prototype._expand = function(a) {
        for (; this.length < a; )
          this.words[this.length++] = 0;
        return this;
      }, r.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, r.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          r.prototype[Symbol.for("nodejs.util.inspect.custom")] = v;
        } catch {
          r.prototype.inspect = v;
        }
      else
        r.prototype.inspect = v;
      function v() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var p = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], g = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], w = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      r.prototype.toString = function(a, h) {
        a = a || 10, h = h | 0 || 1;
        var y;
        if (a === 16 || a === "hex") {
          y = "";
          for (var x = 0, A = 0, B = 0; B < this.length; B++) {
            var _ = this.words[B], E = ((_ << x | A) & 16777215).toString(16);
            A = _ >>> 24 - x & 16777215, x += 2, x >= 26 && (x -= 26, B--), A !== 0 || B !== this.length - 1 ? y = p[6 - E.length] + E + y : y = E + y;
          }
          for (A !== 0 && (y = A.toString(16) + y); y.length % h !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        if (a === (a | 0) && a >= 2 && a <= 36) {
          var d = g[a], M = w[a];
          y = "";
          var Z = this.clone();
          for (Z.negative = 0; !Z.isZero(); ) {
            var re = Z.modrn(M).toString(a);
            Z = Z.idivn(M), Z.isZero() ? y = re + y : y = p[d - re.length] + re + y;
          }
          for (this.isZero() && (y = "0" + y); y.length % h !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        i(!1, "Base should be between 2 and 36");
      }, r.prototype.toNumber = function() {
        var a = this.words[0];
        return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
      }, r.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, o && (r.prototype.toBuffer = function(a, h) {
        return this.toArrayLike(o, a, h);
      }), r.prototype.toArray = function(a, h) {
        return this.toArrayLike(Array, a, h);
      };
      var S = function(a, h) {
        return a.allocUnsafe ? a.allocUnsafe(h) : new a(h);
      };
      r.prototype.toArrayLike = function(a, h, y) {
        this._strip();
        var x = this.byteLength(), A = y || Math.max(1, x);
        i(x <= A, "byte array longer than desired length"), i(A > 0, "Requested array length <= 0");
        var B = S(a, A), _ = h === "le" ? "LE" : "BE";
        return this["_toArrayLike" + _](B, x), B;
      }, r.prototype._toArrayLikeLE = function(a, h) {
        for (var y = 0, x = 0, A = 0, B = 0; A < this.length; A++) {
          var _ = this.words[A] << B | x;
          a[y++] = _ & 255, y < a.length && (a[y++] = _ >> 8 & 255), y < a.length && (a[y++] = _ >> 16 & 255), B === 6 ? (y < a.length && (a[y++] = _ >> 24 & 255), x = 0, B = 0) : (x = _ >>> 24, B += 2);
        }
        if (y < a.length)
          for (a[y++] = x; y < a.length; )
            a[y++] = 0;
      }, r.prototype._toArrayLikeBE = function(a, h) {
        for (var y = a.length - 1, x = 0, A = 0, B = 0; A < this.length; A++) {
          var _ = this.words[A] << B | x;
          a[y--] = _ & 255, y >= 0 && (a[y--] = _ >> 8 & 255), y >= 0 && (a[y--] = _ >> 16 & 255), B === 6 ? (y >= 0 && (a[y--] = _ >> 24 & 255), x = 0, B = 0) : (x = _ >>> 24, B += 2);
        }
        if (y >= 0)
          for (a[y--] = x; y >= 0; )
            a[y--] = 0;
      }, Math.clz32 ? r.prototype._countBits = function(a) {
        return 32 - Math.clz32(a);
      } : r.prototype._countBits = function(a) {
        var h = a, y = 0;
        return h >= 4096 && (y += 13, h >>>= 13), h >= 64 && (y += 7, h >>>= 7), h >= 8 && (y += 4, h >>>= 4), h >= 2 && (y += 2, h >>>= 2), y + h;
      }, r.prototype._zeroBits = function(a) {
        if (a === 0)
          return 26;
        var h = a, y = 0;
        return h & 8191 || (y += 13, h >>>= 13), h & 127 || (y += 7, h >>>= 7), h & 15 || (y += 4, h >>>= 4), h & 3 || (y += 2, h >>>= 2), h & 1 || y++, y;
      }, r.prototype.bitLength = function() {
        var a = this.words[this.length - 1], h = this._countBits(a);
        return (this.length - 1) * 26 + h;
      };
      function T(b) {
        for (var a = new Array(b.bitLength()), h = 0; h < a.length; h++) {
          var y = h / 26 | 0, x = h % 26;
          a[h] = b.words[y] >>> x & 1;
        }
        return a;
      }
      r.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var a = 0, h = 0; h < this.length; h++) {
          var y = this._zeroBits(this.words[h]);
          if (a += y, y !== 26)
            break;
        }
        return a;
      }, r.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, r.prototype.toTwos = function(a) {
        return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
      }, r.prototype.fromTwos = function(a) {
        return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
      }, r.prototype.isNeg = function() {
        return this.negative !== 0;
      }, r.prototype.neg = function() {
        return this.clone().ineg();
      }, r.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, r.prototype.iuor = function(a) {
        for (; this.length < a.length; )
          this.words[this.length++] = 0;
        for (var h = 0; h < a.length; h++)
          this.words[h] = this.words[h] | a.words[h];
        return this._strip();
      }, r.prototype.ior = function(a) {
        return i((this.negative | a.negative) === 0), this.iuor(a);
      }, r.prototype.or = function(a) {
        return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
      }, r.prototype.uor = function(a) {
        return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
      }, r.prototype.iuand = function(a) {
        var h;
        this.length > a.length ? h = a : h = this;
        for (var y = 0; y < h.length; y++)
          this.words[y] = this.words[y] & a.words[y];
        return this.length = h.length, this._strip();
      }, r.prototype.iand = function(a) {
        return i((this.negative | a.negative) === 0), this.iuand(a);
      }, r.prototype.and = function(a) {
        return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
      }, r.prototype.uand = function(a) {
        return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
      }, r.prototype.iuxor = function(a) {
        var h, y;
        this.length > a.length ? (h = this, y = a) : (h = a, y = this);
        for (var x = 0; x < y.length; x++)
          this.words[x] = h.words[x] ^ y.words[x];
        if (this !== h)
          for (; x < h.length; x++)
            this.words[x] = h.words[x];
        return this.length = h.length, this._strip();
      }, r.prototype.ixor = function(a) {
        return i((this.negative | a.negative) === 0), this.iuxor(a);
      }, r.prototype.xor = function(a) {
        return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
      }, r.prototype.uxor = function(a) {
        return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
      }, r.prototype.inotn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = Math.ceil(a / 26) | 0, y = a % 26;
        this._expand(h), y > 0 && h--;
        for (var x = 0; x < h; x++)
          this.words[x] = ~this.words[x] & 67108863;
        return y > 0 && (this.words[x] = ~this.words[x] & 67108863 >> 26 - y), this._strip();
      }, r.prototype.notn = function(a) {
        return this.clone().inotn(a);
      }, r.prototype.setn = function(a, h) {
        i(typeof a == "number" && a >= 0);
        var y = a / 26 | 0, x = a % 26;
        return this._expand(y + 1), h ? this.words[y] = this.words[y] | 1 << x : this.words[y] = this.words[y] & ~(1 << x), this._strip();
      }, r.prototype.iadd = function(a) {
        var h;
        if (this.negative !== 0 && a.negative === 0)
          return this.negative = 0, h = this.isub(a), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && a.negative !== 0)
          return a.negative = 0, h = this.isub(a), a.negative = 1, h._normSign();
        var y, x;
        this.length > a.length ? (y = this, x = a) : (y = a, x = this);
        for (var A = 0, B = 0; B < x.length; B++)
          h = (y.words[B] | 0) + (x.words[B] | 0) + A, this.words[B] = h & 67108863, A = h >>> 26;
        for (; A !== 0 && B < y.length; B++)
          h = (y.words[B] | 0) + A, this.words[B] = h & 67108863, A = h >>> 26;
        if (this.length = y.length, A !== 0)
          this.words[this.length] = A, this.length++;
        else if (y !== this)
          for (; B < y.length; B++)
            this.words[B] = y.words[B];
        return this;
      }, r.prototype.add = function(a) {
        var h;
        return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, h = this.sub(a), a.negative ^= 1, h) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = a.sub(this), this.negative = 1, h) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
      }, r.prototype.isub = function(a) {
        if (a.negative !== 0) {
          a.negative = 0;
          var h = this.iadd(a);
          return a.negative = 1, h._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
        var y = this.cmp(a);
        if (y === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var x, A;
        y > 0 ? (x = this, A = a) : (x = a, A = this);
        for (var B = 0, _ = 0; _ < A.length; _++)
          h = (x.words[_] | 0) - (A.words[_] | 0) + B, B = h >> 26, this.words[_] = h & 67108863;
        for (; B !== 0 && _ < x.length; _++)
          h = (x.words[_] | 0) + B, B = h >> 26, this.words[_] = h & 67108863;
        if (B === 0 && _ < x.length && x !== this)
          for (; _ < x.length; _++)
            this.words[_] = x.words[_];
        return this.length = Math.max(this.length, _), x !== this && (this.negative = 1), this._strip();
      }, r.prototype.sub = function(a) {
        return this.clone().isub(a);
      };
      function I(b, a, h) {
        h.negative = a.negative ^ b.negative;
        var y = b.length + a.length | 0;
        h.length = y, y = y - 1 | 0;
        var x = b.words[0] | 0, A = a.words[0] | 0, B = x * A, _ = B & 67108863, E = B / 67108864 | 0;
        h.words[0] = _;
        for (var d = 1; d < y; d++) {
          for (var M = E >>> 26, Z = E & 67108863, re = Math.min(d, a.length - 1), J = Math.max(0, d - b.length + 1); J <= re; J++) {
            var ee = d - J | 0;
            x = b.words[ee] | 0, A = a.words[J] | 0, B = x * A + Z, M += B / 67108864 | 0, Z = B & 67108863;
          }
          h.words[d] = Z | 0, E = M | 0;
        }
        return E !== 0 ? h.words[d] = E | 0 : h.length--, h._strip();
      }
      var C = function(a, h, y) {
        var x = a.words, A = h.words, B = y.words, _ = 0, E, d, M, Z = x[0] | 0, re = Z & 8191, J = Z >>> 13, ee = x[1] | 0, ue = ee & 8191, le = ee >>> 13, Se = x[2] | 0, W = Se & 8191, K = Se >>> 13, pe = x[3] | 0, me = pe & 8191, Ie = pe >>> 13, z = x[4] | 0, P = z & 8191, L = z >>> 13, F = x[5] | 0, fe = F & 8191, ce = F >>> 13, we = x[6] | 0, Ce = we & 8191, Re = we >>> 13, We = x[7] | 0, je = We & 8191, Pe = We >>> 13, ct = x[8] | 0, ft = ct & 8191, Ke = ct >>> 13, Tt = x[9] | 0, it = Tt & 8191, Fe = Tt >>> 13, xt = A[0] | 0, rt = xt & 8191, Ve = xt >>> 13, Mt = A[1] | 0, at = Mt & 8191, ze = Mt >>> 13, At = A[2] | 0, st = At & 8191, De = At >>> 13, _t = A[3] | 0, Xe = _t & 8191, X = _t >>> 13, G = A[4] | 0, Y = G & 8191, te = G >>> 13, de = A[5] | 0, ge = de & 8191, ve = de >>> 13, Te = A[6] | 0, O = Te & 8191, j = Te >>> 13, q = A[7] | 0, R = q & 8191, U = q >>> 13, oe = A[8] | 0, ae = oe & 8191, he = oe >>> 13, xe = A[9] | 0, Me = xe & 8191, _e = xe >>> 13;
        y.negative = a.negative ^ h.negative, y.length = 19, E = Math.imul(re, rt), d = Math.imul(re, Ve), d = d + Math.imul(J, rt) | 0, M = Math.imul(J, Ve);
        var ut = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ut >>> 26) | 0, ut &= 67108863, E = Math.imul(ue, rt), d = Math.imul(ue, Ve), d = d + Math.imul(le, rt) | 0, M = Math.imul(le, Ve), E = E + Math.imul(re, at) | 0, d = d + Math.imul(re, ze) | 0, d = d + Math.imul(J, at) | 0, M = M + Math.imul(J, ze) | 0;
        var $e = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + ($e >>> 26) | 0, $e &= 67108863, E = Math.imul(W, rt), d = Math.imul(W, Ve), d = d + Math.imul(K, rt) | 0, M = Math.imul(K, Ve), E = E + Math.imul(ue, at) | 0, d = d + Math.imul(ue, ze) | 0, d = d + Math.imul(le, at) | 0, M = M + Math.imul(le, ze) | 0, E = E + Math.imul(re, st) | 0, d = d + Math.imul(re, De) | 0, d = d + Math.imul(J, st) | 0, M = M + Math.imul(J, De) | 0;
        var Je = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, E = Math.imul(me, rt), d = Math.imul(me, Ve), d = d + Math.imul(Ie, rt) | 0, M = Math.imul(Ie, Ve), E = E + Math.imul(W, at) | 0, d = d + Math.imul(W, ze) | 0, d = d + Math.imul(K, at) | 0, M = M + Math.imul(K, ze) | 0, E = E + Math.imul(ue, st) | 0, d = d + Math.imul(ue, De) | 0, d = d + Math.imul(le, st) | 0, M = M + Math.imul(le, De) | 0, E = E + Math.imul(re, Xe) | 0, d = d + Math.imul(re, X) | 0, d = d + Math.imul(J, Xe) | 0, M = M + Math.imul(J, X) | 0;
        var Ze = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ze >>> 26) | 0, Ze &= 67108863, E = Math.imul(P, rt), d = Math.imul(P, Ve), d = d + Math.imul(L, rt) | 0, M = Math.imul(L, Ve), E = E + Math.imul(me, at) | 0, d = d + Math.imul(me, ze) | 0, d = d + Math.imul(Ie, at) | 0, M = M + Math.imul(Ie, ze) | 0, E = E + Math.imul(W, st) | 0, d = d + Math.imul(W, De) | 0, d = d + Math.imul(K, st) | 0, M = M + Math.imul(K, De) | 0, E = E + Math.imul(ue, Xe) | 0, d = d + Math.imul(ue, X) | 0, d = d + Math.imul(le, Xe) | 0, M = M + Math.imul(le, X) | 0, E = E + Math.imul(re, Y) | 0, d = d + Math.imul(re, te) | 0, d = d + Math.imul(J, Y) | 0, M = M + Math.imul(J, te) | 0;
        var nt = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (nt >>> 26) | 0, nt &= 67108863, E = Math.imul(fe, rt), d = Math.imul(fe, Ve), d = d + Math.imul(ce, rt) | 0, M = Math.imul(ce, Ve), E = E + Math.imul(P, at) | 0, d = d + Math.imul(P, ze) | 0, d = d + Math.imul(L, at) | 0, M = M + Math.imul(L, ze) | 0, E = E + Math.imul(me, st) | 0, d = d + Math.imul(me, De) | 0, d = d + Math.imul(Ie, st) | 0, M = M + Math.imul(Ie, De) | 0, E = E + Math.imul(W, Xe) | 0, d = d + Math.imul(W, X) | 0, d = d + Math.imul(K, Xe) | 0, M = M + Math.imul(K, X) | 0, E = E + Math.imul(ue, Y) | 0, d = d + Math.imul(ue, te) | 0, d = d + Math.imul(le, Y) | 0, M = M + Math.imul(le, te) | 0, E = E + Math.imul(re, ge) | 0, d = d + Math.imul(re, ve) | 0, d = d + Math.imul(J, ge) | 0, M = M + Math.imul(J, ve) | 0;
        var tt = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (tt >>> 26) | 0, tt &= 67108863, E = Math.imul(Ce, rt), d = Math.imul(Ce, Ve), d = d + Math.imul(Re, rt) | 0, M = Math.imul(Re, Ve), E = E + Math.imul(fe, at) | 0, d = d + Math.imul(fe, ze) | 0, d = d + Math.imul(ce, at) | 0, M = M + Math.imul(ce, ze) | 0, E = E + Math.imul(P, st) | 0, d = d + Math.imul(P, De) | 0, d = d + Math.imul(L, st) | 0, M = M + Math.imul(L, De) | 0, E = E + Math.imul(me, Xe) | 0, d = d + Math.imul(me, X) | 0, d = d + Math.imul(Ie, Xe) | 0, M = M + Math.imul(Ie, X) | 0, E = E + Math.imul(W, Y) | 0, d = d + Math.imul(W, te) | 0, d = d + Math.imul(K, Y) | 0, M = M + Math.imul(K, te) | 0, E = E + Math.imul(ue, ge) | 0, d = d + Math.imul(ue, ve) | 0, d = d + Math.imul(le, ge) | 0, M = M + Math.imul(le, ve) | 0, E = E + Math.imul(re, O) | 0, d = d + Math.imul(re, j) | 0, d = d + Math.imul(J, O) | 0, M = M + Math.imul(J, j) | 0;
        var Ye = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, E = Math.imul(je, rt), d = Math.imul(je, Ve), d = d + Math.imul(Pe, rt) | 0, M = Math.imul(Pe, Ve), E = E + Math.imul(Ce, at) | 0, d = d + Math.imul(Ce, ze) | 0, d = d + Math.imul(Re, at) | 0, M = M + Math.imul(Re, ze) | 0, E = E + Math.imul(fe, st) | 0, d = d + Math.imul(fe, De) | 0, d = d + Math.imul(ce, st) | 0, M = M + Math.imul(ce, De) | 0, E = E + Math.imul(P, Xe) | 0, d = d + Math.imul(P, X) | 0, d = d + Math.imul(L, Xe) | 0, M = M + Math.imul(L, X) | 0, E = E + Math.imul(me, Y) | 0, d = d + Math.imul(me, te) | 0, d = d + Math.imul(Ie, Y) | 0, M = M + Math.imul(Ie, te) | 0, E = E + Math.imul(W, ge) | 0, d = d + Math.imul(W, ve) | 0, d = d + Math.imul(K, ge) | 0, M = M + Math.imul(K, ve) | 0, E = E + Math.imul(ue, O) | 0, d = d + Math.imul(ue, j) | 0, d = d + Math.imul(le, O) | 0, M = M + Math.imul(le, j) | 0, E = E + Math.imul(re, R) | 0, d = d + Math.imul(re, U) | 0, d = d + Math.imul(J, R) | 0, M = M + Math.imul(J, U) | 0;
        var et = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (et >>> 26) | 0, et &= 67108863, E = Math.imul(ft, rt), d = Math.imul(ft, Ve), d = d + Math.imul(Ke, rt) | 0, M = Math.imul(Ke, Ve), E = E + Math.imul(je, at) | 0, d = d + Math.imul(je, ze) | 0, d = d + Math.imul(Pe, at) | 0, M = M + Math.imul(Pe, ze) | 0, E = E + Math.imul(Ce, st) | 0, d = d + Math.imul(Ce, De) | 0, d = d + Math.imul(Re, st) | 0, M = M + Math.imul(Re, De) | 0, E = E + Math.imul(fe, Xe) | 0, d = d + Math.imul(fe, X) | 0, d = d + Math.imul(ce, Xe) | 0, M = M + Math.imul(ce, X) | 0, E = E + Math.imul(P, Y) | 0, d = d + Math.imul(P, te) | 0, d = d + Math.imul(L, Y) | 0, M = M + Math.imul(L, te) | 0, E = E + Math.imul(me, ge) | 0, d = d + Math.imul(me, ve) | 0, d = d + Math.imul(Ie, ge) | 0, M = M + Math.imul(Ie, ve) | 0, E = E + Math.imul(W, O) | 0, d = d + Math.imul(W, j) | 0, d = d + Math.imul(K, O) | 0, M = M + Math.imul(K, j) | 0, E = E + Math.imul(ue, R) | 0, d = d + Math.imul(ue, U) | 0, d = d + Math.imul(le, R) | 0, M = M + Math.imul(le, U) | 0, E = E + Math.imul(re, ae) | 0, d = d + Math.imul(re, he) | 0, d = d + Math.imul(J, ae) | 0, M = M + Math.imul(J, he) | 0;
        var Qe = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, E = Math.imul(it, rt), d = Math.imul(it, Ve), d = d + Math.imul(Fe, rt) | 0, M = Math.imul(Fe, Ve), E = E + Math.imul(ft, at) | 0, d = d + Math.imul(ft, ze) | 0, d = d + Math.imul(Ke, at) | 0, M = M + Math.imul(Ke, ze) | 0, E = E + Math.imul(je, st) | 0, d = d + Math.imul(je, De) | 0, d = d + Math.imul(Pe, st) | 0, M = M + Math.imul(Pe, De) | 0, E = E + Math.imul(Ce, Xe) | 0, d = d + Math.imul(Ce, X) | 0, d = d + Math.imul(Re, Xe) | 0, M = M + Math.imul(Re, X) | 0, E = E + Math.imul(fe, Y) | 0, d = d + Math.imul(fe, te) | 0, d = d + Math.imul(ce, Y) | 0, M = M + Math.imul(ce, te) | 0, E = E + Math.imul(P, ge) | 0, d = d + Math.imul(P, ve) | 0, d = d + Math.imul(L, ge) | 0, M = M + Math.imul(L, ve) | 0, E = E + Math.imul(me, O) | 0, d = d + Math.imul(me, j) | 0, d = d + Math.imul(Ie, O) | 0, M = M + Math.imul(Ie, j) | 0, E = E + Math.imul(W, R) | 0, d = d + Math.imul(W, U) | 0, d = d + Math.imul(K, R) | 0, M = M + Math.imul(K, U) | 0, E = E + Math.imul(ue, ae) | 0, d = d + Math.imul(ue, he) | 0, d = d + Math.imul(le, ae) | 0, M = M + Math.imul(le, he) | 0, E = E + Math.imul(re, Me) | 0, d = d + Math.imul(re, _e) | 0, d = d + Math.imul(J, Me) | 0, M = M + Math.imul(J, _e) | 0;
        var qe = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (qe >>> 26) | 0, qe &= 67108863, E = Math.imul(it, at), d = Math.imul(it, ze), d = d + Math.imul(Fe, at) | 0, M = Math.imul(Fe, ze), E = E + Math.imul(ft, st) | 0, d = d + Math.imul(ft, De) | 0, d = d + Math.imul(Ke, st) | 0, M = M + Math.imul(Ke, De) | 0, E = E + Math.imul(je, Xe) | 0, d = d + Math.imul(je, X) | 0, d = d + Math.imul(Pe, Xe) | 0, M = M + Math.imul(Pe, X) | 0, E = E + Math.imul(Ce, Y) | 0, d = d + Math.imul(Ce, te) | 0, d = d + Math.imul(Re, Y) | 0, M = M + Math.imul(Re, te) | 0, E = E + Math.imul(fe, ge) | 0, d = d + Math.imul(fe, ve) | 0, d = d + Math.imul(ce, ge) | 0, M = M + Math.imul(ce, ve) | 0, E = E + Math.imul(P, O) | 0, d = d + Math.imul(P, j) | 0, d = d + Math.imul(L, O) | 0, M = M + Math.imul(L, j) | 0, E = E + Math.imul(me, R) | 0, d = d + Math.imul(me, U) | 0, d = d + Math.imul(Ie, R) | 0, M = M + Math.imul(Ie, U) | 0, E = E + Math.imul(W, ae) | 0, d = d + Math.imul(W, he) | 0, d = d + Math.imul(K, ae) | 0, M = M + Math.imul(K, he) | 0, E = E + Math.imul(ue, Me) | 0, d = d + Math.imul(ue, _e) | 0, d = d + Math.imul(le, Me) | 0, M = M + Math.imul(le, _e) | 0;
        var Ge = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ge >>> 26) | 0, Ge &= 67108863, E = Math.imul(it, st), d = Math.imul(it, De), d = d + Math.imul(Fe, st) | 0, M = Math.imul(Fe, De), E = E + Math.imul(ft, Xe) | 0, d = d + Math.imul(ft, X) | 0, d = d + Math.imul(Ke, Xe) | 0, M = M + Math.imul(Ke, X) | 0, E = E + Math.imul(je, Y) | 0, d = d + Math.imul(je, te) | 0, d = d + Math.imul(Pe, Y) | 0, M = M + Math.imul(Pe, te) | 0, E = E + Math.imul(Ce, ge) | 0, d = d + Math.imul(Ce, ve) | 0, d = d + Math.imul(Re, ge) | 0, M = M + Math.imul(Re, ve) | 0, E = E + Math.imul(fe, O) | 0, d = d + Math.imul(fe, j) | 0, d = d + Math.imul(ce, O) | 0, M = M + Math.imul(ce, j) | 0, E = E + Math.imul(P, R) | 0, d = d + Math.imul(P, U) | 0, d = d + Math.imul(L, R) | 0, M = M + Math.imul(L, U) | 0, E = E + Math.imul(me, ae) | 0, d = d + Math.imul(me, he) | 0, d = d + Math.imul(Ie, ae) | 0, M = M + Math.imul(Ie, he) | 0, E = E + Math.imul(W, Me) | 0, d = d + Math.imul(W, _e) | 0, d = d + Math.imul(K, Me) | 0, M = M + Math.imul(K, _e) | 0;
        var ke = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, E = Math.imul(it, Xe), d = Math.imul(it, X), d = d + Math.imul(Fe, Xe) | 0, M = Math.imul(Fe, X), E = E + Math.imul(ft, Y) | 0, d = d + Math.imul(ft, te) | 0, d = d + Math.imul(Ke, Y) | 0, M = M + Math.imul(Ke, te) | 0, E = E + Math.imul(je, ge) | 0, d = d + Math.imul(je, ve) | 0, d = d + Math.imul(Pe, ge) | 0, M = M + Math.imul(Pe, ve) | 0, E = E + Math.imul(Ce, O) | 0, d = d + Math.imul(Ce, j) | 0, d = d + Math.imul(Re, O) | 0, M = M + Math.imul(Re, j) | 0, E = E + Math.imul(fe, R) | 0, d = d + Math.imul(fe, U) | 0, d = d + Math.imul(ce, R) | 0, M = M + Math.imul(ce, U) | 0, E = E + Math.imul(P, ae) | 0, d = d + Math.imul(P, he) | 0, d = d + Math.imul(L, ae) | 0, M = M + Math.imul(L, he) | 0, E = E + Math.imul(me, Me) | 0, d = d + Math.imul(me, _e) | 0, d = d + Math.imul(Ie, Me) | 0, M = M + Math.imul(Ie, _e) | 0;
        var Ue = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ue >>> 26) | 0, Ue &= 67108863, E = Math.imul(it, Y), d = Math.imul(it, te), d = d + Math.imul(Fe, Y) | 0, M = Math.imul(Fe, te), E = E + Math.imul(ft, ge) | 0, d = d + Math.imul(ft, ve) | 0, d = d + Math.imul(Ke, ge) | 0, M = M + Math.imul(Ke, ve) | 0, E = E + Math.imul(je, O) | 0, d = d + Math.imul(je, j) | 0, d = d + Math.imul(Pe, O) | 0, M = M + Math.imul(Pe, j) | 0, E = E + Math.imul(Ce, R) | 0, d = d + Math.imul(Ce, U) | 0, d = d + Math.imul(Re, R) | 0, M = M + Math.imul(Re, U) | 0, E = E + Math.imul(fe, ae) | 0, d = d + Math.imul(fe, he) | 0, d = d + Math.imul(ce, ae) | 0, M = M + Math.imul(ce, he) | 0, E = E + Math.imul(P, Me) | 0, d = d + Math.imul(P, _e) | 0, d = d + Math.imul(L, Me) | 0, M = M + Math.imul(L, _e) | 0;
        var He = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (He >>> 26) | 0, He &= 67108863, E = Math.imul(it, ge), d = Math.imul(it, ve), d = d + Math.imul(Fe, ge) | 0, M = Math.imul(Fe, ve), E = E + Math.imul(ft, O) | 0, d = d + Math.imul(ft, j) | 0, d = d + Math.imul(Ke, O) | 0, M = M + Math.imul(Ke, j) | 0, E = E + Math.imul(je, R) | 0, d = d + Math.imul(je, U) | 0, d = d + Math.imul(Pe, R) | 0, M = M + Math.imul(Pe, U) | 0, E = E + Math.imul(Ce, ae) | 0, d = d + Math.imul(Ce, he) | 0, d = d + Math.imul(Re, ae) | 0, M = M + Math.imul(Re, he) | 0, E = E + Math.imul(fe, Me) | 0, d = d + Math.imul(fe, _e) | 0, d = d + Math.imul(ce, Me) | 0, M = M + Math.imul(ce, _e) | 0;
        var Le = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, E = Math.imul(it, O), d = Math.imul(it, j), d = d + Math.imul(Fe, O) | 0, M = Math.imul(Fe, j), E = E + Math.imul(ft, R) | 0, d = d + Math.imul(ft, U) | 0, d = d + Math.imul(Ke, R) | 0, M = M + Math.imul(Ke, U) | 0, E = E + Math.imul(je, ae) | 0, d = d + Math.imul(je, he) | 0, d = d + Math.imul(Pe, ae) | 0, M = M + Math.imul(Pe, he) | 0, E = E + Math.imul(Ce, Me) | 0, d = d + Math.imul(Ce, _e) | 0, d = d + Math.imul(Re, Me) | 0, M = M + Math.imul(Re, _e) | 0;
        var be = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, E = Math.imul(it, R), d = Math.imul(it, U), d = d + Math.imul(Fe, R) | 0, M = Math.imul(Fe, U), E = E + Math.imul(ft, ae) | 0, d = d + Math.imul(ft, he) | 0, d = d + Math.imul(Ke, ae) | 0, M = M + Math.imul(Ke, he) | 0, E = E + Math.imul(je, Me) | 0, d = d + Math.imul(je, _e) | 0, d = d + Math.imul(Pe, Me) | 0, M = M + Math.imul(Pe, _e) | 0;
        var ye = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, E = Math.imul(it, ae), d = Math.imul(it, he), d = d + Math.imul(Fe, ae) | 0, M = Math.imul(Fe, he), E = E + Math.imul(ft, Me) | 0, d = d + Math.imul(ft, _e) | 0, d = d + Math.imul(Ke, Me) | 0, M = M + Math.imul(Ke, _e) | 0;
        var Be = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, E = Math.imul(it, Me), d = Math.imul(it, _e), d = d + Math.imul(Fe, Me) | 0, M = Math.imul(Fe, _e);
        var Ee = (_ + E | 0) + ((d & 8191) << 13) | 0;
        return _ = (M + (d >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, B[0] = ut, B[1] = $e, B[2] = Je, B[3] = Ze, B[4] = nt, B[5] = tt, B[6] = Ye, B[7] = et, B[8] = Qe, B[9] = qe, B[10] = Ge, B[11] = ke, B[12] = Ue, B[13] = He, B[14] = Le, B[15] = be, B[16] = ye, B[17] = Be, B[18] = Ee, _ !== 0 && (B[19] = _, y.length++), y;
      };
      Math.imul || (C = I);
      function N(b, a, h) {
        h.negative = a.negative ^ b.negative, h.length = b.length + a.length;
        for (var y = 0, x = 0, A = 0; A < h.length - 1; A++) {
          var B = x;
          x = 0;
          for (var _ = y & 67108863, E = Math.min(A, a.length - 1), d = Math.max(0, A - b.length + 1); d <= E; d++) {
            var M = A - d, Z = b.words[M] | 0, re = a.words[d] | 0, J = Z * re, ee = J & 67108863;
            B = B + (J / 67108864 | 0) | 0, ee = ee + _ | 0, _ = ee & 67108863, B = B + (ee >>> 26) | 0, x += B >>> 26, B &= 67108863;
          }
          h.words[A] = _, y = B, B = x;
        }
        return y !== 0 ? h.words[A] = y : h.length--, h._strip();
      }
      function $(b, a, h) {
        return N(b, a, h);
      }
      r.prototype.mulTo = function(a, h) {
        var y, x = this.length + a.length;
        return this.length === 10 && a.length === 10 ? y = C(this, a, h) : x < 63 ? y = I(this, a, h) : x < 1024 ? y = N(this, a, h) : y = $(this, a, h), y;
      }, r.prototype.mul = function(a) {
        var h = new r(null);
        return h.words = new Array(this.length + a.length), this.mulTo(a, h);
      }, r.prototype.mulf = function(a) {
        var h = new r(null);
        return h.words = new Array(this.length + a.length), $(this, a, h);
      }, r.prototype.imul = function(a) {
        return this.clone().mulTo(a, this);
      }, r.prototype.imuln = function(a) {
        var h = a < 0;
        h && (a = -a), i(typeof a == "number"), i(a < 67108864);
        for (var y = 0, x = 0; x < this.length; x++) {
          var A = (this.words[x] | 0) * a, B = (A & 67108863) + (y & 67108863);
          y >>= 26, y += A / 67108864 | 0, y += B >>> 26, this.words[x] = B & 67108863;
        }
        return y !== 0 && (this.words[x] = y, this.length++), h ? this.ineg() : this;
      }, r.prototype.muln = function(a) {
        return this.clone().imuln(a);
      }, r.prototype.sqr = function() {
        return this.mul(this);
      }, r.prototype.isqr = function() {
        return this.imul(this.clone());
      }, r.prototype.pow = function(a) {
        var h = T(a);
        if (h.length === 0)
          return new r(1);
        for (var y = this, x = 0; x < h.length && h[x] === 0; x++, y = y.sqr())
          ;
        if (++x < h.length)
          for (var A = y.sqr(); x < h.length; x++, A = A.sqr())
            h[x] !== 0 && (y = y.mul(A));
        return y;
      }, r.prototype.iushln = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26, x = 67108863 >>> 26 - h << 26 - h, A;
        if (h !== 0) {
          var B = 0;
          for (A = 0; A < this.length; A++) {
            var _ = this.words[A] & x, E = (this.words[A] | 0) - _ << h;
            this.words[A] = E | B, B = _ >>> 26 - h;
          }
          B && (this.words[A] = B, this.length++);
        }
        if (y !== 0) {
          for (A = this.length - 1; A >= 0; A--)
            this.words[A + y] = this.words[A];
          for (A = 0; A < y; A++)
            this.words[A] = 0;
          this.length += y;
        }
        return this._strip();
      }, r.prototype.ishln = function(a) {
        return i(this.negative === 0), this.iushln(a);
      }, r.prototype.iushrn = function(a, h, y) {
        i(typeof a == "number" && a >= 0);
        var x;
        h ? x = (h - h % 26) / 26 : x = 0;
        var A = a % 26, B = Math.min((a - A) / 26, this.length), _ = 67108863 ^ 67108863 >>> A << A, E = y;
        if (x -= B, x = Math.max(0, x), E) {
          for (var d = 0; d < B; d++)
            E.words[d] = this.words[d];
          E.length = B;
        }
        if (B !== 0)
          if (this.length > B)
            for (this.length -= B, d = 0; d < this.length; d++)
              this.words[d] = this.words[d + B];
          else
            this.words[0] = 0, this.length = 1;
        var M = 0;
        for (d = this.length - 1; d >= 0 && (M !== 0 || d >= x); d--) {
          var Z = this.words[d] | 0;
          this.words[d] = M << 26 - A | Z >>> A, M = Z & _;
        }
        return E && M !== 0 && (E.words[E.length++] = M), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, r.prototype.ishrn = function(a, h, y) {
        return i(this.negative === 0), this.iushrn(a, h, y);
      }, r.prototype.shln = function(a) {
        return this.clone().ishln(a);
      }, r.prototype.ushln = function(a) {
        return this.clone().iushln(a);
      }, r.prototype.shrn = function(a) {
        return this.clone().ishrn(a);
      }, r.prototype.ushrn = function(a) {
        return this.clone().iushrn(a);
      }, r.prototype.testn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26, x = 1 << h;
        if (this.length <= y)
          return !1;
        var A = this.words[y];
        return !!(A & x);
      }, r.prototype.imaskn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26;
        if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= y)
          return this;
        if (h !== 0 && y++, this.length = Math.min(y, this.length), h !== 0) {
          var x = 67108863 ^ 67108863 >>> h << h;
          this.words[this.length - 1] &= x;
        }
        return this._strip();
      }, r.prototype.maskn = function(a) {
        return this.clone().imaskn(a);
      }, r.prototype.iaddn = function(a) {
        return i(typeof a == "number"), i(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
      }, r.prototype._iaddn = function(a) {
        this.words[0] += a;
        for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
          this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
        return this.length = Math.max(this.length, h + 1), this;
      }, r.prototype.isubn = function(a) {
        if (i(typeof a == "number"), i(a < 67108864), a < 0)
          return this.iaddn(-a);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(a), this.negative = 1, this;
        if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var h = 0; h < this.length && this.words[h] < 0; h++)
            this.words[h] += 67108864, this.words[h + 1] -= 1;
        return this._strip();
      }, r.prototype.addn = function(a) {
        return this.clone().iaddn(a);
      }, r.prototype.subn = function(a) {
        return this.clone().isubn(a);
      }, r.prototype.iabs = function() {
        return this.negative = 0, this;
      }, r.prototype.abs = function() {
        return this.clone().iabs();
      }, r.prototype._ishlnsubmul = function(a, h, y) {
        var x = a.length + y, A;
        this._expand(x);
        var B, _ = 0;
        for (A = 0; A < a.length; A++) {
          B = (this.words[A + y] | 0) + _;
          var E = (a.words[A] | 0) * h;
          B -= E & 67108863, _ = (B >> 26) - (E / 67108864 | 0), this.words[A + y] = B & 67108863;
        }
        for (; A < this.length - y; A++)
          B = (this.words[A + y] | 0) + _, _ = B >> 26, this.words[A + y] = B & 67108863;
        if (_ === 0)
          return this._strip();
        for (i(_ === -1), _ = 0, A = 0; A < this.length; A++)
          B = -(this.words[A] | 0) + _, _ = B >> 26, this.words[A] = B & 67108863;
        return this.negative = 1, this._strip();
      }, r.prototype._wordDiv = function(a, h) {
        var y = this.length - a.length, x = this.clone(), A = a, B = A.words[A.length - 1] | 0, _ = this._countBits(B);
        y = 26 - _, y !== 0 && (A = A.ushln(y), x.iushln(y), B = A.words[A.length - 1] | 0);
        var E = x.length - A.length, d;
        if (h !== "mod") {
          d = new r(null), d.length = E + 1, d.words = new Array(d.length);
          for (var M = 0; M < d.length; M++)
            d.words[M] = 0;
        }
        var Z = x.clone()._ishlnsubmul(A, 1, E);
        Z.negative === 0 && (x = Z, d && (d.words[E] = 1));
        for (var re = E - 1; re >= 0; re--) {
          var J = (x.words[A.length + re] | 0) * 67108864 + (x.words[A.length + re - 1] | 0);
          for (J = Math.min(J / B | 0, 67108863), x._ishlnsubmul(A, J, re); x.negative !== 0; )
            J--, x.negative = 0, x._ishlnsubmul(A, 1, re), x.isZero() || (x.negative ^= 1);
          d && (d.words[re] = J);
        }
        return d && d._strip(), x._strip(), h !== "div" && y !== 0 && x.iushrn(y), {
          div: d || null,
          mod: x
        };
      }, r.prototype.divmod = function(a, h, y) {
        if (i(!a.isZero()), this.isZero())
          return {
            div: new r(0),
            mod: new r(0)
          };
        var x, A, B;
        return this.negative !== 0 && a.negative === 0 ? (B = this.neg().divmod(a, h), h !== "mod" && (x = B.div.neg()), h !== "div" && (A = B.mod.neg(), y && A.negative !== 0 && A.iadd(a)), {
          div: x,
          mod: A
        }) : this.negative === 0 && a.negative !== 0 ? (B = this.divmod(a.neg(), h), h !== "mod" && (x = B.div.neg()), {
          div: x,
          mod: B.mod
        }) : this.negative & a.negative ? (B = this.neg().divmod(a.neg(), h), h !== "div" && (A = B.mod.neg(), y && A.negative !== 0 && A.isub(a)), {
          div: B.div,
          mod: A
        }) : a.length > this.length || this.cmp(a) < 0 ? {
          div: new r(0),
          mod: this
        } : a.length === 1 ? h === "div" ? {
          div: this.divn(a.words[0]),
          mod: null
        } : h === "mod" ? {
          div: null,
          mod: new r(this.modrn(a.words[0]))
        } : {
          div: this.divn(a.words[0]),
          mod: new r(this.modrn(a.words[0]))
        } : this._wordDiv(a, h);
      }, r.prototype.div = function(a) {
        return this.divmod(a, "div", !1).div;
      }, r.prototype.mod = function(a) {
        return this.divmod(a, "mod", !1).mod;
      }, r.prototype.umod = function(a) {
        return this.divmod(a, "mod", !0).mod;
      }, r.prototype.divRound = function(a) {
        var h = this.divmod(a);
        if (h.mod.isZero())
          return h.div;
        var y = h.div.negative !== 0 ? h.mod.isub(a) : h.mod, x = a.ushrn(1), A = a.andln(1), B = y.cmp(x);
        return B < 0 || A === 1 && B === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
      }, r.prototype.modrn = function(a) {
        var h = a < 0;
        h && (a = -a), i(a <= 67108863);
        for (var y = (1 << 26) % a, x = 0, A = this.length - 1; A >= 0; A--)
          x = (y * x + (this.words[A] | 0)) % a;
        return h ? -x : x;
      }, r.prototype.modn = function(a) {
        return this.modrn(a);
      }, r.prototype.idivn = function(a) {
        var h = a < 0;
        h && (a = -a), i(a <= 67108863);
        for (var y = 0, x = this.length - 1; x >= 0; x--) {
          var A = (this.words[x] | 0) + y * 67108864;
          this.words[x] = A / a | 0, y = A % a;
        }
        return this._strip(), h ? this.ineg() : this;
      }, r.prototype.divn = function(a) {
        return this.clone().idivn(a);
      }, r.prototype.egcd = function(a) {
        i(a.negative === 0), i(!a.isZero());
        var h = this, y = a.clone();
        h.negative !== 0 ? h = h.umod(a) : h = h.clone();
        for (var x = new r(1), A = new r(0), B = new r(0), _ = new r(1), E = 0; h.isEven() && y.isEven(); )
          h.iushrn(1), y.iushrn(1), ++E;
        for (var d = y.clone(), M = h.clone(); !h.isZero(); ) {
          for (var Z = 0, re = 1; !(h.words[0] & re) && Z < 26; ++Z, re <<= 1)
            ;
          if (Z > 0)
            for (h.iushrn(Z); Z-- > 0; )
              (x.isOdd() || A.isOdd()) && (x.iadd(d), A.isub(M)), x.iushrn(1), A.iushrn(1);
          for (var J = 0, ee = 1; !(y.words[0] & ee) && J < 26; ++J, ee <<= 1)
            ;
          if (J > 0)
            for (y.iushrn(J); J-- > 0; )
              (B.isOdd() || _.isOdd()) && (B.iadd(d), _.isub(M)), B.iushrn(1), _.iushrn(1);
          h.cmp(y) >= 0 ? (h.isub(y), x.isub(B), A.isub(_)) : (y.isub(h), B.isub(x), _.isub(A));
        }
        return {
          a: B,
          b: _,
          gcd: y.iushln(E)
        };
      }, r.prototype._invmp = function(a) {
        i(a.negative === 0), i(!a.isZero());
        var h = this, y = a.clone();
        h.negative !== 0 ? h = h.umod(a) : h = h.clone();
        for (var x = new r(1), A = new r(0), B = y.clone(); h.cmpn(1) > 0 && y.cmpn(1) > 0; ) {
          for (var _ = 0, E = 1; !(h.words[0] & E) && _ < 26; ++_, E <<= 1)
            ;
          if (_ > 0)
            for (h.iushrn(_); _-- > 0; )
              x.isOdd() && x.iadd(B), x.iushrn(1);
          for (var d = 0, M = 1; !(y.words[0] & M) && d < 26; ++d, M <<= 1)
            ;
          if (d > 0)
            for (y.iushrn(d); d-- > 0; )
              A.isOdd() && A.iadd(B), A.iushrn(1);
          h.cmp(y) >= 0 ? (h.isub(y), x.isub(A)) : (y.isub(h), A.isub(x));
        }
        var Z;
        return h.cmpn(1) === 0 ? Z = x : Z = A, Z.cmpn(0) < 0 && Z.iadd(a), Z;
      }, r.prototype.gcd = function(a) {
        if (this.isZero())
          return a.abs();
        if (a.isZero())
          return this.abs();
        var h = this.clone(), y = a.clone();
        h.negative = 0, y.negative = 0;
        for (var x = 0; h.isEven() && y.isEven(); x++)
          h.iushrn(1), y.iushrn(1);
        do {
          for (; h.isEven(); )
            h.iushrn(1);
          for (; y.isEven(); )
            y.iushrn(1);
          var A = h.cmp(y);
          if (A < 0) {
            var B = h;
            h = y, y = B;
          } else if (A === 0 || y.cmpn(1) === 0)
            break;
          h.isub(y);
        } while (!0);
        return y.iushln(x);
      }, r.prototype.invm = function(a) {
        return this.egcd(a).a.umod(a);
      }, r.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, r.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, r.prototype.andln = function(a) {
        return this.words[0] & a;
      }, r.prototype.bincn = function(a) {
        i(typeof a == "number");
        var h = a % 26, y = (a - h) / 26, x = 1 << h;
        if (this.length <= y)
          return this._expand(y + 1), this.words[y] |= x, this;
        for (var A = x, B = y; A !== 0 && B < this.length; B++) {
          var _ = this.words[B] | 0;
          _ += A, A = _ >>> 26, _ &= 67108863, this.words[B] = _;
        }
        return A !== 0 && (this.words[B] = A, this.length++), this;
      }, r.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, r.prototype.cmpn = function(a) {
        var h = a < 0;
        if (this.negative !== 0 && !h)
          return -1;
        if (this.negative === 0 && h)
          return 1;
        this._strip();
        var y;
        if (this.length > 1)
          y = 1;
        else {
          h && (a = -a), i(a <= 67108863, "Number is too big");
          var x = this.words[0] | 0;
          y = x === a ? 0 : x < a ? -1 : 1;
        }
        return this.negative !== 0 ? -y | 0 : y;
      }, r.prototype.cmp = function(a) {
        if (this.negative !== 0 && a.negative === 0)
          return -1;
        if (this.negative === 0 && a.negative !== 0)
          return 1;
        var h = this.ucmp(a);
        return this.negative !== 0 ? -h | 0 : h;
      }, r.prototype.ucmp = function(a) {
        if (this.length > a.length)
          return 1;
        if (this.length < a.length)
          return -1;
        for (var h = 0, y = this.length - 1; y >= 0; y--) {
          var x = this.words[y] | 0, A = a.words[y] | 0;
          if (x !== A) {
            x < A ? h = -1 : x > A && (h = 1);
            break;
          }
        }
        return h;
      }, r.prototype.gtn = function(a) {
        return this.cmpn(a) === 1;
      }, r.prototype.gt = function(a) {
        return this.cmp(a) === 1;
      }, r.prototype.gten = function(a) {
        return this.cmpn(a) >= 0;
      }, r.prototype.gte = function(a) {
        return this.cmp(a) >= 0;
      }, r.prototype.ltn = function(a) {
        return this.cmpn(a) === -1;
      }, r.prototype.lt = function(a) {
        return this.cmp(a) === -1;
      }, r.prototype.lten = function(a) {
        return this.cmpn(a) <= 0;
      }, r.prototype.lte = function(a) {
        return this.cmp(a) <= 0;
      }, r.prototype.eqn = function(a) {
        return this.cmpn(a) === 0;
      }, r.prototype.eq = function(a) {
        return this.cmp(a) === 0;
      }, r.red = function(a) {
        return new k(a);
      }, r.prototype.toRed = function(a) {
        return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
      }, r.prototype.fromRed = function() {
        return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, r.prototype._forceRed = function(a) {
        return this.red = a, this;
      }, r.prototype.forceRed = function(a) {
        return i(!this.red, "Already a number in reduction context"), this._forceRed(a);
      }, r.prototype.redAdd = function(a) {
        return i(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
      }, r.prototype.redIAdd = function(a) {
        return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
      }, r.prototype.redSub = function(a) {
        return i(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
      }, r.prototype.redISub = function(a) {
        return i(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
      }, r.prototype.redShl = function(a) {
        return i(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
      }, r.prototype.redMul = function(a) {
        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
      }, r.prototype.redIMul = function(a) {
        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
      }, r.prototype.redSqr = function() {
        return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, r.prototype.redISqr = function() {
        return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, r.prototype.redSqrt = function() {
        return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, r.prototype.redInvm = function() {
        return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, r.prototype.redNeg = function() {
        return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, r.prototype.redPow = function(a) {
        return i(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
      };
      var D = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function H(b, a) {
        this.name = b, this.p = new r(a, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      H.prototype._tmp = function() {
        var a = new r(null);
        return a.words = new Array(Math.ceil(this.n / 13)), a;
      }, H.prototype.ireduce = function(a) {
        var h = a, y;
        do
          this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), y = h.bitLength();
        while (y > this.n);
        var x = y < this.n ? -1 : h.ucmp(this.p);
        return x === 0 ? (h.words[0] = 0, h.length = 1) : x > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
      }, H.prototype.split = function(a, h) {
        a.iushrn(this.n, 0, h);
      }, H.prototype.imulK = function(a) {
        return a.imul(this.k);
      };
      function V() {
        H.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      f(V, H), V.prototype.split = function(a, h) {
        for (var y = 4194303, x = Math.min(a.length, 9), A = 0; A < x; A++)
          h.words[A] = a.words[A];
        if (h.length = x, a.length <= 9) {
          a.words[0] = 0, a.length = 1;
          return;
        }
        var B = a.words[9];
        for (h.words[h.length++] = B & y, A = 10; A < a.length; A++) {
          var _ = a.words[A] | 0;
          a.words[A - 10] = (_ & y) << 4 | B >>> 22, B = _;
        }
        B >>>= 22, a.words[A - 10] = B, B === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
      }, V.prototype.imulK = function(a) {
        a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
        for (var h = 0, y = 0; y < a.length; y++) {
          var x = a.words[y] | 0;
          h += x * 977, a.words[y] = h & 67108863, h = x * 64 + (h / 67108864 | 0);
        }
        return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
      };
      function ne() {
        H.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      f(ne, H);
      function Q() {
        H.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      f(Q, H);
      function se() {
        H.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      f(se, H), se.prototype.imulK = function(a) {
        for (var h = 0, y = 0; y < a.length; y++) {
          var x = (a.words[y] | 0) * 19 + h, A = x & 67108863;
          x >>>= 26, a.words[y] = A, h = x;
        }
        return h !== 0 && (a.words[a.length++] = h), a;
      }, r._prime = function(a) {
        if (D[a])
          return D[a];
        var h;
        if (a === "k256")
          h = new V();
        else if (a === "p224")
          h = new ne();
        else if (a === "p192")
          h = new Q();
        else if (a === "p25519")
          h = new se();
        else
          throw new Error("Unknown prime " + a);
        return D[a] = h, h;
      };
      function k(b) {
        if (typeof b == "string") {
          var a = r._prime(b);
          this.m = a.p, this.prime = a;
        } else
          i(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
      }
      k.prototype._verify1 = function(a) {
        i(a.negative === 0, "red works only with positives"), i(a.red, "red works only with red numbers");
      }, k.prototype._verify2 = function(a, h) {
        i((a.negative | h.negative) === 0, "red works only with positives"), i(
          a.red && a.red === h.red,
          "red works only with red numbers"
        );
      }, k.prototype.imod = function(a) {
        return this.prime ? this.prime.ireduce(a)._forceRed(this) : (u(a, a.umod(this.m)._forceRed(this)), a);
      }, k.prototype.neg = function(a) {
        return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
      }, k.prototype.add = function(a, h) {
        this._verify2(a, h);
        var y = a.add(h);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y._forceRed(this);
      }, k.prototype.iadd = function(a, h) {
        this._verify2(a, h);
        var y = a.iadd(h);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y;
      }, k.prototype.sub = function(a, h) {
        this._verify2(a, h);
        var y = a.sub(h);
        return y.cmpn(0) < 0 && y.iadd(this.m), y._forceRed(this);
      }, k.prototype.isub = function(a, h) {
        this._verify2(a, h);
        var y = a.isub(h);
        return y.cmpn(0) < 0 && y.iadd(this.m), y;
      }, k.prototype.shl = function(a, h) {
        return this._verify1(a), this.imod(a.ushln(h));
      }, k.prototype.imul = function(a, h) {
        return this._verify2(a, h), this.imod(a.imul(h));
      }, k.prototype.mul = function(a, h) {
        return this._verify2(a, h), this.imod(a.mul(h));
      }, k.prototype.isqr = function(a) {
        return this.imul(a, a.clone());
      }, k.prototype.sqr = function(a) {
        return this.mul(a, a);
      }, k.prototype.sqrt = function(a) {
        if (a.isZero())
          return a.clone();
        var h = this.m.andln(3);
        if (i(h % 2 === 1), h === 3) {
          var y = this.m.add(new r(1)).iushrn(2);
          return this.pow(a, y);
        }
        for (var x = this.m.subn(1), A = 0; !x.isZero() && x.andln(1) === 0; )
          A++, x.iushrn(1);
        i(!x.isZero());
        var B = new r(1).toRed(this), _ = B.redNeg(), E = this.m.subn(1).iushrn(1), d = this.m.bitLength();
        for (d = new r(2 * d * d).toRed(this); this.pow(d, E).cmp(_) !== 0; )
          d.redIAdd(_);
        for (var M = this.pow(d, x), Z = this.pow(a, x.addn(1).iushrn(1)), re = this.pow(a, x), J = A; re.cmp(B) !== 0; ) {
          for (var ee = re, ue = 0; ee.cmp(B) !== 0; ue++)
            ee = ee.redSqr();
          i(ue < J);
          var le = this.pow(M, new r(1).iushln(J - ue - 1));
          Z = Z.redMul(le), M = le.redSqr(), re = re.redMul(M), J = ue;
        }
        return Z;
      }, k.prototype.invm = function(a) {
        var h = a._invmp(this.m);
        return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
      }, k.prototype.pow = function(a, h) {
        if (h.isZero())
          return new r(1).toRed(this);
        if (h.cmpn(1) === 0)
          return a.clone();
        var y = 4, x = new Array(1 << y);
        x[0] = new r(1).toRed(this), x[1] = a;
        for (var A = 2; A < x.length; A++)
          x[A] = this.mul(x[A - 1], a);
        var B = x[0], _ = 0, E = 0, d = h.bitLength() % 26;
        for (d === 0 && (d = 26), A = h.length - 1; A >= 0; A--) {
          for (var M = h.words[A], Z = d - 1; Z >= 0; Z--) {
            var re = M >> Z & 1;
            if (B !== x[0] && (B = this.sqr(B)), re === 0 && _ === 0) {
              E = 0;
              continue;
            }
            _ <<= 1, _ |= re, E++, !(E !== y && (A !== 0 || Z !== 0)) && (B = this.mul(B, x[_]), E = 0, _ = 0);
          }
          d = 26;
        }
        return B;
      }, k.prototype.convertTo = function(a) {
        var h = a.umod(this.m);
        return h === a ? h.clone() : h;
      }, k.prototype.convertFrom = function(a) {
        var h = a.clone();
        return h.red = null, h;
      }, r.mont = function(a) {
        return new m(a);
      };
      function m(b) {
        k.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      f(m, k), m.prototype.convertTo = function(a) {
        return this.imod(a.ushln(this.shift));
      }, m.prototype.convertFrom = function(a) {
        var h = this.imod(a.mul(this.rinv));
        return h.red = null, h;
      }, m.prototype.imul = function(a, h) {
        if (a.isZero() || h.isZero())
          return a.words[0] = 0, a.length = 1, a;
        var y = a.imul(h), x = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = y.isub(x).iushrn(this.shift), B = A;
        return A.cmp(this.m) >= 0 ? B = A.isub(this.m) : A.cmpn(0) < 0 && (B = A.iadd(this.m)), B._forceRed(this);
      }, m.prototype.mul = function(a, h) {
        if (a.isZero() || h.isZero())
          return new r(0)._forceRed(this);
        var y = a.mul(h), x = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = y.isub(x).iushrn(this.shift), B = A;
        return A.cmp(this.m) >= 0 ? B = A.isub(this.m) : A.cmpn(0) < 0 && (B = A.iadd(this.m)), B._forceRed(this);
      }, m.prototype.invm = function(a) {
        var h = this.imod(a._invmp(this.m).mul(this.r2));
        return h._forceRed(this);
      };
    })(e, Ne);
  }(mw)), Aa;
}
var Os, Ul;
function Nc() {
  if (Ul)
    return Os;
  Ul = 1;
  var e = ww(), t = ai();
  function n(r) {
    var o = i(r), s = o.toRed(e.mont(r.modulus)).redPow(new e(r.publicExponent)).fromRed();
    return { blinder: s, unblinder: o.invm(r.modulus) };
  }
  function i(r) {
    var o = r.modulus.byteLength(), s;
    do
      s = new e(t(o));
    while (s.cmp(r.modulus) >= 0 || !s.umod(r.prime1) || !s.umod(r.prime2));
    return s;
  }
  function f(r, o) {
    var s = n(o), c = o.modulus.byteLength(), l = new e(r).mul(s.blinder).umod(o.modulus), u = l.toRed(e.mont(o.prime1)), v = l.toRed(e.mont(o.prime2)), p = o.coefficient, g = o.prime1, w = o.prime2, S = u.redPow(o.exponent1).fromRed(), T = v.redPow(o.exponent2).fromRed(), I = S.isub(T).imul(p).umod(g).imul(w);
    return T.iadd(I).imul(s.unblinder).umod(o.modulus).toArrayLike(Buffer, "be", c);
  }
  return f.getr = i, Os = f, Os;
}
var Ns = {};
const _w = "elliptic", xw = "6.5.4", Ew = "EC cryptography", Sw = "lib/elliptic.js", Mw = [
  "lib"
], Aw = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
}, Bw = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
}, Rw = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
], Iw = "Fedor Indutny <fedor@indutny.com>", Tw = "MIT", Pw = {
  url: "https://github.com/indutny/elliptic/issues"
}, Cw = "https://github.com/indutny/elliptic", Ow = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
}, Nw = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
}, Lw = {
  name: _w,
  version: xw,
  description: Ew,
  main: Sw,
  files: Mw,
  scripts: Aw,
  repository: Bw,
  keywords: Rw,
  author: Iw,
  license: Tw,
  bugs: Pw,
  homepage: Cw,
  devDependencies: Ow,
  dependencies: Nw
};
var Ls = {}, $s = {}, Fl;
function Gp() {
  return Fl || (Fl = 1, function(e) {
    var t = e;
    function n(r, o) {
      if (Array.isArray(r))
        return r.slice();
      if (!r)
        return [];
      var s = [];
      if (typeof r != "string") {
        for (var c = 0; c < r.length; c++)
          s[c] = r[c] | 0;
        return s;
      }
      if (o === "hex") {
        r = r.replace(/[^a-z0-9]+/ig, ""), r.length % 2 !== 0 && (r = "0" + r);
        for (var c = 0; c < r.length; c += 2)
          s.push(parseInt(r[c] + r[c + 1], 16));
      } else
        for (var c = 0; c < r.length; c++) {
          var l = r.charCodeAt(c), u = l >> 8, v = l & 255;
          u ? s.push(u, v) : s.push(v);
        }
      return s;
    }
    t.toArray = n;
    function i(r) {
      return r.length === 1 ? "0" + r : r;
    }
    t.zero2 = i;
    function f(r) {
      for (var o = "", s = 0; s < r.length; s++)
        o += i(r[s].toString(16));
      return o;
    }
    t.toHex = f, t.encode = function(o, s) {
      return s === "hex" ? f(o) : o;
    };
  }($s)), $s;
}
var Hl;
function Ar() {
  return Hl || (Hl = 1, function(e) {
    var t = e, n = Ht, i = Mr(), f = Gp();
    t.assert = i, t.toArray = f.toArray, t.zero2 = f.zero2, t.toHex = f.toHex, t.encode = f.encode;
    function r(u, v, p) {
      var g = new Array(Math.max(u.bitLength(), p) + 1);
      g.fill(0);
      for (var w = 1 << v + 1, S = u.clone(), T = 0; T < g.length; T++) {
        var I, C = S.andln(w - 1);
        S.isOdd() ? (C > (w >> 1) - 1 ? I = (w >> 1) - C : I = C, S.isubn(I)) : I = 0, g[T] = I, S.iushrn(1);
      }
      return g;
    }
    t.getNAF = r;
    function o(u, v) {
      var p = [
        [],
        []
      ];
      u = u.clone(), v = v.clone();
      for (var g = 0, w = 0, S; u.cmpn(-g) > 0 || v.cmpn(-w) > 0; ) {
        var T = u.andln(3) + g & 3, I = v.andln(3) + w & 3;
        T === 3 && (T = -1), I === 3 && (I = -1);
        var C;
        T & 1 ? (S = u.andln(7) + g & 7, (S === 3 || S === 5) && I === 2 ? C = -T : C = T) : C = 0, p[0].push(C);
        var N;
        I & 1 ? (S = v.andln(7) + w & 7, (S === 3 || S === 5) && T === 2 ? N = -I : N = I) : N = 0, p[1].push(N), 2 * g === C + 1 && (g = 1 - g), 2 * w === N + 1 && (w = 1 - w), u.iushrn(1), v.iushrn(1);
      }
      return p;
    }
    t.getJSF = o;
    function s(u, v, p) {
      var g = "_" + v;
      u.prototype[v] = function() {
        return this[g] !== void 0 ? this[g] : this[g] = p.call(this);
      };
    }
    t.cachedProperty = s;
    function c(u) {
      return typeof u == "string" ? t.toArray(u, "hex") : u;
    }
    t.parseBytes = c;
    function l(u) {
      return new n(u, "hex", "le");
    }
    t.intFromLE = l;
  }(Ls)), Ls;
}
var ks = {}, js, zl;
function Rf() {
  if (zl)
    return js;
  zl = 1;
  var e = Ht, t = Ar(), n = t.getNAF, i = t.getJSF, f = t.assert;
  function r(s, c) {
    this.type = s, this.p = new e(c.p, 16), this.red = c.prime ? e.red(c.prime) : e.mont(this.p), this.zero = new e(0).toRed(this.red), this.one = new e(1).toRed(this.red), this.two = new e(2).toRed(this.red), this.n = c.n && new e(c.n, 16), this.g = c.g && this.pointFromJSON(c.g, c.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var l = this.n && this.p.div(this.n);
    !l || l.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
  }
  js = r, r.prototype.point = function() {
    throw new Error("Not implemented");
  }, r.prototype.validate = function() {
    throw new Error("Not implemented");
  }, r.prototype._fixedNafMul = function(c, l) {
    f(c.precomputed);
    var u = c._getDoubles(), v = n(l, 1, this._bitLength), p = (1 << u.step + 1) - (u.step % 2 === 0 ? 2 : 1);
    p /= 3;
    var g = [], w, S;
    for (w = 0; w < v.length; w += u.step) {
      S = 0;
      for (var T = w + u.step - 1; T >= w; T--)
        S = (S << 1) + v[T];
      g.push(S);
    }
    for (var I = this.jpoint(null, null, null), C = this.jpoint(null, null, null), N = p; N > 0; N--) {
      for (w = 0; w < g.length; w++)
        S = g[w], S === N ? C = C.mixedAdd(u.points[w]) : S === -N && (C = C.mixedAdd(u.points[w].neg()));
      I = I.add(C);
    }
    return I.toP();
  }, r.prototype._wnafMul = function(c, l) {
    var u = 4, v = c._getNAFPoints(u);
    u = v.wnd;
    for (var p = v.points, g = n(l, u, this._bitLength), w = this.jpoint(null, null, null), S = g.length - 1; S >= 0; S--) {
      for (var T = 0; S >= 0 && g[S] === 0; S--)
        T++;
      if (S >= 0 && T++, w = w.dblp(T), S < 0)
        break;
      var I = g[S];
      f(I !== 0), c.type === "affine" ? I > 0 ? w = w.mixedAdd(p[I - 1 >> 1]) : w = w.mixedAdd(p[-I - 1 >> 1].neg()) : I > 0 ? w = w.add(p[I - 1 >> 1]) : w = w.add(p[-I - 1 >> 1].neg());
    }
    return c.type === "affine" ? w.toP() : w;
  }, r.prototype._wnafMulAdd = function(c, l, u, v, p) {
    var g = this._wnafT1, w = this._wnafT2, S = this._wnafT3, T = 0, I, C, N;
    for (I = 0; I < v; I++) {
      N = l[I];
      var $ = N._getNAFPoints(c);
      g[I] = $.wnd, w[I] = $.points;
    }
    for (I = v - 1; I >= 1; I -= 2) {
      var D = I - 1, H = I;
      if (g[D] !== 1 || g[H] !== 1) {
        S[D] = n(u[D], g[D], this._bitLength), S[H] = n(u[H], g[H], this._bitLength), T = Math.max(S[D].length, T), T = Math.max(S[H].length, T);
        continue;
      }
      var V = [
        l[D],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        l[H]
        /* 7 */
      ];
      l[D].y.cmp(l[H].y) === 0 ? (V[1] = l[D].add(l[H]), V[2] = l[D].toJ().mixedAdd(l[H].neg())) : l[D].y.cmp(l[H].y.redNeg()) === 0 ? (V[1] = l[D].toJ().mixedAdd(l[H]), V[2] = l[D].add(l[H].neg())) : (V[1] = l[D].toJ().mixedAdd(l[H]), V[2] = l[D].toJ().mixedAdd(l[H].neg()));
      var ne = [
        -3,
        /* -1 -1 */
        -1,
        /* -1 0 */
        -5,
        /* -1 1 */
        -7,
        /* 0 -1 */
        0,
        /* 0 0 */
        7,
        /* 0 1 */
        5,
        /* 1 -1 */
        1,
        /* 1 0 */
        3
        /* 1 1 */
      ], Q = i(u[D], u[H]);
      for (T = Math.max(Q[0].length, T), S[D] = new Array(T), S[H] = new Array(T), C = 0; C < T; C++) {
        var se = Q[0][C] | 0, k = Q[1][C] | 0;
        S[D][C] = ne[(se + 1) * 3 + (k + 1)], S[H][C] = 0, w[D] = V;
      }
    }
    var m = this.jpoint(null, null, null), b = this._wnafT4;
    for (I = T; I >= 0; I--) {
      for (var a = 0; I >= 0; ) {
        var h = !0;
        for (C = 0; C < v; C++)
          b[C] = S[C][I] | 0, b[C] !== 0 && (h = !1);
        if (!h)
          break;
        a++, I--;
      }
      if (I >= 0 && a++, m = m.dblp(a), I < 0)
        break;
      for (C = 0; C < v; C++) {
        var y = b[C];
        y !== 0 && (y > 0 ? N = w[C][y - 1 >> 1] : y < 0 && (N = w[C][-y - 1 >> 1].neg()), N.type === "affine" ? m = m.mixedAdd(N) : m = m.add(N));
      }
    }
    for (I = 0; I < v; I++)
      w[I] = null;
    return p ? m : m.toP();
  };
  function o(s, c) {
    this.curve = s, this.type = c, this.precomputed = null;
  }
  return r.BasePoint = o, o.prototype.eq = function() {
    throw new Error("Not implemented");
  }, o.prototype.validate = function() {
    return this.curve.validate(this);
  }, r.prototype.decodePoint = function(c, l) {
    c = t.toArray(c, l);
    var u = this.p.byteLength();
    if ((c[0] === 4 || c[0] === 6 || c[0] === 7) && c.length - 1 === 2 * u) {
      c[0] === 6 ? f(c[c.length - 1] % 2 === 0) : c[0] === 7 && f(c[c.length - 1] % 2 === 1);
      var v = this.point(
        c.slice(1, 1 + u),
        c.slice(1 + u, 1 + 2 * u)
      );
      return v;
    } else if ((c[0] === 2 || c[0] === 3) && c.length - 1 === u)
      return this.pointFromX(c.slice(1, 1 + u), c[0] === 3);
    throw new Error("Unknown point format");
  }, o.prototype.encodeCompressed = function(c) {
    return this.encode(c, !0);
  }, o.prototype._encode = function(c) {
    var l = this.curve.p.byteLength(), u = this.getX().toArray("be", l);
    return c ? [this.getY().isEven() ? 2 : 3].concat(u) : [4].concat(u, this.getY().toArray("be", l));
  }, o.prototype.encode = function(c, l) {
    return t.encode(this._encode(l), c);
  }, o.prototype.precompute = function(c) {
    if (this.precomputed)
      return this;
    var l = {
      doubles: null,
      naf: null,
      beta: null
    };
    return l.naf = this._getNAFPoints(8), l.doubles = this._getDoubles(4, c), l.beta = this._getBeta(), this.precomputed = l, this;
  }, o.prototype._hasDoubles = function(c) {
    if (!this.precomputed)
      return !1;
    var l = this.precomputed.doubles;
    return l ? l.points.length >= Math.ceil((c.bitLength() + 1) / l.step) : !1;
  }, o.prototype._getDoubles = function(c, l) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var u = [this], v = this, p = 0; p < l; p += c) {
      for (var g = 0; g < c; g++)
        v = v.dbl();
      u.push(v);
    }
    return {
      step: c,
      points: u
    };
  }, o.prototype._getNAFPoints = function(c) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    for (var l = [this], u = (1 << c) - 1, v = u === 1 ? null : this.dbl(), p = 1; p < u; p++)
      l[p] = l[p - 1].add(v);
    return {
      wnd: c,
      points: l
    };
  }, o.prototype._getBeta = function() {
    return null;
  }, o.prototype.dblp = function(c) {
    for (var l = this, u = 0; u < c; u++)
      l = l.dbl();
    return l;
  }, js;
}
var Ds, Vl;
function $w() {
  if (Vl)
    return Ds;
  Vl = 1;
  var e = Ar(), t = Ht, n = bt(), i = Rf(), f = e.assert;
  function r(c) {
    i.call(this, "short", c), this.a = new t(c.a, 16).toRed(this.red), this.b = new t(c.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(c), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
  }
  n(r, i), Ds = r, r.prototype._getEndomorphism = function(l) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var u, v;
      if (l.beta)
        u = new t(l.beta, 16).toRed(this.red);
      else {
        var p = this._getEndoRoots(this.p);
        u = p[0].cmp(p[1]) < 0 ? p[0] : p[1], u = u.toRed(this.red);
      }
      if (l.lambda)
        v = new t(l.lambda, 16);
      else {
        var g = this._getEndoRoots(this.n);
        this.g.mul(g[0]).x.cmp(this.g.x.redMul(u)) === 0 ? v = g[0] : (v = g[1], f(this.g.mul(v).x.cmp(this.g.x.redMul(u)) === 0));
      }
      var w;
      return l.basis ? w = l.basis.map(function(S) {
        return {
          a: new t(S.a, 16),
          b: new t(S.b, 16)
        };
      }) : w = this._getEndoBasis(v), {
        beta: u,
        lambda: v,
        basis: w
      };
    }
  }, r.prototype._getEndoRoots = function(l) {
    var u = l === this.p ? this.red : t.mont(l), v = new t(2).toRed(u).redInvm(), p = v.redNeg(), g = new t(3).toRed(u).redNeg().redSqrt().redMul(v), w = p.redAdd(g).fromRed(), S = p.redSub(g).fromRed();
    return [w, S];
  }, r.prototype._getEndoBasis = function(l) {
    for (var u = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), v = l, p = this.n.clone(), g = new t(1), w = new t(0), S = new t(0), T = new t(1), I, C, N, $, D, H, V, ne = 0, Q, se; v.cmpn(0) !== 0; ) {
      var k = p.div(v);
      Q = p.sub(k.mul(v)), se = S.sub(k.mul(g));
      var m = T.sub(k.mul(w));
      if (!N && Q.cmp(u) < 0)
        I = V.neg(), C = g, N = Q.neg(), $ = se;
      else if (N && ++ne === 2)
        break;
      V = Q, p = v, v = Q, S = g, g = se, T = w, w = m;
    }
    D = Q.neg(), H = se;
    var b = N.sqr().add($.sqr()), a = D.sqr().add(H.sqr());
    return a.cmp(b) >= 0 && (D = I, H = C), N.negative && (N = N.neg(), $ = $.neg()), D.negative && (D = D.neg(), H = H.neg()), [
      { a: N, b: $ },
      { a: D, b: H }
    ];
  }, r.prototype._endoSplit = function(l) {
    var u = this.endo.basis, v = u[0], p = u[1], g = p.b.mul(l).divRound(this.n), w = v.b.neg().mul(l).divRound(this.n), S = g.mul(v.a), T = w.mul(p.a), I = g.mul(v.b), C = w.mul(p.b), N = l.sub(S).sub(T), $ = I.add(C).neg();
    return { k1: N, k2: $ };
  }, r.prototype.pointFromX = function(l, u) {
    l = new t(l, 16), l.red || (l = l.toRed(this.red));
    var v = l.redSqr().redMul(l).redIAdd(l.redMul(this.a)).redIAdd(this.b), p = v.redSqrt();
    if (p.redSqr().redSub(v).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var g = p.fromRed().isOdd();
    return (u && !g || !u && g) && (p = p.redNeg()), this.point(l, p);
  }, r.prototype.validate = function(l) {
    if (l.inf)
      return !0;
    var u = l.x, v = l.y, p = this.a.redMul(u), g = u.redSqr().redMul(u).redIAdd(p).redIAdd(this.b);
    return v.redSqr().redISub(g).cmpn(0) === 0;
  }, r.prototype._endoWnafMulAdd = function(l, u, v) {
    for (var p = this._endoWnafT1, g = this._endoWnafT2, w = 0; w < l.length; w++) {
      var S = this._endoSplit(u[w]), T = l[w], I = T._getBeta();
      S.k1.negative && (S.k1.ineg(), T = T.neg(!0)), S.k2.negative && (S.k2.ineg(), I = I.neg(!0)), p[w * 2] = T, p[w * 2 + 1] = I, g[w * 2] = S.k1, g[w * 2 + 1] = S.k2;
    }
    for (var C = this._wnafMulAdd(1, p, g, w * 2, v), N = 0; N < w * 2; N++)
      p[N] = null, g[N] = null;
    return C;
  };
  function o(c, l, u, v) {
    i.BasePoint.call(this, c, "affine"), l === null && u === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new t(l, 16), this.y = new t(u, 16), v && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
  }
  n(o, i.BasePoint), r.prototype.point = function(l, u, v) {
    return new o(this, l, u, v);
  }, r.prototype.pointFromJSON = function(l, u) {
    return o.fromJSON(this, l, u);
  }, o.prototype._getBeta = function() {
    if (this.curve.endo) {
      var l = this.precomputed;
      if (l && l.beta)
        return l.beta;
      var u = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (l) {
        var v = this.curve, p = function(g) {
          return v.point(g.x.redMul(v.endo.beta), g.y);
        };
        l.beta = u, u.precomputed = {
          beta: null,
          naf: l.naf && {
            wnd: l.naf.wnd,
            points: l.naf.points.map(p)
          },
          doubles: l.doubles && {
            step: l.doubles.step,
            points: l.doubles.points.map(p)
          }
        };
      }
      return u;
    }
  }, o.prototype.toJSON = function() {
    return this.precomputed ? [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }] : [this.x, this.y];
  }, o.fromJSON = function(l, u, v) {
    typeof u == "string" && (u = JSON.parse(u));
    var p = l.point(u[0], u[1], v);
    if (!u[2])
      return p;
    function g(S) {
      return l.point(S[0], S[1], v);
    }
    var w = u[2];
    return p.precomputed = {
      beta: null,
      doubles: w.doubles && {
        step: w.doubles.step,
        points: [p].concat(w.doubles.points.map(g))
      },
      naf: w.naf && {
        wnd: w.naf.wnd,
        points: [p].concat(w.naf.points.map(g))
      }
    }, p;
  }, o.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  }, o.prototype.isInfinity = function() {
    return this.inf;
  }, o.prototype.add = function(l) {
    if (this.inf)
      return l;
    if (l.inf)
      return this;
    if (this.eq(l))
      return this.dbl();
    if (this.neg().eq(l))
      return this.curve.point(null, null);
    if (this.x.cmp(l.x) === 0)
      return this.curve.point(null, null);
    var u = this.y.redSub(l.y);
    u.cmpn(0) !== 0 && (u = u.redMul(this.x.redSub(l.x).redInvm()));
    var v = u.redSqr().redISub(this.x).redISub(l.x), p = u.redMul(this.x.redSub(v)).redISub(this.y);
    return this.curve.point(v, p);
  }, o.prototype.dbl = function() {
    if (this.inf)
      return this;
    var l = this.y.redAdd(this.y);
    if (l.cmpn(0) === 0)
      return this.curve.point(null, null);
    var u = this.curve.a, v = this.x.redSqr(), p = l.redInvm(), g = v.redAdd(v).redIAdd(v).redIAdd(u).redMul(p), w = g.redSqr().redISub(this.x.redAdd(this.x)), S = g.redMul(this.x.redSub(w)).redISub(this.y);
    return this.curve.point(w, S);
  }, o.prototype.getX = function() {
    return this.x.fromRed();
  }, o.prototype.getY = function() {
    return this.y.fromRed();
  }, o.prototype.mul = function(l) {
    return l = new t(l, 16), this.isInfinity() ? this : this._hasDoubles(l) ? this.curve._fixedNafMul(this, l) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [l]) : this.curve._wnafMul(this, l);
  }, o.prototype.mulAdd = function(l, u, v) {
    var p = [this, u], g = [l, v];
    return this.curve.endo ? this.curve._endoWnafMulAdd(p, g) : this.curve._wnafMulAdd(1, p, g, 2);
  }, o.prototype.jmulAdd = function(l, u, v) {
    var p = [this, u], g = [l, v];
    return this.curve.endo ? this.curve._endoWnafMulAdd(p, g, !0) : this.curve._wnafMulAdd(1, p, g, 2, !0);
  }, o.prototype.eq = function(l) {
    return this === l || this.inf === l.inf && (this.inf || this.x.cmp(l.x) === 0 && this.y.cmp(l.y) === 0);
  }, o.prototype.neg = function(l) {
    if (this.inf)
      return this;
    var u = this.curve.point(this.x, this.y.redNeg());
    if (l && this.precomputed) {
      var v = this.precomputed, p = function(g) {
        return g.neg();
      };
      u.precomputed = {
        naf: v.naf && {
          wnd: v.naf.wnd,
          points: v.naf.points.map(p)
        },
        doubles: v.doubles && {
          step: v.doubles.step,
          points: v.doubles.points.map(p)
        }
      };
    }
    return u;
  }, o.prototype.toJ = function() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var l = this.curve.jpoint(this.x, this.y, this.curve.one);
    return l;
  };
  function s(c, l, u, v) {
    i.BasePoint.call(this, c, "jacobian"), l === null && u === null && v === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new t(0)) : (this.x = new t(l, 16), this.y = new t(u, 16), this.z = new t(v, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
  }
  return n(s, i.BasePoint), r.prototype.jpoint = function(l, u, v) {
    return new s(this, l, u, v);
  }, s.prototype.toP = function() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var l = this.z.redInvm(), u = l.redSqr(), v = this.x.redMul(u), p = this.y.redMul(u).redMul(l);
    return this.curve.point(v, p);
  }, s.prototype.neg = function() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  }, s.prototype.add = function(l) {
    if (this.isInfinity())
      return l;
    if (l.isInfinity())
      return this;
    var u = l.z.redSqr(), v = this.z.redSqr(), p = this.x.redMul(u), g = l.x.redMul(v), w = this.y.redMul(u.redMul(l.z)), S = l.y.redMul(v.redMul(this.z)), T = p.redSub(g), I = w.redSub(S);
    if (T.cmpn(0) === 0)
      return I.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var C = T.redSqr(), N = C.redMul(T), $ = p.redMul(C), D = I.redSqr().redIAdd(N).redISub($).redISub($), H = I.redMul($.redISub(D)).redISub(w.redMul(N)), V = this.z.redMul(l.z).redMul(T);
    return this.curve.jpoint(D, H, V);
  }, s.prototype.mixedAdd = function(l) {
    if (this.isInfinity())
      return l.toJ();
    if (l.isInfinity())
      return this;
    var u = this.z.redSqr(), v = this.x, p = l.x.redMul(u), g = this.y, w = l.y.redMul(u).redMul(this.z), S = v.redSub(p), T = g.redSub(w);
    if (S.cmpn(0) === 0)
      return T.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var I = S.redSqr(), C = I.redMul(S), N = v.redMul(I), $ = T.redSqr().redIAdd(C).redISub(N).redISub(N), D = T.redMul(N.redISub($)).redISub(g.redMul(C)), H = this.z.redMul(S);
    return this.curve.jpoint($, D, H);
  }, s.prototype.dblp = function(l) {
    if (l === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!l)
      return this.dbl();
    var u;
    if (this.curve.zeroA || this.curve.threeA) {
      var v = this;
      for (u = 0; u < l; u++)
        v = v.dbl();
      return v;
    }
    var p = this.curve.a, g = this.curve.tinv, w = this.x, S = this.y, T = this.z, I = T.redSqr().redSqr(), C = S.redAdd(S);
    for (u = 0; u < l; u++) {
      var N = w.redSqr(), $ = C.redSqr(), D = $.redSqr(), H = N.redAdd(N).redIAdd(N).redIAdd(p.redMul(I)), V = w.redMul($), ne = H.redSqr().redISub(V.redAdd(V)), Q = V.redISub(ne), se = H.redMul(Q);
      se = se.redIAdd(se).redISub(D);
      var k = C.redMul(T);
      u + 1 < l && (I = I.redMul(D)), w = ne, T = k, C = se;
    }
    return this.curve.jpoint(w, C.redMul(g), T);
  }, s.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
  }, s.prototype._zeroDbl = function() {
    var l, u, v;
    if (this.zOne) {
      var p = this.x.redSqr(), g = this.y.redSqr(), w = g.redSqr(), S = this.x.redAdd(g).redSqr().redISub(p).redISub(w);
      S = S.redIAdd(S);
      var T = p.redAdd(p).redIAdd(p), I = T.redSqr().redISub(S).redISub(S), C = w.redIAdd(w);
      C = C.redIAdd(C), C = C.redIAdd(C), l = I, u = T.redMul(S.redISub(I)).redISub(C), v = this.y.redAdd(this.y);
    } else {
      var N = this.x.redSqr(), $ = this.y.redSqr(), D = $.redSqr(), H = this.x.redAdd($).redSqr().redISub(N).redISub(D);
      H = H.redIAdd(H);
      var V = N.redAdd(N).redIAdd(N), ne = V.redSqr(), Q = D.redIAdd(D);
      Q = Q.redIAdd(Q), Q = Q.redIAdd(Q), l = ne.redISub(H).redISub(H), u = V.redMul(H.redISub(l)).redISub(Q), v = this.y.redMul(this.z), v = v.redIAdd(v);
    }
    return this.curve.jpoint(l, u, v);
  }, s.prototype._threeDbl = function() {
    var l, u, v;
    if (this.zOne) {
      var p = this.x.redSqr(), g = this.y.redSqr(), w = g.redSqr(), S = this.x.redAdd(g).redSqr().redISub(p).redISub(w);
      S = S.redIAdd(S);
      var T = p.redAdd(p).redIAdd(p).redIAdd(this.curve.a), I = T.redSqr().redISub(S).redISub(S);
      l = I;
      var C = w.redIAdd(w);
      C = C.redIAdd(C), C = C.redIAdd(C), u = T.redMul(S.redISub(I)).redISub(C), v = this.y.redAdd(this.y);
    } else {
      var N = this.z.redSqr(), $ = this.y.redSqr(), D = this.x.redMul($), H = this.x.redSub(N).redMul(this.x.redAdd(N));
      H = H.redAdd(H).redIAdd(H);
      var V = D.redIAdd(D);
      V = V.redIAdd(V);
      var ne = V.redAdd(V);
      l = H.redSqr().redISub(ne), v = this.y.redAdd(this.z).redSqr().redISub($).redISub(N);
      var Q = $.redSqr();
      Q = Q.redIAdd(Q), Q = Q.redIAdd(Q), Q = Q.redIAdd(Q), u = H.redMul(V.redISub(l)).redISub(Q);
    }
    return this.curve.jpoint(l, u, v);
  }, s.prototype._dbl = function() {
    var l = this.curve.a, u = this.x, v = this.y, p = this.z, g = p.redSqr().redSqr(), w = u.redSqr(), S = v.redSqr(), T = w.redAdd(w).redIAdd(w).redIAdd(l.redMul(g)), I = u.redAdd(u);
    I = I.redIAdd(I);
    var C = I.redMul(S), N = T.redSqr().redISub(C.redAdd(C)), $ = C.redISub(N), D = S.redSqr();
    D = D.redIAdd(D), D = D.redIAdd(D), D = D.redIAdd(D);
    var H = T.redMul($).redISub(D), V = v.redAdd(v).redMul(p);
    return this.curve.jpoint(N, H, V);
  }, s.prototype.trpl = function() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var l = this.x.redSqr(), u = this.y.redSqr(), v = this.z.redSqr(), p = u.redSqr(), g = l.redAdd(l).redIAdd(l), w = g.redSqr(), S = this.x.redAdd(u).redSqr().redISub(l).redISub(p);
    S = S.redIAdd(S), S = S.redAdd(S).redIAdd(S), S = S.redISub(w);
    var T = S.redSqr(), I = p.redIAdd(p);
    I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
    var C = g.redIAdd(S).redSqr().redISub(w).redISub(T).redISub(I), N = u.redMul(C);
    N = N.redIAdd(N), N = N.redIAdd(N);
    var $ = this.x.redMul(T).redISub(N);
    $ = $.redIAdd($), $ = $.redIAdd($);
    var D = this.y.redMul(C.redMul(I.redISub(C)).redISub(S.redMul(T)));
    D = D.redIAdd(D), D = D.redIAdd(D), D = D.redIAdd(D);
    var H = this.z.redAdd(S).redSqr().redISub(v).redISub(T);
    return this.curve.jpoint($, D, H);
  }, s.prototype.mul = function(l, u) {
    return l = new t(l, u), this.curve._wnafMul(this, l);
  }, s.prototype.eq = function(l) {
    if (l.type === "affine")
      return this.eq(l.toJ());
    if (this === l)
      return !0;
    var u = this.z.redSqr(), v = l.z.redSqr();
    if (this.x.redMul(v).redISub(l.x.redMul(u)).cmpn(0) !== 0)
      return !1;
    var p = u.redMul(this.z), g = v.redMul(l.z);
    return this.y.redMul(g).redISub(l.y.redMul(p)).cmpn(0) === 0;
  }, s.prototype.eqXToP = function(l) {
    var u = this.z.redSqr(), v = l.toRed(this.curve.red).redMul(u);
    if (this.x.cmp(v) === 0)
      return !0;
    for (var p = l.clone(), g = this.curve.redN.redMul(u); ; ) {
      if (p.iadd(this.curve.n), p.cmp(this.curve.p) >= 0)
        return !1;
      if (v.redIAdd(g), this.x.cmp(v) === 0)
        return !0;
    }
  }, s.prototype.inspect = function() {
    return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  }, s.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, Ds;
}
var qs, Kl;
function kw() {
  if (Kl)
    return qs;
  Kl = 1;
  var e = Ht, t = bt(), n = Rf(), i = Ar();
  function f(o) {
    n.call(this, "mont", o), this.a = new e(o.a, 16).toRed(this.red), this.b = new e(o.b, 16).toRed(this.red), this.i4 = new e(4).toRed(this.red).redInvm(), this.two = new e(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  t(f, n), qs = f, f.prototype.validate = function(s) {
    var c = s.normalize().x, l = c.redSqr(), u = l.redMul(c).redAdd(l.redMul(this.a)).redAdd(c), v = u.redSqrt();
    return v.redSqr().cmp(u) === 0;
  };
  function r(o, s, c) {
    n.BasePoint.call(this, o, "projective"), s === null && c === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new e(s, 16), this.z = new e(c, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
  }
  return t(r, n.BasePoint), f.prototype.decodePoint = function(s, c) {
    return this.point(i.toArray(s, c), 1);
  }, f.prototype.point = function(s, c) {
    return new r(this, s, c);
  }, f.prototype.pointFromJSON = function(s) {
    return r.fromJSON(this, s);
  }, r.prototype.precompute = function() {
  }, r.prototype._encode = function() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  }, r.fromJSON = function(s, c) {
    return new r(s, c[0], c[1] || s.one);
  }, r.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, r.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, r.prototype.dbl = function() {
    var s = this.x.redAdd(this.z), c = s.redSqr(), l = this.x.redSub(this.z), u = l.redSqr(), v = c.redSub(u), p = c.redMul(u), g = v.redMul(u.redAdd(this.curve.a24.redMul(v)));
    return this.curve.point(p, g);
  }, r.prototype.add = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.diffAdd = function(s, c) {
    var l = this.x.redAdd(this.z), u = this.x.redSub(this.z), v = s.x.redAdd(s.z), p = s.x.redSub(s.z), g = p.redMul(l), w = v.redMul(u), S = c.z.redMul(g.redAdd(w).redSqr()), T = c.x.redMul(g.redISub(w).redSqr());
    return this.curve.point(S, T);
  }, r.prototype.mul = function(s) {
    for (var c = s.clone(), l = this, u = this.curve.point(null, null), v = this, p = []; c.cmpn(0) !== 0; c.iushrn(1))
      p.push(c.andln(1));
    for (var g = p.length - 1; g >= 0; g--)
      p[g] === 0 ? (l = l.diffAdd(u, v), u = u.dbl()) : (u = l.diffAdd(u, v), l = l.dbl());
    return u;
  }, r.prototype.mulAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.jumlAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.eq = function(s) {
    return this.getX().cmp(s.getX()) === 0;
  }, r.prototype.normalize = function() {
    return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this;
  }, r.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, qs;
}
var Us, Gl;
function jw() {
  if (Gl)
    return Us;
  Gl = 1;
  var e = Ar(), t = Ht, n = bt(), i = Rf(), f = e.assert;
  function r(s) {
    this.twisted = (s.a | 0) !== 1, this.mOneA = this.twisted && (s.a | 0) === -1, this.extended = this.mOneA, i.call(this, "edwards", s), this.a = new t(s.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new t(s.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new t(s.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), f(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (s.c | 0) === 1;
  }
  n(r, i), Us = r, r.prototype._mulA = function(c) {
    return this.mOneA ? c.redNeg() : this.a.redMul(c);
  }, r.prototype._mulC = function(c) {
    return this.oneC ? c : this.c.redMul(c);
  }, r.prototype.jpoint = function(c, l, u, v) {
    return this.point(c, l, u, v);
  }, r.prototype.pointFromX = function(c, l) {
    c = new t(c, 16), c.red || (c = c.toRed(this.red));
    var u = c.redSqr(), v = this.c2.redSub(this.a.redMul(u)), p = this.one.redSub(this.c2.redMul(this.d).redMul(u)), g = v.redMul(p.redInvm()), w = g.redSqrt();
    if (w.redSqr().redSub(g).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var S = w.fromRed().isOdd();
    return (l && !S || !l && S) && (w = w.redNeg()), this.point(c, w);
  }, r.prototype.pointFromY = function(c, l) {
    c = new t(c, 16), c.red || (c = c.toRed(this.red));
    var u = c.redSqr(), v = u.redSub(this.c2), p = u.redMul(this.d).redMul(this.c2).redSub(this.a), g = v.redMul(p.redInvm());
    if (g.cmp(this.zero) === 0) {
      if (l)
        throw new Error("invalid point");
      return this.point(this.zero, c);
    }
    var w = g.redSqrt();
    if (w.redSqr().redSub(g).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return w.fromRed().isOdd() !== l && (w = w.redNeg()), this.point(w, c);
  }, r.prototype.validate = function(c) {
    if (c.isInfinity())
      return !0;
    c.normalize();
    var l = c.x.redSqr(), u = c.y.redSqr(), v = l.redMul(this.a).redAdd(u), p = this.c2.redMul(this.one.redAdd(this.d.redMul(l).redMul(u)));
    return v.cmp(p) === 0;
  };
  function o(s, c, l, u, v) {
    i.BasePoint.call(this, s, "projective"), c === null && l === null && u === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new t(c, 16), this.y = new t(l, 16), this.z = u ? new t(u, 16) : this.curve.one, this.t = v && new t(v, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
  }
  return n(o, i.BasePoint), r.prototype.pointFromJSON = function(c) {
    return o.fromJSON(this, c);
  }, r.prototype.point = function(c, l, u, v) {
    return new o(this, c, l, u, v);
  }, o.fromJSON = function(c, l) {
    return new o(c, l[0], l[1], l[2]);
  }, o.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, o.prototype.isInfinity = function() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  }, o.prototype._extDbl = function() {
    var c = this.x.redSqr(), l = this.y.redSqr(), u = this.z.redSqr();
    u = u.redIAdd(u);
    var v = this.curve._mulA(c), p = this.x.redAdd(this.y).redSqr().redISub(c).redISub(l), g = v.redAdd(l), w = g.redSub(u), S = v.redSub(l), T = p.redMul(w), I = g.redMul(S), C = p.redMul(S), N = w.redMul(g);
    return this.curve.point(T, I, N, C);
  }, o.prototype._projDbl = function() {
    var c = this.x.redAdd(this.y).redSqr(), l = this.x.redSqr(), u = this.y.redSqr(), v, p, g, w, S, T;
    if (this.curve.twisted) {
      w = this.curve._mulA(l);
      var I = w.redAdd(u);
      this.zOne ? (v = c.redSub(l).redSub(u).redMul(I.redSub(this.curve.two)), p = I.redMul(w.redSub(u)), g = I.redSqr().redSub(I).redSub(I)) : (S = this.z.redSqr(), T = I.redSub(S).redISub(S), v = c.redSub(l).redISub(u).redMul(T), p = I.redMul(w.redSub(u)), g = I.redMul(T));
    } else
      w = l.redAdd(u), S = this.curve._mulC(this.z).redSqr(), T = w.redSub(S).redSub(S), v = this.curve._mulC(c.redISub(w)).redMul(T), p = this.curve._mulC(w).redMul(l.redISub(u)), g = w.redMul(T);
    return this.curve.point(v, p, g);
  }, o.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
  }, o.prototype._extAdd = function(c) {
    var l = this.y.redSub(this.x).redMul(c.y.redSub(c.x)), u = this.y.redAdd(this.x).redMul(c.y.redAdd(c.x)), v = this.t.redMul(this.curve.dd).redMul(c.t), p = this.z.redMul(c.z.redAdd(c.z)), g = u.redSub(l), w = p.redSub(v), S = p.redAdd(v), T = u.redAdd(l), I = g.redMul(w), C = S.redMul(T), N = g.redMul(T), $ = w.redMul(S);
    return this.curve.point(I, C, $, N);
  }, o.prototype._projAdd = function(c) {
    var l = this.z.redMul(c.z), u = l.redSqr(), v = this.x.redMul(c.x), p = this.y.redMul(c.y), g = this.curve.d.redMul(v).redMul(p), w = u.redSub(g), S = u.redAdd(g), T = this.x.redAdd(this.y).redMul(c.x.redAdd(c.y)).redISub(v).redISub(p), I = l.redMul(w).redMul(T), C, N;
    return this.curve.twisted ? (C = l.redMul(S).redMul(p.redSub(this.curve._mulA(v))), N = w.redMul(S)) : (C = l.redMul(S).redMul(p.redSub(v)), N = this.curve._mulC(w).redMul(S)), this.curve.point(I, C, N);
  }, o.prototype.add = function(c) {
    return this.isInfinity() ? c : c.isInfinity() ? this : this.curve.extended ? this._extAdd(c) : this._projAdd(c);
  }, o.prototype.mul = function(c) {
    return this._hasDoubles(c) ? this.curve._fixedNafMul(this, c) : this.curve._wnafMul(this, c);
  }, o.prototype.mulAdd = function(c, l, u) {
    return this.curve._wnafMulAdd(1, [this, l], [c, u], 2, !1);
  }, o.prototype.jmulAdd = function(c, l, u) {
    return this.curve._wnafMulAdd(1, [this, l], [c, u], 2, !0);
  }, o.prototype.normalize = function() {
    if (this.zOne)
      return this;
    var c = this.z.redInvm();
    return this.x = this.x.redMul(c), this.y = this.y.redMul(c), this.t && (this.t = this.t.redMul(c)), this.z = this.curve.one, this.zOne = !0, this;
  }, o.prototype.neg = function() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  }, o.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, o.prototype.getY = function() {
    return this.normalize(), this.y.fromRed();
  }, o.prototype.eq = function(c) {
    return this === c || this.getX().cmp(c.getX()) === 0 && this.getY().cmp(c.getY()) === 0;
  }, o.prototype.eqXToP = function(c) {
    var l = c.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(l) === 0)
      return !0;
    for (var u = c.clone(), v = this.curve.redN.redMul(this.z); ; ) {
      if (u.iadd(this.curve.n), u.cmp(this.curve.p) >= 0)
        return !1;
      if (l.redIAdd(v), this.x.cmp(l) === 0)
        return !0;
    }
  }, o.prototype.toP = o.prototype.normalize, o.prototype.mixedAdd = o.prototype.add, Us;
}
var Wl;
function Wp() {
  return Wl || (Wl = 1, function(e) {
    var t = e;
    t.base = Rf(), t.short = $w(), t.mont = kw(), t.edwards = jw();
  }(ks)), ks;
}
var Fs = {}, Hs = {}, Ot = {}, Jl;
function Kr() {
  if (Jl)
    return Ot;
  Jl = 1;
  var e = Mr(), t = bt();
  Ot.inherits = t;
  function n(m, b) {
    return (m.charCodeAt(b) & 64512) !== 55296 || b < 0 || b + 1 >= m.length ? !1 : (m.charCodeAt(b + 1) & 64512) === 56320;
  }
  function i(m, b) {
    if (Array.isArray(m))
      return m.slice();
    if (!m)
      return [];
    var a = [];
    if (typeof m == "string")
      if (b) {
        if (b === "hex")
          for (m = m.replace(/[^a-z0-9]+/ig, ""), m.length % 2 !== 0 && (m = "0" + m), y = 0; y < m.length; y += 2)
            a.push(parseInt(m[y] + m[y + 1], 16));
      } else
        for (var h = 0, y = 0; y < m.length; y++) {
          var x = m.charCodeAt(y);
          x < 128 ? a[h++] = x : x < 2048 ? (a[h++] = x >> 6 | 192, a[h++] = x & 63 | 128) : n(m, y) ? (x = 65536 + ((x & 1023) << 10) + (m.charCodeAt(++y) & 1023), a[h++] = x >> 18 | 240, a[h++] = x >> 12 & 63 | 128, a[h++] = x >> 6 & 63 | 128, a[h++] = x & 63 | 128) : (a[h++] = x >> 12 | 224, a[h++] = x >> 6 & 63 | 128, a[h++] = x & 63 | 128);
        }
    else
      for (y = 0; y < m.length; y++)
        a[y] = m[y] | 0;
    return a;
  }
  Ot.toArray = i;
  function f(m) {
    for (var b = "", a = 0; a < m.length; a++)
      b += s(m[a].toString(16));
    return b;
  }
  Ot.toHex = f;
  function r(m) {
    var b = m >>> 24 | m >>> 8 & 65280 | m << 8 & 16711680 | (m & 255) << 24;
    return b >>> 0;
  }
  Ot.htonl = r;
  function o(m, b) {
    for (var a = "", h = 0; h < m.length; h++) {
      var y = m[h];
      b === "little" && (y = r(y)), a += c(y.toString(16));
    }
    return a;
  }
  Ot.toHex32 = o;
  function s(m) {
    return m.length === 1 ? "0" + m : m;
  }
  Ot.zero2 = s;
  function c(m) {
    return m.length === 7 ? "0" + m : m.length === 6 ? "00" + m : m.length === 5 ? "000" + m : m.length === 4 ? "0000" + m : m.length === 3 ? "00000" + m : m.length === 2 ? "000000" + m : m.length === 1 ? "0000000" + m : m;
  }
  Ot.zero8 = c;
  function l(m, b, a, h) {
    var y = a - b;
    e(y % 4 === 0);
    for (var x = new Array(y / 4), A = 0, B = b; A < x.length; A++, B += 4) {
      var _;
      h === "big" ? _ = m[B] << 24 | m[B + 1] << 16 | m[B + 2] << 8 | m[B + 3] : _ = m[B + 3] << 24 | m[B + 2] << 16 | m[B + 1] << 8 | m[B], x[A] = _ >>> 0;
    }
    return x;
  }
  Ot.join32 = l;
  function u(m, b) {
    for (var a = new Array(m.length * 4), h = 0, y = 0; h < m.length; h++, y += 4) {
      var x = m[h];
      b === "big" ? (a[y] = x >>> 24, a[y + 1] = x >>> 16 & 255, a[y + 2] = x >>> 8 & 255, a[y + 3] = x & 255) : (a[y + 3] = x >>> 24, a[y + 2] = x >>> 16 & 255, a[y + 1] = x >>> 8 & 255, a[y] = x & 255);
    }
    return a;
  }
  Ot.split32 = u;
  function v(m, b) {
    return m >>> b | m << 32 - b;
  }
  Ot.rotr32 = v;
  function p(m, b) {
    return m << b | m >>> 32 - b;
  }
  Ot.rotl32 = p;
  function g(m, b) {
    return m + b >>> 0;
  }
  Ot.sum32 = g;
  function w(m, b, a) {
    return m + b + a >>> 0;
  }
  Ot.sum32_3 = w;
  function S(m, b, a, h) {
    return m + b + a + h >>> 0;
  }
  Ot.sum32_4 = S;
  function T(m, b, a, h, y) {
    return m + b + a + h + y >>> 0;
  }
  Ot.sum32_5 = T;
  function I(m, b, a, h) {
    var y = m[b], x = m[b + 1], A = h + x >>> 0, B = (A < h ? 1 : 0) + a + y;
    m[b] = B >>> 0, m[b + 1] = A;
  }
  Ot.sum64 = I;
  function C(m, b, a, h) {
    var y = b + h >>> 0, x = (y < b ? 1 : 0) + m + a;
    return x >>> 0;
  }
  Ot.sum64_hi = C;
  function N(m, b, a, h) {
    var y = b + h;
    return y >>> 0;
  }
  Ot.sum64_lo = N;
  function $(m, b, a, h, y, x, A, B) {
    var _ = 0, E = b;
    E = E + h >>> 0, _ += E < b ? 1 : 0, E = E + x >>> 0, _ += E < x ? 1 : 0, E = E + B >>> 0, _ += E < B ? 1 : 0;
    var d = m + a + y + A + _;
    return d >>> 0;
  }
  Ot.sum64_4_hi = $;
  function D(m, b, a, h, y, x, A, B) {
    var _ = b + h + x + B;
    return _ >>> 0;
  }
  Ot.sum64_4_lo = D;
  function H(m, b, a, h, y, x, A, B, _, E) {
    var d = 0, M = b;
    M = M + h >>> 0, d += M < b ? 1 : 0, M = M + x >>> 0, d += M < x ? 1 : 0, M = M + B >>> 0, d += M < B ? 1 : 0, M = M + E >>> 0, d += M < E ? 1 : 0;
    var Z = m + a + y + A + _ + d;
    return Z >>> 0;
  }
  Ot.sum64_5_hi = H;
  function V(m, b, a, h, y, x, A, B, _, E) {
    var d = b + h + x + B + E;
    return d >>> 0;
  }
  Ot.sum64_5_lo = V;
  function ne(m, b, a) {
    var h = b << 32 - a | m >>> a;
    return h >>> 0;
  }
  Ot.rotr64_hi = ne;
  function Q(m, b, a) {
    var h = m << 32 - a | b >>> a;
    return h >>> 0;
  }
  Ot.rotr64_lo = Q;
  function se(m, b, a) {
    return m >>> a;
  }
  Ot.shr64_hi = se;
  function k(m, b, a) {
    var h = m << 32 - a | b >>> a;
    return h >>> 0;
  }
  return Ot.shr64_lo = k, Ot;
}
var zs = {}, Xl;
function Vi() {
  if (Xl)
    return zs;
  Xl = 1;
  var e = Kr(), t = Mr();
  function n() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return zs.BlockHash = n, n.prototype.update = function(f, r) {
    if (f = e.toArray(f, r), this.pending ? this.pending = this.pending.concat(f) : this.pending = f, this.pendingTotal += f.length, this.pending.length >= this._delta8) {
      f = this.pending;
      var o = f.length % this._delta8;
      this.pending = f.slice(f.length - o, f.length), this.pending.length === 0 && (this.pending = null), f = e.join32(f, 0, f.length - o, this.endian);
      for (var s = 0; s < f.length; s += this._delta32)
        this._update(f, s, s + this._delta32);
    }
    return this;
  }, n.prototype.digest = function(f) {
    return this.update(this._pad()), t(this.pending === null), this._digest(f);
  }, n.prototype._pad = function() {
    var f = this.pendingTotal, r = this._delta8, o = r - (f + this.padLength) % r, s = new Array(o + this.padLength);
    s[0] = 128;
    for (var c = 1; c < o; c++)
      s[c] = 0;
    if (f <<= 3, this.endian === "big") {
      for (var l = 8; l < this.padLength; l++)
        s[c++] = 0;
      s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = f >>> 24 & 255, s[c++] = f >>> 16 & 255, s[c++] = f >>> 8 & 255, s[c++] = f & 255;
    } else
      for (s[c++] = f & 255, s[c++] = f >>> 8 & 255, s[c++] = f >>> 16 & 255, s[c++] = f >>> 24 & 255, s[c++] = 0, s[c++] = 0, s[c++] = 0, s[c++] = 0, l = 8; l < this.padLength; l++)
        s[c++] = 0;
    return s;
  }, zs;
}
var yn = {}, kr = {}, Zl;
function Jp() {
  if (Zl)
    return kr;
  Zl = 1;
  var e = Kr(), t = e.rotr32;
  function n(u, v, p, g) {
    if (u === 0)
      return i(v, p, g);
    if (u === 1 || u === 3)
      return r(v, p, g);
    if (u === 2)
      return f(v, p, g);
  }
  kr.ft_1 = n;
  function i(u, v, p) {
    return u & v ^ ~u & p;
  }
  kr.ch32 = i;
  function f(u, v, p) {
    return u & v ^ u & p ^ v & p;
  }
  kr.maj32 = f;
  function r(u, v, p) {
    return u ^ v ^ p;
  }
  kr.p32 = r;
  function o(u) {
    return t(u, 2) ^ t(u, 13) ^ t(u, 22);
  }
  kr.s0_256 = o;
  function s(u) {
    return t(u, 6) ^ t(u, 11) ^ t(u, 25);
  }
  kr.s1_256 = s;
  function c(u) {
    return t(u, 7) ^ t(u, 18) ^ u >>> 3;
  }
  kr.g0_256 = c;
  function l(u) {
    return t(u, 17) ^ t(u, 19) ^ u >>> 10;
  }
  return kr.g1_256 = l, kr;
}
var Vs, Yl;
function Dw() {
  if (Yl)
    return Vs;
  Yl = 1;
  var e = Kr(), t = Vi(), n = Jp(), i = e.rotl32, f = e.sum32, r = e.sum32_5, o = n.ft_1, s = t.BlockHash, c = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function l() {
    if (!(this instanceof l))
      return new l();
    s.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return e.inherits(l, s), Vs = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 80, l.padLength = 64, l.prototype._update = function(v, p) {
    for (var g = this.W, w = 0; w < 16; w++)
      g[w] = v[p + w];
    for (; w < g.length; w++)
      g[w] = i(g[w - 3] ^ g[w - 8] ^ g[w - 14] ^ g[w - 16], 1);
    var S = this.h[0], T = this.h[1], I = this.h[2], C = this.h[3], N = this.h[4];
    for (w = 0; w < g.length; w++) {
      var $ = ~~(w / 20), D = r(i(S, 5), o($, T, I, C), N, g[w], c[$]);
      N = C, C = I, I = i(T, 30), T = S, S = D;
    }
    this.h[0] = f(this.h[0], S), this.h[1] = f(this.h[1], T), this.h[2] = f(this.h[2], I), this.h[3] = f(this.h[3], C), this.h[4] = f(this.h[4], N);
  }, l.prototype._digest = function(v) {
    return v === "hex" ? e.toHex32(this.h, "big") : e.split32(this.h, "big");
  }, Vs;
}
var Ks, Ql;
function Xp() {
  if (Ql)
    return Ks;
  Ql = 1;
  var e = Kr(), t = Vi(), n = Jp(), i = Mr(), f = e.sum32, r = e.sum32_4, o = e.sum32_5, s = n.ch32, c = n.maj32, l = n.s0_256, u = n.s1_256, v = n.g0_256, p = n.g1_256, g = t.BlockHash, w = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function S() {
    if (!(this instanceof S))
      return new S();
    g.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = w, this.W = new Array(64);
  }
  return e.inherits(S, g), Ks = S, S.blockSize = 512, S.outSize = 256, S.hmacStrength = 192, S.padLength = 64, S.prototype._update = function(I, C) {
    for (var N = this.W, $ = 0; $ < 16; $++)
      N[$] = I[C + $];
    for (; $ < N.length; $++)
      N[$] = r(p(N[$ - 2]), N[$ - 7], v(N[$ - 15]), N[$ - 16]);
    var D = this.h[0], H = this.h[1], V = this.h[2], ne = this.h[3], Q = this.h[4], se = this.h[5], k = this.h[6], m = this.h[7];
    for (i(this.k.length === N.length), $ = 0; $ < N.length; $++) {
      var b = o(m, u(Q), s(Q, se, k), this.k[$], N[$]), a = f(l(D), c(D, H, V));
      m = k, k = se, se = Q, Q = f(ne, b), ne = V, V = H, H = D, D = f(b, a);
    }
    this.h[0] = f(this.h[0], D), this.h[1] = f(this.h[1], H), this.h[2] = f(this.h[2], V), this.h[3] = f(this.h[3], ne), this.h[4] = f(this.h[4], Q), this.h[5] = f(this.h[5], se), this.h[6] = f(this.h[6], k), this.h[7] = f(this.h[7], m);
  }, S.prototype._digest = function(I) {
    return I === "hex" ? e.toHex32(this.h, "big") : e.split32(this.h, "big");
  }, Ks;
}
var Gs, ed;
function qw() {
  if (ed)
    return Gs;
  ed = 1;
  var e = Kr(), t = Xp();
  function n() {
    if (!(this instanceof n))
      return new n();
    t.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return e.inherits(n, t), Gs = n, n.blockSize = 512, n.outSize = 224, n.hmacStrength = 192, n.padLength = 64, n.prototype._digest = function(f) {
    return f === "hex" ? e.toHex32(this.h.slice(0, 7), "big") : e.split32(this.h.slice(0, 7), "big");
  }, Gs;
}
var Ws, td;
function Zp() {
  if (td)
    return Ws;
  td = 1;
  var e = Kr(), t = Vi(), n = Mr(), i = e.rotr64_hi, f = e.rotr64_lo, r = e.shr64_hi, o = e.shr64_lo, s = e.sum64, c = e.sum64_hi, l = e.sum64_lo, u = e.sum64_4_hi, v = e.sum64_4_lo, p = e.sum64_5_hi, g = e.sum64_5_lo, w = t.BlockHash, S = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function T() {
    if (!(this instanceof T))
      return new T();
    w.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = S, this.W = new Array(160);
  }
  e.inherits(T, w), Ws = T, T.blockSize = 1024, T.outSize = 512, T.hmacStrength = 192, T.padLength = 128, T.prototype._prepareBlock = function(a, h) {
    for (var y = this.W, x = 0; x < 32; x++)
      y[x] = a[h + x];
    for (; x < y.length; x += 2) {
      var A = k(y[x - 4], y[x - 3]), B = m(y[x - 4], y[x - 3]), _ = y[x - 14], E = y[x - 13], d = Q(y[x - 30], y[x - 29]), M = se(y[x - 30], y[x - 29]), Z = y[x - 32], re = y[x - 31];
      y[x] = u(
        A,
        B,
        _,
        E,
        d,
        M,
        Z,
        re
      ), y[x + 1] = v(
        A,
        B,
        _,
        E,
        d,
        M,
        Z,
        re
      );
    }
  }, T.prototype._update = function(a, h) {
    this._prepareBlock(a, h);
    var y = this.W, x = this.h[0], A = this.h[1], B = this.h[2], _ = this.h[3], E = this.h[4], d = this.h[5], M = this.h[6], Z = this.h[7], re = this.h[8], J = this.h[9], ee = this.h[10], ue = this.h[11], le = this.h[12], Se = this.h[13], W = this.h[14], K = this.h[15];
    n(this.k.length === y.length);
    for (var pe = 0; pe < y.length; pe += 2) {
      var me = W, Ie = K, z = V(re, J), P = ne(re, J), L = I(re, J, ee, ue, le), F = C(re, J, ee, ue, le, Se), fe = this.k[pe], ce = this.k[pe + 1], we = y[pe], Ce = y[pe + 1], Re = p(
        me,
        Ie,
        z,
        P,
        L,
        F,
        fe,
        ce,
        we,
        Ce
      ), We = g(
        me,
        Ie,
        z,
        P,
        L,
        F,
        fe,
        ce,
        we,
        Ce
      );
      me = D(x, A), Ie = H(x, A), z = N(x, A, B, _, E), P = $(x, A, B, _, E, d);
      var je = c(me, Ie, z, P), Pe = l(me, Ie, z, P);
      W = le, K = Se, le = ee, Se = ue, ee = re, ue = J, re = c(M, Z, Re, We), J = l(Z, Z, Re, We), M = E, Z = d, E = B, d = _, B = x, _ = A, x = c(Re, We, je, Pe), A = l(Re, We, je, Pe);
    }
    s(this.h, 0, x, A), s(this.h, 2, B, _), s(this.h, 4, E, d), s(this.h, 6, M, Z), s(this.h, 8, re, J), s(this.h, 10, ee, ue), s(this.h, 12, le, Se), s(this.h, 14, W, K);
  }, T.prototype._digest = function(a) {
    return a === "hex" ? e.toHex32(this.h, "big") : e.split32(this.h, "big");
  };
  function I(b, a, h, y, x) {
    var A = b & h ^ ~b & x;
    return A < 0 && (A += 4294967296), A;
  }
  function C(b, a, h, y, x, A) {
    var B = a & y ^ ~a & A;
    return B < 0 && (B += 4294967296), B;
  }
  function N(b, a, h, y, x) {
    var A = b & h ^ b & x ^ h & x;
    return A < 0 && (A += 4294967296), A;
  }
  function $(b, a, h, y, x, A) {
    var B = a & y ^ a & A ^ y & A;
    return B < 0 && (B += 4294967296), B;
  }
  function D(b, a) {
    var h = i(b, a, 28), y = i(a, b, 2), x = i(a, b, 7), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function H(b, a) {
    var h = f(b, a, 28), y = f(a, b, 2), x = f(a, b, 7), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function V(b, a) {
    var h = i(b, a, 14), y = i(b, a, 18), x = i(a, b, 9), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function ne(b, a) {
    var h = f(b, a, 14), y = f(b, a, 18), x = f(a, b, 9), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function Q(b, a) {
    var h = i(b, a, 1), y = i(b, a, 8), x = r(b, a, 7), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function se(b, a) {
    var h = f(b, a, 1), y = f(b, a, 8), x = o(b, a, 7), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function k(b, a) {
    var h = i(b, a, 19), y = i(a, b, 29), x = r(b, a, 6), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  function m(b, a) {
    var h = f(b, a, 19), y = f(a, b, 29), x = o(b, a, 6), A = h ^ y ^ x;
    return A < 0 && (A += 4294967296), A;
  }
  return Ws;
}
var Js, rd;
function Uw() {
  if (rd)
    return Js;
  rd = 1;
  var e = Kr(), t = Zp();
  function n() {
    if (!(this instanceof n))
      return new n();
    t.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return e.inherits(n, t), Js = n, n.blockSize = 1024, n.outSize = 384, n.hmacStrength = 192, n.padLength = 128, n.prototype._digest = function(f) {
    return f === "hex" ? e.toHex32(this.h.slice(0, 12), "big") : e.split32(this.h.slice(0, 12), "big");
  }, Js;
}
var nd;
function Fw() {
  return nd || (nd = 1, yn.sha1 = Dw(), yn.sha224 = qw(), yn.sha256 = Xp(), yn.sha384 = Uw(), yn.sha512 = Zp()), yn;
}
var Xs = {}, id;
function Hw() {
  if (id)
    return Xs;
  id = 1;
  var e = Kr(), t = Vi(), n = e.rotl32, i = e.sum32, f = e.sum32_3, r = e.sum32_4, o = t.BlockHash;
  function s() {
    if (!(this instanceof s))
      return new s();
    o.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  e.inherits(s, o), Xs.ripemd160 = s, s.blockSize = 512, s.outSize = 160, s.hmacStrength = 192, s.padLength = 64, s.prototype._update = function(T, I) {
    for (var C = this.h[0], N = this.h[1], $ = this.h[2], D = this.h[3], H = this.h[4], V = C, ne = N, Q = $, se = D, k = H, m = 0; m < 80; m++) {
      var b = i(
        n(
          r(C, c(m, N, $, D), T[v[m] + I], l(m)),
          g[m]
        ),
        H
      );
      C = H, H = D, D = n($, 10), $ = N, N = b, b = i(
        n(
          r(V, c(79 - m, ne, Q, se), T[p[m] + I], u(m)),
          w[m]
        ),
        k
      ), V = k, k = se, se = n(Q, 10), Q = ne, ne = b;
    }
    b = f(this.h[1], $, se), this.h[1] = f(this.h[2], D, k), this.h[2] = f(this.h[3], H, V), this.h[3] = f(this.h[4], C, ne), this.h[4] = f(this.h[0], N, Q), this.h[0] = b;
  }, s.prototype._digest = function(T) {
    return T === "hex" ? e.toHex32(this.h, "little") : e.split32(this.h, "little");
  };
  function c(S, T, I, C) {
    return S <= 15 ? T ^ I ^ C : S <= 31 ? T & I | ~T & C : S <= 47 ? (T | ~I) ^ C : S <= 63 ? T & C | I & ~C : T ^ (I | ~C);
  }
  function l(S) {
    return S <= 15 ? 0 : S <= 31 ? 1518500249 : S <= 47 ? 1859775393 : S <= 63 ? 2400959708 : 2840853838;
  }
  function u(S) {
    return S <= 15 ? 1352829926 : S <= 31 ? 1548603684 : S <= 47 ? 1836072691 : S <= 63 ? 2053994217 : 0;
  }
  var v = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], p = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], g = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], w = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return Xs;
}
var Zs, ad;
function zw() {
  if (ad)
    return Zs;
  ad = 1;
  var e = Kr(), t = Mr();
  function n(i, f, r) {
    if (!(this instanceof n))
      return new n(i, f, r);
    this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(e.toArray(f, r));
  }
  return Zs = n, n.prototype._init = function(f) {
    f.length > this.blockSize && (f = new this.Hash().update(f).digest()), t(f.length <= this.blockSize);
    for (var r = f.length; r < this.blockSize; r++)
      f.push(0);
    for (r = 0; r < f.length; r++)
      f[r] ^= 54;
    for (this.inner = new this.Hash().update(f), r = 0; r < f.length; r++)
      f[r] ^= 106;
    this.outer = new this.Hash().update(f);
  }, n.prototype.update = function(f, r) {
    return this.inner.update(f, r), this;
  }, n.prototype.digest = function(f) {
    return this.outer.update(this.inner.digest()), this.outer.digest(f);
  }, Zs;
}
var fd;
function Lc() {
  return fd || (fd = 1, function(e) {
    var t = e;
    t.utils = Kr(), t.common = Vi(), t.sha = Fw(), t.ripemd = Hw(), t.hmac = zw(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
  }(Hs)), Hs;
}
var Ys, od;
function Vw() {
  return od || (od = 1, Ys = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  }), Ys;
}
var sd;
function $c() {
  return sd || (sd = 1, function(e) {
    var t = e, n = Lc(), i = Wp(), f = Ar(), r = f.assert;
    function o(l) {
      l.type === "short" ? this.curve = new i.short(l) : l.type === "edwards" ? this.curve = new i.edwards(l) : this.curve = new i.mont(l), this.g = this.curve.g, this.n = this.curve.n, this.hash = l.hash, r(this.g.validate(), "Invalid curve"), r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    t.PresetCurve = o;
    function s(l, u) {
      Object.defineProperty(t, l, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var v = new o(u);
          return Object.defineProperty(t, l, {
            configurable: !0,
            enumerable: !0,
            value: v
          }), v;
        }
      });
    }
    s("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: n.sha256,
      gRed: !1,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    }), s("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: n.sha256,
      gRed: !1,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    }), s("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: n.sha256,
      gRed: !1,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    }), s("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: n.sha384,
      gRed: !1,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    }), s("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: n.sha512,
      gRed: !1,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    }), s("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: n.sha256,
      gRed: !1,
      g: [
        "9"
      ]
    }), s("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: n.sha256,
      gRed: !1,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var c;
    try {
      c = Vw();
    } catch {
      c = void 0;
    }
    s("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: n.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        c
      ]
    });
  }(Fs)), Fs;
}
var Qs, ud;
function Kw() {
  if (ud)
    return Qs;
  ud = 1;
  var e = Lc(), t = Gp(), n = Mr();
  function i(f) {
    if (!(this instanceof i))
      return new i(f);
    this.hash = f.hash, this.predResist = !!f.predResist, this.outLen = this.hash.outSize, this.minEntropy = f.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var r = t.toArray(f.entropy, f.entropyEnc || "hex"), o = t.toArray(f.nonce, f.nonceEnc || "hex"), s = t.toArray(f.pers, f.persEnc || "hex");
    n(
      r.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._init(r, o, s);
  }
  return Qs = i, i.prototype._init = function(r, o, s) {
    var c = r.concat(o).concat(s);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var l = 0; l < this.V.length; l++)
      this.K[l] = 0, this.V[l] = 1;
    this._update(c), this._reseed = 1, this.reseedInterval = 281474976710656;
  }, i.prototype._hmac = function() {
    return new e.hmac(this.hash, this.K);
  }, i.prototype._update = function(r) {
    var o = this._hmac().update(this.V).update([0]);
    r && (o = o.update(r)), this.K = o.digest(), this.V = this._hmac().update(this.V).digest(), r && (this.K = this._hmac().update(this.V).update([1]).update(r).digest(), this.V = this._hmac().update(this.V).digest());
  }, i.prototype.reseed = function(r, o, s, c) {
    typeof o != "string" && (c = s, s = o, o = null), r = t.toArray(r, o), s = t.toArray(s, c), n(
      r.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._update(r.concat(s || [])), this._reseed = 1;
  }, i.prototype.generate = function(r, o, s, c) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    typeof o != "string" && (c = s, s = o, o = null), s && (s = t.toArray(s, c || "hex"), this._update(s));
    for (var l = []; l.length < r; )
      this.V = this._hmac().update(this.V).digest(), l = l.concat(this.V);
    var u = l.slice(0, r);
    return this._update(s), this._reseed++, t.encode(u, o);
  }, Qs;
}
var eu, cd;
function Gw() {
  if (cd)
    return eu;
  cd = 1;
  var e = Ht, t = Ar(), n = t.assert;
  function i(f, r) {
    this.ec = f, this.priv = null, this.pub = null, r.priv && this._importPrivate(r.priv, r.privEnc), r.pub && this._importPublic(r.pub, r.pubEnc);
  }
  return eu = i, i.fromPublic = function(r, o, s) {
    return o instanceof i ? o : new i(r, {
      pub: o,
      pubEnc: s
    });
  }, i.fromPrivate = function(r, o, s) {
    return o instanceof i ? o : new i(r, {
      priv: o,
      privEnc: s
    });
  }, i.prototype.validate = function() {
    var r = this.getPublic();
    return r.isInfinity() ? { result: !1, reason: "Invalid public key" } : r.validate() ? r.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
  }, i.prototype.getPublic = function(r, o) {
    return typeof r == "string" && (o = r, r = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), o ? this.pub.encode(o, r) : this.pub;
  }, i.prototype.getPrivate = function(r) {
    return r === "hex" ? this.priv.toString(16, 2) : this.priv;
  }, i.prototype._importPrivate = function(r, o) {
    this.priv = new e(r, o || 16), this.priv = this.priv.umod(this.ec.curve.n);
  }, i.prototype._importPublic = function(r, o) {
    if (r.x || r.y) {
      this.ec.curve.type === "mont" ? n(r.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && n(r.x && r.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(r.x, r.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(r, o);
  }, i.prototype.derive = function(r) {
    return r.validate() || n(r.validate(), "public point not validated"), r.mul(this.priv).getX();
  }, i.prototype.sign = function(r, o, s) {
    return this.ec.sign(r, this, o, s);
  }, i.prototype.verify = function(r, o) {
    return this.ec.verify(r, o, this);
  }, i.prototype.inspect = function() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  }, eu;
}
var tu, hd;
function Ww() {
  if (hd)
    return tu;
  hd = 1;
  var e = Ht, t = Ar(), n = t.assert;
  function i(c, l) {
    if (c instanceof i)
      return c;
    this._importDER(c, l) || (n(c.r && c.s, "Signature without r or s"), this.r = new e(c.r, 16), this.s = new e(c.s, 16), c.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = c.recoveryParam);
  }
  tu = i;
  function f() {
    this.place = 0;
  }
  function r(c, l) {
    var u = c[l.place++];
    if (!(u & 128))
      return u;
    var v = u & 15;
    if (v === 0 || v > 4)
      return !1;
    for (var p = 0, g = 0, w = l.place; g < v; g++, w++)
      p <<= 8, p |= c[w], p >>>= 0;
    return p <= 127 ? !1 : (l.place = w, p);
  }
  function o(c) {
    for (var l = 0, u = c.length - 1; !c[l] && !(c[l + 1] & 128) && l < u; )
      l++;
    return l === 0 ? c : c.slice(l);
  }
  i.prototype._importDER = function(l, u) {
    l = t.toArray(l, u);
    var v = new f();
    if (l[v.place++] !== 48)
      return !1;
    var p = r(l, v);
    if (p === !1 || p + v.place !== l.length || l[v.place++] !== 2)
      return !1;
    var g = r(l, v);
    if (g === !1)
      return !1;
    var w = l.slice(v.place, g + v.place);
    if (v.place += g, l[v.place++] !== 2)
      return !1;
    var S = r(l, v);
    if (S === !1 || l.length !== S + v.place)
      return !1;
    var T = l.slice(v.place, S + v.place);
    if (w[0] === 0)
      if (w[1] & 128)
        w = w.slice(1);
      else
        return !1;
    if (T[0] === 0)
      if (T[1] & 128)
        T = T.slice(1);
      else
        return !1;
    return this.r = new e(w), this.s = new e(T), this.recoveryParam = null, !0;
  };
  function s(c, l) {
    if (l < 128) {
      c.push(l);
      return;
    }
    var u = 1 + (Math.log(l) / Math.LN2 >>> 3);
    for (c.push(u | 128); --u; )
      c.push(l >>> (u << 3) & 255);
    c.push(l);
  }
  return i.prototype.toDER = function(l) {
    var u = this.r.toArray(), v = this.s.toArray();
    for (u[0] & 128 && (u = [0].concat(u)), v[0] & 128 && (v = [0].concat(v)), u = o(u), v = o(v); !v[0] && !(v[1] & 128); )
      v = v.slice(1);
    var p = [2];
    s(p, u.length), p = p.concat(u), p.push(2), s(p, v.length);
    var g = p.concat(v), w = [48];
    return s(w, g.length), w = w.concat(g), t.encode(w, l);
  }, tu;
}
var ru, ld;
function Jw() {
  if (ld)
    return ru;
  ld = 1;
  var e = Ht, t = Kw(), n = Ar(), i = $c(), f = Oc(), r = n.assert, o = Gw(), s = Ww();
  function c(l) {
    if (!(this instanceof c))
      return new c(l);
    typeof l == "string" && (r(
      Object.prototype.hasOwnProperty.call(i, l),
      "Unknown curve " + l
    ), l = i[l]), l instanceof i.PresetCurve && (l = { curve: l }), this.curve = l.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = l.curve.g, this.g.precompute(l.curve.n.bitLength() + 1), this.hash = l.hash || l.curve.hash;
  }
  return ru = c, c.prototype.keyPair = function(u) {
    return new o(this, u);
  }, c.prototype.keyFromPrivate = function(u, v) {
    return o.fromPrivate(this, u, v);
  }, c.prototype.keyFromPublic = function(u, v) {
    return o.fromPublic(this, u, v);
  }, c.prototype.genKeyPair = function(u) {
    u || (u = {});
    for (var v = new t({
      hash: this.hash,
      pers: u.pers,
      persEnc: u.persEnc || "utf8",
      entropy: u.entropy || f(this.hash.hmacStrength),
      entropyEnc: u.entropy && u.entropyEnc || "utf8",
      nonce: this.n.toArray()
    }), p = this.n.byteLength(), g = this.n.sub(new e(2)); ; ) {
      var w = new e(v.generate(p));
      if (!(w.cmp(g) > 0))
        return w.iaddn(1), this.keyFromPrivate(w);
    }
  }, c.prototype._truncateToN = function(u, v) {
    var p = u.byteLength() * 8 - this.n.bitLength();
    return p > 0 && (u = u.ushrn(p)), !v && u.cmp(this.n) >= 0 ? u.sub(this.n) : u;
  }, c.prototype.sign = function(u, v, p, g) {
    typeof p == "object" && (g = p, p = null), g || (g = {}), v = this.keyFromPrivate(v, p), u = this._truncateToN(new e(u, 16));
    for (var w = this.n.byteLength(), S = v.getPrivate().toArray("be", w), T = u.toArray("be", w), I = new t({
      hash: this.hash,
      entropy: S,
      nonce: T,
      pers: g.pers,
      persEnc: g.persEnc || "utf8"
    }), C = this.n.sub(new e(1)), N = 0; ; N++) {
      var $ = g.k ? g.k(N) : new e(I.generate(this.n.byteLength()));
      if ($ = this._truncateToN($, !0), !($.cmpn(1) <= 0 || $.cmp(C) >= 0)) {
        var D = this.g.mul($);
        if (!D.isInfinity()) {
          var H = D.getX(), V = H.umod(this.n);
          if (V.cmpn(0) !== 0) {
            var ne = $.invm(this.n).mul(V.mul(v.getPrivate()).iadd(u));
            if (ne = ne.umod(this.n), ne.cmpn(0) !== 0) {
              var Q = (D.getY().isOdd() ? 1 : 0) | (H.cmp(V) !== 0 ? 2 : 0);
              return g.canonical && ne.cmp(this.nh) > 0 && (ne = this.n.sub(ne), Q ^= 1), new s({ r: V, s: ne, recoveryParam: Q });
            }
          }
        }
      }
    }
  }, c.prototype.verify = function(u, v, p, g) {
    u = this._truncateToN(new e(u, 16)), p = this.keyFromPublic(p, g), v = new s(v, "hex");
    var w = v.r, S = v.s;
    if (w.cmpn(1) < 0 || w.cmp(this.n) >= 0 || S.cmpn(1) < 0 || S.cmp(this.n) >= 0)
      return !1;
    var T = S.invm(this.n), I = T.mul(u).umod(this.n), C = T.mul(w).umod(this.n), N;
    return this.curve._maxwellTrick ? (N = this.g.jmulAdd(I, p.getPublic(), C), N.isInfinity() ? !1 : N.eqXToP(w)) : (N = this.g.mulAdd(I, p.getPublic(), C), N.isInfinity() ? !1 : N.getX().umod(this.n).cmp(w) === 0);
  }, c.prototype.recoverPubKey = function(l, u, v, p) {
    r((3 & v) === v, "The recovery param is more than two bits"), u = new s(u, p);
    var g = this.n, w = new e(l), S = u.r, T = u.s, I = v & 1, C = v >> 1;
    if (S.cmp(this.curve.p.umod(this.curve.n)) >= 0 && C)
      throw new Error("Unable to find sencond key candinate");
    C ? S = this.curve.pointFromX(S.add(this.curve.n), I) : S = this.curve.pointFromX(S, I);
    var N = u.r.invm(g), $ = g.sub(w).mul(N).umod(g), D = T.mul(N).umod(g);
    return this.g.mulAdd($, S, D);
  }, c.prototype.getKeyRecoveryParam = function(l, u, v, p) {
    if (u = new s(u, p), u.recoveryParam !== null)
      return u.recoveryParam;
    for (var g = 0; g < 4; g++) {
      var w;
      try {
        w = this.recoverPubKey(l, u, g);
      } catch {
        continue;
      }
      if (w.eq(v))
        return g;
    }
    throw new Error("Unable to find valid recovery factor");
  }, ru;
}
var nu, dd;
function Xw() {
  if (dd)
    return nu;
  dd = 1;
  var e = Ar(), t = e.assert, n = e.parseBytes, i = e.cachedProperty;
  function f(r, o) {
    this.eddsa = r, this._secret = n(o.secret), r.isPoint(o.pub) ? this._pub = o.pub : this._pubBytes = n(o.pub);
  }
  return f.fromPublic = function(o, s) {
    return s instanceof f ? s : new f(o, { pub: s });
  }, f.fromSecret = function(o, s) {
    return s instanceof f ? s : new f(o, { secret: s });
  }, f.prototype.secret = function() {
    return this._secret;
  }, i(f, "pubBytes", function() {
    return this.eddsa.encodePoint(this.pub());
  }), i(f, "pub", function() {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
  }), i(f, "privBytes", function() {
    var o = this.eddsa, s = this.hash(), c = o.encodingLength - 1, l = s.slice(0, o.encodingLength);
    return l[0] &= 248, l[c] &= 127, l[c] |= 64, l;
  }), i(f, "priv", function() {
    return this.eddsa.decodeInt(this.privBytes());
  }), i(f, "hash", function() {
    return this.eddsa.hash().update(this.secret()).digest();
  }), i(f, "messagePrefix", function() {
    return this.hash().slice(this.eddsa.encodingLength);
  }), f.prototype.sign = function(o) {
    return t(this._secret, "KeyPair can only verify"), this.eddsa.sign(o, this);
  }, f.prototype.verify = function(o, s) {
    return this.eddsa.verify(o, s, this);
  }, f.prototype.getSecret = function(o) {
    return t(this._secret, "KeyPair is public only"), e.encode(this.secret(), o);
  }, f.prototype.getPublic = function(o) {
    return e.encode(this.pubBytes(), o);
  }, nu = f, nu;
}
var iu, pd;
function Zw() {
  if (pd)
    return iu;
  pd = 1;
  var e = Ht, t = Ar(), n = t.assert, i = t.cachedProperty, f = t.parseBytes;
  function r(o, s) {
    this.eddsa = o, typeof s != "object" && (s = f(s)), Array.isArray(s) && (s = {
      R: s.slice(0, o.encodingLength),
      S: s.slice(o.encodingLength)
    }), n(s.R && s.S, "Signature without R or S"), o.isPoint(s.R) && (this._R = s.R), s.S instanceof e && (this._S = s.S), this._Rencoded = Array.isArray(s.R) ? s.R : s.Rencoded, this._Sencoded = Array.isArray(s.S) ? s.S : s.Sencoded;
  }
  return i(r, "S", function() {
    return this.eddsa.decodeInt(this.Sencoded());
  }), i(r, "R", function() {
    return this.eddsa.decodePoint(this.Rencoded());
  }), i(r, "Rencoded", function() {
    return this.eddsa.encodePoint(this.R());
  }), i(r, "Sencoded", function() {
    return this.eddsa.encodeInt(this.S());
  }), r.prototype.toBytes = function() {
    return this.Rencoded().concat(this.Sencoded());
  }, r.prototype.toHex = function() {
    return t.encode(this.toBytes(), "hex").toUpperCase();
  }, iu = r, iu;
}
var au, vd;
function Yw() {
  if (vd)
    return au;
  vd = 1;
  var e = Lc(), t = $c(), n = Ar(), i = n.assert, f = n.parseBytes, r = Xw(), o = Zw();
  function s(c) {
    if (i(c === "ed25519", "only tested with ed25519 so far"), !(this instanceof s))
      return new s(c);
    c = t[c].curve, this.curve = c, this.g = c.g, this.g.precompute(c.n.bitLength() + 1), this.pointClass = c.point().constructor, this.encodingLength = Math.ceil(c.n.bitLength() / 8), this.hash = e.sha512;
  }
  return au = s, s.prototype.sign = function(l, u) {
    l = f(l);
    var v = this.keyFromSecret(u), p = this.hashInt(v.messagePrefix(), l), g = this.g.mul(p), w = this.encodePoint(g), S = this.hashInt(w, v.pubBytes(), l).mul(v.priv()), T = p.add(S).umod(this.curve.n);
    return this.makeSignature({ R: g, S: T, Rencoded: w });
  }, s.prototype.verify = function(l, u, v) {
    l = f(l), u = this.makeSignature(u);
    var p = this.keyFromPublic(v), g = this.hashInt(u.Rencoded(), p.pubBytes(), l), w = this.g.mul(u.S()), S = u.R().add(p.pub().mul(g));
    return S.eq(w);
  }, s.prototype.hashInt = function() {
    for (var l = this.hash(), u = 0; u < arguments.length; u++)
      l.update(arguments[u]);
    return n.intFromLE(l.digest()).umod(this.curve.n);
  }, s.prototype.keyFromPublic = function(l) {
    return r.fromPublic(this, l);
  }, s.prototype.keyFromSecret = function(l) {
    return r.fromSecret(this, l);
  }, s.prototype.makeSignature = function(l) {
    return l instanceof o ? l : new o(this, l);
  }, s.prototype.encodePoint = function(l) {
    var u = l.getY().toArray("le", this.encodingLength);
    return u[this.encodingLength - 1] |= l.getX().isOdd() ? 128 : 0, u;
  }, s.prototype.decodePoint = function(l) {
    l = n.parseBytes(l);
    var u = l.length - 1, v = l.slice(0, u).concat(l[u] & -129), p = (l[u] & 128) !== 0, g = n.intFromLE(v);
    return this.curve.pointFromY(g, p);
  }, s.prototype.encodeInt = function(l) {
    return l.toArray("le", this.encodingLength);
  }, s.prototype.decodeInt = function(l) {
    return n.intFromLE(l);
  }, s.prototype.isPoint = function(l) {
    return l instanceof this.pointClass;
  }, au;
}
var bd;
function kc() {
  return bd || (bd = 1, function(e) {
    var t = e;
    t.version = Lw.version, t.utils = Ar(), t.rand = Oc(), t.curve = Wp(), t.curves = $c(), t.ec = Jw(), t.eddsa = Yw();
  }(Ns)), Ns;
}
var Ba = {}, Qw = {
  get exports() {
    return Ba;
  },
  set exports(e) {
    Ba = e;
  }
}, yd;
function Yp() {
  return yd || (yd = 1, function(e) {
    (function(t, n) {
      function i(b, a) {
        if (!b)
          throw new Error(a || "Assertion failed");
      }
      function f(b, a) {
        b.super_ = a;
        var h = function() {
        };
        h.prototype = a.prototype, b.prototype = new h(), b.prototype.constructor = b;
      }
      function r(b, a, h) {
        if (r.isBN(b))
          return b;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((a === "le" || a === "be") && (h = a, a = 10), this._init(b || 0, a || 10, h || "be"));
      }
      typeof t == "object" ? t.exports = r : n.BN = r, r.BN = r, r.wordSize = 26;
      var o;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Nr.Buffer;
      } catch {
      }
      r.isBN = function(a) {
        return a instanceof r ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === r.wordSize && Array.isArray(a.words);
      }, r.max = function(a, h) {
        return a.cmp(h) > 0 ? a : h;
      }, r.min = function(a, h) {
        return a.cmp(h) < 0 ? a : h;
      }, r.prototype._init = function(a, h, y) {
        if (typeof a == "number")
          return this._initNumber(a, h, y);
        if (typeof a == "object")
          return this._initArray(a, h, y);
        h === "hex" && (h = 16), i(h === (h | 0) && h >= 2 && h <= 36), a = a.toString().replace(/\s+/g, "");
        var x = 0;
        a[0] === "-" && (x++, this.negative = 1), x < a.length && (h === 16 ? this._parseHex(a, x, y) : (this._parseBase(a, h, x), y === "le" && this._initArray(this.toArray(), h, y)));
      }, r.prototype._initNumber = function(a, h, y) {
        a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
          a & 67108863,
          a / 67108864 & 67108863
        ], this.length = 2) : (i(a < 9007199254740992), this.words = [
          a & 67108863,
          a / 67108864 & 67108863,
          1
        ], this.length = 3), y === "le" && this._initArray(this.toArray(), h, y);
      }, r.prototype._initArray = function(a, h, y) {
        if (i(typeof a.length == "number"), a.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var A, B, _ = 0;
        if (y === "be")
          for (x = a.length - 1, A = 0; x >= 0; x -= 3)
            B = a[x] | a[x - 1] << 8 | a[x - 2] << 16, this.words[A] |= B << _ & 67108863, this.words[A + 1] = B >>> 26 - _ & 67108863, _ += 24, _ >= 26 && (_ -= 26, A++);
        else if (y === "le")
          for (x = 0, A = 0; x < a.length; x += 3)
            B = a[x] | a[x + 1] << 8 | a[x + 2] << 16, this.words[A] |= B << _ & 67108863, this.words[A + 1] = B >>> 26 - _ & 67108863, _ += 24, _ >= 26 && (_ -= 26, A++);
        return this._strip();
      };
      function s(b, a) {
        var h = b.charCodeAt(a);
        if (h >= 48 && h <= 57)
          return h - 48;
        if (h >= 65 && h <= 70)
          return h - 55;
        if (h >= 97 && h <= 102)
          return h - 87;
        i(!1, "Invalid character in " + b);
      }
      function c(b, a, h) {
        var y = s(b, h);
        return h - 1 >= a && (y |= s(b, h - 1) << 4), y;
      }
      r.prototype._parseHex = function(a, h, y) {
        this.length = Math.ceil((a.length - h) / 6), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var A = 0, B = 0, _;
        if (y === "be")
          for (x = a.length - 1; x >= h; x -= 2)
            _ = c(a, h, x) << A, this.words[B] |= _ & 67108863, A >= 18 ? (A -= 18, B += 1, this.words[B] |= _ >>> 26) : A += 8;
        else {
          var E = a.length - h;
          for (x = E % 2 === 0 ? h + 1 : h; x < a.length; x += 2)
            _ = c(a, h, x) << A, this.words[B] |= _ & 67108863, A >= 18 ? (A -= 18, B += 1, this.words[B] |= _ >>> 26) : A += 8;
        }
        this._strip();
      };
      function l(b, a, h, y) {
        for (var x = 0, A = 0, B = Math.min(b.length, h), _ = a; _ < B; _++) {
          var E = b.charCodeAt(_) - 48;
          x *= y, E >= 49 ? A = E - 49 + 10 : E >= 17 ? A = E - 17 + 10 : A = E, i(E >= 0 && A < y, "Invalid character"), x += A;
        }
        return x;
      }
      r.prototype._parseBase = function(a, h, y) {
        this.words = [0], this.length = 1;
        for (var x = 0, A = 1; A <= 67108863; A *= h)
          x++;
        x--, A = A / h | 0;
        for (var B = a.length - y, _ = B % x, E = Math.min(B, B - _) + y, d = 0, M = y; M < E; M += x)
          d = l(a, M, M + x, h), this.imuln(A), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
        if (_ !== 0) {
          var Z = 1;
          for (d = l(a, M, a.length, h), M = 0; M < _; M++)
            Z *= h;
          this.imuln(Z), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
        }
        this._strip();
      }, r.prototype.copy = function(a) {
        a.words = new Array(this.length);
        for (var h = 0; h < this.length; h++)
          a.words[h] = this.words[h];
        a.length = this.length, a.negative = this.negative, a.red = this.red;
      };
      function u(b, a) {
        b.words = a.words, b.length = a.length, b.negative = a.negative, b.red = a.red;
      }
      if (r.prototype._move = function(a) {
        u(a, this);
      }, r.prototype.clone = function() {
        var a = new r(null);
        return this.copy(a), a;
      }, r.prototype._expand = function(a) {
        for (; this.length < a; )
          this.words[this.length++] = 0;
        return this;
      }, r.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, r.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          r.prototype[Symbol.for("nodejs.util.inspect.custom")] = v;
        } catch {
          r.prototype.inspect = v;
        }
      else
        r.prototype.inspect = v;
      function v() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var p = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], g = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], w = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      r.prototype.toString = function(a, h) {
        a = a || 10, h = h | 0 || 1;
        var y;
        if (a === 16 || a === "hex") {
          y = "";
          for (var x = 0, A = 0, B = 0; B < this.length; B++) {
            var _ = this.words[B], E = ((_ << x | A) & 16777215).toString(16);
            A = _ >>> 24 - x & 16777215, x += 2, x >= 26 && (x -= 26, B--), A !== 0 || B !== this.length - 1 ? y = p[6 - E.length] + E + y : y = E + y;
          }
          for (A !== 0 && (y = A.toString(16) + y); y.length % h !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        if (a === (a | 0) && a >= 2 && a <= 36) {
          var d = g[a], M = w[a];
          y = "";
          var Z = this.clone();
          for (Z.negative = 0; !Z.isZero(); ) {
            var re = Z.modrn(M).toString(a);
            Z = Z.idivn(M), Z.isZero() ? y = re + y : y = p[d - re.length] + re + y;
          }
          for (this.isZero() && (y = "0" + y); y.length % h !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        i(!1, "Base should be between 2 and 36");
      }, r.prototype.toNumber = function() {
        var a = this.words[0];
        return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
      }, r.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, o && (r.prototype.toBuffer = function(a, h) {
        return this.toArrayLike(o, a, h);
      }), r.prototype.toArray = function(a, h) {
        return this.toArrayLike(Array, a, h);
      };
      var S = function(a, h) {
        return a.allocUnsafe ? a.allocUnsafe(h) : new a(h);
      };
      r.prototype.toArrayLike = function(a, h, y) {
        this._strip();
        var x = this.byteLength(), A = y || Math.max(1, x);
        i(x <= A, "byte array longer than desired length"), i(A > 0, "Requested array length <= 0");
        var B = S(a, A), _ = h === "le" ? "LE" : "BE";
        return this["_toArrayLike" + _](B, x), B;
      }, r.prototype._toArrayLikeLE = function(a, h) {
        for (var y = 0, x = 0, A = 0, B = 0; A < this.length; A++) {
          var _ = this.words[A] << B | x;
          a[y++] = _ & 255, y < a.length && (a[y++] = _ >> 8 & 255), y < a.length && (a[y++] = _ >> 16 & 255), B === 6 ? (y < a.length && (a[y++] = _ >> 24 & 255), x = 0, B = 0) : (x = _ >>> 24, B += 2);
        }
        if (y < a.length)
          for (a[y++] = x; y < a.length; )
            a[y++] = 0;
      }, r.prototype._toArrayLikeBE = function(a, h) {
        for (var y = a.length - 1, x = 0, A = 0, B = 0; A < this.length; A++) {
          var _ = this.words[A] << B | x;
          a[y--] = _ & 255, y >= 0 && (a[y--] = _ >> 8 & 255), y >= 0 && (a[y--] = _ >> 16 & 255), B === 6 ? (y >= 0 && (a[y--] = _ >> 24 & 255), x = 0, B = 0) : (x = _ >>> 24, B += 2);
        }
        if (y >= 0)
          for (a[y--] = x; y >= 0; )
            a[y--] = 0;
      }, Math.clz32 ? r.prototype._countBits = function(a) {
        return 32 - Math.clz32(a);
      } : r.prototype._countBits = function(a) {
        var h = a, y = 0;
        return h >= 4096 && (y += 13, h >>>= 13), h >= 64 && (y += 7, h >>>= 7), h >= 8 && (y += 4, h >>>= 4), h >= 2 && (y += 2, h >>>= 2), y + h;
      }, r.prototype._zeroBits = function(a) {
        if (a === 0)
          return 26;
        var h = a, y = 0;
        return h & 8191 || (y += 13, h >>>= 13), h & 127 || (y += 7, h >>>= 7), h & 15 || (y += 4, h >>>= 4), h & 3 || (y += 2, h >>>= 2), h & 1 || y++, y;
      }, r.prototype.bitLength = function() {
        var a = this.words[this.length - 1], h = this._countBits(a);
        return (this.length - 1) * 26 + h;
      };
      function T(b) {
        for (var a = new Array(b.bitLength()), h = 0; h < a.length; h++) {
          var y = h / 26 | 0, x = h % 26;
          a[h] = b.words[y] >>> x & 1;
        }
        return a;
      }
      r.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var a = 0, h = 0; h < this.length; h++) {
          var y = this._zeroBits(this.words[h]);
          if (a += y, y !== 26)
            break;
        }
        return a;
      }, r.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, r.prototype.toTwos = function(a) {
        return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
      }, r.prototype.fromTwos = function(a) {
        return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
      }, r.prototype.isNeg = function() {
        return this.negative !== 0;
      }, r.prototype.neg = function() {
        return this.clone().ineg();
      }, r.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, r.prototype.iuor = function(a) {
        for (; this.length < a.length; )
          this.words[this.length++] = 0;
        for (var h = 0; h < a.length; h++)
          this.words[h] = this.words[h] | a.words[h];
        return this._strip();
      }, r.prototype.ior = function(a) {
        return i((this.negative | a.negative) === 0), this.iuor(a);
      }, r.prototype.or = function(a) {
        return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
      }, r.prototype.uor = function(a) {
        return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
      }, r.prototype.iuand = function(a) {
        var h;
        this.length > a.length ? h = a : h = this;
        for (var y = 0; y < h.length; y++)
          this.words[y] = this.words[y] & a.words[y];
        return this.length = h.length, this._strip();
      }, r.prototype.iand = function(a) {
        return i((this.negative | a.negative) === 0), this.iuand(a);
      }, r.prototype.and = function(a) {
        return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
      }, r.prototype.uand = function(a) {
        return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
      }, r.prototype.iuxor = function(a) {
        var h, y;
        this.length > a.length ? (h = this, y = a) : (h = a, y = this);
        for (var x = 0; x < y.length; x++)
          this.words[x] = h.words[x] ^ y.words[x];
        if (this !== h)
          for (; x < h.length; x++)
            this.words[x] = h.words[x];
        return this.length = h.length, this._strip();
      }, r.prototype.ixor = function(a) {
        return i((this.negative | a.negative) === 0), this.iuxor(a);
      }, r.prototype.xor = function(a) {
        return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
      }, r.prototype.uxor = function(a) {
        return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
      }, r.prototype.inotn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = Math.ceil(a / 26) | 0, y = a % 26;
        this._expand(h), y > 0 && h--;
        for (var x = 0; x < h; x++)
          this.words[x] = ~this.words[x] & 67108863;
        return y > 0 && (this.words[x] = ~this.words[x] & 67108863 >> 26 - y), this._strip();
      }, r.prototype.notn = function(a) {
        return this.clone().inotn(a);
      }, r.prototype.setn = function(a, h) {
        i(typeof a == "number" && a >= 0);
        var y = a / 26 | 0, x = a % 26;
        return this._expand(y + 1), h ? this.words[y] = this.words[y] | 1 << x : this.words[y] = this.words[y] & ~(1 << x), this._strip();
      }, r.prototype.iadd = function(a) {
        var h;
        if (this.negative !== 0 && a.negative === 0)
          return this.negative = 0, h = this.isub(a), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && a.negative !== 0)
          return a.negative = 0, h = this.isub(a), a.negative = 1, h._normSign();
        var y, x;
        this.length > a.length ? (y = this, x = a) : (y = a, x = this);
        for (var A = 0, B = 0; B < x.length; B++)
          h = (y.words[B] | 0) + (x.words[B] | 0) + A, this.words[B] = h & 67108863, A = h >>> 26;
        for (; A !== 0 && B < y.length; B++)
          h = (y.words[B] | 0) + A, this.words[B] = h & 67108863, A = h >>> 26;
        if (this.length = y.length, A !== 0)
          this.words[this.length] = A, this.length++;
        else if (y !== this)
          for (; B < y.length; B++)
            this.words[B] = y.words[B];
        return this;
      }, r.prototype.add = function(a) {
        var h;
        return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, h = this.sub(a), a.negative ^= 1, h) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = a.sub(this), this.negative = 1, h) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
      }, r.prototype.isub = function(a) {
        if (a.negative !== 0) {
          a.negative = 0;
          var h = this.iadd(a);
          return a.negative = 1, h._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
        var y = this.cmp(a);
        if (y === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var x, A;
        y > 0 ? (x = this, A = a) : (x = a, A = this);
        for (var B = 0, _ = 0; _ < A.length; _++)
          h = (x.words[_] | 0) - (A.words[_] | 0) + B, B = h >> 26, this.words[_] = h & 67108863;
        for (; B !== 0 && _ < x.length; _++)
          h = (x.words[_] | 0) + B, B = h >> 26, this.words[_] = h & 67108863;
        if (B === 0 && _ < x.length && x !== this)
          for (; _ < x.length; _++)
            this.words[_] = x.words[_];
        return this.length = Math.max(this.length, _), x !== this && (this.negative = 1), this._strip();
      }, r.prototype.sub = function(a) {
        return this.clone().isub(a);
      };
      function I(b, a, h) {
        h.negative = a.negative ^ b.negative;
        var y = b.length + a.length | 0;
        h.length = y, y = y - 1 | 0;
        var x = b.words[0] | 0, A = a.words[0] | 0, B = x * A, _ = B & 67108863, E = B / 67108864 | 0;
        h.words[0] = _;
        for (var d = 1; d < y; d++) {
          for (var M = E >>> 26, Z = E & 67108863, re = Math.min(d, a.length - 1), J = Math.max(0, d - b.length + 1); J <= re; J++) {
            var ee = d - J | 0;
            x = b.words[ee] | 0, A = a.words[J] | 0, B = x * A + Z, M += B / 67108864 | 0, Z = B & 67108863;
          }
          h.words[d] = Z | 0, E = M | 0;
        }
        return E !== 0 ? h.words[d] = E | 0 : h.length--, h._strip();
      }
      var C = function(a, h, y) {
        var x = a.words, A = h.words, B = y.words, _ = 0, E, d, M, Z = x[0] | 0, re = Z & 8191, J = Z >>> 13, ee = x[1] | 0, ue = ee & 8191, le = ee >>> 13, Se = x[2] | 0, W = Se & 8191, K = Se >>> 13, pe = x[3] | 0, me = pe & 8191, Ie = pe >>> 13, z = x[4] | 0, P = z & 8191, L = z >>> 13, F = x[5] | 0, fe = F & 8191, ce = F >>> 13, we = x[6] | 0, Ce = we & 8191, Re = we >>> 13, We = x[7] | 0, je = We & 8191, Pe = We >>> 13, ct = x[8] | 0, ft = ct & 8191, Ke = ct >>> 13, Tt = x[9] | 0, it = Tt & 8191, Fe = Tt >>> 13, xt = A[0] | 0, rt = xt & 8191, Ve = xt >>> 13, Mt = A[1] | 0, at = Mt & 8191, ze = Mt >>> 13, At = A[2] | 0, st = At & 8191, De = At >>> 13, _t = A[3] | 0, Xe = _t & 8191, X = _t >>> 13, G = A[4] | 0, Y = G & 8191, te = G >>> 13, de = A[5] | 0, ge = de & 8191, ve = de >>> 13, Te = A[6] | 0, O = Te & 8191, j = Te >>> 13, q = A[7] | 0, R = q & 8191, U = q >>> 13, oe = A[8] | 0, ae = oe & 8191, he = oe >>> 13, xe = A[9] | 0, Me = xe & 8191, _e = xe >>> 13;
        y.negative = a.negative ^ h.negative, y.length = 19, E = Math.imul(re, rt), d = Math.imul(re, Ve), d = d + Math.imul(J, rt) | 0, M = Math.imul(J, Ve);
        var ut = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ut >>> 26) | 0, ut &= 67108863, E = Math.imul(ue, rt), d = Math.imul(ue, Ve), d = d + Math.imul(le, rt) | 0, M = Math.imul(le, Ve), E = E + Math.imul(re, at) | 0, d = d + Math.imul(re, ze) | 0, d = d + Math.imul(J, at) | 0, M = M + Math.imul(J, ze) | 0;
        var $e = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + ($e >>> 26) | 0, $e &= 67108863, E = Math.imul(W, rt), d = Math.imul(W, Ve), d = d + Math.imul(K, rt) | 0, M = Math.imul(K, Ve), E = E + Math.imul(ue, at) | 0, d = d + Math.imul(ue, ze) | 0, d = d + Math.imul(le, at) | 0, M = M + Math.imul(le, ze) | 0, E = E + Math.imul(re, st) | 0, d = d + Math.imul(re, De) | 0, d = d + Math.imul(J, st) | 0, M = M + Math.imul(J, De) | 0;
        var Je = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, E = Math.imul(me, rt), d = Math.imul(me, Ve), d = d + Math.imul(Ie, rt) | 0, M = Math.imul(Ie, Ve), E = E + Math.imul(W, at) | 0, d = d + Math.imul(W, ze) | 0, d = d + Math.imul(K, at) | 0, M = M + Math.imul(K, ze) | 0, E = E + Math.imul(ue, st) | 0, d = d + Math.imul(ue, De) | 0, d = d + Math.imul(le, st) | 0, M = M + Math.imul(le, De) | 0, E = E + Math.imul(re, Xe) | 0, d = d + Math.imul(re, X) | 0, d = d + Math.imul(J, Xe) | 0, M = M + Math.imul(J, X) | 0;
        var Ze = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ze >>> 26) | 0, Ze &= 67108863, E = Math.imul(P, rt), d = Math.imul(P, Ve), d = d + Math.imul(L, rt) | 0, M = Math.imul(L, Ve), E = E + Math.imul(me, at) | 0, d = d + Math.imul(me, ze) | 0, d = d + Math.imul(Ie, at) | 0, M = M + Math.imul(Ie, ze) | 0, E = E + Math.imul(W, st) | 0, d = d + Math.imul(W, De) | 0, d = d + Math.imul(K, st) | 0, M = M + Math.imul(K, De) | 0, E = E + Math.imul(ue, Xe) | 0, d = d + Math.imul(ue, X) | 0, d = d + Math.imul(le, Xe) | 0, M = M + Math.imul(le, X) | 0, E = E + Math.imul(re, Y) | 0, d = d + Math.imul(re, te) | 0, d = d + Math.imul(J, Y) | 0, M = M + Math.imul(J, te) | 0;
        var nt = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (nt >>> 26) | 0, nt &= 67108863, E = Math.imul(fe, rt), d = Math.imul(fe, Ve), d = d + Math.imul(ce, rt) | 0, M = Math.imul(ce, Ve), E = E + Math.imul(P, at) | 0, d = d + Math.imul(P, ze) | 0, d = d + Math.imul(L, at) | 0, M = M + Math.imul(L, ze) | 0, E = E + Math.imul(me, st) | 0, d = d + Math.imul(me, De) | 0, d = d + Math.imul(Ie, st) | 0, M = M + Math.imul(Ie, De) | 0, E = E + Math.imul(W, Xe) | 0, d = d + Math.imul(W, X) | 0, d = d + Math.imul(K, Xe) | 0, M = M + Math.imul(K, X) | 0, E = E + Math.imul(ue, Y) | 0, d = d + Math.imul(ue, te) | 0, d = d + Math.imul(le, Y) | 0, M = M + Math.imul(le, te) | 0, E = E + Math.imul(re, ge) | 0, d = d + Math.imul(re, ve) | 0, d = d + Math.imul(J, ge) | 0, M = M + Math.imul(J, ve) | 0;
        var tt = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (tt >>> 26) | 0, tt &= 67108863, E = Math.imul(Ce, rt), d = Math.imul(Ce, Ve), d = d + Math.imul(Re, rt) | 0, M = Math.imul(Re, Ve), E = E + Math.imul(fe, at) | 0, d = d + Math.imul(fe, ze) | 0, d = d + Math.imul(ce, at) | 0, M = M + Math.imul(ce, ze) | 0, E = E + Math.imul(P, st) | 0, d = d + Math.imul(P, De) | 0, d = d + Math.imul(L, st) | 0, M = M + Math.imul(L, De) | 0, E = E + Math.imul(me, Xe) | 0, d = d + Math.imul(me, X) | 0, d = d + Math.imul(Ie, Xe) | 0, M = M + Math.imul(Ie, X) | 0, E = E + Math.imul(W, Y) | 0, d = d + Math.imul(W, te) | 0, d = d + Math.imul(K, Y) | 0, M = M + Math.imul(K, te) | 0, E = E + Math.imul(ue, ge) | 0, d = d + Math.imul(ue, ve) | 0, d = d + Math.imul(le, ge) | 0, M = M + Math.imul(le, ve) | 0, E = E + Math.imul(re, O) | 0, d = d + Math.imul(re, j) | 0, d = d + Math.imul(J, O) | 0, M = M + Math.imul(J, j) | 0;
        var Ye = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, E = Math.imul(je, rt), d = Math.imul(je, Ve), d = d + Math.imul(Pe, rt) | 0, M = Math.imul(Pe, Ve), E = E + Math.imul(Ce, at) | 0, d = d + Math.imul(Ce, ze) | 0, d = d + Math.imul(Re, at) | 0, M = M + Math.imul(Re, ze) | 0, E = E + Math.imul(fe, st) | 0, d = d + Math.imul(fe, De) | 0, d = d + Math.imul(ce, st) | 0, M = M + Math.imul(ce, De) | 0, E = E + Math.imul(P, Xe) | 0, d = d + Math.imul(P, X) | 0, d = d + Math.imul(L, Xe) | 0, M = M + Math.imul(L, X) | 0, E = E + Math.imul(me, Y) | 0, d = d + Math.imul(me, te) | 0, d = d + Math.imul(Ie, Y) | 0, M = M + Math.imul(Ie, te) | 0, E = E + Math.imul(W, ge) | 0, d = d + Math.imul(W, ve) | 0, d = d + Math.imul(K, ge) | 0, M = M + Math.imul(K, ve) | 0, E = E + Math.imul(ue, O) | 0, d = d + Math.imul(ue, j) | 0, d = d + Math.imul(le, O) | 0, M = M + Math.imul(le, j) | 0, E = E + Math.imul(re, R) | 0, d = d + Math.imul(re, U) | 0, d = d + Math.imul(J, R) | 0, M = M + Math.imul(J, U) | 0;
        var et = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (et >>> 26) | 0, et &= 67108863, E = Math.imul(ft, rt), d = Math.imul(ft, Ve), d = d + Math.imul(Ke, rt) | 0, M = Math.imul(Ke, Ve), E = E + Math.imul(je, at) | 0, d = d + Math.imul(je, ze) | 0, d = d + Math.imul(Pe, at) | 0, M = M + Math.imul(Pe, ze) | 0, E = E + Math.imul(Ce, st) | 0, d = d + Math.imul(Ce, De) | 0, d = d + Math.imul(Re, st) | 0, M = M + Math.imul(Re, De) | 0, E = E + Math.imul(fe, Xe) | 0, d = d + Math.imul(fe, X) | 0, d = d + Math.imul(ce, Xe) | 0, M = M + Math.imul(ce, X) | 0, E = E + Math.imul(P, Y) | 0, d = d + Math.imul(P, te) | 0, d = d + Math.imul(L, Y) | 0, M = M + Math.imul(L, te) | 0, E = E + Math.imul(me, ge) | 0, d = d + Math.imul(me, ve) | 0, d = d + Math.imul(Ie, ge) | 0, M = M + Math.imul(Ie, ve) | 0, E = E + Math.imul(W, O) | 0, d = d + Math.imul(W, j) | 0, d = d + Math.imul(K, O) | 0, M = M + Math.imul(K, j) | 0, E = E + Math.imul(ue, R) | 0, d = d + Math.imul(ue, U) | 0, d = d + Math.imul(le, R) | 0, M = M + Math.imul(le, U) | 0, E = E + Math.imul(re, ae) | 0, d = d + Math.imul(re, he) | 0, d = d + Math.imul(J, ae) | 0, M = M + Math.imul(J, he) | 0;
        var Qe = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, E = Math.imul(it, rt), d = Math.imul(it, Ve), d = d + Math.imul(Fe, rt) | 0, M = Math.imul(Fe, Ve), E = E + Math.imul(ft, at) | 0, d = d + Math.imul(ft, ze) | 0, d = d + Math.imul(Ke, at) | 0, M = M + Math.imul(Ke, ze) | 0, E = E + Math.imul(je, st) | 0, d = d + Math.imul(je, De) | 0, d = d + Math.imul(Pe, st) | 0, M = M + Math.imul(Pe, De) | 0, E = E + Math.imul(Ce, Xe) | 0, d = d + Math.imul(Ce, X) | 0, d = d + Math.imul(Re, Xe) | 0, M = M + Math.imul(Re, X) | 0, E = E + Math.imul(fe, Y) | 0, d = d + Math.imul(fe, te) | 0, d = d + Math.imul(ce, Y) | 0, M = M + Math.imul(ce, te) | 0, E = E + Math.imul(P, ge) | 0, d = d + Math.imul(P, ve) | 0, d = d + Math.imul(L, ge) | 0, M = M + Math.imul(L, ve) | 0, E = E + Math.imul(me, O) | 0, d = d + Math.imul(me, j) | 0, d = d + Math.imul(Ie, O) | 0, M = M + Math.imul(Ie, j) | 0, E = E + Math.imul(W, R) | 0, d = d + Math.imul(W, U) | 0, d = d + Math.imul(K, R) | 0, M = M + Math.imul(K, U) | 0, E = E + Math.imul(ue, ae) | 0, d = d + Math.imul(ue, he) | 0, d = d + Math.imul(le, ae) | 0, M = M + Math.imul(le, he) | 0, E = E + Math.imul(re, Me) | 0, d = d + Math.imul(re, _e) | 0, d = d + Math.imul(J, Me) | 0, M = M + Math.imul(J, _e) | 0;
        var qe = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (qe >>> 26) | 0, qe &= 67108863, E = Math.imul(it, at), d = Math.imul(it, ze), d = d + Math.imul(Fe, at) | 0, M = Math.imul(Fe, ze), E = E + Math.imul(ft, st) | 0, d = d + Math.imul(ft, De) | 0, d = d + Math.imul(Ke, st) | 0, M = M + Math.imul(Ke, De) | 0, E = E + Math.imul(je, Xe) | 0, d = d + Math.imul(je, X) | 0, d = d + Math.imul(Pe, Xe) | 0, M = M + Math.imul(Pe, X) | 0, E = E + Math.imul(Ce, Y) | 0, d = d + Math.imul(Ce, te) | 0, d = d + Math.imul(Re, Y) | 0, M = M + Math.imul(Re, te) | 0, E = E + Math.imul(fe, ge) | 0, d = d + Math.imul(fe, ve) | 0, d = d + Math.imul(ce, ge) | 0, M = M + Math.imul(ce, ve) | 0, E = E + Math.imul(P, O) | 0, d = d + Math.imul(P, j) | 0, d = d + Math.imul(L, O) | 0, M = M + Math.imul(L, j) | 0, E = E + Math.imul(me, R) | 0, d = d + Math.imul(me, U) | 0, d = d + Math.imul(Ie, R) | 0, M = M + Math.imul(Ie, U) | 0, E = E + Math.imul(W, ae) | 0, d = d + Math.imul(W, he) | 0, d = d + Math.imul(K, ae) | 0, M = M + Math.imul(K, he) | 0, E = E + Math.imul(ue, Me) | 0, d = d + Math.imul(ue, _e) | 0, d = d + Math.imul(le, Me) | 0, M = M + Math.imul(le, _e) | 0;
        var Ge = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ge >>> 26) | 0, Ge &= 67108863, E = Math.imul(it, st), d = Math.imul(it, De), d = d + Math.imul(Fe, st) | 0, M = Math.imul(Fe, De), E = E + Math.imul(ft, Xe) | 0, d = d + Math.imul(ft, X) | 0, d = d + Math.imul(Ke, Xe) | 0, M = M + Math.imul(Ke, X) | 0, E = E + Math.imul(je, Y) | 0, d = d + Math.imul(je, te) | 0, d = d + Math.imul(Pe, Y) | 0, M = M + Math.imul(Pe, te) | 0, E = E + Math.imul(Ce, ge) | 0, d = d + Math.imul(Ce, ve) | 0, d = d + Math.imul(Re, ge) | 0, M = M + Math.imul(Re, ve) | 0, E = E + Math.imul(fe, O) | 0, d = d + Math.imul(fe, j) | 0, d = d + Math.imul(ce, O) | 0, M = M + Math.imul(ce, j) | 0, E = E + Math.imul(P, R) | 0, d = d + Math.imul(P, U) | 0, d = d + Math.imul(L, R) | 0, M = M + Math.imul(L, U) | 0, E = E + Math.imul(me, ae) | 0, d = d + Math.imul(me, he) | 0, d = d + Math.imul(Ie, ae) | 0, M = M + Math.imul(Ie, he) | 0, E = E + Math.imul(W, Me) | 0, d = d + Math.imul(W, _e) | 0, d = d + Math.imul(K, Me) | 0, M = M + Math.imul(K, _e) | 0;
        var ke = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, E = Math.imul(it, Xe), d = Math.imul(it, X), d = d + Math.imul(Fe, Xe) | 0, M = Math.imul(Fe, X), E = E + Math.imul(ft, Y) | 0, d = d + Math.imul(ft, te) | 0, d = d + Math.imul(Ke, Y) | 0, M = M + Math.imul(Ke, te) | 0, E = E + Math.imul(je, ge) | 0, d = d + Math.imul(je, ve) | 0, d = d + Math.imul(Pe, ge) | 0, M = M + Math.imul(Pe, ve) | 0, E = E + Math.imul(Ce, O) | 0, d = d + Math.imul(Ce, j) | 0, d = d + Math.imul(Re, O) | 0, M = M + Math.imul(Re, j) | 0, E = E + Math.imul(fe, R) | 0, d = d + Math.imul(fe, U) | 0, d = d + Math.imul(ce, R) | 0, M = M + Math.imul(ce, U) | 0, E = E + Math.imul(P, ae) | 0, d = d + Math.imul(P, he) | 0, d = d + Math.imul(L, ae) | 0, M = M + Math.imul(L, he) | 0, E = E + Math.imul(me, Me) | 0, d = d + Math.imul(me, _e) | 0, d = d + Math.imul(Ie, Me) | 0, M = M + Math.imul(Ie, _e) | 0;
        var Ue = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Ue >>> 26) | 0, Ue &= 67108863, E = Math.imul(it, Y), d = Math.imul(it, te), d = d + Math.imul(Fe, Y) | 0, M = Math.imul(Fe, te), E = E + Math.imul(ft, ge) | 0, d = d + Math.imul(ft, ve) | 0, d = d + Math.imul(Ke, ge) | 0, M = M + Math.imul(Ke, ve) | 0, E = E + Math.imul(je, O) | 0, d = d + Math.imul(je, j) | 0, d = d + Math.imul(Pe, O) | 0, M = M + Math.imul(Pe, j) | 0, E = E + Math.imul(Ce, R) | 0, d = d + Math.imul(Ce, U) | 0, d = d + Math.imul(Re, R) | 0, M = M + Math.imul(Re, U) | 0, E = E + Math.imul(fe, ae) | 0, d = d + Math.imul(fe, he) | 0, d = d + Math.imul(ce, ae) | 0, M = M + Math.imul(ce, he) | 0, E = E + Math.imul(P, Me) | 0, d = d + Math.imul(P, _e) | 0, d = d + Math.imul(L, Me) | 0, M = M + Math.imul(L, _e) | 0;
        var He = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (He >>> 26) | 0, He &= 67108863, E = Math.imul(it, ge), d = Math.imul(it, ve), d = d + Math.imul(Fe, ge) | 0, M = Math.imul(Fe, ve), E = E + Math.imul(ft, O) | 0, d = d + Math.imul(ft, j) | 0, d = d + Math.imul(Ke, O) | 0, M = M + Math.imul(Ke, j) | 0, E = E + Math.imul(je, R) | 0, d = d + Math.imul(je, U) | 0, d = d + Math.imul(Pe, R) | 0, M = M + Math.imul(Pe, U) | 0, E = E + Math.imul(Ce, ae) | 0, d = d + Math.imul(Ce, he) | 0, d = d + Math.imul(Re, ae) | 0, M = M + Math.imul(Re, he) | 0, E = E + Math.imul(fe, Me) | 0, d = d + Math.imul(fe, _e) | 0, d = d + Math.imul(ce, Me) | 0, M = M + Math.imul(ce, _e) | 0;
        var Le = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, E = Math.imul(it, O), d = Math.imul(it, j), d = d + Math.imul(Fe, O) | 0, M = Math.imul(Fe, j), E = E + Math.imul(ft, R) | 0, d = d + Math.imul(ft, U) | 0, d = d + Math.imul(Ke, R) | 0, M = M + Math.imul(Ke, U) | 0, E = E + Math.imul(je, ae) | 0, d = d + Math.imul(je, he) | 0, d = d + Math.imul(Pe, ae) | 0, M = M + Math.imul(Pe, he) | 0, E = E + Math.imul(Ce, Me) | 0, d = d + Math.imul(Ce, _e) | 0, d = d + Math.imul(Re, Me) | 0, M = M + Math.imul(Re, _e) | 0;
        var be = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, E = Math.imul(it, R), d = Math.imul(it, U), d = d + Math.imul(Fe, R) | 0, M = Math.imul(Fe, U), E = E + Math.imul(ft, ae) | 0, d = d + Math.imul(ft, he) | 0, d = d + Math.imul(Ke, ae) | 0, M = M + Math.imul(Ke, he) | 0, E = E + Math.imul(je, Me) | 0, d = d + Math.imul(je, _e) | 0, d = d + Math.imul(Pe, Me) | 0, M = M + Math.imul(Pe, _e) | 0;
        var ye = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, E = Math.imul(it, ae), d = Math.imul(it, he), d = d + Math.imul(Fe, ae) | 0, M = Math.imul(Fe, he), E = E + Math.imul(ft, Me) | 0, d = d + Math.imul(ft, _e) | 0, d = d + Math.imul(Ke, Me) | 0, M = M + Math.imul(Ke, _e) | 0;
        var Be = (_ + E | 0) + ((d & 8191) << 13) | 0;
        _ = (M + (d >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, E = Math.imul(it, Me), d = Math.imul(it, _e), d = d + Math.imul(Fe, Me) | 0, M = Math.imul(Fe, _e);
        var Ee = (_ + E | 0) + ((d & 8191) << 13) | 0;
        return _ = (M + (d >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, B[0] = ut, B[1] = $e, B[2] = Je, B[3] = Ze, B[4] = nt, B[5] = tt, B[6] = Ye, B[7] = et, B[8] = Qe, B[9] = qe, B[10] = Ge, B[11] = ke, B[12] = Ue, B[13] = He, B[14] = Le, B[15] = be, B[16] = ye, B[17] = Be, B[18] = Ee, _ !== 0 && (B[19] = _, y.length++), y;
      };
      Math.imul || (C = I);
      function N(b, a, h) {
        h.negative = a.negative ^ b.negative, h.length = b.length + a.length;
        for (var y = 0, x = 0, A = 0; A < h.length - 1; A++) {
          var B = x;
          x = 0;
          for (var _ = y & 67108863, E = Math.min(A, a.length - 1), d = Math.max(0, A - b.length + 1); d <= E; d++) {
            var M = A - d, Z = b.words[M] | 0, re = a.words[d] | 0, J = Z * re, ee = J & 67108863;
            B = B + (J / 67108864 | 0) | 0, ee = ee + _ | 0, _ = ee & 67108863, B = B + (ee >>> 26) | 0, x += B >>> 26, B &= 67108863;
          }
          h.words[A] = _, y = B, B = x;
        }
        return y !== 0 ? h.words[A] = y : h.length--, h._strip();
      }
      function $(b, a, h) {
        return N(b, a, h);
      }
      r.prototype.mulTo = function(a, h) {
        var y, x = this.length + a.length;
        return this.length === 10 && a.length === 10 ? y = C(this, a, h) : x < 63 ? y = I(this, a, h) : x < 1024 ? y = N(this, a, h) : y = $(this, a, h), y;
      }, r.prototype.mul = function(a) {
        var h = new r(null);
        return h.words = new Array(this.length + a.length), this.mulTo(a, h);
      }, r.prototype.mulf = function(a) {
        var h = new r(null);
        return h.words = new Array(this.length + a.length), $(this, a, h);
      }, r.prototype.imul = function(a) {
        return this.clone().mulTo(a, this);
      }, r.prototype.imuln = function(a) {
        var h = a < 0;
        h && (a = -a), i(typeof a == "number"), i(a < 67108864);
        for (var y = 0, x = 0; x < this.length; x++) {
          var A = (this.words[x] | 0) * a, B = (A & 67108863) + (y & 67108863);
          y >>= 26, y += A / 67108864 | 0, y += B >>> 26, this.words[x] = B & 67108863;
        }
        return y !== 0 && (this.words[x] = y, this.length++), h ? this.ineg() : this;
      }, r.prototype.muln = function(a) {
        return this.clone().imuln(a);
      }, r.prototype.sqr = function() {
        return this.mul(this);
      }, r.prototype.isqr = function() {
        return this.imul(this.clone());
      }, r.prototype.pow = function(a) {
        var h = T(a);
        if (h.length === 0)
          return new r(1);
        for (var y = this, x = 0; x < h.length && h[x] === 0; x++, y = y.sqr())
          ;
        if (++x < h.length)
          for (var A = y.sqr(); x < h.length; x++, A = A.sqr())
            h[x] !== 0 && (y = y.mul(A));
        return y;
      }, r.prototype.iushln = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26, x = 67108863 >>> 26 - h << 26 - h, A;
        if (h !== 0) {
          var B = 0;
          for (A = 0; A < this.length; A++) {
            var _ = this.words[A] & x, E = (this.words[A] | 0) - _ << h;
            this.words[A] = E | B, B = _ >>> 26 - h;
          }
          B && (this.words[A] = B, this.length++);
        }
        if (y !== 0) {
          for (A = this.length - 1; A >= 0; A--)
            this.words[A + y] = this.words[A];
          for (A = 0; A < y; A++)
            this.words[A] = 0;
          this.length += y;
        }
        return this._strip();
      }, r.prototype.ishln = function(a) {
        return i(this.negative === 0), this.iushln(a);
      }, r.prototype.iushrn = function(a, h, y) {
        i(typeof a == "number" && a >= 0);
        var x;
        h ? x = (h - h % 26) / 26 : x = 0;
        var A = a % 26, B = Math.min((a - A) / 26, this.length), _ = 67108863 ^ 67108863 >>> A << A, E = y;
        if (x -= B, x = Math.max(0, x), E) {
          for (var d = 0; d < B; d++)
            E.words[d] = this.words[d];
          E.length = B;
        }
        if (B !== 0)
          if (this.length > B)
            for (this.length -= B, d = 0; d < this.length; d++)
              this.words[d] = this.words[d + B];
          else
            this.words[0] = 0, this.length = 1;
        var M = 0;
        for (d = this.length - 1; d >= 0 && (M !== 0 || d >= x); d--) {
          var Z = this.words[d] | 0;
          this.words[d] = M << 26 - A | Z >>> A, M = Z & _;
        }
        return E && M !== 0 && (E.words[E.length++] = M), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, r.prototype.ishrn = function(a, h, y) {
        return i(this.negative === 0), this.iushrn(a, h, y);
      }, r.prototype.shln = function(a) {
        return this.clone().ishln(a);
      }, r.prototype.ushln = function(a) {
        return this.clone().iushln(a);
      }, r.prototype.shrn = function(a) {
        return this.clone().ishrn(a);
      }, r.prototype.ushrn = function(a) {
        return this.clone().iushrn(a);
      }, r.prototype.testn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26, x = 1 << h;
        if (this.length <= y)
          return !1;
        var A = this.words[y];
        return !!(A & x);
      }, r.prototype.imaskn = function(a) {
        i(typeof a == "number" && a >= 0);
        var h = a % 26, y = (a - h) / 26;
        if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= y)
          return this;
        if (h !== 0 && y++, this.length = Math.min(y, this.length), h !== 0) {
          var x = 67108863 ^ 67108863 >>> h << h;
          this.words[this.length - 1] &= x;
        }
        return this._strip();
      }, r.prototype.maskn = function(a) {
        return this.clone().imaskn(a);
      }, r.prototype.iaddn = function(a) {
        return i(typeof a == "number"), i(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
      }, r.prototype._iaddn = function(a) {
        this.words[0] += a;
        for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
          this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
        return this.length = Math.max(this.length, h + 1), this;
      }, r.prototype.isubn = function(a) {
        if (i(typeof a == "number"), i(a < 67108864), a < 0)
          return this.iaddn(-a);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(a), this.negative = 1, this;
        if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var h = 0; h < this.length && this.words[h] < 0; h++)
            this.words[h] += 67108864, this.words[h + 1] -= 1;
        return this._strip();
      }, r.prototype.addn = function(a) {
        return this.clone().iaddn(a);
      }, r.prototype.subn = function(a) {
        return this.clone().isubn(a);
      }, r.prototype.iabs = function() {
        return this.negative = 0, this;
      }, r.prototype.abs = function() {
        return this.clone().iabs();
      }, r.prototype._ishlnsubmul = function(a, h, y) {
        var x = a.length + y, A;
        this._expand(x);
        var B, _ = 0;
        for (A = 0; A < a.length; A++) {
          B = (this.words[A + y] | 0) + _;
          var E = (a.words[A] | 0) * h;
          B -= E & 67108863, _ = (B >> 26) - (E / 67108864 | 0), this.words[A + y] = B & 67108863;
        }
        for (; A < this.length - y; A++)
          B = (this.words[A + y] | 0) + _, _ = B >> 26, this.words[A + y] = B & 67108863;
        if (_ === 0)
          return this._strip();
        for (i(_ === -1), _ = 0, A = 0; A < this.length; A++)
          B = -(this.words[A] | 0) + _, _ = B >> 26, this.words[A] = B & 67108863;
        return this.negative = 1, this._strip();
      }, r.prototype._wordDiv = function(a, h) {
        var y = this.length - a.length, x = this.clone(), A = a, B = A.words[A.length - 1] | 0, _ = this._countBits(B);
        y = 26 - _, y !== 0 && (A = A.ushln(y), x.iushln(y), B = A.words[A.length - 1] | 0);
        var E = x.length - A.length, d;
        if (h !== "mod") {
          d = new r(null), d.length = E + 1, d.words = new Array(d.length);
          for (var M = 0; M < d.length; M++)
            d.words[M] = 0;
        }
        var Z = x.clone()._ishlnsubmul(A, 1, E);
        Z.negative === 0 && (x = Z, d && (d.words[E] = 1));
        for (var re = E - 1; re >= 0; re--) {
          var J = (x.words[A.length + re] | 0) * 67108864 + (x.words[A.length + re - 1] | 0);
          for (J = Math.min(J / B | 0, 67108863), x._ishlnsubmul(A, J, re); x.negative !== 0; )
            J--, x.negative = 0, x._ishlnsubmul(A, 1, re), x.isZero() || (x.negative ^= 1);
          d && (d.words[re] = J);
        }
        return d && d._strip(), x._strip(), h !== "div" && y !== 0 && x.iushrn(y), {
          div: d || null,
          mod: x
        };
      }, r.prototype.divmod = function(a, h, y) {
        if (i(!a.isZero()), this.isZero())
          return {
            div: new r(0),
            mod: new r(0)
          };
        var x, A, B;
        return this.negative !== 0 && a.negative === 0 ? (B = this.neg().divmod(a, h), h !== "mod" && (x = B.div.neg()), h !== "div" && (A = B.mod.neg(), y && A.negative !== 0 && A.iadd(a)), {
          div: x,
          mod: A
        }) : this.negative === 0 && a.negative !== 0 ? (B = this.divmod(a.neg(), h), h !== "mod" && (x = B.div.neg()), {
          div: x,
          mod: B.mod
        }) : this.negative & a.negative ? (B = this.neg().divmod(a.neg(), h), h !== "div" && (A = B.mod.neg(), y && A.negative !== 0 && A.isub(a)), {
          div: B.div,
          mod: A
        }) : a.length > this.length || this.cmp(a) < 0 ? {
          div: new r(0),
          mod: this
        } : a.length === 1 ? h === "div" ? {
          div: this.divn(a.words[0]),
          mod: null
        } : h === "mod" ? {
          div: null,
          mod: new r(this.modrn(a.words[0]))
        } : {
          div: this.divn(a.words[0]),
          mod: new r(this.modrn(a.words[0]))
        } : this._wordDiv(a, h);
      }, r.prototype.div = function(a) {
        return this.divmod(a, "div", !1).div;
      }, r.prototype.mod = function(a) {
        return this.divmod(a, "mod", !1).mod;
      }, r.prototype.umod = function(a) {
        return this.divmod(a, "mod", !0).mod;
      }, r.prototype.divRound = function(a) {
        var h = this.divmod(a);
        if (h.mod.isZero())
          return h.div;
        var y = h.div.negative !== 0 ? h.mod.isub(a) : h.mod, x = a.ushrn(1), A = a.andln(1), B = y.cmp(x);
        return B < 0 || A === 1 && B === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
      }, r.prototype.modrn = function(a) {
        var h = a < 0;
        h && (a = -a), i(a <= 67108863);
        for (var y = (1 << 26) % a, x = 0, A = this.length - 1; A >= 0; A--)
          x = (y * x + (this.words[A] | 0)) % a;
        return h ? -x : x;
      }, r.prototype.modn = function(a) {
        return this.modrn(a);
      }, r.prototype.idivn = function(a) {
        var h = a < 0;
        h && (a = -a), i(a <= 67108863);
        for (var y = 0, x = this.length - 1; x >= 0; x--) {
          var A = (this.words[x] | 0) + y * 67108864;
          this.words[x] = A / a | 0, y = A % a;
        }
        return this._strip(), h ? this.ineg() : this;
      }, r.prototype.divn = function(a) {
        return this.clone().idivn(a);
      }, r.prototype.egcd = function(a) {
        i(a.negative === 0), i(!a.isZero());
        var h = this, y = a.clone();
        h.negative !== 0 ? h = h.umod(a) : h = h.clone();
        for (var x = new r(1), A = new r(0), B = new r(0), _ = new r(1), E = 0; h.isEven() && y.isEven(); )
          h.iushrn(1), y.iushrn(1), ++E;
        for (var d = y.clone(), M = h.clone(); !h.isZero(); ) {
          for (var Z = 0, re = 1; !(h.words[0] & re) && Z < 26; ++Z, re <<= 1)
            ;
          if (Z > 0)
            for (h.iushrn(Z); Z-- > 0; )
              (x.isOdd() || A.isOdd()) && (x.iadd(d), A.isub(M)), x.iushrn(1), A.iushrn(1);
          for (var J = 0, ee = 1; !(y.words[0] & ee) && J < 26; ++J, ee <<= 1)
            ;
          if (J > 0)
            for (y.iushrn(J); J-- > 0; )
              (B.isOdd() || _.isOdd()) && (B.iadd(d), _.isub(M)), B.iushrn(1), _.iushrn(1);
          h.cmp(y) >= 0 ? (h.isub(y), x.isub(B), A.isub(_)) : (y.isub(h), B.isub(x), _.isub(A));
        }
        return {
          a: B,
          b: _,
          gcd: y.iushln(E)
        };
      }, r.prototype._invmp = function(a) {
        i(a.negative === 0), i(!a.isZero());
        var h = this, y = a.clone();
        h.negative !== 0 ? h = h.umod(a) : h = h.clone();
        for (var x = new r(1), A = new r(0), B = y.clone(); h.cmpn(1) > 0 && y.cmpn(1) > 0; ) {
          for (var _ = 0, E = 1; !(h.words[0] & E) && _ < 26; ++_, E <<= 1)
            ;
          if (_ > 0)
            for (h.iushrn(_); _-- > 0; )
              x.isOdd() && x.iadd(B), x.iushrn(1);
          for (var d = 0, M = 1; !(y.words[0] & M) && d < 26; ++d, M <<= 1)
            ;
          if (d > 0)
            for (y.iushrn(d); d-- > 0; )
              A.isOdd() && A.iadd(B), A.iushrn(1);
          h.cmp(y) >= 0 ? (h.isub(y), x.isub(A)) : (y.isub(h), A.isub(x));
        }
        var Z;
        return h.cmpn(1) === 0 ? Z = x : Z = A, Z.cmpn(0) < 0 && Z.iadd(a), Z;
      }, r.prototype.gcd = function(a) {
        if (this.isZero())
          return a.abs();
        if (a.isZero())
          return this.abs();
        var h = this.clone(), y = a.clone();
        h.negative = 0, y.negative = 0;
        for (var x = 0; h.isEven() && y.isEven(); x++)
          h.iushrn(1), y.iushrn(1);
        do {
          for (; h.isEven(); )
            h.iushrn(1);
          for (; y.isEven(); )
            y.iushrn(1);
          var A = h.cmp(y);
          if (A < 0) {
            var B = h;
            h = y, y = B;
          } else if (A === 0 || y.cmpn(1) === 0)
            break;
          h.isub(y);
        } while (!0);
        return y.iushln(x);
      }, r.prototype.invm = function(a) {
        return this.egcd(a).a.umod(a);
      }, r.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, r.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, r.prototype.andln = function(a) {
        return this.words[0] & a;
      }, r.prototype.bincn = function(a) {
        i(typeof a == "number");
        var h = a % 26, y = (a - h) / 26, x = 1 << h;
        if (this.length <= y)
          return this._expand(y + 1), this.words[y] |= x, this;
        for (var A = x, B = y; A !== 0 && B < this.length; B++) {
          var _ = this.words[B] | 0;
          _ += A, A = _ >>> 26, _ &= 67108863, this.words[B] = _;
        }
        return A !== 0 && (this.words[B] = A, this.length++), this;
      }, r.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, r.prototype.cmpn = function(a) {
        var h = a < 0;
        if (this.negative !== 0 && !h)
          return -1;
        if (this.negative === 0 && h)
          return 1;
        this._strip();
        var y;
        if (this.length > 1)
          y = 1;
        else {
          h && (a = -a), i(a <= 67108863, "Number is too big");
          var x = this.words[0] | 0;
          y = x === a ? 0 : x < a ? -1 : 1;
        }
        return this.negative !== 0 ? -y | 0 : y;
      }, r.prototype.cmp = function(a) {
        if (this.negative !== 0 && a.negative === 0)
          return -1;
        if (this.negative === 0 && a.negative !== 0)
          return 1;
        var h = this.ucmp(a);
        return this.negative !== 0 ? -h | 0 : h;
      }, r.prototype.ucmp = function(a) {
        if (this.length > a.length)
          return 1;
        if (this.length < a.length)
          return -1;
        for (var h = 0, y = this.length - 1; y >= 0; y--) {
          var x = this.words[y] | 0, A = a.words[y] | 0;
          if (x !== A) {
            x < A ? h = -1 : x > A && (h = 1);
            break;
          }
        }
        return h;
      }, r.prototype.gtn = function(a) {
        return this.cmpn(a) === 1;
      }, r.prototype.gt = function(a) {
        return this.cmp(a) === 1;
      }, r.prototype.gten = function(a) {
        return this.cmpn(a) >= 0;
      }, r.prototype.gte = function(a) {
        return this.cmp(a) >= 0;
      }, r.prototype.ltn = function(a) {
        return this.cmpn(a) === -1;
      }, r.prototype.lt = function(a) {
        return this.cmp(a) === -1;
      }, r.prototype.lten = function(a) {
        return this.cmpn(a) <= 0;
      }, r.prototype.lte = function(a) {
        return this.cmp(a) <= 0;
      }, r.prototype.eqn = function(a) {
        return this.cmpn(a) === 0;
      }, r.prototype.eq = function(a) {
        return this.cmp(a) === 0;
      }, r.red = function(a) {
        return new k(a);
      }, r.prototype.toRed = function(a) {
        return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
      }, r.prototype.fromRed = function() {
        return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, r.prototype._forceRed = function(a) {
        return this.red = a, this;
      }, r.prototype.forceRed = function(a) {
        return i(!this.red, "Already a number in reduction context"), this._forceRed(a);
      }, r.prototype.redAdd = function(a) {
        return i(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
      }, r.prototype.redIAdd = function(a) {
        return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
      }, r.prototype.redSub = function(a) {
        return i(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
      }, r.prototype.redISub = function(a) {
        return i(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
      }, r.prototype.redShl = function(a) {
        return i(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
      }, r.prototype.redMul = function(a) {
        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
      }, r.prototype.redIMul = function(a) {
        return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
      }, r.prototype.redSqr = function() {
        return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, r.prototype.redISqr = function() {
        return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, r.prototype.redSqrt = function() {
        return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, r.prototype.redInvm = function() {
        return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, r.prototype.redNeg = function() {
        return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, r.prototype.redPow = function(a) {
        return i(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
      };
      var D = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function H(b, a) {
        this.name = b, this.p = new r(a, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      H.prototype._tmp = function() {
        var a = new r(null);
        return a.words = new Array(Math.ceil(this.n / 13)), a;
      }, H.prototype.ireduce = function(a) {
        var h = a, y;
        do
          this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), y = h.bitLength();
        while (y > this.n);
        var x = y < this.n ? -1 : h.ucmp(this.p);
        return x === 0 ? (h.words[0] = 0, h.length = 1) : x > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
      }, H.prototype.split = function(a, h) {
        a.iushrn(this.n, 0, h);
      }, H.prototype.imulK = function(a) {
        return a.imul(this.k);
      };
      function V() {
        H.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      f(V, H), V.prototype.split = function(a, h) {
        for (var y = 4194303, x = Math.min(a.length, 9), A = 0; A < x; A++)
          h.words[A] = a.words[A];
        if (h.length = x, a.length <= 9) {
          a.words[0] = 0, a.length = 1;
          return;
        }
        var B = a.words[9];
        for (h.words[h.length++] = B & y, A = 10; A < a.length; A++) {
          var _ = a.words[A] | 0;
          a.words[A - 10] = (_ & y) << 4 | B >>> 22, B = _;
        }
        B >>>= 22, a.words[A - 10] = B, B === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
      }, V.prototype.imulK = function(a) {
        a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
        for (var h = 0, y = 0; y < a.length; y++) {
          var x = a.words[y] | 0;
          h += x * 977, a.words[y] = h & 67108863, h = x * 64 + (h / 67108864 | 0);
        }
        return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
      };
      function ne() {
        H.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      f(ne, H);
      function Q() {
        H.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      f(Q, H);
      function se() {
        H.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      f(se, H), se.prototype.imulK = function(a) {
        for (var h = 0, y = 0; y < a.length; y++) {
          var x = (a.words[y] | 0) * 19 + h, A = x & 67108863;
          x >>>= 26, a.words[y] = A, h = x;
        }
        return h !== 0 && (a.words[a.length++] = h), a;
      }, r._prime = function(a) {
        if (D[a])
          return D[a];
        var h;
        if (a === "k256")
          h = new V();
        else if (a === "p224")
          h = new ne();
        else if (a === "p192")
          h = new Q();
        else if (a === "p25519")
          h = new se();
        else
          throw new Error("Unknown prime " + a);
        return D[a] = h, h;
      };
      function k(b) {
        if (typeof b == "string") {
          var a = r._prime(b);
          this.m = a.p, this.prime = a;
        } else
          i(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
      }
      k.prototype._verify1 = function(a) {
        i(a.negative === 0, "red works only with positives"), i(a.red, "red works only with red numbers");
      }, k.prototype._verify2 = function(a, h) {
        i((a.negative | h.negative) === 0, "red works only with positives"), i(
          a.red && a.red === h.red,
          "red works only with red numbers"
        );
      }, k.prototype.imod = function(a) {
        return this.prime ? this.prime.ireduce(a)._forceRed(this) : (u(a, a.umod(this.m)._forceRed(this)), a);
      }, k.prototype.neg = function(a) {
        return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
      }, k.prototype.add = function(a, h) {
        this._verify2(a, h);
        var y = a.add(h);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y._forceRed(this);
      }, k.prototype.iadd = function(a, h) {
        this._verify2(a, h);
        var y = a.iadd(h);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y;
      }, k.prototype.sub = function(a, h) {
        this._verify2(a, h);
        var y = a.sub(h);
        return y.cmpn(0) < 0 && y.iadd(this.m), y._forceRed(this);
      }, k.prototype.isub = function(a, h) {
        this._verify2(a, h);
        var y = a.isub(h);
        return y.cmpn(0) < 0 && y.iadd(this.m), y;
      }, k.prototype.shl = function(a, h) {
        return this._verify1(a), this.imod(a.ushln(h));
      }, k.prototype.imul = function(a, h) {
        return this._verify2(a, h), this.imod(a.imul(h));
      }, k.prototype.mul = function(a, h) {
        return this._verify2(a, h), this.imod(a.mul(h));
      }, k.prototype.isqr = function(a) {
        return this.imul(a, a.clone());
      }, k.prototype.sqr = function(a) {
        return this.mul(a, a);
      }, k.prototype.sqrt = function(a) {
        if (a.isZero())
          return a.clone();
        var h = this.m.andln(3);
        if (i(h % 2 === 1), h === 3) {
          var y = this.m.add(new r(1)).iushrn(2);
          return this.pow(a, y);
        }
        for (var x = this.m.subn(1), A = 0; !x.isZero() && x.andln(1) === 0; )
          A++, x.iushrn(1);
        i(!x.isZero());
        var B = new r(1).toRed(this), _ = B.redNeg(), E = this.m.subn(1).iushrn(1), d = this.m.bitLength();
        for (d = new r(2 * d * d).toRed(this); this.pow(d, E).cmp(_) !== 0; )
          d.redIAdd(_);
        for (var M = this.pow(d, x), Z = this.pow(a, x.addn(1).iushrn(1)), re = this.pow(a, x), J = A; re.cmp(B) !== 0; ) {
          for (var ee = re, ue = 0; ee.cmp(B) !== 0; ue++)
            ee = ee.redSqr();
          i(ue < J);
          var le = this.pow(M, new r(1).iushln(J - ue - 1));
          Z = Z.redMul(le), M = le.redSqr(), re = re.redMul(M), J = ue;
        }
        return Z;
      }, k.prototype.invm = function(a) {
        var h = a._invmp(this.m);
        return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
      }, k.prototype.pow = function(a, h) {
        if (h.isZero())
          return new r(1).toRed(this);
        if (h.cmpn(1) === 0)
          return a.clone();
        var y = 4, x = new Array(1 << y);
        x[0] = new r(1).toRed(this), x[1] = a;
        for (var A = 2; A < x.length; A++)
          x[A] = this.mul(x[A - 1], a);
        var B = x[0], _ = 0, E = 0, d = h.bitLength() % 26;
        for (d === 0 && (d = 26), A = h.length - 1; A >= 0; A--) {
          for (var M = h.words[A], Z = d - 1; Z >= 0; Z--) {
            var re = M >> Z & 1;
            if (B !== x[0] && (B = this.sqr(B)), re === 0 && _ === 0) {
              E = 0;
              continue;
            }
            _ <<= 1, _ |= re, E++, !(E !== y && (A !== 0 || Z !== 0)) && (B = this.mul(B, x[_]), E = 0, _ = 0);
          }
          d = 26;
        }
        return B;
      }, k.prototype.convertTo = function(a) {
        var h = a.umod(this.m);
        return h === a ? h.clone() : h;
      }, k.prototype.convertFrom = function(a) {
        var h = a.clone();
        return h.red = null, h;
      }, r.mont = function(a) {
        return new m(a);
      };
      function m(b) {
        k.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      f(m, k), m.prototype.convertTo = function(a) {
        return this.imod(a.ushln(this.shift));
      }, m.prototype.convertFrom = function(a) {
        var h = this.imod(a.mul(this.rinv));
        return h.red = null, h;
      }, m.prototype.imul = function(a, h) {
        if (a.isZero() || h.isZero())
          return a.words[0] = 0, a.length = 1, a;
        var y = a.imul(h), x = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = y.isub(x).iushrn(this.shift), B = A;
        return A.cmp(this.m) >= 0 ? B = A.isub(this.m) : A.cmpn(0) < 0 && (B = A.iadd(this.m)), B._forceRed(this);
      }, m.prototype.mul = function(a, h) {
        if (a.isZero() || h.isZero())
          return new r(0)._forceRed(this);
        var y = a.mul(h), x = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = y.isub(x).iushrn(this.shift), B = A;
        return A.cmp(this.m) >= 0 ? B = A.isub(this.m) : A.cmpn(0) < 0 && (B = A.iadd(this.m)), B._forceRed(this);
      }, m.prototype.invm = function(a) {
        var h = this.imod(a._invmp(this.m).mul(this.r2));
        return h._forceRed(this);
      };
    })(e, Ne);
  }(Qw)), Ba;
}
var yr = {}, fu = {}, ou = {}, su = {}, uu, gd;
function jc() {
  if (gd)
    return uu;
  gd = 1;
  var e = Nr, t = e.Buffer, n = {}, i;
  for (i in e)
    e.hasOwnProperty(i) && (i === "SlowBuffer" || i === "Buffer" || (n[i] = e[i]));
  var f = n.Buffer = {};
  for (i in t)
    t.hasOwnProperty(i) && (i === "allocUnsafe" || i === "allocUnsafeSlow" || (f[i] = t[i]));
  if (n.Buffer.prototype = t.prototype, (!f.from || f.from === Uint8Array.from) && (f.from = function(r, o, s) {
    if (typeof r == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof r);
    if (r && typeof r.length > "u")
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    return t(r, o, s);
  }), f.alloc || (f.alloc = function(r, o, s) {
    if (typeof r != "number")
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof r);
    if (r < 0 || r >= 2 * (1 << 30))
      throw new RangeError('The value "' + r + '" is invalid for option "size"');
    var c = t(r);
    return !o || o.length === 0 ? c.fill(0) : typeof s == "string" ? c.fill(o, s) : c.fill(o), c;
  }), !n.kStringMaxLength)
    try {
      n.kStringMaxLength = process.binding("buffer").kStringMaxLength;
    } catch {
    }
  return n.constants || (n.constants = {
    MAX_LENGTH: n.kMaxLength
  }, n.kStringMaxLength && (n.constants.MAX_STRING_LENGTH = n.kStringMaxLength)), uu = n, uu;
}
var cu = {}, md;
function Dc() {
  if (md)
    return cu;
  md = 1;
  const e = bt();
  function t(i) {
    this._reporterState = {
      obj: null,
      path: [],
      options: i || {},
      errors: []
    };
  }
  cu.Reporter = t, t.prototype.isError = function(f) {
    return f instanceof n;
  }, t.prototype.save = function() {
    const f = this._reporterState;
    return { obj: f.obj, pathLen: f.path.length };
  }, t.prototype.restore = function(f) {
    const r = this._reporterState;
    r.obj = f.obj, r.path = r.path.slice(0, f.pathLen);
  }, t.prototype.enterKey = function(f) {
    return this._reporterState.path.push(f);
  }, t.prototype.exitKey = function(f) {
    const r = this._reporterState;
    r.path = r.path.slice(0, f - 1);
  }, t.prototype.leaveKey = function(f, r, o) {
    const s = this._reporterState;
    this.exitKey(f), s.obj !== null && (s.obj[r] = o);
  }, t.prototype.path = function() {
    return this._reporterState.path.join("/");
  }, t.prototype.enterObject = function() {
    const f = this._reporterState, r = f.obj;
    return f.obj = {}, r;
  }, t.prototype.leaveObject = function(f) {
    const r = this._reporterState, o = r.obj;
    return r.obj = f, o;
  }, t.prototype.error = function(f) {
    let r;
    const o = this._reporterState, s = f instanceof n;
    if (s ? r = f : r = new n(o.path.map(function(c) {
      return "[" + JSON.stringify(c) + "]";
    }).join(""), f.message || f, f.stack), !o.options.partial)
      throw r;
    return s || o.errors.push(r), r;
  }, t.prototype.wrapResult = function(f) {
    const r = this._reporterState;
    return r.options.partial ? {
      result: this.isError(f) ? null : f,
      errors: r.errors
    } : f;
  };
  function n(i, f) {
    this.path = i, this.rethrow(f);
  }
  return e(n, Error), n.prototype.rethrow = function(f) {
    if (this.message = f + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, n), !this.stack)
      try {
        throw new Error(this.message);
      } catch (r) {
        this.stack = r.stack;
      }
    return this;
  }, cu;
}
var ua = {}, wd;
function Ai() {
  if (wd)
    return ua;
  wd = 1;
  const e = bt(), t = Dc().Reporter, n = jc().Buffer;
  function i(r, o) {
    if (t.call(this, o), !n.isBuffer(r)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = r, this.offset = 0, this.length = r.length;
  }
  e(i, t), ua.DecoderBuffer = i, i.isDecoderBuffer = function(o) {
    return o instanceof i ? !0 : typeof o == "object" && n.isBuffer(o.base) && o.constructor.name === "DecoderBuffer" && typeof o.offset == "number" && typeof o.length == "number" && typeof o.save == "function" && typeof o.restore == "function" && typeof o.isEmpty == "function" && typeof o.readUInt8 == "function" && typeof o.skip == "function" && typeof o.raw == "function";
  }, i.prototype.save = function() {
    return { offset: this.offset, reporter: t.prototype.save.call(this) };
  }, i.prototype.restore = function(o) {
    const s = new i(this.base);
    return s.offset = o.offset, s.length = this.offset, this.offset = o.offset, t.prototype.restore.call(this, o.reporter), s;
  }, i.prototype.isEmpty = function() {
    return this.offset === this.length;
  }, i.prototype.readUInt8 = function(o) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(o || "DecoderBuffer overrun");
  }, i.prototype.skip = function(o, s) {
    if (!(this.offset + o <= this.length))
      return this.error(s || "DecoderBuffer overrun");
    const c = new i(this.base);
    return c._reporterState = this._reporterState, c.offset = this.offset, c.length = this.offset + o, this.offset += o, c;
  }, i.prototype.raw = function(o) {
    return this.base.slice(o ? o.offset : this.offset, this.length);
  };
  function f(r, o) {
    if (Array.isArray(r))
      this.length = 0, this.value = r.map(function(s) {
        return f.isEncoderBuffer(s) || (s = new f(s, o)), this.length += s.length, s;
      }, this);
    else if (typeof r == "number") {
      if (!(0 <= r && r <= 255))
        return o.error("non-byte EncoderBuffer value");
      this.value = r, this.length = 1;
    } else if (typeof r == "string")
      this.value = r, this.length = n.byteLength(r);
    else if (n.isBuffer(r))
      this.value = r, this.length = r.length;
    else
      return o.error("Unsupported type: " + typeof r);
  }
  return ua.EncoderBuffer = f, f.isEncoderBuffer = function(o) {
    return o instanceof f ? !0 : typeof o == "object" && o.constructor.name === "EncoderBuffer" && typeof o.length == "number" && typeof o.join == "function";
  }, f.prototype.join = function(o, s) {
    return o || (o = n.alloc(this.length)), s || (s = 0), this.length === 0 || (Array.isArray(this.value) ? this.value.forEach(function(c) {
      c.join(o, s), s += c.length;
    }) : (typeof this.value == "number" ? o[s] = this.value : typeof this.value == "string" ? o.write(this.value, s) : n.isBuffer(this.value) && this.value.copy(o, s), s += this.length)), o;
  }, ua;
}
var hu, _d;
function qc() {
  if (_d)
    return hu;
  _d = 1;
  const e = Dc().Reporter, t = Ai().EncoderBuffer, n = Ai().DecoderBuffer, i = Mr(), f = [
    "seq",
    "seqof",
    "set",
    "setof",
    "objid",
    "bool",
    "gentime",
    "utctime",
    "null_",
    "enum",
    "int",
    "objDesc",
    "bitstr",
    "bmpstr",
    "charstr",
    "genstr",
    "graphstr",
    "ia5str",
    "iso646str",
    "numstr",
    "octstr",
    "printstr",
    "t61str",
    "unistr",
    "utf8str",
    "videostr"
  ], r = [
    "key",
    "obj",
    "use",
    "optional",
    "explicit",
    "implicit",
    "def",
    "choice",
    "any",
    "contains"
  ].concat(f), o = [
    "_peekTag",
    "_decodeTag",
    "_use",
    "_decodeStr",
    "_decodeObjid",
    "_decodeTime",
    "_decodeNull",
    "_decodeInt",
    "_decodeBool",
    "_decodeList",
    "_encodeComposite",
    "_encodeStr",
    "_encodeObjid",
    "_encodeTime",
    "_encodeNull",
    "_encodeInt",
    "_encodeBool"
  ];
  function s(l, u, v) {
    const p = {};
    this._baseState = p, p.name = v, p.enc = l, p.parent = u || null, p.children = null, p.tag = null, p.args = null, p.reverseArgs = null, p.choice = null, p.optional = !1, p.any = !1, p.obj = !1, p.use = null, p.useDecoder = null, p.key = null, p.default = null, p.explicit = null, p.implicit = null, p.contains = null, p.parent || (p.children = [], this._wrap());
  }
  hu = s;
  const c = [
    "enc",
    "parent",
    "children",
    "tag",
    "args",
    "reverseArgs",
    "choice",
    "optional",
    "any",
    "obj",
    "use",
    "alteredUse",
    "key",
    "default",
    "explicit",
    "implicit",
    "contains"
  ];
  return s.prototype.clone = function() {
    const u = this._baseState, v = {};
    c.forEach(function(g) {
      v[g] = u[g];
    });
    const p = new this.constructor(v.parent);
    return p._baseState = v, p;
  }, s.prototype._wrap = function() {
    const u = this._baseState;
    r.forEach(function(v) {
      this[v] = function() {
        const g = new this.constructor(this);
        return u.children.push(g), g[v].apply(g, arguments);
      };
    }, this);
  }, s.prototype._init = function(u) {
    const v = this._baseState;
    i(v.parent === null), u.call(this), v.children = v.children.filter(function(p) {
      return p._baseState.parent === this;
    }, this), i.equal(v.children.length, 1, "Root node can have only one child");
  }, s.prototype._useArgs = function(u) {
    const v = this._baseState, p = u.filter(function(g) {
      return g instanceof this.constructor;
    }, this);
    u = u.filter(function(g) {
      return !(g instanceof this.constructor);
    }, this), p.length !== 0 && (i(v.children === null), v.children = p, p.forEach(function(g) {
      g._baseState.parent = this;
    }, this)), u.length !== 0 && (i(v.args === null), v.args = u, v.reverseArgs = u.map(function(g) {
      if (typeof g != "object" || g.constructor !== Object)
        return g;
      const w = {};
      return Object.keys(g).forEach(function(S) {
        S == (S | 0) && (S |= 0);
        const T = g[S];
        w[T] = S;
      }), w;
    }));
  }, o.forEach(function(l) {
    s.prototype[l] = function() {
      const v = this._baseState;
      throw new Error(l + " not implemented for encoding: " + v.enc);
    };
  }), f.forEach(function(l) {
    s.prototype[l] = function() {
      const v = this._baseState, p = Array.prototype.slice.call(arguments);
      return i(v.tag === null), v.tag = l, this._useArgs(p), this;
    };
  }), s.prototype.use = function(u) {
    i(u);
    const v = this._baseState;
    return i(v.use === null), v.use = u, this;
  }, s.prototype.optional = function() {
    const u = this._baseState;
    return u.optional = !0, this;
  }, s.prototype.def = function(u) {
    const v = this._baseState;
    return i(v.default === null), v.default = u, v.optional = !0, this;
  }, s.prototype.explicit = function(u) {
    const v = this._baseState;
    return i(v.explicit === null && v.implicit === null), v.explicit = u, this;
  }, s.prototype.implicit = function(u) {
    const v = this._baseState;
    return i(v.explicit === null && v.implicit === null), v.implicit = u, this;
  }, s.prototype.obj = function() {
    const u = this._baseState, v = Array.prototype.slice.call(arguments);
    return u.obj = !0, v.length !== 0 && this._useArgs(v), this;
  }, s.prototype.key = function(u) {
    const v = this._baseState;
    return i(v.key === null), v.key = u, this;
  }, s.prototype.any = function() {
    const u = this._baseState;
    return u.any = !0, this;
  }, s.prototype.choice = function(u) {
    const v = this._baseState;
    return i(v.choice === null), v.choice = u, this._useArgs(Object.keys(u).map(function(p) {
      return u[p];
    })), this;
  }, s.prototype.contains = function(u) {
    const v = this._baseState;
    return i(v.use === null), v.contains = u, this;
  }, s.prototype._decode = function(u, v) {
    const p = this._baseState;
    if (p.parent === null)
      return u.wrapResult(p.children[0]._decode(u, v));
    let g = p.default, w = !0, S = null;
    if (p.key !== null && (S = u.enterKey(p.key)), p.optional) {
      let I = null;
      if (p.explicit !== null ? I = p.explicit : p.implicit !== null ? I = p.implicit : p.tag !== null && (I = p.tag), I === null && !p.any) {
        const C = u.save();
        try {
          p.choice === null ? this._decodeGeneric(p.tag, u, v) : this._decodeChoice(u, v), w = !0;
        } catch {
          w = !1;
        }
        u.restore(C);
      } else if (w = this._peekTag(u, I, p.any), u.isError(w))
        return w;
    }
    let T;
    if (p.obj && w && (T = u.enterObject()), w) {
      if (p.explicit !== null) {
        const C = this._decodeTag(u, p.explicit);
        if (u.isError(C))
          return C;
        u = C;
      }
      const I = u.offset;
      if (p.use === null && p.choice === null) {
        let C;
        p.any && (C = u.save());
        const N = this._decodeTag(
          u,
          p.implicit !== null ? p.implicit : p.tag,
          p.any
        );
        if (u.isError(N))
          return N;
        p.any ? g = u.raw(C) : u = N;
      }
      if (v && v.track && p.tag !== null && v.track(u.path(), I, u.length, "tagged"), v && v.track && p.tag !== null && v.track(u.path(), u.offset, u.length, "content"), p.any || (p.choice === null ? g = this._decodeGeneric(p.tag, u, v) : g = this._decodeChoice(u, v)), u.isError(g))
        return g;
      if (!p.any && p.choice === null && p.children !== null && p.children.forEach(function(N) {
        N._decode(u, v);
      }), p.contains && (p.tag === "octstr" || p.tag === "bitstr")) {
        const C = new n(g);
        g = this._getUse(p.contains, u._reporterState.obj)._decode(C, v);
      }
    }
    return p.obj && w && (g = u.leaveObject(T)), p.key !== null && (g !== null || w === !0) ? u.leaveKey(S, p.key, g) : S !== null && u.exitKey(S), g;
  }, s.prototype._decodeGeneric = function(u, v, p) {
    const g = this._baseState;
    return u === "seq" || u === "set" ? null : u === "seqof" || u === "setof" ? this._decodeList(v, u, g.args[0], p) : /str$/.test(u) ? this._decodeStr(v, u, p) : u === "objid" && g.args ? this._decodeObjid(v, g.args[0], g.args[1], p) : u === "objid" ? this._decodeObjid(v, null, null, p) : u === "gentime" || u === "utctime" ? this._decodeTime(v, u, p) : u === "null_" ? this._decodeNull(v, p) : u === "bool" ? this._decodeBool(v, p) : u === "objDesc" ? this._decodeStr(v, u, p) : u === "int" || u === "enum" ? this._decodeInt(v, g.args && g.args[0], p) : g.use !== null ? this._getUse(g.use, v._reporterState.obj)._decode(v, p) : v.error("unknown tag: " + u);
  }, s.prototype._getUse = function(u, v) {
    const p = this._baseState;
    return p.useDecoder = this._use(u, v), i(p.useDecoder._baseState.parent === null), p.useDecoder = p.useDecoder._baseState.children[0], p.implicit !== p.useDecoder._baseState.implicit && (p.useDecoder = p.useDecoder.clone(), p.useDecoder._baseState.implicit = p.implicit), p.useDecoder;
  }, s.prototype._decodeChoice = function(u, v) {
    const p = this._baseState;
    let g = null, w = !1;
    return Object.keys(p.choice).some(function(S) {
      const T = u.save(), I = p.choice[S];
      try {
        const C = I._decode(u, v);
        if (u.isError(C))
          return !1;
        g = { type: S, value: C }, w = !0;
      } catch {
        return u.restore(T), !1;
      }
      return !0;
    }, this), w ? g : u.error("Choice not matched");
  }, s.prototype._createEncoderBuffer = function(u) {
    return new t(u, this.reporter);
  }, s.prototype._encode = function(u, v, p) {
    const g = this._baseState;
    if (g.default !== null && g.default === u)
      return;
    const w = this._encodeValue(u, v, p);
    if (w !== void 0 && !this._skipDefault(w, v, p))
      return w;
  }, s.prototype._encodeValue = function(u, v, p) {
    const g = this._baseState;
    if (g.parent === null)
      return g.children[0]._encode(u, v || new e());
    let w = null;
    if (this.reporter = v, g.optional && u === void 0)
      if (g.default !== null)
        u = g.default;
      else
        return;
    let S = null, T = !1;
    if (g.any)
      w = this._createEncoderBuffer(u);
    else if (g.choice)
      w = this._encodeChoice(u, v);
    else if (g.contains)
      S = this._getUse(g.contains, p)._encode(u, v), T = !0;
    else if (g.children)
      S = g.children.map(function(I) {
        if (I._baseState.tag === "null_")
          return I._encode(null, v, u);
        if (I._baseState.key === null)
          return v.error("Child should have a key");
        const C = v.enterKey(I._baseState.key);
        if (typeof u != "object")
          return v.error("Child expected, but input is not object");
        const N = I._encode(u[I._baseState.key], v, u);
        return v.leaveKey(C), N;
      }, this).filter(function(I) {
        return I;
      }), S = this._createEncoderBuffer(S);
    else if (g.tag === "seqof" || g.tag === "setof") {
      if (!(g.args && g.args.length === 1))
        return v.error("Too many args for : " + g.tag);
      if (!Array.isArray(u))
        return v.error("seqof/setof, but data is not Array");
      const I = this.clone();
      I._baseState.implicit = null, S = this._createEncoderBuffer(u.map(function(C) {
        const N = this._baseState;
        return this._getUse(N.args[0], u)._encode(C, v);
      }, I));
    } else
      g.use !== null ? w = this._getUse(g.use, p)._encode(u, v) : (S = this._encodePrimitive(g.tag, u), T = !0);
    if (!g.any && g.choice === null) {
      const I = g.implicit !== null ? g.implicit : g.tag, C = g.implicit === null ? "universal" : "context";
      I === null ? g.use === null && v.error("Tag could be omitted only for .use()") : g.use === null && (w = this._encodeComposite(I, T, C, S));
    }
    return g.explicit !== null && (w = this._encodeComposite(g.explicit, !1, "context", w)), w;
  }, s.prototype._encodeChoice = function(u, v) {
    const p = this._baseState, g = p.choice[u.type];
    return g || i(
      !1,
      u.type + " not found in " + JSON.stringify(Object.keys(p.choice))
    ), g._encode(u.value, v);
  }, s.prototype._encodePrimitive = function(u, v) {
    const p = this._baseState;
    if (/str$/.test(u))
      return this._encodeStr(v, u);
    if (u === "objid" && p.args)
      return this._encodeObjid(v, p.reverseArgs[0], p.args[1]);
    if (u === "objid")
      return this._encodeObjid(v, null, null);
    if (u === "gentime" || u === "utctime")
      return this._encodeTime(v, u);
    if (u === "null_")
      return this._encodeNull();
    if (u === "int" || u === "enum")
      return this._encodeInt(v, p.args && p.reverseArgs[0]);
    if (u === "bool")
      return this._encodeBool(v);
    if (u === "objDesc")
      return this._encodeStr(v, u);
    throw new Error("Unsupported tag: " + u);
  }, s.prototype._isNumstr = function(u) {
    return /^[0-9 ]*$/.test(u);
  }, s.prototype._isPrintstr = function(u) {
    return /^[A-Za-z0-9 '()+,-./:=?]*$/.test(u);
  }, hu;
}
var lu = {}, xd;
function Uc() {
  return xd || (xd = 1, function(e) {
    function t(n) {
      const i = {};
      return Object.keys(n).forEach(function(f) {
        (f | 0) == f && (f = f | 0);
        const r = n[f];
        i[r] = f;
      }), i;
    }
    e.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, e.tagClassByName = t(e.tagClass), e.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    }, e.tagByName = t(e.tag);
  }(lu)), lu;
}
var du, Ed;
function Qp() {
  if (Ed)
    return du;
  Ed = 1;
  const e = bt(), t = jc().Buffer, n = qc(), i = Uc();
  function f(c) {
    this.enc = "der", this.name = c.name, this.entity = c, this.tree = new r(), this.tree._init(c.body);
  }
  du = f, f.prototype.encode = function(l, u) {
    return this.tree._encode(l, u).join();
  };
  function r(c) {
    n.call(this, "der", c);
  }
  e(r, n), r.prototype._encodeComposite = function(l, u, v, p) {
    const g = s(l, u, v, this.reporter);
    if (p.length < 128) {
      const T = t.alloc(2);
      return T[0] = g, T[1] = p.length, this._createEncoderBuffer([T, p]);
    }
    let w = 1;
    for (let T = p.length; T >= 256; T >>= 8)
      w++;
    const S = t.alloc(1 + 1 + w);
    S[0] = g, S[1] = 128 | w;
    for (let T = 1 + w, I = p.length; I > 0; T--, I >>= 8)
      S[T] = I & 255;
    return this._createEncoderBuffer([S, p]);
  }, r.prototype._encodeStr = function(l, u) {
    if (u === "bitstr")
      return this._createEncoderBuffer([l.unused | 0, l.data]);
    if (u === "bmpstr") {
      const v = t.alloc(l.length * 2);
      for (let p = 0; p < l.length; p++)
        v.writeUInt16BE(l.charCodeAt(p), p * 2);
      return this._createEncoderBuffer(v);
    } else
      return u === "numstr" ? this._isNumstr(l) ? this._createEncoderBuffer(l) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : u === "printstr" ? this._isPrintstr(l) ? this._createEncoderBuffer(l) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(u) ? this._createEncoderBuffer(l) : u === "objDesc" ? this._createEncoderBuffer(l) : this.reporter.error("Encoding of string type: " + u + " unsupported");
  }, r.prototype._encodeObjid = function(l, u, v) {
    if (typeof l == "string") {
      if (!u)
        return this.reporter.error("string objid given, but no values map found");
      if (!u.hasOwnProperty(l))
        return this.reporter.error("objid not found in values map");
      l = u[l].split(/[\s.]+/g);
      for (let S = 0; S < l.length; S++)
        l[S] |= 0;
    } else if (Array.isArray(l)) {
      l = l.slice();
      for (let S = 0; S < l.length; S++)
        l[S] |= 0;
    }
    if (!Array.isArray(l))
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(l));
    if (!v) {
      if (l[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      l.splice(0, 2, l[0] * 40 + l[1]);
    }
    let p = 0;
    for (let S = 0; S < l.length; S++) {
      let T = l[S];
      for (p++; T >= 128; T >>= 7)
        p++;
    }
    const g = t.alloc(p);
    let w = g.length - 1;
    for (let S = l.length - 1; S >= 0; S--) {
      let T = l[S];
      for (g[w--] = T & 127; (T >>= 7) > 0; )
        g[w--] = 128 | T & 127;
    }
    return this._createEncoderBuffer(g);
  };
  function o(c) {
    return c < 10 ? "0" + c : c;
  }
  r.prototype._encodeTime = function(l, u) {
    let v;
    const p = new Date(l);
    return u === "gentime" ? v = [
      o(p.getUTCFullYear()),
      o(p.getUTCMonth() + 1),
      o(p.getUTCDate()),
      o(p.getUTCHours()),
      o(p.getUTCMinutes()),
      o(p.getUTCSeconds()),
      "Z"
    ].join("") : u === "utctime" ? v = [
      o(p.getUTCFullYear() % 100),
      o(p.getUTCMonth() + 1),
      o(p.getUTCDate()),
      o(p.getUTCHours()),
      o(p.getUTCMinutes()),
      o(p.getUTCSeconds()),
      "Z"
    ].join("") : this.reporter.error("Encoding " + u + " time is not supported yet"), this._encodeStr(v, "octstr");
  }, r.prototype._encodeNull = function() {
    return this._createEncoderBuffer("");
  }, r.prototype._encodeInt = function(l, u) {
    if (typeof l == "string") {
      if (!u)
        return this.reporter.error("String int or enum given, but no values map");
      if (!u.hasOwnProperty(l))
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify(l));
      l = u[l];
    }
    if (typeof l != "number" && !t.isBuffer(l)) {
      const g = l.toArray();
      !l.sign && g[0] & 128 && g.unshift(0), l = t.from(g);
    }
    if (t.isBuffer(l)) {
      let g = l.length;
      l.length === 0 && g++;
      const w = t.alloc(g);
      return l.copy(w), l.length === 0 && (w[0] = 0), this._createEncoderBuffer(w);
    }
    if (l < 128)
      return this._createEncoderBuffer(l);
    if (l < 256)
      return this._createEncoderBuffer([0, l]);
    let v = 1;
    for (let g = l; g >= 256; g >>= 8)
      v++;
    const p = new Array(v);
    for (let g = p.length - 1; g >= 0; g--)
      p[g] = l & 255, l >>= 8;
    return p[0] & 128 && p.unshift(0), this._createEncoderBuffer(t.from(p));
  }, r.prototype._encodeBool = function(l) {
    return this._createEncoderBuffer(l ? 255 : 0);
  }, r.prototype._use = function(l, u) {
    return typeof l == "function" && (l = l(u)), l._getEncoder("der").tree;
  }, r.prototype._skipDefault = function(l, u, v) {
    const p = this._baseState;
    let g;
    if (p.default === null)
      return !1;
    const w = l.join();
    if (p.defaultBuffer === void 0 && (p.defaultBuffer = this._encodeValue(p.default, u, v).join()), w.length !== p.defaultBuffer.length)
      return !1;
    for (g = 0; g < w.length; g++)
      if (w[g] !== p.defaultBuffer[g])
        return !1;
    return !0;
  };
  function s(c, l, u, v) {
    let p;
    if (c === "seqof" ? c = "seq" : c === "setof" && (c = "set"), i.tagByName.hasOwnProperty(c))
      p = i.tagByName[c];
    else if (typeof c == "number" && (c | 0) === c)
      p = c;
    else
      return v.error("Unknown tag: " + c);
    return p >= 31 ? v.error("Multi-octet tag encoding unsupported") : (l || (p |= 32), p |= i.tagClassByName[u || "universal"] << 6, p);
  }
  return du;
}
var pu, Sd;
function e8() {
  if (Sd)
    return pu;
  Sd = 1;
  const e = bt(), t = Qp();
  function n(i) {
    t.call(this, i), this.enc = "pem";
  }
  return e(n, t), pu = n, n.prototype.encode = function(f, r) {
    const s = t.prototype.encode.call(this, f).toString("base64"), c = ["-----BEGIN " + r.label + "-----"];
    for (let l = 0; l < s.length; l += 64)
      c.push(s.slice(l, l + 64));
    return c.push("-----END " + r.label + "-----"), c.join(`
`);
  }, pu;
}
var Md;
function ev() {
  return Md || (Md = 1, function(e) {
    const t = e;
    t.der = Qp(), t.pem = e8();
  }(su)), su;
}
var vu = {}, bu, Ad;
function tv() {
  if (Ad)
    return bu;
  Ad = 1;
  const e = bt(), t = Ht, n = Ai().DecoderBuffer, i = qc(), f = Uc();
  function r(l) {
    this.enc = "der", this.name = l.name, this.entity = l, this.tree = new o(), this.tree._init(l.body);
  }
  bu = r, r.prototype.decode = function(u, v) {
    return n.isDecoderBuffer(u) || (u = new n(u, v)), this.tree._decode(u, v);
  };
  function o(l) {
    i.call(this, "der", l);
  }
  e(o, i), o.prototype._peekTag = function(u, v, p) {
    if (u.isEmpty())
      return !1;
    const g = u.save(), w = s(u, 'Failed to peek tag: "' + v + '"');
    return u.isError(w) ? w : (u.restore(g), w.tag === v || w.tagStr === v || w.tagStr + "of" === v || p);
  }, o.prototype._decodeTag = function(u, v, p) {
    const g = s(
      u,
      'Failed to decode tag of "' + v + '"'
    );
    if (u.isError(g))
      return g;
    let w = c(
      u,
      g.primitive,
      'Failed to get length of "' + v + '"'
    );
    if (u.isError(w))
      return w;
    if (!p && g.tag !== v && g.tagStr !== v && g.tagStr + "of" !== v)
      return u.error('Failed to match tag: "' + v + '"');
    if (g.primitive || w !== null)
      return u.skip(w, 'Failed to match body of: "' + v + '"');
    const S = u.save(), T = this._skipUntilEnd(
      u,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    return u.isError(T) ? T : (w = u.offset - S.offset, u.restore(S), u.skip(w, 'Failed to match body of: "' + v + '"'));
  }, o.prototype._skipUntilEnd = function(u, v) {
    for (; ; ) {
      const p = s(u, v);
      if (u.isError(p))
        return p;
      const g = c(u, p.primitive, v);
      if (u.isError(g))
        return g;
      let w;
      if (p.primitive || g !== null ? w = u.skip(g) : w = this._skipUntilEnd(u, v), u.isError(w))
        return w;
      if (p.tagStr === "end")
        break;
    }
  }, o.prototype._decodeList = function(u, v, p, g) {
    const w = [];
    for (; !u.isEmpty(); ) {
      const S = this._peekTag(u, "end");
      if (u.isError(S))
        return S;
      const T = p.decode(u, "der", g);
      if (u.isError(T) && S)
        break;
      w.push(T);
    }
    return w;
  }, o.prototype._decodeStr = function(u, v) {
    if (v === "bitstr") {
      const p = u.readUInt8();
      return u.isError(p) ? p : { unused: p, data: u.raw() };
    } else if (v === "bmpstr") {
      const p = u.raw();
      if (p.length % 2 === 1)
        return u.error("Decoding of string type: bmpstr length mismatch");
      let g = "";
      for (let w = 0; w < p.length / 2; w++)
        g += String.fromCharCode(p.readUInt16BE(w * 2));
      return g;
    } else if (v === "numstr") {
      const p = u.raw().toString("ascii");
      return this._isNumstr(p) ? p : u.error("Decoding of string type: numstr unsupported characters");
    } else {
      if (v === "octstr")
        return u.raw();
      if (v === "objDesc")
        return u.raw();
      if (v === "printstr") {
        const p = u.raw().toString("ascii");
        return this._isPrintstr(p) ? p : u.error("Decoding of string type: printstr unsupported characters");
      } else
        return /str$/.test(v) ? u.raw().toString() : u.error("Decoding of string type: " + v + " unsupported");
    }
  }, o.prototype._decodeObjid = function(u, v, p) {
    let g;
    const w = [];
    let S = 0, T = 0;
    for (; !u.isEmpty(); )
      T = u.readUInt8(), S <<= 7, S |= T & 127, T & 128 || (w.push(S), S = 0);
    T & 128 && w.push(S);
    const I = w[0] / 40 | 0, C = w[0] % 40;
    if (p ? g = w : g = [I, C].concat(w.slice(1)), v) {
      let N = v[g.join(" ")];
      N === void 0 && (N = v[g.join(".")]), N !== void 0 && (g = N);
    }
    return g;
  }, o.prototype._decodeTime = function(u, v) {
    const p = u.raw().toString();
    let g, w, S, T, I, C;
    if (v === "gentime")
      g = p.slice(0, 4) | 0, w = p.slice(4, 6) | 0, S = p.slice(6, 8) | 0, T = p.slice(8, 10) | 0, I = p.slice(10, 12) | 0, C = p.slice(12, 14) | 0;
    else if (v === "utctime")
      g = p.slice(0, 2) | 0, w = p.slice(2, 4) | 0, S = p.slice(4, 6) | 0, T = p.slice(6, 8) | 0, I = p.slice(8, 10) | 0, C = p.slice(10, 12) | 0, g < 70 ? g = 2e3 + g : g = 1900 + g;
    else
      return u.error("Decoding " + v + " time is not supported yet");
    return Date.UTC(g, w - 1, S, T, I, C, 0);
  }, o.prototype._decodeNull = function() {
    return null;
  }, o.prototype._decodeBool = function(u) {
    const v = u.readUInt8();
    return u.isError(v) ? v : v !== 0;
  }, o.prototype._decodeInt = function(u, v) {
    const p = u.raw();
    let g = new t(p);
    return v && (g = v[g.toString(10)] || g), g;
  }, o.prototype._use = function(u, v) {
    return typeof u == "function" && (u = u(v)), u._getDecoder("der").tree;
  };
  function s(l, u) {
    let v = l.readUInt8(u);
    if (l.isError(v))
      return v;
    const p = f.tagClass[v >> 6], g = (v & 32) === 0;
    if ((v & 31) === 31) {
      let S = v;
      for (v = 0; (S & 128) === 128; ) {
        if (S = l.readUInt8(u), l.isError(S))
          return S;
        v <<= 7, v |= S & 127;
      }
    } else
      v &= 31;
    const w = f.tag[v];
    return {
      cls: p,
      primitive: g,
      tag: v,
      tagStr: w
    };
  }
  function c(l, u, v) {
    let p = l.readUInt8(v);
    if (l.isError(p))
      return p;
    if (!u && p === 128)
      return null;
    if (!(p & 128))
      return p;
    const g = p & 127;
    if (g > 4)
      return l.error("length octect is too long");
    p = 0;
    for (let w = 0; w < g; w++) {
      p <<= 8;
      const S = l.readUInt8(v);
      if (l.isError(S))
        return S;
      p |= S;
    }
    return p;
  }
  return bu;
}
var yu, Bd;
function t8() {
  if (Bd)
    return yu;
  Bd = 1;
  const e = bt(), t = jc().Buffer, n = tv();
  function i(f) {
    n.call(this, f), this.enc = "pem";
  }
  return e(i, n), yu = i, i.prototype.decode = function(r, o) {
    const s = r.toString().split(/[\r\n]+/g), c = o.label.toUpperCase(), l = /^-----(BEGIN|END) ([^-]+)-----$/;
    let u = -1, v = -1;
    for (let w = 0; w < s.length; w++) {
      const S = s[w].match(l);
      if (S !== null && S[2] === c)
        if (u === -1) {
          if (S[1] !== "BEGIN")
            break;
          u = w;
        } else {
          if (S[1] !== "END")
            break;
          v = w;
          break;
        }
    }
    if (u === -1 || v === -1)
      throw new Error("PEM section not found for: " + c);
    const p = s.slice(u + 1, v).join("");
    p.replace(/[^a-z0-9+/=]+/gi, "");
    const g = t.from(p, "base64");
    return n.prototype.decode.call(this, g, o);
  }, yu;
}
var Rd;
function rv() {
  return Rd || (Rd = 1, function(e) {
    const t = e;
    t.der = tv(), t.pem = t8();
  }(vu)), vu;
}
var Id;
function r8() {
  return Id || (Id = 1, function(e) {
    const t = ev(), n = rv(), i = bt(), f = e;
    f.define = function(s, c) {
      return new r(s, c);
    };
    function r(o, s) {
      this.name = o, this.body = s, this.decoders = {}, this.encoders = {};
    }
    r.prototype._createNamed = function(s) {
      const c = this.name;
      function l(u) {
        this._initNamed(u, c);
      }
      return i(l, s), l.prototype._initNamed = function(v, p) {
        s.call(this, v, p);
      }, new l(this);
    }, r.prototype._getDecoder = function(s) {
      return s = s || "der", this.decoders.hasOwnProperty(s) || (this.decoders[s] = this._createNamed(n[s])), this.decoders[s];
    }, r.prototype.decode = function(s, c, l) {
      return this._getDecoder(c).decode(s, l);
    }, r.prototype._getEncoder = function(s) {
      return s = s || "der", this.encoders.hasOwnProperty(s) || (this.encoders[s] = this._createNamed(t[s])), this.encoders[s];
    }, r.prototype.encode = function(s, c, l) {
      return this._getEncoder(c).encode(s, l);
    };
  }(ou)), ou;
}
var gu = {}, Td;
function n8() {
  return Td || (Td = 1, function(e) {
    const t = e;
    t.Reporter = Dc().Reporter, t.DecoderBuffer = Ai().DecoderBuffer, t.EncoderBuffer = Ai().EncoderBuffer, t.Node = qc();
  }(gu)), gu;
}
var mu = {}, Pd;
function i8() {
  return Pd || (Pd = 1, function(e) {
    const t = e;
    t._reverse = function(i) {
      const f = {};
      return Object.keys(i).forEach(function(r) {
        (r | 0) == r && (r = r | 0);
        const o = i[r];
        f[o] = r;
      }), f;
    }, t.der = Uc();
  }(mu)), mu;
}
var Cd;
function nv() {
  return Cd || (Cd = 1, function(e) {
    const t = e;
    t.bignum = Ht, t.define = r8().define, t.base = n8(), t.constants = i8(), t.decoders = rv(), t.encoders = ev();
  }(fu)), fu;
}
var wu, Od;
function a8() {
  if (Od)
    return wu;
  Od = 1;
  var e = nv(), t = e.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  }), n = e.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  }), i = e.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  }), f = e.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(i),
      this.key("subjectPublicKey").bitstr()
    );
  }), r = e.define("RelativeDistinguishedName", function() {
    this.setof(n);
  }), o = e.define("RDNSequence", function() {
    this.seqof(r);
  }), s = e.define("Name", function() {
    this.choice({
      rdnSequence: this.use(o)
    });
  }), c = e.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(t),
      this.key("notAfter").use(t)
    );
  }), l = e.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(!1),
      this.key("extnValue").octstr()
    );
  }), u = e.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(i),
      this.key("issuer").use(s),
      this.key("validity").use(c),
      this.key("subject").use(s),
      this.key("subjectPublicKeyInfo").use(f),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof(l).optional()
    );
  }), v = e.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(u),
      this.key("signatureAlgorithm").use(i),
      this.key("signatureValue").bitstr()
    );
  });
  return wu = v, wu;
}
var Nd;
function f8() {
  if (Nd)
    return yr;
  Nd = 1;
  var e = nv();
  yr.certificate = a8();
  var t = e.define("RSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("modulus").int(),
      this.key("publicExponent").int(),
      this.key("privateExponent").int(),
      this.key("prime1").int(),
      this.key("prime2").int(),
      this.key("exponent1").int(),
      this.key("exponent2").int(),
      this.key("coefficient").int()
    );
  });
  yr.RSAPrivateKey = t;
  var n = e.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  yr.RSAPublicKey = n;
  var i = e.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(f),
      this.key("subjectPublicKey").bitstr()
    );
  });
  yr.PublicKey = i;
  var f = e.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("none").null_().optional(),
      this.key("curve").objid().optional(),
      this.key("params").seq().obj(
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int()
      ).optional()
    );
  }), r = e.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(f),
      this.key("subjectPrivateKey").octstr()
    );
  });
  yr.PrivateKey = r;
  var o = e.define("EncryptedPrivateKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").seq().obj(
        this.key("id").objid(),
        this.key("decrypt").seq().obj(
          this.key("kde").seq().obj(
            this.key("id").objid(),
            this.key("kdeparams").seq().obj(
              this.key("salt").octstr(),
              this.key("iters").int()
            )
          ),
          this.key("cipher").seq().obj(
            this.key("algo").objid(),
            this.key("iv").octstr()
          )
        )
      ),
      this.key("subjectPrivateKey").octstr()
    );
  });
  yr.EncryptedPrivateKey = o;
  var s = e.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  yr.DSAPrivateKey = s, yr.DSAparam = e.define("DSAparam", function() {
    this.int();
  });
  var c = e.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(l),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  yr.ECPrivateKey = c;
  var l = e.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  });
  return yr.signature = e.define("signature", function() {
    this.seq().obj(
      this.key("r").int(),
      this.key("s").int()
    );
  }), yr;
}
const o8 = {
  "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
  "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
  "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
  "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
  "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
  "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
  "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
  "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
  "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
  "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
  "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
  "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
var _u, Ld;
function s8() {
  if (Ld)
    return _u;
  Ld = 1;
  var e = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, t = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, n = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, i = Bf(), f = Cc(), r = gt().Buffer;
  return _u = function(o, s) {
    var c = o.toString(), l = c.match(e), u;
    if (l) {
      var p = "aes" + l[1], g = r.from(l[2], "hex"), w = r.from(l[3].replace(/[\r\n]/g, ""), "base64"), S = i(s, g.slice(0, 8), parseInt(l[1], 10)).key, T = [], I = f.createDecipheriv(p, S, g);
      T.push(I.update(w)), T.push(I.final()), u = r.concat(T);
    } else {
      var v = c.match(n);
      u = r.from(v[2].replace(/[\r\n]/g, ""), "base64");
    }
    var C = c.match(t)[1];
    return {
      tag: C,
      data: u
    };
  }, _u;
}
var xu, $d;
function If() {
  if ($d)
    return xu;
  $d = 1;
  var e = f8(), t = o8, n = s8(), i = Cc(), f = jp(), r = gt().Buffer;
  xu = o;
  function o(c) {
    var l;
    typeof c == "object" && !r.isBuffer(c) && (l = c.passphrase, c = c.key), typeof c == "string" && (c = r.from(c));
    var u = n(c, l), v = u.tag, p = u.data, g, w;
    switch (v) {
      case "CERTIFICATE":
        w = e.certificate.decode(p, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        switch (w || (w = e.PublicKey.decode(p, "der")), g = w.algorithm.algorithm.join("."), g) {
          case "1.2.840.113549.1.1.1":
            return e.RSAPublicKey.decode(w.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            return w.subjectPrivateKey = w.subjectPublicKey, {
              type: "ec",
              data: w
            };
          case "1.2.840.10040.4.1":
            return w.algorithm.params.pub_key = e.DSAparam.decode(w.subjectPublicKey.data, "der"), {
              type: "dsa",
              data: w.algorithm.params
            };
          default:
            throw new Error("unknown key id " + g);
        }
      case "ENCRYPTED PRIVATE KEY":
        p = e.EncryptedPrivateKey.decode(p, "der"), p = s(p, l);
      case "PRIVATE KEY":
        switch (w = e.PrivateKey.decode(p, "der"), g = w.algorithm.algorithm.join("."), g) {
          case "1.2.840.113549.1.1.1":
            return e.RSAPrivateKey.decode(w.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: w.algorithm.curve,
              privateKey: e.ECPrivateKey.decode(w.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            return w.algorithm.params.priv_key = e.DSAparam.decode(w.subjectPrivateKey, "der"), {
              type: "dsa",
              params: w.algorithm.params
            };
          default:
            throw new Error("unknown key id " + g);
        }
      case "RSA PUBLIC KEY":
        return e.RSAPublicKey.decode(p, "der");
      case "RSA PRIVATE KEY":
        return e.RSAPrivateKey.decode(p, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: e.DSAPrivateKey.decode(p, "der")
        };
      case "EC PRIVATE KEY":
        return p = e.ECPrivateKey.decode(p, "der"), {
          curve: p.parameters.value,
          privateKey: p.privateKey
        };
      default:
        throw new Error("unknown key type " + v);
    }
  }
  o.signature = e.signature;
  function s(c, l) {
    var u = c.algorithm.decrypt.kde.kdeparams.salt, v = parseInt(c.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), p = t[c.algorithm.decrypt.cipher.algo.join(".")], g = c.algorithm.decrypt.cipher.iv, w = c.subjectPrivateKey, S = parseInt(p.split("-")[1], 10) / 8, T = f.pbkdf2Sync(l, u, v, S, "sha1"), I = i.createDecipheriv(p, T, g), C = [];
    return C.push(I.update(w)), C.push(I.final()), r.concat(C);
  }
  return xu;
}
const iv = {
  "1.3.132.0.10": "secp256k1",
  "1.3.132.0.33": "p224",
  "1.2.840.10045.3.1.1": "p192",
  "1.2.840.10045.3.1.7": "p256",
  "1.3.132.0.34": "p384",
  "1.3.132.0.35": "p521"
};
var kd;
function u8() {
  if (kd)
    return Dn;
  kd = 1;
  var e = gt().Buffer, t = Cp(), n = Nc(), i = kc().ec, f = Yp(), r = If(), o = iv;
  function s(T, I, C, N, $) {
    var D = r(I);
    if (D.curve) {
      if (N !== "ecdsa" && N !== "ecdsa/rsa")
        throw new Error("wrong private key type");
      return c(T, D);
    } else if (D.type === "dsa") {
      if (N !== "dsa")
        throw new Error("wrong private key type");
      return l(T, D, C);
    } else if (N !== "rsa" && N !== "ecdsa/rsa")
      throw new Error("wrong private key type");
    T = e.concat([$, T]);
    for (var H = D.modulus.byteLength(), V = [0, 1]; T.length + V.length + 1 < H; )
      V.push(255);
    V.push(0);
    for (var ne = -1; ++ne < T.length; )
      V.push(T[ne]);
    var Q = n(V, D);
    return Q;
  }
  function c(T, I) {
    var C = o[I.curve.join(".")];
    if (!C)
      throw new Error("unknown curve " + I.curve.join("."));
    var N = new i(C), $ = N.keyFromPrivate(I.privateKey), D = $.sign(T);
    return e.from(D.toDER());
  }
  function l(T, I, C) {
    for (var N = I.params.priv_key, $ = I.params.p, D = I.params.q, H = I.params.g, V = new f(0), ne, Q = p(T, D).mod(D), se = !1, k = v(N, D, T, C); se === !1; )
      ne = w(D, k, C), V = S(H, ne, $, D), se = ne.invm(D).imul(Q.add(N.mul(V))).mod(D), se.cmpn(0) === 0 && (se = !1, V = new f(0));
    return u(V, se);
  }
  function u(T, I) {
    T = T.toArray(), I = I.toArray(), T[0] & 128 && (T = [0].concat(T)), I[0] & 128 && (I = [0].concat(I));
    var C = T.length + I.length + 4, N = [48, C, 2, T.length];
    return N = N.concat(T, [2, I.length], I), e.from(N);
  }
  function v(T, I, C, N) {
    if (T = e.from(T.toArray()), T.length < I.byteLength()) {
      var $ = e.alloc(I.byteLength() - T.length);
      T = e.concat([$, T]);
    }
    var D = C.length, H = g(C, I), V = e.alloc(D);
    V.fill(1);
    var ne = e.alloc(D);
    return ne = t(N, ne).update(V).update(e.from([0])).update(T).update(H).digest(), V = t(N, ne).update(V).digest(), ne = t(N, ne).update(V).update(e.from([1])).update(T).update(H).digest(), V = t(N, ne).update(V).digest(), { k: ne, v: V };
  }
  function p(T, I) {
    var C = new f(T), N = (T.length << 3) - I.bitLength();
    return N > 0 && C.ishrn(N), C;
  }
  function g(T, I) {
    T = p(T, I), T = T.mod(I);
    var C = e.from(T.toArray());
    if (C.length < I.byteLength()) {
      var N = e.alloc(I.byteLength() - C.length);
      C = e.concat([N, C]);
    }
    return C;
  }
  function w(T, I, C) {
    var N, $;
    do {
      for (N = e.alloc(0); N.length * 8 < T.bitLength(); )
        I.v = t(C, I.k).update(I.v).digest(), N = e.concat([N, I.v]);
      $ = p(N, T), I.k = t(C, I.k).update(I.v).update(e.from([0])).digest(), I.v = t(C, I.k).update(I.v).digest();
    } while ($.cmp(T) !== -1);
    return $;
  }
  function S(T, I, C, N) {
    return T.toRed(f.mont(C)).redPow(I).fromRed().mod(N);
  }
  return gw.exports = s, Dn.getKey = v, Dn.makeKey = w, Dn;
}
var Eu, jd;
function c8() {
  if (jd)
    return Eu;
  jd = 1;
  var e = gt().Buffer, t = Yp(), n = kc().ec, i = If(), f = iv;
  function r(l, u, v, p, g) {
    var w = i(v);
    if (w.type === "ec") {
      if (p !== "ecdsa" && p !== "ecdsa/rsa")
        throw new Error("wrong public key type");
      return o(l, u, w);
    } else if (w.type === "dsa") {
      if (p !== "dsa")
        throw new Error("wrong public key type");
      return s(l, u, w);
    } else if (p !== "rsa" && p !== "ecdsa/rsa")
      throw new Error("wrong public key type");
    u = e.concat([g, u]);
    for (var S = w.modulus.byteLength(), T = [1], I = 0; u.length + T.length + 2 < S; )
      T.push(255), I++;
    T.push(0);
    for (var C = -1; ++C < u.length; )
      T.push(u[C]);
    T = e.from(T);
    var N = t.mont(w.modulus);
    l = new t(l).toRed(N), l = l.redPow(new t(w.publicExponent)), l = e.from(l.fromRed().toArray());
    var $ = I < 8 ? 1 : 0;
    for (S = Math.min(l.length, T.length), l.length !== T.length && ($ = 1), C = -1; ++C < S; )
      $ |= l[C] ^ T[C];
    return $ === 0;
  }
  function o(l, u, v) {
    var p = f[v.data.algorithm.curve.join(".")];
    if (!p)
      throw new Error("unknown curve " + v.data.algorithm.curve.join("."));
    var g = new n(p), w = v.data.subjectPrivateKey.data;
    return g.verify(u, l, w);
  }
  function s(l, u, v) {
    var p = v.data.p, g = v.data.q, w = v.data.g, S = v.data.pub_key, T = i.signature.decode(l, "der"), I = T.s, C = T.r;
    c(I, g), c(C, g);
    var N = t.mont(p), $ = I.invm(g), D = w.toRed(N).redPow(new t(u).mul($).mod(g)).fromRed().mul(S.toRed(N).redPow(C.mul($).mod(g)).fromRed()).mod(p).mod(g);
    return D.cmp(C) === 0;
  }
  function c(l, u) {
    if (l.cmpn(0) <= 0)
      throw new Error("invalid sig");
    if (l.cmp(u) >= u)
      throw new Error("invalid sig");
  }
  return Eu = r, Eu;
}
var Su, Dd;
function h8() {
  if (Dd)
    return Su;
  Dd = 1;
  var e = gt().Buffer, t = Hi(), n = Bp(), i = bt(), f = u8(), r = c8(), o = Op;
  Object.keys(o).forEach(function(v) {
    o[v].id = e.from(o[v].id, "hex"), o[v.toLowerCase()] = o[v];
  });
  function s(v) {
    n.Writable.call(this);
    var p = o[v];
    if (!p)
      throw new Error("Unknown message digest");
    this._hashType = p.hash, this._hash = t(p.hash), this._tag = p.id, this._signType = p.sign;
  }
  i(s, n.Writable), s.prototype._write = function(p, g, w) {
    this._hash.update(p), w();
  }, s.prototype.update = function(p, g) {
    return typeof p == "string" && (p = e.from(p, g)), this._hash.update(p), this;
  }, s.prototype.sign = function(p, g) {
    this.end();
    var w = this._hash.digest(), S = f(w, p, this._hashType, this._signType, this._tag);
    return g ? S.toString(g) : S;
  };
  function c(v) {
    n.Writable.call(this);
    var p = o[v];
    if (!p)
      throw new Error("Unknown message digest");
    this._hash = t(p.hash), this._tag = p.id, this._signType = p.sign;
  }
  i(c, n.Writable), c.prototype._write = function(p, g, w) {
    this._hash.update(p), w();
  }, c.prototype.update = function(p, g) {
    return typeof p == "string" && (p = e.from(p, g)), this._hash.update(p), this;
  }, c.prototype.verify = function(p, g, w) {
    typeof g == "string" && (g = e.from(g, w)), this.end();
    var S = this._hash.digest();
    return r(g, S, p, this._signType, this._tag);
  };
  function l(v) {
    return new s(v);
  }
  function u(v) {
    return new c(v);
  }
  return Su = {
    Sign: l,
    Verify: u,
    createSign: l,
    createVerify: u
  }, Su;
}
var Mu, qd;
function l8() {
  if (qd)
    return Mu;
  qd = 1;
  var e = kc(), t = Ht;
  Mu = function(o) {
    return new i(o);
  };
  var n = {
    secp256k1: {
      name: "secp256k1",
      byteLength: 32
    },
    secp224r1: {
      name: "p224",
      byteLength: 28
    },
    prime256v1: {
      name: "p256",
      byteLength: 32
    },
    prime192v1: {
      name: "p192",
      byteLength: 24
    },
    ed25519: {
      name: "ed25519",
      byteLength: 32
    },
    secp384r1: {
      name: "p384",
      byteLength: 48
    },
    secp521r1: {
      name: "p521",
      byteLength: 66
    }
  };
  n.p224 = n.secp224r1, n.p256 = n.secp256r1 = n.prime256v1, n.p192 = n.secp192r1 = n.prime192v1, n.p384 = n.secp384r1, n.p521 = n.secp521r1;
  function i(r) {
    this.curveType = n[r], this.curveType || (this.curveType = {
      name: r
    }), this.curve = new e.ec(this.curveType.name), this.keys = void 0;
  }
  i.prototype.generateKeys = function(r, o) {
    return this.keys = this.curve.genKeyPair(), this.getPublicKey(r, o);
  }, i.prototype.computeSecret = function(r, o, s) {
    o = o || "utf8", Buffer.isBuffer(r) || (r = new Buffer(r, o));
    var c = this.curve.keyFromPublic(r).getPublic(), l = c.mul(this.keys.getPrivate()).getX();
    return f(l, s, this.curveType.byteLength);
  }, i.prototype.getPublicKey = function(r, o) {
    var s = this.keys.getPublic(o === "compressed", !0);
    return o === "hybrid" && (s[s.length - 1] % 2 ? s[0] = 7 : s[0] = 6), f(s, r);
  }, i.prototype.getPrivateKey = function(r) {
    return f(this.keys.getPrivate(), r);
  }, i.prototype.setPublicKey = function(r, o) {
    return o = o || "utf8", Buffer.isBuffer(r) || (r = new Buffer(r, o)), this.keys._importPublic(r), this;
  }, i.prototype.setPrivateKey = function(r, o) {
    o = o || "utf8", Buffer.isBuffer(r) || (r = new Buffer(r, o));
    var s = new t(r);
    return s = s.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(s), this;
  };
  function f(r, o, s) {
    Array.isArray(r) || (r = r.toArray());
    var c = new Buffer(r);
    if (s && c.length < s) {
      var l = new Buffer(s - c.length);
      l.fill(0), c = Buffer.concat([l, c]);
    }
    return o ? c.toString(o) : c;
  }
  return Mu;
}
var Au = {}, Bu, Ud;
function av() {
  if (Ud)
    return Bu;
  Ud = 1;
  var e = Hi(), t = gt().Buffer;
  Bu = function(i, f) {
    for (var r = t.alloc(0), o = 0, s; r.length < f; )
      s = n(o++), r = t.concat([r, e("sha1").update(i).update(s).digest()]);
    return r.slice(0, f);
  };
  function n(i) {
    var f = t.allocUnsafe(4);
    return f.writeUInt32BE(i, 0), f;
  }
  return Bu;
}
var Ru, Fd;
function fv() {
  return Fd || (Fd = 1, Ru = function(t, n) {
    for (var i = t.length, f = -1; ++f < i; )
      t[f] ^= n[f];
    return t;
  }), Ru;
}
var Iu, Hd;
function ov() {
  if (Hd)
    return Iu;
  Hd = 1;
  var e = Ht, t = gt().Buffer;
  function n(i, f) {
    return t.from(i.toRed(e.mont(f.modulus)).redPow(new e(f.publicExponent)).fromRed().toArray());
  }
  return Iu = n, Iu;
}
var Tu, zd;
function d8() {
  if (zd)
    return Tu;
  zd = 1;
  var e = If(), t = ai(), n = Hi(), i = av(), f = fv(), r = Ht, o = ov(), s = Nc(), c = gt().Buffer;
  Tu = function(g, w, S) {
    var T;
    g.padding ? T = g.padding : S ? T = 1 : T = 4;
    var I = e(g), C;
    if (T === 4)
      C = l(I, w);
    else if (T === 1)
      C = u(I, w, S);
    else if (T === 3) {
      if (C = new r(w), C.cmp(I.modulus) >= 0)
        throw new Error("data too long for modulus");
    } else
      throw new Error("unknown padding");
    return S ? s(C, I) : o(C, I);
  };
  function l(p, g) {
    var w = p.modulus.byteLength(), S = g.length, T = n("sha1").update(c.alloc(0)).digest(), I = T.length, C = 2 * I;
    if (S > w - C - 2)
      throw new Error("message too long");
    var N = c.alloc(w - S - C - 2), $ = w - I - 1, D = t(I), H = f(c.concat([T, N, c.alloc(1, 1), g], $), i(D, $)), V = f(D, i(H, I));
    return new r(c.concat([c.alloc(1), V, H], w));
  }
  function u(p, g, w) {
    var S = g.length, T = p.modulus.byteLength();
    if (S > T - 11)
      throw new Error("message too long");
    var I;
    return w ? I = c.alloc(T - S - 3, 255) : I = v(T - S - 3), new r(c.concat([c.from([0, w ? 1 : 2]), I, c.alloc(1), g], T));
  }
  function v(p) {
    for (var g = c.allocUnsafe(p), w = 0, S = t(p * 2), T = 0, I; w < p; )
      T === S.length && (S = t(p * 2), T = 0), I = S[T++], I && (g[w++] = I);
    return g;
  }
  return Tu;
}
var Pu, Vd;
function p8() {
  if (Vd)
    return Pu;
  Vd = 1;
  var e = If(), t = av(), n = fv(), i = Ht, f = Nc(), r = Hi(), o = ov(), s = gt().Buffer;
  Pu = function(p, g, w) {
    var S;
    p.padding ? S = p.padding : w ? S = 1 : S = 4;
    var T = e(p), I = T.modulus.byteLength();
    if (g.length > I || new i(g).cmp(T.modulus) >= 0)
      throw new Error("decryption error");
    var C;
    w ? C = o(new i(g), T) : C = f(g, T);
    var N = s.alloc(I - C.length);
    if (C = s.concat([N, C], I), S === 4)
      return c(T, C);
    if (S === 1)
      return l(T, C, w);
    if (S === 3)
      return C;
    throw new Error("unknown padding");
  };
  function c(v, p) {
    var g = v.modulus.byteLength(), w = r("sha1").update(s.alloc(0)).digest(), S = w.length;
    if (p[0] !== 0)
      throw new Error("decryption error");
    var T = p.slice(1, S + 1), I = p.slice(S + 1), C = n(T, t(I, S)), N = n(I, t(C, g - S - 1));
    if (u(w, N.slice(0, S)))
      throw new Error("decryption error");
    for (var $ = S; N[$] === 0; )
      $++;
    if (N[$++] !== 1)
      throw new Error("decryption error");
    return N.slice($);
  }
  function l(v, p, g) {
    for (var w = p.slice(0, 2), S = 2, T = 0; p[S++] !== 0; )
      if (S >= p.length) {
        T++;
        break;
      }
    var I = p.slice(2, S - 1);
    if ((w.toString("hex") !== "0002" && !g || w.toString("hex") !== "0001" && g) && T++, I.length < 8 && T++, T)
      throw new Error("decryption error");
    return p.slice(S);
  }
  function u(v, p) {
    v = s.from(v), p = s.from(p);
    var g = 0, w = v.length;
    v.length !== p.length && (g++, w = Math.min(v.length, p.length));
    for (var S = -1; ++S < w; )
      g += v[S] ^ p[S];
    return g;
  }
  return Pu;
}
var Kd;
function v8() {
  return Kd || (Kd = 1, function(e) {
    e.publicEncrypt = d8(), e.privateDecrypt = p8(), e.privateEncrypt = function(n, i) {
      return e.publicEncrypt(n, i, !0);
    }, e.publicDecrypt = function(n, i) {
      return e.privateDecrypt(n, i, !0);
    };
  }(Au)), Au;
}
var Ln = {}, Gd;
function b8() {
  if (Gd)
    return Ln;
  Gd = 1;
  function e() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var t = gt(), n = ai(), i = t.Buffer, f = t.kMaxLength, r = Ne.crypto || Ne.msCrypto, o = Math.pow(2, 32) - 1;
  function s(p, g) {
    if (typeof p != "number" || p !== p)
      throw new TypeError("offset must be a number");
    if (p > o || p < 0)
      throw new TypeError("offset must be a uint32");
    if (p > f || p > g)
      throw new RangeError("offset out of range");
  }
  function c(p, g, w) {
    if (typeof p != "number" || p !== p)
      throw new TypeError("size must be a number");
    if (p > o || p < 0)
      throw new TypeError("size must be a uint32");
    if (p + g > w || p > f)
      throw new RangeError("buffer too small");
  }
  r && r.getRandomValues || !process.browser ? (Ln.randomFill = l, Ln.randomFillSync = v) : (Ln.randomFill = e, Ln.randomFillSync = e);
  function l(p, g, w, S) {
    if (!i.isBuffer(p) && !(p instanceof Ne.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof g == "function")
      S = g, g = 0, w = p.length;
    else if (typeof w == "function")
      S = w, w = p.length - g;
    else if (typeof S != "function")
      throw new TypeError('"cb" argument must be a function');
    return s(g, p.length), c(w, g, p.length), u(p, g, w, S);
  }
  function u(p, g, w, S) {
    if (process.browser) {
      var T = p.buffer, I = new Uint8Array(T, g, w);
      if (r.getRandomValues(I), S) {
        process.nextTick(function() {
          S(null, p);
        });
        return;
      }
      return p;
    }
    if (S) {
      n(w, function(N, $) {
        if (N)
          return S(N);
        $.copy(p, g), S(null, p);
      });
      return;
    }
    var C = n(w);
    return C.copy(p, g), p;
  }
  function v(p, g, w) {
    if (typeof g > "u" && (g = 0), !i.isBuffer(p) && !(p instanceof Ne.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return s(g, p.length), w === void 0 && (w = p.length - g), c(w, g, p.length), u(p, g, w);
  }
  return Ln;
}
var Wd;
function Fc() {
  if (Wd)
    return pt;
  Wd = 1, pt.randomBytes = pt.rng = pt.pseudoRandomBytes = pt.prng = ai(), pt.createHash = pt.Hash = Hi(), pt.createHmac = pt.Hmac = Cp();
  var e = D4(), t = Object.keys(e), n = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(t);
  pt.getHashes = function() {
    return n;
  };
  var i = jp();
  pt.pbkdf2 = i.pbkdf2, pt.pbkdf2Sync = i.pbkdf2Sync;
  var f = iw();
  pt.Cipher = f.Cipher, pt.createCipher = f.createCipher, pt.Cipheriv = f.Cipheriv, pt.createCipheriv = f.createCipheriv, pt.Decipher = f.Decipher, pt.createDecipher = f.createDecipher, pt.Decipheriv = f.Decipheriv, pt.createDecipheriv = f.createDecipheriv, pt.getCiphers = f.getCiphers, pt.listCiphers = f.listCiphers;
  var r = yw();
  pt.DiffieHellmanGroup = r.DiffieHellmanGroup, pt.createDiffieHellmanGroup = r.createDiffieHellmanGroup, pt.getDiffieHellman = r.getDiffieHellman, pt.createDiffieHellman = r.createDiffieHellman, pt.DiffieHellman = r.DiffieHellman;
  var o = h8();
  pt.createSign = o.createSign, pt.Sign = o.Sign, pt.createVerify = o.createVerify, pt.Verify = o.Verify, pt.createECDH = l8();
  var s = v8();
  pt.publicEncrypt = s.publicEncrypt, pt.privateEncrypt = s.privateEncrypt, pt.publicDecrypt = s.publicDecrypt, pt.privateDecrypt = s.privateDecrypt;
  var c = b8();
  return pt.randomFill = c.randomFill, pt.randomFillSync = c.randomFillSync, pt.createCredentials = function() {
    throw new Error([
      "sorry, createCredentials is not implemented yet",
      "we accept pull requests",
      "https://github.com/crypto-browserify/crypto-browserify"
    ].join(`
`));
  }, pt.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
  }, pt;
}
(function(e) {
  /*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
  Object.defineProperty(e, "__esModule", { value: !0 }), e.utils = e.schnorr = e.verify = e.signSync = e.sign = e.getSharedSecret = e.recoverPublicKey = e.getPublicKey = e.Signature = e.Point = e.CURVE = void 0;
  const t = Fc(), n = BigInt(0), i = BigInt(1), f = BigInt(2), r = BigInt(3), o = BigInt(8), s = Object.freeze({
    a: n,
    b: BigInt(7),
    P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
    n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
    h: i,
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
  });
  e.CURVE = s;
  const c = (X, G) => (X + G / f) / G, l = {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar(X) {
      const { n: G } = s, Y = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), te = -i * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), de = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), ge = Y, ve = BigInt("0x100000000000000000000000000000000"), Te = c(ge * X, G), O = c(-te * X, G);
      let j = M(X - Te * Y - O * de, G), q = M(-Te * te - O * ge, G);
      const R = j > ve, U = q > ve;
      if (R && (j = G - j), U && (q = G - q), j > ve || q > ve)
        throw new Error("splitScalarEndo: Endomorphism failed, k=" + X);
      return { k1neg: R, k1: j, k2neg: U, k2: q };
    }
  }, u = 32, v = 32, p = 32, g = u + 1, w = 2 * u + 1;
  function S(X) {
    const { a: G, b: Y } = s, te = M(X * X), de = M(te * X);
    return M(de + G * X + Y);
  }
  const T = s.a === n;
  class I extends Error {
    constructor(G) {
      super(G);
    }
  }
  function C(X) {
    if (!(X instanceof N))
      throw new TypeError("JacobianPoint expected");
  }
  class N {
    constructor(G, Y, te) {
      this.x = G, this.y = Y, this.z = te;
    }
    static fromAffine(G) {
      if (!(G instanceof H))
        throw new TypeError("JacobianPoint#fromAffine: expected Point");
      return G.equals(H.ZERO) ? N.ZERO : new N(G.x, G.y, i);
    }
    static toAffineBatch(G) {
      const Y = ee(G.map((te) => te.z));
      return G.map((te, de) => te.toAffine(Y[de]));
    }
    static normalizeZ(G) {
      return N.toAffineBatch(G).map(N.fromAffine);
    }
    equals(G) {
      C(G);
      const { x: Y, y: te, z: de } = this, { x: ge, y: ve, z: Te } = G, O = M(de * de), j = M(Te * Te), q = M(Y * j), R = M(ge * O), U = M(M(te * Te) * j), oe = M(M(ve * de) * O);
      return q === R && U === oe;
    }
    negate() {
      return new N(this.x, M(-this.y), this.z);
    }
    double() {
      const { x: G, y: Y, z: te } = this, de = M(G * G), ge = M(Y * Y), ve = M(ge * ge), Te = G + ge, O = M(f * (M(Te * Te) - de - ve)), j = M(r * de), q = M(j * j), R = M(q - f * O), U = M(j * (O - R) - o * ve), oe = M(f * Y * te);
      return new N(R, U, oe);
    }
    add(G) {
      C(G);
      const { x: Y, y: te, z: de } = this, { x: ge, y: ve, z: Te } = G;
      if (ge === n || ve === n)
        return this;
      if (Y === n || te === n)
        return G;
      const O = M(de * de), j = M(Te * Te), q = M(Y * j), R = M(ge * O), U = M(M(te * Te) * j), oe = M(M(ve * de) * O), ae = M(R - q), he = M(oe - U);
      if (ae === n)
        return he === n ? this.double() : N.ZERO;
      const xe = M(ae * ae), Me = M(ae * xe), _e = M(q * xe), ut = M(he * he - Me - f * _e), $e = M(he * (_e - ut) - U * Me), Je = M(de * Te * ae);
      return new N(ut, $e, Je);
    }
    subtract(G) {
      return this.add(G.negate());
    }
    multiplyUnsafe(G) {
      const Y = N.ZERO;
      if (typeof G == "bigint" && G === n)
        return Y;
      let te = d(G);
      if (te === i)
        return this;
      if (!T) {
        let R = Y, U = this;
        for (; te > n; )
          te & i && (R = R.add(U)), U = U.double(), te >>= i;
        return R;
      }
      let { k1neg: de, k1: ge, k2neg: ve, k2: Te } = l.splitScalar(te), O = Y, j = Y, q = this;
      for (; ge > n || Te > n; )
        ge & i && (O = O.add(q)), Te & i && (j = j.add(q)), q = q.double(), ge >>= i, Te >>= i;
      return de && (O = O.negate()), ve && (j = j.negate()), j = new N(M(j.x * l.beta), j.y, j.z), O.add(j);
    }
    precomputeWindow(G) {
      const Y = T ? 128 / G + 1 : 256 / G + 1, te = [];
      let de = this, ge = de;
      for (let ve = 0; ve < Y; ve++) {
        ge = de, te.push(ge);
        for (let Te = 1; Te < 2 ** (G - 1); Te++)
          ge = ge.add(de), te.push(ge);
        de = ge.double();
      }
      return te;
    }
    wNAF(G, Y) {
      !Y && this.equals(N.BASE) && (Y = H.BASE);
      const te = Y && Y._WINDOW_SIZE || 1;
      if (256 % te)
        throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
      let de = Y && D.get(Y);
      de || (de = this.precomputeWindow(te), Y && te !== 1 && (de = N.normalizeZ(de), D.set(Y, de)));
      let ge = N.ZERO, ve = N.BASE;
      const Te = 1 + (T ? 128 / te : 256 / te), O = 2 ** (te - 1), j = BigInt(2 ** te - 1), q = 2 ** te, R = BigInt(te);
      for (let U = 0; U < Te; U++) {
        const oe = U * O;
        let ae = Number(G & j);
        G >>= R, ae > O && (ae -= q, G += i);
        const he = oe, xe = oe + Math.abs(ae) - 1, Me = U % 2 !== 0, _e = ae < 0;
        ae === 0 ? ve = ve.add($(Me, de[he])) : ge = ge.add($(_e, de[xe]));
      }
      return { p: ge, f: ve };
    }
    multiply(G, Y) {
      let te = d(G), de, ge;
      if (T) {
        const { k1neg: ve, k1: Te, k2neg: O, k2: j } = l.splitScalar(te);
        let { p: q, f: R } = this.wNAF(Te, Y), { p: U, f: oe } = this.wNAF(j, Y);
        q = $(ve, q), U = $(O, U), U = new N(M(U.x * l.beta), U.y, U.z), de = q.add(U), ge = R.add(oe);
      } else {
        const { p: ve, f: Te } = this.wNAF(te, Y);
        de = ve, ge = Te;
      }
      return N.normalizeZ([de, ge])[0];
    }
    toAffine(G) {
      const { x: Y, y: te, z: de } = this, ge = this.equals(N.ZERO);
      G == null && (G = ge ? o : J(de));
      const ve = G, Te = M(ve * ve), O = M(Te * ve), j = M(Y * Te), q = M(te * O), R = M(de * ve);
      if (ge)
        return H.ZERO;
      if (R !== i)
        throw new Error("invZ was invalid");
      return new H(j, q);
    }
  }
  N.BASE = new N(s.Gx, s.Gy, i), N.ZERO = new N(n, i, n);
  function $(X, G) {
    const Y = G.negate();
    return X ? Y : G;
  }
  const D = /* @__PURE__ */ new WeakMap();
  class H {
    constructor(G, Y) {
      this.x = G, this.y = Y;
    }
    _setWindowSize(G) {
      this._WINDOW_SIZE = G, D.delete(this);
    }
    hasEvenY() {
      return this.y % f === n;
    }
    static fromCompressedHex(G) {
      const Y = G.length === 32, te = _(Y ? G : G.subarray(1));
      if (!me(te))
        throw new Error("Point is not on curve");
      const de = S(te);
      let ge = re(de);
      const ve = (ge & i) === i;
      Y ? ve && (ge = M(-ge)) : (G[0] & 1) === 1 !== ve && (ge = M(-ge));
      const Te = new H(te, ge);
      return Te.assertValidity(), Te;
    }
    static fromUncompressedHex(G) {
      const Y = _(G.subarray(1, u + 1)), te = _(G.subarray(u + 1, u * 2 + 1)), de = new H(Y, te);
      return de.assertValidity(), de;
    }
    static fromHex(G) {
      const Y = E(G), te = Y.length, de = Y[0];
      if (te === u)
        return this.fromCompressedHex(Y);
      if (te === g && (de === 2 || de === 3))
        return this.fromCompressedHex(Y);
      if (te === w && de === 4)
        return this.fromUncompressedHex(Y);
      throw new Error(`Point.fromHex: received invalid point. Expected 32-${g} compressed bytes or ${w} uncompressed bytes, not ${te}`);
    }
    static fromPrivateKey(G) {
      return H.BASE.multiply(z(G));
    }
    static fromSignature(G, Y, te) {
      const { r: de, s: ge } = L(Y);
      if (![0, 1, 2, 3].includes(te))
        throw new Error("Cannot recover: invalid recovery bit");
      const ve = le(E(G)), { n: Te } = s, O = te === 2 || te === 3 ? de + Te : de, j = J(O, Te), q = M(-ve * j, Te), R = M(ge * j, Te), U = te & 1 ? "03" : "02", oe = H.fromHex(U + h(O)), ae = H.BASE.multiplyAndAddUnsafe(oe, q, R);
      if (!ae)
        throw new Error("Cannot recover signature: point at infinify");
      return ae.assertValidity(), ae;
    }
    toRawBytes(G = !1) {
      return B(this.toHex(G));
    }
    toHex(G = !1) {
      const Y = h(this.x);
      return G ? `${this.hasEvenY() ? "02" : "03"}${Y}` : `04${Y}${h(this.y)}`;
    }
    toHexX() {
      return this.toHex(!0).slice(2);
    }
    toRawX() {
      return this.toRawBytes(!0).slice(1);
    }
    assertValidity() {
      const G = "Point is not on elliptic curve", { x: Y, y: te } = this;
      if (!me(Y) || !me(te))
        throw new Error(G);
      const de = M(te * te), ge = S(Y);
      if (M(de - ge) !== n)
        throw new Error(G);
    }
    equals(G) {
      return this.x === G.x && this.y === G.y;
    }
    negate() {
      return new H(this.x, M(-this.y));
    }
    double() {
      return N.fromAffine(this).double().toAffine();
    }
    add(G) {
      return N.fromAffine(this).add(N.fromAffine(G)).toAffine();
    }
    subtract(G) {
      return this.add(G.negate());
    }
    multiply(G) {
      return N.fromAffine(this).multiply(G, this).toAffine();
    }
    multiplyAndAddUnsafe(G, Y, te) {
      const de = N.fromAffine(this), ge = Y === n || Y === i || this !== H.BASE ? de.multiplyUnsafe(Y) : de.multiply(Y), ve = N.fromAffine(G).multiplyUnsafe(te), Te = ge.add(ve);
      return Te.equals(N.ZERO) ? void 0 : Te.toAffine();
    }
  }
  e.Point = H, H.BASE = new H(s.Gx, s.Gy), H.ZERO = new H(n, n);
  function V(X) {
    return Number.parseInt(X[0], 16) >= 8 ? "00" + X : X;
  }
  function ne(X) {
    if (X.length < 2 || X[0] !== 2)
      throw new Error(`Invalid signature integer tag: ${b(X)}`);
    const G = X[1], Y = X.subarray(2, G + 2);
    if (!G || Y.length !== G)
      throw new Error("Invalid signature integer: wrong length");
    if (Y[0] === 0 && Y[1] <= 127)
      throw new Error("Invalid signature integer: trailing length");
    return { data: _(Y), left: X.subarray(G + 2) };
  }
  function Q(X) {
    if (X.length < 2 || X[0] != 48)
      throw new Error(`Invalid signature tag: ${b(X)}`);
    if (X[1] !== X.length - 2)
      throw new Error("Invalid signature: incorrect length");
    const { data: G, left: Y } = ne(X.subarray(2)), { data: te, left: de } = ne(Y);
    if (de.length)
      throw new Error(`Invalid signature: left bytes after parsing: ${b(de)}`);
    return { r: G, s: te };
  }
  class se {
    constructor(G, Y) {
      this.r = G, this.s = Y, this.assertValidity();
    }
    static fromCompact(G) {
      const Y = G instanceof Uint8Array, te = "Signature.fromCompact";
      if (typeof G != "string" && !Y)
        throw new TypeError(`${te}: Expected string or Uint8Array`);
      const de = Y ? b(G) : G;
      if (de.length !== 128)
        throw new Error(`${te}: Expected 64-byte hex`);
      return new se(A(de.slice(0, 64)), A(de.slice(64, 128)));
    }
    static fromDER(G) {
      const Y = G instanceof Uint8Array;
      if (typeof G != "string" && !Y)
        throw new TypeError("Signature.fromDER: Expected string or Uint8Array");
      const { r: te, s: de } = Q(Y ? G : B(G));
      return new se(te, de);
    }
    static fromHex(G) {
      return this.fromDER(G);
    }
    assertValidity() {
      const { r: G, s: Y } = this;
      if (!pe(G))
        throw new Error("Invalid Signature: r must be 0 < r < n");
      if (!pe(Y))
        throw new Error("Invalid Signature: s must be 0 < s < n");
    }
    hasHighS() {
      const G = s.n >> i;
      return this.s > G;
    }
    normalizeS() {
      return this.hasHighS() ? new se(this.r, M(-this.s, s.n)) : this;
    }
    toDERRawBytes() {
      return B(this.toDERHex());
    }
    toDERHex() {
      const G = V(x(this.s)), Y = V(x(this.r)), te = G.length / 2, de = Y.length / 2, ge = x(te), ve = x(de);
      return `30${x(de + te + 4)}02${ve}${Y}02${ge}${G}`;
    }
    toRawBytes() {
      return this.toDERRawBytes();
    }
    toHex() {
      return this.toDERHex();
    }
    toCompactRawBytes() {
      return B(this.toCompactHex());
    }
    toCompactHex() {
      return h(this.r) + h(this.s);
    }
  }
  e.Signature = se;
  function k(...X) {
    if (!X.every((te) => te instanceof Uint8Array))
      throw new Error("Uint8Array list expected");
    if (X.length === 1)
      return X[0];
    const G = X.reduce((te, de) => te + de.length, 0), Y = new Uint8Array(G);
    for (let te = 0, de = 0; te < X.length; te++) {
      const ge = X[te];
      Y.set(ge, de), de += ge.length;
    }
    return Y;
  }
  const m = Array.from({ length: 256 }, (X, G) => G.toString(16).padStart(2, "0"));
  function b(X) {
    if (!(X instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    let G = "";
    for (let Y = 0; Y < X.length; Y++)
      G += m[X[Y]];
    return G;
  }
  const a = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
  function h(X) {
    if (typeof X != "bigint")
      throw new Error("Expected bigint");
    if (!(n <= X && X < a))
      throw new Error("Expected number 0 <= n < 2^256");
    return X.toString(16).padStart(64, "0");
  }
  function y(X) {
    const G = B(h(X));
    if (G.length !== 32)
      throw new Error("Error: expected 32 bytes");
    return G;
  }
  function x(X) {
    const G = X.toString(16);
    return G.length & 1 ? `0${G}` : G;
  }
  function A(X) {
    if (typeof X != "string")
      throw new TypeError("hexToNumber: expected string, got " + typeof X);
    return BigInt(`0x${X}`);
  }
  function B(X) {
    if (typeof X != "string")
      throw new TypeError("hexToBytes: expected string, got " + typeof X);
    if (X.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex" + X.length);
    const G = new Uint8Array(X.length / 2);
    for (let Y = 0; Y < G.length; Y++) {
      const te = Y * 2, de = X.slice(te, te + 2), ge = Number.parseInt(de, 16);
      if (Number.isNaN(ge) || ge < 0)
        throw new Error("Invalid byte sequence");
      G[Y] = ge;
    }
    return G;
  }
  function _(X) {
    return A(b(X));
  }
  function E(X) {
    return X instanceof Uint8Array ? Uint8Array.from(X) : B(X);
  }
  function d(X) {
    if (typeof X == "number" && Number.isSafeInteger(X) && X > 0)
      return BigInt(X);
    if (typeof X == "bigint" && pe(X))
      return X;
    throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
  }
  function M(X, G = s.P) {
    const Y = X % G;
    return Y >= n ? Y : G + Y;
  }
  function Z(X, G) {
    const { P: Y } = s;
    let te = X;
    for (; G-- > n; )
      te *= te, te %= Y;
    return te;
  }
  function re(X) {
    const { P: G } = s, Y = BigInt(6), te = BigInt(11), de = BigInt(22), ge = BigInt(23), ve = BigInt(44), Te = BigInt(88), O = X * X * X % G, j = O * O * X % G, q = Z(j, r) * j % G, R = Z(q, r) * j % G, U = Z(R, f) * O % G, oe = Z(U, te) * U % G, ae = Z(oe, de) * oe % G, he = Z(ae, ve) * ae % G, xe = Z(he, Te) * he % G, Me = Z(xe, ve) * ae % G, _e = Z(Me, r) * j % G, ut = Z(_e, ge) * oe % G, $e = Z(ut, Y) * O % G, Je = Z($e, f);
    if (Je * Je % G !== X)
      throw new Error("Cannot find square root");
    return Je;
  }
  function J(X, G = s.P) {
    if (X === n || G <= n)
      throw new Error(`invert: expected positive integers, got n=${X} mod=${G}`);
    let Y = M(X, G), te = G, de = n, ge = i;
    for (; Y !== n; ) {
      const Te = te / Y, O = te % Y, j = de - ge * Te;
      te = Y, Y = O, de = ge, ge = j;
    }
    if (te !== i)
      throw new Error("invert: does not exist");
    return M(de, G);
  }
  function ee(X, G = s.P) {
    const Y = new Array(X.length), te = X.reduce((ge, ve, Te) => ve === n ? ge : (Y[Te] = ge, M(ge * ve, G)), i), de = J(te, G);
    return X.reduceRight((ge, ve, Te) => ve === n ? ge : (Y[Te] = M(ge * Y[Te], G), M(ge * ve, G)), de), Y;
  }
  function ue(X) {
    const G = X.length * 8 - v * 8, Y = _(X);
    return G > 0 ? Y >> BigInt(G) : Y;
  }
  function le(X, G = !1) {
    const Y = ue(X);
    if (G)
      return Y;
    const { n: te } = s;
    return Y >= te ? Y - te : Y;
  }
  let Se, W;
  class K {
    constructor(G, Y) {
      if (this.hashLen = G, this.qByteLen = Y, typeof G != "number" || G < 2)
        throw new Error("hashLen must be a number");
      if (typeof Y != "number" || Y < 2)
        throw new Error("qByteLen must be a number");
      this.v = new Uint8Array(G).fill(1), this.k = new Uint8Array(G).fill(0), this.counter = 0;
    }
    hmac(...G) {
      return e.utils.hmacSha256(this.k, ...G);
    }
    hmacSync(...G) {
      return W(this.k, ...G);
    }
    checkSync() {
      if (typeof W != "function")
        throw new I("hmacSha256Sync needs to be set");
    }
    incr() {
      if (this.counter >= 1e3)
        throw new Error("Tried 1,000 k values for sign(), all were invalid");
      this.counter += 1;
    }
    async reseed(G = new Uint8Array()) {
      this.k = await this.hmac(this.v, Uint8Array.from([0]), G), this.v = await this.hmac(this.v), G.length !== 0 && (this.k = await this.hmac(this.v, Uint8Array.from([1]), G), this.v = await this.hmac(this.v));
    }
    reseedSync(G = new Uint8Array()) {
      this.checkSync(), this.k = this.hmacSync(this.v, Uint8Array.from([0]), G), this.v = this.hmacSync(this.v), G.length !== 0 && (this.k = this.hmacSync(this.v, Uint8Array.from([1]), G), this.v = this.hmacSync(this.v));
    }
    async generate() {
      this.incr();
      let G = 0;
      const Y = [];
      for (; G < this.qByteLen; ) {
        this.v = await this.hmac(this.v);
        const te = this.v.slice();
        Y.push(te), G += this.v.length;
      }
      return k(...Y);
    }
    generateSync() {
      this.checkSync(), this.incr();
      let G = 0;
      const Y = [];
      for (; G < this.qByteLen; ) {
        this.v = this.hmacSync(this.v);
        const te = this.v.slice();
        Y.push(te), G += this.v.length;
      }
      return k(...Y);
    }
  }
  function pe(X) {
    return n < X && X < s.n;
  }
  function me(X) {
    return n < X && X < s.P;
  }
  function Ie(X, G, Y, te = !0) {
    const { n: de } = s, ge = le(X, !0);
    if (!pe(ge))
      return;
    const ve = J(ge, de), Te = H.BASE.multiply(ge), O = M(Te.x, de);
    if (O === n)
      return;
    const j = M(ve * M(G + Y * O, de), de);
    if (j === n)
      return;
    let q = new se(O, j), R = (Te.x === q.r ? 0 : 2) | Number(Te.y & i);
    return te && q.hasHighS() && (q = q.normalizeS(), R ^= 1), { sig: q, recovery: R };
  }
  function z(X) {
    let G;
    if (typeof X == "bigint")
      G = X;
    else if (typeof X == "number" && Number.isSafeInteger(X) && X > 0)
      G = BigInt(X);
    else if (typeof X == "string") {
      if (X.length !== 2 * v)
        throw new Error("Expected 32 bytes of private key");
      G = A(X);
    } else if (X instanceof Uint8Array) {
      if (X.length !== v)
        throw new Error("Expected 32 bytes of private key");
      G = _(X);
    } else
      throw new TypeError("Expected valid private key");
    if (!pe(G))
      throw new Error("Expected private key: 0 < key < n");
    return G;
  }
  function P(X) {
    return X instanceof H ? (X.assertValidity(), X) : H.fromHex(X);
  }
  function L(X) {
    if (X instanceof se)
      return X.assertValidity(), X;
    try {
      return se.fromDER(X);
    } catch {
      return se.fromCompact(X);
    }
  }
  function F(X, G = !1) {
    return H.fromPrivateKey(X).toRawBytes(G);
  }
  e.getPublicKey = F;
  function fe(X, G, Y, te = !1) {
    return H.fromSignature(X, G, Y).toRawBytes(te);
  }
  e.recoverPublicKey = fe;
  function ce(X) {
    const G = X instanceof Uint8Array, Y = typeof X == "string", te = (G || Y) && X.length;
    return G ? te === g || te === w : Y ? te === g * 2 || te === w * 2 : X instanceof H;
  }
  function we(X, G, Y = !1) {
    if (ce(X))
      throw new TypeError("getSharedSecret: first arg must be private key");
    if (!ce(G))
      throw new TypeError("getSharedSecret: second arg must be public key");
    const te = P(G);
    return te.assertValidity(), te.multiply(z(X)).toRawBytes(Y);
  }
  e.getSharedSecret = we;
  function Ce(X) {
    const G = X.length > u ? X.slice(0, u) : X;
    return _(G);
  }
  function Re(X) {
    const G = Ce(X), Y = M(G, s.n);
    return We(Y < n ? G : Y);
  }
  function We(X) {
    return y(X);
  }
  function je(X, G, Y) {
    if (X == null)
      throw new Error(`sign: expected valid message hash, not "${X}"`);
    const te = E(X), de = z(G), ge = [We(de), Re(te)];
    if (Y != null) {
      Y === !0 && (Y = e.utils.randomBytes(u));
      const O = E(Y);
      if (O.length !== u)
        throw new Error(`sign: Expected ${u} bytes of extra data`);
      ge.push(O);
    }
    const ve = k(...ge), Te = Ce(te);
    return { seed: ve, m: Te, d: de };
  }
  function Pe(X, G) {
    const { sig: Y, recovery: te } = X, { der: de, recovered: ge } = Object.assign({ canonical: !0, der: !0 }, G), ve = de ? Y.toDERRawBytes() : Y.toCompactRawBytes();
    return ge ? [ve, te] : ve;
  }
  async function ct(X, G, Y = {}) {
    const { seed: te, m: de, d: ge } = je(X, G, Y.extraEntropy), ve = new K(p, v);
    await ve.reseed(te);
    let Te;
    for (; !(Te = Ie(await ve.generate(), de, ge, Y.canonical)); )
      await ve.reseed();
    return Pe(Te, Y);
  }
  e.sign = ct;
  function ft(X, G, Y = {}) {
    const { seed: te, m: de, d: ge } = je(X, G, Y.extraEntropy), ve = new K(p, v);
    ve.reseedSync(te);
    let Te;
    for (; !(Te = Ie(ve.generateSync(), de, ge, Y.canonical)); )
      ve.reseedSync();
    return Pe(Te, Y);
  }
  e.signSync = ft;
  const Ke = { strict: !0 };
  function Tt(X, G, Y, te = Ke) {
    let de;
    try {
      de = L(X), G = E(G);
    } catch {
      return !1;
    }
    const { r: ge, s: ve } = de;
    if (te.strict && de.hasHighS())
      return !1;
    const Te = le(G);
    let O;
    try {
      O = P(Y);
    } catch {
      return !1;
    }
    const { n: j } = s, q = J(ve, j), R = M(Te * q, j), U = M(ge * q, j), oe = H.BASE.multiplyAndAddUnsafe(O, R, U);
    return oe ? M(oe.x, j) === ge : !1;
  }
  e.verify = Tt;
  function it(X) {
    return M(_(X), s.n);
  }
  class Fe {
    constructor(G, Y) {
      this.r = G, this.s = Y, this.assertValidity();
    }
    static fromHex(G) {
      const Y = E(G);
      if (Y.length !== 64)
        throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${Y.length}`);
      const te = _(Y.subarray(0, 32)), de = _(Y.subarray(32, 64));
      return new Fe(te, de);
    }
    assertValidity() {
      const { r: G, s: Y } = this;
      if (!me(G) || !pe(Y))
        throw new Error("Invalid signature");
    }
    toHex() {
      return h(this.r) + h(this.s);
    }
    toRawBytes() {
      return B(this.toHex());
    }
  }
  function xt(X) {
    return H.fromPrivateKey(X).toRawX();
  }
  class rt {
    constructor(G, Y, te = e.utils.randomBytes()) {
      if (G == null)
        throw new TypeError(`sign: Expected valid message, not "${G}"`);
      this.m = E(G);
      const { x: de, scalar: ge } = this.getScalar(z(Y));
      if (this.px = de, this.d = ge, this.rand = E(te), this.rand.length !== 32)
        throw new TypeError("sign: Expected 32 bytes of aux randomness");
    }
    getScalar(G) {
      const Y = H.fromPrivateKey(G), te = Y.hasEvenY() ? G : s.n - G;
      return { point: Y, scalar: te, x: Y.toRawX() };
    }
    initNonce(G, Y) {
      return y(G ^ _(Y));
    }
    finalizeNonce(G) {
      const Y = M(_(G), s.n);
      if (Y === n)
        throw new Error("sign: Creation of signature failed. k is zero");
      const { point: te, x: de, scalar: ge } = this.getScalar(Y);
      return { R: te, rx: de, k: ge };
    }
    finalizeSig(G, Y, te, de) {
      return new Fe(G.x, M(Y + te * de, s.n)).toRawBytes();
    }
    error() {
      throw new Error("sign: Invalid signature produced");
    }
    async calc() {
      const { m: G, d: Y, px: te, rand: de } = this, ge = e.utils.taggedHash, ve = this.initNonce(Y, await ge(_t.aux, de)), { R: Te, rx: O, k: j } = this.finalizeNonce(await ge(_t.nonce, ve, te, G)), q = it(await ge(_t.challenge, O, te, G)), R = this.finalizeSig(Te, j, q, Y);
      return await At(R, G, te) || this.error(), R;
    }
    calcSync() {
      const { m: G, d: Y, px: te, rand: de } = this, ge = e.utils.taggedHashSync, ve = this.initNonce(Y, ge(_t.aux, de)), { R: Te, rx: O, k: j } = this.finalizeNonce(ge(_t.nonce, ve, te, G)), q = it(ge(_t.challenge, O, te, G)), R = this.finalizeSig(Te, j, q, Y);
      return st(R, G, te) || this.error(), R;
    }
  }
  async function Ve(X, G, Y) {
    return new rt(X, G, Y).calc();
  }
  function Mt(X, G, Y) {
    return new rt(X, G, Y).calcSync();
  }
  function at(X, G, Y) {
    const te = X instanceof Fe, de = te ? X : Fe.fromHex(X);
    return te && de.assertValidity(), {
      ...de,
      m: E(G),
      P: P(Y)
    };
  }
  function ze(X, G, Y, te) {
    const de = H.BASE.multiplyAndAddUnsafe(G, z(Y), M(-te, s.n));
    return !(!de || !de.hasEvenY() || de.x !== X);
  }
  async function At(X, G, Y) {
    try {
      const { r: te, s: de, m: ge, P: ve } = at(X, G, Y), Te = it(await e.utils.taggedHash(_t.challenge, y(te), ve.toRawX(), ge));
      return ze(te, ve, de, Te);
    } catch {
      return !1;
    }
  }
  function st(X, G, Y) {
    try {
      const { r: te, s: de, m: ge, P: ve } = at(X, G, Y), Te = it(e.utils.taggedHashSync(_t.challenge, y(te), ve.toRawX(), ge));
      return ze(te, ve, de, Te);
    } catch (te) {
      if (te instanceof I)
        throw te;
      return !1;
    }
  }
  e.schnorr = {
    Signature: Fe,
    getPublicKey: xt,
    sign: Ve,
    verify: At,
    signSync: Mt,
    verifySync: st
  }, H.BASE._setWindowSize(8);
  const De = {
    node: t,
    web: typeof self == "object" && "crypto" in self ? self.crypto : void 0
  }, _t = {
    challenge: "BIP0340/challenge",
    aux: "BIP0340/aux",
    nonce: "BIP0340/nonce"
  }, Xe = {};
  e.utils = {
    bytesToHex: b,
    hexToBytes: B,
    concatBytes: k,
    mod: M,
    invert: J,
    isValidPrivateKey(X) {
      try {
        return z(X), !0;
      } catch {
        return !1;
      }
    },
    _bigintTo32Bytes: y,
    _normalizePrivateKey: z,
    hashToPrivateKey: (X) => {
      X = E(X);
      const G = v + 8;
      if (X.length < G || X.length > 1024)
        throw new Error("Expected valid bytes of private key as per FIPS 186");
      const Y = M(_(X), s.n - i) + i;
      return y(Y);
    },
    randomBytes: (X = 32) => {
      if (De.web)
        return De.web.getRandomValues(new Uint8Array(X));
      if (De.node) {
        const { randomBytes: G } = De.node;
        return Uint8Array.from(G(X));
      } else
        throw new Error("The environment doesn't have randomBytes function");
    },
    randomPrivateKey: () => e.utils.hashToPrivateKey(e.utils.randomBytes(v + 8)),
    precompute(X = 8, G = H.BASE) {
      const Y = G === H.BASE ? G : new H(G.x, G.y);
      return Y._setWindowSize(X), Y.multiply(r), Y;
    },
    sha256: async (...X) => {
      if (De.web) {
        const G = await De.web.subtle.digest("SHA-256", k(...X));
        return new Uint8Array(G);
      } else if (De.node) {
        const { createHash: G } = De.node, Y = G("sha256");
        return X.forEach((te) => Y.update(te)), Uint8Array.from(Y.digest());
      } else
        throw new Error("The environment doesn't have sha256 function");
    },
    hmacSha256: async (X, ...G) => {
      if (De.web) {
        const Y = await De.web.subtle.importKey("raw", X, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]), te = k(...G), de = await De.web.subtle.sign("HMAC", Y, te);
        return new Uint8Array(de);
      } else if (De.node) {
        const { createHmac: Y } = De.node, te = Y("sha256", X);
        return G.forEach((de) => te.update(de)), Uint8Array.from(te.digest());
      } else
        throw new Error("The environment doesn't have hmac-sha256 function");
    },
    sha256Sync: void 0,
    hmacSha256Sync: void 0,
    taggedHash: async (X, ...G) => {
      let Y = Xe[X];
      if (Y === void 0) {
        const te = await e.utils.sha256(Uint8Array.from(X, (de) => de.charCodeAt(0)));
        Y = k(te, te), Xe[X] = Y;
      }
      return e.utils.sha256(Y, ...G);
    },
    taggedHashSync: (X, ...G) => {
      if (typeof Se != "function")
        throw new I("sha256Sync is undefined, you need to set it");
      let Y = Xe[X];
      if (Y === void 0) {
        const te = Se(Uint8Array.from(X, (de) => de.charCodeAt(0)));
        Y = k(te, te), Xe[X] = Y;
      }
      return Se(Y, ...G);
    },
    _JacobianPoint: N
  }, Object.defineProperties(e.utils, {
    sha256Sync: {
      configurable: !1,
      get() {
        return Se;
      },
      set(X) {
        Se || (Se = X);
      }
    },
    hmacSha256Sync: {
      configurable: !1,
      get() {
        return W;
      },
      set(X) {
        W || (W = X);
      }
    }
  });
})(qu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.schnorr = e.Signature = e.Point = e.CURVE = e.utils = e.getSharedSecret = e.recoverPublicKey = e.verify = e.signSync = e.sign = e.getPublicKey = void 0;
  const t = cp, n = Zn, i = qu;
  var f = qu;
  Object.defineProperty(e, "getPublicKey", { enumerable: !0, get: function() {
    return f.getPublicKey;
  } }), Object.defineProperty(e, "sign", { enumerable: !0, get: function() {
    return f.sign;
  } }), Object.defineProperty(e, "signSync", { enumerable: !0, get: function() {
    return f.signSync;
  } }), Object.defineProperty(e, "verify", { enumerable: !0, get: function() {
    return f.verify;
  } }), Object.defineProperty(e, "recoverPublicKey", { enumerable: !0, get: function() {
    return f.recoverPublicKey;
  } }), Object.defineProperty(e, "getSharedSecret", { enumerable: !0, get: function() {
    return f.getSharedSecret;
  } }), Object.defineProperty(e, "utils", { enumerable: !0, get: function() {
    return f.utils;
  } }), Object.defineProperty(e, "CURVE", { enumerable: !0, get: function() {
    return f.CURVE;
  } }), Object.defineProperty(e, "Point", { enumerable: !0, get: function() {
    return f.Point;
  } }), Object.defineProperty(e, "Signature", { enumerable: !0, get: function() {
    return f.Signature;
  } }), Object.defineProperty(e, "schnorr", { enumerable: !0, get: function() {
    return f.schnorr;
  } }), i.utils.hmacSha256Sync = (r, ...o) => {
    const s = t.hmac.create(n.sha256, r);
    return o.forEach((c) => s.update(c)), s.digest();
  };
})(_f);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.RLP_EMPTY_STRING = e.KECCAK256_RLP = e.KECCAK256_RLP_S = e.KECCAK256_RLP_ARRAY = e.KECCAK256_RLP_ARRAY_S = e.KECCAK256_NULL = e.KECCAK256_NULL_S = e.TWO_POW256 = e.SECP256K1_ORDER_DIV_2 = e.SECP256K1_ORDER = e.MAX_INTEGER_BIGINT = e.MAX_INTEGER = e.MAX_UINT64 = void 0;
  const t = Nr, n = _f;
  e.MAX_UINT64 = BigInt("0xffffffffffffffff"), e.MAX_INTEGER = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), e.MAX_INTEGER_BIGINT = BigInt(2) ** BigInt(256) - BigInt(1), e.SECP256K1_ORDER = n.CURVE.n, e.SECP256K1_ORDER_DIV_2 = n.CURVE.n / BigInt(2), e.TWO_POW256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000"), e.KECCAK256_NULL_S = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470", e.KECCAK256_NULL = t.Buffer.from(e.KECCAK256_NULL_S, "hex"), e.KECCAK256_RLP_ARRAY_S = "1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", e.KECCAK256_RLP_ARRAY = t.Buffer.from(e.KECCAK256_RLP_ARRAY_S, "hex"), e.KECCAK256_RLP_S = "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421", e.KECCAK256_RLP = t.Buffer.from(e.KECCAK256_RLP_S, "hex"), e.RLP_EMPTY_STRING = t.Buffer.from([128]);
})(mf);
var Hc = {}, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.RLP = Hr.utils = Hr.decode = Hr.encode = void 0;
function zc(e) {
  if (Array.isArray(e)) {
    const n = [];
    for (let f = 0; f < e.length; f++)
      n.push(zc(e[f]));
    const i = da(...n);
    return da(Xd(i.length, 192), i);
  }
  const t = dv(e);
  return t.length === 1 && t[0] < 128 ? t : da(Xd(t.length, 128), t);
}
Hr.encode = zc;
function $n(e, t, n) {
  if (n > e.length)
    throw new Error("invalid RLP (safeSlice): end slice of Uint8Array out-of-bounds");
  return e.slice(t, n);
}
function Jd(e) {
  if (e[0] === 0)
    throw new Error("invalid RLP: extra zeros");
  return cv(uv(e));
}
function Xd(e, t) {
  if (e < 56)
    return Uint8Array.from([e + t]);
  const n = Hu(e), i = n.length / 2, f = Hu(t + 55 + i);
  return Uint8Array.from(Ra(f + n));
}
function sv(e, t = !1) {
  if (typeof e > "u" || e === null || e.length === 0)
    return Uint8Array.from([]);
  const n = dv(e), i = Fu(n);
  if (t)
    return i;
  if (i.remainder.length !== 0)
    throw new Error("invalid RLP: remainder must be zero");
  return i.data;
}
Hr.decode = sv;
function Fu(e) {
  let t, n, i, f, r;
  const o = [], s = e[0];
  if (s <= 127)
    return {
      data: e.slice(0, 1),
      remainder: e.slice(1)
    };
  if (s <= 183) {
    if (t = s - 127, s === 128 ? i = Uint8Array.from([]) : i = $n(e, 1, t), t === 2 && i[0] < 128)
      throw new Error("invalid RLP encoding: invalid prefix, single byte < 0x80 are not prefixed");
    return {
      data: i,
      remainder: e.slice(t)
    };
  } else if (s <= 191) {
    if (n = s - 182, e.length - 1 < n)
      throw new Error("invalid RLP: not enough bytes for string length");
    if (t = Jd($n(e, 1, n)), t <= 55)
      throw new Error("invalid RLP: expected string length to be greater than 55");
    return i = $n(e, n, t + n), {
      data: i,
      remainder: e.slice(t + n)
    };
  } else if (s <= 247) {
    for (t = s - 191, f = $n(e, 1, t); f.length; )
      r = Fu(f), o.push(r.data), f = r.remainder;
    return {
      data: o,
      remainder: e.slice(t)
    };
  } else {
    if (n = s - 246, t = Jd($n(e, 1, n)), t < 56)
      throw new Error("invalid RLP: encoded list too short");
    const c = n + t;
    if (c > e.length)
      throw new Error("invalid RLP: total length is larger than the data");
    for (f = $n(e, n, c); f.length; )
      r = Fu(f), o.push(r.data), f = r.remainder;
    return {
      data: o,
      remainder: e.slice(c)
    };
  }
}
const y8 = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function uv(e) {
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += y8[e[n]];
  return t;
}
function cv(e) {
  const t = Number.parseInt(e, 16);
  if (Number.isNaN(t))
    throw new Error("Invalid byte sequence");
  return t;
}
function Ra(e) {
  if (typeof e != "string")
    throw new TypeError("hexToBytes: expected string, got " + typeof e);
  if (e.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex");
  const t = new Uint8Array(e.length / 2);
  for (let n = 0; n < t.length; n++) {
    const i = n * 2;
    t[n] = cv(e.slice(i, i + 2));
  }
  return t;
}
function da(...e) {
  if (e.length === 1)
    return e[0];
  const t = e.reduce((i, f) => i + f.length, 0), n = new Uint8Array(t);
  for (let i = 0, f = 0; i < e.length; i++) {
    const r = e[i];
    n.set(r, f), f += r.length;
  }
  return n;
}
function hv(e) {
  return new TextEncoder().encode(e);
}
function Hu(e) {
  if (e < 0)
    throw new Error("Invalid integer as argument, must be unsigned!");
  const t = e.toString(16);
  return t.length % 2 ? `0${t}` : t;
}
function g8(e) {
  return e.length % 2 ? `0${e}` : e;
}
function lv(e) {
  return e.length >= 2 && e[0] === "0" && e[1] === "x";
}
function m8(e) {
  return typeof e != "string" ? e : lv(e) ? e.slice(2) : e;
}
function dv(e) {
  if (e instanceof Uint8Array)
    return e;
  if (typeof e == "string")
    return lv(e) ? Ra(g8(m8(e))) : hv(e);
  if (typeof e == "number" || typeof e == "bigint")
    return e ? Ra(Hu(e)) : Uint8Array.from([]);
  if (e == null)
    return Uint8Array.from([]);
  throw new Error("toBytes: received unsupported type " + typeof e);
}
Hr.utils = {
  bytesToHex: uv,
  concatBytes: da,
  hexToBytes: Ra,
  utf8ToBytes: hv
};
Hr.RLP = { encode: zc, decode: sv };
var xr = {}, Lt = {}, pv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.add = e.toBig = e.split = e.fromBig = void 0;
  const t = BigInt(2 ** 32 - 1), n = BigInt(32);
  function i(se, k = !1) {
    return k ? { h: Number(se & t), l: Number(se >> n & t) } : { h: Number(se >> n & t) | 0, l: Number(se & t) | 0 };
  }
  e.fromBig = i;
  function f(se, k = !1) {
    let m = new Uint32Array(se.length), b = new Uint32Array(se.length);
    for (let a = 0; a < se.length; a++) {
      const { h, l: y } = i(se[a], k);
      [m[a], b[a]] = [h, y];
    }
    return [m, b];
  }
  e.split = f;
  const r = (se, k) => BigInt(se >>> 0) << n | BigInt(k >>> 0);
  e.toBig = r;
  const o = (se, k, m) => se >>> m, s = (se, k, m) => se << 32 - m | k >>> m, c = (se, k, m) => se >>> m | k << 32 - m, l = (se, k, m) => se << 32 - m | k >>> m, u = (se, k, m) => se << 64 - m | k >>> m - 32, v = (se, k, m) => se >>> m - 32 | k << 64 - m, p = (se, k) => k, g = (se, k) => se, w = (se, k, m) => se << m | k >>> 32 - m, S = (se, k, m) => k << m | se >>> 32 - m, T = (se, k, m) => k << m - 32 | se >>> 64 - m, I = (se, k, m) => se << m - 32 | k >>> 64 - m;
  function C(se, k, m, b) {
    const a = (k >>> 0) + (b >>> 0);
    return { h: se + m + (a / 2 ** 32 | 0) | 0, l: a | 0 };
  }
  e.add = C;
  const N = (se, k, m) => (se >>> 0) + (k >>> 0) + (m >>> 0), $ = (se, k, m, b) => k + m + b + (se / 2 ** 32 | 0) | 0, D = (se, k, m, b) => (se >>> 0) + (k >>> 0) + (m >>> 0) + (b >>> 0), H = (se, k, m, b, a) => k + m + b + a + (se / 2 ** 32 | 0) | 0, V = (se, k, m, b, a) => (se >>> 0) + (k >>> 0) + (m >>> 0) + (b >>> 0) + (a >>> 0), ne = (se, k, m, b, a, h) => k + m + b + a + h + (se / 2 ** 32 | 0) | 0, Q = {
    fromBig: i,
    split: f,
    toBig: e.toBig,
    shrSH: o,
    shrSL: s,
    rotrSH: c,
    rotrSL: l,
    rotrBH: u,
    rotrBL: v,
    rotr32H: p,
    rotr32L: g,
    rotlSH: w,
    rotlSL: S,
    rotlBH: T,
    rotlBL: I,
    add: C,
    add3L: N,
    add3H: $,
    add4L: D,
    add4H: H,
    add5H: ne,
    add5L: V
  };
  e.default = Q;
})(pv);
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.shake256 = Lt.shake128 = Lt.keccak_512 = Lt.keccak_384 = Lt.keccak_256 = Lt.keccak_224 = Lt.sha3_512 = Lt.sha3_384 = Lt.sha3_256 = Lt.sha3_224 = Lt.Keccak = Lt.keccakP = void 0;
const kn = Zt, Bi = pv, wi = An, [vv, bv, yv] = [[], [], []], w8 = BigInt(0), di = BigInt(1), _8 = BigInt(2), x8 = BigInt(7), E8 = BigInt(256), S8 = BigInt(113);
for (let e = 0, t = di, n = 1, i = 0; e < 24; e++) {
  [n, i] = [i, (2 * n + 3 * i) % 5], vv.push(2 * (5 * i + n)), bv.push((e + 1) * (e + 2) / 2 % 64);
  let f = w8;
  for (let r = 0; r < 7; r++)
    t = (t << di ^ (t >> x8) * S8) % E8, t & _8 && (f ^= di << (di << BigInt(r)) - di);
  yv.push(f);
}
const [M8, A8] = Bi.default.split(yv, !0), Zd = (e, t, n) => n > 32 ? Bi.default.rotlBH(e, t, n) : Bi.default.rotlSH(e, t, n), Yd = (e, t, n) => n > 32 ? Bi.default.rotlBL(e, t, n) : Bi.default.rotlSL(e, t, n);
function gv(e, t = 24) {
  const n = new Uint32Array(10);
  for (let i = 24 - t; i < 24; i++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const s = (o + 8) % 10, c = (o + 2) % 10, l = n[c], u = n[c + 1], v = Zd(l, u, 1) ^ n[s], p = Yd(l, u, 1) ^ n[s + 1];
      for (let g = 0; g < 50; g += 10)
        e[o + g] ^= v, e[o + g + 1] ^= p;
    }
    let f = e[2], r = e[3];
    for (let o = 0; o < 24; o++) {
      const s = bv[o], c = Zd(f, r, s), l = Yd(f, r, s), u = vv[o];
      f = e[u], r = e[u + 1], e[u] = c, e[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let s = 0; s < 10; s++)
        n[s] = e[o + s];
      for (let s = 0; s < 10; s++)
        e[o + s] ^= ~n[(s + 2) % 10] & n[(s + 4) % 10];
    }
    e[0] ^= M8[i], e[1] ^= A8[i];
  }
  n.fill(0);
}
Lt.keccakP = gv;
class Ki extends wi.Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, i, f = !1, r = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = i, this.enableXOF = f, this.rounds = r, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, kn.default.number(i), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = (0, wi.u32)(this.state);
  }
  keccak() {
    gv(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    kn.default.exists(this);
    const { blockLen: n, state: i } = this;
    t = (0, wi.toBytes)(t);
    const f = t.length;
    for (let r = 0; r < f; ) {
      const o = Math.min(n - this.pos, f - r);
      for (let s = 0; s < o; s++)
        i[this.pos++] ^= t[r++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: n, pos: i, blockLen: f } = this;
    t[i] ^= n, n & 128 && i === f - 1 && this.keccak(), t[f - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    kn.default.exists(this, !1), kn.default.bytes(t), this.finish();
    const n = this.state, { blockLen: i } = this;
    for (let f = 0, r = t.length; f < r; ) {
      this.posOut >= i && this.keccak();
      const o = Math.min(i - this.posOut, r - f);
      t.set(n.subarray(this.posOut, this.posOut + o), f), this.posOut += o, f += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return kn.default.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (kn.default.output(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: n, suffix: i, outputLen: f, rounds: r, enableXOF: o } = this;
    return t || (t = new Ki(n, i, f, o, r)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = r, t.suffix = i, t.outputLen = f, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
Lt.Keccak = Ki;
const ln = (e, t, n) => (0, wi.wrapConstructor)(() => new Ki(t, e, n));
Lt.sha3_224 = ln(6, 144, 224 / 8);
Lt.sha3_256 = ln(6, 136, 256 / 8);
Lt.sha3_384 = ln(6, 104, 384 / 8);
Lt.sha3_512 = ln(6, 72, 512 / 8);
Lt.keccak_224 = ln(1, 144, 224 / 8);
Lt.keccak_256 = ln(1, 136, 256 / 8);
Lt.keccak_384 = ln(1, 104, 384 / 8);
Lt.keccak_512 = ln(1, 72, 512 / 8);
const mv = (e, t, n) => (0, wi.wrapConstructorWithOpts)((i = {}) => new Ki(t, e, i.dkLen === void 0 ? n : i.dkLen, !0));
Lt.shake128 = mv(31, 168, 128 / 8);
Lt.shake256 = mv(31, 136, 256 / 8);
function zu(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ri = {}, B8 = {
  get exports() {
    return Ri;
  },
  set exports(e) {
    Ri = e;
  }
};
(function(e, t) {
  var n = Ne && Ne.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.crypto = t.wrapHash = t.equalsBytes = t.hexToBytes = t.bytesToUtf8 = t.utf8ToBytes = t.createView = t.concatBytes = t.toHex = t.bytesToHex = t.assertBytes = t.assertBool = void 0;
  const i = n(Zt), f = An, r = i.default.bool;
  t.assertBool = r;
  const o = i.default.bytes;
  t.assertBytes = o;
  var s = An;
  Object.defineProperty(t, "bytesToHex", { enumerable: !0, get: function() {
    return s.bytesToHex;
  } }), Object.defineProperty(t, "toHex", { enumerable: !0, get: function() {
    return s.bytesToHex;
  } }), Object.defineProperty(t, "concatBytes", { enumerable: !0, get: function() {
    return s.concatBytes;
  } }), Object.defineProperty(t, "createView", { enumerable: !0, get: function() {
    return s.createView;
  } }), Object.defineProperty(t, "utf8ToBytes", { enumerable: !0, get: function() {
    return s.utf8ToBytes;
  } });
  function c(p) {
    if (!(p instanceof Uint8Array))
      throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof p}`);
    return new TextDecoder().decode(p);
  }
  t.bytesToUtf8 = c;
  function l(p) {
    const g = p.startsWith("0x") ? p.substring(2) : p;
    return (0, f.hexToBytes)(g);
  }
  t.hexToBytes = l;
  function u(p, g) {
    if (p.length !== g.length)
      return !1;
    for (let w = 0; w < p.length; w++)
      if (p[w] !== g[w])
        return !1;
    return !0;
  }
  t.equalsBytes = u;
  function v(p) {
    return (g) => (i.default.bytes(g), p(g));
  }
  t.wrapHash = v, t.crypto = (() => {
    const p = typeof self == "object" && "crypto" in self ? self.crypto : void 0, g = typeof zu == "function" && zu.bind(e);
    return {
      node: g && !p ? g("crypto") : void 0,
      web: p
    };
  })();
})(B8, Ri);
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.keccak512 = xr.keccak384 = xr.keccak256 = xr.keccak224 = void 0;
const Ii = Lt, Tf = Ri;
xr.keccak224 = (0, Tf.wrapHash)(Ii.keccak_224);
xr.keccak256 = (() => {
  const e = (0, Tf.wrapHash)(Ii.keccak_256);
  return e.create = Ii.keccak_256.create, e;
})();
xr.keccak384 = (0, Tf.wrapHash)(Ii.keccak_384);
xr.keccak512 = (0, Tf.wrapHash)(Ii.keccak_512);
var Tn = {}, Er = {}, $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.isHexString = $t.getKeys = $t.fromAscii = $t.fromUtf8 = $t.toAscii = $t.arrayContainsArray = $t.getBinarySize = $t.padToEven = $t.stripHexPrefix = $t.isHexPrefixed = void 0;
function wv(e) {
  if (typeof e != "string")
    throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof e}`);
  return e[0] === "0" && e[1] === "x";
}
$t.isHexPrefixed = wv;
const R8 = (e) => {
  if (typeof e != "string")
    throw new Error(`[stripHexPrefix] input must be type 'string', received ${typeof e}`);
  return wv(e) ? e.slice(2) : e;
};
$t.stripHexPrefix = R8;
function _v(e) {
  let t = e;
  if (typeof t != "string")
    throw new Error(`[padToEven] value must be type 'string', received ${typeof t}`);
  return t.length % 2 && (t = `0${t}`), t;
}
$t.padToEven = _v;
function I8(e) {
  if (typeof e != "string")
    throw new Error(`[getBinarySize] method requires input type 'string', recieved ${typeof e}`);
  return Buffer.byteLength(e, "utf8");
}
$t.getBinarySize = I8;
function T8(e, t, n) {
  if (Array.isArray(e) !== !0)
    throw new Error(`[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof e}'`);
  if (Array.isArray(t) !== !0)
    throw new Error(`[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof t}'`);
  return t[n === !0 ? "some" : "every"]((i) => e.indexOf(i) >= 0);
}
$t.arrayContainsArray = T8;
function P8(e) {
  let t = "", n = 0;
  const i = e.length;
  for (e.substring(0, 2) === "0x" && (n = 2); n < i; n += 2) {
    const f = parseInt(e.substr(n, 2), 16);
    t += String.fromCharCode(f);
  }
  return t;
}
$t.toAscii = P8;
function C8(e) {
  const t = Buffer.from(e, "utf8");
  return `0x${_v(t.toString("hex")).replace(/^0+|0+$/g, "")}`;
}
$t.fromUtf8 = C8;
function O8(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const f = e.charCodeAt(n).toString(16);
    t += f.length < 2 ? `0${f}` : f;
  }
  return `0x${t}`;
}
$t.fromAscii = O8;
function N8(e, t, n) {
  if (!Array.isArray(e))
    throw new Error(`[getKeys] method expects input 'params' to be an array, got ${typeof e}`);
  if (typeof t != "string")
    throw new Error(`[getKeys] method expects input 'key' to be type 'string', got ${typeof e}`);
  const i = [];
  for (let f = 0; f < e.length; f++) {
    let r = e[f][t];
    if (n === !0 && !r)
      r = "";
    else if (typeof r != "string")
      throw new Error(`invalid abi - expected type 'string', received ${typeof r}`);
    i.push(r);
  }
  return i;
}
$t.getKeys = N8;
function L8(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t < "u" && t > 0 && e.length !== 2 + 2 * t);
}
$t.isHexString = L8;
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.assertIsString = Er.assertIsArray = Er.assertIsBuffer = Er.assertIsHexString = void 0;
const $8 = $t, k8 = function(e) {
  if (!(0, $8.isHexString)(e)) {
    const t = `This method only supports 0x-prefixed hex strings but input was: ${e}`;
    throw new Error(t);
  }
};
Er.assertIsHexString = k8;
const j8 = function(e) {
  if (!Buffer.isBuffer(e)) {
    const t = `This method only supports Buffer but input was: ${e}`;
    throw new Error(t);
  }
};
Er.assertIsBuffer = j8;
const D8 = function(e) {
  if (!Array.isArray(e)) {
    const t = `This method only supports number arrays but input was: ${e}`;
    throw new Error(t);
  }
};
Er.assertIsArray = D8;
const q8 = function(e) {
  if (typeof e != "string") {
    const t = `This method only supports strings but input was: ${e}`;
    throw new Error(t);
  }
};
Er.assertIsString = q8;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.intToUnpaddedBuffer = e.bigIntToUnpaddedBuffer = e.bigIntToHex = e.bufArrToArr = e.arrToBufArr = e.validateNoLeadingZeroes = e.baToJSON = e.toUtf8 = e.short = e.addHexPrefix = e.toUnsigned = e.fromSigned = e.bufferToInt = e.bigIntToBuffer = e.bufferToBigInt = e.bufferToHex = e.toBuffer = e.unpadHexString = e.unpadArray = e.unpadBuffer = e.setLengthRight = e.setLengthLeft = e.zeros = e.intToBuffer = e.intToHex = void 0;
  const t = Er, n = $t, i = function(a) {
    if (!Number.isSafeInteger(a) || a < 0)
      throw new Error(`Received an invalid integer type: ${a}`);
    return `0x${a.toString(16)}`;
  };
  e.intToHex = i;
  const f = function(a) {
    const h = (0, e.intToHex)(a);
    return Buffer.from((0, n.padToEven)(h.slice(2)), "hex");
  };
  e.intToBuffer = f;
  const r = function(a) {
    return Buffer.allocUnsafe(a).fill(0);
  };
  e.zeros = r;
  const o = function(a, h, y) {
    const x = (0, e.zeros)(h);
    return y ? a.length < h ? (a.copy(x), x) : a.slice(0, h) : a.length < h ? (a.copy(x, h - a.length), x) : a.slice(-h);
  }, s = function(a, h) {
    return (0, t.assertIsBuffer)(a), o(a, h, !1);
  };
  e.setLengthLeft = s;
  const c = function(a, h) {
    return (0, t.assertIsBuffer)(a), o(a, h, !0);
  };
  e.setLengthRight = c;
  const l = function(a) {
    let h = a[0];
    for (; a.length > 0 && h.toString() === "0"; )
      a = a.slice(1), h = a[0];
    return a;
  }, u = function(a) {
    return (0, t.assertIsBuffer)(a), l(a);
  };
  e.unpadBuffer = u;
  const v = function(a) {
    return (0, t.assertIsArray)(a), l(a);
  };
  e.unpadArray = v;
  const p = function(a) {
    return (0, t.assertIsHexString)(a), a = (0, n.stripHexPrefix)(a), "0x" + l(a);
  };
  e.unpadHexString = p;
  const g = function(a) {
    if (a == null)
      return Buffer.allocUnsafe(0);
    if (Buffer.isBuffer(a) || Array.isArray(a) || a instanceof Uint8Array)
      return Buffer.from(a);
    if (typeof a == "string") {
      if (!(0, n.isHexString)(a))
        throw new Error(`Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${a}`);
      return Buffer.from((0, n.padToEven)((0, n.stripHexPrefix)(a)), "hex");
    }
    if (typeof a == "number")
      return (0, e.intToBuffer)(a);
    if (typeof a == "bigint") {
      if (a < BigInt(0))
        throw new Error(`Cannot convert negative bigint to buffer. Given: ${a}`);
      let h = a.toString(16);
      return h.length % 2 && (h = "0" + h), Buffer.from(h, "hex");
    }
    if (a.toArray)
      return Buffer.from(a.toArray());
    if (a.toBuffer)
      return Buffer.from(a.toBuffer());
    throw new Error("invalid type");
  };
  e.toBuffer = g;
  const w = function(a) {
    return a = (0, e.toBuffer)(a), "0x" + a.toString("hex");
  };
  e.bufferToHex = w;
  function S(a) {
    const h = (0, e.bufferToHex)(a);
    return BigInt(h === "0x" ? 0 : h);
  }
  e.bufferToBigInt = S;
  function T(a) {
    return (0, e.toBuffer)("0x" + a.toString(16));
  }
  e.bigIntToBuffer = T;
  const I = function(a) {
    const h = Number(S(a));
    if (!Number.isSafeInteger(h))
      throw new Error("Number exceeds 53 bits");
    return h;
  };
  e.bufferToInt = I;
  const C = function(a) {
    return BigInt.asIntN(256, S(a));
  };
  e.fromSigned = C;
  const N = function(a) {
    return T(BigInt.asUintN(256, a));
  };
  e.toUnsigned = N;
  const $ = function(a) {
    return typeof a != "string" || (0, n.isHexPrefixed)(a) ? a : "0x" + a;
  };
  e.addHexPrefix = $;
  function D(a, h = 50) {
    const y = Buffer.isBuffer(a) ? a.toString("hex") : a;
    return y.length <= h ? y : y.slice(0, h) + "…";
  }
  e.short = D;
  const H = function(a) {
    const h = /^(00)+|(00)+$/g;
    if (a = (0, n.stripHexPrefix)(a), a.length % 2 !== 0)
      throw new Error("Invalid non-even hex string input for toUtf8() provided");
    return Buffer.from(a.replace(h, ""), "hex").toString("utf8");
  };
  e.toUtf8 = H;
  const V = function(a) {
    if (Buffer.isBuffer(a))
      return `0x${a.toString("hex")}`;
    if (a instanceof Array) {
      const h = [];
      for (let y = 0; y < a.length; y++)
        h.push((0, e.baToJSON)(a[y]));
      return h;
    }
  };
  e.baToJSON = V;
  const ne = function(a) {
    for (const [h, y] of Object.entries(a))
      if (y !== void 0 && y.length > 0 && y[0] === 0)
        throw new Error(`${h} cannot have leading zeroes, received: ${y.toString("hex")}`);
  };
  e.validateNoLeadingZeroes = ne;
  function Q(a) {
    return Array.isArray(a) ? a.map((h) => Q(h)) : Buffer.from(a);
  }
  e.arrToBufArr = Q;
  function se(a) {
    return Array.isArray(a) ? a.map((h) => se(h)) : Uint8Array.from(a ?? []);
  }
  e.bufArrToArr = se;
  const k = (a) => "0x" + a.toString(16);
  e.bigIntToHex = k;
  function m(a) {
    return (0, e.unpadBuffer)(T(a));
  }
  e.bigIntToUnpaddedBuffer = m;
  function b(a) {
    return (0, e.unpadBuffer)((0, e.intToBuffer)(a));
  }
  e.intToUnpaddedBuffer = b;
})(Tn);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.accountBodyToRLP = e.accountBodyToSlim = e.accountBodyFromSlim = e.isZeroAddress = e.zeroAddress = e.importPublic = e.privateToAddress = e.privateToPublic = e.publicToAddress = e.pubToAddress = e.isValidPublic = e.isValidPrivate = e.generateAddress2 = e.generateAddress = e.isValidChecksumAddress = e.toChecksumAddress = e.isValidAddress = e.Account = void 0;
  const t = Hr, n = xr, i = _f, f = Ri, r = Tn, o = mf, s = Er, c = $t, l = BigInt(0);
  class u {
    /**
     * This constructor assigns and validates the values.
     * Use the static factory methods to assist in creating an Account from varying data types.
     */
    constructor(b = l, a = l, h = o.KECCAK256_RLP, y = o.KECCAK256_NULL) {
      this.nonce = b, this.balance = a, this.storageRoot = h, this.codeHash = y, this._validate();
    }
    static fromAccountData(b) {
      const { nonce: a, balance: h, storageRoot: y, codeHash: x } = b;
      return new u(a !== void 0 ? (0, r.bufferToBigInt)((0, r.toBuffer)(a)) : void 0, h !== void 0 ? (0, r.bufferToBigInt)((0, r.toBuffer)(h)) : void 0, y !== void 0 ? (0, r.toBuffer)(y) : void 0, x !== void 0 ? (0, r.toBuffer)(x) : void 0);
    }
    static fromRlpSerializedAccount(b) {
      const a = (0, r.arrToBufArr)(t.RLP.decode(Uint8Array.from(b)));
      if (!Array.isArray(a))
        throw new Error("Invalid serialized account input. Must be array");
      return this.fromValuesArray(a);
    }
    static fromValuesArray(b) {
      const [a, h, y, x] = b;
      return new u((0, r.bufferToBigInt)(a), (0, r.bufferToBigInt)(h), y, x);
    }
    _validate() {
      if (this.nonce < l)
        throw new Error("nonce must be greater than zero");
      if (this.balance < l)
        throw new Error("balance must be greater than zero");
      if (this.storageRoot.length !== 32)
        throw new Error("storageRoot must have a length of 32");
      if (this.codeHash.length !== 32)
        throw new Error("codeHash must have a length of 32");
    }
    /**
     * Returns a Buffer Array of the raw Buffers for the account, in order.
     */
    raw() {
      return [
        (0, r.bigIntToUnpaddedBuffer)(this.nonce),
        (0, r.bigIntToUnpaddedBuffer)(this.balance),
        this.storageRoot,
        this.codeHash
      ];
    }
    /**
     * Returns the RLP serialization of the account as a `Buffer`.
     */
    serialize() {
      return Buffer.from(t.RLP.encode((0, r.bufArrToArr)(this.raw())));
    }
    /**
     * Returns a `Boolean` determining if the account is a contract.
     */
    isContract() {
      return !this.codeHash.equals(o.KECCAK256_NULL);
    }
    /**
     * Returns a `Boolean` determining if the account is empty complying to the definition of
     * account emptiness in [EIP-161](https://eips.ethereum.org/EIPS/eip-161):
     * "An account is considered empty when it has no code and zero nonce and zero balance."
     */
    isEmpty() {
      return this.balance === l && this.nonce === l && this.codeHash.equals(o.KECCAK256_NULL);
    }
  }
  e.Account = u;
  const v = function(m) {
    try {
      (0, s.assertIsString)(m);
    } catch {
      return !1;
    }
    return /^0x[0-9a-fA-F]{40}$/.test(m);
  };
  e.isValidAddress = v;
  const p = function(m, b) {
    (0, s.assertIsHexString)(m);
    const a = (0, c.stripHexPrefix)(m).toLowerCase();
    let h = "";
    b !== void 0 && (h = (0, r.bufferToBigInt)((0, r.toBuffer)(b)).toString() + "0x");
    const y = Buffer.from(h + a, "utf8"), x = (0, f.bytesToHex)((0, n.keccak256)(y));
    let A = "0x";
    for (let B = 0; B < a.length; B++)
      parseInt(x[B], 16) >= 8 ? A += a[B].toUpperCase() : A += a[B];
    return A;
  };
  e.toChecksumAddress = p;
  const g = function(m, b) {
    return (0, e.isValidAddress)(m) && (0, e.toChecksumAddress)(m, b) === m;
  };
  e.isValidChecksumAddress = g;
  const w = function(m, b) {
    return (0, s.assertIsBuffer)(m), (0, s.assertIsBuffer)(b), (0, r.bufferToBigInt)(b) === BigInt(0) ? Buffer.from((0, n.keccak256)(t.RLP.encode((0, r.bufArrToArr)([m, null])))).slice(-20) : Buffer.from((0, n.keccak256)(t.RLP.encode((0, r.bufArrToArr)([m, b])))).slice(-20);
  };
  e.generateAddress = w;
  const S = function(m, b, a) {
    if ((0, s.assertIsBuffer)(m), (0, s.assertIsBuffer)(b), (0, s.assertIsBuffer)(a), m.length !== 20)
      throw new Error("Expected from to be of length 20");
    if (b.length !== 32)
      throw new Error("Expected salt to be of length 32");
    const h = (0, n.keccak256)(Buffer.concat([Buffer.from("ff", "hex"), m, b, (0, n.keccak256)(a)]));
    return (0, r.toBuffer)(h).slice(-20);
  };
  e.generateAddress2 = S;
  const T = function(m) {
    return i.utils.isValidPrivateKey(m);
  };
  e.isValidPrivate = T;
  const I = function(m, b = !1) {
    if ((0, s.assertIsBuffer)(m), m.length === 64)
      try {
        return i.Point.fromHex(Buffer.concat([Buffer.from([4]), m])), !0;
      } catch {
        return !1;
      }
    if (!b)
      return !1;
    try {
      return i.Point.fromHex(m), !0;
    } catch {
      return !1;
    }
  };
  e.isValidPublic = I;
  const C = function(m, b = !1) {
    if ((0, s.assertIsBuffer)(m), b && m.length !== 64 && (m = Buffer.from(i.Point.fromHex(m).toRawBytes(!1).slice(1))), m.length !== 64)
      throw new Error("Expected pubKey to be of length 64");
    return Buffer.from((0, n.keccak256)(m)).slice(-20);
  };
  e.pubToAddress = C, e.publicToAddress = e.pubToAddress;
  const N = function(m) {
    return (0, s.assertIsBuffer)(m), Buffer.from(i.Point.fromPrivateKey(m).toRawBytes(!1).slice(1));
  };
  e.privateToPublic = N;
  const $ = function(m) {
    return (0, e.publicToAddress)((0, e.privateToPublic)(m));
  };
  e.privateToAddress = $;
  const D = function(m) {
    return (0, s.assertIsBuffer)(m), m.length !== 64 && (m = Buffer.from(i.Point.fromHex(m).toRawBytes(!1).slice(1))), m;
  };
  e.importPublic = D;
  const H = function() {
    const b = (0, r.zeros)(20);
    return (0, r.bufferToHex)(b);
  };
  e.zeroAddress = H;
  const V = function(m) {
    try {
      (0, s.assertIsString)(m);
    } catch {
      return !1;
    }
    return (0, e.zeroAddress)() === m;
  };
  e.isZeroAddress = V;
  function ne(m) {
    const [b, a, h, y] = m;
    return [
      b,
      a,
      (0, r.arrToBufArr)(h).length === 0 ? o.KECCAK256_RLP : h,
      (0, r.arrToBufArr)(y).length === 0 ? o.KECCAK256_NULL : y
    ];
  }
  e.accountBodyFromSlim = ne;
  const Q = new Uint8Array(0);
  function se(m) {
    const [b, a, h, y] = m;
    return [
      b,
      a,
      (0, r.arrToBufArr)(h).equals(o.KECCAK256_RLP) ? Q : h,
      (0, r.arrToBufArr)(y).equals(o.KECCAK256_NULL) ? Q : y
    ];
  }
  e.accountBodyToSlim = se;
  function k(m, b = !0) {
    const a = b ? ne(m) : m;
    return (0, r.arrToBufArr)(t.RLP.encode(a));
  }
  e.accountBodyToRLP = k;
})(Hc);
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.Address = void 0;
const pi = Hc, ca = Tn;
class Jr {
  constructor(t) {
    if (t.length !== 20)
      throw new Error("Invalid address length");
    this.buf = t;
  }
  /**
   * Returns the zero address.
   */
  static zero() {
    return new Jr((0, ca.zeros)(20));
  }
  /**
   * Returns an Address object from a hex-encoded string.
   * @param str - Hex-encoded address
   */
  static fromString(t) {
    if (!(0, pi.isValidAddress)(t))
      throw new Error("Invalid address");
    return new Jr((0, ca.toBuffer)(t));
  }
  /**
   * Returns an address for a given public key.
   * @param pubKey The two points of an uncompressed key
   */
  static fromPublicKey(t) {
    if (!Buffer.isBuffer(t))
      throw new Error("Public key should be Buffer");
    const n = (0, pi.pubToAddress)(t);
    return new Jr(n);
  }
  /**
   * Returns an address for a given private key.
   * @param privateKey A private key must be 256 bits wide
   */
  static fromPrivateKey(t) {
    if (!Buffer.isBuffer(t))
      throw new Error("Private key should be Buffer");
    const n = (0, pi.privateToAddress)(t);
    return new Jr(n);
  }
  /**
   * Generates an address for a newly created contract.
   * @param from The address which is creating this new address
   * @param nonce The nonce of the from account
   */
  static generate(t, n) {
    if (typeof n != "bigint")
      throw new Error("Expected nonce to be a bigint");
    return new Jr((0, pi.generateAddress)(t.buf, (0, ca.bigIntToBuffer)(n)));
  }
  /**
   * Generates an address for a contract created using CREATE2.
   * @param from The address which is creating this new address
   * @param salt A salt
   * @param initCode The init code of the contract being created
   */
  static generate2(t, n, i) {
    if (!Buffer.isBuffer(n))
      throw new Error("Expected salt to be a Buffer");
    if (!Buffer.isBuffer(i))
      throw new Error("Expected initCode to be a Buffer");
    return new Jr((0, pi.generateAddress2)(t.buf, n, i));
  }
  /**
   * Is address equal to another.
   */
  equals(t) {
    return this.buf.equals(t.buf);
  }
  /**
   * Is address zero.
   */
  isZero() {
    return this.equals(Jr.zero());
  }
  /**
   * True if address is in the address range defined
   * by EIP-1352
   */
  isPrecompileOrSystemAddress() {
    const t = (0, ca.bufferToBigInt)(this.buf), n = BigInt(0), i = BigInt("0xffff");
    return t >= n && t <= i;
  }
  /**
   * Returns hex encoding of address.
   */
  toString() {
    return "0x" + this.buf.toString("hex");
  }
  /**
   * Returns Buffer representation of address.
   */
  toBuffer() {
    return Buffer.from(this.buf);
  }
}
Gi.Address = Jr;
var Pf = {}, Vc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.toType = e.TypeOutput = void 0;
  const t = Tn, n = $t;
  var i;
  (function(r) {
    r[r.Number = 0] = "Number", r[r.BigInt = 1] = "BigInt", r[r.Buffer = 2] = "Buffer", r[r.PrefixedHexString = 3] = "PrefixedHexString";
  })(i = e.TypeOutput || (e.TypeOutput = {}));
  function f(r, o) {
    if (r === null)
      return null;
    if (r === void 0)
      return;
    if (typeof r == "string" && !(0, n.isHexString)(r))
      throw new Error(`A string must be provided with a 0x-prefix, given: ${r}`);
    if (typeof r == "number" && !Number.isSafeInteger(r))
      throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");
    const s = (0, t.toBuffer)(r);
    switch (o) {
      case i.Buffer:
        return s;
      case i.BigInt:
        return (0, t.bufferToBigInt)(s);
      case i.Number: {
        const c = (0, t.bufferToBigInt)(s);
        if (c > BigInt(Number.MAX_SAFE_INTEGER))
          throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)");
        return Number(c);
      }
      case i.PrefixedHexString:
        return (0, t.bufferToHex)(s);
      default:
        throw new Error("unknown outputType");
    }
  }
  e.toType = f;
})(Vc);
Object.defineProperty(Pf, "__esModule", { value: !0 });
Pf.Withdrawal = void 0;
const Qd = Gi, Cu = Tn, Ut = Vc;
class _i {
  /**
   * This constructor assigns and validates the values.
   * Use the static factory methods to assist in creating a Withdrawal object from varying data types.
   */
  constructor(t, n, i, f) {
    this.index = t, this.validatorIndex = n, this.address = i, this.amount = f;
  }
  static fromWithdrawalData(t) {
    const { index: n, validatorIndex: i, address: f, amount: r } = t, o = (0, Ut.toType)(n, Ut.TypeOutput.BigInt), s = (0, Ut.toType)(i, Ut.TypeOutput.BigInt), c = new Qd.Address((0, Ut.toType)(f, Ut.TypeOutput.Buffer)), l = (0, Ut.toType)(r, Ut.TypeOutput.BigInt);
    return new _i(o, s, c, l);
  }
  static fromValuesArray(t) {
    if (t.length !== 4)
      throw Error(`Invalid withdrawalArray length expected=4 actual=${t.length}`);
    const [n, i, f, r] = t;
    return _i.fromWithdrawalData({ index: n, validatorIndex: i, address: f, amount: r });
  }
  /**
   * Convert a withdrawal to a buffer array
   * @param withdrawal the withdrawal to convert
   * @returns buffer array of the withdrawal
   */
  static toBufferArray(t) {
    const { index: n, validatorIndex: i, address: f, amount: r } = t, o = (0, Ut.toType)(n, Ut.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, Ut.toType)(n, Ut.TypeOutput.Buffer), s = (0, Ut.toType)(i, Ut.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, Ut.toType)(i, Ut.TypeOutput.Buffer);
    let c;
    f instanceof Qd.Address ? c = f.buf : c = (0, Ut.toType)(f, Ut.TypeOutput.Buffer);
    const l = (0, Ut.toType)(r, Ut.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, Ut.toType)(r, Ut.TypeOutput.Buffer);
    return [o, s, c, l];
  }
  raw() {
    return _i.toBufferArray(this);
  }
  toJSON() {
    return {
      index: (0, Cu.bigIntToHex)(this.index),
      validatorIndex: (0, Cu.bigIntToHex)(this.validatorIndex),
      address: "0x" + this.address.buf.toString("hex"),
      amount: (0, Cu.bigIntToHex)(this.amount)
    };
  }
}
Pf.Withdrawal = _i;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.hashPersonalMessage = nr.isValidSignature = nr.fromRpcSig = nr.toCompactSig = nr.toRpcSig = nr.ecrecover = nr.ecsign = void 0;
const U8 = xr, xv = _f, fr = Tn, Ou = mf, F8 = Er;
function H8(e, t, n) {
  const [i, f] = (0, xv.signSync)(e, t, { recovered: !0, der: !1 }), r = Buffer.from(i.slice(0, 32)), o = Buffer.from(i.slice(32, 64)), s = n === void 0 ? BigInt(f + 27) : BigInt(f + 35) + BigInt(n) * BigInt(2);
  return { r, s: o, v: s };
}
nr.ecsign = H8;
function Cf(e, t) {
  return e === BigInt(0) || e === BigInt(1) ? e : t === void 0 ? e - BigInt(27) : e - (t * BigInt(2) + BigInt(35));
}
function Of(e) {
  return e === BigInt(0) || e === BigInt(1);
}
const z8 = function(e, t, n, i, f) {
  const r = Buffer.concat([(0, fr.setLengthLeft)(n, 32), (0, fr.setLengthLeft)(i, 32)], 64), o = Cf(t, f);
  if (!Of(o))
    throw new Error("Invalid signature v value");
  const s = (0, xv.recoverPublicKey)(e, r, Number(o));
  return Buffer.from(s.slice(1));
};
nr.ecrecover = z8;
const V8 = function(e, t, n, i) {
  const f = Cf(e, i);
  if (!Of(f))
    throw new Error("Invalid signature v value");
  return (0, fr.bufferToHex)(Buffer.concat([(0, fr.setLengthLeft)(t, 32), (0, fr.setLengthLeft)(n, 32), (0, fr.toBuffer)(e)]));
};
nr.toRpcSig = V8;
const K8 = function(e, t, n, i) {
  const f = Cf(e, i);
  if (!Of(f))
    throw new Error("Invalid signature v value");
  let r = n;
  return (e > BigInt(28) && e % BigInt(2) === BigInt(1) || e === BigInt(1) || e === BigInt(28)) && (r = Buffer.from(n), r[0] |= 128), (0, fr.bufferToHex)(Buffer.concat([(0, fr.setLengthLeft)(t, 32), (0, fr.setLengthLeft)(r, 32)]));
};
nr.toCompactSig = K8;
const G8 = function(e) {
  const t = (0, fr.toBuffer)(e);
  let n, i, f;
  if (t.length >= 65)
    n = t.slice(0, 32), i = t.slice(32, 64), f = (0, fr.bufferToBigInt)(t.slice(64));
  else if (t.length === 64)
    n = t.slice(0, 32), i = t.slice(32, 64), f = BigInt((0, fr.bufferToInt)(t.slice(32, 33)) >> 7), i[0] &= 127;
  else
    throw new Error("Invalid signature length");
  return f < 27 && (f = f + BigInt(27)), {
    v: f,
    r: n,
    s: i
  };
};
nr.fromRpcSig = G8;
const W8 = function(e, t, n, i = !0, f) {
  if (t.length !== 32 || n.length !== 32 || !Of(Cf(e, f)))
    return !1;
  const r = (0, fr.bufferToBigInt)(t), o = (0, fr.bufferToBigInt)(n);
  return !(r === BigInt(0) || r >= Ou.SECP256K1_ORDER || o === BigInt(0) || o >= Ou.SECP256K1_ORDER || i && o >= Ou.SECP256K1_ORDER_DIV_2);
};
nr.isValidSignature = W8;
const J8 = function(e) {
  (0, F8.assertIsBuffer)(e);
  const t = Buffer.from(`Ethereum Signed Message:
${e.length}`, "utf-8");
  return Buffer.from((0, U8.keccak256)(Buffer.concat([t, e])));
};
nr.hashPersonalMessage = J8;
var Nf = {};
function Ev(e, ...t) {
  return (...n) => e(...t, ...n);
}
function Wi(e) {
  return function(...t) {
    var n = t.pop();
    return e.call(this, t, n);
  };
}
var X8 = typeof queueMicrotask == "function" && queueMicrotask, Sv = typeof setImmediate == "function" && setImmediate, Mv = typeof process == "object" && typeof process.nextTick == "function";
function Av(e) {
  setTimeout(e, 0);
}
function Bv(e) {
  return (t, ...n) => e(() => t(...n));
}
var vi;
X8 ? vi = queueMicrotask : Sv ? vi = setImmediate : Mv ? vi = process.nextTick : vi = Av;
var fn = Bv(vi);
function Ti(e) {
  return Ji(e) ? function(...t) {
    const n = t.pop(), i = e.apply(this, t);
    return e1(i, n);
  } : Wi(function(t, n) {
    var i;
    try {
      i = e.apply(this, t);
    } catch (f) {
      return n(f);
    }
    if (i && typeof i.then == "function")
      return e1(i, n);
    n(null, i);
  });
}
function e1(e, t) {
  return e.then((n) => {
    t1(t, null, n);
  }, (n) => {
    t1(t, n && n.message ? n : new Error(n));
  });
}
function t1(e, t, n) {
  try {
    e(t, n);
  } catch (i) {
    fn((f) => {
      throw f;
    }, i);
  }
}
function Ji(e) {
  return e[Symbol.toStringTag] === "AsyncFunction";
}
function Z8(e) {
  return e[Symbol.toStringTag] === "AsyncGenerator";
}
function Y8(e) {
  return typeof e[Symbol.asyncIterator] == "function";
}
function wt(e) {
  if (typeof e != "function")
    throw new Error("expected a function");
  return Ji(e) ? Ti(e) : e;
}
function mt(e, t = e.length) {
  if (!t)
    throw new Error("arity is undefined");
  function n(...i) {
    return typeof i[t - 1] == "function" ? e.apply(this, i) : new Promise((f, r) => {
      i[t - 1] = (o, ...s) => {
        if (o)
          return r(o);
        f(s.length > 1 ? s : s[0]);
      }, e.apply(this, i);
    });
  }
  return n;
}
function Rv(e) {
  return function(n, ...i) {
    return mt(function(r) {
      var o = this;
      return e(n, (s, c) => {
        wt(s).apply(o, i.concat(c));
      }, r);
    });
  };
}
function Kc(e, t, n, i) {
  t = t || [];
  var f = [], r = 0, o = wt(n);
  return e(t, (s, c, l) => {
    var u = r++;
    o(s, (v, p) => {
      f[u] = p, l(v);
    });
  }, (s) => {
    i(s, f);
  });
}
function Lf(e) {
  return e && typeof e.length == "number" && e.length >= 0 && e.length % 1 === 0;
}
const $f = {};
function dn(e) {
  function t(...n) {
    if (e !== null) {
      var i = e;
      e = null, i.apply(this, n);
    }
  }
  return Object.assign(t, e), t;
}
function Q8(e) {
  return e[Symbol.iterator] && e[Symbol.iterator]();
}
function e5(e) {
  var t = -1, n = e.length;
  return function() {
    return ++t < n ? { value: e[t], key: t } : null;
  };
}
function t5(e) {
  var t = -1;
  return function() {
    var i = e.next();
    return i.done ? null : (t++, { value: i.value, key: t });
  };
}
function r5(e) {
  var t = e ? Object.keys(e) : [], n = -1, i = t.length;
  return function f() {
    var r = t[++n];
    return r === "__proto__" ? f() : n < i ? { value: e[r], key: r } : null;
  };
}
function n5(e) {
  if (Lf(e))
    return e5(e);
  var t = Q8(e);
  return t ? t5(t) : r5(e);
}
function pn(e) {
  return function(...t) {
    if (e === null)
      throw new Error("Callback was already called.");
    var n = e;
    e = null, n.apply(this, t);
  };
}
function r1(e, t, n, i) {
  let f = !1, r = !1, o = !1, s = 0, c = 0;
  function l() {
    s >= t || o || f || (o = !0, e.next().then(({ value: p, done: g }) => {
      if (!(r || f)) {
        if (o = !1, g) {
          f = !0, s <= 0 && i(null);
          return;
        }
        s++, n(p, c, u), c++, l();
      }
    }).catch(v));
  }
  function u(p, g) {
    if (s -= 1, !r) {
      if (p)
        return v(p);
      if (p === !1) {
        f = !0, r = !0;
        return;
      }
      if (g === $f || f && s <= 0)
        return f = !0, i(null);
      l();
    }
  }
  function v(p) {
    r || (o = !1, f = !0, i(p));
  }
  l();
}
var Lr = (e) => (t, n, i) => {
  if (i = dn(i), e <= 0)
    throw new RangeError("concurrency limit cannot be less than 1");
  if (!t)
    return i(null);
  if (Z8(t))
    return r1(t, e, n, i);
  if (Y8(t))
    return r1(t[Symbol.asyncIterator](), e, n, i);
  var f = n5(t), r = !1, o = !1, s = 0, c = !1;
  function l(v, p) {
    if (!o)
      if (s -= 1, v)
        r = !0, i(v);
      else if (v === !1)
        r = !0, o = !0;
      else {
        if (p === $f || r && s <= 0)
          return r = !0, i(null);
        c || u();
      }
  }
  function u() {
    for (c = !0; s < e && !r; ) {
      var v = f();
      if (v === null) {
        r = !0, s <= 0 && i(null);
        return;
      }
      s += 1, n(v.value, v.key, pn(l));
    }
    c = !1;
  }
  u();
};
function i5(e, t, n, i) {
  return Lr(t)(e, wt(n), i);
}
var Yn = mt(i5, 4);
function a5(e, t, n) {
  n = dn(n);
  var i = 0, f = 0, { length: r } = e, o = !1;
  r === 0 && n(null);
  function s(c, l) {
    c === !1 && (o = !0), o !== !0 && (c ? n(c) : (++f === r || l === $f) && n(null));
  }
  for (; i < r; i++)
    t(e[i], i, pn(s));
}
function f5(e, t, n) {
  return Yn(e, 1 / 0, t, n);
}
function o5(e, t, n) {
  var i = Lf(e) ? a5 : f5;
  return i(e, wt(t), n);
}
var hr = mt(o5, 3);
function s5(e, t, n) {
  return Kc(hr, e, t, n);
}
var kf = mt(s5, 3), Iv = Rv(kf);
function u5(e, t, n) {
  return Yn(e, 1, t, n);
}
var Pr = mt(u5, 3);
function c5(e, t, n) {
  return Kc(Pr, e, t, n);
}
var Gc = mt(c5, 3), Tv = Rv(Gc);
const si = Symbol("promiseCallback");
function Qn() {
  let e, t;
  function n(i, ...f) {
    if (i)
      return t(i);
    e(f.length > 1 ? f : f[0]);
  }
  return n[si] = new Promise((i, f) => {
    e = i, t = f;
  }), n;
}
function Wc(e, t, n) {
  typeof t != "number" && (n = t, t = null), n = dn(n || Qn());
  var i = Object.keys(e).length;
  if (!i)
    return n(null);
  t || (t = i);
  var f = {}, r = 0, o = !1, s = !1, c = /* @__PURE__ */ Object.create(null), l = [], u = [], v = {};
  Object.keys(e).forEach((N) => {
    var $ = e[N];
    if (!Array.isArray($)) {
      p(N, [$]), u.push(N);
      return;
    }
    var D = $.slice(0, $.length - 1), H = D.length;
    if (H === 0) {
      p(N, $), u.push(N);
      return;
    }
    v[N] = H, D.forEach((V) => {
      if (!e[V])
        throw new Error("async.auto task `" + N + "` has a non-existent dependency `" + V + "` in " + D.join(", "));
      w(V, () => {
        H--, H === 0 && p(N, $);
      });
    });
  }), I(), g();
  function p(N, $) {
    l.push(() => T(N, $));
  }
  function g() {
    if (!o) {
      if (l.length === 0 && r === 0)
        return n(null, f);
      for (; l.length && r < t; ) {
        var N = l.shift();
        N();
      }
    }
  }
  function w(N, $) {
    var D = c[N];
    D || (D = c[N] = []), D.push($);
  }
  function S(N) {
    var $ = c[N] || [];
    $.forEach((D) => D()), g();
  }
  function T(N, $) {
    if (!s) {
      var D = pn((V, ...ne) => {
        if (r--, V === !1) {
          o = !0;
          return;
        }
        if (ne.length < 2 && ([ne] = ne), V) {
          var Q = {};
          if (Object.keys(f).forEach((se) => {
            Q[se] = f[se];
          }), Q[N] = ne, s = !0, c = /* @__PURE__ */ Object.create(null), o)
            return;
          n(V, Q);
        } else
          f[N] = ne, S(N);
      });
      r++;
      var H = wt($[$.length - 1]);
      $.length > 1 ? H(f, D) : H(D);
    }
  }
  function I() {
    for (var N, $ = 0; u.length; )
      N = u.pop(), $++, C(N).forEach((D) => {
        --v[D] === 0 && u.push(D);
      });
    if ($ !== i)
      throw new Error(
        "async.auto cannot execute tasks due to a recursive dependency"
      );
  }
  function C(N) {
    var $ = [];
    return Object.keys(e).forEach((D) => {
      const H = e[D];
      Array.isArray(H) && H.indexOf(N) >= 0 && $.push(D);
    }), $;
  }
  return n[si];
}
var h5 = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/, l5 = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/, d5 = /,/, p5 = /(=.+)?(\s*)$/;
function v5(e) {
  let t = "", n = 0, i = e.indexOf("*/");
  for (; n < e.length; )
    if (e[n] === "/" && e[n + 1] === "/") {
      let f = e.indexOf(`
`, n);
      n = f === -1 ? e.length : f;
    } else if (i !== -1 && e[n] === "/" && e[n + 1] === "*") {
      let f = e.indexOf("*/", n);
      f !== -1 ? (n = f + 2, i = e.indexOf("*/", n)) : (t += e[n], n++);
    } else
      t += e[n], n++;
  return t;
}
function b5(e) {
  const t = v5(e.toString());
  let n = t.match(h5);
  if (n || (n = t.match(l5)), !n)
    throw new Error(`could not parse args in autoInject
Source:
` + t);
  let [, i] = n;
  return i.replace(/\s/g, "").split(d5).map((f) => f.replace(p5, "").trim());
}
function Pv(e, t) {
  var n = {};
  return Object.keys(e).forEach((i) => {
    var f = e[i], r, o = Ji(f), s = !o && f.length === 1 || o && f.length === 0;
    if (Array.isArray(f))
      r = [...f], f = r.pop(), n[i] = r.concat(r.length > 0 ? c : f);
    else if (s)
      n[i] = f;
    else {
      if (r = b5(f), f.length === 0 && !o && r.length === 0)
        throw new Error("autoInject task functions require explicit parameters.");
      o || r.pop(), n[i] = r.concat(c);
    }
    function c(l, u) {
      var v = r.map((p) => l[p]);
      v.push(u), wt(f)(...v);
    }
  }), Wc(n, t);
}
class y5 {
  constructor() {
    this.head = this.tail = null, this.length = 0;
  }
  removeLink(t) {
    return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, t.prev = t.next = null, this.length -= 1, t;
  }
  empty() {
    for (; this.head; )
      this.shift();
    return this;
  }
  insertAfter(t, n) {
    n.prev = t, n.next = t.next, t.next ? t.next.prev = n : this.tail = n, t.next = n, this.length += 1;
  }
  insertBefore(t, n) {
    n.prev = t.prev, n.next = t, t.prev ? t.prev.next = n : this.head = n, t.prev = n, this.length += 1;
  }
  unshift(t) {
    this.head ? this.insertBefore(this.head, t) : n1(this, t);
  }
  push(t) {
    this.tail ? this.insertAfter(this.tail, t) : n1(this, t);
  }
  shift() {
    return this.head && this.removeLink(this.head);
  }
  pop() {
    return this.tail && this.removeLink(this.tail);
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    for (var t = this.head; t; )
      yield t.data, t = t.next;
  }
  remove(t) {
    for (var n = this.head; n; ) {
      var { next: i } = n;
      t(n) && this.removeLink(n), n = i;
    }
    return this;
  }
}
function n1(e, t) {
  e.length = 1, e.head = e.tail = t;
}
function Jc(e, t, n) {
  if (t == null)
    t = 1;
  else if (t === 0)
    throw new RangeError("Concurrency must not be zero");
  var i = wt(e), f = 0, r = [];
  const o = {
    error: [],
    drain: [],
    saturated: [],
    unsaturated: [],
    empty: []
  };
  function s(C, N) {
    o[C].push(N);
  }
  function c(C, N) {
    const $ = (...D) => {
      l(C, $), N(...D);
    };
    o[C].push($);
  }
  function l(C, N) {
    if (!C)
      return Object.keys(o).forEach(($) => o[$] = []);
    if (!N)
      return o[C] = [];
    o[C] = o[C].filter(($) => $ !== N);
  }
  function u(C, ...N) {
    o[C].forEach(($) => $(...N));
  }
  var v = !1;
  function p(C, N, $, D) {
    if (D != null && typeof D != "function")
      throw new Error("task callback must be a function");
    I.started = !0;
    var H, V;
    function ne(se, ...k) {
      if (se)
        return $ ? V(se) : H();
      if (k.length <= 1)
        return H(k[0]);
      H(k);
    }
    var Q = I._createTaskItem(
      C,
      $ ? ne : D || ne
    );
    if (N ? I._tasks.unshift(Q) : I._tasks.push(Q), v || (v = !0, fn(() => {
      v = !1, I.process();
    })), $ || !D)
      return new Promise((se, k) => {
        H = se, V = k;
      });
  }
  function g(C) {
    return function(N, ...$) {
      f -= 1;
      for (var D = 0, H = C.length; D < H; D++) {
        var V = C[D], ne = r.indexOf(V);
        ne === 0 ? r.shift() : ne > 0 && r.splice(ne, 1), V.callback(N, ...$), N != null && u("error", N, V.data);
      }
      f <= I.concurrency - I.buffer && u("unsaturated"), I.idle() && u("drain"), I.process();
    };
  }
  function w(C) {
    return C.length === 0 && I.idle() ? (fn(() => u("drain")), !0) : !1;
  }
  const S = (C) => (N) => {
    if (!N)
      return new Promise(($, D) => {
        c(C, (H, V) => {
          if (H)
            return D(H);
          $(V);
        });
      });
    l(C), s(C, N);
  };
  var T = !1, I = {
    _tasks: new y5(),
    _createTaskItem(C, N) {
      return {
        data: C,
        callback: N
      };
    },
    *[Symbol.iterator]() {
      yield* I._tasks[Symbol.iterator]();
    },
    concurrency: t,
    payload: n,
    buffer: t / 4,
    started: !1,
    paused: !1,
    push(C, N) {
      return Array.isArray(C) ? w(C) ? void 0 : C.map(($) => p($, !1, !1, N)) : p(C, !1, !1, N);
    },
    pushAsync(C, N) {
      return Array.isArray(C) ? w(C) ? void 0 : C.map(($) => p($, !1, !0, N)) : p(C, !1, !0, N);
    },
    kill() {
      l(), I._tasks.empty();
    },
    unshift(C, N) {
      return Array.isArray(C) ? w(C) ? void 0 : C.map(($) => p($, !0, !1, N)) : p(C, !0, !1, N);
    },
    unshiftAsync(C, N) {
      return Array.isArray(C) ? w(C) ? void 0 : C.map(($) => p($, !0, !0, N)) : p(C, !0, !0, N);
    },
    remove(C) {
      I._tasks.remove(C);
    },
    process() {
      if (!T) {
        for (T = !0; !I.paused && f < I.concurrency && I._tasks.length; ) {
          var C = [], N = [], $ = I._tasks.length;
          I.payload && ($ = Math.min($, I.payload));
          for (var D = 0; D < $; D++) {
            var H = I._tasks.shift();
            C.push(H), r.push(H), N.push(H.data);
          }
          f += 1, I._tasks.length === 0 && u("empty"), f === I.concurrency && u("saturated");
          var V = pn(g(C));
          i(N, V);
        }
        T = !1;
      }
    },
    length() {
      return I._tasks.length;
    },
    running() {
      return f;
    },
    workersList() {
      return r;
    },
    idle() {
      return I._tasks.length + f === 0;
    },
    pause() {
      I.paused = !0;
    },
    resume() {
      I.paused !== !1 && (I.paused = !1, fn(I.process));
    }
  };
  return Object.defineProperties(I, {
    saturated: {
      writable: !1,
      value: S("saturated")
    },
    unsaturated: {
      writable: !1,
      value: S("unsaturated")
    },
    empty: {
      writable: !1,
      value: S("empty")
    },
    drain: {
      writable: !1,
      value: S("drain")
    },
    error: {
      writable: !1,
      value: S("error")
    }
  }), I;
}
function Cv(e, t) {
  return Jc(e, 1, t);
}
function Ov(e, t, n) {
  return Jc(e, t, n);
}
function g5(e, t, n, i) {
  i = dn(i);
  var f = wt(n);
  return Pr(e, (r, o, s) => {
    f(t, r, (c, l) => {
      t = l, s(c);
    });
  }, (r) => i(r, t));
}
var on = mt(g5, 4);
function Xc(...e) {
  var t = e.map(wt);
  return function(...n) {
    var i = this, f = n[n.length - 1];
    return typeof f == "function" ? n.pop() : f = Qn(), on(
      t,
      n,
      (r, o, s) => {
        o.apply(i, r.concat((c, ...l) => {
          s(c, l);
        }));
      },
      (r, o) => f(r, ...o)
    ), f[si];
  };
}
function Nv(...e) {
  return Xc(...e.reverse());
}
function m5(e, t, n, i) {
  return Kc(Lr(t), e, n, i);
}
var Xi = mt(m5, 4);
function w5(e, t, n, i) {
  var f = wt(n);
  return Xi(e, t, (r, o) => {
    f(r, (s, ...c) => s ? o(s) : o(s, c));
  }, (r, o) => {
    for (var s = [], c = 0; c < o.length; c++)
      o[c] && (s = s.concat(...o[c]));
    return i(r, s);
  });
}
var ei = mt(w5, 4);
function _5(e, t, n) {
  return ei(e, 1 / 0, t, n);
}
var Ia = mt(_5, 3);
function x5(e, t, n) {
  return ei(e, 1, t, n);
}
var Ta = mt(x5, 3);
function Lv(...e) {
  return function(...t) {
    var n = t.pop();
    return n(null, ...e);
  };
}
function Qr(e, t) {
  return (n, i, f, r) => {
    var o = !1, s;
    const c = wt(f);
    n(i, (l, u, v) => {
      c(l, (p, g) => {
        if (p || p === !1)
          return v(p);
        if (e(g) && !s)
          return o = !0, s = t(!0, l), v(null, $f);
        v();
      });
    }, (l) => {
      if (l)
        return r(l);
      r(null, o ? s : t(!1));
    });
  };
}
function E5(e, t, n) {
  return Qr((i) => i, (i, f) => f)(hr, e, t, n);
}
var Pa = mt(E5, 3);
function S5(e, t, n, i) {
  return Qr((f) => f, (f, r) => r)(Lr(t), e, n, i);
}
var Ca = mt(S5, 4);
function M5(e, t, n) {
  return Qr((i) => i, (i, f) => f)(Lr(1), e, t, n);
}
var Oa = mt(M5, 3);
function $v(e) {
  return (t, ...n) => wt(t)(...n, (i, ...f) => {
    typeof console == "object" && (i ? console.error && console.error(i) : console[e] && f.forEach((r) => console[e](r)));
  });
}
var kv = $v("dir");
function A5(e, t, n) {
  n = pn(n);
  var i = wt(e), f = wt(t), r;
  function o(c, ...l) {
    if (c)
      return n(c);
    c !== !1 && (r = l, f(...l, s));
  }
  function s(c, l) {
    if (c)
      return n(c);
    if (c !== !1) {
      if (!l)
        return n(null, ...r);
      i(o);
    }
  }
  return s(null, !0);
}
var Pi = mt(A5, 3);
function jv(e, t, n) {
  const i = wt(t);
  return Pi(e, (...f) => {
    const r = f.pop();
    i(...f, (o, s) => r(o, !s));
  }, n);
}
function Dv(e) {
  return (t, n, i) => e(t, i);
}
function B5(e, t, n) {
  return hr(e, Dv(wt(t)), n);
}
var Na = mt(B5, 3);
function R5(e, t, n, i) {
  return Lr(t)(e, Dv(wt(n)), i);
}
var Ci = mt(R5, 4);
function I5(e, t, n) {
  return Ci(e, 1, t, n);
}
var Oi = mt(I5, 3);
function Zc(e) {
  return Ji(e) ? e : function(...t) {
    var n = t.pop(), i = !0;
    t.push((...f) => {
      i ? fn(() => n(...f)) : n(...f);
    }), e.apply(this, t), i = !1;
  };
}
function T5(e, t, n) {
  return Qr((i) => !i, (i) => !i)(hr, e, t, n);
}
var La = mt(T5, 3);
function P5(e, t, n, i) {
  return Qr((f) => !f, (f) => !f)(Lr(t), e, n, i);
}
var $a = mt(P5, 4);
function C5(e, t, n) {
  return Qr((i) => !i, (i) => !i)(Pr, e, t, n);
}
var ka = mt(C5, 3);
function O5(e, t, n, i) {
  var f = new Array(t.length);
  e(t, (r, o, s) => {
    n(r, (c, l) => {
      f[o] = !!l, s(c);
    });
  }, (r) => {
    if (r)
      return i(r);
    for (var o = [], s = 0; s < t.length; s++)
      f[s] && o.push(t[s]);
    i(null, o);
  });
}
function N5(e, t, n, i) {
  var f = [];
  e(t, (r, o, s) => {
    n(r, (c, l) => {
      if (c)
        return s(c);
      l && f.push({ index: o, value: r }), s(c);
    });
  }, (r) => {
    if (r)
      return i(r);
    i(null, f.sort((o, s) => o.index - s.index).map((o) => o.value));
  });
}
function jf(e, t, n, i) {
  var f = Lf(t) ? O5 : N5;
  return f(e, t, wt(n), i);
}
function L5(e, t, n) {
  return jf(hr, e, t, n);
}
var ja = mt(L5, 3);
function $5(e, t, n, i) {
  return jf(Lr(t), e, n, i);
}
var Da = mt($5, 4);
function k5(e, t, n) {
  return jf(Pr, e, t, n);
}
var qa = mt(k5, 3);
function j5(e, t) {
  var n = pn(t), i = wt(Zc(e));
  function f(r) {
    if (r)
      return n(r);
    r !== !1 && i(f);
  }
  return f();
}
var qv = mt(j5, 2);
function D5(e, t, n, i) {
  var f = wt(n);
  return Xi(e, t, (r, o) => {
    f(r, (s, c) => s ? o(s) : o(s, { key: c, val: r }));
  }, (r, o) => {
    for (var s = {}, { hasOwnProperty: c } = Object.prototype, l = 0; l < o.length; l++)
      if (o[l]) {
        var { key: u } = o[l], { val: v } = o[l];
        c.call(s, u) ? s[u].push(v) : s[u] = [v];
      }
    return i(r, s);
  });
}
var Df = mt(D5, 4);
function Uv(e, t, n) {
  return Df(e, 1 / 0, t, n);
}
function Fv(e, t, n) {
  return Df(e, 1, t, n);
}
var Hv = $v("log");
function q5(e, t, n, i) {
  i = dn(i);
  var f = {}, r = wt(n);
  return Lr(t)(e, (o, s, c) => {
    r(o, s, (l, u) => {
      if (l)
        return c(l);
      f[s] = u, c(l);
    });
  }, (o) => i(o, f));
}
var qf = mt(q5, 4);
function zv(e, t, n) {
  return qf(e, 1 / 0, t, n);
}
function Vv(e, t, n) {
  return qf(e, 1, t, n);
}
function Kv(e, t = (n) => n) {
  var n = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), f = wt(e), r = Wi((o, s) => {
    var c = t(...o);
    c in n ? fn(() => s(null, ...n[c])) : c in i ? i[c].push(s) : (i[c] = [s], f(...o, (l, ...u) => {
      l || (n[c] = u);
      var v = i[c];
      delete i[c];
      for (var p = 0, g = v.length; p < g; p++)
        v[p](l, ...u);
    }));
  });
  return r.memo = n, r.unmemoized = e, r;
}
var pa;
Mv ? pa = process.nextTick : Sv ? pa = setImmediate : pa = Av;
var Gv = Bv(pa), Yc = mt((e, t, n) => {
  var i = Lf(t) ? [] : {};
  e(t, (f, r, o) => {
    wt(f)((s, ...c) => {
      c.length < 2 && ([c] = c), i[r] = c, o(s);
    });
  }, (f) => n(f, i));
}, 3);
function Wv(e, t) {
  return Yc(hr, e, t);
}
function Jv(e, t, n) {
  return Yc(Lr(t), e, n);
}
function Qc(e, t) {
  var n = wt(e);
  return Jc((i, f) => {
    n(i[0], f);
  }, t, 1);
}
class U5 {
  constructor() {
    this.heap = [], this.pushCount = Number.MIN_SAFE_INTEGER;
  }
  get length() {
    return this.heap.length;
  }
  empty() {
    return this.heap = [], this;
  }
  percUp(t) {
    let n;
    for (; t > 0 && Nu(this.heap[t], this.heap[n = i1(t)]); ) {
      let i = this.heap[t];
      this.heap[t] = this.heap[n], this.heap[n] = i, t = n;
    }
  }
  percDown(t) {
    let n;
    for (; (n = F5(t)) < this.heap.length && (n + 1 < this.heap.length && Nu(this.heap[n + 1], this.heap[n]) && (n = n + 1), !Nu(this.heap[t], this.heap[n])); ) {
      let i = this.heap[t];
      this.heap[t] = this.heap[n], this.heap[n] = i, t = n;
    }
  }
  push(t) {
    t.pushCount = ++this.pushCount, this.heap.push(t), this.percUp(this.heap.length - 1);
  }
  unshift(t) {
    return this.heap.push(t);
  }
  shift() {
    let [t] = this.heap;
    return this.heap[0] = this.heap[this.heap.length - 1], this.heap.pop(), this.percDown(0), t;
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    for (let t = 0; t < this.heap.length; t++)
      yield this.heap[t].data;
  }
  remove(t) {
    let n = 0;
    for (let i = 0; i < this.heap.length; i++)
      t(this.heap[i]) || (this.heap[n] = this.heap[i], n++);
    this.heap.splice(n);
    for (let i = i1(this.heap.length - 1); i >= 0; i--)
      this.percDown(i);
    return this;
  }
}
function F5(e) {
  return (e << 1) + 1;
}
function i1(e) {
  return (e + 1 >> 1) - 1;
}
function Nu(e, t) {
  return e.priority !== t.priority ? e.priority < t.priority : e.pushCount < t.pushCount;
}
function Xv(e, t) {
  var n = Qc(e, t), {
    push: i,
    pushAsync: f
  } = n;
  n._tasks = new U5(), n._createTaskItem = ({ data: o, priority: s }, c) => ({
    data: o,
    priority: s,
    callback: c
  });
  function r(o, s) {
    return Array.isArray(o) ? o.map((c) => ({ data: c, priority: s })) : { data: o, priority: s };
  }
  return n.push = function(o, s = 0, c) {
    return i(r(o, s), c);
  }, n.pushAsync = function(o, s = 0, c) {
    return f(r(o, s), c);
  }, delete n.unshift, delete n.unshiftAsync, n;
}
function H5(e, t) {
  if (t = dn(t), !Array.isArray(e))
    return t(new TypeError("First argument to race must be an array of functions"));
  if (!e.length)
    return t();
  for (var n = 0, i = e.length; n < i; n++)
    wt(e[n])(t);
}
var Zv = mt(H5, 2);
function Ua(e, t, n, i) {
  var f = [...e].reverse();
  return on(f, t, n, i);
}
function Fa(e) {
  var t = wt(e);
  return Wi(function(i, f) {
    return i.push((r, ...o) => {
      let s = {};
      if (r && (s.error = r), o.length > 0) {
        var c = o;
        o.length <= 1 && ([c] = o), s.value = c;
      }
      f(null, s);
    }), t.apply(this, i);
  });
}
function Yv(e) {
  var t;
  return Array.isArray(e) ? t = e.map(Fa) : (t = {}, Object.keys(e).forEach((n) => {
    t[n] = Fa.call(this, e[n]);
  })), t;
}
function e0(e, t, n, i) {
  const f = wt(n);
  return jf(e, t, (r, o) => {
    f(r, (s, c) => {
      o(s, !c);
    });
  }, i);
}
function z5(e, t, n) {
  return e0(hr, e, t, n);
}
var Qv = mt(z5, 3);
function V5(e, t, n, i) {
  return e0(Lr(t), e, n, i);
}
var eb = mt(V5, 4);
function K5(e, t, n) {
  return e0(Pr, e, t, n);
}
var tb = mt(K5, 3);
function rb(e) {
  return function() {
    return e;
  };
}
const Vu = 5, nb = 0;
function Ha(e, t, n) {
  var i = {
    times: Vu,
    intervalFunc: rb(nb)
  };
  if (arguments.length < 3 && typeof e == "function" ? (n = t || Qn(), t = e) : (G5(i, e), n = n || Qn()), typeof t != "function")
    throw new Error("Invalid arguments for async.retry");
  var f = wt(t), r = 1;
  function o() {
    f((s, ...c) => {
      s !== !1 && (s && r++ < i.times && (typeof i.errorFilter != "function" || i.errorFilter(s)) ? setTimeout(o, i.intervalFunc(r - 1)) : n(s, ...c));
    });
  }
  return o(), n[si];
}
function G5(e, t) {
  if (typeof t == "object")
    e.times = +t.times || Vu, e.intervalFunc = typeof t.interval == "function" ? t.interval : rb(+t.interval || nb), e.errorFilter = t.errorFilter;
  else if (typeof t == "number" || typeof t == "string")
    e.times = +t || Vu;
  else
    throw new Error("Invalid arguments for async.retry");
}
function ib(e, t) {
  t || (t = e, e = null);
  let n = e && e.arity || t.length;
  Ji(t) && (n += 1);
  var i = wt(t);
  return Wi((f, r) => {
    (f.length < n - 1 || r == null) && (f.push(r), r = Qn());
    function o(s) {
      i(...f, s);
    }
    return e ? Ha(e, o, r) : Ha(o, r), r[si];
  });
}
function ab(e, t) {
  return Yc(Pr, e, t);
}
function W5(e, t, n) {
  return Qr(Boolean, (i) => i)(hr, e, t, n);
}
var za = mt(W5, 3);
function J5(e, t, n, i) {
  return Qr(Boolean, (f) => f)(Lr(t), e, n, i);
}
var Va = mt(J5, 4);
function X5(e, t, n) {
  return Qr(Boolean, (i) => i)(Pr, e, t, n);
}
var Ka = mt(X5, 3);
function Z5(e, t, n) {
  var i = wt(t);
  return kf(e, (r, o) => {
    i(r, (s, c) => {
      if (s)
        return o(s);
      o(s, { value: r, criteria: c });
    });
  }, (r, o) => {
    if (r)
      return n(r);
    n(null, o.sort(f).map((s) => s.value));
  });
  function f(r, o) {
    var s = r.criteria, c = o.criteria;
    return s < c ? -1 : s > c ? 1 : 0;
  }
}
var fb = mt(Z5, 3);
function ob(e, t, n) {
  var i = wt(e);
  return Wi((f, r) => {
    var o = !1, s;
    function c() {
      var l = e.name || "anonymous", u = new Error('Callback function "' + l + '" timed out.');
      u.code = "ETIMEDOUT", n && (u.info = n), o = !0, r(u);
    }
    f.push((...l) => {
      o || (r(...l), clearTimeout(s));
    }), s = setTimeout(c, t), i(...f);
  });
}
function Y5(e) {
  for (var t = Array(e); e--; )
    t[e] = e;
  return t;
}
function Uf(e, t, n, i) {
  var f = wt(n);
  return Xi(Y5(e), t, f, i);
}
function sb(e, t, n) {
  return Uf(e, 1 / 0, t, n);
}
function ub(e, t, n) {
  return Uf(e, 1, t, n);
}
function cb(e, t, n, i) {
  arguments.length <= 3 && typeof t == "function" && (i = n, n = t, t = Array.isArray(e) ? [] : {}), i = dn(i || Qn());
  var f = wt(n);
  return hr(e, (r, o, s) => {
    f(t, r, o, s);
  }, (r) => i(r, t)), i[si];
}
function Q5(e, t) {
  var n = null, i;
  return Oi(e, (f, r) => {
    wt(f)((o, ...s) => {
      if (o === !1)
        return r(o);
      s.length < 2 ? [i] = s : i = s, n = o, r(o ? null : {});
    });
  }, () => t(n, i));
}
var hb = mt(Q5);
function lb(e) {
  return (...t) => (e.unmemoized || e)(...t);
}
function e_(e, t, n) {
  n = pn(n);
  var i = wt(t), f = wt(e), r = [];
  function o(c, ...l) {
    if (c)
      return n(c);
    r = l, c !== !1 && f(s);
  }
  function s(c, l) {
    if (c)
      return n(c);
    if (c !== !1) {
      if (!l)
        return n(null, ...r);
      i(o);
    }
  }
  return f(s);
}
var Ni = mt(e_, 3);
function db(e, t, n) {
  const i = wt(e);
  return Ni((f) => i((r, o) => f(r, !o)), t, n);
}
function t_(e, t) {
  if (t = dn(t), !Array.isArray(e))
    return t(new Error("First argument to waterfall must be an array of functions"));
  if (!e.length)
    return t();
  var n = 0;
  function i(r) {
    var o = wt(e[n++]);
    o(...r, pn(f));
  }
  function f(r, ...o) {
    if (r !== !1) {
      if (r || n === e.length)
        return t(r, ...o);
      i(o);
    }
  }
  i([]);
}
var pb = mt(t_), r_ = {
  apply: Ev,
  applyEach: Iv,
  applyEachSeries: Tv,
  asyncify: Ti,
  auto: Wc,
  autoInject: Pv,
  cargo: Cv,
  cargoQueue: Ov,
  compose: Nv,
  concat: Ia,
  concatLimit: ei,
  concatSeries: Ta,
  constant: Lv,
  detect: Pa,
  detectLimit: Ca,
  detectSeries: Oa,
  dir: kv,
  doUntil: jv,
  doWhilst: Pi,
  each: Na,
  eachLimit: Ci,
  eachOf: hr,
  eachOfLimit: Yn,
  eachOfSeries: Pr,
  eachSeries: Oi,
  ensureAsync: Zc,
  every: La,
  everyLimit: $a,
  everySeries: ka,
  filter: ja,
  filterLimit: Da,
  filterSeries: qa,
  forever: qv,
  groupBy: Uv,
  groupByLimit: Df,
  groupBySeries: Fv,
  log: Hv,
  map: kf,
  mapLimit: Xi,
  mapSeries: Gc,
  mapValues: zv,
  mapValuesLimit: qf,
  mapValuesSeries: Vv,
  memoize: Kv,
  nextTick: Gv,
  parallel: Wv,
  parallelLimit: Jv,
  priorityQueue: Xv,
  queue: Qc,
  race: Zv,
  reduce: on,
  reduceRight: Ua,
  reflect: Fa,
  reflectAll: Yv,
  reject: Qv,
  rejectLimit: eb,
  rejectSeries: tb,
  retry: Ha,
  retryable: ib,
  seq: Xc,
  series: ab,
  setImmediate: fn,
  some: za,
  someLimit: Va,
  someSeries: Ka,
  sortBy: fb,
  timeout: ob,
  times: sb,
  timesLimit: Uf,
  timesSeries: ub,
  transform: cb,
  tryEach: hb,
  unmemoize: lb,
  until: db,
  waterfall: pb,
  whilst: Ni,
  // aliases
  all: La,
  allLimit: $a,
  allSeries: ka,
  any: za,
  anyLimit: Va,
  anySeries: Ka,
  find: Pa,
  findLimit: Ca,
  findSeries: Oa,
  flatMap: Ia,
  flatMapLimit: ei,
  flatMapSeries: Ta,
  forEach: Na,
  forEachSeries: Oi,
  forEachLimit: Ci,
  forEachOf: hr,
  forEachOfSeries: Pr,
  forEachOfLimit: Yn,
  inject: on,
  foldl: on,
  foldr: Ua,
  select: ja,
  selectLimit: Da,
  selectSeries: qa,
  wrapSync: Ti,
  during: Ni,
  doDuring: Pi
};
const n_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  all: La,
  allLimit: $a,
  allSeries: ka,
  any: za,
  anyLimit: Va,
  anySeries: Ka,
  apply: Ev,
  applyEach: Iv,
  applyEachSeries: Tv,
  asyncify: Ti,
  auto: Wc,
  autoInject: Pv,
  cargo: Cv,
  cargoQueue: Ov,
  compose: Nv,
  concat: Ia,
  concatLimit: ei,
  concatSeries: Ta,
  constant: Lv,
  default: r_,
  detect: Pa,
  detectLimit: Ca,
  detectSeries: Oa,
  dir: kv,
  doDuring: Pi,
  doUntil: jv,
  doWhilst: Pi,
  during: Ni,
  each: Na,
  eachLimit: Ci,
  eachOf: hr,
  eachOfLimit: Yn,
  eachOfSeries: Pr,
  eachSeries: Oi,
  ensureAsync: Zc,
  every: La,
  everyLimit: $a,
  everySeries: ka,
  filter: ja,
  filterLimit: Da,
  filterSeries: qa,
  find: Pa,
  findLimit: Ca,
  findSeries: Oa,
  flatMap: Ia,
  flatMapLimit: ei,
  flatMapSeries: Ta,
  foldl: on,
  foldr: Ua,
  forEach: Na,
  forEachLimit: Ci,
  forEachOf: hr,
  forEachOfLimit: Yn,
  forEachOfSeries: Pr,
  forEachSeries: Oi,
  forever: qv,
  groupBy: Uv,
  groupByLimit: Df,
  groupBySeries: Fv,
  inject: on,
  log: Hv,
  map: kf,
  mapLimit: Xi,
  mapSeries: Gc,
  mapValues: zv,
  mapValuesLimit: qf,
  mapValuesSeries: Vv,
  memoize: Kv,
  nextTick: Gv,
  parallel: Wv,
  parallelLimit: Jv,
  priorityQueue: Xv,
  queue: Qc,
  race: Zv,
  reduce: on,
  reduceRight: Ua,
  reflect: Fa,
  reflectAll: Yv,
  reject: Qv,
  rejectLimit: eb,
  rejectSeries: tb,
  retry: Ha,
  retryable: ib,
  select: ja,
  selectLimit: Da,
  selectSeries: qa,
  seq: Xc,
  series: ab,
  setImmediate: fn,
  some: za,
  someLimit: Va,
  someSeries: Ka,
  sortBy: fb,
  timeout: ob,
  times: sb,
  timesLimit: Uf,
  timesSeries: ub,
  transform: cb,
  tryEach: hb,
  unmemoize: lb,
  until: db,
  waterfall: pb,
  whilst: Ni,
  wrapSync: Ti
}, Symbol.toStringTag, { value: "Module" })), i_ = /* @__PURE__ */ Xu(n_);
Object.defineProperty(Nf, "__esModule", { value: !0 });
Nf.AsyncEventEmitter = void 0;
const a_ = i_, f_ = Zr;
class o_ extends f_.EventEmitter {
  emit(t, ...n) {
    let [i, f] = n;
    const r = this;
    let o = r._events[t] ?? [];
    return f === void 0 && typeof i == "function" && (f = i, i = void 0), (t === "newListener" || t === "removeListener") && (i = {
      event: i,
      fn: f
    }, f = void 0), o = Array.isArray(o) ? o : [o], (0, a_.eachSeries)(o.slice(), function(s, c) {
      let l;
      if (s.length < 2) {
        try {
          s.call(r, i);
        } catch (u) {
          l = u;
        }
        return c(l);
      }
      s.call(r, i, c);
    }, f), r.listenerCount(t) > 0;
  }
  once(t, n) {
    const i = this;
    let f;
    if (typeof n != "function")
      throw new TypeError("listener must be a function");
    return n.length >= 2 ? f = function(r, o) {
      i.removeListener(t, f), n(r, o);
    } : f = function(r) {
      i.removeListener(t, f), n(r, f);
    }, i.on(t, f), i;
  }
  first(t, n) {
    let i = this._events[t] ?? [];
    if (typeof n != "function")
      throw new TypeError("listener must be a function");
    return Array.isArray(i) || (this._events[t] = i = [i]), i.unshift(n), this;
  }
  before(t, n, i) {
    return this.beforeOrAfter(t, n, i);
  }
  after(t, n, i) {
    return this.beforeOrAfter(t, n, i, "after");
  }
  beforeOrAfter(t, n, i, f) {
    let r = this._events[t] ?? [], o, s;
    const c = f === "after" ? 1 : 0;
    if (typeof i != "function")
      throw new TypeError("listener must be a function");
    if (typeof n != "function")
      throw new TypeError("target must be a function");
    for (Array.isArray(r) || (this._events[t] = r = [r]), s = r.length, o = r.length; o--; )
      if (r[o] === n) {
        s = o + c;
        break;
      }
    return r.splice(s, 0, i), this;
  }
  on(t, n) {
    return super.on(t, n);
  }
  addListener(t, n) {
    return super.addListener(t, n);
  }
  prependListener(t, n) {
    return super.prependListener(t, n);
  }
  prependOnceListener(t, n) {
    return super.prependOnceListener(t, n);
  }
  removeAllListeners(t) {
    return super.removeAllListeners(t);
  }
  removeListener(t, n) {
    return super.removeListener(t, n);
  }
  eventNames() {
    return super.eventNames();
  }
  listeners(t) {
    return super.listeners(t);
  }
  listenerCount(t) {
    return super.listenerCount(t);
  }
  getMaxListeners() {
    return super.getMaxListeners();
  }
  setMaxListeners(t) {
    return super.setMaxListeners(t);
  }
}
Nf.AsyncEventEmitter = o_;
var Ff = {};
Object.defineProperty(Ff, "__esModule", { value: !0 });
Ff.Lock = void 0;
class s_ {
  constructor() {
    this.permits = 1, this.promiseResolverQueue = [];
  }
  /**
   * Returns a promise used to wait for a permit to become available. This method should be awaited on.
   * @returns  A promise that gets resolved when execution is allowed to proceed.
   */
  async acquire() {
    return this.permits > 0 ? (this.permits -= 1, Promise.resolve(!0)) : new Promise((t) => this.promiseResolverQueue.push(t));
  }
  /**
   * Increases the number of permits by one. If there are other functions waiting, one of them will
   * continue to execute in a future iteration of the event loop.
   */
  release() {
    if (this.permits += 1, this.permits > 1 && this.promiseResolverQueue.length > 0)
      console.warn("Lock.permits should never be > 0 when there is someone waiting.");
    else if (this.permits === 1 && this.promiseResolverQueue.length > 0) {
      this.permits -= 1;
      const t = this.promiseResolverQueue.shift();
      t && t(!0);
    }
  }
}
Ff.Lock = s_;
(function(e) {
  var t = Ne && Ne.__createBinding || (Object.create ? function(f, r, o, s) {
    s === void 0 && (s = o);
    var c = Object.getOwnPropertyDescriptor(r, o);
    (!c || ("get" in c ? !r.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return r[o];
    } }), Object.defineProperty(f, s, c);
  } : function(f, r, o, s) {
    s === void 0 && (s = o), f[s] = r[o];
  }), n = Ne && Ne.__exportStar || function(f, r) {
    for (var o in f)
      o !== "default" && !Object.prototype.hasOwnProperty.call(r, o) && t(r, f, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.toAscii = e.stripHexPrefix = e.padToEven = e.isHexString = e.isHexPrefixed = e.getKeys = e.getBinarySize = e.fromUtf8 = e.fromAscii = e.arrayContainsArray = void 0, n(mf, e), n(Hc, e), n(Gi, e), n(Pf, e), n(nr, e), n(Tn, e), n(Vc, e), n(Nf, e);
  var i = $t;
  Object.defineProperty(e, "arrayContainsArray", { enumerable: !0, get: function() {
    return i.arrayContainsArray;
  } }), Object.defineProperty(e, "fromAscii", { enumerable: !0, get: function() {
    return i.fromAscii;
  } }), Object.defineProperty(e, "fromUtf8", { enumerable: !0, get: function() {
    return i.fromUtf8;
  } }), Object.defineProperty(e, "getBinarySize", { enumerable: !0, get: function() {
    return i.getBinarySize;
  } }), Object.defineProperty(e, "getKeys", { enumerable: !0, get: function() {
    return i.getKeys;
  } }), Object.defineProperty(e, "isHexPrefixed", { enumerable: !0, get: function() {
    return i.isHexPrefixed;
  } }), Object.defineProperty(e, "isHexString", { enumerable: !0, get: function() {
    return i.isHexString;
  } }), Object.defineProperty(e, "padToEven", { enumerable: !0, get: function() {
    return i.padToEven;
  } }), Object.defineProperty(e, "stripHexPrefix", { enumerable: !0, get: function() {
    return i.stripHexPrefix;
  } }), Object.defineProperty(e, "toAscii", { enumerable: !0, get: function() {
    return i.toAscii;
  } }), n(Ff, e);
})(Fi);
var Vt = {}, vb = function(t) {
  if (typeof t != "string")
    throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof t + ", while checking isHexPrefixed.");
  return t.slice(0, 2) === "0x";
}, u_ = vb, c_ = function(t) {
  return typeof t != "string" ? t : u_(t) ? t.slice(2) : t;
}, h_ = vb, bb = c_;
function Hf(e) {
  var t = e;
  if (typeof t != "string")
    throw new Error("[ethjs-util] while padding to even, value must be string, is currently " + typeof t + ", while padToEven.");
  return t.length % 2 && (t = "0" + t), t;
}
function yb(e) {
  var t = e.toString(16);
  return "0x" + t;
}
function l_(e) {
  var t = yb(e);
  return new Buffer(Hf(t.slice(2)), "hex");
}
function d_(e) {
  if (typeof e != "string")
    throw new Error("[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '" + typeof e + "'.");
  return Buffer.byteLength(e, "utf8");
}
function p_(e, t, n) {
  if (Array.isArray(e) !== !0)
    throw new Error("[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '" + typeof e + "'");
  if (Array.isArray(t) !== !0)
    throw new Error("[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '" + typeof t + "'");
  return t[Boolean(n) && "some" || "every"](function(i) {
    return e.indexOf(i) >= 0;
  });
}
function v_(e) {
  var t = new Buffer(Hf(bb(e).replace(/^0+|0+$/g, "")), "hex");
  return t.toString("utf8");
}
function b_(e) {
  var t = "", n = 0, i = e.length;
  for (e.substring(0, 2) === "0x" && (n = 2); n < i; n += 2) {
    var f = parseInt(e.substr(n, 2), 16);
    t += String.fromCharCode(f);
  }
  return t;
}
function y_(e) {
  var t = new Buffer(e, "utf8");
  return "0x" + Hf(t.toString("hex")).replace(/^0+|0+$/g, "");
}
function g_(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var i = e.charCodeAt(n), f = i.toString(16);
    t += f.length < 2 ? "0" + f : f;
  }
  return "0x" + t;
}
function m_(e, t, n) {
  if (!Array.isArray(e))
    throw new Error("[ethjs-util] method getKeys expecting type Array as 'params' input, got '" + typeof e + "'");
  if (typeof t != "string")
    throw new Error("[ethjs-util] method getKeys expecting type String for input 'key' got '" + typeof t + "'.");
  for (var i = [], f = 0; f < e.length; f++) {
    var r = e[f][t];
    if (n && !r)
      r = "";
    else if (typeof r != "string")
      throw new Error("invalid abi");
    i.push(r);
  }
  return i;
}
function w_(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t);
}
var t0 = {
  arrayContainsArray: p_,
  intToBuffer: l_,
  getBinarySize: d_,
  isHexPrefixed: h_,
  stripHexPrefix: bb,
  padToEven: Hf,
  intToHex: yb,
  fromAscii: g_,
  fromUtf8: y_,
  toAscii: b_,
  toUtf8: v_,
  getKeys: m_,
  isHexString: w_
};
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.numberToBuffer = Vt.normalize = Vt.recoverPublicKey = Vt.concatSig = Vt.legacyToBuffer = Vt.isNullish = Vt.padWithZeroes = void 0;
const wr = Fi, Ku = t0;
function Gu(e, t) {
  if (e !== "" && !/^[a-f0-9]+$/iu.test(e))
    throw new Error(`Expected an unprefixed hex string. Received: ${e}`);
  if (t < 0)
    throw new Error(`Expected a non-negative integer target length. Received: ${t}`);
  return String.prototype.padStart.call(e, t, "0");
}
Vt.padWithZeroes = Gu;
function __(e) {
  return e == null;
}
Vt.isNullish = __;
function x_(e) {
  return typeof e == "string" && !(0, Ku.isHexString)(e) ? Buffer.from(e) : (0, wr.toBuffer)(e);
}
Vt.legacyToBuffer = x_;
function E_(e, t, n) {
  const i = (0, wr.fromSigned)(t), f = (0, wr.fromSigned)(n), r = (0, wr.bufferToInt)(e), o = Gu((0, wr.toUnsigned)(i).toString("hex"), 64), s = Gu((0, wr.toUnsigned)(f).toString("hex"), 64), c = (0, Ku.stripHexPrefix)((0, Ku.intToHex)(r));
  return (0, wr.addHexPrefix)(o.concat(s, c));
}
Vt.concatSig = E_;
function S_(e, t) {
  const n = (0, wr.fromRpcSig)(t);
  return (0, wr.ecrecover)(e, n.v, n.r, n.s);
}
Vt.recoverPublicKey = S_;
function M_(e) {
  if (e) {
    if (typeof e == "number") {
      if (e < 0)
        return "0x";
      const t = (0, wr.toBuffer)(e);
      e = (0, wr.bufferToHex)(t);
    }
    if (typeof e != "string") {
      let t = "eth-sig-util.normalize() requires hex string or integer input.";
      throw t += ` received ${typeof e}: ${e}`, new Error(t);
    }
    return (0, wr.addHexPrefix)(e.toLowerCase());
  }
}
Vt.normalize = M_;
function A_(e) {
  const t = e.toString(16), n = t.length % 2 ? "0" : "";
  return Buffer.from(n + t, "hex");
}
Vt.numberToBuffer = A_;
Object.defineProperty(an, "__esModule", { value: !0 });
an.extractPublicKey = an.recoverPersonalSignature = an.personalSign = void 0;
const Vn = Fi, zr = Vt;
function B_({ privateKey: e, data: t }) {
  if ((0, zr.isNullish)(t))
    throw new Error("Missing data parameter");
  if ((0, zr.isNullish)(e))
    throw new Error("Missing privateKey parameter");
  const n = (0, zr.legacyToBuffer)(t), i = (0, Vn.hashPersonalMessage)(n), f = (0, Vn.ecsign)(i, e);
  return (0, zr.concatSig)((0, Vn.toBuffer)(f.v), f.r, f.s);
}
an.personalSign = B_;
function R_({ data: e, signature: t }) {
  if ((0, zr.isNullish)(e))
    throw new Error("Missing data parameter");
  if ((0, zr.isNullish)(t))
    throw new Error("Missing signature parameter");
  const n = gb(e, t), i = (0, Vn.publicToAddress)(n);
  return (0, Vn.bufferToHex)(i);
}
an.recoverPersonalSignature = R_;
function I_({ data: e, signature: t }) {
  if ((0, zr.isNullish)(e))
    throw new Error("Missing data parameter");
  if ((0, zr.isNullish)(t))
    throw new Error("Missing signature parameter");
  return `0x${gb(e, t).toString("hex")}`;
}
an.extractPublicKey = I_;
function gb(e, t) {
  const n = (0, Vn.hashPersonalMessage)((0, zr.legacyToBuffer)(e));
  return (0, zr.recoverPublicKey)(n, t);
}
var mb = {}, sn = {}, T_ = Ne && Ne.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.rawEncode = sn.parseNumber = sn.solidityPack = void 0;
const nn = Fi, P_ = t0, xn = T_(Ht), wb = Vt;
function C_(e, t) {
  if (e.length !== t.length)
    throw new Error("Number of types are not matching the values");
  const n = [];
  for (let i = 0; i < e.length; i++) {
    const f = xb(e[i]), r = t[i];
    n.push(_b(f, r, null));
  }
  return Buffer.concat(n);
}
sn.solidityPack = C_;
function Ga(e) {
  return e.lastIndexOf("]") === e.length - 1;
}
function zf(e) {
  const t = e.match(/(.*)\[(.*?)\]$/u);
  return t ? t[2] === "" ? "dynamic" : parseInt(t[2], 10) : null;
}
function Kn(e) {
  return parseInt(/^\D+(\d+)$/u.exec(e)[1], 10);
}
function rn(e) {
  const t = typeof e;
  if (t === "string")
    return (0, nn.isHexPrefixed)(e) ? new xn.default((0, P_.stripHexPrefix)(e), 16) : new xn.default(e, 10);
  if (t === "number")
    return new xn.default(e);
  if (e.toArray)
    return e;
  throw new Error("Argument is not a number");
}
sn.parseNumber = rn;
function _b(e, t, n) {
  let i, f;
  if (Ga(e)) {
    const r = e.replace(/\[.*?\]/u, "");
    if (!Ga(r)) {
      const s = zf(e);
      if (s !== "dynamic" && s !== 0 && t.length > s)
        throw new Error(`Elements exceed array size: ${s}`);
    }
    const o = t.map(function(s) {
      return _b(r, s, 256);
    });
    return Buffer.concat(o);
  } else {
    if (e === "bytes")
      return t;
    if (e === "string")
      return Buffer.from(t, "utf8");
    if (e === "bool") {
      n = n || 8;
      const r = Array(n / 4).join("0");
      return Buffer.from(t ? `${r}1` : `${r}0`, "hex");
    } else if (e === "address") {
      let r = 20;
      return n && (r = n / 8), (0, nn.setLengthLeft)((0, nn.toBuffer)(t), r);
    } else if (e.startsWith("bytes")) {
      if (i = Kn(e), i < 1 || i > 32)
        throw new Error(`Invalid bytes<N> width: ${i}`);
      return typeof t == "number" && (t = (0, wb.normalize)(t)), (0, nn.setLengthRight)((0, nn.toBuffer)(t), i);
    } else if (e.startsWith("uint")) {
      if (i = Kn(e), i % 8 || i < 8 || i > 256)
        throw new Error(`Invalid uint<N> width: ${i}`);
      if (f = rn(t), f.bitLength() > i)
        throw new Error(`Supplied uint exceeds width: ${i} vs ${f.bitLength()}`);
      return n = n || i, f.toArrayLike(Buffer, "be", n / 8);
    } else if (e.startsWith("int")) {
      if (i = Kn(e), i % 8 || i < 8 || i > 256)
        throw new Error(`Invalid int<N> width: ${i}`);
      if (f = rn(t), f.bitLength() > i)
        throw new Error(`Supplied int exceeds width: ${i} vs ${f.bitLength()}`);
      return n = n || i, f.toTwos(i).toArrayLike(Buffer, "be", n / 8);
    }
  }
  throw new Error(`Unsupported or invalid type: ${e}`);
}
function xb(e) {
  return e.startsWith("int[") ? `int256${e.slice(3)}` : e === "int" ? "int256" : e.startsWith("uint[") ? `uint256${e.slice(4)}` : e === "uint" ? "uint256" : e.startsWith("fixed[") ? `fixed128x128${e.slice(5)}` : e === "fixed" ? "fixed128x128" : e.startsWith("ufixed[") ? `ufixed128x128${e.slice(6)}` : e === "ufixed" ? "ufixed128x128" : e;
}
function O_(e, t) {
  const n = [], i = [];
  let f = 0;
  e.forEach(function(r) {
    if (Ga(r)) {
      const o = zf(r);
      o !== "dynamic" ? f += 32 * o : f += 32;
    } else
      f += 32;
  });
  for (let r = 0; r < e.length; r++) {
    const o = xb(e[r]), s = t[r], c = Dr(o, s);
    N_(o) ? (n.push(Dr("uint256", f)), i.push(c), f += c.length) : n.push(c);
  }
  return Buffer.concat(n.concat(i));
}
sn.rawEncode = O_;
function Dr(e, t) {
  let n, i, f, r;
  if (e === "address")
    return Dr("uint160", rn(t));
  if (e === "bool")
    return Dr("uint8", t ? 1 : 0);
  if (e === "string")
    return Dr("bytes", Buffer.from(t, "utf8"));
  if (Ga(e)) {
    if (typeof t.length > "u")
      throw new Error("Not an array?");
    if (n = zf(e), n !== "dynamic" && n !== 0 && t.length > n)
      throw new Error(`Elements exceed array size: ${n}`);
    f = [], e = e.slice(0, e.lastIndexOf("[")), typeof t == "string" && (t = JSON.parse(t));
    for (r in t)
      Object.prototype.hasOwnProperty.call(t, r) && f.push(Dr(e, t[r]));
    if (n === "dynamic") {
      const o = Dr("uint256", t.length);
      f.unshift(o);
    }
    return Buffer.concat(f);
  } else {
    if (e === "bytes")
      return t = Buffer.from(t), f = Buffer.concat([Dr("uint256", t.length), t]), t.length % 32 !== 0 && (f = Buffer.concat([f, (0, nn.zeros)(32 - t.length % 32)])), f;
    if (e.startsWith("bytes")) {
      if (n = Kn(e), n < 1 || n > 32)
        throw new Error(`Invalid bytes<N> width: ${n}`);
      return typeof t == "number" && (t = (0, wb.normalize)(t)), (0, nn.setLengthRight)((0, nn.toBuffer)(t), 32);
    } else if (e.startsWith("uint")) {
      if (n = Kn(e), n % 8 || n < 8 || n > 256)
        throw new Error(`Invalid uint<N> width: ${n}`);
      if (i = rn(t), i.bitLength() > n)
        throw new Error(`Supplied uint exceeds width: ${n} vs ${i.bitLength()}`);
      if (i < 0)
        throw new Error("Supplied uint is negative");
      return i.toArrayLike(Buffer, "be", 32);
    } else if (e.startsWith("int")) {
      if (n = Kn(e), n % 8 || n < 8 || n > 256)
        throw new Error(`Invalid int<N> width: ${n}`);
      if (i = rn(t), i.bitLength() > n)
        throw new Error(`Supplied int exceeds width: ${n} vs ${i.bitLength()}`);
      return i.toTwos(256).toArrayLike(Buffer, "be", 32);
    } else if (e.startsWith("ufixed")) {
      if (n = a1(e), i = rn(t), i < 0)
        throw new Error("Supplied ufixed is negative");
      return Dr("uint256", i.mul(new xn.default(2).pow(new xn.default(n[1]))));
    } else if (e.startsWith("fixed"))
      return n = a1(e), Dr("int256", rn(t).mul(new xn.default(2).pow(new xn.default(n[1]))));
  }
  throw new Error(`Unsupported or invalid type: ${e}`);
}
function N_(e) {
  return e === "string" || e === "bytes" || zf(e) === "dynamic";
}
function a1(e) {
  const t = /^\D+(\d+)x(\d+)$/u.exec(e);
  return [parseInt(t[1], 10), parseInt(t[2], 10)];
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.recoverTypedSignature = e.signTypedData = e.typedSignatureHash = e.TypedDataUtils = e.TYPED_MESSAGE_SCHEMA = e.SignTypedDataVersion = void 0;
  const t = t0, n = Fi, i = xr, f = sn, r = Vt;
  var o;
  (function($) {
    $.V1 = "V1", $.V3 = "V3", $.V4 = "V4";
  })(o = e.SignTypedDataVersion || (e.SignTypedDataVersion = {})), e.TYPED_MESSAGE_SCHEMA = {
    type: "object",
    properties: {
      types: {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string" }
            },
            required: ["name", "type"]
          }
        }
      },
      primaryType: { type: "string" },
      domain: { type: "object" },
      message: { type: "object" }
    },
    required: ["types", "primaryType", "domain", "message"]
  };
  function s($, D) {
    if (Object.keys(o).includes($)) {
      if (D && !D.includes($))
        throw new Error(`SignTypedDataVersion not allowed: '${$}'. Allowed versions are: ${D.join(", ")}`);
    } else
      throw new Error(`Invalid version: '${$}'`);
  }
  function c($, D, H, V, ne) {
    if (s(ne, [o.V3, o.V4]), $[H] !== void 0)
      return [
        "bytes32",
        ne === o.V4 && V == null ? "0x0000000000000000000000000000000000000000000000000000000000000000" : (0, n.arrToBufArr)((0, i.keccak256)(l(H, V, $, ne)))
      ];
    if (V === void 0)
      throw new Error(`missing value for field ${D} of type ${H}`);
    if (H === "bytes") {
      if (typeof V == "number")
        V = (0, r.numberToBuffer)(V);
      else if ((0, t.isHexString)(V)) {
        const Q = V.length % 2 ? "0" : "";
        V = Buffer.from(Q + V.slice(2), "hex");
      } else
        V = Buffer.from(V, "utf8");
      return ["bytes32", (0, n.arrToBufArr)((0, i.keccak256)(V))];
    }
    if (H === "string")
      return typeof V == "number" ? V = (0, r.numberToBuffer)(V) : V = Buffer.from(V ?? "", "utf8"), ["bytes32", (0, n.arrToBufArr)((0, i.keccak256)(V))];
    if (H.lastIndexOf("]") === H.length - 1) {
      if (ne === o.V3)
        throw new Error("Arrays are unimplemented in encodeData; use V4 extension");
      const Q = H.slice(0, H.lastIndexOf("[")), se = V.map((k) => c($, D, Q, k, ne));
      return [
        "bytes32",
        (0, n.arrToBufArr)((0, i.keccak256)((0, f.rawEncode)(se.map(([k]) => k), se.map(([, k]) => k))))
      ];
    }
    return [H, V];
  }
  function l($, D, H, V) {
    s(V, [o.V3, o.V4]);
    const ne = ["bytes32"], Q = [g($, H)];
    for (const se of H[$]) {
      if (V === o.V3 && D[se.name] === void 0)
        continue;
      const [k, m] = c(H, se.name, se.type, D[se.name], V);
      ne.push(k), Q.push(m);
    }
    return (0, f.rawEncode)(ne, Q);
  }
  function u($, D) {
    let H = "";
    const V = v($, D);
    V.delete($);
    const ne = [$, ...Array.from(V).sort()];
    for (const Q of ne) {
      if (!D[Q])
        throw new Error(`No type definition specified: ${Q}`);
      H += `${Q}(${D[Q].map(({ name: k, type: m }) => `${m} ${k}`).join(",")})`;
    }
    return H;
  }
  function v($, D, H = /* @__PURE__ */ new Set()) {
    if ([$] = $.match(/^\w*/u), H.has($) || D[$] === void 0)
      return H;
    H.add($);
    for (const V of D[$])
      v(V.type, D, H);
    return H;
  }
  function p($, D, H, V) {
    return s(V, [o.V3, o.V4]), (0, n.arrToBufArr)((0, i.keccak256)(l($, D, H, V)));
  }
  function g($, D) {
    const H = Buffer.from(u($, D), "utf-8");
    return (0, n.arrToBufArr)((0, i.keccak256)(H));
  }
  function w($) {
    const D = {};
    for (const H in e.TYPED_MESSAGE_SCHEMA.properties)
      $[H] && (D[H] = $[H]);
    return "types" in D && (D.types = Object.assign({ EIP712Domain: [] }, D.types)), D;
  }
  function S($, D) {
    s(D, [o.V3, o.V4]);
    const H = w($), V = [Buffer.from("1901", "hex")];
    return V.push(p("EIP712Domain", H.domain, H.types, D)), H.primaryType !== "EIP712Domain" && V.push(p(
      // TODO: Validate that this is a string, so this type cast can be removed.
      H.primaryType,
      H.message,
      H.types,
      D
    )), (0, n.arrToBufArr)((0, i.keccak256)(Buffer.concat(V)));
  }
  e.TypedDataUtils = {
    encodeData: l,
    encodeType: u,
    findTypeDependencies: v,
    hashStruct: p,
    hashType: g,
    sanitizeData: w,
    eip712Hash: S
  };
  function T($) {
    const D = I($);
    return (0, n.bufferToHex)(D);
  }
  e.typedSignatureHash = T;
  function I($) {
    const D = new Error("Expect argument to be non-empty array");
    if (typeof $ != "object" || !("length" in $) || !$.length)
      throw D;
    const H = $.map(function(Q) {
      return Q.type !== "bytes" ? Q.value : (0, r.legacyToBuffer)(Q.value);
    }), V = $.map(function(Q) {
      return Q.type;
    }), ne = $.map(function(Q) {
      if (!Q.name)
        throw D;
      return `${Q.type} ${Q.name}`;
    });
    return (0, n.arrToBufArr)((0, i.keccak256)((0, f.solidityPack)(["bytes32", "bytes32"], [
      (0, i.keccak256)((0, f.solidityPack)(new Array($.length).fill("string"), ne)),
      (0, i.keccak256)((0, f.solidityPack)(V, H))
    ])));
  }
  function C({ privateKey: $, data: D, version: H }) {
    if (s(H), (0, r.isNullish)(D))
      throw new Error("Missing data parameter");
    if ((0, r.isNullish)($))
      throw new Error("Missing private key parameter");
    const V = H === o.V1 ? I(D) : e.TypedDataUtils.eip712Hash(D, H), ne = (0, n.ecsign)(V, $);
    return (0, r.concatSig)((0, n.toBuffer)(ne.v), ne.r, ne.s);
  }
  e.signTypedData = C;
  function N({ data: $, signature: D, version: H }) {
    if (s(H), (0, r.isNullish)($))
      throw new Error("Missing data parameter");
    if ((0, r.isNullish)(D))
      throw new Error("Missing signature parameter");
    const V = H === o.V1 ? I($) : e.TypedDataUtils.eip712Hash($, H), ne = (0, r.recoverPublicKey)(V, D), Q = (0, n.publicToAddress)(ne);
    return (0, n.bufferToHex)(Q);
  }
  e.recoverTypedSignature = N;
})(mb);
var _r = {}, Wu = {}, L_ = {
  get exports() {
    return Wu;
  },
  set exports(e) {
    Wu = e;
  }
};
(function(e) {
  (function(t) {
    var n = function(O) {
      var j, q = new Float64Array(16);
      if (O)
        for (j = 0; j < O.length; j++)
          q[j] = O[j];
      return q;
    }, i = function() {
      throw new Error("no PRNG");
    }, f = new Uint8Array(16), r = new Uint8Array(32);
    r[0] = 9;
    var o = n(), s = n([1]), c = n([56129, 1]), l = n([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), u = n([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), v = n([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), p = n([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), g = n([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function w(O, j, q, R) {
      O[j] = q >> 24 & 255, O[j + 1] = q >> 16 & 255, O[j + 2] = q >> 8 & 255, O[j + 3] = q & 255, O[j + 4] = R >> 24 & 255, O[j + 5] = R >> 16 & 255, O[j + 6] = R >> 8 & 255, O[j + 7] = R & 255;
    }
    function S(O, j, q, R, U) {
      var oe, ae = 0;
      for (oe = 0; oe < U; oe++)
        ae |= O[j + oe] ^ q[R + oe];
      return (1 & ae - 1 >>> 8) - 1;
    }
    function T(O, j, q, R) {
      return S(O, j, q, R, 16);
    }
    function I(O, j, q, R) {
      return S(O, j, q, R, 32);
    }
    function C(O, j, q, R) {
      for (var U = R[0] & 255 | (R[1] & 255) << 8 | (R[2] & 255) << 16 | (R[3] & 255) << 24, oe = q[0] & 255 | (q[1] & 255) << 8 | (q[2] & 255) << 16 | (q[3] & 255) << 24, ae = q[4] & 255 | (q[5] & 255) << 8 | (q[6] & 255) << 16 | (q[7] & 255) << 24, he = q[8] & 255 | (q[9] & 255) << 8 | (q[10] & 255) << 16 | (q[11] & 255) << 24, xe = q[12] & 255 | (q[13] & 255) << 8 | (q[14] & 255) << 16 | (q[15] & 255) << 24, Me = R[4] & 255 | (R[5] & 255) << 8 | (R[6] & 255) << 16 | (R[7] & 255) << 24, _e = j[0] & 255 | (j[1] & 255) << 8 | (j[2] & 255) << 16 | (j[3] & 255) << 24, ut = j[4] & 255 | (j[5] & 255) << 8 | (j[6] & 255) << 16 | (j[7] & 255) << 24, $e = j[8] & 255 | (j[9] & 255) << 8 | (j[10] & 255) << 16 | (j[11] & 255) << 24, Je = j[12] & 255 | (j[13] & 255) << 8 | (j[14] & 255) << 16 | (j[15] & 255) << 24, Ze = R[8] & 255 | (R[9] & 255) << 8 | (R[10] & 255) << 16 | (R[11] & 255) << 24, nt = q[16] & 255 | (q[17] & 255) << 8 | (q[18] & 255) << 16 | (q[19] & 255) << 24, tt = q[20] & 255 | (q[21] & 255) << 8 | (q[22] & 255) << 16 | (q[23] & 255) << 24, Ye = q[24] & 255 | (q[25] & 255) << 8 | (q[26] & 255) << 16 | (q[27] & 255) << 24, et = q[28] & 255 | (q[29] & 255) << 8 | (q[30] & 255) << 16 | (q[31] & 255) << 24, Qe = R[12] & 255 | (R[13] & 255) << 8 | (R[14] & 255) << 16 | (R[15] & 255) << 24, qe = U, Ge = oe, ke = ae, Ue = he, He = xe, Le = Me, be = _e, ye = ut, Be = $e, Ee = Je, Ae = Ze, Oe = nt, ot = tt, ht = Ye, dt = et, lt = Qe, ie, yt = 0; yt < 20; yt += 2)
        ie = qe + ot | 0, He ^= ie << 7 | ie >>> 32 - 7, ie = He + qe | 0, Be ^= ie << 9 | ie >>> 32 - 9, ie = Be + He | 0, ot ^= ie << 13 | ie >>> 32 - 13, ie = ot + Be | 0, qe ^= ie << 18 | ie >>> 32 - 18, ie = Le + Ge | 0, Ee ^= ie << 7 | ie >>> 32 - 7, ie = Ee + Le | 0, ht ^= ie << 9 | ie >>> 32 - 9, ie = ht + Ee | 0, Ge ^= ie << 13 | ie >>> 32 - 13, ie = Ge + ht | 0, Le ^= ie << 18 | ie >>> 32 - 18, ie = Ae + be | 0, dt ^= ie << 7 | ie >>> 32 - 7, ie = dt + Ae | 0, ke ^= ie << 9 | ie >>> 32 - 9, ie = ke + dt | 0, be ^= ie << 13 | ie >>> 32 - 13, ie = be + ke | 0, Ae ^= ie << 18 | ie >>> 32 - 18, ie = lt + Oe | 0, Ue ^= ie << 7 | ie >>> 32 - 7, ie = Ue + lt | 0, ye ^= ie << 9 | ie >>> 32 - 9, ie = ye + Ue | 0, Oe ^= ie << 13 | ie >>> 32 - 13, ie = Oe + ye | 0, lt ^= ie << 18 | ie >>> 32 - 18, ie = qe + Ue | 0, Ge ^= ie << 7 | ie >>> 32 - 7, ie = Ge + qe | 0, ke ^= ie << 9 | ie >>> 32 - 9, ie = ke + Ge | 0, Ue ^= ie << 13 | ie >>> 32 - 13, ie = Ue + ke | 0, qe ^= ie << 18 | ie >>> 32 - 18, ie = Le + He | 0, be ^= ie << 7 | ie >>> 32 - 7, ie = be + Le | 0, ye ^= ie << 9 | ie >>> 32 - 9, ie = ye + be | 0, He ^= ie << 13 | ie >>> 32 - 13, ie = He + ye | 0, Le ^= ie << 18 | ie >>> 32 - 18, ie = Ae + Ee | 0, Oe ^= ie << 7 | ie >>> 32 - 7, ie = Oe + Ae | 0, Be ^= ie << 9 | ie >>> 32 - 9, ie = Be + Oe | 0, Ee ^= ie << 13 | ie >>> 32 - 13, ie = Ee + Be | 0, Ae ^= ie << 18 | ie >>> 32 - 18, ie = lt + dt | 0, ot ^= ie << 7 | ie >>> 32 - 7, ie = ot + lt | 0, ht ^= ie << 9 | ie >>> 32 - 9, ie = ht + ot | 0, dt ^= ie << 13 | ie >>> 32 - 13, ie = dt + ht | 0, lt ^= ie << 18 | ie >>> 32 - 18;
      qe = qe + U | 0, Ge = Ge + oe | 0, ke = ke + ae | 0, Ue = Ue + he | 0, He = He + xe | 0, Le = Le + Me | 0, be = be + _e | 0, ye = ye + ut | 0, Be = Be + $e | 0, Ee = Ee + Je | 0, Ae = Ae + Ze | 0, Oe = Oe + nt | 0, ot = ot + tt | 0, ht = ht + Ye | 0, dt = dt + et | 0, lt = lt + Qe | 0, O[0] = qe >>> 0 & 255, O[1] = qe >>> 8 & 255, O[2] = qe >>> 16 & 255, O[3] = qe >>> 24 & 255, O[4] = Ge >>> 0 & 255, O[5] = Ge >>> 8 & 255, O[6] = Ge >>> 16 & 255, O[7] = Ge >>> 24 & 255, O[8] = ke >>> 0 & 255, O[9] = ke >>> 8 & 255, O[10] = ke >>> 16 & 255, O[11] = ke >>> 24 & 255, O[12] = Ue >>> 0 & 255, O[13] = Ue >>> 8 & 255, O[14] = Ue >>> 16 & 255, O[15] = Ue >>> 24 & 255, O[16] = He >>> 0 & 255, O[17] = He >>> 8 & 255, O[18] = He >>> 16 & 255, O[19] = He >>> 24 & 255, O[20] = Le >>> 0 & 255, O[21] = Le >>> 8 & 255, O[22] = Le >>> 16 & 255, O[23] = Le >>> 24 & 255, O[24] = be >>> 0 & 255, O[25] = be >>> 8 & 255, O[26] = be >>> 16 & 255, O[27] = be >>> 24 & 255, O[28] = ye >>> 0 & 255, O[29] = ye >>> 8 & 255, O[30] = ye >>> 16 & 255, O[31] = ye >>> 24 & 255, O[32] = Be >>> 0 & 255, O[33] = Be >>> 8 & 255, O[34] = Be >>> 16 & 255, O[35] = Be >>> 24 & 255, O[36] = Ee >>> 0 & 255, O[37] = Ee >>> 8 & 255, O[38] = Ee >>> 16 & 255, O[39] = Ee >>> 24 & 255, O[40] = Ae >>> 0 & 255, O[41] = Ae >>> 8 & 255, O[42] = Ae >>> 16 & 255, O[43] = Ae >>> 24 & 255, O[44] = Oe >>> 0 & 255, O[45] = Oe >>> 8 & 255, O[46] = Oe >>> 16 & 255, O[47] = Oe >>> 24 & 255, O[48] = ot >>> 0 & 255, O[49] = ot >>> 8 & 255, O[50] = ot >>> 16 & 255, O[51] = ot >>> 24 & 255, O[52] = ht >>> 0 & 255, O[53] = ht >>> 8 & 255, O[54] = ht >>> 16 & 255, O[55] = ht >>> 24 & 255, O[56] = dt >>> 0 & 255, O[57] = dt >>> 8 & 255, O[58] = dt >>> 16 & 255, O[59] = dt >>> 24 & 255, O[60] = lt >>> 0 & 255, O[61] = lt >>> 8 & 255, O[62] = lt >>> 16 & 255, O[63] = lt >>> 24 & 255;
    }
    function N(O, j, q, R) {
      for (var U = R[0] & 255 | (R[1] & 255) << 8 | (R[2] & 255) << 16 | (R[3] & 255) << 24, oe = q[0] & 255 | (q[1] & 255) << 8 | (q[2] & 255) << 16 | (q[3] & 255) << 24, ae = q[4] & 255 | (q[5] & 255) << 8 | (q[6] & 255) << 16 | (q[7] & 255) << 24, he = q[8] & 255 | (q[9] & 255) << 8 | (q[10] & 255) << 16 | (q[11] & 255) << 24, xe = q[12] & 255 | (q[13] & 255) << 8 | (q[14] & 255) << 16 | (q[15] & 255) << 24, Me = R[4] & 255 | (R[5] & 255) << 8 | (R[6] & 255) << 16 | (R[7] & 255) << 24, _e = j[0] & 255 | (j[1] & 255) << 8 | (j[2] & 255) << 16 | (j[3] & 255) << 24, ut = j[4] & 255 | (j[5] & 255) << 8 | (j[6] & 255) << 16 | (j[7] & 255) << 24, $e = j[8] & 255 | (j[9] & 255) << 8 | (j[10] & 255) << 16 | (j[11] & 255) << 24, Je = j[12] & 255 | (j[13] & 255) << 8 | (j[14] & 255) << 16 | (j[15] & 255) << 24, Ze = R[8] & 255 | (R[9] & 255) << 8 | (R[10] & 255) << 16 | (R[11] & 255) << 24, nt = q[16] & 255 | (q[17] & 255) << 8 | (q[18] & 255) << 16 | (q[19] & 255) << 24, tt = q[20] & 255 | (q[21] & 255) << 8 | (q[22] & 255) << 16 | (q[23] & 255) << 24, Ye = q[24] & 255 | (q[25] & 255) << 8 | (q[26] & 255) << 16 | (q[27] & 255) << 24, et = q[28] & 255 | (q[29] & 255) << 8 | (q[30] & 255) << 16 | (q[31] & 255) << 24, Qe = R[12] & 255 | (R[13] & 255) << 8 | (R[14] & 255) << 16 | (R[15] & 255) << 24, qe = U, Ge = oe, ke = ae, Ue = he, He = xe, Le = Me, be = _e, ye = ut, Be = $e, Ee = Je, Ae = Ze, Oe = nt, ot = tt, ht = Ye, dt = et, lt = Qe, ie, yt = 0; yt < 20; yt += 2)
        ie = qe + ot | 0, He ^= ie << 7 | ie >>> 32 - 7, ie = He + qe | 0, Be ^= ie << 9 | ie >>> 32 - 9, ie = Be + He | 0, ot ^= ie << 13 | ie >>> 32 - 13, ie = ot + Be | 0, qe ^= ie << 18 | ie >>> 32 - 18, ie = Le + Ge | 0, Ee ^= ie << 7 | ie >>> 32 - 7, ie = Ee + Le | 0, ht ^= ie << 9 | ie >>> 32 - 9, ie = ht + Ee | 0, Ge ^= ie << 13 | ie >>> 32 - 13, ie = Ge + ht | 0, Le ^= ie << 18 | ie >>> 32 - 18, ie = Ae + be | 0, dt ^= ie << 7 | ie >>> 32 - 7, ie = dt + Ae | 0, ke ^= ie << 9 | ie >>> 32 - 9, ie = ke + dt | 0, be ^= ie << 13 | ie >>> 32 - 13, ie = be + ke | 0, Ae ^= ie << 18 | ie >>> 32 - 18, ie = lt + Oe | 0, Ue ^= ie << 7 | ie >>> 32 - 7, ie = Ue + lt | 0, ye ^= ie << 9 | ie >>> 32 - 9, ie = ye + Ue | 0, Oe ^= ie << 13 | ie >>> 32 - 13, ie = Oe + ye | 0, lt ^= ie << 18 | ie >>> 32 - 18, ie = qe + Ue | 0, Ge ^= ie << 7 | ie >>> 32 - 7, ie = Ge + qe | 0, ke ^= ie << 9 | ie >>> 32 - 9, ie = ke + Ge | 0, Ue ^= ie << 13 | ie >>> 32 - 13, ie = Ue + ke | 0, qe ^= ie << 18 | ie >>> 32 - 18, ie = Le + He | 0, be ^= ie << 7 | ie >>> 32 - 7, ie = be + Le | 0, ye ^= ie << 9 | ie >>> 32 - 9, ie = ye + be | 0, He ^= ie << 13 | ie >>> 32 - 13, ie = He + ye | 0, Le ^= ie << 18 | ie >>> 32 - 18, ie = Ae + Ee | 0, Oe ^= ie << 7 | ie >>> 32 - 7, ie = Oe + Ae | 0, Be ^= ie << 9 | ie >>> 32 - 9, ie = Be + Oe | 0, Ee ^= ie << 13 | ie >>> 32 - 13, ie = Ee + Be | 0, Ae ^= ie << 18 | ie >>> 32 - 18, ie = lt + dt | 0, ot ^= ie << 7 | ie >>> 32 - 7, ie = ot + lt | 0, ht ^= ie << 9 | ie >>> 32 - 9, ie = ht + ot | 0, dt ^= ie << 13 | ie >>> 32 - 13, ie = dt + ht | 0, lt ^= ie << 18 | ie >>> 32 - 18;
      O[0] = qe >>> 0 & 255, O[1] = qe >>> 8 & 255, O[2] = qe >>> 16 & 255, O[3] = qe >>> 24 & 255, O[4] = Le >>> 0 & 255, O[5] = Le >>> 8 & 255, O[6] = Le >>> 16 & 255, O[7] = Le >>> 24 & 255, O[8] = Ae >>> 0 & 255, O[9] = Ae >>> 8 & 255, O[10] = Ae >>> 16 & 255, O[11] = Ae >>> 24 & 255, O[12] = lt >>> 0 & 255, O[13] = lt >>> 8 & 255, O[14] = lt >>> 16 & 255, O[15] = lt >>> 24 & 255, O[16] = be >>> 0 & 255, O[17] = be >>> 8 & 255, O[18] = be >>> 16 & 255, O[19] = be >>> 24 & 255, O[20] = ye >>> 0 & 255, O[21] = ye >>> 8 & 255, O[22] = ye >>> 16 & 255, O[23] = ye >>> 24 & 255, O[24] = Be >>> 0 & 255, O[25] = Be >>> 8 & 255, O[26] = Be >>> 16 & 255, O[27] = Be >>> 24 & 255, O[28] = Ee >>> 0 & 255, O[29] = Ee >>> 8 & 255, O[30] = Ee >>> 16 & 255, O[31] = Ee >>> 24 & 255;
    }
    function $(O, j, q, R) {
      C(O, j, q, R);
    }
    function D(O, j, q, R) {
      N(O, j, q, R);
    }
    var H = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function V(O, j, q, R, U, oe, ae) {
      var he = new Uint8Array(16), xe = new Uint8Array(64), Me, _e;
      for (_e = 0; _e < 16; _e++)
        he[_e] = 0;
      for (_e = 0; _e < 8; _e++)
        he[_e] = oe[_e];
      for (; U >= 64; ) {
        for ($(xe, he, ae, H), _e = 0; _e < 64; _e++)
          O[j + _e] = q[R + _e] ^ xe[_e];
        for (Me = 1, _e = 8; _e < 16; _e++)
          Me = Me + (he[_e] & 255) | 0, he[_e] = Me & 255, Me >>>= 8;
        U -= 64, j += 64, R += 64;
      }
      if (U > 0)
        for ($(xe, he, ae, H), _e = 0; _e < U; _e++)
          O[j + _e] = q[R + _e] ^ xe[_e];
      return 0;
    }
    function ne(O, j, q, R, U) {
      var oe = new Uint8Array(16), ae = new Uint8Array(64), he, xe;
      for (xe = 0; xe < 16; xe++)
        oe[xe] = 0;
      for (xe = 0; xe < 8; xe++)
        oe[xe] = R[xe];
      for (; q >= 64; ) {
        for ($(ae, oe, U, H), xe = 0; xe < 64; xe++)
          O[j + xe] = ae[xe];
        for (he = 1, xe = 8; xe < 16; xe++)
          he = he + (oe[xe] & 255) | 0, oe[xe] = he & 255, he >>>= 8;
        q -= 64, j += 64;
      }
      if (q > 0)
        for ($(ae, oe, U, H), xe = 0; xe < q; xe++)
          O[j + xe] = ae[xe];
      return 0;
    }
    function Q(O, j, q, R, U) {
      var oe = new Uint8Array(32);
      D(oe, R, U, H);
      for (var ae = new Uint8Array(8), he = 0; he < 8; he++)
        ae[he] = R[he + 16];
      return ne(O, j, q, ae, oe);
    }
    function se(O, j, q, R, U, oe, ae) {
      var he = new Uint8Array(32);
      D(he, oe, ae, H);
      for (var xe = new Uint8Array(8), Me = 0; Me < 8; Me++)
        xe[Me] = oe[Me + 16];
      return V(O, j, q, R, U, xe, he);
    }
    var k = function(O) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var j, q, R, U, oe, ae, he, xe;
      j = O[0] & 255 | (O[1] & 255) << 8, this.r[0] = j & 8191, q = O[2] & 255 | (O[3] & 255) << 8, this.r[1] = (j >>> 13 | q << 3) & 8191, R = O[4] & 255 | (O[5] & 255) << 8, this.r[2] = (q >>> 10 | R << 6) & 7939, U = O[6] & 255 | (O[7] & 255) << 8, this.r[3] = (R >>> 7 | U << 9) & 8191, oe = O[8] & 255 | (O[9] & 255) << 8, this.r[4] = (U >>> 4 | oe << 12) & 255, this.r[5] = oe >>> 1 & 8190, ae = O[10] & 255 | (O[11] & 255) << 8, this.r[6] = (oe >>> 14 | ae << 2) & 8191, he = O[12] & 255 | (O[13] & 255) << 8, this.r[7] = (ae >>> 11 | he << 5) & 8065, xe = O[14] & 255 | (O[15] & 255) << 8, this.r[8] = (he >>> 8 | xe << 8) & 8191, this.r[9] = xe >>> 5 & 127, this.pad[0] = O[16] & 255 | (O[17] & 255) << 8, this.pad[1] = O[18] & 255 | (O[19] & 255) << 8, this.pad[2] = O[20] & 255 | (O[21] & 255) << 8, this.pad[3] = O[22] & 255 | (O[23] & 255) << 8, this.pad[4] = O[24] & 255 | (O[25] & 255) << 8, this.pad[5] = O[26] & 255 | (O[27] & 255) << 8, this.pad[6] = O[28] & 255 | (O[29] & 255) << 8, this.pad[7] = O[30] & 255 | (O[31] & 255) << 8;
    };
    k.prototype.blocks = function(O, j, q) {
      for (var R = this.fin ? 0 : 2048, U, oe, ae, he, xe, Me, _e, ut, $e, Je, Ze, nt, tt, Ye, et, Qe, qe, Ge, ke, Ue = this.h[0], He = this.h[1], Le = this.h[2], be = this.h[3], ye = this.h[4], Be = this.h[5], Ee = this.h[6], Ae = this.h[7], Oe = this.h[8], ot = this.h[9], ht = this.r[0], dt = this.r[1], lt = this.r[2], ie = this.r[3], yt = this.r[4], Bt = this.r[5], Rt = this.r[6], vt = this.r[7], Et = this.r[8], St = this.r[9]; q >= 16; )
        U = O[j + 0] & 255 | (O[j + 1] & 255) << 8, Ue += U & 8191, oe = O[j + 2] & 255 | (O[j + 3] & 255) << 8, He += (U >>> 13 | oe << 3) & 8191, ae = O[j + 4] & 255 | (O[j + 5] & 255) << 8, Le += (oe >>> 10 | ae << 6) & 8191, he = O[j + 6] & 255 | (O[j + 7] & 255) << 8, be += (ae >>> 7 | he << 9) & 8191, xe = O[j + 8] & 255 | (O[j + 9] & 255) << 8, ye += (he >>> 4 | xe << 12) & 8191, Be += xe >>> 1 & 8191, Me = O[j + 10] & 255 | (O[j + 11] & 255) << 8, Ee += (xe >>> 14 | Me << 2) & 8191, _e = O[j + 12] & 255 | (O[j + 13] & 255) << 8, Ae += (Me >>> 11 | _e << 5) & 8191, ut = O[j + 14] & 255 | (O[j + 15] & 255) << 8, Oe += (_e >>> 8 | ut << 8) & 8191, ot += ut >>> 5 | R, $e = 0, Je = $e, Je += Ue * ht, Je += He * (5 * St), Je += Le * (5 * Et), Je += be * (5 * vt), Je += ye * (5 * Rt), $e = Je >>> 13, Je &= 8191, Je += Be * (5 * Bt), Je += Ee * (5 * yt), Je += Ae * (5 * ie), Je += Oe * (5 * lt), Je += ot * (5 * dt), $e += Je >>> 13, Je &= 8191, Ze = $e, Ze += Ue * dt, Ze += He * ht, Ze += Le * (5 * St), Ze += be * (5 * Et), Ze += ye * (5 * vt), $e = Ze >>> 13, Ze &= 8191, Ze += Be * (5 * Rt), Ze += Ee * (5 * Bt), Ze += Ae * (5 * yt), Ze += Oe * (5 * ie), Ze += ot * (5 * lt), $e += Ze >>> 13, Ze &= 8191, nt = $e, nt += Ue * lt, nt += He * dt, nt += Le * ht, nt += be * (5 * St), nt += ye * (5 * Et), $e = nt >>> 13, nt &= 8191, nt += Be * (5 * vt), nt += Ee * (5 * Rt), nt += Ae * (5 * Bt), nt += Oe * (5 * yt), nt += ot * (5 * ie), $e += nt >>> 13, nt &= 8191, tt = $e, tt += Ue * ie, tt += He * lt, tt += Le * dt, tt += be * ht, tt += ye * (5 * St), $e = tt >>> 13, tt &= 8191, tt += Be * (5 * Et), tt += Ee * (5 * vt), tt += Ae * (5 * Rt), tt += Oe * (5 * Bt), tt += ot * (5 * yt), $e += tt >>> 13, tt &= 8191, Ye = $e, Ye += Ue * yt, Ye += He * ie, Ye += Le * lt, Ye += be * dt, Ye += ye * ht, $e = Ye >>> 13, Ye &= 8191, Ye += Be * (5 * St), Ye += Ee * (5 * Et), Ye += Ae * (5 * vt), Ye += Oe * (5 * Rt), Ye += ot * (5 * Bt), $e += Ye >>> 13, Ye &= 8191, et = $e, et += Ue * Bt, et += He * yt, et += Le * ie, et += be * lt, et += ye * dt, $e = et >>> 13, et &= 8191, et += Be * ht, et += Ee * (5 * St), et += Ae * (5 * Et), et += Oe * (5 * vt), et += ot * (5 * Rt), $e += et >>> 13, et &= 8191, Qe = $e, Qe += Ue * Rt, Qe += He * Bt, Qe += Le * yt, Qe += be * ie, Qe += ye * lt, $e = Qe >>> 13, Qe &= 8191, Qe += Be * dt, Qe += Ee * ht, Qe += Ae * (5 * St), Qe += Oe * (5 * Et), Qe += ot * (5 * vt), $e += Qe >>> 13, Qe &= 8191, qe = $e, qe += Ue * vt, qe += He * Rt, qe += Le * Bt, qe += be * yt, qe += ye * ie, $e = qe >>> 13, qe &= 8191, qe += Be * lt, qe += Ee * dt, qe += Ae * ht, qe += Oe * (5 * St), qe += ot * (5 * Et), $e += qe >>> 13, qe &= 8191, Ge = $e, Ge += Ue * Et, Ge += He * vt, Ge += Le * Rt, Ge += be * Bt, Ge += ye * yt, $e = Ge >>> 13, Ge &= 8191, Ge += Be * ie, Ge += Ee * lt, Ge += Ae * dt, Ge += Oe * ht, Ge += ot * (5 * St), $e += Ge >>> 13, Ge &= 8191, ke = $e, ke += Ue * St, ke += He * Et, ke += Le * vt, ke += be * Rt, ke += ye * Bt, $e = ke >>> 13, ke &= 8191, ke += Be * yt, ke += Ee * ie, ke += Ae * lt, ke += Oe * dt, ke += ot * ht, $e += ke >>> 13, ke &= 8191, $e = ($e << 2) + $e | 0, $e = $e + Je | 0, Je = $e & 8191, $e = $e >>> 13, Ze += $e, Ue = Je, He = Ze, Le = nt, be = tt, ye = Ye, Be = et, Ee = Qe, Ae = qe, Oe = Ge, ot = ke, j += 16, q -= 16;
      this.h[0] = Ue, this.h[1] = He, this.h[2] = Le, this.h[3] = be, this.h[4] = ye, this.h[5] = Be, this.h[6] = Ee, this.h[7] = Ae, this.h[8] = Oe, this.h[9] = ot;
    }, k.prototype.finish = function(O, j) {
      var q = new Uint16Array(10), R, U, oe, ae;
      if (this.leftover) {
        for (ae = this.leftover, this.buffer[ae++] = 1; ae < 16; ae++)
          this.buffer[ae] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (R = this.h[1] >>> 13, this.h[1] &= 8191, ae = 2; ae < 10; ae++)
        this.h[ae] += R, R = this.h[ae] >>> 13, this.h[ae] &= 8191;
      for (this.h[0] += R * 5, R = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += R, R = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += R, q[0] = this.h[0] + 5, R = q[0] >>> 13, q[0] &= 8191, ae = 1; ae < 10; ae++)
        q[ae] = this.h[ae] + R, R = q[ae] >>> 13, q[ae] &= 8191;
      for (q[9] -= 1 << 13, U = (R ^ 1) - 1, ae = 0; ae < 10; ae++)
        q[ae] &= U;
      for (U = ~U, ae = 0; ae < 10; ae++)
        this.h[ae] = this.h[ae] & U | q[ae];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, oe = this.h[0] + this.pad[0], this.h[0] = oe & 65535, ae = 1; ae < 8; ae++)
        oe = (this.h[ae] + this.pad[ae] | 0) + (oe >>> 16) | 0, this.h[ae] = oe & 65535;
      O[j + 0] = this.h[0] >>> 0 & 255, O[j + 1] = this.h[0] >>> 8 & 255, O[j + 2] = this.h[1] >>> 0 & 255, O[j + 3] = this.h[1] >>> 8 & 255, O[j + 4] = this.h[2] >>> 0 & 255, O[j + 5] = this.h[2] >>> 8 & 255, O[j + 6] = this.h[3] >>> 0 & 255, O[j + 7] = this.h[3] >>> 8 & 255, O[j + 8] = this.h[4] >>> 0 & 255, O[j + 9] = this.h[4] >>> 8 & 255, O[j + 10] = this.h[5] >>> 0 & 255, O[j + 11] = this.h[5] >>> 8 & 255, O[j + 12] = this.h[6] >>> 0 & 255, O[j + 13] = this.h[6] >>> 8 & 255, O[j + 14] = this.h[7] >>> 0 & 255, O[j + 15] = this.h[7] >>> 8 & 255;
    }, k.prototype.update = function(O, j, q) {
      var R, U;
      if (this.leftover) {
        for (U = 16 - this.leftover, U > q && (U = q), R = 0; R < U; R++)
          this.buffer[this.leftover + R] = O[j + R];
        if (q -= U, j += U, this.leftover += U, this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (q >= 16 && (U = q - q % 16, this.blocks(O, j, U), j += U, q -= U), q) {
        for (R = 0; R < q; R++)
          this.buffer[this.leftover + R] = O[j + R];
        this.leftover += q;
      }
    };
    function m(O, j, q, R, U, oe) {
      var ae = new k(oe);
      return ae.update(q, R, U), ae.finish(O, j), 0;
    }
    function b(O, j, q, R, U, oe) {
      var ae = new Uint8Array(16);
      return m(ae, 0, q, R, U, oe), T(O, j, ae, 0);
    }
    function a(O, j, q, R, U) {
      var oe;
      if (q < 32)
        return -1;
      for (se(O, 0, j, 0, q, R, U), m(O, 16, O, 32, q - 32, O), oe = 0; oe < 16; oe++)
        O[oe] = 0;
      return 0;
    }
    function h(O, j, q, R, U) {
      var oe, ae = new Uint8Array(32);
      if (q < 32 || (Q(ae, 0, 32, R, U), b(j, 16, j, 32, q - 32, ae) !== 0))
        return -1;
      for (se(O, 0, j, 0, q, R, U), oe = 0; oe < 32; oe++)
        O[oe] = 0;
      return 0;
    }
    function y(O, j) {
      var q;
      for (q = 0; q < 16; q++)
        O[q] = j[q] | 0;
    }
    function x(O) {
      var j, q, R = 1;
      for (j = 0; j < 16; j++)
        q = O[j] + R + 65535, R = Math.floor(q / 65536), O[j] = q - R * 65536;
      O[0] += R - 1 + 37 * (R - 1);
    }
    function A(O, j, q) {
      for (var R, U = ~(q - 1), oe = 0; oe < 16; oe++)
        R = U & (O[oe] ^ j[oe]), O[oe] ^= R, j[oe] ^= R;
    }
    function B(O, j) {
      var q, R, U, oe = n(), ae = n();
      for (q = 0; q < 16; q++)
        ae[q] = j[q];
      for (x(ae), x(ae), x(ae), R = 0; R < 2; R++) {
        for (oe[0] = ae[0] - 65517, q = 1; q < 15; q++)
          oe[q] = ae[q] - 65535 - (oe[q - 1] >> 16 & 1), oe[q - 1] &= 65535;
        oe[15] = ae[15] - 32767 - (oe[14] >> 16 & 1), U = oe[15] >> 16 & 1, oe[14] &= 65535, A(ae, oe, 1 - U);
      }
      for (q = 0; q < 16; q++)
        O[2 * q] = ae[q] & 255, O[2 * q + 1] = ae[q] >> 8;
    }
    function _(O, j) {
      var q = new Uint8Array(32), R = new Uint8Array(32);
      return B(q, O), B(R, j), I(q, 0, R, 0);
    }
    function E(O) {
      var j = new Uint8Array(32);
      return B(j, O), j[0] & 1;
    }
    function d(O, j) {
      var q;
      for (q = 0; q < 16; q++)
        O[q] = j[2 * q] + (j[2 * q + 1] << 8);
      O[15] &= 32767;
    }
    function M(O, j, q) {
      for (var R = 0; R < 16; R++)
        O[R] = j[R] + q[R];
    }
    function Z(O, j, q) {
      for (var R = 0; R < 16; R++)
        O[R] = j[R] - q[R];
    }
    function re(O, j, q) {
      var R, U, oe = 0, ae = 0, he = 0, xe = 0, Me = 0, _e = 0, ut = 0, $e = 0, Je = 0, Ze = 0, nt = 0, tt = 0, Ye = 0, et = 0, Qe = 0, qe = 0, Ge = 0, ke = 0, Ue = 0, He = 0, Le = 0, be = 0, ye = 0, Be = 0, Ee = 0, Ae = 0, Oe = 0, ot = 0, ht = 0, dt = 0, lt = 0, ie = q[0], yt = q[1], Bt = q[2], Rt = q[3], vt = q[4], Et = q[5], St = q[6], Ft = q[7], Ct = q[8], jt = q[9], Dt = q[10], qt = q[11], Kt = q[12], Qt = q[13], er = q[14], tr = q[15];
      R = j[0], oe += R * ie, ae += R * yt, he += R * Bt, xe += R * Rt, Me += R * vt, _e += R * Et, ut += R * St, $e += R * Ft, Je += R * Ct, Ze += R * jt, nt += R * Dt, tt += R * qt, Ye += R * Kt, et += R * Qt, Qe += R * er, qe += R * tr, R = j[1], ae += R * ie, he += R * yt, xe += R * Bt, Me += R * Rt, _e += R * vt, ut += R * Et, $e += R * St, Je += R * Ft, Ze += R * Ct, nt += R * jt, tt += R * Dt, Ye += R * qt, et += R * Kt, Qe += R * Qt, qe += R * er, Ge += R * tr, R = j[2], he += R * ie, xe += R * yt, Me += R * Bt, _e += R * Rt, ut += R * vt, $e += R * Et, Je += R * St, Ze += R * Ft, nt += R * Ct, tt += R * jt, Ye += R * Dt, et += R * qt, Qe += R * Kt, qe += R * Qt, Ge += R * er, ke += R * tr, R = j[3], xe += R * ie, Me += R * yt, _e += R * Bt, ut += R * Rt, $e += R * vt, Je += R * Et, Ze += R * St, nt += R * Ft, tt += R * Ct, Ye += R * jt, et += R * Dt, Qe += R * qt, qe += R * Kt, Ge += R * Qt, ke += R * er, Ue += R * tr, R = j[4], Me += R * ie, _e += R * yt, ut += R * Bt, $e += R * Rt, Je += R * vt, Ze += R * Et, nt += R * St, tt += R * Ft, Ye += R * Ct, et += R * jt, Qe += R * Dt, qe += R * qt, Ge += R * Kt, ke += R * Qt, Ue += R * er, He += R * tr, R = j[5], _e += R * ie, ut += R * yt, $e += R * Bt, Je += R * Rt, Ze += R * vt, nt += R * Et, tt += R * St, Ye += R * Ft, et += R * Ct, Qe += R * jt, qe += R * Dt, Ge += R * qt, ke += R * Kt, Ue += R * Qt, He += R * er, Le += R * tr, R = j[6], ut += R * ie, $e += R * yt, Je += R * Bt, Ze += R * Rt, nt += R * vt, tt += R * Et, Ye += R * St, et += R * Ft, Qe += R * Ct, qe += R * jt, Ge += R * Dt, ke += R * qt, Ue += R * Kt, He += R * Qt, Le += R * er, be += R * tr, R = j[7], $e += R * ie, Je += R * yt, Ze += R * Bt, nt += R * Rt, tt += R * vt, Ye += R * Et, et += R * St, Qe += R * Ft, qe += R * Ct, Ge += R * jt, ke += R * Dt, Ue += R * qt, He += R * Kt, Le += R * Qt, be += R * er, ye += R * tr, R = j[8], Je += R * ie, Ze += R * yt, nt += R * Bt, tt += R * Rt, Ye += R * vt, et += R * Et, Qe += R * St, qe += R * Ft, Ge += R * Ct, ke += R * jt, Ue += R * Dt, He += R * qt, Le += R * Kt, be += R * Qt, ye += R * er, Be += R * tr, R = j[9], Ze += R * ie, nt += R * yt, tt += R * Bt, Ye += R * Rt, et += R * vt, Qe += R * Et, qe += R * St, Ge += R * Ft, ke += R * Ct, Ue += R * jt, He += R * Dt, Le += R * qt, be += R * Kt, ye += R * Qt, Be += R * er, Ee += R * tr, R = j[10], nt += R * ie, tt += R * yt, Ye += R * Bt, et += R * Rt, Qe += R * vt, qe += R * Et, Ge += R * St, ke += R * Ft, Ue += R * Ct, He += R * jt, Le += R * Dt, be += R * qt, ye += R * Kt, Be += R * Qt, Ee += R * er, Ae += R * tr, R = j[11], tt += R * ie, Ye += R * yt, et += R * Bt, Qe += R * Rt, qe += R * vt, Ge += R * Et, ke += R * St, Ue += R * Ft, He += R * Ct, Le += R * jt, be += R * Dt, ye += R * qt, Be += R * Kt, Ee += R * Qt, Ae += R * er, Oe += R * tr, R = j[12], Ye += R * ie, et += R * yt, Qe += R * Bt, qe += R * Rt, Ge += R * vt, ke += R * Et, Ue += R * St, He += R * Ft, Le += R * Ct, be += R * jt, ye += R * Dt, Be += R * qt, Ee += R * Kt, Ae += R * Qt, Oe += R * er, ot += R * tr, R = j[13], et += R * ie, Qe += R * yt, qe += R * Bt, Ge += R * Rt, ke += R * vt, Ue += R * Et, He += R * St, Le += R * Ft, be += R * Ct, ye += R * jt, Be += R * Dt, Ee += R * qt, Ae += R * Kt, Oe += R * Qt, ot += R * er, ht += R * tr, R = j[14], Qe += R * ie, qe += R * yt, Ge += R * Bt, ke += R * Rt, Ue += R * vt, He += R * Et, Le += R * St, be += R * Ft, ye += R * Ct, Be += R * jt, Ee += R * Dt, Ae += R * qt, Oe += R * Kt, ot += R * Qt, ht += R * er, dt += R * tr, R = j[15], qe += R * ie, Ge += R * yt, ke += R * Bt, Ue += R * Rt, He += R * vt, Le += R * Et, be += R * St, ye += R * Ft, Be += R * Ct, Ee += R * jt, Ae += R * Dt, Oe += R * qt, ot += R * Kt, ht += R * Qt, dt += R * er, lt += R * tr, oe += 38 * Ge, ae += 38 * ke, he += 38 * Ue, xe += 38 * He, Me += 38 * Le, _e += 38 * be, ut += 38 * ye, $e += 38 * Be, Je += 38 * Ee, Ze += 38 * Ae, nt += 38 * Oe, tt += 38 * ot, Ye += 38 * ht, et += 38 * dt, Qe += 38 * lt, U = 1, R = oe + U + 65535, U = Math.floor(R / 65536), oe = R - U * 65536, R = ae + U + 65535, U = Math.floor(R / 65536), ae = R - U * 65536, R = he + U + 65535, U = Math.floor(R / 65536), he = R - U * 65536, R = xe + U + 65535, U = Math.floor(R / 65536), xe = R - U * 65536, R = Me + U + 65535, U = Math.floor(R / 65536), Me = R - U * 65536, R = _e + U + 65535, U = Math.floor(R / 65536), _e = R - U * 65536, R = ut + U + 65535, U = Math.floor(R / 65536), ut = R - U * 65536, R = $e + U + 65535, U = Math.floor(R / 65536), $e = R - U * 65536, R = Je + U + 65535, U = Math.floor(R / 65536), Je = R - U * 65536, R = Ze + U + 65535, U = Math.floor(R / 65536), Ze = R - U * 65536, R = nt + U + 65535, U = Math.floor(R / 65536), nt = R - U * 65536, R = tt + U + 65535, U = Math.floor(R / 65536), tt = R - U * 65536, R = Ye + U + 65535, U = Math.floor(R / 65536), Ye = R - U * 65536, R = et + U + 65535, U = Math.floor(R / 65536), et = R - U * 65536, R = Qe + U + 65535, U = Math.floor(R / 65536), Qe = R - U * 65536, R = qe + U + 65535, U = Math.floor(R / 65536), qe = R - U * 65536, oe += U - 1 + 37 * (U - 1), U = 1, R = oe + U + 65535, U = Math.floor(R / 65536), oe = R - U * 65536, R = ae + U + 65535, U = Math.floor(R / 65536), ae = R - U * 65536, R = he + U + 65535, U = Math.floor(R / 65536), he = R - U * 65536, R = xe + U + 65535, U = Math.floor(R / 65536), xe = R - U * 65536, R = Me + U + 65535, U = Math.floor(R / 65536), Me = R - U * 65536, R = _e + U + 65535, U = Math.floor(R / 65536), _e = R - U * 65536, R = ut + U + 65535, U = Math.floor(R / 65536), ut = R - U * 65536, R = $e + U + 65535, U = Math.floor(R / 65536), $e = R - U * 65536, R = Je + U + 65535, U = Math.floor(R / 65536), Je = R - U * 65536, R = Ze + U + 65535, U = Math.floor(R / 65536), Ze = R - U * 65536, R = nt + U + 65535, U = Math.floor(R / 65536), nt = R - U * 65536, R = tt + U + 65535, U = Math.floor(R / 65536), tt = R - U * 65536, R = Ye + U + 65535, U = Math.floor(R / 65536), Ye = R - U * 65536, R = et + U + 65535, U = Math.floor(R / 65536), et = R - U * 65536, R = Qe + U + 65535, U = Math.floor(R / 65536), Qe = R - U * 65536, R = qe + U + 65535, U = Math.floor(R / 65536), qe = R - U * 65536, oe += U - 1 + 37 * (U - 1), O[0] = oe, O[1] = ae, O[2] = he, O[3] = xe, O[4] = Me, O[5] = _e, O[6] = ut, O[7] = $e, O[8] = Je, O[9] = Ze, O[10] = nt, O[11] = tt, O[12] = Ye, O[13] = et, O[14] = Qe, O[15] = qe;
    }
    function J(O, j) {
      re(O, j, j);
    }
    function ee(O, j) {
      var q = n(), R;
      for (R = 0; R < 16; R++)
        q[R] = j[R];
      for (R = 253; R >= 0; R--)
        J(q, q), R !== 2 && R !== 4 && re(q, q, j);
      for (R = 0; R < 16; R++)
        O[R] = q[R];
    }
    function ue(O, j) {
      var q = n(), R;
      for (R = 0; R < 16; R++)
        q[R] = j[R];
      for (R = 250; R >= 0; R--)
        J(q, q), R !== 1 && re(q, q, j);
      for (R = 0; R < 16; R++)
        O[R] = q[R];
    }
    function le(O, j, q) {
      var R = new Uint8Array(32), U = new Float64Array(80), oe, ae, he = n(), xe = n(), Me = n(), _e = n(), ut = n(), $e = n();
      for (ae = 0; ae < 31; ae++)
        R[ae] = j[ae];
      for (R[31] = j[31] & 127 | 64, R[0] &= 248, d(U, q), ae = 0; ae < 16; ae++)
        xe[ae] = U[ae], _e[ae] = he[ae] = Me[ae] = 0;
      for (he[0] = _e[0] = 1, ae = 254; ae >= 0; --ae)
        oe = R[ae >>> 3] >>> (ae & 7) & 1, A(he, xe, oe), A(Me, _e, oe), M(ut, he, Me), Z(he, he, Me), M(Me, xe, _e), Z(xe, xe, _e), J(_e, ut), J($e, he), re(he, Me, he), re(Me, xe, ut), M(ut, he, Me), Z(he, he, Me), J(xe, he), Z(Me, _e, $e), re(he, Me, c), M(he, he, _e), re(Me, Me, he), re(he, _e, $e), re(_e, xe, U), J(xe, ut), A(he, xe, oe), A(Me, _e, oe);
      for (ae = 0; ae < 16; ae++)
        U[ae + 16] = he[ae], U[ae + 32] = Me[ae], U[ae + 48] = xe[ae], U[ae + 64] = _e[ae];
      var Je = U.subarray(32), Ze = U.subarray(16);
      return ee(Je, Je), re(Ze, Ze, Je), B(O, Ze), 0;
    }
    function Se(O, j) {
      return le(O, j, r);
    }
    function W(O, j) {
      return i(j, 32), Se(O, j);
    }
    function K(O, j, q) {
      var R = new Uint8Array(32);
      return le(R, q, j), D(O, f, R, H);
    }
    var pe = a, me = h;
    function Ie(O, j, q, R, U, oe) {
      var ae = new Uint8Array(32);
      return K(ae, U, oe), pe(O, j, q, R, ae);
    }
    function z(O, j, q, R, U, oe) {
      var ae = new Uint8Array(32);
      return K(ae, U, oe), me(O, j, q, R, ae);
    }
    var P = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function L(O, j, q, R) {
      for (var U = new Int32Array(16), oe = new Int32Array(16), ae, he, xe, Me, _e, ut, $e, Je, Ze, nt, tt, Ye, et, Qe, qe, Ge, ke, Ue, He, Le, be, ye, Be, Ee, Ae, Oe, ot = O[0], ht = O[1], dt = O[2], lt = O[3], ie = O[4], yt = O[5], Bt = O[6], Rt = O[7], vt = j[0], Et = j[1], St = j[2], Ft = j[3], Ct = j[4], jt = j[5], Dt = j[6], qt = j[7], Kt = 0; R >= 128; ) {
        for (He = 0; He < 16; He++)
          Le = 8 * He + Kt, U[He] = q[Le + 0] << 24 | q[Le + 1] << 16 | q[Le + 2] << 8 | q[Le + 3], oe[He] = q[Le + 4] << 24 | q[Le + 5] << 16 | q[Le + 6] << 8 | q[Le + 7];
        for (He = 0; He < 80; He++)
          if (ae = ot, he = ht, xe = dt, Me = lt, _e = ie, ut = yt, $e = Bt, Je = Rt, Ze = vt, nt = Et, tt = St, Ye = Ft, et = Ct, Qe = jt, qe = Dt, Ge = qt, be = Rt, ye = qt, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = (ie >>> 14 | Ct << 32 - 14) ^ (ie >>> 18 | Ct << 32 - 18) ^ (Ct >>> 41 - 32 | ie << 32 - (41 - 32)), ye = (Ct >>> 14 | ie << 32 - 14) ^ (Ct >>> 18 | ie << 32 - 18) ^ (ie >>> 41 - 32 | Ct << 32 - (41 - 32)), Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, be = ie & yt ^ ~ie & Bt, ye = Ct & jt ^ ~Ct & Dt, Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, be = P[He * 2], ye = P[He * 2 + 1], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, be = U[He % 16], ye = oe[He % 16], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, ke = Ae & 65535 | Oe << 16, Ue = Be & 65535 | Ee << 16, be = ke, ye = Ue, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = (ot >>> 28 | vt << 32 - 28) ^ (vt >>> 34 - 32 | ot << 32 - (34 - 32)) ^ (vt >>> 39 - 32 | ot << 32 - (39 - 32)), ye = (vt >>> 28 | ot << 32 - 28) ^ (ot >>> 34 - 32 | vt << 32 - (34 - 32)) ^ (ot >>> 39 - 32 | vt << 32 - (39 - 32)), Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, be = ot & ht ^ ot & dt ^ ht & dt, ye = vt & Et ^ vt & St ^ Et & St, Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, Je = Ae & 65535 | Oe << 16, Ge = Be & 65535 | Ee << 16, be = Me, ye = Ye, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = ke, ye = Ue, Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, Me = Ae & 65535 | Oe << 16, Ye = Be & 65535 | Ee << 16, ht = ae, dt = he, lt = xe, ie = Me, yt = _e, Bt = ut, Rt = $e, ot = Je, Et = Ze, St = nt, Ft = tt, Ct = Ye, jt = et, Dt = Qe, qt = qe, vt = Ge, He % 16 === 15)
            for (Le = 0; Le < 16; Le++)
              be = U[Le], ye = oe[Le], Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = U[(Le + 9) % 16], ye = oe[(Le + 9) % 16], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, ke = U[(Le + 1) % 16], Ue = oe[(Le + 1) % 16], be = (ke >>> 1 | Ue << 32 - 1) ^ (ke >>> 8 | Ue << 32 - 8) ^ ke >>> 7, ye = (Ue >>> 1 | ke << 32 - 1) ^ (Ue >>> 8 | ke << 32 - 8) ^ (Ue >>> 7 | ke << 32 - 7), Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, ke = U[(Le + 14) % 16], Ue = oe[(Le + 14) % 16], be = (ke >>> 19 | Ue << 32 - 19) ^ (Ue >>> 61 - 32 | ke << 32 - (61 - 32)) ^ ke >>> 6, ye = (Ue >>> 19 | ke << 32 - 19) ^ (ke >>> 61 - 32 | Ue << 32 - (61 - 32)) ^ (Ue >>> 6 | ke << 32 - 6), Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, U[Le] = Ae & 65535 | Oe << 16, oe[Le] = Be & 65535 | Ee << 16;
        be = ot, ye = vt, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[0], ye = j[0], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[0] = ot = Ae & 65535 | Oe << 16, j[0] = vt = Be & 65535 | Ee << 16, be = ht, ye = Et, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[1], ye = j[1], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[1] = ht = Ae & 65535 | Oe << 16, j[1] = Et = Be & 65535 | Ee << 16, be = dt, ye = St, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[2], ye = j[2], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[2] = dt = Ae & 65535 | Oe << 16, j[2] = St = Be & 65535 | Ee << 16, be = lt, ye = Ft, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[3], ye = j[3], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[3] = lt = Ae & 65535 | Oe << 16, j[3] = Ft = Be & 65535 | Ee << 16, be = ie, ye = Ct, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[4], ye = j[4], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[4] = ie = Ae & 65535 | Oe << 16, j[4] = Ct = Be & 65535 | Ee << 16, be = yt, ye = jt, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[5], ye = j[5], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[5] = yt = Ae & 65535 | Oe << 16, j[5] = jt = Be & 65535 | Ee << 16, be = Bt, ye = Dt, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[6], ye = j[6], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[6] = Bt = Ae & 65535 | Oe << 16, j[6] = Dt = Be & 65535 | Ee << 16, be = Rt, ye = qt, Be = ye & 65535, Ee = ye >>> 16, Ae = be & 65535, Oe = be >>> 16, be = O[7], ye = j[7], Be += ye & 65535, Ee += ye >>> 16, Ae += be & 65535, Oe += be >>> 16, Ee += Be >>> 16, Ae += Ee >>> 16, Oe += Ae >>> 16, O[7] = Rt = Ae & 65535 | Oe << 16, j[7] = qt = Be & 65535 | Ee << 16, Kt += 128, R -= 128;
      }
      return R;
    }
    function F(O, j, q) {
      var R = new Int32Array(8), U = new Int32Array(8), oe = new Uint8Array(256), ae, he = q;
      for (R[0] = 1779033703, R[1] = 3144134277, R[2] = 1013904242, R[3] = 2773480762, R[4] = 1359893119, R[5] = 2600822924, R[6] = 528734635, R[7] = 1541459225, U[0] = 4089235720, U[1] = 2227873595, U[2] = 4271175723, U[3] = 1595750129, U[4] = 2917565137, U[5] = 725511199, U[6] = 4215389547, U[7] = 327033209, L(R, U, j, q), q %= 128, ae = 0; ae < q; ae++)
        oe[ae] = j[he - q + ae];
      for (oe[q] = 128, q = 256 - 128 * (q < 112 ? 1 : 0), oe[q - 9] = 0, w(oe, q - 8, he / 536870912 | 0, he << 3), L(R, U, oe, q), ae = 0; ae < 8; ae++)
        w(O, 8 * ae, R[ae], U[ae]);
      return 0;
    }
    function fe(O, j) {
      var q = n(), R = n(), U = n(), oe = n(), ae = n(), he = n(), xe = n(), Me = n(), _e = n();
      Z(q, O[1], O[0]), Z(_e, j[1], j[0]), re(q, q, _e), M(R, O[0], O[1]), M(_e, j[0], j[1]), re(R, R, _e), re(U, O[3], j[3]), re(U, U, u), re(oe, O[2], j[2]), M(oe, oe, oe), Z(ae, R, q), Z(he, oe, U), M(xe, oe, U), M(Me, R, q), re(O[0], ae, he), re(O[1], Me, xe), re(O[2], xe, he), re(O[3], ae, Me);
    }
    function ce(O, j, q) {
      var R;
      for (R = 0; R < 4; R++)
        A(O[R], j[R], q);
    }
    function we(O, j) {
      var q = n(), R = n(), U = n();
      ee(U, j[2]), re(q, j[0], U), re(R, j[1], U), B(O, R), O[31] ^= E(q) << 7;
    }
    function Ce(O, j, q) {
      var R, U;
      for (y(O[0], o), y(O[1], s), y(O[2], s), y(O[3], o), U = 255; U >= 0; --U)
        R = q[U / 8 | 0] >> (U & 7) & 1, ce(O, j, R), fe(j, O), fe(O, O), ce(O, j, R);
    }
    function Re(O, j) {
      var q = [n(), n(), n(), n()];
      y(q[0], v), y(q[1], p), y(q[2], s), re(q[3], v, p), Ce(O, q, j);
    }
    function We(O, j, q) {
      var R = new Uint8Array(64), U = [n(), n(), n(), n()], oe;
      for (q || i(j, 32), F(R, j, 32), R[0] &= 248, R[31] &= 127, R[31] |= 64, Re(U, R), we(O, U), oe = 0; oe < 32; oe++)
        j[oe + 32] = O[oe];
      return 0;
    }
    var je = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function Pe(O, j) {
      var q, R, U, oe;
      for (R = 63; R >= 32; --R) {
        for (q = 0, U = R - 32, oe = R - 12; U < oe; ++U)
          j[U] += q - 16 * j[R] * je[U - (R - 32)], q = Math.floor((j[U] + 128) / 256), j[U] -= q * 256;
        j[U] += q, j[R] = 0;
      }
      for (q = 0, U = 0; U < 32; U++)
        j[U] += q - (j[31] >> 4) * je[U], q = j[U] >> 8, j[U] &= 255;
      for (U = 0; U < 32; U++)
        j[U] -= q * je[U];
      for (R = 0; R < 32; R++)
        j[R + 1] += j[R] >> 8, O[R] = j[R] & 255;
    }
    function ct(O) {
      var j = new Float64Array(64), q;
      for (q = 0; q < 64; q++)
        j[q] = O[q];
      for (q = 0; q < 64; q++)
        O[q] = 0;
      Pe(O, j);
    }
    function ft(O, j, q, R) {
      var U = new Uint8Array(64), oe = new Uint8Array(64), ae = new Uint8Array(64), he, xe, Me = new Float64Array(64), _e = [n(), n(), n(), n()];
      F(U, R, 32), U[0] &= 248, U[31] &= 127, U[31] |= 64;
      var ut = q + 64;
      for (he = 0; he < q; he++)
        O[64 + he] = j[he];
      for (he = 0; he < 32; he++)
        O[32 + he] = U[32 + he];
      for (F(ae, O.subarray(32), q + 32), ct(ae), Re(_e, ae), we(O, _e), he = 32; he < 64; he++)
        O[he] = R[he];
      for (F(oe, O, q + 64), ct(oe), he = 0; he < 64; he++)
        Me[he] = 0;
      for (he = 0; he < 32; he++)
        Me[he] = ae[he];
      for (he = 0; he < 32; he++)
        for (xe = 0; xe < 32; xe++)
          Me[he + xe] += oe[he] * U[xe];
      return Pe(O.subarray(32), Me), ut;
    }
    function Ke(O, j) {
      var q = n(), R = n(), U = n(), oe = n(), ae = n(), he = n(), xe = n();
      return y(O[2], s), d(O[1], j), J(U, O[1]), re(oe, U, l), Z(U, U, O[2]), M(oe, O[2], oe), J(ae, oe), J(he, ae), re(xe, he, ae), re(q, xe, U), re(q, q, oe), ue(q, q), re(q, q, U), re(q, q, oe), re(q, q, oe), re(O[0], q, oe), J(R, O[0]), re(R, R, oe), _(R, U) && re(O[0], O[0], g), J(R, O[0]), re(R, R, oe), _(R, U) ? -1 : (E(O[0]) === j[31] >> 7 && Z(O[0], o, O[0]), re(O[3], O[0], O[1]), 0);
    }
    function Tt(O, j, q, R) {
      var U, oe = new Uint8Array(32), ae = new Uint8Array(64), he = [n(), n(), n(), n()], xe = [n(), n(), n(), n()];
      if (q < 64 || Ke(xe, R))
        return -1;
      for (U = 0; U < q; U++)
        O[U] = j[U];
      for (U = 0; U < 32; U++)
        O[U + 32] = R[U];
      if (F(ae, O, q), ct(ae), Ce(he, xe, ae), Re(xe, j.subarray(32)), fe(he, xe), we(oe, he), q -= 64, I(j, 0, oe, 0)) {
        for (U = 0; U < q; U++)
          O[U] = 0;
        return -1;
      }
      for (U = 0; U < q; U++)
        O[U] = j[U + 64];
      return q;
    }
    var it = 32, Fe = 24, xt = 32, rt = 16, Ve = 32, Mt = 32, at = 32, ze = 32, At = 32, st = Fe, De = xt, _t = rt, Xe = 64, X = 32, G = 64, Y = 32, te = 64;
    t.lowlevel = {
      crypto_core_hsalsa20: D,
      crypto_stream_xor: se,
      crypto_stream: Q,
      crypto_stream_salsa20_xor: V,
      crypto_stream_salsa20: ne,
      crypto_onetimeauth: m,
      crypto_onetimeauth_verify: b,
      crypto_verify_16: T,
      crypto_verify_32: I,
      crypto_secretbox: a,
      crypto_secretbox_open: h,
      crypto_scalarmult: le,
      crypto_scalarmult_base: Se,
      crypto_box_beforenm: K,
      crypto_box_afternm: pe,
      crypto_box: Ie,
      crypto_box_open: z,
      crypto_box_keypair: W,
      crypto_hash: F,
      crypto_sign: ft,
      crypto_sign_keypair: We,
      crypto_sign_open: Tt,
      crypto_secretbox_KEYBYTES: it,
      crypto_secretbox_NONCEBYTES: Fe,
      crypto_secretbox_ZEROBYTES: xt,
      crypto_secretbox_BOXZEROBYTES: rt,
      crypto_scalarmult_BYTES: Ve,
      crypto_scalarmult_SCALARBYTES: Mt,
      crypto_box_PUBLICKEYBYTES: at,
      crypto_box_SECRETKEYBYTES: ze,
      crypto_box_BEFORENMBYTES: At,
      crypto_box_NONCEBYTES: st,
      crypto_box_ZEROBYTES: De,
      crypto_box_BOXZEROBYTES: _t,
      crypto_sign_BYTES: Xe,
      crypto_sign_PUBLICKEYBYTES: X,
      crypto_sign_SECRETKEYBYTES: G,
      crypto_sign_SEEDBYTES: Y,
      crypto_hash_BYTES: te,
      gf: n,
      D: l,
      L: je,
      pack25519: B,
      unpack25519: d,
      M: re,
      A: M,
      S: J,
      Z,
      pow2523: ue,
      add: fe,
      set25519: y,
      modL: Pe,
      scalarmult: Ce,
      scalarbase: Re
    };
    function de(O, j) {
      if (O.length !== it)
        throw new Error("bad key size");
      if (j.length !== Fe)
        throw new Error("bad nonce size");
    }
    function ge(O, j) {
      if (O.length !== at)
        throw new Error("bad public key size");
      if (j.length !== ze)
        throw new Error("bad secret key size");
    }
    function ve() {
      for (var O = 0; O < arguments.length; O++)
        if (!(arguments[O] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
    }
    function Te(O) {
      for (var j = 0; j < O.length; j++)
        O[j] = 0;
    }
    t.randomBytes = function(O) {
      var j = new Uint8Array(O);
      return i(j, O), j;
    }, t.secretbox = function(O, j, q) {
      ve(O, j, q), de(q, j);
      for (var R = new Uint8Array(xt + O.length), U = new Uint8Array(R.length), oe = 0; oe < O.length; oe++)
        R[oe + xt] = O[oe];
      return a(U, R, R.length, j, q), U.subarray(rt);
    }, t.secretbox.open = function(O, j, q) {
      ve(O, j, q), de(q, j);
      for (var R = new Uint8Array(rt + O.length), U = new Uint8Array(R.length), oe = 0; oe < O.length; oe++)
        R[oe + rt] = O[oe];
      return R.length < 32 || h(U, R, R.length, j, q) !== 0 ? null : U.subarray(xt);
    }, t.secretbox.keyLength = it, t.secretbox.nonceLength = Fe, t.secretbox.overheadLength = rt, t.scalarMult = function(O, j) {
      if (ve(O, j), O.length !== Mt)
        throw new Error("bad n size");
      if (j.length !== Ve)
        throw new Error("bad p size");
      var q = new Uint8Array(Ve);
      return le(q, O, j), q;
    }, t.scalarMult.base = function(O) {
      if (ve(O), O.length !== Mt)
        throw new Error("bad n size");
      var j = new Uint8Array(Ve);
      return Se(j, O), j;
    }, t.scalarMult.scalarLength = Mt, t.scalarMult.groupElementLength = Ve, t.box = function(O, j, q, R) {
      var U = t.box.before(q, R);
      return t.secretbox(O, j, U);
    }, t.box.before = function(O, j) {
      ve(O, j), ge(O, j);
      var q = new Uint8Array(At);
      return K(q, O, j), q;
    }, t.box.after = t.secretbox, t.box.open = function(O, j, q, R) {
      var U = t.box.before(q, R);
      return t.secretbox.open(O, j, U);
    }, t.box.open.after = t.secretbox.open, t.box.keyPair = function() {
      var O = new Uint8Array(at), j = new Uint8Array(ze);
      return W(O, j), { publicKey: O, secretKey: j };
    }, t.box.keyPair.fromSecretKey = function(O) {
      if (ve(O), O.length !== ze)
        throw new Error("bad secret key size");
      var j = new Uint8Array(at);
      return Se(j, O), { publicKey: j, secretKey: new Uint8Array(O) };
    }, t.box.publicKeyLength = at, t.box.secretKeyLength = ze, t.box.sharedKeyLength = At, t.box.nonceLength = st, t.box.overheadLength = t.secretbox.overheadLength, t.sign = function(O, j) {
      if (ve(O, j), j.length !== G)
        throw new Error("bad secret key size");
      var q = new Uint8Array(Xe + O.length);
      return ft(q, O, O.length, j), q;
    }, t.sign.open = function(O, j) {
      if (ve(O, j), j.length !== X)
        throw new Error("bad public key size");
      var q = new Uint8Array(O.length), R = Tt(q, O, O.length, j);
      if (R < 0)
        return null;
      for (var U = new Uint8Array(R), oe = 0; oe < U.length; oe++)
        U[oe] = q[oe];
      return U;
    }, t.sign.detached = function(O, j) {
      for (var q = t.sign(O, j), R = new Uint8Array(Xe), U = 0; U < R.length; U++)
        R[U] = q[U];
      return R;
    }, t.sign.detached.verify = function(O, j, q) {
      if (ve(O, j, q), j.length !== Xe)
        throw new Error("bad signature size");
      if (q.length !== X)
        throw new Error("bad public key size");
      var R = new Uint8Array(Xe + O.length), U = new Uint8Array(Xe + O.length), oe;
      for (oe = 0; oe < Xe; oe++)
        R[oe] = j[oe];
      for (oe = 0; oe < O.length; oe++)
        R[oe + Xe] = O[oe];
      return Tt(U, R, R.length, q) >= 0;
    }, t.sign.keyPair = function() {
      var O = new Uint8Array(X), j = new Uint8Array(G);
      return We(O, j), { publicKey: O, secretKey: j };
    }, t.sign.keyPair.fromSecretKey = function(O) {
      if (ve(O), O.length !== G)
        throw new Error("bad secret key size");
      for (var j = new Uint8Array(X), q = 0; q < j.length; q++)
        j[q] = O[32 + q];
      return { publicKey: j, secretKey: new Uint8Array(O) };
    }, t.sign.keyPair.fromSeed = function(O) {
      if (ve(O), O.length !== Y)
        throw new Error("bad seed size");
      for (var j = new Uint8Array(X), q = new Uint8Array(G), R = 0; R < 32; R++)
        q[R] = O[R];
      return We(j, q, !0), { publicKey: j, secretKey: q };
    }, t.sign.publicKeyLength = X, t.sign.secretKeyLength = G, t.sign.seedLength = Y, t.sign.signatureLength = Xe, t.hash = function(O) {
      ve(O);
      var j = new Uint8Array(te);
      return F(j, O, O.length), j;
    }, t.hash.hashLength = te, t.verify = function(O, j) {
      return ve(O, j), O.length === 0 || j.length === 0 || O.length !== j.length ? !1 : S(O, 0, j, 0, O.length) === 0;
    }, t.setPRNG = function(O) {
      i = O;
    }, function() {
      var O = typeof self < "u" ? self.crypto || self.msCrypto : null;
      if (O && O.getRandomValues) {
        var j = 65536;
        t.setPRNG(function(q, R) {
          var U, oe = new Uint8Array(R);
          for (U = 0; U < R; U += j)
            O.getRandomValues(oe.subarray(U, U + Math.min(R - U, j)));
          for (U = 0; U < R; U++)
            q[U] = oe[U];
          Te(oe);
        });
      } else
        typeof zu < "u" && (O = Fc(), O && O.randomBytes && t.setPRNG(function(q, R) {
          var U, oe = O.randomBytes(R);
          for (U = 0; U < R; U++)
            q[U] = oe[U];
          Te(oe);
        }));
    }();
  })(e.exports ? e.exports : self.nacl = self.nacl || {});
})(L_);
var Ju = {}, $_ = {
  get exports() {
    return Ju;
  },
  set exports(e) {
    Ju = e;
  }
};
(function(e) {
  (function(t, n) {
    e.exports ? e.exports = n() : (t.nacl || (t.nacl = {}), t.nacl.util = n());
  })(Ne, function() {
    var t = {};
    function n(i) {
      if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(i))
        throw new TypeError("invalid encoding");
    }
    return t.decodeUTF8 = function(i) {
      if (typeof i != "string")
        throw new TypeError("expected string");
      var f, r = unescape(encodeURIComponent(i)), o = new Uint8Array(r.length);
      for (f = 0; f < r.length; f++)
        o[f] = r.charCodeAt(f);
      return o;
    }, t.encodeUTF8 = function(i) {
      var f, r = [];
      for (f = 0; f < i.length; f++)
        r.push(String.fromCharCode(i[f]));
      return decodeURIComponent(escape(r.join("")));
    }, typeof atob > "u" ? typeof Buffer.from < "u" ? (t.encodeBase64 = function(i) {
      return Buffer.from(i).toString("base64");
    }, t.decodeBase64 = function(i) {
      return n(i), new Uint8Array(Array.prototype.slice.call(Buffer.from(i, "base64"), 0));
    }) : (t.encodeBase64 = function(i) {
      return new Buffer(i).toString("base64");
    }, t.decodeBase64 = function(i) {
      return n(i), new Uint8Array(Array.prototype.slice.call(new Buffer(i, "base64"), 0));
    }) : (t.encodeBase64 = function(i) {
      var f, r = [], o = i.length;
      for (f = 0; f < o; f++)
        r.push(String.fromCharCode(i[f]));
      return btoa(r.join(""));
    }, t.decodeBase64 = function(i) {
      n(i);
      var f, r = atob(i), o = new Uint8Array(r.length);
      for (f = 0; f < r.length; f++)
        o[f] = r.charCodeAt(f);
      return o;
    }), t;
  });
})($_);
var k_ = Ne && Ne.__createBinding || (Object.create ? function(e, t, n, i) {
  i === void 0 && (i = n);
  var f = Object.getOwnPropertyDescriptor(t, n);
  (!f || ("get" in f ? !t.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, i, f);
} : function(e, t, n, i) {
  i === void 0 && (i = n), e[i] = t[n];
}), j_ = Ne && Ne.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Eb = Ne && Ne.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && k_(t, e, n);
  return j_(t, e), t;
};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.getEncryptionPublicKey = _r.decryptSafely = _r.decrypt = _r.encryptSafely = _r.encrypt = void 0;
const En = Eb(Wu), Tr = Eb(Ju), Vr = Vt;
function Sb({ publicKey: e, data: t, version: n }) {
  if ((0, Vr.isNullish)(e))
    throw new Error("Missing publicKey parameter");
  if ((0, Vr.isNullish)(t))
    throw new Error("Missing data parameter");
  if ((0, Vr.isNullish)(n))
    throw new Error("Missing version parameter");
  switch (n) {
    case "x25519-xsalsa20-poly1305": {
      if (typeof t != "string")
        throw new Error("Message data must be given as a string");
      const i = En.box.keyPair();
      let f;
      try {
        f = Tr.decodeBase64(e);
      } catch {
        throw new Error("Bad public key");
      }
      const r = Tr.decodeUTF8(t), o = En.randomBytes(En.box.nonceLength), s = En.box(r, o, f, i.secretKey);
      return {
        version: "x25519-xsalsa20-poly1305",
        nonce: Tr.encodeBase64(o),
        ephemPublicKey: Tr.encodeBase64(i.publicKey),
        ciphertext: Tr.encodeBase64(s)
      };
    }
    default:
      throw new Error("Encryption type/version not supported");
  }
}
_r.encrypt = Sb;
function D_({ publicKey: e, data: t, version: n }) {
  if ((0, Vr.isNullish)(e))
    throw new Error("Missing publicKey parameter");
  if ((0, Vr.isNullish)(t))
    throw new Error("Missing data parameter");
  if ((0, Vr.isNullish)(n))
    throw new Error("Missing version parameter");
  const i = 2 ** 11, f = 16;
  if (typeof t == "object" && "toJSON" in t)
    throw new Error("Cannot encrypt with toJSON property.  Please remove toJSON property");
  const r = {
    data: t,
    padding: ""
  }, s = Buffer.byteLength(JSON.stringify(r), "utf-8") % i;
  let c = 0;
  s > 0 && (c = i - s - f), r.padding = "0".repeat(c);
  const l = JSON.stringify(r);
  return Sb({ publicKey: e, data: l, version: n });
}
_r.encryptSafely = D_;
function Mb({ encryptedData: e, privateKey: t }) {
  if ((0, Vr.isNullish)(e))
    throw new Error("Missing encryptedData parameter");
  if ((0, Vr.isNullish)(t))
    throw new Error("Missing privateKey parameter");
  switch (e.version) {
    case "x25519-xsalsa20-poly1305": {
      const n = Ab(t), i = En.box.keyPair.fromSecretKey(n).secretKey, f = Tr.decodeBase64(e.nonce), r = Tr.decodeBase64(e.ciphertext), o = Tr.decodeBase64(e.ephemPublicKey), s = En.box.open(r, f, o, i);
      let c;
      try {
        c = Tr.encodeUTF8(s);
      } catch {
        throw new Error("Decryption failed.");
      }
      if (c)
        return c;
      throw new Error("Decryption failed.");
    }
    default:
      throw new Error("Encryption type/version not supported.");
  }
}
_r.decrypt = Mb;
function q_({ encryptedData: e, privateKey: t }) {
  if ((0, Vr.isNullish)(e))
    throw new Error("Missing encryptedData parameter");
  if ((0, Vr.isNullish)(t))
    throw new Error("Missing privateKey parameter");
  return JSON.parse(Mb({ encryptedData: e, privateKey: t })).data;
}
_r.decryptSafely = q_;
function U_(e) {
  const t = Ab(e), n = En.box.keyPair.fromSecretKey(t).publicKey;
  return Tr.encodeBase64(n);
}
_r.getEncryptionPublicKey = U_;
function Ab(e) {
  const t = Buffer.from(e, "hex").toString("base64");
  return Tr.decodeBase64(t);
}
(function(e) {
  var t = Ne && Ne.__createBinding || (Object.create ? function(f, r, o, s) {
    s === void 0 && (s = o);
    var c = Object.getOwnPropertyDescriptor(r, o);
    (!c || ("get" in c ? !r.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return r[o];
    } }), Object.defineProperty(f, s, c);
  } : function(f, r, o, s) {
    s === void 0 && (s = o), f[s] = r[o];
  }), n = Ne && Ne.__exportStar || function(f, r) {
    for (var o in f)
      o !== "default" && !Object.prototype.hasOwnProperty.call(r, o) && t(r, f, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.normalize = e.concatSig = void 0, n(an, e), n(mb, e), n(_r, e);
  var i = Vt;
  Object.defineProperty(e, "concatSig", { enumerable: !0, get: function() {
    return i.concatSig;
  } }), Object.defineProperty(e, "normalize", { enumerable: !0, get: function() {
    return i.normalize;
  } });
})(sp);
var F_ = Ne && Ne.__createBinding || (Object.create ? function(e, t, n, i) {
  i === void 0 && (i = n), Object.defineProperty(e, i, { enumerable: !0, get: function() {
    return t[n];
  } });
} : function(e, t, n, i) {
  i === void 0 && (i = n), e[i] = t[n];
}), H_ = Ne && Ne.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), z_ = Ne && Ne.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && F_(t, e, n);
  return H_(t, e), t;
};
Object.defineProperty(gf, "__esModule", { value: !0 });
gf.createWalletMiddleware = void 0;
const ur = lr, V_ = z_(sp), Rr = Gt;
function K_({ getAccounts: e, processDecryptMessage: t, processEncryptionPublicKey: n, processEthSignMessage: i, processPersonalMessage: f, processTransaction: r, processSignTransaction: o, processTypedMessage: s, processTypedMessageV3: c, processTypedMessageV4: l }) {
  if (!e)
    throw new Error("opts.getAccounts is required");
  return ur.createScaffoldMiddleware({
    // account lookups
    eth_accounts: ur.createAsyncMiddleware(u),
    eth_coinbase: ur.createAsyncMiddleware(v),
    // tx signatures
    eth_sendTransaction: ur.createAsyncMiddleware(p),
    eth_signTransaction: ur.createAsyncMiddleware(g),
    // message signatures
    eth_sign: ur.createAsyncMiddleware(w),
    eth_signTypedData: ur.createAsyncMiddleware(S),
    eth_signTypedData_v3: ur.createAsyncMiddleware(T),
    eth_signTypedData_v4: ur.createAsyncMiddleware(I),
    personal_sign: ur.createAsyncMiddleware(C),
    eth_getEncryptionPublicKey: ur.createAsyncMiddleware($),
    eth_decrypt: ur.createAsyncMiddleware(D),
    personal_ecRecover: ur.createAsyncMiddleware(N)
  });
  async function u(V, ne) {
    ne.result = await e(V);
  }
  async function v(V, ne) {
    const Q = await e(V);
    ne.result = Q[0] || null;
  }
  async function p(V, ne) {
    if (!r)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = V.params[0] || {};
    Q.from = await H(Q.from, V), ne.result = await r(Q, V);
  }
  async function g(V, ne) {
    if (!o)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = V.params[0] || {};
    Q.from = await H(Q.from, V), ne.result = await o(Q, V);
  }
  async function w(V, ne) {
    if (!i)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = await H(V.params[0], V), se = V.params[1], k = V.params[2] || {}, m = Object.assign(Object.assign({}, k), { from: Q, data: se });
    ne.result = await i(m, V);
  }
  async function S(V, ne) {
    if (!s)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = V.params[0], se = await H(V.params[1], V), k = "V1", m = V.params[2] || {}, b = Object.assign(Object.assign({}, m), { from: se, data: Q });
    ne.result = await s(b, V, k);
  }
  async function T(V, ne) {
    if (!c)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = await H(V.params[0], V), se = V.params[1], k = "V3", m = {
      data: se,
      from: Q,
      version: k
    };
    ne.result = await c(m, V, k);
  }
  async function I(V, ne) {
    if (!l)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = await H(V.params[0], V), se = V.params[1], k = "V4", m = {
      data: se,
      from: Q,
      version: k
    };
    ne.result = await l(m, V, k);
  }
  async function C(V, ne) {
    if (!f)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = V.params[0], se = V.params[1], k = V.params[2] || {};
    let m, b;
    if (Lu(Q) && !Lu(se)) {
      let h = "The eth_personalSign method requires params ordered ";
      h += "[message, address]. This was previously handled incorrectly, ", h += "and has been corrected automatically. ", h += "Please switch this param order for smooth behavior in the future.", ne.warning = h, m = Q, b = se;
    } else
      b = Q, m = se;
    m = await H(m, V);
    const a = Object.assign(Object.assign({}, k), { from: m, data: b });
    ne.result = await f(a, V);
  }
  async function N(V, ne) {
    const Q = V.params[0], se = V.params[1], k = V_.recoverPersonalSignature({
      data: Q,
      signature: se
    });
    ne.result = k;
  }
  async function $(V, ne) {
    if (!n)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = await H(V.params[0], V);
    ne.result = await n(Q, V);
  }
  async function D(V, ne) {
    if (!t)
      throw Rr.ethErrors.rpc.methodNotSupported();
    const Q = V.params[0], se = await H(V.params[1], V), k = V.params[2] || {}, m = Object.assign(Object.assign({}, k), { from: se, data: Q });
    ne.result = await t(m, V);
  }
  async function H(V, ne) {
    if (typeof V == "string" && V.length > 0 && Lu(V)) {
      const se = (await e(ne, {
        suppressUnauthorized: !1
      })).map((m) => m.toLowerCase()), k = V.toLowerCase();
      if (se.includes(k))
        return k;
      throw Rr.ethErrors.provider.unauthorized();
    }
    throw Rr.ethErrors.rpc.invalidParams({
      message: "Invalid parameters: must provide an Ethereum address."
    });
  }
}
gf.createWalletMiddleware = K_;
function Lu(e) {
  return e.length === 2 + 20 * 2;
}
(function(e) {
  var t = Ne && Ne.__createBinding || (Object.create ? function(i, f, r, o) {
    o === void 0 && (o = r), Object.defineProperty(i, o, { enumerable: !0, get: function() {
      return f[r];
    } });
  } : function(i, f, r, o) {
    o === void 0 && (o = r), i[o] = f[r];
  }), n = Ne && Ne.__exportStar || function(i, f) {
    for (var r in i)
      r !== "default" && !Object.prototype.hasOwnProperty.call(f, r) && t(f, i, r);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(tf, e), n(lf, e), n(df, e), n(pf, e), n(Jn, e), n(vf, e), n(Xn, e), n(Ui, e), n(bf, e), n(yf, e), n(gf, e);
})(ec);
const Bb = (e) => {
  switch (e) {
    case "ethereum":
      return {
        rpcUrl: "https://mainnet.infura.io/v3/69e7888727b84a5ab6a06cac0294ff6b",
        chainId: "0x" + 1 .toString(16)
      };
    case "evmeth-goerli":
      return {
        rpcUrl: "https://goerli.infura.io/v3/69e7888727b84a5ab6a06cac0294ff6b",
        chainId: "0x" + 5 .toString(16)
      };
    case "klaytn":
      return {
        rpcUrl: "https://gateway-v2.dcentwallet.com/klaytn/mainnet",
        chainId: "0x" + 8217 .toString(16)
      };
    case "klaytn-testnet":
      return {
        rpcUrl: "https://gateway-v2.dcentwallet.com/klaytn/testnet",
        chainId: "0x" + 1001 .toString(16)
      };
    case "evmsongbird":
      return {
        rpcUrl: "https://songbird-api.flare.network/ext/C/rpc",
        chainId: "0x" + 19 .toString(16)
      };
    default:
      throw new Error(
        `There is No network info about provided network : ${e}`
      );
  }
};
let G_ = class Rb extends Qu {
  constructor({
    network: t,
    wepin: n
  }) {
    const i = fy({ wepin: n, network: t }), { rpcUrl: f, chainId: r } = Bb(t), o = ec.createFetchMiddleware({
      rpcUrl: f
    });
    super({ rpcMiddleware: [i, o] }), this._initializeState({
      accounts: [],
      chainId: r
    });
  }
  static generate(t) {
    const n = new Rb(t);
    return window.evmproviders = window.evmproviders || {}, window.evmproviders[n.name] = n, n;
  }
};
const W_ = ({
  wepin: e,
  network: t
}) => lr.createScaffoldMiddleware({
  klay_requestAccounts: ba({ wepin: e, network: t }),
  klay_accounts: ba({ wepin: e, network: t }),
  klay_signTransaction: E1({ wepin: e, network: t }),
  klay_sendTransaction: S1({ wepin: e, network: t }),
  klay_signTypedData_v1: Fn({ wepin: e, network: t, version: "V1" }),
  klay_signTypedData_v3: Fn({ wepin: e, network: t, version: "V3" }),
  klay_signTypedData_v4: Fn({ wepin: e, network: t, version: "V4" }),
  klay_sign: ya({ wepin: e, network: t, isPersonal: !1 }),
  personal_sign: ya({ wepin: e, network: t, isPersonal: !0 })
});
class r0 extends Qu {
  constructor({
    network: t,
    wepin: n
  }) {
    const i = W_({ wepin: n, network: t }), { rpcUrl: f, chainId: r } = Bb(t), o = ec.createFetchMiddleware({
      rpcUrl: f
    });
    super({
      rpcMiddleware: [i, o]
    }), this._initializeState({
      accounts: [],
      chainId: r
    });
  }
  static generate(t) {
    const n = new r0(t);
    return window.evmproviders = window.evmproviders || {}, window.evmproviders[n.name] = n, n;
  }
}
window.Wepin && (window.Wepin.getProvider = J_);
function J_({ network: e }) {
  var i;
  if (!this._isInitialized)
    throw new Error("Wepin must be initialized to get Provider.");
  if ((i = window.evmproviders) != null && i.wepin)
    return window.evmproviders.wepin;
  const t = e.toLowerCase(), n = window.Wepin;
  switch (t) {
    case "ethereum":
    case "evmeth-goerli":
    case "evmsongbird":
      return G_.generate({ network: t, wepin: n });
    case "klaytn":
    case "klaytn-testnet":
      return r0.generate({
        network: t,
        wepin: n
      });
    case "polygon":
      throw new Error(
        `Wepin do not support a provider for network ${e} yet.`
      );
    default:
      throw new Error(`Can not resolve network name: ${e}`);
  }
}
