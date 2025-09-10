const form = document.querySelector("form[action='sendorder.php']"),
    phoneInput = form.querySelector("input[name='userPhone']"),
    nameInput = form.querySelector("input[name='userName']"),
    errorTel = document.querySelector(".error"),
    errorName = document.querySelector(".errorName"),
    maxLength = 30,
    minLength = 3

phoneInput.addEventListener("focus", function () {
    if (!phoneInput.value.startsWith("+380")) {
        phoneInput.value = "+380"
    }
})

phoneInput.addEventListener("input", function () {
    let inputValue = phoneInput.value,
        cleanedValue = inputValue.replace(/[^\d+]/g, "")

    if (!cleanedValue.startsWith("+380")) {
        cleanedValue = "+380" + cleanedValue.slice(3)
    }

    if (cleanedValue.length > 13) {
        cleanedValue = cleanedValue.slice(0, 13)
    }

    phoneInput.value = cleanedValue

    const validInput = isValidPhoneNumber(cleanedValue)

    if (validInput) {
        phoneInput.style.borderColor = 'green'
        phoneInput.style.color = '#121212'
        errorTel.style.display = "none"
    } else {
        phoneInput.style.borderColor = '#EB4242'
        phoneInput.style.color = '#EB4242'
        errorTel.style.display = "block"
    }
})


form.addEventListener("submit", (e) => {
    const phone = phoneInput.value.trim(),
        name = nameInput.value.trim()

    let valid = true

    if (!phone || !isValidPhoneNumber(phone) || phone.length < 13) {
        errorTel.style.display = "block"
        phoneInput.style.borderColor = '#EB4242'
        valid = false
    } else {
        errorTel.style.display = "none"
        phoneInput.style.borderColor = 'green'
    }

    if (name.length < minLength || name.length > maxLength) {
        errorName.style.display = "block"
        nameInput.style.borderColor = '#EB4242'
        valid = false
    } else {
        errorName.style.display = "none"
        nameInput.style.borderColor = 'green'
    }

    if (!valid) {
        console.log("+");
        e.preventDefault()
    }
})

function isValidPhoneNumber(phoneNumber) {
    return /^\+380\d{9}$/.test(phoneNumber)
}
