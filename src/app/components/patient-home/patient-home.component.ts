import { Component } from '@angular/core';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [RouterOutlet, PatientNavbarComponent],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.css'
})
export class PatientHomeComponent {

}
