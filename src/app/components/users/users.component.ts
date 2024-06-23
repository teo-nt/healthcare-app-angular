import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { sortBy } from 'lodash-es';
import { UserDetails } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  authService = inject(AuthService)
  users: UserDetails[] = []
  tempUsers: UserDetails[] = []
  selectedUserId: number | null = null
  selectedAll = true
  selectedDoctors = false
  selectedPatients = false
  inputUsername = ''
  inputEmail = ''

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data: UserDetails[]) => {
      this.users = data
      this.tempUsers = this.users
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
      this.tempUsers = sortBy(this.tempUsers, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.tempUsers = sortBy(this.tempUsers, sortKey)
    }

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '▲';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '▼';
    } else {
      return '';
    }
  }

  toggleDetails(id: number) {
    this.selectedUserId = this.selectedUserId === id ? null : id
  }

  showAll() {
    this.tempUsers = this.users
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
  }

  showDoctors() {
    this.tempUsers = this.users.filter(u => u.userRole === 'Doctor')
    this.selectedDoctors = true
    this.selectedAll = false
    this.selectedPatients = false
    this.selectedUserId = null
  }

  showPatients() {
    this.tempUsers = this.users.filter(u => u.userRole === 'Patient')
    this.selectedPatients = true
    this.selectedAll = false
    this.selectedDoctors = false
    this.selectedUserId = null
  }

  searchByUsername() {
    this.inputEmail = ''
    this.tempUsers = this.users.filter(u => u.username.includes(this.inputUsername))
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
  }

  searchByEmail() {
    this.inputUsername = ''
    this.tempUsers = this.users.filter(u => u.email.includes(this.inputEmail))
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
  }

  onActivate(user: UserDetails) {
    
  }
}
