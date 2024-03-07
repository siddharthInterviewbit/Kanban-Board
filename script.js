let addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelector('.remove-btn');
let textAreacont = document.querySelector('.textArea-cont');
let modalCont = document.querySelector('.modal-cont');
let allPriorityColors = document.querySelectorAll('.priority-color');
let mainContainer = document.querySelector('.main-container');
let addTaskFlag = false;
let removeTaskFlag = false;
let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1];
let ticketsArr = [];

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

function createTicket(ticketColor, ticketTask) {
    let id = shortid();
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
    handleColor();
    handleLock();
    handleRemove(ticketCont, id);
    ticketsArr.push({ticketColor, ticketTask, ticketID: id});

    // {ticketColor: ticketColor, ticketTask: ticketTask, ticketID: id}
    console.log(ticketsArr);
}

function handleLock() {

}

function handleColor() {

}

function handleRemove(ticket, id) {
    ticket.addEventListener('click', function() {
        if(!removeTaskFlag) return;
        ticket.remove();
        getTicketIdx(id);
    })
}

function getTicketIdx(id) {
    let ticketID = ticketsArr.findIndex(function(ticketObj) {
        return ticketObj.ticketID === id
    });
    return ticketID;
}


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