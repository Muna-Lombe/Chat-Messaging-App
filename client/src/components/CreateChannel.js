import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

//components
import { UserList } from './'

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

 

    //send CreateChannel request
    const createChannel = async(event) => {

        event.preventDefault();
        try {
            const newChannel = client.channel(
                createType, 
                channelName, 
                {name: channelName, invites: selectedUsers, invite:'pending'}
            )
            await newChannel.create();
            // fetch or set channel to send invite to
            const userChan = async (userId) => {
                let chan = client.getChannelByMembers('messaging', {members:[userId]})
                chan.create();
                chan.sendMessage({ 
                    text: 'Check this bear out https://imgur.com/r/bears/4zmGbMN'
                })
                console.log('id: ',chan?.id)

                setUserChannels((prevChans) => [...prevChans, chan])
            };
            selectedUsers.forEach((user)=> userChan(user))
            console.log('user-channels', userChannels)

            await newChannel.watch();
        

            //reset fields
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID ])
            setActiveChannel(newChannel)

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
