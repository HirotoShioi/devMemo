import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';

import '../partials/Loading.js';
import '../partials/List/SingleList.js';
import './Archive.html';

TemplateController('Archive',{
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos',);
		});
		Session.set('Title',{name:"Archive"});
	},

	helpers:{
		notifyItems(){
			let notifiyItems = Memos.find({status:"expired", notifiedToUser:false},{sort:{expiredAt:-1}});
			return notifiyItems;
		},
		archived(){
			let archivedItems =  Memos.find({status:"expired", notifiedToUser:true},{sort:{expiredAt:-1}});
			return archivedItems;
		},
		notifyCount(){
			let notifiyCount = Memos.find({status:"expired", notifiedToUser:false}).count();
			if(notifiyCount == 0){
				return false;
			}else{
				return true;
			}
		},
		archiveCount(){
			let archiveCount = Memos.find({status:"expired"},{sort:{expiredAt:-1}}).count();
			if(archiveCount == 0){
				return false;
			}else{
				return true;
			}
		},
	},
});