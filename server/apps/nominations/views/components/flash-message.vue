<template>
  <div v-if="visible" :class="`alert alert-${type}`">
    <button type="button" class="close" v-on:click="close">&times;</button>
    <slot></slot>
  </div>
</template>

<script>
    function emptyVNode(n) {
        return !n.tag && !n.text;
    }
    module.exports = {
        data: function () {
            return {
                visible: !emptyVNode(this.$slots.default[0]),
                type: 'warning',
            };
        },
        methods: {
            close: function () {
                this.visible = false;
            }
        }
    };
</script>

<style></style>
