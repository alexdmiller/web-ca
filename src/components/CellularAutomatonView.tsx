import * as React from "react";
import { Glyphicon, Navbar, Grid, Row, Col, Button, ButtonGroup, ButtonToolbar, Panel } from "react-bootstrap";
import update = require('react-addons-update');

import RuleView from './RuleView';
import CellBlockView from './CellBlockView';
import SymbolListView from './SymbolListView';
import CellularAutomaton from "../model/CellularAutomaton";
import Rule from '../model/Rule';
import StandaloneCellBlock from '../model/StandaloneCellBlock';
import {CellBlock} from "../model/CellBlock";

interface CellularAutomatonViewProps {
}

interface CellularAutomatonViewState {
  playing: boolean
  intervalId: number
  automaton: CellularAutomaton
  activeSymbol: string
  editingSymbol: string
}

export default class CellularAutomatonView extends React.Component<CellularAutomatonViewProps, CellularAutomatonViewState> {
  constructor(props : CellularAutomatonViewProps) {
    super(props);
    this.state = {
      automaton: null,
      playing: false,
      intervalId: null,
      activeSymbol: null,
      editingSymbol: null
    };
  }

  public componentDidMount() {
    var ca: CellularAutomaton = new CellularAutomaton(20, 20);
    ca.setCell(4, 4, '+');

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


    ca.addRule(new Rule('/', new StandaloneCellBlock([
      [' ', 'm', ' ']
    ]), new StandaloneCellBlock([
      ['/', ' ', '+']
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

  private onSelectSymbol = (symbol: string) => {
    this.setState(update(this.state, {
      activeSymbol: { $set: symbol }
    }));
  };

  private onEditSymbol = (symbol: string) => {
    this.setState(update(this.state, {
      activeSymbol: { $set: symbol },
      editingSymbol: { $set: symbol }
    }));
  };


  private onCellClicked = (x: number, y: number) => {
    this.setState(update(this.state, {
      automaton: { $set: this.state.automaton.setCell(x, y, this.state.activeSymbol) }
    }));
  };

  private onRuleCellClicked = (x: number, y: number, cells: CellBlock): void => {
    cells.setCell(x, y, this.state.activeSymbol);
    this.forceUpdate();
  };

  private onRuleUpdated = (symbol: string, ruleIndex: number) => {
    return (newRule: Rule) => {
      this.state.automaton.getRulesForSymbol(symbol)[ruleIndex] = newRule;
      this.forceUpdate();
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

                { this.state.automaton ? <CellBlockView cells={this.state.automaton} onCellClicked={this.onCellClicked} /> : ''}
              </Panel>
            </Col>
            <Col md={6}>
              { this.state.automaton ?
                <SymbolListView
                    symbols={ Object.keys(this.state.automaton.getRules()) }
                    onSelectSymbol={this.onSelectSymbol}
                    onEditSymbol={this.onEditSymbol}
                    activeSymbol={this.state.activeSymbol}
                    editingSymbol={this.state.editingSymbol} />
              : '' }

              { this.state.editingSymbol ?
                <Panel header={<h4>Rules for { this.state.editingSymbol }</h4>}>
                  { this.state.automaton.getRules()[this.state.editingSymbol].map((rule: Rule, index: number) =>
                    <RuleView
                        rule={rule}
                        onCellClicked={this.onRuleCellClicked}
                        onRuleUpdated={this.onRuleUpdated(this.state.editingSymbol, index)}
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
