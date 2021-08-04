<template>
    <div>
        <b-form ref="form" @submit.prevent="onSubmit" @change="onChange">
            <h2 style="text-align: center; margin-bottom: 20px;">Форма заявки</h2>

            <b-form-group 
            label="Ваш филиал" 
            label-for="input-branch"
            >
                <b-form-select
                id='input-branch'
                v-model="city"
                :options="cities"
                required
                :disabled="cityDisabled"
                ></b-form-select>

                <b-form-checkbox 
                v-model="city" 
                value="Онлайн"
                @change="disableCity()"
                >Онлайн</b-form-checkbox>
            </b-form-group>

            <b-form-group 
            label="Тема обращения" 
            >
                <b-form-radio
                v-for="theme in problemThemes"
                :key="theme"
                v-model="problemTheme"
                :value="theme"
                name="theme"
                :required="themeRequired"
                >{{ theme }}</b-form-radio>

                <b-form-input
                v-model="problemTheme"
                placeholder="Задайте тему письма..."
                style="margin-top: 10px;"
                @change="requireTheme()"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Описание проблемы"
                label-for="input-text"
            >
                <b-form-textarea
                id="input-text"
                v-model="problemText"
                placeholder="Опишите вашу проблему..."
                rows="8"
                required
                ></b-form-textarea>
            </b-form-group>

            <b-form-group
                label="Загрузка документов"
                label-for="input-file"
            >
                <b-form-file
                    id="input-file"
                    v-model="file"
                    placeholder="Выберите файл либо перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
            </b-form-group>

            <b-button 
            type="submit" 
            variant="primary" 
            style="margin-bottom: 20px;"
            :disabled="!formValidity"
            >Отправить</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            city: "",
            cityDisabled: false,
            problemText: "",
            problemTheme: "",
            themeRequired: true,
            file: null,
            formValidity: false
        }
    },
    computed: {
        ...mapState([
                'cities',
                'problemThemes'
            ]),
    },
    methods: {
        onSubmit() {
            let data = {
                city: this.city,
                theme: this.problemTheme,
                text: this.problemText,
                file: this.file
            }

            this.$axios.post('send-form', data)
            .then(response => {
                if (response.data['success']) {
                    this.city = ""
                    this.problemTheme = ""
                    this.problemText = ""
                    this.file = null
                    this.cityDisabled = false
                    this.themeRequired = true

                    this.$router.push('/success')
                }
                else {
                    alert("Ошибка отправки заявки")
                }
            })
            .catch(error => {
                console.log(error)
                alert("Ошибка отправки заявки")
            })
        },
        onChange() {
            this.formValidity = this.$refs.form.checkValidity()
        },
        disableCity() {
            this.cityDisabled = !this.cityDisabled
        },
        requireTheme() {
            this.themeRequired = !this.themeRequired
        }
    },
    mounted() {
        this.$store.dispatch('loadCities')
    }
}
</script>