import * as React from "react";
import RuleView from './RuleView';
import CellularAutomaton from "../model/CellularAutomaton";
import { Glyphicon, Navbar, Grid, Row, Col, Button, ButtonGroup, ButtonToolbar, Panel } from "react-bootstrap";
import Rule from '../model/Rule';
import StandaloneCellBlock from '../model/StandaloneCellBlock';
import update = require('react-addons-update');

interface CellularAutomatonViewProps {
}

interface CellularAutomatonViewState {
  playing: boolean
  intervalId: number
  automaton: CellularAutomaton
}

export default class CellularAutomatonView extends React.Component<CellularAutomatonViewProps, CellularAutomatonViewState> {
  constructor(props : CellularAutomatonViewProps) {
    super(props);
    this.state = {
      automaton: null,
      playing: false,
      intervalId: null
    };
  }

  public componentDidMount() {
    var ca: CellularAutomaton = new CellularAutomaton(20, 20);
    ca.setCell(4, 4, '+');

    ca.addRule(new Rule(' ', new StandaloneCellBlock([
      ['m', '+']
    ]), new StandaloneCellBlock([
      ['+', 'm']
    ])));

    ca.addRule(new Rule(' ', new StandaloneCellBlock([
      ['+', 'm']
    ]), new StandaloneCellBlock([
      ['+', 'm']
    ])));

    ca.addRule(new Rule(' ', new StandaloneCellBlock([
      ['+'],
      ['m']
    ]), new StandaloneCellBlock([
      ['+', 'm']
    ])));

    ca.addRule(new Rule(' ', new StandaloneCellBlock([
      ['m'],
      ['+']
    ]), new StandaloneCellBlock([
      ['+', 'm']
    ])));

    ca.applyRules();

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
    var intervalId: number = setInterval(this.step, 200);
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

  render() {
    var elements: any = [];
    if (this.state.automaton) {
      for (var y = 0; y < this.state.automaton.getHeight(); y++) {
        for (var x = 0; x < this.state.automaton.getWidth(); x++) {
          elements.push(<span>{ this.state.automaton.getCell(x, y) }</span>);
        }
        elements.push(<br />);
      }
    }

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Cellular Automaton Simulator</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={12}>
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
                <div className="ca-view">
                  { elements.map((element: any) => element) }
                </div>
              </Panel>

              <Panel header={<h3>Rules</h3>}>
                { this.state.automaton ? Object.keys(this.state.automaton.getRules()).map((target: string) =>
                  <Panel>
                    { this.state.automaton.getRules()[target].map((rule: Rule) =>
                        <RuleView rule={rule} />
                    )}
                  </Panel>
                ) : '' }
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}