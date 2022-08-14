var fs = require('fs');
const fetch  = require('node-fetch');

// crude headers saver
const { Console, error } = require("console");



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
  // let h = new Headers(sr.headers);
  // h.forEach((v,k)=>(console.log(`{${k}:${v}}`)))

  var em_res =  await sr.json;
  console.log(em_res);

 
  console.log(basepath);
  fs.writeFileSync(`${basepath}/non.env`,JSON.stringify(em_res));
  console.log("signed in:", sr.ok)

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
    try {
        let replaceSymbol = /((?!\{)(\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\]\:*\s*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)))/;
        let replaceHeader = /((([a-zA-Z0-9]*\s)(?=(\{))))/;
        let replaceLastSymbol = /(\[Symbol\(headers map sorted\)\]: null)/;
        let newHeader = header.replace(replaceHeader,'').replace(replaceSymbol,`${JSON.stringify(header[0])}:`).replaceAll('\'','\"').replaceAll('=>','\:').replace(replaceLastSymbol,'\"s\"\: {}');
        try{
          JSON.parse(newHeader)
        }catch(er){
          throw er;
        }
        let headerJson = JSON.parse(newHeader);
        let objectFromHeaderArr = Object.entries(headerJson)[0][1];
        let sortCookies = objectFromHeaderArr['set-cookie'].split(';')
        
        let finalCookies = Object.fromEntries(sortCookies.map((e,i)=>{
          let idx = e.indexOf('=');
          let key = e.slice((e[0] === ' ' ? 1:0), idx)
          let tempkey  = key.split(',');
          let finalkey = tempkey[1] ? tempkey[1].slice((tempkey[1][0] === ' ' ? 1:0), tempkey[1].length) : key;
          let value =e.slice(idx+1, e.length);
          return[finalkey,value ];
        }))
        fs.writeFileSync(`${basepath}/cleanedResponseHeader.json`,JSON.stringify(finalCookies))

    } catch (error) {
          console.log("header typed changed, switching type 2 format...")
          let slicedHeader = header.slice(header.indexOf("set-cookie")-1, header.length)
          let newHeader = slicedHeader.slice(0,slicedHeader.indexOf("]")+1)
      
          // let clean_k = newHeader.slice(0,newHeader.indexOf(':')).replaceAll('\'','');

          let dirty_v = newHeader.slice(newHeader.indexOf(':')+1,newHeader.length)
                                  .split('\n')
                                  .filter((e)=> (!e.includes('[') && !e.includes(']')) ? e : console.log(''))
          let clean_v_arr = dirty_v.map((e)=> e.trimStart()).map((e)=> e.replaceAll('\'',''))
          let subbed_clean_v = clean_v_arr.map((e)=> e.split(';'))

          let jsonify = (string,pivot, prevObj = null) => {
            if(typeof string === "array"){
              for(let i = 0; i< string.length; i++){
                let split_arr = string.toString().split(pivot)
              
                if(typeof prevObj === "object") return Object.assign({...prevObj,[split_arr[0]]: split_arr[1] })
                return Object.assign({[split_arr[0]]: split_arr[1]})
              }
            }
            if(typeof string === 'string'){
              let split_arr = string.toString().split(pivot)
            
              if(typeof prevObj === "object") return Object.assign({...prevObj,[split_arr[0]]: split_arr[1] })
              return Object.assign({[split_arr[0]]: split_arr[1]})
            }
            if(typeof string === 'object'){
              for(let i = 0; i< string.length; i++){
                let split_arr = string[i].toString().split(pivot)
              
                if(typeof prevObj === "object") return Object.assign({...prevObj,[split_arr[0]]: split_arr[1] })
                return Object.assign({[split_arr[0]]: split_arr[1]})
              }
            }
            
          }
          let finalCookies = {}
          for(let i = 0; i< subbed_clean_v.length; i++){
            finalCookies = jsonify(subbed_clean_v[i],"=", finalCookies)
          }
          
        

          // return -1;
          
          // console.log("",finalCookies)
        fs.writeFileSync(`${basepath}/cleanedResponseHeader.json`,JSON.stringify(finalCookies))
    }
    
    
    
    
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
  console.log("stat:", lr.resp.status)
  if(lr.resp.status !== 200){console.log("bad request"); signup() ; setTimeout(() => {
    login(++counter)
  }, 2000); };
  let res = await lr.res;

  headerCapture.log(lr.resp.headers)//lr.resp.headers['set-cookie']);
  let cookie =  JSON.parse(JSON.stringify((fs.readFileSync("stringHeaderResponse.txt").toString())));
  // console.log("cookie", cookie)
  setCookies(cookie);
  console.log("logged in:", lr.ok)
  return 1;
}
// login();
// get user
// create app from cred
async function createApp(app_count, id, csrftoken, sessionid){

  let baseurl = `https://getstream.io/api/dashboard/organization/${id}/app/`
  let cad = {
              name: `${id}'s app${app_count}`, 
              region: "tokyo", 
              chat_region: "singapore", 
              development_mode: true, 
              template_app: ""
  }
  let jcad = JSON.stringify(cad);
  let scad = `name=${cad.name}&region=${cad.region}&chat_region=${cad.chat_region}&development_mode=${cad.development_mode}&template_app=${cad.template_app}`
  let cadh = {
    "Referer": "https://dashboard.getstream.io/",
    "path": `/api/dashboard/organization/${id}/app/`,
    "User-Agent": "PostmanRuntime/7.29.0",
    "Accept": "*/*",
    "Host": "getstream.io",
    "Accept-Encoding": "gzip, deflate, br",
    "Access-Control-Expose-Header": "set-cookie",
    "Cookie":`csrftoken=${csrftoken}; sessionid=${sessionid}` ,
    "x-csrftoken": `${csrftoken}`,
    "Content-Type": "application/x-www-form-urlencoded",//"application/json",//"multipart/form-data; boundary=----WebKitFormBoundary40ftPa3qzAxhRqXt",//"application/x-www-form-urlencoded",
    "Content-Length": scad.length
    
   //"Connection": "keep-alive",
  }
  let cadh_opts = { method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: cadh,
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: scad // body data type must match "Content-Type" header
            }
  console.log({baseurl,cadh_opts})
  // return -1;
  //perform request
  let car = await fetch(baseurl, cadh_opts)
            .then(resp=> {return {res: resp.json(), resp:resp}}, rej => console.log('failed:', rej))
            .catch(err => {console.log(err)});
  let data = await car.res;
  console.log("data", data)
  return -1;
}

async function genApp(app_count){
  login();
  let {csrftoken, sessionid} = await JSON.parse(fs.readFileSync(`${process.cwd()}/cleanedResponseHeader.json`).toString())
  console.log("tok fail",csrftoken === undefined)
  if(csrftoken === undefined) { 
    console.log("retrying..")
    setTimeout(() => {
      return genApp(app_count)
    }, 3000);
    return 0;
  };
  // return -1;
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
  
  if(gr.resp.status !== 200){setTimeout(() => {
      return login();
    }, 3000); };
  let res = await gr.res
  console.log("final res:", res)
  console.log("genned app in:",gr.ok)

  let [id, appkey, appsec] = [res.organizations[0].apps[0].id,res.organizations[0].apps[0].api_access[0].key, res.organizations[0].apps[0].api_access[0].secret];
  console.log(id, appkey, appsec)
  let cookieString = "id:"+id.toString()+"\n"
                      +"appkey:"+appkey.toString()+"\n"
                      +"appsec:"+appsec.toString()+"\n"
  // return fs.writeFileSync(`${basepath}/streamData.txt`,JSON.stringify({id,appkey,appsec}))
  fs_do('write',basepath,'streaData.txt',cookieString)
  fs_do('write',basepath,'streamData.json',JSON.stringify({id,appkey,appsec}))
  console.log(id, csrftoken, sessionid)
  createApp(app_count,id,csrftoken, sessionid)
  return {id, csrftoken, sessionid};
}


// login()
genApp(4);
// createApp(3)
// regex
// (\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\])
// codnitional looknehind
// (?(?!\{)(\[*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\)\]:\s*[a-zA-Z0-9]*\(*[a-zA-Z0-9]*\s*[a-zA-Z0-9]*\))|(\,))
// (?(([a-zA-Z0-9]*\s)(?=(\{))))
// (\=\>)