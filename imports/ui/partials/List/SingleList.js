import './SingleList.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js'

TemplateController('SingleList',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},

	helpers:{
		isOwner(){
			return (Meteor.userId() === this.data.owner);
		},
		faviconUrl(){
			return `http://www.google.com/s2/favicons?domain=${this.data.url}`;
		},
	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data._id);
		},
	}
});