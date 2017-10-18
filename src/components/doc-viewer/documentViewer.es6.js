const DocumentViewer = function(config) {
    let {
        flatData = [],
        actions = {},
        subMenu = {},
        sortable = false,
        selectable = false,
        alert = window.alert,
        confirm = window.confirm,
        prompt = window.prompt
    } = config ? config : {};

    let _mountNode = this;
    let _productHierarchyJSON;

    /**
        Factory Function for Flat Tree
        ------------------------------

        - Utility functions for flat tree that are required in this plugin

        @return object
    */
    let _flatTree = (function () {
        /**
            GetNestedChildren
            ------------------

            - recursively maps flat hierarchy tree to nested hierarchy tree

            @param arr: array of objects
            @param parentId: numeral id

            @return array
        */
        let getNestedChildren = function(arr, parentId) {
            // console.log('parnetId should be undefined first time');
            // console.log(parentId);
            var out = []
            for(var i in arr) {
                if(arr[i].parentId == parentId) {
                    if(arr[i].category) {
                        var children = getNestedChildren(arr, arr[i].id)

                        arr[i].children = children;
                    }
                    out.push(arr[i])
                }
            }
            return out;
        }

        return {
            /**
                toNestedTree
                ------------------

                - uses getNestedChildren to map flat hierarchy to nested hierarchy

                @param arr: array of objects(flat)

                @return array of objects(nested)
            */
            toNestedTree: function (arr) {
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
            removeKey: function (arr, key) {
                return arr.map((item) => {
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
            getItemIndex: function (arr, itemId) {
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].id === itemId)
                        return i;
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
            getItemById: function (arr, itemId) {
                return arr.filter((item) => item.id == itemId)[0];
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
            position: function(arr, from, to) {
                if(to + 1 == from)
                    return arr;

                return arr.splice(to + 1, 0, arr.splice(from, 1)[0]);
            }
        }
    })();

	let _productHierarchy = (function () {
		/**
			Action Generators
			-----------------

			- Generates the action buttons for products and categories

			@param configActions: array of objects (action objects)

			@return string (DOM string for generated actions)
		*/
		let generateActions = function (configActions, row) {
				let actions = '';

				for (let key in configActions) {
                    if(configActions[key].filter(row)) {
                        let action = "<a href='#' class='action-" + key + "'>" + configActions[key].icon + " <span class='label'>" + key + "</span></a>";

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
		let generateProduct = function (item) {

			let _product = `
				<li class="product-wrapper">
					<div id="leaf-` + item.id + `" class="product-head">
						<div class="checkbox"><input type="checkbox" name="product" value="node-` + item.id + `" /></div>
                        <div class='head-content'>
    						<div class="title">
    	                    	` + item.data.title + `
    	                    </div>
                            <div class="info">
                                Rs ` + item.data.price + `
                            </div>
                        </div>
					</div>
				</li>
			`;


    		let _actions = generateActions(actions, _product);
    		let _subMenu = generateActions(subMenu, _product);
            let _productHead = $(_product).find('.product-head');

            let _productControls = '';

            if(_actions) {
                _productControls += `<div class="actions">` + _actions + `</div>`;
            }

            if(_subMenu) {
                _productControls += `<div class="contextmenu"><span class="contexthead">` + item.data.title + `</span>` + _subMenu + `</div>`;
            }

            return $(_productControls).appendTo(_productHead).parent().parent()[0].outerHTML;
        }

		/**
			Category DOM Generators
			-----------------

			- Generates the category's DOM element using the passed item object

			@param data: array of objects

			@return string (DOM string for generated catefories - consisting of products)
		*/
		let generateProductHierarchy = function (data) {
			if(!data || data.length === 0) {
                //TODO: Better Empty Category UX
				console.log('Category is empty');
                // return false
			}

			let _markup = [];

            // console.log('data');
            // console.log(data);

			if(data) {
				_markup =  data.map(function(item) {

					if(!item.category) {
						return generateProduct(item);
					}

					let _children = generateProductHierarchy(item.children);

					let _category = `
						<li class="category-wrapper">
							<div class="accordian-link category-head" id="node-` + item.id + `">
								<div class="checkbox"><input type="checkbox" name="category" value="node-` + item.id + `" /></div>
                                <div class='head-content'>
    								<div class="title">
    									` + item.data.title + `
    								</div>
                                    <div class="info">
                                        ` + item.children.length + ` Products <i class='fa fa-caret-down'></i>
                                    </div>
                                </div>
							</div>
							<div class="accordian-content category-content">
								` + (_children || '') + `
							</div>
						</li>
					`;

            		let _actions = generateActions(actions, _category);
            		let _subMenu = generateActions(subMenu, _category);

                    let _categoryHead = $(_category).children('.category-head');

                    let _categoryControls = '';

                    if(_actions) {
                        _categoryControls += `<div class="actions `+item.id+`">` + _actions + `</div>`;
                    }

                    if(_subMenu) {
                        _categoryControls += `<div class="contextmenu"><span class="contexthead">` + item.data.title + `</span>` + _subMenu + `</div>`;
                    }

                    // console.log(item);
                    // console.log(item.id);
                    // console.log(_categoryControls);
                    // console.log(_categoryHead);

                    return $(_categoryControls).appendTo(_categoryHead).parent().parent()[0].outerHTML;

				});
			}

			return `
				<ul class="accordian-container">
					` + _markup.join('') + `
				</ul>
			`;
		}


        let clickAction = (obj, key) => {
            let action = obj[key].actions;

            if(action.before())
                action.after();
        }


		/**
			Bind Events
			-----------------

			- Binds events to the generated category-product hierarchy DOM
			- Events:
				- Toggle Category Accordian
				- Toggle Context Menu consisting of action buttons
		*/
		let _bindEvents = function () {
            //TODO: change click from category-head to category-title
            //TODO: maxHeight animation is bullshit
            //TODO: move general purpose animation to better place
            $('.title, .actions, .contextmenu', $('.category-wrapper')).on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
			$('.category-head .info').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).closest('.category-head').toggleClass('active');

				// let categoryContent = $(this).siblings('.accordian-content')[0];
                //
				// if(categoryContent.style.maxHeight)
				// 	categoryContent.style.maxHeight = null;
				// else
				// 	categoryContent.style.maxHeight = categoryContent.scrollHeight + 'px';
			});

			$(document).on('contextmenu click', function(e) {
				$('.contextmenu').removeClass('active');
			});

			$('.category-head, .product-head').on('contextmenu', function (e) {
				e.preventDefault();
				e.stopPropagation();

				$('.contextmenu').removeClass('active');

				setTimeout(function () {
					$('.contextmenu', $(this))
						.toggleClass('active')
						.css('left', e.screenX - 50)
						.css('top', e.screenY - 110);

				}.bind(this), 0)

				return false;
			})

            $('.category-head .actions a, .product-head .actions a').on('click', function() {
                let key = this.className.split('-')[1];

                clickAction(actions, key);
            })

            $('.category-head .contextmenu a, .product-head .contextmenu a').on('click', function () {
                let key = this.className.split('-')[1];

                clickAction(subMenu, key);
            })

		}

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
			init: function () {
				$(_mountNode).find('.document-viewer-body').html(generateProductHierarchy(_productHierarchyJSON));

				_bindEvents();

				_flatTree.removeKey(flatData, 'children');
			}
		}
	})();


	/**
		Factory Function - Selectable
		-----------

		- Makes the Product-Category Hieararchy Selectable (with checkboxes)

		@return object
	*/
	let _selectable = (function () {

		// Adds class selectable to all the lists (accordian-container)
		// - Selectable class is responsible for showing the checkboxes
		let _activateSelecting = function () {
            $(_mountNode).find('.accordian-container .checkbox input').prop('checked', false);
			$(_mountNode).find('.accordian-container').toggleClass('selectable');
		}

		// Selects all child categories and products inside given category (#id)
		let _selectChildren = function (id, shouldCheck) {
			$('#'+id).closest('.category-wrapper').find('.checkbox input').prop('checked', shouldCheck);
		}

        let _bindEvents = function () {
            $('#action-selectable').on('click', function (e) {
                // THIS IS SOME BULLSHIT CODE - JUGAAD
                // TODO: Move this code out of this module

                $('#action-sortable')[0].innerText = 'Make Sortable';
                $(_mountNode).find('.accordian-container').removeClass('sortable');

                if($(_mountNode).find('.accordian-container').hasClass('selectable')) {
                    e.target.innerText = 'Make Selectable'
                }
                else {
                    e.target.innerText = 'Back to Unselectable';
                }
                _activateSelecting();
            });

            $('.category-head .checkbox input').on('change', function (e) {
                console.log('e.target');
                if(e.target.name === 'category') {
                    _selectChildren(e.target.value, e.target.checked);
                }

                if(!e.target.checked) {
                    $(this).parents('.category-wrapper').children('.category-head').find('.checkbox input').prop('checked', false);
                }
            });
        }

        let _generateSelectableControls = function () {
            $(_mountNode).find('.document-viewer-head').append(`<button id="action-selectable" class="action">Make Selectable</button>`);

            _bindEvents();
        }

		return {
			/**
				initialize Selectable
				-----------

				- Binds events to action button activating the selectable feature
				- Binds events to checkboxes
			*/
			init: function () {
                _generateSelectableControls();
			}
		}
	})();


	/**
		Factory Function - Sortable
		-----------

		- Makes the Product-Category Hierarchy Sortable with feature:-
		  - Drag and Drop
		  - Reposition

		@return object
	*/
	let _sortable = (function() {
		let isDraggingProduct = null;

		/**
			- Adds draggable DOM element to each category and products
			- Adds the Dragging Item DOM element - this is shown when item is being dragged
		*/
		let _generateSortableControls = function () {
	  		$('.category-wrapper, .product-wrapper')
	  			.prepend('<div class="drag-handle" draggable="true">&#x2630;</div>')
				.append('<li class="drop-area"></li>');

			if(!$('#dragging-item').length)
				$('body').append('<div id="dragging-item"></div>');

            $(_mountNode).find('.document-viewer-head').append(`
                <button id="action-sortable" class="action">Make Sortable</button>
                <button id="action-save" class="action">Save Order</button>
                `);

			_bindEvents();
		}

		// Toggle the sortable action on the product-category hierarchy
		let _activateSorting = function () {
			$(_mountNode).find('.accordian-container').toggleClass('sortable');
		}


		/**
			_changeParent
			-----------

			- Moves the node from under one parent to another

			@param itemId: number
			@param parentId: number
		*/
		let _changeParent = function (itemId, parentId) {
			let item = _flatTree.getItemById(flatData, itemId);

			item.parentId = parentId;

			// We are not having -ve parentIds - If a node doesn't have any parentId key, then it exists on the root level
			if(parentId === -1)
				delete item.parentId;
		}


		/**
			_reposition
			-----------

			- Moves the node from one point to another while being under the same parent
			- i.e. changes  the order of list
		*/
		let _reposition = function (itemId, siblingId) {
			_flatTree.position(flatData, _flatTree.getItemIndex(flatData, itemId), _flatTree.getItemIndex(flatData, siblingId));
		}


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
		let _bindEvents = function () {
		  	$('.drag-handle')
		  		.on('dragstart', function(e) {
		  			if($(this).parent().hasClass('category-wrapper')) {
		  				isDraggingProduct = false;
				  		e.originalEvent.dataTransfer.setData("text", $(this).siblings('.category-head').attr('id'));
				  		$('.product-wrapper > .drop-area').addClass('no-drop-zone');
		  			}
		  			else {
		  				isDraggingProduct = true;
				  		e.originalEvent.dataTransfer.setData("text", $(this).siblings('.product-head').attr('id'));
				  		$('.category-wrapper > .drop-area').addClass('no-drop-zone');
		  			}

				  	$('#dragging-item')
				  		.addClass('active')
				  		.html($('.title', $(this).siblings('.category-head, .product-head')).text());

			  		// It's adding dragging to category-wrapper or product-wrapper
			  		$(this).parent().addClass('dragging');

			  		// Only category-head and drop-areas are drop zone
			  		// Prevent drop-zones inside current dragged item (i meant it's parents)
			  		$('.category-head, .drop-area', $(this).parent()).addClass('no-drop-zone');
				})
				.on('drag', function(e) {
					$('#dragging-item')
						.css('left', e.screenX)
						.css('top', e.screenY - 80);
				})
				.on('dragend', function(e) {
				  	e.preventDefault();

				  	$('#dragging-item')
				  		.removeClass('active')
				  		.html('');

				  		isDraggingProduct = null;

			  		// It's removing dragging from category-wrapper
				  	$(this).parent().removeClass('dragging');
			  		$('.no-drop-zone').removeClass('no-drop-zone');
				})

		  	$('.category-head, .drop-area')
				.on('dragenter', function(e) {
					let ctr = $(this).data('ctr') ? parseInt($(this).data('ctr')) : 0;

					$(this).data('ctr', ++ctr);
					$(this).addClass('drag-enter');
				})
				.on('dragleave', function(e) {
					let ctr = parseInt($(this).data('ctr'));

					$(this).data('ctr', --ctr);
					if(ctr === 0)
						$(this).removeClass('drag-enter');
				})
				.on('dragover', function(e) {
					e.preventDefault();
				});


			// Don't let product to be dropped into the category that have categories as childrens
			// Don't let category to be dropped into the category that have products as childrens
			$('.category-head')
				.on('drop', function(e) {
					e.preventDefault();
					e.stopPropagation();

				  	$('.drag-enter')
				  		.data('ctr', 0)
				  		.removeClass('drag-enter');


				  	if($(this).siblings('.category-content').children()[0].children.length > 0) {
				  		let dropZone = $(this).siblings('.category-content').children()[0].children[0];

				  		if(
				  			(isDraggingProduct && dropZone.classList.contains('category-wrapper')) ||
				  			(!isDraggingProduct && !dropZone.classList.contains('category-wrapper'))
				  		) {
				  			// alert("can't drop into this category");
				  			if(isDraggingProduct)
				  				alert("Can only drop product into empty categories or inside categories having products");
				  			else
				  				alert("Can only drop category into empty categories or inside categories having categories");

				  			return false;
				  		}
				  	}

					if($(this).hasClass('no-drop-zone')) {
						return false;
					}

				  	let _itemId = e.originalEvent.dataTransfer.getData("text");

				  	let _itemIdNum = parseInt(_itemId.split('-')[1]);
				  	let _parentIdNum = parseInt($(this).attr('id').split('-')[1]);

				  	_changeParent(_itemIdNum, _parentIdNum);

				  	$(this)
				  		.siblings('.category-content')
				  		.children(0)
				  		.append($('#'+_itemId).parent()[0]);
				});

			// Don't highlight the areas that are not meant to be drop areas
			// Ex.
			//	1. Product being dropped to the drop area of category
			// 	2. Category being dropped to the drop area of product
			//
			// DONE!!!!!!!!
			$('.drop-area')
				.on('drop', function (e) {
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

				  	$('.drag-enter')
				  		.data('ctr', 0)
				  		.removeClass('drag-enter');

				  	if(
						(isDraggingProduct && $(this).parent().hasClass('category-wrapper')) ||
						(!isDraggingProduct && !$(this).parent().hasClass('category-wrapper')) ||
						$(this).hasClass('no-drop-zone')
					) {
						return false;
					}

				  	let _itemId = e.originalEvent.dataTransfer.getData("text");

				  	let _itemIdNum = parseInt(_itemId.split('-')[1]);
				  	let _siblingIdNum = -1;
				  	let _parentIdNum = -1;

				  	if(isDraggingProduct) {
				  		_siblingIdNum = parseInt($(this).siblings('.product-head').attr('id').split('-')[1])
				  	}
				  	else {
				  		_siblingIdNum = parseInt($(this).siblings('.category-head').attr('id').split('-')[1])
				  	}

				  	if($(this).closest('.category-content').length > 0)
				  		_parentIdNum = parseInt($(this).closest('.category-content').siblings('.category-head').attr('id').split('-')[1]);


				  	_reposition(_itemIdNum, _siblingIdNum);
				  	_changeParent(_itemIdNum, _parentIdNum);

				  	$('#'+_itemId).parent().insertAfter($(this).parent());
				});


			$('#action-sortable').on('click', function(e) {
                // THIS IS SOME BULLSHIT CODE - JUGAAD
                // TODO: Move this code out of this module
                $('#action-selectable')[0].innerText = 'Make Selectable';
                $(_mountNode).find('.accordian-container').removeClass('selectable');

                if($(_mountNode).find('.accordian-container').hasClass('sortable')) {
                    e.target.innerText = 'Make Sortable'
                }
                else {
                    // let selectable = $('#action-selectable');
                    // if(selectable) {
                    //     console.log('aaaaaaaaa');
                    //     $(selectable).click();
                    // }
                    e.target.innerText = 'Back to Unsortable';
                }
				_activateSorting();
			});

			$('#action-save').on('click', function(e) {
				console.log('This is the final state after all the drag-drop and _repositioning');
				console.log(flatData);
				console.log(JSON.stringify(flatData));

                e.target.innerText = 'Saving...';

                setTimeout(function() {
                    e.target.innerText = 'Save Order';
                }, 1000);
			});
		}

		return {
			// Initializes sortable and binds the activation of this to #action-sortable
			init: function () {
				_generateSortableControls();
			},
		}

	})();

    let _init = (function () {
        $(_mountNode).append(`
            <div class='document-viewer-head'>
            </div>
            <div class='document-viewer-body'>
            </div>
            <div class='document-viewer-footer'>
            </div>
        `)

        // console.log($(_mountNode));

        _productHierarchyJSON = _flatTree.toNestedTree(flatData);
        _productHierarchy.init();

        if(sortable) {
            _sortable.init();
        }

        if(selectable) {
            _selectable.init();
        }
    })();
};


$.fn.extend({
	documentViewer: DocumentViewer
})
