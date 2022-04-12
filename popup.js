// Event Listiner for the "PLAY" button
document.getElementById("PopupPlayButton").addEventListener("click", () => {
    document.getElementById("Main-PopupContainer").classList.remove("PopupAnimationIn");
    document.getElementById("Main-PopupContainer").classList.add("PopupAnimationOut");
});

// Event Listiner for the "HOW TO PLAY" button
document.getElementById("PopupRulesButton").addEventListener("click", () => {
    document.getElementById("Main-PopupContainer").classList.remove("PopupAnimationIn");
    document.getElementById("Main-PopupContainer").classList.add("PopupAnimationOut");
    document.getElementById("HelpPopup").classList.remove("PopupAnimationOut");
    document.getElementById("HelpPopup").classList.add("PopupAnimationIn");
});

// Event Listiner for the "X" button
    document.getElementById("HelpPopupCloseButton").addEventListener("click", () => {
    document.getElementById("HelpPopup").classList.remove("PopupAnimationIn");
    document.getElementById("HelpPopup").classList.add("PopupAnimationOut");
    document.getElementById("Main-PopupContainer").classList.remove("PopupAnimationOut");
    document.getElementById("Main-PopupContainer").classList.add("PopupAnimationIn");
});

// Event Listiner for the "RETRY" button
document.getElementById("PopupRetryButton").addEventListener("click", () => {
    document.getElementById("Main-RetryPopupContainer").classList.add("PopupAnimationOut");
    
    setTimeout(() => {
        document.getElementById("Main-RetryPopupContainer").style.display = "none";
        document.getElementById("Main-RetryPopupContainer").classList.remove("PopupAnimationOut");
    }, 1000);
});