import React, { useState } from 'react'




const UserInfo = ({setPartialState}) => {
    
    

    // setPartialState && setIsPartial((prevState)=> !prevState);

    const PartialDiv = () =>(
        
        <>
            <div className="channel-list__list__user-info__avatar-icon">
                Av
            </div>
            <div className="channel-list__list__user-info__user-name">
                Un
            </div>
            <div className="channel-list__list__user-info__online-state">
                On
            </div>
        </>

    )
    
    const FullDiv = () =>{
        return(
            <>
            Full Div
            </>
        )
    };
    return (
        <>
            { setPartialState ? <PartialDiv /> : <FullDiv />}   
        </>
    )
}

export default UserInfo
