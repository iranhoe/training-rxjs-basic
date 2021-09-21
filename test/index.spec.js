import { test } from "../src/scripts/debugger";

describe("test the test", function() {
    it("run test", function() {
      expect(test()).toBe(1);
    });
  });