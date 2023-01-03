(() => {
  const translate = async ({ input, language, isTextField }) => {
    var raw = JSON.stringify({
      language: language,
      text: isTextField ? input.value : input.innerText,
    });

    console.log(input.value);

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    };

    let btn = document.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.machinexhq.com/api/ai/translate",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    console.log(res);

    isTextField
      ? (input.value = res.text.replace("\n\n", ""))
      : (input.innerText = res.text.replace("\n\n", ""));
  };

  const changeTone = async ({ input, tone, isTextField }) => {
    var raw = JSON.stringify({
      tone: tone,
      text: isTextField ? input.value : input.innerText,
    });

    console.log(input.value);

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    };

    let btn = document.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.machinexhq.com/api/ai/change_tone",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    console.log(res);

    isTextField
      ? (input.value = res.text.replace("\n\n", ""))
      : (input.innerText = res.text.replace("\n\n", ""));
  };

  const addGmailButton = async () => {
    const input = document.querySelector(".Am");
    input.parentElement.style.position = "relative";

    const superList = input.parentElement.querySelectorAll(".superlist");
    if ([...superList].length > 0) {
      for (let i = 0; i < [...superList].length; i++) {
        input.parentElement.removeChild(superList[i]);
      }
    }
    input.parentNode.style.position = "relative";

    const createElement = document.createElement("div");
    createElement.classList.add("superlist");

    createElement.innerHTML = `
      <div class="list">
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

    document
      .querySelector("#super_eng_btn")
      .addEventListener("click", () =>
        translate({ input: input, language: "english", isTextField: false })
      );

    document
      .querySelector("#super_urdu_btn")
      .addEventListener("click", () =>
        translate({ input: input, language: "roman urdu", isTextField: false })
      );

    document
      .querySelector("#super_formal_btn")
      .addEventListener("click", () =>
        changeTone({ input: input, tone: "professional", isTextField: false })
      );

    document
      .querySelector("#super_casual_btn")
      .addEventListener("click", () =>
        changeTone({ input: input, tone: "casual", isTextField: false })
      );
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;

    if (type === "NEW") {
      // addButton();
      try {
        document.querySelector(".Am");
        addGmailButton();
      } catch (e) {
        console.log("Not chrome");
      }
    }
  });
})();
