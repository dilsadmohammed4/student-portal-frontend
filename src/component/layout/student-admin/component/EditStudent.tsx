import {Navbar} from "../layout/Navbar";
import {Headings} from "../layout/Headings";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {StudentService} from "../services/StudentService";
import {IStudents} from "../models/IStudents";
import {ToastUtils} from "../../../utils/ToastUtils";

interface IState {
    student: IStudents
}

export const EditStudent = () => {

    const navigate = useNavigate();
    const {studentId} = useParams();
    const [state, setState] = useState<IState>({
        student: {
            rollNo: "",
            name: "",
            email: "",
            mil: "",
            english: "",
            physics: "",
            chemistry: "",
            biology: "",
            mathematics: ""
        } as IStudents

    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            student: {
                ...state.student,
                [event.target.name]: event.target.value
            }

        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!studentId) return;

        try {
            const response = await StudentService.updateStudent(student, studentId);

            if (response?.data) {
                ToastUtils.displaySuccessToast("Student updated!");
                navigate("/");
            } else {
                ToastUtils.displayErrorToast("Failed to update student.");
            }
        } catch (error: any) {
            console.error("Update error:", error?.message || error);
            ToastUtils.displayErrorToast("Internal Server Error!");
        }
    };


    useEffect(() => {
        const getStudentFromServer = (studentId: string) => {
            StudentService.getAStudent(studentId)
                .then((studentResponse) => {
                    const student = studentResponse.data;
                    setState((prevState) => ({
                        ...prevState,
                        student: student
                    }));
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };

        if (studentId) {
            getStudentFromServer(studentId);
        }
    }, [studentId]);


    const {student} = state;
    return (
        <>
            <Navbar color={'bg-dark'}/>
            <Headings color={'text-dark'} heading={'EDIT STUDENT DATA'}/>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'name'}
                                        value={student.name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'rollNo'}
                                        value={student.rollNo}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Rollno" type="text"/>
                                </div>

                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'email'}
                                        value={student.email}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'english'}
                                        value={student.english}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="English" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mil'}
                                        value={student.mil}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mil" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'physics'}
                                        value={student.physics}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Physics" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'chemistry'}
                                        value={student.chemistry}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Chemistry" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'biology'}
                                        value={student.biology}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Biology" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mathematics'}
                                        value={student.mathematics}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mathematics" type="text"/>
                                </div>

                                <div className="mb-2">
                                    <input className="btn btn-warning me-2" type="Submit" value="Update"/>
                                    <Link className="btn btn-dark" to="/">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
