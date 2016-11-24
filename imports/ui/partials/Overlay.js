import { TemplateController } from 'meteor/space:template-controller';
import { rwindow } from 'meteor/gadicohen:reactive-window';
import './Overlay.html';

TemplateController('Overlay',{
	helpers:{
		shouldOverlayShow(){
			if(rwindow.$width() >= 992){
				Session.set('isShrinkedSideNavShown',false);
			}
			return Session.get('isShrinkedSideNavShown');
		},
	},
	events:{
		'click .overlay-show'(){
			Session.set('isShrinkedSideNavShown',false);
		},
	},
});