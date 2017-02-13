// layout
import '../ui/layouts/MainLayout.js';
import '../ui/layouts/HomeLayout.js';
import '../ui/layouts/LoginLayout.js';

// loading
import '../ui/partials/Loading.html';
// pages
import '../ui/gallery/Gallery.js';
import '../ui/memoDetail/MemoDetail.js';
import '../ui/landing/Landing.js';
import '../ui/labelDetail/LabelDetail.js';
import '../ui/home/Home.js';
import '../ui/settings/Settings.js';
import '../ui/notification/Notification.js';
import '../ui/labels/Labels.html';

// collecitons
import '../api/memos.js';
import '../api/label.js';
import '../api/user.js';
import '../api/labelShare.js';
import '../api/userFavorites.js';
import '../api/comments.js';

import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';
Router.configure({
  layoutTemplate: 'MainLayout',
  loadingTemplate: 'Loading',
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    Router.go('Landing');
  }
  if (Meteor.user()) {
    if (!Meteor.user().hasUserName()) Router.go('settings');
  }
  this.next();
}, {
  only: ['memo.home', 'memo.detail', 'labeldetail', 'memo.gallery', 'settings', 'notification', "memo.labels"]
});

Router.route('/landing', function() {
  this.layout('HomeLayout');
  this.render('Landing');
}, {
  name: 'Landing',
  onBeforeAction: function() {
    if (Meteor.user()) {
      Router.go('memo.home');
    }
    this.next();
  },
});

Router.route('/', function() {
  this.render('Home');
}, {
  name: 'memo.home',
});

Router.route('/detail/:_id', function() {
  this.render('MemoDetail', {
    data: {_id: this.params._id}
  });
}, {
  name: 'memo.detail',
});

Router.route('/label/:labelId', function() {
  this.render('LabelDetail', {
    data: { _id: this.params.labelId }
  });
}, {
  name: 'label.detail',
});

Router.route('/gallery', function() {
  this.render('Gallery');
}, {
  name: "memo.gallery",
});

Router.route('/settings', function() {
  this.render('Settings');
}, {
  name: "settings",
});

Router.route('/notification', function() {
  this.render('Notification');
}, {
  name: "notification",

  onStop: function() {
    Meteor.call('requestNotified');
  },
});

Router.route('/labels', function() {
  this.render('Labels');
}, {
  name: "memo.labels"
});
// account routing
// Routes
AccountsTemplates.configure({
  defaultLayout: 'LoginLayout',
  onLogoutHook: function() {
    Router.go('Landing');
  },
});

AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('signIn', {
  name: "atSignIn",
  redirect: function() {
    let user = Meteor.user();
    if (!user.username) {
      Router.go('settings');
    } else if (user) {
      Router.go('memo.home');
    }
  }
});
