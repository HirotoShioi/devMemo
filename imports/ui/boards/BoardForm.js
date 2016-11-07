import { TemplateController } from 'meteor/space:template-controller';
import './BoardForm.html';
import { Status } from '../../api/status';

TemplateController('BoardForm',{
	state:{
		addStatus:false,
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('categories');
		});
	},

	helpers:{
		addStatus(){
			return this.state.addStatus;
		},
	},

	events:{
		'click .status-form-show'(){
			this.state.addStatus = true;
		},
		'click .status-form-hide'(){
			this.state.addStatus = false;
		},
		'submit .new-status'(event){
		    // Prevent default browser form submit
		    event.preventDefault();
		 
		    // Get value from form element
		    const target = event.target;
		    const status = target.status.value;
		    Meteor.call('addStatus',status,(err,result)=>{
		    	if(err){
		    		Bert.alert( err.reason, 'danger', 'growl-top-right');
		    	};
		    	if(!err){
		    		Bert.alert( 'Status Added', 'info', 'growl-top-right' );
		    	}
		    });
		    
		    // Clear form
	    	target.status.value = '';
	    	this.state.addStatus = false;
		}
	}
});