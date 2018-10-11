class List{
    constructor(name){
        this.name = name;
        this.items = [];
    }
    add(name){
        this.items.push(name);
    }
}

let lists = [];
let expirationDate = "Fri, 21 Dec 2018 12:00:00 UTC";

let sheet = document.createElement('style');

document.body.appendChild(sheet);

(function () {
    let cookie = decodeURIComponent(document.cookie);
    let cookieArr = cookie.split(';');
    if(cookieArr[0] === 'color=red'){
        color('red');
    }
    else if(cookieArr[0] === 'color=green'){
        color('green');
    }
    else if(cookieArr[0] === 'color=blue'){
        color('blue');
    }
    else{
        color('');
        sheet.id = "sheet";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
    }
    upload(cookieArr);
})
();

function add(name){
    if(name.length < 1){
        return;
    }
    for(let i = 0; i < lists.length; i++){
        if('list_' + name === lists[i].name){
            alert("That list already exists!");
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

    //Clear Completed
    //<i class="fas fa-check-double"></i>

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
    items.innerHTML = "<a href=\"javascript:addItem('" + listID.value + "', prompt(\'What would you like to name the item?\'))\" class='add'>Add item</a>";

    //Handling Head
    let listHeadClass = document.createAttribute('class');
    listHeadClass.value = "listHead";
    listHead.setAttributeNode(listHeadClass);

    //Creation
    lists.push(new List(listID.value));
    node.appendChild(listHead);
    node.appendChild(items);
    listsDiv.appendChild(node);
    download();
}

function addItem(id, name){
    if(name.length > 0){
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === id){
                lists[i].add(name);
            }
        }
        updateList(id);
    }
}

function delet(id){
    if(confirm("Are you sure?")){
        document.cookie = id + "=na; expires=Mon, 1 Oct 2018 00:00:00 UTC; path=/";
        let element = document.getElementById(id);
        element.parentNode.removeChild(element);
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === id){
                lists.splice(i, 1);
            }
        }
        let cookie = decodeURIComponent(document.cookie);
        let cookieArr = cookie.split(';');
        for(let i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].substr(1, id.length) === id){
                let krana = cookieArr[i].split('=');
                document.cookie = krana[0] + '=na; expires=Mon, 1 oct 2018 00:00:00 UTC; path=/';
            }
        }
    }
}

function color(color){
    if(color === 'red'){
        document.body.style.backgroundColor = "red";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=red; expires=" + expirationDate + "path=/colors/;";
    }
    else if(color === 'green'){
        document.body.style.backgroundColor = "#2ECC71";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=green; expires=" + expirationDate + "path=/colors/;";
    }
    else if(color === 'blue'){
        document.body.style.backgroundColor = "deepskyblue";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        document.cookie = "color=blue; expires=" + expirationDate + "path=/colors/;";
    }
    else{
        document.body.style.backgroundColor = "#FFFFFF";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
        document.cookie = "color=white; expires=" + expirationDate + "path=/colors/;";
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
    let resetHead = docList.getElementsByClassName("listHead")[0];
    let resetAdd = docList.getElementsByClassName("itemAdd")[0];
    docList.innerHTML = "";
    docList.appendChild(resetHead);
    docList.appendChild(resetAdd);

    //Adding all items
    for(let i = 0; i < list.items.length; i++){
        let node = document.createElement('div');
        let nodeClass = document.createAttribute('class');

        //Check Box
        let checkBox = document.createElement('a');
        let checkBoxClass = document.createAttribute('class');
        let checkBoxHref = document.createAttribute('href');
        let checkBoxId = document.createAttribute('id');
        checkBoxClass.value = "check";
        checkBoxId.value = id + "_" + list.items[i];
        checkBoxHref.value = "javascript:check('" + checkBoxId.value + "')";
        checkBox.setAttributeNode(checkBoxClass);
        checkBox.setAttributeNode(checkBoxHref);
        checkBox.setAttributeNode(checkBoxId);

        nodeClass.value = 'item';
        node.setAttributeNode(nodeClass);
        node.innerHTML = list.items[i];
        node.appendChild(checkBox);
        docList.appendChild(node);
    }
    download();
}

function check(id){
    let obj = document.getElementById(id);
    let parent = obj.parentNode;
    if(parent.style.textDecoration === "line-through"){
        parent.style.backgroundColor = "#FFFFFF";
        obj.innerHTML = "";
        parent.style.textDecoration = "none";
    }
    else{
        obj.innerHTML = '<i class=\"fas fa-check\"></i>';
        parent.style.textDecoration = "line-through";
        parent.style.backgroundColor = "#8AF7B8";
    }
}

function upload(cookie){
    for(let i = 0; i < cookie.length; i++){
        if(cookie[i].substr(cookie[i].length - 2, cookie[i].length) !== 'na') {
            if (cookie[i].substr(cookie[i].length - 4, cookie[i].length) === 'item') {
                let item = cookie[i].split(' ');
                item[2] = item[2].substr(0, item[2].length - 5);
                addItem(item[1], item[2])
            }
            else if (cookie[i].substr(1, 5) === 'list_') {
                let krana = cookie[i].substr(6, cookie[i].length);
                krana = krana.split('=');
                add(krana[0]);
            }
        }
    }
}

function download(){
    for(let i = 0; i < lists.length; i++){
        let thisList = lists[i];
        document.cookie = thisList.name + "=list" + "; expires=" + expirationDate + "; path=/";
        for(let j = 0; j < thisList.items.length; j++){
            let name = thisList.name + ' ' + thisList.items[i];
            document.cookie = name + "=item" + "; expires=" + expirationDate + "; path=/";
        }
    }
}
