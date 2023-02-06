let handleOutsideClick: any;

const outsideClick = {
  mounted(el: any, binding: any, vnode: any) {
    handleOutsideClick = (e: any) => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;

      if (exclude.length > 0) {
        exclude.forEach((refName: string) => {
          if (!clickedOnExcludedEl) {
            const excludedEl = (vnode.context as any).$refs[refName];
            clickedOnExcludedEl = excludedEl.contains(e.target);
          }
        });
      }

      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        (vnode.context as any)[handler]();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },

  unbind() {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  },
};

export { outsideClick };
