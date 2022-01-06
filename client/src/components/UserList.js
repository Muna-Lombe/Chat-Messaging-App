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
const  UserItem = ({user}) => {
    return(
        <div className="user-item__wrapper">
            <div className="user-item__name-wrapper">
                <Avatar image = {user.image} name={user.fullname || user.id} size={32}/>
                <p className="user-item__name">{user.fullName}</p>
            </div>
        </div>
    )
};

const UserList = () => {
    const client = useChatContext();

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [listEmpty, setListEmpty] = useState(false);

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
                console.log(error);
            }
            setLoading(false);

        }

        if(client) getUsers();
    }, [])


    return (
        <ListContainer>
            {loading
            ? <div className="user-list__message">
                
            </div> 
            : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user}/>
                ))
            )}
        </ListContainer>
    )
};

export default UserList;