import * as React from "react";
import * as ReactDOM from "react-dom";

import { CellularAutomatonView } from "./components/CellularAutomatonView";
import { CellularAutomaton } from './model/CellularAutomaton';

var ca: CellularAutomaton = new CellularAutomaton(40, 40);

ReactDOM.render(
    <CellularAutomatonView automaton={ca} />,
    document.getElementById("example")
);