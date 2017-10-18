# Document Viewer

<disclaimer>
This page is in [Mark Down (MD)](https://daringfireball.net/projects/markdown/syntax) format. You can choose a chrome plugin like [Markdown Viewer](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk) to view this page with formating.<br />
All content in this page is the Intellectual property of [Engage Entertainment Pvt. Ltd.] Copyright 2017. You may refer to this page or keep it as long it bears this copyright.
</disclaimer>

## Overview

* Component for representing hierarchy of data (namely - `Product` and `Category`).
* Dynamically Generates the hierarchical DOM structure based on the `flat-hierarchy tree` passed to it.
* This is a synonymous accordian representation of Category-Product Tree Structure.


## Running the app

* Double click and open `index.html`


## Usage Guide

* You need **jQuery** loaded already for this plugin. --- **`DEPENDENCY ALERT`**
* Import `documentViewer.js` or `documentViewer.min.js` :-p
* Call `documentViewer(...config)` on any **jQuery DOM node**. Ex. -

        $('#products-hierarchy').documentViewer({
            flatData: data
        });

* This generates a DOM structure on the node `$('#products-hierarchy')`


## Configuration

* **flatData** - JSON array of objects (`Flat representation of parent-child hierarchy`). Ex.

        [
          {
            "category": true,
            "id": 5,
            "data": {
              "title": "category 5"
            },
            "parentId": 0
          },
          {
            "category": true,
            "id": 1,
            "data": {
              "title": "category 1"
            },
            "parentId": 0
          },
          {
            "category": true,
            "id": 2,
            "data": {
              "title": "category 2"
            },
            "parentId": 0
          },
          {
            "category": true,
            "id": 3,
            "data": {
              "title": "category 3"
            },
            "parentId": 0
          },
          {
            "category": true,
            "id": 0,
            "data": {
              "title": "category 0"
            }
          },
          {
            "category": true,
            "id": 4,
            "data": {
              "title": "category 4"
            },
            "parentId": 0
          },
          {
            "category": false,
            "id": 6,
            "data": {
              "title": "product 0"
            },
            "parentId": 5
          },
          {
            "category": false,
            "id": 7,
            "data": {
              "title": "product 1"
            },
            "parentId": 5
          }
        ]

* **actions** - Associative Array of actions - shown on the product/category bar(row). Ex.

        {
            "delete": {
                "icon": "<img src='#' ref='delete' />",
                "actions": {
                    before: function(row) {
                        confirm('Delete ?');
                    },
                    after: function(row) {
                        alert('Delete After!');
                    }
               },
               "filter": function(row) {
                   if($(row).hasClass('product-wrapper'))
                        return false;

                   return true;
               }
            },
            "add": {
                "icon": "<img src='#' ref='add' />",
                "actions": {
                    before: function(row) {
                        confirm('Add?');
                    },
                    after: function(row) {
                        alert('Add after!');
                    }
               },
               "filter": function(row) {
                    if($(row).hasClass('product-wrapper'))
                        return true;

                    return false;
               }
            }
         };


* **subMenu** -  Associative Array of actions - shown as the Context Menu (right-click menu). Ex. `SIMILAR STRUCTURE AS ACTIONS`

* **alert** - Function Overriding the default alert box of window.

* **confirm** - Function Overriding the default confirm box of window.

* **prompt** - Function Overriding the default prompt box of window.

* **sortable** - boolean - Should the documentViewer be sortable or not (drag and drop functionality).

* **selectable** - boolean - Should the documentViewer be selectable or not.

