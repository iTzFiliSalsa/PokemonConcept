import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first'
})
export class FirstPipe implements PipeTransform {

  transform(
    value: string,
    extension?: string
  ): unknown {
    let input: string | undefined = value.at(1);
    if(extension == "upperCase")
      return input!.toUpperCase();
    return input;
  }

}
