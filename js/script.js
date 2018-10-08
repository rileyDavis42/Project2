let lists = [];

(function () {
    let cookie = decodeURIComponent(document.cookie);
    if(cookie === 'color=red'){
        color('red');
    }
    else if(cookie === 'color=green'){
        color('green');
    }
    else if(cookie === 'color=blue'){
        color('blue');
    }
    else{
        color('');
    }
})
();

class List{
    constructor(name){
        this.name = name;
    }
}

function add(){
    let name = prompt("What would you like to name the list?");
    if(name.length < 1){
        return;
    }
    for(let i = 0; i < lists.length; i++){
        if(name === lists[i].name){
            alert("That name already exists!");
            return;
        }
    }
    lists.push(new List(name));

    //Creating the div
    let listsDiv = document.getElementById('lists');
    let node = document.createElement('div');
    let listClass = document.createAttribute('class');
    let listID = document.createAttribute('id');

    //Creating the name
    let title = document.createElement('h5');
    title.innerHTML = name;

    //adding the attributes and name
    listClass.value = "list";
    listID.value = "list_" + name;
    node.setAttributeNode(listClass);
    node.setAttributeNode(listID);
    node.appendChild(title);

    //Trash bin on the div
    let trash = document.createElement('i');
    let icon = document.createAttribute('class');
    icon.value = "fas fa-trash alt";
    let del = document.createAttribute('onclick');
    del.value = "delet(\'list_" + name + "\')";
    trash.setAttributeNode(icon);
    trash.setAttributeNode(del);
    node.appendChild(trash);

    listsDiv.appendChild(node);
}

function delet(id){
    if(confirm("Are you sure?")){
        let element = document.getElementById(id);
        element.parentNode.removeChild(element);
    }
}

function color(color){
    if(color === 'red'){
        document.body.style.backgroundColor = "red";
        document.cookie = "color=red; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else if(color === 'green'){
        document.body.style.backgroundColor = "#2ECC71";
        document.cookie = "color=green; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else if(color === 'blue'){
        document.body.style.backgroundColor = "deepskyblue";
        document.cookie = "color=blue; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else{
        document.body.style.backgroundColor = "#FFFFFF";
        document.cookie = "color=white; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
}