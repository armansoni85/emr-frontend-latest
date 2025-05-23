export const togglePasswordVisibility = (e) => {
    const input = e.target.previousElementSibling;
    if (input.type === "password") {
        input.type = "text";
        e.target.innerText = "visibility";
    } else {
        input.type = "password";
        e.target.innerText = "visibility_off";
    }
};