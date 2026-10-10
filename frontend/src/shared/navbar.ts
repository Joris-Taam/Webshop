const navbarTemplate = document.createElement("template");

navbarTemplate.innerHTML = /*html*/ `
<nav>
	<ul class="sidebar">
		<li class="close-sidebar-btn"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
		<li><a href="/">Home</a></li>
		<li><a href="#Over Ons">Over ons</a></li>
		<li><a href="/promotions">Promoties</a></li>
		<li><a href="/categories">Categorieën</a></li>
		<li><a href="#Klantenservice">Klantenservice</a></li>
		<li><a href="#Contact">Contact</a></li>
		<li><a href="/orders">Mijn bestellingen</a></li>
		<li><a href="/wishlist">Verlanglijst</a></li>
		<li><a href="/login.html">Inloggen</a></li>
	</ul>
</nav>
<nav>
	<ul> 
		<li><img data-logo alt="logo"></li>
		<li class="hideOnMobile"><a href="/">Home</a></li>
		<li style="flex:1"></li>
		<li class="hideOnMobile"><a href="/promotions">Promoties</a></li>
		<li class="hideOnMobile"><a href="#Over Ons">Over ons</a></li>
		<li class="hideOnMobile"><a href="/categories">Categorieën</a></li>
		<li class="hideOnMobile"><a href="contactFormulier.html">Contact</a></li>
		<li class="hideOnMobile"><a href="./orders.html">Mijn bestellingen</a></li>
		<li class="hideOnMobile"><a href="./wishlist.html">Verlanglijst</a></li>
		<li class="hideOnMobile"><a href="./cart.html">Winkelwagen</a></li>
		<li class="hideOnMobile"><a href="/login.html">Login</a></li>
		<li class="open-sidebar-btn"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
	</ul>
</nav>
`;

class Navbar extends HTMLElement {
	private sidebar: HTMLElement | null = null;
	private openBtn: HTMLElement | null = null;
	private closeBtn: HTMLElement | null = null;
	private shadow: ShadowRoot | null = null;
	private handleOutsideClick: (e: MouseEvent) => void;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });

		this.shadow.append(navbarTemplate.content.cloneNode(true));

		const link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../css/navbar.css");

		this.shadow.append(link);

		this.handleOutsideClick = this.handleOutsideClickMethod.bind(this);
	}

	connectedCallback(): void {
		// Get references to elements after they're added to shadow DOM
		if (this.shadow) {
			this.sidebar = this.shadow.querySelector(".sidebar") as HTMLElement;
			this.openBtn = this.shadow.querySelector(".open-sidebar-btn") as HTMLElement;
			this.closeBtn = this.shadow.querySelector(".close-sidebar-btn") as HTMLElement;
			this.applyLogoSrc();

			// Attach event listeners
			this.attachEventListeners();
		}
	}

	private attachEventListeners(): void {
		if (this.openBtn) {
			this.openBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.showSidebar();
			});
		}

		if (this.closeBtn) {
			this.closeBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.hideSidebar();
			});
		}

		// Close sidebar when clicking outside of it
		document.addEventListener("click", this.handleOutsideClick);
	}

	private handleOutsideClickMethod(e: MouseEvent): void {
		if (
			this.sidebar &&
			this.sidebar.style.display === "flex" &&
			this.shadow &&
			!this.shadow.contains(e.target as Node)
		) {
			this.hideSidebar();
		}
	}

	disconnectedCallback(): void {
		// Clean up event listeners when component is removed
		document.removeEventListener("click", this.handleOutsideClick);
	}

	private showSidebar(): void {
		if (this.sidebar) {
			this.sidebar.style.display = "flex";
		} else {
			console.error("Sidebar not found");
		}
	}

	private hideSidebar(): void {
		if (this.sidebar) {
			this.sidebar.style.display = "none";
		} else {
			console.error("Sidebar not found");
		}
	}

	// Public methods that can be called from outside if needed
	public show(): void {
		this.showSidebar();
	}

	public hide(): void {
		this.hideSidebar();
	}

	private applyLogoSrc(): void {
		const logos = this.shadow?.querySelectorAll("img[data-logo]") ?? [];
		logos.forEach((logo) => {
			logo.setAttribute("src", "./img/logo.png");
		});
	}
}

customElements.define("navbar-component", Navbar);
