import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        profile: null as null | { id: number; name: string }
    }),
    getters: {
        isLoggedIn: (state) => !!state.token
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setProfile(profile: { id: number; name: string }) {
            this.profile = profile
        },
        logout() {
            this.token = ''
            this.profile = null
        }
    }
})
