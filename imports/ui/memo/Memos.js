import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';

import './Memos.html';

//partials
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';

TemplateController('Memos',{
	onCreated(){
		Session.set("Title",{name:"Home"});

		this.autorun(()=>{
			this.subscribe('memos');
		});
	},

	helpers:{
		memos(){
			const today = moment().toDate();
			//{$or:[{name:regex},{description:regex}]}
			return Memos.find({$or:[{isFavorited:true},{expiredAt:{"$gte":today}}]},{sort:{createdAt:-1}});
		},
	},
});