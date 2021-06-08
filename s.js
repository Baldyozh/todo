let but = document.getElementById('but');
let container = document.getElementById('place-for-notifications');
let containerForNotification = document.createElement('div');
containerForNotification.className = 'wrapper-for-note';
let html_for_name_of_note = document.createElement('h2');
html_for_name_of_note.className = 'name';
let html_for_note = document.createElement('p');
html_for_note.className = 'text-of-note';

but.onclick = () => {
    let nameOfNotification = document.getElementById('name').value;
    console.log(nameOfNotification)
    let textOfNotification = document.getElementById('notification').value;
    console.log(textOfNotification)
    if (textOfNotification.length > 0){
        if (nameOfNotification.length > 0){
            container.append(containerForNotification);
            let note = container.lastChild;
            note.append(html_for_name_of_note);

            note.lastChild.textContent = nameOfNotification;
            note.append(html_for_note);
            note.lastChild.textContent = textOfNotification;

        }else{
            container.append(containerForNotification);
            let note = container.lastChild;
            note.append(html_for_note);
            note.lastChild.textContent = textOfNotification;

        }
    }
}