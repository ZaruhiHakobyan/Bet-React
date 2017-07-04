class Contact {
    constructor (firstName, lastName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    getContactInfo () {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber
        }
    }
    static match (contact1, contact2) {
        if( contact1.firstName == contact2.firstName &&
            contact1.lastName == contact2.lastName &&
            contact1.phoneNumber == contact2.phoneNumber ) {

            return true;
        }
        return false;
    }
    static containsString (str, contact) {
        let strLow = str.toLowerCase();
        let fName = contact.firstName.toLowerCase();
        let lName = contact.lastName.toLowerCase();
        if( fName.indexOf(strLow) >= 0 ||
            lName.indexOf(strLow) >= 0 ||
            contact.phoneNumber.indexOf(strLow) >= 0 ){

            return true;
        }
        return false;
    }
    static render(contact){
        let ul = $('.contact_list_ul');
        let bigSpace = '<div class="bigSpace_div"></div>';
        let delete_btn = '<div class="delete_btn"><i class="fa fa-times" aria-hidden="true"></i></div>';
        let list_item = $('<li><span class="li_contact_fName">' + contact.firstName +
            '</span><span class="li_contact_lName">' + contact.lastName +
            '</span><span class="li_contact_pNumber">' + contact.phoneNumber + '</span>' +
            bigSpace + delete_btn + '</li>');
        ul.append(list_item);
    }
}



class ContactsList{
    constructor(){
        this.items = new Array();
    }
    getListCount () {
        return this.items.length;
    }
    addContact (firstName, lastName, phoneNumber) {
         let newContact = new Contact(firstName, lastName, phoneNumber);
         this.items.push(newContact);
    }
    deleteContact (firstName, lastName, phoneNumber) {
        let delContact = new Contact(firstName, lastName, phoneNumber);
        for (let i = 0; i < this.items.length; i++) {
            if (Contact.match(this.items[i], delContact)) {
                this.items.splice(i, 1);
            }
        }
    }
    searchContact (str){
        let filteredArr = [];
        for (let i = 0; i < this.items.length; i++) {
            if (Contact.containsString(str, this.items[i])) {
                filteredArr.push(this.items[i]);
            }
        }
        return filteredArr;
    }
    static render (items){
        let ul = $('.contact_list_ul');
        ul.empty();
        for (let i = 0; i < items.length; i++) {
            Contact.render(items[i]);
        }
    }
}

let list = new ContactsList();
list.addContact('Zaruhi', 'Hakobyan', '111112');
list.addContact('Henry', 'Williams', '32456632');
list.addContact('Albert', 'Nilson', '546248');
list.addContact('Bob', 'Marley', '111112');
list.addContact('John', 'Smith', '8796512');

$(document).ready(function(){
    ContactsList.render(list.items);
    let ul = $('.contact_list_ul');
    $('.add_btn').click(function(){
        let contact = {
            fName: $('.add_fName_inp').val(),
            lName: $('.add_lName_inp').val(),
            pNum: $('.add_pNumber_inp').val()
        }
        let newContact = new Contact(contact.fName, contact.lName, contact.pNum);
        if( contact.fName.length > 0 ||
            contact.lName.length > 0 ||
            contact.pNum.length > 0 ){

            list.addContact(contact.fName, contact.lName, contact.pNum);
            Contact.render(newContact);
        }
    })
    $('.search_btn').click(function(){
        let str = $('.search_inp').val();
        let filtered = list.searchContact(str);
        ContactsList.render(filtered);
    })
    $('.delete_btn').click(function(){
        let li = $(this).parent();
        let contact = {
            fName: li.find('.li_contact_fName').text(),
            lName: li.find('.li_contact_lName').text(),
            pNum: li.find('.li_contact_pNumber').text()
        }
        list.deleteContact(contact.fName, contact.lName, contact.pNum);
        li.hide(800);
        setTimeout(function(){
            li.remove();
        },2000);
    })
    $('.show_all_btn').click(function(){
        ul.html();
        ContactsList.render(list.items);
    })
})
