

export const parseQueryParams = (queryParams: string) => {
    const query = queryParams.split("&");
    query[0] = query[0].split("?")[1];
  
    return Object.assign(
      {},
      ...query.map((param) => {
        const [key, value] = param.split("=");
        return {
          [key]: value,
        };
      })
    );
  };
export default parseQueryParams