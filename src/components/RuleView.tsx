import * as React from "react";
import update = require('react-addons-update');
import { Panel } from "react-bootstrap";
import Rule from '../model/Rule'
import CellBlockView from '../components/CellBlockView';

interface RuleViewProps {
  rule: Rule
}

export default class RuleView extends React.Component<RuleViewProps, {}> {
  render() {
    return (
      <Panel>
        <Panel>
          When pattern is...
          <CellBlockView cells={this.props.rule.getBeforePattern()} />
        </Panel>

        <Panel>
          Transform into...
          <CellBlockView cells={this.props.rule.getAfterPattern()} />
        </Panel>
      </Panel>
    );
  }
}