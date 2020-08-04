const users = []



authUsers={
    7005924672:'Th.Sachimahon',
    6009410376:'Kh.Rojit',
    8131033286:'T.Jiten',
    9612241764:'Sh.Rameshor',
    9366968503:'Kh.Oken',
    9612435973:'L.Sana',
    7005319243:'Sapam Kanta',
    9366460061:'L.Gogocha',
    7005964723:'K.Tompok',
    8837241525:'L.Ichamba',
    7005623324:'L.Anil',
    101:'Th.Arun',
    8974903050:'L.Eran',
    9366397901:'T.Ebungcha',
    8787884176:'L.Sundar',
    8974146736:'S.Sudhir',
    9366351032:'Kh.Saranjit',
    8732020320:'L.Opendro',
    9366595056:'T.Inaotomba',
    9383354304:'L.Tiken',
    8837036664:'Th.Robot',
    8787349123:'Sh.Khan',
    9366057900:'L.Bikash',
    9615959404:'L.Sarat',
    7005809351:'T.Ranjit',
    9366811968:'T.Ngongo',
    7358743995:'L.Momocha',
    9612024487:'L.Danabir',
    7005721431:'T.Luwangthoi',
    8414023346:'K.Ramananda',
    6009332575:'K.Bidyananda',
    6009405465:'L.Lokeshor',
    8787667262:'L.Dlip',
    7005923458:'L.Ebin',
    6909962340:'T.Ibomcha',
    102:'L.Roshan',
    6009444132:'L.Apak',
    9366389082:'L.Khoiraba',
    8729959804:'L.Naobi',
    103:'Sh.Thoiba',
    9856179611:'L.Doren',
    9366844399:'T.Jagat',
    6009869856:'L.Nilakamal',
    8014863077:'L.Priyokumar',
    8787453977:'T.James',
    104:'T.Ebungcha',
    6009026224:'L.Aboy',
    7005246497:'K.Momocha',
    7005301726:'T.Kanto',
    9958088392:'Sh.Uttamkumar',
    8802353858:'Sh.Taibanganba',
    7005676183:'K.Ibungcha(Inao)',
    8014892223:'Sh.Dinesh',
    105:'K.Macha',
    7085301726:'L.Naoba',
    106:'L.Somon',
    7005173740:'L.Marsel',
    9366189278:'Th.Thomson',
    7005054971:'Kh.Birjit',
    9366076485:'Kh.Premjit',
    8787372083:'Th.Bikram',
    8974546730:'Th.Suresh'

}


PhoneNumbers=Object.keys(authUsers)
//console.log(typeof PhoneNumbers[0] )
names=Object.values(authUsers)

const addUser = ({id, username, room}) => {
    console.log(username)
    
    
    username = username.trim();
    room = room.trim();


     
     if(!PhoneNumbers.includes(username)){
         return {error:'Mobile Number is not authorized'}
     }
     PhoneNumbers.forEach((value,index,array)=>{
        if(value === username){
            console.log(index)
            username=names[index]
        }
     })
    //username = authUsers.usernameP
    if(!username || !room){
        return { error: 'Username and room are required'};
    }

    const existingUser = users.find((user) => user.username === username && user.room === room);

    if(existingUser){
        return { error: 'Username is in use!'};
    }

    const user = { id, username, room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room.trim());

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}