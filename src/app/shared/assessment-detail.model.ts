import {MarkingGuide} from "../marking-guide/marking-guide.model";
import {Criterion} from "../marking-guide/criterion.model";

export class AssessmentDetail {
  constructor (
    public key: string,
    public name: string,
    // public markingGuide: MarkingGuide[]
    public criterion: Criterion[]
) {}
}
