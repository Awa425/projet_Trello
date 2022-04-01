
let couleur = [
    '#505050',
    '#bcbcbc'
];
let image = [

]

const main = document.getElementById('main');
const header = document.querySelector('.header')
const add_column = document.getElementById('add-column')
const add_task = document.getElementById('add-task')
const modal = document.querySelector('.modal')
const modal_close = document.querySelector('.modal-close')
const ajouter_tache = document.getElementById('ajouter')
const note_textarea = document.getElementById('note-textarea')
const dateUs = document.querySelector('.date')
const corbeil_content = document.querySelector('.corbeil-content')
const fermer_corbeil = document.querySelector('.fermer-corbeil')
const icon_corbeil = document.querySelector('.icon-corbeil')
const corbeil = document.querySelector('.corbeil')
const notification = document.querySelector('.notification')
const message_notification= document.querySelector('.notification-content')
const btn_notif = document.querySelector('.btn-notification')



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

        card_entete.addEventListener('click',()=>{
            let titre = card_entete.value;
            card_entete.addEventListener('blur',()=>{
                let change = card_entete.value;
                if (!checkTitle(change)) {    
                    card_entete.value=titre;
                }
            })
        })
        
        close.addEventListener('click', (e)=>{
            let btn1 = main.firstElementChild.childNodes[0]
            if(main.childElementCount>1 && container.id!="container_1" || main.childElementCount==1){
                container.remove();
                cpt--;
                update_id_note();
                update_entete();
                update_id_card();
                update_textarea()
            }
            else e.preventDefault() 
        })
        cpt++ 
    } 
}
let j = 1;
function createUs(content,dat,hDebut,hFin) {
    const span_cache = document.createElement('span')
    const parentUs = document.querySelector('.note')
    const us = document.createElement('div');
    const span_prev = document.createElement('span');
    const btn_restaurer=document.createElement('button')
    const textarea = document.createElement('textarea');
    const delete_tache = document.createElement('span')
    const span_next = document.createElement('span');
    const divNoteToggle = document.createElement('div');
    const date = document.createElement('p');
    const heureDebut = document.createElement('p');
    const heureFin = document.createElement('p');
    us.setAttribute('class', 'us')
    textarea.setAttribute('class', 'textarea')
    // textarea.setAttribute('readonly','readonly')
    textarea.setAttribute('id','texterea_'+cpt);
    textarea.setAttribute('cols', "5")
    textarea.setAttribute('rows', "3")
    span_next.setAttribute('class', 'span-next');
    span_prev.setAttribute('class', 'span-prev');
    divNoteToggle.setAttribute('class', 'noteToggle')
    span_cache.style.display= 'none'
    span_cache.setAttribute('class', 'cache')
    btn_restaurer.setAttribute('class','restaurer')
    us.setAttribute('id', 'us_'+j)
    delete_tache.setAttribute('class', 'delete-tache')
    span_cache.textContent="container_1";
    btn_restaurer.textContent="Restaurer"
    delete_tache.textContent="x"
    textarea.textContent=content;
    date.textContent="Date: "+dat;
    heureDebut.textContent="Heure debut: "+hDebut;
    heureFin.textContent="Heure Fin: "+hFin;
    span_prev.innerHTML="&#xab"
    span_next.innerHTML="&#xbb"
    divNoteToggle.append( date,heureDebut,heureFin,span_cache)
    us.append(btn_restaurer,delete_tache,span_prev,span_next,textarea,divNoteToggle);

    delete_tache.addEventListener('click', ()=>{
        const corb = document.querySelector('.corbeil-etat')
        corb.append(us)

    })
  
    btn_restaurer.addEventListener('click',()=>{
        const us_restaurer = btn_restaurer.parentElement
        const span_cach = btn_restaurer.parentElement.querySelector('.cache').innerHTML
        const container_origin = document.getElementById(span_cach).lastElementChild.lastChild; 
          if (container_origin!="") { 
              container_origin.append(us_restaurer);   
          }
          else {
                const container1 = document.getElementById('container_1') 
                console.log(container1);
            //   container1.append(us_restaurer)
            }

         
    })
    span_next.setAttribute('onClick',`deplacerNext(${j})`)
    span_prev.setAttribute('onClick',`deplacerPrev(${j})`)
    j++;
    return us
}

function deplacerNext(j) {
    const move = document.getElementById('us_'+j)
        const divMove = move.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastChild;
        if(move.parentElement.parentElement.parentElement.nextSibling !=""){
            divMove.append(move); 
            sapnCache()   
        } 
}

function deplacerPrev(j) {
    const move = document.getElementById('us_'+j)
    const divMove = move.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastChild;
    if(move.parentElement.parentElement.parentElement.previousElementSibling !=""){
        divMove.append(move);
        sapnCache()
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

function update_id_note() {
    const nootes = document.querySelectorAll('.note')
    nootes.forEach((noote,i)=>{
        i++;
        noote.setAttribute('id', 'note_'+i);
    })
}

function update_textarea() {
    const texts = document.querySelectorAll('.textarea')
    texts.forEach((tex,i)=>{
        i++; 
        tex.setAttribute('id','texterea_'+i);
    })
}

function checkTitle(titre) {
    if (titre!="") {
        return true;
    }
}
function disable(elt) {
    elt.setAttribute('disabled', 'disabled');
}
function compareDate(d1,d2) {
    if (Date.parse(d1) < Date.parse(d2) ) {
        return true;    
    }
}
function notifications(ch1,ch2,ch3,message,e) {
    e.preventDefault()
    ch1.classList.remove('show-modal')
    ch2.classList.add('show-erreur')
    ch3.textContent=message
}
function sapnCache() {
    const containers = document.querySelectorAll('.container')
    for (let i = 1; i <= containers.length; i++) {
        const id_containers = document.getElementById('container_'+i).querySelectorAll('.cache')
        id_containers.forEach(elt=>{
            elt.innerHTML="container_"+i
        })
    }
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

ajouter_tache.addEventListener('click', (e)=>{
    const textareaContent = document.querySelector('.textarea');
    let creeUs = document.querySelector('.note');
    let datUs = document.querySelector('.date')
    let hdeb = document.querySelector('.heure-debut')
    let hefin = document.querySelector('.heure-fin')
    let heure_deb = datUs.value+' '+hdeb.value;
    let heure_fi = datUs.value+' '+hefin.value;
    let date_actuelle = new Date().getTime();
    
    if (note_textarea.value!="" && datUs.value!="" && hdeb.value!="" && hefin.value!="") {
        if (!compareDate(date_actuelle,heure_deb)) {
            if (compareDate(heure_deb,heure_fi)) {
                let uss = createUs(note_textarea.value, datUs.value, hdeb.value,hefin.value);
                let sms = "La tache est bien ajouter"
                creeUs.append(uss)
                e.preventDefault()
                modal.classList.remove('show-modal')
                // notifications(modal,notification,message_notification,sms,e)
            }
            else{
                let sms = "L'heure de fin ne doit pas inferieur a l'heure de debut"
                notifications(modal,notification,message_notification,sms,e)
            }
        }
        else{
            let sms = "La date de debut ne doit pas inferieur a la date actuelle"
            notifications(modal,notification,message_notification,sms,e)
        }
    }
    else{
        let sms = "Les champs ne doit pas vide"
        e.preventDefault()
        notifications(modal,notification,message_notification,sms,e)
    }
  
    // const span_caches = document.querySelectorAll('.cache')
    // span_caches.forEach(element => {
    //     element.innerHTML="ca"
    //     console.dir(element)
    // });
})

icon_corbeil.addEventListener('click', ()=>{
    corbeil.classList.add('show-corbeil')
})

fermer_corbeil.addEventListener('click', ()=>{
    corbeil.classList.remove('show-corbeil')

})

btn_notif.addEventListener('click',()=>{notification.classList.remove('show-erreur')})

