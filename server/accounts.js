// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "92068076284-0qve54aag2vpt9geis74cec6kgd12b8k.apps.googleusercontent.com",
  secret: "4vRfY8ok5kjVoKfw3sG-hQbH"
});

// Accounts.onCreateUser(function(options, user){
// 	if(user.services.google.email.match(/u2i\.com$/)) {
//         return true;
//     }
//     throw new Meteor.Error(403, "You must sign in using a u2i.com account");
// })

Meteor.publish("directory", function () {
  return Meteor.users.find({});
});

Meteor.publish("fields", function () {
  return Fields.find({});
});
