import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import {
  FluentProvider,
  FluentProviderProps,
  teamsDarkTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
  IdPrefixProvider,
} from "@fluentui/react-components";
import { Theme as Theme_2 } from "@fluentui/react";
import * as strings from 'ReportDashboardWebPartStrings';
import ReportDashboard from './components/ReportDashboard';
import { IReportDashboardProps } from './components/IReportDashboardProps';

import { WeatherData } from '../models/IWeatherData';
import { IDropdownOption } from '@fluentui/react';

export enum AppMode {
  SharePoint,
  SharePointLocal,
  Teams,
  TeamsLocal,
  Office,
  OfficeLocal,
  Outlook,
  OutlookLocal,
}

export interface IReportDashboardWebPartProps {
  description: string;
  siteUrl: string;
  selectedList: string;
  city: string;
  symbol: string;
}

export default class ReportDashboardWebPart extends BaseClientSideWebPart<IReportDashboardWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _weatherData: WeatherData;
  private lists: IDropdownOption[] = [];
  private _listsDisabled: boolean = true;
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;


  public render(): void {
    const element: React.ReactElement<IReportDashboardProps> = React.createElement(
      ReportDashboard,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        weatherData: this._weatherData,
        selectedList: this.properties.selectedList,
        siteUrl: this.properties.siteUrl,
        city: this.properties.city,
        context: this.context,
        symbol: this.properties.symbol
      }
    );

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> =
      React.createElement(
        FluentProvider,
        {
          theme:
            this._appMode === AppMode.Teams ||
              this._appMode === AppMode.TeamsLocal
              ? this._isDarkTheme
                ? teamsDarkTheme
                : teamsLightTheme
              : this._appMode === AppMode.SharePoint ||
                this._appMode === AppMode.SharePointLocal
                ? this._isDarkTheme
                  ? webDarkTheme
                  : this._theme
                : this._isDarkTheme
                  ? webDarkTheme
                  : webLightTheme,
        },
        element
      );

    const myApp: React.ReactElement = React.createElement(
      IdPrefixProvider,
      {
        value: "app-SkillTest",
      },
      fluentElement
    );

    ReactDom.render(myApp, this.domElement);
  }

  protected async onInit(): Promise<void> {



    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._isDarkTheme = !!currentTheme.isInverted;

    if (
      this._appMode === AppMode.SharePoint ||
      this._appMode === AppMode.SharePointLocal
    ) {
      this._theme = createV9Theme(currentTheme as Theme_2, webLightTheme);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private async loadLists(): Promise<void> {
    if (!this.properties.siteUrl) return;

    const endpoint = `${this.properties.siteUrl}/_api/web/lists?$select=Id,Title&$filter=Hidden eq false`;
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      const data = await response.json();

      if (data.value) {
        this.lists = data.value.map((list: any) => ({ key: list.Title, text: list.Title }));
      }
      this._listsDisabled = this.lists ? false : true;
      this.context.propertyPane.refresh();
      this.render();
    } catch (error) {
      console.error('Errore nel recupero delle liste:', error);
    }
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'siteUrl' && newValue) {
      this.properties.siteUrl = newValue;
      this.loadLists();
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    // disable the SiteCollection selector until list have been loaded
    this._listsDisabled = !this.properties.siteUrl;
    if (this.properties.siteUrl) {
      this.loadLists();
    }

    // show a loading indicator in the property pane while loading lists and items
    // this.loadingIndicator = true;
    this.context.propertyPane.refresh();

    //recupero elenco sites collection


    // remove the loading indicator
    // this.loadingIndicator = false;
    this.context.propertyPane.refresh();
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('city', {
                  label: strings.CityFieldLabel,
                }),
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel,
                }),
                PropertyPaneDropdown('selectedList', {
                  label: strings.SelectedListFieldLabel,
                  options: this.lists,
                  selectedKey: this.properties.selectedList,
                  disabled: this._listsDisabled
                }),
                PropertyPaneTextField('symbol', {
                  label: strings.SymbolFieldLabel,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
