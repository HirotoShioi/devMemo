import { TemplateController } from 'meteor/space:template-controller';
import './BoardForm.html';
import { Label } from '../../api/label.js';

TemplateController('BoardForm',{
	state:{
		addLabel:false,
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('categories');
		});
	},

	helpers:{
		addLabel(){
			return this.state.addLabel;
		},
	},

	events:{
		'click .label-form-show'(){
			this.state.addLabel = true;
		},
		'click .label-form-hide'(){
			this.state.addLabel = false;
		},
		'submit .new-label'(event){
		    // Prevent default browser form submit
		    event.preventDefault();
		 
		    // Get value from form element
		    const target = event.target;
		    const label = target.label.value;
		    Meteor.call('addLabel',label,(err,result)=>{
		    	if(err){
		    		Bert.alert( err.reason, 'danger', 'growl-top-right');
		    	};
		    	if(!err){
		    		Bert.alert( 'Label Added', 'info', 'growl-top-right' );
		    	}
		    });
		    
		    // Clear form
	    	target.label.value = '';
	    	this.state.addLabel = false;
		}
	}
});