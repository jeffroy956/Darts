import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import PageHeader from "./PageHeader";

require("./MainMenu.scss");

export default class MainMenu extends React.Component<{}> {
    public render() {
        return(        
        <div className="home">
            <PageHeader title="Darts Scoreboard" />
            <div className="main-menu">
                <div className="menu-item menu-item--full-width">
                    <Link to="/new-game">New Game</Link>
                </div>
                <div className="menu-item">
                    <Link to="/players">Players</Link>
                </div>
                <div className="menu-item">
                    <Link to="/statistics">Statistics</Link>
                </div>
            </div>

        </div>
        );
    }
}
