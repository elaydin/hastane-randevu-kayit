// ELA YAREN AYDIN / HASTANE RANDEVU SİSTEMİ PROJE
let selectedTime = null;

function validateAndNext() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const tc = document.getElementById('tc').value;
    const dob = document.getElementById('dob').value;
    const today = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD formatında)

    let isValid = true;

    if (name === '') {
        document.getElementById('nameError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('nameError').classList.remove('visible');
    }

    if (surname === '') {
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

    if (dob === '') {
        document.getElementById('dobError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('dobError').classList.remove('visible');
        if (dob > today) { // geçmiş bir tarih seçilmeli
            document.getElementById('birthDateError').classList.add('visible');
            isValid = false;
        } else {
            document.getElementById('birthDateError').classList.remove('visible');
        }
    }

    if (isValid) {
        document.getElementById('section1').classList.remove('active');
        document.getElementById('section2').classList.add('active');
    }
}

function validateAndNext2() {
    const clinic = document.getElementById('clinic').value;
    const hospital = document.getElementById('hospital').value;
    const doctor = document.getElementById('doctor').value;

    let isValid = true;

    if (clinic === '') {
        document.getElementById('clinicError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('clinicError').classList.remove('visible');
    }

    if (hospital === '') {
        document.getElementById('hospitalError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('hospitalError').classList.remove('visible');
    }
    if (doctor === '') {
        document.getElementById('doctorError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('doctorError').classList.remove('visible');
    }

    if (isValid) {
        document.getElementById('section2').classList.remove('active');
        document.getElementById('section3').classList.add('active');
    }
}

function prevSection(section) {
    document.getElementById('section' + (section + 1)).classList.remove('active');
    document.getElementById('section' + section).classList.add('active');
}

function selectTime(time) {
    selectedTime = time; // saat seçimi
    const timeButtons = document.querySelectorAll('.time-slot');
    timeButtons.forEach(button => button.style.backgroundColor = '#cdd1df');

    document.querySelector(`button[onclick="selectTime('${time}')"]`).style.backgroundColor = '#5a6e9b'; // seçilen saati renklendirir
}

function saveAppointment() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const tc = document.getElementById('tc').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const clinic = document.getElementById('clinic').value;
    const hospital = document.getElementById('hospital').value;
    const doctor = document.getElementById('doctor').value;

    const appointmentDate = document.getElementById('appointment-date').value;

    let isValid = true;

    if (appointmentDate === '') {
        document.getElementById('appointmentDateEmptyError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('appointmentDateEmptyError').classList.remove('visible');
        const date = new Date(appointmentDate);
        const today = new Date();
        
        // tarihin geçmiş olup olmadığını kontrol eder
        if (date < today) {
            document.getElementById('appointmentDatePastError').classList.add('visible');
            isValid = false;
        } else {
            document.getElementById('appointmentDatePastError').classList.remove('visible');
            
            const day = date.getDay();
            if (day === 0 || day === 6) { // Cumartesi veya Pazar değerlerini kontrol eder
                document.getElementById('appointmentDateError').classList.add('visible');
                isValid = false;
            } else {
                document.getElementById('appointmentDateError').classList.remove('visible');
            }
        }
    }

    if (selectedTime === null) {
        document.getElementById('timeError').classList.add('visible');
        isValid = false;
    } else {
        document.getElementById('timeError').classList.remove('visible');
    }

    if (isValid) {
        // randevu kartı bastırılır
        const resultContent = `
        <div class="result-content">
            <p><span class="title">Hasta Bilgileri</span></p>
            <p><span class="value">${name} ${surname}</span></p>
            <p><span class="label">TC Kimlik No:</span> <span class="value">${tc}</span></p>
            <p><span class="label">Doğum Tarihi:</span> <span class="value">${dob}</span></p>
            <p><span class="label">Telefon No:</span> <span class="value">${phone}</span></p>
            
            <p><span class="title">Hastane ve Poliklinik Bilgileri</span></p>
            <p><span class="label">Hastane:</span> <span class="value">${hospital}</span></p>
            <p><span class="label">Poliklinik / Doktor:</span> <span class="value">${clinic} / ${doctor}</span></p>
            
            <p><span class="title">Randevu Bilgileri</span></p>
            <p><span class="label">Randevu Tarihi / Saati:</span> <span class="value">${appointmentDate} / ${selectedTime}</span></p>
        </div>
    `;

    document.getElementById('resultContent').innerHTML = resultContent;
        document.getElementById('section3').classList.remove('active');
        document.getElementById('resultSection').style.display = 'block';
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // accordion func
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});
