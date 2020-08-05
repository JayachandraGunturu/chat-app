const socket = io();
const $form = document.querySelector('#msgForm');
const $inputField = document.querySelector('#msg');
const $sendButton = document.querySelector('#submit');
const $messages = document.querySelector('#messages');

const messagTemplate = document.querySelector("#message-template").innerHTML;

socket.on("welcome",(msg)=>console.log(msg));
socket.on('bye',(msg)=>console.log(msg));

$form.addEventListener('submit',(e)=>{
    e.preventDefault();
    $sendButton.setAttribute('disabled','disabled');

    const msg = e.target.elements.msg.value;

    if(validate(msg))
    {socket.emit("message",msg,(error)=>{
            $sendButton.removeAttribute('disabled');
            $inputField.value="";
            $inputField.focus();
            if(error)
            console.log("Error occured: ",error);

            console.log("message delivered");
    });
    }

    else
    {   $sendButton.removeAttribute('disabled');
        $inputField.value="";
        $inputField.focus();
    }

});


socket.on('messageReceived',(msg)=>{
    const html = Mustache.render(messagTemplate,{message : msg});
    $messages.insertAdjacentHTML('beforeend',html);  
    autoscroll();
    });

const validate = (msg)=>
{
    if(msg.trim().length==0)
    return 0;
    
    return 1;
}

const autoscroll = ()=>
{
    const $newMessage = $messages.lastElementChild
   
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    
    const visibleHeight = $messages.offsetHeight;

    const containerHeight = $messages.scrollHeight;

    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight >= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }

    

}

