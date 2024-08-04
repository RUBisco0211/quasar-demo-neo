<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-x-md justify-center">
      <div class="col-12">
        <q-card flat style="height: calc(100vh - 63px - 2 * 16px)">
          <q-splitter v-model="ref(30).value" :limits="[20, 50]">
            <template v-slot:before>
              <q-card-section>
                <q-toolbar class="q-mx-none q-px-none">
                  <q-input
                    rounded
                    outlined
                    placeholder="搜索历史对话..."
                    dense
                    v-model="searchText"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-magnify" size="xs"></q-icon>
                    </template>
                  </q-input>
                  <q-space></q-space>
                  <q-btn-group flat>
                    <q-btn flat dense round icon="mdi-reload"></q-btn>
                    <q-btn flat dense round icon="mdi-plus"></q-btn>
                    <q-btn
                      flat
                      dense
                      round
                      icon="mdi-notification-clear-all"
                    ></q-btn>
                  </q-btn-group>
                </q-toolbar>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section class="q-pa-none">
                <q-scroll-area
                  style="height: calc(100vh - 63px - 2 * 16px - 82px)"
                >
                  <q-list>
                    <q-item-label class="q-mx-sm" header>历史对话</q-item-label>
                    <q-item
                      class="q-mx-sm q-my-xs dense-menu-item"
                      v-for="session in chatSessions"
                      :key="session.id"
                      clickable
                      :active="currentSession.sessionId === session.sessionId"
                      @click="setCurrentSession(session)"
                      v-ripple
                      :active-class="
                        $q.dark.isActive
                          ? 'bg-primary text-white'
                          : 'bg-grey-4 text-dark'
                      "
                    >
                      <q-item-section avatar>
                        <q-avatar size="xl">
                          <q-img
                            :src="getUserInfo(session.receiverId!).avatar"
                          ></q-img>
                          <q-badge
                            color="positive"
                            floating
                            rounded
                            label="new"
                          ></q-badge>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-bolder">{{
                          getUserInfo(session.userId).name
                        }}</q-item-label>
                        <q-item-label lines="2" class="ellipsis">
                          {{ session.caption }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-btn-group flat>
                          <q-btn
                            dense
                            flat
                            :icon="
                              session.star ? 'mdi-star' : 'mdi-star-outline'
                            "
                            @click.stop.prevent="switchStar(session.senderId!)"
                          ></q-btn>
                          <q-btn
                            dense
                            flat
                            icon="mdi-share-variant-outline"
                          ></q-btn>
                          <q-btn
                            dense
                            flat
                            icon="mdi-trash-can-outline"
                            @click.stop.prevent="
                              deleteSession(session.sessionId!)
                            "
                          ></q-btn>
                        </q-btn-group>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-scroll-area>
              </q-card-section>
            </template>
            <template v-slot:after>
              <q-card-section>
                <q-toolbar>
                  <q-avatar size="xl">
                    <q-img
                      :src="getUserInfo(currentSession.receiverId!).avatar"
                    ></q-img>
                  </q-avatar>
                  <q-toolbar-title class="text-weight-bolder">{{
                    getUserInfo(userId).name
                  }}</q-toolbar-title>
                  <q-space></q-space>
                  <q-btn
                    flat
                    round
                    color="warning"
                    :icon="
                      currentSession.star ? 'mdi-star' : 'mdi-star-outline'
                    "
                  ></q-btn>
                  <q-btn flat round icon="mdi-reload"></q-btn>
                </q-toolbar>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section class="q-pa-none">
                <q-scroll-area
                  style="height: calc(100vh - 63px - 2 * 16px - 72px - 82px)"
                  ref="chatAreaRef"
                >
                  <q-list class="q-pa-lg">
                    <q-chat-message
                      v-for="msg in getSessionMessages(currentSession.sessionId!)"
                      :key="msg.id"
                      :text="[msg.content]"
                      :stamp="msg.sendTime"
                      :sent="msg.senderId === userId"
                      :avatar="getUserInfo(msg.senderId).avatar"
                      :name="getUserInfo(msg.senderId).name"
                    ></q-chat-message>
                  </q-list>
                </q-scroll-area>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section>
                <q-input
                  placeholder="输入内容..."
                  dense
                  rounded
                  outlined
                  v-model="currentMsgContent"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      round
                      :disable="
                        !currentMsgContent || currentMsgContent.length === 0
                      "
                      color="primary"
                      icon="mdi-arrow-up"
                    ></q-btn>
                  </template>
                </q-input>
              </q-card-section>
            </template>
          </q-splitter>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, VNodeRef } from 'vue';
const searchText = ref('');
import useUserStore from 'src/stores/user';
import { ChatSession, User } from 'src/models/service';

const chatAreaRef = ref<VNodeRef | null>(null);
const { getUserId } = useUserStore();
const userId = getUserId();
const gptId = 2;
const getUserInfo = computed(() => (id: number) => {
  const userInfo: User = {
    userId: id,
    avatar:
      'https://p3.itc.cn/images01/20230223/2fb863c6b58d445b826c03a4295044f4.jpeg',
    name: 'GPT',
  };
  return userInfo;
});

const getSessionMessages = (id: number) => {
  const lst = [];
  for (let i = 0; i < id + 10; i++) {
    lst.push({
      id: i + 1,
      senderId: i % 2 === 0 ? userId : gptId,
      receiverId: i % 2 === 1 ? userId : gptId,
      sendTime: '2022-01-01 00:00:00',
      content: 'hello',
    });
  }
  return lst;
};

const chatSessions = ref<ChatSession[]>([
  {
    sessionId: 1,
    senderId: userId,
    receiverId: gptId,
    messages: [],
    caption: 'hello',
    star: true,
  },
  {
    sessionId: 2,
    senderId: userId,
    receiverId: gptId,
    messages: [],
    caption: 'hello',
    star: false,
  },
  {
    sessionId: 3,
    senderId: userId,
    receiverId: gptId,
    messages: [],
    caption: 'hello',
    star: false,
  },
]);

const switchStar = (id: number) => {
  console.log('switch_star', id);
};

const deleteSession = (id: number) => {
  console.log('delete_session', id);
};

const setCurrentSession = (session: ChatSession) => {
  if (currentSession.value !== session) {
    currentSession.value = session;
  }
};

const currentSession = ref<ChatSession>(chatSessions.value[0]);

const currentMsgContent = ref('');
</script>
