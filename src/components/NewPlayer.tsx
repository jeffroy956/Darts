import { inject } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import PlayerStore from "../stores/PlayerStore";
import IconButton from "./IconButton";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

interface NewPlayerProps {
    playerStore?: PlayerStore;
}
interface NewPlayerState {
    name: string;
    playerAdded: boolean;
}

@inject("playerStore")
export default class NewPlayer extends React.Component<NewPlayerProps, NewPlayerState> {
    public constructor(props: NewPlayerProps) {
        super(props);

        this.state = {
            name: "",
            playerAdded: false
        };
    }

    public render() {
        if (this.state.playerAdded) {
            return <Redirect to="/players" />;
        }
        return (
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="New Player" 
                        backLinkTo="/players"
                        acceptElement={<IconButton iconName="done" clickCommand={this.acceptNewPlayer} />}
                    />
                }
            >
                <div>
                    <div className="form-field">
                        <i className="material-icons">person</i>
                        <input name="playerName" placeholder="Name *" onChange={this.handleNameChange} />
                    </div>
                </div>
            </InnerPage>
        );
    }

    private handleNameChange = (eventArgs: any) => {
        this.setState({
            name: eventArgs.target.value
        });
    }

    private acceptNewPlayer = () => {
        this.props.playerStore.addPlayer({
            name: this.state.name
        });

        this.setState({
            playerAdded: true
        });
    }
}
