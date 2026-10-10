import { contactService } from "./service/contactService.js";
/*interface AdminEditContact {
    name: string;
    email: string;
    subject: string;
    status: "new" | "inProgress" | "completed";
    createdAt: string;
    message: string;
    note: string | null;
}
*/
// Collect email + created_at from URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");
const createdAt = urlParams.get("createdAt");
if (!email || !createdAt) {
    alert("Ongeldige contactverzoek parameters.");
    throw new Error("Missing parameters");
}
async function loadContactRequest() {
    const response = await fetch(`http://localhost:4001/api/contact/${encodeURIComponent(email)}/${encodeURIComponent(createdAt)}`);
    const data = await response.json();
    // Fill form fields with fetched data
    document.getElementById("naam").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("onderwerp").value = data.subject;
    document.getElementById("bericht").value = data.message;
    document.getElementById("status").value = data.status;
    document.getElementById("notitie").value = data.note || "";
}
async function updateContact(e) {
    e.preventDefault();
    const updatedData = {
        name: document.getElementById("naam").value,
        subject: document.getElementById("onderwerp").value,
        message: document.getElementById("bericht").value,
        status: document.getElementById("status").value,
        note: document.getElementById("notitie").value,
    };
    // Try to to update the contact request
    try {
        await contactService.updateContact(email, createdAt, updatedData);
        alert("Contactverzoek bijgewerkt");
        window.location.href = "adminContactRequestOverview.html";
        // catch error with message
    }
    catch (err) {
        console.error(err);
        alert("Bijwerken mislukt.");
    }
}
document.getElementById("editContactForm")?.addEventListener("submit", updateContact);
// Load contact request data on page load
loadContactRequest();
