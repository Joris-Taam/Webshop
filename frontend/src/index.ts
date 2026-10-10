import { categoryService } from "./service/categoryService";
import { category } from "./types/category";
import { getPromotions } from "./service/promotionService";
import { Promotion } from "./types/promotion";

const categorySection = document.querySelector(".sectionCategorie") as HTMLElement;
const categorySeeMore = categorySection.querySelector("a") as HTMLAnchorElement;

async function loadCategoryImages(): Promise<void> {
	const categories: category[] = await categoryService.getCategories();

	categories.forEach((cat) => {
		if (!cat.imgPath) return;

		const img = document.createElement("img");
		img.className = "categorie";
		img.alt = cat.name;
        img.src = cat.imgPath;

		categorySection.insertBefore(img, categorySeeMore);
	});
}

loadCategoryImages();

const promotionSection = document.querySelector(".sectionActie") as HTMLElement;
const promotionSeeMore = promotionSection.querySelector("a") as HTMLAnchorElement;

async function loadPromotions(): Promise<void> {
	const promotions: Promotion[] = await getPromotions();

	promotions.forEach((promo) => {
		const promoItem = document.createElement("p");
		promoItem.className = "actie-text";
		promoItem.textContent = `${promo.title} - ${promo.percentage}% korting`;

		promotionSection.insertBefore(promoItem, promotionSeeMore);
	});
}

loadPromotions();

const leftButton = categorySection.querySelector(".scroll-left");
const rightButton = categorySection.querySelector(".scroll-right");

leftButton?.addEventListener("click", () => {
    categorySection.scrollBy({left: -300,behavior:"smooth"});
});
rightButton?.addEventListener("click", () => {
    categorySection.scrollBy({left: -300,behavior:"smooth"});
});