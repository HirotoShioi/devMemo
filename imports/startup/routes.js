// layout
import '../ui/layouts/MainLayout.js';
import '../ui/layouts/HomeLayout.js';

// loading
import '../ui/partials/Loading.html';
// pages
import '../ui/memo/Memos.js';
import '../ui/memoDetail/MemoDetail.js';
import '../ui/about/About.js';
import '../ui/home/Home.js';
import '../ui/labelDetail/LabelDetail.js';
import '../ui/featured/Featured.js';

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
    Router.go('home');
  } else {
    this.next();
  }
}, {
  only: ['memo.home', 'memo.detail', 'labeldetail', 'memo.featured']
});

Router.route('/home', function() {
  this.layout('HomeLayout');
  this.render('Home');
}, {
  name: 'home',
});

Router.route('/', function() {
  this.render('Memos');
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

Router.route('/featured', function() {
  this.render('Featured');
}, {
  name: "memo.featured",
});
// account routing
// Routes
AccountsTemplates.configure({
  defaultLayout: 'HomeLayout',
  onLogoutHook: function() {
    Router.go('home');
  },
});

AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('signIn', {
  name: "atSignIn",
  redirect: function() {
    let user = Meteor.user();
    if (user) Router.go('memo.featured');
  }
});
