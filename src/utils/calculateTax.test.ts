import calculateTax from "./calculateTax";
import { describe, it, expect } from "vitest";

// testing the only complicated util in the project. vitest works exactly like jest,
// but is better optimized for the use with Vite
describe("calculateTax", () => {
  it("should calculate tax correctly for a single bracket", () => {
    const salary = 50000;
    const brackets = [{ min: 0, max: 100000, rate: 0.2 }];
    const expected = {
      taxRate: 0.2,
      taxOwed: 10000,
      taxPerBand: [{ min: 0, max: 100000, rate: 0.2, amount: 10000 }],
      effectiveTaxRate: 0.25,
    };
    const result = calculateTax(salary, brackets);
    expect(result).toEqual(expected);
  });
});
