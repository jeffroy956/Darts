import * as React from "react";
import TextButton from "./TextButton";

require("./ConfirmationDialog.scss");

interface ConfirmationDialogProps {
    onAccept: () => void;
    onCancel: () => void;
}

export default class ConfirmationDialog extends React.Component<ConfirmationDialogProps> {
    public render() {
        return (
            <div className="dialog">
                <div className="dialog__overlay" onClick={this.props.onCancel} />
                <div className="dialog__content">
                    <div className="dialog__message">{this.props.children}</div>
                    <div className="dialog__commands">
                        <TextButton onClick={this.props.onAccept}>Yes</TextButton>
                        <TextButton onClick={this.props.onCancel}>No</TextButton>
                    </div>
                </div>
            </div>
        );
    }
}
