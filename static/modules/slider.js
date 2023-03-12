// Slider
function slider() {
  // определяем селектор для контейнера
  const imageContainer = document.querySelector(".image_container");

  let favouriteCocktailsImg = [];

  // устанавливаем начальные значения ширины, начального положения и индекса слайда
  let offset = 0,
    slideIndex = 1,
    width = "160px";

  const getFavouriteDrinksImg = async () => {
    const response = await fetch("http://127.0.0.1:8000/mostPopular").then(
      (response) => response.json()
    );

    favouriteCocktailsImg = response;

    favouriteCocktailsImg.forEach((item) => {
      let block = document.createElement("div");
      block.classList.add("image_slider");
      block.style.cssText = `
          background-image: url('${item}');`;
      imageContainer.appendChild(block);
    });

    // определяем селекторы блока слайдера и контейнера для картинок
    const slides = document.querySelectorAll(".image_slider"),
      slider = document.querySelector(".slider"),
      // определяем селектор для контейнера
      slidesField = document.querySelector(".image_container");
    // задаем стили для конейнера
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

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

    const translateImageXNext = () => {
      if (offset === deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      // перемещаем контейнер относительно изначальной позиции, чтобы наши картинки слайдились
      slidesField.style.transform = `translateX(-${offset}px)`;
    };

    const setCurrentDotPositionNext = () => {
      // определяем номер слайда из всей длины слайдов
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      // ставим отображение нижнего блока переключения слайдов
      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    };

    const translateImageXPrev = () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;
    };

    const setCurrentDotPositionPrev = () => {
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    };

    const dotEventListener = (dot) => {
      dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");

        slideIndex = slideTo;

        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach((dot) => (dot.style.opacity = ".5"));
        dots[slideTo - 1].style.opacity = 1;
      });
    };

    // заводим переменные для кнопок
    const next = document.querySelector(".slider_next");

    // вешаем на кнопки обработчик
    next.addEventListener("click", () => {
      translateImageXNext();
      setCurrentDotPositionNext();
    });

    const prev = document.querySelector(".slider_prev");

    prev.addEventListener("click", () => {
      translateImageXPrev();
      setCurrentDotPositionPrev();
    });

    dots.forEach((dot) => dotEventListener(dot));
  };

  getFavouriteDrinksImg();
  // конец слайдера
}

export default slider;

