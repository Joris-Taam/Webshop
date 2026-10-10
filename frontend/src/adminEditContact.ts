import { contactService } from "./service/contactService.js";
import { Contact } from "./types/contact.js";


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
async function loadContactRequest(): Promise<void> {
	const response = await fetch(
		`http://localhost:4001/api/contact/${encodeURIComponent(email!)}/${encodeURIComponent(
			createdAt!
		)}`
	);
	const data: Contact = await response.json();

	// Fill form fields with fetched data
	(document.getElementById("naam") as HTMLInputElement).value = data.name;
	(document.getElementById("email") as HTMLInputElement).value = data.email;
	(document.getElementById("onderwerp") as HTMLInputElement).value = data.subject;
	(document.getElementById("bericht") as HTMLTextAreaElement).value = data.message;
	(document.getElementById("status") as HTMLSelectElement).value = data.status;
	(document.getElementById("notitie") as HTMLTextAreaElement).value = data.note || "";
}
async function updateContact(e: Event) {
	e.preventDefault();

const updatedData = {
	name: (document.getElementById("naam") as HTMLInputElement).value,
	subject: (document.getElementById("onderwerp") as HTMLInputElement).value,
	message: (document.getElementById("bericht") as HTMLTextAreaElement).value,
	status: (document.getElementById("status") as HTMLSelectElement).value,
	note: (document.getElementById("notitie") as HTMLTextAreaElement).value,
};
// Try to to update the contact request
try {
    await contactService.updateContact(email!, createdAt!, updatedData);
    alert("Contactverzoek bijgewerkt");
    window.location.href = "adminContactRequestOverview.html"
    // catch error with message
} catch (err) {
    console.error(err) 
    alert("Bijwerken mislukt.");
    }
}

document.getElementById("editContactForm")?.addEventListener("submit", updateContact);

// Load contact request data on page load
loadContactRequest();
