import * as React from "react";

require("./IconButton.scss");

interface HeaderCommandProps {
    iconName: string;
}

interface HeaderCommandState {
    buttonActivated: boolean;
}

const rippleWait: number = 1000;

export default class HeaderCommand extends React.Component<HeaderCommandProps, HeaderCommandState> {
    constructor(props: HeaderCommandProps) {
        super(props);

        this.state = {
            buttonActivated: false
        };
    }

    public render() {
        return(
            <div className="icon-button">
                <div className={this.getButtonCss()} onClick={this.buttonClicked}>
                    <i className="material-icons">{this.props.iconName}</i>
                </div>
            </div>
        );
    }

    private getButtonCss(): string {
        let baseCssClass = "icon-button__icon";
        if (this.state.buttonActivated) {
            baseCssClass = baseCssClass + " element--activated";
        }
        return  baseCssClass;
    }

    private buttonClicked = (): void => {
        if (this.state.buttonActivated) {
            return;
        }

        this.setState((prevState: HeaderCommandState) => {
            return {
                buttonActivated: true
            };
        });

        setTimeout(() => {
            this.setState((prevState: HeaderCommandState) => {
                console.log("ripple removed");
                return {
                    buttonActivated: false
                };
            });
        }, rippleWait);
    }
}
