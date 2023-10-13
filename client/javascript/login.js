document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
        localStorage.setItem("token",data.token)
        localStorage.setItem("access_lvl", data.access_lvl);
        localStorage.setItem("user_id", data.user_id);
        window.location.assign("home.html")
        alert("Logged in!");
        
    } else {
        alert(data.error);
    }
})
