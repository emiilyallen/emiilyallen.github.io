function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}

const checkbox = document.getElementById('showPasswd');
        const passwordInput = document.getElementById('password');

    checkbox.addEventListener('change', () => {
        passwordInput.type = checkbox.checked ? 'text' : 'password';
    });