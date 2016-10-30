import * as React from "react";
import * as ReactDOM from "react-dom";

import { CellularAutomatonView } from "./components/CellularAutomatonView";
import { CellularAutomaton } from './model/CellularAutomaton';
import { Rule } from './model/Rule';
import {StandaloneCellBlock} from "./model/StandaloneCellBlock";


var ca: CellularAutomaton = new CellularAutomaton(40, 40);

var block = new StandaloneCellBlock([
  ['m', '+']
]);

ca.addRule(new Rule(' ', block, '+'));

ca.applyRules();

ReactDOM.render(
  <CellularAutomatonView automaton={ca} />,
  document.getElementById("example")
);