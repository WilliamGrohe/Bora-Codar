const dropArea = document.querySelector(".upload");
const filesSection = document.querySelector('.files')
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
            <img src="Assets/file-uploading.svg" class="fileIcon" alt="File Icon">
          </div>
          <div class="info">
            <div class="filename">${fileName}</div>
            <div class="filesize">
              <span class="loaded"></span>
              <span class="totalSize">${fileSize}MB</span>
            </div>
            <div class="bar">
              <progress value="100" max="100"></progress>
              <span class="loadingPorcentage">46%</span>
            </div>
          </div>
          <div class="action">
            <img src="Assets/Cancel.svg" class="removeBoxBtn" alt="Cancel Icon">
          </div>
  `;

  showProgress(newBox, file.size)
}

function showProgress(newBox, size){
  const loadedSpan = newBox.querySelector('.loaded')
  const progressBar = newBox.querySelector('.bar')
  const porcentageSpan = newBox.querySelector('.loadingPorcentage')
  const fileIcon = newBox.querySelector('.fileIcon')

  let loaded = 0
  let porcentage = 0
  let total = size

  const intervalTime = 100 // tempo entre cada execução do setInterval
  const totalTime = 5000 // tempo total para carregar

  const loadedIncrement = total * intervalTime / totalTime
  const porcentageIncrement = 100 * intervalTime / totalTime

  const updateValues = setInterval(() => {
    loaded += loadedIncrement
    porcentage += porcentageIncrement

    progressBar.classList.add('uploading')
    porcentageSpan.classList.add('uploading')

    if (loaded >= total && porcentage >= 100) {
      porcentage = 100
      loaded = total
      fileIcon.src = 'Assets/file-done.svg'
      progressBar.classList.add('done')
      progressBar.classList.remove('uploading')
      porcentageSpan.classList.add('done')
      porcentageSpan.classList.remove('uploading')

      clearInterval(updateValues)
    }

    loadedSpan.textContent = `${(loaded / (1024 * 1024)).toFixed(2)}MB / `
    progressBar.style.width = `${porcentage}%`
    porcentageSpan.textContent = `${Math.round(porcentage)}%`

  }, intervalTime)

filesContainer.appendChild(newBox)
return newBox

}

dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("upload-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("upload-over");
});

filesSection.addEventListener("click", removeBox);

function removeBox(event) {
  if (event.target.classList.contains("removeBoxBtn")) {
    const box = event.target.closest(".box");
    box.classList.add("box-deleted");
    setTimeout(() => {
      box.remove();
    }, 300);
  }
}
