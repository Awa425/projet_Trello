const main = document.getElementById('main');
const add_column = document.getElementById('add-column')
const add_task = document.getElementById('add-task')
const modal = document.querySelector('.modal')
const modal_close = document.querySelector('.modal-close')
const ajouter = document.getElementById('ajouter')
const note_textarea = document.getElementById('note-textarea')
const dateUs = document.querySelector('.date')

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

let cpt = 1;
createCard()
function createCard() {
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
        // textarea.setAttribute('id','texterea_'+cpt);
        card_entete.setAttribute('class', 'entete-card')
        card_img.setAttribute('src', './images/file-1636585210491-f28ca34ea8ecimage.jpeg');
        card_entete.style.backgroundColor=randomColor()    
        switch (cpt) {
            case 1:
            card_entete.value="Backlog";
            break;
            case 2:
                card_entete.value="Sprint Backlog";
                break;
            case 3:
                card_entete.value="Doing";
                break;
            case 4:
                card_entete.value="Done";
                break;
            case 5:
                card_entete.value="Test";
                break;    

            default:
                break;
        }
        close.textContent="x"
        
        //Append
        div_card_img.appendChild(card_img)
        card.append(card_entete,div_card_img,note)
        container.append(close, card)
        main.appendChild(container)

        close.addEventListener('click', ()=>{
            container.remove();
            cpt--;
            // update_entete();
            update_id_card();
            update_textarea()
        })
        cpt++ 
    } 
}

function createUs(content,dat,hDebut,hFin) {
    const parentUs = document.querySelector('.note')
    const us = document.createElement('div');
    const span_prev = document.createElement('span');
    const textarea = document.createElement('textarea');
    const span_next = document.createElement('span');
    const date = document.createElement('p');
    const heureDebut = document.createElement('p');
    const heureFin = document.createElement('p');
    us.setAttribute('class', 'us')
    textarea.setAttribute('class', 'textarea')
    textarea.setAttribute('id','texterea_'+cpt);
    textarea.setAttribute('cols', "5")
    textarea.setAttribute('rows', "3")
    span_next.setAttribute('class', 'span-next');
    textarea.textContent=content;
    date.textContent="Date: "+dat;
    heureDebut.textContent="Heure debut: "+hDebut;
    heureFin.textContent="Heure Fin: "+hFin;
    span_prev.textContent="<<"
    span_next.textContent=">>"
    us.append(span_prev,span_next,textarea,date,heureDebut,heureFin);
    // span_next.addEventListener('click', ()=>{
    //     alert('ok');
    //  })

    return us
}


function randomColor() {
    return couleur[Math.floor(Math.random()*couleur.length)]
}

function update_entete(){
    const inputs = document.querySelectorAll('.entete-card');
    inputs.forEach((input,i) => {
        i++;
        if (i==1) {
            input.value= "Backlog";
        }
        if (i==2) {
            input.value= "Sprint Backlog";
        }
        if (i==3) {
            input.value= "Doing";
        }
        if (i==4) {
            input.value= "Done";
        }
        if (i==5) {
            input.value= "Test";
        }
        
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

add_column.addEventListener('click', ()=>{
    createCard()
})

add_task.addEventListener('click',()=>{
    note_textarea.value="";

    modal.classList.add('show-modal');
})

modal_close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal')
})

// const flecheDroite = document.querySelectorAll('.span-next')
// console.log(flecheDroite)

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