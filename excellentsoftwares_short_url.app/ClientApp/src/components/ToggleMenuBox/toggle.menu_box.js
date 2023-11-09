import React from 'react';
import './menu.styles.css'
export default function ToggleMenuBox() {

    const toggleMenuShow = (e) => {
        let ele = document.getElementById('leftPanel')
        // collapse menu & expand menu
        if (ele.classList.contains('collapse-menu')) {
            ele.classList.remove('collapse-menu');
            ele.className ='expand-menu'
        } else {
            ele.classList.remove('expand-menu');
            ele.className = 'collapse-menu'
            ele.style.transform = `translateY(${e.clientY - 25}px)`;
            ele.style.transform += `translateX(${e.clientX - 25}px)`;
        }
    }
   const anim = () => {
        let ele = document.getElementById('leftPanel')
       ele.className = 'box';
       ele.style.transform = 'skew(15deg, 15deg)';
       ele.style.backgroundColor = 'rgb(255, 204, 204)';
       ele.style.width = '70%';
       ele.style.height= '200px';
   
    }
    const animOut = () => {
        let ele = document.getElementById('leftPanel')
        ele.classList.remove("box")
        ele.style.transform = '';
        ele.style.backgroundColor = '';
        ele.style.width = '';
        ele.style.height = '';
      
    }
    return (
        <div className="menu-icon" style={{ width: '50px', height: '50px', position: 'absolute', right: '5%', bottom: '5%', cursor: 'pointer' }}>
            <img src='./assets/grid_menu.png' style={{ width: '100%', height: '100%' }} style={{ animation: 'myAnim 2s ease 0s infinite normal forwards' }} onMouseOver={anim} onMouseOut={animOut} onClick={toggleMenuShow } />
        </div>
        )
}