import * as React from "react";
import update = require('react-addons-update');
import {CellBlock, HorizontalAnchor, VerticalAnchor} from "../model/CellBlock";
import CellView from "../components/CellView.tsx"
import { Glyphicon } from "react-bootstrap";


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
        <table>
          <tr>
            <td colSpan={3} style={{textAlign: 'center'}}>
              <Glyphicon
                  glyph="arrow-up"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth(),
                      this.props.cells.getHeight() + 1,
                      HorizontalAnchor.Left,
                      VerticalAnchor.Bottom)} />
              <Glyphicon
                  glyph="arrow-down"
                  onClick={() => this.props.onResize(
                        this.props.cells.getWidth(),
                        this.props.cells.getHeight() - 1,
                        HorizontalAnchor.Left,
                        VerticalAnchor.Bottom)} />
            </td>
          </tr>
          <tr>
            <td>
              <Glyphicon
                  glyph="arrow-right"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth() - 1,
                      this.props.cells.getHeight(),
                      HorizontalAnchor.Right,
                      VerticalAnchor.Bottom)} /> <br />
              <Glyphicon
                  glyph="arrow-left"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth() + 1,
                      this.props.cells.getHeight(),
                      HorizontalAnchor.Right,
                      VerticalAnchor.Bottom)} />
            </td>
            <td className="cell-block-view">
              { elements.map((element: any) => element) }
            </td>
            <td>
              <Glyphicon
                  glyph="arrow-right"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth() + 1,
                      this.props.cells.getHeight(),
                      HorizontalAnchor.Left,
                      VerticalAnchor.Bottom)} /> <br />
              <Glyphicon
                  glyph="arrow-left"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth() - 1,
                      this.props.cells.getHeight(),
                      HorizontalAnchor.Left,
                      VerticalAnchor.Bottom)} />
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{textAlign: 'center'}}>
              <Glyphicon
                  glyph="arrow-up"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth(),
                      this.props.cells.getHeight() - 1,
                      HorizontalAnchor.Left,
                      VerticalAnchor.Top)} />
              <Glyphicon
                  glyph="arrow-down"
                  onClick={() => this.props.onResize(
                      this.props.cells.getWidth(),
                      this.props.cells.getHeight() + 1,
                      HorizontalAnchor.Left,
                      VerticalAnchor.Top)} />
            </td>
          </tr>
        </table>
    );
  }
}
