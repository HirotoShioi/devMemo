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
		hasLabel(){
			return (this.data.labelId)? true:false;
		},
		faviconUrl(){
			return `http://www.google.com/s2/favicons?domain=${this.data.url}`;
		},
	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data._id);
		},
	},
});