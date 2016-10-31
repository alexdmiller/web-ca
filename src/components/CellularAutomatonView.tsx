import * as React from "react";
import CellularAutomaton from "../model/CellularAutomaton";

export interface CellularAutomatonViewProps { automaton: CellularAutomaton }

export default class CellularAutomatonView extends React.Component<CellularAutomatonViewProps, {}> {
  public componentDidMount() {
    //setInterval(this.step, 1000);
  }

  private step = () => {
    this.props.automaton.applyRules();
    this.forceUpdate();
  };

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