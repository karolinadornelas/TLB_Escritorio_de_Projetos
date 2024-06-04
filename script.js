var firebaseConfig = {
    apiKey: "AIzaSyABbcwfsIIyEOH8a9QcrVe4sA1atielVFo",
    authDomain: "ep-login-8bf71.firebaseapp.com",
    projectId: "ep-login-8bf71",
    storageBucket: "ep-login-8bf71.appspot.com",
    messagingSenderId: "978251527389",
    appId: "1:978251527389:web:319e79db1e3835ae159734",
    measurementId: "G-1NZ5G5LWGP"
};

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth()
    const database = firebase.database()

function register () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    department = document.getElementById('department').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    if (validate_field(full_name) == false || validate_field(department) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser
        var database_ref = database.ref()
        var user_data = {
        email : email,
        full_name : full_name,
        department : department,
        last_login : Date.now()
}
    //push
    database_ref.child('users/' + user.uid).set(user_data)
        alert('Usuário criado')
    })
    .catch(function(error) {
      //alertas de erro
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })
}  

function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email ou senha inválidos')
        return
    }
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser
        //adicionando usuario
        var database_ref = database.ref()
        var user_data = {
        last_login : Date.now()
    }
    //push
    database_ref.child('users/' + user.uid).update(user_data)
    alert('Usuário Logado')
    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true){
    return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
