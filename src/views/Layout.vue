<template >
    <div class="layout">
        <va-navbar color="Info" id="navbar" class="navbar">
            <template #left>
                <va-navbar-item class="navbar-item-slot">
                    <va-icon name="menu" class="mr-5" @click="enabled = !enabled" />
                    <router-link to="/"> <span class="logo">MONEY VALUE</span></router-link>

                </va-navbar-item>
            </template>
            <template #right>
                <va-navbar-item class="navbar-item-slot">
                    <va-icon name="logout" color="danger" @click="logoutMethod" />
                </va-navbar-item>
            </template>

        </va-navbar>

        <va-sidebar id='sidebar' class="sidebar" color="Info" gradient v-model="enabled" width="18rem">

            <RouterLink to="/admin/devise">
                <va-sidebar-item :active="isActive('/admin/devise') || isActive('/admin')" active-color="backgroundBorder">
                    <va-sidebar-item-content>
                        <va-icon name="account_balance" />
                        <va-sidebar-item-title>
                            Devise
                        </va-sidebar-item-title>
                    </va-sidebar-item-content>
                </va-sidebar-item>
            </RouterLink>

            <RouterLink to="/admin/pairs">
                <va-sidebar-item :active="isActive('/admin/pairs')" active-color="backgroundBorder">
                    <va-sidebar-item-content>
                        <va-icon name="multiple_stop" />
                        <va-sidebar-item-title>
                            Pairs de devise
                        </va-sidebar-item-title>
                    </va-sidebar-item-content>
                </va-sidebar-item>
            </RouterLink>

            <RouterLink to="/admin/statistics">
                <va-sidebar-item :active="isActive('/admin/statistics')" active-color="backgroundBorder">
                    <va-sidebar-item-content>
                        <va-icon name="trending_up" />
                        <va-sidebar-item-title>
                            Statistique
                        </va-sidebar-item-title>
                    </va-sidebar-item-content>
                </va-sidebar-item>
            </RouterLink>

        </va-sidebar>
        <div style="flex:1; " class="va-bg--backgroundBorder main">
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

        async logoutMethod() {
            await logout.getResponse(localStorage.getItem('moneyValueEmail'))
            this.$router.push('/login')
            localStorage.clear()
        }
    },



}
</script>
<style >
.layout {  display: grid;
  grid-template-columns: 0fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "navbar navbar navbar"
    "sidebar main main";
    margin: 0;
    min-width: 100%;
}

.navbar {
  /* justify-self: stretch; */
  /* align-self: stretch; */
  grid-area: navbar;
  
}

.sidebar {
  justify-self: stretch;
  align-self: stretch;
  grid-area: sidebar;
}

.main {
  justify-self: stretch;
  align-self: stretch;
  grid-area: main;
  overflow-y: scroll;
  /* max-height: 90vh; */
  height: 92vh;
}

.main::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.main::-webkit-scrollbar-track {
  background: #f1f1f100;
}

/* Handle */
.main::-webkit-scrollbar-thumb {
  background: #158EE5;
border-radius: 20px;
}

/* Handle on hover */
.main::-webkit-scrollbar-thumb:hover {
  background: #0664a8;
}



#navbar {
    background-color: rgb(21, 141, 227);
    background-image: linear-gradient(to right, rgb(23, 202, 238), rgb(21, 142, 229) 20%);
}

.logo {
    color: white;
    font-size: larger;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>