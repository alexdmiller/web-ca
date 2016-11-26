import * as React from "react";
import update = require('react-addons-update');
import { DropTarget } from 'react-dnd';


const cellTarget = {
  canDrop: function(props: any, monitor: any) {
    // update to only allow for certain cells
    return true;
  },

  drop: function(props: any, monitor: any, component: any) {
    var item: any = monitor.getItem();
    props.onCellChanged(item.symbol);
  }
};


function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}


interface CellViewProps {
  symbol?: string
  onCellChanged?: (newSymbol: string) => void
  onCellClicked?: () => void
  empty?: boolean
  connectDropTarget: any
  canDrop: any
  isOver: boolean
  isOverCurrent: boolean
}


class CellView extends React.Component<CellViewProps, {}> {
  render() {
    return this.props.connectDropTarget(
        <span
            className={"ca-cell " + (this.props.isOver ? "selected" : "") + " " + (this.props.empty ? "empty" : "")}
            onClick={this.props.onCellClicked}>
          { this.props.symbol }
        </span>);
  }
}

export default DropTarget('symbol', cellTarget, collect)(CellView);
