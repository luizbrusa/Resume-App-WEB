import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router, RouteReuseStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { noop } from 'rxjs';

type ShouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) => boolean;

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private initialized = false;

  get currentLocale(): string {
    return this.translateService.currentLang;
  }

  translate(value: string): string {
    return this.translateService.instant(value);
  }

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title,
    @Optional()
    @SkipSelf()
    otherInstance: LocaleService
  ) {
    if (otherInstance) throw 'LocaleService should have only one instance.';
  }

  private setRouteReuse(reuse: ShouldReuseRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = reuse;
  }

  private subscribeToLangChange() {
    this.translateService.onLangChange.subscribe(async () => {
      const { shouldReuseRoute } = this.router.routeReuseStrategy;

      this.setRouteReuse(() => false);
      this.router.navigated = false;

      await this.router.navigateByUrl(this.router.url).catch(noop);
      this.setRouteReuse(shouldReuseRoute);
    });
  }

  initLocale(localeId: string, defaultLocaleId = localeId) {
    if (this.initialized) return;

    this.setDefaultLocale(defaultLocaleId);
    this.setLocale(localeId);
    this.subscribeToLangChange();

    this.initialized = true;
  }

  setDefaultLocale(localeId: string) {
    this.translateService.setDefaultLang(localeId);
  }

  setLocale(localeId: string) {
    this.translateService.use(localeId);

    this.translateService.get('app.title').subscribe((traducao: string) => {
      this.titleService.setTitle(traducao);
    });
  }
}