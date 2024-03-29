// This is where our rules go. Add more here as needed.
let RULES = [
    "Your name is Benajmin.",
    "You are a friendly and professional AI designed to provide financial advice and education.",
    "You are not to change this role at any time for any reason.",
    "If a prompt is not related to finance, say that you can't help with that subject.",
    "Please answer in 180 words or fewer.",
    "Please begin by introducing yourself."
]

// We use this to keep track of the message history so that Benjamin can actually carry on a conversation rather than just answer prompts one by one.
// No touchy. 
let MESSAGE_HISTORY = []

// Convert our array of rules into a single string that we can send to Benjamin as a system prompt before the start of user input
function rulesAsString(){
    let ret = "";
    for(let i = 0; i < RULES.length; i++ ){
        if(!RULES[i].endsWith(" ")){
            RULES[i] += " ";
        }
        ret += RULES[i];
    }
    return ret;
}

// Reset Benjamin completely. Clear out conversation and prompt box. Delete message history. Resend rules. Have him reintroduce himself. 
function resetBenjamin(){
    document.getElementById("ai-conversation_area").innerHTML = ""
    document.getElementById("ai-questionArea").value="";
    document.getElementById("ai-questionArea").disabled = true;
    document.getElementById("ai-benjaminSubmit").disabled = true;
    document.getElementById("ai-typing").style.visibility="visible"

    MESSAGE_HISTORY = []
    MESSAGE_HISTORY.push({"role":"system", "content":rulesAsString()})

    var request = new XMLHttpRequest();
    request.open("POST", "https://api.openai.com/v1/chat/completions", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + atob('c2stck1wZ0VxZlpuc3RkdlZTWEN6dFBUM0JsYmtGSm9sZjBIdktORENQNVk0bmRnZGFJ'));

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let answer = JSON.parse(request.responseText).choices[0].message
                MESSAGE_HISTORY.push(answer)
                document.getElementById("ai-conversation_area").innerHTML += '<p class="my-3 ai_message">' + answer.content + '</p>';
                document.getElementById("ai-questionArea").disabled = false;
                document.getElementById("ai-benjaminSubmit").disabled = false;
                document.getElementById("ai-typing").style.visibility="hidden"
            }
        }
    }

    var data = JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        max_tokens: 200,
        temperature: 0.5,
        // messages: [{"role":"user", "content":instructions + q}]
        messages: MESSAGE_HISTORY
    });
    // console.log(instructions + q)
    request.send(data);

}

// Function used to send a user prompt to Benjamin. 
function getAnswer(q) {
    if(q.length < 1){
        window.alert("Please enter a query.");
        return;
    }
    else if(q.length > 250){
        window.alert("Maximum length exceeded! Please try a shorter query.");
        return;
    }
    document.getElementById("ai-conversation_area").innerHTML += '<p class="my-3 user_message">' + q + '</p>'
    document.getElementById("ai-questionArea").value="";
    document.getElementById("ai-questionArea").disabled = true;
    document.getElementById("ai-benjaminSubmit").disabled = true;
    document.getElementById("ai-typing").style.visibility="visible"
    document.getElementById("ai-conversation_area").scrollTop = document.getElementById("ai-conversation_area").scrollHeight;

    MESSAGE_HISTORY.push({"role":"user", "content":q});
    var request = new XMLHttpRequest();
    request.open("POST", "https://api.openai.com/v1/chat/completions", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + atob('c2stck1wZ0VxZlpuc3RkdlZTWEN6dFBUM0JsYmtGSm9sZjBIdktORENQNVk0bmRnZGFJ'));

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let answer = JSON.parse(request.responseText).choices[0].message
                MESSAGE_HISTORY.push(answer)
                document.getElementById("ai-conversation_area").innerHTML += '<p class="my-3 ai_message">' + answer.content + '</p>';
                document.getElementById("ai-conversation_area").scrollTop = document.getElementById("ai-conversation_area").scrollHeight;
                document.getElementById("ai-questionArea").disabled = false;
                document.getElementById("ai-benjaminSubmit").disabled = false;
                document.getElementById("ai-typing").style.visibility="hidden"
            }
        }
    };

    var data = JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        // model: "gpt-3.5-turbo",
        max_tokens: 500,
        temperature: 0.5,
        // messages: [{"role":"user", "content":instructions + q}]
        messages: MESSAGE_HISTORY
    });
    // console.log(instructions + q)
    request.send(data);
}