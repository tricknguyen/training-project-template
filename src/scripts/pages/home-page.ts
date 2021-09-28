import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import { File } from '../model/File';



let file: File;
let index : number=0;
function adddata(btn: HTMLButtonElement) {
  btn.onclick = function () {
    index = index +1;
    file = {
      id: index,

      NameFile: (<HTMLInputElement>document.querySelector("#txtName")).value,

      type: 'default',

      createBy: 'Vu Nguyen',

      createAt: (<HTMLInputElement>document.querySelector("#txtModify")).value,

      modifiedAt: (<HTMLInputElement>document.querySelector("#txtModify")).value,

      modifiedBy: (<HTMLInputElement>document.querySelector("#txtModifyBy")).value
    };
    let data =
      localStorage.info == null ? [] : JSON.parse(localStorage.info);

    data.push({
      "id": file.id,
      "namefile": file.NameFile,
      "modify": file.modifiedAt,
      "modifyby": file.modifiedBy
    });

    localStorage.info = JSON.stringify(data);

    alert("Created");

    list();
  }
}

function list() {
  let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);
  let table = (<HTMLTableElement>document.querySelector("#tbData"));
  table.innerHTML = "";
  data.forEach((element: any) => {
    table.innerHTML +=
      `
      <div class="row" id="row-2">
        <div class="col-1 space"></div>
          <div class="col-1 icon">
            <img src="https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/20/folder.svg?v6"
                        width="16px" height="16px">
          </div>
          <div class="col-3 name">
            <span class="flex-box" >
              <span class="name-text">${element.namefile}</span>
            </span>
          </div>
          <div class="col-2 modify">
            <span class="flex-box">
              <span>${element.modify}</span>
            </span>
          </div>
          <div class="col-2 modify">
            <span class="flex-box">
              <span>${element.modifyby}</span>
            </span>
          </div>
          <div class="col option">
            <span class="flex-box">
              <span onclick="edit(${element.id})">Delete</span>
              <span onclick="delete(${element.id})">Delete</span>
            </span>
          </div>
        </div>
      `;
  });
}

function edit (doc: any) {

  
  let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);
  console.log(data);
  let namefile = (<HTMLInputElement>document.querySelector("#txtDocumento"));
  let modifiedAt = (<HTMLInputElement>document.querySelector("#txtModify"));
  let modifiedBy = (<HTMLInputElement>document.querySelector("#txtModifyBy"));

  let btnCreate = (<HTMLButtonElement>document.querySelector("#btnCreate"));
  let btnEdit = (<HTMLButtonElement>document.querySelector("#btnEdit"));

  let result = data.find((e: any) => e.id == doc);

  if (result != undefined) {

    btnCreate.style.display = "none";
    btnEdit.style.display = "block";

    namefile.value = result.namefile;
    modifiedAt.value = result.modify;
    modifiedBy.value = result.modifyby;

  }
  else {
    alert("No items found");
  }
}

ready(() => {
  renderGrid();
  let createButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnCreate");
  adddata(createButton);
  list();
});


