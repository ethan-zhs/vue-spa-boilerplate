<template>
    <div :class="$style.layout">
        <div v-if="showLogin" :class="$style.content">
            <div :class="$style['form-box']">
                <h1>XXXX平台</h1>
                <Form :model="formFields" :rules="ruleValidate" :class="$style.form" ref="loginForm">
                    <FormItem prop="username">
                        <Input v-model="formFields.username" placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="formFields.password" type="password" placeholder="请输入密码" />
                    </FormItem>
                    <FormItem prop="title">
                        <Button @click="handleSubmit('loginForm')" style="width: 100%;" type="success">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>        
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('LoginPage');

export default {
    name: 'screen',    
    data: function () {
        return {
            showLogin: false,
            formFields: {
                username: '',
                password: ''
            }            
        };
    },

    computed: {
        ...mapGetters({
            requesting: 'requesting',
            ruleValidate: 'ruleValidate'
        })
    },

    methods: {
        ...mapActions({
            
        }),

        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submitForm();
                } else {
                    this.$Message.warning('请完善登录信息');
                }
            });
        },

        submitForm() {
            if (this.formFields.username == 'Admin' && this.formFields.password == '123456') {
                localStorage.setItem('userId', this.formFields.username);
                this.$router.push('/index');
            } else {
                this.$Message.error('用户名或密码错误');
            }
        }
    },

    created() {
        if (localStorage.getItem('userId')) {
            this.$router.push('/index');
        } else {
            this.showLogin = true;
        }
    },
    

    mounted() {
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            const keyNum = window.event ? e.keyCode : e.which;

            if (keyNum == 13) {
                this.handleSubmit('loginForm');
            }
        });
    }
};
</script>

<style lang="stylus" module>
    .layout {
        height: 100%;
        width: 100%;
        
        .content {
            background: #001529;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .form-box {
                width: 400px;
                height: 300px; 
                border: 1px solid #e8e8e8;
                border-radius: 4px;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                h1 {
                    font-size: 22px;
                    margin-bottom: 20px;
                }

                .form {
                    width: 75%;
                }
            }
        }        
    }
</style>
