export function status(res:any) {
    if (!res.ok) {
      return Promise.reject(res)
    }
    return res;
  }