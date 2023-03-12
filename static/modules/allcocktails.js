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

export default allcocktails;