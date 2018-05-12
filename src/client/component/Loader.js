import React from 'react'

export default class Loader extends React.Component {

    render(){
        return(
            <div>
                <div className="loader-fetch">
                    <div className="container">
                        <div className="row">
                            <div id="loader">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="lading"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}