const socket = io();
const $ = (x) => document.querySelector(x);

const $messageForm = $('#message-form');
const $messageFormButton = $messageForm.querySelector('button');
const $messageFormInput = $messageForm.querySelector('input');
const $sendLocationButton = $('#send-location');
const $nextTeamButton = $('#next-team');

const messageTemplate = $('#message-template').innerHTML;
const locationMessageTemplate = $('#location-message-template').innerHTML;
const nextTeamMessageTemplate = $('#nextTeam-message-template').innerHTML;
const $messages = $('#messages');
const sidebarTemplate = $('#sidebar-template').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
    const newMessage = $messages.lastElementChild;
    const newMessageHeight = newMessage.offsetHeight + parseInt(getComputedStyle(newMessage).marginBottom);

    console.log($messages.scrollHeight - newMessageHeight - $messages.offsetHeight);
    console.log($messages.scrollTop)

    if($messages.scrollTop >= $messages.scrollHeight - $messages.offsetHeight - newMessageHeight){
        $messages.scrollTop = $messages.scrollHeight;
    }
}

socket.on('message', (message) => {
    console.log(message.text);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', (message) => {
    console.log(message);
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url1: message.url1,
        url2:message.url2,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('nextTeamMessage', (message) => {
    console.log(message);
    const html = Mustache.render(nextTeamMessageTemplate, {
        username: message.username,
        url1: message.url1,
        url2:message.url2,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});




socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    $('#sidebar').innerHTML = html;
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error){
            return console.log(error);
        }
        console.log('The message was delivered successfully!!');
    });
});

$("#send-location").addEventListener('click', () => {
    $sendLocationButton.setAttribute('disabled', 'disabled');
   

        socket.emit('sendLocation', {
            latitude: 2, 
            longitude: 4,
            
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared');
        });

    });


$("#next-team").addEventListener('click',()=>{
    $nextTeamButton.setAttribute('disabled','disabled');
    socket.emit('nextTeam',{
        hi:2,

    },() =>{
        $nextTeamButton.removeAttribute('disabled');
        console.log('Next team shown!')
    });
});

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error);
        location.href = '/';
    }
});