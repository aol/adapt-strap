/**
 * adapt-strap
 * @version v0.2.7 - 2014-08-22
 * @link https://github.com/Adaptv/adapt-strap
 * @author Kashyap Patel (kashyap@adap.tv)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, document, undefined) {
'use strict';

// Source: loadingindicator.tpl.js
angular.module('adaptv.adaptStrap.loadingindicator').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('loadingindicator/loadingindicator.tpl.html', '<div class="ad-loading-overlay-container" ng-class="containerClasses" ng-style="{\'z-index\': zIndex || \'1000\',\'position\': position || \'absolute\'}" ng-show="loading"><div class="wrapper"><div class="loading-indicator"><ad-loading-icon loading-icon-size="{{ loadingIconSize }}" loading-icon-class="{{ loadingIconClass }}"></ad-loading-icon></div></div></div>');
  }
]);

// Source: tableajax.tpl.js
angular.module('adaptv.adaptStrap.tableajax').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('tableajax/tableajax.tpl.html', '<div class="ad-table-ajax-container"><div class="ad-table-ajax-table-container"><table class="%=tableClasses%"><tr class="ad-user-select-none"><th data-ng-repeat="definition in %=columnDefinition%" ng-click="%=tableName%.sortByColumn(definition)" ng-class="{\'ad-cursor-pointer\': definition.sortKey}" ng-style="{\'width\': definition.width}"><div class="pull-right" ng-if="definition.sortKey && %=tableName%.localConfig.predicate == definition.sortKey"><i class="%=icon-sortAscending%" ng-hide="%=tableName%.localConfig.reverse"></i> <i class="%=icon-sortDescending%" ng-show="%=tableName%.localConfig.reverse"></i></div><div class="pull-right" ng-if="definition.sortKey && %=tableName%.localConfig.predicate != definition.sortKey"><i class="%=icon-sortable%"></i></div><div ng-if="definition.columnHeaderTemplate" ng-bind-html="definition.columnHeaderTemplate"></div><div ng-if="definition.columnHeaderDisplayName" ng-bind="definition.columnHeaderDisplayName"></div></th></tr><tr data-ng-repeat="item in %=tableName%.items.list"><td data-ng-repeat="definition in %=columnDefinition%"><div ng-if="definition.templateUrl"><ng-include src="definition.templateUrl"></ng-include></div><div ng-if="!definition.templateUrl">{{ %=tableName%.applyFilter(%=tableName%.readProperty(item, definition.displayProperty), definition.cellFilter) }}</div></td></tr></table><ad-loading-overlay loading="%=tableName%.localConfig.loadingData"></ad-loading-overlay></div><div class="row"><div class="col-md-8 col-sm-8"><div class="%=paginationBtnGroupClasses% pull-left"><button type="button" class="btn btn-default" ng-click="%=tableName%.loadPage(1)" ng-disabled="%=tableName%.items.paging.currentPage == 1"><i class="%=icon-firstPage%"></i></button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadPreviousPage()" ng-disabled="%=tableName%.items.paging.currentPage == 1"><i class="%=icon-previousPage%"></i></button> <button type="button" class="btn btn-default" ng-repeat="page in %=tableName%.localConfig.pagingArray" ng-class="{active: %=tableName%.items.paging.currentPage == page}" ng-click="%=tableName%.loadPage(page)">{{ page }}</button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadNextPage()" ng-disabled="%=tableName%.items.paging.currentPage == %=tableName%.items.paging.totalPages"><i class="%=icon-nextPage%"></i></button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadLastPage()" ng-disabled="%=tableName%.items.paging.currentPage == %=tableName%.items.paging.totalPages"><i class="%=icon-lastPage%"></i></button></div></div><div class="col-md-4 col-sm-4"><div class="%=paginationBtnGroupClasses% pull-right"><button type="button" class="btn btn-default" ng-repeat="size in %=tableName%.items.paging.pageSizes" ng-class="{active: %=tableName%.items.paging.pageSize == size}" ng-click="%=tableName%.pageSizeChanged(size)">{{ size }}</button></div></div></div></div>');
  }
]);

// Source: tablelite.tpl.js
angular.module('adaptv.adaptStrap.tablelite').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('tablelite/tablelite.tpl.html', '<div class="ad-table-lite-container"><table class="%=tableClasses%"><tr class="ad-user-select-none"><th ng-if="%=tableName%.localConfig.selectable && %=tableName%.items.allItems" class="ad-select-cell"><input type="checkbox" class="ad-cursor-pointer" ng-click="%=tableName%.addRemoveAll(%=tableName%.items.allItems, %=tableName%.selectedItems)" ng-checked="%=tableName%.allSelected(%=tableName%.items.allItems, %=tableName%.selectedItems)"></th><th data-ng-repeat="definition in %=columnDefinition%" ng-click="%=tableName%.sortByColumn(definition)" ng-class="{\'ad-cursor-pointer\': definition.sortKey}" ng-style="{\'width\': definition.width}"><div class="pull-right" ng-if="definition.sortKey && %=tableName%.localConfig.predicate == definition.sortKey"><i class="%=icon-sortAscending%" ng-hide="%=tableName%.localConfig.reverse"></i> <i class="%=icon-sortDescending%" ng-show="%=tableName%.localConfig.reverse"></i></div><div class="pull-right" ng-if="definition.sortKey && %=tableName%.localConfig.predicate != definition.sortKey"><i class="%=icon-sortable%"></i></div><div ng-if="definition.columnHeaderTemplate" ng-bind-html="definition.columnHeaderTemplate"></div><div ng-if="definition.columnHeaderDisplayName" ng-bind="definition.columnHeaderDisplayName"></div></th></tr><tr data-ng-repeat="item in %=tableName%.items.list" ng-class="{\'ad-selected\': %=tableName%.localConfig.selectable && %=tableName%.isSelected(item, %=tableName%.selectedItems)}"><td ng-if="%=tableName%.localConfig.selectable" class="ad-select-cell"><input type="checkbox" class="ad-cursor-pointer" ng-checked="%=tableName%.isSelected(item, %=tableName%.selectedItems)" ng-click="%=tableName%.addRemoveItem(item, %=tableName%.selectedItems)"></td><td data-ng-repeat="definition in %=columnDefinition%"><div ng-if="definition.templateUrl"><ng-include src="definition.templateUrl"></ng-include></div><div ng-if="!definition.templateUrl">{{ %=tableName%.applyFilter(%=tableName%.readProperty(item, definition.displayProperty), definition.cellFilter) }}</div></td></tr></table><div class="row" ng-if="%=tableName%.items.allItems.length > %=tableName%.items.paging.pageSizes[0] && %=tableName%.localConfig.showPaging"><div class="col-md-8 col-sm-8"><div class="%=paginationBtnGroupClasses% pull-left"><button type="button" class="btn btn-default" ng-click="%=tableName%.loadPage(1)" ng-disabled="%=tableName%.items.paging.currentPage == 1"><i class="%=icon-firstPage%"></i></button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadPreviousPage()" ng-disabled="%=tableName%.items.paging.currentPage == 1"><i class="%=icon-previousPage%"></i></button> <button type="button" class="btn btn-default" ng-repeat="page in %=tableName%.localConfig.pagingArray" ng-class="{active: %=tableName%.items.paging.currentPage == page}" ng-click="%=tableName%.loadPage(page)">{{ page }}</button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadNextPage()" ng-disabled="%=tableName%.items.paging.currentPage == %=tableName%.items.paging.totalPages"><i class="%=icon-nextPage%"></i></button> <button type="button" class="btn btn-default" ng-click="%=tableName%.loadLastPage()" ng-disabled="%=tableName%.items.paging.currentPage == %=tableName%.items.paging.totalPages"><i class="%=icon-lastPage%"></i></button></div></div><div class="col-md-4 col-sm-4"><div class="%=paginationBtnGroupClasses% pull-right"><button type="button" class="btn btn-default" ng-repeat="size in %=tableName%.items.paging.pageSizes" ng-class="{active: %=tableName%.items.paging.pageSize == size}" ng-click="%=tableName%.pageSizeChanged(size)">{{ size }}</button></div></div></div></div>');
  }
]);

// Source: treebrowser.tpl.js
angular.module('adaptv.adaptStrap.treebrowser').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('treebrowser/treebrowser.tpl.html', '<div class="ad-tree-browser-container" ng-class="{\'tree-bordered\': %=bordered%}"><div id="segment-tree" data-level="0" class="tree-view"><div class="tree"><script type="text/ng-template" id="%=treeName%-tree-renderer.html"><div class="content" ng-style="{\'padding-left\': level * %=childrenPadding% + \'px\'}"\n' + '                     ng-class="%=rowNgClass%">\n' + '                    <div class="content-holder">\n' + '                        <div class="toggle">\n' + '                            <!--todo: create a callback api to handle the expand and collapse functions-->\n' + '                            <i ng-show="!item._ad_expanded && %=treeName%.hasChildren(item) && !item._ad_loading"\n' + '                               class="%=icon-expand%" ng-click="%=treeName%.toggle($event,item)"></i>\n' + '                            <i ng-show="item._ad_expanded && !item._ad_loading"\n' + '                               class="%=icon-collapse%" ng-click="%=treeName%.toggle($event,item)"></i>\n' + '                            <span ng-show="item._ad_loading">\n' + '                                <i class="%=icon-loadingSpinner%"></i>\n' + '                            </span>\n' + '                        </div>\n' + '                        <div class="node-content">\n' + '                            <!--this is the template supplied as an attribute.-->\n' + '                            %=nodeTemplate%\n' + '                        </div>\n' + '                    </div>\n' + '                </div>\n' + '                <div ng-show="item._ad_expanded">\n' + '                    <div ng-repeat="item in item.%=childNodeName%" class="tree-level tree-sub-level"\n' + '                         ng-include="\'%=treeName%-tree-renderer.html\'" onLoad="level=level+1">\n' + '                    </div>\n' + '                </div></script><div><div class="tree-level tree-header-level border" ng-show="%=treeName%.localConfig.showHeader"><div class="content" ng-style="{\'padding-left\': %=childrenPadding% + \'px\'}"><div class="content-holder"><div class="toggle"></div><div class="node-content ad-user-select-none">%=nodeHeaderTemplate%</div></div></div></div><div class="tree-level tree-top-level border" ng-repeat="item in %=treeRootName%.%=childNodeName%" ng-include="\'%=treeName%-tree-renderer.html\'" onload="level = 1"></div></div></div></div></div>');
  }
]);


})(window, document);
