import React from '../../node_modules/react'

export default class Saved extends React.Component{
    constructor(props) {
    super(props);
        this.state = {saved: [],
                      deleted: 0};
    }

    componentDidMount = () => {
        fetch("/api/saved",
            {
                method: "GET"
            })
            .then(response => response.json())
            .then(json => {
                this.setState({saved: json});
            });
    }

    deleteResult = (i, event) => {
        event.preventDefault();
        fetch('/api/saved',
            {
                method: "DELETE",
                body: JSON.stringify({
                    title: this.state.saved[i].title
                })
            })
            .then(response => response.json())
            .then(json => {
            });
        this.state.saved.splice(event.target.key, 1);
        this.setState({deleted: this.state.deleted++});
    }

    render = () => {

        let that = this;
        let saved = this.state.saved.map(function(res, i) {
           return (
               <div className="saved" key={"contain" + i}>
                   <div className="saved-title" key={"title" + i}>Title: {res.title}</div>
                   <div className="saved-date" key={"date" + i}>Date Published: {res.date}</div>
                   <a className="saved-url" key={"url" + i} href={res.url} target="_blank">URL: {res.url}</a>
                   <div className="saved-recorded" key={"recorded" + i}>Date Saved: {res.created_at}</div>
                   <button id="delete-result" key={i} type="submit" onClick={that.deleteResult.bind(null, i)}>Remove</button>
               </div>);
        });

        return (
            <div id="saved-contain">
                <div id="save-title">Saved Articles</div>
                <div id="saved-contain">{saved}</div>
            </div>
        );

    }
}
