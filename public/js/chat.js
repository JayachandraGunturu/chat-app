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
    {
        const html = Mustache.render(messagTemplate,{message : msg,attrVal: "right"});
        $messages.insertAdjacentHTML('beforeend',html);
        socket.emit("message",msg,(error)=>{
            $sendButton.removeAttribute('disabled');
            $inputField.value="";
            $inputField.focus();
            autoscroll();
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
    const html = Mustache.render(messagTemplate,{message : msg,attrVal: "left"});
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
    $messages.scrollTop = $messages.scrollHeight;   

}

