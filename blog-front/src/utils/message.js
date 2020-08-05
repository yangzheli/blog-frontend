import Vue from 'vue'
import Message from '@/components/Message.vue'

//构造一个Vue组件实例
const VueMessage = Vue.extend(Message)

function msg({text, type, duration = 2000}) {
  const vm = new VueMessage({
    el: document.createElement('div'),
    data() {
      return {
        show: true, // 是否显示
        type: type, // 类型,
        text: text, // 文本内容
      };
    }
  })
  // 添加节点
  document.body.appendChild(vm.$el);  //把生成的提示的dom插入body中
  // 过渡时间
  setTimeout(() => {
    vm.show = false;  //隐藏提示组件
  }, duration);
}

//全局注册
function reg() {
  //挂载到Vue原型上
  Vue.prototype.$message = msg;
}
export default reg
