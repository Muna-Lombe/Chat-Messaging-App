import React, { useRef, useState } from 'react';
import {
  Attachment,
  Avatar,
  messageHasReactions,
  MessageOptions,
  MessageRepliesCountButton,
  MessageStatus,
  MessageText,
  MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useChatContext,
  useMessageContext,

//

  
} from 'stream-chat-react';

import {ReactIcon, MoreIcon, ReplyIcon} from '../assets'
import { ChannelInvite } from './';
// import './CustomMessage.scss';

const ChannelMessage =  () => {
  const {
    isReactionEnabled,
    threadList,
    message,
    // handleDelete,
    reactionSelectorRef,
    showDetailedReactions,
    
  } = useMessageContext();
  const { client } = useChatContext();
  const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled);
  const [threadOpen, setThreadOpen] = useState(threadList)
  const [rejected, setRejected] = useState()


  const [channel, setChannel] = useState({id:1, name:'Apache'});
  const [inviteSet, setInviteSet] = useState(false);
  const [channelsFetched, setChannelsFetched] = useState(message.unread);
  
    
    /// checking for and setting the channel
    const checkChannels = async() =>{
        const filters = {id: message.channel_id?.id, type: message.channel_id?.type};
        // console.log('shit set')
        // const getChan = await client.queryChannels(filters)
        const getChan = await client.queryChannels(filters)
    
        setChannel(getChan) 
    }

    // message.unread && setChannelsFetched(false)
    if(!channelsFetched && message.isInvite === true && inviteSet === false) {
        channel.name !== 'apache' && checkChannels()
        

        setInviteSet(true)
        // console.log(channel)
        // console.log(message)

    };


    const acceptInvite = async () => {
        try {
            console.log(channel)
            
    
            // accept the invite 
            await channel[0].acceptInvite({ acceptInvite:true,
                message: { text: `${client.user?.name || client.user?.id} has joined this channel!` }, 
            }); 
            
            console.log(channel)
            
            
        } catch (error) {
            console.log(error)
            
        }
        

    }

    const rejectInvite = async() => {
        try{
            
        // //rejecting invites
            // await channel[0].removeMembers([client.userID])
            console.log(message)
            await client.deleteMessage({messageID: message.id})
            setRejected(true)
            console.log(channel)
        } catch (error) {
            console.log(error)
            
        }
        
    }

    
    const RIcon = () => (<ReactIcon setReactionEnabled={setReactionEnabled}/>)
    const AIcon = () => (<MoreIcon />)
    const ThIcon = () => (<ReplyIcon setThreadOpen={setThreadOpen} />)
    const messageWrapperRef = useRef(null);
    

    const hasReactions = messageHasReactions(message);

  const RegularMessage = () => {
    return(
        <>
            <MessageText />
            {message.attachments && <Attachment attachments={message.attachments} />}
            {/* displays a reaction that has already been added */}
            {hasReactions && !showDetailedReactions && isReactionEnabled && <SimpleReactionsList />}
            <MessageRepliesCountButton reply_count={message.reply_count} />
        </>
    )
  }

  
    
  return (
        
    <div className='str-chat__message-team str-chat__message-team--top str-chat__message-team--regular  str-chat__message-team--received'>
      <div className='str-chat__message-team-meta'>
          <Avatar image={message.user?.image} name={message.user?.name} />
          <div className='message-header-timestamp'>
            <MessageTimestamp />
          </div>
      </div>
      
        <div className='str-chat__message-team-group'>
            
            <div className='str-chat__message-team-author'>
                {message.user?.name}
            </div>
            
            <div className='str-chat__message-team-actions'>
                
                <MessageOptions 
                    displayLeft={false} 
                    messageWrapperRef={messageWrapperRef} 
                    displayReplies={true}
                    // theme='dark'
                    
                    ReactionIcon = {RIcon}
                    ActionsIcon = {AIcon}
                    ThreadIcon = {ThIcon}

                />
                
                { showDetailedReactions && reactionEnabled && (
                    <div className='message-team-reaction-icon'>
                        <ReactionSelector ref={reactionSelectorRef} />
                    </div>
                )}
                
            </div>
            
            <div className='str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text'>
                {message.isInvite ? <ChannelInvite channel={channel} onAccept={acceptInvite} onReject={rejectInvite} sender_id={message.user.id} user_id={client.user.id} rejected={rejected}/> : <RegularMessage/> }   
            </div>

            <div className='str-chat__message-team--received'>
                <MessageStatus />
            </div>            
            
        </div>
 
    </div>
  );
};
export default ChannelMessage;

