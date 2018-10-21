import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LecturerService} from "../lecturer.service";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {
  lecturers: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lecturerService: LecturerService) { }

  ngOnInit() {
    this.getLecturerList();
  }

  getLecturerList() {
    // Use snapshotChanges().map() to store the key
    this.lecturerService.getLecturers().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(lecturers => {
      this.lecturers = lecturers;
    });
  }

  onAddLecturer() {
    this.lecturerService.selectedLecturer = new User(null, null, null, null, null, null);
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
