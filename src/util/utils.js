export async function time_in_milliseconds(exp){
  let date1 = new Date();
  let date2 = new Date(exp * 1000);
  let timeDiff = date2.getTime() - date1.getTime();

  return timeDiff
}


export default {time_in_milliseconds};
