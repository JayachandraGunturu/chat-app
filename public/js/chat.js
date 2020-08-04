const socket = io();
const $form = document.querySelector('#msgForm');
const $inputField = document.querySelector('#msg');
const $sendButton = document.querySelector('#submit');

    
const vm =new Vue({
    el: '#message-box',
    data:{messages :[]}

});

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
    vm.$data.messages.push(msg);
    window.scrollTo(0,document.body.scrollHeight);
    autoScroll();
    });

function validate(msg)
{
    if(msg.trim().length==0)
    return 0;
    
    return 1;
}
