import { Experience } from "./experience";
import { Hobbie } from "./hobbie";
import { Internationalization } from "./internationalization";
import { Media } from "./media";
import { Post } from "./post";

export class Pessoa {

    id: string;
    name: string;
    nickname: string;
    birth: string;
    email: string;
    phone: string;
    location: string;
    caricature: string | ArrayBuffer | null;
    caricatureTypeFile: string;
    perfilImage: string | ArrayBuffer | null;
    perfilImageTypeFile: string;
    resume: string | ArrayBuffer | null;
    resumeName: string;

    medias: Array<Media>;
    internationalizations: Array<Internationalization>;
    hobbies: Array<Hobbie>;
    experiences: Array<Experience>;
    posts: Array<Post>;

}
