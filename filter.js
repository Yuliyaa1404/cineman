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
let count = Number(window.localStorage.getItem("num")) ? Number(window.localStorage.getItem("num")) : 0;
const counter = document.querySelector(".bookmark-count");
counter.textContent = count;
let basket = JSON.parse(window.localStorage.getItem("movie")) ? JSON.parse(window.localStorage.getItem("movie")) : [];
const genresFilter = document.querySelector(".dropdown-genre");
const filterWrapper = document.querySelector(".filter__wrapper");
const popularity = document.querySelector(".popularity")
const novelty = document.querySelector(".novelty")
const rating = document.querySelector(".rating");
const popularityBtn = document.querySelector(".popularity__filter");
const genreBtn = document.querySelector(".genre");
const popularityDropdown = document.querySelector(".dropdown-popularity");
const genreDropdown = document.querySelector(".dropdown-genre");
const empty = document.querySelector(".empty");
const modalLikeContent = document.querySelector(".modal-like__content");
const emptyWatchPage = document.querySelector(".watch__empty");
const emptySearch = document.querySelector(".modal-search__empty");
const modalSearchContent = document.querySelector(".modal-search__content");
let min = 1;
let max = 500;
let RANDOMPAGE = Math.floor(Math.random() * (max-min+1)-min);
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
const API_URL_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
API_URL_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;

searchBtn.addEventListener("click", () => {
	modalInput.focus();
	document.body.classList.add("modal-open");
});
document.addEventListener("click", (e) => {
	if (e.composedPath().includes(searchBtn) || e.composedPath().includes(modalSearch)) {
	  return;
	}
	document.body.classList.remove("modal-open");
})

bookmarkBtn.addEventListener("click", () => {
	document.body.classList.add("modal-open2");
});
document.addEventListener("click", (e) => {
	if(e.composedPath().includes(bookmarkBtn) || e.composedPath().includes(modalLike)){
		return;
	}
	document.body.classList.remove("modal-open2");
})
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

basket = JSON.parse(localStorage.getItem("movie"))
console.log(empty)

const addToModalList = () => {
	modalLikeContent.textContent = "";
		basket.map((a) => {
			//   let item = data.results.find((t) => t.id === a.id);
			  let modalItem = document.createElement("a");
			  modalItem.classList.add("modal__item");
			  modalItem.classList.add("modal__item-favorite");
			  let imageLink = document.createElement("div")
			  modalItem.setAttribute("href", `details.html?id=${a.id}`)
			  modalItem.setAttribute("target", "blank");
			  imageLink.classList.add("modal__image");
			  let image = document.createElement("img");
			  image.setAttribute(
				  "src",
				  a.image
			  )
			  let bodyModal = document.createElement("div");
			  bodyModal.classList.add("modal__body")
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
				modalItem.classList.add("hide");
				checkInner()

				let element = document.querySelector(`[data-info="${a.id}"]`);
				let i = element.querySelector("i");
				i.classList.remove("selected");
				i.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
			 });
			  modalItem.addEventListener("click", (e) => {
				if(e.composedPath().includes(iconDeleteBtn)){
					modalItem.removeAttribute("href")
				}
				else{
					modalItem.setAttribute("href", `details.html?id=${a.id}`)
				}
			  })
			  bodyModal.append(name, year);
			  modalItem.append(imageLink, bodyModal, iconDeleteBtn);
			  imageLink.append(image);
			 modalLikeContent.append(modalItem)
		  })
}
addToModalList()

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
	  let alreadyExist = basket.find((t) => t.id == id)
	  if(!alreadyExist){
		  basket.push({
			  id: id,
			  name: name,
			  image: image,
			  year: year
		  })
	  count++
	  counter.textContent = count;
	  iconBtn.classList.add("selected");
		iconBtn.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i>`;
	  }
	  else{
		  basket = basket.filter((a) => a.id != id)
		  count--
	  counter.textContent = count;
	  iconBtn.classList.remove("selected");
		iconBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
	  }
window.localStorage.setItem("movie", JSON.stringify(basket))
Number(window.localStorage.setItem("num", count))
window.localStorage.setItem("icon_btn", iconBtn);
// window.localStorage.setItem("icon_btn", JSON.stringify(iconBtn))

	  addToModalList()
}
const deleteFromFavs = (id) => {
  let alreadyExist = basket.find((t) => t.id == id)
  if(alreadyExist){
	  basket = basket.filter((a) => a.id != id)
	  count--
  counter.textContent = count;
  }
window.localStorage.setItem("movie", JSON.stringify(basket))
Number(window.localStorage.setItem("num", count))
}


popularityBtn.addEventListener("click", () => {
	popularityBtn.classList.toggle("active");
})
document.addEventListener("click", (e) => {
	if(e.composedPath().includes(popularityBtn) || e.composedPath().includes(popularityDropdown)){
		return;
	}
	popularityBtn.classList.remove("active");
});

genreBtn.addEventListener("click", () => {
	genreBtn.classList.toggle("active");
})
document.addEventListener("click", (e) => {
	if(e.composedPath().includes(genreBtn) || e.composedPath().includes(genreDropdown)){
		return;
	}
	genreBtn.classList.remove("active");
})

let counterPage = 1;
let API_URL;
const showMoreBtn = document.querySelector(".filter__btn");
	showMoreBtn.addEventListener("click", () => {
		counterPage++
		console.log(counterPage)
		API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${counterPage}`;
		console.log(API_URL)
		getPopular()
	})


const getGenres = async () => {
	let data = await fetch(API_URL_genres).then((a) => a.json());
	data.genres.map((a) => {
		let genre = document.createElement("li");
		filterWrapper.innerHTML = "";

		genre.addEventListener("click", () => {
			let items = filterWrapper.children;
			[...items].map((item) => {
				item.classList.remove("hide");
				if(!item.getAttribute("genre").includes((a.id))){
					item.classList.add("hide");
				}
			})
		})
		genre.textContent = a.name;
		genresFilter.append(genre)
	})
}
getGenres()

const sortByPopularity = () => {
	let switching = true;
	while(switching){
		switching = false;
		let items = filterWrapper.children;
		let shouldSwitch = false;
		for(var i = 0; i < items.length-1; i++){
			if(
				items[i].getAttribute("popularity") < items[i+1].getAttribute("popularity")
			){
				shouldSwitch = true;
				break;
			}
		}
		if(shouldSwitch){
			filterWrapper.insertBefore(items[i+1], items[i]);
			switching = true;
		}
	}
}

const sortByRating = () => {
	let switching = true;
	while(switching){
		switching = false;
		let items = filterWrapper.children;
		let shouldSwitch = false;
		for(var i = 0; i < items.length-1; i++){
			if(
				items[i].getAttribute("rating") < items[i+1].getAttribute("rating")
			){
				shouldSwitch = true;
				break;
			}
		}
		if(shouldSwitch){
			filterWrapper.insertBefore(items[i+1], items[i]);
			switching = true;
		}
	}
}

const sortByNovelty = () => {
	let switching = true;
	while(switching){
		switching = false;
		let items = filterWrapper.children;
		console.log(items)
		let shouldSwitch = false;
		for(var i = 0; i < items.length-1; i++){
			if(
				items[i].getAttribute("novelty") < items[i+1].getAttribute("novelty")
			){
				shouldSwitch = true;
				break;
			}
		}
		if(shouldSwitch){
			filterWrapper.insertBefore(items[i+1], items[i]);
			switching = true;
		}
	}
}

let filterAllBtn = document.querySelector(".filter__all");
const all = () => {
	filterAllBtn.addEventListener("click", ()  => {
		filterWrapper.textContent = ""
		getPopular()
	});
}
all()

rating.addEventListener("click", sortByRating);
popularity.addEventListener("click", sortByPopularity);
novelty.addEventListener("click", sortByNovelty);

API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${counterPage}`;
const getPopular = async () => {
	let data = await fetch(API_URL).then((a) => a.json());
	console.log(data)
	data.results.map((a) => {
		let popularSlider = document.createElement("a");
		popularSlider.classList.add("filter__item");
		popularSlider.setAttribute("data-info", a.id)
		popularSlider.setAttribute("genre", a.genre_ids);
		popularSlider.setAttribute("popularity", a.popularity);
		popularSlider.setAttribute("rating", a.vote_average);
		popularSlider.setAttribute("novelty", a.popularity);
		let imageLink = document.createElement("div")
		popularSlider.setAttribute("href", `details.html?id=${a.id}`)
		popularSlider.setAttribute("target", "blank");
		imageLink.classList.add("movie__image");
		let image = document.createElement("img");
		image.setAttribute(
			"src",
			`https://image.tmdb.org/t/p/original/${a.poster_path}`
		)
		let name = document.createElement("p");
		name.classList.add("movie__name");
		name.textContent = a.title;
		let movieInfo =document.createElement("div");
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
		popularSlider.addEventListener("click", (e) => {
		  if (e.composedPath().includes(iconBtn)) {
			 popularSlider.removeAttribute("href");
		  } else {
			 popularSlider.setAttribute("href", `details.html?id=${a.id}`);
		  }
		});
		movieInfo.append(year, rating)
		popularSlider.append(imageLink, name, movieInfo, iconBtn);
		imageLink.append(image);
		filterWrapper.append(popularSlider)
	})
}
getPopular()