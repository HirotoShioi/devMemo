import '../imports/startup/index.js';
import { Memos } from '../imports/api/memos.js';
import { Label } from '../imports/api/label.js';
import { i18n } from 'meteor/anti:i18n';
window.Memos = Memos;
window.Label = Label;
window.i18n = i18n;
