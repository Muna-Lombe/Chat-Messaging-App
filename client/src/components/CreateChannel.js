import React, { useState } from 'react';
import { useChatContext, useMessageContext } from 'stream-chat-react';





//components
import { UserList, ChannelInvite } from './'

//assest
import { CloseCreateChannel } from '../assets'




const ChannelNameInput = ({channelName = '', setChannelName}) => {
    

    const handleChange = (event) => {
          event.preventDefault();  
        
          setChannelName(event.target.value);
    };
    return (
        <div className="channel-name-input__wrapper">
           <p>Name</p>
           <input value = {channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
           <p>Add Members</p>

            

        </div>
    )
};
const CreateChannel = ({createType, isCreating, setIsCreating}) => {
    //Setting selected user
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const [channelName, setChannelName] = useState('');
    const [userChannels, setUserChannels] = useState([])
    const [acceptedInvite, setAcceptedInvite] = useState(false)

 

    //send CreateChannel request
    const createChannel = async(event) => {
        
        event.preventDefault();
        console.log('handshake: ', client.activeChannels);

        try {
            const newChannel = client.channel(
                createType, 
                channelName, 
                {name: channelName, members:[client.userID], invite:true}
            )
            await newChannel.create();

            console.log('newChannel : ', newChannel)
            // update "channel_member" role grants in "messaging" scope 
         

            

            // only find target contact if new channel created successfuly
            if(newChannel?.ido){
                
                const userChan = async (userId) => {
                    console.log('sending invite...')
                    let chan = client.getChannelByMembers('messaging', {members:[client.userID,userId]});
                    // await chan.create();

                    console.log('id: ',chan.id)
                    console.log('chanid: ',newChannel?.id)

                    // only send message if channel found or created successfuly
                    // chan.addMembers([userId])

                    if(chan?.id){
                        
                        chan.sendMessage({ 
                            text: `You were invited to a channel`,
                            isInvite:true,
                            channel_id: {type: newChannel?.type, id: newChannel?.id}
                        })
                        
                        setUserChannels((prevChans) => [...prevChans, chan])
                    }else{
                        console.log('chan missing, trying again')
                      
                        
                    }
                };

                //loop through user id and set channels
                selectedUsers.forEach((userId)=> userId !== client.userID && userChan(userId))
                console.log('user-channels', userChannels)
            }
            
            const inviteMembers = selectedUsers.filter((id) => id !== client.userID )
            const msg = "Hi, join our channel and connect"
            const opts = {
                hide_history: true
            }
            console.log('ivs: ', inviteMembers)
            newChannel.inviteMembers(inviteMembers, {message:msg}, {options:opts})
            
            
            
            await newChannel.watch();
            
            //reset fields
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID ]);
            setActiveChannel(newChannel);
            

        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send  Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList  isCreating={isCreating} setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper">
                <p onClick={createChannel}>{createType==='team' ? 'Create Channel' : 'Create Message Group' } </p>
            </div>
        </div>
    )
}

export default CreateChannel
