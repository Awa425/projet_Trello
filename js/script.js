let couleur = [
    '#505050',
    '#bcbcbc'
];
const API_url_lister = `http://localhost/projet_trello_cote_back/public/?controller=tache&action=sauvegardeEtat`;

const main = document.getElementById('main');
const header = document.querySelector('.header')
const add_column = document.getElementById('add-column')
const add_task = document.getElementById('add-task')
const sauvegarderEtat = document.getElementById('Sauvegarder')
const modal = document.querySelector('.modal')
const modal_close = document.querySelector('.modal-close')
const ajouter_tache = document.getElementById('ajouter')
const modifier_tache = document.getElementById('modifier')
const note_textarea = document.getElementById('note-textarea')
const text_are = document.querySelectorAll('.textarea')
const dateUs = document.querySelector('.date')
const heure_deb = document.querySelector('.heure-debut')
const heure_fin = document.querySelector('.heure-fin')
const corbeil_content = document.querySelector('.corbeil-content')
const fermer_corbeil = document.querySelector('.fermer-corbeil')
const icon_corbeil = document.querySelector('.icon-corbeil')
const corbeil = document.querySelector('.corbeil')
const notification = document.querySelector('.notification')
const message_notification= document.querySelector('.notification-content')
const btn_notif = document.querySelector('.btn-notification')


listerEtat(API_url_lister)
let cpt = 1;
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
let cpt_us=1;
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
    textarea.setAttribute('readonly','readonly')
    textarea.setAttribute('id','texterea_'+cpt_us);
    textarea.setAttribute('cols', "5")
    textarea.setAttribute('rows', "3")
    span_next.setAttribute('class', 'span-next');
    span_prev.setAttribute('class', 'span-prev');
    divNoteToggle.setAttribute('class', 'noteToggle')
    span_cache.style.display= 'none'
    span_cache.setAttribute('class', 'cache')
    btn_restaurer.setAttribute('class','restaurer')
    us.setAttribute('id', 'us_'+cpt_us)
    delete_tache.setAttribute('class', 'delete-tache')
    span_cache.textContent="container_1";
    btn_restaurer.textContent="Restaurer"
    delete_tache.textContent="x"
    textarea.textContent=content;
    date.textContent=dat;
    heureDebut.textContent=hDebut;
    heureFin.textContent=hFin;
    span_prev.innerHTML="&#xab"
    span_next.innerHTML="&#xbb"
    divNoteToggle.append( date,heureDebut,heureFin,span_cache)
    us.append(btn_restaurer,delete_tache,span_prev,span_next,textarea,divNoteToggle);

    delete_tache.addEventListener('click', ()=>{
        const corb = document.querySelector('.corbeil-etat')
        corb.append(us)
    })
    textarea.addEventListener('dblclick',()=>{
        console.dir(textarea.parentElement)
        let tex = textarea.parentElement.childNodes[4].innerHTML;
        let dte = textarea.nextSibling.childNodes[0].textContent
        let hd = textarea.nextSibling.childNodes[1].textContent
        let hf = textarea.nextSibling.childNodes[2].textContent
        // clearChamps()
        modal.classList.add('show-modal');
        modifier_tache.classList.add('show-btn-modifier')
        ajouter_tache.classList.remove('show-btn-ajouter')
        note_textarea.value=tex;
        dateUs.value=dte;
        heure_deb.value=hd
        heure_fin.value=hf;
        modifier_tache.addEventListener('click', (e)=>{
        modal.classList.remove('show-modal');
            e.preventDefault()
            textarea.parentElement.childNodes[4].value=note_textarea.value;
            textarea.nextSibling.childNodes[0].textContent= dateUs.value;
            textarea.nextSibling.childNodes[1].textContent= heure_deb.value;
            textarea.nextSibling.childNodes[2].textContent= heure_fin.value;
        })
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
              container1.appendChild(us_restaurer)
            }    
    })
    span_next.setAttribute('onClick',`deplacerNext(${j})`)
    span_prev.setAttribute('onClick',`deplacerPrev(${j})`)
    j++;
    cpt_us++;
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
function clearChamps() {
    let champs=[note_textarea, dateUs, heure_deb, heure_fin]
    champs.forEach(champ=>{
        champ.value="";
    })
}
function id_us() {
    const containers = document.querySelectorAll('.container')
    for (let x = 1; x <= containers.length; x++) {
        const id_us = document.getElementById('container_'+x).querySelectorAll('.us')
        id_us.forEach((id,k)=>{
            k++;
            id.setAttribute('id', 'us_'+k+'_container_'+x);
        }) 
       
    }
}
function addEtat() {
    const containers = document.querySelectorAll('.container')
    let tableauUs = []
    for (let x = 1; x <= containers.length; x++) {
        const us = document.getElementById('container_'+x).querySelectorAll('.us')
        num_colonne = document.getElementById('container_'+x).childNodes[1].childNodes[0].value
        let tab_element = []
        us.forEach(elt=>{
            tab_element.push( 
                {
                    text : elt.childNodes[4].innerHTML,
                    date : elt.childNodes[5].childNodes[0].innerHTML,
                    heureDebut : elt.childNodes[5].childNodes[1].innerHTML,
                    heureFin : elt.childNodes[5].childNodes[2].innerHTML
                }
            )
        })  
        tableauUs.push(tab_element)
    }
    
    fetch(API_url_lister, 
        {
            method : "POST",
            body : JSON.stringify(
                {
                    tableauUs:tableauUs
                }
            )
        })
}
async function listerEtat(url){
    let response = await fetch(url)
    let donneesJson = await response.json();
    for (let i = 0; i < donneesJson.Tableau.tableauUs.length; i++) { 
        createColumn(); i++;
        let containerOrigin = document.getElementById(`container_${i}`).querySelector('.note'); i--;
        for (let j = 0; j < donneesJson.Tableau.tableauUs[i].length; j++) {
            let content = donneesJson.Tableau.tableauUs[i][j].text
            let dat = donneesJson.Tableau.tableauUs[i][j].date
            let hDebut = donneesJson.Tableau.tableauUs[i][j].heureDebut
            let hFin = donneesJson.Tableau.tableauUs[i][j].heureFin
            let tache = createUs(content,dat,hDebut,hFin);
            containerOrigin.appendChild(tache)
        }
    }
}

let myTimeOute = setInterval(function(){
    const taches= document.querySelectorAll('.us')
    taches.forEach(tache=>{
        let date = tache.lastElementChild.childNodes[0].innerHTML;
        let dateDeb = Date.parse(date+' '+tache.lastElementChild.childNodes[1].innerHTML);
        let dateFin = Date.parse(date+' '+tache.lastElementChild.childNodes[2].innerHTML);
        let currentTime = new Date().getTime()
        if(currentTime<dateDeb){tache.style.backgroundColor='grey'}
        if(currentTime>dateDeb && currentTime<dateFin){tache.style.backgroundColor='red'}
        if(currentTime>=dateFin){tache.style.backgroundColor='green'}

      
       })
},1000)
add_column.addEventListener('click', ()=>{
    createColumn()
})

add_task.addEventListener('click',()=>{
    if(main.childElementCount!=0){
        // clearChamps()
        modal.classList.add('show-modal');
        modifier_tache.classList.remove('show-btn-modifier')
        ajouter_tache.classList.add('show-btn-ajouter')
    }
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
    let heure_deb = Date.parse(datUs.value+' '+hdeb.value);
    let heure_fi = Date.parse(datUs.value+' '+hefin.value);
    let date_actuelle = new Date().getTime();   
    if (note_textarea.value!="" && datUs.value!="" && hdeb.value!="" && hefin.value!="") {
        if (date_actuelle<heure_deb) {
            if ((heure_deb<heure_fi)) {
                let uss = createUs(note_textarea.value, datUs.value, hdeb.value,hefin.value);
                let sms = "La tache est bien ajouter"
                creeUs.append(uss)
                e.preventDefault()
                modal.classList.remove('show-modal')
                // test();
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
})

sauvegarderEtat.addEventListener('click', ()=>{
    addEtat()
})
icon_corbeil.addEventListener('click', ()=>{
    corbeil.classList.add('show-corbeil')
})
fermer_corbeil.addEventListener('click', ()=>{
    corbeil.classList.remove('show-corbeil')
})
btn_notif.addEventListener('click',()=>{notification.classList.remove('show-erreur')})
