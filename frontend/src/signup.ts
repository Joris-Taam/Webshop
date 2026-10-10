import { User } from "./types/user.js";

/**
 * Initialize function for the signup.html page
 */
function init(): void {
	const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;
	form.addEventListener("submit", (event: Event) => {
		event.preventDefault();
		handleSubmitButton().catch((error) => {
			console.log(error);
		});
	});
}

/**
 * Call back function of the submit button
 */
async function handleSubmitButton(): Promise<void> {
	try {
		hideErrorMessages();
		checkInput();
		await signup();
	} catch (error) {
		handleError(error as Error);
	}
}

/**
 * Function for hiding old error messages when the submit button is pressed
 */
function hideErrorMessages(): void {
	hideHTMLElement("firstnameError");
	hideHTMLElement("lastnameError");
	hideHTMLElement("emailError");
	hideHTMLElement("passwordError");
	hideHTMLElement("passwordMatchError");
	hideHTMLElement("apiError");
}

/**
 * Helper function for hiding an HTML-element
 *
 * @param id The id of the HTML-element
 */
function hideHTMLElement(id: string): void {
	const errorElement: HTMLElement | null = document.getElementById(id);
	if (errorElement !== null) {
		errorElement.setAttribute("class", "hidden");
	}
}

/**
 * Function handling of an error if one was thrown
 *
 * @param error The error which was thrown
 */
function handleError(error: Error): void {
	if ("firstname" === error.message) {
		showErrorElement("firstnameError", "firstnameSection", "Vul in je voornaam.");
	}
	if ("lastname" === error.message) {
		showErrorElement("lastnameError", "lastnameSection", "Vul in je achternaam.");
	}
	if ("email" === error.message) {
		showErrorElement("emailError", "loginDetails", "Vul in je email.");
	}
	if ("password" === error.message) {
		showErrorElement("passwordError", "loginDetails", "Vul in je wachtwoord.");
	}
	if ("passwordMatch" === error.message) {
		showErrorElement("passwordMatchError", "loginDetails", "Wachtwoorden komen niet overeen.");
	}
	if (error.message.startsWith("apiError:")) {
		const apiErrorMessage = error.message.replace("apiError: ", "");
		showErrorElement("apiError", "loginDetails", apiErrorMessage);
	}
}

/**
 * Function for displaying an error message via the error css class
 *
 * @param id The id of the HTML-element for displaying an error
 * @param idParent The id of the parent HTML-element of the HTML-element for displaying an error
 * @param message The error message which must be displayed
 */
function showErrorElement(id: string, idParent: string, message: string): void {
	let errorElement: HTMLElement | null = document.getElementById(id);
	if (errorElement === null) {
		errorElement = createErrorElement(id, message);
		addElementToParent(errorElement, idParent);
	}
	errorElement.setAttribute("class", "error");
}

/**
 * Helper function for setting the parent child relation between two HTML-elements
 *
 * @param element The child HTML-element
 * @param idParent The id of the parent HTML-element
 */
function addElementToParent(element: HTMLElement, idParent: string): void {
	const parent: HTMLElement = document.getElementById(idParent) as HTMLElement;
	parent.appendChild(element);
}

/**
 * Helper function for creating an error HTML-element
 * @param id The id of the error HTML-element
 * @param errorMessage The error message which will be displayed
 * @returns An HTML-element (<p></p>) for displaying the given error message
 */
function createErrorElement(id: string, errorMessage: string): HTMLElement {
	const errorElement: HTMLElement = document.createElement("p");
	errorElement.innerText = errorMessage;
	errorElement.setAttribute("id", id);
	return errorElement;
}

/**
 * Helper function for checking the input of a user on client side
 */
function checkInput(): void {
	checkInputFirstname();
	checkInputLastname();
	checkInputEmail();
	checkInputPassword();
	checkPasswordMatch();
}

/**
 * Function for checking the input of the firstname by the user
 */
function checkInputFirstname(): void {
	const firstname: HTMLInputElement = document.getElementById("firstname") as HTMLInputElement;
	if (firstname.value === "" || firstname.value.trim() === "") {
		throw new Error("firstname");
	}
}

/**
 * Function for checking the input of the lastname by the user
 */
function checkInputLastname(): void {
	const lastname: HTMLInputElement = document.getElementById("lastname") as HTMLInputElement;
	if (lastname.value === "" || lastname.value.trim() === "") {
		throw new Error("lastname");
	}
}

/**
 * Function for checking the input of the email by the user
 */
function checkInputEmail(): void {
	const email: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
	if (email.value === "" || email.value.trim() === "") {
		throw new Error("email");
	}
	// Basic email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.value)) {
		throw new Error("email");
	}
}

/**
 * Function for checking the input of the password by the user
 */
function checkInputPassword(): void {
	const password: HTMLInputElement = document.getElementById("wachtwoord") as HTMLInputElement;
	if (password.value === "" || password.value.length < 6) {
		throw new Error("password");
	}
}

/**
 * Function for checking if passwords match
 */
function checkPasswordMatch(): void {
	const password: HTMLInputElement = document.getElementById("wachtwoord") as HTMLInputElement;
	const confirmPassword: HTMLInputElement = document.getElementById(
		"herhaalWachtwoord"
	) as HTMLInputElement;
	if (password.value !== confirmPassword.value) {
		throw new Error("passwordMatch");
	}
}

/**
 * The function for signing up the user. This is an async function!
 */
async function signup(): Promise<void> {
	const firstname: HTMLInputElement = document.getElementById("firstname") as HTMLInputElement;
	const lastname: HTMLInputElement = document.getElementById("lastname") as HTMLInputElement;
	const infix: HTMLInputElement = document.getElementById("tussenvoegsel") as HTMLInputElement;
	const email: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
	const password: HTMLInputElement = document.getElementById("wachtwoord") as HTMLInputElement;

	const signupData: SignupData = new SignupData(
		email.value.trim(),
		password.value,
		firstname.value.trim(),
		infix.value.trim(),
		lastname.value.trim()
	);

	const result: ResponseSignupData = await createPostRequest(signupData);

	console.log(`User created: ${result.user.email}`);
	// Optionally redirect to login page or show success message
	window.location.href = "/";
}

/**
 * Data class for the signup data and making the signup call to the back end
 */
class SignupData {
	/**
	 * Constructor for making an object of the SignupData class
	 */
	public constructor(
		public email: string,
		public password: string,
		public firstname: string,
		public infix: string,
		public lastname: string
	) {}
}

/**
 * Interface for parsing the response from the back end
 */
interface ResponseSignupData {
	message: string;
	user: User;
}

/**
 * The function for posting the user data to the back end. This is an async function!
 * @param data The signup data to send
 * @returns The response data from the server
 */
async function createPostRequest(data: SignupData): Promise<ResponseSignupData> {
	const response = await fetch("http://localhost:4001/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const responseData = (await response.json()) as ResponseSignupData | { error?: string };

	if (!response.ok) {
		const errorData = responseData as { error?: string };
		const errorMessage = errorData.error || response.statusText;
		throw new Error(`apiError: ${errorMessage}`);
	}

	return responseData as ResponseSignupData;
}

//Function call
init();
