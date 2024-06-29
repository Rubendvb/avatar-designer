const imgUpload = document.querySelector('#img-upload')
const radioBordered = document.querySelector('#input-radio')
const form = document.querySelector('#form')
const buttons = document.querySelectorAll('.btn-image')
const inputColor = document.querySelector('#input-color')
const inputWidth = document.querySelector('#input-width')

const borderLocal = localStorage.getItem('border')
const colorLocal = localStorage.getItem('color')
const widthLocal = localStorage.getItem('width')

imgUpload.style.borderRadius = `${borderLocal}%`
radioBordered.value = borderLocal

imgUpload.style.borderColor = `${colorLocal}`
inputColor.value = colorLocal

imgUpload.style.width = `${widthLocal}px`
inputWidth.value = widthLocal

radioBordered.addEventListener('input', (e) => {
  imgUpload.style.borderRadius = `${e.target.value}%`
  localStorage.setItem('border', e.target.value)
})

inputColor.addEventListener('input', (e) => {
  imgUpload.style.borderColor = `${e.target.value}`
  localStorage.setItem('color', e.target.value)
})

inputWidth.addEventListener('input', (e) => {
  imgUpload.style.width = `${e.target.value}px`
  localStorage.setItem('width', e.target.value)
})

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    imgUpload.setAttribute('src', e.target.dataset.image)
    document.querySelector('.btn-image.selected')?.classList.remove('selected')
    e.currentTarget.classList.add('selected')
  })
})
