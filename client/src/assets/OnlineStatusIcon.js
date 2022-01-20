import React from 'react'


// export const BackIcon = () => (
export const OnlineStatusIcon = ({ isOnline }) => (
    // <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <circle id="avt" cx="14" cy="14" r="13.5" stroke="black" stroke-opacity="0.24"/>
    //     <circle id="onlineStat" cx="21" cy="21" r="6.5" fill={isOnline ? "greenyellow" : "red"} stroke={isOnline ? "green" : "rgb(255, 0, 0)"} stroke-opacity="0.24"/>
    // </svg>
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16.5" cy="14.5" r="13" stroke="black" stroke-opacity="0.24"/>
        <circle cx="24" cy="22" r="5.5" fill={isOnline ? "greenyellow" : "red"} stroke={isOnline ? "green" : "rgb(255, 0, 0)"} stroke-opacity="0.24"/>
    </svg>
);


