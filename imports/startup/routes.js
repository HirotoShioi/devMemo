//layout
import '../ui/layouts/MainLayout.js';
import '../ui/layouts/HomeLayout.js';

//pages
import '../ui/memo/Memos.js';
import '../ui/memoDetail/MemoDetail.js';
import '../ui/about/About.js';
import '../ui/boards/Board.js';
import '../ui/home/Home.js';

import { Memos } from '../api/memos.js';
import { Label } from '../api/memos.js';

Accounts.onLogout(function(){
	Router.go('home');
});

Router.configure({
  layoutTemplate: 'MainLayout'
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
	onBeforeAction:function(){
		if(!Meteor.user()){
			Router.go('home');
		}else{
			this.next();
		}
	}
});

Router.route('/detail/:_id',function(){
	this.render('MemoDetail',{
		data:{_id:this.params._id}
	});
},{
	name:'memo.detail',
	onBeforeAction:function(){
		if(!Meteor.user()){
			Router.go('home');
		}else{
			this.next();
		}
	}
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
	onBeforeAction:function(){
		if(!Meteor.user()){
			Router.go('home');
		}else{
			this.next();
		}
	}
});

//account routing
//Routes
AccountsTemplates.configure({
	defaultLayout:'HomeLayout'
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