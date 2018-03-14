import * as React from "react";
import { Link } from "react-router-dom";

export default class MainMenu extends React.Component<{}> {
    public render() {
        return(        
        <div>
            Main menu
            <Link to="/NewPlayer">Add New Player</Link>
        </div>
        );
    }
}
