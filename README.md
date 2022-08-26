# CRM-system

## _Установка проекта_
1. Клонируйте себе данный проект:
```
git clone https://github.com/Roman-Prokopchuk/CRM-system.git
```
Или скачайте проект Code / Download ZIP. Разархивируйте и откройте его в своем редакторе кода.

2. Установите используемые npm-пакеты:
```
npm install
```
3. Запустите проект:
```
npm run serve
```
4. Откройте проект локально по сгенерированной ссылке (Local или Network) в своем браузере.

## _Особенности работы_
1. Для работы с системой можете использовать тестовую учетную запись:
 - Email: r@mail.ru
 - Пароль: 123456
Или создать свою учетную запись. Подтверждение по email не требуется.

2. Для отображения актуального курса валют используется сторонний сервис с бесплатным тарифом и, как следствие, ограничением на не более 100 запросов в месяц. Поэтому в src / store / index.js action fetchCurrency () возвращает объект-заглушку. Для проверки работоспособности можете раскомментировать рабочий код ниже в том же файле.

## _Используемые технологии_
Проект написан на языке JavaScript с использованием фреймворка Vue.js версии 3. Применены технологии экосистемы Vue (Vue Router и Vuex). Сборка проекта Vue CLI. Бэкенд реализован с помощью Firebase.

## _Коротко о проекте_
Реализована CRM-система, которая позволяет:
1. Отслеживать состояние счета в трех основных валютах (Rub, Usd, Eur);
2. Видеть историю всех расходов в виде наглядной круговой диаграммы;
3. Планировать бюджет, исходя из количества уже потраченных средств.

## _Цель проекта_
Развитие практических навыков работы с Vue.js 3 и экосистемой. 