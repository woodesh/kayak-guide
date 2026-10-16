export default {
  index: {
    title: "首页",
    display: "hidden",
    theme: {
      breadcrumb: false,
      footer: true,
      sidebar: true,
      toc: false,
      pagination: false,
    },
  },
  "404": {
    title: "404",
    display: "hidden",
    theme: {
      layout: "full",
      breadcrumb: false,
      footer: false,
      sidebar: false,
      toc: false,
      pagination: false,
      timestamp: false,
    },
  },
  "500": {
    title: "500",
    display: "hidden",
    theme: {
      layout: "full",
      breadcrumb: false,
      footer: false,
      sidebar: false,
      toc: false,
      pagination: false,
      timestamp: false,
    },
  },
  "--- START": {
    title: "快速上手",
    type: "separator",
  },
  start: {
    title: "快速上手",
    display: "children",
  },
  "+++ Workflows": {
    title: "",
    type: "separator",
  },
  "--- WORKFLOWS": {
    title: "办案全流程",
    type: "separator",
  },
  workflows: {
    title: "办案全流程",
    display: "children",
  },
  "+++ Recipes": {
    title: "",
    type: "separator",
  },
  "--- RECIPES": {
    title: "实战案例库",
    type: "separator",
  },
  recipes: {
    title: "实战案例库",
    display: "children",
  },
  "+++ Manual": {
    title: "",
    type: "separator",
  },
  "--- MANUAL": {
    title: "参考手册",
    type: "separator",
  },
  manual: {
    title: "参考手册",
    display: "children",
  },
};
