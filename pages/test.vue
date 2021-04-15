<template>
  <div class="contents">
    <div class="request-wrap">
      <form class="request-form" @submit.prevent="uploadFile" ref="form">
        <!-- 사업분야 -->

        <div class="request-btn">
          <button type="submit" :disabled="validate">
            <span>문의하기</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {TweenMax, Power0} from "gsap";
  import {apiCode, apiFile, apiContact} from "@/api";
  export default {
    name: "request",
    metaInfo() {
      return {
        title: "Request",
        titleTemplate: "%s | e · motion",
        meta: [
          {
            property: "og:title",
            content: "Request | e · motion",
            vmid: "og:title"
          },
          {
            property: "og:url",
            content: "https://www.emotion.co.kr/request/",
            vmid: "og:url"
          }
        ]
      };
    },
    data() {
      return {
        dialogVisible: false,
        formData: {
          contactProjectName: "",
          contactClientCompanyName: "",
          contactClientName: "",
          contactEmail: "",
          contactNumber: "",
          url: "",
          projectBudget: "",
          projectPeriod: "",
          directPeriodInput: "0",
          selection: "",
          contactContents: "",
          projectBusinessType: "",
          projectForm: "",
          projectCharacter: "",
          privacy: false,
          fileList: []
        },
        scene: null,
        projectBusinessType: {
          list: [],
          selected: []
        },
        projectForm: {
          list: [],
          selected: []
        },
        projectCharacter: {
          list: [],
          selected: []
        },
        projectBudget: {
          options: [],
          value: null
        },
        projectPeriod: {
          options: [],
          value: null
        },
        selection: {
          list: [],
          value: null
        },
        uploadFiles: []
      };
    },
    computed: {
      projectBusinessTypeList() {
        return this.txt(
          this.projectBusinessType.selected,
          this.projectBusinessType.list,
          "사업분야"
        );
      },
      projectFormdList() {
        return this.txt(this.projectForm.selected, this.projectForm.list, "프로젝트 형태");
      },
      projectCharacterdList() {
        return this.txt(
          this.projectCharacter.selected,
          this.projectCharacter.list,
          "프로젝트 성격"
        );
      },
      projectBudgetValue() {
        return this.txt(
          this.projectBudget.value ? [this.projectBudget.value] : [],
          this.projectBudget.options,
          "프로젝트 예산"
        );
      },
      projectPeriodValue() {
        return this.txt(
          this.projectPeriod.value
            ? this.projectPeriod.value !== "PPT_DIRECT_INPUT"
              ? [this.projectPeriod.value]
              : `${this.formData.directPeriodInput} 개월`
            : [],
          this.projectPeriod.options,
          "프로젝트 기간"
        );
      },
      selectionValue() {
        return this.txt(
          this.selection.value ? [this.selection.value] : [],
          this.selection.list,
          "선정방식"
        );
      },
      validate() {
        return (
          !this.formData.projectBusinessType ||
          !this.formData.projectForm ||
          !this.formData.projectCharacter ||
          !this.formData.projectBudget ||
          !this.formData.projectPeriod ||
          (this.formData.projectPeriod === "PPT_DIRECT_INPUT" &&
            !parseInt(this.formData.directPeriodInput)) ||
          !this.formData.selection ||
          !this.formData.contactProjectName ||
          !this.formData.contactContents ||
          !this.formData.contactClientName ||
          !this.formData.contactEmail ||
          !this.formData.contactClientCompanyName ||
          !this.formData.contactNumber ||
          !this.formData.privacy
        );
      }
    },
    watch: {
      GE_CONT_HEIGHT() {
        this.init();
      },
      "projectBusinessType.selected"(val) {
        this.formData.projectBusinessType = val.join("/");
      },
      "projectForm.selected"(val) {
        this.formData.projectForm = val.join("/");
      },
      "projectCharacter.selected"(val) {
        this.formData.projectCharacter = val.join("/");
      },
      "projectBudget.value"(val) {
        this.formData.projectBudget = val;
      },
      "projectPeriod.value"(val) {
        this.formData.projectPeriod = val;
        if (val === "PPT_DIRECT_INPUT") {
          setTimeout(() => {
            this.$refs.periodIpt.focus();
          }, 1);
        }
      },
      "selection.value"(val) {
        this.formData.selection = val;
      }
    },
    mounted() {
      this.init();
      this.code("BUSINESS_TYPE", this.projectBusinessType.list);
      this.code("PROJECT_FORM_TYPE", this.projectForm.list);
      this.code("PROJECT_CHARACTER_TYPE", this.projectCharacter.list);
      this.code("PROJECT_BUDGET_TYPE", this.projectBudget.options);
      this.code("PROJECT_PERIOD_TYPE", this.projectPeriod.options);
      this.code("SELECTION_TYPE", this.selection.list);
    },
    methods: {
      test(event) {
        if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8) {
          event.returnValue = false;
        }
      },

      fileSize(size) {
        let value = size / 1024 / 1024;
        let exp = -1;
        if (typeof exp === "undefined" || +exp === 0) {
          return Math.ceil(value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
          return NaN;
        }
        value = value.toString().split("e");
        value = Math.ceil(+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
        value = value.toString().split("e");
        return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
      },
      fileDelete(index) {
        this.uploadFiles.splice(index, 1);
      },
      fileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (this.uploadFiles.length + files.length > 2) {
          alert("RFP, 참고문서 등 2개까지 업로드 가능 합니다.");
          return;
        }
        files.forEach(el => {
          if (el.size <= 1024 * 1024 * 50) {
            this.uploadFiles.push(el);
          } else {
            alert("최대 50MB까지 업로드 가능 합니다.");
          }
        });
      },
      async uploadFile() {
        //await this.submit();
        this.formData.fileList = [];
        Promise.all(
          this.uploadFiles.map(async el => {
            try {
              const formData = new FormData();
              formData.append("files", el);
              const {
                data: {data: response}
              } = await apiFile("contact", formData);
              this.formData.fileList.push({
                contactFileName: response[0].originName,
                contactPhysicalFileName: response[0].physicalName
              });
            } catch (e) {
              console.log(e);
            }
          })
        )
          .then(() => {
            this.submit();
          })
          .catch(e => {
            console.log(e);
          });
      },
      async submit() {
        try {
          const {data: response} = await apiContact(this.formData);
          if (response.code === "SUCCESS") {
            await this.$refs.form.reset();
            alert("문의가 완료 되었습니다.");
            this.formData = {
              contactProjectName: "",
              contactClientCompanyName: "",
              contactClientName: "",
              contactEmail: "",
              contactNumber: "",
              url: "",
              projectBudget: "",
              projectPeriod: "",
              directPeriodInput: "0",
              selection: "",
              contactContents: "",
              projectBusinessType: "",
              projectForm: "",
              projectCharacter: "",
              privacy: false,
              fileList: []
            };
            this.projectBusinessType.selected = [];
            this.projectForm.selected = [];
            this.projectCharacter.selected = [];
            this.projectBudget.value = null;
            this.projectPeriod.value = null;
            this.selection.value = null;
            this.uploadFiles = [];
          } else {
            alert(response.message);
          }
        } catch (e) {
          alert(e.response.data.message);
        }
      },
      async code(code, targetData) {
        try {
          const {
            data: {data: response}
          } = await apiCode(code);
          response.forEach(el => {
            targetData.push({
              value: el.commonCode,
              label: el.commonCodeDescription
            });
          });
        } catch (e) {
          console.log(e);
          return [];
        }
      },
      txt(a, b, c) {
        if (typeof a === "string") {
          return a;
        } else {
          const val = a
            .map(el => {
              return b.filter(t => el === t.value)[0].label;
            })
            .join(", ");
          return a.length ? val : c;
        }
      },
      init() {
        this.scene?.destroy(true);
        const item = document.querySelector(".request-info");
        const inner = item.querySelector(".inner");
        const tween = TweenMax.to(inner, 1, {
          ease: Power0.easeInOut,
          y: item.clientHeight - inner.clientHeight
        });
        this.scene = this.$scrollmagic
          .scene({
            triggerElement: item,
            triggerHook: 0,
            duration: item.clientHeight - inner.clientHeight
          })
          .setTween(tween);
        this.$scrollmagic.addScene(this.scene);
      }
    },
    destroyed() {
      this.scene?.destroy(true);
    }
  };
</script>
<style lang="scss" scoped>
  .project-period {
    position: relative;
    margin-top: 28px;
    .form-select {
      margin-top: 0;
    }
    &-ipt {
      position: absolute;
      top: 1px;
      left: 1px;
      display: flex;
      align-items: center;
      height: calc(100% - 2px);
      width: calc(100% - 45px);
      input {
        flex: 1 1 auto;
        height: 100%;
        width: calc(100% - 80px);
        box-sizing: border-box;
        padding: 0 10px;
        border: none;
      }
      span {
        flex: 0 0 auto;
      }
    }
  }
  .textarea {
    margin-top: 30px;
    padding: 20px 30px 17px;
    border: 1px solid #ddd;
    textarea {
      width: 100%;
      resize: none;
      padding: 0;
      border: 0;
      outline: none;
      display: block;
    }
    .file-list {
      display: flex;
      margin-top: 30px;
      min-height: 50px;
      flex-wrap: wrap;
      li {
        flex: 0 0 auto;
        width: calc((100% - 2px) / 2);
        position: relative;
        box-sizing: border-box;
        padding: 16px 50px 16px 18px;
        line-height: 18px;
        font-size: 14px;
        color: #333;
        background: #f6f6f6;
        span {
          display: inline-block;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: top;
        }
        .del {
          position: absolute;
          top: 10px;
          right: 10px;
          height: 30px;
          width: 30px;
          text-indent: -9999px;
          //background: url("../../assets/images/btn_delete.png") no-repeat 50%;
        }
        &:nth-child(n + 3) {
          margin-top: 2px;
        }
        &:nth-child(2n) {
          margin-left: 2px;
        }
      }
      &.one-line {
        li {
          width: 100%;
          margin: 0;
        }
      }
    }
    .file-add {
      display: flex;
      margin-top: 18px;
      align-items: center;
      .file-btn {
        position: relative;
        overflow: hidden;
        display: inline-block;
        button {
          height: 38px;
          width: 89px;
          border-radius: 19px;
          border: none;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          background: #333;
        }
        input[type="file"] {
          z-index: 2;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
        }
      }
      .alert {
        position: relative;
        margin-left: 20px;
        padding-left: 25px;
        color: #888;
        line-height: 20px;
        font-size: 14px;
        &:after {
          content: "!";
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          font-size: 14px;
          font-family: "Gotham", sans-serif;
          line-height: 18px;
          color: #ddd;
          text-align: center;
          box-sizing: border-box;
          border-radius: 50%;
          border: 1px solid #ddd;
          background: #f9f9f9;
        }
      }
    }
  }

  .form-title {
    font-size: 44px;
    font-weight: bold;
    color: #000;
    letter-spacing: -0.03em;
  }

  fieldset {
    margin-top: 70px;
    legend {
      font-size: 24px;
      font-weight: bold;
      line-height: 40px;
      letter-spacing: -0.05em;
      span {
        display: inline-block;
        margin-left: 20px;
        vertical-align: top;
        font-size: 14px;
        font-weight: normal;
        color: #b4b4b4;
      }
    }
    .form-list {
      margin-top: 30px;
    }
  }

  .key-txt {
    margin-top: 200px;
    font-weight: bold;
    letter-spacing: -0.03em;
    font-size: 70px;
    line-height: 100px;
  }
  .key-sub-area {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    ul {
      li {
        a {
          position: relative;
          display: inline-block;
          vertical-align: top;
          font-family: "Noto Sans KR", sans-serif;
          color: #333;
          font-size: 18px;
          font-weight: bold;
          line-height: 30px;
          letter-spacing: -0.05em;
          /*border-bottom: 2px solid #333;*/
        }
        & + li {
          margin-top: 24px;
        }
        &.on {
          span {
            color: #eb1624;
            border-bottom-color: #eb1624;
            padding-right: 37px;
            &:after {
              content: "";
              position: absolute;
              bottom: -2px;
              right: 0;
              width: 16px;
              height: 16px;
              //background: url(../../assets/images/arrow_right_s.png) 0 0 no-repeat;
            }
          }
        }
      }
    }
    .company-info {
      position: absolute;
      top: -112px;
      right: 0;
      width: 328px;
      &:before {
        content: "";
        display: block;
        height: 38px;
        width: 30px;
        //background: url("../../assets/images/icon_address.png");
      }
      .add {
        display: block;
        margin-top: 24px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: -0.05em;
        & + .tel {
          margin-top: 9px;
        }
      }
      .tel {
        display: block;
        font-weight: bold;
        font-size: 20px;
        line-height: 26px;
      }
      .mail {
        display: block;
        margin: 0 0 0 -5px;
        padding: 5px;
        span {
          font-size: 14px;
          color: #333;
        }
      }
      .map {
        display: inline-block;
        margin-top: 15px;
        font-size: 18px;
        line-height: 30px;
        color: #333;
        font-weight: bold;
        letter-spacing: -0.05em;
        border-bottom: 2px solid #333;
        span {
        }
      }
    }
  }

  .request-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 221px;
    padding-bottom: 120px;
  }
  .request-form {
    flex: 1 1 776px;
    margin-right: 120px;
  }
  .request-info {
    width: 328px;
    .inner {
      width: 328px;
      padding: 48px 0;
      will-change: transform;
      font-weight: bold;
      font-size: 24px;
      line-height: 42px;
      color: #333;
      letter-spacing: -0.05em;
      word-break: keep-all;
      span {
        color: #b4b4b4;
        &.active {
          color: #f00;
        }
      }
      &:before {
        content: "";
        position: absolute;
        top: 14px;
        left: 0;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #f00;
      }
    }
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
  }

  .form-list.flex-box {
    margin: 30px 0 0 0;
    justify-content: space-between;
    li {
      flex: 0 358px;
      margin: 0;
      &:nth-child(n + 3) {
        margin-top: 19px;
      }
      &:last-child {
        flex: 0 100%;
      }
    }
  }
  .agree-btn-wrap {
    margin-top: 40px;
    input[type="checkbox"] {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      &:checked + label:before {
        //background: url("../../assets/images/check_btn_on.png") no-repeat 0 0/100%;
      }
    }
    label {
      position: relative;
      padding-left: 45px;
      color: #333;
      line-height: 25px;
      cursor: pointer;
      font-size: 18px;
      a {
        color: #ee2c3c;
        text-decoration: none;
        border-bottom: 1px solid #f00;
      }
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
        //background: url("../../assets/images/check_btn.png") no-repeat 0 0/100%;
      }
    }
  }
  .request-btn {
    margin-top: 115px;
    width: 100%;
    button {
      display: block;
      margin: 0 auto;
      width: 240px;
      height: 80px;
      background: #ee2c3c;
      border-radius: 40px;
      text-align: center;
      span {
        color: #fff;
        font-family: "Noto Sans KR", sans-serif;
        line-height: 35px;
        font-size: 30px;
        font-weight: bold;
      }
      &[disabled] {
        background: #ddd;
      }
    }
  }
</style>
