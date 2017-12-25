const ERR_required = 'Поле обязательно для заполнения'

/*
* Верификации являются чистыми функциями, которые получают state и props из обвернутого в FormInput компонента
* Функция должна возвращать объект описывающий результат проверки {hasMistake: Boolean, mes: String}
* Это следует декларативному подходу, наподобие работы с Action Creators в redux
* */


/*
* Обычная проверка на обязательность может выглядить так
* */
export function defVerification(state, props) {
    const isEmptyValue = !state.value

    if (props.required && isEmptyValue) {
        return {
            hasMistake: true,
            mes: ERR_required
        }
    }

    return {
        hasMistake: false,
        mes: ''
    }
}

/*
 * Для составных значений инпута, например как в SelectType {value: 1, label: '1'}
 * провкрка на обязательность может выглядить так
 * */
export function selectTypeVerification(state, required) {
    const value = state.state
    const isEmptyValue = !value || value.value === null

    if (required && isEmptyValue) {
        return {
            hasMistake: true,
            mes: ERR_required
        }
    }

    return {
        hasMistake: false,
        mes: ''
    }
}