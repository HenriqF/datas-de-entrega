chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.act === 'PEGAR'){
        sendResponse({html: document.documentElement.innerHTML});
    }
});

// window.addEventListener('load', () => {
// });