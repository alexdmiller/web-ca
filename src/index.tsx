import * as React from "react";
import * as ReactDOM from "react-dom";

import { CellularAutomatonView } from "./components/CellularAutomatonView";
import { CellularAutomaton } from './model/CellularAutomaton';
import { Rule } from './model/Rule';


var ca: CellularAutomaton = new CellularAutomaton(40, 40);

ca.addRule(new Rule(' ', [
  ['m', '+']
], '+'));

ca.applyRules();

ReactDOM.render(
  <CellularAutomatonView automaton={ca} />,
  document.getElementById("example")
);