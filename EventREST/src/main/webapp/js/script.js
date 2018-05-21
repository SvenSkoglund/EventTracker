window.addEventListener('load', function() {
	console.log('document loaded');

	getAllEvents();

	document.eventForm.eventButton.addEventListener('click', function(event) {
		event.preventDefault();
		createReadEvent();
	})

})

function getAllEvents() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "api/read", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				var allEventData = xhr.responseText;
				var allEventObject = JSON.parse(allEventData);

				var eventTable = document.createElement("table");
				eventTable.id = "eventTable";
				eventTable.appendChild(generateTableHeader());
				var total = 0;
				for (var i = 0; i < allEventObject.length; i++) {
					eventTable.appendChild(generateRow(allEventObject[i]));
					total += allEventObject[i].hours;
				}
				document.body.appendChild(eventTable);
				addRowClickListeners(eventTable);
				showTotalHours(total);

			} else {
				displayError();
			}
		}

	}
	xhr.send(null);

}

function showTotalHours(total){
	var totalDisplay = document.createElement('h2');
	totalDisplay.textContent = "Total Hours: " + total;
	totalDisplay.id = "totalDisplay";
	document.body.appendChild(totalDisplay);
}
function generateTableHeader() {
	var tHead = document.createElement("thead");
	var tHeadRow = document.createElement("tr");
	tHead.appendChild(tHeadRow);

	var idHeader = document.createElement("td");
	idHeader.textContent = "ID";
	tHeadRow.appendChild(idHeader);

	var titleHeader = document.createElement("td");
	titleHeader.textContent = "Title";
	tHeadRow.appendChild(titleHeader);

	var authorHeader = document.createElement("td");
	authorHeader.textContent = "Author";
	tHeadRow.appendChild(authorHeader);

	var formatHeader = document.createElement("td");
	formatHeader.textContent = "Format";
	tHeadRow.appendChild(formatHeader);

	var hoursHeader = document.createElement("td");
	hoursHeader.textContent = "Hours";
	tHeadRow.appendChild(hoursHeader);

	var fictionHeader = document.createElement("td");
	fictionHeader.textContent = "Fiction";
	tHeadRow.appendChild(fictionHeader);

	var dateHeader = document.createElement("td");
	dateHeader.textContent = "Date";
	tHeadRow.appendChild(dateHeader);

	return tHead;

}

function createReadEvent() {
	var readEvent = document.eventForm;
	var readEventObject = {
		title : readEvent.title.value,
		author : readEvent.author.value,
		format : readEvent.format.value,
		hours : readEvent.hours.value,
		isFiction : readEvent.isFiction.value,
		date : readEvent.date.value
	};
	console.log(readEventObject);
	var readEventJson = JSON.stringify(readEventObject);
	console.log(readEventJson);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "api/read", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.status === 200 || xhr.status === 201) {
			var eventTable = document.getElementById("eventTable");
			eventTable.parentNode.removeChild(eventTable);
			getAllEvents();
		} else {
			displayError();
		}
	}

	xhr.send(readEventJson);

}

function generateRow(rowObject) {
	var tableRow = document.createElement('tr');

	var idTd = document.createElement('td');
	idTd.textContent = rowObject.id;
	// addRowClickListener(idTd);
	tableRow.appendChild(idTd);

	var titleTd = document.createElement('td');
	titleTd.textContent = rowObject.title;
	// addRowClickListener(titleTd);
	tableRow.appendChild(titleTd);

	var authorTd = document.createElement('td');
	authorTd.textContent = rowObject.author;
	tableRow.appendChild(authorTd);

	var formatTd = document.createElement('td');
	formatTd.textContent = rowObject.format;
	tableRow.appendChild(formatTd);

	var hoursTd = document.createElement('td');
	hoursTd.textContent = rowObject.hours;
	tableRow.appendChild(hoursTd);

	var fictionTd = document.createElement('td');
	fictionTd.textContent = rowObject.isFiction;
	tableRow.appendChild(fictionTd);

	var dateTd = document.createElement('td');
	dateTd.textContent = rowObject.date;
	tableRow.appendChild(dateTd);

	return tableRow;
}

function addRowClickListeners(table) {
	var tableRows = table.children;
	for (var i = 1; i < tableRows.length; i++) {
		var row = table.children[i];
		row.addEventListener('click', function(evt) {
			var id = evt.target.parentElement.firstChild.innerText;
			if (!isNaN(id) && id > 0) {
				console.log(id);
				getEvent(id);
			}
		});
	}
}

function getEvent(id) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "api/read/" + id, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				var eventData = xhr.responseText;
				var eventObject = JSON.parse(eventData);
				displayEvent(eventObject);
			} else {
				displayError();
			}
		}

	}
	xhr.send(null);
}

function displayEvent(eventObject) {
	removeElement(eventTable.id);
	removeElement("totalDisplay");
	createReturnButton();
	createDeleteButton();
	createUpdateButton();
	singleEventTable(eventObject);

}

function singleEventTable(eventObject) {

	var table = document.createElement('table');
	table.id = "singleEventTable";
	document.body.appendChild(table);
	table.appendChild(generateTableHeader());
	table.appendChild(generateRow(eventObject));

}
function createReturnButton() {
	var btn = document.createElement("button"); // Create a <button> element
	btn.id = "returnButton";
	var t = document.createTextNode("Return to Full List"); // Create a text
	// node
	btn.appendChild(t); // Append the text to <button>
	document.body.appendChild(btn); // Append <button> to <body>

	btn.addEventListener('click', function(evt) {
		getAllEvents();
		removeElement(returnButton.id);
		removeElement("deleteButton");
		removeElement("singleEventTable");
		removeElement("updateButton");

	});
}
function createDeleteButton() {
	var btn = document.createElement("button"); // Create a <button> element
	btn.id = "deleteButton";
	var t = document.createTextNode("Delete"); // Create a text
	// node
	btn.appendChild(t); // Append the text to <button>
	document.body.appendChild(btn); // Append <button> to <body>

	btn.addEventListener('click', function(evt) {
		deleteEvent(deleteButton.id);
		removeElement("singleEventTable");
		removeElement(returnButton.id);
		removeElement(deleteButton.id);
		location.reload();
		getAllEvents();

	});
}
function deleteEvent(buttonId) {
	console.log(buttonId);
	var eventId = document.getElementById("singleEventTable").firstChild.nextElementSibling.firstChild.innerText;
	console.log(eventId);
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "api/read/" + eventId, true);
	xhr.onreadystatechange = function() {
		if (xhr.status === 200 || xhr.status === 201) {

		} else {
			displayError();
		}
	}
	xhr.send(null);

}
function createUpdateButton() {
	var btn = document.createElement("button"); // Create a <button> element
	btn.id = "updateButton";
	var t = document.createTextNode("Update"); // Create a text
	// node
	btn.appendChild(t); // Append the text to <button>
	document.body.appendChild(btn); // Append <button> to <body>

	btn.addEventListener('click', function(evt) {
		updateEventForm(updateButton.id);

	});
}
function updateEventForm() {
	var eventTable = document.getElementById("singleEventTable");
	var eventId = parseInt(eventTable.firstChild.nextElementSibling.firstChild.innerText);
	var originalEventTitle = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.innerText;
	var originalEventAuthor = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.innerText;
	var originalEventFormat = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
	var originalEventHours = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
	var originalEventIsFiction = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
	var originalEventDate = eventTable.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
	console.log(originalEventDate);

	var form = document.createElement('form');
	form.id = "updateForm";
	eventTable.parentElement.appendChild(form);

	var titleInput = document.createElement('input');
	titleInput.type = "text";
	titleInput.name = "title";
	titleInput.value = originalEventTitle;
	form.appendChild(titleInput);

	var authorInput = document.createElement('input');
	authorInput.type = "text";
	authorInput.name = "author";
	authorInput.value = originalEventAuthor;
	form.appendChild(authorInput);

	var formatInput = document.createElement('input');
	formatInput.setAttribute('list', 'formats');
	formatInput.name = "format";
	formatInput.value = originalEventFormat;
	form.appendChild(formatInput);

	var hoursInput = document.createElement('input');
	hoursInput.type = "number";
	hoursInput.name = "hours";
	hoursInput.value = originalEventHours;
	form.appendChild(hoursInput);

	var fictionInput = document.createElement('input');
	fictionInput.setAttribute('list', 'isFiction');
	fictionInput.name = "isFiction";
	fictionInput.value = originalEventIsFiction;
	form.appendChild(fictionInput);

	var dateInput = document.createElement('input');
	dateInput.type = 'date';
	dateInput.name = 'date';
	dateInput.value = originalEventDate;
	form.appendChild(dateInput);

	var submitUpdateButton = document.createElement('input');
	submitUpdateButton.type = 'submit';
	submitUpdateButton.value = 'Submit Event Update';
	form.appendChild(submitUpdateButton);

	submitUpdateButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		console.log("button click working");
		var readEvent = document.forms.updateForm;
		console.log(readEvent);
		var readEventObject = {
			id : eventId,
			title : readEvent.title.value,
			author : readEvent.author.value,
			format : readEvent.format.value,
			hours : readEvent.hours.value,
			isFiction : readEvent.isFiction.value,
			date : readEvent.date.value
		};
		console.log(readEventObject);

		var readEventJson = JSON.stringify(readEventObject);
		console.log(readEventJson);

		var xhr = new XMLHttpRequest();
		xhr.open("PATCH", "api/read/" + eventId, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.status === 200 || xhr.status === 201) {
				location.reload();
			} else {
				displayError();
			}
		}

		xhr.send(readEventJson);
	});

}
function removeElement(elementId) {
	// Removes an element from the document
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}