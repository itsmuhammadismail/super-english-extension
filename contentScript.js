(async () => {
  const updateRemainings = async () => {
    console.log("hello");
    const data = await chrome.storage.local.get(["usedReplies"]);
    await chrome.storage.local.set({ usedReplies: +data.replies + 1 });
    console.log(data);
  };

  const translate = async ({ input, language, isTextField }) => {
    let textField = input;

    let lastChild = input.lastElementChild;
    let signature = null;

    try {
      signature = lastChild.querySelector(".gmail_signature");
    } catch (e) {}

    if (signature == null) {
      signature = input.querySelector(".gmail_signature");
      if (signature != null) {
        textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }

    var raw = JSON.stringify({
      language: language,
      text: isTextField ? textField.value : textField.innerText,
    });

    const data = await chrome.storage.local.get(["apiKey"]);
    console.log(data);
    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        Authorization: data.apiKey,
      },
    };

    let btn = input.parentElement.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.superenglish.io/ai/translate",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    input.innerHTML = res.text.replace("\n\n", "") + "\n\n";

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }

    updateRemainings();
  };

  const changeTone = async ({ input, tone, isTextField }) => {
    let textField = input;

    let lastChild = input.lastElementChild;
    let signature = null;

    try {
      signature = lastChild.querySelector(".gmail_signature");
    } catch (e) {}

    if (signature == null) {
      signature = input.querySelector(".gmail_signature");
      if (signature != null) {
        textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }

    var raw = JSON.stringify({
      tone: tone,
      text: isTextField ? textField.value : textField.innerText,
    });

    const data = await chrome.storage.local.get(["apiKey"]);
    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        Authorization: data.apiKey,
      },
    };

    let btn = document.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.superenglish.io/ai/change_tone",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    isTextField
      ? (input.value = res.text.replace("\n\n", ""))
      : (input.innerText = res.text.replace("\n\n", ""));

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }

    updateRemainings();
  };

  const reply = async ({ input }) => {
    let textField = input;

    let lastChild = input.lastElementChild;
    let signature = null;

    try {
      signature = lastChild.querySelector(".gmail_signature");
    } catch (e) {}

    if (signature == null) {
      signature = input.querySelector(".gmail_signature");
      if (signature != null) {
        // textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }

    const bk = document.querySelectorAll(".h7");
    const email = bk[bk.length - 1].querySelector(".ii").innerText;

    var raw = JSON.stringify({
      text: email,
    });

    const data = await chrome.storage.local.get(["apiKey"]);
    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        Authorization: data.apiKey,
      },
    };

    let btn = document.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.superenglish.io/ai/reply",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    input.innerText =
      typeof res.text == "string" ? res.text : res.text.error.message;

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }

    updateRemainings();
  };

  const addGmailButton = async () => {
    const inputs = document.querySelectorAll(".Am");
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      const superList = input.parentElement.querySelectorAll(".superlist");

      if ([...superList].length == 0) {
        input.parentElement.style.position = "relative";

        const createElement = document.createElement("div");
        createElement.classList.add("superlist");

        createElement.innerHTML = `
        <div class="list">
          <img id="super_reply_btn" class="other_img" src="${chrome.runtime.getURL(
            "assets/rewrite.svg"
          )}"
          />
          <img id="super_eng_btn" class="other_img" src="${chrome.runtime.getURL(
            "assets/eng.svg"
          )}"
          />
          <img id="super_urdu_btn" class="other_img" src="${chrome.runtime.getURL(
            "assets/urdu.svg"
          )}" />
          <img id="super_formal_btn" class="other_img" src="${chrome.runtime.getURL(
            "assets/formal.svg"
          )}" />
          <img id="super_casual_btn" class="other_img" src="${chrome.runtime.getURL(
            "assets/casual.svg"
          )}" />
          <img class="super_img" src="${chrome.runtime.getURL(
            "assets/active.svg"
          )}" />
        </div>
      `;

        input.parentElement.appendChild(createElement);

        const data = await chrome.storage.local.get([
          "totalReplies",
          "usedReplies",
          "apiKey",
        ]);

        if (
          data.apiKey != undefined &&
          data.apiKey != null &&
          data.apiKey != "" &&
          +data.totalReplies - +data.usedReplies > 0
        ) {
          input.parentElement
            .querySelector("#super_reply_btn")
            .addEventListener("click", () => reply({ input: input }));

          input.parentElement
            .querySelector("#super_eng_btn")
            .addEventListener("click", () =>
              translate({
                input: input,
                language: "english",
                isTextField: false,
              })
            );

          input.parentElement
            .querySelector("#super_urdu_btn")
            .addEventListener("click", () =>
              translate({
                input: input,
                language: "roman urdu",
                isTextField: false,
              })
            );

          input.parentElement
            .querySelector("#super_formal_btn")
            .addEventListener("click", () =>
              changeTone({
                input: input,
                tone: "professional",
                isTextField: false,
              })
            );

          input.parentElement
            .querySelector("#super_casual_btn")
            .addEventListener("click", () =>
              changeTone({ input: input, tone: "casual", isTextField: false })
            );
        }
      }
    }
  };

  setInterval(() => {
    addGmailButton();
  }, 1000);
})();
