/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require("fs");
var readlineSync = require("readline-sync");
var contacts = [];
function loadData() {
  var fileContent = fs.readFileSync("./data.json", { encoding: "utf8" });
  contacts = JSON.parse(fileContent);
}
function showMenu() {
  console.log("1. Show all contacts");
  console.log("2. Add a new contact");
  console.log("3. Edit contacts");
  console.log("4. Delete contacts");
  console.log("5. Save & Exit");
  var option = readlineSync.question("> ");
  switch (option) {
    case "1":
      showContacts();
      showMenu();
      break;
    case "2":
      addNewContact();
      showMenu();
      break;
    case "3":
      editContact();
      showMenu();
      break;
    case "4":
      deleteContact();
      showMenu();
      break;
    case "5":
      console.log("Contact saved");
      saveAndExit();
      break;
    default:
      console.log("Wrong option!");
      showMenu();
      break;
  }
}
function sortContact(arr) {
  return arr.sort((a, b) => {
    if (a.name > b.name) return 1;
  });
}
function showContacts() {
  sortContact(contacts);
  for (var contact of contacts) {
    console.log("Name: ", contact.name, " ", "Mobile: ", contact.mobile);
  }
}
function addNewContact() {
  var name = readlineSync.question("Name: ");
  var mobile = readlineSync.question("Mobile: ");
  var id = 0;
  for (var contact of contacts) {
    id = Math.max(contact.id) + 1;
  }
  var contact = {
    id: id,
    name: name,
    mobile: mobile,
  };
  contacts.push(contact);
}
function editContact() {
  var idEdit = readlineSync.question("Press id to edit:");
  idEdit = parseInt(idEdit);
  for (var contact of contacts) {
    if (contact.id === idEdit) {
      var newMobile = readlineSync.question("Press new mobile:");
      contact.mobile = newMobile;
      saveAndExit();
    }
  }
}
function deleteContact() {
  var idDelete = readlineSync.question("Press id to delete:");
  idDelete = parseInt(idDelete);
  for (var contact of contacts) {
    if (contact.id === idDelete) {
      var findId = contacts.indexOf(contact);
      contacts.splice(findId, 1);
      saveAndExit();
    }
  }
}
function saveAndExit() {
  var content = JSON.stringify(contacts);
  fs.writeFileSync("./data.json", content, { encoding: "utf8" });
}
function main() {
  loadData();
  showMenu();
}
main();
