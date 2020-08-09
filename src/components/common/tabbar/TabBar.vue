<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'TarBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tab-bar{
  width:100%;
  display: flex;
  background: #f6f6f6;
  position: fixed;
  left:0;
  right:0;
  bottom:0;
  box-shadow: 0px -1px 1px rgba(100,100,100,.2);
}

</style>
