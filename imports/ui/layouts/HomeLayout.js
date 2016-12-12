import { TemplateController } from 'meteor/space:template-controller';
import '../../stylesheets/style.less';
import './HomeLayout.html';

//partials
import './component/Footer.html';
import './component/Header.js';
import '../partials/Overlay.js';

TemplateController('HomeLayout',{
	onCreated(){
		Session.set('shouldHeaderBeShownAtFullWindow',false);
	},
});