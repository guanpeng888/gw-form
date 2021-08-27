<template>
  <div id="pagePicker">
    <div class="pickerWrap">
      <span v-if="showTotal">共{{ total }}条</span>
      <button
        type="button"
        class="pageBtn"
        :disabled="currentPage <= 1"
        @click="pageChange('prev')"
      >
        <Icon type="ios-arrow-back" />
      </button>
      <button
        type="button"
        :class="['pageBtn', currentPage == 1 ? 'active' : '']"
        :disabled="totalPage <= 0 || currentPage == 1"
        @click="pageChange('first')"
        v-if="firstPage && totalPage >= 0"
      >
        1
      </button>
      <button type="button" class="pageBtn" v-if="pointN">
        <Icon type="ios-more" />
      </button>
      <template v-if="totalPage >= 1">
        <button
          type="button"
          :class="['pageBtn numBtn', currentPage == i ? 'active' : '']"
          v-for="i in pageArr"
          :key="i"
          :disabled="currentPage == i"
          @click="pageChange('others', i)"
        >
          {{ i }}
        </button>
      </template>
      <button type="button" class="pageBtn" v-if="pointL"><Icon type="ios-more" /></button>
      <!-- <button type="button" :class="['pageBtn', currentPage == totalPage ? 'active' : '']"  @click="pageChange('last')" v-if="lastPage && totalPage > 1">{{totalPage}}</button> -->
      <button
        type="button"
        class="pageBtn"
        :disabled="totalPage <= 0 || totalPage <= currentPage"
        @click="pageChange('next')"
      >
        <Icon type="ios-arrow-forward" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagePicker',
  data () {
    return {
      pointN: false,
      pointL: false,
      currentPage: 1,
      firstPage: true
    }
  },
  props: {
    showTotal: {
      type: Boolean,
      default: true
    },
    total: {
      type: [String, Number],
      default: 0
    },
    current: {
      type: [String, Number],
      default: 1
    },
    pageSize: {
      type: [String, Number],
      default: 20
    }
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.pageSize)
    },
    pageArr: function () {
      var arr = []
      if (this.totalPage <= 9) {
        //页数小于9全部显示
        this.firstPage = true
        this.lastPage = true
        this.pointN = false
        this.pointL = false
        for (var i = 2; i <= this.totalPage; i++) {
          arr.push(i)
        }
        return arr
      } else {
        if (this.currentPage < 6) {
          //小于6页时
          this.firstPage = true
          this.pointL = true
          this.pointN = false
          this.lastPage = true
          for (var z = 2; z <= 7; z++) {
            arr.push(z)
          }
          return arr
        } else {
          //当前页大于6页
          if (this.currentPage + 2 <= this.totalPage) {
            //五条中显示前两页和后两页
            arr = [
              this.currentPage - 2,
              this.currentPage - 1,
              this.currentPage,
              this.currentPage + 1,
              this.currentPage + 2
            ]
            this.pointN = true
            if (this.currentPage < this.totalPage) {
              this.lastPage = true
            }
            return arr
          } else {
            this.pointN = true
            this.pointL = false
            arr = [
              this.totalPage - 5,
              this.totalPage - 4,
              this.totalPage - 3,
              this.totalPage - 2,
              this.totalPage - 1,
              this.totalPage
            ]
            return arr
          }
        }
      }
    }
  },
  watch: {
    current (newVal, oldVal) {
      this.initCtrl()
    }
  },
  methods: {
    initCtrl () {
      this.currentPage = this.current
    },
    pageChange (type, cur) {
      switch (type) {
        case 'first':
          this.currentPage = 1
          break
        case 'prev':
          if (this.currentPage > 1) {
            this.currentPage--
          }
          break
        case 'next':
          if (this.currentPage < this.totalPage) {
            this.currentPage++
          }
          break
        case 'last':
          this.currentPage = this.totalPage
          break
        case 'others':
          this.currentPage = cur
          break
        default:
          break
      }
      this.$emit('on-change', this.currentPage)
    }
  },
  mounted () {
    this.initCtrl()
  }
}
</script>

<style scoped>
#pagePicker {
  width: 100%;
}
#pagePicker .pickerWrap .pickerWrap {
  font-size: 0;
}
#pagePicker .pickerWrap span {
  font-size: 14px;
  line-height: 32px;
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  /* letter-spacing: 2px; */
}
#pagePicker .pickerWrap .pageBtn {
  min-width: 32px;
  height: 32px;
  font-size: 14px;
  line-height: 30px;
  color: #333333;
  border-radius: 5px;
  display: inline-block;
  border: none;
  vertical-align: middle;
  outline: none;
  background-color: #ffffff;
  margin-left: 8px;
  cursor: pointer;
  border: 1px solid #dddee1;
  border-radius: 4px;
  transition: border 0.2s ease-in-out, color 0.2s ease-in-out;
}
#pagePicker .pickerWrap .pageBtn[disabled='disabled'] {
  /*background-color: #eaeaea;*/
  color: #e3e3e3;
  cursor: not-allowed;
}
#pagePicker .pickerWrap .numBtn:hover {
  border-color: #1e84f3;
  color: #1e84f3;
}
#pagePicker .pickerWrap .pageBtn.active {
  border-color: #1e84f3;
  color: #1e84f3;
}
</style>
