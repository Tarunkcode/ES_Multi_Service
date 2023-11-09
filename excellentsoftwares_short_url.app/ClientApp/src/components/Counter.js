import React, { Component } from 'react';
import { Links_data_context } from '../AppContext/short_linksContext';

export class Counter extends Component {
    static contextType = Links_data_context;
    constructor(props) {
        super(props)
        this.state = {
            uri: '',
            captchaValue: '',
            accessKey:''
        }
    }
    renderCaptcha = () => {
        const dCon = this.context;
        let url = `${dCon.domain}/api/GenerateCaptcha`
        let body = {
            "key": "JhYBKw6nLQX7XZzeKSXdmZgeu432"
        }

        try {
           fetch(url, {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",

                },
                body: JSON.stringify(body)
            }).then(jsonStr => jsonStr.json()).then(json => {
                console.log('json str', json.captchaBase64)
                this.setState({ uri: json.captchaBase64, accessKey: json.accesskey })
            })
           
         
        } catch (err) {
            alert(err);
        }
    }
    ValidateCaptcha = () => {
        const dCon = this.context;
        let url = `${dCon.domain}/api/ValidateCaptcha?key=JhYBKw6nLQX7XZzeKSXdmZgeu432&accessKey=${this.state.accessKey}&input=${this.state.captchaValue}`
        console.log('validate url', url)
        try {
            fetch(url).then(res => res.json()).then(final => {
                //final.status == 1 // success
                // final.status == 0 // invalid captcha
                // final.status == 401 // invalid key
                // final.status == -1 // captcha expired
                alert(final.message);

                
            })
        } catch (err) {
            alert(err);
        }
    }
    handleChange = (e) => { this.setState({captchaValue : e.target.value})}
    componentDidMount() {
        this.renderCaptcha();
    }
  render() {
    return (
      <div>
 
        
            <img style={{ width: '10%', border: '1px solid red' }} src={this.state.uri} class="img-thumbnail" />
            <img onClick={this.renderCaptcha} src="./assets/icons8-refresh-30.png" alt="refresh" style={{ width: '3%', cursor:'pointer' }} className="ml-3" />
                    <br></br>
            <input onChange={this.handleChange } type='text' />
                    <br></br>
            <button onClick={this.ValidateCaptcha}>Submit</button>

      </div>
    );
  }
}
