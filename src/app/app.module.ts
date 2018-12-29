import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './course/course.component';
import { AssessmentComponent } from './course/assessment/assessment.component';
import {CourseItemComponent} from './course/course-item/course-item.component';
import { CourseDetailComponent } from './course/course-item/course-detail/course-detail.component';
import {AppRoutingModule} from "./app-routing.module";
import { CourseStartComponent } from './course/course-start/course-start.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import { TutorComponent } from './tutor/tutor.component';
import {CourseService} from "./course/course.service";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from "./auth/auth.service";
import {DataStorageService} from "./shared/data-storage.service";
import {AuthGuard} from "./auth/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";
import { StudentComponent } from './student/student.component';
// import {StudentListService} from "./student-list/student-list.service";
import { TutorEditComponent } from './tutor/tutor-edit/tutor-edit.component';
import { TutorListComponent } from './tutor/tutor-list/tutor-list.component';
import { TutorDetailComponent } from './tutor/tutor-list/tutor-detail/tutor-detail.component';
import {TutorService} from "./tutor/tutor.service";
import { TutorStartComponent } from './tutor/tutor-start/tutor-start.component';
import { TutorPersonComponent } from './tutor/tutor-person/tutor-person.component';
import { StudentListComponent } from './student-list/student-list.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {StudentService} from "./student/student.service";
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { AssessmentEditComponent } from './course/assessment/assessment-edit/assessment-edit.component';
import { StudentTableComponent } from './student-list/student-table/student-table.component';
import { SettingsComponent } from './setting/settings.component';
import { CourseLocationsComponent } from './setting/course-locations/course-locations.component';
import { CourseTermsComponent } from './setting/course-terms/course-terms.component';
import { CourseLocationsEditComponent } from './setting/course-locations/course-locations-edit/course-locations-edit.component';
import {SettingsService} from "./setting/settings.service";
import { CourseTermsEditComponent } from './setting/course-terms/course-terms-edit/course-terms-edit.component';
import { CourseAssignComponent } from './tutor/tutor-person/course-assign/course-assign.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LecturerListComponent } from './lecturer/lecturer-list/lecturer-list.component';
import { LecturerDetailComponent } from './lecturer/lecturer-list/lecturer-detail/lecturer-detail.component';
import { LecturerPersonComponent } from './lecturer/lecturer-person/lecturer-person.component';
import {LecturerService} from "./lecturer/lecturer.service";
import { LecturerEditComponent } from './lecturer/lecturer-edit/lecturer-edit.component';
import {MarkingGuideService} from "./marking-guide/marking-guide.service";
import {MarkingGuideEditComponent} from "./marking-guide/marking-guide-edit/marking-guide-edit.component";
import {MarkingGuideComponent} from "./marking-guide/marking-guide.component";
import {StudentListService} from "./student-list/student-list.service";
import { MarkStudentComponent } from './student-list/mark-student/mark-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseComponent,
    AssessmentComponent,
    CourseItemComponent,
    CourseDetailComponent,
    CourseStartComponent,
    CourseEditComponent,
    DropdownDirective,
    TutorComponent,
    SignupComponent,
    SigninComponent,
    StudentComponent,
    TutorEditComponent,
    TutorListComponent,
    TutorDetailComponent,
    TutorStartComponent,
    TutorPersonComponent,
    StudentListComponent,
    StudentEditComponent,
    AssessmentEditComponent,
    MarkingGuideComponent,
    StudentTableComponent,
    MarkingGuideEditComponent,
    SettingsComponent,
    CourseLocationsComponent,
    CourseTermsComponent,
    CourseLocationsEditComponent,
    CourseTermsEditComponent,
    CourseAssignComponent,
    LecturerComponent,
    LecturerListComponent,
    LecturerDetailComponent,
    LecturerPersonComponent,
    LecturerEditComponent,
    MarkStudentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [CourseService, MarkingGuideService, LecturerService, AuthService, SettingsService, DataStorageService, AuthGuard, StudentListService, TutorService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
