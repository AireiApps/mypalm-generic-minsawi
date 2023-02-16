import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], texto: string): any[] {
    if (texto === "") {
      return value;
    }

    texto = texto.toLowerCase();

    return value.filter((item) => {
      return item.activity_name.toLowerCase().includes(texto);
    });
  }
}
