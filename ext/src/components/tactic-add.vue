<template lang="pug">
	.tactic-add-wr
		.tactic-add-top-actions
			.tactic-add-top-actions__left
				field(v-model="newTactic[currentMode].name", label="Название", placeholder="Насос бабла")
			.tactic-add-top-actions__right
				dropdown(:list="rouletteModesList", v-model="currentMode", label="Режим")

		.tactic-add-header
			|Параметры этапа

		form(@submit.prevent="addNewStage", @keyup.enter="addNewStage")
			.etap-form-wr(v-if="!load", :class="{'etap-form-load': load}")
				.etap-form__item(v-for="(field, index) in modeFields[currentModeId]")
					field(v-if="field.component == 'field'",
						v-model.trim="currentModeScheme[currentMode][field.model]",
						:name="field.name" :label="field.name",
						:placeholder="field.placeholder"
						v-validate="'required'",
						:error="errors.first(field.name)")

					dropdown(v-if="field.component == 'dropdown'", :ref="field.model" :list="field.dropDownList", v-model="currentModeScheme[currentMode][field.model]", :label="field.name")

		.etap-form-actions(v-if="!editingStage && !load")
				button.btn.btn_red.etap-form-actions__clear(@click="clearForm", :disabled="!formNotClear")
					|Очистить

				button.btn.etap-form-actions__add(@click="addNewStage", :disabled="isFormInValid")
					|Добавить этап

		.etap-form-actions(v-else-if="editingStage")
			button.btn.btn_skin.etap-form-actions__clear(@click="clearForm", :disabled="!formNotClear")
				|Отменить

			button.btn.etap-form-actions__add(@click="saveStage", :disabled="isFormInValid")
				|Сохранить

		transition(name="slide-up")
			tactcViewer(v-if="currentTacticStagesLength", :tactic="newTactic[currentMode]", @remove="removeStage", @edit="editStage", :stagesLength="currentTacticStagesLength", @tacticSaved="tacticSaved")

</template>
<script>
import field from '@/components/input.vue';
import dropdown from '@/components/drop-down.vue';
import tactcViewer from '@/components/tactic-viewer.vue';

export default {
	name: 'tacticAdd',
	components: {
		field,
		dropdown,
		tactcViewer
	},
	data: () => ({
		editingStage: false,
		editingStageIndex: false,
		newTactic: {},
		tacticSchema: {
			name: '',
			mode: '',
			labels: {},
			stages: [],
		},
		labels: {},
		modeFields: [],
		currentMode: '',
		currentModeScheme: {},
		clearChema: {},
		rouletteModesList: [],
		rouletteModes: {},
		load: false,
		currentTacticStagesLength: 0,
	}),
	computed: {
		roulette () {
			return this.$store.state.currentRoulette;
		},
		currentModeId () {
			return this.rouletteModes[this.currentMode];
		},
		formNotClear () {
			return Object.keys(this.fields).some(key => this.fields[key].valid);
		},
		isFormInValid () {
			return Object.keys(this.fields).some(key => { return this.fields[key].invalid || this.fields[key].invalid == null});
		},
	},
	watch: {
		currentMode () {
			this.getModeScheme();
		},
		newTactic: {
			deep: true,
			handler (val) {
				this.currentTacticStagesLength = val[this.currentMode].stages.length;
			}
		}
	},
	methods: {
		getModeScheme () {
			// this.$set(this.newTactic, this.currentMode, {...this.tacticSchema, stages: []});
			// this.newTactic[this.currentMode].mode = this.currentMode;

			// if(typeof this.clearChema[this.currentMode] != 'undefined')
			// 	return false;

			// this.load = true;
			// this.axios.get('/modes/' + this.currentModeId).then((res) => {
			// 	this.modeFields[this.currentModeId] = res.data.data.fields;
			// 	console.log(this.modeFields);

			// 	let schema = {};
			// 	let labels = {};
			// 	for (let field of res.data.data.fields) {
			// 		schema[field.model] = '';
			// 		labels[field.model] = field.name;
			// 	}

			// 	this.$set(this.currentModeScheme, this.currentMode, schema);
			// 	this.$set(this.labels, this.currentMode, labels);
			// 	this.clearChema[this.currentMode] = Object.assign({}, this.currentModeScheme[this.currentMode], schema);
			// 	this.load = false;
			// }).catch((err) => {
			// 	this.load = false;
			// })
		},
		addNewStage () {
			this.$validator.validate().then(valid => {
				if (valid) {
					if(!this.newTactic[this.currentMode].stages.length) {
						this.newTactic[this.currentMode].labels = {...this.labels[this.currentMode]};
					}
					this.newTactic[this.currentMode].stages.push({ ...this.currentModeScheme[this.currentMode] });
					this.clearForm();
				}
			});
		},
		removeStage (index) {
			this.newTactic[this.currentMode].stages.splice(index, 1);
		},
		editStage (index) {
			// this.editingStage = true;
			// this.currentModeScheme[this.currentMode] = this.newTactic[this.currentMode].stages[index];
			// this.editingStageIndex = index;

			// this.$nextTick().then(() => {
			// 	this.$validator.validate();
			// });
		},
		saveStage () {
			// this.newTactic[this.currentMode].stages[this.editingStageIndex] = {...this.currentModeScheme[this.currentMode]};
			// this.editingStage = false;
			// this.editingStageIndex = false;
			// this.clearForm();
		},
		clearForm () {
			// const mode = this.currentMode;
			// this.currentModeScheme[mode] = Object.assign({}, this.currentModeScheme[mode], this.clearChema[mode]);
			// this.$validator.reset();
			// this.errors.clear();
		},
		tacticSaved (saveResult)
		{
			// if(!saveResult) return false;

			// this.$set(this.newTactic, this.currentMode, {...this.tacticSchema, stages: []});
			// this.editingStage = false;
			// this.editingStageIndex = false;
			// this.$store.dispatch('getUserSavedTactics');
			// this.clearForm();
		}
	},
	created: function (params) {
		// for(const func of this.roulette.gameFunctionForMode) {
		// 	this.rouletteModesList.push(func.mode.name)
		// 	this.rouletteModes[func.mode.name] = func.mode._id;
		// }

		// this.currentMode = this.roulette.gameFunctionForMode[0].mode.name;

		// this.$set(this.newTactic, this.currentMode, {...this.tacticSchema, stages: []});
		// this.newTactic[this.currentMode].mode = this.currentMode;
	}
}
</script>
<style lang="scss">
.slide-up-enter-active, .slide-up-leave-active
{
	transition: all 0.3s;
	transform: translateY(-34px);
}
.slide-up-enter, .slide-up-leave-to
{
	transform: translateY(0);
}
.tactic-add-wr
{
	padding-bottom: 70px;
}
.tactic-add-top-actions
{
	padding-top: 22px;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 25px;
	display: flex;
	justify-content: space-between;
}
.tactic-add-top-actions__left
{
	flex: 1;
	margin-right: 20px;
}
.tactic-add-header
{
	padding-left: 10px;
	padding-right: 10px;
	font-size: 18px;
	color: $main;
}
.etap-form-wr
{
	padding-top: 20px;
	margin-left: 10px;
	margin-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 18px;
	transition: 0.2s;
	min-height: 100px;
	&:last-child
	{
		margin-bottom: 0;
	}
}
.etap-form-load
{
	background-color: purple;
}
.etap-form__item
{
	flex-basis: 45%;
	margin-bottom: 25px;
}
.etap-form-actions
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10px;
	padding-right: 10px;
	// padding-bottom: 40px;
}
.btn.etap-form-actions__clear
{
	padding-left: 10px;
	padding-right: 10px;
	min-width: 120px;
}
.etap-form-actions__add
{
	flex: 1;
	margin-left: 20px;
}
</style>
