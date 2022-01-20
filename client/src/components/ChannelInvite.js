import React from 'react'

const ChannelInvite = ({Channel, setAccept, setReject, showInvite}) => {

    // "str-chat__message-attachment-card str-chat__message-attachment-card--image"

    // useMemo(() => function, input);
    return (
        <div className='str-chat__invite-card__wrapper'>
            <div className="str-chat__invite-card__header">
                <div className="str-chat__invite-card__channel-name">
                    <p> # Apache </p>
                    
                </div>
                <div ></div>
                
            </div>
            <div className="str-chat__invite-card__body">
                <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate ratione id harum corrupti illo fugit!</p>
            </div>
            <div className="str-chat__invite-card__actions">
                <div > </div>
                <div className="str-chat__invite-card__actions_filler">
                    <p className="str-chat__invite-card__actions-reject"> Reject</p>
                    <p  
                        className="str-chat__invite-card__actions-accept"
                        onClick={showInvite}
                    > Accept</p> 
                </div>
                
               

            </div>
            
        </div>
        
    )
}

export default ChannelInvite
