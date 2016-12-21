/**
 * Normally i would rather use sinon.js for stubbing functions, however
 * i ran into this issue which makes it unusable:
 * https://github.com/practicalmeteor/meteor-sinon/issues/21
 */
export const stubLoggedInUser = function(user) {
  const stubs = this.stubs = {};
  stubs['Meteor.user'] = { original: Meteor.user, stub: () => user };
  Meteor.user = stubs['Meteor.user'].stub;
  stubs['Meteor.userId'] = { original: Meteor.userId, stub: () => user._id };
  Meteor.userId = stubs['Meteor.userId'].stub;
  stubs['Meteor.users.findOne'] = { original: Meteor.users.findOne, stub: () => user };
  Meteor.users.findOne = stubs['Meteor.users.findOne'].stub;
};

export const restoreStubbedLoggedInUser = function() {
  Meteor.user = this.stubs['Meteor.user'].original;
  Meteor.userId = this.stubs['Meteor.userId'].original;
  Meteor.users.findOne = this.stubs['Meteor.users.findOne'].original;
};
