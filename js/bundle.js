/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./static/modules/allcocktails.js":
/*!****************************************!*\
  !*** ./static/modules/allcocktails.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


// страничка загруженных коктейлей
function allcocktails() {
  const generatedCocktails = document.querySelector(
    ".randomized_cocktail_page"
  ),
  cocktailBlock = document.querySelector(".cocktail_block"),
  randomizeCocktailBlock = document.querySelector(".txt_button"),
  generatedCocktailsButton = document.querySelector("#all"),
  backHomeButton = document.querySelector("#home"),
  randomizedCocktailImg = document.querySelector(".randomized_cocktail_img"),
  nextButton = document.querySelector(".listing_next_all"),
  prevButton = document.querySelector(".listing_prev_all");

  generatedCocktailsButton.disabled = false;

  let allRandomizedImg = [],
    allRandomizedNames = [],
    counter = 15;

  const listingItems = () => {
    for (let i = counter - 15; i < counter; i++) {
      if (allRandomizedNames[i] === undefined) {
        break;
      }
      let imageBlock = document.createElement("div");
      imageBlock.classList.add("cocktail_img_block");
      imageBlock.innerHTML = `
      <p class="all_cocktails_name">${allRandomizedNames[i]}</p>
      <img class="img_prev" style="background-image: url(${allRandomizedImg[i]})">`;
      randomizedCocktailImg.appendChild(imageBlock);
    }
  };

  const showButtonsOnCounter = () => {
    counter <= 15
      ? (prevButton.style.display = "none")
      : (prevButton.style.display = "block");
    counter >= allRandomizedNames.length
      ? (nextButton.style.display = "none")
      : (nextButton.style.display = "block");
  };

  generatedCocktailsButton.addEventListener("click", (e) => {
    e.preventDefault();

    generatedCocktailsButton.disabled = true;

    cocktailBlock.style.display = "none";
    randomizeCocktailBlock.style.display = "none";
    generatedCocktails.style.display = "flex";

    const getAllRandomizedImg = async () => {
      const responseImg = await fetch(
        "http://127.0.0.1:8000/AllGeneratedImg"
      ).then((responseImg) => responseImg.json());

      const responseNames = await fetch(
        "http://127.0.0.1:8000/AllGeneratedNames"
      ).then((responseNames) => responseNames.json());

      allRandomizedNames = responseNames;
      allRandomizedImg = responseImg;

      listingItems();
      showButtonsOnCounter();
    };

    getAllRandomizedImg();

    const deleteBlocks = () => {
      const imageBlock = document.querySelectorAll(".cocktail_img_block");
      imageBlock.forEach((item) => {
        randomizedCocktailImg.removeChild(item);
      });
    };

    nextButton.addEventListener("click", (e) => {
      e.preventDefault();

      deleteBlocks();

      counter = counter + 15;

      listingItems();

      showButtonsOnCounter();
    });

    prevButton.addEventListener("click", (e) => {
      e.preventDefault();

      deleteBlocks();

      counter = counter - 15;

      listingItems();

      showButtonsOnCounter();
    });

    backHomeButton.addEventListener("click", (e) => {
      e.preventDefault();

      cocktailBlock.style.display = "flex";
      randomizeCocktailBlock.style.display = "block";
      generatedCocktails.style.display = "none";

      generatedCocktailsButton.disabled = false;

      deleteBlocks();

      counter = 15;

      getData();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allcocktails);

/***/ }),

/***/ "./static/modules/likedislikepost.js":
/*!*******************************************!*\
  !*** ./static/modules/likedislikepost.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


function likedislikepost() {
  
  // отправляем json на сервер при нажатии на кнопки лайков

  const likeButton = document.querySelector(".button_like"),
  dislikeButton = document.querySelector(".button_dislike");

  likeButton.addEventListener("click", () => {
  Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("yes");
  Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
  });

  dislikeButton.addEventListener("click", () => {
  Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("no");
  Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (likedislikepost);

/***/ }),

/***/ "./static/modules/main.js":
/*!********************************!*\
  !*** ./static/modules/main.js ***!
  \********************************/
/***/ (() => {

throw new Error("Module parse failed: Export 'getData' is not defined (149:8)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n| export default main;\n> export {getData};\n| ");

/***/ }),

/***/ "./static/modules/modal.js":
/*!*********************************!*\
  !*** ./static/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Modal

function modal() {
  const bindModal = () => {
    const trigger = document.querySelector(".trigger"),
      modal = document.querySelector(".account_modal"),
      close = document.querySelector(".modal_close");
  
    trigger.addEventListener("click", (e) => {
      e.target && e.preventDefault();
      modal.style.display = "block";
    });
  
    close.addEventListener("click", () => (modal.style.display = "none"));
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
      // можно ещё так
      // e.target === modal && (() => {modal.style.display = "none"})()
    });
  };
  
  bindModal();
  // modal ends
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./static/modules/slider.js":
/*!**********************************!*\
  !*** ./static/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./static/src/script.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_allcocktails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/allcocktails */ "./static/modules/allcocktails.js");
/* harmony import */ var _modules_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/main */ "./static/modules/main.js");
/* harmony import */ var _modules_likedislikepost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/likedislikepost */ "./static/modules/likedislikepost.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/modal */ "./static/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/slider */ "./static/modules/slider.js");






window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_main__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_likedislikepost__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_allcocktails__WEBPACK_IMPORTED_MODULE_0__["default"])();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map