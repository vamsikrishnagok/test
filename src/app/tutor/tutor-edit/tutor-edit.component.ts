import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TutorService} from "../tutor.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-tutor-edit',
  templateUrl: './tutor-edit.component.html',
  styleUrls: ['./tutor-edit.component.css']
})
export class TutorEditComponent implements OnInit {
  id: number;
  editMode = false;
  tutorForm: FormGroup;
  tutorKey: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tutorService: TutorService,
              private authService: AuthService){ }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.tutorKey = this.tutorService.selectedTutor.key;
          console.log('Tutor Key in Edit page: ' + this.tutorKey);
          this.editMode = this.tutorKey != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.tutorService.updateSelectedTutor(this.tutorKey, this.tutorForm.value);
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
        //To create new users, Working fine
        this.authService.signupUser(this.tutorForm.value.email, this.tutorForm.value.password);
        //Create a new tutor and send to Firebase
        this.tutorService.createTutor(this.tutorForm.value);
      this.onCancel();
    }
  }

  onClear() {
    this.tutorForm.reset();
    this.editMode = false;
  }


  private initForm() {
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let role = '';

    if (this.editMode) {
      const tutor = this.tutorService.selectedTutor;
      firstName = tutor.firstName;
      lastName = tutor.lastName;
      email = tutor.email;
      password = tutor.password;
      role = tutor.role;

    }

    this.tutorForm = new FormGroup({
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
