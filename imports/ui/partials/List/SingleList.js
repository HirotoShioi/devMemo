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
		shouldNotify(){
			return !this.data.notifiedToUser;
		},
	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data._id);
		},
		'click .fa-clock-o'(){
			Meteor.call('memoUrlClicked', this.data);
		},
		'click .title'(){
			Meteor.call('memoUrlClicked', this.data);
			window.open(this.data.url);
		},
		'click .circle'(){
			Meteor.call('memoUrlClicked', this.data);
			window.open(this.data.url);
		},
	}
});