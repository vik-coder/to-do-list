/**
 * App for making a simple todo list
 * Author: boosmoke 
 *
 * @version 1.0.0
 */
 var TodoApp = ( function() {
    // Properties
    var button = document.getElementById('add-task');
    var input = document.getElementById('task');
    var error = document.getElementById('error-msg');
    var tasksList = document.getElementById('tasks-ul');
    var clearList = document.getElementById('clear-list');
    var addTask = document.querySelector('.add-task-button');
    var localItems = [];

    // Methods

    function testing(){
        
    }
    //TAKES ALL LIST ITEMS
    function updateLocalList(){
        var nodes = tasksList.innerHTML.trim();
        localStorage.setItem("tasks", JSON.stringify(nodes));
    }
    //CREATE LIST FROM LOCALSTORAGE AT PAGE STARTUP/REFRESH
    function createLocalList(){
        var tasks = getTaskList();
        tasks ? tasks : tasks = '';
        tasksList.innerHTML = tasks;
        checkboxCheck();
    }
    // check if checkboxes are checked
    function checkboxCheck(){
        var inputs = document.querySelectorAll('input[type = "checkbox" ]');
        if(inputs.length < 1)return;
        inputs.forEach(function(input){
            if(input.getAttribute('check') === 'true'){
                input.checked = true;
            }
        })
    }
    //CHECKBOX STYLE UPDATER
    function updateCheckBox(){
        var input = this.childNodes[0];
        var checkedBox = document.querySelector('.checked-box');
        input.getAttribute('check') === 'false' ? input.setAttribute('check', 'true') : input.setAttribute('check', 'false');
        input.checked ? input.checked = false : input.checked = true;
        console.log(checkedBox);
        if(checkedBox !== null && input.checked){
            checkedBox.classList.remove('fa-circle-thin');
            checkedBox.classList.add('fa-check-circle');
        }else{
            checkedBox.classList.remove('fa-check-circle');
            checkedBox.classList.add('fa-circle-thin');
        }
        updateLocalList();
    }
    //SETS localItems TO LOCALSTORAGE IF NOT EMPTY
    function getTaskList(){
        if(JSON.parse(localStorage.getItem("tasks")) === null) return;
        return JSON.parse(localStorage.getItem("tasks"));
    }
    //CLEAR LOCAL STORAGE
    function clearAllTasks(){
        localStorage.clear();
        while(tasksList.firstChild){
            tasksList.removeChild(tasksList.firstChild);
        }
    }
    //DELETE SELECTED TASK
    function deleteItem(e){
        tasksList.removeChild(this.parentNode);
        updateLocalList();
    }
    //IF USER PRESSES ENTER ADD ITEM
    function enterKey(e){
        if(e.keyCode === 13 || e.which === 13){
            addItem();
        }
    }
    //CREATE TASK DOM ELEMENT AND APPEND TO UL
    function createLi(value){
        //create elements
        var li = document.createElement('li'),
        checkbox = document.createElement('input'),
        label = document.createElement('label'),
        deleteButton = document.createElement('i'),
        checkDone = document.createElement('i'),
        text = document.createTextNode(value);
        //set attri
        checkbox.type = "checkbox";
        checkbox.name = value;
        checkbox.value = value;
        checkbox.setAttribute('check', false);
        deleteButton.classList.add('fa');
        deleteButton.classList.add('fa-trash-o');
        deleteButton.classList.add('delete-button');
        checkDone.classList.add('fa');
        checkDone.classList.add('fa-circle-thin');
        checkDone.classList.add('checked-box');
        label.htmlFor = value;
        label.appendChild(text);
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(checkDone);
        li.appendChild(deleteButton);
        tasksList.appendChild(li);
    }
    //ADD ITEM TO LIST AND UPDATE LOCAL STORAGE
    function addItem(){
        var value = input.value;
        error.style.display = "none";
        if(value === ""){
            errorDisplay();
        }else{
            document.getElementById('task-container').classList.remove('add-task-button-visible');
            createLi(value);
            updateLocalList();
            bindClickEvent();
            input.value = "";
        }
    }
    //ERROR MSG
    function errorDisplay(){
        error.style.display = "block";
    }
    //GET THE DATE
    function getDate(){
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dateObj = new Date();
        var month = months[dateObj.getUTCMonth()]; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var div = document.getElementById('title-date');
        var formatDate = month + " " + day + ", " + year;
        div.innerHTML = formatDate;
    }
    //DISPLAY THE ADD TASK INPUT
    function displayAddTask(){
        document.getElementById('task-container').classList.toggle('add-task-button-visible');
    }
    //REBIND CLICKS FOR EACH LI ADDED
    function bindClickEvent(){
        var taskItems = document.querySelectorAll('li');
        var deleteButton = document.querySelectorAll('.delete-button');
        taskItems.forEach(function(item){
            item.addEventListener('click', updateCheckBox);
        });
        deleteButton.forEach(function(item){
            item.addEventListener('click', deleteItem);
        });
    }
    //BIND EVENTS
    function bindEvents(){
        button.addEventListener('click', addItem);
        clearList.addEventListener('click', clearAllTasks);
        addTask.addEventListener('click', displayAddTask);
        document.addEventListener('keyup', function(e){enterKey(e)});
        bindClickEvent();

        //document.getElementById('testing').addEventListener('click', testing);
    }
    function init() {
        // Application init code
        createLocalList();
        bindEvents();
        getDate();
    }

    return {
        init : init,
    };
  
} )();

TodoApp.init(); // Run application



