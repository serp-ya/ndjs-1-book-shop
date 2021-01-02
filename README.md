# Домашнее задание к занятию «2.1 Express»

### Установка и запуск
Для запуска проекта необходимо:
- Склонировать репозиторий
- Установить модули `npm i`
- Добавить файл `.env`
- Определить переменную `APP_PORT` с удобным портом
- Запустить сервер `npm run start:watch`

#### Предисловие
Начиная с данного блока, в домашних работах вы будете разрабатывать приложение «библиотека». С каждым последующим заданием функционал приложения будет расширяться.


#### Задание 2.1.1
Создать новый пустой проект и установить в него **express.js**.  


#### Задание 2.1.2
Разработать **API CRUD** для работы с сущностью *«книга»*. Каждый экземпляр книги должен содержать следующую структуру данных: 
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
``` 

#### Решение задания 2.1.2
При реализации задачи, я использовал Typescript, поэтому проект содержит типы и commonjs модули заменены на es5.

В проекте вся логика изменения данных вынесена в логический слок - моковую Базу Данных (`db.ts`), которая производит операции изменения БД.

Так же, в проект добавлена модель `Book` и валидация по схеме возможных значений. Это создаёт дополнительный слой безопасности и запись в БД не произойдёт, если клиент нарушил контракты.

В проекте присутствует аллиас ссылки на рутовую директорию, используемый в импортах. Поэтому запись вида `import { Book } from '@/models/book'` на самом деле берёт данные отсюда: `src/models/book`

### методы
метод | url | действие | комментарий
--- | --- | ---  | ---
`POST` | `/api/user/login` | авторизация пользователя | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }`
`GET` | `/api/books` | получить все книги | получаем массив всех книг
`GET` | `/api/books/:id` | получить книгу по **id** | получаем объект книги, если запись не найдено вернем **Code: 404** 
`POST` | `/api/books` | создать книгу | создаем кноги и возврашаем ее же вместе с присвоенным **id**
`PUT` | `/api/books/:id` | редактировать книгу по **id** |  редактируем объект книги, если запись не найдено вернем **Code: 404**
`DELETE` | `/api/books/:id` | удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**



# Домашнее задание к занятию «2.2 Middleware»

#### Задание 2.2.1
Обновить структуру роутинга проекта с использованием **express.Router()**.

#### Решение задания 2.2.1
Эта задача была решена ешё случайно в предыдущей работе, я изначально использовал **express.Router()**


#### Задание 2.2.2
Установить в проект пакет [**multer**](https://github.com/expressjs/multer/blob/master/doc/README-ru.md)
и создать middleware для загрузки файла книги. 
Созданную Middleware подключить и обработать в роутах создания данных о книге

#### Решение задания 2.2.2
С этим заданием пришлось повозиться, но проблема была не в сложности настройки `multer`, а в том, что этот пакет не дружит ни с одним из миддлвари, которые занимаются парсингом значений `form-data` на уровне всего приложения и проявляет довольно таки странное поведение на разных узлах...

В рамках решения этой задачи были [заданы вопросы разработчикам на github](https://github.com/expressjs/multer/issues/952)

Сейчас приложение корректно обрабатывает заданный ранее контракт, но пришлось исключить из `post`/`put` запросов поле `key`, которое нарушает этот самый контракт. Входящие файлы корректно обрабатываются и сохраняются в директорию `public/books`. В запись новой книги сохраняется оригинальный `fileName` входящего файла. При сохранении имени файла, в записи книги остаётся простое имя, а в директорию на сервере сохраняется имя файла с `md5` хеш суммой некоторых значений из записи книги в начале.

Так же, добавил в приложение корректную отдачу статичных ресурсов.


#### Задание 2.2.3
Создать роут `GET: /api/books/:id/download` 
Метод отдает на скачиваение файл книги по ее **:id**

#### Решение задания 2.2.3
Скачивание файла происходит корректно без особых тонкостей


# Домашнее задание к занятию «2.3 EJS»

#### Задание 2.3.1
Установить в проект шаблонизатор [**ejs**](https://ejs.co/)

#### Решение задания 2.3.1
Для более комфортной организации файловой структуры роутов и соответствующих им шаблонов, я использовал `ejs` шаблонизатор в качестве `middleware`, которое наделяет объект `Response` методом `renderPage`. Этот метод принимает путь до шаблона, данные и возвращает промис, который зарезолвится отрисовкой шаблона и возвратом ответа или зареджектится объектом ошибки.

Сами шаблоны (views) находятся рядом с роутами (controllers) и под капотом переиспользуют существующую логику работы с данными (model).


#### Задание 2.3.2
Разработать многостраничный интерфейс для работы с сущностью «книга» с использованием шаблонизатора *ejs*

Шаблоны:
 - **index** - просмотр списка всех книг (вывод заголовков);
 - **view** - информация по конкретной книге; 
 - **create** - создание книги;
 - **update** - редактирование книги. 

#### Решение задания 2.3.2
После добавления возможности отрисовки страниц, роуты приложения разделились на 2 группы:
- api - API
- views - UI 

Шаблоны представлены двумя видами сущностей:
- components - переиспользуемые компоненты UI
- pages/templates - шаблоны страниц

Все шаблоны из задания реализованы в этих двух директориях


#### Задание 2.3.3
По пошаговой [инструкции](heroku.md) опубликовать проект из *задания 2* на Heroku.

#### Решение задания 2.3.3
[Ссылка на Heroku](https://ndjs-express.herokuapp.com/)


# Домашнее задание к занятию «2.4 Docker»

## Задание 2.4.1 - Контейнеризация
Контейнеризировать приложение "Библиотека" и опубликовать его на hub.docker.com.

#### Решение задания 2.4.1
В исходном коде появился Dockerfile и образ доступен в докере по тегу serpya/book-shop. На docker hub'е запущен автобилд, который смотрит на мой репозиторий гитхаб


### Критерии выполнения
В результате выполнения задания в исходном коде приложения должен появиться Dockerfile. А в публичном репозитории, созданном пользователем на hub.docker.com, образ.

## Задание 2.4.2 - Микросервисы

Добавьте в приложение счётчик просмотра книг:
- счётчик увеличивается при каждом просмотре книги
- за хранение значения счётчика отвечает отдельное приложение
- данные счётчика хранятся на диске и переживают рестарт приложения или контейнера

Используйте docker-compose для разработки приложения в контейнере.

### Критерии выполнения
В результате выполнения задания 
1. создано NodeJs приложение, обрабатывающее два роута:
   - увеличить счётчик `POST /counter/:bookId/incr`
   - получить значение счётчика `GET /counter/:bookId`
   приложение контейнеризировано
1. в основном приложении при просмотре книги
   - увеличение счётчика
   - отображение значения счётчика
1. создан docker-compose.yml, запуск которого поднимает оба приложения и позволяет продемонстрировать работу счётчика

В исходном коде приложения должен появиться docker-compose.yml

#### Решение задания 2.4.2
- был создан сервис https://github.com/serp-ya/ndjs-1-book-shop-views-counter и помещён в docker hub в репозиторий `serpya/book-shop-views-counter`
- в основном приложении была доработана логика запросов к сервису и логика отображения счётчика
- был создан docker-compose.yml файл и протестирован на локальной машине


## Задание 2.4.3 - Микросервисы

Опубликуйте докеризированные приложения на heroku, используя способ развёртывания через контейнеры. 

### Критерии выполнения
Приложение опубликовано на heroku путём публикации контейнера, используя heroku cli.

#### Решение задания 2.4.3
Было добавлено два приложения в heroku:
- https://ndjs-1-book-shop-docker.herokuapp.com/
- https://ndjs-1-book-view-count-docker.herokuapp.com/

Тип каждого приложения был изменён на `container` при помощи команд:
- `heroku stack:set container --app ndjs-1-book-shop-docker`
- `heroku stack:set container --app ndjs-1-book-view-count-docker`

Метод деплоя был выбран при помощи гитхаб с указанием веток:
- `https://github.com/serp-ya/ndjs-1-book-shop:dockerizing`-> `https://ndjs-1-book-shop-docker.herokuapp.com/`
- `https://github.com/serp-ya/ndjs-1-book-shop-views-counter:master` -> `https://ndjs-1-book-view-count-docker.herokuapp.com/`

В приложении `https://ndjs-1-book-shop-docker.herokuapp.com/` была добавлена переменная локального окружения через настройки heroku `VIEW_COUNTER_URL=https://ndjs-1-book-view-count-docker.herokuapp.com`
![](http://dl3.joxi.net/drive/2020/12/24/0001/2133/88149/49/045aa75b06.png)

Работоспособность приложение и их взаимодействие можно проверить по указанным выше ссылкам на сервисы heroku


# Домашнее задание к занятию «2.5 База данных и хранение данных»

#### Задание 2.5.1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации про использование [**CRUD Operations**](https://docs.mongodb.com/manual/crud/)

#### Решение задания 2.5.1
Я прочитал документацию, но для большей уверенности в своих действиях, я установил локально MongoDB и использовал MongoDB for VSCode Playground, откуда можно выполнять запросы к локальной БД.


#### Задание 2.5.2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
 - запрос для *поиска* полей документов коллекции **books** по полю *title*
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

#### Решение задания 2.5.2
- запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
```
db.books.insertMany([
  { '_id': 111, 'title': 'first title', 'description': 'first description', 'authors': 'first authors'},
  { '_id': 222,'title': 'second title', 'description': 'second description', 'authors': 'second authors'},
]);
```

- запрос для *поиска* полей документов коллекции **books** по полю *title*
```
db.books.find({ 'title': 'second title' });
```

- запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
```
db.books.updateOne(
  { _id: 111 },
  { $set: {
    'description': 'first updated description',
    'authors': 'first updated authors'
  }}
);
```


# Домашнее задание к занятию «2.6 Подключение MongoDB в Node.js приложение»

#### Задание 2.6.1
Установите пакет **Mongoose** в свой проект и настройте подключение к базе данных.
* при подключении к локальной БД через [docker](https://hub.docker.com/_/mongo) создайте в своем проекте файл `docker-compose.yml`
* при подключении к [MongoDB Atlas](mongo-atlas.md) сохраните пароль в файле `.env`

#### Решение задания 2.6.1
Мною было принято решение использовать [MongoDB Atlas](mongo-atlas.md) в локальном проекте -> в докере -> heroku


#### Задание 2.6.2
Создайте **Mongoose-схему** для коллекции **«books»**
Структура документа должна соответствовать следующей структуре объекта:
: 
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
```

#### Решение задания 2.6.2
Для реализации этой задачи, я выбрал пакет `@typegoose/typegoose`, который позволяет использовать схемы `mongoose` вместе с `typescript` без необходимости дважды описывать схему + интерфейс для `typescript`.

Данный пакет является надстройкой над `mongoose`, пользуется его же интерфейсами, за исключением метода создания схемы.


#### Задание 2.6.3
Перепишите все методы работающие со статичным объектом `Books` на соответствующие методы для работы с `Mongoose Model Books`

метод | url | действие | комментарий
--- | --- | ---  | ---
`GET` | `/api/books` | получить все книги | получаем массив всех книг
`GET` | `/api/books/:id` | получить книгу по **id** | получаем объект книги, если запись не найдено вернем **Code: 404** 
`POST` | `/api/books` | создать книгу | создаем кногу и возврашаем ее же вместе с присвоенным **id**
`PUT` | `/api/books/:id` | редактировать книгу по **id** |  редактируем объект книги, если запись не найдено вернем **Code: 404**
`DELETE` | `/api/books/:id` | удалить книгу по **id** | удаляем книгу и возвращаем ответ: **'ok'**

#### Решение задания 2.6.3
Я полностью удалил старую логику работы с данными и использовал новую, благодаря общей базе данных.

Сейчас моя база данных представляет собой 3 коллекции:
- `books` - где хранятся данные о книгах
- `books-files` - где хранятся зашиврованные названия файлов, относящиеся к той или иной книге по id записи в БД
- `counters` - данные счётчиков, которые так же относятся к той или иной записи в БД по id

Это позволило мне удалить массу старого кода, провести рефакторинг методов работы с данными и избавиться от старого дефекта, который возникал во время повторного обновления файлов. Теперь логика получения доступа к настоящему файлу по имени упрощена.

# Домашнее задание к занятию «2.7»
## Задание 2.7.1
Реализовать API
```
GET /api/user/login   страница с формой входа / регистрации
GET /api/user/me      страница профиля
POST /api/user/login
POST /api/user/signup
```

#### Решение задания 2.7.1
При решении этого задания, я намерянно изменил роуты, т.к. я должен создать UI, но задача требует убрать их в API. Посчитал это логической ошибкой и создал следующие роуты:
```
GET /user/login - страница с формой входа
POST /user/login - авторизация
GET /user/signup - страница с формой регистрации
POST /user/signup - регистрация нового пользователя и авторизация под ним же
GET /user/me - страница профиля
GET /user/signout - сброс авторизации (без отдельного UI)
```


## Задание 2.7.2
Настроить локальную аутентификацию с помощью PassportJS.

#### Решение задания 2.7.2
Я добавил авторизацию через PassportJS, для этого создал отдельную middleware, которая под капотом создаёт новы инстанс PassportJS и полностю конфигурирует его, т.к. стандартная настройка показалась через чур неочевидной, когда настройка переопределяет поведение всего модуля `passport`.

В своей реализации я добавил две роли пользователей:
- администратор (admin/admin)
- пользователь (user/user)

Создание нового пользователя по умолчанию устанавливает роль пользователя всем новым пользователям без возможности изменить это вручную.

Авторизация под администратором даёт доступ к таким страницам, как:
- добавление книги
- удаление книги
- редактирование книги

Если попытаться войти на эти страницы без прав администратора, произойдёт редирект на другую страницу.

Авторизация с правами администратора так же отображает соответствующие элементы UI, такие как:
- кнопка добавления новой книги на главной
- кнопка редактирования книги на главной и на странице книги
- кнопка удаления книги на главной и на странице книги