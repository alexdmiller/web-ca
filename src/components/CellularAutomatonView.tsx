import * as React from "react";
import { CellularAutomaton } from "../model/CellularAutomaton";

export interface CellularAutomatonViewProps { automaton: CellularAutomaton }

export class CellularAutomatonView extends React.Component<CellularAutomatonViewProps, {}> {

    render() {
        var elements: any = [];
        for (var y = 0; y < this.props.automaton.getHeight(); y++) {
            for (var x = 0; x < this.props.automaton.getWidth(); x++) {
                elements.push(<span>{ this.props.automaton.getCell(x, y) }</span>);
            }
            elements.push(<br />);
        }

        return (<div className="ca-view">
            { elements.map((element: any) => element) }
        </div>)
    }
}