"use strict";
const inputFirstName = document.getElementById("firstName");
const inputUserName = document.getElementById("userName");
// const inputPassword: HTMLInputElement | null = document.querySelector<HTMLInputElement>("password");
// const inputPassword: HTMLInputElement = document.querySelector<HTMLInputElement>("password") as HTMLInputElement;
// const inputPassword = document.querySelector("password");
// const allElements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>("");
if (inputFirstName) {
    inputFirstName.value = "Hoi";
    inputUserName.placeholder = "Hoi";
}
const allPElements = document.querySelectorAll("p");
allPElements.forEach((value) => {
    value.className = "hidden";
});
console.log(inputUserName);
// function init(): void {
//     //verstop p-elementen
//     //set placeholders via function call
//     const allPElements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>("p");
//     allPElements.forEach((value: HTMLElement) => {
//         value.className = "hidden";
//     });
//     setPlaceholder("firstName", "Pietje");
//     setPlaceholder("lastName", " Jansen");
//     setPlaceholder("userName", "PJantje");
//     setClickEventButton();
// }
// function setPlaceholder(nameElement: string, _placeholder: string): void {
//     const element: HTMLInputElement = document.getElementById(nameElement) as HTMLInputElement;
//     element.placeholder = _placeholder;
// }
// function checkInput(): void {
//     const element: HTMLLabelElement = document.createElement("label");
//     element.textContent = "YES!!!";
//     const form: HTMLFormElement = document.querySelector<HTMLFormElement>("form") as HTMLFormElement;
//     if (form) {
//         form.appendChild(element);
//     }
// }
// function setClickEventButton(): void {
//     const btnElement: HTMLButtonElement = document.getElementById("btnSubmit") as HTMLButtonElement;
//     btnElement.addEventListener('click', checkInput);
// }
// function init(): void {
//     //verstop p-elementen
//     //set placeholders via function call
//     const allPElements: NodeListOf<HTMLElement> | null = document.querySelectorAll<HTMLElement>("p");
//     allPElements.forEach((value: HTMLElement) => {
//         value.className = "hidden";
//     });
//     setPlaceholder("firstName", "Pietje");
//     setPlaceholder("lastName", " Jansen");
//     setPlaceholder("userName", "PJantje");
//     setClickEventButton();
// }
// function setPlaceholder(nameElement: string, _placeholder: string): void {
//     const element: HTMLInputElement = document.getElementById(nameElement) as HTMLInputElement;
//     element.placeholder = _placeholder;
// }
// function checkInput(): void {
//     const element: HTMLLabelElement = document.createElement("label");
//     element.textContent = "YES!!!";
//     const form: HTMLFormElement = document.querySelector<HTMLFormElement>("form") as HTMLFormElement;
//     if (form) {
//         form.appendChild(element);
//     }
// }
// function setClickEventButton(): void {
//     const btnElement: HTMLButtonElement = document.getElementById("btnSubmit") as HTMLButtonElement;
//     btnElement.addEventListener('click', checkInput);
// }
// init();
