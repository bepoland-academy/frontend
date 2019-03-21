export function groupProjectsByClient(data) {
  let group_to_values = data.reduce(
    (obj, item) => {
      obj[item.client.name] = obj[item.client.name] || [];
      obj[item.client.name].push(item);
      return obj;
    },
    {}
  );
  return Object.keys(group_to_values).map(key => ({ clientName: key, projects: group_to_values[key] }));
}
