import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupProjectsByClient'})
export class GroupProjectsByClientPipe implements PipeTransform {
  transform(value: any): any {
    const groupToValues = value.reduce(
      (obj, item) => {
        obj[item.projectInfo.client.name] = obj[item.projectInfo.client.name] || [];
        obj[item.projectInfo.client.name].push(item);
        return obj;
      },
      {}
    );
    return Object.keys(groupToValues).map(key => ({ clientName: key, projects: groupToValues[key] }));
  }
}
