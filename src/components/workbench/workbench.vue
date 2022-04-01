<template>
  <div class="workbenchPage">
    <div class="workbench-1 w-100 flex">
      <div class="workbench-1-l flex-1 margin-r-10">
        <SchoolNotice></SchoolNotice>
      </div>
      <div class="workbench-1-r flex-1 margin-l-10">
        <LabBookState></LabBookState>
      </div>
    </div>
    <div class="workbench-2 w-100 margin-t-20 flex">
      <div class="workbench-2-l margin-r-10">
        <ToDoEvent></ToDoEvent>
      </div>
      <div class="workbench-2-r margin-l-10">
        <InfoStatistics></InfoStatistics>
      </div>
    </div>
  </div>
</template>

<script>
  import SchoolNotice from './pages/schoolNotice.vue';
  import LabBookState from './pages/labBookState.vue';
  import ToDoEvent from './pages/toDoEvent.vue';
  import InfoStatistics from './pages/infoStatistics.vue';
  export default {
    name: 'workbench',
    components: {
      SchoolNotice,
      LabBookState,
      ToDoEvent,
      InfoStatistics
    },
    created () {
    },
    methods: {
    }
  };
</script>
