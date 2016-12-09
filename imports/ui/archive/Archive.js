import './Archive.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import '../partials/List/SingleList.js';
import { moment } from 'meteor/momentjs:moment';

TemplateController('Archive',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos',);
		});
	},

	helpers:{
		notifyItems(){
			let notifiyItems = Memos.find({status:"expired", notifiedToUser:false},{sort:{expiredAt:-1}});
			return notifiyItems;
		},
		archived(){
			let archivedItems =  Memos.find({status:"expired"},{sort:{expiredAt:-1}});
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