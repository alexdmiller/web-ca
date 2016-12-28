import {CellBlock} from "../CellBlock";
import Rule from "./Rule";
import CellularAutomaton from "../CellularAutomaton";

export abstract class Constraint {
  private rule: Rule;

  abstract matches(x: number, y: number, cells: CellBlock): boolean;

  public setRule(rule: Rule) {
    this.rule = rule;
  }

  public getRule(): Rule {
    return this.rule;
  }
}
