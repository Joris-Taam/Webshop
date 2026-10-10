"use strict";
const sidebarTemplate = document.createElement("template");
sidebarTemplate.innerHTML = /*html*/ `
  <aside class="sidebar">
		<section class="logo">
			<img src="./img/logo.svg" alt="logo" />
		</section>

		<section class="menu">
			<h3>Producten</h3>
			<ul>
				<li><a href="AdminProductOverview.html">Producten lijst</a></li>
				<li><a href="AdminAddProduct.html">Voeg product toe</a></li>
			</ul>
		</section>

			<section class="menu">
				<h3>Bestellingen</h3>
				<ul>
					<li><a href="../adminOrders.html">Bestellingen lijst</a></li>
				</ul>
			</section>

			<section class="menu">
				<h3>Categorieën </h3>
				<ul>
					<li><a href="../adminCategoryOverview.html">Categorieën  lijst</a></li>
					<li><a href="../adminAddCategory.html">Catogoriee toevoegen</a></li>
				</ul>
			</section>

			<section class="menu">
				<h3>Acties</h3>
				<ul>
					<li><a href="../adminPromotions.html">Acties lijst</a></li>
					<li><a href="../adminAddPromotion.html">Een nieuwe actie creëren</a></li>
					<li><a href="../adminAddPromotionProduct.html">Producten toevoegen aan actie</a></li>
				</ul>
			</section>

			<section class="menu">
				<h3>Gebruikers</h3>
				<ul>
					<li><a href="../usersAdmin.html">Gebruikers lijst</a></li>
				</ul>
			</section>
			<section class="menu">
				<h3>Contactverzoeken</h3>
				<ul>
					<li><a href="../adminContactRequestOverview.html">Contactverzoeken lijst</a></li>
				</ul>
			</section>
  </aside>
`;
class Sidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(sidebarTemplate.content.cloneNode(true));
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/sidebar.css");
        shadow.append(link);
        const linkIndex = document.createElement("link");
        linkIndex.setAttribute("rel", "stylesheet");
        linkIndex.setAttribute("href", "../index.css");
        shadow.append(linkIndex);
    }
}
customElements.define("sidebar-component", Sidebar);
