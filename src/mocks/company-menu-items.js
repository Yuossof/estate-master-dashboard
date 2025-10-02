// const addIcon = "material-symbols:add"

// export const companyMenuItems = [
//   {
//     isHeadr: true,
//     title: "Dashboard",
//   },
//   {
//     title: "Dashboard",
//     icon: "lucide:layout-dashboard",
//     isHide: true,
//     link: "dashboard"
//   },

//   {
//     isHeadr: true,
//     title: "Users"
//   },

//   {
//     title: "Users",
//     isHide: true,
//     icon: "mdi:account-multiple",
//     link: "users",
//   },

//   {
//     title: "Create User",
//     isHide: true,
//     icon: "mdi:account-multiple-plus",
//     link: "company-users/create",
//   },

//   {
//     isHeadr: true,
//     title: "Company Users"
//   },

//   {
//     title: "Company Users",
//     isHide: true,
//     icon: "mdi:account-multiple",
//     link: "company-users",
//   },

//   {
//     isHeadr: true,
//     title: "Service Categories"
//   },

//   {
//     title: "Service Categories",
//     isHide: true,
//     icon: "lucide:folder-tree",
//     link: "service-categories",
//   },

//   {
//     title: "Add Service Category",
//     isHide: true,
//     icon: addIcon,
//     link: "service-categories/create",
//   },


//   {
//     isHeadr: true,
//     title: "Projects"
//   },

//   {
//     title: "All Projects",
//     isHide: true,
//     icon: "mdi:folder-open",
//     link: "projects",
//   },

//   {
//     title: "Create Project",
//     isHide: true,
//     icon: "mdi:folder-plus",
//     link: "projects/create",
//   },

//   {
//     title: "All Units",
//     isHide: true,
//     icon: "mdi:puzzle",
//     link: "units",
//   },

//   {
//     title: "Create a project unit",
//     isHide: true,
//     icon: "mdi:puzzle-plus",
//     link: "units/create",
//   },

//   {
//     isHeadr: true,
//     title: "Points"
//   },

//   {
//     title: "All Point Users",
//     isHide: true,
//     icon: "lucide:bolt",
//     link: "points",
//   },


// ];


export const companyMenuItems = [
  {
    title: "Dashboard",
    icon: "lucide:layout-dashboard",
    child: [
      { 
        childtitle: "Dashboard", 
        childlink: "dashboard",
        icon: "lucide:layout-dashboard"
      }
    ]
  },
  {
    title: "Users",
    icon: "mdi:account-multiple",
    child: [
      { 
        childtitle: "All Users", 
        childlink: "users",
        icon: "mdi:account-multiple"
      },
      { 
        childtitle: "Create User", 
        childlink: "company-users/create",
        icon: "mdi:account-multiple-plus"
      }
    ]
  },
  {
    title: "Projects",
    icon: "mdi:folder-open",
    child: [
      { 
        childtitle: "All Projects", 
        childlink: "projects",
        icon: "mdi:folder-open"
      },
      { 
        childtitle: "Create Project", 
        childlink: "projects/create",
        icon: "mdi:folder-plus"
      },
      { 
        childtitle: "All Units", 
        childlink: "units",
        icon: "mdi:puzzle"
      },
      { 
        childtitle: "Create a project unit", 
        childlink: "units/create",
        icon: "mdi:puzzle-plus"
      }
    ]
  },
  {
    title: "Points",
    icon: "lucide:bolt",
    child: [
      { 
        childtitle: "All Point Users", 
        childlink: "points",
        icon: "lucide:bolt"
      }
    ]
  }
];