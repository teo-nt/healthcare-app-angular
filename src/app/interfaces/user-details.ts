export interface UserDetails {
    id: number;
    username: string;
    email: string;
    userRole: string;
    status: string;
    patient: Patient;
    doctor: Doctor;
}

export interface Patient {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    gender: string;
    medicalHistory: string;
    phoneNumber: string;
}

export interface Doctor {
    id: number;
    firstname: string;
    lastname: string;
    city: string;
    address: string;
    streetNumber: number;
    phoneNumber: string;
    appointmentDuration: number;
    speciality: Speciality;
}

export interface Speciality {
    id: number;
    specialityName: string;
}