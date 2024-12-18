import { loadTemplate, renderWithTemplate } from '../js/utils.js'
import { searchProducts } from '../js/search.mjs'

// Function to set up the header with events and additional functionalities
async function setupHeader() {
  const logo = document.querySelector('.logo')
  const searchInput = document.querySelector('#search')
  const searchIcon = document.querySelector('.absolute-search')
  const accountIcon = document.querySelector('.user')
  const cartIcon = document.querySelector('.cart i')

  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = '/index.html'
    })
  }
  if (searchInput) {
    // Event for search when pressing Enter
    searchInput.addEventListener('keydown', async function (event) {
      if (event.key === 'Enter') {
        const query = event.target.value

        try {
          const results = await searchProducts(query)

          if (results) {
            localStorage.setItem('searchResults', JSON.stringify(results))
            window.location.href = `../pages/search.html`
          } else {
            window.location.href = `../pages/search.html?results=not_found`
          }
        } catch (error) {
          alert('There was a problem with the search. Please try again.')
        }
      }
    })
  } else {
    console.error('Search input element not found')
  }

  // Event for search when clicking the icon
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      if (searchInput.value.trim() !== '') {
        searchInput.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter' }),
        )
      }
    })
  }

  // Events for navigation (account and cart icons)
  if (accountIcon) {
    accountIcon.addEventListener('click', () => {
      window.location.href = '/pages/product-details.html'
      // window.location.href = 'account.html';
    })
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = '/pages/cart.html'
    })
  }
}

// Main function to load header and footer
export async function loadHeaderFooter() {
  const headerPath = await loadTemplate('/components/header.html')
  const footerPath = await loadTemplate('/components/footer.html')
  const header = document.getElementById('main-header')
  const footer = document.getElementById('main-footer')

  if (header) {
    renderWithTemplate(() => headerPath, header)
  } else {
    console.error('Header element not found')
  }

  if (footer) {
    renderWithTemplate(() => footerPath, footer)
  } else {
    console.error('Footer element not found')
  }

  // Set up events after loading the header
  await setupHeader()
}
