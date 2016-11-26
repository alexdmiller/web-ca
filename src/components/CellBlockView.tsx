import * as React from "react";
import update = require('react-addons-update');
import {CellBlock} from "../model/CellBlock";
import {Coordinate} from "../model/Coordinate";
import CellView from "../components/CellView.tsx"


enum ExpansionDirection {
  Up, Down, Left, Right
}


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

  private onExpanderCellClicked = (direction: ExpansionDirection): () => void => {
    return () => {
      console.log(direction);
    };
  };

  private expansionRow(symbol: string, direction: ExpansionDirection): JSX.Element {
    // Top expansion row
    var rowCells: any = [];
    rowCells.push(<CellView empty />);
    for (var x = 0; x < this.props.cells.getWidth(); x++) {
      rowCells.push(<CellView
          symbol={symbol}
          onCellClicked={this.onExpanderCellClicked(direction)} />);
    }
    rowCells.push(<CellView empty />);
    return (<span className="ca-row">{ rowCells }</span>);
  }

  render() {
    var elements: any = [];
    if (this.props.cells) {
      elements.push(this.expansionRow('^', ExpansionDirection.Up));

      for (var y = 0; y < this.props.cells.getHeight(); y++) {
        var rowCells: any = [];
        rowCells.push(<CellView
            symbol="<"
            onCellClicked={this.onExpanderCellClicked(ExpansionDirection.Left)} />);
        
        for (var x = 0; x < this.props.cells.getWidth(); x++) {
          rowCells.push(<CellView
              symbol={this.props.cells.getCell(x, y)}
              onCellChanged={this.onCellChanged(x, y)}
          />);
        }

        rowCells.push(<CellView
            symbol=">"
            onCellClicked={this.onExpanderCellClicked(ExpansionDirection.Right)} />);
        elements.push(<span className="ca-row">{ rowCells }</span>);
      }

      elements.push(this.expansionRow('v', ExpansionDirection.Down));
    }

    return (
        <div className="cell-block-view">
          { elements.map((element: any) => element) }
        </div>
    );
  }
}
