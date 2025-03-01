chrome.commands.onCommand.addListener(async (command, tab) => {
    if (command === "activate_extension") {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
        chrome.tabs.sendMessage(tab.id, { action: "activate_extension" });
    } else if (command === "deactivate_extension") {
        chrome.tabs.sendMessage(tab.id, { action: "deactivate_extension" });
    } else if (command === "minimize_details") {
        chrome.tabs.sendMessage(tab.id, { action: "minimize_details" });
    } else if (command === "toggle_log") {
        chrome.tabs.sendMessage(tab.id, { action: "toggle_log" });
    }
});