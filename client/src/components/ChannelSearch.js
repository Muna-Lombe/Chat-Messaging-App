import React, {useState,useEffect} from 'react'
import { getChannel, useChatContext } from 'stream-chat-react'

//assets
import {SearchIcon} from '../assets'

//components
import {ResultsDropDown} from "./"



const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel } = useChatContext();
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        // effect
        if(!query){
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query]);

    const getChannels = async (text) => {
        // console.log(text)
        try {
            //TODO: fetch channels
            const channelRes = client.queryChannels({
                type: 'team', 
                name: { $autocomplete: text },
                members: { $in: [client.userID] },
                // joined: false
            });
            // const chans = await channelRes;
            const userRes = client.queryUsers({ 
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            });

            const [channels, {users}] = await Promise.all([channelRes,userRes]);

            if (channels.length)  setTeamChannels(channels);
            if(users.length)  setDirectChannels(users);
            // console.log("channels: ",chans)
            // client.getChannelById()

        } catch (error) {
            console.log(error)
            setQuery('')
        }
    }
    const onSearch = (event) =>{
        event.preventDefault();
        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value)
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }
    return (
        <div className='channel-search__container'>
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input 
                    className="channel-search__input__text"
                    type="text" 
                    placeholder="Search"
                    value={query}
                    onChange={onSearch}
                />
            </div>
            { query
                && (<ResultsDropDown
                        teamChannels={teamChannels}
                        directChannels={directChannels}
                        setChannel={setChannel}
                        loading={loading}
                        setQuery={setQuery}
                        setToggleContainer={setToggleContainer}
                    
                    />)
            }
        </div>
    )
}

export default ChannelSearch
