import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';

import './Memos.html';
import '../partials/PageTitle.js';
//partials
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';

TemplateController('Memos',{
	onCreated(){
		var self = this;
		self.autorun(()=>{
			self.subscribe('memos',Session.get('searchQuery'));
		});
	},

	helpers:{
		memos(){
			return Memos.find({},{sort:{createdAt:-1}});
		},
	},
});