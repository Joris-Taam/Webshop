"use strict";
// collecting the html elements and type conversion
const loginButton = document.querySelector(".blue");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
// Click event that collects the input values
loginButton.addEventListener("click", (event) => {
    void handleLogin(event);
});
async function handleLogin(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    // If statement to check if password en email has been filled in
    if (!email || !password) {
        alert("Vul email en wachtwoord in!");
        return;
    }
    try {
        // Sends POST request to back-end
        // Sending email and password to /aut/login
        const response = await fetch("http://localhost:4001/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, //Sending JSON
            body: JSON.stringify({ email, password }),
        });
        //Awaiting response
        const payload = (await response.json());
        const data = typeof payload === "object" && payload !== null ? payload : {};
        // If response is ok message
        if (response.ok) {
            alert("Inloggen gelukt!");
            console.log("User data:", data); // For debuggin log information
        }
        // Else error message back-end
        else {
            alert(data.error ?? "Inloggen mislukt");
        }
    }
    catch (err) {
        // Error if back-end doesn't respond
        console.error(err);
        alert("Server fout, probeer later opnieuw");
    }
}
