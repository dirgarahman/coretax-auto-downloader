chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runDownloadScript
  });
});

function runDownloadScript() {
  const buttons = document.querySelectorAll('#DownloadButton');
  let delay = 2000; // 2000 milliseconds or 2 seconds, adjust if needed

  buttons.forEach((button, index) => {
    setTimeout(() => {
      button.click();
    }, delay * index);
  });
}