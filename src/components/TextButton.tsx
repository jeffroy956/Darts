import { observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";

require("./TextButton.scss");

interface TextButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

interface TextButtonState {
    buttonActivated: boolean;
    routeNavigated: boolean;
    rippleRadius: number;
    rippleX: number;
    rippleY: number;
}

const rippleWait: number = 300;

@observer
export default class TextButton extends React.Component<TextButtonProps, TextButtonState> {
    constructor(props: TextButtonProps) {
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
            <div className="text-button__wrapper">

                <button 
                    className={this.getButtonClass()} 
                    onMouseDown={this.mouseDown} 
                    onClick={this.buttonClicked}
                    disabled={this.props.disabled}
                >
                    <span>{this.props.children}</span>
                </button>
                {this.state.buttonActivated && <span className="element-ripple" style={this.rippleStyle()} />}
            </div>
        );
    }

    public buttonClicked = (eventArgs: any): void => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    private getButtonClass() {
        let baseClass = "text-button";
        if (this.props.className) {
            baseClass += " " + this.props.className;
        }
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

}
