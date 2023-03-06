import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/authguard/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "tabs",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "more",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./more/more.module").then((m) => m.MorePageModule),
  },

  {
    path: "forgotpassword",
    loadChildren: () =>
      import("./forgot-password/forgotpassword/forgotpassword.module").then(
        (m) => m.ForgotpasswordPageModule
      ),
  },

  {
    path: "maintenance-home",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-home/maintenance-home.module"
      ).then((m) => m.MaintenanceHomePageModule),
  },

  {
    path: "schedule",
    loadChildren: () =>
      import("./maintenance-module/schedule/schedule.module").then(
        (m) => m.SchedulePageModule
      ),
  },
  {
    path: "maintenance-report",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-report/maintenance-report.module"
      ).then((m) => m.MaintenanceReportPageModule),
  },

  {
    path: "language-popover",
    loadChildren: () =>
      import("./pages/language-popover/language-popover.module").then(
        (m) => m.LanguagePopoverPageModule
      ),
  },

  {
    path: "scheduling-report",
    loadChildren: () =>
      import(
        "./maintenance-module/scheduling-report/scheduling-report.module"
      ).then((m) => m.SchedulingReportPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "maintenance-notification-list",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-list/maintenance-notification-list.module"
      ).then((m) => m.MaintenanceNotificationListPageModule),
  },
  {
    path: "maintenance-notification-view",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-view/maintenance-notification-view.module"
      ).then((m) => m.MaintenanceNotificationViewPageModule),
  },
  {
    path: "notification-historyscreen",
    loadChildren: () =>
      import(
        "./scanner-module/notification-historyscreen/notification-historyscreen.module"
      ).then((m) => m.NotificationHistoryscreenPageModule),
  },
  {
    path: "qrcodescanner",
    loadChildren: () =>
      import("./scanner-module/qrcodescanner/qrcodescanner.module").then(
        (m) => m.QrcodescannerPageModule
      ),
  },

  {
    path: "report-maintenance-notification",
    loadChildren: () =>
      import(
        "./maintenance-module/report-maintenance-notification/report-maintenance-notification.module"
      ).then((m) => m.ReportMaintenanceNotificationPageModule),
  },
  {
    path: "maintenance-notification-dashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-dashboard/maintenance-notification-dashboard.module"
      ).then((m) => m.MaintenanceNotificationDashboardPageModule),
  },
  {
    path: "millperformanceonedashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/millperformanceonedashboard/millperformanceonedashboard.module"
      ).then((m) => m.MillperformanceonedashboardPageModule),
  },
  {
    path: "millperformancetwodashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/millperformancetwodashboard/millperformancetwodashboard.module"
      ).then((m) => m.MillperformancetwodashboardPageModule),
  },
  {
    path: "production-notification-list",
    loadChildren: () =>
      import(
        "./supervisor-module/production-notification-list/production-notification-list.module"
      ).then((m) => m.ProductionNotificationListPageModule),
  },
  {
    path: "production-notification-new",
    loadChildren: () =>
      import(
        "./supervisor-module/production-notification-new/production-notification-new.module"
      ).then((m) => m.ProductionNotificationNewPageModule),
  },
  {
    path: "production-notification-view",
    loadChildren: () =>
      import(
        "./supervisor-module/production-notification-view/production-notification-view.module"
      ).then((m) => m.ProductionNotificationViewPageModule),
  },
  {
    path: "production-home",
    loadChildren: () =>
      import("./supervisor-module/production-home/production-home.module").then(
        (m) => m.ProductionHomePageModule
      ),
  },
  {
    path: "production-report",
    loadChildren: () =>
      import(
        "./supervisor-module/production-report/production-report.module"
      ).then((m) => m.ProductionReportPageModule),
  },
  {
    path: "report-production-maintenance-notification",
    loadChildren: () =>
      import(
        "./supervisor-module/report-production-maintenance-notification/report-production-maintenance-notification.module"
      ).then((m) => m.ReportProductionMaintenanceNotificationPageModule),
  },
  {
    path: "maintenance-materialsearch",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-materialsearch/maintenance-materialsearch.module"
      ).then((m) => m.MaintenanceMaterialsearchPageModule),
  },
  {
    path: "production-dashboard",
    loadChildren: () =>
      import(
        "./supervisor-module/production-dashboard/production-dashboard.module"
      ).then((m) => m.ProductionDashboardPageModule),
  },
  {
    path: "production-hourlyreporting",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlyreporting/production-hourlyreporting.module"
      ).then((m) => m.ProductionHourlyreportingPageModule),
  },
  {
    path: "production-hourlypressingstation",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlypressingstation/production-hourlypressingstation.module"
      ).then((m) => m.ProductionHourlypressingstationPageModule),
  },
  {
    path: "production-hourlysterilizerstation",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlysterilizerstation/production-hourlysterilizerstation.module"
      ).then((m) => m.ProductionHourlysterilizerstationPageModule),
  },
  {
    path: "production-hourlypressingstationsave",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlypressingstationsave/production-hourlypressingstationsave.module"
      ).then((m) => m.ProductionHourlypressingstationsavePageModule),
  },
  {
    path: "production-hourlysterilizerstationsave",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlysterilizerstationsave/production-hourlysterilizerstationsave.module"
      ).then((m) => m.ProductionHourlysterilizerstationsavePageModule),
  },
  {
    path: "report-machineryrunninghour",
    loadChildren: () =>
      import(
        "./supervisor-module/report-machineryrunninghour/report-machineryrunninghour.module"
      ).then((m) => m.ReportMachineryrunninghourPageModule),
  },
  {
    path: "report-pressstationhourlyperformance",
    loadChildren: () =>
      import(
        "./supervisor-module/report-pressstationhourlyperformance/report-pressstationhourlyperformance.module"
      ).then((m) => m.ReportPressstationhourlyperformancePageModule),
  },
  {
    path: "report-sterilizerhourlyperformance",
    loadChildren: () =>
      import(
        "./supervisor-module/report-sterilizerhourlyperformance/report-sterilizerhourlyperformance.module"
      ).then((m) => m.ReportSterilizerhourlyperformancePageModule),
  },
  {
    path: "manager-productiondashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/manager-productiondashboard/manager-productiondashboard.module"
      ).then((m) => m.ManagerProductiondashboardPageModule),
  },
  {
    path: "maintenance-production-report",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-production-report/maintenance-production-report.module"
      ).then((m) => m.MaintenanceProductionReportPageModule),
  },
  {
    path: "lab-oillossesreport",
    loadChildren: () =>
      import(
        "./maintenance-module/lab-oillossesreport/lab-oillossesreport.module"
      ).then((m) => m.LabOillossesreportPageModule),
  },
  {
    path: "lab-oillosses",
    loadChildren: () =>
      import("./maintenance-module/lab-oillosses/lab-oillosses.module").then(
        (m) => m.LabOillossesPageModule
      ),
  },
  {
    path: "lab-oillosses-list",
    loadChildren: () =>
      import(
        "./maintenance-module/lab-oillosses-list/lab-oillosses-list.module"
      ).then((m) => m.LabOillossesListPageModule),
  },
  {
    path: "lab-oillosses-edit",
    loadChildren: () =>
      import(
        "./maintenance-module/lab-oillosses-edit/lab-oillosses-edit.module"
      ).then((m) => m.LabOillossesEditPageModule),
  },
  {
    path: "dashboard-predictionanalysis",
    loadChildren: () =>
      import(
        "./dashboard-predictionanalysis/dashboard-predictionanalysis.module"
      ).then((m) => m.DashboardPredictionanalysisPageModule),
  },
  {
    path: "dashboard-forecasting",
    loadChildren: () =>
      import("./dashboard-forecasting/dashboard-forecasting.module").then(
        (m) => m.DashboardForecastingPageModule
      ),
  },
  {
    path: "production-sterilizerpress-dashboard",
    loadChildren: () =>
      import(
        "./supervisor-module/production-sterilizerpress-dashboard/production-sterilizerpress-dashboard.module"
      ).then((m) => m.ProductionSterilizerpressDashboardPageModule),
  },
  {
    path: "production-sterilizerpress-home",
    loadChildren: () =>
      import(
        "./supervisor-module/production-sterilizerpress-home/production-sterilizerpress-home.module"
      ).then((m) => m.ProductionSterilizerpressHomePageModule),
  },
  {
    path: "production-sterilizerpress-hourlyreporting",
    loadChildren: () =>
      import(
        "./supervisor-module/production-sterilizerpress-hourlyreporting/production-sterilizerpress-hourlyreporting.module"
      ).then((m) => m.ProductionSterilizerpressHourlyreportingPageModule),
  },
  {
    path: "segregatenotification",
    loadChildren: () =>
      import("./segregatenotification/segregatenotification.module").then(
        (m) => m.SegregatenotificationPageModule
      ),
  },
  {
    path: "segregatenotificationmillstatus",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/segregatenotificationmillstatus/segregatenotificationmillstatus.module"
      ).then((m) => m.SegregatenotificationmillstatusPageModule),
  },
  {
    path: "segregatenotificationmaintenancenotification",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/segregatenotificationmaintenancenotification/segregatenotificationmaintenancenotification.module"
      ).then((m) => m.SegregatenotificationmaintenancenotificationPageModule),
  },
  {
    path: "segregatenotificationalerts",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/segregatenotificationalerts/segregatenotificationalerts.module"
      ).then((m) => m.SegregatenotificationalertsPageModule),
  },
  {
    path: "date-modal",
    loadChildren: () =>
      import("./supervisor-module/date-modal/date-modal.module").then(
        (m) => m.DateModalPageModule
      ),
  },
  {
    path: "logsheet-pressstation",
    loadChildren: () =>
      import(
        "./supervisor-module/logsheet-pressstation/logsheet-pressstation.module"
      ).then((m) => m.LogsheetPressstationPageModule),
  },
  {
    path: "logsheet-pressstation-edit",
    loadChildren: () =>
      import(
        "./supervisor-module/logsheet-pressstation-edit/logsheet-pressstation-edit.module"
      ).then((m) => m.LogsheetPressstationEditPageModule),
  },
  {
    path: "logsheet-sterilizerstation",
    loadChildren: () =>
      import(
        "./supervisor-module/logsheet-sterilizerstation/logsheet-sterilizerstation.module"
      ).then((m) => m.LogsheetSterilizerstationPageModule),
  },
  {
    path: "logsheet-sterilizerstation-edit",
    loadChildren: () =>
      import(
        "./supervisor-module/logsheet-sterilizerstation-edit/logsheet-sterilizerstation-edit.module"
      ).then((m) => m.LogsheetSterilizerstationEditPageModule),
  },
  {
    path: "dashboard-oilloss-predictionanalysis",
    loadChildren: () =>
      import(
        "./dashboard-oilloss-predictionanalysis/dashboard-oilloss-predictionanalysis.module"
      ).then((m) => m.DashboardOillossPredictionanalysisPageModule),
  },
  {
    path: "production-hourlpressingstation-alert",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlpressingstation-alert/production-hourlpressingstation-alert.module"
      ).then((m) => m.ProductionHourlpressingstationAlertPageModule),
  },
  {
    path: "production-hourlysterilizerstation-alert",
    loadChildren: () =>
      import(
        "./supervisor-module/production-hourlysterilizerstation-alert/production-hourlysterilizerstation-alert.module"
      ).then((m) => m.ProductionHourlysterilizerstationAlertPageModule),
  },
  {
    path: "pressingsterilizerstation-image-slider",
    loadChildren: () =>
      import(
        "./supervisor-module/pressingsterilizerstation-image-slider/pressingsterilizerstation-image-slider.module"
      ).then((m) => m.PressingsterilizerstationImageSliderPageModule),
  },
  {
    path: "maintenance-preventivemaintenance-list",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-preventivemaintenance-list/maintenance-preventivemaintenance-list.module"
      ).then((m) => m.MaintenancePreventivemaintenanceListPageModule),
  },
  {
    path: "maintenance-rewardpoints",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-rewardpoints/maintenance-rewardpoints.module"
      ).then((m) => m.MaintenanceRewardpointsPageModule),
  },
  {
    path: "report-preventive-maintenance",
    loadChildren: () =>
      import(
        "./maintenance-module/report-preventive-maintenance/report-preventive-maintenance.module"
      ).then((m) => m.ReportPreventiveMaintenancePageModule),
  },
  {
    path: "report-corrective-maintenance",
    loadChildren: () =>
      import(
        "./maintenance-module/report-corrective-maintenance/report-corrective-maintenance.module"
      ).then((m) => m.ReportCorrectiveMaintenancePageModule),
  },

  {
    path: "maintenance-pvrpv-list",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-pvrpv-list/maintenance-pvrpv-list.module"
      ).then((m) => m.MaintenancePvrpvListPageModule),
  },
  {
    path: "report-pvrpv",
    loadChildren: () =>
      import("./maintenance-module/report-pvrpv/report-pvrpv.module").then(
        (m) => m.ReportPvrpvPageModule
      ),
  },
  {
    path: "maintenance-notification-materialrequest",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-materialrequest/maintenance-notification-materialrequest.module"
      ).then((m) => m.MaintenanceNotificationMaterialrequestPageModule),
  },
  {
    path: "production-dashboard-dynamic",
    loadChildren: () =>
      import(
        "./supervisor-module/production-dashboard-dynamic/production-dashboard-dynamic.module"
      ).then((m) => m.ProductionDashboardDynamicPageModule),
  },
  {
    path: "networkconnectionerror",
    loadChildren: () =>
      import("./networkconnectionerror/networkconnectionerror.module").then(
        (m) => m.NetworkconnectionerrorPageModule
      ),
  },
  {
    path: "maintenance-dashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-dashboard/maintenance-dashboard.module"
      ).then((m) => m.MaintenanceDashboardPageModule),
  },
  {
    path: "maintenance-notification-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-modal/maintenance-notification-modal.module"
      ).then((m) => m.MaintenanceNotificationModalPageModule),
  },
  {
    path: "maintenance-activitysearch",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-activitysearch/maintenance-activitysearch.module"
      ).then((m) => m.MaintenanceActivitysearchPageModule),
  },
  {
    path: "production-machineshutdownalert-modal",
    loadChildren: () =>
      import(
        "./supervisor-module/production-machineshutdownalert-modal/production-machineshutdownalert-modal.module"
      ).then((m) => m.ProductionMachineshutdownalertModalPageModule),
  },
  {
    path: "maintenance-notification-accept-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-accept-modal/maintenance-notification-accept-modal.module"
      ).then((m) => m.MaintenanceNotificationAcceptModalPageModule),
  },
  {
    path: "maintenance-preventivemaintenance-category",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-preventivemaintenance-category/maintenance-preventivemaintenance-category.module"
      ).then((m) => m.MaintenancePreventivemaintenanceCategoryPageModule),
  },
  {
    path: "maintenance-routine",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-routine/maintenance-routine.module"
      ).then((m) => m.MaintenanceRoutinePageModule),
  },
  {
    path: "maintenance-replacement",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-replacement/maintenance-replacement.module"
      ).then((m) => m.MaintenanceReplacementPageModule),
  },
  {
    path: "maintenance-replacement-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-replacement-modal/maintenance-replacement-modal.module"
      ).then((m) => m.MaintenanceReplacementModalPageModule),
  },
  {
    path: "maintenance-notification-reports",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-reports/maintenance-notification-reports.module"
      ).then((m) => m.MaintenanceNotificationReportsPageModule),
  },
  {
    path: "maintenance-notification-update-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-notification-update-modal/maintenance-notification-update-modal.module"
      ).then((m) => m.MaintenanceNotificationUpdateModalPageModule),
  },

  {
    path: "maintenance-history-timeline",
    loadChildren: () =>
      import(
        "./scanner-module/maintenance-history-timeline/maintenance-history-timeline.module"
      ).then((m) => m.MaintenanceHistoryTimelinePageModule),
  },
  {
    path: "maintenance-preventivemaintenance-assign-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-preventivemaintenance-assign-modal/maintenance-preventivemaintenance-assign-modal.module"
      ).then((m) => m.MaintenancePreventivemaintenanceAssignModalPageModule),
  },
  {
    path: "maintenance-acknowledge-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-acknowledge-modal/maintenance-acknowledge-modal.module"
      ).then((m) => m.MaintenanceAcknowledgeModalPageModule),
  },
  {
    path: "maintenance-engineer-notification-modal",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-engineer-notification-modal/maintenance-engineer-notification-modal.module"
      ).then((m) => m.MaintenanceEngineerNotificationModalPageModule),
  },
  {
    path: "webview-maintenance-dashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/webview-maintenance-dashboard/webview-maintenance-dashboard.module"
      ).then((m) => m.WebviewMaintenanceDashboardPageModule),
  },
  {
    path: "webview-production-dashboard",
    loadChildren: () =>
      import(
        "./supervisor-module/webview-production-dashboard/webview-production-dashboard.module"
      ).then((m) => m.WebviewProductionDashboardPageModule),
  },
  {
    path: "webview-weeklyreport",
    loadChildren: () =>
      import(
        "./maintenance-module/webview-weeklyreport/webview-weeklyreport.module"
      ).then((m) => m.WebviewWeeklyreportPageModule),
  },
  {
    path: "maintenance-foreman-notification-list",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-foreman-notification-list/maintenance-foreman-notification-list.module"
      ).then((m) => m.MaintenanceForemanNotificationListPageModule),
  },
  {
    path: "maintenance-foreman-pvrpv-list",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-foreman-pvrpv-list/maintenance-foreman-pvrpv-list.module"
      ).then((m) => m.MaintenanceForemanPvrpvListPageModule),
  },
  {
    path: "maintenance-foreman-verification",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-foreman-verification/maintenance-foreman-verification.module"
      ).then((m) => m.MaintenanceForemanVerificationPageModule),
  },
  {
    path: "chatbot",
    loadChildren: () =>
      import("./chatbot-module/chatbot/chatbot.module").then(
        (m) => m.ChatbotPageModule
      ),
  },
  {
    path: "grading-home",
    loadChildren: () =>
      import("./grading-module/grading-home/grading-home.module").then(
        (m) => m.GradingHomePageModule
      ),
  },
  {
    path: "grading-vehicle-search",
    loadChildren: () =>
      import(
        "./grading-module/grading-vehicle-search/grading-vehicle-search.module"
      ).then((m) => m.GradingVehicleSearchPageModule),
  },
  {
    path: "grading-report",
    loadChildren: () =>
      import("./grading-module/grading-report/grading-report.module").then(
        (m) => m.GradingReportPageModule
      ),
  },
  {
    path: "maintenance-fitterwireman-verify-acknowledge",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-fitterwireman-verify-acknowledge/maintenance-fitterwireman-verify-acknowledge.module"
      ).then((m) => m.MaintenanceFitterwiremanVerifyAcknowledgePageModule),
  },
  {
    path: "chatbot-screen",
    loadChildren: () =>
      import("./chatbot-screen/chatbot-screen.module").then(
        (m) => m.ChatbotScreenPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
