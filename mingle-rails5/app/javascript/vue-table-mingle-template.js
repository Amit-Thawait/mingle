/*
*  Copyright 2020 ThoughtWorks, Inc.
*
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU Affero General Public License as
*  published by the Free Software Foundation, either version 3 of the
*  License, or (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU Affero General Public License for more details.
*
*  You should have received a copy of the GNU Affero General Public License
*  along with this program.  If not, see <https://www.gnu.org/licenses/agpl-3.0.txt>.
*/
'use strict';

import perPageValuesBuilder from 'vue-tables-2/compiled/modules/per-page-values'

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (h, modules, classes, slots) {

  var filterId = 'VueTables__search_' + this.id;
  var ddpId = 'VueTables__dropdown-pagination_' + this.id;
  var perpageId = 'VueTables__limit_' + this.id;
  var perpageValues = perPageValuesBuilder.call(this, h);

  var genericFilter = this.hasGenericFilter ? h(
      'div',
      { 'class': 'VueTables__search-field' },
      [modules.normalFilter(classes, filterId)]
  ) : '';

  var perpage = perpageValues.length > 1 ? h(
      'div',
      { 'class': 'VueTables__limit-field' },
      [h(
          'label',
          { 'class': classes.label, attrs: { 'for': perpageId }
          },
          [this.display('limit')]
      ), modules.perPage(perpageValues, classes.select, perpageId)]
  ) : '';

  var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown ? h(
      'div',
      { 'class': 'VueTables__pagination-wrapper' },
      [h(
          'div',
          { 'class': classes.field + ' ' + classes.inline + ' ' + classes.right + ' VueTables__dropdown-pagination',
            directives: [{
              name: 'show',
              value: this.totalPages > 1
            }]
          },
          [h(
              'label',
              {
                attrs: { 'for': ddpId }
              },
              [this.display('page')]
          ), modules.dropdownPagination(classes.select, ddpId)]
      )]
  ) : '';

  var columnsDropdown = this.opts.columnsDropdown ? h(
      'div',
      { 'class': 'VueTables__columns-dropdown-wrapper' },
      [modules.columnsDropdown(classes)]
  ) : '';

  var footerHeadings = this.opts.footerHeadings ? h('tfoot', [h('tr', [modules.headings(classes.right)])]) : '';

  var shouldShowTop = genericFilter || perpage || dropdownPagination || columnsDropdown || slots.beforeFilter || slots.afterFilter || slots.beforeLimit || slots.afterLimit;

  var tableTop = h(
      'div',
      { 'class': classes.row, directives: [{
          name: 'show',
          value: shouldShowTop
        }]
      },
      [h(
          'div',
          { 'class': classes.column },
          [h(
              'div',
              { 'class': classes.field + ' ' + classes.inline + ' ' + classes.left + ' VueTables__search' },
              [slots.beforeFilter, genericFilter, slots.afterFilter]
          ), h(
              'div',
              { 'class': classes.field + ' ' + classes.inline + ' ' + classes.right + ' VueTables__limit' },
              [slots.beforeLimit, perpage, slots.afterLimit]
          ), dropdownPagination, columnsDropdown]
      )]
  );

  function getPagination() {
    return modules.pagination((0, _merge2.default)(classes.pagination, {
      wrapper: classes.row + ' ' + classes.column + ' ' + classes.contentCenter,
      nav: classes.center,
      count: classes.center + ' ' + classes.column
    }));
  }

  return h(
      'div',
      { 'class': "VueTables VueTables--" + this.source },
      [getPagination(),tableTop,slots.beforeTable, h(
          'div',
          { 'class': 'table-responsive' },
          [h(
              'table',
              { 'class': 'VueTables__table ' + (this.opts.skin ? this.opts.skin : classes.table) },
              [h('thead', [h('tr', [modules.headings(classes.right)]), slots.beforeFilters, modules.columnFilters(classes), slots.afterFilters]), footerHeadings, slots.beforeBody, h('tbody', [slots.prependBody, modules.rows(classes), slots.appendBody]), slots.afterBody]
          )]
      ), slots.afterTable, getPagination(), modules.dropdownPaginationCount()]
  );
};