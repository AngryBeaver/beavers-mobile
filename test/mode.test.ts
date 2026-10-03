import { describe, expect, it } from "vitest";
import { PHONE_MAX_WIDTH, useMobileSheet } from "../src/core/mode.js";

describe("useMobileSheet", () => {
  it("auto: phones get the mobile sheet", () => {
    expect(useMobileSheet("auto", 360)).toBe(true);
    expect(useMobileSheet("auto", 430)).toBe(true);
    expect(useMobileSheet("auto", PHONE_MAX_WIDTH)).toBe(true);
  });

  it("auto: tablets and desktops keep their sheet", () => {
    expect(useMobileSheet("auto", PHONE_MAX_WIDTH + 1)).toBe(false);
    expect(useMobileSheet("auto", 768)).toBe(false);
    expect(useMobileSheet("auto", 1920)).toBe(false);
  });

  it("always and never ignore the viewport", () => {
    expect(useMobileSheet("always", 1920)).toBe(true);
    expect(useMobileSheet("never", 360)).toBe(false);
  });
});
