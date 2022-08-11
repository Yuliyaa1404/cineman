var swiper = new Swiper(".hero", {
  loop: true,
  items: 1,
  observer: true,
  pagination: {
    nav: true,
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  	autoplay: {
  	delay: 2500,
  	disableOnInteraction: false,
   },
});

var swiper = new Swiper(".popular__swiper", {
  slidesPerView: 6,
  // grid: {
  //   rows: 2,
  // },
  autoplay: {
  	delay: 2500,
  	disableOnInteraction: false,
   },
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
	init() {
	  this.el.addEventListener('mouseenter', () => {
		 this.autoplay.stop();
	  });

	  this.el.addEventListener('mouseleave', () => {
		 this.autoplay.start();
	  });
	}
}
});

var swiper = new Swiper(".upcoming__swiper", {
  slidesPerView: 6,
  // grid: {
  //   rows: 2,
  // },
  autoplay: {
  	delay: 2500,
  	disableOnInteraction: false,
   },
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
	init() {
	  this.el.addEventListener('mouseenter', () => {
		 this.autoplay.stop();
	  });

	  this.el.addEventListener('mouseleave', () => {
		 this.autoplay.start();
	  });
	}
}
});

var swiper = new Swiper(".now__swiper", {
  slidesPerView: 6,
  // grid: {
  //   rows: 2,
  // },
  autoplay: {
  	delay: 2500,
  	disableOnInteraction: false,
   },
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
	init() {
	  this.el.addEventListener('mouseenter', () => {
		 this.autoplay.stop();
	  });

	  this.el.addEventListener('mouseleave', () => {
		 this.autoplay.start();
	  });
	}
}
});

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

document.querySelector(".popular__customleft").addEventListener("click", () => {
  document.querySelector(".swiper-button-prev").click();
});

document
  .querySelector(".popular__customright")
  .addEventListener("click", () => {
    document.querySelector(".swiper-button-next").click();
  });

document
  .querySelector(".upcoming__customleft")
  .addEventListener("click", () => {
    document.querySelector(".upcoming__oldleft").click();
  });

document
  .querySelector(".upcoming__customright")
  .addEventListener("click", () => {
    document.querySelector(".upcoming__oldright").click();
  });

document.querySelector(".now__customleft").addEventListener("click", () => {
  document.querySelector(".now__oldleft").click();
});

document.querySelector(".now__customright").addEventListener("click", () => {
  document.querySelector(".now__oldright").click();
});

const modalSearch = document.querySelector(".modal-search");
const modalLike = document.querySelector(".modal-like");
const searchBtn = document.querySelector(".header__search");
const modalSearchWrapper = document.querySelector(".modal-search__wrapper");
const modalLikeContent = document.querySelector(".modal-like__content");
const modalInput = document.querySelector(".modal__input");
const modalSearchBtn = document.querySelector(".modal-search__btn");
const bookmarkBtn = document.querySelector(".header__bookmark");
const modalLikeWrapper = document.querySelector(".modal-like__wrapper");
const modalLikeBtn = document.querySelector(".modal-like__btn");
const empty = document.querySelector(".empty");
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
//  localStorage.setItem("movie", JSON.stringify(basket));
const popular = document.querySelector(".popular");
const popularWrapper = document.querySelector(".popular__swiper-wrapper");
const upcoming = document.querySelector(".upcoming");
const upcomingWrapper = document.querySelector(".upcoming__swiper-wrapper");
const nowPlaying = document.querySelector(".now");
const nowPlayingWrapper = document.querySelector(".now__swiper-wrapper");
let page = 33612;
let min = 1;
let max = 500;
let RANDOMPAGE = Math.floor(Math.random() * (max - min + 1) - min);
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=$2`;
const API_URL_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
const API_URL_upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`;
const API_URL_now_playing = `https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=en-US&page=2`;
const API_URL_top_rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;

const heroWrapper = document.querySelector(".hero__swiper-wrapper");
const getHeroSlider = async () => {
  let data = await fetch(API_URL).then((a) => a.json());
  let movies = [];
  movies.push(
    data.results[7],
    data.results[0],
    data.results[2],
    data.results[5],
    data.results[3],
  );
  console.log(movies);
  movies.map((a) => {
    // let topItem = document.createElement("div");
    // topItem.classList.add("top__item");
    // topItem.setAttribute("data-genre", a.genre_ids[0]);
    let heroSlider = document.createElement("div");
    heroSlider.classList.add("hero__swiper-slide");
    heroSlider.classList.add("swiper-slide");
    heroSlider.setAttribute("data-id", a.id);
    heroSlider.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${a.poster_path})`;
    let heroBody = document.createElement("div");
    heroBody.classList.add("hero__body");
    let name = document.createElement("div");
    name.classList.add("hero__name");
    name.textContent = a.title;
    // name.addEventListener("click", () => showImage)
    let text = document.createElement("div");
    text.classList.add("hero__title");
    text.textContent = "Watch now the newest movies and TV series!";
    let heroBtn = document.createElement("a");
    heroBtn.classList.add("hero__btn");
    heroBtn.setAttribute("href", `details.html?id=${a.id}`);
    heroBtn.textContent = "Watch now";

    heroBody.append(name, text, heroBtn);
    heroSlider.append(heroBody);
    heroWrapper.append(heroSlider);
  });
};
getHeroSlider();

searchBtn.addEventListener("click", () => {
	modalInput.focus();
  document.body.classList.add("modal-open");
});
document.addEventListener("click", (e) => {
  if (
    e.composedPath().includes(searchBtn) ||
    e.composedPath().includes(modalSearch)
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
	[...items].map((item) => {
	  item.classList.remove("hide");
		// emptySearch.classList.remove("hide");
	  let found = false;
	  let hasAnyResult = false
	  if (
		 item.textContent.toLowerCase().includes(modalInput.value.toLowerCase())
	  ) {
		 found = true;
	  }
	  if (!found) {
		 item.classList.add("hide");
		 hasAnyResult = true;
	  }
	  if(!hasAnyResult && !found){
		 emptySearch.style.display = "block";
	  }
	//   if(hasAnyResult){
	// 	 emptySearch.classList.add("hide");
	//   }
	//   else{
	// 	emptySearch.classList.remove("hide");
	//   }
	});

	  modalSearchBtn.setAttribute("href", `search.html?query=${value}`);

	const getModalSearch = async () => {
		const API_URL_search = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${value}`;
		  let data = await fetch(API_URL_search).then((a) => a.json());
		  data.results.map((a) => {
			  if(a.poster_path != null){
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
				bodyModal.append(name, year)
				imageLink.append(image);
				modalSearchContent.append(modalItem);
			  }

		  });
		};
		getModalSearch();
 });

const API_URL_modal = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;




const getPopular = async () => {
  let data = await fetch(API_URL).then((a) => a.json());
  data.results.map((a) => {
    let popularSlider = document.createElement("a");
    popularSlider.classList.add("swiper-slide");
    popularSlider.classList.add("movie__swiper-slide");
    popularSlider.setAttribute("data-info", a.id);
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
    name.setAttribute("movie-name", a.title);
    let year = document.createElement("p");
    year.classList.add("movie__year");
    year.textContent = a.release_date.slice(0, 4);
    let genre = document.createElement("p");
    popularSlider.setAttribute("data-genre", a.genre_ids[0]);
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
    iconBtn.addEventListener("click", () =>{
		addToWatchList(
			a.id,
			a.title,
			`https://image.tmdb.org/t/p/original/${a.poster_path}`,
			a.release_date.slice(0, 4),
			iconBtn
		 );
		checkInner()
	 }
    );
    popularSlider.addEventListener("click", (e) => {
      if (e.composedPath().includes(iconBtn)) {
        popularSlider.removeAttribute("href");
      } else {
        popularSlider.setAttribute("href", `details.html?id=${a.id}`);
      }
    });
    popularSlider.append(imageLink, name, iconBtn, year);
    imageLink.append(image);
    popularWrapper.append(popularSlider);
  });
  const getGenres = async () => {
    let data = await fetch(API_URL_genres).then((a) => a.json());
    data.genres.map((a) => {
      let items = popularWrapper.children;
      [...items].map((item) => {
        if (item.getAttribute("data-genre").includes(a.id)) {
          let genre = document.createElement("p");
          genre.textContent = a.name;

          genre.classList.add("movie__genre");
          item.append(genre);
        }
      });
    });
  };
  getGenres();

  const addToModalList = () => {
	modalLikeContent.textContent = "";
    basket.map((a) => {
      let item = data.results.find((t) => t.id === a.id);
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
      // iconDeleteBtn.addEventListener("click", () => {
      // })
      // iconDeleteBtn.addEventListener("click", changeIconColor(a.id))
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

  const checkInner =() => {
	if(basket.length != 0){
		empty.classList.add("hide");
	}
	else{
		empty.classList.remove("hide");
	}
}
checkInner()
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
};
getPopular();

const getUpcoming = async () => {
  let data = await fetch(API_URL_upcoming).then((a) => a.json());
  data.results.map((a) => {
    let upcomingSlider = document.createElement("a");
    upcomingSlider.classList.add("swiper-slide");
    upcomingSlider.classList.add("movie__swiper-slide");
    upcomingSlider.setAttribute("data-info", a.id);
    let imageLink = document.createElement("div");
    upcomingSlider.setAttribute("href", `details.html?id=${a.id}`);
    upcomingSlider.setAttribute("target", "blank");
    imageLink.classList.add("movie__image");
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${a.poster_path}`
    );
    //  let popularBody = document.createElement("div");
    //  popularSlider.classList.add("popular__body");
    let name = document.createElement("p");
    name.classList.add("movie__name");
    name.textContent = a.title;
    name.setAttribute("movie-name", a.title);
    let year = document.createElement("p");
    year.classList.add("movie__year");
    year.textContent = a.release_date.slice(0, 4);
    let genre = document.createElement("p");
    upcomingSlider.setAttribute("data-genre", a.genre_ids[0]);
    let iconBtn = window.localStorage.getItem("icon_btn");
    // let iconBtn = JSON.parse(window.localStorage.getItem("icon_btn"));
    iconBtn = document.createElement("i");
    iconBtn.classList.add("icon");
    iconBtn.setAttribute("icon", "icon");
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
		checkInner()

	 }
    );
    // iconBtn.addEventListener("click", () => {
    // 	iconBtn.classList.toggle("selected");
    // })
    upcomingSlider.addEventListener("click", (e) => {
      if (e.composedPath().includes(iconBtn)) {
        upcomingSlider.removeAttribute("href");
      } else {
        upcomingSlider.setAttribute("href", `details.html?id=${a.id}`);
      }
    });
    upcomingSlider.append(imageLink, name, iconBtn, year);
    imageLink.append(image);
    //  popularBody.append(name)
    upcomingWrapper.append(upcomingSlider);
  });
  const getGenres = async () => {
    let data = await fetch(API_URL_genres).then((a) => a.json());
    data.genres.map((a) => {
      let items = upcomingWrapper.children;
      [...items].map((item) => {
        if (item.getAttribute("data-genre").includes(a.id)) {
          let genre = document.createElement("p");
          genre.textContent = a.name;

          genre.classList.add("movie__genre");
          item.append(genre);
        }
      });
    });
  };
  getGenres();

  const addToModalList = () => {
	modalLikeContent.textContent = "";
    basket.map((a) => {
      let item = data.results.find((t) => t.id === a.id);
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
      iconDeleteBtn.addEventListener("click", () => {
        modalItem.classList.add("hide");
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
  const checkInner =() => {
	if(basket.length != 0){
		empty.classList.add("hide");
	}
	else{
		empty.classList.remove("hide");
	}
}
checkInner()

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
};
getUpcoming();

const getNowPlaying = async () => {
  let data = await fetch(API_URL_now_playing).then((a) => a.json());
  data.results.map((a) => {
    let nowPlayingSlider = document.createElement("a");
    nowPlayingSlider.classList.add("swiper-slide");
    nowPlayingSlider.classList.add("movie__swiper-slide");
    nowPlayingSlider.setAttribute("data-info", a.id);
    let imageLink = document.createElement("div");
    nowPlaying.setAttribute("href", `details.html?id=${a.id}`);
    nowPlayingSlider.setAttribute("target", "blank");
    imageLink.classList.add("movie__image");
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${a.poster_path}`
    );
    let name = document.createElement("p");
    name.classList.add("movie__name");
    name.textContent = a.title;
    name.setAttribute("movie-name", a.title);
    let year = document.createElement("p");
    year.classList.add("movie__year");
    year.textContent = a.release_date.slice(0, 4);
    let genre = document.createElement("p");
    nowPlayingSlider.setAttribute("data-genre", a.genre_ids[0]);
    let iconBtn = window.localStorage.getItem("icon_btn");
    // let iconBtn = JSON.parse(window.localStorage.getItem("icon_btn"));
    iconBtn = document.createElement("i");
    iconBtn.classList.add("icon");
    iconBtn.setAttribute("icon", "icon");
    let check = basket.find((f) => f.id === a.id);
    iconBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
    if (check) {
      iconBtn.classList.add("selected");
		iconBtn.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i>`;
    }
    iconBtn.addEventListener("click", () =>{
		addToWatchList(
			a.id,
			a.title,
			`https://image.tmdb.org/t/p/original/${a.poster_path}`,
			a.release_date.slice(0, 4),
			iconBtn
		 )
				checkInner()
	 }
    );
    // iconBtn.addEventListener("click", () => {
    // 	iconBtn.classList.toggle("selected");
    // })
    nowPlayingSlider.addEventListener("click", (e) => {
      if (e.composedPath().includes(iconBtn)) {
        nowPlayingSlider.removeAttribute("href");
      } else {
        nowPlayingSlider.setAttribute("href", `details.html?id=${a.id}`);
      }
    });
    nowPlayingSlider.append(imageLink, name, iconBtn, year);
    imageLink.append(image);
    nowPlayingWrapper.append(nowPlayingSlider);
  });
  const getGenres = async () => {
    let data = await fetch(API_URL_genres).then((a) => a.json());
    data.genres.map((a) => {
      let items = nowPlayingWrapper.children;
      [...items].map((item) => {
        if (item.getAttribute("data-genre").includes(a.id)) {
          let genre = document.createElement("p");
          genre.textContent = a.name;
          genre.classList.add("movie__genre");
          item.append(genre);
        }
      });
    });
  };
  getGenres();

  const addToModalList = () => {
    modalLikeContent.textContent = "";
    basket.map((a) => {
      let item = data.results.find((t) => t.id === a.id);
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
			checkInner()
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
  const checkInner =() => {
	if(basket.length != 0){
		empty.classList.add("hide");
	}
	else{
		empty.classList.remove("hide");
	}
}
checkInner()

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
};
getNowPlaying();

const topWrapper = document.querySelector(".top__wrapper");
const topLeft = document.querySelector(".top__left");
const topRight = document.querySelector(".top__right");
const getTopRatedImages = async () => {
  let data = await fetch(API_URL_top_rated).then((a) => a.json());
  let movies = [];
  movies.push(
    data.results[0],
    data.results[1],
    data.results[2],
    data.results[3],
    data.results[4]
  );
  movies.map((a) => {
    // let topItem = document.createElement("div");
    // topItem.classList.add("top__item");
    // topItem.setAttribute("data-genre", a.genre_ids[0]);
    let imageDiv = document.createElement("a");
    imageDiv.classList.add("top__image");
    imageDiv.setAttribute("data-id", a.id);
    imageDiv.setAttribute("href", `details.html?id=${a.id}`);
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${a.poster_path}`
    );
    imageDiv.append(image);
    topLeft.append(imageDiv);
    // topWrapper.append(topItem)
  });
};
getTopRatedImages();

const getTopRatedInfo = async () => {
  let data = await fetch(API_URL_top_rated).then((a) => a.json());
  let movies = [];
  movies.push(
    data.results[0],
    data.results[1],
    data.results[2],
    data.results[3],
    data.results[4]
  );
  movies.map((a) => {
    // let topItem = document.createElement("div");
    // topItem.classList.add("top__item");
    // topItem.setAttribute("data-genre", a.genre_ids[0]);
    let contentBody = document.createElement("a");
    contentBody.classList.add("top__content");
    contentBody.setAttribute("data-id", a.id);
    contentBody.setAttribute("href", `details.html?id=${a.id}`);
    let infoBody = document.createElement("div");
    infoBody.classList.add("top__body");
    let name = document.createElement("div");
    name.classList.add("top__name");
    name.textContent = a.title;
    // name.addEventListener("click", () => showImage)
    let year = document.createElement("p");
    year.classList.add("top__year");
    year.textContent = a.release_date.slice(0, 4);
    let rating = document.createElement("h2");
    rating.classList.add("top__rating");
    rating.textContent = `${a.vote_average} IMDB`;
    infoBody.append(name, year);
    contentBody.append(infoBody, rating);
    topRight.append(contentBody);
    // topWrapper.append(topItem)
  });
  const showImage = () => {
    let images = topLeft.children;
    [...images].map((image) => {
      document.querySelector(".show")?.classList.remove("show");
      let titles = topRight.children;
      [...titles].map((title) => {
        title.addEventListener("mouseenter", () => {
          image.classList.remove("show");
          if (title.getAttribute("data-id") == image.getAttribute("data-id")) {
            image.classList.add("show");
          }
        });
      });
    });
  };
  showImage();
};
getTopRatedInfo();
