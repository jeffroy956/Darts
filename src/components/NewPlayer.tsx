import * as React from "react";
import { Link } from "react-router-dom";

export default class NewPlayer extends React.Component<{}> {
    public render() {
        return (
            <div>
                <h2>Add Player</h2>
                <form>
                    <div>
                        <label htmlFor="playerName">Name</label>
                        <input name="playerName" />
                    </div>
                    <div className="form__commands">
                        <button>Save</button>
                        <Link to="/players">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
