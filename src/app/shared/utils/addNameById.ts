export function addNameById(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
      for (let j = 0; j < list2.length; j++) {
        if (list1[i].consultantId = list2[i].consultantId) {
          list1[i] = {...list1[i], firstName: list2[i].firstName, lastName: list2[i].lastName};
        }
      }
    }
    return list1;
}
