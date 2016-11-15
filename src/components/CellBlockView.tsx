import * as React from "react";
import update = require('react-addons-update');
import {CellBlock} from "../model/CellBlock";
import {Coordinate} from "../model/Coordinate";
import CellView from "../components/CellView.tsx"

interface CellBlockViewProps {
  cells: CellBlock
  onCellChanged?: () => any
  // Todo implement cell changing
}

interface CellBlockViewState {
  selectedCell: Coordinate
}

export default class CellBlockView extends React.Component<CellBlockViewProps, CellBlockViewState> {
  constructor(props: CellBlockViewProps) {
    super(props);
    this.state = { selectedCell: null }
  }

  private onCellClicked = (cellX: number, cellY: number) => {
    return () => {
      this.setState(update(this.state, {
        selectedCell: { $set: {x: cellX, y: cellY }}
      }));
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
              selected={this.state.selectedCell != null && this.state.selectedCell.x == x && this.state.selectedCell.y == y}
              onCellClicked={this.onCellClicked(x, y)}
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