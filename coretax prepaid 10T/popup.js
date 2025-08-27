document.getElementById('start').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: downloadWithScroll
  });
});

function downloadWithScroll(index = 0) {
  const rows = Array.from(document.querySelectorAll('tr.ng-star-inserted'));

  if (index >= rows.length) {
    console.log('✅ Finished all');
    return;
  }

  const row = rows[index];
  const btn = row?.querySelector('button.ct-ovw-btn-mini-save');

  if (btn) {
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log(`📥 Row ${index + 1} in view, downloading...`);
    setTimeout(() => {
      btn.click();
      setTimeout(() => downloadWithScroll(index + 1), 3000);
    }, 1500);
  } else {
    console.warn(`❌ No button in row ${index + 1}`);
    downloadWithScroll(index + 1);
  }
}