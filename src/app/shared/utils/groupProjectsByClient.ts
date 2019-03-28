import { ProjectsByClient, Project } from '../../core/models';

export function groupProjectsByClient(data: Array<Project>): Array<ProjectsByClient> {
  const groupToValues = data.reduce(
    (obj, item) => {
      obj[item.client.name] = obj[item.client.name] || [];
      obj[item.client.name].push(item);
      return obj;
    },
    {}
  );
  return Object.keys(groupToValues).map((key: string) => ({ clientName: key, projects: groupToValues[key] }));
}
