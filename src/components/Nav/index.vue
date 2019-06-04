
<template>
    <div :class="$style.nav">
        <a href="/index">
            <div :class="$style['nav-top']">
                <img src="../../statics/images/logo.png" />
            </div>
        </a>
        
        <Menu :theme="'dark'" @on-select="pathChange" :active-name="activeName" :open-names="openNames">
            <Submenu :name="index" :key="index" v-for="(item, index) in menuList">
                <template slot="title">
                    <Icon :type="item.ico" size="18" />
                    {{item.name}}
                </template>
                <MenuItem 
                    v-if="item.children" 
                    v-for="(menuItem, menuIndex) in item.children" 
                    :key="`${index}-${menuIndex}`"
                    :name="$route.params.id ? `/${$route.params.id}${menuItem.path}` : menuItem.path"
                >
                    {{menuItem.name}}
                </MenuItem>
            </Submenu>             
        </Menu>
    </div>
</template>

<script>

import { mainMenu } from './constants';

const MENU_LIST = {
    main: mainMenu
};

export default {
    name: 'Nav',
    data() {
        return {
            menuList: [],
            activeName: '',
            openNames: []
        };
    },

    props: [
        'type'
    ],

    methods: {
        pathChange(path) {
            this.$router.push(path);
        }
    },

    created() {
        this.menuList = mainMenu;  

        this.activeName = this.$route.path;
        this.menuList.forEach((item, index) => {
            if (item.children.length) {
                item.children.forEach(itemM => {
                    if (this.$route.path.indexOf(itemM.path) >= 0) {
                        this.openNames.push(index);
                    }
                });
            }
        });
    },

    mounted() {
        
    }
};
</script>


<style lang="stylus" module>
    .nav {
        width: 240px;
        height: 100%;   

        .nav-top {
            height: 60px;
            background: #fafafa;
            font-weight: bold;
            font-size: 22px;
            display: flex;
            align-items: center;

            img {
                width: auto;
                height: 45px;
                margin-right: 15px;
                margin-left: 25px;
            }

            .nav-white-word {
                color: #fff;
            }

            .nav-red-word {
                color: #ff4b4b;
            }
        }     

        :global(.ivu-menu-dark) {
            background: #001529;
        }

        :global(.ivu-menu-opened .ivu-menu) {
            background: #000c17;
            overflow: hidden;
        }

        :global(.ivu-menu-opened .ivu-menu) li {
            margin: 7px 0;
            height: 40px;
            line-height: 40px;
            padding: 0;
        }

        :global(.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title) {
            background: #001529;
        }
    }
</style>