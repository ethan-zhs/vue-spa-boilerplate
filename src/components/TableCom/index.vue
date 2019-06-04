<template>
    <div :class="$style.container">
        <div :class="$style['table-box']">
            <Table :columns="columns" :data="dataSource"></Table>
            <Page 
                v-if="pageShow"
                :total="total" 
                :page-size="pageSize" 
                :current="current" 
                :class-name="$style.page" 
                @on-change="changePage"
            />
        </div>
        <Spin fix v-if="requesting"></Spin>
    </div>
</template>

<script>

export default {
    name: 'TableCom',    
    data: function () {
        return {
            pageSize: 10
        };
    },

    props: [
        'total',
        'current',
        'columns',
        'dataSource',
        'changePage',
        'requesting',
        'pageShow'
    ],

    computed: {

    },

    methods: {

    }
};
</script>

<style lang="stylus" module>
    .container {
        background: #fff;
        position: relative;

        .table-box {
            overflow: hidden;

            :global(.ivu-btn) {
                border: 0;
                background: none;
                color: #2d8cf0;
                padding: 1px 7px 2px 7px;
                outline: none;
            }

            :global(.ivu-btn:focus) {
                box-shadow: none;
            }

            :global(.ivu-table-wrapper) {
                border: 0;
                background: none;
                color: #2d8cf0;
            }

            :global(.ivu-table th),
            :global(.ivu-table:after),
            :global(.ivu-table:before) {
                background: none;
            }   

            :global(.ivu-table-cell) {
                padding: 10px 18px;
            }     
        }

        .page {
            margin-top: 20px;
            float: right;
        }
    }    
</style>
