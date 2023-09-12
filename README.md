# Фронтенд Шаблон v1.0 (Заменить на название проекта)

## Оглавление

#### 1. [Основное](#основное)

#### 2. [Техническая документация шаблона](#техническая-документация-шаблона)

## Основное

**Верстка** - [html.xpager.ru/xpage/](#)

**Макет** - [Cсылка на макет в Фигме](#)

**Продакшн** - [Ссылка на запущенный сайт](#)

**Gitlab** - [Ссылка на Gitlab](https://gitlab.in-progress.ru/frontend/template)

#### Краткое описание:

    1. Основной шаблон для верстки сайтов и веб-приложений с использованием Vite, Gulp v4 и Vue 3.

**Верстку выполнил** - ...

**Фронт выполнил** - ...

**Проектный менеджер** - ...

**Бэкенд разработчик** - ...

## Техническая документация шаблона

# Фронтенд шаблон v1.0

Шаблон предназначен для верстки сайтов и веб-приложений с
использованием [Vite](https://vitejs.dev/), [Gulp v4](https://gulpjs.com/) и [Vue 3](https://v3.vuejs.org/).

В основе шаблона используются следующие
технологии: [Pug](https://pugjs.org/api/getting-started.html), [Sass](https://sass-lang.com/), [TypeScript](https://www.typescriptlang.org/).

## Требования

- [Node.js](https://nodejs.org/en/) >= 16.0.0
- [Yarn](https://yarnpkg.com/) >= 1.22.0 или [NPM](https://www.npmjs.com/) >= 7.0.0

## Доступные команды

Установка зависимостей

```
yarn
```

Запуск в режиме разработчика

```
yarn dev
```

Собрать проект

```
yarn build
```

Собрать проект и запустить локальный сервер для просмотра продакшн версии

```
yarn preview
```

Деплой проекта в html.xpager.ru (Не работает. Ждем переноса на новый сервер)

```
yarn deploy
```

Собрать svg sprite

```
yarn sprite
```

Конвертировать шрифты в woff и woff2 форматы и создать файл стилей для подключения шрифтов

```
yarn fonts
```

Эмулятор safari
There is a much easier way:

1. npm init -y
2. npm install playwright
3. npx playwright install
4. npx playwright open -b webkit

## Структура папок и файлов

```
├── .vscode/                            # настройки VSCode
│   └── snippets/                       # сниппеты
├── config/                             # настройки сборки
│   ├── gulp                            # настройки сборщика (gulp)
│   │   ├── gulp-tasks/                 # задачи (gulp)
│   │   └── gulp-plugins.js             # общие плагины (gulp)
│   ├── helpers/                        # хелперы для сборщиков (gulp, vite)
│   └── plugins/                        # плагины для сборщика (vite)
│       ├── pug/                        # плагин для сборки pug файлов (vite)
│       └── deploy/                     # плагин для деплоя проекта (vite)
├── dist/                               # собранный проект
├── src/                                # исходники
│   ├── assets/                         # ресурсы проекта (картинки, шрифты, иконки, ...)
│   │   ├── fonts/                      # шрифты
│   │   ├── img/                        # папка для хранения картинок
│   │   └── icons/                      # папка для хранения иконок (svg)
│   ├── components/                     # VUE компоненты
│   │   ├── sliders/                    # компоненты слайдеров (Swiper)
│   │   ├── selects/                    # компоненты селектов (пример)
│   │   └── utils/                      # полезные компоненты
│   │       ├── form/                   # компоненты форм (checkbox, input, ...)
│   │       ├── modals/                 # компоненты модальных окон
│   │       ├── templates/              # компоненты шаблонов
│   │       ├── transitions/            # компоненты переходов
│   │       └── ui/                     # компоненты UI (табы, аккордеоны, ...)
│   ├── public/                         # папка для хранения статических файлов (favicon, opengraph, шрифты, ...)
│   │   ├── favicons/                   # фавиконки
│   │   ├── fonts/                      # шрифты
│   │   ├── img/                        # папка для хранения статичных картинок
│   │   └── styles/                     # стили для превью страницы
│   ├── scripts/                        # скрипты
│   │   ├── api/                        # модули для работы с API
│   │   ├── consts/                     # константы, постоянные данные
│   │   ├── declarations/               # декларации TS
│   │   ├── directives/                 # директивы Vue
│   │   ├── hooks/                      # хуки Vue
│   │   ├── mixins/                     # миксины Vue
│   │   ├── plugins/                    # плагины проекта
│   │   │   ├── app/                    # плагины приложения (подключемые к Vue)
│   │   │   └── vanila/                 # плагины для работы с ванильным JS 
│   │   ├── router/                     # роутер Vue
│   │   ├── store/                      # хранилище Vue
│   │   ├── utils/                      # утилиты
│   │   ├── ap.ts                       # точка входа для Vue
│   │   └── main.js                     # главный скрипт
│   ├── styles/                         # стили сайта
│   │   ├── main.scss                   # главный файл стилей
│   │   ├── base/                       # базовые стили
│   │   │   ├── nested/                 # миксины, переменные и функции
│   │   │   ├── animations.sass         # анимации, используемые скриптом animations.ts
│   │   │   ├── base.sass               # базовые стили (html, body, ...)
│   │   │   ├── fonts.sass              # шрифты
│   │   │   ├── keyframes.sass          # общие keyframes
│   │   │   ├── null.sass               # сброс стилей браузера
│   │   │   ├── text.sass               # базовые стили текста
│   │   │   └── variables.sass          # переменные
│   │   ├── blocks/                     # стили общих блоков
│   │   │   ├── form/                   # стили форм
│   │   │   ├── ui/                     # стили UI (кнопки, ссылки, модальные окна ...)
│   │   │   ├── error-block.sass        # стили блока ошибки
│   │   │   └── standard-block.sass     # стили контентного блока
│   │   ├── libs/                       # стили различных библиотек (плагинов)
│   │   ├── pages/                      # стили страниц
│   │   └── sections/                   # стили секций
│   ├── templates/                      # Разметка
│   │   ├── base/                       # базовые шаблоны
│   │   │   ├── _head.pug               # шаблон страницы
│   │   │   ├── _mixins.pug             # миксины
│   │   │   └── _scripts.pug            # подключение скриптов
│   │   ├── blocks/                     # шаблоны общих блоков
│   │   ├── pages/                      # шаблоны страниц
│   │   ├── popups/                     # шаблоны попапов
│   │   └── sections/                   # шаблоны секциий
│   ├── views/                          # страницы
│   └── index.html                      # главный индексовый файл проекта
├── .editorconfig                       # файл с настройками форматирования кода
├── .env                                # файл с переменными окружения
├── .eslintignore                       # файл с настройками eslint (исключает ненужные папки)
├── .eslintrc                           # файл с настройками eslint
├── .gitignore                          # файл с настройками git (исключает ненужные папки)
├── .npmrc                              # файл с настройками npm
├── .prettierignore                     # файл с настройками prettier (исключает ненужные папки)
├── .prettierrc                         # файл с настройками prettier
├── .env.d.ts                           # файл с типами переменных окружения
├── .gulpfile.js                        # gulp
├── package.json                        # файл с установленными пакетами
├── project.config.ts                   # файл с настройками проекта
├── README.md                           # документация сборки
├── tsconfig.json                       # файл с настройками typescript
├── tsconfig.node.json                  # файл с настройками typescript для node
└──vite.config.ts                       # файл с настройками vite
```

## Плагины для Vite

1. [Vite](https://yarn.pm/vite)
2. [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)
3. Vite-plugin-pug (Находится внутри проекта)
4. [vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)
5. [vite-plugin-stylelint](https://www.npmjs.com/package/vite-plugin-stylelint)

## Плагины для Gulp

1. [gulp](https://yarn.pm/gulp)
2. [gulp-fonter-fix](https://npm.io/package/gulp-fonter-fix)
3. [gulp-notify](https://yarn.pm/gulp-notify)
4. [gulp-plumber](https://yarn.pm/gulp-plumber)
5. [gulp-svg-sprite](https://yarn.pm/gulp-icons)
6. [gulp-ttf2woff](https://yarn.pm/gulp-ttf2woff)
7. [gulp-ttf2woff2](https://yarn.pm/gulp-ttf2woff2)
8. [gulp-flatten](https://yarn.pm/gulp-flatten)

## Плагины для CSS

1. [postcss](https://yarn.pm/postcss)
2. [postcss-short](https://yarn.pm/postcss-short)
3. [postcss-sort-media-queries](https://yarn.pm/postcss-sort-media-queries)
4. [sass](https://yarn.pm/sass)
5. [cssnano](https://yarn.pm/cssnano)
6. [autoprefixer](https://yarn.pm/autoprefixer)

## Правила и плагины ESLint

1. [eslint](https://yarn.pm/eslint)
2. [eslint-config-airbnb-base](https://yarn.pm/eslint-config-airbnb-base)
3. [eslint-config-prettier](https://yarn.pm/eslint-config-prettier)
4. [eslint-plugin-import](https://yarn.pm/eslint-plugin-import)
5. [eslint-plugin-prettier](https://yarn.pm/eslint-plugin-prettier)
6. [eslint-plugin-vue](https://yarn.pm/eslint-plugin-vue)
7. [@typescript-eslint/eslint-plugin](https://yarn.pm/@typescript-eslint/eslint-plugin)
8. [@typescript-eslint/parser](https://yarn.pm/@typescript-eslint/parser)
9. [eslint-plugin-vue](https://yarn.pm/eslint-plugin-vue)
10. [@vue/eslint-config-typescript](https://yarn.pm/@vue/eslint-config-typescript)

## Другие плагины сборки

1. [prettier](https://yarn.pm/prettier)
2. [pug](https://yarn.pm/pug)
3. [typescript](https://yarn.pm/typescript)
4. [vue-tsc](https://yarn.pm/vue-tsc)
5. [ssh2-sftp-client](https://yarn.pm/ssh2-sftp-client)

## Плагины и зависимости для Vue

1. [vue](https://yarn.pm/vue)
2. [vue-router](https://yarn.pm/vue-router)
3. [pinia](https://yarn.pm/pinia)
4. [@vueform/multiselect](https://yarn.pm/@vueform/multiselect)
5. [@vueform/slider](https://yarn.pm/@vueform/slider)
6. [@vueform/toggle](https://yarn.pm/@vueform/toggle)
7. [@vuelidate/core](https://yarn.pm/@vuelidate/core)
8. [@vuelidate/validators](https://yarn.pm/@vuelidate/validators)
9. [v-calendar](https://yarn.pm/v-calendar)
10. [vue-awesome-paginate](https://yarn.pm/vue-awesome-paginate)
11. [vue-toastification](https://yarn.pm/vue-toastification)

## Зависимости

1. [swiper](https://yarn.pm/swiper)
2. [maska](https://yarn.pm/maska)
3. [axios](https://yarn.pm/axios)
4. [dialog-polyfill](https://yarn.pm/dialog-polyfill)
5. [lodash](https://yarn.pm/lodash)
6. [gsap](https://yarn.pm/gsap)
7. [@popperjs/core](https://yarn.pm/@popperjs/core)
8. [photoswipe](https://yarn.pm/photoswipe)
