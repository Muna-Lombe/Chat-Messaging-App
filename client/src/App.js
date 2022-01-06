import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';
import {ChannelContainer, ChannelListContainer, Auth} from './components';

//CSS imports
import 'stream-chat-react/dist/css/index.css'
import './App.css';

//get cookies
const cookies = new Cookies();

// local stream apikey//

// const apiKey= 'cqgny3xq54uh';// prod server
const apiKey = '8tpzrxya45e2'; //dev server
const authToken = cookies.get("token");


// stream chat instance
const client = StreamChat.getInstance(apiKey);

//checking channels
const getChans = async()=>{
    const channels = await client.queryChannels({
        members: {$in: ["fb88f59f56e36afd41a755b2e1e7ced4"]}
    });
    console.log(channels)
};

getChans();
//create user instance
if(authToken){
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarUrl'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber')
    }, authToken)
}

const App = () => {
        const [createType, setCreateType] = useState('');
        const [isCreating, setIsCreating] = useState(false);
        const [isEditing, setIsEditing] = useState(false);

    if (!authToken) return <Auth/>
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType = {createType}
                />

            </Chat>
        </div>
    );
}

export default App