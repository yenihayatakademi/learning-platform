import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBjb6HPt-LhEmZxvF7CuL4607RrkRXy4g",
    authDomain: "yenihayatakademi-b1369.firebaseapp.com",
    projectId: "yenihayatakademi-b1369",
    storageBucket: "yenihayatakademi-b1369.firebasestorage.app",
    messagingSenderId: "1058235271846",
    appId: "1:1058235271846:web:6c03de725888599be70267",
    measurementId: "G-VCPDB518BJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ REGISTER FUNCTION
window.handleRegister = function (e) {
    e.preventDefault();
    const fullName = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return updateProfile(userCredential.user, {
                displayName: fullName
            });
        })
        .then(() => {
            alert("Kayıt başarılı!");
            showPage("dashboard");
            updateDashboard();
        })
        .catch(error => {
            alert("Hata: " + error.message);
        });
};

// ✅ LOGIN FUNCTION
window.handleLogin = function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Giriş başarılı!');
            showPage('dashboard');
            updateDashboard();
        })
        .catch(error => alert('Hata: ' + error.message));
};

// ✅ LOGOUT FUNCTION
window.handleLogout = function () {
    signOut(auth)
        .then(() => {
            alert('Çıkış yapıldı.');
            showPage('home');
        })
        .catch(error => alert('Hata: ' + error.message));
};

// ✅ UPDATE DASHBOARD NAME
function updateDashboard() {
    const user = auth.currentUser;
    if (user) {
        const name = user.displayName;
        document.getElementById('user-name').innerText = name && name.trim().length > 0 ? name : 'Kullanıcı';
    }
}

// ✅ HANDLE LOGIN STATE
onAuthStateChanged(auth, (user) => {
    if (user) {
        showPage('dashboard');
        updateDashboard();
    } else {
        showPage('home');
    }
});

// ✅ PAGE SWITCH FUNCTION
function showPage(id) {
    document.querySelectorAll('section.page').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}
window.showPage = showPage;

// ✅ LEVEL TEST FUNCTION
window.evaluateTest = function (event) {
    event.preventDefault();

    const result = document.getElementById('result');
    let score = 0;
    const total = 5; // or your question count

    const answers = document.querySelectorAll('input[type="radio"]:checked');

    answers.forEach(answer => {
        if (answer.value === "true") {
            score++;
        }
    });

    let level = "A1";
    if (score >= 4) level = "B1";
    if (score === total) level = "B2-C1";

    result.textContent = `Sonuç: ${score}/${total} doğru - Tahmini Seviye: ${level}`;
};
const levelQuestions = [
    // A1
    { q: "I ___ a student.", options: ["is", "am", "are", "be"], a: "am" },
    { q: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], a: "goes" },
    { q: "This is ___ book.", options: ["me", "my", "mine", "I"], a: "my" },
    { q: "They ___ happy.", options: ["is", "are", "am", "be"], a: "are" },
    { q: "What ___ your name?", options: ["am", "is", "are", "be"], a: "is" },

    // A2
    { q: "We ___ breakfast at 8 o'clock.", options: ["eat", "eats", "eated", "ate"], a: "eat" },
    { q: "___ you like coffee?", options: ["Are", "Do", "Did", "Does"], a: "Do" },
    { q: "She can ___ English and Spanish.", options: ["speaks", "speaking", "speak", "spoke"], a: "speak" },
    { q: "He ___ in Istanbul last year.", options: ["live", "lived", "living", "lives"], a: "lived" },
    { q: "The opposite of ‘easy’ is ___", options: ["hard", "soft", "slow", "fast"], a: "hard" },

    // B1
    { q: "I have been studying English ___ 2 years.", options: ["since", "for", "by", "during"], a: "for" },
    { q: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], a: "were" },
    { q: "He said he ___ go to the party.", options: ["can't", "won't", "wouldn't", "didn't"], a: "wouldn't" },
    { q: "She enjoys ___ novels in her free time.", options: ["to read", "read", "reading", "reads"], a: "reading" },
    { q: "It was the ___ book I’ve ever read.", options: ["bad", "worse", "worst", "baddest"], a: "worst" },

    // B2
    { q: "Despite ___ late, he caught the train.", options: ["arrive", "arriving", "arrived", "arrival"], a: "arriving" },
    { q: "The movie was boring, ___ the special effects were good.", options: ["although", "but", "however", "because"], a: "however" },
    { q: "She was accused ___ stealing the documents.", options: ["for", "with", "of", "about"], a: "of" },
    { q: "He must have ___ the news by now.", options: ["heard", "hear", "hearing", "hears"], a: "heard" },
    { q: "That is the company ___ I applied to.", options: ["which", "where", "who", "whom"], a: "which" },

    // C1–C2
    { q: "His speech was full of ___ and ambiguity.", options: ["clarity", "precision", "vagueness", "elegance"], a: "vagueness" },
    { q: "She has a ___ understanding of international law.", options: ["superficial", "profound", "frivolous", "negligible"], a: "profound" },
    { q: "This hypothesis is no longer ___ by recent findings.", options: ["supported", "criticized", "perceived", "rejected"], a: "supported" },
    { q: "The professor’s lecture was highly ___ and difficult to follow.", options: ["coherent", "concise", "esoteric", "explicit"], a: "esoteric" },
    { q: "We must ___ a new strategy to stay competitive.", options: ["diminish", "devise", "depart", "defy"], a: "devise" }
];

let qIndex = 0;
let testScore = 0;

function showQuestion() {
    const q = levelQuestions[qIndex];
    const box = document.getElementById("questionBox");
    box.innerHTML = `<p><strong>Soru ${qIndex + 1}/25:</strong> ${q.q}</p>` +
        q.options.map(opt => `
            <label><input type="radio" name="answer" value="${opt}" required> ${opt}</label><br>
        `).join("");
}
window.nextQuestion = function () {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Lütfen bir cevap seçin.");
        return;
    }

    const correct = levelQuestions[qIndex].a;
    if (selected.value === correct) testScore++;

    qIndex++;

    if (qIndex < levelQuestions.length) {
        showQuestion();
    } else {
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("submitButton").style.display = "inline-block";
    }
};

window.evaluateTest = function (e) {
    e.preventDefault();
    const result = document.getElementById("result");

    let level = "A1";
    if (testScore >= 5) level = "A2";
    if (testScore >= 10) level = "B1";
    if (testScore >= 15) level = "B2";
    if (testScore >= 20) level = "C1";
    if (testScore >= 23) level = "C2";

    result.innerText = `Sonuç: ${testScore}/25 doğru - Seviye: ${level}`;
};

// show first question immediately
showQuestion();
