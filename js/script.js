// Need to do...
// -Fix issues with spaces in name and trying to edit.
// -Enable feature to remove completed items.

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
    //localStorage.setItem('list' + lists.length, 'list_' + name);
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
                lists[i].add(name);
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
function upload(){
    if(localStorage.getItem("lists")){
        let newLists = JSON.parse(localStorage.getItem("lists"));
        for(let i = 0; i < newLists.length; i++){
            let list = new List(newLists[i].name);
            for(let j = 0; j < newLists[i].items.length; j++){
                list.add(newLists[i].items[j]);
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

//Returns the name of a list without the 'list_' at the beginning
function getListName(list){
    return list.substr(5, list.length);
}

//Returns the passed in string but with 'list_' at the beginning, for html finding purposes.
function getFullName(list){
    return "list_" + list;
}
