<template lang="pug">
div
  form
    .grid(class='xl:grid-cols-2 xl:gap-6')
      .relative.z-0.w-full.mb-6.group
        input#floating_first_name.block.px-0.w-full.text-sm.text-gray-900.bg-transparent.border-0.border-b-2.border-gray-300.appearance-none.peer(type='text' name='floating_first_name' class='py-2.5 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-700' placeholder=' ' required='')
        label.absolute.text-sm.text-gray-500.duration-300.transform.-translate-y-6.scale-75.top-3.-z-10(for='floating_first_name' class='peer-focus:font-medium dark:text-gray-400 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6') Vorname
      .relative.z-0.w-full.mb-6.group
        input#floating_last_name.block.px-0.w-full.text-sm.text-gray-900.bg-transparent.border-0.border-b-2.border-gray-300.appearance-none.peer(type='text' name='floating_last_name' class='py-2.5 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-700' placeholder=' ' required='')
        label.absolute.text-sm.text-gray-500.duration-300.transform.-translate-y-6.scale-75.top-3.-z-10(for='floating_last_name' class='peer-focus:font-medium dark:text-gray-400 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6') Nachname
    .relative.z-0.w-full.mb-6.group
      input.block.px-0.w-full.text-sm.text-gray-900.bg-transparent.border-0.border-b-2.border-gray-300.appearance-none.peer(type='email' name='floating_email' class='py-2.5 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-700' placeholder=' ' required='')
      label.absolute.text-sm.text-gray-500.duration-300.transform.-translate-y-6.scale-75.top-3.-z-10(for='floating_email' class='peer-focus:font-medium dark:text-gray-400 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6') E-Mail
    
    .grid(class='xl:grid-cols-2 xl:gap-6')
      .relative.z-0.w-full.mb-6.group
        input#floating_phone.block.px-0.w-full.text-sm.text-gray-900.bg-transparent.border-0.border-b-2.border-gray-300.appearance-none.peer(type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' name='floating_phone' class='py-2.5 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-700' placeholder=' ' required='')
        label.absolute.text-sm.text-gray-500.duration-300.transform.-translate-y-6.scale-75.top-3.-z-10(for='floating_phone' class='peer-focus:font-medium dark:text-gray-400 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6') Telefonnummer (0123/1234567)
      .relative.z-0.w-full.mb-6.group
        input#floating_company.block.px-0.w-full.text-sm.text-gray-900.bg-transparent.border-0.border-b-2.border-gray-300.appearance-none.peer(type='text' name='floating_company' class='py-2.5 dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-700' placeholder=' ' required='')
        label.absolute.text-sm.text-gray-500.duration-300.transform.-translate-y-6.scale-75.top-3.-z-10(for='floating_company' class='peer-focus:font-medium dark:text-gray-400 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6') kfdsaj
    
    fieldset
      legend.sr-only Checkbox variants
      .flex.items-center.mb-4
        input#checkbox-1.w-4.h-4.text-blue-600.bg-gray-100.border-gray-300.rounded(checked='' type='checkbox' value='' class='focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600')
        label.ml-2.text-sm.font-medium.text-gray-900(for='checkbox-1' class='dark:text-gray-300')
          | I agree to the 
          a.text-blue-600(href='#' class='hover:underline dark:text-blue-500') terms and conditions
          | .    
    button.text-white.bg-black.font-medium.rounded-lg.text-sm.w-full.px-5.text-center(type='submit' class='hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 sm:w-auto py-2.5 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800') Absenden

</template>

<script>
//import Trash from "~/components/icons/trash.vue"

export default {
  data() {
    return {
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
  components : {
  }
}
</script>