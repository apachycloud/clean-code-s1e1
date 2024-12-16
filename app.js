//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task-input");
var addButton = document.querySelector(".task-row__add-button");
var incompleteTaskHolder = document.getElementById("incomplete-tasks-list");
var completedTasksHolder = document.getElementById("completed-tasks-list");

var createNewTaskElement = function (taskString) {
	var listItem = document.createElement("li");
	listItem.className = "task-list__item";

	var checkBox = document.createElement("input");
	var label = document.createElement("label");
	var editInput = document.createElement("input");
	var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");
	var deleteButtonImg = document.createElement("img");

	checkBox.type = "checkbox";
	checkBox.className = "task-list__checkbox";
	
	label.innerText = taskString;
	label.className = "task-list__label";
	
	editInput.type = "text";
	editInput.className = "task-list__input";
	editInput.value = taskString;

	editButton.innerText = "Edit";
	editButton.className = "task-list__edit-button";

	deleteButton.className = "task-list__delete-button";
	deleteButtonImg.src = './remove.svg';
	deleteButtonImg.alt = "Delete";
	deleteButton.appendChild(deleteButtonImg);

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
};

var addTask = function () {
	if (!taskInput.value) return;
	var listItem = createNewTaskElement(taskInput.value);
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
};

var editTask = function () {
	var listItem = this.parentNode;
	var label = listItem.querySelector("label");
	var editInput = listItem.querySelector('input[type=text]');
	var editBtn = listItem.querySelector(".task-list__edit-button");
	var containsClass = listItem.classList.contains("edit-mode");
	if (containsClass) {
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}
	listItem.classList.toggle("edit-mode");
};

var deleteTask = function () {
	var listItem = this.parentNode;
	listItem.parentNode.removeChild(listItem);
};

var taskCompleted = function () {
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
	var listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.task-list__edit-button");
	var deleteButton = taskListItem.querySelector("button.task-list__delete-button");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
};

// Инициализация существующих элементов
var init = function() {
	// Добавляем класс task-list__item ко всем существующим li элементам
	var allTasks = document.querySelectorAll('li');
	allTasks.forEach(function(task) {
		if (!task.className.includes('task-list__item')) {
			task.className = "task-list__item";
		}
	});

	// Привязываем обработчики событий к незавершенным задачам
	var incompleteTasks = incompleteTaskHolder.querySelectorAll('li');
	incompleteTasks.forEach(function(task) {
		bindTaskEvents(task, taskCompleted);
	});

	// Привязываем обработчики событий к завершенным задачам
	var completedTasks = completedTasksHolder.querySelectorAll('li');
	completedTasks.forEach(function(task) {
		bindTaskEvents(task, taskIncomplete);
	});
};

// Запускаем инициализацию при загрузке страницы
window.onload = init;

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);