import { loadHeaderFooter } from '/js/headerFooter.mjs'
import { fetchProductsData } from './utils.js'
import { getUniqueCategories, renderCategories } from './categories.js'

// Always load the header and footer
loadHeaderFooter()

// Get references to the containers
const categoriesContainer = document.getElementById('categories')
const productsContainer = document.getElementById('products-list')

// Initialize the logic only if the containers exist
if (categoriesContainer && productsContainer) {
  async function init() {
    try {
      // Fetch product data (from a JSON file or an API)
      const products = await fetchProductsData()

      // Get unique categories
      const categories = getUniqueCategories(products)

      // Render categories in the container
      renderCategories(categories, categoriesContainer, (selectedCategory) => {
        // Filter the products based on the selected category
        const filteredProducts = products.filter(
          (product) => product.category === selectedCategory,
        )

        // Show the filtered products
        renderProducts(filteredProducts, productsContainer)
      })
    } catch (error) {
      console.error('Error initializing the app:', error)
    }
  }

  // Initialize the main page logic
  init()
} else {
  console.warn(
    "The 'categories' or 'products-list' containers were not found on this page.",
  )
}

// Function to render the filtered products
function renderProducts(products, container) {
  container.innerHTML = `
    <div id="products-list-title">
      <h2>Products</h2>
    </div>
  `

  const productsList = document.getElementById('products-list')

  products.forEach((product, index) => {
    const productCard = document.createElement('div')
    productCard.classList.add('product-card')
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="window.location.href='pages/product-details.html?id=${product.id}'">View Details</button>
    `
    productsList.appendChild(productCard)
  })
}
const apiKey = 'fbd84acb3840d4382467a74d7a6700e1' // Replace with your API key
const city = 'Concepción' // You can change the city
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`

fetch(weatherApiUrl)
  .then((response) => response.json())
  .then((data) => {
    const cityName = data.name
    const description = data.weather[0].description
    const temperature = data.main.temp
    const humidity = data.main.humidity
    const windSpeed = data.wind.speed
    const iconCode = data.weather[0].icon

    // Verificamos si los elementos existen antes de actualizarlos
    const cityNameElement = document.getElementById('city-name')
    if (cityNameElement) {
      cityNameElement.textContent = cityName
    }

    const descriptionElement = document.getElementById('weather-description')
    if (descriptionElement) {
      descriptionElement.textContent = description
    }

    const temperatureElement = document.getElementById('temperature')
    if (temperatureElement) {
      temperatureElement.textContent = `${temperature}°C`
    }

    const humidityElement = document.getElementById('humidity')
    if (humidityElement) {
      humidityElement.textContent = `Humidity: ${humidity}%`
    }

    const windSpeedElement = document.getElementById('wind-speed')
    if (windSpeedElement) {
      windSpeedElement.textContent = `Wind: ${windSpeed} m/s`
    }

    const weatherIconElement = document.getElementById('weather-icon')
    if (weatherIconElement) {
      weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`
    }

    // Pronóstico a 3 días
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`
    fetch(forecastApiUrl)
      .then((response) => response.json())
      .then((forecastData) => {
        let forecastHtml = ''
        forecastData.list.slice(0, 3).forEach((forecast) => {
          const date = new Date(forecast.dt * 1000).toLocaleDateString()
          const temp = forecast.main.temp
          const icon = forecast.weather[0].icon
          forecastHtml += `
            <div>
              <p>${date}</p>
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
              <p>${temp}°C</p>
            </div>
          `
        })
        const forecastElement = document.getElementById('forecast')
        if (forecastElement) {
          forecastElement.innerHTML = forecastHtml
        }
      })
  })
  .catch((error) => console.error('Error fetching weather data:', error))


window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.product-card')
  cards.forEach((card) => {
    if (card.getBoundingClientRect().top < window.innerHeight) {
      card.classList.add('visible')
    }
  })
})
