import { categoryService } from "./service/categoryService";
import { getPromotions } from "./service/promotionService";
const categorySection = document.querySelector(".sectionCategorie");
const categorySeeMore = categorySection.querySelector("a");
async function loadCategoryImages() {
    const categories = await categoryService.getCategories();
    categories.forEach((cat) => {
        if (!cat.imgPath)
            return;
        const img = document.createElement("img");
        img.className = "categorie";
        img.alt = cat.name;
        img.src = cat.imgPath;
        categorySection.insertBefore(img, categorySeeMore);
    });
}
loadCategoryImages();
const promotionSection = document.querySelector(".sectionActie");
const promotionSeeMore = promotionSection.querySelector("a");
async function loadPromotions() {
    const promotions = await getPromotions();
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
    categorySection.scrollBy({ left: -300, behavior: "smooth" });
});
rightButton?.addEventListener("click", () => {
    categorySection.scrollBy({ left: -300, behavior: "smooth" });
});
