# WEB 002 VUE-01 INKKAPLUM SH

## 前文

WEB 002 VUE-01

本教程相比上一个的 TS 教程成熟了很多, 优势在于

1. 有一个大的 md 文件作为课件, 这样的话就避免了写代码浪费太多时间和讲的时候出现之前思路比较混乱的问题。
2. 提高了录屏质量, 录屏卡顿现象有所减少, 看起来会更加直观舒服。
3. 本机的配置, 之前的大写提示被关掉了, 所以不会因为大写提示导致大写字母没有办法被正常、快速地打出来
4. 插件的变更, 这一次把彩虹屁插件关掉了
5. Code 的变更, 这一次背景换成了 YOASOBI 的背景, 对比度会更高, 更加适合观看。

所以这一个教程的质量将会有提升, 同时依然满足了速成的要求。

录制视频不仅是传递知识和解法, 也是对于 Up 自身的一个挑战和知识的再加强, 所以如果有任何不懂的地方, 尤其是视频没有讲清楚的地方, 欢迎私信问 Up 主, Up 主会尽力给出一个可用的解法。然后 TypeScript 部分也是如此, 有任何觉得讲的不到位的地方, 欢迎私信, 会给出可用的解决方法。

## Vue 3

## 首先, 我们会用一定时间了解一下 Vue3 的新内容和新特点, 帮助快速上手 Vue 3。

### 学习 Vue3 的重要性

一句话, Vue2 已经 EOL 了, 所以必须要学习 Vue3。

### 变更内容

具体变更内容: 组合式 API,新钩子`setup()`, 用`reactive`和`ref`函数声明响应式变量。

剩余如`watch`监听器, `computed`计算属性写法都会有变化, 但是作用不变。

生命周期钩子也有一定的变化, 主要还是写法的变化。且有因为在大部分时候不需要用到`this`关键字, 所以模板引用也会有变化。

接下来就是组件间的传值语法也有一定变化。

而`template`和`style`则没有太多变化, 不需要记忆太多。

配套的工程化工具亦进行了更新
如 Pinia。因此我们不会涉及到 Vuex, 反之, 会讨论 Pinia。
Pinia 作为一个状态管理工具, 更加高效精简, 更加易于维护。

此外, Vue2 是 Webpack 给项目进行一个打包, 而 Vue3 则会用 Vite。

- Vue2 的 Vue-cli, 使用 vue-cli 时, 可以通过简单的命令（如 vue create project-name）来创建一个新的 Vue 项目。
  Vue-cli 内部集成了 webpack, 并且已经配置好了基本的 webpack 打包规则。这意味着当你使用 vue-cli 创建一个新的 Vue 项目时,你实际上也在使用 webpack 来构建和打包你的项目。
  而 Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。 总之速度就是有一个很大的提高。

## 底层逻辑

底层 API 变化: Vue2 响应式实现依赖于`object.defineProperty()`。但是有相当的效率问题。例子:

```ts
data(){
    return{
        name: 'Inkka',
        age: 17
    }
}
```

时代局限: Vue2 创造时只有这一个方法可以劫持数据。

但是在 ES6 后 JS 新增了一个方法 Proxy(), 所以提高了性能。

语言支持: Vue2 底层源码使用 JavaScript 编写, 而 Vue3 则使用 TypeScript 编写, 理所应当地, Vue 3 增强了对于 TS 的支持。

Diff 算法: Vue3 的 diff 算法和 vue2 不一样的, 参考专门的专栏。

打包后更小的体积: 更好的 TreeShaking。

### 选项式 API 和组合式 API

选项式 API

```vue
<script>
data(){
    created(){

    }
    methods:{
        async method123(){
            ...
        }
    }
}
</script>
```

先装一个插件, Vue VSCode Snippets, 这个插件将大大提高我们写代码的效率。

我们开始创建一个项目

vue2 命令

```bash
vue create ...
```

vue3 命令

```bash
npm init vue@latest
```

选项

```bash
Ok to proceed
Add TypeScript >> No
Add JSX Support >> No
Add Vue Router... >> No
Add Pinia... >> No
Add Vitest... >> No
Add Testing Solution... >> No
Add DevTools.. >> No
```

打开`Package.json`, 命令是`npm run dev`。

然后我们`npm i`一下, 因为这个文件并没有 node_modules。

简单地看一看文件架构, 看看有什么变化?

Vue 2

```js
import Vue from 'vue'
new Vue({
    render: h => h(App)
}).$mount('#app')

//Or
new Vue({
    el: '#app'
    render: h => h(App)
})
```

Vue 3

```js
import { createApp } from "vue";
createApp(App).mount("#app");
```

Vue 3 的代码布局:

```vue
<template>
  <header></header>
  <main></main>
</template>
<script></script>
<style></style>
```

### 体验组合式 API

首先我们用选项式 API 写一个计数器, 然后用组合式 API 再写一下。

```vue
<script></script>
<template>
  <div class="box">
    <button class="my-button" @click="addCount">result {{ count }}</button>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.my-button {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  background-color: #4caf50;
  color: white;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #388e3c;
  }
}
</style>
```

优势: 所有业务逻辑都写在一个地方, 不用在`data`,`method`内找了, 逻辑集中带来了极好的提升。

当然, `beforeCreate()`依然可以写在 Vue 3 内, 我们顺便看看`setup`的时机。

体验 Setup 语法糖

```vue
<script setup>
import { ref } from "vue";
const count = ref(0);
const printCount = () => {
  count.value++;
};
</script>
```

computed 语法变化

```js
computed:{
    testExample(){
        return this.example * 114514
    }
}
```

新语法:

```js
const homoCount = computed(() => {
  return objCount.value.count * 114514;
});
```

监视数据- Watch

```js
watch(objCount, (newVal, oldVal) => {
  console.log(`值从${oldVal}变成了${newVal}`);
});
```

监听多个内容

```js
const objCount = ref(0);
const age = ref(114);

watch(
  [objCount, age],
  (newVal, oldVal) => {
    console.log(`值从${oldVal}变成了${newVal}`);
  },
  { immediate: true }
);
```

深度监听

```js
import { ref, watch } from "vue";
const objCount = ref({
  count: 0,
});

watch(
  objCount,
  (newVal, oldVal) => {
    console.log(oldVal);
    console.log(newVal);
  },
  { deep: true }
);
```

用深度克隆解决问题(供参考)

```js
import { ref, watch } from "vue";
const objCount = ref({
  count: 0,
});

let oldState = JSON.parse(JSON.stringify(objCount.value));

watch(
  objCount,
  (newVal) => {
    console.log(oldState);
    console.log(newVal);
    oldState = JSON.parse(JSON.stringify(newVal));
  },
  { deep: true }
);
```

### 很多钩子

`beforeMount = > onBeforeMount`, `mounted => onMounted`, `beforeUpdate => onBeforeUpdate`,
`updated => onUpdated`, `beforeDestroy => onBeforeUnmount`, `destroyed => onUnmounted`

体验语法

```vue
<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated } from "vue";

const count = ref(0);

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});
onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
onUpdated(() => {
  console.log("onUpdated");
});
</script>
```

注意一点, 这个视频中未提及到:

生命周期钩子可以执行多次, 按照顺序执行。

```js
<scirpt setup>
import { onMounted } from 'vue'
  onMounted(()=>{
  })
  onMounted(()=>{
  })
</script>
```

利点: 如果一个钩子内逻辑很复杂, 改起来很烦, 可以写一个新的。

### 组件通信

子组件例子:

```vue
<template>
  <div class="component01">component01</div>
</template>

<script setup></script>

<style scoped>
.component01 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  color: rgb(0, 191, 255);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}
</style>
```

vue2 写法

```js
$emit('example','content')

//父组件
@example="Method"

//script
const Method = (val) =>{
  console.log(val)
}
```

案例代码(子组件内)

```html
 <button @click="sendMsg">SendMsg</button>
```

成品代码(父组件给子组件传值)

父组件

```vue
<script setup>
import ComponentsTest01 from "./components/ComponentsTest01.vue";
import { ref } from "vue";
const msg = ref("父组件的数据");
</script>

<template>
  <div class="box">
    <h2>父组件</h2>
    <ComponentsTest01 :msg="msg"></ComponentsTest01>
  </div>
</template>
```

子组件

```vue
<template>
  <div class="component01">
    子组件
    <p>接受的内容:{{ msg }}</p>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>
```

成品代码(子组件给父组件传值)

父组件:

```vue
<script setup>
import ComponentsTest01 from "./components/ComponentsTest01.vue";

const getMsg = (val) => {
  console.log(val);
};
</script>

<template>
  <div class="box">
    <h2>父组件</h2>
    <ComponentsTest01 @send-msg="getMsg"></ComponentsTest01>
  </div>
</template>
```

子组件:

```vue
<template>
  <div class="component01">
    子组件
    <p>接受的内容:{{ msg }}</p>
    <p>传值!</p>
    <button @click="sendMsg">SendMsg</button>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["send-Msg"]);
const sendMsg = () => {
  emit("send-Msg", "新消息!");
};
</script>
```

ref 的写法

父组件

```vue
<script setup>
import {ref} from 'vue'
import ComponentsTest01 from './components/ComponentsTest01.vue';

const test = ref(null)

const getSonMethod = () =>{
  console.log(test.value.newMsg)
  test.value.logMsg()
}

</script>

<template>
  <div class="box">
    <h2>父组件</h2>
    <ComponentsTest01 ref="test"></ComponentsTest01>
    <button @click="getSonMethod">检查打印结果</button>
  </div>
</template>

<style scoped>
</style>
```

子组件

```js
<template>
  <div class="component01">
    子组件
    <p>接受的内容:{{ msg }}</p>
    <p>传值!</p>
    <button @click="sendMsg">SendMsg</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  
  msg: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["send-Msg"]);
const sendMsg = () => {
  emit("send-Msg", "新消息!");
};

const newMsg = ref("Sehr Gut!");

const logMsg = () => {
  console.log(newMsg.value);
};

defineExpose({
  newMsg,
  logMsg,
});
</script>
```

注: 模板引用

通过ref标识获得真实的dom对象或者组件的实例对象。

案例: 实现聚焦
模板代码

```vue
<template>
  <input ref="autoFocusInput" v-model="inputValue" placeholder="请输入内容" />
</template>
```

`Provide`和`inject`实现组件之间传值

App.vue

```vue
<script setup></script>

<template>
  <div class="box">
    <h2>祖先组件</h2>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}
</style>
```

ComponentsTest02.vue [孙组件]

```vue
<script setup></script>
<template>
  <div class="son">
    <h2>孙子组件</h2>
  </div>
</template>

<style scoped>
.son {
  padding: 51px;
  border: 1px solid pink;
}
</style>
```

ComponentsTest03.vue [父组件]

```vue
<script setup>
</script>

<template>
  <div class="father">
    <h2>父组件</h2>
  </div>
</template>

<style scoped>
.father {
  padding: 114px;
  border: 1px solid greenyellow;
}
</style>
```

## 和 TS 结合开发

### 为什么要用 TS?

静态类型检查可以提前第发现代码错误, 加了类型只要不符合规范就会报错, 提前地发现错误。

我们用新的命令去创建 TS 项目。

```bash
npm create vite@latest 项目名 -- --template vanilla-ts
```

用最新的 vite 版本来创建一个以原生 TypeScript 为模板的项目。

我们简单地审视文件, 可以看到依然没有 node modules, 所以我们需要自己装一下

```bash
npm i
```

清空对应文件, 写一些测试代码

```ts
let test03: number = 114514;
console.log(test03);
```

让每个文件都是一个单独的模块

```ts
export {};
```

体验 TS 接口, 接口如何处理对象多个层级的情况。
例子:

```ts
const uta = {
  id: 1,
  producer: "harumakigohan",
  info: {
    title: "メルティランドナイトメア",
    lyrics: "Welcome to the MeltyLand",
  },
};
```

请用接口帮助完成类型的注解。

用断言帮助智能提示:

```ts
const TestId = document.getElementById("#test") as HTMLImageElement;
```

## 正式上手 Vue+ts 开发

```bash
npm create vite@latest 项目名 -- --template vue-ts
```

创建一个以 vue-ts 为模板的项目

接下来会让你 select 一个框架, 选择 vue 即可, 后面 variant 依然选 TypeScript。

### 给 ref 添加类型标记。

```ts
const year = ref<string | number>(1145)
```

### ref, reactive, computed 综合代码

computed 不用手动添加类型, 会自动地推到出来。

处理复杂类型

```js
[
  { id: "001", name: "USD", rate: 1 },
  { id: "002", name: "RUB", rate: 90 },
  { id: "003", name: "KZT", rate: 440 },
  { id: "004", name: "SGD", rate: 1.3 },
];
```

请筛选出大于 60 的。

```ts
const newList = computed(() => {
  return Currency.filter((el) => el.rate > 60);
});
```

触发事件时的类型

需求: 请输入文本同时在控制台输出输入的内容。

```vue
<input type="text" placeholder="文本测试" @change="inputChange">
```

需求: 当点击按钮时, 请输出按钮对应的内容=> `按钮内容`

```vue
<button @click="Click">按钮内容</button>
```

### 模板引用类型

还是经典案例, 我们实现聚焦工作。
下文是原来的版本:

```vue
<template>
  <input ref="autoFocusInput" v-model="inputValue" placeholder="请输入内容" />
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const inputValue = ref("");

const autoFocusInput = ref(null);

onMounted(async () => {
  await nextTick();

  if (autoFocusInput.value) {
    autoFocusInput.value.focus();
  }
});
</script>
```

案例代码:

父组件

```vue
<template>
  <div>
    <ComponentsTest01></ComponentsTest01>
  </div>
</template>

<script setup lang="ts">
import ComponentsTest01 from "./components/ComponentsTest01.vue";
</script>
```

子组件

```vue
<template>
  <div>
    <p>Message: {{ message }}</p>
    <button @click="logMessage">Log It</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const message = ref("Hello from LogMsg");
const logMessage = () => {
  console.log(message.value);
};
</script>
```

父组件

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <ComponentsTest01 ref="logMsgRef"> </ComponentsTest01>
    <button @click="callLogMessage">Call Log Message from Parent</button>
  </div>
</template>

<script lang="ts" setup>
</script>
```

提示: 空值处理(`null`), 一般地, 我们有很多处理方法, 一种就是用`?`可选链运算符,
还有就是用 if 语句, 如上文例子, 也就是逻辑判断

```ts
if (logMsgRef.value) {
  logMsgRef.value.logMessage();
}
```

当然, 也可以用非空断言运算符, 加一个`!`即可, 但是不建议。

### 传值写法

继续基于原来的代码

提示:
好处: 报错提前, 有智能提示

```js
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
```

```ts
type Props = {
  ...
}
```

添加默认值

用`withDefaults`即可。

withDefaults(第一个参数: defineProps 内容, 第二个参数: 默认值配置项)

```ts
const props = withDefaults(defineProps<Currency>(), {
  value: "200",
});
```

子传父例

提示:
好处: 报错提前, 有智能提示

```ts
type Emits = {
  (e: "msg", msg: string): void;
};
const Emit = defineEmits<Emits>();
const handleClick = () => {
  Emit("msg", "testVal");
};
```

## 解决问题: 第三方包想要有类型约束怎么办?

```bash
npm i --save-dev @types/jquery
```

自己写类型文件

```ts
export type Currency = {
  name: string;
};
```

## Pinia

新变化: 更加符合直觉, 去掉了 mutation。提供组合式风格 API, 去掉了 Modules 的概念, 自动地分配模块。对于 TypeScript 更加友好

```bash
npm install pinia
```

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

vuex 定义仓库

```js
const store = createStore({
  //...
});
```

pinia

```js
import { defineStore } from "pinia";
defineStore("counter", () => {});
```

```ts
import { defineStore } from "pinia";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore("alerts", {
  // 其他配置...
});
```

state 被定义为一个返回初始状态的函数

`actions => methods`

`getters` => `computed`函数模拟

```ts
const doubleCount = computed(() => {
  return count.value * 2;
});
```

## 附录

### 莫名其妙的报错

莫名其妙的报错指编辑器总是说找不到文件/对应的类型声明, 这个时候修改 tsconfig 就很重要了。然后重新启动(`npm run dev`)直接用下面的即可, 假如依然不行, 私信联系 UP 主即可, 因为还有几个对策, 但是没有写出来。

vue 文件的类型声明 shims-vue.d.ts

```ts
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

接下来我们将做一个简单的项目, 来强化知识点。

项目实战我们因为时间关系, 所以做一个简单的小程序, 就是查汇率, 查看新闻的一个简单程序
这个项目其实是不够过关的, 所以建议之后学习如聊天 app, 还有传统的如人资后台, 外卖软件等等。
那么在 Up 主以后有需要做这样的项目时, Up主也会录出来 有可能是一个论坛+博客网站 但是后端肯定是基于 go 的。
