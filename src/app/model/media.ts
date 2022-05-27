import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Person } from "./person";

export class Media {

    id: number;
    title: string;
    http: string;
    icon: IconName;

    person: Person = new Person();

}
