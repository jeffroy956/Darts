import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";

require("./PageHeader.scss");

interface PageHeaderProps {
    title: string;
    backLinkTo?: string;
    acceptElement?: React.ReactElement<any>;
}

export default class PageHeader extends React.Component<PageHeaderProps> {
    public render() {
        return (
            <div className="header">
                <div className="header__toolbar">
                    <div>
                        {this.props.backLinkTo && 
                        <Link to={this.props.backLinkTo}><i className="material-icons">arrow_back</i></Link>
                        }
                    </div>
                    <h1>
                        {this.props.title}
                    </h1>
                </div>
                {this.props.acceptElement && 
                    <div className="header__offset-commands">
                        {this.props.acceptElement}
                    </div>
                }
            </div>
        );
    }
}
