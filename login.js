document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", performLogin);
});

function performLogin() { 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const loginData = new URLSearchParams();
    loginData.append('txtUser', username);
    loginData.append('txtPassword', password);
    loginData.append('browserName', navigator.userAgent);
    
    fetch('http://localhost:8090/General/restForm/restLoginAction.request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: loginData
    })
    .then(response => response.json())
    .then(data => {  
                    if (data.msg) {
                        alert(data.msg);
                    } else {
                        //"Login successful"
                        // Navigate to another page
                        window.location.href = "notes_page.html";
                    }
    })
    .catch(error => console.error('Error:', error));
}
