document.getElementById("register").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    console.log(form)
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        alert("Registered!");
        window.location.assign("login.html")
    } else {
        alert(data.error);
    }
})