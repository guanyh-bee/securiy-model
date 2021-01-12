<template>
  <div style="height: 100%">
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" :body-style="{width:'98%'}"
             style="margin-top: 20px;height: 100%;width: 100%;">
      <!--顶部按钮组-->
      <div style="width: 100%">
        <el-button type="success" @click="addTree">添加<i class="el-icon-plus el-icon--right"></i>
        </el-button>

        <el-button type="primary" @click="editTree">修改<i class="el-icon-edit el-icon--right"></i></el-button>

        <el-tooltip class="item" style="margin-left: 10px" effect="dark" content="删除会删除所选部门和其子部门"
                    placement="bottom-start">

          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              @confirm="confirmDelete"
              @cancel="cancelDelete"
              icon-color="red"
              :title="title"
          >
            <el-button slot="reference" type="danger">删除<i class="el-icon-delete el-icon&#45;&#45;right"></i>
            </el-button>
          </el-popconfirm>

          <!--        <el-button type="danger"  @click="deleteTree">删除<i class="el-icon-delete el-icon&#45;&#45;right"></i></el-button>-->
        </el-tooltip>
        <el-button type="warning" @click="multiImport" style="margin-left: 10px">批量导入<i
            class="el-icon-upload el-icon--right"></i></el-button>
        <!--        <el-divider></el-divider>-->
      </div>
      <!--    树形部门列表-->
      <div style="margin-top: 10px;">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-divider></el-divider>
        <el-tree
            class="filter-tree"
            :data="options"
            @check="checkData"
            node-key="value"
            :default-checked-keys="node"
            :props="{label:'label',value:'value',children:'children'}"
            default-expand-all
            highlight-current
            show-checkbox
            check-strictly
            :filter-node-method="filterNode"
            :indent="20"
            ref="tree">
        </el-tree>
        <!--新建部门对话框-->
        <el-dialog title="新建部门" :visible.sync="dialogFormVisible">
          <div style="height: 250px">
            <el-form :model="addDepartment" ref="addDepartment" :rules="rules" label-width="100px"
                     style="margin-top: 50px">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="addDepartment.name"></el-input>
              </el-form-item>
              <el-form-item label="上级部门" prop="father">
                <el-cascader style="width: 100%"
                             v-model="addDepartment.father"
                             :show-all-levels='false'
                             :options="options"
                             :props="{ checkStrictly: true}"
                             clearable></el-cascader>
              </el-form-item>

              <el-form-item style="float: right;margin-right: 10px">
                <el-button type="primary" :loading="loading" @click="submitForm('addDepartment')">立即创建</el-button>
                <el-button @click="resetForm('addDepartment')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <!--编辑部门对话框-->
        <el-dialog title="修改部门" :visible.sync="dialogEdit" @closed="getList">
          <div style="height: 250px">
            <el-form :model="editDepartment" ref="editDepartment" :rules="rules" label-width="100px"
                     style="margin-top: 50px">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="editDepartment.name"></el-input>
              </el-form-item>
              <el-form-item label="上级部门" prop="father1">
                <el-cascader style="width: 100%"
                             v-model="editDepartment.father1"
                             :show-all-levels='false'
                             :options="options"
                             :props="{checkStrictly : true }"
                             clearable></el-cascader>
              </el-form-item>
              <el-form-item style="float: right;margin-right: 10px">
                <el-button type="primary" @click="submitEdit('editDepartment')">修改</el-button>
                <el-button @click="resetForm('editDepartment')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Add",
  //监控部门过滤字段
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    node: {
      handler(newValue, oldValue) {

        if (newValue.length > 1) {
          this.$refs.tree.setChecked(oldValue[0], false)
          this.node.splice(newValue.indexOf(oldValue[0]), 1)
        }

        // this.editDepartment.father1.splice(0,this.editDepartment.father1.length)
        // // this.getAllParent(this.node[0])
        // this.getAllParent(this.$refs.tree.getCheckedKeys()[0])
        // this.editDepartment.father1.reverse();


      }
      // if(this.node.length>1){
      //   this.$refs.tree.setChecked(this.node[0],false)
      //   this.node.splice(0,1)
      // }

    }
  },
  data() {
    return {
      //表单数据
      addDepartment: {
        name: '',
        father: []
      },
      node: [],
      editDepartment: {
        name: '',
        father1: []
      },
      dialogFormVisible: false,
      currentNodeData: {},
      dialogEdit: false,
      loading: false,
      filterText: '',
      title: '确定要删除吗',
      //表单校验规则
      rules: {
        name: [
          {required: true, message: '请输入部门名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        father: [
          {type: 'array', required: true, message: '请选择上级部门', trigger: 'change'}
        ],
        father1: [
          {type: 'array', required: false, message: '请选择上级部门', trigger: 'change'}
        ]
      },
      //部门列表绑定属性
      options: []
    }
  },
  methods: {
    multiImport() {
      this.$message('该功能暂不可用哦');
    },
//确认删除提交事件
    confirmDelete() {
      if (this.$refs.tree.getCheckedNodes().length < 1) {
        this.$message.error('错误，还没选择部门');
      } else {
        this.axios.post("/department/delete", {id: this.$refs.tree.getCheckedNodes()[0].value}).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    //取消删除
    cancelDelete() {
      this.$message('用户取消删除');
    },

//对 treeList 进行递归操作，禁止选中
    getTreeList(val) {
      val.forEach(item => {
        if (item.label === this.$refs.tree.getCheckedNodes()[0].label) {
          item.disabled = true;
          item.children = null
        }
        if (item.children) {
          this.getTreeList(item.children);
        }
      });
      return val;
    },
    //修改时获取当前子节点所有父节点
    getAllParent(id) {
      let one = this.$refs.tree.getNode(id);
      if (one.parent.data.value != null) {
        this.editDepartment.father1.push(one.parent.data.value)
        this.getAllParent(one.parent.data.value)

      }

    },
//新增时获取当前部门节点及其所有父节点
    getAllParentAdd(id) {
      let one = this.$refs.tree.getNode(id);
      this.addDepartment.father.push(one.data.value)
      if (one.parent.data.value != null) {

        this.getAllParentAdd(one.parent.data.value)

      }

    },
//点击节点触发时间
    checkData(x, y) {
      this.title = '确定要删除\'' + x.label + '\'及其子部门吗？'
      this.node = y.checkedKeys;


    },


    //取消选中
    deleteTree() {
      if (this.node.length > 1) {
        this.node.forEach(node => {
          this.$refs.tree.setChecked(node, false);
        })
      }
    },
//打开新增部门弹框
    addTree() {
      let node = this.$refs.tree.getCheckedNodes();
      if (node[0]) {
        this.currentNodeData = node[0]
        this.addDepartment.father = []
        this.getAllParentAdd(node[0].value)
        this.addDepartment.father.reverse()
        this.dialogFormVisible = true
      } else {
        this.dialogFormVisible = true
      }
    },

    //修改部门
    editTree() {
      let node = this.$refs.tree.getCheckedNodes();
      if (node[0]) {
        this.currentNodeData = node[0]
        this.editDepartment.name = node[0].label
        this.options = this.getTreeList(this.options);
        this.editDepartment.father1 = []
        this.getAllParent(node[0].value)
        this.editDepartment.father1.reverse()
        this.dialogEdit = true
      } else {
        this.$message.error('你还没有选择要修改的部门');
      }


    },
    //新建部门表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/department/create", {
            father: this.addDepartment.father[this.addDepartment.father.length - 1],
            name: this.addDepartment.name
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getList()
            } else {
              this.$message.error('添加失败' + res.data.message);
            }
            this.dialogFormVisible = false;
          }).catch(err => {
                console.log(err);
              }
          )
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改部门提交
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/department/edit", {
            father: this.editDepartment.father1[this.editDepartment.father1.length - 1],
            name: this.editDepartment.name,
            value: this.currentNodeData.value
          }).then(res => {
            if (res.data.code == 200) {
              this.dialogEdit = false
              this.editDepartment.father1.splice(0, this.editDepartment.father1.length - 1)

              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getList()
            } else {
              this.$message.error('修改失败' + res.data.message);
            }

          }).catch(err => {
                console.log(err);
              }
          )
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editDepartment.name = this.currentNodeData.label
    },
    //部门筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //获取所有部门
    getList() {
      this.axios.get("/department/list").then(res => {

        this.options = res.data.data.departments;

      }).catch(err => {
        console.log(err);
      })
    }
  },
  //加载部门列表
  created() {
    this.getList();
  }
}
</script>

<style scoped>
/deep/ .el-tree-node__label {
  font-size: 18px;
  font-family: "Helvetica Neue";
}
</style>
