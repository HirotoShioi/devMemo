import './NewMemoModal.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import './Loading.js';
TemplateController('NewMemoModal',{
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
		});
	},

	events:{
		'click .addMemoModal'(){
			const recentlyChosenLabel = Meteor.user().profile.recentChosenLabel;
			let initialLabel;
			if(! recentlyChosenLabel){
				initialLabel = Label.findOne()._id;
			}else{
				initialLabel = recentlyChosenLabel;
			}
			Session.set('addMemoSelectedLabelId', initialLabel);
			Session.set('showModal',true);
			Session.set('formType','AddMemo');
		},
	},

	helpers:{
		isDisabled(){
			return Session.get('isLoadingMemo');
		}
	}
});

Meteor.Spinner.options = {
	color:"#000"
};