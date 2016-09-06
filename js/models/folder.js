/**
 * Mail
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

define(function(require) {
	'use strict';

	var Backbone = require('backbone');

	/**
	 * @class Folder
	 */
	var Folder = Backbone.Model.extend({
		defaults: {
			open: false,
			folders: [],
			messages: [],
			messagesLoaded: false
		},
		initialize: function() {
			var FolderCollection = require('models/foldercollection');
			var MessageCollection = require('models/messagecollection');
			this.set('folders', new FolderCollection(this.get('folders')));
			this.set('messages', new MessageCollection(this.get('messages')));
		},
		toggleOpen: function() {
			this.set({open: !this.get('open')});
		},
		toJSON: function() {
			var data = Backbone.Model.prototype.toJSON.call(this);
			if (data.folders && data.folders.toJSON) {
				data.folders = data.folders.toJSON();
			}
			if (!data.id) {
				data.id = this.cid;
			}
			return data;
		}
	});

	return Folder;
});
