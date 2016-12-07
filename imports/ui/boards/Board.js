import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Label } from '../../api/label.js';
import './Board.html';
import './BoardLabel.js';
//components
import './BoardForm.js';

//partials
import '../partials/ViewBtn.js';

TemplateController('Board',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('memos');
			this.subscribe('labelWithMemos');
		});
		Session.set('Title',{name:"Board"});
	},

	helpers:{
		labelLists(){
			const lists =  Label.find({},{sort:{createdAt:-1}});
			return lists;
		},
		none(){
			const none = {name:"No Label"};
			none.memos = (Memos.find({labelId:{$exists:false}},{sort:{createdAt:-1}}));
			return none;
		}
	},
});
