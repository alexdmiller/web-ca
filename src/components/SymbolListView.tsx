import * as React from "react";
import update = require('react-addons-update');
import { Panel, Button, ButtonProps } from "react-bootstrap";

interface SymbolProps {
  active: boolean
  editing: boolean
  onClick: Function
  symbol: string
}

class Symbol extends React.Component<SymbolProps, {}> {
  render() {
    return (
        <div><Button
            bsStyle={ this.props.active ? 'primary' : this.props.editing ? 'default' : 'link' }
            onClick={(event: any) => this.props.onClick(this.props.symbol, event)}>
          { this.props.symbol }
        </Button></div>);
  }
}

interface SymbolListViewProps {
  symbols: string[]
  activeSymbol: string
  editingSymbol: string
  onSelectSymbol: (symbol: string) => void
  onEditSymbol: (symbol: string) => void
}

export default class SymbolListView extends React.Component<SymbolListViewProps, {}> {
  private onSymbolClicked = (symbol: string, event: any) => {
    if (event.shiftKey) {
      this.props.onEditSymbol(symbol);
    } else {
      this.props.onSelectSymbol(symbol);
    }
  };

  render() {
    return (
      <Panel header={<h3>Symbols</h3>}>
        <div className="symbol-list">
          { this.props.symbols.map((symbol: string) => {
            return (
                <Symbol
                    symbol={symbol}
                    active={this.props.activeSymbol == symbol}
                    editing={this.props.editingSymbol == symbol}
                    onClick={this.onSymbolClicked}>
                  {symbol}
                </Symbol>);
          })}
        </div>
      </Panel>
    );
  }
}
