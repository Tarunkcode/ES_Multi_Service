import React from 'react';
import MenuCard from '../MenuCard/menu-card.component';
import './menu.styles.css';
export default function MenuPage({ getClickCode , ...props}) {
    return (
        <>
            <div className="row row-container col-12">
                <div className="menu-container">
                    <span className="col-12 d-flex flex-row justify-content-center align-items-start">
                        <MenuCard code={1} getClickCode={getClickCode } fText="Whats app" imgPath="./assets/wtts.png" />
                        <MenuCard code={2} getClickCode={getClickCode} fText="Link Shortner" imgPath="./assets/url.png" />
                        <MenuCard code={3} getClickCode={getClickCode} fText="Mail to" imgPath="./assets/mail.png" />
              
                    </span>
           
                </div> 

            </div>
            <div className="row row-container col-12">
        <div className="menu-container">
                <span className="col-12 d-flex flex-row justify-content-center align-items-start">
                        <MenuCard code={4} getClickCode={getClickCode} fText="QR Code" imgPath="./assets/qr.png" />
                        <MenuCard code={5} getClickCode={getClickCode} fText="Captcha" imgPath="./assets/cap.jpg" />
                
                </span>
           
        </div>
        </div>
        </>
    )
}