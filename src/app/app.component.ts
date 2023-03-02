import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-app';
  login = false;

  loginStatusUpdate() {
    this.login = !this.login;
    console.log(this.login);
  }
}
