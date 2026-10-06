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


function deleteTask() {
    console.log("Deleting Task");

    let btn = $(this);

    let taskElement = btn.parents(".task");

    let id = taskElement.attr("id")

    $.ajax({
        type: "DELETE",
        url: API + `/${id}`,
        success: function(deleted){
            taskElement.fadeOut(500, function() {
                taskElement.remove();
            });
            console.log(deleted);
        },

        error: function (err) {
            console.log(err);
        }
    });
    
}

function dsiplayTask(task){
    let syntax = `
        <div class="task" id="${task.id}" style="border-left-color:${task.color}">
            <div class="info">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
            </div>

            <label class="status">${task.status}</label>
            
            <div class="date-budget">
                <label>Due: ${task.due}</label> 
                <label>Budget: ${task.budget}</label>
            </div>
            <button class="btn-delete">Delete</button>
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

function filter(status){
    if(status === "All"){
        $(".task").show();
    } else {
        $(".task").hide();
    }

    $(".task").each(function() {
        let taskStatus = $(this).find("status").text();

        if(taskStatus === status) {
            $(this).show();
        }
    });
}

function init() {
    console.log("Hello world!");

    $("#btnSave").click(saveTask);
    $("#btnAll").click(function () {
        filter("All");
    });
    $("#btnDone").click(function () {
        filter("Completed");
    });
    $("#btnToDo").click(function () {
        filter("New");
    });

    $(".list").on("click", ".btn-delete", deleteTask);

    loadTasks();
}

window.onload = init;