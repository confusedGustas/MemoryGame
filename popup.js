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
    document.getElementById("Main-RetryPopupContainer").classList.remove("PopupAnimationIn");
    document.getElementById("Main-RetryPopupContainer").classList.add("PopupAnimationOut");
});

// Onload event for "Main-PopupContainer" and "Main-RetryPopupContainer" modules
window.onload = function() {
    document.getElementById("Main-PopupContainer").style.opacity = "1";
    document.getElementById("Main-RetryPopupContainer").style.visibility = "hidden";
}