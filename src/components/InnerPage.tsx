import * as React from "react";
import IconButton from "./IconButton";
import PageHeader from "./PageHeader";

require("./InnerPage.scss");

interface InnerPageProps {
    pageHeader: React.ReactElement<PageHeader>;
}

export default class InnerPage extends React.Component<InnerPageProps> {

    public render() {
        return(
            <div className="inner-page">
                <div className="inner-page__header">
                    {this.props.pageHeader}
                </div>
                <div className="inner-page__body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
