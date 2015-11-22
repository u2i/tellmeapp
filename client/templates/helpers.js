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
    var ss = Session.get("searchString");
    if(ss) {
      var searchStringArray = ss.split(" ");
      Session.set("searchStringArray",searchStringArray);
      ss = "";
      _.forEach(searchStringArray, function(key, i){
        key.trim();
        ss += "" + key;
        if(i < searchStringArray.length - 1 && i < searchStringArray.length - 1) {
          ss += "|";
        }
      })
      return Fields.find({'$or' : [ 
        { 'userId.services.google.name':{'$regex':ss, $options: 'i'} },
        { 'field_name':{'$regex':ss, $options: 'i'} },
        { 'field_value':{'$regex':ss, $options: 'i'} }
      ]});
    }
  },
  search_user: function () {
    var ss = Session.get("searchString");
    if(ss) {
      return Meteor.users.find({'$or' : [ 
        { 'userId.services.google.name':{'$regex':ss, $options: 'i'} },
        { 'profile.name':{'$regex':ss, $options: 'i'} },
      ]});
    }
  }
});

Template.field.helpers({
  find_user_name: function (user_id) {
    return user_id.services.google.name;
  },
  find_user_image: function (user_id) {
    var userName = Meteor.users.findOne({_id : user_id._id}, { fields: { services: 1 } });
    return userName.services.google.picture;
  },
  hide_me: function (f_user, f_name, f_value){
    var str = f_user + " " + f_name + " " + f_value;
    var arr = Session.get("searchStringArray");
    var trueArr = [];
    _.forEach(arr, function(key, i){
      if(str.toLowerCase().indexOf(key.toLowerCase()) <= -1) {
        trueArr.push(true);
      } else {
        trueArr.push(false);
      }
    });
    if(trueArr.indexOf(true) > -1){
      return true
    } else {
      return false
    }
    return false;
  }
});

Template.addField.helpers({
  current_fields: function () {
    return _.uniq(Fields.find({}, { sort: {field_name: 1}, fields: {field_name: 1} }).fetch().map(function(x) { return x.field_name; }), true);
  }
})

Template.user.helpers({
  user_fields: function (user_id) {
    return Fields.find({ 'userId._id' : user_id }, { sort: { field_name: 1 } } );
  }
});

Template.me.helpers({
  my_fields: function () {
    return Fields.find({ 'userId._id' : Meteor.userId() }, { sort: { field_name: 1 } } );
  }
});



Template.user_field.helpers({
  isUsersField: function (user_id) {
    return Meteor.userId() === user_id._id;
  }
})
