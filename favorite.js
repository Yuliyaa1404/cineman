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
const genreDropdown = document.querySelector(".dropdown-genre");
const empty = document.querySelector(".empty");
const emptyWatchPage = document.querySelector(".watch__empty");
const emptySearch = document.querySelector(".modal-search__empty");
const modalLikeContent = document.querySelector(".modal-like__content");
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
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&query=total_pages&page=1`;
const API_URL_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
const row = document.querySelector(".watch__row");
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

basket = JSON.parse(localStorage.getItem("movie"))

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
		checkInner();
		checkInnerOfThePage()
		modalItem.classList.add("hide");
		let element = document.querySelector(`[data-info="${a.id}"]`);
		element.classList.add("hide");
		element.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
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



const checkInnerOfThePage = () => {
	if(basket.length != 0){
		emptyWatchPage.classList.add("hide");
	}
	else{
		emptyWatchPage.classList.remove("hide");
	}
}
checkInnerOfThePage()

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
	  iconBtn.classList.add("selected")
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

const getFavorites = async () => {
  let data = await fetch(API_URL_popular).then((a) => a.json());
  basket.map((a) => {
	let item = document.createElement("a");
	item.setAttribute("href", `details.html?id=${a.id}`)
	item.setAttribute("target", "blank");
	item.classList.add("watch__item");
	item.setAttribute("data-info", a.id);
	let imageDiv = document.createElement("div");
	imageDiv.classList.add("movie__image");
	let image = document.createElement("img");
	image.setAttribute("src", a.image);
	let name = document.createElement("p");
	name.classList.add("movie__name");
	name.textContent = a.name;
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
			a.release_date,
			iconBtn
		 );
		 checkInner()
		 checkInnerOfThePage()
		 item.classList.add("hide");
	});
	item.addEventListener("click", (e) => {
	  if (e.composedPath().includes(iconBtn)) {
		 item.removeAttribute("href");
	  } else {
		 item.setAttribute("href", `details.html?id=${a.id}`);
	  }
	});
	item.append(imageDiv, name, iconBtn);
	imageDiv.append(image);
	row.append(item)
 });
};
getFavorites();



					// 	let notfound = document.createElement("div");
	// 	notfound.classList.add("modal_not-found");
	// 	notfound.textContent = "Nothing found Refine your request or choose a movie from our users' top list";
	// 	modalSearchWrapper.append(notfound);