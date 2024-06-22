import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { sortBy } from 'lodash-es';
import { UserDetails } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  authService = inject(AuthService)
  users: UserDetails[] = []

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data: UserDetails[]) => {
      this.users = data
    })
  }

  sortOrder = {
    username: 'none',
    email: 'none',
    role: 'none',
    status: 'none'
  }
   
  sortUsers(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      this.sortOrder[sortKey] = 'desc'
      this.users = sortBy(this.users, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.users = sortBy(this.users, sortKey)
    }

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    }
  }
  
}
