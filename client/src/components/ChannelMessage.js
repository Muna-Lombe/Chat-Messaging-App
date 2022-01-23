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
  
} from 'stream-chat-react';

import {ReactIcon, MoreIcon, ReplyIcon} from '../assets'
import { ChannelInvite } from './';
// import './CustomMessage.scss';

const ChannelMessage =  () => {
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();
  const { client } = useChatContext();
  const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled);
  const [detailedReactions, setDetailedReactions] = useState(showDetailedReactions);
  const [channel, setChannel] = useState({id:1, name:'Apache'});
  const [inviteSet, setInviteSet] = useState(false);
  

    /// checking for and setting the channel
    const checkChannels = async() =>{
        const filters = {id: message.channel_id?.id, type: message.channel_id?.type};
        console.log('shit set')
        const getChan = await client.queryChannels(filters)
        setChannel(getChan)
            
        

    }
    if(message.isInvite === true && inviteSet === false) {
        checkChannels()
        setInviteSet(true)
        console.log(channel)
        console.log(message)

    };


//   console.log('isrec:', isReactionEnabled)
//   console.log('show:', showDetailedReactions)
//   console.log('actions ico:', ActionsIcon)
//   console.log('message context:', useMessageContext)
//   console.log('message invite:', message)




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
                <ReactIcon setReactionEnabled={setReactionEnabled}  />

                <ReplyIcon />

                <MoreIcon setDetailedReactions={setDetailedReactions} />

                
                <MessageOptions 
                    displayLeft={true} 
                    messageWrapperRef={messageWrapperRef} 
                    // ActionsIcon
                    // ReactionIcon
                    // ThreadIcon
                />
                {/* showDetailedReactions &&  */}
                { reactionEnabled && (
                    <div className='message-team-reaction-icon'>
                        <ReactionSelector ref={reactionSelectorRef} />
                    </div>
                )}
                
            </div>
            
            <div className='str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text'>
                {message.isInvite ? <ChannelInvite channel={channel} user={message.user}/> : <RegularMessage/> }   
            </div>

            <div className='str-chat__message-team--received'>
                <MessageStatus />
            </div>
            
            

            {/* <div className='str-chat__message-team-actions'>
                <MessageOptions displayLeft={false} messageWrapperRef={messageWrapperRef} />
            </div> */}
            
            
            
            
        </div>


        
    </div>
  );
};
export default ChannelMessage;

// list class
            // str-chat__li str-chat__li--top
        // message container class
            // str-chat__message-team str-chat__message-team--top str-chat__message-team--regular  str-chat__message-team--received 
        // avatar class
            // str-chat__message-team-meta
        // message body class
            // str-chat__message-team-group
        // author class
            // str-chat__message-team-author
        // message text class
            // str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text
            
        // actions class
            // str-chat__message-team-actions
        // reactions class
            // message-team-reaction-icon