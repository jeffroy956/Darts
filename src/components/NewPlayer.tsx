import * as React from "react";
import { Link } from "react-router-dom";
import { HeaderContent } from "./HeaderContent";
import IconButton from "./IconButton";

export default class NewPlayer extends React.Component<{}> {
    public render() {
        return (
            <div className="form-container">
                <div className="form-header">
                    <HeaderContent title="New Player" backLinkTo="/players" />
                    <IconButton iconName="done" />
                </div>
                <div className="form-body">
                    <div className="form-field">
                        <i className="material-icons">person</i>
                        <input name="playerName" placeholder="Name *" />
                    </div>
                </div>
                <div className="form-footer"/>
            </div>
        );
    }
}
