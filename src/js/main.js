const imgUpload = document.querySelector('#img-upload')
const radioBordered = document.querySelector('#input-radio')
const form = document.querySelector('#form')
const buttons = document.querySelectorAll('.btn-image')
const inputColor = document.querySelector('#input-color')
const inputWidth = document.querySelector('#input-width')
const inputFile = document.querySelector('input[type="file"]')

const borderLocal = localStorage.getItem('border')
const colorLocal = localStorage.getItem('color')
const widthLocal = localStorage.getItem('width')

// Funções auxiliares
const setLocalStorage = (key, value) => localStorage.setItem(key, value)
const getLocalStorage = (key) => localStorage.getItem(key)

const updateStyle = (property, value) => {
  imgUpload.style[property] = value
}

const initializeInput = (element, property, localStorageKey, unit = '') => {
  const localStorageValue = getLocalStorage(localStorageKey)

  if (localStorageValue !== null) {
    updateStyle(property, `${localStorageValue}${unit}`)
    element.value = localStorageValue
  }

  element.addEventListener('input', (e) => {
    updateStyle(property, `${e.target.value}${unit}`)
    setLocalStorage(localStorageKey, e.target.value)
  })
}

// Inicialização de entradas com valores salvos no localStorage
initializeInput(radioBordered, 'borderRadius', 'border', 'px')
initializeInput(inputColor, 'borderColor', 'color')
initializeInput(inputWidth, 'width', 'width', 'px')

// Configuração dos botões de imagem
buttons.forEach((btn) => {
  const elementCurrent = getLocalStorage('uploadedImage')

  if (elementCurrent === btn.dataset.image) {
    btn.classList.add('selected')
  } else {
    btn.classList.remove('selected')
  }

  btn.addEventListener('click', (e) => {
    const hasImage = e.currentTarget.dataset.image

    if (!hasImage) return

    imgUpload.setAttribute('src', hasImage)
    document.querySelector('.btn-image.selected')?.classList.remove('selected')
    e.currentTarget.classList.add('selected')
    setLocalStorage('uploadedImage', hasImage)
  })
})

// Carregamento de imagem via input file
inputFile.addEventListener(
  'change',
  () => {
    const reader = new FileReader()

    reader.onload = () => {
      const imageDataUrl = reader.result
      imgUpload.src = imageDataUrl
      setLocalStorage('uploadedImage', imageDataUrl)

      document
        .querySelector('.btn-image.selected')
        ?.classList.remove('selected')
    }

    reader.readAsDataURL(inputFile.files[0])
  },
  false
)

// Carregar imagem do localStorage ao carregar a página
const storedImage = getLocalStorage('uploadedImage')

if (storedImage) {
  imgUpload.src = storedImage
}
