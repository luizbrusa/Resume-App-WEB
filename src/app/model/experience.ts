import { Internationalization } from "./internationalization";
import { Media } from "./media";
import { Person } from "./person";
import { Technology } from "./technology";

export class Experience {

    id: number;
    position: number;
    startAt: string;
    endAt: string;
    companyName: string;
    website: string;
    logo: string | ArrayBuffer | null;
    logoTypeFile: string;
    logoName: string;
    backgroundUrl: string | ArrayBuffer | null;
    backgroundUrlTypeFile: string;
    backgroundUrlName: string;

    person: Person = new Person();

    internationalizations: Array<Internationalization>;
    technologies: Array<Technology>;
    medias: Array<Media>;
    
}
