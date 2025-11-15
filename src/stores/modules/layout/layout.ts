import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        isCollapse: false,
        isMobileMenuOpen: false
    }),
    actions: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen
        },
        closeMobileMenu() {
            this.isMobileMenuOpen = false
        }
    }
})
