import React from 'react';
import MenuCardView from './menu-card.screen';


export default function MenuCard({ fText, imgPath, getClickCode ,code,...otherProps }) {

    return (
        <MenuCardView
            fText={fText}
            imgPath={imgPath}
            getClickCode={getClickCode}
            code={code}
        />
        )
}