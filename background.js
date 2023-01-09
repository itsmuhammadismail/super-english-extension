// // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// //   chrome.tabs.sendMessage(tabId, {
// //     type: "NEW",
// //   });
// // });

// chrome.tabs.onActivated.addListener(moveToFirstPosition);

// async function moveToFirstPosition(activeInfo) {
//   try {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(
//         activeInfo.tabId,
//         { type: "NEW" },
//         function (response) {}
//       );
//     });
//     console.log("Success.");
//   } catch (error) {
//     console.log("error");
//   }
// }

// // setInterval(() => {
// //   chrome.tabs.sendMessage(activeInfo.tabId, {
// //     type: "NEW",
// //   });
// // }, 1000);
