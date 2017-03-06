import React from '../../node_modules/react'
import Result from './Result'

export default class Search extends React.Component{
    constructor(props) {
    super(props);
        this.state = {topic: '',
                      startYear: '',
                      endYear: '',
                      results: []};
    }

    handleTopic = (event) => {
        this.setState({topic: event.target.value});
    }

    handleStartYear = (event) => {
        this.setState({startYear: event.target.value});
    }

    handleEndYear = (event) => {
        this.setState({endYear: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + 'fq=' + this.state.topic.replace(/\s/g,'+');
            url += '&' + 'begin_date=' + this.state.startYear;
            url += '&' + 'end_date=' + this.state.endYear;
            url += '&' + 'api-key=89bbbe07241743d4b6757290ef1b1b1b';

        fetch(url)
            .then(response => response.json())
            .then(json => {
                let result = json.response.docs.map(function(res, i) {
                   return {
                       title: res.headline.main,
                       date: res.pub_date,
                       url: res.web_url
                   }
                });
                this.setState({results: result});
            });
        this.setState({topic: '', startYear: '', endYear: ''});
    }

    render = () => {

        return (
            <div id="search-contain">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                      <div className="navbar-header">
                        <a className="navbar-brand" href="/">New York Times Search</a>
                        <div id="form-contain navbar" className="navbar-collapse collapse">
                            <form id="search-form" className="navbar-form navbar-right" onSubmit={this.handleSubmit}>
                                <label className="form-group">
                                    Topic:
                                    <input id="topic" className="form-control" name="topic" value={this.state.topic} onChange={this.handleTopic} ref="input"></input>
                                </label>
                                <label className="form-group">
                                    Start Year:
                                    <input id="start-year" className="form-control" name="startYear" value={this.state.startYear} onChange={this.handleStartYear} placeholder="YYYYMMDD" ref="input"></input>
                                </label>
                                <label className="form-group">
                                    End Year:
                                    <input id="end-year" className="form-control" name="endYear" value={this.state.endYear} onChange={this.handleEndYear} placeholder="YYYYMMDD" ref="input"></input>
                                </label>
                                <button id="search-button" className="btn btn-success" type="submit" value="Submit">Search</button>
                            </form>
                         </div>
                       </div>
                    </div>
                </nav>
                <Result results={this.state.results} />

            </div>
        );
    }
}
