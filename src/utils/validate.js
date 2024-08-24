export const validate = (name, email, password) => {
    const emailError = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const passwordError = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    const nameError = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(name);

    // if (!nameError) return "Invalid name!";
    if (!emailError) return "Invalid email!"
    if (!passwordError) return "Invalid password!";

    return null;
}