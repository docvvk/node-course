const lib = require("../lib");
const db = require("../db");
const mail = require('../mail');

describe("absolute", () => {
  it("should return positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return positive number if input is negetive", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return 0 number if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Vivek");
    expect(result).toMatch(/Vivek/);
    expect(result).toContain("Vivek");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).not.toBeNull();

    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("shuld return a product with given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Vivek");
    expect(result).toMatchObject({ username: "Vivek" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function(customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
    it('should send email to the customer', () => {

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    })
})

// Test are first-class citizens in your source code

// Always group related tests inside a describe block

// Refactoring with confidence

// Tests should not be too specific neither too general

// Unit tests are prefferred only with code with minimal dependencies

// If you are doing too much mocking - do integration tests
