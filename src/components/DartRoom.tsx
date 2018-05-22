import { inject, observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

export default class DartRoom extends React.Component<{}> {

    public render() {
        return (
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="Dart room" 
                        backLinkTo="/"
                    />
                }
            >
                <div>
                    <h2>Nothing to see here yet.</h2>
                    <div>Could have a list of rooms to join, allow player to start a new room</div>
                </div>
            </InnerPage>
        );
    }

}
