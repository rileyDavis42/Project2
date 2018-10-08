let lists = [];

let sheet = document.createElement('style');

document.body.appendChild(sheet);

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
        sheet.id = "sheet";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
    }
})
();

class List{
    constructor(name){
        this.name = name;
        this.items = [];
    }
    add(name){
        this.items.push(name);
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

    //Creating the div
    let listsDiv = document.getElementById('lists');
    let node = document.createElement('div');
    let listClass = document.createAttribute('class');
    let listID = document.createAttribute('id');
    let listHead = document.createElement('div');

    //Creating the name
    let title = document.createElement('h5');
    title.innerHTML = name;

    //adding the attributes and name
    listClass.value = "list";
    listID.value = "list_" + name;
    node.setAttributeNode(listClass);
    node.setAttributeNode(listID);
    listHead.appendChild(title);

    //Trash bin on the div
    let trash = document.createElement('i');
    let icon = document.createAttribute('class');
    icon.value = "fas fa-trash alt";
    let del = document.createAttribute('onclick');
    del.value = "delet(\'list_" + name + "\')";
    trash.setAttributeNode(icon);
    trash.setAttributeNode(del);
    listHead.appendChild(trash);

    //Adding items
    let items = document.createElement('div');
    items.className = "itemAdd";
    items.innerHTML = "<a href=\"javascript:addItem('" + listID.value + "')\" class='add'>Add item</a>";

    //Handling Head
    let listHeadClass = document.createAttribute('class');
    listHeadClass.value = "listHead";
    listHead.setAttributeNode(listHeadClass);

    //Creation
    lists.push(new List(listID.value));
    node.appendChild(listHead);
    node.appendChild(items);
    listsDiv.appendChild(node);
}

function addItem(id){
    let name = prompt("What is the item titled?");
    if(name.length > 0){
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === id){
                lists[i].add(name);
            }
        }
        updateList(id);
    }
    else{
        alert("Name too short!");
    }
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
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=red; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else if(color === 'green'){
        document.body.style.backgroundColor = "#2ECC71";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=green; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else if(color === 'blue'){
        document.body.style.backgroundColor = "deepskyblue";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=blue; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
    else{
        document.body.style.backgroundColor = "#FFFFFF";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
        document.cookie = "color=white; expires=Fri, 21 Dec 2018 12:00:00 UTC; path=/";
    }
}

function updateList(id){
    //Gets list
    let list = new List();
    for(let i = 0; i < lists.length; i++){
        if(lists[i].name === id){
            list = lists[i];
        }
    }

    //Deleting all items
    let docList = document.getElementById(id);
    let resetHead = docList.getElementsByClassName("listgiHead")[0];
    let resetAdd = docList.getElementsByClassName("itemAdd")[0];
    docList.innerHTML = "";
    docList.appendChild(resetHead);
    docList.appendChild(resetAdd);

    //Adding all items
    for(let i = 0; i < list.items.length; i++){
        let node = document.createElement('div');
        let nodeClass = document.createAttribute('class');

        /*Check Box
        let checkBox = document.createElement('a');
        let checkBoxClass = document.createAttribute('class');
        let checkBoxHref = document.createAttribute('href');
        checkBoxClass.value = "check";
        checkBoxHref.value = "javascript:check()";
        checkBox.appendChild(checkBoxClass);
        checkBox.appendChild(checkBoxHref);*/

        nodeClass.value = 'item';
        node.setAttributeNode(nodeClass);
        node.innerHTML = list.items[i];
        //node.appendChild(checkBox);
        docList.appendChild(node);
    }
}