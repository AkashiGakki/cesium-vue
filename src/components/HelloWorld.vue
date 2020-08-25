<template>
  <div class="nip-micro-service-hub">
    <div class="service-header">
      <p class="service-header-title">插件中心</p>
      <div class="service-header-search">
        <a-input-group compact class="service-header-search-group">
          <a-select
            default-value="all"
            class="service-header-search-select"
            @select="onInputSelect"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="microApp">微应用</a-select-option>
            <a-select-option value="extension">扩展</a-select-option>
            <a-select-option value="library">依赖库</a-select-option>
            <a-select-option value="theme">主题</a-select-option>
            <a-select-option value="model">模型</a-select-option>
          </a-select>
          <a-input-search
            class="service-header-search-input"
            placeholder="请输入插件关键字......"
            enter-button
            @search="onInputSearch"
            v-model="input"
          />
        </a-input-group>
        <a-dropdown class="service-header-search-drop" :trigger="['click']">
          <a-menu slot="overlay" @click="onItemClick">
            <a-menu-item v-for="item in breadCrumb" :key="item.type">{{ item.name }}</a-menu-item>
          </a-menu>
          <a-icon class="add-icon" type="plus-square" />
        </a-dropdown>
      </div>
    </div>

    <div class="service-menu">
      <div class="service-menu-item">
        <span v-for="(item, index) in breadCrumb" :key="item.name">
          <span
            class="menu-item"
            :class="{'active' : item.type === curSelectType}"
            @click="onMenuClick(item.type)"
          >{{ item.name }}</span>
          <span class="separator" v-show="index !== breadCrumb.length - 1">|</span>
        </span>
      </div>
    </div>

    <!-- <ServiceHubList :params="pluginList" /> -->
    <div class="service-hub-list">
      <div class="service-list card-list" ref="cardList">
        <transition-group name="list" tag="div" class="container">
          <Card
            v-for="item in filterData"
            :params="item"
            :cardMargin="cardMargin"
            :key="item.id"
            @del="decrease"
            @edit="edit"
            @onClick="onAppClick(item)"
          ></Card>
        </transition-group>
      </div>

      <nip-service ref="newPluginService" :width="600" @accept="submitPlugin" />
    </div>
  </div>
</template>

<script>
import SEARCH_ALL_PLUGIN_BY_KEYWORD_IN_NAME_OR_IN_TYPE from "../graphql/query/searchAllPluginByKeywordInNameOrInType.gql";
import SAVE_PLUGIN from "../graphql/mutation/savePlugin.gql";
import DELETE_PLUGIN_BY_ID from "../graphql/mutation/deletePluginById.gql";
import FIND_PLUGIN_BY_ID from "../graphql/query/findPluginById.gql";

import Card from "./Card";

import cardMarginMixin from "../mixins/cardMarginMixin";
import storeMixin from "../mixins/storeMixin";

import ServiceHubList from "./ServiceHubList";
import { size } from 'lodash';

export default {
  name: "NipServiceHub",
  components: {
    Card,
  },
  mixins: [cardMarginMixin, storeMixin],
  props: {
    moduleReady: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      cardMargin: 40,
      curActionType: "",
      curItemType: "",
      curSelectType: "microApp",
      breadCrumb: [
        { name: "微应用", type: "microApp" },
        { name: "微应用扩展", type: "extension" },
        { name: "前端依赖库", type: "library" },
        { name: "前端主题", type: "theme" },
        { name: "可视化模型", type: "model" },
        // { name: "前端插件", type: "plugin" },
        // { name: "后台服务", type: "service" },
      ],
      pluginList: [],
      input: "",
      inputSelect: ""
    };
  },
  computed: {
    filterData() {
      if (!this.input) {
        console.log("search pluginList", this.pluginList);
        return this.pluginList;
      }
      return this.pluginList.filter((value) => {
        return value.name.includes(this.input);
      });
    },
  },
  apollo: {
    searchAllPluginByKeywordInNameOrInType: {
      query: SEARCH_ALL_PLUGIN_BY_KEYWORD_IN_NAME_OR_IN_TYPE,
      variables() {
        return {
          name: "",
          type: this.curSelectType,
          page: {},
        };
      },
    },
  },
  watch: {
    searchAllPluginByKeywordInNameOrInType(val) {
      this.pluginList = val;
    },
    moduleReady: {
      immediate: true,
      handler(val) {},
    },
    serviceList(val) {
      this.calWidth();
    },
    breadCrumb: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.length > 0) {
          this.curSelectType = val[0].type;
        }
      },
    },
  },
  mounted() {},
  methods: {
    async onMenuClick(type) {
      this.curSelectType = type;
      let getPlugins = [];
      getPlugins = await this.findPluginsByType("", type, {});
      if (getPlugins === null) {
        this.pluginList = [];
      } else {
        this.pluginList = getPlugins;
      }
    },
    async findPluginsByType(name, type, page) {
      let vm = this;
      let {
        data: { searchAllPluginByKeywordInNameOrInType },
      } = await vm.$apollo.query({
        query: SEARCH_ALL_PLUGIN_BY_KEYWORD_IN_NAME_OR_IN_TYPE,
        variables: { name, type, page },
      });
      return searchAllPluginByKeywordInNameOrInType;
    },
    async increase() {
      this.curActionType = "add";
      let output = null;
      let item = this.breadCrumb.filter((f) => f.type == this.curItemType);
      // console.log('name', name[0].name);
      output = await this.$refs.newPluginService.requestWithOption(
        {
          id: "service.plugin.new",
          width: "600px",
          title: "新建" + item[0].name,
        },
        {}
      );
      let savePlugin = await this.savePlugin(output);
    },
    async savePlugin(plugin) {
      let vm = this;
      this.curSelectType = this.curItemType;
      let {
        data: { savePlugin },
      } = await vm.$apollo.mutate({
        mutation: SAVE_PLUGIN,
        variables: {
          plugin: {
            id: plugin.id || "",
            name: plugin.name,
            alias: plugin.alias,
            description: plugin.description,
            type: vm.curSelectType,
            version: plugin.version,
          },
        },
        update: (store, { data: { savePlugin } }) => {
          if (savePlugin) {
            if (vm.curActionType === "edit") {
              vm.$message.success("插件编辑成功");
            } else if (vm.curActionType === "add") {
              vm.$message.success("插件创建成功");
            }
            // 缓存添加
            vm.applyToGraphQLCache(store, (result) => {
              let apollo = vm.$options.apollo;
              for (let key in apollo) {
                if (key.charAt(0) !== "$") {
                  vm.$apollo.queries[key].refetch();
                }
              }
            });
          } else {
            if (vm.curActionType === "edit") {
              vm.$message.error("插件编辑失败，请稍后或刷新页面后重试");
            } else if (vm.curActionType === "add") {
              vm.$message.success("插件创建失败，请稍后或刷新页面后重试");
            }
          }
        },
      });
      return savePlugin;
    },
    async decrease(id) {
      this.curActionType = "del";
      let deletePluginById = await this.deletePluginById(id);
    },
    async deletePluginById(id) {
      let vm = this;
      await vm.$apollo.mutate({
        mutation: DELETE_PLUGIN_BY_ID,
        variables: { id },
        update: (store, { data: { deletePluginById } }) => {
          if (deletePluginById) {
            vm.$message.success("删除插件成功！");
            // 缓存删除
            vm.applyToGraphQLCache(store, (result) => {
              let apollo = vm.$options.apollo;
              for (let key in apollo) {
                if (key.charAt(0) !== "$") {
                  vm.$apollo.queries[key].refetch();
                }
              }
            });
          } else {
            vm.$message.error("删除失败，请稍后或刷新页面后重试！");
          }
        },
      });
    },
    async findPluginById(id) {
      let vm = this;
      let {
        data: { findPluginById },
      } = await vm.$apollo.query({
        query: FIND_PLUGIN_BY_ID,
        variables: { id },
      });
      return findPluginById;
    },
    async edit(id) {
      this.curActionType = "edit";
      let findPluginById = await this.findPluginById(id);
      let output = null;
      output = await this.$refs.newPluginService.requestWithOption(
        {
          id: "service.plugin.new",
          width: "600px",
          title: "编辑插件",
        },
        {
          data: findPluginById,
          actionType: "edit",
        }
      );

      if (output) {
        output.id = id;
        await this.savePlugin(output);
      }
    },
    submitPlugin(plugin) {
      return plugin;
    },
    onItemClick(event) {
      this.curItemType = event.key;
      this.increase();
    },
    onInputSelect(value, option) {
      this.inputSelect = value;
    },
    async onInputSearch(value) {
      this.input = value;
      let type = this.inputSelect;
      let getPlugins = [];
      this.curSelectType = type;
      getPlugins = await this.findPluginsByType("", type, {});
      if (getPlugins === null) {
        this.pluginList = [];
      } else {
        this.pluginList = getPlugins;
      }
    }
  },
};
</script>

<style>
</style>