let but = document.getElementById('but')
let container = document.getElementById('place-for-notifications')
let containerForNotifition = '<div class="wrapper-for-notification"></div>' 
but.onclick = () => {
    let nameOfNotification = document.getElementById('name');
    let textOfNotification = document.getElementById('notification');
    if (textOfNotification.value.length > 0){
        if (nameOfNotification.value.length > 0){
            container.append(containerForNotifition);
            let note = container.lastChild
            note.append('<h2 class="name-of-note">' + nameOfNotification + '</h2>')
            note.append('<p class="text-of-note>"' + textOfNotification + '</p>')
        }else{
            container.appendChild(containerForNotifition);
            let note = container.lastChild
            note.append('<p class="text-of-note>"' + textOfNotification + '</p>')
        }
    }
}