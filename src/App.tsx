import './App.css'
import {ToastContainer} from "react-toastify";
import {ViewStudent} from "./component/layout/student-admin/component/ViewStudent.tsx";
import {AddStudent} from "./component/layout/student-admin/component/AddStudent.tsx";
import {EditStudent} from "./component/layout/student-admin/component/EditStudent.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="app">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<ViewStudent/>}/>
                    <Route path={'/student/add'} element={<AddStudent/>}/>
                    <Route path={'/student/edit/:studentId'} element={<EditStudent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
