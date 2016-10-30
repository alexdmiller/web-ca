export class Rule {
    public static targetIdentifier: string = 'm';

    private target: string;
    private targetX: number;
    private targetY: number;
    private pattern: string[][];
    private transformation: string;

    constructor(target: string, pattern: string[][], transformation: string) {
        this.target = target;
        this.pattern = pattern;
        this.transformation = transformation;

        // TODO: enforce rectangular patterns

        for (var y = 0; y < pattern.length; y++) {
            for (var x = 0; x < pattern.length; x++) {
                if (pattern[y][x] == Rule.targetIdentifier) {
                    this.targetX = x;
                    this.targetY = y;
                }
            }
        }
    }

    public getTarget(): string {
        return this.target;
    }

    public getPattern(): string[][] {
        return this.pattern;
    }

    public getTransformation(): string {
        return this.transformation;
    }

    public getWidth(): number {
        return this.pattern[0].length;
    }

    public getHeight(): number {
        return this.pattern.length;
    }

    public getTargetX() {
        return this.targetX;
    }

    public getTargetY() {
        return this.targetY;
    }
}
