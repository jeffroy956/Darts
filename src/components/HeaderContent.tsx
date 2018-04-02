import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";

interface HeaderTitleProps {
    title: string;
    backLinkTo?: string;
    acceptCommand?: () => void;
}

export const HeaderContent: React.SFC<HeaderTitleProps> = (props) => {
    return (
        <div className="header-content">
            <div className="header__cancel">
                {props.backLinkTo && <Link to={props.backLinkTo}><i className="material-icons">arrow_back</i></Link>}
            </div>
            <h1>
                {props.title}
            </h1>
            <div className="header__accept">
                {props.acceptCommand && <IconButton iconName="done"/>}
            </div>
        </div>
    );
};
