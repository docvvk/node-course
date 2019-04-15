const lib = require("../exercise1");

describe("fizzbuzz", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => {
      lib.fizzbuzz("a");
    }).toThrow();
    expect(() => {
      lib.fizzbuzz(null);
    }).toThrow();
    expect(() => {
      lib.fizzbuzz(undefined);
    }).toThrow();
    expect(() => {
      lib.fizzbuzz({});
    }).toThrow();
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = lib.fizzbuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is only divisible by 3", () => {
    const result = lib.fizzbuzz(6);
    expect(result).toBe("Fizz");
  });
  it("should return FizzBuzz if input is divisible only by 5", () => {
    const result = lib.fizzbuzz(5);
    expect(result).toBe("Buzz");
  });
  it("should return input if input is not divisible by 3 and 5 ", () => {
    const result = lib.fizzbuzz(1);
    expect(result).toBe(1);
  });
});
