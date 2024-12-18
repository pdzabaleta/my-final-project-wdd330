export async function loadTemplate(path) {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load template from ${path}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error loading template:', error)
  }
}

export async function fetchProductsData() {
  try {
    const response = await fetch('/data/products.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  if (parentElement) {
    parentElement.insertAdjacentHTML('afterbegin', templateFn(data))
    if (callback) {
      callback(data)
    }
  } else {
    console.error(`Element not found for selector: ${parentElement}`)
  }
}
