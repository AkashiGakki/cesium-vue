<template>
  <div class="nip-type-manage">
    <div class="type-layout-sider"></div>
    <div class="type-layout-content nip-subpage-hastable nip-subpage-hassider">
      <a-layout>
        <a-layout-header class="type-layout-content-header">
          <div>
            <a-button type="primary" @click="onAddTableRow">添加</a-button>
          </div>
          <div class="layout-center">
            <a-input-search
              placeholder="请输入类型关键字"
              style="width: 300px"
              v-model="IDLType"
              enterButton
            />
          </div>
        </a-layout-header>

        <a-layout-content class="type-layout-content-table">
          <nip-sized-box style="height: 100%;" ref="iconSizedBox" v-model="size">
            <a-table
              :columns="columns"
              :dataSource="dataSource"
              :rowKey="record => record.id"
              :scroll="{ y: size.height - 65 - 54 }"
              :pagination="false"
              style="width: 100%; height: 100%;"
            >
              <template
                v-for="col in ['id', 'name', 'subscription', 'company']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </div>
              </template>

              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => onSave(record.key)">保存</a>
                    <a-popconfirm title="确定取消？" @confirm="() => onCancel(record.key)">
                      <a>取消</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a :disabled="editingKey !== ''" @click="() => onEdit(record.key)">编辑</a>
                  </span>
                </div>

                <div class="deletable-row-operations">
                  <a-popconfirm
                    v-if="dataSource.length"
                    title="确认删除？"
                    @confirm="() => onDelete(record.key)"
                  >
                    <a href="javascript:;">删除</a>
                  </a-popconfirm>
                </div>
              </template>
            </a-table>
          </nip-sized-box>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>

<script>
// const BasicResourceTree = () =>
//   import(/* webpackChunkName: "service-resource" */ "./BasicResourceTree");

import _ from "lodash";

const columns = [
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
    // slots: { title: 'ID' },
    scopedSlots: { customRender: "id" },
    width: 0,
    perWidth: 0.2,
  },
  {
    title: "名称",
    key: "name",
    dataIndex: "name",
    width: 0,
    perWidth: 0.2,
  },
  {
    title: "描述",
    key: "subscription",
    dataIndex: "subscription",
    scopedSlots: { customRender: "subscription" },
    width: 0,
    perWidth: 0.2,
  },
  {
    title: "公司",
    key: "company",
    dataIndex: "company",
    scopedSlots: { customRender: "company" },
    width: 0,
    perWidth: 0.2,
  },
  {
    title: "操作",
    key: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [
  {
    key: "1",
    id: "00001",
    name: "John Brown",
    subscription: "This is a subscription",
    company: "KPRD",
  },
  {
    key: "2",
    id: "00002",
    name: "Jim Green",
    subscription: "This is a subscription",
    company: "KPRD",
  },
  {
    key: "3",
    id: "00003",
    name: "Joe Black",
    subscription: "This is a subscription",
    company: "KPRD",
  },
];

export default {
  name: "TypeManage",
  components: {
    // BasicResourceTree
  },
  props: {},
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      columns: columns,
      dataSource: data,
      IDLType: "",
      editingKey: "",

      //资源数据列表
      resourceData: [],
      size: {
        width: 0,
        height: 0,
      },

      //选中树节点的key
      selectedKeys: [],
      //资源根节点类型
      resourceNodeType: "type",
    };
  },
  computed: {
    filterData() {
      let vm = this;
      return vm.resourceData.filter((item) => {
        return item.name && item.name.indexOf(vm.IDLType) > -1;
      });
    },
  },
  watch: {
    size(val) {
      if (val.width !== 0) {
        let vm = this;
        vm.columns.forEach((element) => {
          if (_.has(element, "perWidth")) {
            element.width = Math.ceil(val.width * element.perWidth);
          } else {
            let perWidth = 0;
            vm.columns.forEach((value) => {
              if (_.has(value, "perWidth")) {
                perWidth += value.width;
              }
            });
            element.width = val.width - perWidth;
          }
        });
      }
    },
    // pagination: {
    //   immediate: true,
    //   handler(val) {
    //     if (val.total !== 0) {
    //       this.getResourceIconDataByPage();
    //     }
    //   },
    // },
  },
  created() {},
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    onAddTableRow() {},
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    onEdit(key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    onSave(key) {
      const newData = [...this.dataSource];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.dataSource = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    onCancel(key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.dataSource = newData;
      }
    },
  },
};
</script>

<style scoped>
</style>