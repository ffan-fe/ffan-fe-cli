import $ from 'jquery';
import rootTpl from './assets/root.hbs';
import './assets/index.less';

/**
 * Sample
 */
$(function init() {
  $('#root').html(
    rootTpl({name: 'World'})
  );
});
