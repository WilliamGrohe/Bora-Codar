const dropArea = document.querySelector(".upload");
const box = document.querySelector(".box");
const fileInput = document.querySelector("#file-input");
const filesContainer = document.querySelector('.files')

fileInput.addEventListener("change", createNewBoxOnFiles);

function createNewBoxOnFiles() {
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileSize = parseFloat(file.size / (1024 * 1024)).toFixed(2); // convertendo para MB

  const newBox = document.createElement("div");

  newBox.classList.add("box");

  newBox.innerHTML = `
  <div class="icon">
            <img src="Assets/file-uploading.svg" alt="File Icon">
          </div>
          <div class="info">
            <div class="filename">${fileName}</div>
            <div class="filesize">
              <span class="loaded"></span>
              <span class="totalSize">${fileSize}MB</span>
            </div>
            <div class="bar">
              <progress value="45" max="100"></progress>
              <span class="loadingPorcentage">46%</span>
            </div>
          </div>
          <div class="action">
            <img src="Assets/Cancel.svg" class="removeBoxBtn" alt="Cancel Icon">
          </div>
  `;

  filesContainer.appendChild(newBox)
}

dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("upload-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("upload-over");
});

box.addEventListener("click", removeBox);


function removeBox(event) {
  if (event.target.classList.contains("removeBoxBtn")) {
    const box = event.target.closest(".box");
    box.classList.add("box-deleted");
    setTimeout(() => {
      box.remove();
    }, 300);
  }
}
