//layout
import '../ui/layouts/MainLayout.js';
import '../ui/layouts/HomeLayout.js';

//pages
import '../ui/memo/Memos.js';
import '../ui/memoDetail/MemoDetail.js';
import '../ui/about/About.js';
import '../ui/boards/Board.js';
import '../ui/home/Home.js';
import '../ui/labelDetail/LabelDetail.js';
import '../ui/archive/Archive.js';

import { Memos } from '../api/memos.js';
import { Label } from '../api/memos.js';
import '../api/user.js';
Router.configure({
  layoutTemplate: 'MainLayout'
});

Router.onBeforeAction(function () {

  if (!Meteor.userId()) {
    Router.go('home');
  } else {
    this.next();
  }
},{
	only:['memo.home', 'memo.detail', 'memo.board', 'labeldetail', 'memo.archive']
});

Router.route('/home',function(){
	this.layout('HomeLayout');
	this.render('Home');
},{
	name:'home'
});

Router.route('/',function(){
	this.render('Memos');
},{
	name:'memo.home',
});

Router.route('/detail/:_id',function(){
	this.render('MemoDetail',{
		data:{_id:this.params._id}
	});
},{
	name:'memo.detail',
});

Router.route('/about',function(){
	this.render('About');
},{
	name:'about',
});

Router.route('/board',function(){
	this.render('Board');
},{
	name:'memo.board',
});

Router.route('/archive',function(){
	this.render('Archive');
},{
	name:'memo.archive',
	onStop:function(){
		Meteor.call('expiredMemoNotified');
	},
});

Router.route('/label/:labelId', function(){
	this.render('LabelDetail',{
		data:{ _id:this.params.labelId }
	});
},{
	name:'label.detail',
});
//account routing
//Routes
AccountsTemplates.configure({
	defaultLayout:'HomeLayout',
	onLogoutHook:function(){
		Router.go('home');
	},
});
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('signIn', {
    redirect: function(){
        var user = Meteor.user();
        if (user)
          Router.go('memo.home');
    }
});