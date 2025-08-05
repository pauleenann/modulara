<script setup>
    const props = defineProps({
        measurements: Object
    })
</script>

<template>
    <div class="w-full pb-20 font-dm-sans">
        <h2 class="text-3xl lg:text-4xl font-dm-sans mb-5">Product Measurements</h2>

        <!-- features -->
        <table class="table-fixed w-full lg:w-150 mb-5 text-md lg:text-xl">
            <thead>
                <tr class="border-b border-gray-200 font-semibold">
                    <td class="py-2">Part</td>
                    <td class="py-2">Dimension</td>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-200">
                    <td class="py-2">Overall Width</td>
                    <td class="py-2">{{ props.measurements.overallWidth }}</td>
                </tr>

                <tr class="border-b border-gray-200">
                    <td class="py-2">Depth</td>
                    <td class="py-2">{{ props.measurements.depth }}</td>
                </tr>

                <tr class="border-b border-gray-200">
                    <td class="py-2">Height</td>
                    <td class="py-2">{{ props.measurements.height }}</td>
                </tr>

                <tr class="border-b border-gray-200">
                    <td class="py-2">Seat Height</td>
                    <td class="py-2">{{ props.measurements.seatHeight }}</td>
                </tr>

                <tr class="border-b border-gray-200">
                    <td class="py-2">Seat Depth</td>
                    <td class="py-2">{{ props.measurements.seatDepth }}</td>
                </tr>
                
                <tr class="border-b border-gray-200">
                    <td class="py-2">Arm Height</td>
                    <td class="py-2">{{ props.measurements.armHeight }}</td>
                </tr>

                <tr class="border-b border-gray-200">
                    <td class="py-2">Leg Height</td>
                    <td class="py-2">{{ props.measurements.legHeight }}</td>
                </tr>
            </tbody>
        </table>

        <i class="text-[var(--color-gray)]">Note: Minor variation may occur due to hand-assembly.</i>
    </div>
</template>