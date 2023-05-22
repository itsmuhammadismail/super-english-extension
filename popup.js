import { getActiveTabURL } from "./utils.js";

setInterval(async () => {
  const data = await chrome.storage.local.get(["totalReplies", "usedReplies"]);
  const repliesPara = document.querySelector("#replies");
  repliesPara.innerHTML = (+data.usedReplies).toString();
}, 1000);

async function popup(e) {
  var apiKey = document.querySelector("#apiKey");

  var raw = JSON.stringify({
    apiKey: apiKey.value,
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(
    "https://api.superenglish.io/user/check-api-key",
    requestOptions
  )
    .then((response) => response.json())
    .then(async (data) => {
      await chrome.storage.local.set({
        id: data.id,
        totalReplies: data.totalReplies,
        usedReplies: data.usedReplies,
        apiKey: apiKey.value,
        apiDate: new Date(),
      });
    })
    .catch(() => {});

  console.log(res);
}

var apiUpdateBtn = document.querySelector("#apiUpdateBtn");
apiUpdateBtn.addEventListener("click", popup);
