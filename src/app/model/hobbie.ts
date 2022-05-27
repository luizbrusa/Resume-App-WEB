import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Person } from "./person";

export class Hobbie {

    id: number;
    title: string;
    icon: IconName;

    person: Person = new Person();

}
