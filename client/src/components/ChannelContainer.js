import React, { useState } from 'react'
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react'

import {ChannelInner, CreateChannel, ChannelInfo} from './'

const ChannelContainer = ({ isCreating, setIsCreating, createType, isEditing, setIsEditing, showInfo, setShowInfo}) => {
    const { channel,client } = useChatContext();
    

    
    if (isCreating){
        return(
            <div className="channel__container">
                <CreateChannel
                    isCreating = {isCreating}
                    createType = {createType}
                    setIsCreating = {setIsCreating}
                 />
            </div>
        )
    }

    if (showInfo){
        return(
            <div className="channel__container">
                <ChannelInfo isEditing={isEditing} setIsEditing={setIsEditing}  setShowInfo={setShowInfo}/>
            </div>
            
        )
    }
    
    const EmptyState = () =>{
        return(
            <div className="channel-empty__container">
                <p className="channel-empty__first">This is the beginning of your chat history</p>
                <p className="channel-empty__second">Send messages,attachments, links and more.</p>
            </div>
        )
        
    }
    return (
        <div className='channel__container'>
           <Channel
                EmptyStateIndicator={EmptyState}
                Message={ (messageProps,i) => <MessageTeam key={i} {...messageProps} /> }
           
           >
               <ChannelInner setIsEditing={setIsEditing} setShowInfo={setShowInfo}/>
               
           </Channel>
        </div>
    )
}

export default ChannelContainer
