import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../model/usermodel';
import { UserService } from '../../service/user.service';
import { SearchPipe } from '../../pipe/search.pipe';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userlists : User[] = [];
  name ='';
  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.userlists =data;
    });
  }



  deleteUser(id) {
    this.userService.delete(id).subscribe(data => {
      console.log("deleted");
      this.userService.getAllUsers();
    });
  }

}
