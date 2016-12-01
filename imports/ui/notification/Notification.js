import './Notification.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { NotificationItem } from './NotificationItem.js';
import { moment } from 'meteor/momentjs:moment';

TemplateController('Notification',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos',);
		});
		Session.set('Title',{name:"Notification"});
	},

	helpers:{
		notifyItem(){
			const today = moment().toDate();
			let notifiyItems = Memos.find({shouldNotify:true,expiredAt:{"$lt":today}},{sort:{expiredAt:-1}});
			return notifiyItems;
		},
	},
});