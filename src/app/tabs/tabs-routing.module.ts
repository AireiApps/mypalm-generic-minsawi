import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AuthGuardService } from "../services/authguard/auth-guard.service";
let userlist = JSON.parse(localStorage.getItem("userlist"));
let newRoutes: any;
let router: Router;

//FFB Supplier
const routes_ffbsupplier: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabffbhome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ffb-module/ffb-home/ffb-home.module").then(
                (m) => m.FfbHomePageModule
              ),
          },
        ],
      },
      {
        path: "tabffbreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ffb-module/ffb-reports/ffb-reports.module").then(
                (m) => m.FfbReportsPageModule
              ),
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
        redirectTo: "/tabs/tabffbhome",
        pathMatch: "full",
      },
    ],
  },
];

// Driver
const routes_driver: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../driver-module/driver-home/driver-home.module").then(
            (m) => m.DriverHomePageModule
          ),
      },
      {
        path: "history",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../history/history.module").then(
                (m) => m.HistoryPageModule
              ),
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
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
];

//Ramp
const routes_ramp: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabramphome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ramp-module/ramp-home/ramp-home.module").then(
                (m) => m.RampHomePageModule
              ),
          },
        ],
      },
      {
        path: "tabrampreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ramp-module/ramp-reports/ramp-reports.module").then(
                (m) => m.RampReportsPageModule
              ),
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
        redirectTo: "/tabs/tabramphome",
        pathMatch: "full",
      },
    ],
  },
];

// Owner
const routes_owner: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabdashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-dashboard/owner-dashboard.module"
              ).then((m) => m.OwnerDashboardPageModule),
          },
        ],
      },
      {
        path: "taboilloss",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-oilloss/owner-oilloss.module").then(
                (m) => m.OwnerOillossPageModule
              ),
          },
        ],
      },
      {
        path: "tabproduction",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-production/owner-production.module"
              ).then((m) => m.OwnerProductionPageModule),
          },
        ],
      },
      {
        path: "tabmaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-maintenance/owner-maintenance.module"
              ).then((m) => m.OwnerMaintenancePageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
          },
        ],
      },
      {
        path: "tabreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-reports/owner-reports.module").then(
                (m) => m.OwnerReportsPageModule
              ),
          },
        ],
      },
      /*{
        path: "tabprofile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../more/more.module").then((m) => m.MorePageModule),
          },
        ],
      },*/
      {
        path: "",
        redirectTo: "/tabs/tabdashboard",
        pathMatch: "full",
      },
    ],
  },
];

// Manager
const routes_manager: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabhome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../ceo-module/ceohome/ceohome.module").then(
                (m) => m.CeohomePageModule
              ),
          },
        ],
      },
      {
        path: "taboilloss",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-oilloss/owner-oilloss.module").then(
                (m) => m.OwnerOillossPageModule
              ),
          },
        ],
      },
      {
        path: "tabproduction",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-production/owner-production.module"
              ).then((m) => m.OwnerProductionPageModule),
          },
        ],
      },
      {
        path: "tabmaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-maintenance/owner-maintenance.module"
              ).then((m) => m.OwnerMaintenancePageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
          },
        ],
      },
      {
        path: "tabsor",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../engineer-module/managertab-sorscreen/managertab-sorscreen.module"
              ).then((m) => m.ManagertabSorscreenPageModule),
          },
        ],
      },
      {
        path: "tabreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-reports/owner-reports.module").then(
                (m) => m.OwnerReportsPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/tabhome",
        pathMatch: "full",
      },
    ],
  },
];

// Maintenance Engineer
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
        path: "tabcorrectivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-correctivemaintenance/tab-correctivemaintenance.module"
              ).then((m) => m.TabCorrectivemaintenancePageModule),
          },
        ],
      },
      /*{
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance/tab-preventivemaintenance.module"
              ).then((m) => m.TabPreventivemaintenancePageModule),
          },
        ],
      },*/
      {
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance-new/tab-preventivemaintenance-new.module"
              ).then((m) => m.TabPreventivemaintenanceNewPageModule),
          },
        ],
      },
      {
        path: "tabsor",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../engineer-module/tab-sorscreen/tab-sorscreen.module"
              ).then((m) => m.TabSorscreenPageModule),
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
        path: "tabcalendar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../maintenance-module/schedule/schedule.module").then(
                (m) => m.SchedulePageModule
              ),
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

// Maintenance Foreman
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
        path: "tabcorrectivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-correctivemaintenance/tab-correctivemaintenance.module"
              ).then((m) => m.TabCorrectivemaintenancePageModule),
          },
        ],
      },
      /*{
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance/tab-preventivemaintenance.module"
              ).then((m) => m.TabPreventivemaintenancePageModule),
          },
        ],
      },*/
      {
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance-new/tab-preventivemaintenance-new.module"
              ).then((m) => m.TabPreventivemaintenanceNewPageModule),
          },
        ],
      },
      {
        path: "tabcalendar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../maintenance-module/schedule/schedule.module").then(
                (m) => m.SchedulePageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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

// Maintenance Chargeman
const routes_chargeman: Routes = [
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
        path: "tabcorrectivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-correctivemaintenance/tab-correctivemaintenance.module"
              ).then((m) => m.TabCorrectivemaintenancePageModule),
          },
        ],
      },
      /*{
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance/tab-preventivemaintenance.module"
              ).then((m) => m.TabPreventivemaintenancePageModule),
          },
        ],
      },*/
      {
        path: "tabpreventivemaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-preventivemaintenance-new/tab-preventivemaintenance-new.module"
              ).then((m) => m.TabPreventivemaintenanceNewPageModule),
          },
        ],
      },
      {
        path: "tabcalendar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../maintenance-module/schedule/schedule.module").then(
                (m) => m.SchedulePageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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

// Fitter
const routes_fitter: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabjob",
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
        path: "tabcalendar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../maintenance-module/schedule/schedule.module").then(
                (m) => m.SchedulePageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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
        redirectTo: "/tabs/tabjob",
        pathMatch: "full",
      },
    ],
  },
];

// Wireman
const routes_wireman: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabjob",
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
        path: "tabcalendar",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../maintenance-module/schedule/schedule.module").then(
                (m) => m.SchedulePageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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
        redirectTo: "/tabs/tabjob",
        pathMatch: "full",
      },
    ],
  },
];

// Lab
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
                "../maintenance-module/lab-oillosses-dashboard/lab-oillosses-dashboard.module"
              ).then((m) => m.LabOillossesDashboardPageModule),
          },
        ],
      },
      {
        path: "taboilloss",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-oilloss/owner-oilloss.module").then(
                (m) => m.OwnerOillossPageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
          },
        ],
      },
      {
        path: "tabreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../maintenance-module/tab-laboilloss-report/tab-laboilloss-report.module"
              ).then((m) => m.TabLaboillossReportPageModule),
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

// Production
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
            path: "",
            loadChildren: () =>
              import(
                "../supervisor-module/production-dashboard-dynamic/production-dashboard-dynamic.module"
              ).then((m) => m.ProductionDashboardDynamicPageModule),
          },
        ],
      },
      {
        path: "tabalert",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../segregatenotificatepages/tabalertacknowledge/tabalertacknowledge.module"
              ).then((m) => m.TabalertacknowledgePageModule),
          },
        ],
      },
      {
        path: "taboilloss",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-oilloss/owner-oilloss.module").then(
                (m) => m.OwnerOillossPageModule
              ),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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

// Press Operator
const routes_press: Routes = [
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
        path: "tabalert",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../segregatenotificatepages/tabalertacknowledge/tabalertacknowledge.module"
              ).then((m) => m.TabalertacknowledgePageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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
                "../supervisor-module/tab-pressstation-report/tab-pressstation-report.module"
              ).then((m) => m.TabPressstationReportPageModule),
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

// Sterilizer Operator
const routes_sterilizer: Routes = [
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
        path: "tabalert",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../segregatenotificatepages/tabalertacknowledge/tabalertacknowledge.module"
              ).then((m) => m.TabalertacknowledgePageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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
                "../supervisor-module/tab-sterilizerstation-report/tab-sterilizerstation-report.module"
              ).then((m) => m.TabSterilizerstationReportPageModule),
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

// Grading
const routes_grading: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabgradinghome",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../grading-module/grading-home/grading-home.module").then(
                (m) => m.GradingHomePageModule
              ),
          },
        ],
      },
      {
        path: "tabgradingreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../grading-module/grading-report/grading-report.module"
              ).then((m) => m.GradingReportPageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
          },
        ],
      },
      {
        path: "tabprofile",
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
        redirectTo: "/tabs/tabgradinghome",
        pathMatch: "full",
      },
    ],
  },
];

// Store
const routes_store: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabstoredashboard",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../store-module/store-dashboard/store-dashboard.module"
              ).then((m) => m.StoreDashboardPageModule),
          },
        ],
      },
      {
        path: "tabstoreissue",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../store-module/store-issue/store-issue.module").then(
                (m) => m.StoreIssuePageModule
              ),
          },
        ],
      },
      {
        path: "tabstorecheck",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../store-module/store-check-page/store-check-page.module"
              ).then((m) => m.StoreCheckPagePageModule),
          },
        ],
      },
      {
        path: "tabpayslip",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tabpay-slip/tabpay-slip.module").then(
                (m) => m.TabpaySlipPageModule
              ),
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
        redirectTo: "/tabs/tabstoredashboard",
        pathMatch: "full",
      },
    ],
  },
];

// CEO
const routes_CEO: Routes = [
  {
    path: "",
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "tabceo",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../ceo-module/ceohome/ceohome.module").then(
                (m) => m.CeohomePageModule
              ),
          },
        ],
      },
      {
        path: "taboilloss",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-oilloss/owner-oilloss.module").then(
                (m) => m.OwnerOillossPageModule
              ),
          },
        ],
      },
      {
        path: "tabproduction",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-production/owner-production.module"
              ).then((m) => m.OwnerProductionPageModule),
          },
        ],
      },
      {
        path: "tabmaintenance",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../owner-module/owner-maintenance/owner-maintenance.module"
              ).then((m) => m.OwnerMaintenancePageModule),
          },
        ],
      },
      {
        path: "tabreports",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../owner-module/owner-reports/owner-reports.module").then(
                (m) => m.OwnerReportsPageModule
              ),
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
        redirectTo: "/tabs/tabceo",
        pathMatch: "full",
      },
    ],
  },
];

//console.log(userlist);

if (userlist) {
  if (userlist.dept_id) {
    console.log(userlist.dept_id);

    if (userlist.dept_id == 2) {
      newRoutes = routes_lab;
    } else if (userlist.dept_id == 4) {
      if (userlist.desigId == 2) {
        newRoutes = routes_engineering;
      } else if (userlist.desigId == 17) {
        newRoutes = routes_press;
      } else if (userlist.desigId == 18) {
        newRoutes = routes_sterilizer;
      } else {
        newRoutes = routes_production;
      }
    } else if (userlist.dept_id == 5) {
      newRoutes = routes_store;
    } else if (userlist.dept_id == 7) {
      if (userlist.desigId == 2) {
        newRoutes = routes_engineering;
      } else if (userlist.desigId == 4) {
        newRoutes = routes_foreman;
      } else if (userlist.desigId == 5) {
        newRoutes = routes_fitter;
      } else if (userlist.desigId == 6) {
        newRoutes = routes_chargeman;
      } else if (userlist.desigId == 19) {
        newRoutes = routes_wireman;
      } else {
        newRoutes = routes_engineering;
      }
    } else if (userlist.dept_id == 8) {
      newRoutes = routes_CEO;
    } else if (userlist.dept_id == 9) {
      newRoutes = routes_driver;
    } else if (userlist.dept_id == 10) {
      newRoutes = routes_grading;
    } else if (userlist.dept_id == 20) {
      newRoutes = routes_CEO;
    } else if (userlist.dept_id == 25) {
      if (userlist.desigId == 22) {
        newRoutes = routes_owner;
      } else {
        newRoutes = routes_manager;
      }
    } else if (userlist.dept_id == 18) {
      newRoutes = routes_ffbsupplier;
    } else if (userlist.dept_id == 45) {
      newRoutes = routes_ramp;
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
