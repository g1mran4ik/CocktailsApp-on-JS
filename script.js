"use strict";

window.addEventListener("DOMContentLoaded", () => {
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

  // спиннер

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

  let fetchTimeoutTimerId = undefined;

  const onLoadingEnd = (drinkObj) => {
    displayHide();
    buildHtml(drinkObj);
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

  let phrases = [
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

  // вызов функции для первичной загрузки рандомного коктейля на страницу
  getData();

  // Slider

  // получаем массив строк с адресами напитков
  const popularDrinksHashes = [
    "nkwr4c1606770558",
    "metwgh1606770327",
    "vrwquq1478252802",
    "qgdu971561574065",
    "hbkfsh1589574990",
    "6ck9yi1589574317",
    "mrz9091589574515",
    "5noda61589575158",
  ];

  // определяем селектор для контейнера
  const imageContainer = document.querySelector(".image_container");

  // функция для добавления всех картинок с url внутрь селектора
  const unpackPopularDrinks = () => {
    popularDrinksHashes.forEach((hash) => {
      let block = document.createElement("div");
      block.classList.add("image_slider");
      block.style.cssText = `
       background-image: url('https://www.thecocktaildb.com/images/media/drink/${hash}.jpg');`;
      imageContainer.appendChild(block);
    });
  };

  unpackPopularDrinks();

  // определяем селекторы блока слайдера и контейнера для картинок
  const slides = document.querySelectorAll(".image_slider");
  const slider = document.querySelector(".slider_container");
  // определяем селектор для контейнера
  const slidesField = document.querySelector(".image_container");
  // задаем стили для конейнера
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  // устанавливаем начальные значения ширины, начального положения и индекса слайда
  let offset = 0;
  let slideIndex = 1;
  let width = "160px";

  // создаем функцию для создания слайдера и пустой массив для нижней панели переключения
  const indicators = document.createElement("ol"),
    dots = [];

  indicators.classList.add("carousel_indicators");
  slider.appendChild(indicators);

  // создаем элементы нижнего блока основываясь на количестве слайдов
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("listItem");
    dot.setAttribute("data-slide-to", i + 1);

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.appendChild(dot);
    dots.push(dot);
  }

  // Добавляем функцию для замены неЦифр на пустые символы (для удобства подстановки положения без px и прочего)
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  // заводим переменные для кнопок
  const next = document.querySelector(".slider_next");
  // вешаем на кнопки обработчик
  next.addEventListener("click", () => {
    if (offset === deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    // перемещаем контейнер относительно изначальной позиции, чтобы наши картинки слайдились
    slidesField.style.transform = `translateX(-${offset}px)`;

    // определяем номер слайда из всей длины слайдов
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // ставим отображение нижнего блока переключения слайдов
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  const prev = document.querySelector(".slider_prev");

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  // добавляем событие для клика по нижнему блоку слайдов
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
  // конец слайдера


});
