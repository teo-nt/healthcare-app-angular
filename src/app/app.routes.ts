import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PatientHomepageComponent } from './components/patient-homepage/patient-homepage.component';
import { AccountComponent } from './components/account/account.component';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';

export const routes: Routes = [
    { path: "", redirectTo: "welcome/login", pathMatch: 'full'},
    { path: "patient", component: PatientHomeComponent, children: [
        {path: "", redirectTo: "homepage", pathMatch: 'full'},
        {path: "homepage", component: PatientHomepageComponent},
        {path: "account", component: AccountComponent},
        {path: "appointments", component: PatientAppointmentsComponent}
    ]},
    { path: "doctor", component: DoctorHomeComponent },
    { path: "admin", component: AdminHomeComponent },
    { path: "welcome", component: WelcomeComponent, children: [
        { path: '', redirectTo: "login", pathMatch: 'full' },
        { path: "login", component: LoginComponent},
        { path: "register-doctor", component: RegisterDoctorComponent},
        { path: "register", component: RegisterPatientComponent}
    ]}
];
