// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'site';
// }


import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './core/models/user.model';
import { UsersService } from './core/services/sers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  trackById = (_: number, u: { _id: string }) => u._id;

  title = 'site';
  users$: Observable<User[]> = this.users.getUsers().pipe(
    catchError((err) => {
      console.error(err);
      return of([] as User[]);
    })
  );

  constructor(private users: UsersService) { }
}
