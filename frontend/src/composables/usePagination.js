import { computed, ref } from "vue";

export const usePagination = (items = ref([]), itemsToShow = 10)=>{
    const totalPage = computed(() => Math.ceil(items.value.length / itemsToShow));
    let currentPage = ref(1);
    let start = ref(0);
    let end = computed(()=>start.value+itemsToShow)

    // filtered data
    const filtered = computed(()=>{
        if(!Array.isArray(items.value)) return []
    
        return items.value.slice(start.value, end.value)
    })
    

    // next function
    const next = ()=>{
        if(currentPage.value<totalPage.value){
            start.value = (start.value + itemsToShow)-1;
            currentPage.value++
        }
    }

    // prev function
    const prev = ()=>{
        if(currentPage.value>1){
            start.value = (itemsToShow - start.value)-1;
            currentPage.value--
        }
        
    }

    return {
        totalPage,
        currentPage,
        filtered,
        next,
        prev
    }
}