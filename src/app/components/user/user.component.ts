import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/usermodel';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  UserForm: FormGroup;
  user: User;
  id: number = 0;
  constructor( public fb: FormBuilder, private userService: UserService, public route: ActivatedRoute, public router: Router) {

  }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.userService.getUsersById(this.id).subscribe(data => {
      this.user = data;

        this.UserForm.setValue({
          id: this.user.id,
          username: this.user.username,
          email: this.user.email,
          website: this.user.website,
          phone: this.user.phone

        });
      }, error => console.log(error));
    }
    this.UserForm = this.fb.group({
      id:[''],
      username: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      phone: ['', Validators.required],

    })
  }

  submitForm(){
    this.user = {...this.user, ...this.UserForm.value};
    if(this.id) {
      this.userService.update(this.id, this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    } else {
    this.userService.create(this.UserForm.value).subscribe(res =>{
      console.log('User created', res),
      error => console.log(console.log(error)
      )

    })
  }
  this.router.navigate(['/user-list']);
  }



  clear(){
    if(this.id){
      this.router.navigate(['/user-list']);

  }
  this.UserForm = this.fb.group({
    id:[''],
    username: ['', Validators.required],
    email: ['', Validators.required],
    website: ['', Validators.required],
    phone: ['', Validators.required],

  })

  }

  canDeactivate() {
    return confirm('Are you sure you want to leave ?');
  }


}
