// composables/useSharedState.js
import { ref } from 'vue'


const sharedUserId = ref()
export const useSharedState = () => {
    const setSharedValue = (newValue:any) => {
        sharedUserId.value = newValue
    }

    return {
        sharedUserId,
        setSharedValue
    }
}
