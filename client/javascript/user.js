const loadUserInfo = async() => {
    try {
        const response = await fetch("http://localhost:3000/users/");
        const user = await response.json();
        if (response.status == 200) {
          const name = document.getElementById("name");
          const email = document.getElementById("email");
          const password = document.getElementById("password");
          name.textContent = user["name"];
          name.textContent = user["email"];
          name.textContent = user["password"];
    
          
        } else {
          //window.location.assign("./index.html");
        }
      } catch (error) {
        console.log(error);
      }
    }
loadUserInfo()

document.getElementById("userInfo").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "PATCH",
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

    const response = await fetch("http://localhost:3000/users/", options);
    const data = await response.json();

    if (response.status == 201) {
        alert("Updated!");
        window.location.assign("login.html")
    } else {
        alert(data.error);
    }
})