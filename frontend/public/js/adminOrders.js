// Admin orderpagina: haalt alle orders op en laat inline statusupdates toe.
import { orderService } from "./service/orderService.js";
// Vaste lijst met toegestane statussen en de DOM-elementen die we nodig hebben.
const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const tbody = document.getElementById("ordersTableBody");
const refreshBtn = document.getElementById("refreshOrders");
// Koppel handlers zodra de pagina klaar is.
document.addEventListener("DOMContentLoaded", () => {
    if (!tbody)
        return;
    // Klik op de refresh-knop laadt opnieuw; kliks op de tabel bubbelen naar onSaveClick.
    refreshBtn?.addEventListener("click", () => void loadOrders());
    tbody.addEventListener("click", onSaveClick);
    void loadOrders();
});
function onSaveClick(event) {
    // Vang kliks op "Opslaan"-buttons via event delegation op de tbody.
    const btn = event.target.closest(".save-status-btn");
    if (!btn)
        return;
    const row = btn.closest("tr");
    if (row)
        void updateStatus(row, btn);
}
async function loadOrders() {
    if (!tbody)
        return;
    // Plaats een tijdelijke laadregel en zet de refresh-knop uit.
    showMessage("Bestellingen worden geladen...");
    if (refreshBtn)
        refreshBtn.disabled = true;
    try {
        const orders = await orderService.getOrders();
        if (!orders.length)
            return showMessage("Geen bestellingen gevonden.");
        // Bouw de volledige tabel in één keer; minder reflow/DOM-werk.
        tbody.innerHTML = orders.map(renderRow).join("");
    }
    catch (error) {
        console.error(error);
        showMessage("Kon bestellingen niet laden.");
    }
    finally {
        if (refreshBtn)
            refreshBtn.disabled = false;
    }
}
function renderRow(order) {
    // Bouw een rijstring met statusopties en productregels; dataset-velden zijn nodig voor updateStatus.
    const options = Array.from(new Set([order.status, ...STATUSES].filter(Boolean))).map((status) => `<option value="${status}"${status === order.status ? " selected" : ""}>${status}</option>`);
    const items = (order.items ?? [])
        .map((item) => `<div class="order-item-line">${item.quantity}× ${item.productName} (${item.productCategory}) – ${formatCurrency(item.price)}</div>`)
        .join("") || "Geen producten";
    return `
		<tr data-email="${order.userEmail}" data-created="${order.createdAt}">
			<td class="o-email">${order.userEmail}</td>
			<td class="o-date">${formatDate(order.createdAt)}</td>
			<td class="o-total">${formatCurrency(order.total)}</td>
			<td class="o-items">${items}</td>
			<td><span class="status-badge">${order.status || "Onbekend"}</span></td>
			<td>
				<select class="status-select">${options.join("")}</select>
				<button type="button" class="save-status-btn">Opslaan</button>
			</td>
		</tr>
	`;
}
async function updateStatus(row, btn) {
    // Sla een nieuwe status voor deze rij op en update de badge/select.
    const select = row.querySelector(".status-select");
    const badge = row.querySelector(".status-badge");
    const newStatus = select?.value;
    const email = row.dataset.email;
    const createdAt = row.dataset.created;
    const current = badge?.textContent ?? "";
    if (!select || !badge || !email || !createdAt || !newStatus || newStatus === current)
        return;
    btn.disabled = true;
    btn.textContent = "Opslaan...";
    try {
        await orderService.updateStatus(email, createdAt, newStatus);
        badge.textContent = newStatus;
    }
    catch (error) {
        console.error(error);
        alert("Kon status niet bijwerken.");
        select.value = current;
    }
    finally {
        btn.disabled = false;
        btn.textContent = "Opslaan";
    }
}
function showMessage(message) {
    // Vervang de body met één melding zodat de tabel niet leeg oogt.
    if (tbody)
        tbody.innerHTML = `<tr><td class="table-message" colspan="6">${message}</td></tr>`;
}
const formatCurrency = (value) => 
// Format bedrag in euro's; null/undefined wordt 0.
new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value ?? 0);
const formatDate = (value) => {
    // Leesbare datum/tijd; bij ongeldige datum het originele veld tonen.
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleString("nl-NL");
};
