<template>
  <div class="navbox">
    <div class="left" ><b>VueAdmin后台管理系统</b></div>
    <div class="right">
      <a-avatar :src="$store.getters.userInfo.avatar"/>
      <span class="dropdown">
        <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          {{ $store.getters.userInfo.username }}
          <DownOutlined/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="$router.push('/')">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="showConfirm">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      </span>

    </div>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const showConfirm = () => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '您确定要退出登录吗？',
    onOk () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500)
      }).then(() => {
        store.commit('user/logout')
      })
    },

    onCancel () {
    }
  })
}
</script>
<style lang="scss" scoped>
.navbox {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;

}

.dropdown {
  margin: 0 10px;
}
</style>
