import React from '../../node_modules/react'

export default class App extends React.Component{
    constructor(props) {
    super(props);
        this.state = {posX: 0, posY: 0};
    }

    handleMouseMove = (e) => {
        console.log(e);
        this.setState({ posX: e.screenX, posY: e.screenY });
    }

    render = () => {

        let coordDisplay = "posX: " + this.state.posX + "posY: " + this.state.posY;

        return (
                <div id="mousemove" onMouseMove={this.handleMouseMove.bind(this)}>{coordDisplay}</div>
        )
    }
};
