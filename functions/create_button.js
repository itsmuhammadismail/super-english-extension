const createButton = (onClick) => {
  const translateBtn = document.createElement("img");
  translateBtn.src = chrome.runtime.getURL("assets/bookmark.png");
  translateBtn.className = "bookmark-btn";
  translateBtn.style.position = "relative";
  translateBtn.style.bottom = "10px";
  translateBtn.style.right = "10px";
  translateBtn.style.width = "32px";
  translateBtn.style.height = "32px";
  translateBtn.title = "Click to bookmark current timestamp";
  translateBtn.addEventListener("click", onClick);
  return translateBtn;
};

export default createButton;