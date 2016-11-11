import * as React from "react";
import update = require('react-addons-update');
import { Panel, Button } from "react-bootstrap";

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
            return <Button
                bsStyle={ this.props.selectedSymbol == symbol ? "primary" : "default" }
                onClick={() => this.props.onSymbolSelected(symbol)}>
              {symbol}
            </Button>
          })}
        </div>
      </Panel>
    );
  }
}