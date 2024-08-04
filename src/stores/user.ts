import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import type { User } from 'src/models/service';
import { request } from 'src/api/requests';
import { useRouter } from 'vue-router';

export default defineStore('user', () => {
    const router = useRouter();
    const login = (user: User) => {
        console.log('login', user);
    };

    const signup = (user: User) => {
        console.log('signup', user);
    };

    const logout = () => {
        _clearUser();
        router.push('/login');
    };

    // const getUserId: () => number = () => {
    //   return (LocalStorage.getItem('user')! as User).userId as number;
    // };

    const _clearUser = () => {
        LocalStorage.remove('user');
    };
});
