import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react'
// useChatContext

import { UserList } from "./"
import { EditChannel } from "./"
import { CloseCreateChannel } from '../assets'
import { EditIcon } from '../assets'
import { BackIcon } from '../assets'



const ChannelInfo = ({isEditing, setIsEditing, setShowInfo}) => {
    const { channel} = useChatContext();

    const [ activeChannelMembers, setActiveChannelMembers] = useState(Object.values(channel.state.members).map((member) => member.user.id))
    // const [selectedUsers, setSelectedUsers] = useState([]);

    console.log("isediting", isEditing)
    return (
        <div className='channel-info__container'>
            <div className="channel-info__header">

                <p>
                    <span onClick={() => setShowInfo((prevState) => !prevState)} >
                        <BackIcon />   
                    </span>
                </p>
                <p>
                    Channel info
                </p>
                {
                    !isEditing
                    ? <span style={{ display: 'flex' }} onClick={() => setIsEditing((prevState) => !prevState)}>
                        <EditIcon />
                       </span> //
                    : <CloseCreateChannel setIsEditing={setIsEditing} />
                }
            </div>
            {
                isEditing
                ?  <EditChannel setIsEditing={setIsEditing} isEditing={isEditing} excludeChannelMembers={activeChannelMembers}/>
                :  <UserList activeChannelMembers={activeChannelMembers}/>

            }
        </div>
    )
}

export default ChannelInfo
