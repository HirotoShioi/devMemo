import './Memo.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';

TemplateController('Memo',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
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