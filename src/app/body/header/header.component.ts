import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject, LOCALE_ID, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { faBars, faShareAlt, faCloudDownloadAlt, IconDefinition, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { NgNavigatorShareService } from "ng-navigator-share";
import { LocaleId } from "src/app/locale.provider";
import { LocaleService } from "src/app/service/locale.service";
import { Person } from "src/app/model/person";
import { environment } from "src/environments/environment";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "./header.component.responsivity.scss"]
})

export class HeaderComponent implements OnInit, AfterViewInit {

  private _activeSection: any;
  private _pageXOffset: any;
  private ngNavigatorShareService: NgNavigatorShareService | undefined;

  person: Person = new Person();

  agora = Date.now();

  hasMenuToggled: boolean;
  faBars: IconDefinition;
  faShareAlt: IconDefinition;
  faCloudDownloadAlt: IconDefinition;
  faSignOutAlt: IconDefinition;

  @ViewChild("nav") nav: ElementRef | undefined;
  @ViewChild("shareBtn") shareBtn: ElementRef | undefined;
  @ViewChild("signoutBtn") signoutBtn: ElementRef | undefined;

  constructor(
    @Inject(LOCALE_ID) public localeId: LocaleId,
    private renderer: Renderer2,
    private router: Router,
    private localeService: LocaleService,
    private domSanitizer: DomSanitizer,
    ngNavigatorShareService: NgNavigatorShareService) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  // use getter setter to define the properties
  get activeSection(): any { 
    return this._activeSection;
  }
  
  get pageXOffset(): any { 
    return this._pageXOffset;
  }

  @Input()
  set pageXOffset(value: any) {
    this._pageXOffset = value;
    this.onDetectScreenSize();
  }

  @Input()
  set activeSection(value: any) {
    this._activeSection = value;
    this.updateNavigation();
  }

  ngAfterViewInit() {    
      // Share button available only for browsers that do support it.
      if (this.ngNavigatorShareService && this.shareBtn) {
        if (this.ngNavigatorShareService.canShare()) {
          this.shareBtn.nativeElement.style.display = "block";
        }
      }
  }

  ngOnInit(): void {
    this.person = environment.person;

    this.faBars = faBars;
    this.faShareAlt = faShareAlt;
    this.faCloudDownloadAlt = faCloudDownloadAlt;
    this.faSignOutAlt = faSignOutAlt;

    this.localeId
  }

  private updateNavigation() {

    if(this._activeSection && this.renderer) {
      
      // Remove any selected anchor
      const activePreviousElem = this.nav?.nativeElement.querySelector("a.active");
      
      if(activePreviousElem) {
        this.renderer.removeClass(activePreviousElem, "active");
      }

      const targetElem = this.nav?.nativeElement.querySelector(`a[href^="#${this._activeSection}"]`);
      if(targetElem) {
        this.renderer.addClass(targetElem, "active");
      }
    }
  }

  /*
   * For media types such as tablets and mobile devices, the nav-bar navigation should be
   * collapsed by default.
  */
  private onDetectScreenSize() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  onToggleBar() {
    this.hasMenuToggled = !this.hasMenuToggled;
  }

  resetMenu() {
    this.hasMenuToggled = this.pageXOffset > 1024;

    document.getElementsByName('link').forEach(element => {
      element.style.backgroundColor = 'rgb(193, 213, 238)';
    });
  }

  scrollTo(element: string, link: HTMLElement) {
    this.resetMenu();
    const HTMLEl: HTMLElement | null = document.getElementById(element);

    if (HTMLEl) {
      HTMLEl.scrollIntoView({behavior: 'smooth'});
      link.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }

  signOut() {
    localStorage.setItem('token','');
    localStorage.setItem('personId','');
    this.router.navigate(['login']);
  }

  onLangChange(loc: string) {
    this.localeService.setLocale(loc);
  }

  get resumeName() {
    let resume = this.localeService.translate('app.title');
    return resume;
  }

  get showResume() {
    if (this.person.resume) {
      return this.domSanitizer.bypassSecurityTrustUrl('data:application/pdf;base64,' + this.person.resume);
    } else {
      return '';
    }
  }

  async share() {
    try{
      await this.ngNavigatorShareService?.share({
        title: "Resume - Luiz Antônio de Almeida",
        text: "Hello, I'm a Full-stack Java Web Developer with 15+ years of experience designing web and desktop projects. Find out more in my resume!",
        url: "http://luizInfo.com"
      });
    } catch(error) {
      console.log("You app is not shared, reason: ", error);
    }    
  }

}