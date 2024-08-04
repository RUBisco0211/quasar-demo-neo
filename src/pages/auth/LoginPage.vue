<template>
    <div
        class="full-screen"
        :class="$q.dark.isActive ? ['bg-dark-page'] : ['bg-grey-2']"
    >
        <q-toolbar class="fixed-top" style="z-index: 1">
            <q-item style="width: 230px" class="q-pl-xs dense-menu-item">
                <q-item-section side>
                    <q-avatar class="shadow-7">
                        <q-img src="icons/favicon-128x128.png"></q-img>
                    </q-avatar>
                </q-item-section>
                <q-item-section class="text-h6">
                    <q-item-label class="text-weight-bolder text-italic"
                        >Quasar Demo</q-item-label
                    >
                </q-item-section>
            </q-item>
            <q-space></q-space>
            <q-btn
                flat
                :color="$q.dark.isActive ? 'primary' : 'secondary'"
                round
                :icon="
                    $q.dark.isActive ? 'mdi-brightness-4' : 'mdi-brightness-5'
                "
                @click="switchDarkMode"
            >
                <q-tooltip anchor="center left" self="center end"
                    >切换夜间模式</q-tooltip
                >
            </q-btn>
        </q-toolbar>
        <div class="row">
            <div class="col-8">
                <div class="flex flex-center relative-position full-height">
                    <img
                        src="illustrations/undraw_sign_in_re_o58h.svg"
                        style="width: 600px"
                    />
                </div>
            </div>
            <div class="col-4">
                <q-card
                    style="height: 100vh"
                    flat
                    :class="
                        $q.dark.isActive
                            ? ['bg-dark', 'text-white']
                            : ['bg-white', 'text-dark']
                    "
                    class="q-pa-lg"
                >
                    <q-form
                        v-model="loginInfo"
                        @submit.prevent="onLogin"
                        style="width: 65%"
                        class="absolute-center"
                    >
                        <q-card-section>
                            <q-toolbar class="text-h5">
                                登录
                                <q-space />
                            </q-toolbar>
                        </q-card-section>
                        <q-card-section class="q-pb-none">
                            <q-input
                                v-for="input in formInputs"
                                :key="input.name"
                                class="q-my-sm"
                                v-model="loginInfo[input.name]"
                                :type="input.type"
                                :rules="input.rules"
                                :label="input.label"
                                outlined
                                label-slot
                                clearable
                                lazy-rules="ondemand"
                                clear-icon="mdi-close"
                            >
                                <template #prepend>
                                    <q-icon
                                        :name="input.icon"
                                        size="20px"
                                    ></q-icon>
                                </template>
                                <template #append>
                                    <q-icon
                                        v-if="input.isPassword"
                                        :name="
                                            input.type === 'password'
                                                ? 'mdi-eye-off-outline'
                                                : 'mdi-eye-outline'
                                        "
                                        class="cursor-pointer"
                                        size="20px"
                                        @click="
                                            input.type =
                                                input.type === 'password'
                                                    ? 'text'
                                                    : 'password'
                                        "
                                    />
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                            <q-btn
                                type="submit"
                                class="q-py-sm full-width"
                                label="登录"
                                push
                                color="primary"
                                unelevated
                            ></q-btn>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn flat dense color="primary">忘记密码</q-btn>
                        </q-card-actions>
                        <q-card-actions>
                            <q-btn flat dense color="primary" to="/signup">
                                没有账号? 去注册
                            </q-btn>
                        </q-card-actions>
                    </q-form>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { StringIndexedObject } from 'src/models/common';
import type { InputProps } from 'src/models/props';
import { QInput } from 'quasar';
import { useRouter } from 'vue-router';
import useDarkStore from 'stores/dark';
const { switchDarkMode } = useDarkStore();
const router = useRouter();

const loginInfo = ref<StringIndexedObject>({
    username: '',
    password: '',
});

const onLogin = () => {
    console.log(loginInfo.value);
    router.push('/');
};

const formInputs = ref<InputProps[]>([
    {
        formItemType: 'input',
        name: 'username',
        type: 'text',
        label: '用户名 *',
        icon: 'mdi-account-outline',
        rules: [(val: string) => (!!val && val.length > 0) || '请输入用户名'],
    },
    {
        formItemType: 'input',
        name: 'password',
        type: 'password',
        label: '密码 *',
        icon: 'mdi-key-outline',
        isPassword: true,
        rules: [(val: string) => (!!val && val.length > 0) || '请输入密码'],
    },
]);
</script>
