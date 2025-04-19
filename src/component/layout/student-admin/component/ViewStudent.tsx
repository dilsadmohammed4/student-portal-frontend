import {Navbar} from "../layout/Navbar";
import {Headings} from "../layout/Headings";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {StudentService} from "../services/StudentService";
import {IStudents} from "../models/IStudents";
import {ToastUtils} from "../../../utils/ToastUtils";

export const ViewStudent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [students, setStudents] = useState(
        [] as IStudents[]
    );// eslint-disable-line @typescript-eslint/no-unused-vars

    const [filteredStudent, setFilteredStudent] = useState(
        [] as IStudents[]
    );

    const navigate = useNavigate();
    const getAllStudent = () => {
        StudentService.getAllStudents().then((response => {
            setStudents(
                response.data.sort((a, b) => Number(a.rollNo) - Number(b.rollNo))
            );
            setFilteredStudent(
                response.data.sort((a, b) => Number(a.rollNo) - Number(b.rollNo))
            );
        })).catch((error) => {
            console.log(error)
        })
    }

    const clickDeleteStudent = (studentId: string | undefined) => {
        if (studentId) {
            StudentService.deleteStudent(studentId).then((response) => {
                getAllStudent();
                navigate('/');
                ToastUtils.displaySuccessToast("Student deleted!");

            }).catch((error) => {
                console.log(error)
            });
        }
    }

    useEffect(() => {
        getAllStudent();
    }, []);

    const totalMark = (student: IStudents): number => {
        return Number(student.mil) + Number(student.english) + Number(student.chemistry) + Number(student.physics) + Number(student.biology) + Number(student.mathematics);
    }

    return (
        <>
            <Navbar color={'bg-dark'}/>
            <Headings color={'text-dark'} heading={'VIEW STUDENT'}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="col">
                            <Link className="btn btn-success" to={'/student/add'}><i
                                className="bi bi-plus-lg"></i> New</Link>
                        </div>

                    </div>
                </div>
            </div>

            {
                filteredStudent.length > 0 ? <>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col">
                                <table className="table table-striped table-hover shadow-lg">
                                    <thead className="bg-light text-light">
                                    <tr>
                                        <th>ROLL NO</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>MIL</th>
                                        <th>ENGLISH</th>
                                        <th>PHYSICS</th>
                                        <th>CHEMISTRY</th>
                                        <th>BIOLOGY</th>
                                        <th>MATHEMATICS</th>
                                        <th>TOTAL</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredStudent.map((student) => {

                                            return (
                                                <tr key={student.id}>
                                                    <td>{student.rollNo}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.mil}</td>
                                                    <td>{student.english}</td>
                                                    <td>{student.physics}</td>
                                                    <td>{student.chemistry}</td>
                                                    <td>{student.biology}</td>
                                                    <td>{student.mathematics}</td>
                                                    <td>{totalMark(student)}</td>

                                                    <td>
                                                        <Link to={`/student/edit/${student.id}`}
                                                              className="btn btn-warning">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger"
                                                                onClick={() => clickDeleteStudent(student.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </> : <>

                </>
            }
        </>
    )
}
