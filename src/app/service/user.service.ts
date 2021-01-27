import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/usermodel';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseUrl = 'http://localhost:8080/api/v1/';
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  users: User[] = [];
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUsersById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  create(user: User): Observable<Object> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return this.http.post(`${this.baseUrl}/users`, JSON.stringify(user));
  }

  delete(id: number): Observable<any> {
    this.users = this.users.filter(user => user.id !== id);

    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  update(id: number, user: User): Observable<Object> {
    let UserIndex = this.users.find(user => user.id == id);
    let index = this.users.indexOf(UserIndex);
    this.users[index] = user;
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  searchUsers(name: string) {
    return this.users.filter(user => user.username.toLowerCase().includes(name.toLowerCase()));
  }
}
