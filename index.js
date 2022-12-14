// container

const modal = document.getElementById("modal");
const btn = document.getElementById("new");
const inputFile = document.getElementById("inputFile");
const dltPupup = document.getElementById("delete");
const deletRow = document.getElementById("deleteRow");
const NewAdd = document.getElementById("NewAdd");
const cancle = document.getElementById("btncancle");
const SaveData = document.getElementById("save");
// add detaiels
const field = document.getElementById("inputFile");
const addName = document.getElementById("inputName");
const addEmail = document.getElementById("inputEmail");
const addAddr = document.getElementById("inputField");
const updateEr = document.getElementById("updateError");
const AddnameErr = document.getElementById("AddnameErr");
const AddemailErr = document.getElementById("AddemailErr");
const ADDAddressErr = document.getElementById("ADDAddressErr");

// edit detailes
const iName = document.getElementById("iName");
const iEmail = document.getElementById("iEmail");
const textarea = document.getElementById("textarea");
//  add details validation
const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const submitErr = document.getElementById("submitErr");
const AddressErr = document.getElementById("AddressErr");

let url = "https://jsonplaceholder.typicode.com/users";

const arrayFromApi = [];
let dataForTable = [];
let num = "";
let editId = "";

const buildTable = (data) => {
    let tableData = "";
    data.map((users, i) => {
        tableData += `<tr>
                <td>${i + 1}</td>
                <td>${users.name}</td>
                <td>${users.email}</td>
                <td>${users.address.city}</td>
                <td><button class="btnn" id="editbtn"onclick="editbtn(${
                    users.id
                })">Edit</button></td>
                <td><button class="btnn" id="deletbtn" onclick="Deletbtn(${
                    users.id
                })">Delete</button></td>
                </tr>`;
    });

    document.getElementById("Tdshow").innerHTML = tableData;
};

window.onload = function () {
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((objectData) => {
            editId = 1;
            document.getElementById("iName").innerHTML = "";
            iName.value = objectData[0].name;
            document.getElementById("iEmail").innerHTML = "";
            iEmail.value = objectData[0].email;
            document.getElementById("textarea").innerHTML = "";
            textarea.value = objectData[0].address.city;

            arrayFromApi.push(objectData);
            dataForTable = objectData;
            buildTable(objectData);
        });
};

// open modal NEW
function openPopup() {
    modal.classList.add("openModal");

    SaveData.disabled = false;
}

function closePopup() {
    modal.classList.remove("openModal");
    addName.value = "";
    addEmail.value = "";
    addAddr.value = "";
}

function Save() {
    const validInput = validateName() && validateEmail() && validateAddress();
    const UserName = document.getElementById("inputName");
    const Email = document.getElementById("inputEmail");
    const textArea = document.getElementById("inputField");
    SaveData.disabled = true;
    if (validInput) {
        modal.classList.remove("openModal");
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(),
        })
            .then((data) => {
                return data.json();
            })
            .then(() => {
                dataForTable.push({
                    id: dataForTable.length + 1,
                    name: UserName.value,
                    email: Email.value,
                    address: { city: textArea.value },
                });

                buildTable(dataForTable);

                document.getElementById("inputName").value = "";
                document.getElementById("inputEmail").value = "";
                document.getElementById("inputField").value = "";
            })

            .catch((err) => console.log(err));
    } else {
        SaveData.disabled = false;
        submitErr.style.display = "block";
        submitErr.innerHTML = "Please Filled Box";
        setTimeout(function () {
            submitErr.style.display = "none";
        }, 3000);

        return false;
    }
    nameErr.innerHTML = "";
    emailErr.innerHTML = "";
    AddressErr.innerHTML = "";
    submitErr.innerHTML = "";
}

function Cancle() {
    modal.classList.remove("openModal");
    addName.value = "";
    addEmail.value = "";
    addAddr.value = "";
}

function Deletbtn(id) {
    num = id;
    dltPupup.classList.add("Modal1");
}

function deletCon() {
    const newValue = dataForTable.filter(
        (newValue, index) => newValue.id != num
    );
    dltPupup.classList.remove("Modal1");

    dataForTable = newValue;
    arrayFromApi[0] = newValue;

    if (newValue.length > 0) {
        iName.value = newValue[0].name;

        iEmail.value = newValue[0].email;

        textarea.value = newValue[0].address.city;
    }
    editId = newValue[0].id;
    buildTable(newValue);
}
function No() {
    dltPupup.classList.remove("Modal1");
}

function remove() {
    dltPupup.classList.remove("Modal1");
}

function editbtn(id) {
    const foundObj = arrayFromApi[0].find((item, i) => {
        return item.id == id;
    });
    editId = id;

    iName.value = foundObj.name;

    iEmail.value = foundObj.email;

    textarea.value = foundObj.address.city;
    AddvalidName("iName") &&
        AddvalidEmail("iEmail") &&
        AddvalidAddress("textarea");
}
// Edit detailes

function update() {
    const Input =
        AddvalidName("iName") &&
        AddvalidEmail("iEmail") &&
        AddvalidAddress("textarea");
    if (Input) {
        const foundObj = arrayFromApi[0].find((item, i) => {
            return item.id == editId;
        });

        foundObj.name = document.querySelector(".Name").value;
        foundObj.email = document.querySelector(".Email").value;
        foundObj.address.city = document.getElementById("textarea").value;

        buildTable(arrayFromApi[0]);
    } else {
        updateEr.innerHTML = "Please Filled Box...";
        setTimeout(function () {
            updateEr.style.display = "none";
        }, 3000);

        return false;
    }
}

// Reset table

function clearFuncunction() {
    const res = arrayFromApi[0].find((item, i) => {
        return item.id == editId;
    });

    iName.value = res.name;

    iEmail.value = res.email;

    textarea.value = res.address.city;
}

// validation

// Edit details validation

function AddvalidName(fieldName) {
    const correctway = /^[A-za-z]+$/;
    let name = document.getElementById(fieldName).value;

    if (name === "") {
        AddnameErr.innerHTML = "Can't be blank!";
        return false;
    }
    if (name.length < 5) {
        AddnameErr.innerHTML = "Must be  at least 5 characters";
        return false;
    }
    if (name.length > 30) {
        AddnameErr.innerHTML = " must be less than 20 characters";
        return false;
    }
    if (name.match(correctway) === null || name.match(correctway)) {
        AddnameErr.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

        return true;
    }
}

function AddvalidEmail(fieldEmail) {
    const Email = document.getElementById(fieldEmail).value;

    const correctways = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    let correctEmail = Email.match(correctways);

    if (Email === "") {
        AddemailErr.innerHTML = "cant found";
        console.log("errr");
    }
    if (Email.length < 10) {
        AddemailErr.innerHTML = "Email is required";
        return false;
    }
    if (Email.length > 50) {
        AddemailErr.innerHTML = "Email must be less than 50 characters";
    }

    if (!correctEmail) {
        AddemailErr.innerHTML = "Email is Invalid";
        return false;
    }
    AddemailErr.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function AddvalidAddress(addressField) {
    let address = document.getElementById(addressField).value;

    if (address === "") {
        ADDAddressErr.innerHTML = "Please enter your address";
    }
    if (address.length < 10) {
        ADDAddressErr.innerHTML = "minimum 10 characters";
        return false;
    }
    if (address.length > 50) {
        ADDAddressErr.innerHTML = "maximum 50 characters";
        return false;
    }
    ADDAddressErr.innerHTML =
        '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

// Add details validation

function validateName() {
    const correctway = /^[A-za-z]+$/;
    let name = document.getElementById("inputName").value;

    if (name === "") {
        return false;
    }
    if (name.length < 5) {
        nameErr.innerHTML = "Must be  at least 5 characters";
        return false;
    }
    if (name.length > 20) {
        nameErr.innerHTML = "userName must be less than 20 characters";
        return false;
    }
    if (name.match(correctway)) {
        nameErr.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

        return true;
    }
}

function validateEmail() {
    let email = document.getElementById("inputEmail").value;
    const correctway = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    if (email === "") {
        emailErr.innerHTML = "Please enter a valid email";
    }
    if (email.length < 10) {
        emailErr.innerHTML = "Email is required";
        return false;
    }
    if (email.length > 50) {
        emailErr.innerHTML = "Email must be less than 50 characters";
    }
    if (!email.match(correctway)) {
        emailErr.innerHTML = "Email is Invalid";
        return false;
    }
    emailErr.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function validateAddress() {
    let address = document.getElementById("inputField").value;
    if (address === "") {
        AddressErr.innerHTML = "Please enter your address";
    }
    if (address.length < 10) {
        AddressErr.innerHTML = "minimum 10 characters";
        return false;
    }
    if (address.length > 50) {
        AddressErr.innerHTML = "maximum 50 characters";
        return false;
    }
    AddressErr.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}
