import * as React from "react";
import update = require('react-addons-update');
import {CellBlock} from "../model/CellBlock";
import {Coordinate} from "../model/Coordinate";
import CellView from "../components/CellView.tsx"

interface CellBlockViewProps {
  cells: CellBlock
  onCellChanged: (x: number, y: number, symbol: string) => void
}

export default class CellBlockView extends React.Component<CellBlockViewProps, {}> {
  private onCellChanged = (x: number, y: number) => {
    return (newSymbol: string) => {
      this.props.onCellChanged(x, y, newSymbol);
    };
  };

  render() {
    var elements: any = [];
    if (this.props.cells) {
      for (var y = 0; y < this.props.cells.getHeight(); y++) {
        var rowCells: any = [];
        for (var x = 0; x < this.props.cells.getWidth(); x++) {
          rowCells.push(<CellView
              symbol={this.props.cells.getCell(x, y)}
              onCellChanged={this.onCellChanged(x, y)}
          />);
        }
        elements.push(<span className="ca-row">{ rowCells }</span>);
      }
    }

    return (
        <div className="cell-block-view">
          { elements.map((element: any) => element) }
        </div>
    );
  }
}
