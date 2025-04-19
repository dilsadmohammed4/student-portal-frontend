import {Link} from "react-router-dom";
import React from "react";

interface IProps {
    color: string
}

export const Navbar: React.FC<IProps> = (props) => {
    return (
        <>
            <>
                <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
                    <div className="container">
                        <Link to="/" className="navbar-brand"><i className="bi bi-person-video3"></i> STUDENT <span
                            className="text-warning">MANAGER</span></Link>
                    </div>
                </nav>
            </>
        </>
    )
}
