export class Rule {
    private target: string;
    private pattern: string[][];
    private transformation: string;

    constructor(target: string, pattern: string[][], transformation: string) {
        this.target = target;
        this.pattern = pattern;
        this.transformation = transformation;
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
}
