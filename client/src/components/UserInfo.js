import React, { useState } from 'react'
import { Avatar } from 'stream-chat-react'

//assets
import {OnlineStatusIcon}  from '../assets'



const UserInfo = ({setPartialState, setFullState, user}) => {
    
    const [loading, setLoading] = useState(true)
    const [isOnline, setIsOnline] = useState([user.online])
    // console.log(isOnline);
    // setIsOnline(onlineStatus);

    // setPartialState && setIsPartial((prevState)=> !prevState);
    const disInfo = () =>{
        console.log('user-info:', user);
    };
    
    const PartialDiv = () =>(
        <div className="channel-list__list__user-info__partial-wrapper">
            <div style={{display:'flex',justifyContent:'center', width:'17%', position:'relative'}}>
                <div style={{
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center', 
                    position:'absolute',
                    bottom: '-11px', 
                    right: '1.5px',}}
                    >
                    <Avatar
                        // className = {type === "messaging" ? 'channel-empty__avatars' : ''}
                        image={user?.image}
                        name={user?.fullName}
                        size={24}
                        onClick={disInfo}
                    
                    /> 
                </div>
                 
                <div style={{ 
                    display:'flex', 
                    justifyContent:'center', 
                    position: 'absolute', 
                    bottom: '-13px', 
                    right: '8.5px', 
                    width:'max-content'}}>
                    <OnlineStatusIcon 
                        isOnline={isOnline}
                    />
                </div>
                
            
            </div>
            
            <p style={{marginLeft: '2px'}}>{user?.fullName || user?.id}</p>
            
        </div>
    )
    
    const FullDiv = () =>{
        return(
            <>
            Full Div
            </>
        )
    };

    if (setFullState) {
        return <FullDiv /> 
    } 
    
    if (setPartialState) {
        return <PartialDiv /> 
    } 

  
    return (
        <div 
            style={{
                display:'flex',
                justifyContent:'space-around',
                border:'1px solid black'
            }}
        >
            {loading && 
                <p className='channel-search__results-header'> Loading... </p>
            }
        </div>
    )
}

export default UserInfo
