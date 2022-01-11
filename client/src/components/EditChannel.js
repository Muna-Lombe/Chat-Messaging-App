import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react'
import { errorMessage } from 'stream-chat-react/dist/components/AutoCompleteTextarea/utils';
// useChatContext

import { UserList } from "./"

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

const EditChannel = ({setIsEditing, excludeChannelMembers, isEditing}) => {
    const { channel} = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [submitError, setSubmitError] = useState(false)
    
    
    //save changes btn
    const onSave = (event) => {
        
        event.preventDefault();

        console.log("new channel name: ",channelName);
        console.log("channel detail: ",channel);
        console.log("member",excludeChannelMembers )
        

        
    };


    //send editChannel request
    const editChannel = async(event) => {
        const updateMsg = `Channel Name Changed by ${channel._client?.user?.fullName || channel._client?.user?.name} !\n`;
        const addMemMsg = `${selectedUsers} has joined the channel, say hi to welcome them`;
        event.preventDefault();
        setSubmitError(false)

        try {
            console.log("all members: ", selectedUsers )
            
            if(selectedUsers.length > 0||channelName !== channel.data.name){
                channelName !== channel.data.name  && await channel.update({ name: channelName}, {text: updateMsg});
                selectedUsers.length > 0 && await channel.addMembers(selectedUsers, {text: addMemMsg})
                console.log("success, new channel: ", channel)
                console.log("all members: ", selectedUsers )
                setIsEditing(false);

            }else{
                setSubmitError((prevState) => !prevState)
            }
            

            
             
            // await invite.create();


            // // initialize the channel 
            // const channel = client.channel('messaging', 'awesome-chat'); 
            
            // // accept the invite 
            // await channel.acceptInvite({ 
            //     message: { text: 'Nick joined this channel!' }, 
            // }); 
            
            // // accept the invite server side  
            // await channel.acceptInvite({'user_id':'nick'});

            // //rejecting invites
            // await channel.rejectInvite(); 
 
            // //server side  
            // await channel.rejectInvite({'user_id':'rob'});


            //reset fields
            // setChannelName('');
            // setSelectedUsers([client.userID ])
            // setActiveChannel(newChannel)

        } catch (error) {
            console.log("error", error)
        }

    };

    //Error handling
    const PrintError = () => {
        var opacity = 1;  // initial opacity
        var display = "";
        var filter = "";
        var errorDiv =(display, opacity,filter) => {  
            var timer =  setInterval(function () {
                if (opacity <= 0.1){
                    clearInterval(timer);
                    setSubmitError(false)
                    display = 'none';
                }
                // opacity ;
                filter = 'alpha(opacity=' + opacity * 100 + ")";
                opacity -= opacity * 0.1;
            }, 50)
            return (
                        <div className="edit-channel__error-wrapper" style={{display:display, opacity:opacity, filter:filter}}>
                            <p>Please make changes or close the page to exit</p>
                        </div>
                    )
        }
        
        return (errorDiv(display,opacity,filter))
    }

    return (
        <div className='edit-channel__container'>
            <div className="edit-channel__header">
                <p>
                    Edit Channel
                </p>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} isEditing={isEditing} excludeChannelMembers={excludeChannelMembers} />
            {submitError && <PrintError />}
            <div className="edit-channel__button-wrapper" onClick={editChannel}>
                 <p>Save</p>
            </div>
        </div>
    )
}

export default EditChannel
