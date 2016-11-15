import * as React from "react";
import update = require('react-addons-update');

interface CellViewProps {
  symbol: string
  selected: boolean
  onCellClicked: () => void;
}

export default class CellView extends React.Component<CellViewProps, {}> {
  render() {
    return (
        <span
            className={"ca-cell " + (this.props.selected ? "selected" : "")}
            onClick={this.props.onCellClicked}>
          { this.props.symbol }
        </span>);
  }
}