const socket=io('http://localhost:8000');

const form=document.getElementById('text');
const messageinp=document.getElementById('mess');
const messageContainer=document.querySelector(".container");
var audio=new Audio('sound.mp3');

const append=(message,position)=>{

    const messageElemnet=document.createElement('div');
    messageElemnet.innerText=message;
    messageElemnet.classList.add('message');
    messageElemnet.classList.add(position);
    messageContainer.append(messageElemnet);
    if(position=='left'){

        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
   messageinp.value=''; 
})
const name= prompt("enter your name to join");

socket.emit('new-user-joined', name )

socket.on('user-joined',data=>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`, 'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`, 'left')
})
