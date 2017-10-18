"use strict";

var DocumentViewer = function DocumentViewer(config) {
	var _ref = config ? config : {},
	    _ref$flatData = _ref.flatData,
	    flatData = _ref$flatData === undefined ? [] : _ref$flatData,
	    _ref$actions = _ref.actions,
	    actions = _ref$actions === undefined ? {} : _ref$actions,
	    _ref$subMenu = _ref.subMenu,
	    subMenu = _ref$subMenu === undefined ? {} : _ref$subMenu,
	    _ref$sortable = _ref.sortable,
	    sortable = _ref$sortable === undefined ? false : _ref$sortable,
	    _ref$selectable = _ref.selectable,
	    selectable = _ref$selectable === undefined ? false : _ref$selectable,
	    _ref$alert = _ref.alert,
	    alert = _ref$alert === undefined ? window.alert : _ref$alert,
	    _ref$confirm = _ref.confirm,
	    confirm = _ref$confirm === undefined ? window.confirm : _ref$confirm,
	    _ref$prompt = _ref.prompt,
	    prompt = _ref$prompt === undefined ? window.prompt : _ref$prompt;

	var _mountNode = this;
	var _productHierarchyJSON = void 0;

	/**
     Factory Function for Flat Tree
     ------------------------------
      - Utility functions for flat tree that are required in this plugin
      @return object
 */
	var _flatTree = function () {
		/**
      GetNestedChildren
      ------------------
       - recursively maps flat hierarchy tree to nested hierarchy tree
       @param arr: array of objects
      @param parentId: numeral id
       @return array
  */
		var getNestedChildren = function getNestedChildren(arr, parentId) {
			// console.log('parnetId should be undefined first time');
			// console.log(parentId);
			var out = [];
			for (var i in arr) {
				if (arr[i].parentId == parentId) {
					if (arr[i].category) {
						var children = getNestedChildren(arr, arr[i].id);

						arr[i].children = children;
					}
					out.push(arr[i]);
				}
			}
			return out;
		};

		return {
			/**
       toNestedTree
       ------------------
        - uses getNestedChildren to map flat hierarchy to nested hierarchy
        @param arr: array of objects(flat)
        @return array of objects(nested)
   */
			toNestedTree: function toNestedTree(arr) {
				return getNestedChildren(arr);
			},
			/**
       removeKey
       ------------------
        - removes key from array of objects
        @param arr: array of objects(flat)
       @param key: string
        @return array of objects(flat)
   */
			removeKey: function removeKey(arr, key) {
				return arr.map(function (item) {
					delete item[key];
					return item;
				});
			},
			/**
       getItemIndex
       ------------------
        - returns INDEX of item in array, having the specified ID (itemId)
        @param arr: array of objects(flat)
       @param itemId: number
        @return number(item index)
   */
			getItemIndex: function getItemIndex(arr, itemId) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id === itemId) return i;
				}

				return -1;
			},
			/**
       getItemById
       ------------------
        - returns ITEM from array having specified ID
        @param arr: array of objects(flat)
       @param itemId: number
        @return object
   */
			getItemById: function getItemById(arr, itemId) {
				return arr.filter(function (item) {
					return item.id == itemId;
				})[0];
			},
			/**
       position
       ---------
        - reposition array item FROM one index TO other index position
        @param arr: array of objects(flat)
       @param from: number
       @param to: number
        @return array of objects(flat)
   */
			position: function position(arr, from, to) {
				if (to + 1 == from) return arr;

				return arr.splice(to + 1, 0, arr.splice(from, 1)[0]);
			}
		};
	}();

	var _productHierarchy = function () {
		/**
  	Action Generators
  	-----------------
  		- Generates the action buttons for products and categories
  		@param configActions: array of objects (action objects)
  		@return string (DOM string for generated actions)
  */
		var generateActions = function generateActions(configActions, row) {
			var actions = '';

			for (var key in configActions) {
				if (configActions[key].filter(row)) {
					var action = "<a href='#' class='action-" + key + "'>" + configActions[key].icon + " " + key + "</a>";

					actions += action;
				}
			}

			// console.log(row);

			return actions;
		};

		/**
  	Product DOM Generators
  	-----------------
  		- Generates the product's DOM element using the passed item object
  		@param item: object
  		@return string (DOM string for generated product)
  */
		var generateProduct = function generateProduct(item) {

			var _product = "\n\t\t\t\t<li class=\"product-wrapper\">\n\t\t\t\t\t<div id=\"leaf-" + item.id + "\" class=\"product-head\">\n\t\t\t\t\t\t<div class=\"checkbox\"><input type=\"checkbox\" name=\"product\" value=\"node-" + item.id + "\" /></div>\n\t\t\t\t\t\t<div class=\"title\">\n\t                    \t" + item.data.title + "\n\t                    </div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t";

			var _actions = generateActions(actions, _product);
			var _subMenu = generateActions(subMenu, _product);
			var _productHead = $(_product).find('.product-head');

			var _productControls = '';

			if (_actions) {
				_productControls += "<div class=\"actions\">" + _actions + "</div>";
			}

			if (_subMenu) {
				_productControls += "<div class=\"contextmenu\"><span class=\"contexthead\">" + item.data.title + "</span>" + _subMenu + "</div>";
			}

			return $(_productControls).appendTo(_productHead).parent().parent()[0].outerHTML;
		};

		/**
  	Category DOM Generators
  	-----------------
  		- Generates the category's DOM element using the passed item object
  		@param data: array of objects
  		@return string (DOM string for generated catefories - consisting of products)
  */
		var generateProductHierarchy = function generateProductHierarchy(data) {
			if (!data || data.length === 0) {
				//TODO: Better Empty Category UX
				console.log('Category is empty');
				// return false
			}

			var _markup = [];

			// console.log('data');
			// console.log(data);

			if (data) {
				_markup = data.map(function (item) {

					if (!item.category) {
						return generateProduct(item);
					}

					var _children = generateProductHierarchy(item.children);

					var _category = "\n\t\t\t\t\t\t<li class=\"category-wrapper\">\n\t\t\t\t\t\t\t<div class=\"accordian-link category-head\" id=\"node-" + item.id + "\">\n\t\t\t\t\t\t\t\t<div class=\"checkbox\"><input type=\"checkbox\" name=\"category\" value=\"node-" + item.id + "\" /></div>\n\t\t\t\t\t\t\t\t<div class=\"title\">\n\t\t\t\t\t\t\t\t\t" + item.data.title + "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"accordian-content category-content\">\n\t\t\t\t\t\t\t\t" + (_children || '') + "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t";

					var _actions = generateActions(actions, _category);
					var _subMenu = generateActions(subMenu, _category);

					var _categoryHead = $(_category).children('.category-head');

					var _categoryControls = '';

					if (_actions) {
						_categoryControls += "<div class=\"actions " + item.id + "\">" + _actions + "</div>";
					}

					if (_subMenu) {
						_categoryControls += "<div class=\"contextmenu\"><span class=\"contexthead\">" + item.data.title + "</span>" + _subMenu + "</div>";
					}

					// console.log(item);
					// console.log(item.id);
					// console.log(_categoryControls);
					// console.log(_categoryHead);

					return $(_categoryControls).appendTo(_categoryHead).parent().parent()[0].outerHTML;
				});
			}

			return "\n\t\t\t\t<ul class=\"accordian-container\">\n\t\t\t\t\t" + _markup.join('') + "\n\t\t\t\t</ul>\n\t\t\t";
		};

		var clickAction = function clickAction(obj, key) {
			var action = obj[key].actions;

			if (action.before()) action.after();
		};

		/**
  	Bind Events
  	-----------------
  		- Binds events to the generated category-product hierarchy DOM
  	- Events:
  		- Toggle Category Accordian
  		- Toggle Context Menu consisting of action buttons
  */
		var _bindEvents = function _bindEvents() {
			//TODO: change click from category-head to category-title
			//TODO: maxHeight animation is bullshit
			//TODO: move general purpose animation to better place
			$('.title, .actions, .contextmenu', $('.category-wrapper')).on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$('.category-head').on('click', function (e) {
				if (e.target.classList.contains('category-head')) $(this).toggleClass('active');

				// let categoryContent = $(this).siblings('.accordian-content')[0];
				//
				// if(categoryContent.style.maxHeight)
				// 	categoryContent.style.maxHeight = null;
				// else
				// 	categoryContent.style.maxHeight = categoryContent.scrollHeight + 'px';
			});

			$(document).on('contextmenu click', function (e) {
				$('.contextmenu').removeClass('active');
			});

			$('.category-head, .product-head').on('contextmenu', function (e) {
				e.preventDefault();
				e.stopPropagation();

				$('.contextmenu').removeClass('active');

				setTimeout(function () {
					$('.contextmenu', $(this)).toggleClass('active').css('left', e.screenX - 50).css('top', e.screenY - 110);
				}.bind(this), 0);

				return false;
			});

			$('.category-head .actions a, .product-head .actions a').on('click', function () {
				var key = this.className.split('-')[1];

				clickAction(actions, key);
			});

			$('.category-head .contextmenu a, .product-head .contextmenu a').on('click', function () {
				var key = this.className.split('-')[1];

				clickAction(subMenu, key);
			});
		};

		return {
			/**
   	Initialisation
   	---------------
   		- Generated Product-Category Hierarchy DOM
   	- Append to the #products-hierarchy div
   	- Bind events to the generate DOM
   	- Removes `Children` key from the `flat` array of objects.
   	  - This `Children` key is the side effect of mutation.
   	  - Prevent `flat` from mutating.
   		TODO: Create a mutable mapping of flat tree to nested tree
   */
			init: function init() {
				$(_mountNode).find('.document-viewer-body').html(generateProductHierarchy(_productHierarchyJSON));

				_bindEvents();

				_flatTree.removeKey(flatData, 'children');
			}
		};
	}();

	/**
 	Factory Function - Selectable
 	-----------
 		- Makes the Product-Category Hieararchy Selectable (with checkboxes)
 		@return object
 */
	var _selectable = function () {

		// Adds class selectable to all the lists (accordian-container)
		// - Selectable class is responsible for showing the checkboxes
		var _activateSelecting = function _activateSelecting() {
			$(_mountNode).find('.accordian-container .checkbox input').prop('checked', false);
			$(_mountNode).find('.accordian-container').toggleClass('selectable');
		};

		// Selects all child categories and products inside given category (#id)
		var _selectChildren = function _selectChildren(id, shouldCheck) {
			$('#' + id).closest('.category-wrapper').find('.checkbox input').prop('checked', shouldCheck);
		};

		var _bindEvents = function _bindEvents() {
			$('#action-selectable').on('click', function (e) {
				// THIS IS SOME BULLSHIT CODE - JUGAAD
				// TODO: Move this code out of this module

				$('#action-sortable')[0].innerText = 'Make Sortable';
				$(_mountNode).find('.accordian-container').removeClass('sortable');

				if ($(_mountNode).find('.accordian-container').hasClass('selectable')) {
					e.target.innerText = 'Make Selectable';
				} else {
					e.target.innerText = 'Back to Unselectable';
				}
				_activateSelecting();
			});

			$('.category-head .checkbox input').on('change', function (e) {
				console.log('e.target');
				if (e.target.name === 'category') {
					_selectChildren(e.target.value, e.target.checked);
				}

				if (!e.target.checked) {
					$(this).parents('.category-wrapper').children('.category-head').find('.checkbox input').prop('checked', false);
				}
			});
		};

		var _generateSelectableControls = function _generateSelectableControls() {
			$(_mountNode).find('.document-viewer-head').append("<button id=\"action-selectable\" class=\"action\">Make Selectable</button>");

			_bindEvents();
		};

		return {
			/**
   	initialize Selectable
   	-----------
   		- Binds events to action button activating the selectable feature
   	- Binds events to checkboxes
   */
			init: function init() {
				_generateSelectableControls();
			}
		};
	}();

	/**
 	Factory Function - Sortable
 	-----------
 		- Makes the Product-Category Hierarchy Sortable with feature:-
 	  - Drag and Drop
 	  - Reposition
 		@return object
 */
	var _sortable = function () {
		var isDraggingProduct = null;

		/**
  	- Adds draggable DOM element to each category and products
  	- Adds the Dragging Item DOM element - this is shown when item is being dragged
  */
		var _generateSortableControls = function _generateSortableControls() {
			$('.category-wrapper, .product-wrapper').prepend('<div class="drag-handle" draggable="true">&#x2630;</div>').append('<li class="drop-area"></li>');

			if (!$('#dragging-item').length) $('body').append('<div id="dragging-item"></div>');

			$(_mountNode).find('.document-viewer-head').append("\n                <button id=\"action-sortable\" class=\"action\">Make Sortable</button>\n                <button id=\"action-save\" class=\"action\">Save Order</button>\n                ");

			_bindEvents();
		};

		// Toggle the sortable action on the product-category hierarchy
		var _activateSorting = function _activateSorting() {
			$(_mountNode).find('.accordian-container').toggleClass('sortable');
		};

		/**
  	_changeParent
  	-----------
  		- Moves the node from under one parent to another
  		@param itemId: number
  	@param parentId: number
  */
		var _changeParent = function _changeParent(itemId, parentId) {
			var item = _flatTree.getItemById(flatData, itemId);

			item.parentId = parentId;

			// We are not having -ve parentIds - If a node doesn't have any parentId key, then it exists on the root level
			if (parentId === -1) delete item.parentId;
		};

		/**
  	_reposition
  	-----------
  		- Moves the node from one point to another while being under the same parent
  	- i.e. changes  the order of list
  */
		var _reposition = function _reposition(itemId, siblingId) {
			_flatTree.position(flatData, _flatTree.getItemIndex(flatData, itemId), _flatTree.getItemIndex(flatData, siblingId));
		};

		/**
  	_bindEvents
  	-----------
  		- Binds events to the sortable feature for drag/drop and reorder functionality
  		  	1) Drag-Handle
  			  	> dragstart
  				- adds id to dragging data object
  				- Adds no-drop-zone area to the ones applicable
  			  	> drag
  		  	  	- Move #dragging-item with the cursor
  			  	> dragend
  		  	  	- clears all dragging related classes
  		  	  	- normalise dragging items div to default style, activates no-drop-zone areas, hides dragging item
  		  	2) category-head, drop-area
  		  		- adds/remove drag-enter class for styling when one cat/product is dragged into the area
  		  		> dragenter
  	  		> dragleave
  	  		> dragover
  		  	3) category-head
  		  		> drop
  	  			- Checks if drop is valid and then change the parent of dragged item,
  	  			  inside the drop-area category (at the end of this category)
  		  	3) drop-area
  		  		> drop
  	  			- Checks if this _reposition is valid and then change the position of dragging item on the drop-area location
  	*/
		var _bindEvents = function _bindEvents() {
			$('.drag-handle').on('dragstart', function (e) {
				if ($(this).parent().hasClass('category-wrapper')) {
					isDraggingProduct = false;
					e.originalEvent.dataTransfer.setData("text", $(this).siblings('.category-head').attr('id'));
					$('.product-wrapper > .drop-area').addClass('no-drop-zone');
				} else {
					isDraggingProduct = true;
					e.originalEvent.dataTransfer.setData("text", $(this).siblings('.product-head').attr('id'));
					$('.category-wrapper > .drop-area').addClass('no-drop-zone');
				}

				$('#dragging-item').addClass('active').html($('.title', $(this).siblings('.category-head, .product-head')).text());

				// It's adding dragging to category-wrapper or product-wrapper
				$(this).parent().addClass('dragging');

				// Only category-head and drop-areas are drop zone
				// Prevent drop-zones inside current dragged item (i meant it's parents)
				$('.category-head, .drop-area', $(this).parent()).addClass('no-drop-zone');
			}).on('drag', function (e) {
				$('#dragging-item').css('left', e.screenX).css('top', e.screenY - 80);
			}).on('dragend', function (e) {
				e.preventDefault();

				$('#dragging-item').removeClass('active').html('');

				isDraggingProduct = null;

				// It's removing dragging from category-wrapper
				$(this).parent().removeClass('dragging');
				$('.no-drop-zone').removeClass('no-drop-zone');
			});

			$('.category-head, .drop-area').on('dragenter', function (e) {
				var ctr = $(this).data('ctr') ? parseInt($(this).data('ctr')) : 0;

				$(this).data('ctr', ++ctr);
				$(this).addClass('drag-enter');
			}).on('dragleave', function (e) {
				var ctr = parseInt($(this).data('ctr'));

				$(this).data('ctr', --ctr);
				if (ctr === 0) $(this).removeClass('drag-enter');
			}).on('dragover', function (e) {
				e.preventDefault();
			});

			// Don't let product to be dropped into the category that have categories as childrens
			// Don't let category to be dropped into the category that have products as childrens
			$('.category-head').on('drop', function (e) {
				e.preventDefault();
				e.stopPropagation();

				$('.drag-enter').data('ctr', 0).removeClass('drag-enter');

				if ($(this).siblings('.category-content').children()[0].children.length > 0) {
					var dropZone = $(this).siblings('.category-content').children()[0].children[0];

					if (isDraggingProduct && dropZone.classList.contains('category-wrapper') || !isDraggingProduct && !dropZone.classList.contains('category-wrapper')) {
						// alert("can't drop into this category");
						if (isDraggingProduct) alert("Can only drop product into empty categories or inside categories having products");else alert("Can only drop category into empty categories or inside categories having categories");

						return false;
					}
				}

				if ($(this).hasClass('no-drop-zone')) {
					return false;
				}

				var _itemId = e.originalEvent.dataTransfer.getData("text");

				var _itemIdNum = parseInt(_itemId.split('-')[1]);
				var _parentIdNum = parseInt($(this).attr('id').split('-')[1]);

				_changeParent(_itemIdNum, _parentIdNum);

				$(this).siblings('.category-content').children(0).append($('#' + _itemId).parent()[0]);
			});

			// Don't highlight the areas that are not meant to be drop areas
			// Ex.
			//	1. Product being dropped to the drop area of category
			// 	2. Category being dropped to the drop area of product
			//
			// DONE!!!!!!!!
			$('.drop-area').on('drop', function (e) {
				e.preventDefault();
				// I dont know if this will have any effect ;-D
				// Wondering if the event bubbling will be grabbed by any other dropppable area...... hmmmmmmmm........
				// .
				// .
				// .
				// .
				// .
				// NO!!!! It's not :-p
				e.stopPropagation();

				$('.drag-enter').data('ctr', 0).removeClass('drag-enter');

				if (isDraggingProduct && $(this).parent().hasClass('category-wrapper') || !isDraggingProduct && !$(this).parent().hasClass('category-wrapper') || $(this).hasClass('no-drop-zone')) {
					return false;
				}

				var _itemId = e.originalEvent.dataTransfer.getData("text");

				var _itemIdNum = parseInt(_itemId.split('-')[1]);
				var _siblingIdNum = -1;
				var _parentIdNum = -1;

				if (isDraggingProduct) {
					_siblingIdNum = parseInt($(this).siblings('.product-head').attr('id').split('-')[1]);
				} else {
					_siblingIdNum = parseInt($(this).siblings('.category-head').attr('id').split('-')[1]);
				}

				if ($(this).closest('.category-content').length > 0) _parentIdNum = parseInt($(this).closest('.category-content').siblings('.category-head').attr('id').split('-')[1]);

				_reposition(_itemIdNum, _siblingIdNum);
				_changeParent(_itemIdNum, _parentIdNum);

				$('#' + _itemId).parent().insertAfter($(this).parent());
			});

			$('#action-sortable').on('click', function (e) {
				// THIS IS SOME BULLSHIT CODE - JUGAAD
				// TODO: Move this code out of this module
				$('#action-selectable')[0].innerText = 'Make Selectable';
				$(_mountNode).find('.accordian-container').removeClass('selectable');

				if ($(_mountNode).find('.accordian-container').hasClass('sortable')) {
					e.target.innerText = 'Make Sortable';
				} else {
					// let selectable = $('#action-selectable');
					// if(selectable) {
					//     console.log('aaaaaaaaa');
					//     $(selectable).click();
					// }
					e.target.innerText = 'Back to Unsortable';
				}
				_activateSorting();
			});

			$('#action-save').on('click', function (e) {
				console.log('This is the final state after all the drag-drop and _repositioning');
				console.log(flatData);
				console.log(JSON.stringify(flatData));

				e.target.innerText = 'Saving...';

				setTimeout(function () {
					e.target.innerText = 'Save Order';
				}, 1000);
			});
		};

		return {
			// Initializes sortable and binds the activation of this to #action-sortable
			init: function init() {
				_generateSortableControls();
			}
		};
	}();

	var _init = function () {
		$(_mountNode).append("\n            <div class='document-viewer-head'>\n            </div>\n            <div class='document-viewer-body'>\n            </div>\n            <div class='document-viewer-footer'>\n            </div>\n        ");

		// console.log($(_mountNode));

		_productHierarchyJSON = _flatTree.toNestedTree(flatData);
		_productHierarchy.init();

		if (sortable) {
			_sortable.init();
		}

		if (selectable) {
			_selectable.init();
		}
	}();
};

$.fn.extend({
	documentViewer: DocumentViewer
});
