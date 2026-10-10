const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = /*html*/ `
  <footer>
    <div class="footer-top">
      <img src="../img/logo.svg" alt="Logo" class="logo" />
      <div class="footer-column collecties">
          <h4>Aangeraden Categorieën</h4>
          <ul>
            <li>
              <a href="/products.html?category=Buildings">Buildings</a>
            </li>
            <li>
              <a href="/products.html?category=Characters">Characters</a>
            </li>
            <li>
              <a href="/products.html?category=Vehicles">Vehicles</a>
            </li>
            <li>
              <a href="/products.html?category=Furniture">Furniture</a>
            </li>
          </ul>
      </div>
      <div class="footer-column klanten">
        <h4>Klanten</h4>
        <ul>
          <li>
            <a href="/login">Inloggen</a>
          </li>
          <li>
            <a href="/signup">Aanmelden</a>
          </li>
          <li>
            <a href="/contact">Contact opnemen</a>
          </li>
          <li>
            <a href="/klanten-service">Klanten Service</a>
          </li>
        </ul>
      </div>
      <div class="footer-column bedrijf">
        <h4>Bedrijf</h4>
        <ul>
          <li>
            <a href="/over-ons">Over Ons</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="/bezorging">Bezorging</a>
          </li>
          <li>
            <a href="/betaling">Betaling</a>
          </li>
          <li>
            <a href="/AdminProductOverview">Admin</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 3Webshop. All rights reserved.</p>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms & Conditions</a></li>
      </ul>
    </div>
  </footer>
`;

class Footer extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		const link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../css/footer.css");

		shadow.append(link, footerTemplate.content.cloneNode(true));
	}
}

customElements.define("footer-component", Footer);
