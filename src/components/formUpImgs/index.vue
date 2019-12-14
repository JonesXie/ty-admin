<template>
  <div class="pro-img-up">
    <div class="item-con">
      <el-upload
        class="voucher-uploader"
        ref="upload"
        list-type="picture-card"
        action
        :on-remove="RemoveChange"
        :before-upload="beforeAvatarUpload"
        :show-file-list="!only"
        :auto-upload="true"
        :http-request="imgUpdate"
        :multiple="multiple"
        :file-list="initData"
        accept="image/*"
      >
        <img v-if="only && imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { upload } from "@/api/product";
export default {
  name: "voucherUpdate",
  props: {
    labelName: {
      default: ""
    },
    only: {
      default: false
    },
    // 多选
    multiple: {
      default: false
    },
    initData: {
      default: () => {
        return [];
      }
    },
    numControl: {
      // 最大图片控制，0/false为不控制
      default: 5
    }
  },
  data() {
    return {
      init: false,
      imageUrl: "",
      returnFile: [],
      upData: {
        info: ""
      }
    };
  },
  watch: {
    initData(val) {
      if (this.init || val.length === 0) return;
      this.init = true;
      this.returnFile = Object.assign([], val);
      if (!this.only || !val[0]) return;
      this.imageUrl = val[0].url;
    }
  },
  mounted() {
    if (this.initData.length > 0) {
      this.init = true;
      this.returnFile = this.initData;
      if (!this.only) return;
      this.imageUrl = this.initData[0].url;
    }
  },
  methods: {
    returnData() {
      let str = "";
      this.returnFile.forEach((img, index) => {
        if (index !== 0) str += ";";
        str += img.url;
      });
      this.$emit("returnData", str);
    },
    imgUpdate(el) {
      return new Promise((resolve, reject) => {
        const file = el.file;
        const formdata = new FormData(); // 创建form对象
        formdata.append("files", file, file.name);
        upload(formdata)
          .then(res => {
            // console.log(res);
            if (res.data.errno <= 0) {
              this.$message.error(res.data.msg);
              reject(false);
              return;
            }
            if (this.only) this.returnFile = [];
            if (this.numControl && this.returnFile.length >= this.numControl) {
              this.$message.error(
                "上传图片不能大于" + this.numControl + "张！"
              );
              return reject(false);
            }
            this.returnFile.push({
              uid: file.uid,
              // url: res.data.data[0].url
              url: res.data[0].url
            });
            this.returnData();
            // this.imageUrl = res.data.data[0].url
            this.imageUrl = res.data[0].url;
            // this.$emit("addImg", res.data.data[0].url);
            this.$emit("addImg", res.data[0].url);
            resolve(el);
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    RemoveChange(file, fileList) {
      const url = file.url;
      const uid = file.uid;
      this.returnFile.forEach((img, index) => {
        if (img.url === url || img.uid === uid) {
          this.returnFile.splice(index, 1);
          return;
        }
      });
      this.returnData();
    },
    beforeAvatarUpload(file) {
      const reg = new RegExp("^image/");
      if (!reg.test(file.type)) {
        this.$message.error("请上传图片！");
        return false;
      }
      return new Promise((resolve, reject) => {
        if (this.numControl && this.returnFile.length >= this.numControl) {
          this.$message.error("上传图片不能大于" + this.numControl + "张！");
          return reject(false);
        }
        canvasDataURL(file, blob => {
          var aafile = new File([blob], file.name, {
            type: file.type
          });
          aafile.uid = file.uid;
          let isLt1M;
          if (file.size < aafile.size) isLt1M = file.size;
          else isLt1M = aafile.size;
          if (isLt1M / 1024 / 1024 > 1) {
            //设置图片大小 1M
            this.$message.error("上传图片过大！");
            reject(false);
          }
          if (file.size < aafile.size) resolve(file);
          else resolve(aafile);
        });
      });
    }
  }
};
function canvasDataURL(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    const img = new Image();
    const quality = 0.8; // 图像质量
    const canvas = document.createElement("canvas");
    const drawer = canvas.getContext("2d");
    img.src = this.result;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
      convertBase64UrlToBlob(canvas.toDataURL(file.type, quality), callback);
    };
  };
}
function convertBase64UrlToBlob(urlData, callback) {
  const arr = urlData.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  callback(new Blob([u8arr], { type: mime }));
}
</script>

