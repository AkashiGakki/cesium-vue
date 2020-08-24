<template>
  <div class="nip-micro-service-hub">
    <div class="serive-list card-list" ref="cardList">
      <template v-for="item in serviceList">
        <div :key="item.key" class="service-group">
          <p class="group-title" :style="{'paddingLeft':cardMargin+'px'}">{{item.name}}</p>
          <transition-group name="list" tag="div" class="service-group-list">
            <Card
              v-for="child in item.children"
              :key="child.id"
              :params="child"
              :showActions="false"
              :cardMargin="cardMargin"
            ></Card>
          </transition-group>
        </div>
      </template>
    </div>
    <!-- <a-button @click="increase">添加</a-button> -->
    <nip-service ref="service" class="nip-service-hidden" :destroyOnClose="true" />
  </div>
</template>

<script>
import FIND_ALL_SERVICE from "../graphql/query/findAllService.gql";
import FIND_SERVICE_BY_ID from "../graphql/query/findServiceById.gql";
import SAVE_SERVICE from "../graphql/mutation/saveService.gql";
import DELETE_SERVICE_BY_ID from "../graphql/mutation/deleteServiceById.gql";

import Card from "./Card";
import cardMarginMixin from "../mixins/cardMarginMixin";
import storeMixin from "../mixins/storeMixin";

export default {
  name: "NipServiceHub",
  components: {
    Card
  },
  props: {
    moduleReady: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  mixins: [cardMarginMixin, storeMixin],
  data() {
    return {
      cardMargin: 40,
      curActionType: "",
      workflowServices: [],
      microAppServices: [],
      filterWorkflowIds: ["notification", "test"],
      filterCategroyIds: ["samples", "services", "interface"]
    };
  },
  computed: {
    serviceList() {
      return _.concat(this.workflowServices, this.microAppServices);
    }
  },
  apollo: {
    findAllService: {
      query: FIND_ALL_SERVICE,
      variables() {
        return {
          page: {}
        };
      }
    }
  },
  watch: {
    moduleReady: {
      immediate: true,
      handler(val) {
        if (val) {
          this.workflowServices = [];
          let workflows = this.$nip.$workflow.workflows();
          for (const workflowId in workflows) {
            let index = _.findIndex(this.filterWorkflowIds, id => {
              return id === workflowId;
            });

            if (index === -1) {
              let workflow = workflows[workflowId];
              let domainId = workflow.domain;
              let categories = _.get(workflow, "categories", {});

              let categories_ = [];

              if (!_.isEmpty(categories)) {
                for (const categoryId in categories) {
                  let index = _.findIndex(this.filterCategroyIds, id => {
                    return categoryId === id;
                  });

                  if (index === -1) {
                    let category = this.$nip.$workflow.findWorkflowCategory(
                      workflowId,
                      categoryId
                    );

                    if (!_.has(category, "icon")) {
                      category.icon = workflow.icon;
                    }

                    let category_ = {
                      ...category,
                      title: `${workflow.name}-${category.name}`,
                      id: `${domainId}.${workflowId}.${categoryId}`,
                      redirect: `${domainId}.${workflowId}.${categoryId}`
                    };
                    categories_.push(category_);
                  }
                }
              }

              this.workflowServices.push({
                key: workflowId,
                name: workflow.name,
                children: categories_
              });
            }
          }
        }
      }
    },
    serviceList(val) {
      this.calWidth();
    }
  },
  methods: {
    async increase() {
      // 添加
      this.curActionType = "add";
      let output = null;
      output = await this.$refs.service.requestWithOption(
        {
          id: "service.serviceHub.edit",
          width: "800px"
        },
        {}
      );
      let saveService = await this.saveService(output);
    },
    async decrease(id) {
      this.curActionType = "del";
      let deleteServiceById = await this.deleteServiceById(id);
    },
    async edit(id) {
      this.curActionType = "edit";
      let findServiceById = await this.findServiceById(id);
      let output = null;
      output = await this.$refs.service.requestWithOption(
        {
          id: "service.serviceHub.edit",
          width: "800px"
        },
        {
          data: findServiceById,
          actionType: "edit"
        }
      );

      if (output) {
        await this.saveService(output);
      }
    },
    async saveService(service) {
      let vm = this;
      let {
        data: { saveService }
      } = await vm.$apollo.mutate({
        mutation: SAVE_SERVICE,
        variables: {
          Service: {
            id: service.id,
            name: service.name,
            alias: service.alias,
            type: service.type,
            entry: service.entry,
            icon: service.icon,
            cover: service.cover,
            description: service.description,
            image: service.image,
            depends: service.depends
          }
        },
        update: (store, { data: { saveService } }) => {
          if (saveService) {
            if (vm.curActionType === "edit") {
              vm.$message.success("服务编辑成功");
            } else if (vm.curActionType === "add") {
              vm.$message.success("服务创建成功");
            }

            vm.applyToGraphQLCache(store, result => {
              let apollo = vm.$options.apollo;
              for (let key in apollo) {
                if (key.charAt(0) !== "$") {
                  vm.$apollo.queries[key].refetch();
                }
              }
            });
          } else {
            if (vm.curActionType === "edit") {
              vm.$message.error("服务编辑失败，请稍后或刷新页面后重试");
            } else if (vm.curActionType === "add") {
              vm.$message.success("服务创建失败，请稍后或刷新页面后重试");
            }
          }
        }
      });
      return saveService;
    },
    async deleteServiceById(id) {
      let vm = this;
      await vm.$apollo.mutate({
        mutation: DELETE_SERVICE_BY_ID,
        variables: { id },
        update: (store, { data: { deleteServiceById } }) => {
          if (deleteServiceById) {
            vm.$message.success("删除服务成功！");
            vm.applyToGraphQLCache(store, result => {
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
        }
      });
    },
    async findServiceById(id) {
      let vm = this;
      let {
        data: { findServiceById }
      } = await vm.$apollo.query({
        query: FIND_SERVICE_BY_ID,
        variables: { id }
      });
      return findServiceById;
    }
  }
};
</script>

<style>
</style>