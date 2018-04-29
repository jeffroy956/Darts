import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

export default class NewPlayer extends React.Component<{}> {
    public render() {
        return (
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="New Player" 
                        backLinkTo="/players"
                        acceptElement={<IconButton iconName="done" />}
                    />
                }
            >
                <div className="form-body">
                    <div className="form-field">
                        <i className="material-icons">person</i>
                        <input name="playerName" placeholder="Name *" />
                    </div>
                </div>
            </InnerPage>
        );
    }
}
