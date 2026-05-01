var loaded = false

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.act === 'PEGAR' && loaded){
        sendResponse({html: document.documentElement.innerHTML});
    }

});

window.addEventListener('load', () => {
    loaded = true;
});

