import './Memo.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Status } from '../../api/status.js';

TemplateController('Memo',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('status');
		});
	},

	helpers:{
		isOwner(){
			return (Meteor.userId() === this.data.owner);
		},

	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data._id);
		},
	},
});