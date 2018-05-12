import React from 'react'

export default class Alert extends React.Component {
    render(){
        return(
            <div className="alert alert-danger" role="alert">
                {this.props.err}
            </div>
        );
    }
}