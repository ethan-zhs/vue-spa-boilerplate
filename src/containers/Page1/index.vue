<template>
    <div :class="$style.container">
        <div :class="$style.content">

            <div :class="$style.search">
                <Form :label-width="40" :inline="true">
                    <FormItem label="应用">
                        <Input v-model="searchFrom.remark" placeholder="请输入应用关键字" :class="$style.searchinput" />
                    </FormItem>
                    <Button type="success" @click="search">搜索</Button>
                </Form>
            </div>

            <div :class="$style['table-header']">
                <span><Icon type="md-list" /> 应用数据列表</span>
                <Button @click="showModal('add')" type="success">添加配置</Button>                         
            </div>

            <ul :class="$style['branch-list']">
                <li v-for="item in branchConfigList" :class="$style['branch-item']">
                    <div :class="$style['branch-item-top']">
                        <div>
                            {{item.remark}} ({{item.branchName}}) {{item.smsSignature}}
                        </div>
                        <div>
                            <Button size="small" @click="showModal('edit', item)">编辑</Button>
                            <Button size="small" @click="confirm(item.pk)">删除</Button>
                        </div>
                    </div>
                    <div :class="$style['branch-item-bottom']">
                        <div :class="$style['branch-item-switch']">
                            <span>用户积分：{{item.enableUserPoint == 1 ? '开' : '关'}}</span>
                            <span>天气：{{item.showWeather == 1 ? '开' : '关'}}</span>
                        </div>
                    </div>                    
                </li>
                <Spin fix v-if="requesting"></Spin>
            </ul>

            <Page 
                :total="totalCount" 
                :page-size="pageSize" 
                :current="currPage" 
                :class-name="$style.page" 
                @on-change="changePage"
            />     
        </div>

        <Modal
            width="800px"
            v-model="visible"
            title="应用配置"
            @on-cancel="cancel"
        >
            <Form :model="config" :rules="ruleValidate" :label-width="110" :class="$style['modal-form']" ref="configForm">
                <FormItem label="应用名" prop="remark">
                    <Input v-model="config.remark" placeholder="请输入应用名" />
                </FormItem>
                <FormItem label="邮件前缀" prop="emailPrefix">
                    <Input v-model="config.emailPrefix" placeholder="请输入邮件前缀" />
                </FormItem>
                <FormItem label="用户积分" prop="enableUserPoint">
                    <Select v-model="config.enableUserPoint" style="width:200px">
                        <Option :value="'0'" :key="'0'">关</Option>
                        <Option :value="'1'" :key="'1'">开</Option>
                    </Select>
                </FormItem>
                <FormItem label="天气" prop="showWeather">
                    <Select v-model="config.showWeather" style="width:200px">
                        <Option :value="'0'" :key="'0'">关</Option>
                        <Option :value="'1'" :key="'1'">开</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button @click="ok" type="info">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import TableCom from '../../components/TableCom/index.vue';
import Store from './store';

const { mapGetters, mapActions } = createNamespacedHelpers('Page1');

export default {
    name: 'page1',  
    components: {
        TableCom
    },
    data: function () {
        return {
            visible: false,
            loading: true,
            currPage: 1,
            pageSize: 10,
            type: 'add',
            configSelect: '-1',
            searchFrom: {
                remark: '',
                smsSignature: '',
                branchName: ''
            },
            config: {
                remark: '',
                smsSignature: '',
                emailPrefix: '',
                enableBigdataRecommend: '0',
                enableLiveRecharge: '0',
                enableUserPoint: '0',
                showWeather: '0',
                showTvFocusPicture: '1'
            }
        };
    },
    computed: {
        ...mapGetters({
            requesting: 'requesting',
            branchConfigList: 'branchConfigList',
            totalCount: 'totalCount',
            ruleValidate: 'ruleValidate'
        })
    },

    methods: {
        ...mapActions({
            getBranchConfig: 'getBranchConfig',
            getBranchConfigItemStaus: 'getBranchConfigItemStaus',
            addBranchConfig: 'addBranchConfig',
            deleteBranchConfig: 'deleteBranchConfig',
            updateBranchConfig: 'updateBranchConfig',
            clearPage: 'clearPage'
        }),

        search(params = {}) {
            this.currPage = params.current || 1;
            this.getBranchConfig({
                pageNo: this.currPage,
                pageSize: this.pageSize,
                branchName: this.searchFrom.branchName,
                smsSignature: this.searchFrom.smsSignature,
                remark: this.searchFrom.remark
            });
        },

        changePage(current) {
            this.search({ current });
        },

        ok() {
            this.$refs.configForm.validate((valid) => {
                if (valid) {
                    this.submitFrom();
                } else {
                    this.$Message.warning('请完善表单信息');
                }
            });
        },

        async submitFrom() {
            try {
                if (this.type == 'edit') {
                    await this.updateBranchConfig({
                        pk: this.config.pk,
                        ...this.config
                    });
                } else {
                    await this.addBranchConfig(this.config);
                }  
                this.visible = false;
                this.$refs.configForm.resetFields();
                this.search({ current: this.currPage });
                this.$Message.success('提交成功');
            } catch (err) {
                this.$Message.error('提交失败');
            }
        },

        cancel() {
            this.visible = false;
            this.$refs.configForm.resetFields();
        },

        showModal(type, currItem) {
            if (type == 'edit') {
                currItem.enableBigdataRecommend = currItem.enableBigdataRecommend.toString();
                currItem.enableLiveRecharge = currItem.enableLiveRecharge.toString();
                currItem.enableUserPoint = currItem.enableUserPoint.toString();
                currItem.showWeather = currItem.showWeather.toString();
                currItem.showTvFocusPicture = currItem.showTvFocusPicture.toString();
                
                this.config = Object.assign({}, this.config, currItem);
            }            
            this.type = type;
            this.visible = true;
        },

        confirm(pk) {
            this.$Modal.confirm({
                title: '确认删除 ？',
                content: '<p>点击确认删除该选项</p>',
                onOk: async () => {
                    try {
                        await this.deleteBranchConfig({ pk });
                        // 如果是最后一页只剩一条数据，则查询上一页
                        const currentPage = this.totalCount % this.pageSize == 1 ? this.currPage - 1 : this.currPage;
                        this.search({ current: currentPage });
                    } catch (err) {
                        this.$Message.error('删除失败');
                    }                    
                }
            });
        },

        changeBranchConfig(path) {
            this.$router.push(path);
        },

        changeSelectOpen(value, item) {
            if (value) {
                this.getBranchConfigItemStaus({
                    branchName: item.branchName
                });
            }
        }
    },

    beforeCreate() {
        this.$store.registerModule('Page1', Store);
    },    

    mounted() {
        this.search();
    },

    destroyed() {
        this.clearPage();
        this.$store.unregisterModule('Page1');
    }
};
</script>

<style lang="stylus" module>
    .container {
        position: relative;
        background: #fff;
        margin: 20px;

        .content {
            min-height: 500px;
            padding: 20px; 
            overflow: hidden;

            .page {
                margin-top: 20px;
                float: right;
            }

            .search {
                :global(.ivu-btn) {
                    padding: 4px 25px 5px 25px;
                    position: relative;
                    top: 2px;
                }
                
                .searchinput {
                    width: 180px;
                }
            }

            .branch-list {                
                .branch-item {
                    border-bottom: 1px solid #e8e8e8;
                    padding: 20px;

                    .branch-item-top {
                        display: flex;
                        justify-content: space-between;
                    }

                    .branch-item-bottom {
                        display: flex;
                        justify-content: space-between;

                        .branch-item-switch {
                            color: #999;
                            font-size: 12px;
                            margin-top: 10px;
                            span {
                                margin-right: 20px;
                            }
                        }

                        .branch-config-select {
                            display: flex;
                            align-items: center;
                            color: #999;
                            font-size: 12px;
                            margin-top: 10px;
                        }
                    }
                }
            }

            .table-header {
                height: 50px;
                background: #fafafa;
                overflow:hidden;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 15px;
            }
        }
    }

    .modal-form {
        width: 550px;
        margin: 0 auto;
    }
</style>
