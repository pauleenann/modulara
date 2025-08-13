<script setup>
    import { footerProducts } from '@/constants/constants';
    import { footerCompany } from '@/constants/constants';
    import { footerSupport } from '@/constants/constants';
</script>

<template>
    <footer class="bg-white h-75 font-dm-sans overflow-y-hidden">
        <div class="w-5/6  m-auto grid lg:grid-cols-[400px_1fr_1fr_1fr_1fr] gap-8 lg:gap-0">
            <!-- logo and tagline -->
            <div class="footer-gap">
                <h3 class="text-3xl font-kulim-park font-semibold">Modulara</h3>
                <p class="font-semibold text-[var(--color-light-gray)]">Shape your space. Your way.</p>
            </div>

            <!-- products -->
            <div>
                <p class="footer-header">Products</p>
                <ul class="footer-list">
                    <li v-for="(product,index) in footerProducts" :key="index">
                        {{ product.name }}
                    </li>
                </ul>
            </div>

            <!-- company -->
            <div>
                <p class="footer-header">Company</p>
                <ul class="footer-list">
                    <li v-for="(company,index) in footerCompany" :key="index">
                        {{ company.name }}
                    </li>
                </ul>
            </div>

            <!-- support -->
            <div>
                <p class="footer-header">Support</p>
                <ul class="footer-list">
                    <li v-for="(support,index) in footerSupport" :key="index">
                        {{ support.name }}
                    </li>
                </ul>
            </div>

            <!-- get in touch -->
            <div>
                <p class="footer-header">Get in touch</p>
                <ul class="footer-list">
                    <li>Questions or feedback?</li>
                    <li>We’d love to hear from you</li>
                </ul>

                <!-- icons -->
                <div class="flex items-center gap-4 text-3xl mt-5 text-[var(--color-gray)]">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                </div>
            </div>
            
        </div>

        <hr class="w-5/6 m-auto mt-20 mb-4 text-[#d9d9d9]">

        <div class="text-center">
           <span class="font-semibold text-[var(--color-light-gray)]">@2025 Modulara. All rights reserved</span> 
        </div>
    </footer>
</template>