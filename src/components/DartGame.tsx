import { inject } from "mobx-react";
import * as React from "react";
import DartGameStore from "../stores/DartGameStore";
import ShanghaiLayout from "./ShanghaiLayout";

interface DartGameProps {
    dartGameStore?: DartGameStore;
}

@inject("dartGameStore")
export default class DartGame extends React.Component<DartGameProps> {
    public render() {
        return (
            <div className="dart-game">
                {this.createLayout()}
            </div>
        );
    }

    private createLayout() {
        const {dartGameStore} = this.props;

        switch (dartGameStore.selectedGame) {
            case "shanghai":
                return <ShanghaiLayout gameState={dartGameStore.gameState} />;
        }

        return null;
    }
}
