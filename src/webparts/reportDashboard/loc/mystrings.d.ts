declare interface IReportDashboardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  SiteUrlFieldLabel: string;
  SelectedListFieldLabel: string;
  CityFieldLabel: string;
}

declare module 'ReportDashboardWebPartStrings' {
  const strings: IReportDashboardWebPartStrings;
  export = strings;
}
