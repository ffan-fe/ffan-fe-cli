<style>

  .footer {
    border  : 1px solid darkcyan; /*no*/
    padding : 20px;
  }

  .hl {
    color : #00aeff;
  }

</style>

<template>
  <div class="app">
    <h1>Hello <span class="hl"> {{name}}</span></h1>
    <img src="./assets/images/ffan.jpg" alt="ffan">
    <div class="footer">Footer</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'World'
      }
    }
  }
</script>

