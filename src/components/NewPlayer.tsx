import * as React from "react";
import { Link } from "react-router-dom";

export default class NewPlayer extends React.Component<{}> {
    public render() {
        return (
            <div>
                <h2>Add Player</h2>
                <form>
                    <div className="form__body">
                        <div className="standard-field">
                            <label htmlFor="playerName">Name</label>
                            <input name="playerName" />
                        </div>
                    </div>
                    <div className="form__commands">
                        <button>Add Player</button>
                        <Link to="/players">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
