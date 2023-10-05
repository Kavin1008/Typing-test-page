const typingtext = document.querySelector(".textInput p"),
inpField = document.querySelector(".inputfield"),
mistakeTag = document.querySelector(".mistakes span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
timeTag = document.querySelector(".time span b"),
tryAgain = document.querySelector(".btn button");

let timer = 0, maxTime = 60, timeLeft = maxTime, charIndex = mistakes = 0, isTyping = 0;

function randomParagraph(){
    let randIndex = Math.floor(Math.random() * paragraph.length);
    typingtext.innerHTML = "";
    paragraph[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span`;
        typingtext.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inpField.focus());   
    typingtext.addEventListener("click", () => inpField.focus());   
}

function initTyping(){
    const characters = typingtext.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0)
    {
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            console.log(charIndex);
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct");
            characters[charIndex].classList.remove("incorrect");
        }
        else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
       
        let wpm = ((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");    
        mistakeTag.innerHTML = mistakes;
        cpmTag.innerHTML = (((charIndex - mistakes) / (maxTime - timeLeft)) * 5).toFixed(2);
        wpmTag.innerHTML = wpm.toFixed(2)
    }
    else{
        inpField.value = "";
        characters[charIndex].classList.remove("active");    
        clearInterval(timer);
    }
    
    
}

function initTimer(){
    if(timeLeft>0)
    {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        clearInterval();
    }
}

function reset(){
    randomParagraph();
    timeLeft = maxTime, charIndex = mistakes = 0, isTyping = 0;
    timeTag.innerText = timeLeft;
    cpmTag.innerHTML = 0;
    wpmTag.innerHTML = 0;
    inpField.value = "";
    mistakeTag.innerHTML = mistakes;
    clearInterval(timer);
    characters.classList.remove("active");
    characters.classList.remove("correct", "incorrect");
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgain.addEventListener("click", reset);