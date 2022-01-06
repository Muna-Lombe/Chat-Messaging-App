import React,{useEffect,useState} from 'react';
import { Avatar,useChatContext } from 'stream-chat-react';

//assets
import {InviteIcon} from "../assets"


// Container for List of user
const ListContainer = ({ children}) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
};

//list of users
const  UserItem = ({user, setSelectedUsers}) => {
    //toggle invited
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(selected){
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        }else{
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
    }

    const toggleInvite = () =>{
        setSelected((prevState) => !prevState)
    }

    return(
        <div className="user-item__wrapper">
            <div className="user-item__name-wrapper">
                <Avatar image = {user.image} name={user.fullname || user.id} size={32}/>
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            <div onClick={toggleInvite}>
                { selected 
                ? <InviteIcon /> 
                : <div className="user-item__invite-empty" />
                }
            </div>
            
        </div>
    )
};

const UserList = ({setSelectedUsers}) => {
    const {client} = useChatContext();

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;
            setLoading(true);

            try {

                // get users
                const response = await client.queryUsers(
                    { id: { $ne: client.userID}},
                    { id: 1},
                    {limit: 8}
                );
                
                //Check if we have users
                if (response.users.length){
                    setUsers(response.users);
                }else {
                    setListEmpty(true);
                }

                
            } catch (error) {
                setError(true);
            }
            setLoading(false);

        }

        if(client) getUsers();
    }, [])
    
    // Error handling
    if(error){
        return(
            <ListContainer>
                <div className="user-list__message">
                    Trouble loading users, please refresh and try again
                </div> 
            </ListContainer>
        )
    };

    if(listEmpty){
        return(
            <ListContainer>
                <div className="user-list__message">
                    It's a little lonely here 😟,
                    no one to talk to.
                </div> 
            </ListContainer>
        )
    };

    return (
        <ListContainer>
            {loading ? <div className="user-list__message"> loading users... </div> 
            : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={ setSelectedUsers }/>
                ))
            )}
        </ListContainer>
    )
};

export default UserList;