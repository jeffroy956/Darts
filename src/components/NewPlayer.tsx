import * as React from "react";
import { Link } from "react-router-dom";
import { HeaderTitle } from "./HeaderTitle";

export default class NewPlayer extends React.Component<{}> {
    public render() {
        return (
            <div className="form-container">
                <div className="form-header">
                    <HeaderTitle title="New Player" backLinkTo="/players" />
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
