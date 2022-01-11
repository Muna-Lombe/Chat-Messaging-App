import React,{useEffect,useState} from 'react';
import { Avatar,useChatContext } from 'stream-chat-react';

//assets
import {InviteIcon} from "../assets"


// Container for List of user
const ListContainer = ({isEditing, children}) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                {/* <p>Invite</p> */}
                {isEditing && <p>Invite</p>}
            </div>
            {children}
        </div>
    )
};

//individual users
const  UserItem = ({user, setSelectedUsers, isEditing}) => {
    //toggle invited
    const [selected, setSelected] = useState(false)

    // add user to list of selected  users
    const handleSelect = () => {
        if(selected === true){
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))

        }else{
            isEditing
            // ? setSelectedUsers((prevUsers) => prevUsers[user.id] = user)
            // : setSelectedUsers((prevUsers) => prevUsers[user.id] = user.id)
            ? setSelectedUsers((prevUsers) => [...prevUsers, user.id])
            : setSelectedUsers((prevUsers) => [...prevUsers, user.id])
            

        }
    }

    const toggleInvite = () =>{
        setSelected((prevState) => !prevState);
        handleSelect();

    }

    const SetInvite = () => {
        return(
            <div onClick={toggleInvite} >

                { selected 
                    ? <InviteIcon /> 
                    : <div className="user-item__invite-empty" />
                }
            </div>
        )
    }

    return(
        <div className="user-item__wrapper" >
            <div className="user-item__name-wrapper">
                <Avatar image = {user.image} name={user.fullname || user.id} size={32}/>
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            
            {isEditing  && <SetInvite /> }
        </div>
    )
};

const UserList = ({setSelectedUsers, activeChannelMembers, excludeChannelMembers, isEditing}) => {
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
                    let filteredUsers = null
                    // setting channel members
                    if(activeChannelMembers){
                        console.log("filtering active", excludeChannelMembers)
                        filteredUsers = response.users.filter((user) => (activeChannelMembers.includes(user.id)))
                        console.log("fil users: ", filteredUsers)
                    }
                    if(isEditing){
                        console.log("filtering exclude", excludeChannelMembers)
                        filteredUsers = response.users.filter((user) => (!excludeChannelMembers.includes(user.id)))
                        console.log("fil users: ", filteredUsers)
                    }

                    console.log("res users: ", response.users)
                    console.log("fil users: ", filteredUsers)
                    setUsers(filteredUsers || response.users);
                 
                }else {
                    setListEmpty(true);
                }
                
                //filter out existing channel members
                if(activeChannelMembers){
                    console.log("active channel members: ", activeChannelMembers);
                    console.log("users: ",users);
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
        <ListContainer isEditing={isEditing}>
            {loading ? <div className="user-list__message"> loading users... </div> 
            : (
                users?.map((user, i) => (
                    <UserItem index={i} isEditing={isEditing} key={user.id} user={user}setSelectedUsers={ setSelectedUsers } />
                ))
            )}
        </ListContainer>
    )
};

export default UserList;