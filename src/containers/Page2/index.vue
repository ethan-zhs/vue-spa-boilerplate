<template>
    <div :class="$style.container">
        <div :class="$style.content">

            <div :class="$style.search">
                <Form :label-width="40" :inline="true">
                    <FormItem label="应用">
                        <Input v-model="searchFrom.description" placeholder="请输入应用关键字" :class="$style.searchinput" />
                    </FormItem>
                    <Button type="success" @click="search">搜索</Button>
                </Form>
            </div>

            <div :class="$style['table-header']">
                <span><Icon type="md-list" /> 平台数据列表</span>
                <Button @click="showModal('add')" type="success">添加配置</Button>                         
            </div>

            <ul :class="$style['branch-list']">
                <li v-for="item in branchConfigList" :class="$style['branch-item']">
                    <div :class="$style['branch-item-top']">
                        <div>
                            {{item.description || '--'}}
                        </div>
                        <div>
                            <Button size="small" @click="showModal('edit', item)">编辑</Button>
                            <Button size="small" @click="confirm(item.pk)">删除</Button>
                        </div>
                    </div>
                    <div :class="$style['branch-item-bottom']">
                        <div :class="$style['branch-item-switch']">
                            <span>类型：{{platformType[item.type.toString()]}}</span>
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
            title="平台配置"
            @on-cancel="cancel"
        >
            <Form :model="config" :rules="ruleValidate" :label-width="110" :class="$style['modal-form']" ref="configForm">
                <FormItem label="应用" prop="description">
                    <Input v-model="config.description" placeholder="请输入应用" />
                </FormItem>
                <FormItem label="类型" prop="type">
                    <Select v-model="config.type" style="width:200px">
                        <Option :value="'2'" :key="'2'">综合类平台</Option>
                        <Option :value="'3'" :key="'3'">垂直类平台</Option>
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

const { mapGetters, mapActions } = createNamespacedHelpers('Page2');

export default {
    name: 'page2', 
    data: function () {
        return {
            visible: false,
            currPage: 1,
            pageSize: 10,
            type: 'add',
            configSelect: '-1',
            platformType: {
                2: '综合类平台',
                3: '垂直类平台'
            },
            searchFrom: {
                description: ''
            },
            config: {
                description: '',
                type: '2'
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
            getPlatform: 'getPlatform',
            addPlatform: 'addPlatform',
            deletePlatform: 'deletePlatform',
            updatePlatform: 'updatePlatform'
        }),

        search(params = {}) {
            this.currPage = params.current || 1;
            this.getPlatform({
                pageNo: this.currPage,
                pageSize: this.pageSize,
                description: this.searchFrom.description
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
                    await this.updatePlatform({
                        pk: this.config.pk,
                        ...this.config
                    });
                } else {
                    await this.addPlatform(this.config);
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
                currItem.type = currItem.type.toString();                
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
                        await this.deletePlatform({ pk });
                        // 如果是最后一页只剩一条数据，则查询上一页
                        const currentPage = this.totalCount % this.pageSize == 1 ? this.currPage - 1 : this.currPage;
                        this.search({ current: currentPage });
                    } catch (err) {
                        this.$Message.error('删除失败');
                    }                    
                }
            });
        }
    },
    

    mounted() {
        this.search();
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
                    width: 220px;
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
