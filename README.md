Fractal@demo
============
Мастер структурирования заметок при использованиии [angular](https://angularjs.org/).
(Летняя практика 2015 года)

Зависимости
-----------
Для запуска демо режима потребуется nodejs, менеджер пакетов npm, и git:
(Версии на который проводился запуск)
```
node.exe -v
v0.12.2

npm.cmd --version
2.12.1

git --version
git version 1.9.4.msysgit.2
```

 - nodejs: https://nodejs.org/download/
 - npm(если не установился вместе с nodejs автоматически): https://www.npmjs.com/package/npm
 - git: http://git-scm.com/

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