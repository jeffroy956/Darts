import { inject } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import DartGameStore from "../stores/DartGameStore";
import AroundTheClockLayout from "./AroundTheClockLayout";
import CricketLayout from "./CricketLayout";
import ShanghaiLayout from "./ShanghaiLayout";

interface DartGameProps {
    dartGameStore?: DartGameStore;
}

@inject("dartGameStore")
export default class DartGame extends React.Component<DartGameProps> {
    public render() {
        if (!this.props.dartGameStore.gameState) {
            return <Redirect to="/new-game" />;
        }
        return (
            <div className="dart-game">
                {this.createLayout()}
            </div>
        );
    }

    private createLayout() {
        const {dartGameStore} = this.props;

        switch (dartGameStore.selectedGame) {
            case "cricket":
                return <CricketLayout dartGameStore={dartGameStore} />;
            case "aroundtheclock":
                return <AroundTheClockLayout dartGameStore={dartGameStore} />;
            case "shanghai":
                return <ShanghaiLayout dartGameStore={dartGameStore} />;
        }

        return null;
    }
}
