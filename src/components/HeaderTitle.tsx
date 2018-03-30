import * as React from "react";
import { Link } from "react-router-dom";

interface HeaderTitleProps {
    title: string;
    backLinkTo?: string;
    acceptCommand?: () => void;
}

export const HeaderTitle: React.SFC<HeaderTitleProps> = (props) => {
    return (
        <h1>
            {props.backLinkTo && <Link to={props.backLinkTo}><i className="material-icons">arrow_back</i></Link>}
            {props.title}
        </h1>
    );
};
