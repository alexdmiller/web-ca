import * as React from "react";
import update = require('react-addons-update');
import {CellBlock, HorizontalAnchor, VerticalAnchor} from "../model/CellBlock";
import CellView from "../components/CellView.tsx"


interface CellBlockViewProps {
  cells: CellBlock
  onCellClicked?: (x: number, y: number) => void
  resizable?: boolean
  onResize?: (width: number, height: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor) => void
}

export default class CellBlockView extends React.Component<CellBlockViewProps, {}> {
  private onCellClicked = (x: number, y: number): () => void => {
    return () => {
      this.props.onCellClicked(x, y);
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
              onCellClicked={this.onCellClicked(x, y)}
          />);
        }
        elements.push(<span className="ca-row">{ rowCells }</span>);
      }
    }

    return (
        <div>
          <button
              onClick={() => this.props.onResize(
                  this.props.cells.getWidth() + 1,
                  this.props.cells.getHeight() + 1,
                  HorizontalAnchor.Left,
                  VerticalAnchor.Top)}>
            Resize
          </button>

          <div className="cell-block-view">
            { elements.map((element: any) => element) }
          </div>
        </div>
    );
  }
}
