import {AssessmentDetail} from '../shared/assessment-detail.model';
// import {Student} from "../student/student.model";

// @ts-ignore
export class Course {
  constructor(
    public key: string,
    public id: string,
    public name: string,
    public term: string,
    public location: string,
    public lecturer: string,
    public tutor: any[],
    public assessments: AssessmentDetail[]
  ) {}

  // public students: Student[];

  // constructor (id: string, name: string, location: string, term: string, assessments: AssessmentDetail[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.location = location;
  //   this.term = term;
  //   this.assessments = assessments;
  //   // this.students = students;
  // }
}
