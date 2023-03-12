function main() {
  // создаем переменные с которыми будем работать через селектор класса
  const drinkRandomizeButton = document.querySelector(".generate_button"),
    drinkImg = document.querySelector(".image"),
    drinkName = document.querySelector(".cocktail_name"),
    drinkIngredients = document.querySelector(".ingreds"),
    drinkComment = document.querySelector(".comment"),
    drinkSpinnerBlock = document.querySelector(".spinner");

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
    buildDrinkComment();
  };

  async function createLikedObj(like) {
    const likeData = new Object();
    likeData.cocktailName = drinkName.innerHTML;
    likeData.cocktailImg = drinkImg.src;
    if (like === "yes") {
    likeData.liked = 1;
    likeData.disliked = 0;
    } else if (like === "no") {
    likeData.liked = 0;
    likeData.disliked = 1;
    } else {
    likeData.liked = 0;
    likeData.disliked = 0;
    }

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("http://127.0.0.1:8000/likeData/", {
    ...postOptions,
    body: JSON.stringify(likeData),
    }).then((response) => response.json());

    listFromBackend = response;
};

  let fetchTimeoutTimerId = undefined;

  const displayLoading = () => {
      drinkName.innerHTML = "Wait a few seconds...";
      drinkIngredients.innerHTML = "Ingredients: will show soon...";
      drinkSpinnerBlock.id = "loading";
      drinkSpinnerBlock.classList.add("display");
      drinkImg.style.display = "none";
  };

  const displayHide = () => {
      drinkSpinnerBlock.id = "";
      drinkSpinnerBlock.classList.remove("display");
      drinkImg.style.display = "block";
  };

  let listFromBackend = [];

  const onLoadingEnd = (drinkObj) => {
      if (listFromBackend.find((listItem) => listItem === drinkObj.strDrink)) {
      return getData();
      }
      displayHide();
      buildHtml(drinkObj);
      createLikedObj("nothing");
  };

  // создаем функцию запроса данных с сервера
  const getData = () => {
      let drinkObj = {};
      let loadingFromSetTimeout = true;
      let loadingFromFetch = true;
      displayLoading();
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then(({ drinks: [randomDrink] }) => {
          loadingFromFetch = false;
          drinkObj = randomDrink;
          !loadingFromSetTimeout && onLoadingEnd(drinkObj);
      });
      clearTimeout(fetchTimeoutTimerId);
      fetchTimeoutTimerId = setTimeout(() => {
      loadingFromSetTimeout = false;
      !loadingFromFetch && onLoadingEnd(drinkObj);
      }, 300);
  };

  // создаем рандомные фразочки при генерации коктейля

  const phrases = [
    "Yaay, this is a really good choice!",
    "It looks like you will got a good weekend!",
    "Not bad!",
    "Ohhh...It looks very tasty!",
    "Yes, it is for you!",
    "Well, maybe you should click button again, if you wish...",
    "Now it seems like you need to go shop!",
    "Why are you so serious...?",
    "And this is only the beginnig!",
    "Do you like this?",
  ];

  // задаем функцию, которая рандомит фразу
  const getRandomComment = (arr) => {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  };

  // задаем функцию, которая будет вставлять текст в html
  const buildDrinkComment = () => {
    let randomComment = getRandomComment(phrases);
    drinkComment.innerHTML = randomComment;
  };

  // вешаем обработчик события на кнопку
  drinkRandomizeButton.addEventListener("click", (e) => {
    e.preventDefault();

    getData();
  });

  // отправляем json на сервер при нажатии на кнопки лайков

  const likeButton = document.querySelector(".button_like"),
  dislikeButton = document.querySelector(".button_dislike");

  likeButton.addEventListener("click", () => {
  createLikedObj("yes");
  getData();
  });

  dislikeButton.addEventListener("click", () => {
  createLikedObj("no");
  getData();
  });

  // вызов функции для первичной загрузки рандомного коктейля на страницу
  getData();
}


export default main;
