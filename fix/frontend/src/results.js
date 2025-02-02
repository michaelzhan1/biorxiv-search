const numRegex = /^\d+$/;

function onClick() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (!urlParams.get("id")) {
    alert("Missing id");
    return;
  }

  if (!numRegex.test(urlParams.get("id"))) {
    alert("Invalid id");
    return;
  }

  const id = parseInt(urlParams.get("id"));
  console.log("ID:", id);
}

const testButton = document.getElementById('test-button');
testButton.addEventListener('click', onClick);