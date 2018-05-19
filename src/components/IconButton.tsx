import * as React from "react";
import { Redirect } from "react-router";

require("./IconButton.scss");

interface IconButtonProps {
    iconName: string;
    linkTo?: string;
    onClick?: () => void;
    className?: string;
}
interface TextButtonState {
    routeNavigated: boolean;
}

export default class IconButton extends React.Component<IconButtonProps, TextButtonState> {
    constructor(props) {
        super(props);

        this.state = {
            routeNavigated: false
        };
    }

    public render() {
        return(
            <div className={this.getButtonClass()}>
                <div className="icon-button__icon" onClick={this.buttonClicked}>
                    {this.props.linkTo && this.state.routeNavigated &&
                        <Redirect push={true} to={this.props.linkTo} />}
                    <i className="material-icons">{this.props.iconName}</i>
                </div>
            </div>
        );
    }

    public buttonClicked = (eventArgs: any): void => {
        if (this.props.linkTo) {
            this.setState({
                routeNavigated: true
            });
        } else if (this.props.onClick) {
            this.props.onClick();
        }
    }

    private getButtonClass() {
        let baseClass = "icon-button";
        if (this.props.className) {
            baseClass += " " + this.props.className;
        }
        return  baseClass;
    }

}
