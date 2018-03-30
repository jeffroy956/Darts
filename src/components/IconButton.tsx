import * as React from "react";

require("./IconButton.scss");

interface HeaderCommandProps {
    iconName: string;
}

interface HeaderCommandState {
    buttonActivated: boolean;
    rippleRadius: number;
    rippleX: number;
    rippleY: number;
}

const rippleWait: number = 500;

export default class HeaderCommand extends React.Component<HeaderCommandProps, HeaderCommandState> {
    constructor(props: HeaderCommandProps) {
        super(props);

        this.state = {
            buttonActivated: false,
            rippleRadius: null,
            rippleX: null,
            rippleY: null
        };
    }

    public render() {
        return(
            <div className={this.getButtonClass()}>
                <div className="icon-button__icon" onClick={this.buttonClicked}>
                    {this.state.buttonActivated && <span className="element-ripple" style={this.rippleStyle()} />}
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

    private buttonClicked = (eventArgs: any): void => {
        if (this.state.buttonActivated) {
            return;
        }
        const {pageX, pageY} = eventArgs;
        const {offsetLeft, offsetTop, clientWidth} = eventArgs.currentTarget;

        this.setState((prevState: HeaderCommandState) => {
            return {
                buttonActivated: true,
                rippleRadius: clientWidth,
                rippleX: pageX - offsetLeft - clientWidth / 2,
                rippleY: pageY - offsetTop - clientWidth / 2
            };
        });

        setTimeout(() => {
            this.setState((prevState: HeaderCommandState) => {
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
