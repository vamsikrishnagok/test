import {Criterion} from "./criterion.model";

export class MarkingGuide {
  constructor(
    public key: string,
    // public course: string,
    // public assessment: string,
    public criterion: Criterion[]
  ) {}
}
