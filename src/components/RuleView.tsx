import * as React from "react";
import update = require('react-addons-update');
import { Panel } from "react-bootstrap";
import Rule from '../model/Rule'
import CellBlockView from '../components/CellBlockView';
import { CellBlock, HorizontalAnchor, VerticalAnchor } from '../model/CellBlock';


interface RuleViewProps {
  rule: Rule
  onCellClicked: (x: number, y: number, cells: CellBlock) => void
  onRuleUpdated: (rule: Rule) => void
}


export default class RuleView extends React.Component<RuleViewProps, {}> {
  private onResize = (
      width: number,
      height: number,
      horizontalAnchor: HorizontalAnchor,
      verticalAnchor: VerticalAnchor): void => {
    var newRule = new Rule(
        this.props.rule.getTarget(),
        this.props.rule.getBeforePattern().resize(width, height, horizontalAnchor, verticalAnchor),
        this.props.rule.getAfterPattern().resize(width, height, horizontalAnchor, verticalAnchor));
    this.props.onRuleUpdated(newRule);
  };

  private onCellClicked = (cells: CellBlock): (x: number, y: number) => void => {
    return (x: number, y: number) => {
      this.props.onCellClicked(x, y, cells);
    };
  };

  render() {
    return (
      <Panel>
        <Panel>
          When pattern is...
          <CellBlockView
              cells={this.props.rule.getBeforePattern()}
              onCellClicked={this.onCellClicked(this.props.rule.getBeforePattern())}
              onResize={this.onResize}
          />
        </Panel>

        <Panel>
          Transform into...
          <CellBlockView
              cells={this.props.rule.getAfterPattern()}
              onCellClicked={this.onCellClicked(this.props.rule.getAfterPattern())}
              onResize={this.onResize}
          />
        </Panel>
      </Panel>
    );
  }
}