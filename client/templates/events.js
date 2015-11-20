Template.loggedout.events({
  'click #login': function () {
    Meteor.loginWithGoogle();
  }
});

Template.loggedin.events({
  "submit .new-field": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var f_name = event.target.field_name.value;
    var f_value = event.target.field_value.value;

    // Insert a task into the collection
    Fields.insert({
      userId: Meteor.userId(),
      field_name: f_name,
      field_value: f_value,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.field_name.value = "";
    event.target.field_value.value = "";
  }
});

Template.body.events({
  'click #logout': function (event) {
    Meteor.logout();
    event.preventDefault();
  },
  'click #add-field-btn': function (event) {
    // Meteor.logout();
    jQuery('#add-new-field').toggle();
    event.preventDefault();
  }
});