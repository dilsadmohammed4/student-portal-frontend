import {Link, useNavigate} from "react-router-dom";
import {Navbar} from "../layout/Navbar";
import {Headings} from "../layout/Headings";
import React, {useState} from "react";
import {IStudents} from "../models/IStudents";
import {StudentService} from "../services/StudentService";
import {ToastUtils} from "../../../utils/ToastUtils";

export const AddStudent: React.FC = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState<IStudents>({
        rollNo: "",
        name: "",
        email: "",
        mil: "",
        english: "",
        physics: "",
        chemistry: "",
        biology: "",
        mathematics: "",
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudent({
            ...student,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        StudentService.createStudent(student).then((response) => {
            if (response && response.data) {
                ToastUtils.displaySuccessToast("Student added!");
                navigate("/");
            } else {
                ToastUtils.displayErrorToast("Failed to add student.");
            }
        }).catch((error) => {
            console.log(error.message);
            ToastUtils.displayErrorToast("Internal Server Error!");
        });
    }


    return (
        <>

            <Navbar color={'bg-dark'}/>
            <Headings color={'text-dark'} heading={'ADD STUDENT'}/>
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
                                        className="form-control" placeholder="Odia" type="text"/>
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
                                    <input className="btn btn-success me-2" type="Submit" value="Create"/>
                                    <Link className="btn btn-dark" to="/">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
