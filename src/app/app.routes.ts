import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full'},
    { path: "login", component: LoginComponent},
    { path: "register-doctor", component: RegisterDoctorComponent},
    { path: "register", component: RegisterPatientComponent},
    { path: "home", component: PatientHomeComponent},
    { path: "doctor-home", component: DoctorHomeComponent},
    { path: "admin-home", component: AdminHomeComponent}
];
