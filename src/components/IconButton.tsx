import * as React from "react";
import { Redirect } from "react-router";

require("./IconButton.scss");

interface HeaderCommandProps {
    iconName: string;
    linkTo?: string;
}

interface HeaderCommandState {
    buttonActivated: boolean;
    routeNavigated: boolean;
    rippleRadius: number;
    rippleX: number;
    rippleY: number;
}

const rippleWait: number = 300;

export default class HeaderCommand extends React.Component<HeaderCommandProps, HeaderCommandState> {
    constructor(props: HeaderCommandProps) {
        super(props);

        this.state = {
            buttonActivated: false,
            routeNavigated: false,
            rippleRadius: null,
            rippleX: null,
            rippleY: null
        };
    }

    public render() {
        return(
            <div className={this.getButtonClass()}>
                <div className="icon-button__icon" onMouseDown={this.mouseDown} onClick={this.buttonClicked}>
                    {this.state.buttonActivated && <span className="element-ripple" style={this.rippleStyle()} />}
                    {this.state.routeNavigated && !this.state.buttonActivated && 
                        <Redirect push={true} to={this.props.linkTo} />}
                    <i className="material-icons">{this.props.iconName}</i>
                </div>
            </div>
        );
    }

    private getButtonClass() {
        let baseClass = "icon-button";
        if (this.state.buttonActivated) {
            baseClass += " element--activated";
        }
        return  baseClass;
    }
    private rippleStyle(): React.CSSProperties {
        const {rippleRadius, rippleX, rippleY} = this.state;
        return {
            width: rippleRadius,
            height: rippleRadius,
            top: rippleY,
            left: rippleX
        };
    }   

    private mouseDown = (eventArgs: any): void => {
        if (this.state.buttonActivated) {
            return;
        }
        const {pageX, pageY} = eventArgs;
        const {offsetLeft, offsetTop, clientWidth} = eventArgs.currentTarget;

        this.setState(() => {
            return {
                buttonActivated: true,
                rippleRadius: clientWidth,
                rippleX: pageX - offsetLeft - clientWidth / 2,
                rippleY: pageY - offsetTop - clientWidth / 2
            };
        });

        setTimeout(() => {
            this.setState(() => {
                return {
                    buttonActivated: false,
                    rippleRadius: null,
                    rippleX: null,
                    rippleY: null
                };
            });
        }, rippleWait);
    }

    private buttonClicked = (eventArgs: any): void => {
        if (this.props.linkTo) {
            this.setState(() => {
                return {
                    routeNavigated: true,
                };
            });
        }
    }
}
