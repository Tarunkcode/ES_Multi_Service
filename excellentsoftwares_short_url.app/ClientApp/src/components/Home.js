
import React, { Component, useReducer } from 'react';
import './home.styles.css'
import { toast } from 'react-toastify';
import { Links_data_context } from '../AppContext/short_linksContext';
import MenuList from './Menu/menu.component';
import Footer from './footer';
import ToggleMenuBox from '../components/ToggleMenuBox/toggle.menu_box'

import NavMenu from './NavMenu';
import { listAllUsers } from '../firebase/firebase.utils.js'

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from '../redux/user/user.selectors.js'
import { connect } from "react-redux";

class Home extends Component {
    static displayName = Home.name;
    static contextType = Links_data_context;
    constructor(props) {
        super(props);
        
        this.state = {
            DomainUrl:'',
            Name: '',
            Path: '',
            DestinationUrl: '',
            renderCode: 0,
            uri: '',
            watext: '',
            mobno: '',
            mailto: '',
            subject: '',
            ebody:'',
            bcc: '',
            cc: '',
            isEnableCaptchaServices: false,
            userId : ''
        }
        this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
        this.generateQRCode = this.generateQRCode.bind(this);
        this.collect = this.collect.bind(this);
    }
    componentDidMount() {
        console.log('This is Curent User',this.props.currentUser)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentUser !== this.props.currentUser) {
            if (this.props.currentUser) {
                console.log('this is updates', this.props.currentUser)
                const { currentUser } = this.props.currentUser
                if (currentUser && currentUser.displayName) {

                    this.setState({ userId: currentUser.id })
                }
            }
        }
    }

    collect = (e) => {
        const dCon = this.context;
        let key = e.target.name;
        let val = e.target.value;
        let main = { [key]: val, DomainUrl: dCon.domain };
        let currentState = { ...this.state };
        this.setState({ ...currentState, ...main })

        console.log({ ...currentState, ...main })

    }
   
    generateQRCode = (e) => {
        e.preventDefault();
        const dCon = this.context;
        let currentLink = '';
        if (this.state.renderCode == 1) {
            currentLink = `http://wa.me/${this.state.mobno}?text=${this.state.watext}`;

        } else if (this.state.renderCode == 3) {
            currentLink = `mailto:${this.state.mailto}?subject=${this.state.subject}&body=${this.state.ebody}&bcc=${this.state.bcc}&cc=${this.state.cc}`;
        } else {
            currentLink = this.state.Path;
        }
        let body = {
            qrStr: currentLink
        }
        console.log('generate qr link', currentLink);
        let postLinkUrl = `${dCon.domain}/api/CreateQRCode`;
        try {
            let response = fetch(postLinkUrl, {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",

                },
                body: JSON.stringify(body)
            });
            response.then(res => res.json()).then((obj) => {
                console.log("we've got", obj)
                if (obj.fetchCode == 1) {
                    let uri = obj.uriStr;
                    this.setState({uri : uri})
                } else {
                    toast.error(obj.errMsg);
                }
            })
        } catch (err) {
            alert(err);
        }

    }
    handleFinalSubmit(e){
        e.preventDefault();
       
        const dCon = this.context;
        let url = `${dCon.domain}/api/GenerateShortLink`;
   
        try {
            let response = fetch(url, {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",

                },
                body: JSON.stringify(this.state)
            });
            response.then(res => res.json()).then((data) => {
                if (data == 1) {
                    let formEle = document.getElementById('form');
                    formEle.reset();
                    toast.success('Short Link Created Successfully')
                } else if (data == -1 ) {
                    toast.info('Short Link Already Exist')

                } else {
                    toast.error('Encountered Issues While Creating This Short Link')
                }

            }).catch(() => {
                alert('Api Did Not Respond')

            })
          
            
        } catch (err) {
            alert(err);
        }
    }
    CheckCaptchaServices = (e) => {
        let dCon = this.context;
        if (e.target.checked == true) {
            var a1 = document.createElement("p");                 // create an anchor element
            var a2 = document.createElement("p");                 // create an anchor element
            var p = document.createElement("p");                 // create an anchor element
            var h1 = document.createElement("h5");                 // create an anchor element
            var h2 = document.createElement("h5");                 // create an anchor element
                                               // set its href
            
            a1.textContent = `${dCon.domain}/api/GenerateCaptcha`;                                 // set its text
            document.createElement('br')
            p.textContent = `{"key": "${this.state.userId}"}`
            h1.textContent = "[HttpPost]"
            document.getElementById("genCaptchaDiv").appendChild(h1);
            document.getElementById("genCaptchaDiv").appendChild(a1);
            document.getElementById("genCaptchaDiv").appendChild(p);
                              // set its href

            a2.textContent = `${dCon.domain}/api/ValidateCaptcha?key=${this.state.userId}&input=<your entered captcha value>`;                                 // set its text
            h2.textContent ="[HttpGet]"
            document.getElementById("validateCaptchaDiv").appendChild(h2);
            document.getElementById("validateCaptchaDiv").appendChild(a2);
            this.setState({ isEnableCaptchaServices: true })
        } else {
            (this.setState({ isEnableCaptchaServices: false }))
        }
    }
  
    // Start listing users from the beginning, 1000 at a time.


    getClickCode = (code) => {
        console.log('code', code);
        //document.getElementById('form1').reset();
        //document.getElementById('form2').reset();
        if (code == 5) {
            listAllUsers();
        }
        this.setState({
            renderCode: code, DomainUrl: '', Name: '', Path: '', DestinationUrl: '', uri: '', watext: '', mobno: '' });
    }

    render() {
        const { domain } = this.context;
        return (<>
            <NavMenu />
            <div className="container col-12" style={{ minHeight: '95vh', minWidth: '99vw', padding: '0', overflow: 'hidden' }}>
                <div id="leftPanel" className="col-8 box">
                    <MenuList getClickCode={this.getClickCode} />
                    {/*<img src={'./assets/cut_url.jpg'} className="col-12 p-0 homeImg" />*/}
                </div>

                <div id="rightPanel" className="col-4 p-0 d-flex justify-content-center align-items-center" style={{ position: 'absolute', top: '0', right: '0' }}>
                    {
                        !this.state.renderCode && this.state.renderCode === 0 ? null :
                            this.state.renderCode && this.state.renderCode == 3
                                ? (<>
                                    <form id="form1" className="form col-12 p-0">
                                        <span className="form-group d-flex col-12">
                                            <>
                                                <label htmlFor="mailto" className="form-label col-4">Mail to</label>
                                                <input type="text" className="form-control col-7" name="mailto" required onBlur={this.collect} />
                                            </>

                                        </span>
                                        <span className="form-group d-flex col-12">
                                            <>
                                                <label htmlFor="subject" className="form-label col-4">Subject</label>
                                                <input type="text" className="form-control col-7" name="subject" required onBlur={this.collect} />
                                            </>

                                        </span>
                                        <span className="form-group d-flex col-12">
                                            <>
                                                <label htmlFor="bcc" className="form-label col-4">BCC</label>
                                                <input type="text" className="form-control col-7" name="bcc" required onBlur={this.collect} />
                                            </>

                                        </span>
                                        <span className="form-group d-flex col-12">
                                            <>
                                                <label htmlFor="cc" className="form-label col-4">CC</label>
                                                <input type="text" className="form-control col-7" name="cc" required onBlur={this.collect} />
                                            </>

                                        </span>
                                        <span className="form-group d-flex col-12">
                                            <textarea className="form-control col-12" style={{ width: '92%' }} rows={3} name="ebody" required onBlur={this.collect} placeholder="Compose Email..." />
                                        </span>
                                        <div className="btn-group col-12 d-flex  justify-content-center">

                                            <button type="submit" className="btn btn-primary col-5 p-1 m-1" onClick={this.generateQRCode}>Generate QR Code</button>
                                            <input type="button" className="btn btn-danger col-2 p-1 m-1" value="Reset" />
                                        </div>

                                        {
                                            this.state.uri && this.state.uri.length > 0 ? (<span className="form-group d-flex justify-content-center mt-4 col-12">
                                                <img style={{ width: '50%' }} src={this.state.uri} class="img-thumbnail" />
                                            </span>) : null

                                        }
                                    </form>

                                </>)
                                : (<form id="form2" className="form col-12 p-0">
                                    <span className="form-group d-flex col-12">
                                        {
                                            this.state.renderCode && this.state.renderCode == 2 ? (
                                                <>
                                                    <label htmlFor="DomainUrl" className="form-label col-4">Domain</label>
                                                    <input type="text" className="form-control col-7" name="DomainUrl" required readOnly value={domain} />
                                                </>
                                            ) : null
                                        }

                                    </span>
                                    {
                                        this.state.renderCode && this.state.renderCode != 4 && this.state.renderCode != 5 ? (<span className="form-group d-flex col-12">
                                            <label htmlFor="Name" className="form-label col-4">Name (<span className="text-danger" style={{ fontSize: '12px' }}>optional</span>)</label>
                                            <input type="text" className="form-control col-7" name="Name" required onBlur={this.collect} />
                                        </span>) : null
                                    }


                                    {
                                        this.state.renderCode && this.state.renderCode == 2 ? (<>
                                            <span className="form-group d-flex col-12">
                                                <label htmlFor="Path" className="form-label col-4">Short Link</label>
                                                <input type="text" className="form-control col-7" name="Path" required onBlur={this.collect} />
                                            </span>

                                        </>) : this.state.renderCode == 4 ? (<>
                                            <span className="form-group d-flex col-12">
                                                <label htmlFor="Path" className="form-label col-4">Link</label>
                                                <input type="text" className="form-control col-7" name="Path" required onBlur={this.collect} />
                                            </span>
                                        </>) : this.state.renderCode == 5 ? null : (<>
                                            <span className="form-group d-flex col-12">
                                                <label htmlFor="mobno" className="form-label col-4">Mobile No.</label>
                                                <input type="text" className="form-control col-7" name="mobno" required onBlur={this.collect} />
                                            </span>

                                        </>)
                                    }
                                    {
                                        this.state.renderCode && this.state.renderCode == 2 ? (<span className="form-group d-flex col-12">
                                            <label htmlFor="DestinationUrl" className="form-label col-4">Destination</label>
                                            <input type="text" className="form-control col-7" name="DestinationUrl" required onBlur={this.collect} />
                                        </span>) : this.state.renderCode != 4 && this.state.renderCode != 5 ? (<span className="form-group d-flex col-12">
                                            <textarea className="form-control col-12" style={{ width: '92%' }} rows={3} name="watext" required onBlur={this.collect} placeholder={this.state.renderCode == 3 ? "Compose Email..." : "Enter Whats App Message"} />
                                        </span>) : null
                                    }
                                    <div className="btn-group col-12 d-flex  justify-content-center">
                                        {
                                            this.state.renderCode && this.state.renderCode == 2 ? (<button type="submit" className="btn btn-primary col-2 p-1 m-1" onClick={this.handleFinalSubmit}>Register</button>) : this.state.renderCode == 5 ? null : (<button type="submit" className="btn btn-primary col-5 p-1 m-1" onClick={this.generateQRCode}>Generate QR Code</button>)
                                        }
                                        {
                                            this.state.renderCode && this.state.renderCode != 5 ? (<input type="button" className="btn btn-danger col-2 p-1 m-1" value="Reset" />) : null
                                        }

                                    </div>

                                    {
                                        this.state.uri && this.state.uri.length > 0 ? (<span className="form-group d-flex justify-content-center mt-4 col-12">
                                            <img style={{ width: '50%' }} src={this.state.uri} class="img-thumbnail" />
                                        </span>) : null

                                    }

                                </form>)
                    }
                </div>


                {
                    this.state.renderCode && this.state.renderCode == 5 ? (<div className="d-flex flex-column" style={{ height: '10vh', width: '33%' }}>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={this.CheckCaptchaServices} />
                            <label class="form-check-label" for="flexSwitchCheckDefault">Enable Captcha Services</label>
                        </div>
                        1. Generate Captcha EndPoints
                        <div id="genCaptchaDiv" className="endpointDiv bg-light text-primary col-12 mb-3 p-3">
                         
                        </div>
                        2. Validate Captcha EndPoints
                        <div id="validateCaptchaDiv" className="endpointDiv bg-light text-primary col-12 mb-3 p-3">
                           
                    </div>
                  </div>
                  ) : null
              }
              </div>
              <Footer/>
         
          </> );
    }
}

const mapSateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapSateToProps)(Home);
             /* <ToggleMenuBox/>*/