import * as React from "react";
import update = require('react-addons-update');
import { Panel, Button, ButtonProps } from "react-bootstrap";

interface SymbolProps {
  selected: boolean
  onClick: Function
  symbol: string
}

class Symbol extends React.Component<SymbolProps, {}> {
  render() {
    return (
        <div><Button
            bsStyle={ this.props.selected ? "primary" : "default" }
            onClick={() => this.props.onClick(this.props.symbol)}>
          { this.props.symbol }
        </Button></div>);
  }
}

interface SymbolListViewProps {
  symbols: string[]
  selectedSymbol: string
  onSymbolSelected: Function
}

export default class SymbolListView extends React.Component<SymbolListViewProps, {}> {
  render() {
    return (
      <Panel header={<h3>Symbols</h3>}>
        <div className="cell-block-view">
          { this.props.symbols.map((symbol: string) => {
            return (
                <Symbol
                    symbol={symbol}
                    selected={this.props.selectedSymbol == symbol}
                    onClick={this.props.onSymbolSelected}>
                  {symbol}
                </Symbol>);
          })}
        </div>
      </Panel>
    );
  }
}
