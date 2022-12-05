"use strict";

// создаем переменные с которыми будем работать через селектор класса
const drinkRandomizeButton = document.querySelector(".generate_button"),
  drinkImg = document.querySelector(".image"),
  drinkName = document.querySelector(".cocktail_name"),
  drinkIngredients = document.querySelector(".ingreds"),
  drinkComment = document.querySelector(".comment");

// создаем функции для присвоения названию и картинке коктейля полученные через запрос данные
const buildDrinkImg = (strDrinkThumb) => (drinkImg.src = strDrinkThumb);

const buildDrinkName = (strDrink) => (drinkName.innerHTML = strDrink);

// создаем функцию для получения списка ингредиентов из объекта запроса
const getIngredients = (randomDrink) =>
  Object.entries(randomDrink).reduce(
    (agg, [key, value]) =>
      value && key.includes("strIngredient") ? [...agg, value] : agg,
    []
  );

// создаем функцию для присвоения ингредиентов полученных через запрос
const buildDrinkIngreds = (randomDrink) =>
  (drinkIngredients.innerHTML = `Ingredients: ${getIngredients(
    randomDrink
  ).join(", ")}`);

// создаем единую функцию, отвечающую за присвоение названия, картинки и ингредиентов коктейля, полученных через запрос
const buildHtml = (randomDrink) => {
  const { strDrinkThumb, strDrink } = randomDrink;

  buildDrinkImg(strDrinkThumb);
  buildDrinkName(strDrink);
  buildDrinkIngreds(randomDrink);
};

// создаем функцию запроса данных с сервера
const getData = () =>
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then(({ drinks: [randomDrink] }) => buildHtml(randomDrink));

    // создаем рандомные фразочки при генерации коктейля

let phrases = [
  'Yaay, this is a really good choice!',
  'It looks like you will got a good weekend!',
  'Not bad!',
  'Ohhh...It looks very tasty!',
  'Yes, it is for you!',
  'Well, maybe you should click button again, if you wish...',
  'Now it seems like you need to go shop!',
  'Why are you so serious...?',
  'And this is only the beginnig!',
  'Do you like this?'
  ];

// задаем функцию, которая рандомит фразу
const getRandomComment = (arr) => {
  let randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

// задаем функцию, которая будет вставлять текст в html
const buildDrinkComment = () => {
  let randomComment = getRandomComment(phrases);
  drinkComment.innerHTML = randomComment;
}

// вешаем обработчик события на кнопку
drinkRandomizeButton.addEventListener("click", (e) => {
  e.preventDefault();

  getData();
  buildDrinkComment();
});

// вызов функции для первичной загрузки рандомного коктейля на страницу
getData();

// и также вызовем рандомную фразу
buildDrinkComment();


