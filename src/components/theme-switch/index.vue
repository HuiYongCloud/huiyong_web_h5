<template>
    <div class="theme-toggle flex-center-center" title="主题模式">
        <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask class="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g class="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
        </svg>
    </div>
</template>

<style scoped lang="scss">
@import "./sun-and-moon.scss";

.theme-toggle {
  --el-color-warning:#e6a23c;
  --size: 16px;
  --icon-fill:var(--el-color-warning);
  --icon-fill-hover:var(--el-color-warning);

  background: none;
  border: none;
  padding: 0;

  inline-size: var(--size);
  block-size: var(--size);
  aspect-ratio: 1;
  border-radius: 50%;

  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  outline-offset: 5px;

  & > svg {
    inline-size: 100%;
    block-size: 100%;
    stroke-linecap: round;
    font-size: 10px;
  }
}

[data-theme='dark'] {
  .theme-toggle {
    --icon-fill: hsl(210 10% 70%);
    --icon-fill-hover: hsl(210 15% 90%);
  }
}
</style>