import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TutorService} from "../tutor.service";
import 'rxjs/Rx';
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  tutors: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tutorService: TutorService) { }

  ngOnInit() {
    this.getTutorList();
  }


  getTutorList() {
    // Use snapshotChanges().map() to store the key
    this.tutorService.getTutors().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(tutors => {
      this.tutors = tutors;
    });
  }

  onAddTutor() {
    this.tutorService.selectedTutor = new User(null, null, null, null, null, null);
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
