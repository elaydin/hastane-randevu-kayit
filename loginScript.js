// ELA YAREN AYDIN / HASTANE RANDEVU SİSTEMİ PROJE 
function validateAndSignUp(event) {
    event.preventDefault(); 

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const tc = document.getElementById('signup-tc').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const today = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD formatında)
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');

    let isValid = true;

    if (firstName === '') {
        document.getElementById('firstNameError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('firstNameError').classList.remove('visible');
    }

    if (lastName === '') {
        document.getElementById('surnameError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('surnameError').classList.remove('visible');
    }

    if (tc.length !== 11 || isNaN(tc)) {
        document.getElementById('tcError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('tcError').classList.remove('visible');
    }

    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById('phoneError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('phoneError').classList.remove('visible');
    }

    if (dob === '') {
        document.getElementById('dobError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('dobError').classList.remove('visible');
        if (dob > today) { // gelecek bir tarih seçilmemeli
            document.getElementById('birthDateError').classList.add('visible');
            isValid = false;
        } else {
            document.getElementById('birthDateError').classList.remove('visible');
        }
    }

    // şifre eşleşme kontrolü
    if (password !== confirmPassword) {
        passwordError.classList.add('visible');
        isValid = false;
    } else {
        passwordError.classList.remove('visible');
    }

    if (isValid) {
        alert('Kayıt başarılı!');
        // veriler işlenebilir
    }
}

document.getElementById('signup-form').addEventListener('submit', validateAndSignUp);
