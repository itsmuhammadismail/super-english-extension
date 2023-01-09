(() => {
  const translate = async ({ input, language, isTextField }) => {
    let textField = input;

    let lastChild = input.lastElementChild;
    let signature = lastChild.querySelector(".gmail_signature");

    if (signature == undefined) {
      signature = input.querySelector(".gmail_signature");
      if (signature != undefined) {
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

  const changeTone = async ({ input, tone, isTextField }) => {
    let textField = input;

    let lastChild = input.lastElementChild;
    let signature = lastChild.querySelector(".gmail_signature");

    if (signature == undefined) {
      signature = input.querySelector(".gmail_signature");
      if (signature != undefined) {
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

  const addGmailButton = () => {
    const inputs = document.querySelectorAll(".Am");
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      const superList = input.parentElement.querySelectorAll(".superlist");

      if ([...superList].length == 0) {
        input.parentElement.style.position = "relative";
        // for (let i = 0; i < [...superList].length; i++) {
        //   input.parentElement.removeChild(superList[i]);
        // }
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

  // chrome.runtime.onMessage.addListener((obj, sender, response) => {
  //   const { type } = obj;

  //   if (type === "NEW") {
  //     // addButton();
  //     try {
  //       addGmailButton();

  //       document.querySelector(".T-I").addEventListener("click", () => {
  //         console.log("Added  ");
  //         setTimeout(() => addGmailButton(), 1000);
  //       });

  //       const mails = document.querySelectorAll(".zA");

  //       for (let i = 0; i < mails.length; i++) {
  //         let mail = mails[i];
  //         mail.addEventListener("click", () => {
  //           setTimeout(() => {
  //             document
  //               .querySelector(".ams")
  //               .addEventListener("click", () =>
  //                 setTimeout(() => addGmailButton(), 1000)
  //               );
  //           }, 1000);
  //         });
  //       }
  //       // document
  //       //   .querySelector(".ams")
  //       //   .addEventListener("click", () => addGmailButton());
  //     } catch (e) {
  //       console.log("Not chrome");
  //     }
  //   }
  // });

  setInterval(() => {
    addGmailButton();
  }, 1000);
})();
