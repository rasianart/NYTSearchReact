import React from '../../node_modules/react'
import Message from './Message'
let socket = io();

export default class Result extends React.Component{
    constructor(props) {
    super(props);
        this.state = {article: {}};
    }

    componentDidMount = () => {
        socket.on('serverMessage', function (data) {
          console.log(data);
        });
    }

    _notifyServer = () => {
        socket.emit('clientMessage', this.state.article);
    }

    saveResult = (i, event) => {
        event.preventDefault();
        let article = {
            title: this.props.results[i].title,
            date: this.props.results[i].date,
            url: this.props.results[i].url
        }
        this.setState({article: article}, () => {
            this._notifyServer();
        });

        fetch('/api/saved',
            {
                method: "POST",
                body: JSON.stringify(article)
            })
            .then(response => response.json())
            .then(json => {});
    }

    render = () => {

        let resultArr = this.props.results.slice(0, 5);
        let result = resultArr.map((res, i) => {
           return (
               <div className="results" key={"contain" + i}>
                   <div className="result-title" key={"title" + i}>Title: {res.title}</div>
                   <div className="result-date" key={"date" + i}>Date: {res.date}</div>
                   <a className="result-url" key={"url" + i} href={res.url} target="_blank">URL: {res.url}</a>
                   <div></div>
                   <button id="save-result" key={i} type="submit" onClick={this.saveResult.bind(null, i)}>Save</button>
               </div>);
        });

        return (
            <div id="result-contain">
                <div id="result-title">Results</div>
                <div id="result-contain">{result}</div>

            </div>
        );

    }
}
