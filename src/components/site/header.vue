<template>
    <div class="logo-table">
        <span class="logo-cell">
            网站logo
            <br>
            <span>(尺寸1010x80背景白色)</span>
        </span>
        <div class="logo-img">
            <img :src="url">
            <div>
                <a>更换</a>
                <a>删除</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      url: 'http://cdn.seezt.cc/uploadimages/201711/YCtMJ_JWnMBom8530MaFLn9f.gif'
    }
  }
}
</script>

<style scoped>
    .logo-table {
        display: table;
    }
    .logo-cell {
        display: table-cell;
        width: 1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    .logo-img {
        display: block;
    }
</style>
