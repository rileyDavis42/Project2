// Need to do...
// -Fix issues with spaces in name and trying to edit.
// -Enable feature to remove completed items.

class Item{
    constructor(name, done){
        this.name = name;
        this.done = done;
    }
    mark(){
        this.done = !this.done;
    }
}

class List{
    constructor(name){
        this.name = name;
        this.items = [];
    }
    add(name, done){
        let item = new Item(name, done);
        this.items.push(item);
    }
}

let lists = [];

let sheet = document.createElement('style');

document.body.appendChild(sheet);

//This starting function will find out the color of the website, then calls upload() to add all the lists from local storage
(function () {
    let colorCookie = localStorage.getItem('color');
    if(colorCookie === 'red'){
        color('red');
    }
    else if(colorCookie === 'green'){
        color('green');
    }
    else if(colorCookie === 'blue'){
        color('blue');
    }
    else{
        color('');
        sheet.id = "sheet";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
    }
    upload();
})
();

//Used for creating a new list, checks to make sure the list doesn't already exist and adds it to local storage if not
function createList(name){
    name = name.replace(/[^a-zA-Z ]/g, "");
    if(name.length < 1){
        return;
    }
    for(let i = 0; i < lists.length; i++){
        if('list_' + name === lists[i].name){
            alert("That list already exists!");
            return;
        }
    }
    lists.push(new List('list_' + name));
    download();
    add(name);
}

//Used for making a list in HTML, does not interact with local storage
function add(name){
    //Creating the div
    $('#lists').append(
        "<div class='list' id='list_" + name + "'>" +
        "<div class='listHead'>" +
        "<h5 contenteditable='true' onkeydown=\"editList('" + name + "')\">" + name + "</h5>" +
        "<i class=\"fas fa-trash alt\" onclick=\"delet('list_" + name + "')\"></i>" +
        "</div> " +
        "<div class='itemAdd'><a href=\"javascript:addItem('list_" + name + "', prompt(\'What would you like to name the item?\'))\" class='add'>Add item</a></div>" +
        " </div>"
        );
}

//Adds an item to a list, and updates the list afterwards
function addItem(id, name){
    if(name.length > 0){
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === id){
                lists[i].add(name, false);
            }
        }
        updateList(id);
        download();
    }
}

//Deletes an entire list, both from the page and from the local storage
function delet(id){
    if(confirm("Are you sure?")){
        let element = document.getElementById(id);
        element.parentNode.removeChild(element);
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === id){
                lists.splice(i, 1);
            }
        }
        download();
    }
}

function editList(id){
    id = id.replace(/nbsp/g, ' ');
    console.log(id);
    setTimeout(function(){
        let list = getFullName(id);
        let listObj = $('#' + list);
        let obj = listObj.find('h5');
        let trash = listObj.find('i');
        let txt = obj.html();
        txt = txt.replace(/[^a-zA-Z ]/g, "");
        txt = txt.replace(/nbsp/g, ' ');
        let parent = obj.parent();
        parent = parent.parent();
        parent.attr('id', getFullName(txt));
        obj.attr('onkeydown', "editList(\'" + txt + "\')");
        trash.attr('onclick', "delet('" + txt + "')");
        for(let i = 0; i < lists.length; i++){
            if(lists[i].name === list){
                lists[i].name = getFullName(txt);
            }
        }

        download();
    } , 100);
}

//Changes the color scheme of the page
function color(color){
    if(color === 'red'){
        document.body.style.backgroundColor = "red";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        localStorage.setItem('color', 'red')
    }
    else if(color === 'green'){
        document.body.style.backgroundColor = "#2ECC71";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        localStorage.setItem('color', 'green')
    }
    else if(color === 'blue'){
        document.body.style.backgroundColor = "deepskyblue";
        sheet.innerHTML = "body{color: #FFFFFF} .listHead, .item{color: #000000}";
        localStorage.setItem('color', 'blue');
    }
    else{
        document.body.style.backgroundColor = "#FFFFFF";
        sheet.innerHTML = ".list{background-color: rgba(0, 0, 0, 0.35);}";
        localStorage.setItem('color', 'white');
    }
}

//Updates a list with all of it's items
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

        //Div for trash and check box
        let interact = document.createElement('div');
        let interactClass = document.createAttribute('class');
        interactClass.value = "interact";
        interact.setAttributeNode(interactClass);

        //Trash
        let trash = document.createElement('i');
        let trashClass = document.createAttribute('class');
        let trashHref = document.createAttribute('onclick');
        trashClass.value = "fas fa-trash alt";
        trashHref.value = "deletItem('" + list.name + "', '" + list.items[i].name + "')";
        trash.setAttributeNode(trashClass);
        trash.setAttributeNode(trashHref);
        //let trash = $("<i class = \"fas fa-trash alt\" href=\"javascript:deletItem('list_" + list.name + ", " + list.items[i].name + "')></i>");

        //Check Box
        let checkBox = document.createElement('a');
        let checkBoxClass = document.createAttribute('class');
        let checkBoxHref = document.createAttribute('href');
        let checkBoxId = document.createAttribute('id');
        checkBoxClass.value = "check";
        checkBoxId.value = id + "_" + list.items[i].name;
        checkBoxHref.value = "javascript:check('" + id + '\',\'' + checkBoxId.value + "')";
        checkBox.setAttributeNode(checkBoxClass);
        checkBox.setAttributeNode(checkBoxHref);
        checkBox.setAttributeNode(checkBoxId);

        //Text
        let txt = document.createElement('span');
        txt.innerHTML = list.items[i].name;

        //Final Stuff
        nodeClass.value = 'item';
        node.setAttributeNode(nodeClass);
        node.appendChild(txt);
        interact.appendChild(trash);
        interact.appendChild(checkBox);
        node.appendChild(interact);
        docList.appendChild(node);
        check(id, checkBoxId.value);
        check(id, checkBoxId.value);
    }
}

function deletItem(listName, itemName){
    if(confirm("Are you sure you want to delete item '" + itemName + "'?")){
        let index = getList(listName);
        let list = lists[index];
        //let item = list.items[getItem(list, itemName)];
        lists[index].items.splice(getItem(list, itemName), 1);
        updateList(listName);
        download();
    }
}

//Function for checking and unchecking boxes on items
function check(listID, itemID){
    let obj = document.getElementById(itemID);
    let txt = $(obj).parent().parent();
    let span = txt.find('span').html();
    let list;
    let index = 0;
    for(let i = 0; i < lists.length; i++){
        if(lists[i].name === listID)
            list = lists[i];
    }
    for (let i = 0; i < list.items.length; i++){
        if(list.items[i].name === span){
            index = i;
        }
    }
    let parent = obj.parentNode.parentNode;
    if(list.items[index].done){
        parent.style.backgroundColor = "#FFFFFF";
        obj.innerHTML = "";
        parent.style.textDecoration = "none";
        list.items[index].done = false;
    }
    else{
        obj.innerHTML = '<i class=\"fas fa-check\"></i>';
        parent.style.textDecoration = "line-through";
        parent.style.backgroundColor = "#8AF7B8";
        list.items[index].done = true;
    }
    download();
}

//Gets local storage data and converts it into lists
function upload(){
    if(localStorage.getItem("lists")){
        let newLists = JSON.parse(localStorage.getItem("lists"));
        for(let i = 0; i < newLists.length; i++){
            let list = new List(newLists[i].name);
            for(let j = 0; j < newLists[i].items.length; j++){
                list.add(newLists[i].items[j].name, newLists[i].items[j].done);
            }
            lists.push(list);
            add(getListName(list.name));
            if(list.items.length > 0){
                updateList(list.name);
            }
        }
    }
}

//Ideally saves all data on lists to the local storage
function download(){
    localStorage.setItem("lists", JSON.stringify(lists))
}

//Finds a list and returns the index of it in array "lists"
function getList(listName){
    for(let i = 0; i < lists.length; i++){
        if(lists[i].name === listName){
            return i;
        }
    }
}

//Returns index of specific item in a given list
function getItem(list, itemName){
    for(let i = 0; i < list.items.length; i++){
        if(list.items[i].name === itemName){
            return i;
        }
    }
}

//Returns the name of a list without the 'list_' at the beginning
function getListName(list){
    return list.substr(5, list.length);
}

//Returns the passed in string but with 'list_' at the beginning, for html finding purposes.
function getFullName(list){
    return "list_" + list;
}
