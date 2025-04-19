import React from "react";

interface IProps {
    color: string,
    heading: string
}

export const Headings: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h2 ${props.color}`}>{props.heading}</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                            consectetur corporis
                            dolores pariatur quaerat. At aut consectetur distinctio dolore ipsam necessitatibus nobis
                            odit quasi, ratione totam. Expedita minus sapiente vero.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
