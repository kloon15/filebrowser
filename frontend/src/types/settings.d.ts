import type { Permissions } from "./user";

export interface ISettings {
  signup: boolean;
  createUserDir: boolean;
  userHomeBasePath: string;
  defaults: SettingsDefaults;
  rules: any[];
  branding: SettingsBranding;
  tus: SettingsTus;
  shell: string[];
  commands: SettingsCommand;
}

interface SettingsDefaults {
  scope: string;
  locale: string;
  viewMode: string;
  singleClick: boolean;
  sorting: SettingsSorting;
  perm: Permissions;
  commands: any[];
  hideDotfiles: boolean;
  dateFormat: boolean;
}

interface SettingsSorting {
  by: string;
  asc: boolean;
}

interface SettingsBranding {
  name: string;
  disableExternal: boolean;
  disableUsedPercentage: boolean;
  files: string;
  theme: string;
  color: string;
}

interface SettingsTus {
  chunkSize: number;
  retryCount: number;
}

export interface SettingsCommand {
  after_copy?: string[];
  after_delete?: string[];
  after_rename?: string[];
  after_save?: string[];
  after_upload?: string[];
  before_copy?: string[];
  before_delete?: string[];
  before_rename?: string[];
  before_save?: string[];
  before_upload?: string[];
}

export interface SettingsUnit {
  KB: number;
  MB: number;
  GB: number;
  TB: number;
}