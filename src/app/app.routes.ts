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
import { adminAuthGuard, doctorAuthGuard, patientAuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { AccountNotActivatedComponent } from './components/account-not-activated/account-not-activated.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';

export const routes: Routes = [
    { path: "", redirectTo: "welcome/login", pathMatch: 'full' },
    { path: "patient", component: PatientHomeComponent, canActivate: [patientAuthGuard], children: [
        { path: "", redirectTo: "homepage", pathMatch: 'full' },
        { path: "homepage", component: PatientHomepageComponent },
        { path: "account", component: AccountComponent },
        { path: "appointments", component: PatientAppointmentsComponent }
    ]},
    { path: "doctor", component: DoctorHomeComponent, canActivate: [doctorAuthGuard], children: [
        { path: '', redirectTo: 'availability', pathMatch: 'full' },
        { path: 'account', component: AccountComponent },
        { path: 'availability', component: AvailabilityComponent },
        { path: 'appointments', component: DoctorAppointmentsComponent }
    ]},
    { path: "admin", component: AdminHomeComponent, canActivate: [adminAuthGuard], children: [
        { path: '', redirectTo: 'users', pathMatch: 'full' },
        { path: 'users', component: UsersComponent },
        { path: 'account', component: AccountComponent }
    ]},
    { path: "welcome", component: WelcomeComponent, children: [
        { path: '', redirectTo: "login", pathMatch: 'full' },
        { path: "login", component: LoginComponent },
        { path: "register-doctor", component: RegisterDoctorComponent },
        { path: "register", component: RegisterPatientComponent },
        { path: "error", component: AccountNotActivatedComponent }
    ]}
];
