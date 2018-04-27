import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";

require("./Header.scss");

interface Header {
    title: string;
    backLinkTo?: string;
}

export const Header: React.SFC<Header> = (props) => {
    return (
        <div className="header">
            <div className="header__toolbar">
                <div>
                    {props.backLinkTo && 
                    <Link to={props.backLinkTo}><i className="material-icons">arrow_back</i></Link>
                    }
                </div>
                <h1>
                    {props.title}
                </h1>
            </div>
            {props.children && 
                <div className="header__offset-commands">
                    {props.children}
                </div>
            }
        </div>
    );
};
