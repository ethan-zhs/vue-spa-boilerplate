
<template>
    <div id="header" :class="$style.header">
        <Icon type="md-reorder" size="28" />
        <div :class="$style.userinfo">
            <span :class="$style.username">管理员</span> 
            <div :class="$style.logout" @click="logout">
                <Icon type="ios-log-out" size="18" />  
                <span>注销</span>       
            </div>            
        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        logout() {
            localStorage.removeItem('userId');
            this.$router.push('/login');
        }
    }
};
</script>


<style lang="stylus" module>
    .header {
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        color: #7a7a7a;

        .userinfo {
            display: flex;
            align-items: center;

            .username {
                margin-left: 20px;
                margin-right: 20px;
            }

            .logout {
                color: #555;
                cursor: pointer;
                display: flex;
                align-items: center;

                i {
                    position: relative;
                    top: 1px;
                }

                span {
                    margin-left: 5px;
                }
            }
        }
    }
</style>