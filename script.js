let but = document.getElementById('but');
let wrapper = document.getElementById('wrapper-for-notes');
let  noteWrapper = document.createElement('div')
noteWrapper.className = 'wrapper-for-note';

addCont = (wrapper, text, key, name=null) => {
  let  noteWrapper = document.createElement('div');
           
  noteWrapper.className = 'wrapper-for-note';

  if (wrapper.children.length > 0){
    wrapper.insertBefore(noteWrapper, wrapper.firstChild);
    if (name){
      wrapper.firstChild.appendChild(document.createElement('h2'));
      wrapper.firstChild.lastChild.className = 'name-note';
      wrapper.firstChild.lastChild.textContent = name;
      console.log(wrapper.lastChild.lastChild);
    }
    wrapper.firstChild.appendChild(document.createElement('p'));
    wrapper.firstChild.className = 'text-note';
    wrapper.firstChild.lastChild.textContent = text;
    let now = new Date();
    wrapper.firstChild.appendChild(document.createElement('p'));
    wrapper.firstChild.lastChild.textContent = `${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    wrapper.firstChild.lastChild.className = 'date';
    wrapper.firstChild.appendChild(document.createElement('p'));
    wrapper.firstChild.lastChild.textContent = key;
    wrapper.firstChild.lastChild.classList.add('identificator');
    wrapper.firstChild.insertAdjacentHTML('afterbegin', `<div class="dropdown">
    <button class="dropbtn"><i class="fa fa-bars"></i></button>
    <div id="myDropdown" class="dropdown-content">
    <button class='ready-but'>Выполнено</button>
    <button class='del-but'>Удалить</button>
      
    </div>
  </div>`);
    return;
  } 
  wrapper.appendChild(noteWrapper);
  if (name){
    wrapper.lastChild.appendChild(document.createElement('h2'));
    wrapper.lastChild.lastChild.className = 'name-note';
    wrapper.lastChild.lastChild.textContent = name;
    console.log(wrapper.lastChild.lastChild);
  }
  wrapper.lastChild.appendChild(document.createElement('p'));
  wrapper.lastChild.className = 'text-note';
  wrapper.lastChild.lastChild.textContent = text;
  wrapper.lastChild.appendChild(document.createElement('p'));
  let now = new Date();
  wrapper.lastChild.lastChild.textContent = `${now.getDate()}:${now.getMonth() + 1}:${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  wrapper.lastChild.lastChild.className = 'date';
  wrapper.lastChild.appendChild(document.createElement('p'));
  wrapper.lastChild.lastChild.textContent = key;
  wrapper.lastChild.lastChild.classList.add('identificator');
  wrapper.lastChild.insertAdjacentHTML('afterbegin', `<div class="dropdown">
  <button class="dropbtn"><i class="fa fa-bars"></i></button>
  <div id="myDropdown" class="dropdown-content">
  <button class='ready-but'>Выполнено</button>
  <button class='del-but'>Удалить</button>
    
  </div>
</div>`);

}
function recovery(localStorage){
    if (localStorage.length > 1){

        let i;
        for (i = localStorage.length - 1; i > -1; i--){
          let key  = localStorage.key(i);
          if (key =='counter'){
              continue;
          }  
          if (localStorage.getItem(key).split(',,,').length > 1){
            let nameNote = localStorage.getItem(key).split(',,,')[0];
            let textNote = localStorage.getItem(key).split(',,,')[1];
            addCont(wrapper, textNote, key, nameNote);
        

          } else if (localStorage.getItem(key).split(',,,').length == 1){
              let textNote = localStorage.getItem(key)[0];
              addCont(wrapper, textNote, key);
          }
        }
}}
    
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
    if (textNote.length > 1){
        if (!nameNote){
            addCont(wrapper, textNote, key);
            localStorage.setItem(key, textNote);
            localStorage.counter++;
            
        }else{
            addCont(wrapper, textNote, key, nameNote);
            localStorage.setItem(key, nameNote + ',,,' + textNote);
            localStorage.counter++;
        }

  }
  document.getElementById('name-note').value = '';
  document.getElementById('form-note').value = '';
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
      event.target.parentNode.parentNode.parentNode.style.border = '2px solid rgb(1, 228, 69)';
      event.target.textContent = 'Не выполнено';
    }else if (event.target.textContent == 'Не выполнено'){
      event.target.parentNode.parentNode.parentNode.style.border = '2px solid rgb(18, 84, 228)';
      event.target.textContent = 'Выполнено';
  }
}}
