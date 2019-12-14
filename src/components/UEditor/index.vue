<template>
  <div>
    <script :id="isID" type="text/plain"></script>
    <div class="app-dialog">
      <el-dialog
        title="上传图片"
        :visible.sync="pop.imgUp.show"
        width="600px"
        center
        :close-on-click-modal="false"
      >
        <div class="dialog-body">
          <imgs :multiple="true" :numControl="false" @returnData="toImgArry" @addImg="imgAppend"></imgs>
          <div>
            <p v-for="(img, index) in imgArry" :key="'img' + index">
              <span>图片{{index + 1}} :</span>
              {{img}}
            </p>
          </div>
        </div>
        <div class="tc" style="margin-top:50px;">
          <el-button type="primary" class="submit-102w36" round @click="closePop('imgUp')">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import imgs from "@/components/formUpImgs";
import "../../../static/UEditor/ueditor.config.js";
import "../../../static/UEditor/ueditor.all.min.js";
import "../../../static/UEditor/lang/zh-cn/zh-cn.js";
export default {
  name: "",
  props: {
    id: {
      type: String,
      default: "editor"
    },
    config: {
      type: Object
    },
    initData: {
      default: ""
    }
  },
  components: {
    imgs
  },
  data() {
    return {
      editor: null,
      configInit: {
        UEDITOR_HOME_URL: "/static/UEditor/",
        serverUrl: "",
        zIndex: "10",
        toolbars: [
          [
            // 'anchor', //锚点
            "undo", // 撤销
            "redo", // 重做
            "bold", // 加粗
            "indent", // 首行缩进
            // 'snapscreen', //截图
            "italic", // 斜体
            "underline", // 下划线
            "strikethrough", // 删除线
            "subscript", // 下标
            "fontborder", // 字符边框
            "superscript", // 上标
            "formatmatch", // 格式刷
            "source", // 源代码
            "blockquote", // 引用
            "pasteplain", // 纯文本粘贴模式
            "selectall", // 全选
            // 'print', //打印
            "preview", // 预览
            "horizontal", // 分隔线
            "removeformat", // 清除格式
            "unlink", // 取消链接
            "insertrow", // 前插入行
            "insertcol", // 前插入列
            "mergeright", // 右合并单元格
            "mergedown", // 下合并单元格
            "deleterow", // 删除行
            "deletecol", // 删除列
            "splittorows", // 拆分成行
            "splittocols", // 拆分成列
            "splittocells", // 完全拆分单元格
            "deletecaption", // 删除表格标题
            "inserttitle", // 插入标题
            "mergecells", // 合并多个单元格
            "deletetable", // 删除表格
            "cleardoc", // 清空文档
            "insertparagraphbeforetable", // "表格前插入行"
            // 'insertcode', //代码语言
            "fontfamily", // 字体
            "fontsize", // 字号
            "paragraph", // 段落格式
            // 'simpleupload', //单图上传
            // 'insertimage', //多图上传
            "edittable", // 表格属性
            "edittd", // 单元格属性
            "link", // 超链接
            "emotion", // 表情
            "spechars", // 特殊字符
            "searchreplace", // 查询替换
            "map", // Baidu地图
            // 'gmap', //Google地图
            // 'insertvideo', //视频
            // 'help', //帮助
            "justifyleft", // 居左对齐
            "justifyright", // 居右对齐
            "justifycenter", // 居中对齐
            "justifyjustify", // 两端对齐
            "forecolor", // 字体颜色
            "backcolor", // 背景色
            "insertorderedlist", // 有序列表
            "insertunorderedlist", // 无序列表
            "fullscreen", // 全屏
            "directionalityltr", // 从左向右输入
            "directionalityrtl", // 从右向左输入
            "rowspacingtop", // 段前距
            "rowspacingbottom", // 段后距
            // 'pagebreak', //分页
            "insertframe", // 插入Iframe
            "imagenone", // 默认
            "imageleft", // 左浮动
            "imageright", // 右浮动
            "imagecenter", // 居中
            // 'attachment', //附件
            // 'wordimage', //图片转存
            "lineheight", // 行间距
            "edittip ", // 编辑提示
            "customstyle", // 自定义标题
            "autotypeset", // 自动排版
            // 'webapp', //百度应用
            "touppercase", // 字母大写
            "tolowercase", // 字母小写
            // 'background', //背景
            // 'template', //模板
            // 'scrawl', //涂鸦
            // 'music', //音乐
            "inserttable", // 插入表格
            "drafts" // 从草稿箱加载
            // 'charts', // 图表
          ]
        ]
      },
      imgArry: [],
      appendArry: [],
      UEinit: false,
      pop: {
        imgUp: {
          show: false
        }
      }
    };
  },
  computed: {
    isID: function() {
      let rand = JSON.stringify(Math.random()).substr(-2, 2);
      return this.id + rand;
    }
  },
  watch: {
    initData(val) {
      if (this.UEinit || !val) return;
      // this.$nextTick(() => {
      //   this.UEinit = true;
      //   this.editor.ready(() => {
      //     this.editor.setContent(val, true);
      //   });
      // });
      let _this = this;
      let timer = setInterval(function() {
        if (_this.editor != null) {
          clearInterval(timer);
          _this.UEinit = true;
          _this.editor.ready(() => {
            _this.editor.setContent(_this.initData, true);
          });
        }
      }, 100);
    }
  },
  mounted() {
    this.UEcreated();
  },
  destroyed() {
    this.editor.destroy();
  },
  methods: {
    UEcreated() {
      // 初始化UE
      const _this = this;
      this.configInit = Object.assign({}, this.configInit, this.config);
      UE.registerUI("图片上传", function(editor, uiName) {
        // eslint-disable-line
        // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function() {
            alert("execCommand:" + uiName);
          }
        });
        // 创建一个button
        var btn = new UE.ui.Button({
          // eslint-disable-line
          name: uiName,
          title: uiName,
          cssRules: "background-position: -380px 0;",
          onclick: function() {
            _this.toPopSee("imgUp");
          }
        });
        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener("selectionchange", function() {
          var state = editor.queryCommandState(uiName);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });
        return btn;
      });
      this.editor = UE.getEditor(this.isID, this.configInit); // eslint-disable-line
      this.editor.addListener("contentChange", () => {
        const html = this.editor.getContent();
        this.$emit("returnData", html);
      });
      if (this.initData) {
        let _this = this;
        let timer = setInterval(function() {
          if (_this.editor != null) {
            clearInterval(timer);
            _this.UEinit = true;
            _this.editor.ready(() => {
              _this.editor.setContent(_this.initData, true);
            });
          }
        }, 100);
      }
      return this.editor;
    },
    imgAppend(src) {
      this.editor.ready(() => {
        this.editor.setContent('<p><img src="' + src + '" /></p>', true);
      });
    },
    toImgArry(val) {
      this.imgArry = val.split(";");
    },
    toPopSee(name, data) {
      this.pop[name].show = true;
      this.pop[name].data = data;
    },
    closePop(name) {
      this.pop[name].show = false;
      this.pop[name].data = "";
    },
    getUEContent: function() {
      return this.editor.getContent();
    }
  }
};
</script>
