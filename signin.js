document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.textContent = visible ? "Show" : "Hide";
    button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  });
});

function setFieldError(input, message) {
  const error = document.querySelector(`[data-error-for="${input.id}"]`);
  const wrapper = input.closest(".input-form");
  if (error) error.textContent = message;
  if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
  return Boolean(message);
}

function validateForm(form) {
  let hasErrors = false;
  form.querySelectorAll("input[required], select[required]").forEach((input) => {
    let message = "";
    if (!input.value.trim()) message = "This field is required.";
    else if (input.type === "email" && !input.validity.valid) message = "Enter a valid email address.";
    else if (input.type === "tel" && !input.validity.valid) message = "Enter a valid phone number.";
    else if (input.type === "password" && input.value.length < 6) message = "Use at least 6 characters.";
    hasErrors = setFieldError(input, message) || hasErrors;
  });
  return !hasErrors;
}

document.querySelectorAll(".auth-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    message.textContent = "";
    if (!validateForm(form)) return;
    message.textContent = form.id === "signup-form"
      ? "Account details look good. Your account is ready to connect."
      : "You’re signed in. Welcome back to Find My Crib.";
    form.reset();
  });
});

document.querySelector("[data-action='forgot']")?.addEventListener("click", () => {
  const message = document.querySelector("#signin-form .form-message");
  message.textContent = "Enter your email above and we’ll help you reset your password.";
  document.querySelector("#signin-email").focus();
});

