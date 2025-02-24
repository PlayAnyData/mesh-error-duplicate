



export function mapFromField(
  originalFieldName: string,
  fieldsToProject: string[] = []
) {
  console.log(`Field should be mapped to ${originalFieldName}`);
  let projection = `
    {
      ${originalFieldName}
    }`;
  console.log(`Projection: ${projection}`);
  return {
    selectionSet: projection,
    resolve(root) {
      return root[originalFieldName];
    },
  };
}

export const additionalResolvers = {
  myQuery: {
    secondId: mapFromField('id'),
  },
};
