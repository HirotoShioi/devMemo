import './BoardForm.html';
import { Template } from 'meteor/templating';
import { Status } from '../../api/status';

Template.BoardForm.onCreated(function(){
	this.addStatus = new ReactiveVar(false);
	this.autorun(()=>{
		this.subscribe('categories');
	});
});

Template.BoardForm.helpers({
	addStatus:()=>{
		return Template.instance().addStatus.get();
	},
});

Template.BoardForm.events({
	'click .status-form-show'(){
		Template.instance().addStatus.set(true);
	},
	'click .status-form-hide'(){
		Template.instance().addStatus.set(false);
	},
	'submit .new-status'(event){
	    // Prevent default browser form submit
	    event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const status = target.status.value;
	    Meteor.call('addStatus',status,(err,result)=>{
	    	if(!err){
	    		Bert.alert( 'Status Added', 'info', 'growl-top-right' );
	    	}
	    });
	    
	    // Clear form
    	target.status.value = '';
    	Template.instance().addStatus.set(false);
	}
});