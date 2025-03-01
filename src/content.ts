function injectScript (src: string) {
    const existingScript = document.querySelector(`script[src="${chrome.runtime.getURL(src)}"]`);
    if (existingScript) {
        return;
    }

    const s = document.createElement('script');
    s.type = "module";
    s.src = chrome.runtime.getURL(src);
    s.onload = () => {
        console.log(`${src} loaded successfully.`);
    };
    (document.head || document.documentElement).append(s);
}

injectScript('calc-helper.js')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    window.postMessage(message, "*");
});