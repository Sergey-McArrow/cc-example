# CodesCommanders React App

[Live Demo](https://cc-example-omega.vercel.app)

## 🚀 Быстрый старт (локально)

1. Установите зависимости:
   ```sh
   bun install
   ```
2. Запустите dev-сервер:
   ```sh
   bun dev
   ```
3. Приложение будет доступно по адресу http://localhost:5173

---

## 🐳 Запуск в Docker (Bun)

1. Соберите образ:
   ```sh
   docker build -t codescommanders-app .
   ```
2. Запустите контейнер:
   ```sh
   docker run -p 4173:4173 codescommanders-app
   ```
3. Откройте http://localhost:4173 в браузере.

---

## 📦 Стек

- React 19 + TypeScript
- Redux Toolkit, RTK Query
- React Router
- TailwindCSS + shadcn/ui
- Bun (для Docker)


---

## ⚙️ Основные команды

- `bun dev` — запуск dev-сервера
- `bun run build` — продакшн-сборка
- `bun run preview` — предпросмотр продакшн-сборки

---

## 📝 Особенности

- Аутентификация, хранение пользователя в localStorage
- Маршрутизация: список постов, страница логина, страница деталей поста с комментариями
- Современный UI и Skeleton-загрузки

---

**Вопросы/проблемы — см. код или обращайтесь к автору.**

