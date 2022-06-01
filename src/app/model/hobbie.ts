import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Pessoa } from "./person";

export class Hobbie {

    id: number;
    title: string;
    icon: IconName;

    pessoa: Pessoa = new Pessoa();

}
