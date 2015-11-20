Meteor.subscribe("fields");
Meteor.subscribe("directory");


Template.loggedout.helpers({

});


Template.loggedin.helpers({
  fields: function () {
    return Fields.find({});
  },
  users: function () {
    return Meteor.users.find({});
  }
});

Template.field.helpers({
  find_user_name: function (user_id) {
    var userName = Meteor.users.findOne({_id : user_id}, { fields: { services: 1 } });
    return userName.services.google.name;
  },
  find_user_image: function (user_id) {
    var userName = Meteor.users.findOne({_id : user_id}, { fields: { services: 1 } });
    return userName.services.google.picture;
  }
});