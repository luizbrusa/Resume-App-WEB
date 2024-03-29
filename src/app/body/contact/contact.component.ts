import { Component, OnInit } from "@angular/core";
import { faEnvelope, faPhone, faTimes, faMapMarkerAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Contact } from "../../model/contact.model";
import { environment } from '../../../environments/environment';
import { Pessoa } from "src/app/model/person";
import { ContactService } from "src/app/service/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.min.scss", "./contact.component.responsivity.min.scss"]
})

export class ContactComponent implements OnInit {

  person: Pessoa = new Pessoa();

  name: string;
  email: string;
  phone: string;
  location: string;

  faEnvelope: IconDefinition;
  faPhone: IconDefinition;
  faMapMarkerAlt: IconDefinition;
  faTimes: IconDefinition;

  isLoading: boolean = false;
  hasBeenSubmited: boolean = false;
  feedbackStatus: string;

  constructor(private contactService: ContactService) { }

  contactForm: FormGroup = new FormGroup({
    name: new FormControl("",[
      Validators.required,
      Validators.pattern("[A-zÀ-ú ]*")
    ]),
    email: new FormControl("",[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    message: new FormControl("",[
      Validators.required
    ])
  });

  get senderEmail() {
    return this.contactForm.get("email")
  }

  get senderName() {
    return this.contactForm.get("name")
  }

  get senderMessage() {
    return this.contactForm.get("message")
  }

  get options() {
    return this.contactForm.get("options")
  }

  ngOnInit(): void {
    this.person = environment.person;

    this.name = this.person.name;
    this.email = this.person.email;
    this.phone = this.person.phone;
    this.location = this.person.location;

    this.faEnvelope = faEnvelope;
    this.faPhone = faPhone;
    this.faMapMarkerAlt = faMapMarkerAlt;
    this.faTimes = faTimes;
  }

  sendContact(contact: Contact) {
    let email = contact.email;
    let message = contact.message;

    contact.message = 'Contato de - ' + email + ' Mensagem - ' + message;
    contact.email = this.person.email;
    this.contactService.enviarEmail(contact).subscribe(data => {
      if (data.code == '200') {
        alert(data.error);
      } else {
        alert('Erro ao Enviar e-mail: ' + data.error);
      }
    });
    this.contactForm.reset();
  }

  displayUserInterfaceMessage(hasBeenSuccessfuly: boolean) {
    this.isLoading = false;
    this.hasBeenSubmited = true;
    this.feedbackStatus = hasBeenSuccessfuly? "success" : "error";
    this.contactForm.reset();
  }

  closeFeedbackMessage() {
    this.hasBeenSubmited = false;
    this.feedbackStatus = "";
  }

  onSubmit(contactForm: any) {
    this.isLoading = true;

    const contactValues: Contact = {
      name: this.senderName?.value,
      email: this.senderEmail?.value,
      message: this.senderMessage?.value,
      date: new Date()
    } as Contact;

    this.sendContact(contactValues);
  }

  get showCaricature() {
    if (this.person.caricatureTypeFile) {
      return this.person.caricatureTypeFile + ',' + this.person.caricature;
    } else {
      return '';
    }
  }

  get showPerfilImage() {
    if (this.person.perfilImageTypeFile) {
      return this.person.perfilImageTypeFile + ',' + this.person.perfilImage;
    } else {
      return '';
    }
  }

  get perfilImageStyle() {
    return "background-image: url('" + this.showPerfilImage + "')";
  }
  
}
