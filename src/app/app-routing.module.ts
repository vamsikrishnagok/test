import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CourseComponent} from "./course/course.component";
import {CourseStartComponent} from "./course/course-start/course-start.component";
import {AssessmentComponent} from "./course/assessment/assessment.component";
import {CourseEditComponent} from "./course/course-edit/course-edit.component";
import {TutorComponent} from "./tutor/tutor.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {StudentComponent} from "./student/student.component";
import {TutorEditComponent} from "./tutor/tutor-edit/tutor-edit.component";
import {TutorStartComponent} from "./tutor/tutor-start/tutor-start.component";
import {TutorPersonComponent} from "./tutor/tutor-person/tutor-person.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentEditComponent} from "./student/student-edit/student-edit.component";
// import {MarkingGuideComponent} from "./student-list/marking-guide/marking-guide.component";
import {StudentTableComponent} from "./student-list/student-table/student-table.component";
import {SettingsComponent} from "./setting/settings.component";
import {CourseLocationsComponent} from "./setting/course-locations/course-locations.component";
import {CourseTermsComponent} from "./setting/course-terms/course-terms.component";
import {LecturerComponent} from "./lecturer/lecturer.component";
import {LecturerPersonComponent} from "./lecturer/lecturer-person/lecturer-person.component";
import {LecturerEditComponent} from "./lecturer/lecturer-edit/lecturer-edit.component";
import {MarkingGuideComponent} from "./marking-guide/marking-guide.component";
import {MarkStudentComponent} from "./student-list/mark-student/mark-student.component";

const  appRoutes: Routes = [
  //Guard when finished
  // canActivate: [AuthGuard],
  { path: '', component: SigninComponent},
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard], children: [
      { path: '', component: CourseStartComponent},
      { path: 'new', component: CourseEditComponent},
      { path: ':id', component: AssessmentComponent},
      { path: ':id/edit', component: CourseEditComponent},
    ]},
  { path: 'lecturer', component: LecturerComponent, canActivate:[AuthGuard], children:[
      { path: 'new', component: LecturerEditComponent},
      { path: ':id', component: LecturerPersonComponent},
      { path: ':id/edit', component: LecturerEditComponent},
    ]},
  { path: 'tutor', component: TutorComponent, canActivate: [AuthGuard], children: [
      { path: '', component: TutorStartComponent},
      { path: 'new', component: TutorEditComponent},
      { path: ':id', component: TutorPersonComponent},
      { path: ':id/edit', component: TutorEditComponent},
    ]},
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: CourseLocationsComponent},
      { path: 'course-locations', component: CourseLocationsComponent},
      { path: 'course-terms', component: CourseTermsComponent},
    ]},
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard], children: [
      // { path: '', component: StudentComponent},
      { path: 'new', component: StudentEditComponent}
    ]},
  { path: 'student-list', component: StudentListComponent, canActivate: [AuthGuard], children: [
      { path: '', component: StudentTableComponent},
      { path: 'mark-student', component: MarkStudentComponent},
      // { path: 'marking-guide', component: MarkingGuideComponent}
    ]},
  { path: 'marking-guide', component: MarkingGuideComponent, canActivate: [AuthGuard], children:[

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
