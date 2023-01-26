(() => {
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
        console.log(signature);

        textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }

    var raw = JSON.stringify({
      language: language,
      text: isTextField ? textField.value : textField.innerText,
    });

    console.log(input.innerHTML);

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    };

    let btn = input.parentElement.querySelector(".super_img");
    btn.src = chrome.runtime.getURL("assets/loader.svg");
    btn.classList.add("circle");

    const res = await fetch(
      "https://api.machinexhq.com/api/ai/translate",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    console.log(res);

    // isTextField
    //   ? (input.value = res.text.replace("\n\n", ""))
    //   : (input.innerText = res.text.replace("\n\n", ""));
    input.innerHTML = res.text.replace("\n\n", "") + "\n\n";

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }
  };

  const translateWhatsApp = async ({ input, language }) => {
    // let textField = input.querySelector(".fd365im1");
    console.log(input);

    var raw = JSON.stringify({
      language: language,
      text: input.innerText,
    });

    console.log(input.innerHTML);

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // let btn = input.parentElement.querySelector(".super_img");
    // btn.src = chrome.runtime.getURL("assets/loader.svg");
    // btn.classList.add("circle");

    const res = await fetch(
      "https://api.machinexhq.com/api/ai/translate",
      requestOptions
    ).then((response) => response.json());

    // btn.classList.remove("circle");
    // btn.src = chrome.runtime.getURL("assets/active.svg");

    console.log(res);

    // isTextField
    //   ? (input.value = res.text.replace("\n\n", ""))
    //   : (input.innerText = res.text.replace("\n\n", ""));
    // input.innerHTML = res.text.replace("\n\n", "") +h "\n\n";
    console.log(input.innerHTML);
    console.log(res.text.replace("\n\n", ""));
    // var evt = new Event("input", {
    //   bubbles: true,
    // });
    // input.innerHTML = `${res.text.replace("\n\n", "")}`;
    // input.dispatchEvent(evt);
    const items = document.querySelectorAll("span.selectable-text");
    console.log(items[items.length - 1]);
    items[items.length - 1].innerHTML = "item";

    console.log("haha");
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
        console.log(signature);

        textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }
    console.log(signature);

    var raw = JSON.stringify({
      tone: tone,
      text: isTextField ? textField.value : textField.innerText,
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

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }
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
        console.log(signature);

        textField.removeChild(signature);
      }
    } else {
      lastChild.removeChild(signature);
    }
    console.log(signature);

    const bk = document.querySelectorAll(".h7");
    const email = bk[bk.length - 1].querySelector(".ii").innerText;

    var raw = JSON.stringify({
      text: email,
    });

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
      "https://api.machinexhq.com/api/ai/reply",
      requestOptions
    ).then((response) => response.json());

    btn.classList.remove("circle");
    btn.src = chrome.runtime.getURL("assets/active.svg");

    console.log(res);

    input.innerText =
      typeof res.text == "string" ? res.text : res.text.error.message;

    if (signature != undefined) {
      input.innerHTML += "<br/><br/><br/>";
      input.appendChild(signature);
    }
  };

  const addGmailButton = () => {
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

        input.parentElement
          .querySelector("#super_reply_btn")
          .addEventListener("click", () => reply({ input: input }));

        input.parentElement
          .querySelector("#super_eng_btn")
          .addEventListener("click", () =>
            translate({ input: input, language: "english", isTextField: false })
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
  };

  const addWhatsAppButton = () => {
    const div = document.querySelector("._1VZX7");
    try {
      const inputs = div.querySelectorAll(".g0rxnol2");
      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        const superList = input.parentElement.querySelectorAll(
          ".superlist-whatsapp"
        );

        if ([...superList].length == 0) {
          input.parentElement.style.position = "relative";

          const createElement = document.createElement("div");
          createElement.classList.add("superlist-whatsapp");

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

          input.parentElement
            .querySelector("#super_eng_btn")
            .addEventListener("click", () =>
              translateWhatsApp({
                input: input
                  .querySelector(".fd365im1")
                  .querySelector(".selectable-text")
                  .querySelector(".selectable-text"),
                language: "english",
              })
            );

          input.parentElement
            .querySelector("#super_urdu_btn")
            .addEventListener("click", () =>
              translateWhatsApp({
                input: input
                  .querySelector(".fd365im1")
                  .querySelector(".selectable-text")
                  .querySelector(".selectable-text"),
                language: "roman urdu",
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
    } catch (e) {}
  };

  setInterval(() => {
    // addWhatsAppButton();
    addGmailButton();
  }, 1000);
})();
