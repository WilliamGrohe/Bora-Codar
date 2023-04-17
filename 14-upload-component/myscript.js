const dropArea = document.querySelector('.upload')

dropArea.addEventListener('dragover', ()=>{
  dropArea.classList.add('upload-over')
})

dropArea.addEventListener('dragleave', ()=>{
  dropArea.classList.remove('upload-over')
})