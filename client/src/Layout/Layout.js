import React, {Fragment} from "react";
import SingleNoteNav from "./nav/SingleNoteNav"
import "./Layout.css"
const Layout = (props) => {
    return (
        <Fragment>
            <div className="sidebar">
            {props.children}
            </div>
            <div className="notes-nav">
                <SingleNoteNav></SingleNoteNav>
            </div>
            <div className="notes-main">
                
            </div>     
        </Fragment>
    )
}

export default Layout