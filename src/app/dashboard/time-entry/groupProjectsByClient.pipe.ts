import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupProjectsByClient'})
export class GroupProjectsByClientPipe implements PipeTransform {
  transform(value: any): any {
    let group_to_values = value.reduce(
      (obj, item) => {
        obj[item.projectInfo.client.name] = obj[item.projectInfo.client.name] || [];
        obj[item.projectInfo.client.name].push(item);
        return obj;
      },
      {}
    );
    console.log(group_to_values);
    return Object.keys(group_to_values).map(key => ({ clientName: key, projects: group_to_values[key] }));
  }
}
