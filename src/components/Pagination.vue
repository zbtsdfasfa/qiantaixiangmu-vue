<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startAndendNum.start > 1" @click="$emit('getPageNo' , 1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startAndendNum.start >2">···</button>
    <!-- 分页器中间部分 -->
    <button
      v-for="(page , index ) in startAndendNum.end "
      :key="index"
      v-show="page>=startAndendNum.start"
      @click="$emit('getPageNo' , page)"
      :class="{active:pageNo == page}"
    >{{page}}</button>

    <button v-if="startAndendNum.end < totalPage - 1">···</button>
    <button
      v-show="startAndendNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo == totalPage}"
    >{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      // math.ceil是向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的开始数据和结束数据
    startAndendNum() {
      const { continues, pageNo, totalPage } = this;
      // 定义两个参数用来存储开始数据和结束数据
      let start = 0,
        end = 0;
      // 不正常现象，continues > totalpage
      if (continues > totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象【连续页码数为5，但是总页数大于连续页码数】
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 纠正不正常现象【start数组出现0或者负数】现象
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 纠正end不正常现象
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(216, 18, 18);
      color: #fff;
    }
  }
}
</style>
