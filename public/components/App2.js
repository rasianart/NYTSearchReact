import React from '../../node_modules/react'
import 'whatwg-fetch'

export default class App extends React.Component{
    constructor(props) {
    super(props);
        this.state = {name: '',
                      comment: '',
                      article: {},
                      deleted: 0};
    }

    componentDidMount = () => {
        fetch("/load")
            .then(function(res)  {
                return res.json();
            }).then(function(json)  {
                console.log(json);
                this.setState({article: json});
            }.bind(this));
    }

    handleName = (event) => {
        this.setState({name: event.target.value});
    }

    handleComment = (event) => {
        this.setState({comment: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch("/submitcomment",
            {
                method: "POST",
                body: JSON.stringify({
                    title: this.state.article.title,
                    name: this.state.name,
                    comment: this.state.comment
                })
            }).then(function(res){
            }).then(function(data){
            }.bind(this));
        this.state.article.comments.push({name: this.state.name, comment: this.state.comment});
        this.setState({name: '', comment: '', deleted: this.state.deleted--});
    }

    handleDelete = (i, event) => {
        event.preventDefault();
        fetch("/deletecomment",
            {
                method: "DELETE",
                body: JSON.stringify({
                    title: this.state.article.title,
                    comment: event.target.dataset.comment
                })
            }).then(function(res){
            }).then(function(data){
            }.bind(this));
        this.state.article.comments.splice(event.target.key, 1);
        this.setState({deleted: this.state.deleted++});
    }

    render() {
        if (!this.state.article) return <p>...Loading...</p>

        let c;
        if (this.state.article.comments) {
            let that = this;
            c = this.state.article.comments.map(function(comment, i) {
               return <div id="comment-contain" key={"contain" + i}>
                   <div className="user-name" data-name={comment.name} key={"name" + i}>User Name: {comment.name}</div>
                   <div className="user-comment" data-comment={comment.comment} key={"comment" + i}>Comment: {comment.comment}</div>
                   <button className="delete-comment" data-comment={comment.comment} type="submit" key={i} onClick={that.handleDelete.bind(null, i)}>Delete Comment</button>
               </div>
            });
        }

        return (
            <div>
                <div>{this.state.article.title}</div>
                <img src={this.state.article.img} />
                <div>{this.state.article.summary}</div>
                <p>{this.state.article.text}</p>

                <div>{c}</div>

                <form data-title="{{articleObj.title}}" onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <textarea id="name" name="name" rows="1" cols="50" value={this.state.name} onChange={this.handleName} ref="input"></textarea>
                    </label>
                    <label>
                        Comment:
                        <textarea id="comment" name="comment" rows="4" cols="50" value={this.state.comment} onChange={this.handleComment} ref="input"></textarea>
                    </label>
                    <button id="submit-comment" type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }
};
