import { CellBlock, HorizontalAnchor, VerticalAnchor } from "../CellBlock";
import { Constraint } from "./Constraint";
import StandaloneCellBlock from "../StandaloneCellBlock";
import PatternMatchConstraint from "./PatternMatchConstraint";
import CellularAutomaton from "../CellularAutomaton";

export default class Rule {
  public static TARGET: string = 'm';

  /**
   * A convenience factory function for creating a Rule with a single pattern-matching constraint. If the
   * "beforePattern" has a symbol that matches the Rule.TARGET constant, then the coordinate of that symbol
   * is used as the anchor. The anchor is set for both the "beforePattern" and "afterPattern".
   *
   * In other words, if you construct a Rule manually, then a pre-condition is that the constraints and
   * transformation must have the correct anchor locations set. This function relaxes that pre-condition,
   * and sets the anchor position based on the "beforePattern".
   */
  public static withPattern(target: string, beforePattern: CellBlock, afterPattern: CellBlock): Rule {
    beforePattern.setAnchorFromTarget(Rule.TARGET);
    afterPattern.setAnchor(beforePattern.getAnchor().x, beforePattern.getAnchor().y);
    return new Rule(target, [new PatternMatchConstraint(beforePattern)], afterPattern);
  }

  private target: string;
  private constraints: Constraint[];
  private transformation: CellBlock;

  // pre-conditions:
  //
  //  - all constrains and the afterPattern have the same dimensions
  constructor(target: string, constraints: Constraint[], transformation: CellBlock) {
    this.target = target;
    this.constraints = constraints;

    for (let constraint of constraints) {
      constraint.setRule(this);
    }

    this.transformation = transformation;
    // TODO: enforce rectangular patterns
    // TODO: enforce before pattern and after pattern are the same size
    // TODO: only allow one targetIdentifier
  }

  public getTarget(): string {
    return this.target;
  }
  
  public getTransformation(): CellBlock {
    return this.transformation;
  }

  public getWidth(): number {
    return this.transformation.getWidth()
  }

  public getHeight(): number {
    return this.transformation.getHeight();
  }

  public addConstraint(constraint: Constraint): void {
    constraint.setRule(this);
    this.constraints.push(constraint);
  }

  public getConstraints(): Constraint[] {
    return this.constraints;
  }

  public setConstraint(index: number, constraint: Constraint): void {
    this.constraints[index] = constraint;
  }

  public matches(x: number, y: number, cells: CellBlock): boolean {
    for (let constraint of this.constraints) {
      if (!constraint.matches(x, y, cells)) {
        return false;
      }
    }

    return true;
  }

  public resize(width: number, height: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor): Rule {
    // Resize all resizable constraints
    var newConstraints: Constraint[] = this.constraints.map((constraint: Constraint) => {
      if (constraint instanceof PatternMatchConstraint) {
        return (constraint as PatternMatchConstraint).resize(width, height, horizontalAnchor, verticalAnchor);
      }
      return constraint;
    });

    var newAfterPattern = this.transformation.resize(width, height, horizontalAnchor, verticalAnchor);

    return new Rule(this.target, newConstraints, newAfterPattern);
  }
}
