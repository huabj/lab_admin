<template>
  <div class="toDoEventPage">
    <div class="title">
      <span class="span-l">待办事件</span>
<!--      <a href="javascript:void(0);" class="history">历史记录</a>-->
      <div class="clearfix"></div>
    </div>
    <div class="info-list" :style="{'height': ((screenHeight / 2) - 270) + 'px'}">
      <ul>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
        <li>
          <div class="info-list-l"></div>
          <div class="info-list-r">
            <h2 class="margin-b-10"><span class="blueCircle blue-bg"></span>2021年5月16日</h2>
            <p class="text-indent-2 margin-b-10">是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false是否将弹出框插入至body元素。在弹出框的定位出现问题时，可将该属性设置为false</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="surplus">
      <span>剩余10条消息</span>
    </div>
    <img src="../../../assets/img/rb.png" class="triangle">
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'toDoEvent',
    data () {
      return {
      };
    },
    computed: {
      ...mapState([
        'screenHeight'
      ])
    },
    created () {
    },
    methods: {
    }
  };
</script>
