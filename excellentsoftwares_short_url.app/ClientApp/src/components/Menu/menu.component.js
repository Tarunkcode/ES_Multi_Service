import React from 'react';
import MenuPage from './menu.screen';
export default function MenuList(props) {
    return (
        <MenuPage getClickCode={props.getClickCode} />
        )
}