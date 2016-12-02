import './Notification.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import '../partials/List/SingleList.js';
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
			let notifiyItems = Memos.find({status:"expired"},{sort:{expiredAt:-1}});
			return notifiyItems;
		},
		notifyCount(){
			const today = moment().toDate();
			let notifiyCount = Memos.find({status:"expired"},{sort:{expiredAt:-1}}).count();
			if(notifiyCount == 0){
				return false;
			}else{
				return true;
			}
		}
	},
});