angular.module('adaptv.adaptStrap.tablelite', ['adaptv.adaptStrap.utils'])
/**
 * Use this directive if you need to render a simple table with local data source.
 */
  .directive('adTableLite', [
    '$parse', '$http', '$compile', '$filter', '$templateCache', '$adConfig', 'adStrapUtils', 'adDebounce',
    function ($parse, $http, $compile, $filter, $templateCache, $adConfig, adStrapUtils, adDebounce) {
      'use strict';
      function _link(scope, element, attrs) {
        // We do the name spacing so the if there are multiple ad-table-lite on the scope,
        // they don't fight with each other.
        scope[attrs.tableName] = {
          items: {
            list: undefined,
            allItems: undefined,
            paging: {
              currentPage: 1,
              totalPages: undefined,
              pageSize: undefined,
              pageSizes: $parse(attrs.pageSizes)() || [10, 25, 50]
            }
          },
          localConfig: {
            pagingArray: [],
            selectable: attrs.selectedItems ? true : false,
            showPaging: $parse(attrs.disablePaging)() ? false : true
          },
          selectedItems: scope.$eval(attrs.selectedItems),
          applyFilter: adStrapUtils.applyFilter,
          isSelected: adStrapUtils.itemExistsInList,
          addRemoveItem: adStrapUtils.addRemoveItemFromList,
          addRemoveAll: adStrapUtils.addRemoveItemsFromList,
          allSelected: adStrapUtils.itemsExistInList,
          readProperty: adStrapUtils.getObjectProperty
        };

        // ---------- Local data ---------- //
        var tableModels = scope[attrs.tableName],
          mainTemplate = $templateCache.get('tablelite/tablelite.tpl.html');
        tableModels.items.paging.pageSize = tableModels.items.paging.pageSizes[0];

        // ---------- ui handlers ---------- //
        tableModels.loadPage = adDebounce(function (page) {
          var start = (page - 1) * tableModels.items.paging.pageSize,
            end = start + tableModels.items.paging.pageSize,
            i,
            itemsObject = [],
            localItems;

          if (angular.isArray(scope.$eval(attrs.localDataSource))) {
            itemsObject = scope.$eval(attrs.localDataSource);
          } else {
            angular.forEach(scope.$eval(attrs.localDataSource), function (item) {
              itemsObject.push(item);
            });
          }

          if (tableModels.localConfig.showPaging === false) {
            end = itemsObject.length;
          }

          localItems = $filter('orderBy')(
            itemsObject,
            tableModels.localConfig.predicate,
            tableModels.localConfig.reverse
          );

          tableModels.items.list = localItems.slice(start, end);
          tableModels.items.allItems = itemsObject;
          tableModels.items.paging.currentPage = page;
          tableModels.items.paging.totalPages = Math.ceil(
              itemsObject.length /
              tableModels.items.paging.pageSize
          );
          tableModels.localConfig.pagingArray = [];
          var TOTAL_PAGINATION_ITEMS = 5;
          var minimumBound = page - Math.floor(TOTAL_PAGINATION_ITEMS / 2);
          for (i = minimumBound; i <= page; i++) {
            if (i > 0) {
              tableModels.localConfig.pagingArray.push(i);
            }
          }
          while (tableModels.localConfig.pagingArray.length < TOTAL_PAGINATION_ITEMS) {
            if (i > tableModels.items.paging.totalPages) {
              break;
            }
            tableModels.localConfig.pagingArray.push(i);
            i++;
          }
        }, 100);

        tableModels.loadNextPage = function () {
          if (tableModels.items.paging.currentPage + 1 <= tableModels.items.paging.totalPages) {
            tableModels.loadPage(tableModels.items.paging.currentPage + 1);
          }
        };

        tableModels.loadPreviousPage = function () {
          if (tableModels.items.paging.currentPage - 1 > 0) {
            tableModels.loadPage(tableModels.items.paging.currentPage - 1);
          }
        };

        tableModels.loadLastPage = function () {
          if (!tableModels.localConfig.disablePaging) {
            tableModels.loadPage(tableModels.items.paging.totalPages);
          }
        };

        tableModels.pageSizeChanged = function (size) {
          tableModels.items.paging.pageSize = size;
          tableModels.loadPage(1);
        };

        tableModels.sortByColumn = function (column) {
          if (column.sortKey) {
            if (column.sortKey !== tableModels.localConfig.predicate) {
              tableModels.localConfig.predicate = column.sortKey;
              tableModels.localConfig.reverse = true;
            } else {
              if (tableModels.localConfig.reverse === true) {
                tableModels.localConfig.reverse = false;
              } else {
                tableModels.localConfig.reverse = undefined;
                tableModels.localConfig.predicate = undefined;
              }
            }
            tableModels.loadPage(tableModels.items.paging.currentPage);
          }
        };

        // ---------- initialization and event listeners ---------- //
        //We do the compile after injecting the name spacing into the template.
        tableModels.loadPage(1);
        attrs.tableClasses = attrs.tableClasses || 'table';
        attrs.paginationBtnGroupClasses = attrs.paginationBtnGroupClasses || 'btn-group btn-group-sm';
        mainTemplate = mainTemplate.
          replace(/%=tableName%/g, attrs.tableName).
          replace(/%=columnDefinition%/g, attrs.columnDefinition).
          replace(/%=paginationBtnGroupClasses%/g, attrs.paginationBtnGroupClasses).
          replace(/%=tableClasses%/g, attrs.tableClasses).
          replace(/%=icon-firstPage%/g, $adConfig.iconClasses.firstPage).
          replace(/%=icon-previousPage%/g, $adConfig.iconClasses.previousPage).
          replace(/%=icon-nextPage%/g, $adConfig.iconClasses.nextPage).
          replace(/%=icon-lastPage%/g, $adConfig.iconClasses.lastPage).
          replace(/%=icon-sortAscending%/g, $adConfig.iconClasses.sortAscending).
          replace(/%=icon-sortDescending%/g, $adConfig.iconClasses.sortDescending).
          replace(/%=icon-sortable%/g, $adConfig.iconClasses.sortable);
        element.empty();
        element.append($compile(mainTemplate)(scope));
        scope.$watch(attrs.localDataSource, function () {
          tableModels.loadPage(1);
        }, true);
      }

      return {
        restrict: 'E',
        link: _link
      };
    }]);
