window.onload = function() {
    const savedDictionary = JSON.parse(localStorage.getItem('dictionary'));
    if (savedDictionary) {
        for (let i = 0; i < savedDictionary.length; i++) {
            addDictionaryItem(savedDictionary[i]);
        }
    }

    const termInput = document.querySelector("#termInput");
    const definitionInput = document.querySelector("#definitionInput");
    const addBtn = document.querySelector("#addBtn");
    addBtn.addEventListener("click", function() {
        if (termInput.value != "" && definitionInput.value != "") addDictionaryItem();
    });
}

function saveItems() {
    const saveItems = [];
    const listArea = document.querySelector(".listArea");
    for (let node of listArea.children) {
        const termNode = node.querySelector('.termText');
        const definitionNode = node.querySelector('.definitionText');
        const dictionaryObj = {
            term: termNode.textContent,
            definition: definitionNode.textContent
        };
        saveItems.push(dictionaryObj);
    }
    localStorage.setItem('dictionary', JSON.stringify(saveItems));
}

function addDictionaryItem(savedItem) {
    const listArea = document.querySelector(".listArea");

    const liNode = document.createElement("li");
    const termText = document.createElement("span");
    const definitionText = document.createElement("span");
    const delBtn = document.createElement("button");

    liNode.appendChild(termText);
    liNode.appendChild(definitionText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);

    if (savedItem) {
        termText.innerText = savedItem.term;
        definitionText.innerText = savedItem.definition;
    } else {
        const termInput = document.querySelector("#termInput");
        const definitionInput = document.querySelector("#definitionInput");
        termText.innerText = termInput.value;
        definitionText.innerText = definitionInput.value;
        termInput.value = "";
        definitionInput.value = "";
    }

    termText.classList.add("termText");
    definitionText.classList.add("definitionText");
    delBtn.innerText = "X";
    delBtn.classList.add("delBtn");

    saveItems();

    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveItems();
    });
}
