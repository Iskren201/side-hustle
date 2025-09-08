import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users$: Observable<User[]> = this.api.getUsers().pipe(catchError(() => of([])));
  constructor(private api: UsersService) { }
  trackById = (_: number, u: User) => u._id;
}
