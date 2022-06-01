import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Pessoa } from "./person";

export class Media {

    id: number;
    title: string;
    http: string;
    icon: IconName;

    pessoa: Pessoa = new Pessoa();

}
