import * as React from "react";
import update = require('react-addons-update');
import { Panel } from "react-bootstrap";
import Rule from '../model/Rule'
import CellBlockView from '../components/CellBlockView';

interface RuleViewProps {
  rule: Rule
  onRuleChanged: (rule: Rule) => void
}

export default class RuleView extends React.Component<RuleViewProps, {}> {
  private onBeforeCellChanged = (x: number, y: number, newSymbol: string): void => {
    this.props.rule.getBeforePattern().setCell(x, y, newSymbol);
    this.props.onRuleChanged(this.props.rule);
  };

  private onAfterCellChanged = (x: number, y: number, newSymbol: string): void => {
    this.props.rule.getAfterPattern().setCell(x, y, newSymbol);
    this.props.onRuleChanged(this.props.rule);
  };

  render() {
    return (
      <Panel>
        <Panel>
          When pattern is...
          <CellBlockView
              cells={this.props.rule.getBeforePattern()}
              onCellChanged={this.onBeforeCellChanged} />
        </Panel>

        <Panel>
          Transform into...
          <CellBlockView
              cells={this.props.rule.getAfterPattern()}
              onCellChanged={this.onAfterCellChanged} />
        </Panel>
      </Panel>
    );
  }
}