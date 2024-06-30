# Healthcare Appointment App

## Overview

The repository includes the front-end for [Healthcare Appointment App](https://github.com/teo-nt/healthcare-appointment-app).
This application facilitates the scheduling and management of appointments between patients and doctors. The app supports three roles: Admin, Patients, and Doctors. 

## Features and Usage

### Admin
- **Account Management**: Admins can view, edit, activate, or disable any account.
- **Account Sorting**: Accounts can be sorted by username, email, role, and status.
- **Admin Account**: Admins can view their account details and update their email and password.

**Note**: Admin accounts are created directly in the database and cannot be created through the application. Since passwords are encrypted and verified using BCrypt.Net-Next NuGet package (which uses cost factor 11), [Online Bcrypt Hash Generator](https://bcrypt.online/) can be used to generate and insert hash password in the database.


### Patients
- **Doctor Search**: Patients can search for doctors by specialty and city.
- **Appointment Booking**: Patients can view a doctor's available timeslots and book appointments.
- **Appointment Status**: Appointments are initially marked as pending and are updated to scheduled once approved by the doctor.
- **My Account**: Patients can view their account details and update email and password.


### Doctors
- **Account Activation**: Doctors' account status is pending after registration and require admin activation to log in successfully.
- **Manage Availability**: Doctors can add and see their availability timeslots.
- **Add Availability**: Doctors can add availability by specifying a date, start time and end time.
- **Appointment Approval**: Doctors can approve pending appointments, changing their status to scheduled.
- **My Account**: Doctors can view their account details and update email and password.



## Technical Details


### Doctor Availability
- **Timeslot Generation**: Availability is specified by date, start time, end time, and appointment duration (which is set at registration). For example, for a date of 01/07/2024, start time of 13:00, end time of 15:00, and a 30-minute appointment duration, the following timeslots will be created:
  - 13:00 - 13:30
  - 13:30 - 14:00
  - 14:00 - 14:30
  - 14:30 - 15:00
- **Availability Constraints**: New availability cannot be added for a date if any timeslot already exists for that day.