import React from 'react'


const ChannelInvite = ({channel,  user}) => {
 
    const acceptInvite = async () => {
        try {

            // // accept the invite 
            await channel.acceptInvite({ 
                message: { text: `${user?.name || user?.id} has joined this channel!` }, 
            }); 
            console.log(channel)
            
        } catch (error) {
            console.log(error)
            
        }
        

    }

    const rejectInvite = async() => {
        try{
            
        // //rejecting invites
            await channel.rejectInvite();
            console.log(channel)
        } catch (error) {
            console.log(error)
            
        }
        
    }


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
            <div className="str-chat__invite-card__actions">
                <div className="str-chat__invite-card__actions_filler">
                    <div 
                        className="str-chat__invite-card__actions-reject"
                        onClick={()=>(rejectInvite)}
                    > Reject </div>
                    <div  
                        className="str-chat__invite-card__actions-accept"
                        onClick={()=>(acceptInvite)}
                    > Accept</div>
                </div>
                

            </div>
            
            
        </div>
        
    )
}

export default ChannelInvite
