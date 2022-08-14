var fs = require('fs');
const fetch  = require('node-fetch');

// crude headers saver
const { Console } = require("console");



// make a new logger
const headerCapture = new Console({
  stdout: fs.createWriteStream("stringHeaderResponse.txt"),
  // stderr: fs.createWriteStream("errStdErr.txt"),
});

var basepath = process.cwd();
function fs_do(type,path,file,data){
  if(type==="read"){
    return JSON.parse(fs.readFileSync(`${path}/${file}`).toString())
  }
  if(type==="write"){
    return fs.writeFileSync(`${path}/${file}`,data)
  }
  
}

// singup
async function signup(){

  var url = "https://api.internal.temp-mail.io/api/v3/email/new";
  var eh = {
    "User-Agent": "PostmanRuntime/7.29.0",
    "Accept": "*/*",
    "Host": "api.internal.temp-mail.io",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": 0
  };
  var em_opts = {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: eh,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
               // body data type must match "Content-Type" header
            
            }
            
  var res = await fetch(url,em_opts)
                  .then(resp=> {return resp.json()}, rej => console.log('failed:', rej))
                  .catch(err => {console.log(err)});
  var email = await res.email;
                

console.log("email res", email);

  var si = `email=${email.toString().replace('@','%40')}&username=${email.slice(0, 4)}&password=Aldebarandemoclese773&gotcha=&activate_chat_trial=true`;
  console.log(si)
  /*{
    email: email,
    username: email.slice(0, 4),
    password:"Aldebarandemoclese773",
    gotcha: '',
    activate_chat_trial:true
  }*/;

  var baseUrl = "https://getstream.io/api/accounts/signup/";
  var gh = {
    "Referer": "https://getstream.io/accounts/signup/",
    "User-Agent": "PostmanRuntime/7.29.0",
    "Accept": "*/*",
    "Host": "getstream.io",
    "Accept-Encoding": "gzip, deflate, br",
   //"Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",//"multipart/form-data; boundary=----WebKitFormBoundary40ftPa3qzAxhRqXt",//"application/x-www-form-urlencoded",
    "Content-Length": si.length
  };
  


  
  //getstream signups
  
  
  let sr = await fetch(baseUrl, 
            { method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: gh,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: si ,
              // body data type must match "Content-Type" header
            })
            .then(resp=> {return Object.assign({json:resp.json(), res:resp, headers: resp.headers})}, rej => console.log('failed:', rej))
            // .then(resp=> {return resp.json()}, rej => console.log('failed:', rej))
            .catch(err => {console.log(err)});
  let h = new Headers(sr.headers);
  h.forEach((v,k)=>(console.log(`{${k}:${v}}`)))

  var em_res =  await sr.json;
  console.log(em_res);

 
  console.log(basepath);
  fs.writeFileSync(`${basepath}/non.env`,JSON.stringify(em_res));
  return em_res;
}

// signup();
// login
async function login(counter = 0) {
  if(counter > 5) return 0;
  // https://getstream.io/api/accounts/login/
  // username:Mutale
  // password:Aldebarandemoclese773
  function fetchCred(){
    try{
      return {email, username} = JSON.parse(fs.readFileSync(`${process.cwd()}/non.env`).toString());
    }catch(e){
      return false;
    }
    
  }
  if(fetchCred() === false){
    signup();
    login(++counter);
  }

  function setCookies(header){
    let replaceSymbol = /((?!\{)(\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\]:\s*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)))/;
    let replaceHeader = /((([a-zA-Z0-9]*\s)(?=(\{))))/;
    let replaceLastSymbol = /(\[Symbol\(headers map sorted\)\]: null)/;
    let newHeader = header.replace(replaceHeader,'').replace(replaceSymbol,`${JSON.stringify(header[0])}:`).replaceAll('\'','\"').replaceAll('=>','\:').replace(replaceLastSymbol,'\"s\"\: {}');
    let objectFromHeaderArr = Object.entries(JSON.parse(newHeader))[0][1];
    let sortCookies = objectFromHeaderArr['set-cookie'].split(';')
    
    let finalCookies = Object.fromEntries(sortCookies.map((e,i)=>{
      let idx = e.indexOf('=');
      let key = e.slice((e[0] === ' ' ? 1:0), idx)
      let tempkey  = key.split(',');
      let finalkey = tempkey[1] ? tempkey[1].slice((tempkey[1][0] === ' ' ? 1:0), tempkey[1].length) : key;
      let value =e.slice(idx+1, e.length);
      return[finalkey,value ];
    }))
    // console.log("",finalCookies)
   fs.writeFileSync(`${basepath}/cleanedResponseHeader.json`,JSON.stringify(finalCookies))
  }
  var {email, username} = fetchCred();
  console.log(email, username);
  var li = `email=${email}&username=${username}&password=Aldebarandemoclese773&gotcha=&activate_chat_trial=true`;
  var baseUrl = "https://getstream.io/api/accounts/login/";
  var gh = {
    "Referer": "https://getstream.io/accounts/signup/",
    "User-Agent": "PostmanRuntime/7.29.0",
    "Accept": "*/*",
    "Host": "getstream.io",
    "Accept-Encoding": "gzip, deflate, br",
    "Access-Control-Expose-Header": "set-cookie",
   //"Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",//"multipart/form-data; boundary=----WebKitFormBoundary40ftPa3qzAxhRqXt",//"application/x-www-form-urlencoded",
    "Content-Length": li.length
  };
  
  //getstream signups
  let lr = await fetch(baseUrl, 
            { method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: gh,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: li // body data type must match "Content-Type" header
            })
            .then(resp=> {return {res: resp.json(), resp:resp}}, rej => console.log('failed:', rej))
            .catch(err => {console.log(err)});
  
  if(lr.resp.status === '400'){signup() ;login(++counter)};
  let res = await lr.res;

  headerCapture.log(lr.resp.headers)//new Document())//lr.resp.headers['set-cookie']);
  let cookie =  JSON.parse(JSON.stringify((fs.readFileSync("stringHeaderResponse.txt").toString())));

  setCookies(cookie);
  return 1;
}
// login();
// get user
async function getUser(){
  login();
  let {csrftoken, sessionid} = JSON.parse(fs.readFileSync(`${process.cwd()}/cleanedResponseHeader.json`).toString())
  let baseurl = 'https://getstream.io/api/accounts/user/';
  let basepath = process.cwd();
  let guh = {
    "Referer": "https://getstream.io/accounts/signup/",
    "User-Agent": "PostmanRuntime/7.29.0",
    "Accept": "*/*",
    "Host": "getstream.io",
    "Accept-Encoding": "gzip, deflate, br",
    "Access-Control-Expose-Header": "set-cookie",
    "Cookie":`csrftoken=${csrftoken}; sessionid=${sessionid}` ,
    
   //"Connection": "keep-alive",
    
  }
  let cred =  { method: 'GET', // *GET, POST, PUT, DELETE, etc.
              headers: guh,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body data type must match "Content-Type" header
            }
 let gr = await fetch(baseurl, cred)
            .then(resp=> {return {res: resp.json(), resp:resp}}, rej => console.log('failed:', rej))
            .catch(err => {console.log(err)});
  
  if(gr.resp.status === '400'){login()};
  let res = await gr.res
  console.log("final res:", res)
  let [id, appkey, appsec] = [res.organizations[0].apps[0].id,res.organizations[0].apps[0].api_access[0].key, res.organizations[0].apps[0].api_access[0].secret];
  console.log(id, appkey, appsec)
  // let cookieString = "id:"+id.toString()+"\n"
  //                     +"appkey:"+appkey.toString()+"\n"
  //                     +"appsec:"+appsec.toString()+"\n"
  // // return fs.writeFileSync(`${basepath}/streamData.txt`,JSON.stringify({id,appkey,appsec}))
  //   fs_do('write',basepath,'streaData.txt',cookieString)
  //   fs_do('write',basepath,'streamData.json',JSON.stringify({id,appkey,appsec}))
}

getUser();
// create app from cred
function createApp(cred){

}
// regex
// (\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\])
// codnitional looknehind
// (?(?!\{)(\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\]:\s*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\))|(\,))
// (?(([a-zA-Z0-9]*\s)(?=(\{))))
// (\=\>)