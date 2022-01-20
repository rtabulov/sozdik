<script lang="ts" setup>
import GithubIcon from '../assets/logo--github.svg?component';
import SettingsIcon from '../assets/settings.svg?component';
import StatsIcon from '../assets/chart--column.svg?component';
</script>

<template>
  <header
    class="flex items-center flex-shrink-0 justify-between py-2 border-b-1 border-dark-50 relative"
  >
    <h1
      class="absolute inset-0 text-center uppercase font-bold text-4xl tracking-0.2em"
    >
      sözdik
    </h1>

    <div class="relative text-gray-200 leading-none flex items-center gap-4">
      <a
        href="https://github.com/rtabulov/sozdik"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon width="24" height="24" />
      </a>
      <!-- <button>
        <HelpIcon width="24" height="24" />
      </button> -->
    </div>

    <div
      class="relative text-gray-200 leading-none flex items-center gap-4 invisible"
    >
      <button>
        <StatsIcon width="30" height="24" />
      </button>
      <button>
        <SettingsIcon width="24" height="24" />
      </button>
    </div>
  </header>
</template>
