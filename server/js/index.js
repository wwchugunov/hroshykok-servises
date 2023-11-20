'use strict';
const loginForm = document.querySelector('.login-wrap');
const signIn = loginForm.querySelector('.sign-in-htm');
const signInCheckBox = signIn.querySelector('.check');
const signUp = loginForm.querySelector('.sign-up-htm');


function processAuthorizationForm() {
    event.preventDefault();
    const mainNode = this.parentElement.parentElement;
    const outputField = mainNode.querySelector('.error-message');
    let request;
    if (mainNode.classList.contains('sign-up-htm')) {
        request = {
            email: mainNode.children[0].children[1].value,
            password: mainNode.children[1].children[1].value,
            passwordcopy: mainNode.children[2].children[1].value,
            name: mainNode.children[3].children[1].value,
        }

    } else if (mainNode.classList.contains('sign-in-htm')) {
        request = {
            email: mainNode.children[0].children[1].value,
            password: mainNode.children[1].children[1].value
        }
        if (signInCheckBox.checked) {
            localStorage.email = mainNode.children[0].children[1].value;
            localStorage.password = mainNode.children[1].children[1].value;
        } else {
            delete localStorage.email;
            delete localStorage.password;
        }
    }
    
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    (mainNode.classList.contains('sign-in-htm')) ?
        xhr.open('POST', 'https://neto-api.herokuapp.com/signin') : 
        xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(request));

    function onLoad() {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
            outputField.innerHTML = response.message;
        } else {
            if (mainNode.classList.contains('sign-up-htm')) {
                outputField.innerHTML = `Пользователь ${response.name} успешно зарегистрирован`;
            }
            
            if (mainNode.classList.contains('sign-in-htm')) {
                outputField.innerHTML = `Пользователь ${response.name} успешно авторизован`;
            }
        }
    }

    function onError() {
        console.log(`${error.message}`);
    }
}

const buttons = loginForm.querySelectorAll('.button');
Array.from(buttons).forEach(button => {
    button.addEventListener('click', processAuthorizationForm);
})

function init() {
    if (localStorage.email && localStorage.password) {
        signIn.children[0].children[1].value = localStorage.email;
        signIn.children[1].children[1].value = localStorage.password;
    }
}

document.addEventListener('DOMContentLoaded', init);
