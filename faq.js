const faq = document.querySelector(".faq");
faq.style.minHeight = window.innerHeight+`px`
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
let count = Number(window.localStorage.getItem("num")) ? Number(window.localStorage.getItem("num")) : 0;
const counter = document.querySelector(".bookmark-count");
counter.textContent = count;
//  let basket = [];
let basket = JSON.parse(window.localStorage.getItem("movie")) ? JSON.parse(window.localStorage.getItem("movie")) : [];
const searchWrapper = document.querySelector(".search__swiper-wrapper");
let searchInput = document.querySelector(".hero__form-search");
let page = 33612;
let min = 1;
let max = 500;
let RANDOMPAGE = Math.floor(Math.random() * (max - min + 1) - min);
let param = new URLSearchParams(window.location.search);
let value = param.get("query");
modalInput.value = value;
//  let searchIn = searchInput.value
//  value = param.set("query", searchIn)
//  console.log(searchIn)
const KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&query=total_pages&page=1`;
API_URL_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
const API_URL_search = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${value}`
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
	if (e.composedPath().includes(bookmarkBtn) || e.composedPath().includes(modalLike)) {
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
			let i = element.querySelector("i");
			i.classList.remove("selected");
			i.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
		});
		modalItem.addEventListener("click", (e) => {
			if (e.composedPath().includes(iconDeleteBtn)) {
				modalItem.removeAttribute("href")
			}
			else {
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
	if (!alreadyExist) {
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
	else {
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
	if (alreadyExist) {
		basket = basket.filter((a) => a.id != id)
		count--
		counter.textContent = count;
	}
	window.localStorage.setItem("movie", JSON.stringify(basket))
	Number(window.localStorage.setItem("num", count))
}

const lists = document.querySelectorAll(".faq__question");
[...lists].map((list) => {
	list.addEventListener("click", (e) => {
		let answer = e.target.querySelector("p");
		if (e.target.classList.contains("opened")) {
			answer.style.height = 0;
			e.target.classList.remove("opened");
			return;
		}
		[...document.querySelectorAll("li p")].map((a) => (a.style.height = 0));
		[...document.querySelectorAll("li")].map((a) => a.classList.remove("opened"));
		answer.style.height = answer.getBoundingClientRect().height === 0 ? `${answer.scrollHeight + 40}px` : 0;
		e.target.classList.add("opened");
	})
})

const categories = document.querySelectorAll(".category");
[...categories].map((category) => {
	category.addEventListener("click", () => {
		document.querySelector(".active")?.classList.remove("active");
		category.classList.add("active");
		let blocks = document.querySelectorAll(".faq__block");
		[...blocks].map((block) => {
			block.classList.remove("hide");
			if (block.getAttribute("data-id") != category.getAttribute("data-id")) {
				block.classList.add("hide");
			}
		})
	})
})
const allBtn = document.querySelector(".all");
allBtn.addEventListener("click", () => {
	let blocks = document.querySelectorAll(".faq__block");
	[...blocks].map((block) => {
		block.classList.remove("hide");
	})
})

const faqSearch = document.querySelector(".faq__search");
const faqBlock = document.querySelector(".faq__block");
faqSearch.focus();
faqSearch.addEventListener("input", () => {
	let subtitles = document.querySelectorAll(".faq__subtitle ");
	[...subtitles].map((subtitle) => {
		let questions = document.querySelectorAll(".faq__question");
		[...questions].map((question) => {
			question.classList.remove("hide");
			subtitle.classList.remove("hide");
			let found = false;
			if (question.textContent.toLowerCase().includes(faqSearch.value.toLowerCase())) {
				found = true;
			}
			if (!found) {
				question.classList.add("hide");
				subtitle.classList.add("hide");
			}
		})
	})
})

