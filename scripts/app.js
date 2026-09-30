$('#btnSave').click(function () {

    const title = $('#txtTitle').val();
    const desc = $('#txtDescription').val();
    const color = $('#elColor').val();
    const date = $('#selDate').val();
    const status = $('#selStatus').val();
    const budget = $('#numBudget').val();

    const newTask = new Task(title, desc, color, date, status, budget);

    const newItem = document.createElement("p")

    let list = document.getElementById("list");

    newItem.textContent = `${title} ${date} ${status}`;

    list.appendChild(newItem);

    });

function saveTask() {
    const taskToSave = new Task();
}

function init() {
    console.log("Hello world!");
}

window.onload = init;