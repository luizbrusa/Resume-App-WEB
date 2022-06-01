import { Internationalization } from "./internationalization";
import { Pessoa } from "./person";

export class Post {
    id: number;
    http: string;
    date: string;
    thumbnail: string | ArrayBuffer | null;
    thumbnailName: string;
    thumbnailTypeFile: string;
    file: string | ArrayBuffer | null;
    fileName: string;
    fileTypeFile: string;

    pessoa: Pessoa = new Pessoa();

    internationalizations: Array<Internationalization> = new Array<Internationalization>();
}