import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [RouterOutlet, DoctorNavbarComponent],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent {

}
