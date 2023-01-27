console.log("Bienvenidos a la fetch api");
console.log("Utilice estilos sencillos en bs");
let storedData = JSON.parse(localStorage.getItem("data"));
if (storedData && storedData.expiration > Date.now()) {
    console.log(storedData.data);
    let table = document.getElementById("data-table-body");

    for (let i = 0; i < storedData.data.data.length; i++) {
        let row = table.insertRow();

        let idCell = row.insertCell();
        let nameCell = row.insertCell();
        let emailCell = row.insertCell();
        let avatarCell = row.insertCell();
        let avatarImg = document.createElement("img");

        idCell.innerHTML = storedData.data.data[i].id;
        nameCell.innerHTML = storedData.data.data[i].first_name + " " + storedData.data.data[i].last_name;
        emailCell.innerHTML = storedData.data.data[i].email;
        avatarImg.src = storedData.data.data[i].avatar;
        avatarImg.classList.add("round-img");
        avatarCell.appendChild(avatarImg);
    }
} else {
    setTimeout(() => {
        fetch("https://reqres.in/api/users?page=2")
            .then(response => response.json())
            .then(data => {
                let expirationTime = Date.now() + 60000;
                localStorage.setItem("data", JSON.stringify({ data: data, expiration: expirationTime }));
                let table = document.getElementById("data-table-body");

                for (let i = 0; i < data.data.length; i++) {
                    let row = table.insertRow();

                    let idCell = row.insertCell();
                    let nameCell = row.insertCell();
                    let emailCell = row.insertCell();
                    let avatarCell = row.insertCell();
                    let avatarImg = document.createElement("img");

                    idCell.innerHTML = data.data[i].id;
                    nameCell.innerHTML = data.data[i].first_name + " " + data.data[i].last_name;
                    emailCell.innerHTML = data.data[i].email;
                    avatarImg.src = data.data[i].avatar;
                    avatarImg.classList.add("round-img");
                    avatarCell.appendChild(avatarImg);
                }
            });
    }, 4000);
}