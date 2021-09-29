import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import { File } from '../model/File';

namespace home {
  let file: File;
  let index = 0;
  let type : string;

  export function createfolder (btn : HTMLButtonElement)
  {
    btn.onclick = () => {
      type = 'folder';
    }
  }

  export function createfile (btn : HTMLButtonElement)
  {
    btn.onclick = () => {
      type = 'file';
    }
  }

  export function adddata(btn: HTMLButtonElement) {
    btn.onclick = function () {
      file = {
        id: index++,

        NameFile: (<HTMLInputElement>document.querySelector("#txtName")).value,

        type: 'folder',

        createBy: 'Vu Nguyen',

        createAt: (<HTMLInputElement>document.querySelector("#txtModify")).value,

        modifiedAt: (<HTMLInputElement>document.querySelector("#txtModify")).value,

        modifiedBy: (<HTMLInputElement>document.querySelector("#txtModifyBy")).value
      }

      file.type = type;

      let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);

      data.push({
        "id": file.id,
        "namefile": file.NameFile,
        "type" : file.type,
        "modify": file.modifiedAt,
        "modifyby": file.modifiedBy
      });

      localStorage.info = JSON.stringify(data);

      alert("Created");

      list();
    }
  }

  export function list() {

    let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    let table = (<HTMLTableElement>document.querySelector("#tbData"));
    table.innerHTML = "";
    data.forEach((element: any) => {
      if (element.type === 'folder')
      {table.innerHTML +=
        `
      <div class="row" id="row-2">
        <div class="col-1 space"></div>
          <div class="col-1 icon">
            <img src="https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/20/folder.svg?v6"
                        width="16px" height="16px">
          </div>
          <div class="col-3 name">
            <span class="flex-box" >
              <span class="name-text" onclick="home.edit(${element.id})">${element.namefile}</span>
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
              <span onclick="home.deleterow(${element.id})">Delete</span>
            </span>
          </div>
        </div>
      `;}
      else
      {table.innerHTML +=
        `
      <div class="row" id="row-2">
        <div class="col-1 space"></div>
          <div class="col-1 icon">
            <img src="https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/16_1.5x/docx.svg?v6"
                        width="16px" height="16px">
          </div>
          <div class="col-3 name">
            <span class="flex-box" >
              <span class="name-text" onclick="home.edit(${element.id})">${element.namefile}</span>
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
              <span onclick="home.deleterow(${element.id})">Delete</span>
            </span>
          </div>
        </div>
      `;}
    });
  }

  export function edit(doc: any) {

    let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);

    let namefile = (<HTMLInputElement>document.querySelector("#txtName"));
    let modifiedAt = (<HTMLInputElement>document.querySelector("#txtModify"));
    let modifiedBy = (<HTMLInputElement>document.querySelector("#txtModifyBy"));

    let btnCreate = (<HTMLButtonElement>document.querySelector("#btnCreate"));
    let btnEdit = (<HTMLButtonElement>document.querySelector("#btnEdit"));

    let result = data.find((e: any) => e.id === doc);

    if (result != undefined) {

      btnCreate.style.display = "none";
      btnEdit.style.display = "block";

      namefile.value = result.namefile;
      modifiedAt.value = result.modify;
      modifiedBy.value = result.modifyby;

    }
    else {
      console.log('hi');
      alert("No items found");
    }

    let editButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnEdit");
    editButton.onclick = () => {
      let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);

      let Namfile = (<HTMLInputElement>document.querySelector("#txtName")).value;
      let ModifyAt = (<HTMLInputElement>document.querySelector("#txtModify")).value;
      let ModifiedBy = (<HTMLInputElement>document.querySelector("#txtModifyBy")).value;

      let btnCreate = (<HTMLButtonElement>document.querySelector("#btnCreate"));
      let btnEdit = (<HTMLButtonElement>document.querySelector("#btnEdit"));
      let id = data.find((e: any) => e.id == doc).id;

      console.log(id);
      data[id].namefile = Namfile;
      data[id].modify = ModifyAt;
      data[id].modifyby = ModifiedBy;

      localStorage.info = JSON.stringify(data);

      btnCreate.style.display = "block";
      btnEdit.style.display = "none";

      list();
      alert("Modified");
    }
  }

  export function deleterow(id: number) {

    let data = localStorage.info == null ? [] : JSON.parse(localStorage.info);

    let result = data.findIndex((e: any) => e.id == id);
    console.log(result);
    if (result != -1) {

      data.splice(result, 1);

      localStorage.info = JSON.stringify(data);

      list();
    }
    else {
      alert("No items deleted!");
    }
  }
}

(window as any).home = home;
ready(() => {
  renderGrid();
  let createFolder: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnCreateFolder");
  let createFile: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnCreateFile");
  let createButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnCreate");
  home.adddata(createButton);
  home.list();
  home.createfolder(createFolder);
  home.createfile(createFile);

});






