/*
 * Copyright 2010-2019 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   SingleFile is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   SingleFile is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with SingleFile.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global singlefile */

singlefile.ui = (() => {

	return {
		onMessage(message, sender) {
			if (message.method.endsWith(".refreshMenu")) {
				return singlefile.ui.menu.onMessage(message, sender);
			} else {
				return singlefile.ui.button.onMessage(message, sender);
			}
		},
		async refresh(tab) {
			return Promise.all([singlefile.ui.menu.refresh(tab), singlefile.ui.button.refresh(tab, { autoSave: await singlefile.autosave.isEnabled(tab) })]);
		},
		onForbiddenDomain(tab, options) {
			singlefile.ui.button.onForbiddenDomain(tab, options);
		},
		onInitialize(tabId, options, step) {
			singlefile.ui.button.onInitialize(tabId, options, step);
		},
		onProgress(tabId, index, maxIndex, options) {
			singlefile.ui.button.onProgress(tabId, index, maxIndex, options);
		},
		onError(tabId, options) {
			singlefile.ui.button.onError(tabId, options);
		},
		onEnd(tabId, options) {
			singlefile.ui.button.onEnd(tabId, options);
		},
		onTabCreated(tab) {
			singlefile.ui.button.onTabCreated(tab);
			singlefile.ui.menu.onTabCreated(tab);
		},
		onTabActivated(tab, activeInfo) {
			singlefile.ui.menu.onTabActivated(tab, activeInfo);
			singlefile.ui.button.onTabActivated(tab);
		},
		onTabUpdated(tabId, changeInfo, tab) {
			singlefile.ui.menu.onTabUpdated(tabId, changeInfo, tab);
			singlefile.ui.button.onTabUpdated(tabId, changeInfo, tab);
		}
	};

})();