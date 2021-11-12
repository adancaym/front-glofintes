<template>
  <b-form v-if="object !== null" >
    <b-card class="mb-2">
      <template v-for="field in getFields">
        <template v-if="field.type">
          <template v-if="field.type === 'string'">
            <b-form-group :label="field.label">
              <b-form-input v-model="object[field.key]"></b-form-input>
            </b-form-group>
          </template>
          <template v-else-if="field.type === 'number'">
            <b-form-group :label="field.label">
              <b-form-input type="number" v-model="object[field.key]"></b-form-input>
            </b-form-group>
          </template>
          <template v-else-if="field.type === 'email'">
            <b-form-group :label="field.label">
              <b-form-input type="email" v-model="object[field.key]"></b-form-input>
            </b-form-group>
          </template>
          <template v-else-if="field.type === 'select'">
            <SelectEsteroides :field="field" v-model="object[field.key]"/>
          </template>
          <template v-else-if="field.type === 'icon'">
            <IconEsteroides :field="field" v-model="object[field.key]"/>
          </template>
          <template v-else-if="field.type === 'color'">
            <ColorEsteroides :field="field" v-model="object[field.key]"/>
          </template>
          <template v-else-if="field.type === 'checkboxes'">
            <CheckboxesEsteroides :field="field" v-model="object[field.key]"/>
          </template>
          <template v-else-if="field.type === 'checkbox'">
            <CheckboxEsteroides :field="field" v-model="object[field.key]"/>
          </template>
          <template v-else-if="field.type === 'create'">
            <CreateEsteroides :ref="field.key" v-model="object[field.key]" :field="field"/>
          </template>
          <template v-else-if="field.type === 'date'">
            <b-form-group :label="field.label">
              <b-form-datepicker v-model="object[field.key]" :field="field"/>
            </b-form-group>
          </template>
          <template v-else-if="field.type === 'images'">
            <FileImageEsteroides :field="field" v-model="object[field.key]"></FileImageEsteroides>
          </template>
          <template v-else>
            <b-alert variant="info" show> Tipo no definido <b>{{ field.key }}</b></b-alert>
          </template>
        </template>
        <template v-else>
          <b-alert variant="info" class="text-center" show> No se ha definido el tipo en el servicio en el campo: <b>{{ field.key }}</b></b-alert>
        </template>
      </template>

    </b-card>
    <b-form-group v-if="showBtnSave === true" >
      <b-button variant="primary" class="float-right mt-3" @click="guardar">Guardar</b-button>
    </b-form-group>
  </b-form>


</template>

<script>
import SelectEsteroides from "./SelectEsteroides";
import CheckboxesEsteroides from "./CheckboxesEsteroides";
import CheckboxEsteroides from "./CheckboxEsteroides";
import IconEsteroides from "./IconEsteroides";
import ColorEsteroides from "./ColorEsteroides";
import CreateEsteroides from "./CreateEsteroides";
import FileImageEsteroides from "./FileImageEsteroides";

export default {
  name: "FormEsteroides",
  components: {
    FileImageEsteroides,
    CreateEsteroides,
    ColorEsteroides, IconEsteroides, CheckboxEsteroides, CheckboxesEsteroides, SelectEsteroides
  },
  props: {
    value: String,
    service: Object,
    showBtnSave: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    object: null
  }),
  methods: {
    async guardar() {
      for (let field of this.service.fields) {
        if (field.type === 'create') {
          await this.$refs[field.key][0].save();
        }
      }
      return this.service.save(this.object).then((object) => {
        if (this.showBtnSave === true) this.$root.$emit('refresh');
        this.$emit('input', object.id);
        return object.id;
      });
    }
  },
  computed: {
    getFields() {
      return this.service.fields.filter(f => f.type !== 'none')
    }
  },
  mounted() {
    if (this.value) {
      this.service.one(this.value).then((object) => {
        this.object = object;
      });
    } else {
      this.object = {};
    }
  }
}
</script>

<style scoped>

</style>