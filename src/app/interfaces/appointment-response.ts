import { Doctor, Patient } from "./user-details";

export interface AppointmentResponse {
    id: number;
    dateTime: Date;
    appointmentStatus: string;
    doctor: Doctor;
    patient: Patient;
}
