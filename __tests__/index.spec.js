const { wrapProxy } = require("../index");

describe("Proxylize", () => {
  describe("Ploxylized object", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({});
    });

    it("should be defined on method", () => {
      expect(typeof object.on).toBe("function");
    });

    it("should be defined dispatch method", () => {
      expect(typeof object.on).toBe("function");
    });

    it("should fire listener if dispatch called", () => {
      const spy = jest.fn();
      object.on("foo", spy);
      object.dispatch("foo");
      expect(spy.mock.calls.length).toBe(1);
    });

    it("should fire listener when parameter set", () => {
      const spy = jest.fn();
      object.on("foo", spy);
      object.foo = "parameter";
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe("Proxylize nested object", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({ foo: {} });
    });

    it("should be defined on, dispatch in nested object", () => {
      expect(typeof object.foo.on).toBe("function");
      expect(typeof object.foo.dispatch).toBe("function");
    });

    it("should fire listener when parameter set", () => {
      const spy = jest.fn();
      object.foo.on("bar", spy);
      object.foo.bar = "bar";
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe("Proxylize object appending new nested object", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({});
      object.foo = {};
    });

    it("should be defined on, dispatch in new nested object.", () => {
      expect(typeof object.foo.on).toBe("function");
      expect(typeof object.foo.dispatch).toBe("function");
    });

    it("should fire listener when parameter set", () => {
      const spy = jest.fn();
      object.foo.on("bar", spy);
      object.foo.bar = "bar";
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe("Proxylize nested object appending new nested object", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({ foo: {} });
      object.foo.foo = {};
    });

    it("should be defined on, dispatch in nested object", () => {
      expect(typeof object.foo.foo.on).toBe("function");
      expect(typeof object.foo.foo.dispatch).toBe("function");
    });

    it("should fire listener when parameter set", () => {
      const spy = jest.fn();
      object.foo.foo.on("bar", spy);
      object.foo.foo.bar = "bar";
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe("Proxylize object appending primitive value", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({ foo: "text" });
    });

    it("should not be defined on, dispatch", () => {
      expect(typeof object.foo.on).toBe("undefined");
      expect(typeof object.foo.dispatch).toBe("undefined");
    });
  });

  describe("Proxylize object appending nested object", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({});
      object.foo = { bar: {} };
    });

    it("should be proxylized all of nested object", () => {
      expect(typeof object.on).toBe("function");
      expect(typeof object.foo.on).toBe("function");
      expect(typeof object.foo.bar.on).toBe("function");
      const spy = jest.fn();
      object.foo.bar.on("hoge", spy);
      object.foo.bar.hoge = {};
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe("Proxylize object overwritten exist parameter", () => {
    let object;
    beforeEach(() => {
      object = wrapProxy({ foo: {} });
      object.foo = { bar: {} };
    });

    it("should be ploxylized", () => {
      expect(typeof object.on).toBe("function");
      expect(typeof object.foo.on).toBe("function");
      expect(typeof object.foo.bar.on).toBe("function");
    });
  });
});