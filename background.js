chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // if (tab.url && tab.url.includes("whatsapp")) {
  //   chrome.tabs.sendMessage(tabId, {
  //     type: "WHATSAPP",
  //   });
  // } else if (tab.url && tab.url.includes("mail.google")) {
  //   chrome.tabs.sendMessage(tabId, {
  //     type: "GMAIL",
  //   });
  // } else if (tab.url) {
  chrome.tabs.sendMessage(tabId, {
    type: "NEW",
  });
  // }
});
