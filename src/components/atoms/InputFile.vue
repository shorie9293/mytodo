<template>
<table>
  <tr>
    <td>カスタム{{ index }}</td>
    <td>{{ filename }}</td>
    <td>
      <label for="file" class="filelabel">選択</label>
      <input type="file" name="filename" id="file" class="fileinput" @change="getFile">

      
    </td>
  </tr>

</table>

</template>

<script>
export default {
  props: {
    index: Number,
    filename: String
  },
  data: function(){
    return {
    }
  },
  methods: {
    getFile: function(e, index) {
      index = this.index
      this.$emit('get-file', [e, index])
    }
  }
}
</script>

<style scoped>
.filelabel{
    width: auto;
    margin: 5px 1px;
    background: hsl(0, 0%, 50%);
    color: white;
    padding: 5px 20px;
    border-radius: 4px;
    box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);
    transition: background 0.3s;
    cursor: pointer;
    user-select: none;
    margin-right: auto;
    margin-left: auto;
}
.filelabel:hover{
    background: hsl(0, 0%, 60%);

}

.fileinput{
  display: none;
}
</style>