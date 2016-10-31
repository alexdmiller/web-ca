import * as React from "react";
import * as ReactDOM from "react-dom";

import CellularAutomatonView from "./components/CellularAutomatonView";
import CellularAutomaton from './model/CellularAutomaton';
import Rule from './model/Rule';
import StandaloneCellBlock from "./model/StandaloneCellBlock";

var ca: CellularAutomaton = new CellularAutomaton(10, 10);
ca.setCell(4, 4, '+');

// ca.addRule(new Rule(' ', new StandaloneCellBlock([
//   ['m', '+']
// ]), '+'));

ca.addRule(new Rule(' ', new StandaloneCellBlock([
  ['+', 'm']
]), '+'));

// ca.addRule(new Rule(' ', new StandaloneCellBlock([
//   ['+'],
//   ['m']
// ]), '+'));

// ca.addRule(new Rule(' ', new StandaloneCellBlock([
//   ['m'],
//   ['+']
// ]), '+'));

ca.applyRules();

ReactDOM.render(
  <CellularAutomatonView automaton={ca} />,
  document.getElementById("example")
);