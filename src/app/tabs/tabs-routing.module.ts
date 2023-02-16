import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AuthGuardService } from "../services/authguard/auth-guard.service";
let userlist = JSON.parse(localStorage.getItem("userlist"));
let newRoutes: any;
let router: Router;

const routes_management: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancedashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-notification-dashboard/maintenance-notification-dashboard.module"
              ).then((m) => m.MaintenanceNotificationDashboardPageModule),
          },
        ],
      },
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancedashboard",
        pathMatch: "full",
      },
    ],
  },
];

const routes_engineering: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancedashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-dashboard/maintenance-dashboard.module"
              ).then((m) => m.MaintenanceDashboardPageModule),
          },
        ],
      },
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancedashboard",
        pathMatch: "full",
      },
    ],
  },
];

const routes_foreman: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancedashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-dashboard/maintenance-dashboard.module"
              ).then((m) => m.MaintenanceDashboardPageModule),
          },
        ],
      },
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tabreport",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-report/maintenance-report.module"
              ).then((m) => m.MaintenanceReportPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancedashboard",
        pathMatch: "full",
      },
    ],
  },
];

const routes_fitter: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tabreport",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-report/maintenance-report.module"
              ).then((m) => m.MaintenanceReportPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancehome",
        pathMatch: "full",
      },
    ],
  },
];

const routes_chargeman: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tabreport",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-report/maintenance-report.module"
              ).then((m) => m.MaintenanceReportPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancehome",
        pathMatch: "full",
      },
    ],
  },
];

const routes_lab: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabmaintenancehome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/maintenance-home/maintenance-home.module"
              ).then((m) => m.MaintenanceHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabmaintenancehome",
        pathMatch: "full",
      },
    ],
  },
];

const routes_production: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabsupervisordashboard",
        children: [
          {
            /*path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-dashboard/production-dashboard.module"
              ).then((m) => m.ProductionDashboardPageModule),*/

            path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-dashboard-dynamic/production-dashboard-dynamic.module"
              ).then((m) => m.ProductionDashboardDynamicPageModule),
          },
        ],
      },
      {
        path: "tabsupervisorhome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-home/production-home.module"
              ).then((m) => m.ProductionHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
            //loadChildren: () => import("../phonecall/call/call.module").then((m) => m.CallPageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabsupervisordashboard",
        pathMatch: "full",
      },
    ],
  },
];

const routes_sterilizerpress: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabsupervisordashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-sterilizerpress-dashboard/production-sterilizerpress-dashboard.module"
              ).then((m) => m.ProductionSterilizerpressDashboardPageModule),
          },
        ],
      },
      {
        path: "tabsupervisorhome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-sterilizerpress-home/production-sterilizerpress-home.module"
              ).then((m) => m.ProductionSterilizerpressHomePageModule),
          },
        ],
      },
      {
        path: "tabqrcodescanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../scanner-module/qrcodescanner/qrcodescanner.module"
              ).then((m) => m.QrcodescannerPageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabsupervisordashboard",
        pathMatch: "full",
      },
    ],
  },
];

//console.log(userlist);

if (userlist) {
  if (userlist.dept_id) {
    if (userlist.dept_id == 2) {
      newRoutes = routes_lab;
    } else if (userlist.dept_id == 4) {
      if (userlist.desigId == 2) {
        newRoutes = routes_engineering;
      } else if (userlist.desigId == 7 || userlist.desigId == 8) {
        newRoutes = routes_sterilizerpress;
      } else {
        newRoutes = routes_production;
      }
    } else if (userlist.dept_id == 7) {
      if (userlist.desigId == 2) {
        newRoutes = routes_engineering;
      } else if (userlist.desigId == 4) {
        newRoutes = routes_foreman;
      } else if (userlist.desigId == 5) {
        newRoutes = routes_fitter;
      } else if (userlist.desigId == 6) {
        newRoutes = routes_chargeman;
      } else {
        newRoutes = routes_engineering;
      }
    } else if (userlist.dept_id == 25) {
      newRoutes = routes_management;
    } else {
      localStorage.clear();
      router.navigateByUrl("/login");
    }
  } else {
    localStorage.clear();
    router.navigateByUrl("/login");
  }
} else {
  newRoutes = routes_engineering;
}

@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
