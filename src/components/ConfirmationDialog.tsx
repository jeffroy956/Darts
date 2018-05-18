import * as React from "react";

require("./ConfirmationDialog.scss");

interface ConfirmationDialogProps {
    message: string;
    onAccept: () => void;
    onCancel: () => void;
}

export default class ConfirmationDialog extends React.Component<ConfirmationDialogProps> {
    public render() {
        return (
            <div className="dialog">
                <div className="dialog__overlay" />
                <div className="dialog__content">
                    <div>message</div>
                    <div className="dialog__commands">
                        <button onClick={this.props.onAccept}>Yes</button>
                        <button onClick={this.props.onCancel}>No</button>
                    </div>
                </div>
            </div>
        );
    }
}
