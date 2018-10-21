export class Criterion {
  constructor(
    public key: string,
    public requirement: string,
    public description: string,
    public marks: number,
    public givenMarks: number,
    public givenComment: string) {
  }
}
