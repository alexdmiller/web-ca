import * as React from "react";
import update = require('react-addons-update');
import CellBlockView from "../components/CellBlockView";
import PatternMatchConstraint from "../model/rules/PatternMatchConstraint";
import { HorizontalAnchor, VerticalAnchor } from "../model/CellBlock";

interface PatternMatchConstraintViewProps {
  constraint: PatternMatchConstraint
  activeSymbol: string
  resizable?: boolean
  onResize?: (width: number, height: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor) => void
  onConstraintUpdated: (constraint: PatternMatchConstraint) => void
}

export default class PatternMatchConstraintView extends React.Component<PatternMatchConstraintViewProps, {}> {
  private onCellClicked = (x: number, y: number) => {
    this.props.constraint.getPattern().setCell(x, y, this.props.activeSymbol)
    this.props.onConstraintUpdated(this.props.constraint);
  };

  render() {
    return <div>
      <CellBlockView
          cells={this.props.constraint.getPattern()}
          onCellClicked={this.onCellClicked}
          onResize={this.props.onResize}
      />
    </div>
  }
}
