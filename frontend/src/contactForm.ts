const form = document.getElementById("contactForm") as HTMLFormElement;
// Submit event listener
form.addEventListener("submit", async (e: Event) => {
	e.preventDefault();
	// Collect form data
	const naam = (document.getElementById("naam") as HTMLInputElement).value;
	const email = (document.getElementById("email") as HTMLInputElement).value;
	const onderwerp = (document.getElementById("onderwerp") as HTMLInputElement).value;
	const bericht = (document.getElementById("bericht") as HTMLTextAreaElement).value;

	// To define variable names from dutch to english
	const contactData = {
		name: naam,
		email: email,
		subject: onderwerp,
		message: bericht,
	};
	try {
		const response = await fetch("http://localhost:4001/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contactData),
		});

		const result = await response.json();

		if (response.ok) {
			alert("Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.");
			form.reset();
		} else {
			alert("Fout bij het verzenden van het contactformulier." + result.error);
		}
	} catch (error) {
		console.error("Error submitting contact form:", error);

		alert(
			"Er is een fout opgetreden bij het verzenden van het formulier. Probeer het later opnieuw."
		);
	}
});
