import {defineStore} from "pinia";
import {ref} from "vue";

interface IPopupStore {
    createLessonPopup: boolean
    updateLessonPopup: boolean
    rangeLessonsPopup: boolean
    loaderPopup: boolean
}

export const usePopupStore = defineStore('popup', () => {
    const createLessonPopup = ref(false)
    const updateLessonPopup = ref(false)
    const rangeLessonsPopup = ref(false)
    const loaderPopup = ref(false)


    return {
        createLessonPopup,
        updateLessonPopup,
        rangeLessonsPopup,
        loaderPopup
    }
}) as () => IPopupStore
