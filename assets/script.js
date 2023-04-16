let list1 = [
  { country: "Germany", selected: false },
  { country: "France", selected: false },
  { country: "Austria", selected: false },
  { country: "Denmark", selected: false },
];
let list2 = [
  { country: "China", selected: false },
  { country: "Pakistan", selected: false },
  { country: "India", selected: false },
  { country: "Indonesia", selected: false },
  { country: "Nepal", selected: false },
  { country: "Thailand", selected: false },
  { country: "Yemen", selected: false },
];
let selectedOption;

function renderLists() {
  let list1Html = "";
  let list2Html = "";

  list1.forEach((item, index) => {
    let selectedClass = item.selected ? "selected" : "";
    list1Html += `<div  onclick="selectOption('list1', ${index})" class="option ${selectedClass}" data-value="${item.country}">${item.country}</div>`;
  });

  list2.forEach((item, index) => {
    let selectedClass = item.selected ? "selected" : "";
    list2Html += `<div  onclick="selectOption('list2', ${index})" class="option ${selectedClass}" data-value="${item.country}">${item.country}</div>`;
  });

  document.querySelector("#list1").innerHTML = list1Html;
  document.querySelector("#list2").innerHTML = list2Html;
}

renderLists();

function selectOption(listType, optionIndex) {
  list1.forEach((option) => (option.selected = false));
  list2.forEach((option) => (option.selected = false));
  let list = [];
  if (listType == "list1") list = list1;
  else list = list2;

  list[optionIndex].selected = true;
  selectedOption = {
    listType: listType,
    index: optionIndex,
  };

  renderLists();
}

function moveUp() {
  if (!selectedOption) return false;

  let list = selectedOption.listType == "list1" ? list1 : list2;
  if (selectedOption.index > 0) {
    let optionToMove = list.splice(selectedOption.index, 1)[0];
    let newIndex = selectedOption.index - 1;
    selectedOption.index = newIndex;
    list.splice(newIndex, 0, optionToMove);
  }

  renderLists();
}

function moveDown() {
  if (!selectedOption) return false;

  let list = selectedOption.listType == "list1" ? list1 : list2;
  let lastIndex = list.length - 1;
  if (selectedOption.index != lastIndex) {
    let optionToMove = list.splice(selectedOption.index, 1)[0];
    let newIndex = selectedOption.index + 1;
    selectedOption.index = newIndex;
    list.splice(newIndex, 0, optionToMove);
  }

  renderLists();
}

function moveH(direction) {
  if (!selectedOption) return false;

  if (direction == "left" && selectedOption.listType == "list2") {
    // move from right to left
    let optionToMove = list2.splice(selectedOption.index, 1)[0];
    list1.push(optionToMove);
    selectedOption = {
      index: list1.length - 1,
      listType: "list1",
    };
  } else if (direction == "right" && selectedOption.listType == "list1") {
    // move from left to right
    let optionToMove = list1.splice(selectedOption.index, 1)[0];
    list2.push(optionToMove);
    selectedOption = {
      index: list2.length - 1,
      listType: "list2",
    };
  }

  renderLists();
}

function moveAllOptions(direction) {
  if (direction === "left") {
    list1 = [...list1, ...list2];
    list2 = [];
  } else {
    list2 = [...list2, ...list1];
    list1 = [];
  }
  renderLists();
}

function removeSelectedOption() {
  let list = selectedOption.listType == "list1" ? list1 : list2;

  list.splice(selectedOption.index, 1);
  renderLists();
  selectedOption = undefined;
}
