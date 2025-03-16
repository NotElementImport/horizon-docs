import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Horizon Docs",
  base: '/horizon-docs/',
  description: "Horizon frameword",
  
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/introduction/overview' },
      { text: 'Guides', link: '/guides/base' },
    ],

    search: {
      provider: 'local',  // Можно использовать 'local' или 'algolia'
    },

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/docs/introduction/overview' },
          { text: 'Setup', link: "/docs/introduction/setup", items: [
            { text: "Vanilla",  link: "/docs/introduction/setup/vanilla" },
            { text: "Vite",  link: "/docs/introduction/setup/vite" },
            { text: "Vite + SSR",  link: "/docs/introduction/setup/vite-ssr" },
          ] },
          { text: 'First app', link: '/docs/introduction/first-app' },
        ]
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Creating Components', link: '/docs/components/basic-components' },
          { text: 'Inline Components', link: '/docs/components/inline-components' },
        ]
      },
      {
        text: 'Reactivity',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/docs/reactivity/overview' },
          { text: 'Signals (State)', link: '/docs/reactivity/state' },
          { text: 'Computed', link: '/docs/reactivity/computed' },
        ]
      },
      {
        text: 'Built-in tools',
        collapsed: false,
        items: [
          { text: 'I18N', link: '/docs/builtin/i18n' },
          { text: 'Fetching', link: '/docs/builtin/fetching' },
          { text: 'Debounce', link: '/docs/builtin/debounce' },
          { text: 'Transporter', link: '/docs/builtin/transporter' },
          { text: 'Friction (Abort Controller)', link: '/docs/builtin/friction' },
          { text: 'Trackable Async Function', link: '/docs/builtin/async-callback' },
          { text: 'Parallel (Threads)', link: '/docs/builtin/threads' },
          { text: 'Event Maps (Subscribes)', link: '/docs/builtin/event-map' },
          { text: 'Useful Composables', link: '/docs/builtin/usable-composables' },
        ]
      },
      {
        text: 'Server Side Rendering',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/docs/ssr/overview' },
          { text: 'Sync Signals', link: '/docs/ssr/sync-signals' },
          { text: 'Fetching', link: '/docs/ssr/fetching' },
        ]
      },
      {
        text: 'Guide book',
        collapsed: false,
        items: [
          { text: 'Base', link: '/guides/base' },
          { text: 'Modules', link: '/guide/CA' },
          { text: 'Working with Backend', link: '/guide/backend' },
          { text: 'Integrate Clean Architecture', link: '/guide/CA' },
          { text: 'Integrate I18n', link: '/guide/integrate-i18n' },
          { text: 'Integrate SEO', link: '/guide/integrate-i18n' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NotElementImport/horizon-core' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/horizon-core' },
    ]
  }
})
