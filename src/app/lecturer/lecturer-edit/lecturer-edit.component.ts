import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LecturerService} from "../lecturer.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-lecturer-edit',
  templateUrl: './lecturer-edit.component.html',
  styleUrls: ['./lecturer-edit.component.css']
})
export class LecturerEditComponent implements OnInit {
  id: number;
  editMode = false;
  lecturerForm: FormGroup;
  lecturerKey: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private lecturerService: LecturerService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.lecturerKey = this.lecturerService.selectedLecturer.key;
          console.log('Lecturer Key in Edit page: ' + this.lecturerKey);
          this.editMode = this.lecturerKey != null;
          this.initForm();
        }
      );
  }

  onClear() {
    this.lecturerForm.reset();
    this.editMode = false;
  }

  onSubmit() {
    if (this.editMode) {
      this.lecturerService.updateSelectedLecturer(this.lecturerKey, this.lecturerForm.value);
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
        //Create a new lecturer and send to Firebase
        this.lecturerService.createLecturer(this.lecturerForm.value);
        //To create new users, Working fine
        this.authService.signupUser(this.lecturerForm.value.email, this.lecturerForm.value.password);
      this.onCancel();
    }
  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let role = '';

    if (this.editMode) {
      const lecturer = this.lecturerService.selectedLecturer;
      firstName = lecturer.firstName;
      lastName = lecturer.lastName;
      email = lecturer.email;
      password = lecturer.password;
      role = lecturer.role;

    }

    this.lecturerForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(6)]),
      'role': new FormControl(role, Validators.required),
    });


  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
