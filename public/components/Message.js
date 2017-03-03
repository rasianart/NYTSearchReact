import React from '../../node_modules/react'

export default class Message extends React.Component{
  render = () => {
      return (
          <div className="message">
              <strong>{this.props.article.title} :</strong>
              <span>{this.props.article.date}</span>
          </div>
      );
  }
}
