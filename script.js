// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABbcwfsIIyEOH8a9QcrVe4sA1atielVFo",
  authDomain: "ep-login-8bf71.firebaseapp.com",
  projectId: "ep-login-8bf71",
  storageBucket: "ep-login-8bf71.appspot.com",
  messagingSenderId: "978251527389",
  appId: "1:978251527389:web:319e79db1e3835ae159734",
  measurementId: "G-1NZ5G5LWGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function register() {
  full_name = document.getElementById("full_name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  department = document.getElementById("department").value;
}

if (validate_email(email) == false || validate_password(password) == false) {
  alert("Email ou senha inválidos");
  return;
  //para o código
}
if (validate_department(department) == false) {
  alert("Verifique o campo de Gerência");
  return;
}

auth.createUserWithEmailAndPassword(email, password).then(function () {
  var user = auth.currentUser;
  //registrando no firebase
  var database_ref = database.ref();

  var user_data = {
    email: email,
    full_name: full_name,
    department: department,
    last_login: Date.now(),
  };

  //user.uid é referencia que vem com o firebase para referenciar o id do usuario
  database_ref.child("users/" + user.uid).set(user_data);
});

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_department(department) {
  if (department > 6) {
    return false;
  } else {
    return true;
  }
}
