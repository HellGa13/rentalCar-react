# React + Vite

# 🚗 RentalCar

_[English](#english) | [Українська](#українська)_

---

## English

### Project Description

**RentalCar** is a modern web application for a car rental company that provides users with an intuitive platform to browse, filter, and rent vehicles. The application features a responsive design with a comprehensive catalog of available cars, detailed vehicle information, and a seamless booking experience.

### ✨ Key Features

- **🏠 Home Page**: Attractive landing page with main call-to-action banner
- **📋 Catalog Page**: Browse all available vehicles with advanced filtering options
- **🔍 Detailed Car Page**: Comprehensive car information with booking form
- **🎯 Advanced Filtering**: Filter cars by brand, price, and mileage (server-side filtering)
- **❤️ Favorites**: Add cars to favorites list with persistent storage
- **📄 Pagination**: Load more functionality with server-side pagination
- **📱 Booking Form**: Complete rental booking with confirmation notifications
- **🎨 Modern UI**: Clean, responsive design following provided mockups

### 🛠 Technologies Used

- **Frontend Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify

### 📦 Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/HellGa13/rentalCar-react.git
   cd rentalCar-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### 🌐 Live Demo

[View Live Application](.)

### 📱 Usage

1. **Browse Cars**: Start on the home page and click "View Catalog" to explore available vehicles
2. **Apply Filters**: Use the filter panel to narrow down cars by brand, price range, or mileage
3. **View Details**: Click "Read more" on any car card to see detailed information
4. **Add to Favorites**: Use the heart icon to save cars to your favorites list
5. **Book a Car**: Fill out the booking form on the car details page to make a reservation

### 🗂 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── redux/              # Redux store, slices, and selectors
├── utils/              # Helper functions
└── App.jsx             # Main application component
```

### 🔗 API Integration

The application integrates with the GoIT Car Rental API:

- **Base URL**: https://car-rental-api.goit.global/
- **Documentation**: https://car-rental-api.goit.global/api-docs/

### 🎯 Routes

- `/` - Home page
- `/catalog` - Car catalog with filters
- `/catalog/:id` - Individual car details page

### 👨‍💻 Author

**Olga Chursinova**

- GitHub: [@HellGa13](https://github.com/HellGa13)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/olga-chursinova-b40124359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Email: esfero1307@gmail.com

### 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## Українська

### Опис проєкту

**RentalCar** — це сучасний веб-додаток для компанії з оренди автомобілів, який надає користувачам інтуїтивну платформу для перегляду, фільтрації та оренди транспортних засобів. Додаток має адаптивний дизайн з повним каталогом доступних автомобілів, детальною інформацією про транспорт та зручним процесом бронювання.

### ✨ Основні функції

- **🏠 Домашня сторінка**: Привабливий лендінг з головним закликом до дії
- **📋 Сторінка каталогу**: Перегляд всіх доступних автомобілів з розширеними фільтрами
- **🔍 Детальна сторінка авто**: Повна інформація про автомобіль з формою бронювання
- **🎯 Розширена фільтрація**: Фільтрування за брендом, ціною та пробігом (на сервері)
- **❤️ Обрані**: Додавання авто до списку обраних з збереженням у сховищі
- **📄 Пагінація**: Функція "Завантажити ще" з пагінацією на сервері
- **📱 Форма бронювання**: Повне бронювання оренди з підтвердженням
- **🎨 Сучасний UI**: Чистий, адаптивний дизайн за наданими макетами

### 🛠 Використані технології

- **Frontend Framework**: React 18 з Vite
- **Управління станом**: Redux Toolkit
- **Маршрутизація**: React Router DOM
- **HTTP клієнт**: Axios
- **Стилізація**: CSS модулі
- **Збірка**: Vite
- **Деплой**: Vercel/Netlify

### 📦 Встановлення та налаштування

1. **Клонування репозиторію**

   ```bash
   git clone https://github.com/HellGa13/rentalCar-react.git
   cd rentalCar-react
   ```

2. **Встановлення залежностей**

   ```bash
   npm install
   ```

3. **Запуск сервера розробки**

   ```bash
   npm run dev
   ```

4. **Збірка для продакшену**

   ```bash
   npm run build
   ```

5. **Попередній перегляд збірки**
   ```bash
   npm run preview
   ```

### 🌐 Демо

[Переглянути живий додаток](.)

### 📱 Використання

1. **Перегляд авто**: Почніть з домашньої сторінки та натисніть "View Catalog" для огляду доступних автомобілів
2. **Застосування фільтрів**: Використовуйте панель фільтрів для пошуку авто за брендом, ціною чи пробігом
3. **Перегляд деталей**: Натисніть "Read more" на картці авто для детальної інформації
4. **Додавання до обраних**: Використовуйте іконку серця для збереження авто в списку обраних
5. **Бронювання авто**: Заповніть форму бронювання на сторінці деталей для резервування

### 🗂 Структура проєкту

```
src/
├── components/          # Компоненти UI для повторного використання
├── pages/              # Компоненти сторінок
├── redux/              # Redux стор, слайси та селектори
├── utils/              # Допоміжні функції
└── App.jsx             # Головний компонент додатку
```

### 🔗 Інтеграція з API

Додаток інтегрований з GoIT Car Rental API:

- **Базовий URL**: https://car-rental-api.goit.global/
- **Документація**: https://car-rental-api.goit.global/api-docs/

### 🎯 Маршрути

- `/` - Домашня сторінка
- `/catalog` - Каталог автомобілів з фільтрами
- `/catalog/:id` - Сторінка окремого автомобіля

### 👨‍💻 Автор

**Ольга Чурсінова**

- GitHub: [@HellGa13](https://github.com/HellGa13)
- LinkedIn: [Ваш профіль LinkedIn](https://www.linkedin.com/in/olga-chursinova-b40124359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Email: esfero1307@gmail.com

### 📄 Ліцензія

Цей проєкт є відкритим джерелом та доступний під [MIT License](LICENSE).
