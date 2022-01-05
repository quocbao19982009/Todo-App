import { getItemCount } from "./count";

describe("getItemCount", () => {
  it("should count items correctly", () => {
    expect(getItemCount([])).toBe(0);
    expect(getItemCount(["asd"])).toBe(1);
    expect(getItemCount(["one", "two"])).toBe(2);
  });

  it("should not count boolean values", () => {
    expect(getItemCount(false, true, ["some"])).toBe(1);
  });
});
