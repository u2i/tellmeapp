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
  },
  search_field: function () {
    if(Session.get("searchString")) {
      return Fields.find({'$or' : [ 
        // { 'userId.services.google.name':{'$regex':Session.get("searchString"), $options: 'si'} },
        { 'field_name':{'$regex':Session.get("searchString"), $options: 'i'} },
        { 'field_value':{'$regex':Session.get("searchString"), $options: 'i'} }
      ]});
    }
  },
  search_user: function () {
    if(Session.get("searchString")) {
      return Meteor.users.find({'$or' : [ 
        // { 'userId.services.google.name':{'$regex':Session.get("searchString"), $options: 'si'} },
        { 'profile.name':{'$regex':Session.get("searchString"), $options: 'i'} },
      ]});
    }
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



Template.user.helpers({
  user_fields: function (user_id) {
    console.log(user_id);
    return Fields.find({userId : user_id}, { sort: { field_name: 1 } } );
  }
});



Template.user_field.helpers({
  isUsersField: function (userId) {
    return Meteor.userId() === userId;
  }
})
