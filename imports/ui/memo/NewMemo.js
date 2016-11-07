import { TemplateController } from 'meteor/space:template-controller';
import './NewMemo.html';

import {Status} from '../../api/status.js';

TemplateController('NewMemo',{
	state:{
		addMemo:false,
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('status');
		});
	},

	helpers:{
		options(){
			const status = Status.find({});
			let statusAry = [];
			status.forEach((stat) =>{
				statusAry.push({label:stat.name,value:stat._id});
			});
			return statusAry;
		},
		addMemo(){
			return this.state.addMemo;
		},
	},

	events:{
		'click .new-memo-show'(){
			this.state.addMemo = true;
		},
		'click .new-memo-hide'(){
			this.state.addMemo = false;
		},
	},
});

const hooksObject = {
	onSuccess:(formType,result)=>{
		Bert.alert({
		  title: 'Memo Added',
		  type: 'info',
		  style: 'growl-top-right',
		  icon: 'fa-sticky-note'
		});
		Session.set('newMemo',false);
	},
}

AutoForm.hooks({
  insertNewMemoForm: hooksObject
});