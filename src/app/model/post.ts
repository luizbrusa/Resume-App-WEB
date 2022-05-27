import { Internationalization } from "./internationalization";
import { Person } from "./person";

export class Post {
    id: number;
    http: string;
    date: string;
    thumbnail: string;

    person: Person = new Person();

    internationalizations: Array<Internationalization> = new Array<Internationalization>();
}