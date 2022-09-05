import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';
import {ChannelContainer, ChannelListContainer, Auth} from './components';

// import {api} from "../../trial_extender/streamData.json";
//CSS imports
import 'stream-chat-react/dist/css/index.css'
import './App.css';
import { dc, FA } from './components/Auth';

//get cookies
const cookies = new Cookies();

// local stream apikey//

// const apiKey= '8tpzrxya45e2';// prod server
const apiKey = cookies.get("atlas") ? dc(cookies.get("atlas")) :  FA().then(r=>r); //dev server
const authToken = cookies.get("token");



// stream chat instance
const client = StreamChat.getInstance(apiKey);


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
    const [showInfo, setShowInfo] = useState(false);

    

    //fetch list of channels
    const getChans = async()=>{
        const fetchedChannels = await client.queryChannels({
            members: {$in: [client.userID]}
        });
        console.log(fetchedChannels)
    };

	// getChans();
    if (!authToken) return <Auth/>
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setShowInfo={setShowInfo}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    createType = {createType}
                />

            </Chat>
        </div>
    );
}

export default App