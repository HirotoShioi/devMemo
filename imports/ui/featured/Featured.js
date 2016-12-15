import './Featured.html';
import { TemplateController } from 'meteor/space:template-controller';

import '../partials/Loading.js';
import '../layouts/component/PageTitle.js';

TemplateController('Featured',{
	onCreated(){
		Session.set('Title',{name:"Featured"});
	},
});