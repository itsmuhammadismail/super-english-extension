const translate = async ({ input, isTextField = true }) => {
  var raw = JSON.stringify({
    language: "urdu",
    text: isTextField ? input.value : input.innerText,
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch("http://localhost:8000/", requestOptions).then(
    (response) => response.json()
  );

  console.log(res);

  isTextField ? (input.value = res.text) : (input.innerText = res.text);
};

export default translate;
