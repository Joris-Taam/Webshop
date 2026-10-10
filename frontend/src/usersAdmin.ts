// usersAdmin.ts or your TypeScript file

const API_URL = "http://localhost:4001/api/user";

async function loadUsers(): Promise<void> {
	const output = document.getElementById("output") as HTMLElement;

	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Failed to fetch users");

		const users: unknown = await response.json(); // JSON is unknown by default
		output.textContent = JSON.stringify(users, null, 2);
	} catch (err: unknown) {
		if (err instanceof Error) {
			output.textContent = `Error loading users: ${err.message}`;
			console.error(err);
		} else {
			output.textContent = "Error loading users";
			console.error(err);
		}
	}
}

async function createUser(): Promise<void> {
	const emailInput = document.getElementById("email") as HTMLInputElement;
	const passwordInput = document.getElementById("password") as HTMLInputElement;
	const firstNameInput = document.getElementById("firstName") as HTMLInputElement;
	const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
	const roleTitleInput = document.getElementById("roleTitle") as HTMLInputElement;

	const userData = {
		email: emailInput.value,
		password: passwordInput.value,
		firstName: firstNameInput.value,
		lastName: lastNameInput.value,
		roleTitle: roleTitleInput.value,
	};

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`Failed to create user: ${response.status}`);
		}

		const result: unknown = await response.json(); // JSON is unknown by default
		console.log("User created:", result);

		// Call loadUsers safely
		await loadUsers();
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err);
			alert(`Error creating user: ${err.message}`);
		} else {
			console.error(err);
			alert("Error creating user");
		}
	}
}
// changed name init
function initUsersAdmin(): void {
	const loadUserButton = document.getElementById("loadUsersButton") as HTMLButtonElement;
	const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

	loadUserButton.addEventListener("click", () => void loadUsers());
	submitButton.addEventListener("click", () => void createUser());
}

initUsersAdmin();
