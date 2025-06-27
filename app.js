<script type="module">
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

        window.handleRegister = (e) => {
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
                    alert('Kayıt başarılı!');
                    showPage('dashboard');
                    updateDashboard();
                })
                .catch(error => alert('Hata: ' + error.message));
        };

        window.handleLogin = (e) => {
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

        window.handleLogout = () => {
            signOut(auth)
                .then(() => {
                    alert('Çıkış yapıldı.');
                    showPage('home');
                })
                .catch(error => alert('Hata: ' + error.message));
        };

        function updateDashboard() {
            const user = auth.currentUser;
            if (user) {
                const name = user.displayName;
                document.getElementById('user-name').innerText = name && name.trim().length > 0 ? name : 'Kullanıcı';
            }
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                showPage('dashboard');
                updateDashboard();
            } else {
                showPage('home');
            }
        });
function showPage(id) {
            document.querySelectorAll('section.page').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(id).classList.add('active'); 
}
window.showPage = showPage;

    </script>
