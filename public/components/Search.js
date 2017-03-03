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
                <div id="search-title">Search</div>
                <div id="form-contain">
                    <form id="search-form" onSubmit={this.handleSubmit}>
                        <label>
                            Topic:
                            <input id="topic" name="topic" value={this.state.topic} onChange={this.handleTopic} ref="input"></input>
                        </label>
                        <label>
                            Start Year:
                            <input id="start-year" name="startYear" value={this.state.startYear} onChange={this.handleStartYear} placeholder="YYYYMMDD" ref="input"></input>
                        </label>
                        <label>
                            End Year:
                            <input id="end-year" name="endYear" value={this.state.endYear} onChange={this.handleEndYear} placeholder="YYYYMMDD" ref="input"></input>
                        </label>
                        <button id="search-button" type="submit" value="Submit">Search</button>
                    </form>
                </div>
                <Result results={this.state.results} />

            </div>
        );
    }
}
