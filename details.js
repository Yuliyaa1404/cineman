var swiper = new Swiper(".similar__swiper", {
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

const detailsWrapper = document.querySelector(".details__wrapper");
const videoWrapper = document.querySelector(".video__wrapper");
const modalVideo = document.querySelector(".modal-video");
const modalCloseBtn = document.querySelector(".modal-video__close");
// const modalvideoWrapper = document.querySelector(".modal-video__wrapper")
let param = new URLSearchParams(window.location.search);
let id = param.get("id");
let page = 33612;
let min = 1;
let max = 500;
let randomPage = Math.floor(Math.random() * (max - min + 1) - min);
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
let API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
const API_URL_video = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;
const API_URL_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;


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

 document.querySelector(".similar__customleft").addEventListener("click", () => {
	document.querySelector(".swiper-button-prev").click();
 });
 
 document
	.querySelector(".similar__customright")
	.addEventListener("click", () => {
	  document.querySelector(".swiper-button-next").click();
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
			checkInner()
			modalItem.classList.add("hide");
			let element = document.querySelector(`[data-info="${a.id}"]`);
			let t = document.querySelector(".details__btn-add");
			t.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add`;
			let i = element.querySelector(".icon");
			i.classList.remove("selected");
			i.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
		 });
		modalItem.addEventListener("click", (e) => {
		 if(e.composedPath().includes(iconDeleteBtn)){
			 modalItem.removeAttribute("href");
		 }
		 else{
			 modalItem.setAttribute("href", `details.html?id=${a.id}`);
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
 
 const addToWatchList = (id, name, image, year, iconBtn,) => {
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

 const addToWatchList2 = (id, name, image, year, addIcon) => {
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
		
		addIcon.classList.add("selected")
		addIcon.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i> Added`;
		}
		else{
			basket = basket.filter((a) => a.id != id)
			count--
		counter.textContent = count;
		addIcon.classList.remove("selected");
		addIcon.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add`;
		}
 window.localStorage.setItem("movie", JSON.stringify(basket))
 Number(window.localStorage.setItem("num", count))
//  window.localStorage.setItem("icon_btn", iconBtn);
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



const getMovieById = async () => {
  let data = await fetch(API_URL).then((a) => a.json());
  console.log(data)
  let imageDiv = document.createElement("div");
  imageDiv.classList.add("details__image");
  let image = document.createElement("img");
  image.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original/${data.poster_path}`
  );
  let bodyDiv = document.createElement("div");
  bodyDiv.classList.add("details__body");
  bodyDiv.setAttribute("data-info", data.id)
  let name = document.createElement("h1");
  name.classList.add("details__name");
  name.textContent = data.title;
  let rating = document.createElement("h2");
  rating.classList.add("details__rating");
  rating.textContent = `${data.vote_average} IMDB`;
  let runtime = document.createElement("p");
  runtime.classList.add("details__runtime");
  runtime.textContent = `${data.runtime} mins`;
  let info = document.createElement("div");
  info.classList.add("details__info");
  let year = document.createElement("p");
  year.classList.add("details__year");
  year.textContent = `${data.release_date.slice(0, 4)}, `;
  let genre = document.createElement("p");
  genre.classList.add("details__genre");
  genre.textContent = data.genres.map((a) => a.name);
  let language = document.createElement("p");
  language.classList.add("details__language");
  language.textContent = data.spoken_languages.map((a) => a.name);
  // let langIcon = document.createElement("i");
  // langIcon.classList.add("fa-solid");
  // langIcon.classList.add("fa-microphone-lines");
  // langIcon.innerHTML = <i class="fa-solid fa-microphone-lines"></i>
  let overview = document.createElement("p");
  overview.classList.add("details__overview");
  overview.textContent = data.overview;
  let country = document.createElement("p");
  country.classList.add("details__country");
  country.textContent = `Production country: ${data.production_countries.map(
    (a) => a.name
  )}`;
  let btnBody = document.createElement("div");
  btnBody.classList.add("details__btns")
  let watchBtn = document.createElement("p");
  watchBtn.classList.add("details__btn-watch");
  watchBtn.innerHTML = `<i class="fa-solid fa-play"></i> Watch`;
  watchBtn.addEventListener("click", playVideo);
  bodyDiv.append(name, rating, runtime, info, overview, country, watchBtn);
  info.append(year, genre, language);
  imageDiv.append(image);
	let addIcon = document.createElement("p");
	addIcon.classList.add("details__btn-add");
	let check = basket.find((f) => f.id === data.id);
	addIcon.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add`;
	if (check) {
		addIcon.classList.add("selected");
		addIcon.innerHTML = `<i class="fa-solid fa-bookmark-slash"></i> Added`;
	}
	addIcon.addEventListener("click", () =>{
		addToWatchList2(
			data.id,
			data.title,
			`https://image.tmdb.org/t/p/original/${data.poster_path}`,
			data.release_date.slice(0, 4),
			addIcon
		 )
		 checkInner()
	}
	);
	bodyDiv.append(name, rating, runtime, info, genre, overview, country, btnBody);
	info.append(year, language);
	btnBody.append(watchBtn, addIcon)
	imageDiv.append(image);
  detailsWrapper.append(bodyDiv, imageDiv);
};
getMovieById();

const similarWrapper = document.querySelector(".similar__swiper-wrapper");
let API_URL_similar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${KEY}&language=en-US&page=${randomPage}`;
const getSimilar = async () => {
  let data = await fetch(API_URL_similar).then((a) => a.json());
  data.results.map((a) => {
    let similarSlider = document.createElement("a");
    similarSlider.classList.add("swiper-slide");
    similarSlider.classList.add("similar__swiper-slide");
	 similarSlider.setAttribute("data-info", a.id)
    let imageLink = document.createElement("a");
    similarSlider.setAttribute("href", `details.html?id=${a.id}`);
    similarSlider.setAttribute("target", "blank");
    imageLink.classList.add("movie__image");
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${a.poster_path}`
    );
    let name = document.createElement("p");
    name.classList.add("movie__name");
    name.textContent = a.title;
	 let year = document.createElement("p");
    year.classList.add("movie__year");
    year.textContent = a.release_date.slice(0, 4);
    similarSlider.setAttribute("data-genre", a.genre_ids[0]);
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
		checkInner();

	 }
    );
    similarSlider.addEventListener("click", (e) => {
      if (e.composedPath().includes(iconBtn)) {
        similarSlider.removeAttribute("href");
      } else {
        similarSlider.setAttribute("href", `details.html?id=${a.id}`);
      }
    });
    similarSlider.append(imageLink, name, iconBtn, year);
    imageLink.append(image);
    similarWrapper.append(similarSlider);

  });
  const getGenres = async () => {
	let data = await fetch(API_URL_genres).then((a) => a.json());
	data.genres.map((a) => {
	  let items = similarWrapper.children;
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
};
getSimilar();
let video = document.createElement("iframe");
modalVideo.append(video);

const getVideos = async () => {
  let data = await fetch(API_URL_video).then((a) => a.json());
  let info = data.results[0];
  video.setAttribute("src", `https://www.youtube.com/embed/${info.key}`);
};
getVideos();
const playVideo = () => {
  document.body.classList.add("modal-video-opened");
  modalCloseBtn.addEventListener("click", () => {
    document.body.classList.remove("modal-video-opened");
  });
};



