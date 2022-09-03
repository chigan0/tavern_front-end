<template>
  <div class="file">
    <div class="add_file">
      <label>Картинка Продукта (Не более 1 файла)</label>
      <div class="large-12 medium-12 small-12 cell" style="padding: 15px 0 15px 0;">
          <input type="file" id="files" ref="files" :multiple="!only_one" v-on:change="handleFilesUpload()"/>

      </div>
      <div class="large-12 medium-12 small-12 cell">
        <div v-for="(file, key) in files" v-bind:key="file.id" class="file-listing">{{ file.name }}
          <a href="#"><span class="remove-file" style="color: red;" v-on:click="removeFile(key)">Удалить</span></a>
      </div>
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    only_one: Boolean,
    only_img: Boolean,
  },
  data(){
    return{
      img_format: ["jpg", "jpeg", 'png', 'raw', 'tiff', 'jp2'],
      files:[],
      }
    },
  methods:{
    addFiles(){
      this.$refs.files.click();
    },
    removeFile(key){
      let file_name = this.files[key].name
      this.files.splice( key, 1 );
      this.$refs.files.value = ""
      this.$emit('delFiles',{
        'file_name': file_name,
        'file_key': key
      })
    },
    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;

        for( var i = 0; i < uploadedFiles.length; i++ ){
          let file_type = uploadedFiles[i].name.split(".").slice(-1);
          if (this.only_img){
            if (this.img_format.indexOf(file_type[0]) === -1){
              this.$refs.files.value = ""
              continue
            }
          }
          if (this.only_one){
            this.files = [];
            this.files.push(uploadedFiles[i]);
            break;
          }
          this.files.push(uploadedFiles[i]);
        }
        this.$emit('getFiles',{
          'files': this.files
        })
    },
  },
}
</script>

<style>

</style>
