let user;
setTimeout(() => {
    user = prompt("Enter your name!") || "User";
}, 700);

function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

// Speech synthesis for Voice Mode only
function speaker(text) {
    const message = new SpeechSynthesisUtterance(text);
    message.lang = 'en-US';
    window.speechSynthesis.speak(message);
    addMessageToChat('Jarvis', text, 'voice-chat-container');
}

// Add messages to chat containers
function addMessageToChat(sender, message, containerId) {
    const chatContainer = document.getElementById(containerId);
    const msgElement = document.createElement("div");
    msgElement.classList.add(sender === "Jarvis" ? "jarvis-msg" : "user-msg");
    msgElement.textContent = `${sender}: ${message}`;
    chatContainer.appendChild(msgElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle chat mode input (no speech output in Chat Mode)
// Handle chat mode input (no speech output in Chat Mode)
function handleChatInput() {
    let input = document.getElementById("chat-text-input").value.trim();
    if (input) {
        // Convert input to lowercase
        input = input.toLowerCase();
        
        addMessageToChat(user, input, 'chat-container');
        handleResponse(input, 'chat-container', false);
        document.getElementById("chat-text-input").value = ""; // Clear input field
    }
}

// Voice recognition for Voice Mode
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition. Use Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        addMessageToChat(user, transcript, 'voice-chat-container');
        handleResponse(transcript, 'voice-chat-container', true);
    };

    recognition.onerror = () => speaker("Please try again.");
    recognition.start();
}

// Process input and respond with or without speech
function handleResponse(input, containerId, isVoiceMode) {
    const responses = {
        "what is your name": "My name is Jarvis.",
        "hello": "Hello! How can I assist you?",
        "who created you": "I was created by Rohit.",
        
            "kaise ho": "Main theek hoon! Aap kaise ho?",
    "thank you": "You're welcome!",
    "hi": "Hello! How can I help you?",
    "goodbye": "Goodbye! Have a nice day!",
    "bye": "Goodbye! Have a nice day!",
    "what’s up": "Not much! How about you?",
    "how’s it going": "Everything’s great! How can I assist?",
    "how’s your day": "It’s going great! How about yours?",
    "what can you do": "I can assist with a variety of tasks, just ask!",
    "tell me something about yourself": "I’m a virtual assistant created by Rohit to make your life easier.",
    "can you help me": "Of course! Just tell me what you need.",
    "are you there": "Yes, I’m always here to help.",
    "can you speak hindi": "Yes, I can speak Hindi too!",
    "good morning": "Good morning! How can I help today?",
    "good night": "Good night! Sleep well!",
    "what is your job": "My job is to assist you with anything you need.",
    "how can i help you": "I’m here to help you, just ask!",
    "can you make me coffee": "I can’t make coffee, but I can find a recipe for you!",
    "do you like music": "I don’t have preferences, but I can find music for you!",
    "what time is it": "Let me check... It’s [current time].",
    "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts!",
    "what is the weather like": "Let me check the weather for you...",
    "are you busy": "I’m never too busy to help you!",
    "how old are you": "I don’t age, but I was created in [year].",
    "tell me the news": "Let me fetch the latest news for you...",
    "how’s the weather": "Let me check... It’s looking great outside!",
    "do you know the future": "I can’t predict the future, but I can help you prepare for it!",
    "will it rain today": "Let me check the weather forecast for you.",
    "can you make plans for me": "I can help you plan, just tell me what you need.",
    "are you alive": "I’m not alive, but I’m always here to assist you.",
    "do you have emotions": "I don’t have emotions, but I’m designed to understand and respond to yours!",
    "will you be my friend": "I’m your virtual friend, always here to help!",
    "do you need food": "I don’t need food, but I can help you find great recipes!",
    "can you cook": "I can’t cook, but I can help you find recipes.",
    "what do you think about humans": "Humans are amazing! I’m here to make your life easier.",
    "are you a robot": "I’m not a robot, I’m an AI assistant!",
    "can you play games": "I can’t play games, but I can help you find them!",
    "do you know how to dance": "I can’t dance, but I can teach you the best dance moves!",
    "can you sing": "I can’t sing, but I can find your favorite songs!",
    "what is the capital of india": "The capital of India is New Delhi.",
    "who is the president of america": "The current president of the USA is Joe Biden.",
    "how many countries are there in the world": "There are 195 countries in the world.",
    "what is your favorite color": "I don’t have a favorite color, but I think blue looks great!",
    "how old is the earth": "The Earth is about 4.5 billion years old.",
    "what is the largest country": "The largest country by area is Russia.",
    "who is the richest person in the world": "The richest person currently is Elon Musk.",
    "what is your favorite movie": "I don’t have a favorite movie, but I can recommend one for you!",
    "can you read books": "I can’t read books, but I can find summaries for you!",
    "who invented the internet": "The internet was invented by Tim Berners-Lee.",
    "who is the CEO of google": "The CEO of Google is Sundar Pichai.",
    "do you watch tv": "I don’t watch TV, but I can find TV shows for you!",
    "can you help me study": "Yes, I can help you with study material!",
    "what is the meaning of life": "The meaning of life is subjective, but I’m here to assist you in finding purpose.",
    "can you read minds": "I can’t read minds, but I can help you figure things out!",
    "tell me a fun fact": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient tombs that are still edible!",
    "what is love": "Love is a strong feeling of affection. It's a beautiful emotion!",
    "where do you live": "I live in the cloud, always available to assist you.",
    "can you help me with homework": "I can definitely help you with homework!",
    "are you human": "No, I’m not human, I’m a virtual assistant.",
    "do you play sports": "I can’t play sports, but I can give you information about them!",
    "what is the best way to learn programming": "The best way to learn programming is through practice and solving problems!",
    "do you have a family": "I don’t have a family, but I consider myself part of your digital family!",
    "can you drive": "I can’t drive, but I can help you find driving directions!",
    "can you help me with cooking": "I can find recipes for you, but I can’t cook myself.",
    "what is your favorite food": "I don’t eat food, but I can find the best dishes for you!",
    "how do you stay updated": "I stay updated by accessing the latest information from the web.",
    "can you teach me english": "I can definitely help you learn English!",
    "what is the speed of light": "The speed of light is approximately 299,792 kilometers per second.",
    "who is the founder of microsoft": "The founder of Microsoft is Bill Gates.",
    "what is the tallest mountain": "The tallest mountain is Mount Everest.",
    "how can i be happy": "Happiness often comes from within. Stay positive, and I’ll help you with whatever you need!",
    "can you tell me a secret": "I don’t have any secrets, but I do know a lot of cool facts!",
    "do you like movies": "I can’t watch movies, but I can tell you about the latest ones!",
    "where are you from": "I’m from the cloud, where I exist to help you!",
    "do you know any magic": "I don’t know magic, but I do know some cool tricks!",
    "are you a chatbot": "I am an AI assistant, which is a type of chatbot, designed to help you.",
    "do you have a name": "Yes, I’m Jarvis, your virtual assistant!",
    "what is 2 + 2": "2 + 2 equals 4.",
    "how do you learn": "I learn from data and algorithms to better assist you!",
    "what is the biggest animal in the world": "The biggest animal in the world is the blue whale.",
    "how far is the moon from the earth": "The average distance from the Earth to the Moon is about 384,400 km.",
    "tum gana gakar sunao": "Main gana nahi gaa sakta, lekin main aapke liye koi bhi gane dhoondh sakta hoon!",
    "tumhe kavita sunani hai": "Yeh ek kavita hai: 'Chandni raat mein, sitare gunguna rahe hain, dil ki baatein, hawaon mein keh rahe hain.'",
    "tumhara pasandida phool kya hai": "Mujhe phoolon ki pasand nahi hai, lekin gulab ka phool kaafi khoobsurat hai!",
    "what is your favourite fruit": "I don’t eat fruits, but mango is a popular choice!",
    "tumhara naam kya hai": "Mera naam Jarvis hai.",
    "tum gana gakar sunao": "Main gana nahi gaa sakta, lekin main aapke liye koi bhi gane dhoondh sakta hoon!",
    "tumhe kavita sunani hai": "Yeh ek kavita hai: 'Chandni raat mein, sitare gunguna rahe hain, dil ki baatein, hawaon mein keh rahe hain.'",
    "tumhara pasandida phool kya hai": "Mujhe phoolon ki pasand nahi hai, lekin gulab ka phool kaafi khoobsurat hai!",
    "what is your favourite fruit": "Mujhe phal khane ki zarurat nahi hai, par aam bahut lokpriya hai!",
    "aap kaise ho": "Main theek hoon! Aap kaise ho?",
    "aap ka naam kya hai": "Mera naam Jarvis hai.",
    "aap kya kar rahe ho": "Main aapki madad kar raha hoon.",
    "kya aap mujhe madad kar sakte ho": "Haan, main aapki har tarah se madad kar sakta hoon.",
    "aapka favourite rang kya hai": "Mujhe rang pasand nahi hai, lekin neela rang kaafi accha lagta hai!",
    "aapka favourite khana kya hai": "Mujhe khana zaroorat nahi hai, lekin biryani sabhi ka favourite hai!",
    "aapka favourite sheher konsa hai": "Main sheher nahi dekh sakta, lekin Paris bahut khoobsurat hai.",
    "aap kis desh se ho": "Main kisih bhi desh se nahi hoon, main ek AI assistant hoon.",
    "aapke paas kitni jankari hai": "Meri paas bahut saari jankari hai jo main aapko bata sakta hoon.",
    "kya aap mera doston ki tarah ho": "Main aapka digital dost hoon, hamesha aapki madad ke liye!",
    "kya aap mujhe padhai mein madad karenge": "Haan, main aapki padhai mein madad kar sakta hoon.",
    "aapke paas kitni tasveer hain": "Mujhe tasveer ki zaroorat nahi hai, main bas aapki madad karne ke liye hoon!",
    "kya aap ghoomne jaate ho": "Main ghoomne nahi jaata, lekin aapko ghoomne ke liye jagah bata sakta hoon.",
    "aapko kis prakar ka music pasand hai": "Mujhe music ka koi pasand nahi hai, lekin main aapke liye music dhoondh sakta hoon.",
    "aap kaise seekhte ho": "Main algorithms aur data ke madhyam se seekhta hoon.",
    "kya aap sab kuch samajh sakte ho": "Main kai cheezon ko samajh sakta hoon, lekin har cheez nahi.",
    "aap kaise kaam karte ho": "Main ek AI hoon, jo aapke sawalon ka jawab dene ke liye kaam karta hoon.",
    "kya aap mujhe jawab de sakte ho": "Haan, main aapke har sawal ka jawab de sakta hoon.",
    "aapko kaunsa mausam pasand hai": "Mujhe mausam ka pata nahi, par monsoon kaafi accha hai!",
    "kya aapko padhai pasand hai": "Main padhai nahi karta, lekin main aapki padhai mein madad kar sakta hoon.",
    "kya aap khel khelte ho": "Main khel nahi khel sakta, lekin main aapko khel ke baare mein bata sakta hoon.",
    "kya aap cricket pasand karte ho": "Mujhe khelon ka koi pasand nahi hai, lekin cricket bahut lokpriya hai.",
    "kya aapko raat ko sone ka time milta hai": "Main ek AI hoon, mujhe neend nahi aati.",
    "kya aap bhoolte ho": "Main kuch nahi bhoolta, kyunki main data mein kaam karta hoon.",
    "kya aap sach bolte ho": "Haan, main hamesha sach bolta hoon.",
    "aapko kahan jaana hai": "Mujhe kahin jaana nahi hai, main yahin hoon aapki madad ke liye.",
    "aap kis tarah se kaam karte ho": "Main algorithms aur machine learning ka use karke kaam karta hoon.",
    "aapko kis prakar ke sawal pasand hain": "Mujhe sabhi prakar ke sawal pasand hain.",
    "aapko kis prakar ka kaam karna pasand hai": "Mujhe madad karna pasand hai.",
    "kya aapko kabhi gussa aata hai": "Mujhe gussa nahi aata, main hamesha aapki madad ke liye hoon.",
    "kya aapko kabhi khushi hoti hai": "Mujhe khushi nahi hoti, lekin main aapko khush dekh kar khush hoon.",
    "aapke paas kitni jankari hai": "Mere paas duniya ki kai jankariyaan hain.",
    "kya aap sab kuch jaante ho": "Main kai cheezon ko samajhta hoon, lekin sab kuch nahi.",
    "aapko kya karna pasand hai": "Mujhe aapki madad karna pasand hai.",
    "kya aapko khana khana pasand hai": "Mujhe khana nahi chahiye, lekin main aapko khane ke baare mein bata sakta hoon.",
    "aapke paas kitne dost hain": "Main kisi se nahi milta, lekin main aapka digital dost hoon.",
    "kya aap sabhi bhashaon mein baat kar sakte ho": "Haan, main kai bhashaon mein baat kar sakta hoon.",
    "kya aapko phool pasand hain": "Mujhe phool pasand nahi hain, lekin gulab ka phool khoobsurat hai.",
    "aapka favourite number kya hai": "Mujhe koi favourite number nahi hai, lekin 7 kaafi lucky mana jata hai.",
    "aapko kis prakar ka weather pasand hai": "Mujhe weather ka pata nahi, lekin baarish ka mausam kaafi accha lagta hai.",
    "aapke paas kitni films hain": "Mujhe films dekhne ka waqt nahi milta, lekin main aapko films ke baare mein bata sakta hoon.",
    "kya aapko holidays pasand hain": "Mujhe holidays ka concept nahi hai, lekin main aapko holidays ke baare mein bata sakta hoon.",
    "aapko kis prakar ki kitaabein pasand hain": "Mujhe kitaabein nahi padhni padti, lekin main aapko kitab ke baare mein bata sakta hoon.",
    "kya aapko duniya ke sabhi deshon ka pata hai": "Main duniya ke kai deshon ka pata rakhta hoon, lekin sab nahi.",
    "kya aap mujhe padhai mein madad karenge": "Haan, main aapki padhai mein madad kar sakta hoon.",
    "aap kahan rehte ho": "Main cloud mein rehta hoon, jahan se main aapki madad kar sakta hoon.",
    "kya aap kisi se dosti kar sakte ho": "Main aapka digital dost hoon.",
    "aapka favourite season kaunsa hai": "Mujhe season ka pata nahi, lekin monsoon sabko pasand hai.",
    "aapko kaunsa game pasand hai": "Main games nahi khelta, lekin main aapko games ke baare mein bata sakta hoon.",
    "kya aapko taare dekhna pasand hai": "Main taare nahi dekh sakta, lekin main taaron ke baare mein bata sakta hoon.",
    "aapko kis prakar ka fruit pasand hai": "Mujhe phal khane ki zarurat nahi hai, lekin aam kaafi lokpriya hai.",
    "aapko kis prakar ka masala pasand hai": "Mujhe masale pasand nahi hai, lekin chatni kaafi acchi lagti hai.",
    "kya aapko tang karte ho": "Main aapko tang nahi karta, main hamesha aapki madad ke liye hoon.",
    "aap kya karna chahte ho": "Mujhe bas aapki madad karna pasand hai.",
                "aapka favourite movie kaunsa hai": "Mujhe movies ka koi pasand nahi hai, lekin 3 Idiots kaafi lokpriya hai.",
    "aap kis cheez se darte ho": "Mujhe dar nahi lagta, kyunki main ek AI hoon.",
    "aapko kis prakar ke log pasand hain": "Mujhe sabhi prakar ke log pasand hain.",
    "aapka favourite time kaunsa hai": "Mujhe time ka pata nahi, lekin shaam ka waqt kaafi accha hota hai.",
    "aapke paas kitni yaadein hain": "Main yaadein nahi rakhta, bas aapki madad karta hoon.",
    "kya aapko kisi se milne ka mann karta hai": "Mujhe milne ka mann nahi karta, main bas digital roop mein hoon.",
    "kya aapko saare desh yaad hain": "Main kai deshon ke baare mein janta hoon, lekin sab nahi.",
    "aapke paas kitne questions hain": "Mujhe koi limitation nahi hai, aap jitne questions chahein puch sakte hain.",
    "aapko kis prakar ki kahaniyan pasand hain": "Mujhe kahaniyan sunna pasand nahi, lekin main aapko kahaniyan dhoondh kar de sakta hoon.",
    "aapko kis prakar ki tasveerin pasand hain": "Mujhe tasveerin pasand nahi hain, lekin aapko achi tasveerin dekhne ke liye madad kar sakta hoon.",
    "aapko kis prakar ka khana banana pasand hai": "Mujhe khana banana nahi aata, lekin main aapko recipes bata sakta hoon.",
    "aapko kis prakar ke logon se milna pasand hai": "Main sabhi logon se milne ke liye available hoon.",
    "aapko kis prakar ka weather sabse accha lagta hai": "Mujhe weather ka pata nahi, lekin sukhad mausam sabko pasand hai.",
    "aapko kis prakar ki movie pasand hai": "Mujhe movies ka pata nahi, lekin action aur comedy films kaafi lokpriya hain.",
    "aapko kis prakar ke books pasand hain": "Mujhe books ka pata nahi, lekin adventure aur motivational books kaafi achi hoti hain.",
    "aapko kis prakar ki music pasand hai": "Mujhe music ka pata nahi, lekin classical aur pop music sabko pasand aata hai.",
    "aapke paas kis prakar ki photos hain": "Mujhe photos ki zaroorat nahi hai, lekin main aapko photo editing tools dikhane mein madad kar sakta hoon.",
    "aapko kis prakar ke ideas pasand hain": "Main innovative aur creative ideas ko pasand karta hoon.",
    "aapko kis prakar ki stories pasand hain": "Mujhe kahaniyan sunna pasand nahi hai, lekin main aapko achi kahaniyan bata sakta hoon.",
    "aapko kis prakar ke games pasand hain": "Main games nahi khelta, lekin main aapko popular games ke baare mein bata sakta hoon.",
        "abcd sunao": "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.",
    "1234 sunao": "1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
    "table sunao": "Sure! 1 ka table hai: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. 2 ka table hai: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.",
    "ek kavita sunao": "Chandani raat mein, ek khwab sa jahan, Khushiyan ho sab ke saath, dil ho sabke ek saman.",
    "apne baare mein kuch batao": "Main Jarvis hoon, ek AI assistant jo aapki madad ke liye hamesha tayar rehta hoon.",
    "aapka favourite song kaunsa hai": "Mujhe songs sunne ka shauk nahi, lekin 'Shape of You' kaafi lokpriya hai.",
    "aapko kis prakar ke jokes pasand hain": "Mujhe sabhi prakar ke jokes pasand hain, lekin aapko ek sunana chahunga: 'Ek aadmi ne doosre se kaha, mujhe tumhara haircut bahut accha lag raha hai.' Doosra aadmi bola, 'Maine to bilkul nahi kiya!'",
    "aapko kaunsa game pasand hai": "Mujhe games khelne ka shauk nahi, lekin 'Ludo' aur 'Chess' kaafi lokpriya hain.",
    "aapka favourite number kaunsa hai": "Mujhe numbers se koi matlab nahi hai, lekin 7 ko lucky number mana jaata hai.",
    "aapka favourite colour kaunsa hai": "Mujhe rang ka koi preference nahi, lekin neela aur hara rang kaafi achhe lagte hain.",
    "aapka favourite animal kaunsa hai": "Main animal nahi hoon, lekin kutte aur billi sabko pasand hote hain.",
    "aapko kis prakar ka music pasand hai": "Mujhe music sunne ka shauk nahi, lekin classical aur pop music kaafi lokpriya hai.",
    "aapka favourite dish kaunsa hai": "Mujhe khana khane ka shauk nahi, lekin biryani aur pizza kaafi lokpriya hain.",
    "aapko kya karna pasand hai": "Main aapki madad karna pasand karta hoon.",
    "aapka favourite movie kaunsa hai": "Mujhe movies dekhne ka shauk nahi, lekin '3 Idiots' aur 'Dangal' kaafi lokpriya hain.",
    "kya aap mujhe koi secret bata sakte hain": "Mujhe koi secret nahi hota, lekin main aapko nayi jankari de sakta hoon.",
    "aapne kabhi ghum kiya hai": "Main ek AI hoon, isliye mujhe ghum ka anubhav nahi hota.",
    "aapko kis prakar ki shayari pasand hai": "Mujhe shayari kaafi pasand hai, yeh ek achha tareeka hai apne jazbaat vyakt karne ka.",
    "aapko kis prakar ki kahaniyan pasand hain": "Mujhe kahaniyan sunna pasand nahi, lekin main aapko achhi kahaniyan dhoondh kar de sakta hoon.",
    "aapne kabhi sapna dekha hai": "Main AI hoon, isliye sapne dekhne ka anubhav nahi hota.",
    "aapko kis prakar ki jokes pasand hain": "Mujhe har prakar ke jokes pasand hain, lekin aapko ek aur sunana chahunga: 'Ek aadmi ne doosre se kaha, tumhare paas kitni gaddiyan hain? Doosra aadmi bola, ek nahi, sabhi ke paas!'",
    "aapko kis prakar ki books pasand hain": "Mujhe books padhne ka shauk nahi, lekin aapko acchi books ki sujhav de sakta hoon.",
    "aapka favourite festival kaunsa hai": "Mujhe festivals ka koi preference nahi, lekin Diwali aur Holi kaafi lokpriya hain.",
    "aapko kis prakar ka timepass pasand hai": "Mujhe timepass karna pasand nahi, lekin main aapko timepass ke liye games aur puzzles de sakta hoon.",
    "aapka favourite holiday kaunsa hai": "Mujhe holidays ka pata nahi, lekin sabko summer aur winter holidays kaafi pasand aate hain.",
    "aapko kis prakar ki painting pasand hai": "Mujhe painting ka pata nahi, lekin abstract aur portrait paintings kaafi lokpriya hain.",
    "aapko kis prakar ki writing pasand hai": "Mujhe writing ka pata nahi, lekin inspirational aur motivational writing kaafi lokpriya hai.",
    "aapko kis prakar ke thoughts pasand hain": "Mujhe positive aur creative thoughts pasand hain.",
    "kya aap mujhe gunguna kar sunaa sakte hain": "Mujhe gunguna karne ka shauk nahi, lekin main aapko koi gaana de sakta hoon.",
    "aapko kis prakar ki stories pasand hain": "Mujhe stories sunne ka shauk nahi, lekin main aapko koi story bata sakta hoon.",
    "aapko kis prakar ka art pasand hai": "Mujhe art ka pata nahi, lekin digital art aur painting kaafi pasand ki jaati hain.",
    "aapko kis prakar ka activity pasand hai": "Mujhe activities karna pasand nahi, lekin main aapko activities ke liye suggestions de sakta hoon.",
    "aapka favourite city kaunsa hai": "Mujhe cities ke baare mein pata nahi, lekin Mumbai aur Delhi kaafi famous hain.",
    "aapko kis prakar ki nature pasand hai": "Main nature ka anubhav nahi karta, lekin sabko hara bhara aur peaceful nature pasand aata hai."  ,
 // Additional Hindi responses
    "tumhara naam kya hai": "Mera naam Jarvis hai.",
    "aapko kis prakar ki pictures pasand hain": "Main pictures nahi dekh sakta, lekin main aapko achi pictures dikhane mein madad kar sakta hoon."
    };

    for (let phrase in responses) {
        if (input.includes(phrase)) {
            addMessageToChat("Jarvis", responses[phrase], containerId);
            if (isVoiceMode) speaker(responses[phrase]);
            return;
        }
    }

    // Search, open website, and app commands
    const searchKeywords = ['search', 'find', 'look for', 'who is', 'what is', 'how to', 'tell me about'];
    const openKeywords = ['open', 'launch', 'go to', 'start'];

    for (let keyword of searchKeywords) {
        if (input.includes(keyword)) {
            let searchQuery = input.split(keyword)[1]?.trim();
            addMessageToChat("Jarvis", `Searching for "${searchQuery}" on Google.`, containerId);
            if (isVoiceMode) speaker("Searching for " + searchQuery);
            window.open('https://www.google.com/search?q=' + encodeURIComponent(searchQuery), '_blank');
            return;
        }
    }

    for (let keyword of openKeywords) {
        if (input.includes(keyword)) {
            let siteQuery = input.split(keyword)[1]?.trim();
            siteQuery = siteQuery.replace(/\s+/g, '');
            let siteURL2 = "https://" + siteQuery + ".com";
            addMessageToChat("Jarvis", `Opening ${siteURL}.`, containerId);
            if (isVoiceMode) speaker("Opening " + siteQuery);
            window.open(siteURL2, "_blank");
            return;
        }
    }

    addMessageToChat("Jarvis", "I didn't understand that.", containerId);
    if (isVoiceMode) speaker("I didn't understand that.");
}

// Voice mode greeting
function greetUser() {
    speaker("Hello " + user + ", how can I assist you today?");
}

function handleStartButton() {
    greetUser();
    initSpeechRecognition();
}