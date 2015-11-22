Template.loggedout.events({
  'click #login': function () {
    Meteor.loginWithGoogle();
  }
});

Session.set("searchString", "");
Session.set("searchStringArray", "");

Template.loggedin.events({
  "submit .new-field": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    var f_name = event.target.field_name.value;
    var f_value = event.target.field_value.value;

    // Get value from form element
    if(f_name == "" || f_value == ""){
      event.target.field_name.setAttribute("class", "invalid");
      event.target.field_value.setAttribute("class", "invalid");
      return false;
    } else {
      
      Meteor.call("addField", f_name, f_value);

      // Clear form
      event.target.field_name.value = "";
      event.target.field_value.value = "";
      event.target.field_name.removeAttribute("class");
      event.target.field_value.removeAttribute("class");
    }
  },
  'keyup #search': function(event){
    Session.set("searchString", event.target.value);

  }
});

Template.user_field.events({
  "click .remove-info": function () {
    Meteor.call("deleteField", this._id);
  }
});

Template.body.events({
  'click #logout': function (event) {
    Meteor.logout();
    event.preventDefault();
  },
  'click .add-field-btn': function (event) {
    $('#add-new-modal').openModal();
    event.preventDefault();
  }
});

Template.user.onRendered(function(){
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
})
