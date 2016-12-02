import './NotificationItem.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('NotificationItem',{
	helpers:{
		shouldNotify(){
			return !this.data.notifiedToUser;
		}
	},

	events:{
		'click .notify-item'(){
			Meteor.call('memoUrlClicked', this.data);
		},
	}
});