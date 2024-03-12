let addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelector('.remove-btn');
let textAreacont = document.querySelector('.textArea-cont');
let modalCont = document.querySelector('.modal-cont');
let allPriorityColors = document.querySelectorAll('.priority-color');
let mainContainer = document.querySelector('.main-container');
let toolboxColors = document.querySelectorAll('.color');
let addTaskFlag = false;
let removeTaskFlag = false;
let lockClass = 'fa-lock';
let unlockClass = 'fa-lock-open';
let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1];
let ticketsArr = [];

// find the elements from the array which have the selected color 
// remove all the cards from the screen
// render only the cards which are black on the screen

for(let i = 0; i < toolboxColors.length; i++) {
    toolboxColors[i].addEventListener('click', function() {
        let selectedToolBoxColor = toolboxColors[i].classList[0];
        let filteredTickets = ticketsArr.filter(function(ticket) {
            return selectedToolBoxColor === ticket.ticketColor
        })
        let allTickets = document.querySelectorAll('.ticket-cont');
        for(let i = 0; i< allTickets.length; i++) {
            allTickets[i].remove();
        }

        filteredTickets.forEach(function(filteredTicket) {
            createTicket(filteredTicket.ticketColor, filteredTicket.ticketTask, filteredTicket.ticketID);
        })
    })

    toolboxColors[i].addEventListener('dblclick', function() {
        let allTickets = document.querySelectorAll('.ticket-cont');
        for(let i = 0; i< allTickets.length; i++) {
            allTickets[i].remove();
        }

        ticketsArr.forEach(function(ticketsObj) {
            createTicket(ticketsObj.ticketColor, ticketsObj.ticketTask, ticketsObj.ticketID);
        })
    })
}

addBtn.addEventListener('click', function() {
    addTaskFlag = !addTaskFlag;
    if(addTaskFlag === true) {
        // flex
        modalCont.style.display = 'flex';
    } else {
        // none
        modalCont.style.display = 'none';
    }
});

removeBtn.addEventListener('click', function() {
    removeTaskFlag = !removeTaskFlag;
    // if(ticketsArr.length === 0 ) {
    //     alert("first create a task");
    //     return;
    // }
    if(removeTaskFlag === true) {
        // flex
        alert("Remove button activated");
        removeBtn.style.color = 'red';
    } else {
        // none
        removeBtn.style.color = 'white';
    }
});

allPriorityColors.forEach(function(colorElem) {
    colorElem.addEventListener('click', function() {
        allPriorityColors.forEach(function(priorityColorElem) {
            priorityColorElem.classList.remove('active');
        })
        colorElem.classList.add('active');
        modalPriorityColor = colorElem.classList[0];
    })
})

modalCont.addEventListener('keydown', function(e) {
    let key = e.key;
    if(key === 'Enter') {
        createTicket(modalPriorityColor, textAreacont.value);
        modalCont.style.display = 'none';
        textAreacont.value = '';
    }
})

function createTicket(ticketColor, ticketTask, ticketID) {
    let id = ticketID  || shortid();
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class', 'ticket-cont');
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>
    `
    mainContainer.appendChild(ticketCont);
    handleColor(ticketCont, id);
    handleLock(ticketCont, id);
    handleRemove(ticketCont, id);
    if(!ticketID) {
        ticketsArr.push({ticketColor, ticketTask, ticketID: id});
    }
    // {ticketColor: ticketColor, ticketTask: ticketTask, ticketID: id}
    console.log(ticketsArr);
}

function handleLock(ticket, id) {
    let ticketLockElem = ticket.querySelector('.ticket-lock');
    let ticketLockIcon = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector('.task-area');

    ticketLockIcon.addEventListener('click', function() {
        let ticketIdx = getTicketIdx(id);
        if(ticketLockIcon.classList.contains(lockClass)) {
            ticketLockIcon.classList.add(unlockClass);
            ticketLockIcon.classList.remove(lockClass);
            ticketTaskArea.setAttribute('contenteditable', true);
        } else {
            ticketLockIcon.classList.add(lockClass);
            ticketLockIcon.classList.remove(unlockClass);
            ticketTaskArea.setAttribute('contenteditable', false);
        }
        ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
    })
}

function handleColor() {

}

function handleRemove(ticket, id) {
    ticket.addEventListener('click', function() {
        if(!removeTaskFlag) return;
        ticket.remove();
        let idx = getTicketIdx(id);
        let deletedElm = ticketsArr.splice(idx, 1);
        console.log(deletedElm);
    })
}

function getTicketIdx(id) {
    let ticketID = ticketsArr.findIndex(function(ticketObj) {
        return ticketObj.ticketID === id
    });
    return ticketID;
}

//[{ticketId: },{ticketId:},{ticketId:},{ticketId:}]


// [1,2,3,4,5]

// create the ticket 
// we can create a div and append that div in our container
// store the ticket
// array of objects 
// object keys like id, text, color


// on removal
// 
// we need an event listener 
// onClick 
//remove the container from the dom and remove the object from the array 



// [{1}, {2} ,{3} ,{4}]
// createTicket
// handleRemove