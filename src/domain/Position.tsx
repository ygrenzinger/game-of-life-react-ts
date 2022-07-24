export default class Position {
  readonly rowIndex: number;

  readonly columnIndex: number;

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  toString = (): string => `${this.rowIndex}-${this.columnIndex}`;

  static parse = (s: string): Position => {
    const parsed = s.split("-");
    return new Position(parseInt(parsed[0], 10), parseInt(parsed[1], 10));
  };
}
