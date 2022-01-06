const { connect } = require("getstream");

const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;//Always remember to create an instance of streamchat by adding .StreamChat, like has been done.
const crypto = require("crypto");

//credentials

require('dotenv').config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req,res) =>{
    try {
        
        const {fullName, username, password, phoneNumber} = req.body

        //random user ID using crypto
        const userId = crypto.randomBytes(16).toString('hex');
        
        //connection instance
        const serverClient = connect(api_key, api_secret, app_id);
    

        const hashedPassword = await bcrypt.hash(password,10);

        const token = serverClient.createUserToken(userId);
        
        res.status(200).json({token, fullName, username,userId, hashedPassword, phoneNumber});

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error});
        
    }
};


const login = async (req,res) =>{
    const {username, password} = req.body;

    const serverClient = connect(api_key, api_secret, app_id);

    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({name: username});

    if(!users.length) return res.status(400).json({message: "User not found!"});

    const success = await bcrypt.compare(password, users[0].hashedPassword)

    const token = serverClient.createUserToken(users[0].id);

    if(success){
        res.status(200).json({token, fullName: users[0].fullName, username, userId:users[0].id});
    }else{
        res.status(500).json({message: "Incorrect Username or Password"})

    }


    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
        
    }
};

module.exports = {signup,login};