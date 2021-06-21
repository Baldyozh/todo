let but = document.getElementById('but');
let wrapper = document.getElementById('wrapper-for-notes');


addCont = note => {
  if (note[0]){
    wrapper.insertAdjacentHTML('afterbegin', `<div class="wrapper-for-note" style='border: 2px solid ${note[4] ? 'rgb(119, 247, 0)' : 'rgb(18, 84, 228)'}'>
    <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-bars"></i></button>
        <div id="myDropdown" class="dropdown-content">
        <button class='ready-but'>${note[4] ? "Не выполнено" : "Выполнено"}</button>
        <button class='del-but'>Удалить</button>
          
        </div>
      </div>
    <h2 class="name-note">${note[0]}</h2>
    <p class="text-note">${note[1]}</p>
    <p class="date">${note[2]}</p>
    <p class="identificator">${note[3]}</p>

</div>`);
  }else {
    wrapper.insertAdjacentHTML('beforebegin', `<div class="wrapper-for-note" style='border: 2px solid ${note[4] ? 'rgb(119, 247, 0)' : 'rgb(18, 84, 228)'}'>
    <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-bars"></i></button>
        <div id="myDropdown" class="dropdown-content">
        <button class='ready-but'>${note[4] ? "Не выполнено" : "Выполнено"}</button>
        <button class='del-but'>Удалить</button>
          
        </div>
      </div>
    <p class="text-note">${note[1]}</p>
    <p class="date">${note[2]}</p>
    <p class="identificator">${note[3]}</p>`)
  }
}
function recovery(localStorage){
  if (localStorage.length > 1){
    for (let i = localStorage.length - 1; i > -1; i--){
      let key = localStorage.key(i);
      if (key == 'counter'){continue;}
      addCont(JSON.parse(localStorage.getItem(key)));
    }
  }
}       
try {
    recovery(localStorage);
} catch(err){
    console.log(err)
}

if (!localStorage.counter){
    localStorage.counter = 0;
}
but.onclick = () => {
    let nameNote = document.getElementById('name-note').value; 
    let textNote = document.getElementById('form-note').value;
    let key = localStorage.counter;
    let now = new Date();
    let nowt =  `${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    let note = [];
    if (textNote.length > 1){
      if (nameNote){
        note.push(nameNote);
      }else{
        note.push(null);
      }

      note.push(textNote);
      note.push(nowt);
      note.push(key);
      note.push(false);
      addCont(note);
      localStorage.setItem(key, JSON.stringify(note));
      localStorage.counter++;
  
      document.getElementById('name-note').value = '';
      document.getElementById('form-note').value = '';
} 
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
} else if(event.target.matches('.dropbtn') || event.target.matches('i')){
      event.target.parentNode.querySelector('#myDropdown').classList.toggle('show');
}
}

wrapper.onclick = function(event){
  if (event.target.tagName == 'BUTTON'){
    if (event.target.textContent == 'Удалить'){
      let key = event.target.parentNode.parentNode.parentNode.querySelector('.identificator').textContent;
      localStorage.removeItem(key);
      event.target.parentNode.parentNode.parentNode.remove();
    }else if (event.target.textContent == 'Выполнено'){
      let key = event.target.parentNode.parentNode.parentNode.querySelector('.identificator').textContent;
      let i = localStorage.getItem(key);
      let item = JSON.parse(localStorage.getItem(key));
      localStorage.removeItem(key);
      item[4] = true;
      localStorage.setItem(key, JSON.stringify(item));
      event.target.parentNode.parentNode.parentNode.style.border = '2px solid rgb(1, 228, 69)';
      event.target.textContent = 'Не выполнено';
    }else if (event.target.textContent == 'Не выполнено'){
      event.target.parentNode.parentNode.parentNode.style.border = '2px solid rgb(18, 84, 228)';
      event.target.textContent = 'Выполнено';
      let key = event.target.parentNode.parentNode.parentNode.querySelector('.identificator').textContent;
      let item = JSON.parse(localStorage.getItem(key));
      
      item[4] = false;
      localStorage.removeItem(key)
      localStorage.setItem(key, JSON.stringify(item));
  }
}}
