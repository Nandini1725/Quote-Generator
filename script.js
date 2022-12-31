function setFormMessage(formElement, type , message){
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message-${type}`);
}

function setInputError(inputElement, message){
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

function mivi(){
    const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector(".mivi"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter");

    function randomQuote(){
        quoteBtn.classList.add("Loading");
        quoteBtn.innerText = "Loading Quote...";
        fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove("Loading");
        })
    }

    soundBtn.addEventListener("click" , ()=>{
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance);
    });

    copyBtn.addEventListener("click" , ()=>{
        navigator.clipboard.writeText(quoteText.innerText);
    });

    twitterBtn.addEventListener("click" , ()=>{
        let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
        window.open(tweetUrl, "_blank");
    });

    quoteBtn.addEventListener("click", randomQuote);
}

document.addEventListener("DOMContentLoaded" , () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const quote = document.querySelector("#wrapper");

    document.querySelector("#linkCreateAccount").addEventListener("click", e=>{
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e=> {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");

            }
        })
        inputElement.addEventListener("input", e=> {
            clearInputError(inputElement);
        })
    })

    const name = document.querySelector(".username");
    const password = document.querySelector(".password");
            loginForm.addEventListener("submit", e=>{
            e.preventDefault();
            if(name.value == "ABCD" && password.value == "1234"){
                loginForm.classList.add("form-hidden");
                createAccountForm.classList.add("form-hidden");
                quote.classList.remove("form-hidden");
                mivi();
            }
            else{
                setFormMessage(loginForm, "error", "Invalid username/password");
            }
        })

        createAccountForm.addEventListener("submit", e=>{
            e.preventDefault();
            loginForm.classList.add("form-hidden");
            createAccountForm.classList.add("form-hidden");
            quote.classList.remove("form-hidden");
        })

});