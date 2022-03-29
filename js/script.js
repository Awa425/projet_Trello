
let couleur = [
    "#ffefe7",
    "#feb5a4",
    "#b03240",
    "#f6d175",
    "#b4cab0",
    "#ce818c"
];
let image = [

]

const main = document.getElementById('main');
const add_column = document.getElementById('add-column')
const add_task = document.getElementById('add-task')
const modal = document.querySelector('.modal')
const modal_close = document.querySelector('.modal-close')
const ajouter = document.getElementById('ajouter')
const note_textarea = document.getElementById('note-textarea')
const dateUs = document.querySelector('.date')
const corbeil_content = document.querySelector('.corbeil-content')
const fermer_corbeil = document.querySelector('.fermer-corbeil')
const icon_corbeil = document.querySelector('.icon-corbeil')
const corbeil = document.querySelector('.corbeil')
// console.log(icon_corbeil)
let cpt = 1;
createColumn()
function createColumn() {
    if (cpt<=5) {  
         //Create Element
        const container = document.createElement('div');
        const close= document.createElement('span')
        const card = document.createElement('div');
        const card_entete = document.createElement('input');
        const div_card_img = document.createElement('div');
        const card_img = document.createElement('img');
        const note = document.createElement('div');
         
        //setAttribute
        container.setAttribute('class', 'container')
        container.setAttribute('id', 'container_'+cpt);
        close.setAttribute('class', 'close')
        card.setAttribute('class', 'card')
        div_card_img.setAttribute('class', 'img')
        note.setAttribute('class', 'note')
        note.setAttribute('id', 'note_'+cpt)
        // textarea.setAttribute('id','texterea_'+cpt);
        card_entete.setAttribute('class', 'entete-card')
        card_img.setAttribute('src', './images/file-1636585210491-f28ca34ea8ecimage.jpeg');
        card_entete.value="Colonne "+cpt
        card_entete.style.backgroundColor=randomColor()    
        close.textContent="x"
        
        //Append
        div_card_img.appendChild(card_img)
        card.append(card_entete,div_card_img,note)
        container.append(close, card)
        main.appendChild(container)

        close.addEventListener('click', ()=>{
            container.remove();
            cpt--;
            update_entete();
            update_id_card();
            update_textarea()
        })
        cpt++ 
    } 
}
let j = 1;
function createUs(content,dat,hDebut,hFin) {
    const parentUs = document.querySelector('.note')
    const us = document.createElement('div');
    const span_prev = document.createElement('span');
    const textarea = document.createElement('textarea');
    const span_next = document.createElement('span');
    const divNoteToggle = document.createElement('div');
    const date = document.createElement('p');
    const heureDebut = document.createElement('p');
    const heureFin = document.createElement('p');
    us.setAttribute('class', 'us')
    textarea.setAttribute('class', 'textarea')
    textarea.setAttribute('id','texterea_'+cpt);
    textarea.setAttribute('cols', "5")
    textarea.setAttribute('rows', "3")
    span_next.setAttribute('class', 'span-next');
    divNoteToggle.setAttribute('class', 'noteToggle')
    us.setAttribute('id', 'us_'+j)
    textarea.textContent=content;
    date.textContent="Date: "+dat;
    heureDebut.textContent="Heure debut: "+hDebut;
    heureFin.textContent="Heure Fin: "+hFin;
    span_prev.textContent="<<"
    span_next.textContent=">>"
    divNoteToggle.append( date,heureDebut,heureFin)
    us.append(span_prev,span_next,textarea,divNoteToggle);

    span_next.setAttribute('onClick',`deplacerNext(${j})`)
    span_prev.setAttribute('onClick',`deplacerPrev(${j})`)
    j++;
    return us
}

function deplacerNext(j) {
    const move = document.getElementById('us_'+j)
    console.dir(move.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastChild)
    const divMove = move.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastChild;
    if(move.parentElement.parentElement.parentElement.nextSibling !=""){
        divMove.append(move);
    }
}
function deplacerPrev(j) {
    const move = document.getElementById('us_'+j)
    console.dir(move.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastChild)
    const divMove = move.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastChild;
    if(move.parentElement.parentElement.parentElement.previousElementSibling !=""){
        divMove.append(move);
    }
}

function randomColor() {
    return couleur[Math.floor(Math.random()*couleur.length)]
}

function update_entete(){
    const inputs = document.querySelectorAll('.entete-card');
    inputs.forEach((input,i) => {
        i++;
        input.value= "Colonne "+i;
        
    }); 
}

function update_id_card() {
    const containers = document.querySelectorAll('.container')
    containers.forEach((contain,i)=>{
        i++;
        contain.setAttribute('id', 'container_'+i);
    })
}

function update_textarea() {
    const texts = document.querySelectorAll('.textarea')
    texts.forEach((tex,i)=>{
        i++; 
        tex.setAttribute('id','texterea_'+i);
    })
}
addCorbeil() 
function addCorbeil() {
    const corbeil_etat = document.createElement('div')
    const corbeil_us_content = document.createElement('span')
    const num_colonne = document.createElement('span')
    const corbeil_date = document.createElement('span')
    const corbeil_HDebut = document.createElement('span')
    const corbeil_HFin = document.createElement('span')
    const btn_restaurer = document.createElement('button')

    corbeil_etat.setAttribute('class','corbeil-etat');
    corbeil_us_content.textContent="US: "
    num_colonne.textContent="Colonne numero: "
    corbeil_date.textContent="Date: "
    corbeil_HDebut.textContent="Heure Debut : "
    corbeil_HFin.textContent="Heure de fin : "
    btn_restaurer.textContent="Restaurer"

    corbeil_etat.append(corbeil_us_content,num_colonne,corbeil_date,corbeil_HDebut,corbeil_HFin,btn_restaurer);
    corbeil_content.append(corbeil_etat)
}

add_column.addEventListener('click', ()=>{
    createColumn()
})

add_task.addEventListener('click',()=>{
    note_textarea.value="";

    modal.classList.add('show-modal');
})

modal_close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal')
})


ajouter.addEventListener('click', (e)=>{
    const textareaContent = document.querySelector('.textarea');
    const creeUs = document.querySelector('.note');
    const datUs = document.querySelector('.date')
    const hdeb = document.querySelector('.heure-debut')
    const hefin = document.querySelector('.heure-fin')
    let uss = createUs(note_textarea.value, datUs.value, hdeb.value,hefin.value);
    e.preventDefault();
    modal.classList.remove('show-modal')
    creeUs.append(uss)
})

icon_corbeil.addEventListener('click', ()=>{
    corbeil.classList.add('show-corbeil')

})

fermer_corbeil.addEventListener('click', ()=>{
    corbeil.classList.remove('show-corbeil')

})