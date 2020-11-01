const socket= io();
let textarea= document.querySelector('#textarea');
let name;
let messagearea = document.querySelector('.message__area');
  
while(!name){
   name= prompt('Enter your name');
}
textarea.addEventListener('keyup',(e)=>{
if(e.key==='Enter'){
    sendMessage(e.target.value);
}

});
function sendMessage(message){
let msg = {
    user : name,
    message : message.trim()
}
appendMessage(msg,"outgoing");
textarea.value="";
scrolling();

socket.emit('message', msg);
}
function appendMessage(msg,type){
let mainDiv = document.createElement('div');
className=type;
mainDiv.classList.add(className, 'message');

let code = `
<h4>${msg.user}</h4>
<p>${msg.message}</p> 
`;
//console.log(msg.user);
mainDiv.innerHTML = code;
messagearea.appendChild(mainDiv);

}
socket.on('message',(msg)=>{
    appendMessage(msg,"incoming");
    scrolling();
});

function scrolling() {
    messagearea.scrollTop = messagearea.scrollHeight
}

