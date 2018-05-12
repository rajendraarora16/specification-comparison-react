import React from 'react';
import Alert from './Alert';
import Loader from './Loader'
import ProductList from './ProductList'

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      url1: 'https://www.lazada.sg/apple-iphone-8-256gb-2gb-ram-grey-60291398.html?spm=a2o42.campaign.list.90.518be942CQwT7t',
      url2: 'https://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html',
      url1Response: '',
      url2Response: '',
      url1Loaded: false,
      url2Loaded: false,
      buttonTxt: 'Compare specification',
      errorPopup: false,
      errorMsg: '',
      loader: false,
      oneTimeClick: false,
      isValidUrl: true,
      resetBtnEnable: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._url1 = this._url1.bind(this);
    this._url2 = this._url2.bind(this);
    this._resetBtn = this._resetBtn.bind(this);
    this._tryExample = this._tryExample.bind(this);
  }

  componentDidMount(){
    if(this.state.oneTimeClick === true) {
      this.setState({oneTimeClick: false})
    }    
  }

  componentDidUpdate() {

    if( this.state.url1Loaded && this.state.url2Loaded && this.state.oneTimeClick ) {    

      /**
       * If error is shown and URL is entered in a correct way then hide popup.
       */
      if(this.state.errorPopup === true) {
        this.setState({errorPopup: false, errorMsg: ''});
      }

      /**
       * Hide loader once data is fetched
       */
      if(this.state.loader === true) {
        this.setState({loader: false})
      }

      /**
       * Enable button while fetching is completed
       */
      $("._btn-compare").attr("disabled", false);

      /**
       * Reset button converter
       */
      if( this.state.buttonTxt === 'Compare specification' ) {
        this.setState({buttonTxt: 'Want to try again?', resetBtnEnable: true})
      }
    }
  }

  _resetBtn(){
    
    if( this.state.resetBtnEnable ) {
      
      this.setState({
        url1: '',
        url2: '',
        url1Response: '',
        url2Response: '',
        url1Loaded: false,
        url2Loaded: false,
        buttonTxt: 'Compare specification',
        errorPopup: false,
        errorMsg: '',
        loader: false,
        oneTimeClick: false,
        isValidUrl: true,
        resetBtnEnable: false
      })

      /**
       * Enable input while fetching 
       */
      $(".input1").attr("disabled", false);
      $(".input2").attr("disabled", false);
    }
  }

  _tryExample(){
    this.setState({
      url1: 'asd',
      url2: 'sad'
    })
  }

  _handleSubmit(event) {
    event.preventDefault();

    /**
     * Reset oneTimeClick state to handle
     */
    if(this.state.oneTimeClick === true) {
      this.setState({oneTimeClick: false});
    }

    /**
     * Reset previous stored state product objects.
     */
    if(this.state.url1Response != '' || this.state.url2Response != '' ) {
      this.setState({url1Response: '', url2Response: ''})
    }

    /**
     * Make sure URL is not blank
     */
    if(this.state.url1 == '' || this.state.url2 == ''){
      this.setState({errorPopup: true, errorMsg: 'Product url field is empty!'});
      return;
    }

    /**
     * Make sure URL is only https://www.lazada.sg/
     */
    if(this.state.url1.indexOf('https://www.lazada.sg') == -1 && this.state.url2.indexOf('https://www.lazada.sg') == -1){
      
    this.setState({isValidUrl: false, errorPopup: true, errorMsg: 'Only https://www.lazada.sg are allowed!'});
      return;
    }

    if( this.state.isValidUrl ) {
      /**
       * Used for fixed bug
       */
      if(this.state.oneTimeClick === false) {
        this.setState({oneTimeClick: true})
      }

      if(this.state.loader === false) {
        this.setState({loader: true})
      }

      /**
       * disable button while fetching
       */
      $("._btn-compare").attr("disabled", true);

      /**
       * disable input while fetching 
       */
      $(".input1").attr("disabled", true);
      $(".input2").attr("disabled", true);

      /**
       * fetch URL1
       */
      $.ajax({
        url: '/load',
        type: 'GET',
        data: {
          'url': this.state.url1
        }
      }).then( data => {
        this.setState({url1Loaded: true, url1Response: data});
      });

      /**
       * fetch URL2
       */
      $.ajax({
        url: '/load',
        type: 'GET',
        data: {
          'url': this.state.url2
        }
      }).then( data => {
        this.setState({url2Loaded: true, url2Response: data});
      });
    }
  }

  _url1(e) {
    
    this.setState({
      url1: e.target.value
    });
  }
  _url2(e) {

    this.setState({
      url2: e.target.value
    });
  }

  render() {

    /**
     * Concatenating both URL response in single global array.
     */
    let _arrGlobal = [this.state.url1Response, this.state.url2Response]
    
    return (
      <div className="main-container">
        { (this.state.loader) ? <Loader /> :null }
        { this.state.errorPopup ? <Alert err={this.state.errorMsg} /> : null }
        
        <form className="form" onSubmit={this._handleSubmit}>
          <h1 className="main-header">Compare specification</h1>
          <br/>
          <div className="input-container">
            <input className="input1" value={this.state.url1} type="text" onChange={this._url1} placeholder="Enter 1st URL" />
            <input className="input2" value={this.state.url2} type="text" onChange={this._url2} placeholder="Enter 1st URL" />
          </div>
          <div>
            <input onClick={this._resetBtn} type="submit" className="_btn-compare btn btn-success" value={this.state.buttonTxt} />
          </div>
        </form>

        { (this.state.url1Loaded && this.state.url2Loaded && this.state.oneTimeClick) ? 
            <ProductList _arrGlobal={_arrGlobal} />  : null}

      </div>
    );
  }
}

export default App;