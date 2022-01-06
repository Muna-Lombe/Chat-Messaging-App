import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'


const TeamChannelPreview = ({channel, type}) => {
    const {channel: activeChannel, client} = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );
    //(channel.state.members) returns an object with objects
    //like this -> {12:{}, 23: {}, 45:{}}
    //we can not iterate over it like with an array
    //so we pick the values using js built-in fn Object.values
    const DirectPreview = ()=>{
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID )
        return(
            <div className="channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullname}
                    size={24}
                />
                <p>{members[0]?.user?.fullname}</p>
            </div>
        )

    }


    return (
        <div 
            className={
                channel.id === activeChannel?.id 
                    ? 'channel-preview__wrapper__selected'
                    : 'channel-preview__wrapper'
            }
            onClick={() =>{
                console.log(channel)
            }}


        >
            {type === 'team' ? "<ChannelPreview/>" : "<DirectPreview/>"}

        </div>
    )
}

export default TeamChannelPreview
