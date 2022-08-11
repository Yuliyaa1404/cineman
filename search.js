let mode = window.localStorage.getItem("mode");
mode = mode ? mode : "0";
if (mode === "1") {
  document.body.classList.add("dark");
}
window.localStorage.setItem("mode", mode);
const switcher = document.querySelector(".header__switcher");
switcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (window.localStorage.getItem("mode") === "0") {
    window.localStorage.setItem("mode", "1");
  } else {
    window.localStorage.setItem("mode", "0");
  }
});

const modalSearch = document.querySelector(".modal-search");
const modalLike = document.querySelector(".modal-like");
const searchBtn = document.querySelector(".header__search");
const modalSearchWrapper = document.querySelector(".modal-search__wrapper");
const modalInput = document.querySelector(".modal__input");
const modalSearchBtn = document.querySelector(".modal-search__btn");
const bookmarkBtn = document.querySelector(".header__bookmark");
const modalLikeWrapper = document.querySelector(".modal-like__wrapper");
const modalLikeBtn = document.querySelector(".modal-like__btn");
const empty = document.querySelector(".empty");
const modalLikeContent = document.querySelector(".modal-like__content");
const emptyWatchPage = document.querySelector(".watch__empty");
const emptySearch = document.querySelector(".modal-search__empty");
const modalSearchContent = document.querySelector(".modal-search__content");
let count = Number(window.localStorage.getItem("num"))
  ? Number(window.localStorage.getItem("num"))
  : 0;
const counter = document.querySelector(".bookmark-count");
counter.textContent = count;
//  let basket = [];
let basket = JSON.parse(window.localStorage.getItem("movie"))
  ? JSON.parse(window.localStorage.getItem("movie"))
  : [];
const searchWrapper = document.querySelector(".search__swiper-wrapper");
let searchInput = document.querySelector(".hero__form-search");
let page = 33612;
let min = 1;
let max = 500;
let RANDOMPAGE = Math.floor(Math.random() * (max - min + 1) - min);
let param = new URLSearchParams(window.location.search);
let value = param.get("query"); //fight
modalInput.value = value;
searchInput.value = value;
//  let searchIn = searchInput.value
//  value = param.set("query", searchIn)
//  console.log(searchIn)
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&query=total_pages&page=1`;
API_URL_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;

searchBtn.addEventListener("click", (e) => {
  document.body.classList.add("modal-open");
  document.querySelector(".modal__input").focus();
});
document.addEventListener("click", (e) => {
  if (
    e.composedPath().includes(searchBtn) ||
    e.composedPath().includes(modalSearch) ||
    e.composedPath().includes(modalSearchWrapper)
  ) {
    return;
  }
  document.body.classList.remove("modal-open");
});

bookmarkBtn.addEventListener("click", () => {
  document.body.classList.add("modal-open2");
});
document.addEventListener("click", (e) => {
  if (
    e.composedPath().includes(bookmarkBtn) ||
    e.composedPath().includes(modalLike)
  ) {
    return;
  }
  document.body.classList.remove("modal-open2");
});

modalInput.addEventListener("input", () => {
  modalSearchWrapper.style.display = "block";
  modalSearchBtn.style.display = "block";
  let value = modalInput.value;
  let items = modalSearchContent.querySelectorAll("a");
  modalSearchBtn.setAttribute("href", `search.html?query=${value}`);
  modalSearchContent.innerHTML = "";
  emptySearch.style.display = "none";
  const getModalSearch = async () => {
    const API_URL_search = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${value}`;
    let data = await fetch(API_URL_search).then((a) => a.json());
    if (data.results?.length) {
      data.results.map((a) => {
        if (a.poster_path != null) {
          let modalItem = document.createElement("a");
          modalItem.classList.add("modal__item");
          modalItem.classList.add("found");
          let imageLink = document.createElement("div");
          modalItem.setAttribute("href", `details.html?id=${a.id}`);
          modalItem.setAttribute("target", "blank");
          imageLink.classList.add("modal__image");
          let image = document.createElement("img");
          image.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/original/${a.poster_path}`
          );
          let bodyModal = document.createElement("div");
          bodyModal.classList.add("modal__body");
          let year = document.createElement("p");
          year.classList.add("modal__year");
          year.textContent = a.release_date.slice(0, 4);
          let name = document.createElement("p");
          name.classList.add("modal__name");
          name.textContent = a.title;
          modalItem.append(imageLink, bodyModal);
          bodyModal.append(name, year);
          imageLink.append(image);
          modalSearchContent.append(modalItem);
        }
      });
    } else {
      emptySearch.style.display = "flex";
    }
  };
  if (value.length) {
    getModalSearch();
  }
});

basket = JSON.parse(localStorage.getItem("movie"));
console.log(basket);

const addToModalList = () => {
  modalLikeContent.textContent = "";
  basket.map((a) => {
    let modalItem = document.createElement("a");
    modalItem.classList.add("modal__item");
    modalItem.classList.add("modal__item-favorite");
    let imageLink = document.createElement("div");
    modalItem.setAttribute("href", `details.html?id=${a.id}`);
    modalItem.setAttribute("target", "blank");
    imageLink.classList.add("modal__image");
    let image = document.createElement("img");
    image.setAttribute("src", a.image);
    let bodyModal = document.createElement("div");
    bodyModal.classList.add("modal__body");
    let name = document.createElement("p");
    name.classList.add("modal__name");
    name.textContent = a.name;
    let year = document.createElement("p");
    year.classList.add("modal__year");
    year.textContent = a.year;
    let iconDeleteBtn = document.createElement("i");
    iconDeleteBtn.classList.add("icon-modal");
    iconDeleteBtn.setAttribute("icon", "icon");
    iconDeleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    iconDeleteBtn.addEventListener("click", () => {
      deleteFromFavs(
        a.id,
        a.title,
        `https://image.tmdb.org/t/p/original/${a.poster_path}`,
        iconDeleteBtn
      );
      checkInner();
      modalItem.classList.add("hide");
      let element = document.querySelector(`[data-info="${a.id}"]`);
      let i = element.querySelector("i");
      i.classList.remove("selected");
      i.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
    });
    modalItem.addEventListener("click", (e) => {
      if (e.composedPath().includes(iconDeleteBtn)) {
        modalItem.removeAttribute("href");
      } else {
        modalItem.setAttribute("href", `details.html?id=${a.id}`);
      }
    });
    bodyModal.append(name, year);
    modalItem.append(imageLink, bodyModal, iconDeleteBtn);
    imageLink.append(image);
    modalLikeContent.append(modalItem);
  });
};
addToModalList();
const checkInner = () => {
  if (basket.length != 0) {
    empty.classList.add("hide");
  } else {
    empty.classList.remove("hide");
  }
};
checkInner();

const addToWatchList = (id, name, image, year, iconBtn) => {
  // let icons = [...popularWrapper.querySelectorAll("i")].map((a) =>
  let alreadyExist = basket.find((t) => t.id == id);
  if (!alreadyExist) {
    basket.push({
      id: id,
      name: name,
      image: image,
      year: year,
    });
    count++;
    counter.textContent = count;
    iconBtn.classList.add("selected");
    iconBtn.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i>`;
  } else {
    basket = basket.filter((a) => a.id != id);
    count--;
    counter.textContent = count;
    iconBtn.classList.remove("selected");
    iconBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
  }
  window.localStorage.setItem("movie", JSON.stringify(basket));
  Number(window.localStorage.setItem("num", count));
  window.localStorage.setItem("icon_btn", iconBtn);
  // window.localStorage.setItem("icon_btn", JSON.stringify(iconBtn))

  addToModalList();
};
const deleteFromFavs = (id) => {
  let alreadyExist = basket.find((t) => t.id == id);
  if (alreadyExist) {
    basket = basket.filter((a) => a.id != id);
    count--;
    counter.textContent = count;
  }
  window.localStorage.setItem("movie", JSON.stringify(basket));
  Number(window.localStorage.setItem("num", count));
};

const getSearch = async () => {
  const API_URL_search = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${value}`;
  value = param.get("query");
  let data = await fetch(API_URL_search).then((a) => a.json());
  searchWrapper.innerHTML = "";
  data.results.map((a) => {
    if (a.poster_path != null) {
      let popularSlider = document.createElement("a");
      popularSlider.classList.add("filter__item");
      popularSlider.setAttribute("data-info", a.id);
      popularSlider.setAttribute("genre", a.genre_ids);
      popularSlider.setAttribute("popularity", a.popularity);
      popularSlider.setAttribute("rating", a.vote_average);
      popularSlider.setAttribute("novelty", a.popularity);
      let imageLink = document.createElement("div");
      popularSlider.setAttribute("href", `details.html?id=${a.id}`);
      popularSlider.setAttribute("target", "blank");
      imageLink.classList.add("movie__image");
      let image = document.createElement("img");
      image.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/original/${a.poster_path}`
      );
      let name = document.createElement("p");
      name.classList.add("movie__name");
      name.textContent = a.title;
      let movieInfo = document.createElement("div");
      movieInfo.classList.add("movie__info");
      let year = document.createElement("p");
      year.classList.add("movie__year");
      year.textContent = a.release_date.slice(0, 4);
      let rating = document.createElement("p");
      rating.classList.add("movie__rating");
      rating.textContent = `${a.vote_average} IMDB`;
      let iconBtn = window.localStorage.getItem("icon_btn");
      // let iconBtn = JSON.parse(window.localStorage.getItem("icon_btn"));
      iconBtn = document.createElement("i");
      iconBtn.classList.add("icon");
      iconBtn.setAttribute("icon", "icon");
      // let t = JSON.parse(window.localStorage.getItem("movie"));
      let check = basket.find((f) => f.id === a.id);
      iconBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
      if (check) {
        iconBtn.classList.add("selected");
        iconBtn.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i>`;
      }
      iconBtn.addEventListener("click", () => {
        addToWatchList(
          a.id,
          a.title,
          `https://image.tmdb.org/t/p/original/${a.poster_path}`,
          a.release_date.slice(0, 4),
          iconBtn
        );
        checkInner();
      });
      popularSlider.addEventListener("click", (e) => {
        if (e.composedPath().includes(iconBtn)) {
          popularSlider.removeAttribute("href");
        } else {
          popularSlider.setAttribute("href", `details.html?id=${a.id}`);
        }
      });
      movieInfo.append(year, rating);
      popularSlider.append(imageLink, name, movieInfo, iconBtn);
      imageLink.append(image);
      searchWrapper.append(popularSlider);
    }
  });
};
getSearch();

searchInput.addEventListener("input", () => {
  let searchIn = searchInput.value;
  param.set("query", searchIn);
  window.history.replaceState(null, null, "?query=" + searchIn);
  getSearch();
  let items = searchWrapper.querySelectorAll("a");
  [...items].map((item) => {
    item.classList.remove("hide");
    let found = false;
    if (
      item.textContent.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      found = true;
    }
    if (!found) {
      item.classList.add("hide");
    }
  });
});

// let param = new URLSearchParams(window.location.search);
// let value = param.get("query");
