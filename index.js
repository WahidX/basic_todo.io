// Local vars
var index = 0;
var count = 0;

// Useful Elements
var countTag = document.getElementById("incomplete-count");
var inputText = document.getElementById("input");
var addbtn = document.getElementById("add");
var clearbtn = document.getElementById("clear-btn");
var allNotes = document.getElementsByClassName("note");
var noteContainer = document.getElementById("note-container");

// EventListeners
addbtn.addEventListener("click", addNote);
clearbtn.addEventListener("click",clearAll);


// Functions

function clearAll(){
    while (noteContainer.firstChild) {
        noteContainer.removeChild(noteContainer.firstChild);
    }
    count=0;
    updateCount(count);
}



function addNote(){
     if (inputText.value.trim == ""){
        window.alert("Nothing is typed");
        return;
    }
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = "<input type=\"checkbox\" id="+index+" class=\"note-input\" onclick=\"checkClicked(this)\"><label for="+ index +">"+ inputText.value +"</label><button onclick=\"deleteNote(this)\"><i class=\"fas fa-times\"></i></button>";
        
    noteContainer.appendChild(noteDiv);
    index++;
    
    inputText.value = "";
    updateCount(++count);
}

function checkClicked(ele){
    if (ele.checked){
        var text = ele.parentElement.childNodes[1].innerHTML;
        ele.parentElement.childNodes[1].innerHTML = "<strike>"+text+"</strike>";
        updateCount(--count);
    }
    else{
        var text = ele.parentElement.childNodes[1].firstChild.innerHTML;
        ele.parentElement.childNodes[1].innerHTML = text;
        updateCount(++count);
    }
}

function deleteNote(ele){
    if(ele.parentNode.childNodes[0].checked != true)
        updateCount(--count);
    ele.parentElement.remove();
}

function updateCount(count){
    countTag.innerHTML = count + " pending";
}


function toggleCheck(ele){
    
    var children = allNotes;
    if (ele.innerHTML == "All"){
        for (var i=0;i<children.length;i++){    
            children[i].style.display = "block";
        }
    }
    else if(ele.innerHTML == "Incomplete"){
        for (var i=0;i<children.length;i++){
            if (children[i].firstChild.checked)
                children[i].style.display = "none";
            else
                children[i].style.display = "block";
        }
    }
    else{
        for (var i=0;i<children.length;i++){
            if (children[i].firstChild.checked)
                children[i].style.display = "block";
            else
                children[i].style.display = "none";
        }
    }   
}



function completeAll(){
    var children = allNotes;
    for (var i=0;i<children.length;i++){    
        if(! children[i].firstChild.checked){
            children[i].firstChild.checked = true;
            checkClicked(children[i].firstChild);
        }    
    }
}

function clearCompleted(){
    var children = allNotes;
    for (var i=0;i<children.length;i++){    
        if(children[i].firstChild.checked){
            children[i].remove();
            i--;
        }
    }
}
