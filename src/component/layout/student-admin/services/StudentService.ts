import axios from "axios";
import {IStudents} from "../models/IStudents";

export class StudentService {
    private static serverUrl: string = "http://localhost:9000";

    public static getAllStudents(): Promise<{ data: IStudents[] }> {
        const dataUrl: string = `${this.serverUrl}/students`;
        return axios.get(dataUrl);
    }
    public static getAStudent(studentId: string): Promise<{ data: IStudents }> {
        const dataUrl: string = `${this.serverUrl}/students/${studentId}`;
        return axios.get(dataUrl)
    }

    public static createStudent(student: IStudents): Promise<{ data: IStudents }> {
        const dataUrl: string = `${this.serverUrl}/students`;
        return axios.post(dataUrl, student)
    }

    public static deleteStudent(studentId:string): Promise<{ data: IStudents }> {
        const dataUrl: string = `${this.serverUrl}/students/${studentId}`;
        return axios.delete(dataUrl)
    }

    public static updateStudent(student: IStudents, studentId: string): Promise<{ data: IStudents }> {
        const dataUrl: string = `${this.serverUrl}/students/${studentId}`;
        return axios.put(dataUrl, student)
    }


}
