import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Status }  from '../../api/status.js';
import './Board.html';

//components
import './BoardForm.js';
import './BoardContent.js';

//partials
import '../partials/ViewBtn.js';

TemplateController('Board',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos');
			this.subscribe('statusBoard');
		});
		Session.set('Title',{name:"Board"});
	},

	helpers:{
		statusLists(){
			const lists =  Status.find({},{sort:{createdAt:-1}});
			return lists;
		},
		none(){
			const none = {name:"No Status"};
			none.memos = (Memos.find({statusId:{$exists:false}},{sort:{createdAt:-1}}));
			return none;
		}
	},
});
