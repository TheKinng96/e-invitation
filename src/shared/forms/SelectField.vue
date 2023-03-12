<script lang="ts" setup>
import { IIcon } from '@/_types/component.type';
import { ref } from 'vue';

export interface ISelectOption {
  icon?: IIcon;
  label: string;
  value: string;
}

const emit = defineEmits(['onChanged']);
const props = defineProps<{
  options: Array<ISelectOption>;
  selected: ISelectOption;
}>();
const currentOption = ref(props.selected);
const isSelectOpened = ref(false);

const onChanged = () => {
  isSelectOpened.value = false;
  emit('onChanged', currentOption.value);
};

const openSelect = () => {
  if (isSelectOpened.value) {
    isSelectOpened.value = false;
    return;
  }

  isSelectOpened.value = true;
};
</script>

<template>
  <div class="select-container">
    <select
      @change="onChanged"
      v-model="currentOption"
      @click="openSelect()"
      :class="{ 'has-icon': currentOption.icon }"
    >
      <option v-for="option in props.options" :value="option">
        {{ option.label }}
      </option>
    </select>
    <Transition>
      <Icon
        v-if="currentOption.icon"
        :icon="currentOption.icon.icon"
        :type="currentOption.icon.type ?? 'grey'"
        class="select-icon"
      />
    </Transition>
    <Icon
      src="common"
      :icon="isSelectOpened ? 'chevron-up' : 'chevron-down'"
      class="icon-down"
      type="neutral"
    />
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.select-container {
  position: relative;

  select {
    width: 100%;
    cursor: pointer;
    border: 1px solid $color-neutral-200;
    border-radius: 4px;
    padding: 0.5rem;
    color: $color-neutral-500;
    padding-left: 1rem;

    &.has-icon {
      padding-left: 2rem;
    }
  }

  .select-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.5rem;
    pointer-events: none;
  }

  .icon-down {
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    pointer-events: none;
  }
}
</style>
