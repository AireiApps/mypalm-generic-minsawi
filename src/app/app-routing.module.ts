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
    path: "webview-production-dashboard",
    loadChildren: () =>
      import(
        "./supervisor-module/webview-production-dashboard/webview-production-dashboard.module"
      ).then((m) => m.WebviewProductionDashboardPageModule),
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
  {
    path: "splash",
    loadChildren: () =>
      import("./splash/splash.module").then((m) => m.SplashPageModule),
  },
  {
    path: "summary-popup",
    loadChildren: () =>
      import("./summary-module/summary-popup/summary-popup.module").then(
        (m) => m.SummaryPopupPageModule
      ),
  },
  {
    path: "production-oilloss",
    loadChildren: () =>
      import(
        "./supervisor-module/production-oilloss/production-oilloss/production-oilloss.module"
      ).then((m) => m.ProductionOillossPageModule),
  },
  {
    path: "alertacknowledge",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/alertacknowledge/alertacknowledge.module"
      ).then((m) => m.AlertacknowledgePageModule),
  },
  {
    path: "tabalertacknowledge",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/tabalertacknowledge/tabalertacknowledge.module"
      ).then((m) => m.TabalertacknowledgePageModule),
  },
  {
    path: "tab-pressstation-report",
    loadChildren: () =>
      import(
        "./supervisor-module/tab-pressstation-report/tab-pressstation-report.module"
      ).then((m) => m.TabPressstationReportPageModule),
  },
  {
    path: "tab-sterilizerstation-report",
    loadChildren: () =>
      import(
        "./supervisor-module/tab-sterilizerstation-report/tab-sterilizerstation-report.module"
      ).then((m) => m.TabSterilizerstationReportPageModule),
  },
  {
    path: "lab-oillosses-dashboard",
    loadChildren: () =>
      import(
        "./maintenance-module/lab-oillosses-dashboard/lab-oillosses-dashboard.module"
      ).then((m) => m.LabOillossesDashboardPageModule),
  },
  {
    path: "tab-laboilloss-report",
    loadChildren: () =>
      import(
        "./maintenance-module/tab-laboilloss-report/tab-laboilloss-report.module"
      ).then((m) => m.TabLaboillossReportPageModule),
  },
  {
    path: "tab-correctivemaintenance",
    loadChildren: () =>
      import(
        "./maintenance-module/tab-correctivemaintenance/tab-correctivemaintenance.module"
      ).then((m) => m.TabCorrectivemaintenancePageModule),
  },
  {
    path: "tab-preventivemaintenance",
    loadChildren: () =>
      import(
        "./maintenance-module/tab-preventivemaintenance/tab-preventivemaintenance.module"
      ).then((m) => m.TabPreventivemaintenancePageModule),
  },
  {
    path: "notification-form-history-modal",
    loadChildren: () =>
      import(
        "./scanner-module/notification-form-history-modal/notification-form-history-modal.module"
      ).then((m) => m.NotificationFormHistoryModalPageModule),
  },
  {
    path: "notification-timeline-modal",
    loadChildren: () =>
      import(
        "./scanner-module/notification-timeline-modal/notification-timeline-modal.module"
      ).then((m) => m.NotificationTimelineModalPageModule),
  },
  {
    path: "maintenance-foreman-pv-close",
    loadChildren: () =>
      import(
        "./maintenance-module/maintenance-foreman-pv-close/maintenance-foreman-pv-close.module"
      ).then((m) => m.MaintenanceForemanPvClosePageModule),
  },
  {
    path: "popup-notification-view",
    loadChildren: () =>
      import(
        "./supervisor-module/popup-notification-view/popup-notification-view.module"
      ).then((m) => m.PopupNotificationViewPageModule),
  },
  {
    path: "notification-list-modal",
    loadChildren: () =>
      import(
        "./scanner-module/notification-list-modal/notification-list-modal.module"
      ).then((m) => m.NotificationListModalPageModule),
  },
  {
    path: "popup-maintenance-notification-view",
    loadChildren: () =>
      import(
        "./maintenance-module/popup-maintenance-notification-view/popup-maintenance-notification-view.module"
      ).then((m) => m.PopupMaintenanceNotificationViewPageModule),
  },
  {
    path: "oillosses-new",
    loadChildren: () =>
      import("./supervisor-module/oillosses-new/oillosses-new.module").then(
        (m) => m.OillossesNewPageModule
      ),
  },
  {
    path: "tab-oillosses-new",
    loadChildren: () =>
      import(
        "./supervisor-module/tab-oillosses-new/tab-oillosses-new.module"
      ).then((m) => m.TabOillossesNewPageModule),
  },
  {
    path: "dooropenlater-update-modal",
    loadChildren: () =>
      import(
        "./supervisor-module/dooropenlater-update-modal/dooropenlater-update-modal.module"
      ).then((m) => m.DooropenlaterUpdateModalPageModule),
  },
  {
    path: "owner-production",
    loadChildren: () =>
      import("./owner-module/owner-production/owner-production.module").then(
        (m) => m.OwnerProductionPageModule
      ),
  },
  {
    path: "owner-dashboard",
    loadChildren: () =>
      import("./owner-module/owner-dashboard/owner-dashboard.module").then(
        (m) => m.OwnerDashboardPageModule
      ),
  },
  {
    path: "owner-oilloss",
    loadChildren: () =>
      import("./owner-module/owner-oilloss/owner-oilloss.module").then(
        (m) => m.OwnerOillossPageModule
      ),
  },
  {
    path: "owner-maintenance",
    loadChildren: () =>
      import("./owner-module/owner-maintenance/owner-maintenance.module").then(
        (m) => m.OwnerMaintenancePageModule
      ),
  },
  {
    path: "owner-reports",
    loadChildren: () =>
      import("./owner-module/owner-reports/owner-reports.module").then(
        (m) => m.OwnerReportsPageModule
      ),
  },
  {
    path: "oilloss-recomandation-modal",
    loadChildren: () =>
      import(
        "./owner-module/oilloss-recomandation-modal/oilloss-recomandation-modal.module"
      ).then((m) => m.OillossRecomandationModalPageModule),
  },
  {
    path: "oilloss-report-popup",
    loadChildren: () =>
      import(
        "./owner-module/oilloss-report-popup/oilloss-report-popup.module"
      ).then((m) => m.OillossReportPopupPageModule),
  },
  {
    path: "oilloss-reports",
    loadChildren: () =>
      import("./owner-module/oilloss-reports/oilloss-reports.module").then(
        (m) => m.OillossReportsPageModule
      ),
  },
  {
    path: "owner-statistics",
    loadChildren: () =>
      import("./owner-module/owner-statistics/owner-statistics.module").then(
        (m) => m.OwnerStatisticsPageModule
      ),
  },
  {
    path: "production-ffbcage",
    loadChildren: () =>
      import(
        "./supervisor-module/production-ffbcage/production-ffbcage.module"
      ).then((m) => m.ProductionFfbcagePageModule),
  },
  {
    path: "ropm-multipart-save",
    loadChildren: () =>
      import(
        "./maintenance-module/ropm-multipart-save/ropm-multipart-save.module"
      ).then((m) => m.RopmMultipartSavePageModule),
  },
  {
    path: "repm-multipart-save",
    loadChildren: () =>
      import(
        "./maintenance-module/repm-multipart-save/repm-multipart-save.module"
      ).then((m) => m.RepmMultipartSavePageModule),
  },
  {
    path: "tab-preventivemaintenance-new",
    loadChildren: () =>
      import(
        "./maintenance-module/tab-preventivemaintenance-new/tab-preventivemaintenance-new.module"
      ).then((m) => m.TabPreventivemaintenanceNewPageModule),
  },
  {
    path: "owner-machinerunninghours",
    loadChildren: () =>
      import(
        "./owner-module/owner-machinerunninghours/owner-machinerunninghours.module"
      ).then((m) => m.OwnerMachinerunninghoursPageModule),
  },
  {
    path: "owner-oillosses-dataanalysis",
    loadChildren: () =>
      import(
        "./owner-module/owner-oillosses-dataanalysis/owner-oillosses-dataanalysis.module"
      ).then((m) => m.OwnerOillossesDataanalysisPageModule),
  },
  {
    path: "cm-multipart-save",
    loadChildren: () =>
      import(
        "./maintenance-module/cm-multipart-save/cm-multipart-save.module"
      ).then((m) => m.CmMultipartSavePageModule),
  },
  {
    path: "store-dashboard",
    loadChildren: () =>
      import("./store-module/store-dashboard/store-dashboard.module").then(
        (m) => m.StoreDashboardPageModule
      ),
  },
  {
    path: "store-issue",
    loadChildren: () =>
      import("./store-module/store-issue/store-issue.module").then(
        (m) => m.StoreIssuePageModule
      ),
  },
  {
    path: "store-check-page",
    loadChildren: () =>
      import("./store-module/store-check-page/store-check-page.module").then(
        (m) => m.StoreCheckPagePageModule
      ),
  },
  {
    path: "store-statusupdate",
    loadChildren: () =>
      import(
        "./store-module/store-statusupdate/store-statusupdate.module"
      ).then((m) => m.StoreStatusupdatePageModule),
  },
  {
    path: "store-detailsscreen",
    loadChildren: () =>
      import(
        "./store-module/store-detailsscreen/store-detailsscreen.module"
      ).then((m) => m.StoreDetailsscreenPageModule),
  },
  {
    path: "store-materialsearchpage",
    loadChildren: () =>
      import(
        "./store-module/store-materialsearchpage/store-materialsearchpage.module"
      ).then((m) => m.StoreMaterialsearchpagePageModule),
  },
  {
    path: "ceohome",
    loadChildren: () =>
      import("./ceo-module/ceohome/ceohome.module").then(
        (m) => m.CeohomePageModule
      ),
  },
  {
    path: "ceoreports",
    loadChildren: () =>
      import("./ceo-module/ceoreports/ceoreports.module").then(
        (m) => m.CeoreportsPageModule
      ),
  },
  {
    path: "ceodashboard",
    loadChildren: () =>
      import("./ceo-module/ceodashboard/ceodashboard.module").then(
        (m) => m.CeodashboardPageModule
      ),
  },
  {
    path: "abcdreport",
    loadChildren: () =>
      import("./ceo-module/abcdreport/abcdreport.module").then(
        (m) => m.AbcdreportPageModule
      ),
  },
  {
    path: "ceomonthlyreports",
    loadChildren: () =>
      import("./ceo-module/ceomonthlyreports/ceomonthlyreports.module").then(
        (m) => m.CeomonthlyreportsPageModule
      ),
  },
  {
    path: "ceo-dailyreports",
    loadChildren: () =>
      import("./ceo-module/ceo-dailyreports/ceo-dailyreports.module").then(
        (m) => m.CeoDailyreportsPageModule
      ),
  },
  {
    path: "approvals-home",
    loadChildren: () =>
      import("./ceo-module/approvals-home/approvals-home.module").then(
        (m) => m.ApprovalsHomePageModule
      ),
  },
  {
    path: "hourly-reports-home",
    loadChildren: () =>
      import(
        "./ceo-module/hourly-reports-home/hourly-reports-home.module"
      ).then((m) => m.HourlyReportsHomePageModule),
  },
  {
    path: "livetrackingreport",
    loadChildren: () =>
      import("./ceo-module/livetrackingreport/livetrackingreport.module").then(
        (m) => m.LivetrackingreportPageModule
      ),
  },
  {
    path: "ceo-userlogreport",
    loadChildren: () =>
      import("./ceo-module/ceo-userlogreport/ceo-userlogreport.module").then(
        (m) => m.CeoUserlogreportPageModule
      ),
  },
  {
    path: "ceo-financialreports-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-financialreports-home/ceo-financialreports-home.module"
      ).then((m) => m.CeoFinancialreportsHomePageModule),
  },
  {
    path: "quoteapproval",
    loadChildren: () =>
      import("./ceo-module/quoteapproval/quoteapproval.module").then(
        (m) => m.QuoteapprovalPageModule
      ),
  },
  {
    path: "workorderreport",
    loadChildren: () =>
      import("./ceo-module/workorderreport/workorderreport.module").then(
        (m) => m.WorkorderreportPageModule
      ),
  },
  {
    path: "dailypl",
    loadChildren: () =>
      import("./ceo-module/dailyplreport/dailypl.module").then(
        (m) => m.DailyplPageModule
      ),
  },
  {
    path: "productionreport",
    loadChildren: () =>
      import("./ceo-module/productionreport/productionreport.module").then(
        (m) => m.ProductionreportPageModule
      ),
  },
  {
    path: "cashflowreport",
    loadChildren: () =>
      import("./ceo-module/cashflowreport/cashflowreport.module").then(
        (m) => m.CashflowreportPageModule
      ),
  },
  {
    path: "ffbcreditorsreport",
    loadChildren: () =>
      import("./ceo-module/ffbcreditorsreport/ffbcreditorsreport.module").then(
        (m) => m.FfbcreditorsreportPageModule
      ),
  },
  {
    path: "dailystockreport",
    loadChildren: () =>
      import("./ceo-module/dailystockreport/dailystockreport.module").then(
        (m) => m.DailystockreportPageModule
      ),
  },
  {
    path: "sorreport",
    loadChildren: () =>
      import("./ceo-module/sorreport/sorreport.module").then(
        (m) => m.SorreportPageModule
      ),
  },
  {
    path: "cashflowstatementreport",
    loadChildren: () =>
      import(
        "./ceo-module/cashflowstatementreport/cashflowstatementreport.module"
      ).then((m) => m.CashflowstatementreportPageModule),
  },
  {
    path: "sustainchecklist",
    loadChildren: () =>
      import("./ceo-module/sustainchecklist/sustainchecklist.module").then(
        (m) => m.SustainchecklistPageModule
      ),
  },
  {
    path: "ffbdebitorreport",
    loadChildren: () =>
      import("./ceo-module/ffbdebitorreport/ffbdebitorreport.module").then(
        (m) => m.FfbdebitorreportPageModule
      ),
  },
  {
    path: "millreport",
    loadChildren: () =>
      import("./ceo-module/millreport/millreport.module").then(
        (m) => m.MillreportPageModule
      ),
  },
  {
    path: "budgetcomparereport",
    loadChildren: () =>
      import(
        "./ceo-module/budgetcomparereport/budgetcomparereport.module"
      ).then((m) => m.BudgetcomparereportPageModule),
  },
  {
    path: "purchasereport",
    loadChildren: () =>
      import("./ceo-module/purchasereport/purchasereport.module").then(
        (m) => m.PurchasereportPageModule
      ),
  },
  {
    path: "mmslogreport",
    loadChildren: () =>
      import("./ceo-module/mmslogreport/mmslogreport.module").then(
        (m) => m.MmslogreportPageModule
      ),
  },
  {
    path: "directorreport",
    loadChildren: () =>
      import("./ceo-module/directorreport/directorreport.module").then(
        (m) => m.DirectorreportPageModule
      ),
  },
  {
    path: "issuereport",
    loadChildren: () =>
      import("./ceo-module/issuereport/issuereport.module").then(
        (m) => m.IssuereportPageModule
      ),
  },
  {
    path: "costofproductionreport",
    loadChildren: () =>
      import(
        "./ceo-module/costofproductionreport/costofproductionreport.module"
      ).then((m) => m.CostofproductionreportPageModule),
  },
  {
    path: "ceomaintenancereport",
    loadChildren: () =>
      import(
        "./ceo-module/ceomaintenancereport/ceomaintenancereport.module"
      ).then((m) => m.CeomaintenancereportPageModule),
  },
  {
    path: "purchasemonthlyreport",
    loadChildren: () =>
      import(
        "./ceo-module/purchasemonthlyreport/purchasemonthlyreport.module"
      ).then((m) => m.PurchasemonthlyreportPageModule),
  },
  {
    path: "traceabilityreport",
    loadChildren: () =>
      import("./ceo-module/traceabilityreport/traceabilityreport.module").then(
        (m) => m.TraceabilityreportPageModule
      ),
  },
  {
    path: "compliancereport",
    loadChildren: () =>
      import("./ceo-module/compliancereport/compliancereport.module").then(
        (m) => m.CompliancereportPageModule
      ),
  },
  {
    path: "healthreport",
    loadChildren: () =>
      import("./ceo-module/healthreport/healthreport.module").then(
        (m) => m.HealthreportPageModule
      ),
  },
  {
    path: "dailystockissue",
    loadChildren: () =>
      import("./ceo-module/dailystockissue/dailystockissue.module").then(
        (m) => m.DailystockissuePageModule
      ),
  },
  {
    path: "supervisorreport",
    loadChildren: () =>
      import("./ceo-module/supervisorreport/supervisorreport.module").then(
        (m) => m.SupervisorreportPageModule
      ),
  },
  {
    path: "supervisormillreport",
    loadChildren: () =>
      import(
        "./ceo-module/supervisormillreport/supervisormillreport.module"
      ).then((m) => m.SupervisormillreportPageModule),
  },
  {
    path: "supervisorproductionreport",
    loadChildren: () =>
      import(
        "./ceo-module/supervisorproductionreport/supervisorproductionreport.module"
      ).then((m) => m.SupervisorproductionreportPageModule),
  },
  {
    path: "ceosorhistory",
    loadChildren: () =>
      import("./ceo-module/ceosorhistory/ceosorhistory.module").then(
        (m) => m.CeosorhistoryPageModule
      ),
  },
  {
    path: "ceosupervisorproductioncomments",
    loadChildren: () =>
      import(
        "./ceo-module/ceosupervisorproductioncomments/ceosupervisorproductioncomments.module"
      ).then((m) => m.CeosupervisorproductioncommentsPageModule),
  },
  {
    path: "ceosupervisormillcomments",
    loadChildren: () =>
      import(
        "./ceo-module/ceosupervisormillcomments/ceosupervisormillcomments.module"
      ).then((m) => m.CeosupervisormillcommentsPageModule),
  },
  {
    path: "kpireport",
    loadChildren: () =>
      import("./ceo-module/kpireport/kpireport.module").then(
        (m) => m.KpireportPageModule
      ),
  },
  {
    path: "boilerlogreport",
    loadChildren: () =>
      import("./ceo-module/boilerlogreport/boilerlogreport.module").then(
        (m) => m.BoilerlogreportPageModule
      ),
  },
  {
    path: "securityroundsreport",
    loadChildren: () =>
      import(
        "./ceo-module/securityroundsreport/securityroundsreport.module"
      ).then((m) => m.SecurityroundsreportPageModule),
  },
  {
    path: "productiontimelinehome",
    loadChildren: () =>
      import(
        "./ceo-module/productiontimelinehome/productiontimelinehome.module"
      ).then((m) => m.ProductiontimelinehomePageModule),
  },
  {
    path: "ceocommunication",
    loadChildren: () =>
      import("./ceo-module/ceocommunication/ceocommunication.module").then(
        (m) => m.CeocommunicationPageModule
      ),
  },
  {
    path: "profitandloss",
    loadChildren: () =>
      import("./ceo-module/profitandloss/profitandloss.module").then(
        (m) => m.ProfitandlossPageModule
      ),
  },
  {
    path: "balancesheet",
    loadChildren: () =>
      import("./ceo-module/balancesheet/balancesheet.module").then(
        (m) => m.BalancesheetPageModule
      ),
  },
  {
    path: "debtorsaccountreport",
    loadChildren: () =>
      import(
        "./ceo-module/debtorsaccountreport/debtorsaccountreport.module"
      ).then((m) => m.DebtorsaccountreportPageModule),
  },
  {
    path: "monthlyffbcreditorsreport",
    loadChildren: () =>
      import(
        "./ceo-module/monthlyffbcreditorsreport/monthlyffbcreditorsreport.module"
      ).then((m) => m.MonthlyffbcreditorsreportPageModule),
  },
  {
    path: "dailyexpensereport",
    loadChildren: () =>
      import("./ceo-module/dailyexpensereport/dailyexpensereport.module").then(
        (m) => m.DailyexpensereportPageModule
      ),
  },
  {
    path: "storecreditorreport",
    loadChildren: () =>
      import(
        "./ceo-module/storecreditorreport/storecreditorreport.module"
      ).then((m) => m.StorecreditorreportPageModule),
  },
  {
    path: "trialbalancereport",
    loadChildren: () =>
      import("./ceo-module/trialbalancereport/trialbalancereport.module").then(
        (m) => m.TrialbalancereportPageModule
      ),
  },
  {
    path: "prepaymentreport",
    loadChildren: () =>
      import("./ceo-module/prepaymentreport/prepaymentreport.module").then(
        (m) => m.PrepaymentreportPageModule
      ),
  },
  {
    path: "accuredchargesreport",
    loadChildren: () =>
      import(
        "./ceo-module/accuredchargesreport/accuredchargesreport.module"
      ).then((m) => m.AccuredchargesreportPageModule),
  },
  {
    path: "ceo-hourlyreport",
    loadChildren: () =>
      import("./ceo-module/ceo-hourlyreport/ceo-hourlyreport.module").then(
        (m) => m.CeoHourlyreportPageModule
      ),
  },
  {
    path: "ceo-boilerlogreport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-boilerlogreport/ceo-boilerlogreport.module"
      ).then((m) => m.CeoBoilerlogreportPageModule),
  },
  {
    path: "ceo-millperformancereport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-millperformancereport/ceo-millperformancereport.module"
      ).then((m) => m.CeoMillperformancereportPageModule),
  },
  {
    path: "ceo-dailylabreport",
    loadChildren: () =>
      import("./ceo-module/ceo-dailylabreport/ceo-dailylabreport.module").then(
        (m) => m.CeoDailylabreportPageModule
      ),
  },
  {
    path: "ceo-hourlylabreport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-hourlylabreport/ceo-hourlylabreport.module"
      ).then((m) => m.CeoHourlylabreportPageModule),
  },
  {
    path: "ceo-breakdownlist",
    loadChildren: () =>
      import("./ceo-module/ceo-breakdownlist/ceo-breakdownlist.module").then(
        (m) => m.CeoBreakdownlistPageModule
      ),
  },
  {
    path: "ceo-breakdown",
    loadChildren: () =>
      import("./ceo-module/ceo-breakdown/ceo-breakdown.module").then(
        (m) => m.CeoBreakdownPageModule
      ),
  },
  {
    path: "ceo-schedulingreport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-schedulingreport/ceo-schedulingreport.module"
      ).then((m) => m.CeoSchedulingreportPageModule),
  },
  {
    path: "ceo-productionandmaintenancechecklistreport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-productionandmaintenancechecklistreport/ceo-productionandmaintenancechecklistreport.module"
      ).then((m) => m.CeoProductionandmaintenancechecklistreportPageModule),
  },
  {
    path: "ceo-machinerunninghoursreport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-machinerunninghoursreport/ceo-machinerunninghoursreport.module"
      ).then((m) => m.CeoMachinerunninghoursreportPageModule),
  },
  {
    path: "ceo-useractivity-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-useractivity-home/ceo-useractivity-home.module"
      ).then((m) => m.CeoUseractivityHomePageModule),
  },
  {
    path: "ceo-useractivity-maintenance",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-useractivity-maintenance/ceo-useractivity-maintenance.module"
      ).then((m) => m.CeoUseractivityMaintenancePageModule),
  },
  {
    path: "ceo-useractivity-production",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-useractivity-production/ceo-useractivity-production.module"
      ).then((m) => m.CeoUseractivityProductionPageModule),
  },
  {
    path: "ceo-vsinformationcycle",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-vsinformationcycle/ceo-vsinformationcycle.module"
      ).then((m) => m.CeoVsinformationcyclePageModule),
  },
  {
    path: "ceo-vshourlypressure",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-vshourlypressure/ceo-vshourlypressure.module"
      ).then((m) => m.CeoVshourlypressurePageModule),
  },
  {
    path: "ceo-gradingreport",
    loadChildren: () =>
      import("./ceo-module/ceo-gradingreport/ceo-gradingreport.module").then(
        (m) => m.CeoGradingreportPageModule
      ),
  },
  {
    path: "ceo-weighbridgereport",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-weighbridgereport/ceo-weighbridgereport.module"
      ).then((m) => m.CeoWeighbridgereportPageModule),
  },
  {
    path: "ceo-gradingreports-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-gradingreports-home/ceo-gradingreports-home.module"
      ).then((m) => m.CeoGradingreportsHomePageModule),
  },
  {
    path: "ceo-productionreports-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-productionreports-home/ceo-productionreports-home.module"
      ).then((m) => m.CeoProductionreportsHomePageModule),
  },
  {
    path: "ceo-storereports-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-storereports-home/ceo-storereports-home.module"
      ).then((m) => m.CeoStorereportsHomePageModule),
  },
  {
    path: "ceo-maintenancereports-home",
    loadChildren: () =>
      import(
        "./ceo-module/ceo-maintenancereports-home/ceo-maintenancereports-home.module"
      ).then((m) => m.CeoMaintenancereportsHomePageModule),
  },
  {
    path: "sorengineerapproval",
    loadChildren: () =>
      import(
        "./engineer-module/sorengineerapproval/sorengineerapproval.module"
      ).then((m) => m.SorengineerapprovalPageModule),
  },
  {
    path: "engineersorhistory",
    loadChildren: () =>
      import(
        "./engineer-module/engineersorhistory/engineersorhistory.module"
      ).then((m) => m.EngineersorhistoryPageModule),
  },
  {
    path: "engineerorderreqlist",
    loadChildren: () =>
      import(
        "./engineer-module/engineerorderreqlist/engineerorderreqlist.module"
      ).then((m) => m.EngineerorderreqlistPageModule),
  },
  {
    path: "engineerorderreq-add",
    loadChildren: () =>
      import(
        "./engineer-module/engineerorderreq-add/engineerorderreq-add.module"
      ).then((m) => m.EngineerorderreqAddPageModule),
  },
  {
    path: "engineerorderreq-detail",
    loadChildren: () =>
      import(
        "./engineer-module/engineerorderreq-detail/engineerorderreq-detail.module"
      ).then((m) => m.EngineerorderreqDetailPageModule),
  },
  {
    path: "tab-sorscreen",
    loadChildren: () =>
      import("./engineer-module/tab-sorscreen/tab-sorscreen.module").then(
        (m) => m.TabSorscreenPageModule
      ),
  },
  {
    path: "managertab-sorscreen",
    loadChildren: () =>
      import(
        "./engineer-module/managertab-sorscreen/managertab-sorscreen.module"
      ).then((m) => m.ManagertabSorscreenPageModule),
  },
  {
    path: "update-extendedrunninghours",
    loadChildren: () =>
      import(
        "./segregatenotificatepages/update-extendedrunninghours/update-extendedrunninghours.module"
      ).then((m) => m.UpdateExtendedrunninghoursPageModule),
  },
  {
    path: "popup-replacement-extendedhours-update",
    loadChildren: () =>
      import(
        "./maintenance-module/popup-replacement-extendedhours-update/popup-replacement-extendedhours-update.module"
      ).then((m) => m.PopupReplacementExtendedhoursUpdatePageModule),
  },
  {
    path: "grading-home-screen",
    loadChildren: () =>
      import(
        "./grading-module/grading-home-screen/grading-home-screen.module"
      ).then((m) => m.GradingHomeScreenPageModule),
  },
  {
    path: "grading-update-screen",
    loadChildren: () =>
      import(
        "./grading-module/grading-update-screen/grading-update-screen.module"
      ).then((m) => m.GradingUpdateScreenPageModule),
  },
  {
    path: "grading-homescreen2",
    loadChildren: () =>
      import(
        "./grading-module/grading-homescreen2/grading-homescreen2.module"
      ).then((m) => m.GradingHomescreen2PageModule),
  },
  {
    path: "tabpay-slip",
    loadChildren: () =>
      import("./tabpay-slip/tabpay-slip.module").then(
        (m) => m.TabpaySlipPageModule
      ),
  },
  {
    path: "grading-vehicle-search-new",
    loadChildren: () =>
      import(
        "./grading-module/grading-vehicle-search-new/grading-vehicle-search-new.module"
      ).then((m) => m.GradingVehicleSearchNewPageModule),
  },

  {
    path: "driver-home",
    loadChildren: () =>
      import("./driver-module/driver-home/driver-home.module").then(
        (m) => m.DriverHomePageModule
      ),
  },
  {
    path: "driver-vehicle-search",
    loadChildren: () =>
      import(
        "./driver-module/driver-vehicle-search/driver-vehicle-search.module"
      ).then((m) => m.DriverVehicleSearchPageModule),
  },
  {
    path: "googlemap",
    loadChildren: () =>
      import("./driver-module/googlemap/googlemap.module").then(
        (m) => m.GooglemapPageModule
      ),
  },
  {
    path: "driver-supplier-search",
    loadChildren: () =>
      import(
        "./driver-module/driver-supplier-search/driver-supplier-search.module"
      ).then((m) => m.DriverSupplierSearchPageModule),
  },
  {
    path: "ffb-home",
    loadChildren: () =>
      import("./ffb-module/ffb-home/ffb-home.module").then(
        (m) => m.FfbHomePageModule
      ),
  },
  {
    path: "ffb-reports",
    loadChildren: () =>
      import("./ffb-module/ffb-reports/ffb-reports.module").then(
        (m) => m.FfbReportsPageModule
      ),
  },
  {
    path: "ramp-home",
    loadChildren: () =>
      import("./ramp-module/ramp-home/ramp-home.module").then(
        (m) => m.RampHomePageModule
      ),
  },
  {
    path: "ramp-reports",
    loadChildren: () =>
      import("./ramp-module/ramp-reports/ramp-reports.module").then(
        (m) => m.RampReportsPageModule
      ),
  },
  {
    path: "ramp-edit",
    loadChildren: () =>
      import("./ramp-module/ramp-edit/ramp-edit.module").then(
        (m) => m.RampEditPageModule
      ),
  },
  {
    path: "pk-dispatch-report",
    loadChildren: () =>
      import("./ceo-module/pk-dispatch-report/pk-dispatch-report.module").then(
        (m) => m.PkDispatchReportPageModule
      ),
  },
  {
    path: "other-dispatch-report",
    loadChildren: () =>
      import(
        "./ceo-module/other-dispatch-report/other-dispatch-report.module"
      ).then((m) => m.OtherDispatchReportPageModule),
  },
  {
    path: "cpo-dispatch-report",
    loadChildren: () =>
      import(
        "./ceo-module/cpo-dispatch-report/cpo-dispatch-report.module"
      ).then((m) => m.CpoDispatchReportPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
