import React from 'react'


const ChannelInvite = ({channel,  user_id, sender_id, onAccept, onReject, rejected}) => {


    return (
        <div className='str-chat__invite-card__wrapper'>
            <div className="str-chat__invite-card__header">
                <div className="str-chat__invite-card__channel-name">
                    <p> # {channel?.name || channel?.id} </p> 
                </div>
                <div ></div>
                
            </div>
            <div className="str-chat__invite-card__body">
                <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate ratione id harum corrupti illo fugit!</p>
            </div>
            {
                sender_id !== user_id || rejected?
                <div className="str-chat__invite-card__actions">
                    <div className="str-chat__invite-card__actions_filler">
                        <div 
                            className="str-chat__invite-card__actions-reject"
                            onClick={()=>(onReject())}
                        > Reject </div>
                        <div  
                            className="str-chat__invite-card__actions-accept"
                            onClick={()=>(onAccept())}
                        > Accept</div>
                    </div>

                </div>
                : <></>
            }
            
            
            
        </div>
        
    )
}

export default ChannelInvite
