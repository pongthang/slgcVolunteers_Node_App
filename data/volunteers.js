Teams={a:{
    7005924672:'Th.Sachimahon',
    6009410376:'Kh.Rojit',
    8131033286:'T.Jiten',
    9612241764:'Sh.Rameshor',
    9366968503:'Kh.Oken',
    9612435973:'L.Sana',
    7005319243:'Sapam Kanta',
    9366460061:'L.Gogocha',
    7005964723:'K.Tompok',
    8837241525:'L.Ichamba'
},
b:{
    7005623324:'L.Anil',
    01:'Th.Arun',
    8974903050:'L.Eran',
    9366397901:'T.Ebungcha',
    8787884176:'L.Sundar',
    8974146736:'S.Sudhir',
    9366351032:'Kh.Saranjit',
    8732020320:'L.Opendro',
    9366595056:'T.Inaotomba',
    9383354304:'L.Tiken',
    8837036664:'Th.Robot'
},
c:{
    8787349123:'Sh.Khan',
    9366057900:'L.Bikash',
    9615959404:'L.Sarat',
    7005809351:'T.Ranjit',
    9366811968:'T.Ngongo',
    7358743995:'L.Momocha',
    9612024487:'L.Danabir',
    7005721431:'T.Luwangthoi',
    8414023346:'K.Ramananda',
    6009332575:'K.Bidyananda'

},
d:{
    6009405465:'L.Lokeshor',
    8787667262:'L.Dlip',
    7005923458:'L.Ebin',
    6909962340:'T.Ibomcha',
    02:'L.Roshan',
    6009444132:'L.Apak',
    9366389082:'L.Khoiraba',
    8729959804:'L.Naobi',
    03:'Sh.Thoiba',
    9856179611:'L.Doren'
},
e:{
    9366844399:'T.Jagat',
    6009869856:'L.Nilakamal',
    8014863077:'L.Priyokumar',
    8787453977:'T.James',
    04:'T.Ebungcha',
    6009026224:'L.Aboy',
    7005246497:'K.Momocha',
    7005301726:'T.Kanto',
    9958088392:'Sh.Uttamkumar',
    8802353858:'Sh.Taibanganba'
},
f:{
    7005676183:'K.Ibungcha(Inao)',
    8014892223:'Sh.Dinesh',
    05:'K.Macha',
    7085301726:'L.Naoba',
    06:'L.Somon',
    7005173740:'L.Marsel',
    9366189278:'Th.Thomson',
    7005054971:'Kh.Birjit',
    9366076485:'Kh.Premjit',
    8787372083:'Th.Bikram',
    8974546730:'Th.Suresh'
}}
groupDistribution=[
    ['a','b','c','d','e','f'],
    ['b','c','d','e','f','a'],
    ['c','d','e','f','a','b'],
    ['d','e','f','a','b','c'],
    ['e','f','a','b','c','d'],
    ['f','a','b','c','d','e'],
    ['c','d','e','a','f','b']
]

days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
Time=['6 am -9 am','9 am -12pm','12 pm-3 pm','3 pm-6 pm','6 pm-8 pm','8 pm- 10 pm']

var date = new Date();
dayName=date.toLocaleString(undefined, {
    weekday: 'long'
    // year: 'numeric',
    // month: 'long',
    // day: 'numeric'
  })



let hours = date.getHours();


const getGroup = (hours,day)=>{
    let reqXcordinate = 0;
    let reqYcordinate = 0;
    days.forEach((value,index,array)=>{
        if (value === day){
            reqXcordinate=index;
        }
    })
    if(hours>=6 && hours <9 ){
        reqYcordinate=0  
    }else if(hours>=9 && hours<12){
        reqYcordinate=1;
    }else if(hours>=12&& hours<15){
        reqYcordinate=2; 
    }else if(hours>=15 && hours<18){
        reqYcordinate=3;
    }else if(hours>=18&& hours<20){
        reqYcordinate=4; 
    }else if(hours>=20&& hours<22){
        reqYcordinate=5; 
    }else return {noduty:'noduty'}
    return {reqXcordinate,reqYcordinate};
}





let day=getGroup(hours,dayName) // give the details coordinates of particular group.

const getTeamVolunteers = ()=>{
    
    
    if (Object.values(day)=='noduty'){
        return ['No Duty','None']
    }else{
    group = groupDistribution[day.reqXcordinate][day.reqYcordinate]
    ObValues=Object.values( Teams[group])
    return [ObValues,group.toUpperCase()]}

}

const getNextTeam = ()=>{
    if (hours>=22 && dayName === 'Saturday'){
        group = groupDistribution[0][0]
        ObValues=Object.values( Teams[group])
        return [ObValues,group.toUpperCase()]
    } else if (hours<6) {
        let day1=getGroup(6,dayName);
        group = groupDistribution[day1.reqXcordinate][0]
        ObValues=Object.values( Teams[group])
        return [ObValues,group.toUpperCase()]

    }else if (hours>=22 && dayName != 'Saturday'){
        let day1=getGroup(6,dayName);
        group = groupDistribution[day1.reqXcordinate+1][0]
        ObValues=Object.values( Teams[group])
        return [ObValues,group.toUpperCase()]
    }else{
        let day1=getGroup(hours,dayName);
        group = groupDistribution[day1.reqXcordinate][day1.reqYcordinate+1]
        ObValues=Object.values( Teams[group])
        return [ObValues,group.toUpperCase()]

    }

}






module.exports = {getTeamVolunteers,getNextTeam}