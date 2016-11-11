import * as React from "react";
import update = require('react-addons-update');
import {CellBlock} from "../model/CellBlock";

interface CellBlockViewProps {
  cells: CellBlock
}

export default class CellBlockView extends React.Component<CellBlockViewProps, {}> {
  render() {
    var elements: any = [];
    if (this.props.cells) {
      for (var y = 0; y < this.props.cells.getHeight(); y++) {
        for (var x = 0; x < this.props.cells.getWidth(); x++) {
          elements.push(<span>{ this.props.cells.getCell(x, y) }</span>);
        }
        elements.push(<br />);
      }
    }

    return (
        <div className="cell-block-view">
          { elements.map((element: any) => element) }
        </div>
    );
  }
}