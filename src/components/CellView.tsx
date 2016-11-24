import * as React from "react";
import update = require('react-addons-update');
import { DropTarget } from 'react-dnd';

var cellTarget = {
  canDrop: function(props: any, monitor: any) {
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
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

interface CellViewProps {
  symbol: string
  selected: boolean
  onCellChanged: (newSymbol: string) => void
  connectDropTarget: any
  canDrop: any
}

class CellView extends React.Component<CellViewProps, {}> {
  render() {
    return this.props.connectDropTarget(
        <span
            className={"ca-cell " + (this.props.selected ? "selected" : "")}>
          { this.props.symbol }
        </span>);
  }
}

export default DropTarget('symbol', cellTarget, collect)(CellView);
