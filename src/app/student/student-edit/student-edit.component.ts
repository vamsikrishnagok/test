import {Component, OnInit} from '@angular/core';
import {StudentService} from "../student.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }


  onSubmit() {
    this.studentService.createStudent(this.studentForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let studentId = '';
    let firstName = '';
    let lastName = '';
    let email = '';

    this.studentForm = new FormGroup({
      'studentId': new FormControl(studentId, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
    });


  }
}
