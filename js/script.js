// Need to do...
// -add functionality to save list items to local storage
// -can edit names of the lists/items

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
    upload(1);
})
();

//Used for creating a new list, checks to make sure the list doesn't already exist and adds it to local storage if not
function createList(name){
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
    localStorage.setItem('list' + lists.length, 'list_' + name);
    add(name);
}

//Used for making a list in HTML, does not interact with local storage
function add(name){

    //Creating the div
    $('#lists').append(
        "<div class='list' id='list_" + name + "'>" +
        "<div class='listHead'>" +
        "<h5>" + name + "</h5>" +
        "<i class=\"fas fa-trash alt\" onclick=\"delet('list_" + name + "')\"></i>" +
        "</div> " +
        "<div class='itemAdd'><a href=\"javascript:addItem('list_" + name + "', prompt(\'What would you like to name the item?\'))\" class='add'>Add item</a></div>" +
        " </div>"
        );
    /*let listsDiv = document.getElementById('lists');
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
    node.appendChild(listHead);
    node.appendChild(items);
    //listsDiv.appendChild(node);
    */
}

//Adds an item to a list, and updates the list afterwards
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

        let items = Object.keys(localStorage);
        for(let i = 0; i < items.length; i++){
            if(localStorage.getItem(items[i]) === id){
                localStorage.removeItem(items[i]);
            }
        }
    }
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
}

//Function for checking and unchecking boxes on items
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

//Gets local storage data and converts it into lists
function upload(num){
    if(localStorage.getItem('list' + num)){
        let list = new List(localStorage.getItem('list' + num));
        lists.push(list);
        add(getListName(list.name));
        num++;
        upload(num);
    }
}

//Ideally saves all data on lists to the local storage
function download(){
    for(let i = 0; i < lists.length; i++){
        localStorage.setItem('list' + i, lists[i].name);
    }
}

//Returns the name of a list without the 'list_' at the beginning
function getListName(list){
    return list.substr(5, list.length);
}
