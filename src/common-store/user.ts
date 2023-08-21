import { defineStore } from 'pinia'
import request from '@/utils/request'
import { UserInfo } from '@/types/api-types'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {
            email: '',
            name: '',
            roles: []
        } as UserInfo
    }),

    actions: {
        getCurrentUser() {
            // нужно кеширование
            request<UserInfo>('/api/me').then(({ data }) => {
                if (data) {
                    this.userInfo = data
                } else {
                    // error handling
                }
            })
        }
    }
})
