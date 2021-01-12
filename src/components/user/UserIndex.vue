<template>
  <div style="height: 100%" >
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
<!--    <el-card class="box-card" :body-style="{width:'98%',height: '100%'}"-->
<!--             style="margin-top: 20px;height: 100%;width: 100%;">-->

      <div style="width: 100%;">
        <el-button type="success" @click="addUser">添加用户<i class="el-icon-user el-icon--right"></i>
        </el-button>
        <el-tooltip content="将照片文件夹下未注册的用户批量注册(照片文件夹为程序根目录下)" placement="bottom" effect="light">
        <el-button type="info" >批量注册照片<i class="el-icon-camera el-icon--right"></i>
        </el-button>
        </el-tooltip>
          <el-tooltip content="批量导入人员信息" placement="bottom" effect="light">
        <el-button type="warning" style="margin-left: 10px">批量导入<i class="el-icon-upload el-icon--right"></i>
        </el-button>
           </el-tooltip>
        <el-button type="primary" @click="exportData">导出<i class="el-icon-upload2 el-icon--right"></i>
        </el-button>


        <el-divider></el-divider>
      </div>

      <div style="display: flex;height: auto;width: auto;">
        <div style="flex: 1;border-right:1px solid #EBEEF5;margin-right: 10px">
          <el-tree
              class="filter-tree"
              :data="options"
              @check="checkData"
              node-key="value"
              :props="{label:'label',value:'value',children:'children'}"
              default-expand-all
              highlight-current
              show-checkbox
              check-strictly
              :indent="20"
              ref="tree">
          </el-tree>
<!--          :data="showData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"-->
<!--          :data="search==''?showData:showAllData.filter(data2=>data2.username.toLowerCase().includes(search.toLowerCase()))"-->
        </div>
        <div style="flex: 8;" >
          <div style="width: 98%;" >
            <el-table v-loading="isLoading"
                      max-height="700"
                      :data="search==''?showData:showAllData.filter(data2=>{ return  data2.username.toLowerCase().includes(search.toLowerCase()) || data2.jobNumber.toLowerCase().includes(search.toLowerCase())})"
                      style="width: 100%"
                      >
              <el-table-column
                  label="用户名"
                  width="120"
                  prop="username">
              </el-table-column>
              <el-table-column
                  label="学工号"
                  prop="jobNumber">
              </el-table-column>
              <el-table-column
                  label="性别"
                  prop="sex">
              </el-table-column>
              <el-table-column
                  label="电话"
                  prop="phone">
              </el-table-column>
              <el-table-column
                  label="人脸"
                  prop="faced">
              </el-table-column>
              <el-table-column
                  align="right">
                <!-- eslint-disable -->
                <template slot="header" slot-scope="scope">
                  <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                </template>
                <!-- eslint-enable -->
                <!-- eslint-disable -->

                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      type="warning"
                      @click="handleUpload(scope.$index, scope.row)">上传照片<i class="el-icon-edit"></i>
                  </el-button>
                  <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">修改<i class="el-icon-edit"></i>
                  </el-button>
                  <el-popconfirm
                      :title=deleteTitle
                      @confirm="confirmDelete(scope.row)"
                  >
                  <el-button
                      size="mini"
                      type="danger"
                      slot="reference"
                      @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete-solid"></i>
                  </el-button>
                  </el-popconfirm>
                </template>
                <!-- eslint-enable -->
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 10px;float: right">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--    添加用户对话框-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <div style="height: 400px">

          <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="addForm.sex" :label="0">男</el-radio>
              <el-radio v-model="addForm.sex" :label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="学工号:" prop="jobNumber">
              <el-input v-model="addForm.jobNumber"></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="选择部门" prop="departmentId">
              <el-cascader style="width: 100%"
                           v-model="addForm.departmentId"
                           :show-all-levels='false'
                           :options="options"
                           :props="{ checkStrictly: true}"
                           clearable></el-cascader>
            </el-form-item>

            <el-form-item style="float: right;margin-right: 10px">
              <el-button type="primary"  @click="submitForm('addForm')">立即创建</el-button>
              <el-button @click="resetForm('addForm')">重置</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-dialog>


<!--    修改用户对话框-->
    <el-dialog title="添加用户" :visible.sync="editVisible">
      <div style="height: 400px">

        <el-form :model="addForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名:" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio v-model="addForm.sex" :label="0">男</el-radio>
            <el-radio v-model="addForm.sex" :label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="学工号:" prop="jobNumber">
            <el-input v-model="addForm.jobNumber"></el-input>
          </el-form-item>
          <el-form-item label="手机:" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="选择部门" prop="departmentId">
            <el-cascader style="width: 100%"
                         v-model="addForm.departmentId"
                         :show-all-levels='false'
                         :options="options"
                         :props="{ checkStrictly: true}"
                         clearable></el-cascader>
          </el-form-item>

          <el-form-item style="float: right;margin-right: 10px">
            <el-button type="primary"  @click="submitFormEdit('editForm')">修改</el-button>
            <el-button @click="resetForm('addForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>

<!--    </el-card>-->
  </div>
</template>

<script>
export default {
  name: "UserIndex",
  watch: {
    //监控当前选择节点，控制单选
    node: {
      handler(newValue, oldValue) {
        if (newValue.length > 1) {
          this.$refs.tree.setChecked(oldValue[0], false)
          this.node.splice(newValue.indexOf(oldValue[0]), 1)
        }
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      editVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isLoading:false,
      options: [],
      node: [],
      tableData: [],
      search: '',
      allData:[],
      deleteTitle:'',
      addForm: {username: '', sex: 0, phone: '', departmentId: [],id:'',jobNumber:''},
      rules: {
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 8, message: '长度大于8 个字符', trigger: 'blur'}
        ],
        jobNumber: [
          {required: true, message: '请输入学工号', trigger: 'blur'},
          {min: 5, message: '长度大于5 个字符', trigger: 'blur'}
        ],
        sex: [{required: true}],
        departmentId: [
          {type: 'array', required: true, message: '请选择部门', trigger: 'change'}
        ],
      }
    }
  },
  computed: {
    submitFormData: function () {
      let submitData = {
        username: this.addForm.username,
        sex: this.addForm.sex,
        phone: this.addForm.phone,
        departmentId: this.addForm.departmentId[this.addForm.departmentId.length - 1],
        id: this.addForm.id
      }

      return submitData
    },
    showData: function () {
      let showData = [];
      this.tableData.forEach(data=>{
        if(data.faced == 0){
          data.faced = '未注册'
        }else {
          data.face = '已注册'
        }

        if(data.sex == 0){
          data.sex = '男'
        }else{
          data.sex = '女'
        }
        showData.push(data)
      });
      return showData;
    },
    showAllData: function () {
      let showAllData = [];
      this.allData.forEach(data=>{
        if(data.faced == 0){
          data.faced = '未注册'
        }else {
          data.face = '已注册'
        }

        if(data.sex == 0){
          data.sex = '男'
        }else{
          data.sex = '女'
        }
        showAllData.push(data)
      });
      return showAllData;

    },
  },

  methods: {

    addUser() {

      let node = this.$refs.tree.getCheckedNodes();
      if (node[0]) {
        this.currentNodeData = node[0]
        this.addForm.departmentId = []
        this.getAllParentAdd(node[0].value)
        this.addForm.departmentId.reverse()
        this.dialogFormVisible = true
      } else {
        this.dialogFormVisible = true
      }
    },
    exportData(){
      // this.axios.post("/user/export",{id:this.$refs.tree.getCheckedNodes().length == 0?99999:this.$refs.tree.getCheckedNodes()[0].value}).then(
      //     res=>{
      //       console.log(res);}
      // ).catch(
      //     err=>{
      //       console.log(err);}
      // )
      let x = this.$refs.tree.getCheckedNodes().length == 0?99999:this.$refs.tree.getCheckedNodes()[0].value;
      console.log(x);
      window.open("http://localhost:8080/user/export?id="+x)
    },
    getList() {
      this.axios.get("/department/list").then(res => {
        const {departments} = res.data.data;
        this.options = departments;

      }).catch(err => {
        console.log(err);
      })
    },
    checkData(x, y) {

      this.node = y.checkedKeys;
      this.currentPage = 1
      this.getUser(x.value)

    },
    confirmDelete(row){

      this.axios.post("/user/delete",{id:row.id}).then(res=>{
        if(res.data.code==200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getUser(this.$refs.tree.getCheckedNodes().length == 0?99999:this.$refs.tree.getCheckedNodes()[0].value)

        }else {
          this.$message.error('删除失败：'+res.data.message);
        }
      }).catch(err=>{
        console.log(err);
      });
    },

    //获取部门下的所有用户
    getUser(id) {
      this.isLoading = true
      this.axios.get("/user/list", {
        params: {
          departmentId: id,
          current: this.currentPage,
          size: this.pageSize
        }
      }).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.data
        this.allData = res.data.data.allData


        this.isLoading = false
      }).catch(err => {
        console.log(err);
        this.isLoading = false
      })

    },
    //部门回显
    getAllParentAdd(id) {
      let one = this.$refs.tree.getNode(id);
      this.addForm.departmentId.push(one.data.value)
      if (one.parent.data.value != null) {
        this.getAllParentAdd(one.parent.data.value)
      }
    },

    handleEdit(index, row) {
      if(row.sex === '女'){
        this.addForm.sex = 1
      }else {
        this.addForm.sex = 0
      }
      this.addForm.id = row.id
      this.addForm.jobNumber = row.jobNumber
      this.addForm.username = row.username;
      this.addForm.phone = row.phone;
      this.addForm.departmentId = [];
      this.getAllParentAdd(row.departmentId)
      this.addForm.departmentId.reverse();
      this.editVisible = true

      console.log(index, row);
    },
    handleDelete(index, row) {
      this.deleteTitle = '确认要删除'+row.username+'吗？'
      console.log(index, row);
    },
    handleUpload(index, row){
      console.log(index, row);
    },


    handleSizeChange(val) {
      this.pageSize = val
      this.getUser(this.$refs.tree.getCheckedNodes().length == 0?99999:this.$refs.tree.getCheckedNodes()[0].value)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(this.$refs.tree.getCheckedNodes());
      this.getUser(this.$refs.tree.getCheckedNodes().length==0?99999:this.$refs.tree.getCheckedNodes()[0].value)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/user/add", this.submitFormData).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.addForm.phone = '',
                  this.addForm.username = '',
                  this.addForm.sex = 0

            } else {
              this.$message.error('添加用户失败');
            }
            this.dialogFormVisible = false
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitFormEdit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/user/edit", this.submitFormData).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.addForm.phone = '',
                  this.addForm.username = '',
                  this.addForm.sex = 0,
              this.addForm.id=''
          this.getUser(this.$refs.tree.getCheckedNodes().length == 0?99999:this.$refs.tree.getCheckedNodes()[0].value)
            } else {
              this.$message.error('修改失败：'+res.data.data.message);
            }
            this.editVisible = false
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
    this.getList();
    this.getUser(99999);
  }

}
</script>

<style scoped>
.el-divider{
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid #E6EBF5;}
</style>
