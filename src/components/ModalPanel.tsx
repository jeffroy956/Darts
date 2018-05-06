import * as React from "react";

interface ModalPanelProps {
    active: boolean;
}

export default class ModalPanel extends React.Component<ModalPanelProps> {
    public render() {
        return(
            <div className={"modal-panel" + (this.props.active ? " modal--active" : "")}>
                
                {this.props.children}
            </div>
        );
    }
}
