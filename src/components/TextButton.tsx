import { observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";

require("./TextButton.scss");

interface TextButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

@observer
export default class TextButton extends React.Component<TextButtonProps> {
    constructor(props: TextButtonProps) {
        super(props);
    }

    public render() {
        return(
            <div className={"text-button__wrapper " + (this.props.className ? this.props.className : "")}>
                <button 
                    className="text-button" 
                    onClick={this.buttonClicked}
                    disabled={this.props.disabled}
                >
                    <span>{this.props.children}</span>
                </button>
            </div>
        );
    }

    public buttonClicked = (eventArgs: any): void => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

}
