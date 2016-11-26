import * as React from "react";
import update = require('react-addons-update');
import { Panel, Button, ButtonProps } from "react-bootstrap";
import { DragSource } from 'react-dnd';

interface SymbolProps {
  selected: boolean
  connectDragSource?: any
  isDragging?: boolean
  onClick: Function
  symbol: string
}

class Symbol extends React.Component<SymbolProps, {}> {
  render() {
    return (
        this.props.connectDragSource(<div><Button
            bsStyle={ this.props.selected ? "primary" : "default" }
            bsSize="small"
            onClick={() => this.props.onClick(this.props.symbol)}>
          { this.props.symbol }
        </Button></div>)
    );
  }
}

const symbolDragSource = {
  beginDrag(props: any) {
    return  { symbol: props.symbol };
  }
};

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var DraggableSymbol = DragSource('symbol', symbolDragSource, collect)(Symbol) as React.ComponentClass<SymbolProps>;

interface SymbolListViewProps {
  symbols: string[]
  selectedSymbol: string
  onSymbolSelected: Function
}

export default class SymbolListView extends React.Component<SymbolListViewProps, {}> {
  render() {
    return (
      <Panel header={<h3>Symbols</h3>}>
        <div className="symbol-list">
          { this.props.symbols.map((symbol: string) => {
            return (
                <DraggableSymbol
                    symbol={symbol}
                    selected={this.props.selectedSymbol == symbol}
                    onClick={this.props.onSymbolSelected}>
                  {symbol}
                </DraggableSymbol>);
          })}
        </div>
      </Panel>
    );
  }
}
