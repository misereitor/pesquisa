export const buildUpdateQuery = (table: string, data: Partial<any>) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error('No fields to update');
  }

  const setString = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');

  const text = `UPDATE ${table} SET ${setString} WHERE id = ${data.id} RETURNING *`;

  return { text, values };
};
