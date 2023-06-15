<template >
    <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    <va-navbar color="primary" gradient height="5vh">
        <template #left>
            <va-navbar-item class="navbar-item-slot">
                <va-icon name="menu" class="mr-5" @click="enabled = !enabled" />
                <span>MONEY VALUE</span>
            </va-navbar-item>
        </template>
        <template #right>
            <va-navbar-item class="navbar-item-slot">
                <va-icon name="logout" color="danger" @click="logoutMethod"/>
            </va-navbar-item>
        </template>

    </va-navbar>

    <div class="row d-flex " style=" height: 91vh;">

        <va-sidebar color="primary" v-model="enabled"  minimized-width="64px" width="18rem"
        style=" height: 100%;">

            <RouterLink to="/" >
            <va-sidebar-item :active="isActive('/')" active-color="warning">
                <va-sidebar-item-content>
                    <va-icon name="currency_exchange" />
                    <va-sidebar-item-title>
                        Conversion
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
        </RouterLink>

        <RouterLink to="/devise" >
            <va-sidebar-item :active="isActive('/devise')" active-color="warning">
                <va-sidebar-item-content>
                    <va-icon name="account_balance" />
                    <va-sidebar-item-title>
                        Devise
                    </va-sidebar-item-title>
                </va-sidebar-item-content>
            </va-sidebar-item>
        </RouterLink>
        </va-sidebar>
        <div style="flex:1" class="va-bg--backgroundBorder">
            <RouterView />
        </div>
        
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { logout } from '../service/Route';



export default {
    components: { RouterLink },
    data() {
        return {
            enabled: true,

        }
    },
    
    methods: {
        isActive(link) {
            return link == window.location.pathname
        },

        async logoutMethod(){
            
            await logout.getResponse(localStorage.getItem('moneyValueEmail'))
            localStorage.clear()
            this.$router.push('/login')
        }
    },

    

}
</script>
<style ></style>