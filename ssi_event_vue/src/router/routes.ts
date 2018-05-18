import { Route } from 'vue-router';

export default [
  {
    path: "/",
    component: () => import("layouts/default.vue"),
    children: [
      {
        path: "", component: () => import("pages/Home.vue")
      },
      {
        name: "hello",
        path: "/hello/:name/:initialEnthusiasm",
        component: () => import("pages/Hello.vue"),
        props: function (route: Route) {
          return {
            name: route.params.name,
            initialEnthusiasm: parseInt(route.params.initialEnthusiasm)
          }
        }
      },
      {
        name: "home",
        path: "/home",
        component: () => import("pages/Home.vue")
      }
    ]
  },
  {
    path: "/events",
    component: () => import("layouts/default.vue"),
    children: [
      {
        path: "search",
        component: () => import("components/events/Search.vue")
      },
      {
        path: "import",
        component: () => import("components/events/Events.vue")
      },
      {
        path: "export",
        component: () => import("components/events/Events.vue")
      }
    ]
  },

  { // Always leave this as last one
    path: "*",
    component: () => import("pages/404.vue")
  }
]
