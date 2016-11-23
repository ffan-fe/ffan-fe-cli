import $ from 'jquery';
import rootTpl from './assets/root.hbs';
import './assets/index.less';

//import './assets/index.css'


/**
 * Sample
 */
$(function init() {
  $('#root').html(
    rootTpl({name: 'World'})
  );
});

console.log($)
