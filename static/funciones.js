document.getElementById("chat-toogle").addEventListener("click", function() {
    document.getElementById("chat-box").classList.toggle("hidden");
    document.getElementById("chat-toogle").classList.toggle("hidden");
});
document.getElementById("close-chat").addEventListener("click",function(){
    document.getElementById("chat-box").classList.add("hidden");
    document.getElementById("chat-toogle").classList.toggle("hidden");
});

document.getElementById("send-btn").addEventListener("click", async function() {
    document.getElementById("valida").classList.add("hidden");
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById("chat-messages");
        const time = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
        //Mensaje del usuario
        chatMessages.innerHTML += `
            <div class="flex flex-col bg-blue-200 ml-4 py-3 mb-2 px-4 w-auto rounded-bl-lg rounded-tl-lg">
                <span>${message}</span>
                <span class="opacity-75 text-gray-600 absolute bottom-1 right-2" style="font-size: 15px;">${time}</span>
            </div>`;
        input.value="";

        await fetch("/chatbase",{
            method: "POST",
            body: JSON.stringify({message}),
            headers: {"Content-Type": "application/json"}
        })
        .then (response => response.json())
        .then(data =>{
            const time2 = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
            chatMessages.innerHTML += `
                <div class="flex flex-col mr-4 py-3 mb-2 px-4 w-auto bg-blue-50 rounded-bl-lg rounded-tl-lg">
                    <span>${window.marked.marked(data.response)}</span>
                    <span class="opacity-75 text-gray-600 absolute bottom-1 right-2" style="font-size: 10px;">${time2}</span>
                </div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

});

document.getElementById("chat-input").addEventListener("keypress", function(event){
    if (event.key==="Enter"){
        document.getElementById("valida").classList.add("hidden");
        document.getElementById("send-btn").click();
    }
})