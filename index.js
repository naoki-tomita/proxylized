function wrapObservable(obj) {
  obj.listeners = {};
  obj.on = function(type, listener) {
    this.listeners[type] = [...(this.listeners[type] || []), listener];
  };
  obj.dispatch = function(type) {
    (this.listeners[type] || []).forEach(listener => listener());
  };
  return obj;
}

exports.wrapProxy = function wrapProxy(obj) {
  return gaze(obj, x => {
    x = wrapObservable(x);
    const wrapped = new Proxy(x, {
      set(target, prop, value) {
        target[prop] = wrapProxy(value);
        wrapped.dispatch(prop);
      }
    });
    return wrapped;
  });
}

function gaze(obj, handler) {
  if (typeof obj !== "object") {
    return obj;
  }
  const dst = {};
  Object.keys(obj).forEach(key => {
    dst[key] = gaze(obj[key], handler);
  });
  return handler(dst);
}
