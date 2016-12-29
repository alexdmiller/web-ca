import * as React from "react";
import update = require('react-addons-update');
import { Panel } from "react-bootstrap";
import Rule from '../model/rules/Rule';
import { Constraint } from '../model/rules/Constraint';
import PatternMatchConstraint from '../model/rules/PatternMatchConstraint';
import CellBlockView from '../components/CellBlockView';
import PatternMatchConstraintView from './PatternMatchConstraintView';
import { CellBlock, HorizontalAnchor, VerticalAnchor } from '../model/CellBlock';


interface RuleViewProps {
  rule: Rule
  onCellClicked: (x: number, y: number, cells: CellBlock) => void
  onRuleUpdated: (rule: Rule) => void
  activeSymbol: string
}


export default class RuleView extends React.Component<RuleViewProps, {}> {
  private onResize = (
      width: number,
      height: number,
      horizontalAnchor: HorizontalAnchor,
      verticalAnchor: VerticalAnchor): void => {
    // TODO: resize each constraint separately
    // TODO: reposition anchor point
    var newRule = this.props.rule.resize(width, height, horizontalAnchor, verticalAnchor);
    this.props.onRuleUpdated(newRule);
  };

  private onCellClicked = (cells: CellBlock): (x: number, y: number) => void => {
    return (x: number, y: number) => {
      this.props.onCellClicked(x, y, cells);
    };
  };

  private onConstraintUpdated = (index: number): (constraint: Constraint) => void => {
    return (constraint: Constraint) => {
      this.props.rule.setConstraint(index, constraint);
      this.props.onRuleUpdated(this.props.rule);
    }
  };

  render() {
    return (
      <Panel>
        <Panel header="Constraints">
          {this.props.rule.getConstraints().map((constraint: Constraint, index: number) => {
            if (constraint instanceof PatternMatchConstraint) {
              return <PatternMatchConstraintView
                        constraint={constraint}
                        activeSymbol={this.props.activeSymbol}
                        onConstraintUpdated={this.onConstraintUpdated(index)} />
            }
          })}
        </Panel>

        <Panel header="Transformations">
          <CellBlockView
              cells={this.props.rule.getTransformation()}
              onCellClicked={this.onCellClicked(this.props.rule.getTransformation())}
              onResize={this.onResize}
          />
        </Panel>
      </Panel>
    );
  }
}