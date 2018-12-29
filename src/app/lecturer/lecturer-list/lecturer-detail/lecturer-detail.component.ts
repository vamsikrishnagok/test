import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/user.model";
import {LecturerService} from "../../lecturer.service";

@Component({
  selector: 'app-lecturer-detail',
  templateUrl: './lecturer-detail.component.html',
  styleUrls: ['./lecturer-detail.component.css']
})
export class LecturerDetailComponent implements OnInit {
  @Input() lecturer: User;
  @Input() index: number;

  constructor(private lecturerService: LecturerService) { }

  ngOnInit() {
  }

  onEdit(lecturer: User) {
    this.lecturerService.selectedLecturer = Object.assign({}, lecturer);
    this.lecturerService.lecturerKey = this.lecturer.key;
  }

}
