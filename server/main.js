import { Meteor } from 'meteor/meteor';
import { Memos } from '../imports/api/memos.js';
import { Accounts } from 'meteor/accounts-base';

  Accounts.onCreateUser(function(options, user) {
  	Label.insert({
  		name:"default",
  		createdAt:new Date(),
  		owner:user._id,
  		username:user.username,
  	},{getAutoValues:false});
  	return user;
  });
Meteor.startup(() => {
  // code to run on server at startup
});
