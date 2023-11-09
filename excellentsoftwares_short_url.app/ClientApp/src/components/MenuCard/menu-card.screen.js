import React from 'react';
import './menu-card.styles.css';

export default function MenuCardView({ fText, imgPath, getClickCode,code, ...otherProps }) {

    return (
        <div className="card m-2 text-center slab" style={{ width: '200px', height: '200px' }} onClick={() => getClickCode(code)}>
            <img src={imgPath} className="slab-img" />
            <span>{fText}</span>
        </div>
    )
}