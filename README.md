Fractal@demo
============
Мастер структурирования заметок при использованиии [angular](https://angularjs.org/).
(Летняя практика 2015 года)

Зависимости
-----------
Для запуска демо режима потребуется nodejs, и менеджер пакетов npm:
(Версии на который проводилс запуск)
```
node.exe -v
v0.12.2

npm.cmd --version
2.12.1
```
nodejs: https://nodejs.org/download/
npm: https://www.npmjs.com/package/npm

Установка
---------
```
npm install # установит пакеты из package.json, 
            # и запустит bower, который установит внешние js зависимости


# запусить локальный http-сервер на localhost:8000
# приложение будет расположенно в http://localhost:8000/app/
npm start 

```

Структура проекта
-----------------
    app/                    
    -----css/                стили
    -----js/                 js - скрипты 
    -----partials/           html шаблоны
    -----data/root.json      тестовые данные 

    html/                    верстка страниц
    
    test/                   
    ----/unit/               unit тесты
    ----/e2e/                end to end тесты