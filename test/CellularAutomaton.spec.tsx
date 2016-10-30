import * as React from "react";
import { CellularAutomaton } from "../src/model/CellularAutomaton";
import * as chai from "chai";

describe("CellularAutomaton", () => {
  var ca: CellularAutomaton;

  beforeEach(() => {
    ca = new CellularAutomaton(100, 100);
  });

  it("should populate lattice with spaces upon construction", () => {
    chai.assert.strictEqual(ca.getWidth(), 100);
  });
});