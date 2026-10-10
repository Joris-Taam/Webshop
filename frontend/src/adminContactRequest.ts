import { contactService } from "./service/contactService.js";
import { Contact } from "./types/contact.js";
/*
interface AdminContactRequest {
	name: string;
	email: string;
	subject: string;
	status: "new" | "inProgress" | "completed";
	createdAt: string;
	message: string;
	note: string | null;
}
*/
async function fetchAllContactRequests(): Promise<void> {
	try {
		const response = await fetch("http://localhost:4001/api/contact");
		const data: Contact[] = await response.json();



		const tableBody = document.getElementById("contactTableBody");
		if (!tableBody) {
			console.error("Table body not found");
			return;
		}

		const template = document.getElementById("contactRowTemplate") as HTMLTemplateElement;
		data.forEach((contact: Contact) => {
		
				

			const row = (template.content.cloneNode(true) as DocumentFragment)
				.firstElementChild as HTMLElement;

			(row.querySelector(".c-name") as HTMLElement).textContent = contact.name;
			(row.querySelector(".c-email") as HTMLElement).textContent = contact.email;
			(row.querySelector(".c-subject") as HTMLElement).textContent = contact.subject;
			(row.querySelector(".c-message") as HTMLElement).textContent = contact.message;
			(row.querySelector(".c-status") as HTMLElement).textContent = contact.status;
			(row.querySelector(".c-date") as HTMLElement).textContent = contact.createdAt;

			const updateButton = row.querySelector(".update-button");
			updateButton?.addEventListener("click", () => {
		
				const mysqlDate = contact.createdAt.replace("T", " ").replace(".000Z", "");
				window.location.href = `adminEditContact.html?email=${encodeURIComponent(contact.email)}` +
					`&createdAt=${encodeURIComponent(mysqlDate)}`;
			});
			// Delete button functionality
			const deleteButton = row.querySelector(".delete-button");
			deleteButton?.addEventListener("click", async () => {
				if (!confirm("Weet je zeker dat je dit contactverzoek wilt verwijderen?")) return;

				try {
					const mysqlDate = contact.createdAt.replace("T", " ").replace(".000Z", "");
					await contactService.deleteContact(contact.email, mysqlDate);
					row.remove();
				} catch (error) {
					console.error("Failed to delete contact", error);
					alert("Verwijderen mislukt");
				}
			});
			tableBody.appendChild(row);
		});
	} catch (error) {
		console.error("Er is iets misgegaan", error);
	}
}
fetchAllContactRequests();
