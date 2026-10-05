const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {   
    const title = $('#txtTitle').val();
    const desc = $('#txtDescription').val();
    const color = $('#elColor').val();
    const date = $('#selDate').val();
    const status = $('#selStatus').val();
    const budget = $('#numBudget').val();

    const taskToSave = new Task(title, desc, color, date, status, budget);

    $.ajax({
        type: "POST",
        url: API,
        data: JSON.stringify(taskToSave),
        contentType: "application/json",

        suceess: function (created) {
            console.log(created);
        },

        error: function(fails) {
            console.log(fails);
        }
    });

    dsiplayTask(taskToSave);
}

function dsiplayTask(task){
    let syntax = `
        <div class="task" style="border-left-color:${task.color}">
            <div class="info">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
            </div>

            <label class="status">${task.status}</label>
            
            <div class="date-budget">
                <label>Due: ${task.due}</label> 
                <label>Budget: ${task.budget}</label>
                </div>
        </div>`;
    
    $(".list").append(syntax);

}

function loadTasks() {
    $.ajax({
        type: "GET",
        url: API,
        dataType: "json",

        success: function (data) {
            console.log("Server responded with:", data);

            $(".list").empty();

            for (let i = 0; i < data.length; i++){
                dsiplayTask(data[i]);
            }
        },

        error: function(err) {
            console.log("Error fetching data", err);
        }
    })
}

function update() {
    $.ajax({
        type: "PUT",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/1",
        data: JSON.stringify({title: "New message"}),
        contentType: "application/json",
        success: function(response){
            console.log(response)
        },
        error: function(failure){
            console.log(failure)
        }
    })
}

function init() {
    console.log("Hello world!");

    $("#btnSave").click(saveTask);

    loadTasks();
}

window.onload = init;