import './About.html';
import $ from 'meteor/jquery';
import { Template } from 'meteor/templating';

import '../partials/PageTitle.js';
Template.About.onCreated(function(){
	Session.set('Title',{name:"About"});
});

Template.About.onRendered(function(){
	this.autorun(()=>{
		this.$('.toc-wrapper').pushpin({ top: this.$('.toc-wrapper').offset().top });
		this.$('.scrollspy').scrollSpy();
	});
});