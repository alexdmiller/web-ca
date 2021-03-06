import * as React from "react";
import { Glyphicon, Navbar, Grid, Row, Col, Button, ButtonGroup, ButtonToolbar, Panel } from "react-bootstrap";
import update = require('react-addons-update');

import RuleView from './RuleView';
import CellBlockView from './CellBlockView';
import SymbolListView from './SymbolListView';
import CellularAutomaton from "../model/CellularAutomaton";
import Rule from '../model/Rule';
import StandaloneCellBlock from '../model/StandaloneCellBlock';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface CellularAutomatonViewProps {
}

interface CellularAutomatonViewState {
  playing: boolean
  intervalId: number
  automaton: CellularAutomaton
  selectedSymbol: string
}

class CellularAutomatonView extends React.Component<CellularAutomatonViewProps, CellularAutomatonViewState> {
  constructor(props : CellularAutomatonViewProps) {
    super(props);
    this.state = {
      automaton: null,
      playing: false,
      intervalId: null,
      selectedSymbol: null
    };
  }

  public componentDidMount() {
    var ca: CellularAutomaton = new CellularAutomaton(20, 20);
    ca.setCell(4, 4, '+');

    ca.addRule(new Rule(' ', new StandaloneCellBlock([
      ['m']
    ]), new StandaloneCellBlock([
      ['+']
    ])));


    ca.addRule(new Rule('+', new StandaloneCellBlock([
      ['m', ' ']
    ]), new StandaloneCellBlock([
      [' ', '+']
    ])));

    ca.addRule(new Rule('+', new StandaloneCellBlock([
      ['m'],
      [' ']
    ]), new StandaloneCellBlock([
      ['+'],
      ['+']
    ])));

    this.setState(update(this.state, {
      automaton: { $set: ca },
    }));

  }

  private step = () => {
    if (this.state.automaton) {
      this.state.automaton.applyRules();
      this.forceUpdate();
    }
  };

  private playAutomaton = () => {
    // TODO: factor out interval speed into state
    var intervalId: number = setInterval(this.step, 50);
    this.setState(update(this.state, {
      playing: { $set: true },
      intervalId: { $set: intervalId }
    }));
  };

  private pauseAutomaton = () => {
    clearInterval(this.state.intervalId);
    this.setState(update(this.state, {
      playing: { $set: false },
      intervalId: { $set: null }
    }));

  };

  private resetAutomaton = () => {
    // TODO
  };

  private saveAutomaton = () => {
    // TODO
  };

  private onSymbolSelected = (symbol: string) => {
    this.setState(update(this.state, {
      selectedSymbol: { $set: symbol }
    }));
  };

  private onCellChanged = (x: number, y: number, newSymbol: string) => {
    this.setState(update(this.state, {
      automaton: { $set: this.state.automaton.setCell(x, y, newSymbol) }
    }));
  };

  private onRuleChanged = (symbol: string, ruleIndex: number): (newRule: Rule) => void => {
    return (newRule: Rule): void => {
      this.state.automaton.getRulesForSymbol(symbol)[ruleIndex] = newRule;
      this.setState(update(this.state, {
        automaton: {$set: this.state.automaton}
      }));
    };
  };

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Cellular Automaton Simulator</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Panel header={
                  <ButtonToolbar>
                      <ButtonGroup>
                        {
                          !this.state.playing ?
                              <Button onClick={this.playAutomaton}><Glyphicon glyph="play" /></Button> :
                              <Button onClick={this.pauseAutomaton}><Glyphicon glyph="pause" /></Button>
                        }
                        <Button disabled={this.state.playing} onClick={this.step}><Glyphicon glyph="step-forward" /></Button>
                      </ButtonGroup>

                      <ButtonGroup>
                        <Button onClick={this.resetAutomaton}>Reset</Button>
                      </ButtonGroup>
                  </ButtonToolbar>}>
                  <CellBlockView cells={this.state.automaton} onCellChanged={this.onCellChanged} />
              </Panel>
            </Col>
            <Col md={6}>
              { this.state.automaton ?
                <SymbolListView
                    symbols={ Object.keys(this.state.automaton.getRules()) }
                    onSymbolSelected={this.onSymbolSelected}
                    selectedSymbol={this.state.selectedSymbol} />
              : '' }

              { this.state.selectedSymbol ?
                <Panel header={<h4>Rules for { this.state.selectedSymbol }</h4>}>
                  { this.state.automaton.getRules()[this.state.selectedSymbol].map((rule: Rule, index: number) =>
                    <RuleView
                        rule={rule}
                        onRuleChanged={this.onRuleChanged(this.state.selectedSymbol, index)}
                    />
                  )}
                </Panel>
              : '' }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CellularAutomatonView) as React.ComponentClass<CellularAutomatonViewProps>;
