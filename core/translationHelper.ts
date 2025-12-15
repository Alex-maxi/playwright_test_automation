import translations from "./i18n/en.json"

export class I18nHelper {
  static getTranslation(key: string): string {
    return (translations as Record<string, string>)[key] || key;
  }
}