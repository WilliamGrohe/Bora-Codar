const dropArea = document.querySelector('.upload')
const box = document.querySelector('.box')

dropArea.addEventListener('dragover', ()=>{
  dropArea.classList.add('upload-over')
})

dropArea.addEventListener('dragleave', ()=>{
  dropArea.classList.remove('upload-over')
})

box.addEventListener('click', removeBox)
function removeBox(event) {
  if(event.target.classList.contains('removeBoxBtn')) {
    const box = event.target.closest('.box')
    box.classList.add('box-deleted')
    setTimeout(() => {
      box.remove()
    }, 300)
}
}