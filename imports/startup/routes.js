// layout
import '../ui/layouts/MainLayout.js';
import '../ui/layouts/HomeLayout.js';
import '../ui/layouts/LoginLayout.js';

// loading
import '../ui/partials/Loading.html';
// pages
import '../ui/gallery/Gallery.js';
import '../ui/memoDetail/MemoDetail.js';
import '../ui/about/About.js';
import '../ui/landing/Landing.js';
import '../ui/labelDetail/LabelDetail.js';
import '../ui/home/Home.js';
import '../ui/settings/Settings.js';

import { Memos } from '../api/memos.js';
import { Label } from '../api/memos.js';
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import '../api/user.js';
Router.configure({
  layoutTemplate: 'MainLayout',
  loadingTemplate: 'Loading',
});

Router.onBeforeAction(function() {

  if (!Meteor.userId()) {
    Router.go('Landing');
  } else {
    this.next();
  }
}, {
  only: ['memo.home', 'memo.detail', 'labeldetail', 'memo.gallery', 'settings']
});

Router.route('/landing', function() {
  this.layout('HomeLayout');
  this.render('Landing');
}, {
  name: 'Landing',
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

Router.route('/about', function() {
  this.render('About');
}, {
  name: 'about',
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
